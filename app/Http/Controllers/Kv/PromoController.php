<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\PromoCode;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    /** POST /kv/promo/check {code} → discount preview. The real discount is re-computed when the order is created. */
    public function check(Request $r)
    {
        $v = $r->validate(['code' => 'required|string|max:64']);
        $promo = PromoCode::where('code', PromoCode::normalize($v['code']))->first();
        if (! $promo || ! $promo->isUsable()) {
            return response()->json(['valid' => false], 200);
        }
        $price = (int) config('kervea.premium.price_usd') * 100;
        $disc = $promo->discountFor($price);
        return response()->json([
            'valid' => true,
            'type' => $promo->type,
            'value' => $promo->value,
            'discount_cents' => $disc,
            'total_cents' => $price - $disc,
            'currency' => config('kervea.premium.currency'),
        ]);
    }
}
