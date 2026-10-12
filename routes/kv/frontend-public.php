<?php

// Guest-accessible front-end endpoints. Mounted in routes/web.php under Route::prefix('kv') WITHOUT the auth middleware.
// Do NOT add this file to the member-panel feature loop (that loop is behind `auth`).

use App\Http\Controllers\Kv\NewsletterController;
use Illuminate\Support\Facades\Route;

// Newsletter sign-up: email + opt-in proof (consent, IP, user agent). Own throttle bucket.
Route::post('newsletter', [NewsletterController::class, 'store'])->middleware('throttle:5,10,kv-newsletter');
// Signed links from the confirmation mail / the footer of each newsletter (relative signature: no dependence on host or scheme).
Route::get('newsletter/confirm/{subscriber}', [NewsletterController::class, 'confirm'])->whereNumber('subscriber')->middleware(['signed:relative', 'throttle:30,10,kv-newsletter-link'])->name('kv.newsletter.confirm');
Route::get('newsletter/unsubscribe/{subscriber}', [NewsletterController::class, 'unsubscribe'])->whereNumber('subscriber')->middleware(['signed:relative', 'throttle:30,10,kv-newsletter-link'])->name('kv.newsletter.unsubscribe');
