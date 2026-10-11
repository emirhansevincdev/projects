<?php

namespace App\Http\Middleware;

use App\Models\Kv\Company;
use App\Services\Kv\CompanyContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Route middleware `kv.member[:permission,…]`.
 * Lets a request through only for a signed-in person who works for an APPROVED company and (when given) holds ALL listed
 * permissions. The resolved context is available as $request->attributes->get('kv_ctx') (see CompanyContext).
 */
class KvMember
{
    public function handle(Request $request, Closure $next, string ...$perms): Response
    {
        $ctx = CompanyContext::forRequest($request);
        if (! $ctx || $ctx['company']->status !== Company::STATUS_APPROVED) {
            return response()->json(['error' => 'no_company'], 403);
        }
        foreach ($perms as $p) {
            if (! in_array($p, $ctx['perms'], true)) {
                return response()->json(['error' => 'forbidden', 'need' => $p], 403);
            }
        }
        return $next($request);
    }
}
