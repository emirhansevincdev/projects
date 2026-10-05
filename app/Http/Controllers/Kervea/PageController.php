<?php

namespace App\Http\Controllers\Kervea;

use App\Http\Controllers\Controller;

class PageController extends Controller
{
    /** Single-shell pages: the Kervea front-end switches views client-side. */
    public function show(string $view = 'home', ?string $firm = null)
    {
        return view('kervea.layout', [
            'boot' => ['view' => $view, 'firm' => $firm],
        ]);
    }
}
