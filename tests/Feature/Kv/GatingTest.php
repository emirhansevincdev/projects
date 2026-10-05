<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\PromoCode;
use App\Models\Kv\Order;
use App\Models\Kv\Reveal;

class GatingTest extends KvTestCase
{
    private function seedFirms(int $n): void
    {
        for ($i = 1; $i <= $n; $i++) {
            $this->member("Firma Numara $i", "f$i@x.test", ['phone' => '+49 111 222 333', 'website' => "https://f$i.test"]);
        }
    }

    public function test_guest_sees_only_three_unmasked_cards_and_no_contact_data_anywhere(): void
    {
        $this->seedFirms(6);
        $res = $this->getJson('/kv/firms')->assertOk();
        $items = $res->json('items');
        $this->assertCount(6, $items);
        $this->assertCount(3, array_filter($items, fn ($i) => ! $i['locked']));
        foreach (array_filter($items, fn ($i) => $i['locked']) as $i) {
            $this->assertStringNotContainsString('Numara', $i['nm']);       // masked on the server, not in the DOM
            $this->assertNull($i['yr']);
        }
        $body = $res->getContent();
        foreach (['@x.test', '+49 111', 'f1.test', '"email"', '"phone"'] as $leak) {
            $this->assertStringNotContainsString($leak, $body);
        }
    }

    public function test_pro_member_sees_all_but_contact_requires_reveal_and_firm_consent(): void
    {
        $this->seedFirms(5);
        [$pro] = $this->member('Pro Co', 'pro@x.test');
        $pro->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addYear()])->save();
        $this->actingAs($pro);
        $this->assertCount(0, array_filter($this->getJson('/kv/firms')->json('items'), fn ($i) => $i['locked']));

        $target = \App\Models\Kv\Company::where('name', 'Firma Numara 1')->first();
        $detail = $this->getJson('/kv/firms/'.$target->slug)->assertOk()->json();
        $this->assertTrue($detail['contact_locked']);
        $this->assertArrayNotHasKey('contact', $detail);

        $this->postJson("/kv/firms/{$target->slug}/reveal")->assertForbidden();   // firm never consented
        $this->consent($target, 'contact_visibility');
        $this->postJson("/kv/firms/{$target->slug}/reveal")->assertOk()->assertJsonPath('contact.email', 'f1@x.test');
        $this->assertSame(1, Reveal::count());
        $this->getJson('/kv/firms/'.$target->slug)->assertJsonPath('contact.phone', '+49 111 222 333');
    }

    public function test_free_member_cannot_reveal_and_reveal_has_a_daily_quota(): void
    {
        $this->seedFirms(2);
        [$free] = $this->member('Free Co', 'free@x.test');
        $t = \App\Models\Kv\Company::where('name', 'Firma Numara 1')->first();
        $this->consent($t, 'contact_visibility');
        $this->actingAs($free)->postJson("/kv/firms/{$t->slug}/reveal")->assertStatus(403)->assertJsonPath('error', 'pro_required');

        $free->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addDay()])->save();
        $this->seedFirms(0);
        for ($i = 0; $i < \App\Services\Kv\FirmPresenter::DAILY_REVEAL_LIMIT; $i++) {
            [, $c] = $this->member("Quota $i", "q$i@x.test");
            $this->consent($c, 'contact_visibility');
            Reveal::create(['user_id' => $free->id, 'company_id' => $c->id]);
        }
        $this->postJson("/kv/firms/{$t->slug}/reveal")->assertStatus(429);
    }

    public function test_match_score_exists_only_when_user_searches(): void
    {
        $this->member('Textile One', 't1@x.test', ['products' => 'pamuk ipliği']);
        $this->assertNull($this->getJson('/kv/firms')->json('items.0.uyum'));
        $this->assertNotNull($this->getJson('/kv/firms?q=pamuk&sec=10')->json('items.0.uyum'));
    }

    public function test_promo_and_server_side_pricing(): void
    {
        [$u] = $this->member('Buyer', 'b@x.test');
        PromoCode::create(['code' => 'ILK200', 'type' => 'fixed', 'value' => 8000, 'max_uses' => 1]);
        PromoCode::create(['code' => 'OFF', 'type' => 'percent', 'value' => 50, 'is_active' => false]);
        $this->postJson('/kv/promo/check', ['code' => 'off'])->assertJsonPath('valid', false);
        $this->postJson('/kv/promo/check', ['code' => 'ilk200'])->assertJsonPath('valid', true)->assertJsonPath('total_cents', 20000);

        // Browser cannot dictate the amount.
        $r = $this->actingAs($u)->postJson('/kv/orders', ['promo' => 'ILK200', 'amount' => 1, 'amount_cents' => 1])->assertOk();
        $this->assertSame(20000, Order::find($r->json('order'))->amount_cents);
        $this->postJson('/kv/orders', ['promo' => 'NOPE'])->assertStatus(422);
    }

    public function test_matches_are_derived_from_the_members_own_company_and_gated(): void
    {
        [$me] = $this->member('Seller', 's@x.test', ['direction' => 'EXP', 'hs_codes' => '5208', 'products' => 'pamuklu kumaş']);
        foreach (range(1, 5) as $i) {
            $this->member("Buyer $i", "b$i@x.test", ['direction' => 'IMP', 'hs_codes' => '5208', 'products' => 'kumaş']);
        }
        $this->member('Unrelated', 'u@x.test', ['direction' => 'IMP', 'hs_codes' => '9999', 'sector_id' => \App\Models\Kv\Sector::where('meta_idx', 3)->value('id'), 'products' => 'kuru incir']);

        $this->getJson('/kv/matches')->assertUnauthorized();
        $res = $this->actingAs($me)->getJson('/kv/matches')->assertOk();
        $items = $res->json('items');
        $this->assertCount(5, $items);                                   // unrelated firm excluded
        $this->assertCount(2, array_filter($items, fn ($i) => $i['locked']));   // free plan: 3 visible
        $this->assertContains('dir_c', $items[0]['reasons']);
        $this->assertGreaterThan(70, $items[0]['uyum']);
        $this->assertStringNotContainsString('@x.test', $res->getContent());
    }
}
