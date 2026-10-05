<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Closes the legacy template routes (see routes/web.php) unless explicitly re-enabled. */
class LegacyRoutes
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(config('kervea.legacy_routes'), 404);
        return $next($request);
    }
}
