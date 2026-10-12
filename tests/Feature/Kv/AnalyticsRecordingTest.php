<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\ProfileView;
use App\Models\Kv\SearchLog;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\AnalyticsRecorder;
use App\Services\Kv\Metrics;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/** What gets counted (and what must not): profile visits, search impressions, search log, contact reveals. */
class AnalyticsRecordingTest extends KvTestCase
{
    private const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-10-11 12:00:00');
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function guest(): void
    {
        $this->app['auth']->forgetGuards();
    }

    /** One page view as a given browser (ip + user agent). */
    private function open(string $slug, string $ip = '203.0.113.7', string $ua = self::UA, array $headers = [], string $query = '')
    {
        return $this->withServerVariables(['REMOTE_ADDR' => $ip])
            ->withHeaders(['User-Agent' => $ua] + $headers)
            ->getJson('/kv/firms/'.$slug.$query);
    }

    private function views(Company $c): int
    {
        return ProfileView::where('company_id', $c->id)->count();
    }

    private function metric(Company $c, string $metric): int
    {
        return Metrics::total($c->id, $metric, '2026-10-01', '2026-10-31');
    }

    private function teammate(Company $c, string $role = 'sales'): User
    {
        $u = new User(['name' => ucfirst($role), 'email' => "$role@team.test", 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $u->email, 'role' => $role, 'perms' => null, 'status' => 'active']);
        return $u;
    }

    private function pro(User $u): User
    {
        $u->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addYear()])->save();
        return $u;
    }

    // ───────────────────────── profile views ─────────────────────────

    public function test_a_guest_visit_is_counted_once_per_window_and_the_viewer_is_never_stored_raw(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');

        $this->open($c->slug, '203.0.113.7', self::UA, ['CF-IPCountry' => 'DE'])->assertOk();
        $this->assertSame(1, $this->views($c));
        $this->assertSame(1, $this->metric($c, 'profile_view'));

        $row = ProfileView::first();
        $this->assertNull($row->viewer_company_id);
        $this->assertSame('de', $row->viewer_country);
        $this->assertSame('detail', $row->source);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/', $row->viewer_key);
        $stored = json_encode($row->getAttributes());
        $this->assertStringNotContainsString('203.0.113.7', $stored);
        $this->assertStringNotContainsString('Mozilla', $stored);
        $this->assertStringNotContainsString('Chrome', $stored);

        $this->open($c->slug, '203.0.113.7', self::UA, ['CF-IPCountry' => 'DE'])->assertOk();      // reload, same viewer
        $this->assertSame(1, $this->views($c));
        $this->assertSame(1, $this->metric($c, 'profile_view'));

        Carbon::setTestNow(Carbon::now()->addMinutes(29));
        $this->open($c->slug)->assertOk();
        $this->assertSame(1, $this->views($c), 'still inside the 30 minute window');

        Carbon::setTestNow(Carbon::now()->addMinutes(2));                                           // 31 minutes after the first visit
        $this->open($c->slug)->assertOk();
        $this->assertSame(2, $this->views($c));
        $this->assertSame(2, $this->metric($c, 'profile_view'));
    }

    public function test_other_browsers_are_other_viewers_and_unique_viewers_are_distinguishable(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        $this->open($c->slug, '203.0.113.7')->assertOk();
        $this->open($c->slug, '203.0.113.8')->assertOk();                                           // other ip
        $this->open($c->slug, '203.0.113.7', 'Mozilla/5.0 (Macintosh) Firefox/120')->assertOk();    // same ip, other browser
        $this->assertSame(3, $this->views($c));
        $this->assertSame(3, ProfileView::where('company_id', $c->id)->distinct()->count('viewer_key'));
    }

    public function test_the_owner_team_members_and_admins_never_count(): void
    {
        [$owner, $c] = $this->member('Target Co', 't@t.test');
        $mate = $this->teammate($c, 'sales');
        $admin = $this->admin();

        foreach ([$owner, $mate, $admin] as $who) {
            $this->actingAs($who);
            $this->open($c->slug)->assertOk();
        }
        $this->assertSame(0, $this->views($c));
        $this->assertSame(0, $this->metric($c, 'profile_view'));
    }

    public function test_a_member_visit_is_identified_by_company_a_pending_applicant_is_not(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        [$visitor, $vc] = $this->member('Visitor Co', 'v@v.test', ['country_cc' => 'fr']);
        $this->actingAs($visitor);
        $this->open($c->slug)->assertOk();
        $row = ProfileView::first();
        $this->assertSame($vc->id, $row->viewer_company_id);
        $this->assertSame('fr', $row->viewer_country);

        [$pendingUser, $pc] = $this->member('Pending Co', 'p@p.test');
        $pc->forceFill(['status' => 'pending'])->save();
        $this->actingAs($pendingUser);
        $this->open($c->slug)->assertOk();
        $second = ProfileView::orderByDesc('id')->first();
        $this->assertNull($second->viewer_company_id, 'an unapproved company is not identified');
        $this->assertNull($second->viewer_country);
        $this->assertSame(2, $this->views($c));
    }

    public function test_robots_prefetches_and_missing_user_agents_are_ignored(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        $this->open($c->slug, '198.51.100.1', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')->assertOk();
        $this->open($c->slug, '198.51.100.2', 'curl/8.4.0')->assertOk();
        $this->open($c->slug, '198.51.100.3', 'python-requests/2.31')->assertOk();
        $this->open($c->slug, '198.51.100.4', self::UA, ['Sec-Purpose' => 'prefetch'])->assertOk();
        $this->open($c->slug, '198.51.100.5', '')->assertOk();
        $this->assertSame(0, $this->views($c));
    }

    public function test_an_unapproved_company_page_is_not_public_and_records_nothing(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        $c->forceFill(['status' => 'pending'])->save();
        $this->open($c->slug)->assertNotFound();
        $this->assertSame(0, ProfileView::count());
        $this->assertSame(0, DB::table('kv_metrics_daily')->count());
    }

    public function test_the_source_comes_from_src_or_a_same_origin_referrer(): void
    {
        $mk = fn (string $uri, array $server = []) => Request::create($uri, 'GET', [], [], [], $server + ['HTTP_HOST' => 'kervea.test']);
        $this->assertSame('detail', AnalyticsRecorder::sourceOf($mk('/kv/firms/x')));
        $this->assertSame('match', AnalyticsRecorder::sourceOf($mk('/kv/firms/x?src=match')));
        $this->assertSame('search', AnalyticsRecorder::sourceOf($mk('/kv/firms/x?src=SEARCH')));
        $this->assertSame('detail', AnalyticsRecorder::sourceOf($mk('/kv/firms/x?src=javascript:alert(1)')));
        $this->assertSame('match', AnalyticsRecorder::sourceOf($mk('/kv/firms/x', ['HTTP_REFERER' => 'https://kervea.test/panel'])));
        $this->assertSame('search', AnalyticsRecorder::sourceOf($mk('/kv/firms/x', ['HTTP_REFERER' => 'https://kervea.test/'])));
        $this->assertSame('detail', AnalyticsRecorder::sourceOf($mk('/kv/firms/x', ['HTTP_REFERER' => 'https://kervea.test/company/foo'])));
        $this->assertSame('detail', AnalyticsRecorder::sourceOf($mk('/kv/firms/x', ['HTTP_REFERER' => 'https://evil.test/panel'])));
    }

    public function test_the_source_is_stored_with_the_visit(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        $this->open($c->slug, '203.0.113.20', self::UA, [], '?src=match')->assertOk();
        $this->assertSame('match', ProfileView::first()->source);
    }

    public function test_recording_problems_never_break_the_page(): void
    {
        [, $c] = $this->member('Target Co', 't@t.test');
        Schema::drop('kv_profile_views');
        Schema::drop('kv_search_log');
        $this->open($c->slug)->assertOk()->assertJsonPath('id', $c->slug);
        $this->withHeaders(['User-Agent' => self::UA])->getJson('/kv/firms?q=pamuk')->assertOk();
    }

    // ───────────────────────── search impressions + search log ─────────────────────────

    private function firms(int $n): array
    {
        $out = [];
        for ($i = 1; $i <= $n; $i++) {
            $out[] = $this->member("Firma $i", "f$i@x.test")[1];
        }
        return $out;
    }

    private function list(string $query = '', string $ip = '203.0.113.50', string $ua = self::UA)
    {
        return $this->withServerVariables(['REMOTE_ADDR' => $ip])->withHeaders(['User-Agent' => $ua])->getJson('/kv/firms'.$query);
    }

    public function test_only_unlocked_cards_count_as_impressions_once_per_viewer_firm_and_day(): void
    {
        $firms = $this->firms(5);
        $items = $this->list()->assertOk()->json('items');
        $shown = collect($items)->reject(fn ($i) => $i['locked'])->pluck('id')->all();
        $this->assertCount(3, $shown);                                                      // guests: FREE_FIRM_LIMIT unmasked cards

        foreach ($firms as $f) {
            $this->assertSame(in_array($f->slug, $shown, true) ? 1 : 0, $this->metric($f, 'search_impression'), $f->name);
        }

        $this->list();                                                                      // reload: same viewer, same day
        foreach ($firms as $f) {
            $this->assertSame(in_array($f->slug, $shown, true) ? 1 : 0, $this->metric($f, 'search_impression'));
        }

        $this->list('', '203.0.113.51');                                                    // another viewer
        $first = collect($firms)->first(fn ($f) => in_array($f->slug, $shown, true));
        $this->assertSame(2, $this->metric($first, 'search_impression'));

        Carbon::setTestNow(Carbon::now()->addDay());                                        // next day: seen again
        $this->list();
        $this->assertSame(3, $this->metric($first, 'search_impression'));
    }

    public function test_only_the_first_result_page_and_never_the_own_company_counts(): void
    {
        $firms = $this->firms(2);
        $this->list('?page=2')->assertOk();
        $this->assertSame(0, DB::table('kv_metrics_daily')->where('metric', 'search_impression')->count());

        $owner = User::where('email', 'f1@x.test')->first();
        $this->actingAs($owner);
        $this->list();
        $this->assertSame(0, $this->metric($firms[0], 'search_impression'), 'own card is not an impression');
        $this->assertSame(1, $this->metric($firms[1], 'search_impression'));
    }

    public function test_a_pro_viewer_counts_every_unlocked_card_up_to_the_configured_cap(): void
    {
        config(['kervea.analytics.impression_cards' => 4]);
        [$viewer] = $this->member('Pro Viewer', 'pro@x.test');              // oldest id: listed last, outside the counted cards
        $this->firms(6);
        $this->actingAs($this->pro($viewer));
        $this->list()->assertOk()->assertJsonCount(7, 'items');
        $this->assertSame(4, DB::table('kv_metrics_daily')->where('metric', 'search_impression')->count());
    }

    public function test_a_search_with_criteria_is_logged_once_without_ip_or_user_and_empty_browsing_is_not(): void
    {
        $this->firms(2);
        $this->list()->assertOk();
        $this->assertSame(0, SearchLog::count(), 'no criteria, no search');

        $this->list('?q='.urlencode("  Pamuk   KUMAŞ 5208.12 "))->assertOk();
        $this->assertSame(1, SearchLog::count());
        $row = SearchLog::first();
        $this->assertSame('pamuk kumaş 5208.12', $row->q);
        $this->assertSame('520812', $row->hs);
        $this->assertNull($row->viewer_company_id);
        $this->assertArrayNotHasKey('ip', $row->getAttributes());
        $this->assertArrayNotHasKey('user_id', $row->getAttributes());
        $this->assertStringNotContainsString('203.0.113', json_encode($row->getAttributes()));

        $this->list('?q='.urlencode("pamuk kumaş 5208.12"))->assertOk();                    // same criteria again: one search
        $this->assertSame(1, SearchLog::count());

        $this->list('?cc=de&sec=10')->assertOk();                                           // country + sector criteria
        $this->assertSame(2, SearchLog::count());
        $last = SearchLog::orderByDesc('id')->first();
        $this->assertSame('de', $last->country_cc);
        $this->assertSame(\App\Models\Kv\Sector::where('meta_idx', 10)->whereNull('parent_id')->value('id'), $last->sector_id);
        $this->assertNull($last->q);
        $this->assertNull($last->hs);
    }

    public function test_a_members_search_remembers_the_company_not_the_person(): void
    {
        [$u, $co] = $this->member('Searcher', 's@x.test');
        $this->actingAs($u);
        $this->list('?q=pamuk')->assertOk();
        $this->assertSame($co->id, SearchLog::first()->viewer_company_id);
    }

    public function test_the_search_log_cannot_be_flooded(): void
    {
        config(['kervea.analytics.search_log_per_minute' => 3]);
        $this->firms(1);
        foreach (range(1, 9) as $i) {
            $this->list('?q=term'.$i)->assertOk();
        }
        $this->assertSame(3, SearchLog::count());

        Carbon::setTestNow(Carbon::now()->addMinutes(2));                                   // the minute is over
        $this->list('?q=other')->assertOk();
        $this->assertSame(4, SearchLog::count());
    }

    public function test_query_normalising_and_hs_extraction(): void
    {
        $this->assertNull(AnalyticsRecorder::normaliseQuery(null));
        $this->assertNull(AnalyticsRecorder::normaliseQuery("  \t\n "));
        $this->assertSame('a b', AnalyticsRecorder::normaliseQuery("A\x00 \x07B"));
        $this->assertSame(80, mb_strlen(AnalyticsRecorder::normaliseQuery(str_repeat('ğ', 120))));

        $this->assertSame('520812', AnalyticsRecorder::hsFromQuery('pamuk 5208.12'));
        $this->assertSame('5208', AnalyticsRecorder::hsFromQuery('5208'));
        $this->assertSame('010121', AnalyticsRecorder::hsFromQuery('0101.21 horse'));
        $this->assertSame('5208', AnalyticsRecorder::hsFromQuery('a4 5208,5209'));            // first code only
        $this->assertNull(AnalyticsRecorder::hsFromQuery('pamuk'));
        $this->assertNull(AnalyticsRecorder::hsFromQuery('52'));                              // too short to be a code
        $this->assertNull(AnalyticsRecorder::hsFromQuery('12345678901'));                     // too long
        $this->assertNull(AnalyticsRecorder::hsFromQuery(null));
    }

    // ───────────────────────── contact reveals ─────────────────────────

    public function test_a_new_contact_reveal_counts_for_the_revealed_company_only_once(): void
    {
        [, $target] = $this->member('Target Co', 't@t.test');
        $this->consent($target, 'contact_visibility');
        [$viewer] = $this->member('Viewer Co', 'v@v.test');
        $this->actingAs($this->pro($viewer));

        $this->postJson("/kv/firms/{$target->slug}/reveal")->assertOk();
        $this->assertSame(1, $this->metric($target, 'contact_reveal'));
        $this->postJson("/kv/firms/{$target->slug}/reveal")->assertOk();                    // already open: not a new reveal
        $this->assertSame(1, $this->metric($target, 'contact_reveal'));
    }

    public function test_refused_reveals_and_own_company_do_not_count(): void
    {
        [$owner, $own] = $this->member('Own Co', 'o@o.test');
        $this->consent($own, 'contact_visibility');
        [, $noConsent] = $this->member('No Consent', 'n@n.test');
        $this->actingAs($owner);
        $this->postJson("/kv/firms/{$own->slug}/reveal")->assertForbidden();               // free plan
        $this->pro($owner);
        $this->postJson("/kv/firms/{$noConsent->slug}/reveal")->assertForbidden();         // no consent
        $this->postJson("/kv/firms/{$own->slug}/reveal")->assertOk();                      // revealing yourself
        $this->assertSame(0, DB::table('kv_metrics_daily')->where('metric', 'contact_reveal')->count());
    }
}
