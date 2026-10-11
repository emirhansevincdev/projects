<?php

// Member-panel routes: credits. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use App\Http\Controllers\Kv\CreditController;
use App\Http\Controllers\Kv\OrderController;
use Illuminate\Support\Facades\Route;

// balance + packs + history of the acting company ("people" to spend, "billing" to buy; either one may look)
Route::get('credits', [CreditController::class, 'index'])->middleware(['kv.member', 'throttle:60,1,kv-credits-read']);

// public price list for the pricing page (no company data) – the only route of this file that guests may call
Route::get('credits/packs', [CreditController::class, 'packs'])->withoutMiddleware('auth')->middleware('throttle:60,1,kv-credit-packs');

// buy a credit pack (Stripe Checkout; without a provider the order stays pending until an admin marks it paid)
Route::post('orders/credits', [OrderController::class, 'storeCredits'])->middleware(['kv.member:billing', 'throttle:10,1,kv-credits-order']);
