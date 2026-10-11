<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\ProfileView;
use App\Models\Kv\Sector;
use App\Models\Kv\SearchLog;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\Metrics;
use Carbon\Carbon;

/** GET /kv/analytics: shape, ranges, deltas, identity gating, benchmark, HS demand, permissions. */
class AnalyticsApiTest extends KvTestCase
{
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

    private function teammate(Company $c, string $role, ?array $perms = null, string $email = null): User
    {
        $email ??= "$role@team.test";
        $u = new User(['name' => ucfirst($role), 'email' => $email, 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $email, 'role' => $role, 'perms' => $perms, 'status' => 'active']);
        return $u;
    }

    private function pro(User $u): User
    {
        $u->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addYear()])->save();
        return $u;
    }

    private function visit(Company $c, array $over = [], ?string $at = null): ProfileView
    {
        return ProfileView::create($over + [
            'company_id' => $c->id, 'viewer_company_id' => null, 'viewer_country' => null,
            'viewer_key' => substr(md5(uniqid('', true)), 0, 16), 'source' => 'detail',
            'created_at' => $at ?? Carbon::now(),
        ]);
    }

    private function api(string $q = '')
    {
        return $this->getJson('/kv/analytics'.$q);
    }

    // ───────────────────────── gate ─────────────────────────

    public function test_guests_and_people_without_an_approved_company_are_refused(): void
    {
        $this->api()->assertUnauthorized();

        $u = new User(['name' => 'Nobody', 'email' => 'n@n.test', 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->save();
        $this->actingAs($u);
        $this->api()->assertForbidden()->assertJsonPath('error', 'no_company');

        [$pu, $pc] = $this->member('Pending Co', 'p@p.test');
        $pc->forceFill(['status' => 'pending'])->save();
        $this->actingAs($pu);
        $this->api()->assertForbidden()->assertJsonPath('error', 'no_company');
    }

    public function test_a_team_member_needs_the_analytics_permission(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        $sales = $this->teammate($c, 'sales');                    // role default: matches, messages, people
        $ops = $this->teammate($c, 'ops');                        // profile, docs
        $admin = $this->teammate($c, 'admin');                    // includes analytics
        $custom = $this->teammate($c, 'ops', ['analytics'], 'custom@team.test');

        foreach ([$sales, $ops] as $u) {
            $this->actingAs($u);
            $this->api()->assertForbidden()->assertJsonPath('error', 'forbidden')->assertJsonPath('need', 'analytics');
        }
        foreach ([$admin, $custom] as $u) {
            $this->actingAs($u);
            $this->api()->assertOk()->assertJsonPath('company.slug', $c->slug);
        }
    }

    public function test_nothing_in_the_request_can_select_another_company(): void
    {
        [$ua, $a] = $this->member('A Co', 'a@a.test');
        [, $b] = $this->member('B Co', 'b@b.test');
        Metrics::incOn($b->id, 'profile_view', Carbon::today(), 41);
        Metrics::incOn($a->id, 'profile_view', Carbon::today(), 2);
        $this->visit($b, ['viewer_country' => 'jp']);

        $this->actingAs($ua);
        $r = $this->api("?company_id={$b->id}&company={$b->slug}&slug={$b->slug}&owner={$b->user_id}")->assertOk();
        $r->assertJsonPath('company.slug', $a->slug);
        $r->assertJsonPath('totals.profile_view.n', 2);
        $this->assertSame([], $r->json('countries.items'));
        $this->assertStringNotContainsString('B Co', $r->getContent());
        $this->assertStringNotContainsString('"jp"', $r->getContent());
    }

    public function test_the_response_is_never_cached_and_the_range_is_validated(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($u);
        $this->assertStringContainsString('no-store', (string) $this->api()->assertOk()->headers->get('Cache-Control'));
        $this->api('?range=5')->assertStatus(422);
        $this->api('?range=abc')->assertStatus(422);
        $this->api('?range=30;drop')->assertStatus(422);
        $this->api('?range=')->assertOk()->assertJsonPath('range', 30);        // default
        $this->api()->assertOk()->assertJsonPath('range', 30);
    }

    public function test_the_endpoint_has_its_own_rate_limit_bucket(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($u);
        for ($i = 0; $i < 60; $i++) {
            $this->api()->assertOk();
        }
        $this->api()->assertStatus(429);
    }

    // ───────────────────────── shape, ranges, zero fill ─────────────────────────

    public function test_every_range_returns_a_zero_filled_series_ending_today(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test');
        Metrics::incOn($c->id, 'profile_view', '2026-10-11', 4);
        Metrics::incOn($c->id, 'profile_view', '2026-10-09', 1);
        Metrics::incOn($c->id, 'search_impression', '2026-10-10', 9);
        Metrics::incOn($c->id, 'profile_view', '2026-06-01', 6);               // only the 365 day range reaches this
        $this->actingAs($u);

        foreach ([7, 30, 90, 365] as $range) {
            $r = $this->api("?range=$range")->assertOk();
            $s = $r->json('series');
            $this->assertSame($range, $r->json('range'));
            $this->assertCount($range, $s['days']);
            $this->assertCount($range, $s['profile_view']);
            $this->assertCount($range, $s['search_impression']);
            $this->assertSame('2026-10-11', end($s['days']));
            $this->assertSame(Carbon::today()->subDays($range - 1)->toDateString(), $s['days'][0]);
            $this->assertSame('2026-10-11', $r->json('to'));
            $this->assertSame($s['days'][0], $r->json('from'));
            $this->assertSame(4, end($s['profile_view']));
            $this->assertSame(1, $s['profile_view'][$range - 3]);
            $this->assertSame(0, $s['profile_view'][$range - 2]);              // zero-filled, not missing
            $this->assertSame(9, $s['search_impression'][$range - 2]);
            $expected = 5 + ($range === 365 ? 6 : 0);
            $this->assertSame($expected, $r->json('totals.profile_view.n'));
            $this->assertSame($expected, array_sum($s['profile_view']));
            // consecutive days
            for ($i = 1; $i < $range; $i++) {
                $this->assertSame(Carbon::parse($s['days'][$i - 1])->addDay()->toDateString(), $s['days'][$i]);
            }
        }
    }

    public function test_the_payload_has_every_documented_key_even_for_an_empty_company(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($u);
        $r = $this->api()->assertOk();
        $r->assertJsonStructure([
            'range', 'from', 'to', 'previous' => ['from', 'to', 'available'], 'tracking_since', 'premium',
            'company' => ['name', 'slug', 'sector_idx', 'direction'],
            'totals' => ['profile_view' => ['n', 'prev', 'delta', 'pct'], 'search_impression', 'contact_reveal', 'person_reveal', 'msg_received', 'conv_started'],
            'series' => ['days', 'profile_view', 'search_impression'],
            'unique_viewers', 'sources' => ['detail', 'match', 'search'], 'countries' => ['items', 'unknown'],
            'visitors' => ['locked', 'items'], 'replies' => ['count', 'avg_seconds', 'prev_avg_seconds'],
            'hs' => ['has_codes', 'items', 'sector_searches'], 'reach', 'benchmark', 'benchmark_min_peers',
        ]);
        $r->assertJsonPath('totals.profile_view.n', 0)->assertJsonPath('unique_viewers', 0)->assertJsonPath('replies.avg_seconds', null)
            ->assertJsonPath('tracking_since', null)->assertJsonPath('previous.available', false)->assertJsonPath('premium', false);
    }

    // ───────────────────────── delta math ─────────────────────────

    public function test_change_against_the_previous_equal_period(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test');
        // 7 day range: current = 2026-10-05..11, previous = 2026-09-28..10-04
        Metrics::incOn($c->id, 'profile_view', '2026-10-11', 6);
        Metrics::incOn($c->id, 'profile_view', '2026-10-05', 6);              // current 12
        Metrics::incOn($c->id, 'profile_view', '2026-10-04', 4);              // previous 4 (+ the 09-28 row below)
        Metrics::incOn($c->id, 'profile_view', '2026-09-28', 4);              // previous 8, also the tracking start
        Metrics::incOn($c->id, 'profile_view', '2026-09-27', 50);             // before the previous period: not counted anywhere
        Metrics::incOn($c->id, 'contact_reveal', '2026-10-10', 1);            // previous 0 -> no percentage
        Metrics::incOn($c->id, 'msg_received', '2026-10-10', 3);
        Metrics::incOn($c->id, 'msg_received', '2026-10-01', 6);
        $this->actingAs($u);

        $r = $this->api('?range=7')->assertOk();
        $this->assertEquals(['n' => 12, 'prev' => 8, 'delta' => 4, 'pct' => 50.0], $r->json('totals.profile_view'));
        $this->assertSame(['n' => 1, 'prev' => 0, 'delta' => 1, 'pct' => null], $r->json('totals.contact_reveal'));
        $this->assertEquals(['n' => 3, 'prev' => 6, 'delta' => -3, 'pct' => -50.0], $r->json('totals.msg_received'));
        $this->assertSame(['from' => '2026-09-28', 'to' => '2026-10-04', 'available' => true], $r->json('previous'));    // tracking began 09-27, before the previous period
    }

    public function test_the_comparison_is_withheld_while_the_previous_period_was_not_fully_measured(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test');
        Metrics::incOn($c->id, 'profile_view', '2026-10-09', 3);               // tracking began 3 days ago
        $this->actingAs($u);
        $r = $this->api('?range=7')->assertOk();
        $this->assertFalse($r->json('previous.available'));
        $this->assertSame(['n' => 3, 'prev' => null, 'delta' => null, 'pct' => null], $r->json('totals.profile_view'));
        $this->assertSame('2026-10-09', $r->json('tracking_since'));
    }

    public function test_the_previous_period_counts_only_when_tracking_started_before_it(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test');
        Metrics::incOn($c->id, 'profile_view', '2026-09-20', 1);               // tracking start, before 09-28
        Metrics::incOn($c->id, 'profile_view', '2026-10-10', 5);
        $this->actingAs($u);
        $r = $this->api('?range=7')->assertOk();
        $this->assertTrue($r->json('previous.available'));
        $this->assertSame(['n' => 5, 'prev' => 0, 'delta' => 5, 'pct' => null], $r->json('totals.profile_view'));
    }

    // ───────────────────────── viewers, countries, identity gating ─────────────────────────

    private function seedVisitors(Company $owner, Company $sameSector, Company $otherSector): void
    {
        $this->visit($owner, ['viewer_country' => 'de', 'viewer_key' => 'aaaaaaaaaaaaaaaa'], '2026-10-11 09:00:00');
        $this->visit($owner, ['viewer_country' => 'de', 'viewer_key' => 'bbbbbbbbbbbbbbbb'], '2026-10-11 09:30:00');
        $this->visit($owner, ['viewer_country' => 'fr', 'viewer_key' => 'bbbbbbbbbbbbbbbb', 'source' => 'search'], '2026-10-10 09:30:00');   // same viewer, other day
        $this->visit($owner, ['viewer_country' => null, 'viewer_key' => 'cccccccccccccccc', 'source' => 'match'], '2026-10-10 10:00:00');
        $this->visit($owner, ['viewer_company_id' => $sameSector->id, 'viewer_country' => 'es', 'viewer_key' => 'dddddddddddddddd'], '2026-10-11 10:00:00');
        $this->visit($owner, ['viewer_company_id' => $otherSector->id, 'viewer_country' => 'it', 'viewer_key' => 'eeeeeeeeeeeeeeee'], '2026-10-11 11:00:00');
    }

    private function trio(): array
    {
        [$ou, $owner] = $this->member('Owner Co', 'o@o.test', ['country_cc' => 'tr']);
        [, $same] = $this->member('Same Sector Buyer', 's@s.test', ['country_cc' => 'es']);
        [, $other] = $this->member('Other Sector Buyer', 'x@x.test', ['country_cc' => 'it', 'sector_id' => Sector::where('meta_idx', 5)->value('id')]);
        $this->seedVisitors($owner, $same, $other);
        return [$ou, $owner, $same, $other];
    }

    public function test_a_free_owner_sees_counts_and_countries_but_never_who_visited(): void
    {
        [$ou] = $this->trio();
        $this->actingAs($ou);
        $r = $this->api()->assertOk();
        $r->assertJsonPath('premium', false)->assertJsonPath('visitors.locked', true);
        $this->assertCount(6, $r->json('visitors.items'));
        foreach ($r->json('visitors.items') as $v) {
            $this->assertNull($v['company']);
            $this->assertFalse($v['masked']);
        }
        $body = $r->getContent();
        foreach (['Same Sector Buyer', 'Other Sector Buyer', 's@s.test', 'x@x.test'] as $leak) {
            $this->assertStringNotContainsString($leak, $body);
        }
        $kinds = collect($r->json('visitors.items'))->countBy('kind')->all();
        $this->assertSame(2, $kinds['member']);
        $this->assertSame(4, $kinds['guest']);
        $this->assertSame(5, $r->json('unique_viewers'));                                                    // "bbbb…" came twice
        $this->assertSame(['detail' => 4, 'match' => 1, 'search' => 1], $r->json('sources'));
    }

    public function test_a_premium_owner_sees_member_companies_of_their_own_sector_only(): void
    {
        [$ou] = $this->trio();
        $this->pro($ou);
        $this->actingAs($ou);
        $r = $this->api()->assertOk();
        $r->assertJsonPath('premium', true)->assertJsonPath('visitors.locked', false);
        $items = collect($r->json('visitors.items'));

        $named = $items->firstWhere('company.name', 'Same Sector Buyer');
        $this->assertNotNull($named);
        $this->assertSame('member', $named['kind']);
        $this->assertSame('es', $named['cc']);
        $this->assertSame(Company::where('name', 'Same Sector Buyer')->value('slug'), $named['company']['slug']);

        $masked = $items->firstWhere('masked', true);
        $this->assertNotNull($masked, 'a member of another sector stays masked');
        $this->assertNull($masked['company']);
        $this->assertStringNotContainsString('Other Sector Buyer', $r->getContent());
        $this->assertCount(4, $items->where('kind', 'guest')->where('company', null));     // guests have no identity at all
        $this->assertSame(1, $items->where('masked', true)->count());
    }

    public function test_a_team_member_gets_the_plan_of_the_company_owner(): void
    {
        [$ou, $owner] = $this->trio();
        $admin = $this->teammate($owner, 'admin');
        $this->actingAs($admin);
        $this->api()->assertOk()->assertJsonPath('premium', false)->assertJsonPath('visitors.locked', true);
        $this->pro($ou);
        $this->actingAs($admin->fresh());
        $this->api()->assertOk()->assertJsonPath('premium', true)->assertJsonPath('visitors.locked', false);
    }

    public function test_top_countries_unique_viewers_and_sources_are_counted_in_the_range_only(): void
    {
        [$ou, $owner] = $this->trio();
        $this->visit($owner, ['viewer_country' => 'jp', 'viewer_key' => 'ffffffffffffffff'], '2026-08-01 10:00:00');    // 71 days ago
        $this->actingAs($ou);

        $r = $this->api('?range=30')->assertOk();
        $this->assertSame([['cc' => 'de', 'n' => 2], ['cc' => 'es', 'n' => 1], ['cc' => 'fr', 'n' => 1], ['cc' => 'it', 'n' => 1]], collect($r->json('countries.items'))->sortBy([['n', 'desc'], ['cc', 'asc']])->values()->all());
        $this->assertSame(1, $r->json('countries.unknown'));
        $this->assertSame(5, $r->json('unique_viewers'));
        $this->assertSame(['detail' => 4, 'match' => 1, 'search' => 1], $r->json('sources'));

        $r = $this->api('?range=90')->assertOk();
        $this->assertContains('jp', array_column($r->json('countries.items'), 'cc'));
        $this->assertSame(6, $r->json('unique_viewers'));

        $r = $this->api('?range=7')->assertOk();                                           // 10-05..10-11 covers all seeded rows but not 08-01
        $this->assertNotContains('jp', array_column($r->json('countries.items'), 'cc'));
    }

    public function test_only_the_last_twenty_visits_are_listed_newest_first(): void
    {
        [$ou, $owner] = $this->member('Owner Co', 'o@o.test');
        for ($i = 1; $i <= 25; $i++) {
            $this->visit($owner, ['viewer_country' => 'de', 'viewer_key' => sprintf('%016d', $i)], Carbon::now()->subMinutes(30 - $i));
        }
        $this->actingAs($ou);
        $items = $this->api()->assertOk()->json('visitors.items');
        $this->assertCount(20, $items);
        $times = array_column($items, 'at');
        $sorted = $times;
        rsort($sorted);
        $this->assertSame($sorted, $times);
    }

    // ───────────────────────── messages ─────────────────────────

    public function test_reply_time_is_an_average_and_null_without_replies(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($u);
        $this->api()->assertOk()->assertJsonPath('replies.avg_seconds', null)->assertJsonPath('replies.count', 0);

        Metrics::incOn($c->id, 'reply_count', Carbon::today(), 2);
        Metrics::incOn($c->id, 'reply_seconds', Carbon::today(), 1000);
        Metrics::incOn($c->id, 'msg_received', Carbon::today(), 5);
        Metrics::incOn($c->id, 'conv_started', Carbon::today(), 2);
        $r = $this->api()->assertOk();
        $r->assertJsonPath('replies.avg_seconds', 500)->assertJsonPath('replies.count', 2)
            ->assertJsonPath('totals.msg_received.n', 5)->assertJsonPath('totals.conv_started.n', 2);
    }

    // ───────────────────────── HS demand ─────────────────────────

    private function search(?string $hs, ?int $sector = null, string $at = '2026-10-10 10:00:00'): void
    {
        SearchLog::create(['q' => $hs, 'hs' => $hs ? preg_replace('/\D/', '', $hs) : null, 'sector_id' => $sector, 'created_at' => $at]);
    }

    public function test_hs_demand_matches_prefixes_at_two_four_and_six_digits(): void
    {
        [$u, $c] = $this->member('Acme', 'a@acme.test', ['hs_codes' => '5208, 9403.60, 8471']);
        $sector = $c->sector_id;
        $this->search('5208');                       // exact 4
        $this->search('520812');                     // longer search under the 4 digit code
        $this->search('5208.12');                    // same, dotted
        $this->search('5209');                       // other heading
        $this->search('940360');                     // exact 6
        $this->search('9403');                       // shorter search over the 6 digit code
        $this->search('9404');                       // other heading
        $this->search('5208', null, '2026-08-01 10:00:00');       // outside 30 days, inside 90
        $this->search(null, $sector);                // a sector-only search: no HS
        $this->actingAs($u);

        $r = $this->api('?range=30')->assertOk();
        $r->assertJsonPath('hs.has_codes', true);
        $items = collect($r->json('hs.items'))->keyBy('code');
        $this->assertSame(3, $items['5208']['searches']);
        $this->assertSame(2, $items['940360']['searches']);
        $this->assertSame(0, $items['8471']['searches']);
        $this->assertSame(['5208', '940360', '8471'], array_column($r->json('hs.items'), 'code'), 'sorted by searches');
        $this->assertSame(1, $r->json('hs.sector_searches'));

        $r90 = $this->api('?range=90')->assertOk();
        $this->assertSame(4, collect($r90->json('hs.items'))->keyBy('code')['5208']['searches']);
    }

    public function test_hs_demand_is_limited_to_ten_codes_and_empty_without_codes(): void
    {
        $codes = implode(', ', ['1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1101', '1102', '1103']);
        [$u, $c] = $this->member('Acme', 'a@acme.test', ['hs_codes' => $codes]);
        $this->search('1103');
        $this->actingAs($u);
        $r = $this->api()->assertOk();
        $this->assertCount(10, $r->json('hs.items'));
        $this->assertSame('1103', $r->json('hs.items.0.code'));

        [$u2] = $this->member('No Codes', 'n@n.test', ['hs_codes' => null]);
        $this->actingAs($u2);
        $this->api()->assertOk()->assertJsonPath('hs.has_codes', false)->assertJsonPath('hs.items', []);
    }

    public function test_hs_demand_never_exposes_the_search_texts_of_others(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test', ['hs_codes' => '5208']);
        SearchLog::create(['q' => 'secret buyer wants 5208', 'hs' => '5208', 'viewer_company_id' => null, 'created_at' => now()]);
        $this->actingAs($u);
        $r = $this->api()->assertOk();
        $this->assertSame(1, $r->json('hs.items.0.searches'));
        $this->assertStringNotContainsString('secret buyer', $r->getContent());
    }

    // ───────────────────────── reach + benchmark ─────────────────────────

    public function test_potential_reach_counts_complementary_approved_companies_of_the_same_sector(): void
    {
        [$u, $me] = $this->member('Exporter', 'e@e.test', ['direction' => 'EXP', 'country_cc' => 'tr']);
        $this->member('Importer DE', 'i1@i.test', ['direction' => 'IMP', 'country_cc' => 'de']);
        $this->member('Importer FR', 'i2@i.test', ['direction' => 'IMP', 'country_cc' => 'fr']);
        $this->member('Importer FR 2', 'i3@i.test', ['direction' => 'IMP', 'country_cc' => 'fr']);
        $this->member('Both ES', 'b@b.test', ['direction' => 'BOTH', 'country_cc' => 'es']);
        $this->member('Other Exporter', 'x@x.test', ['direction' => 'EXP', 'country_cc' => 'it']);                     // same side: not a counterpart
        [, $pend] = $this->member('Pending Importer', 'p@p.test', ['direction' => 'IMP', 'country_cc' => 'jp']);
        $pend->forceFill(['status' => 'pending'])->save();
        $this->member('Other Sector Importer', 'o@o.test', ['direction' => 'IMP', 'country_cc' => 'us', 'sector_id' => Sector::where('meta_idx', 5)->value('id')]);

        $this->actingAs($u);
        $reach = $this->api()->assertOk()->json('reach');
        $this->assertSame(['companies' => 4, 'countries' => 3, 'sector_companies' => 5], $reach);
    }

    public function test_the_sector_benchmark_appears_only_with_enough_peers_and_is_an_average(): void
    {
        [$u, $me] = $this->member('Me Co', 'me@me.test');
        Metrics::incOn($me->id, 'profile_view', '2026-10-10', 10);
        Metrics::incOn($me->id, 'search_impression', '2026-10-10', 30);
        $peers = [];
        for ($i = 1; $i <= 4; $i++) {
            $peers[] = $this->member("Peer $i", "p$i@p.test")[1];
        }
        $this->member('Alien', 'al@al.test', ['sector_id' => Sector::where('meta_idx', 5)->value('id')]);              // other sector: not a peer
        $this->actingAs($u);

        $r = $this->api()->assertOk();
        $this->assertNull($r->json('benchmark'), '4 peers < the minimum of 5');
        $this->assertSame(5, $r->json('benchmark_min_peers'));

        $peers[] = $this->member('Peer 5', 'p5@p.test')[1];
        Metrics::incOn($peers[0]->id, 'profile_view', '2026-10-09', 5);
        Metrics::incOn($peers[1]->id, 'profile_view', '2026-10-09', 5);
        Metrics::incOn($peers[2]->id, 'profile_view', '2026-10-01', 5);
        Metrics::incOn($peers[3]->id, 'search_impression', '2026-10-02', 10);
        Metrics::incOn($peers[3]->id, 'profile_view', '2026-08-01', 999);                                              // outside the range
        $b = $this->api()->assertOk()->json('benchmark');
        $this->assertSame(5, $b['peers']);
        $this->assertEquals(['mine' => 10, 'avg' => 3.0], $b['profile_view']);             // 15 over 5 peers
        $this->assertEquals(['mine' => 30, 'avg' => 2.0], $b['search_impression']);
        $this->assertStringNotContainsString('Peer', json_encode($b), 'only aggregates leave the server');
    }

    public function test_the_benchmark_threshold_is_configurable_but_never_below_two_peers(): void
    {
        [$u] = $this->member('Me Co', 'me@me.test');
        $this->member('Peer 1', 'p1@p.test');
        $this->actingAs($u);
        config(['kervea.analytics.min_peers_for_benchmark' => 1]);
        $this->assertNull($this->api()->json('benchmark'), 'one peer would reveal that firm exactly');
        $this->member('Peer 2', 'p2@p.test');
        $this->assertNotNull($this->api()->json('benchmark'));
    }
}
