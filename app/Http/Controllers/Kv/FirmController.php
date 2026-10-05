<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Reveal;
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
        $isPro = FirmPresenter::isPro($user);

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
        $rows = $q->orderByDesc('is_verified')->orderByDesc('id')->limit(300)->get();

        $items = $rows->map(function (Company $c) use ($criteria, $hasCriteria) {
            return [$c, $hasCriteria ? FirmPresenter::score($c, $criteria) : null];
        })->sortByDesc(fn ($p) => $p[1] ?? 0)->values()
          ->map(function ($pair, $i) use ($isPro) {
              $locked = ! $isPro && $i >= FirmPresenter::FREE_FIRM_LIMIT;
              return FirmPresenter::card($pair[0], $pair[1], $locked);
          })->all();

        return response()->json(['total' => $total, 'items' => $items, 'plan' => FirmPresenter::viewerPlan($user)])
            ->header('Cache-Control', 'no-store');
    }

    /** GET /kv/firms/{slug} – detail; contact block only for entitled viewers. */
    public function show(Request $r, string $slug)
    {
        $c = Company::with(['sector', 'photos'])->where('slug', $slug)->firstOrFail();
        $user = $r->user();
        $isOwnerOrAdmin = $user && ($c->user_id === $user->id || (int) $user->role === 1);
        abort_unless($c->status === Company::STATUS_APPROVED || $isOwnerOrAdmin, 404);

        $revealed = $user && FirmPresenter::isPro($user)
            && Reveal::where('user_id', $user->id)->where('company_id', $c->id)->exists();

        return response()->json(FirmPresenter::detail($c, $user, null, $revealed))->header('Cache-Control', 'no-store');
    }

    /**
     * POST /kv/firms/{slug}/reveal – counts against a daily quota (anti-scraping)
     * and is only possible for Pro members when the firm consented to being contactable.
     */
    public function reveal(Request $r, string $slug)
    {
        $user = $r->user();
        abort_unless($user, 401);
        if (! FirmPresenter::isPro($user)) {
            return response()->json(['error' => 'pro_required'], 403);
        }
        $c = Company::approved()->where('slug', $slug)->firstOrFail();
        if (! $c->hasConsent('contact_visibility')) {
            return response()->json(['error' => 'no_consent'], 403);
        }
        $already = Reveal::where('user_id', $user->id)->where('company_id', $c->id)->exists();
        if (! $already) {
            $today = Reveal::where('user_id', $user->id)->where('created_at', '>=', now()->startOfDay())->count();
            if ($today >= FirmPresenter::DAILY_REVEAL_LIMIT) {
                return response()->json(['error' => 'quota'], 429);
            }
            Reveal::create(['user_id' => $user->id, 'company_id' => $c->id]);
        }
        $d = FirmPresenter::detail($c->load(['sector', 'photos']), $user, null, true);
        return response()->json(['contact' => $d['contact'] ?? null]);
    }
}
