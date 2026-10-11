<?php

// Admin routes for credits (role 1). Included from routes/web.php inside prefix('admin/kervea'), name('admin.kervea.'), middleware(['auth','admin']).

use App\Http\Controllers\Admin\KerveaCreditsAdminController;
use Illuminate\Support\Facades\Route;

Route::get('credits', [KerveaCreditsAdminController::class, 'index'])->name('credits');
Route::get('credits/{company}', [KerveaCreditsAdminController::class, 'show'])->whereNumber('company')->name('credits.show');
Route::post('credits/{company}/adjust', [KerveaCreditsAdminController::class, 'adjust'])->whereNumber('company')->middleware('throttle:30,1,kv-admin-credit-adjust')->name('credits.adjust');
