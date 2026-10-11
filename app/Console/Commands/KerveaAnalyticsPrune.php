<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * php artisan kervea:analytics-prune [--dry-run]
 *
 * Deletes analytics rows past their retention (config kervea.analytics.*):
 *   kv_metrics_daily and kv_profile_views older than retention_days (default 400),
 *   kv_search_log older than search_log_retention_days (default 90).
 * Scheduled daily in routes/console.php (needs the usual "php artisan schedule:run" cron entry).
 */
class KerveaAnalyticsPrune extends Command
{
    protected $signature = 'kervea:analytics-prune {--dry-run : Only count, delete nothing}';
    protected $description = 'Süresi dolan analitik kayıtlarını siler (günlük sayaçlar, sayfa ziyaretleri, arama günlüğü)';

    private const CHUNK = 5000;

    public function handle(): int
    {
        $days = max(1, (int) config('kervea.analytics.retention_days', 400));
        $searchDays = max(1, (int) config('kervea.analytics.search_log_retention_days', 90));
        $dry = (bool) $this->option('dry-run');

        $jobs = [
            ['kv_metrics_daily', 'day', Carbon::today()->subDays($days)->toDateString()],
            ['kv_profile_views', 'created_at', Carbon::now()->subDays($days)],
            ['kv_search_log', 'created_at', Carbon::now()->subDays($searchDays)],
        ];
        foreach ($jobs as [$table, $col, $cut]) {
            $n = $dry ? DB::table($table)->where($col, '<', $cut)->count() : $this->purge($table, $col, $cut);
            $this->line(sprintf('%s: %d %s', $table, $n, $dry ? 'satır silinecek' : 'satır silindi'));
        }
        return self::SUCCESS;
    }

    /** Deletes in slices so a big back-log never holds a table lock for long. */
    private function purge(string $table, string $col, mixed $cut): int
    {
        $total = 0;
        do {
            $ids = DB::table($table)->where($col, '<', $cut)->orderBy('id')->limit(self::CHUNK)->pluck('id');
            if ($ids->isEmpty()) {
                break;
            }
            $total += DB::table($table)->whereIn('id', $ids->all())->delete();
        } while ($ids->count() === self::CHUNK);
        return $total;
    }
}
