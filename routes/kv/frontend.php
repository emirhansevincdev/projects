<?php

// Public site endpoints. Mounted in routes/web.php under Route::prefix('kv') WITHOUT the auth middleware;
// the member-only routes below carry their own `auth` + `kv.member:<permission>` middleware.

use App\Http\Controllers\Kv\NewsletterController;
use App\Http\Controllers\Kv\ProfileMediaController;
use Illuminate\Support\Facades\Route;

// Newsletter sign-up: email + opt-in proof (consent, IP, user agent). Own throttle bucket.
Route::post('newsletter', [NewsletterController::class, 'store'])->middleware('throttle:5,10,kv-newsletter');

// Member panel "Firma Profilim": logo, cover, gallery of the member's own company (the controller requires the "profile" permission of the acting company).
Route::middleware('auth')->group(function () {
    Route::get('me/media', [ProfileMediaController::class, 'show']);
    Route::post('me/media', [ProfileMediaController::class, 'store'])->middleware('throttle:30,10,kv-media');
    Route::delete('me/media/{kind}/{photo?}', [ProfileMediaController::class, 'destroy'])
        ->whereIn('kind', ['cover', 'photo'])->whereNumber('photo')->middleware('throttle:60,10,kv-media-del');
});
