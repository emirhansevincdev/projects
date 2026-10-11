<?php

namespace Tests\Feature\Kv;

use App\Services\Kv\Metrics;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/** Metrics: the daily counter table (atomic upsert), zero-filled series, totals; prune command wiring. */
class AnalyticsMetricsTest extends KvTestCase
{
    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_inc_creates_then_increments_one_row_per_company_day_and_metric(): void
    {
        [, $a] = $this->member('A Co', 'a@a.test');
        [, $b] = $this->member('B Co', 'b@b.test');
        Carbon::setTestNow('2026-10-11 10:00:00');

        Metrics::inc($a->id, 'profile_view');
        Metrics::inc($a->id, 'profile_view');
        Metrics::inc($a->id, 'profile_view', 5);
        Metrics::inc($a->id, 'contact_reveal');
        Metrics::inc($b->id, 'profile_view');
        Carbon::setTestNow('2026-10-12 00:00:01');
        Metrics::inc($a->id, 'profile_view');

        $this->assertSame(4, DB::table('kv_metrics_daily')->count());                       // a/pv/11, a/cr/11, b/pv/11, a/pv/12
        $this->assertSame(7, (int) DB::table('kv_metrics_daily')->where(['company_id' => $a->id, 'metric' => 'profile_view', 'day' => '2026-10-11'])->value('n'));
        $this->assertSame(1, (int) DB::table('kv_metrics_daily')->where(['company_id' => $a->id, 'metric' => 'profile_view', 'day' => '2026-10-12'])->value('n'));
        $this->assertSame(1, (int) DB::table('kv_metrics_daily')->where(['company_id' => $b->id, 'metric' => 'profile_view'])->value('n'));
    }

    public function test_junk_input_never_reaches_the_table(): void
    {
        [, $a] = $this->member('A Co', 'a@a.test');
        Metrics::inc($a->id, 'profile_view', 0);
        Metrics::inc($a->id, 'profile_view', -3);                    // counters only go up
        Metrics::inc($a->id, 'Bad Name; drop table x');
        Metrics::inc($a->id, '');
        Metrics::inc($a->id, str_repeat('a', 33));
        Metrics::inc(0, 'profile_view');
        $this->assertSame(0, DB::table('kv_metrics_daily')->count());
    }

    public function test_inc_never_throws_even_when_the_database_refuses(): void
    {
        Metrics::inc(987654, 'profile_view');                        // no such company: FK violation is swallowed and logged
        $this->assertSame(0, DB::table('kv_metrics_daily')->count());
        $this->expectException(\Throwable::class);
        Metrics::add(987654, 'profile_view');                        // the strict variant reports it
    }

    public function test_series_is_zero_filled_total_and_totals_sum_the_period(): void
    {
        [, $a] = $this->member('A Co', 'a@a.test');
        Metrics::incOn($a->id, 'profile_view', '2026-10-01', 3);
        Metrics::incOn($a->id, 'profile_view', '2026-10-03', 2);
        Metrics::incOn($a->id, 'profile_view', '2026-09-30', 100);   // outside
        Metrics::incOn($a->id, 'search_impression', '2026-10-02', 7);

        $s = Metrics::series($a->id, 'profile_view', '2026-10-01', '2026-10-04');
        $this->assertSame(['2026-10-01' => 3, '2026-10-02' => 0, '2026-10-03' => 2, '2026-10-04' => 0], $s);
        $this->assertSame(5, Metrics::total($a->id, 'profile_view', '2026-10-01', '2026-10-04'));
        $this->assertSame(['profile_view' => 5, 'search_impression' => 7, 'contact_reveal' => 0],
            Metrics::totals($a->id, ['profile_view', 'search_impression', 'contact_reveal'], '2026-10-01', '2026-10-04'));
        // swapped bounds are tolerated, a single day works
        $this->assertCount(4, Metrics::series($a->id, 'profile_view', '2026-10-04', '2026-10-01'));
        $this->assertSame(['2026-10-03' => 2], Metrics::series($a->id, 'profile_view', '2026-10-03', '2026-10-03'));
        $this->assertSame('2026-09-30', Metrics::firstDay());
    }

    public function test_series_never_mixes_companies(): void
    {
        [, $a] = $this->member('A Co', 'a@a.test');
        [, $b] = $this->member('B Co', 'b@b.test');
        Metrics::incOn($a->id, 'profile_view', '2026-10-01', 3);
        Metrics::incOn($b->id, 'profile_view', '2026-10-01', 9);
        $this->assertSame(3, Metrics::total($a->id, 'profile_view', '2026-10-01', '2026-10-01'));
        $this->assertSame(9, Metrics::total($b->id, 'profile_view', '2026-10-01', '2026-10-01'));
    }

    public function test_the_upsert_statement_is_pinned_for_both_dialects(): void
    {
        $my = Metrics::upsertSql('mysql', 'kv_metrics_daily');
        $this->assertSame($my, Metrics::upsertSql('mariadb', 'kv_metrics_daily'));
        $this->assertStringContainsString('on duplicate key update n = n + ?', $my);
        $this->assertSame(5, substr_count($my, '?'));

        $lite = Metrics::upsertSql('sqlite', 'kv_metrics_daily');
        $this->assertStringContainsString('on conflict (company_id, day, metric) do update set n = kv_metrics_daily.n + ?', $lite);
        $this->assertSame(5, substr_count($lite, '?'));
    }

    public function test_the_daily_prune_is_scheduled(): void
    {
        $cmds = collect(app(\Illuminate\Console\Scheduling\Schedule::class)->events())->map(fn ($e) => (string) $e->command);
        $this->assertTrue($cmds->contains(fn ($c) => str_contains($c, 'kervea:analytics-prune')), 'kervea:analytics-prune is not on the scheduler');
        $this->assertSame('0 0 * * *', collect(app(\Illuminate\Console\Scheduling\Schedule::class)->events())
            ->first(fn ($e) => str_contains((string) $e->command, 'kervea:analytics-prune'))->expression);
    }
}
