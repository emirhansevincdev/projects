<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\User;
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
        $plan = $u->kv_plan ?? 'free';
        if ($plan !== 'free' && $u->kv_plan_until && $u->kv_plan_until->isPast()) return 'free';
        return $plan;
    }

    public static function isPro(?User $u): bool
    {
        return in_array(self::viewerPlan($u), ['pro', 'enterprise'], true);
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
     * $locked => name/country/hs/etc. are masked server-side so scraping the JSON yields nothing.
     */
    public static function card(Company $c, ?int $score, bool $locked): array
    {
        $dirOut = $c->direction === 'IMP' ? 'IMP' : ($c->direction === 'EXP' ? 'EXP' : 'BOTH');
        $base = [
            'id' => $c->slug,
            'locked' => $locked,
            'uyum' => $score,
            'dir' => $dirOut,
            'sec' => $c->sector?->meta_idx,
            'sec_id' => $c->sector_id,
        ];

        if ($locked) {
            return $base + [
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

    /** Full detail shape. Contact block depends on viewer plan + the firm's own consent. */
    public static function detail(Company $c, ?User $viewer, ?int $score = null, bool $revealed = false): array
    {
        $isOwner = $viewer && $c->user_id === $viewer->id;
        $isAdmin = $viewer && (int) $viewer->role === 1;
        // Contact data leaves the server only for the owner, an admin, or an explicit (quota-counted) reveal.
        $canContact = $isOwner || $isAdmin || ($revealed && self::isPro($viewer) && $c->hasConsent('contact_visibility'));

        $out = self::card($c, $score, false) + [];
        $out += [
            'nm_en' => $c->name_en,
            'desc' => $c->description,
            'certs' => $c->certificates,
            'products' => $c->products,
            'city' => $c->city,
            'emp' => $c->employees,
            'tem' => $c->rep_name,
            'temtitle' => $c->rep_title,
            'cover' => self::fileUrl($c->cover_path),
            'photos' => $c->photos->take(5)->map(fn ($p) => self::fileUrl($p->path))->values()->all(),
            'socials' => self::publicSocials($c),
            'verified' => (bool) $c->is_verified,
            'mine' => (bool) $isOwner,
            'contact_locked' => ! $canContact,
            'contact_consent' => $c->hasConsent('contact_visibility'),
        ];
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
