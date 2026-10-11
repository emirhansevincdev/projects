<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\ProfileView;
use App\Models\Kv\SearchLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;

/**
 * Turns public traffic (company page opened, search results shown, contact revealed) into analytics rows.
 *
 * Rules (so the numbers can be trusted):
 *  - nothing is counted for admins, for people working for the viewed company (owner AND team), crawlers, prefetches or non-GET requests;
 *  - the same viewer opening the same company again within 30 minutes is one visit (cache lock); a search impression is counted
 *    once per viewer, company and day;
 *  - a viewer is never stored raw: a signed-in member is the company id, anybody else a keyed hash of IP + user agent + month
 *    (viewer_key, 16 hex chars, only used to count unique viewers); the search log has no viewer identity beyond the company;
 *  - recording can never break the request: every public method swallows and logs errors.
 */
class AnalyticsRecorder
{
    private const BOT = '/bot\b|bot\/|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|preview|curl\/|wget|python-requests|python-urllib|httpclient|okhttp|go-http|libwww|java\/|node-fetch|axios\/|postman/i';
    private const SOURCES = ['detail', 'match', 'search'];

    /** A company page was opened (FirmController::show). */
    public static function profileView(Request $r, Company $c, string $source = 'detail'): void
    {
        try {
            if ($c->status !== Company::STATUS_APPROVED) {
                return;                                           // previews of pending / rejected profiles are not visits
            }
            $v = self::viewer($r);
            if (! $v || $v['own_id'] === (int) $c->id) {
                return;
            }
            $ttl = Carbon::now()->addMinutes(max(1, (int) config('kervea.analytics.view_dedupe_minutes', 30)));
            if (! Cache::add('kv-pv:'.$c->id.':'.$v['key'], 1, $ttl)) {
                return;                                           // same viewer, same company, within the window
            }
            $source = in_array($source, self::SOURCES, true) ? $source : 'detail';
            DB::transaction(function () use ($c, $v, $source) {
                ProfileView::create([
                    'company_id' => $c->id,
                    'viewer_company_id' => $v['company_id'],
                    'viewer_country' => $v['country'],
                    'viewer_key' => $v['key'],
                    'source' => $source,
                    'created_at' => Carbon::now(),
                ]);
                Metrics::add((int) $c->id, Metrics::PROFILE_VIEW);
            });
        } catch (\Throwable $e) {
            self::fail('profile view', $e);
        }
    }

    /**
     * The result list of GET /kv/firms was produced. $items are the cards exactly as sent to the browser (masked ones carry
     * locked = true and never count); $criteria = ['dir','cc','sec' (sector id),'q'].
     */
    public static function searchResults(Request $r, array $items, array $criteria): void
    {
        try {
            if ((int) $r->query('page', 1) > 1) {
                return;                                           // only what was on the first page was really seen
            }
            $v = self::viewer($r);
            if (! $v) {
                return;
            }
            self::impressions($v, $items);
            self::logSearch($v, $criteria);
        } catch (\Throwable $e) {
            self::fail('search results', $e);
        }
    }

    /** A contact block was opened for $c (FirmController::reveal, only for a NEW reveal). */
    public static function contactReveal(Request $r, Company $c): void
    {
        try {
            $user = $r->user();
            if (! $user || (int) $user->role === 1) {
                return;
            }
            $own = CompanyContext::forRequest($r)['company'] ?? null;
            if ($own && (int) $own->id === (int) $c->id) {
                return;
            }
            Metrics::inc((int) $c->id, Metrics::CONTACT_REVEAL);
        } catch (\Throwable $e) {
            self::fail('contact reveal', $e);
        }
    }

    // ───────────────────────────── internals ─────────────────────────────

    private static function impressions(array $v, array $items): void
    {
        $limit = max(1, (int) config('kervea.analytics.impression_cards', 24));
        $slugs = [];
        foreach (array_slice($items, 0, $limit) as $card) {
            if (empty($card['locked']) && ! empty($card['id']) && is_string($card['id'])) {
                $slugs[$card['id']] = true;
            }
        }
        if (! $slugs) {
            return;
        }
        $day = Carbon::now()->toDateString();
        $eod = Carbon::now()->endOfDay();
        $fresh = [];
        foreach (array_keys($slugs) as $slug) {
            if (Cache::add('kv-imp:'.$day.':'.$v['key'].':'.$slug, 1, $eod)) {
                $fresh[] = $slug;
            }
        }
        if (! $fresh) {
            return;
        }
        $ids = Company::approved()->whereIn('slug', $fresh)->pluck('id', 'slug');
        foreach ($ids as $id) {
            if ((int) $id !== $v['own_id']) {
                Metrics::inc((int) $id, Metrics::SEARCH_IMPRESSION);
            }
        }
    }

    private static function logSearch(array $v, array $criteria): void
    {
        $q = self::normaliseQuery($criteria['q'] ?? null);
        $cc = isset($criteria['cc']) && preg_match('/^[a-z]{2}$/i', (string) $criteria['cc']) ? strtolower($criteria['cc']) : null;
        $sector = ! empty($criteria['sec']) ? (int) $criteria['sec'] : null;
        if ($q === null && $cc === null && $sector === null) {
            return;                                               // browsing without any criteria is not a search
        }
        $hs = self::hsFromQuery($q);
        $sig = md5(json_encode([$q, $cc, $sector]));
        $window = Carbon::now()->addMinutes(max(1, (int) config('kervea.analytics.view_dedupe_minutes', 30)));
        if (! Cache::add('kv-sl:'.$v['key'].':'.$sig, 1, $window)) {
            return;                                               // same criteria repeated by the same viewer
        }
        $bucket = 'kv-slog:'.$v['key'];
        $perMinute = max(1, (int) config('kervea.analytics.search_log_per_minute', 10));
        if (RateLimiter::tooManyAttempts($bucket, $perMinute)) {
            return;                                               // a script cannot flood the log
        }
        RateLimiter::hit($bucket, 60);
        SearchLog::create([
            'q' => $q, 'hs' => $hs, 'sector_id' => $sector, 'country_cc' => $cc,
            'viewer_company_id' => $v['company_id'], 'created_at' => Carbon::now(),
        ]);
    }

    /** @return array{key:string,own_id:?int,company_id:?int,country:?string}|null null = do not count this request */
    private static function viewer(Request $r): ?array
    {
        if (! $r->isMethod('GET')) {
            return null;
        }
        $ua = trim((string) $r->userAgent());
        if ($ua === '' || preg_match(self::BOT, $ua)) {
            return null;
        }
        $purpose = strtolower((string) ($r->header('Sec-Purpose') ?: $r->header('Purpose')));
        if (str_contains($purpose, 'prefetch') || str_contains($purpose, 'prerender')) {
            return null;
        }
        $user = $r->user();
        if ($user) {
            if ((int) $user->role === 1) {
                return null;                                      // admins browsing is not a visit
            }
            $co = CompanyContext::forRequest($r)['company'] ?? null;
            $approved = $co && $co->status === Company::STATUS_APPROVED;
            return [
                'key' => self::hash($co ? 'c:'.$co->id : 'u:'.$user->id),
                'own_id' => $co ? (int) $co->id : null,
                'company_id' => $approved ? (int) $co->id : null,
                'country' => $approved ? self::cc($co->country_cc) : null,
            ];
        }
        return [
            'key' => self::hash('g:'.$r->ip().'|'.$ua.'|'.date('Y-m')),   // rotates monthly: a returning guest is a new unique each month
            'own_id' => null,
            'company_id' => null,
            'country' => self::cc($r->header((string) config('kervea.analytics.country_header', 'CF-IPCountry'))),
        ];
    }

    private static function hash(string $material): string
    {
        return substr(hash_hmac('sha256', $material, (string) config('app.key')), 0, 16);
    }

    private static function cc(mixed $v): ?string
    {
        $v = strtolower(trim((string) $v));
        return preg_match('/^[a-z]{2}$/', $v) && ! in_array($v, ['xx', 't1'], true) ? $v : null;
    }

    /** lower-case, single spaces, no control characters, at most 80 characters; null when nothing is left. */
    public static function normaliseQuery(?string $q): ?string
    {
        if ($q === null) {
            return null;
        }
        $q = preg_replace('/[\p{C}]+/u', ' ', $q) ?? '';
        $q = preg_replace('/\s+/u', ' ', mb_strtolower(trim($q))) ?? '';
        $q = trim(mb_substr($q, 0, 80));
        return $q === '' ? null : $q;
    }

    /** Digits of the first token that looks like an HS code (4–10 digits, optional dots): "pamuk 5208.12" => "520812". */
    public static function hsFromQuery(?string $q): ?string
    {
        if ($q === null) {
            return null;
        }
        foreach (preg_split('/[\s,;]+/u', $q) ?: [] as $tok) {
            if (preg_match('/^\d[\d.]*$/', $tok)) {
                $d = str_replace('.', '', $tok);
                if (strlen($d) >= 4 && strlen($d) <= 10) {
                    return $d;
                }
            }
        }
        return null;
    }

    private static function fail(string $what, \Throwable $e): void
    {
        Log::warning('kv analytics: '.$what.' not recorded', ['error' => $e->getMessage()]);
    }
}
