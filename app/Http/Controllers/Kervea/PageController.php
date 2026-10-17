<?php

namespace App\Http\Controllers\Kervea;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Kv\AuthController;
use App\Services\Kv\SocialAuth;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Single-shell pages: the Kervea front-end switches views client-side.
     * Route values are read BY NAME (Laravel would hand them over positionally, mixing up view/firm).
     */
    public function show(Request $request)
    {
        $firm = $request->route('firm');
        // /company/{slug} of a firm that does not exist is a real 404 (the shell still renders so the page can say so)
        $status = ($firm !== null && ! \App\Models\Kv\Company::where('slug', $firm)->exists()) ? 404 : 200;

        return response()->view('kervea.layout', [
            'boot' => [
                'view' => (string) ($request->route('view') ?: 'home'),
                'firm' => $request->route('firm'),
                'user' => AuthController::userPayload(auth()->user()),
                'premium' => config('kervea.premium.price_usd'),
                'social' => SocialAuth::enabledMap(),      // which "Sign in with …" buttons to show (no secrets)
            ],
        ], $status);
    }
}
