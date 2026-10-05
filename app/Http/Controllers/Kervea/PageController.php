<?php

namespace App\Http\Controllers\Kervea;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Kv\AuthController;

class PageController extends Controller
{
    /** Single-shell pages: the Kervea front-end switches views client-side. */
    public function show(string $view = 'home', ?string $firm = null)
    {
        return view('kervea.layout', [
            'boot' => [
                'view' => $view,
                'firm' => $firm,
                'user' => AuthController::userPayload(auth()->user()),
                'premium' => config('kervea.premium.price_usd'),
            ],
        ]);
    }
}
