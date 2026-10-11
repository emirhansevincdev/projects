<?php

// Admin routes for the public front-end (role 1). Included from routes/web.php inside prefix('admin/kervea'), name('admin.kervea.'), middleware(['auth','admin']).

use App\Http\Controllers\Admin\NewsletterAdminController;
use Illuminate\Support\Facades\Route;

Route::get('newsletter', [NewsletterAdminController::class, 'index'])->name('newsletter');
Route::get('newsletter/export', [NewsletterAdminController::class, 'export'])->name('newsletter.export');
Route::delete('newsletter/{subscriber}', [NewsletterAdminController::class, 'destroy'])->name('newsletter.delete');
