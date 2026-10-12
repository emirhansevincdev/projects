<?php

// Member-panel routes: team. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use App\Http\Controllers\Kv\ActivityController;
use App\Http\Controllers\Kv\TeamController;
use Illuminate\Support\Facades\Route;

// Team management: only people holding the "team" permission (the owner always does). Every write has its own throttle bucket.
Route::middleware('kv.member:team')->group(function () {
    Route::get('team', [TeamController::class, 'index'])->middleware('throttle:60,1,kv-team-read');
    Route::post('team/invite', [TeamController::class, 'invite'])->middleware('throttle:10,10,kv-team-invite');
    Route::post('team/{id}/resend', [TeamController::class, 'resend'])->whereNumber('id')->middleware('throttle:10,10,kv-team-resend');
    Route::patch('team/{id}', [TeamController::class, 'update'])->whereNumber('id')->middleware('throttle:30,1,kv-team-update');
    Route::post('team/{id}/disable', [TeamController::class, 'disable'])->whereNumber('id')->middleware('throttle:20,1,kv-team-disable');
    Route::post('team/{id}/enable', [TeamController::class, 'enable'])->whereNumber('id')->middleware('throttle:20,1,kv-team-enable');
    Route::delete('team/{id}', [TeamController::class, 'destroy'])->whereNumber('id')->middleware('throttle:20,1,kv-team-remove');

    // The company's activity log (last entries) is part of the same permission.
    Route::get('activity', [ActivityController::class, 'index'])->middleware('throttle:60,1,kv-activity-read');
});
