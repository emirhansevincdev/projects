<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlogPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if (!$user) {
            abort(403);
        }
        // Agent + permission false = block
        if ($user->is_agent == true && $user->can_create_blog == false) {
            abort(403, 'You do not have permission to manage blogs');
        }
        return $next($request);
    }
}
