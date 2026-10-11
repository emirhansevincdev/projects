<?php

// Admin routes for messages (role 1). Included from routes/web.php inside prefix('admin/kervea'), name('admin.kervea.'), middleware(['auth','admin']).
// Moderation works from REPORTS only: there is deliberately no route that lists or opens arbitrary conversations.

use App\Http\Controllers\Admin\MessageReportController;
use Illuminate\Support\Facades\Route;

Route::prefix('messages')->name('messages.')->controller(MessageReportController::class)->group(function () {
    Route::get('reports', 'index')->name('reports');
    Route::get('reports/{report}', 'show')->name('report')->whereNumber('report');
    Route::post('reports/{report}/dismiss', 'dismiss')->name('report.dismiss')->whereNumber('report');
    Route::post('reports/{report}/reviewed', 'reviewed')->name('report.reviewed')->whereNumber('report');
    Route::post('reports/{report}/suspend', 'suspend')->name('report.suspend')->whereNumber('report');
    Route::get('reports/{report}/attachment/{message}', 'attachment')->name('report.attachment')->whereNumber(['report', 'message']);
});
