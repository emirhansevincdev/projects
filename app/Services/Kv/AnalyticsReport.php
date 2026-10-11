<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\ProfileView;
use App\Models\Kv\SearchLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Everything the "Analiz" tab shows, computed for ONE company (the acting one, taken from CompanyContext by the controller).
 * Nothing about other companies leaves this class except aggregate averages (sector benchmark, only with enough peers) and,
 * for Premium owners, the identity of member companies that opened the profile.
 */
class AnalyticsReport
{
    public const RANGES = [7, 30, 90, 365];

    private const COUNTERS = [
        Metrics::PROFILE_VIEW, Metrics::SEARCH_IMPRESSION, Metrics::CONTACT_REVEAL, Metrics::PERSON_REVEAL,
        Metrics::MSG_RECEIVED, Metrics::CONV_STARTED, Metrics::REPLY_COUNT, Metrics::REPLY_SECONDS,
    ];

    public static function build(Company $co, bool $premium, int $range): array
    {
        if (! in_array($range, self::RANGES, true)) {
            $range = 30;
        }
        $id = (int) $co->id;
        $to = Carbon::today();
        $from = $to->copy()->subDays($range - 1);
        $pTo = $from->copy()->subDay();
        $pFrom = $pTo->copy()->subDays($range - 1);

        $first = Metrics::firstDay();
        // A "previous period" is only compared when tracking was already running for ALL of it; otherwise zeros would be fake growth.
        $prevOk = $first !== null && $pFrom->toDateString() > $first;

        $cur = Metrics::totals($id, self::COUNTERS, $from, $to);
        $prev = Metrics::totals($id, self::COUNTERS, $pFrom, $pTo);
        $totals = [];
        foreach ([Metrics::PROFILE_VIEW, Metrics::SEARCH_IMPRESSION, Metrics::CONTACT_REVEAL, Metrics::PERSON_REVEAL, Metrics::MSG_RECEIVED, Metrics::CONV_STARTED] as $m) {
            $totals[$m] = self::delta($cur[$m], $prev[$m], $prevOk);
        }

        $pv = Metrics::series($id, Metrics::PROFILE_VIEW, $from, $to);
        $imp = Metrics::series($id, Metrics::SEARCH_IMPRESSION, $from, $to);

        $fromTs = $from->copy()->startOfDay();
        $toTs = $to->copy()->endOfDay();

        return [
            'range' => $range,
            'from' => $from->toDateString(),
            'to' => $to->toDateString(),
            'previous' => ['from' => $pFrom->toDateString(), 'to' => $pTo->toDateString(), 'available' => $prevOk],
            'tracking_since' => $first,
            'premium' => $premium,
            'company' => [
                'name' => $co->name,
                'slug' => $co->slug,
                'sector_idx' => $co->sector?->meta_idx,
                'direction' => $co->direction,
            ],
            'totals' => $totals,
            'series' => [
                'days' => array_keys($pv),
                'profile_view' => array_values($pv),
                'search_impression' => array_values($imp),
            ],
            'unique_viewers' => self::uniqueViewers($id, $fromTs, $toTs),
            'sources' => self::sources($id, $fromTs, $toTs),
            'countries' => self::countries($id, $fromTs, $toTs),
            'visitors' => self::visitors($co, $premium, $fromTs, $toTs),
            'replies' => [
                'count' => $cur[Metrics::REPLY_COUNT],
                'avg_seconds' => self::avg($cur[Metrics::REPLY_SECONDS], $cur[Metrics::REPLY_COUNT]),
                'prev_avg_seconds' => $prevOk ? self::avg($prev[Metrics::REPLY_SECONDS], $prev[Metrics::REPLY_COUNT]) : null,
            ],
            'hs' => self::hsDemand($co, $fromTs, $toTs),
            'reach' => self::reach($co),
            'benchmark' => self::benchmark($co, $from, $to, $cur),
            'benchmark_min_peers' => max(2, (int) config('kervea.analytics.min_peers_for_benchmark', 5)),
        ];
    }

    /** @return array{n:int,prev:?int,delta:?int,pct:?float} */
    private static function delta(int $cur, int $prev, bool $prevOk): array
    {
        return [
            'n' => $cur,
            'prev' => $prevOk ? $prev : null,
            'delta' => $prevOk ? $cur - $prev : null,
            'pct' => $prevOk && $prev > 0 ? round(($cur - $prev) / $prev * 100, 1) : null,
        ];
    }

    private static function avg(int $seconds, int $count): ?int
    {
        return $count > 0 ? (int) round($seconds / $count) : null;
    }

    private static function views(int $companyId, Carbon $from, Carbon $to)
    {
        return ProfileView::where('company_id', $companyId)->whereBetween('created_at', [$from, $to]);
    }

    private static function uniqueViewers(int $companyId, Carbon $from, Carbon $to): int
    {
        return (int) self::views($companyId, $from, $to)->whereNotNull('viewer_key')->selectRaw('count(distinct viewer_key) as c')->value('c');
    }

    /** @return array{detail:int,match:int,search:int} */
    private static function sources(int $companyId, Carbon $from, Carbon $to): array
    {
        $out = ['detail' => 0, 'match' => 0, 'search' => 0];
        foreach (self::views($companyId, $from, $to)->selectRaw('source, count(*) as c')->groupBy('source')->get() as $r) {
            if (array_key_exists($r->source, $out)) {
                $out[$r->source] = (int) $r->c;
            }
        }
        return $out;
    }

    /** @return array{items:list<array{cc:string,n:int}>,unknown:int} top 8 viewer countries (codes; names are the UI's job) */
    private static function countries(int $companyId, Carbon $from, Carbon $to): array
    {
        $unknown = 0;
        $items = [];
        $rows = self::views($companyId, $from, $to)->selectRaw('viewer_country as cc, count(*) as n')->groupBy('viewer_country')->orderByDesc('n')->get();
        foreach ($rows as $r) {
            if ($r->cc === null || $r->cc === '') {
                $unknown += (int) $r->n;
            } elseif (count($items) < 8) {
                $items[] = ['cc' => strtolower($r->cc), 'n' => (int) $r->n];
            }
        }
        return ['items' => $items, 'unknown' => $unknown];
    }

    /**
     * Last 20 visits in the range. Free owners get the country and the kind only. Premium owners additionally get the name of
     * a member company - but only of an APPROVED company in the owner's own sector (companies of other sectors stay masked, like everywhere else).
     */
    private static function visitors(Company $co, bool $premium, Carbon $from, Carbon $to): array
    {
        $rows = self::views((int) $co->id, $from, $to)->orderByDesc('created_at')->orderByDesc('id')->limit(20)->get();
        $viewers = collect();
        if ($premium) {
            $ids = $rows->pluck('viewer_company_id')->filter()->unique()->values();
            if ($ids->isNotEmpty()) {
                $viewers = Company::approved()->whereIn('id', $ids)->get(['id', 'name', 'slug', 'country_cc', 'sector_id'])->keyBy('id');
            }
        }
        $items = $rows->map(function (ProfileView $v) use ($co, $premium, $viewers) {
            $member = $v->viewer_company_id !== null;
            $row = [
                'at' => $v->created_at?->toIso8601String(),
                'cc' => $v->viewer_country ? strtolower($v->viewer_country) : null,
                'kind' => $member ? 'member' : 'guest',
                'source' => $v->source,
                'company' => null,
                'masked' => false,
            ];
            if ($premium && $member) {
                $vc = $viewers->get($v->viewer_company_id);
                if ($vc && $co->sector_id !== null && (int) $vc->sector_id === (int) $co->sector_id) {
                    $row['company'] = ['name' => $vc->name, 'slug' => $vc->slug];
                    $row['cc'] = strtolower($vc->country_cc) ?: $row['cc'];
                } else {
                    $row['masked'] = true;               // another sector (or no longer listed): not named
                }
            }
            return $row;
        })->all();
        return ['locked' => ! $premium, 'items' => $items];
    }

    /**
     * Searches (with an HS code typed in) that would have found one of the company's HS codes. A search and a code match when the
     * leading digits agree on the shorter one, compared at 2/4/6 digits (search "5208" counts for the code 5208.12, search
     * "520812" for the code 52). Top 10 codes by searches.
     */
    private static function hsDemand(Company $co, Carbon $from, Carbon $to): array
    {
        $codes = [];
        foreach (preg_split('/[,;\s]+/', (string) $co->hs_codes) ?: [] as $raw) {
            $d = substr(preg_replace('/\D/', '', $raw), 0, 10);
            if (strlen($d) >= 2) {
                $codes[$d] = true;
            }
            if (count($codes) >= 30) {
                break;
            }
        }
        $codes = array_map('strval', array_keys($codes));      // numeric array keys come back as ints: keep codes strings

        $sectorSearches = $co->sector_id
            ? SearchLog::where('sector_id', $co->sector_id)->whereBetween('created_at', [$from, $to])->count()
            : 0;
        $out = ['has_codes' => (bool) $codes, 'items' => [], 'sector_searches' => $sectorSearches];
        if (! $codes) {
            return $out;
        }

        $searched = SearchLog::whereNotNull('hs')->whereBetween('created_at', [$from, $to])
            ->selectRaw('hs, count(*) as c')->groupBy('hs')->pluck('c', 'hs');
        $items = [];
        foreach ($codes as $code) {
            $a = self::level($code);
            $n = 0;
            foreach ($searched as $hs => $c) {
                $b = self::level((string) $hs);
                if (strlen($b) >= 2 && (str_starts_with($a, $b) || str_starts_with($b, $a))) {
                    $n += (int) $c;
                }
            }
            $items[] = ['code' => $code, 'searches' => $n];
        }
        usort($items, fn ($x, $y) => [$y['searches'], $x['code']] <=> [$x['searches'], $y['code']]);
        $out['items'] = array_slice($items, 0, 10);
        return $out;
    }

    /** First up to 6 digits, cut to an even length (2/4/6). */
    private static function level(string $digits): string
    {
        $d = substr($digits, 0, 6);
        return strlen($d) % 2 ? substr($d, 0, -1) : $d;
    }

    /**
     * Approved companies of the same sector that could be on the other side of a deal with this company
     * (exporter <-> importer; a company that does both, or has not said, fits every direction). Real counts, no scoring.
     * @return array{companies:int,countries:int,sector_companies:int}|null
     */
    private static function reach(Company $co): ?array
    {
        if (! $co->sector_id) {
            return null;
        }
        $base = Company::approved()->where('sector_id', $co->sector_id)->where('id', '!=', $co->id);
        $sectorTotal = (clone $base)->count();
        $q = clone $base;
        if (in_array($co->direction, ['EXP', 'IMP'], true)) {
            $want = $co->direction === 'EXP' ? 'IMP' : 'EXP';
            $q->where(fn ($w) => $w->where('direction', $want)->orWhere('direction', 'BOTH')->orWhereNull('direction'));
        }
        return [
            'companies' => (clone $q)->count(),
            'countries' => (int) (clone $q)->selectRaw('count(distinct country_cc) as c')->value('c'),
            'sector_companies' => $sectorTotal,
        ];
    }

    /**
     * Own totals against the AVERAGE of the other approved companies of the same sector (companies without activity count as 0).
     * Only returned when at least analytics.min_peers_for_benchmark peers exist, so no single company can be read off the average.
     * @param array<string,int> $cur
     */
    private static function benchmark(Company $co, Carbon $from, Carbon $to, array $cur): ?array
    {
        if (! $co->sector_id) {
            return null;
        }
        $peerIds = Company::approved()->where('sector_id', $co->sector_id)->where('id', '!=', $co->id)->pluck('id');
        $peers = $peerIds->count();
        if ($peers < max(2, (int) config('kervea.analytics.min_peers_for_benchmark', 5))) {
            return null;
        }
        $sums = [];
        foreach ($peerIds->chunk(500) as $chunk) {
            $rows = DB::table('kv_metrics_daily')->whereIn('company_id', $chunk->all())
                ->whereIn('metric', [Metrics::PROFILE_VIEW, Metrics::SEARCH_IMPRESSION])
                ->whereBetween('day', [$from->toDateString(), $to->toDateString()])
                ->groupBy('metric')->selectRaw('metric, sum(n) as s')->get();
            foreach ($rows as $r) {
                $sums[$r->metric] = ($sums[$r->metric] ?? 0) + (int) $r->s;
            }
        }
        $row = fn (string $m) => ['mine' => $cur[$m], 'avg' => round(($sums[$m] ?? 0) / $peers, 1)];
        return [
            'peers' => $peers,
            'profile_view' => $row(Metrics::PROFILE_VIEW),
            'search_impression' => $row(Metrics::SEARCH_IMPRESSION),
        ];
    }
}
