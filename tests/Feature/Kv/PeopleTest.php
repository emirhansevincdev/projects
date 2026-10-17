<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\CreditLedger;
use App\Models\Kv\Person;
use App\Models\Kv\PersonReveal;
use App\Models\Kv\RemovalRequest;
use App\Services\Kv\CreditService;
use Illuminate\Support\Facades\Mail;

/** The "Kişiler" member API – sector scoping, paid reveal, permissions. Contact data never appears before a reveal. */
class PeopleTest extends CreditsTestCase
{
    /** A textile member (sector 10) with 50 credits. */
    private function viewer(): array
    {
        [$u, $c] = $this->member('Ege Tekstil', 'ege@x.test', ['sector_id' => $this->sec(10)]);
        CreditService::grantSignup($c);
        return [$u, $c];
    }

    // ── access ───────────────────────────────────────────────────────────────────

    public function test_people_need_login_an_approved_company_and_the_people_permission(): void
    {
        $this->getJson('/kv/people')->assertUnauthorized();
        $this->postJson('/kv/people/1/reveal', ['channel' => 'email'])->assertUnauthorized();

        [$owner, $c] = $this->viewer();
        $p = $this->person();
        $ops = $this->teammate($c, 'ops');                                   // profile, docs only
        $this->actingAs($ops)->getJson('/kv/people')->assertForbidden()->assertJsonPath('need', 'people');
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertForbidden();
        $sales = $this->teammate($c, 'sales');
        $this->actingAs($sales)->getJson('/kv/people')->assertOk();

        $c->forceFill(['status' => 'suspended'])->save();
        $this->actingAs($owner)->getJson('/kv/people')->assertForbidden();
    }

    public function test_free_members_can_use_people_with_credits_no_premium_needed(): void
    {
        [$owner, $c] = $this->viewer();
        $p = $this->person();
        $this->assertSame('free', \App\Services\Kv\FirmPresenter::viewerPlan($owner));
        $this->actingAs($owner)->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('value', 'mikko@nordic-kaluste.test');
    }

    // ── list ─────────────────────────────────────────────────────────────────────

    public function test_list_contains_only_other_sector_active_people_and_never_the_own_staff(): void
    {
        [$owner, $c] = $this->viewer();
        $other = $this->person(['name' => 'Furniture Fred']);
        $this->person(['name' => 'Same Sector Sam', 'sector_id' => $this->sec(10), 'company_name' => 'Ege Rakip']);
        $this->person(['name' => 'Own Staff Olga', 'company_id' => $c->id, 'company_name' => 'Ege Tekstil', 'sector_id' => $this->sec(9)]);
        $this->person(['name' => 'Namesake Nora', 'company_name' => 'EGE TEKSTIL', 'sector_id' => $this->sec(9)]);       // our own firm, unlinked, different casing
        $this->person(['name' => 'No Sector Nils', 'sector_id' => null]);
        $this->person(['name' => 'Gone Gina', 'sector_id' => $this->sec(3), 'status' => 'removed']);
        $this->person(['name' => 'Food Frida', 'sector_id' => $this->sec(3), 'email' => 'frida@food.test', 'phone' => null]);

        $res = $this->actingAs($owner)->getJson('/kv/people')->assertOk();
        $names = array_column($res->json('items'), 'name');
        sort($names);
        $this->assertSame(['Food Frida', 'Furniture Fred'], $names);
        $res->assertJsonPath('total', 2)->assertJsonPath('balance', 50)->assertJsonPath('costs.email', 1);
        $this->assertSame(['fi'], array_values(array_unique($res->json('countries'))));
    }

    public function test_list_never_contains_contact_data_before_a_reveal(): void
    {
        [$owner, $c] = $this->viewer();
        $this->person();
        $body = $this->actingAs($owner)->getJson('/kv/people')->assertOk()->getContent();
        foreach (['mikko@nordic-kaluste.test', '+358 40 123 4567', 'linkedin.com/in/mikko-v', 'nordic-kaluste.test'] as $leak) {
            $this->assertStringNotContainsString($leak, $body);
        }
        $item = json_decode($body, true)['items'][0];
        foreach (['email', 'phone', 'linkedin'] as $k) {
            $this->assertArrayNotHasKey($k, $item);
        }
        $this->assertTrue($item['has_email']);
        $this->assertTrue($item['has_phone']);
        $this->assertFalse($item['email_opened']);
        $this->assertFalse($item['phone_opened']);
        $this->assertSame('Mikko Virtanen', $item['name']);
        $this->assertSame('Nordic Kaluste Oy', $item['company']);
    }

    public function test_search_filters_and_paging(): void
    {
        [$owner] = $this->viewer();
        config(['kervea.people.page_size' => 5]);
        foreach (range(1, 12) as $i) {
            $this->person(['name' => sprintf('Kişi %02d', $i), 'company_name' => 'Firma '.sprintf('%02d', $i), 'email' => "k$i@p.test", 'department' => $i % 2 ? 'sales' : 'purchasing', 'country_cc' => $i > 6 ? 'de' : 'fi']);
        }
        $this->person(['name' => 'Özel Ünvanlı', 'title' => 'Head of Quantum Procurement', 'email' => 'q@p.test']);
        $this->actingAs($owner);

        $p1 = $this->getJson('/kv/people')->assertOk();
        $p1->assertJsonPath('total', 13)->assertJsonPath('pages', 3)->assertJsonPath('page', 1);
        $this->assertCount(5, $p1->json('items'));
        $this->assertCount(3, $this->getJson('/kv/people?page=3')->json('items'));
        $this->assertCount(0, $this->getJson('/kv/people?page=9')->json('items'));
        $this->assertSame([], array_intersect(array_column($p1->json('items'), 'id'), array_column($this->getJson('/kv/people?page=2')->json('items'), 'id')));

        $this->assertSame(['Özel Ünvanlı'], array_column($this->getJson('/kv/people?q=quantum')->json('items'), 'name'));         // title
        $this->assertSame(['Kişi 03'], array_column($this->getJson('/kv/people?q=firma 03')->json('items'), 'name'));              // company
        $this->assertSame(['Kişi 07'], array_column($this->getJson('/kv/people?q=Kişi 07')->json('items'), 'name'));               // name
        $this->getJson('/kv/people?q=%25')->assertJsonPath('total', 0);                                                            // wildcard characters are literals
        $this->getJson('/kv/people?dept=sales')->assertJsonPath('total', 6);
        $this->getJson('/kv/people?country=DE')->assertJsonPath('total', 6);
        $this->getJson('/kv/people?country=de&dept=purchasing&q=Kişi')->assertJsonPath('total', 3);

        foreach (['dept=hacker', 'country=deu', 'country=1', 'page=0', 'page=abc', 'page=-3'] as $bad) {
            $this->getJson('/kv/people?'.$bad)->assertStatus(422);
        }
        $this->getJson('/kv/people?q='.str_repeat('a', 121))->assertStatus(422);
    }

    // ── reveal ───────────────────────────────────────────────────────────────────

    public function test_reveal_costs_one_credit_returns_the_value_and_reopening_is_free(): void
    {
        [$owner, $c] = $this->viewer();
        $p = $this->person();
        $this->actingAs($owner);

        $r1 = $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk();
        $r1->assertJsonPath('value', 'mikko@nordic-kaluste.test')->assertJsonPath('credits_spent', 1)->assertJsonPath('balance', 49)->assertJsonPath('already', false);
        $this->assertSame(49, CreditService::balance($c->id));

        $r2 = $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk();
        $r2->assertJsonPath('value', 'mikko@nordic-kaluste.test')->assertJsonPath('credits_spent', 0)->assertJsonPath('balance', 49)->assertJsonPath('already', true);
        $this->assertSame(49, CreditService::balance($c->id));
        $this->assertSame(1, PersonReveal::count());

        $e = CreditLedger::where('reason', 'person_reveal')->sole();
        $this->assertSame(-1, $e->delta);
        $this->assertSame('person', $e->ref_type);
        $this->assertSame($p->id, $e->ref_id);
        $this->assertSame($owner->id, $e->user_id);
        $this->assertSame('email', $e->meta['channel']);
        $this->assertSame("reveal:{$c->id}:{$p->id}:email", $e->idempotency_key);

        // the phone is a separate channel with its own price
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'phone'])->assertOk()->assertJsonPath('value', '+358 40 123 4567')->assertJsonPath('balance', 48);
        $this->assertSame(['sum' => 48, 'balance' => 48, 'ok' => true], CreditService::audit($c->id));

        // the list now carries the values for the opened channels only
        $item = $this->getJson('/kv/people')->json('items.0');
        $this->assertTrue($item['email_opened']);
        $this->assertSame('mikko@nordic-kaluste.test', $item['email']);
        $this->assertSame('+358 40 123 4567', $item['phone']);
        $this->assertSame('https://linkedin.com/in/mikko-v', $item['linkedin']);
    }

    public function test_another_company_does_not_see_what_this_company_paid_for(): void
    {
        [$owner, $c] = $this->viewer();
        [$rival] = $this->member('Rival Co', 'rival@x.test', ['sector_id' => $this->sec(10)]);
        CreditService::grantSignup(\App\Models\Kv\Company::where('email', 'rival@x.test')->first());
        $p = $this->person();
        $this->actingAs($owner)->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk();

        $theirs = $this->actingAs($rival)->getJson('/kv/people')->assertOk();
        $this->assertStringNotContainsString('mikko@', $theirs->getContent());
        $this->assertFalse($theirs->json('items.0.email_opened'));
        $this->assertSame(50, CreditService::balance(\App\Models\Kv\Company::where('email', 'rival@x.test')->value('id')));
    }

    public function test_running_out_of_credits_is_refused_cleanly_and_nothing_is_written(): void
    {
        [$owner, $c] = $this->viewer();
        \DB::table('kv_companies')->where('id', $c->id)->update(['credit_balance' => 2]);
        CreditLedger::create(['company_id' => $c->id, 'delta' => 2, 'balance_after' => 2, 'reason' => 'purchase', 'created_at' => now()]);   // keep the ledger consistent
        \DB::table('kv_credit_ledger')->where('reason', 'signup')->delete();
        $a = $this->person(['name' => 'A', 'email' => 'a@p.test', 'phone' => '+1 555 0100 01']);
        $b = $this->person(['name' => 'B', 'email' => 'b@p.test', 'phone' => '+1 555 0100 02']);
        $this->actingAs($owner);

        $this->postJson("/kv/people/{$a->id}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('balance', 1);
        $this->postJson("/kv/people/{$b->id}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('balance', 0);
        $res = $this->postJson("/kv/people/{$a->id}/reveal", ['channel' => 'phone'])->assertStatus(402);
        $res->assertJsonPath('error', 'no_credits')->assertJsonPath('balance', 0)->assertJsonPath('needed', 1);
        $this->assertStringNotContainsString('555 0100', $res->getContent());
        $this->assertSame(0, CreditService::balance($c->id));
        $this->assertSame(2, PersonReveal::count());                                  // the refused attempt left no reveal row
        $this->assertSame(2, CreditLedger::where('reason', 'person_reveal')->count());

        // already opened channels stay readable for free at zero balance
        $this->postJson("/kv/people/{$a->id}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('already', true);
    }

    public function test_only_eligible_people_can_be_opened_and_unknown_ids_look_the_same(): void
    {
        [$owner, $c] = $this->viewer();
        $same = $this->person(['sector_id' => $this->sec(10), 'company_name' => 'Rakip Tekstil', 'email' => 's@p.test']);
        $own = $this->person(['company_id' => $c->id, 'email' => 'own@p.test']);
        $removed = $this->person(['email' => 'r@p.test', 'status' => 'removed']);
        $noSector = $this->person(['sector_id' => null, 'email' => 'n@p.test']);
        $this->actingAs($owner);
        foreach ([$same->id, $own->id, $removed->id, $noSector->id, 999999] as $id) {
            $this->postJson("/kv/people/$id/reveal", ['channel' => 'email'])->assertStatus(404)->assertJsonPath('error', 'not_found');
        }
        $this->assertSame(50, CreditService::balance($c->id));
        $this->assertSame(0, PersonReveal::count());
        $this->postJson('/kv/people/abc/reveal', ['channel' => 'email'])->assertNotFound();
    }

    public function test_channel_validation_and_missing_data_do_not_charge(): void
    {
        [$owner, $c] = $this->viewer();
        $p = $this->person(['phone' => null]);
        $this->actingAs($owner);
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'whatsapp'])->assertStatus(422);
        $this->postJson("/kv/people/{$p->id}/reveal", [])->assertStatus(422);
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => ['email']])->assertStatus(422);
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'phone'])->assertStatus(422)->assertJsonPath('error', 'no_data');
        $this->assertSame(50, CreditService::balance($c->id));
    }

    public function test_daily_reveal_limit_per_company_blocks_further_paid_reveals_but_not_reopening(): void
    {
        [$owner, $c] = $this->viewer();
        config(['kervea.people.daily_reveal_limit' => 2]);
        $ids = [];
        foreach (range(1, 3) as $i) {
            $ids[] = $this->person(['name' => "P$i", 'email' => "p$i@p.test"])->id;
        }
        $this->actingAs($owner);
        $this->postJson("/kv/people/{$ids[0]}/reveal", ['channel' => 'email'])->assertOk();
        $this->postJson("/kv/people/{$ids[1]}/reveal", ['channel' => 'email'])->assertOk();
        $this->postJson("/kv/people/{$ids[2]}/reveal", ['channel' => 'email'])->assertStatus(429)->assertJsonPath('error', 'limit');
        $this->assertSame(48, CreditService::balance($c->id));
        $this->postJson("/kv/people/{$ids[0]}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('already', true);
        $this->getJson('/kv/people')->assertJsonPath('daily_left', 0);
        $this->travel(1)->day();                                                      // a new day: the limit resets
        $this->postJson("/kv/people/{$ids[2]}/reveal", ['channel' => 'email'])->assertOk();
    }

    public function test_team_members_spend_the_companys_credits_and_are_recorded(): void
    {
        [$owner, $c] = $this->viewer();
        $sales = $this->teammate($c, 'sales');
        $p = $this->person();
        $this->actingAs($sales)->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk()->assertJsonPath('balance', 49);
        $this->assertSame(49, CreditService::balance($c->id));
        $this->assertSame($sales->id, PersonReveal::sole()->user_id);
        // the colleague sees the opened value, the owner too (credits and openings belong to the company)
        $this->actingAs($owner)->getJson('/kv/people')->assertJsonPath('items.0.email', 'mikko@nordic-kaluste.test');
    }

    public function test_person_models_never_serialise_contact_data_by_accident(): void
    {
        $p = $this->person();
        $json = json_encode($p->toArray());
        $this->assertStringNotContainsString('mikko@', $json);
        $this->assertStringNotContainsString('+358', $json);
    }

    // ── public KVKK removal request ─────────────────────────────────────────────

    public function test_guests_can_file_a_removal_request_and_the_admin_is_told(): void
    {
        Mail::fake();
        $this->admin();
        $this->postJson('/kv/people/removal-request', [
            'person_name' => 'Mikko <b>Virtanen</b>', 'person_email' => 'MIKKO@nordic-kaluste.test', 'person_ref' => 'Nordic Kaluste Oy',
            'requester_name' => 'Mikko Virtanen', 'requester_email' => 'mikko@nordic-kaluste.test', 'reason' => 'Lütfen verilerimi silin <script>x</script>',
        ])->assertOk()->assertJsonPath('ok', true);
        $req = RemovalRequest::sole();
        $this->assertSame('new', $req->status);
        $this->assertSame('Mikko Virtanen', $req->person_name);                       // tags stripped
        $this->assertStringNotContainsString('<script>', $req->reason);
        $this->assertSame('mikko@nordic-kaluste.test', $req->person_email);
        Mail::assertSent(KvMail::class, fn (KvMail $m) => $m->template === 'admin_removal_request');
    }

    public function test_removal_request_validation_honeypot_and_throttle(): void
    {
        Mail::fake();
        $this->postJson('/kv/people/removal-request', ['person_name' => 'X'])->assertStatus(422);
        $this->postJson('/kv/people/removal-request', ['person_name' => 'Xy', 'requester_name' => 'Yz', 'requester_email' => 'not-mail', 'reason' => 'yeterince uzun'])->assertStatus(422);
        $this->postJson('/kv/people/removal-request', ['person_name' => 'Xy', 'requester_name' => 'Yz', 'requester_email' => 'a@b.test', 'reason' => 'abc'])->assertStatus(422);
        $this->postJson('/kv/people/removal-request', ['person_name' => 'Xy', 'requester_name' => 'Yz', 'requester_email' => 'a@b.test', 'reason' => 'yeterince uzun', 'website' => 'http://spam.test'])->assertOk();
        $this->assertSame(0, RemovalRequest::count());                                 // honeypot: success answer, nothing stored
        Mail::assertNothingSent();
    }

    public function test_removal_request_endpoint_is_throttled(): void
    {
        Mail::fake();
        $ok = ['person_name' => 'Xy', 'requester_name' => 'Yz', 'requester_email' => 'a@b.test', 'reason' => 'yeterince uzun'];
        foreach (range(1, 5) as $i) {
            $this->postJson('/kv/people/removal-request', $ok)->assertOk();
        }
        $this->postJson('/kv/people/removal-request', $ok)->assertStatus(429);        // 5 per 10 minutes and IP
        $this->assertSame(5, RemovalRequest::count());
    }
}
