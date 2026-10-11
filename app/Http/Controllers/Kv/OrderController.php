<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Order;
use App\Models\Kv\PromoCode;
use App\Models\User;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\CreditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Purchases: the yearly Premium plan (kind = pro) and credit packs (kind = credits).
 * The amount is ALWAYS computed here from config (+ promo code for Premium) and never trusted from the browser.
 * Card data never touches our servers: payment happens on the provider's hosted page (Stripe Checkout).
 * markPaid() is the ONE place that delivers what was bought (plan extension + credits); it is idempotent, so a repeated
 * webhook, a webhook racing the admin's "Ödendi" button, or a retry can never deliver twice.
 */
class OrderController extends Controller
{
    public function store(Request $r)
    {
        $v = $r->validate(['promo' => 'nullable|string|max:64']);
        $user = $r->user();
        $ctx = CompanyContext::forRequest($r);
        $company = $ctx && $ctx['company']->status === 'approved' ? $ctx['company'] : null;
        if (! $company) {
            return response()->json(['error' => 'no_company'], 403);
        }
        if (! in_array('billing', $ctx['perms'], true)) {
            return response()->json(['error' => 'forbidden', 'need' => 'billing'], 403);
        }

        $price = (int) config('kervea.premium.price_usd') * 100;
        $promo = null;
        $discount = 0;
        if (! empty($v['promo'])) {
            $promo = PromoCode::where('code', PromoCode::normalize($v['promo']))->first();
            if (! $promo || ! $promo->isUsable()) {
                return response()->json(['error' => 'invalid_promo'], 422);
            }
            $discount = $promo->discountFor($price);
        }
        $total = max(0, $price - $discount);

        $order = Order::create([
            'user_id' => $user->id, 'company_id' => $company->id, 'plan' => 'pro', 'period' => 'year',
            'amount_cents' => $total, 'discount_cents' => $discount, 'currency' => config('kervea.premium.currency'),
            'promo_code_id' => $promo?->id, 'kind' => Order::KIND_PRO,
        ]);

        $secret = config('kervea.stripe.secret');
        if (! $secret) {
            // No payment provider configured yet → the order stays pending; admin can mark it paid (bank transfer).
            return response()->json(['ok' => true, 'order' => $order->id, 'provider' => null, 'amount_cents' => $total, 'currency' => $order->currency]);
        }
        if ($total === 0) {
            $this->markPaid($order, 'promo-free-'.$order->id, 'promo');
            return response()->json(['ok' => true, 'order' => $order->id, 'paid' => true]);
        }

        $stripe = $this->stripe($secret);
        $session = $stripe->checkout->sessions->create([
            'mode' => 'payment',
            'customer_email' => $user->email,
            'client_reference_id' => (string) $order->id,
            'line_items' => [[
                'quantity' => 1,
                'price_data' => [
                    'currency' => strtolower($order->currency),
                    'unit_amount' => $total,
                    'product_data' => ['name' => 'Kervea Premium (1 yıl)'],
                ],
            ]],
            'metadata' => ['order_id' => (string) $order->id],
            'success_url' => url('/panel?paid=1'),
            'cancel_url' => url('/pricing?cancelled=1'),
        ], ['idempotency_key' => 'kv-order-'.$order->id]);
        $order->update(['provider' => 'stripe', 'provider_ref' => $session->id]);

        return response()->json(['ok' => true, 'order' => $order->id, 'provider' => 'stripe', 'redirect' => $session->url]);
    }

    /**
     * POST /kv/orders/credits {pack} – buy a credit pack. Needs the "billing" permission of the acting company.
     * Price and credit amount come from config('kervea.credits.packs') only; the browser sends nothing but the pack code.
     */
    public function storeCredits(Request $r)
    {
        $v = $r->validate(['pack' => 'required|regex:/^\d{1,6}$/']);
        $user = $r->user();
        $ctx = CompanyContext::forRequest($r);
        $company = $ctx && $ctx['company']->status === Company::STATUS_APPROVED ? $ctx['company'] : null;
        if (! $company) {
            return response()->json(['error' => 'no_company'], 403);
        }
        if (! in_array('billing', $ctx['perms'], true)) {
            return response()->json(['error' => 'forbidden', 'need' => 'billing'], 403);
        }
        $pack = CreditService::pack($v['pack']);
        if (! $pack) {
            return response()->json(['error' => 'unknown_pack'], 422);
        }

        $secret = config('kervea.stripe.secret');
        if (! $secret) {
            // No provider yet: one open order per company+pack (a double click must not pile up orders); the admin marks it paid.
            $open = Order::where('kind', Order::KIND_CREDITS)->where('company_id', $company->id)->where('pack', $pack['pack'])
                ->where('status', 'pending')->whereNull('provider')->where('created_at', '>=', now()->subDay())->latest('id')->first();
            $order = $open ?: Order::create($this->creditsOrderAttributes($user->id, $company->id, $pack));
            return response()->json(['ok' => true, 'order' => $order->id, 'provider' => null, 'credits' => $pack['credits'], 'amount_cents' => $order->amount_cents, 'currency' => $order->currency]);
        }

        $order = Order::create($this->creditsOrderAttributes($user->id, $company->id, $pack));
        $stripe = $this->stripe($secret);
        $session = $stripe->checkout->sessions->create([
            'mode' => 'payment',
            'customer_email' => $user->email,
            'client_reference_id' => (string) $order->id,
            'line_items' => [[
                'quantity' => 1,
                'price_data' => [
                    'currency' => strtolower($order->currency),
                    'unit_amount' => (int) $order->amount_cents,
                    'product_data' => ['name' => 'Kervea Kredi · '.$pack['credits'].' kredi'],
                ],
            ]],
            'metadata' => ['order_id' => (string) $order->id, 'kind' => 'credits'],
            'success_url' => url('/panel?paid=1&credits=1'),
            'cancel_url' => url('/panel?cancelled=1&credits=1'),
        ], ['idempotency_key' => 'kv-order-'.$order->id]);
        $order->update(['provider' => 'stripe', 'provider_ref' => $session->id]);

        return response()->json(['ok' => true, 'order' => $order->id, 'provider' => 'stripe', 'credits' => $pack['credits'], 'redirect' => $session->url]);
    }

    /** The Stripe client; tests bind a fake under 'kv.stripe' so no request leaves the machine. */
    private function stripe(string $secret): object
    {
        return app()->bound('kv.stripe') ? app('kv.stripe') : new \Stripe\StripeClient($secret);
    }

    private function creditsOrderAttributes(int $userId, int $companyId, array $pack): array
    {
        return [
            'user_id' => $userId, 'company_id' => $companyId, 'kind' => Order::KIND_CREDITS, 'plan' => 'credits', 'period' => 'once',
            'amount_cents' => $pack['price_cents'], 'discount_cents' => 0, 'currency' => config('kervea.premium.currency', 'USD'),
            'credits' => $pack['credits'], 'pack' => $pack['pack'],
        ];
    }

    /** POST /kv/webhooks/stripe — signature verified, idempotent. */
    public function stripeWebhook(Request $r)
    {
        $secret = config('kervea.stripe.webhook_secret');
        if (! $secret) {
            return response('not configured', 503);
        }
        try {
            $event = \Stripe\Webhook::constructEvent($r->getContent(), (string) $r->header('Stripe-Signature'), $secret);
        } catch (\Throwable $e) {
            Log::warning('kv: bad stripe signature');
            return response('invalid', 400);
        }
        if ($event->type === 'checkout.session.completed') {
            $s = $event->data->object;
            $order = Order::where('provider', 'stripe')->where('provider_ref', $s->id)->first();
            if ($order && $order->status !== 'paid' && $s->payment_status === 'paid' && (int) $s->amount_total === (int) $order->amount_cents
                && strtolower((string) $s->currency) === strtolower($order->currency)) {
                $this->markPaid($order, $s->id, 'stripe');
            }
        }
        return response('ok');
    }

    /**
     * Deliver a paid order exactly once: status flip, Premium extension + bonus credits, or the credit pack.
     * The order row is locked first, and every credit grant carries a per-order idempotency key as a second guard.
     */
    public static function markPaid(Order $order, string $ref, string $provider): void
    {
        DB::transaction(function () use ($order, $ref, $provider) {
            $locked = Order::whereKey($order->id)->lockForUpdate()->first();
            if (! $locked || $locked->status === 'paid') return;
            $locked->forceFill(['status' => 'paid', 'paid_at' => now(), 'provider' => $provider, 'provider_ref' => $locked->provider_ref ?: $ref])->save();

            $company = $locked->company_id ? Company::find($locked->company_id) : null;
            if ($locked->kind === Order::KIND_CREDITS) {
                if ($company && (int) $locked->credits > 0) {
                    CreditService::grant($company->id, (int) $locked->credits, 'purchase', [
                        'user_id' => $locked->user_id, 'key' => 'order:'.$locked->id.':credits', 'ref_type' => 'order', 'ref_id' => $locked->id,
                        'meta' => ['pack' => $locked->pack, 'amount_cents' => (int) $locked->amount_cents, 'currency' => $locked->currency],
                    ]);
                } else {
                    Log::warning('kv: paid credits order without a company to credit', ['order' => $locked->id]);
                }
            } else {
                if ($locked->promo_code_id) PromoCode::where('id', $locked->promo_code_id)->increment('used_count');
                // the subscription belongs to the company OWNER, whoever (team member with billing rights) paid
                $user = ($company && $company->user_id ? User::find($company->user_id) : null) ?: User::find($locked->user_id);
                if ($user) {
                    $base = $user->kv_plan_until && $user->kv_plan_until->isFuture() ? $user->kv_plan_until : now();
                    $user->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => $base->copy()->addDays((int) config('kervea.premium.period_days'))])->save();
                }
                $bonus = (int) config('kervea.credits.pro_bonus', 0);
                if ($company && $bonus > 0) {
                    CreditService::grant($company->id, $bonus, 'pro_bonus', [
                        'user_id' => $locked->user_id, 'key' => 'order:'.$locked->id.':pro_bonus', 'ref_type' => 'order', 'ref_id' => $locked->id,
                    ]);
                }
            }
            $order->refresh();                                           // callers (admin page) see the fresh state
        });
    }
}
