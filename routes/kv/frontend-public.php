<?php

// Guest-accessible front-end endpoints. Mounted in routes/web.php under Route::prefix('kv') WITHOUT the auth middleware.
// Do NOT add this file to the member-panel feature loop (that loop is behind `auth`).

use App\Http\Controllers\Kv\NewsletterController;
use Illuminate\Support\Facades\Route;

// Newsletter sign-up: email + opt-in proof (consent, IP, user agent). Own throttle bucket.
Route::post('newsletter', [NewsletterController::class, 'store'])->middleware('throttle:5,10,kv-newsletter');
