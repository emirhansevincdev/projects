<?php


use App\Http\Controllers\Admin\AdminCalendlyController;

use App\Http\Controllers\Agent\AgentCalendlyController;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;



Route::prefix('admin')->middleware(['auth', 'anyAuth'])->group(function () {
  Route::get('calendly/settings', [AdminCalendlyController::class, 'calendly_settings'])->name('admin.calendly.settings');
  Route::post('calendly/settings/update', [AdminCalendlyController::class, 'calendly_settings_update'])->name('admin.calendly-setting-update');

});

Route::prefix('agent')->middleware(['auth', 'anyAuth'])->group(function () {
  Route::get('calendly/settings', [AgentCalendlyController::class, 'calendly_settings'])->name('agent.calendly.settings');
  Route::post('calendly/settings/update', [AgentCalendlyController::class, 'calendly_settings_update'])->name('agent.calendly-setting-update');

});