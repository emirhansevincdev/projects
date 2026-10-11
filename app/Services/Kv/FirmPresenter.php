<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Sector;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Turns Company rows into the exact shapes the Kervea front-end consumes,
 * and is the ONE place that decides what a given viewer may see.
 */
class FirmPresenter
{
    public const FREE_FIRM_LIMIT = 3;       // unmasked cards for guests / free members
    public const DAILY_REVEAL_LIMIT = 40;   // contact reveals per pro member per day

    public static function viewerPlan(?User $u): string
    {
        if (! $u) return 'guest';
        if ((int) $u->role === 1) return 'enterprise';
        $payer = CompanyContext::planOwner($u);          // team members use the subscription of their company's owner
        $plan = $payer->kv_plan ?? 'free';
        if ($plan !== 'free' && $payer->kv_plan_until && $payer->kv_plan_until->isPast()) return 'free';
        return $plan;
    }

    public static function isPro(?User $u): bool
    {
        return in_array(self::viewerPlan($u), ['pro', 'enterprise'], true);
    }

    /**
     * Everything the visibility rules need to know about the person looking, resolved ONCE per request.
     *  premium : admin, or a member of an approved company whose owner has an active Pro plan (team-aware)
     *  scoped  : a member of an approved company with a sector → sees firms of OTHER sectors only as locked cards
     *  tree    : ids of the member's sector and its sub-sectors
     * Guests and admins are never sector-scoped.
     */
    public static function viewer(?User $u, ?Request $r = null, ?array $ctx = null): array
    {
        $ctx ??= $u ? ($r ? CompanyContext::forRequest($r) : CompanyContext::resolve($u)) : null;
        $company = $ctx['company'] ?? null;
        $admin = $u && (int) $u->role === 1;
        $member = (bool) ($company && $company->status === Company::STATUS_APPROVED);
        $scoped = $member && ! $admin && $company->sector_id !== null;
        return [
            'user' => $u,
            'guest' => ! $u,
            'admin' => $admin,
            'member' => $member,
            'company_id' => $company?->id,
            'sector_id' => $member ? $company->sector_id : null,
            'premium' => $admin || ($member && self::isPro($u)),
            'scoped' => $scoped,
            'tree' => $scoped ? self::sectorTreeIds($company->sector_id) : [],
        ];
    }

    /** The sector's root plus every sub-sector of that root (a firm in any of them belongs to the same sector). @return list<int> */
    public static function sectorTreeIds(?int $sectorId): array
    {
        if (! $sectorId) return [];
        $parent = Sector::query()->whereKey($sectorId)->value('parent_id');
        $root = $parent ?: $sectorId;
        return array_values(array_unique(array_merge([(int) $root], Sector::where('parent_id', $root)->pluck('id')->map(fn ($i) => (int) $i)->all())));
    }

    /** Is this firm visible to the (scoped) viewer? Own firm always; otherwise same sector tree. Unscoped viewers see everything. */
    public static function inScope(array $viewer, Company $c): bool
    {
        if (! $viewer['scoped'] || $viewer['company_id'] === $c->id) return true;
        return $c->sector_id !== null && in_array((int) $c->sector_id, $viewer['tree'], true);
    }

    public static function fileUrl(?string $path): ?string
    {
        return $path ? Storage::disk('public')->url($path) : null;
    }

    /** Lower-case initials used for the logo placeholder. */
    public static function initials(string $name): string
    {
        $parts = preg_split('/\s+/u', trim($name)) ?: [];
        $a = mb_substr($parts[0] ?? '', 0, 1);
        $b = count($parts) > 1 ? mb_substr(end($parts), 0, 1) : mb_substr($parts[0] ?? '', 1, 1);
        return mb_strtoupper($a.$b);
    }

    /**
     * List-card shape (no contact data, ever).
     * $locked => name/country/hs/etc. are masked server-side so scraping the JSON yields nothing; the id is then an opaque
     * reference (a slug would spell the firm's name). $lockReason: 'plan' (Premium unlocks it) or 'sector' (other sector).
     */
    public static function card(Company $c, ?int $score, bool $locked, string $lockReason = 'plan'): array
    {
        $dirOut = $c->direction === 'IMP' ? 'IMP' : ($c->direction === 'EXP' ? 'EXP' : 'BOTH');
        $base = [
            'id' => $locked ? self::opaqueRef($c) : $c->slug,
            'locked' => $locked,
            'uyum' => $score,
            'dir' => $dirOut,
            'sec' => $c->sector?->meta_idx,
            'sec_id' => $c->sector_id,
        ];

        if ($locked) {
            return $base + [
                'lock' => $lockReason === 'sector' ? 'sector' : 'plan',
                'nm' => mb_substr($c->name, 0, 1).'•••••••••• '.mb_substr($c->name, -1),
                'lg' => '•', 'code' => '••••', 'dst' => '••••', 'fc' => '', 'cn_key' => '',
                'yr' => null, 'hs' => '••••', 'moq' => '••••', 'inc' => '••••', 'pay' => '••••', 'tags' => [],
                'logo' => null,
            ];
        }

        return $base + [
            'nm' => $c->name,
            'lg' => self::initials($c->name),
            'code' => 'TR',
            'dst' => strtoupper($c->country_cc),
            'fc' => strtolower($c->country_cc),
            'cn_key' => strtolower($c->country_cc),
            'yr' => $c->founded_year,
            'hs' => $c->hs_codes,
            'moq' => $c->moq,
            'inc' => $c->incoterm,
            'pay' => $c->payment_terms,
            'tags' => self::tags($c),
            'logo' => self::fileUrl($c->logo_path),
        ];
    }

    public static function tags(Company $c): array
    {
        if (! $c->products) return [];
        return array_slice(array_values(array_filter(array_map('trim', preg_split('/[,;\n]/u', $c->products)))), 0, 4);
    }

    /** Stable but unguessable stand-in for a locked firm's slug (the slug itself is derived from the firm name). */
    public static function opaqueRef(Company $c): string
    {
        return 'lk'.substr(hash('sha256', (string) config('app.key').'|firm-lock|'.$c->id), 0, 14);
    }

    /**
     * Full detail shape – the ONE place that decides what leaves the server about a firm.
     *  - everybody: the public profile (name, trade profile, description, photos, city …)
     *  - rep name/title + social links: the firm's own people, admins, and Premium members
     *  - e-mail / phone / web / address / WhatsApp: the firm's own people, admins, and a Premium member who revealed them
     *    (quota counted) AND only if the firm consented (contact_visibility)
     * Locked parts are not sent at all; explicit flags (contact_state, rep_locked, socials_locked) tell the UI what to draw.
     * $ctx: the viewer's CompanyContext when the caller already resolved it (saves queries).
     */
    public static function detail(Company $c, ?User $viewer, ?int $score = null, bool $revealed = false, ?array $ctx = null): array
    {
        $v = self::viewer($viewer, null, $ctx);
        $own = $v['company_id'] !== null && $v['company_id'] === $c->id;
        $privileged = $own || $v['admin'];
        $showRep = $privileged || $v['premium'];
        $consent = $c->hasConsent('contact_visibility');
        $canContact = $privileged || ($revealed && $v['premium'] && $consent);

        $out = self::card($c, $score, false) + [];
        $out += [
            'nm_en' => $c->name_en,
            'desc' => $c->description,
            'certs' => $c->certificates,
            'products' => $c->products,
            'city' => $c->city,
            'emp' => $c->employees,
            'cover' => self::fileUrl($c->cover_path),
            'photos' => $c->photos->take(5)->map(fn ($p) => self::fileUrl($p->path))->values()->all(),
            'verified' => (bool) $c->is_verified,
            'mine' => $own,
            'contact_locked' => ! $canContact,
            'contact_consent' => $consent,
            'rep_locked' => ! $showRep,
            'socials_locked' => ! $showRep,
            // open: data is in `contact` · login: guest · premium: signed in without Premium · reveal: Premium, one click away · declined: the firm did not consent
            'contact_state' => $canContact ? 'open' : ($v['guest'] ? 'login' : (! $v['premium'] ? 'premium' : ($consent ? 'reveal' : 'declined'))),
        ];
        if ($showRep) {
            $out['tem'] = $c->rep_name;
            $out['temtitle'] = $c->rep_title;
            $out['socials'] = self::publicSocials($c);
        }
        if ($canContact) {
            $out['contact'] = [
                'email' => $c->rep_email ?: $c->email,
                'phone' => $c->phone,
                'web' => $c->website,
                'addr' => $c->address,
                'wa' => $c->social['wa'] ?? null,
            ];
        }
        return $out;
    }

    /** Detail of a firm the viewer may not see (other sector): the masked card plus explicit flags, nothing else. */
    public static function lockedDetail(Company $c, string $reason = 'sector'): array
    {
        return self::card($c, null, true, $reason) + [
            'sector_locked' => $reason === 'sector',
            'contact_locked' => true, 'rep_locked' => true, 'socials_locked' => true,
            'contact_state' => $reason === 'sector' ? 'sector' : 'premium',
            'mine' => false,
        ];
    }

    /** LinkedIn / YouTube / etc. are public profile links; WhatsApp is contact data and stays gated. */
    public static function publicSocials(Company $c): array
    {
        $s = $c->social ?? [];
        unset($s['wa']);
        return array_filter($s);
    }

    /** Per-search match score. Null when the user gave no criteria (so the UI shows no fake score). */
    public static function score(Company $c, array $criteria): ?int
    {
        $any = false;
        $score = 40;
        if (! empty($criteria['sec'])) {
            $any = true;
            if ((int) $c->sector_id === (int) $criteria['sec'] || (int) $c->subsector_id === (int) $criteria['sec']) $score += 25;
        }
        if (! empty($criteria['cc'])) {
            $any = true;
            if (strtolower($c->country_cc) === strtolower($criteria['cc'])) $score += 15;
        }
        if (! empty($criteria['dir'])) {
            $any = true;
            if ($c->direction === $criteria['dir'] || $c->direction === 'BOTH') $score += 5;
        }
        if (! empty($criteria['q'])) {
            $any = true;
            $hay = mb_strtolower(implode(' ', [$c->name, $c->name_en, $c->products, $c->hs_codes, $c->description, $c->certificates]));
            $tokens = array_filter(preg_split('/[\s,;]+/u', mb_strtolower($criteria['q'])));
            $hits = 0;
            foreach ($tokens as $t) {
                if (mb_strlen($t) >= 2 && str_contains($hay, $t)) $hits++;
            }
            if ($tokens) $score += (int) round(15 * $hits / count($tokens));
        }
        if (! $any) return null;
        if ($c->is_verified) $score += 3;
        return min(99, $score);
    }
}
