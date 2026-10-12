<?php

// Admin routes for team (role 1). Included from routes/web.php inside prefix('admin/kervea'), name('admin.kervea.'), middleware(['auth','admin']).

use App\Http\Controllers\Admin\TeamAdminController;
use Illuminate\Support\Facades\Route;

Route::get('teams', [TeamAdminController::class, 'index'])->name('teams');
Route::post('teams/{member}/disable', [TeamAdminController::class, 'disable'])->whereNumber('member')->name('team.disable');
Route::post('teams/{member}/enable', [TeamAdminController::class, 'enable'])->whereNumber('member')->name('team.enable');
