<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Frontend\LanguageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
| Kervea has a single sign-in/registration experience (the Kervea front-end: /login and /add-company).
| The template's own open registration / login / reset endpoints were removed on purpose:
| accounts are only created when an admin approves a company application, and every login
| goes through App\Http\Controllers\Kv\AuthController (throttled, 2FA-aware, e-mail verified).
| The route NAMES are kept because framework code and legacy controllers still call route('login').
*/
Route::middleware('guest')->group(function () {
    // /login itself is the Kervea sign-in page (routes/web.php, route name 'login').
    Route::redirect('register', '/add-company')->name('register');
    Route::redirect('forgot-password', '/login')->name('password.request');
});

Route::redirect('reset-password/{token}', '/login')->name('password.reset');

Route::middleware('auth')->group(function () {
    Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::post('/update-language', [LanguageController::class, 'updateLanguage'])->name('user.language.update');
