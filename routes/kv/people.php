<?php

// Member-panel routes: people. Included from routes/web.php inside Route::prefix('kv')->middleware('auth').
// Protect every route with ->middleware('kv.member:<permission>') and take the company from CompanyContext, never from the request.

use Illuminate\Support\Facades\Route;
