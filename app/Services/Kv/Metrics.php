<?php

namespace App\Services\Kv;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Daily per-company counters (table kv_metrics_daily, UNIQUE (company_id, day, metric)).
 *
 * Contract used by the other panel features (messaging, people/credits …):
 *     if (class_exists(\App\Services\Kv\Metrics::class)) { \App\Services\Kv\Metrics::inc($companyId, 'msg_received'); }
 *
 * Metric names: profile_view, search_impression, contact_reveal, person_reveal, msg_received, conv_started,
 * reply_count, reply_seconds (seconds added when a company answers; average first reply = reply_seconds / reply_count).
 *
 * Writing is ONE atomic statement (insert … on duplicate key update n = n + ? / on conflict … do update set n = n + ?), so
 * parallel requests never lose an increment and never need a read first. Counting must never break the product: inc() swallows
 * and logs database errors (add() is the strict variant).
 */
class Metrics
{
    public const PROFILE_VIEW = 'profile_view';
    public const SEARCH_IMPRESSION = 'search_impression';
    public const CONTACT_REVEAL = 'contact_reveal';
    public const PERSON_REVEAL = 'person_reveal';
    public const MSG_RECEIVED = 'msg_received';
    public const CONV_STARTED = 'conv_started';
    public const REPLY_COUNT = 'reply_count';
    public const REPLY_SECONDS = 'reply_seconds';

    private const TABLE = 'kv_metrics_daily';

    /** Add $by to today's counter. Never throws. */
    public static function inc(int $companyId, string $metric, int $by = 1): void
    {
        try {
            self::add($companyId, $metric, $by);
        } catch (\Throwable $e) {
            Log::warning('kv metrics: counter not written', ['metric' => $metric, 'error' => $e->getMessage()]);
        }
    }

    /** Same as inc() for a given day (back-fills, tests). Never throws. */
    public static function incOn(int $companyId, string $metric, CarbonInterface|string $day, int $by = 1): void
    {
        try {
            self::add($companyId, $metric, $by, $day);
        } catch (\Throwable $e) {
            Log::warning('kv metrics: counter not written', ['metric' => $metric, 'error' => $e->getMessage()]);
        }
    }

    /** Strict variant: throws on database errors (use inside a transaction that must stay consistent). */
    public static function add(int $companyId, string $metric, int $by = 1, CarbonInterface|string|null $day = null): void
    {
        if ($companyId <= 0 || $by <= 0 || ! preg_match('/^[a-z][a-z0-9_]{0,31}$/', $metric)) {
            return;                                                    // counters only ever go up; junk names never reach the table
        }
        $d = $day === null ? Carbon::now()->toDateString() : Carbon::parse($day)->toDateString();
        $conn = DB::connection();
        $conn->statement(self::upsertSql($conn->getDriverName(), $conn->getTablePrefix().self::TABLE), [$companyId, $d, $metric, $by, $by]);
    }

    /** The one-statement atomic upsert for a database driver (bindings: company_id, day, metric, n, n). Public so tests can pin both dialects. */
    public static function upsertSql(string $driver, string $table): string
    {
        if (in_array($driver, ['mysql', 'mariadb'], true)) {
            return "insert into {$table} (company_id, day, metric, n) values (?, ?, ?, ?) on duplicate key update n = n + ?";
        }
        // sqlite (>= 3.24) and pgsql
        return "insert into {$table} (company_id, day, metric, n) values (?, ?, ?, ?) on conflict (company_id, day, metric) do update set n = {$table}.n + ?";
    }

    /**
     * Zero-filled daily series: ['2026-10-01' => 3, '2026-10-02' => 0, …] for every day from $from to $to inclusive.
     * @return array<string,int>
     */
    public static function series(int $companyId, string $metric, CarbonInterface|string $from, CarbonInterface|string $to): array
    {
        [$f, $t] = self::bounds($from, $to);
        $rows = DB::table(self::TABLE)->where('company_id', $companyId)->where('metric', $metric)
            ->whereBetween('day', [$f, $t])->pluck('n', 'day');
        $out = [];
        foreach (self::days($f, $t) as $day) {
            $out[$day] = 0;
        }
        foreach ($rows as $day => $n) {
            $k = substr((string) $day, 0, 10);
            if (array_key_exists($k, $out)) {
                $out[$k] = (int) $n;
            }
        }
        return $out;
    }

    /** Sum of one metric over the (inclusive) period. */
    public static function total(int $companyId, string $metric, CarbonInterface|string $from, CarbonInterface|string $to): int
    {
        [$f, $t] = self::bounds($from, $to);
        return (int) DB::table(self::TABLE)->where('company_id', $companyId)->where('metric', $metric)
            ->whereBetween('day', [$f, $t])->sum('n');
    }

    /**
     * Sums of several metrics in one query: ['profile_view' => 12, 'contact_reveal' => 0, …] (every requested name present).
     * @param  list<string> $metrics
     * @return array<string,int>
     */
    public static function totals(int $companyId, array $metrics, CarbonInterface|string $from, CarbonInterface|string $to): array
    {
        [$f, $t] = self::bounds($from, $to);
        $out = array_fill_keys($metrics, 0);
        $rows = DB::table(self::TABLE)->where('company_id', $companyId)->whereIn('metric', $metrics)
            ->whereBetween('day', [$f, $t])->groupBy('metric')->selectRaw('metric, sum(n) as s')->get();
        foreach ($rows as $r) {
            $out[$r->metric] = (int) $r->s;
        }
        return $out;
    }

    /** First day any counter was written (tracking start), null while the table is empty. */
    public static function firstDay(): ?string
    {
        $d = DB::table(self::TABLE)->min('day');
        return $d ? substr((string) $d, 0, 10) : null;
    }

    /** @return array{0:string,1:string} */
    private static function bounds(CarbonInterface|string $from, CarbonInterface|string $to): array
    {
        $f = Carbon::parse($from)->toDateString();
        $t = Carbon::parse($to)->toDateString();
        return $f <= $t ? [$f, $t] : [$t, $f];
    }

    /** @return list<string> */
    public static function days(string $from, string $to): array
    {
        $out = [];
        foreach (CarbonPeriod::create($from, $to) as $d) {
            $out[] = $d->toDateString();
        }
        return $out;
    }
}
