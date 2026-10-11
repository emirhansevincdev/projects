<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\CreditLedger;
use App\Services\Kv\CreditService;
use App\Services\Kv\InsufficientCreditsException;
use Illuminate\Support\Facades\Mail;

class CreditServiceTest extends CreditsTestCase
{
    public function test_approving_an_application_grants_the_signup_credits_exactly_once(): void
    {
        Mail::fake();
        $this->postJson('/kv/applications', $this->payload())->assertCreated();
        $c = Company::firstOrFail();
        $this->assertSame(0, CreditService::balance($c->id));            // pending companies have nothing

        $this->actingAs($this->admin())->post("/admin/kervea/applications/{$c->id}/approve")->assertRedirect();
        $this->assertSame(50, CreditService::balance($c->id));
        $row = CreditLedger::where('company_id', $c->id)->sole();
        $this->assertSame('signup', $row->reason);
        $this->assertSame(50, $row->delta);
        $this->assertSame(50, $row->balance_after);
        $this->assertSame('signup:'.$c->id, $row->idempotency_key);

        // a second approval attempt is refused (not pending any more) and a second grant is a no-op
        $this->post("/admin/kervea/applications/{$c->id}/approve")->assertStatus(422);
        $this->assertFalse(CreditService::grantSignup($c->fresh())['applied']);
        $this->assertSame(50, CreditService::balance($c->id));
        $this->assertSame(1, CreditLedger::where('company_id', $c->id)->count());
    }

    public function test_rejected_and_suspended_flows_do_not_grant_and_re_approval_does_not_double_grant(): void
    {
        Mail::fake();
        $this->postJson('/kv/applications', $this->payload())->assertCreated();
        $c = Company::firstOrFail();
        $admin = $this->admin();
        $this->actingAs($admin)->post("/admin/kervea/applications/{$c->id}/reject", ['note' => 'eksik'])->assertRedirect();
        $this->assertSame(0, CreditService::balance($c->id));

        [, $other] = $this->member('Other', 'o@x.test');
        CreditService::grantSignup($other);
        $this->post("/admin/kervea/companies/{$other->id}/status", ['status' => 'suspended'])->assertRedirect();
        $this->post("/admin/kervea/companies/{$other->id}/status", ['status' => 'approved'])->assertRedirect();
        $this->assertSame(50, CreditService::balance($other->id));
    }

    public function test_backfill_command_credits_approved_companies_without_signup_row_and_is_idempotent(): void
    {
        [, $a] = $this->member('Alpha', 'a@x.test');
        [, $b] = $this->member('Beta', 'b@x.test');
        $pending = Company::create(['slug' => 'p', 'name' => 'Pending', 'tax_id' => '1', 'country_cc' => 'de', 'email' => 'p@x.test', 'phone' => '1', 'rep_name' => 'r']);
        $this->assertSame(0, CreditService::balance($a->id));

        $this->artisan('kervea:credits-backfill', ['--dry-run' => true])->expectsOutputToContain('2 firma')->assertSuccessful();
        $this->assertSame(0, CreditService::balance($a->id));            // dry run writes nothing

        $this->artisan('kervea:credits-backfill', ['--audit' => true])->expectsOutputToContain('2 firmaya 50')->assertSuccessful();
        $this->assertSame(50, CreditService::balance($a->id));
        $this->assertSame(50, CreditService::balance($b->id));
        $this->assertSame(0, CreditService::balance($pending->id));

        $this->artisan('kervea:credits-backfill')->expectsOutputToContain('0 firmaya')->assertSuccessful();
        $this->assertSame(50, CreditService::balance($a->id));
        $this->assertSame(1, CreditLedger::where('company_id', $a->id)->count());
    }

    public function test_balance_never_goes_negative_two_sequential_spends_exhaust_it(): void
    {
        [, $c] = $this->member();
        CreditService::grant($c->id, 2, 'purchase', ['key' => 'k-start']);
        $this->assertSame(1, CreditService::spend($c->id, 1, 'person_reveal', ['key' => 's1'])['balance']);
        $this->assertSame(0, CreditService::spend($c->id, 1, 'person_reveal', ['key' => 's2'])['balance']);
        try {
            CreditService::spend($c->id, 1, 'person_reveal', ['key' => 's3']);
            $this->fail('third spend must be refused');
        } catch (InsufficientCreditsException $e) {
            $this->assertSame(0, $e->balance);
            $this->assertSame(1, $e->needed);
        }
        $this->assertSame(0, CreditService::balance($c->id));
        $this->assertSame(3, CreditLedger::where('company_id', $c->id)->count());   // the refused spend left no row
        $this->assertSame(['sum' => 0, 'balance' => 0, 'ok' => true], CreditService::audit($c->id));

        // one spend bigger than the balance is refused as a whole
        CreditService::grant($c->id, 5, 'purchase');
        $this->expectException(InsufficientCreditsException::class);
        CreditService::spend($c->id, 6, 'person_reveal');
    }

    public function test_idempotency_keys_apply_a_grant_or_spend_only_once(): void
    {
        [, $c] = $this->member();
        $first = CreditService::grant($c->id, 100, 'purchase', ['key' => 'order:7:credits', 'ref_type' => 'order', 'ref_id' => 7]);
        $again = CreditService::grant($c->id, 100, 'purchase', ['key' => 'order:7:credits', 'ref_type' => 'order', 'ref_id' => 7]);
        $this->assertTrue($first['applied']);
        $this->assertFalse($again['applied']);
        $this->assertSame($first['entry']->id, $again['entry']->id);
        $this->assertSame(100, CreditService::balance($c->id));

        $s1 = CreditService::spend($c->id, 10, 'person_reveal', ['key' => 'reveal:1']);
        $s2 = CreditService::spend($c->id, 10, 'person_reveal', ['key' => 'reveal:1']);
        $this->assertTrue($s1['applied']);
        $this->assertFalse($s2['applied']);
        $this->assertSame(90, CreditService::balance($c->id));
        $this->assertSame(2, CreditLedger::where('company_id', $c->id)->count());
    }

    public function test_a_key_row_that_appeared_behind_our_back_is_treated_as_already_applied(): void
    {
        // simulates the loser of a race on an engine without row locks: the unique index (and the re-check) must save us
        [, $c] = $this->member();
        CreditLedger::create(['company_id' => $c->id, 'delta' => 10, 'balance_after' => 10, 'reason' => 'purchase', 'idempotency_key' => 'dup', 'created_at' => now()]);
        \DB::table('kv_companies')->where('id', $c->id)->update(['credit_balance' => 10]);
        $r = CreditService::grant($c->id, 10, 'purchase', ['key' => 'dup']);
        $this->assertFalse($r['applied']);
        $this->assertSame(10, CreditService::balance($c->id));
    }

    public function test_invalid_input_is_refused_before_anything_is_written(): void
    {
        [, $c] = $this->member();
        foreach ([[0, 'purchase'], [-5, 'purchase']] as [$amount, $reason]) {
            try { CreditService::grant($c->id, $amount, $reason); $this->fail('grant must refuse '.$amount); } catch (\InvalidArgumentException) { $this->assertTrue(true); }
        }
        $this->expectException(\InvalidArgumentException::class);
        CreditService::grant($c->id, 5, 'made_up_reason');
    }

    public function test_credits_belong_to_the_company_not_the_user_and_other_companies_are_untouched(): void
    {
        [, $a] = $this->member('A', 'a@x.test');
        [, $b] = $this->member('B', 'b@x.test');
        CreditService::grant($a->id, 30, 'purchase');
        $this->assertSame(30, CreditService::balance($a->id));
        $this->assertSame(0, CreditService::balance($b->id));
        $this->expectException(InsufficientCreditsException::class);
        CreditService::spend($b->id, 1, 'person_reveal');
    }

    public function test_packs_and_prices_come_from_config_with_derived_savings(): void
    {
        $packs = CreditService::packs();
        $this->assertSame([100, 500, 1000], array_column($packs, 'credits'));
        $this->assertSame([1000, 4500, 8500], array_column($packs, 'price_cents'));
        $this->assertSame([0, 10, 15], array_column($packs, 'save_pct'));
        $this->assertNull(CreditService::pack('250'));
        $this->assertSame(500, CreditService::pack('500')['credits']);
        config(['kervea.credits.packs' => [10 => 5]]);
        $this->assertSame(500, CreditService::pack(10)['price_cents']);
    }

    // ── member API ───────────────────────────────────────────────────────────────

    public function test_credits_endpoint_needs_login_and_an_approved_company(): void
    {
        $this->getJson('/kv/credits')->assertUnauthorized();
        $u = new \App\Models\User(['name' => 'X', 'email' => 'x@x.test', 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->save();
        $this->actingAs($u)->getJson('/kv/credits')->assertForbidden();
    }

    public function test_credits_endpoint_returns_balance_packs_and_a_trimmed_ledger_for_the_acting_company(): void
    {
        [$owner, $c] = $this->member();
        [, $other] = $this->member('Other', 'o@x.test');
        CreditService::grantSignup($c);
        CreditService::grant($other->id, 999, 'purchase');
        CreditService::spend($c->id, 1, 'person_reveal', ['meta' => ['channel' => 'email', 'secret' => 'must-not-leak']]);

        $res = $this->actingAs($owner)->getJson('/kv/credits')->assertOk();
        $res->assertJsonPath('balance', 49)->assertJsonPath('can_spend', true)->assertJsonPath('can_buy', true)
            ->assertJsonPath('costs.email', 1)->assertJsonPath('signup', 50)->assertJsonPath('pro_bonus', 100)
            ->assertJsonPath('packs.1.credits', 500)->assertJsonPath('packs.1.price_usd', 45);
        $this->assertCount(2, $res->json('ledger'));
        $this->assertSame('email', $res->json('ledger.0.channel'));
        $this->assertStringNotContainsString('must-not-leak', $res->getContent());
        $this->assertStringNotContainsString('999', $res->getContent());
    }

    public function test_credits_endpoint_respects_team_permissions(): void
    {
        [, $c] = $this->member();
        $matchesOnly = $this->teammate($c, 'ops', ['matches']);
        $sales = $this->teammate($c, 'sales');                                // matches, messages, people
        $billing = $this->teammate($c, 'ops', ['billing'], 'bill@team.test');

        $this->actingAs($matchesOnly)->getJson('/kv/credits')->assertForbidden();
        $this->actingAs($sales)->getJson('/kv/credits')->assertOk()->assertJsonPath('can_spend', true)->assertJsonPath('can_buy', false);
        $this->actingAs($billing)->getJson('/kv/credits')->assertOk()->assertJsonPath('can_spend', false)->assertJsonPath('can_buy', true);
    }

    public function test_public_pack_list_is_available_to_guests_without_company_data(): void
    {
        $res = $this->getJson('/kv/credits/packs')->assertOk();
        $res->assertJsonPath('packs.0.credits', 100)->assertJsonMissingPath('balance')->assertJsonMissingPath('ledger');
    }

    // ── admin ────────────────────────────────────────────────────────────────────

    public function test_admin_pages_are_admin_only(): void
    {
        [$member, $c] = $this->member();
        $this->get('/admin/kervea/credits')->assertRedirect();
        $this->actingAs($member)->get('/admin/kervea/credits')->assertRedirect('/');
        $this->actingAs($member)->post("/admin/kervea/credits/{$c->id}/adjust", ['delta' => 100, 'reason' => 'free money', 'idem' => str_repeat('a', 20)])->assertRedirect('/');
        $this->assertSame(0, CreditService::balance($c->id));
    }

    public function test_admin_lists_companies_with_balances_and_shows_the_ledger(): void
    {
        [, $c] = $this->member('Alpha Gıda', 'a@x.test');
        CreditService::grantSignup($c);
        $admin = $this->admin();
        $this->actingAs($admin)->get('/admin/kervea/credits')->assertOk()->assertSee('Alpha Gıda')->assertSee('Krediler');
        $this->get('/admin/kervea/credits?q=alpha')->assertOk()->assertSee('Alpha Gıda');
        $this->get('/admin/kervea/credits?q=zzz-none')->assertOk()->assertDontSee('Alpha Gıda');
        $this->get("/admin/kervea/credits/{$c->id}")->assertOk()->assertSee('Üyelik hediyesi')->assertSee('Manuel düzeltme');
    }

    public function test_admin_adjustment_needs_a_reason_cannot_go_below_zero_and_is_not_applied_twice(): void
    {
        [, $c] = $this->member();
        CreditService::grantSignup($c);
        $admin = $this->admin();
        $this->actingAs($admin);
        $idem = bin2hex(random_bytes(12));
        $url = "/admin/kervea/credits/{$c->id}/adjust";

        $this->post($url, ['delta' => 10, 'reason' => '', 'idem' => $idem])->assertSessionHasErrors('reason');
        $this->post($url, ['delta' => 10, 'reason' => 'abc', 'idem' => $idem])->assertSessionHasErrors('reason');
        $this->post($url, ['delta' => 0, 'reason' => 'sıfır değişim', 'idem' => $idem])->assertSessionHasErrors('delta');
        $this->post($url, ['delta' => 'x', 'reason' => 'geçersiz sayı', 'idem' => $idem])->assertSessionHasErrors('delta');
        $this->post($url, ['delta' => 999999, 'reason' => 'çok büyük', 'idem' => $idem])->assertSessionHasErrors('delta');
        $this->post($url, ['delta' => -51, 'reason' => 'bakiyeden fazla düşüş', 'idem' => $idem])->assertSessionHasErrors('delta');
        $this->assertSame(50, CreditService::balance($c->id));

        $this->post($url, ['delta' => 25, 'reason' => 'Müşteri memnuniyeti jesti', 'idem' => $idem])->assertRedirect()->assertSessionHas('ok');
        $this->post($url, ['delta' => 25, 'reason' => 'Müşteri memnuniyeti jesti', 'idem' => $idem])->assertRedirect();      // double submit
        $this->assertSame(75, CreditService::balance($c->id));
        $this->post($url, ['delta' => -5, 'reason' => 'Yanlış verilen kredi geri alındı', 'idem' => bin2hex(random_bytes(12))])->assertRedirect();
        $this->assertSame(70, CreditService::balance($c->id));

        $e = CreditLedger::where('reason', 'admin_adjust')->orderBy('id')->first();
        $this->assertSame($admin->id, $e->user_id);
        $this->assertSame('Müşteri memnuniyeti jesti', $e->meta['note']);
        $this->assertSame(['sum' => 70, 'balance' => 70, 'ok' => true], CreditService::audit($c->id));
    }
}
