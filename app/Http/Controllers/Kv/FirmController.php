<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Reveal;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\FirmPresenter;
use Illuminate\Http\Request;

class FirmController extends Controller
{
    /** GET /kv/firms?dir=&cc=&sec=&q=&page= */
    public function index(Request $r)
    {
        $v = $r->validate([
            'dir' => 'nullable|in:EXP,IMP',
            'cc' => 'nullable|alpha|size:2',
            'sec' => 'nullable|integer|min:0',
            'q' => 'nullable|string|max:120',
            'page' => 'nullable|integer|min:1|max:200',
        ]);
        $user = $r->user();
        $viewer = FirmPresenter::viewer($user, $r);          // premium / sector scope of whoever is looking

        $q = Company::approved()->with('sector');
        if (! empty($v['dir'])) {
            $q->where(fn ($w) => $w->where('direction', $v['dir'])->orWhere('direction', 'BOTH')->orWhereNull('direction'));
        }
        if (! empty($v['cc'])) $q->where('country_cc', strtolower($v['cc']));
        // `sec` is the front-end sector index (meta_idx) so the UI keeps its icon/colour mapping.
        $secId = null;
        if (isset($v['sec']) && $v['sec'] !== '') {
            $secId = \App\Models\Kv\Sector::where('meta_idx', (int) $v['sec'])->whereNull('parent_id')->value('id');
            $q->where(fn ($w) => $w->where('sector_id', $secId)->orWhere('subsector_id', $secId));
        }
        if (! empty($v['q'])) {
            $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $v['q']).'%';
            $q->where(fn ($w) => $w->where('name', 'like', $like)->orWhere('name_en', 'like', $like)
                ->orWhere('products', 'like', $like)->orWhere('hs_codes', 'like', $like)
                ->orWhere('description', 'like', $like));
        }

        $criteria = ['dir' => $v['dir'] ?? null, 'cc' => $v['cc'] ?? null, 'sec' => $secId, 'q' => $v['q'] ?? null];
        $hasCriteria = (bool) array_filter([$criteria['cc'], $criteria['sec'], $criteria['q']]);

        $total = (clone $q)->count();
        if ($viewer['scoped']) {
            // the member's own sector first, so the 300-row window is never filled with firms they cannot open anyway
            $q->orderByRaw('CASE WHEN sector_id IN ('.implode(',', array_map('intval', $viewer['tree'])).') THEN 0 ELSE 1 END');
        }
        $rows = $q->orderByDesc('is_verified')->orderByDesc('id')->limit(300)->get();

        $items = $this->cards(
            $rows->map(fn (Company $c) => [$c, $hasCriteria ? FirmPresenter::score($c, $criteria) : null])
                ->sortByDesc(fn ($p) => $p[1] ?? 0)->values()->all(),
            $viewer
        );

        return response()->json(['total' => $total, 'items' => $items, 'plan' => FirmPresenter::viewerPlan($user)])
            ->header('Cache-Control', 'no-store');
    }

    /** GET /kv/matches – complementary firms for the logged-in member's own company (scores explained, not random). */
    public function matches(Request $r)
    {
        $user = $r->user();
        $ctx = CompanyContext::forRequest($r);
        if ($ctx && ! in_array('matches', $ctx['perms'], true)) {
            return response()->json(['error' => 'forbidden', 'need' => 'matches'], 403);
        }
        $mine = $ctx['company'] ?? null;
        if (! $mine || $mine->status !== Company::STATUS_APPROVED) {
            return response()->json(['items' => [], 'reason' => $mine ? 'not_approved' : 'no_company']);
        }
        $viewer = FirmPresenter::viewer($user, $r, $ctx);
        $myHs = array_filter(array_map('trim', preg_split('/[,;\s]+/', (string) $mine->hs_codes)));
        $myChapters = array_unique(array_map(fn ($h) => substr(preg_replace('/\D/', '', $h), 0, 2), $myHs));
        $myTokens = array_filter(preg_split('/[\s,;]+/u', mb_strtolower((string) $mine->products)), fn ($t) => mb_strlen($t) >= 4);

        $rows = Company::approved()->with('sector')->where('id', '!=', $mine->id)->limit(500)->get();
        $scored = $rows->map(function (Company $c) use ($mine, $myChapters, $myTokens) {
            $sameSector = $c->sector_id && $c->sector_id === $mine->sector_id;
            $theirHs = array_filter(array_map('trim', preg_split('/[,;\s]+/', (string) $c->hs_codes)));
            $hs4 = count(array_intersect(array_map(fn ($h) => substr(preg_replace('/\D/', '', $h), 0, 4), $theirHs), array_map(fn ($h) => substr(preg_replace('/\D/', '', $h), 0, 4), array_filter(array_map('trim', preg_split('/[,;\s]+/', (string) $mine->hs_codes)))))) > 0;
            $hs2 = count(array_intersect(array_map(fn ($h) => substr(preg_replace('/\D/', '', $h), 0, 2), $theirHs), $myChapters)) > 0;
            $hay = mb_strtolower($c->products.' '.$c->name);
            $tok = (bool) array_filter($myTokens, fn ($t) => str_contains($hay, $t));
            $complement = ($mine->direction === 'EXP' && $c->direction === 'IMP') || ($mine->direction === 'IMP' && $c->direction === 'EXP');
            $loose = $mine->direction === 'BOTH' || $c->direction === 'BOTH' || ! $mine->direction || ! $c->direction;
            $prod = min(100, ($sameSector ? 60 : 0) + ($hs4 ? 30 : ($hs2 ? 15 : 0)) + ($tok ? 10 : 0));
            $dirfit = $complement ? 100 : ($loose ? 70 : 40);
            if ($prod === 0) return null;                       // no product relation → not a match
            $score = min(99, (int) round(0.6 * $prod + 0.4 * $dirfit) + ($c->is_verified ? 3 : 0));
            return ['c' => $c, 'score' => $score, 'prod' => $prod, 'dirfit' => $dirfit, 'reasons' => array_values(array_filter([
                $complement ? 'dir_c' : null, $sameSector ? 'sec' : null, ($hs4 || $hs2) ? 'hs' : null,
                $c->is_verified ? 'vf' : null, ($c->founded_year && date('Y') - $c->founded_year > 15) ? 'veteran' : null,
            ]))];
        })->filter()->sortByDesc('score')->values()->take(60);

        $items = $this->cards(
            $scored->map(fn ($m) => [$m['c'], $m['score']])->all(),
            $viewer,
            fn (int $i) => ['prod' => $scored[$i]['prod'], 'dirfit' => $scored[$i]['dirfit'], 'reasons' => $scored[$i]['reasons']]
        );
        return response()->json(['items' => $items])->header('Cache-Control', 'no-store');
    }

    /**
     * Cards in display order with the visibility rules applied (this is the single place that locks list entries):
     *  - a sector-scoped member sees firms of OTHER sectors only as locked cards (lock = 'sector'); their own firm is always open
     *  - Premium (and admins): every firm in scope is open
     *  - everybody else: the first FREE_FIRM_LIMIT firms in scope are open, the rest locked (lock = 'plan')
     * @param list<array{0: Company, 1: ?int}> $pairs  [company, score] in display order
     * @param \Closure|null $decorate  fn(int $position): array of extra fields for that card
     */
    private function cards(array $pairs, array $viewer, ?\Closure $decorate = null): array
    {
        $open = 0;
        $out = [];
        foreach ($pairs as $i => [$c, $score]) {
            if ($viewer['company_id'] !== null && $viewer['company_id'] === $c->id) {
                $card = FirmPresenter::card($c, $score, false);
            } elseif (! FirmPresenter::inScope($viewer, $c)) {
                $card = FirmPresenter::card($c, $score, true, 'sector');
            } elseif (! $viewer['premium'] && $open >= FirmPresenter::FREE_FIRM_LIMIT) {
                $card = FirmPresenter::card($c, $score, true, 'plan');
            } else {
                $open++;
                $card = FirmPresenter::card($c, $score, false);
            }
            $out[] = $decorate ? $card + $decorate($i) : $card;
        }
        return $out;
    }

    /** GET /kv/stats – real counters for the hero bar (no invented numbers). */
    public function stats()
    {
        $q = Company::approved();
        return response()->json([
            'firms' => (clone $q)->count(),
            'countries' => (clone $q)->distinct('country_cc')->count('country_cc'),
            'sectors' => \App\Models\Kv\Sector::whereNull('parent_id')->where('is_active', true)->count(),
        ])->header('Cache-Control', 'public, max-age=60');
    }

    /** GET /kv/firms/{slug} – detail; contact block only for entitled viewers. */
    public function show(Request $r, string $slug)
    {
        $c = Company::with(['sector', 'photos'])->where('slug', $slug)->firstOrFail();
        $user = $r->user();
        $mineCtx = $user ? CompanyContext::forRequest($r) : null;
        $viewer = FirmPresenter::viewer($user, $r, $mineCtx);
        $isOwnerOrAdmin = $user && ($c->user_id === $user->id || (int) $user->role === 1 || ($mineCtx && $mineCtx['company']->id === $c->id));
        abort_unless($c->status === Company::STATUS_APPROVED || $isOwnerOrAdmin, 404);

        // A member of another sector gets the masked card and a flag – nothing that identifies the firm (HTTP 200 so the UI can explain why).
        if (! $isOwnerOrAdmin && ! FirmPresenter::inScope($viewer, $c)) {
            return response()->json(FirmPresenter::lockedDetail($c, 'sector'))->header('Cache-Control', 'no-store');
        }

        $revealed = $viewer['premium'] && $user
            && Reveal::where('user_id', $user->id)->where('company_id', $c->id)->exists();

        return response()->json(FirmPresenter::detail($c, $user, null, $revealed, $mineCtx))->header('Cache-Control', 'no-store');
    }

    /**
     * POST /kv/firms/{slug}/reveal – counts against a daily quota (anti-scraping)
     * and is only possible for Pro members when the firm consented to being contactable.
     */
    public function reveal(Request $r, string $slug)
    {
        $user = $r->user();
        abort_unless($user, 401);
        $ctx = CompanyContext::forRequest($r);
        $viewer = FirmPresenter::viewer($user, $r, $ctx);
        if (! $viewer['premium']) {
            // not Premium (or Premium plan without an approved company): free members can only buy credits for PEOPLE, never firm contacts
            return response()->json(['error' => $viewer['member'] || $viewer['admin'] ? 'pro_required' : 'no_company'], 403);
        }
        $c = Company::approved()->where('slug', $slug)->firstOrFail();
        if (! FirmPresenter::inScope($viewer, $c)) {
            return response()->json(['error' => 'sector_locked'], 403);          // other sectors are reached through "Kişiler" with credits
        }
        if (! $c->hasConsent('contact_visibility') && $viewer['company_id'] !== $c->id && ! $viewer['admin']) {
            return response()->json(['error' => 'no_consent'], 403);
        }
        $already = Reveal::where('user_id', $user->id)->where('company_id', $c->id)->exists();
        if (! $already) {
            $today = Reveal::where('user_id', $user->id)->where('created_at', '>=', now()->startOfDay())->count();
            if ($today >= FirmPresenter::DAILY_REVEAL_LIMIT) {
                return response()->json(['error' => 'quota'], 429);
            }
            Reveal::create(['user_id' => $user->id, 'company_id' => $c->id]);
            if (class_exists(\App\Services\Kv\Activity::class)) {
                \App\Services\Kv\Activity::log($viewer['company_id'], $user->id, 'firm.reveal', ['firm' => $c->id]);
            }
        }
        $d = FirmPresenter::detail($c->load(['sector', 'photos']), $user, null, true, $ctx);
        return response()->json(['contact' => $d['contact'] ?? null]);
    }
}
