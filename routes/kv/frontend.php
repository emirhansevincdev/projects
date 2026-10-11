<?php

// Public site endpoints (guests included). Mounted in routes/web.php under Route::prefix('kv') WITHOUT the auth middleware.

use App\Http\Controllers\Kv\NewsletterController;
use Illuminate\Support\Facades\Route;

// Newsletter sign-up: email + opt-in proof (consent, IP, user agent). Own throttle bucket.
Route::post('newsletter', [NewsletterController::class, 'store'])->middleware('throttle:5,10,kv-newsletter');
