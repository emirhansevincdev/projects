<?php

namespace Tests\Feature\Kv;

use App\Http\Controllers\Kv\OrderController;
use App\Models\Kv\Company;
use App\Models\Kv\CreditLedger;
use App\Models\Kv\Order;
use App\Models\Kv\PromoCode;
use App\Services\Kv\CreditService;

/** C5: credit packs and the Premium bonus. Prices come from config, delivery is idempotent, billing permission is required. */
class CreditOrdersTest extends CreditsTestCase
{
    private function fakeStripe(): object
    {
        $fake = new class {
            public array $created = [];
            public object $checkout;
            public function __construct()
            {
                $this->checkout = new class($this) {
                    public object $sessions;
                    public function __construct(object $root)
                    {
                        $this->sessions = new class($root) {
                            public function __construct(private object $root) {}
                            public function create(array $params, array $opts = []): object
                            {
                                $this->root->created[] = ['params' => $params, 'opts' => $opts];
                                return (object) ['id' => 'cs_test_'.count($this->root->created), 'url' => 'https://checkout.stripe.test/pay/cs_test_'.count($this->root->created)];
                            }
                        };
                    }
                };
            }
        };
        config(['kervea.stripe.secret' => 'sk_test_fake']);
        $this->app->instance('kv.stripe', $fake);
        return $fake;
    }

    private function webhook(string $sessionId, int $amount, string $currency = 'usd', string $status = 'paid', ?string $secret = null)
    {
        $secret ??= 'whsec_test';
        config(['kervea.stripe.webhook_secret' => 'whsec_test']);
        $payload = json_encode(['id' => 'evt_'.uniqid(), 'object' => 'event', 'type' => 'checkout.session.completed',
            'data' => ['object' => ['id' => $sessionId, 'object' => 'checkout.session', 'payment_status' => $status, 'amount_total' => $amount, 'currency' => $currency]]]);
        $t = time();
        $sig = "t=$t,v1=".hash_hmac('sha256', "$t.$payload", $secret);
        return $this->call('POST', '/kv/webhooks/stripe', [], [], [], ['HTTP_STRIPE_SIGNATURE' => $sig, 'CONTENT_TYPE' => 'application/json'], $payload);
    }

    // ── creating the order ───────────────────────────────────────────────────────

    public function test_price_and_credits_come_from_config_never_from_the_browser(): void
    {
        [$owner, $c] = $this->member();
        $res = $this->actingAs($owner)->postJson('/kv/orders/credits', [
            'pack' => '500', 'amount' => 1, 'amount_cents' => 1, 'price' => 1, 'credits' => 99999, 'currency' => 'TRY', 'company_id' => 12345, 'kind' => 'pro', 'status' => 'paid',
        ])->assertOk();
        $o = Order::findOrFail($res->json('order'));
        $this->assertSame('credits', $o->kind);
        $this->assertSame(4500, (int) $o->amount_cents);
        $this->assertSame(500, $o->credits);
        $this->assertSame('500', $o->pack);
        $this->assertSame('USD', $o->currency);
        $this->assertSame('pending', $o->status);
        $this->assertSame($c->id, $o->company_id);
        $this->assertSame(0, CreditService::balance($c->id));            // nothing delivered before payment
    }

    public function test_unknown_stale_or_malformed_packs_are_rejected(): void
    {
        [$owner] = $this->member();
        $this->actingAs($owner);
        foreach (['250', '0', '-100', '500abc', '', '1000000'] as $bad) {      // (the endpoint is rate limited to 10/min: stay below)
            $this->postJson('/kv/orders/credits', ['pack' => $bad])->assertStatus(422);
        }
        $this->postJson('/kv/orders/credits', [])->assertStatus(422);
        $this->postJson('/kv/orders/credits', ['pack' => [500]])->assertStatus(422);
        config(['kervea.credits.packs' => [100 => 10]]);                  // a pack removed from config after the page was loaded
        $this->postJson('/kv/orders/credits', ['pack' => '500'])->assertStatus(422)->assertJsonPath('error', 'unknown_pack');
        $this->assertSame(0, Order::count());
    }

    public function test_guests_unapproved_members_and_team_members_without_billing_cannot_buy(): void
    {
        $this->postJson('/kv/orders/credits', ['pack' => '100'])->assertUnauthorized();

        [$owner, $c] = $this->member();
        $sales = $this->teammate($c, 'sales');                            // matches, messages, people
        $this->actingAs($sales)->postJson('/kv/orders/credits', ['pack' => '100'])->assertForbidden()->assertJsonPath('need', 'billing');
        $admin = $this->teammate($c, 'admin');                            // role defaults have no billing either
        $this->actingAs($admin)->postJson('/kv/orders/credits', ['pack' => '100'])->assertForbidden();
        $this->assertSame(0, Order::count());

        $billing = $this->teammate($c, 'ops', ['billing'], 'bill@team.test');
        $this->actingAs($billing)->postJson('/kv/orders/credits', ['pack' => '100'])->assertOk();
        $o = Order::sole();
        $this->assertSame($c->id, $o->company_id);                        // the COMPANY's order, paid by the team member
        $this->assertSame($billing->id, $o->user_id);

        $outsider = new \App\Models\User(['name' => 'X', 'email' => 'x@x.test', 'password' => 'Secret-pass-1']);
        $outsider->role = 2;
        $outsider->save();
        $this->actingAs($outsider)->postJson('/kv/orders/credits', ['pack' => '100'])->assertForbidden();
        $c->forceFill(['status' => 'suspended'])->save();
        $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '100'])->assertForbidden();
    }

    public function test_without_a_payment_provider_the_order_stays_pending_and_a_double_click_reuses_it(): void
    {
        [$owner, $c] = $this->member();
        $this->actingAs($owner);
        $a = $this->postJson('/kv/orders/credits', ['pack' => '100'])->assertOk()->assertJsonPath('provider', null)->assertJsonPath('credits', 100)->assertJsonPath('amount_cents', 1000);
        $b = $this->postJson('/kv/orders/credits', ['pack' => '100'])->assertOk();
        $this->assertSame($a->json('order'), $b->json('order'));
        $this->postJson('/kv/orders/credits', ['pack' => '500'])->assertOk();
        $this->assertSame(2, Order::count());
        $this->assertSame(0, CreditService::balance($c->id));
        $this->getJson('/kv/credits')->assertJsonPath('pending_orders', 2);
    }

    public function test_with_stripe_the_checkout_session_is_built_from_config_and_returns_the_hosted_page(): void
    {
        $stripe = $this->fakeStripe();
        [$owner, $c] = $this->member();
        $res = $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '1000', 'amount_cents' => 1])->assertOk();
        $res->assertJsonPath('provider', 'stripe')->assertJsonPath('redirect', 'https://checkout.stripe.test/pay/cs_test_1');
        $p = $stripe->created[0]['params'];
        $this->assertSame(8500, $p['line_items'][0]['price_data']['unit_amount']);
        $this->assertSame('usd', $p['line_items'][0]['price_data']['currency']);
        $this->assertSame('payment', $p['mode']);
        $this->assertStringEndsWith('/panel?paid=1&credits=1', $p['success_url']);
        $this->assertSame((string) $res->json('order'), $p['client_reference_id']);
        $o = Order::sole();
        $this->assertSame('stripe', $o->provider);
        $this->assertSame('cs_test_1', $o->provider_ref);
        $this->assertSame('pending', $o->status);
    }

    // ── delivering ───────────────────────────────────────────────────────────────

    public function test_admin_marking_a_credits_order_paid_delivers_the_pack_once(): void
    {
        [$owner, $c] = $this->member();
        CreditService::grantSignup($c);
        $id = $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '500'])->json('order');
        $admin = $this->admin();
        $this->actingAs($admin)->get('/admin/kervea/orders')->assertOk()->assertSee('500 kredi')->assertSee('45.00');

        $this->post("/admin/kervea/orders/{$id}/paid")->assertRedirect()->assertSessionHas('ok');
        $this->assertSame(550, CreditService::balance($c->id));
        $e = CreditLedger::where('reason', 'purchase')->sole();
        $this->assertSame(500, $e->delta);
        $this->assertSame('order', $e->ref_type);
        $this->assertSame($id, $e->ref_id);
        $this->assertSame('order:'.$id.':credits', $e->idempotency_key);

        $this->post("/admin/kervea/orders/{$id}/paid")->assertRedirect();   // second click
        OrderController::markPaid(Order::find($id), 'again', 'manual');      // and a direct second delivery
        $this->assertSame(550, CreditService::balance($c->id));
        $this->assertSame(1, CreditLedger::where('reason', 'purchase')->count());
        $this->assertSame('paid', Order::find($id)->status);
        $this->assertSame(0, \App\Models\User::find($owner->id)->kv_plan === 'pro' ? 1 : 0);   // a credit pack never grants Premium
    }

    public function test_orders_page_is_admin_only(): void
    {
        [$owner, $c] = $this->member();
        $id = $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '100'])->json('order');
        $this->post("/admin/kervea/orders/{$id}/paid")->assertRedirect('/');
        $this->assertSame('pending', Order::find($id)->status);
        $this->assertSame(0, CreditService::balance($c->id));
    }

    public function test_double_stripe_webhook_does_not_double_grant_and_bad_ones_are_ignored(): void
    {
        $this->fakeStripe();
        [$owner, $c] = $this->member();
        $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '100'])->assertOk();
        $o = Order::sole();

        $this->webhook('cs_test_1', 999)->assertOk();                        // wrong amount
        $this->webhook('cs_test_1', 1000, 'eur')->assertOk();                // wrong currency
        $this->webhook('cs_test_1', 1000, 'usd', 'unpaid')->assertOk();      // not paid yet
        $this->assertSame('pending', $o->fresh()->status);
        $this->assertSame(0, CreditService::balance($c->id));
        $this->webhook('cs_test_1', 1000, 'usd', 'paid', 'whsec_wrong')->assertStatus(400);
        $this->assertSame(0, CreditService::balance($c->id));

        $this->webhook('cs_test_1', 1000)->assertOk();
        $this->webhook('cs_test_1', 1000)->assertOk();                       // Stripe retries
        $this->assertSame(100, CreditService::balance($c->id));
        $this->assertSame(1, CreditLedger::where('reason', 'purchase')->count());
        $this->assertSame('paid', $o->fresh()->status);
        $this->assertSame('stripe', $o->fresh()->provider);
    }

    public function test_webhook_racing_the_admin_button_still_delivers_once(): void
    {
        $this->fakeStripe();
        [$owner, $c] = $this->member();
        $id = $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '100'])->json('order');
        $this->webhook('cs_test_1', 1000)->assertOk();
        $this->actingAs($this->admin())->post("/admin/kervea/orders/{$id}/paid")->assertRedirect();
        $this->assertSame(100, CreditService::balance($c->id));
    }

    // ── Premium + bonus ─────────────────────────────────────────────────────────

    public function test_premium_purchase_extends_the_plan_and_grants_the_bonus_credits_once(): void
    {
        [$owner, $c] = $this->member();
        CreditService::grantSignup($c);
        $id = $this->actingAs($owner)->postJson('/kv/orders', ['amount' => 1])->assertOk()->json('order');
        $o = Order::findOrFail($id);
        $this->assertSame('pro', $o->kind);
        $this->assertSame(0, CreditService::balance($c->id) - 50);

        $admin = $this->admin();
        $this->actingAs($admin)->post("/admin/kervea/orders/{$id}/paid")->assertRedirect();
        $this->post("/admin/kervea/orders/{$id}/paid")->assertRedirect();
        OrderController::markPaid(Order::find($id), 'again', 'stripe');
        $this->assertSame(150, CreditService::balance($c->id));                // 50 signup + 100 bonus, once
        $e = CreditLedger::where('reason', 'pro_bonus')->sole();
        $this->assertSame('order:'.$id.':pro_bonus', $e->idempotency_key);
        $owner->refresh();
        $this->assertSame('pro', $owner->kv_plan);
        $until = $owner->kv_plan_until->copy();
        OrderController::markPaid(Order::find($id), 'again2', 'stripe');
        $this->assertTrue($until->equalTo($owner->fresh()->kv_plan_until), 'a repeated delivery must not extend the plan twice');
    }

    public function test_premium_bought_by_a_billing_team_member_credits_the_company_and_the_owner_gets_the_plan(): void
    {
        [$owner, $c] = $this->member();
        $billing = $this->teammate($c, 'ops', ['billing']);
        $id = $this->actingAs($billing)->postJson('/kv/orders', [])->assertOk()->json('order');
        $this->actingAs($this->admin())->post("/admin/kervea/orders/{$id}/paid");
        $this->assertSame(100, CreditService::balance($c->id));
        $this->assertSame('pro', $owner->fresh()->kv_plan);
        $this->assertNotSame('pro', $billing->fresh()->kv_plan ?? 'free');
    }

    public function test_free_promo_premium_with_stripe_delivers_immediately_with_the_bonus(): void
    {
        $this->fakeStripe();
        PromoCode::create(['code' => 'FREE100', 'type' => 'percent', 'value' => 100]);
        [$owner, $c] = $this->member();
        $this->actingAs($owner)->postJson('/kv/orders', ['promo' => 'FREE100'])->assertOk()->assertJsonPath('paid', true);
        $this->assertSame(100, CreditService::balance($c->id));
        $this->assertSame('pro', $owner->fresh()->kv_plan);
    }

    public function test_orders_page_shows_kind_and_credits(): void
    {
        [$owner, $c] = $this->member();
        $this->actingAs($owner)->postJson('/kv/orders/credits', ['pack' => '1000'])->assertOk();
        $this->postJson('/kv/orders', [])->assertOk();
        $this->actingAs($this->admin())->get('/admin/kervea/orders')->assertOk()
            ->assertSee('Kredi paketi')->assertSee('1000 kredi')->assertSee('Premium');
    }
}
