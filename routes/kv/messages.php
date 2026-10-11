<?php

// Member-panel routes: messages. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use App\Http\Controllers\Kv\MessageController;
use Illuminate\Support\Facades\Route;

// Every route needs an approved company AND the "messages" permission; throttle buckets are distinct per action.
Route::middleware('kv.member:messages')->controller(MessageController::class)->group(function () {
    Route::get('conversations', 'index')->middleware('throttle:120,1,kv-msg-list');
    Route::post('conversations', 'store')->middleware('throttle:12,1,kv-msg-start');
    Route::get('conversations/{id}', 'show')->whereNumber('id')->middleware('throttle:300,1,kv-msg-show');
    Route::post('conversations/{id}/messages', 'send')->whereNumber('id')->middleware('throttle:40,1,kv-msg-send');
    Route::post('conversations/{id}/archive', 'archive')->whereNumber('id')->middleware('throttle:60,1,kv-msg-archive');
    Route::post('conversations/{id}/unarchive', 'unarchive')->whereNumber('id')->middleware('throttle:60,1,kv-msg-unarchive');
    Route::post('conversations/{id}/block', 'block')->whereNumber('id')->middleware('throttle:30,1,kv-msg-block');
    Route::delete('conversations/{id}/block', 'unblock')->whereNumber('id')->middleware('throttle:30,1,kv-msg-unblock');

    Route::get('messages/unread-count', 'unread')->middleware('throttle:120,1,kv-msg-unread');
    Route::get('messages/can-message/{slug}', 'canMessage')->middleware('throttle:60,1,kv-msg-can');
    Route::get('messages/{id}/attachment', 'attachment')->whereNumber('id')->middleware('throttle:120,1,kv-msg-file');
    Route::post('messages/{id}/report', 'report')->whereNumber('id')->middleware('throttle:10,1,kv-msg-report');
});
