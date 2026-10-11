<?php

// Admin routes for people (role 1). Included from routes/web.php inside prefix('admin/kervea'), name('admin.kervea.'), middleware(['auth','admin']).

use App\Http\Controllers\Admin\KerveaPeopleAdminController as P;
use Illuminate\Support\Facades\Route;

Route::get('people', [P::class, 'index'])->name('people');
Route::post('people', [P::class, 'store'])->middleware('throttle:60,1,kv-admin-people-write')->name('people.store');

Route::get('people/import', [P::class, 'importForm'])->name('people.import');
Route::get('people/import/template', [P::class, 'importTemplate'])->name('people.import.template');
Route::post('people/import', [P::class, 'importRun'])->middleware('throttle:10,1,kv-admin-people-import')->name('people.import.run');

Route::get('people/removals', [P::class, 'removals'])->name('people.removals');
Route::post('people/removals/{removal}/done', [P::class, 'removalDone'])->whereNumber('removal')->name('people.removal.done');
Route::post('people/removals/{removal}/reject', [P::class, 'removalReject'])->whereNumber('removal')->name('people.removal.reject');

Route::get('people/{person}/edit', [P::class, 'edit'])->whereNumber('person')->name('people.edit');
Route::put('people/{person}', [P::class, 'update'])->whereNumber('person')->middleware('throttle:60,1,kv-admin-people-write')->name('people.update');
Route::delete('people/{person}', [P::class, 'destroy'])->whereNumber('person')->name('people.delete');
