<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Order;
use App\Models\Kv\PromoCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Premium purchase. The amount is ALWAYS computed here from config + promo code (never trusted from the browser).
 * Card data never touches our servers: payment happens on the provider's hosted page (Stripe Checkout).
 */
class OrderController extends Controller
{
    public function store(Request $r)
    {
        $v = $r->validate(['promo' => 'nullable|string|max:64']);
        $user = $r->user();
        $company = Company::where('user_id', $user->id)->where('status', 'approved')->first();
        if (! $company) {
            return response()->json(['error' => 'no_company'], 403);
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
            'promo_code_id' => $promo?->id,
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

        $stripe = new \Stripe\StripeClient($secret);
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
            if ($order && $order->status !== 'paid' && $s->payment_status === 'paid' && (int) $s->amount_total === (int) $order->amount_cents) {
                $this->markPaid($order, $s->id, 'stripe');
            }
        }
        return response('ok');
    }

    public static function markPaid(Order $order, string $ref, string $provider): void
    {
        DB::transaction(function () use ($order, $ref, $provider) {
            $order->refresh();
            if ($order->status === 'paid') return;
            $order->forceFill(['status' => 'paid', 'paid_at' => now(), 'provider' => $provider, 'provider_ref' => $order->provider_ref ?: $ref])->save();
            if ($order->promo_code_id) PromoCode::where('id', $order->promo_code_id)->increment('used_count');
            $user = User::find($order->user_id);
            $base = $user->kv_plan_until && $user->kv_plan_until->isFuture() ? $user->kv_plan_until : now();
            $user->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => $base->copy()->addDays((int) config('kervea.premium.period_days'))])->save();
        });
    }
}
