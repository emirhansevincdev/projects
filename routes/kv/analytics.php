<?php

// Member-panel routes: analytics. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use App\Http\Controllers\Kv\AnalyticsController;
use Illuminate\Support\Facades\Route;

// Needs an approved company AND the "analytics" permission; own throttle bucket.
Route::get('analytics', [AnalyticsController::class, 'show'])->middleware(['kv.member:analytics', 'throttle:60,1,kv-analytics']);
