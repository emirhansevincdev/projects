<?php

// Public front-end endpoints that need a signed-in member. Mounted in routes/web.php under Route::prefix('kv')
// (the member panel feature loop may also `require` this file: the routes are unnamed, so a second registration is harmless).

use App\Http\Controllers\Kv\ProfileMediaController;
use Illuminate\Support\Facades\Route;

// Member panel "Firma Profilim": logo, cover, gallery of the member's own company (the controller requires the "profile" permission of the acting company).
Route::middleware('auth')->group(function () {
    Route::get('me/media', [ProfileMediaController::class, 'show']);
    Route::post('me/media', [ProfileMediaController::class, 'store'])->middleware('throttle:30,10,kv-media');
    Route::delete('me/media/{kind}/{photo?}', [ProfileMediaController::class, 'destroy'])
        ->whereIn('kind', ['cover', 'photo'])->whereNumber('photo')->middleware('throttle:60,10,kv-media-del');
});
