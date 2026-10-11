<?php

// Member-panel routes: people. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use App\Http\Controllers\Kv\PeopleController;
use Illuminate\Support\Facades\Route;

// list of people from OTHER sectors (names only; contact data needs a reveal)
Route::get('people', [PeopleController::class, 'index'])->middleware(['kv.member:people', 'throttle:60,1,kv-people-list']);

// spend credits to open ONE channel (email|phone) of ONE person; re-opening is free
Route::post('people/{id}/reveal', [PeopleController::class, 'reveal'])->whereNumber('id')->middleware(['kv.member:people', 'throttle:30,1,kv-people-reveal']);

// public KVKK removal request – the only route of this file that guests may call (honeypot + throttle)
Route::post('people/removal-request', [PeopleController::class, 'removalRequest'])->withoutMiddleware('auth')->middleware('throttle:5,10,kv-people-removal');
