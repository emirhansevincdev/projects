<?php

namespace App\Http\Controllers\Kervea;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Kv\AuthController;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Single-shell pages: the Kervea front-end switches views client-side.
     * Route values are read BY NAME (Laravel would hand them over positionally, mixing up view/firm).
     */
    public function show(Request $request)
    {
        return view('kervea.layout', [
            'boot' => [
                'view' => (string) ($request->route('view') ?: 'home'),
                'firm' => $request->route('firm'),
                'user' => AuthController::userPayload(auth()->user()),
                'premium' => config('kervea.premium.price_usd'),
            ],
        ]);
    }
}
