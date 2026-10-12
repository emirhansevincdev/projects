<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\ProfileView;
use App\Models\Kv\SearchLog;
use App\Services\Kv\Metrics;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/** php artisan kervea:analytics-prune */
class AnalyticsPruneTest extends KvTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-10-11 03:00:00');
        config(['kervea.analytics.retention_days' => 400, 'kervea.analytics.search_log_retention_days' => 90]);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function seed_rows(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        Metrics::incOn($c->id, 'profile_view', Carbon::today()->subDays(401), 1);      // expired
        Metrics::incOn($c->id, 'profile_view', Carbon::today()->subDays(399), 1);      // kept
        Metrics::incOn($c->id, 'profile_view', Carbon::today(), 1);                    // kept
        ProfileView::create(['company_id' => $c->id, 'viewer_key' => 'a', 'created_at' => Carbon::now()->subDays(401)]);
        ProfileView::create(['company_id' => $c->id, 'viewer_key' => 'b', 'created_at' => Carbon::now()->subDays(100)]);   // kept: views live as long as the counters
        SearchLog::create(['q' => 'old', 'created_at' => Carbon::now()->subDays(91)]);                                    // expired
        SearchLog::create(['q' => 'fresh', 'created_at' => Carbon::now()->subDays(89)]);                                  // kept
    }

    public function test_it_deletes_only_rows_past_their_retention(): void
    {
        $this->seed_rows();
        $this->artisan('kervea:analytics-prune')->assertExitCode(0);

        $this->assertSame([Carbon::today()->subDays(399)->toDateString(), Carbon::today()->toDateString()],
            DB::table('kv_metrics_daily')->orderBy('day')->pluck('day')->map(fn ($d) => substr($d, 0, 10))->all());
        $this->assertSame(['b'], ProfileView::pluck('viewer_key')->all());
        $this->assertSame(['fresh'], SearchLog::pluck('q')->all());
    }

    public function test_a_dry_run_only_counts(): void
    {
        $this->seed_rows();
        $this->artisan('kervea:analytics-prune', ['--dry-run' => true])->assertExitCode(0);
        $this->assertSame(3, DB::table('kv_metrics_daily')->count());
        $this->assertSame(2, ProfileView::count());
        $this->assertSame(2, SearchLog::count());
    }

    public function test_retention_comes_from_config_and_the_command_is_repeatable(): void
    {
        $this->seed_rows();
        config(['kervea.analytics.retention_days' => 30, 'kervea.analytics.search_log_retention_days' => 7]);
        $this->artisan('kervea:analytics-prune')->assertExitCode(0);
        $this->assertSame(1, DB::table('kv_metrics_daily')->count());                 // only today's
        $this->assertSame(0, ProfileView::count());
        $this->assertSame(0, SearchLog::count());
        $this->artisan('kervea:analytics-prune')->assertExitCode(0);                  // nothing left to do, still fine
        $this->assertSame(1, DB::table('kv_metrics_daily')->count());
    }

    public function test_a_big_backlog_is_removed_in_slices(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        $rows = [];
        for ($i = 0; $i < 5200; $i++) {
            $rows[] = ['company_id' => $c->id, 'viewer_key' => 'k', 'source' => 'detail', 'created_at' => Carbon::now()->subDays(500)];
        }
        foreach (array_chunk($rows, 500) as $chunk) {
            DB::table('kv_profile_views')->insert($chunk);
        }
        $this->artisan('kervea:analytics-prune')->assertExitCode(0);
        $this->assertSame(0, ProfileView::count());
    }
}
