<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Order;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\CreditService;
use App\Services\Kv\FirmPresenter;
use Illuminate\Http\Request;

/** Member side of the credit ledger. The company always comes from CompanyContext, never from the request. */
class CreditController extends Controller
{
    /** GET /kv/credits – balance, packs, costs and the last 50 ledger lines of the acting company. Needs "people" or "billing". */
    public function index(Request $r)
    {
        $ctx = CompanyContext::forRequest($r);
        $perms = $ctx['perms'] ?? [];
        $canSpend = in_array('people', $perms, true);
        $canBuy = in_array('billing', $perms, true);
        if (! $canSpend && ! $canBuy) {
            return response()->json(['error' => 'forbidden', 'need' => 'people'], 403);
        }
        $company = $ctx['company'];

        $ledger = CreditService::recent($company->id, 50)->map(fn ($e) => [
            'id' => $e->id,
            'delta' => $e->delta,
            'balance_after' => $e->balance_after,
            'reason' => $e->reason,
            // only fields that are safe to show to every team member (no admin notes, no personal data)
            'channel' => $e->meta['channel'] ?? null,
            'pack' => $e->meta['pack'] ?? null,
            'at' => $e->created_at?->toIso8601String(),
        ])->values()->all();

        $pending = $canBuy
            ? Order::where('company_id', $company->id)->where('kind', Order::KIND_CREDITS)->where('status', 'pending')->where('created_at', '>=', now()->subDays(2))->count()
            : 0;

        return response()->json($this->catalog() + [
            'balance' => CreditService::balance($company->id),
            'can_spend' => $canSpend,
            'can_buy' => $canBuy,
            'is_pro' => FirmPresenter::isPro($r->user()),
            'pending_orders' => $pending,
            'ledger' => $ledger,
        ])->header('Cache-Control', 'no-store');
    }

    /** GET /kv/credits/packs – public price list for the pricing page (config only, nothing per-company). */
    public function packs()
    {
        return response()->json($this->catalog())->header('Cache-Control', 'public, max-age=300');
    }

    private function catalog(): array
    {
        return [
            'packs' => CreditService::packs(),
            'costs' => ['email' => CreditService::revealCost('email'), 'phone' => CreditService::revealCost('phone')],
            'signup' => (int) config('kervea.credits.signup'),
            'pro_bonus' => (int) config('kervea.credits.pro_bonus'),
            'currency' => config('kervea.premium.currency', 'USD'),
        ];
    }
}
