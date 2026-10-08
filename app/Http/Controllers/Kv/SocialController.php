<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\SocialIdentity;
use App\Models\User;
use App\Services\Kv\SocialAuth;
use App\Services\Kv\SocialAuthException;
use App\Services\Kv\Totp;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

/**
 * "Sign in with Google / LinkedIn" for EXISTING members only.
 *
 * Accounts are still created exclusively when an admin approves a company application, so a social login never
 * creates a user: it either signs in a member whose (provider-verified) e-mail we already know, or it is refused.
 * Admins must use their password. Members with 2FA still have to enter their authenticator code.
 */
class SocialController extends Controller
{
    private const FLOW_TTL = 600;     // seconds the user may spend on the provider's page
    private const TFA_TTL = 300;      // seconds to type the 2FA code after coming back

    public function redirect(Request $r, string $provider)
    {
        abort_unless(SocialAuth::known($provider), 404);
        if (! SocialAuth::enabled($provider)) {
            return $this->fail('unavailable');
        }
        if (Auth::check()) {
            return $this->home(Auth::user());
        }

        // The state lives in a host-only session cookie, and the provider sends the browser back to the APP_URL host.
        // So the flow must start on that host (e.g. visitors who arrived on www.): hop there once (?c=1 prevents any loop).
        $canon = parse_url(SocialAuth::baseUrl());
        if (! $r->query('c') && ! empty($canon['host']) && ($r->getHost() !== $canon['host'] || (($canon['scheme'] ?? '') === 'https' && ! $r->isSecure()))) {
            return redirect()->away(SocialAuth::baseUrl()."/auth/$provider/redirect?c=1")->header('Cache-Control', 'no-store');
        }

        $state = Str::random(40);
        $verifier = SocialAuth::usesPkce($provider) ? SocialAuth::newVerifier() : null;
        $r->session()->put('kv_oauth', ['provider' => $provider, 'state' => $state, 'verifier' => $verifier, 'exp' => now()->timestamp + self::FLOW_TTL]);

        return redirect()->away(SocialAuth::authorizeUrl($provider, $state, $verifier))->header('Cache-Control', 'no-store');
    }

    public function callback(Request $r, string $provider)
    {
        abort_unless(SocialAuth::known($provider), 404);
        $flow = $r->session()->pull('kv_oauth');         // single use: a replayed callback finds nothing
        if (! SocialAuth::enabled($provider)) {
            return $this->fail('unavailable');
        }
        if (Auth::check()) {
            return $this->home(Auth::user());
        }
        if (! is_array($flow) || ($flow['provider'] ?? null) !== $provider || ($flow['exp'] ?? 0) < now()->timestamp
            || ! is_string($r->query('state')) || ! hash_equals((string) $flow['state'], $r->query('state'))) {
            return $this->fail('expired');
        }
        if ($r->query('error') !== null) {
            return $this->fail(in_array($r->query('error'), ['access_denied', 'user_cancelled_login', 'user_cancelled_authorize'], true) ? 'cancelled' : 'failed');
        }
        $code = $r->query('code');
        if (! is_string($code) || $code === '' || strlen($code) > 2048) {
            return $this->fail('failed');
        }

        try {
            $p = SocialAuth::profile($provider, $code, $flow['verifier'] ?? null);
        } catch (SocialAuthException $e) {
            Log::warning('kv.social: '.$e->getMessage());
            return $this->fail('failed');
        }
        if (! $p['email_verified']) {
            return $this->fail('email_unverified');
        }

        $identity = SocialIdentity::where('provider', $provider)->where('provider_user_id', $p['id'])->first();
        if ($identity && ! hash_equals((string) $identity->provider_user_id, $p['id'])) {
            $identity = null;                      // case-insensitive column collation matched a different id
        }
        $user = $identity ? User::find($identity->user_id) : null;
        if ($identity && ! $user) {
            $identity->delete();                   // the linked account is gone (users table without FK cascade): the old link is void
            $identity = null;
        }
        $user ??= User::whereRaw('LOWER(email) = ?', [$p['email']])->first();

        if (! $user || (int) $user->role !== 2) {
            // Unknown address → not a member yet (never create one). Admin → password only.
            return $this->fail($user && (int) $user->role === 1 ? 'admin_password' : 'not_member');
        }
        if (! $identity && SocialIdentity::where('user_id', $user->id)->where('provider', $provider)->exists()) {
            // The member is already tied to another account of this provider (e.g. a recycled e-mail address): do not re-link by e-mail.
            return $this->fail('other_account');
        }

        $pending = ['user_id' => $user->id, 'provider' => $provider, 'provider_user_id' => $p['id'], 'email' => $p['email']];
        if ($user->two_factor_confirmed_at) {
            $r->session()->put('kv_social_2fa', $pending + ['exp' => now()->timestamp + self::TFA_TTL]);
            return redirect('/login?social=two_factor')->header('Cache-Control', 'no-store');
        }

        $this->signIn($r, $user, $pending);
        return $this->home($user);
    }

    /** Second step for members with 2FA: POST {code} right after coming back from the provider. */
    public function twoFactor(Request $r)
    {
        $v = $r->validate(['code' => 'required|string|max:10']);
        $pending = $r->session()->get('kv_social_2fa');
        if (! is_array($pending) || ($pending['exp'] ?? 0) < now()->timestamp) {
            $r->session()->forget('kv_social_2fa');
            return response()->json(['error' => 'expired'], 422);
        }
        $key = 'kv-social-2fa|'.$pending['user_id'].'|'.$r->ip();
        $userKey = 'kv-social-2fa|'.$pending['user_id'];           // across all IPs: a distributed guesser is slowed down too
        if (RateLimiter::tooManyAttempts($key, 5) || RateLimiter::tooManyAttempts($userKey, 15)) {
            $r->session()->forget('kv_social_2fa');
            return response()->json(['error' => 'locked', 'retry_after' => max(RateLimiter::availableIn($key), RateLimiter::availableIn($userKey))], 429);
        }
        $user = User::find($pending['user_id']);
        if (! $user || (int) $user->role !== 2 || ! $user->two_factor_confirmed_at || ! Totp::verify((string) $user->two_factor_secret, $v['code'])) {
            RateLimiter::hit($key, 900);
            RateLimiter::hit($userKey, 900);
            return response()->json(['error' => 'two_factor_invalid'], 422);
        }

        RateLimiter::clear($key);
        RateLimiter::clear($userKey);
        $this->signIn($r, $user, $pending);
        return response()->json(['ok' => true, 'user' => AuthController::userPayload($user), 'csrf' => csrf_token()]);
    }

    /** Links the provider account (first time), marks the mailbox verified and opens the session. */
    private function signIn(Request $r, User $user, array $link): void
    {
        try {
            $identity = SocialIdentity::firstOrCreate(
                ['provider' => $link['provider'], 'provider_user_id' => $link['provider_user_id']],
                ['user_id' => $user->id, 'email' => $link['email']]
            );
        } catch (QueryException $e) {
            // Lost a race against a parallel link of the same account; the unique keys keep it consistent.
            $identity = SocialIdentity::where('provider', $link['provider'])->where('provider_user_id', $link['provider_user_id'])->first();
        }
        abort_unless($identity && (int) $identity->user_id === (int) $user->id, 403);

        $identity->forceFill(['last_login_at' => now()])->save();
        if (! $user->email_verified_at) {
            $user->forceFill(['email_verified_at' => now()])->save();      // the provider proved the mailbox
        }

        Auth::login($user, false);
        $r->session()->forget('kv_social_2fa');
        $r->session()->regenerate();      // new session id + CSRF token (fixation)
    }

    private function home(User $user)
    {
        return redirect((int) $user->role === 1 ? '/admin/kervea/applications' : '/panel')->header('Cache-Control', 'no-store');
    }

    /** Only a short code travels in the URL; the page translates it (no provider text is ever echoed). */
    private function fail(string $code)
    {
        return redirect('/login?social='.$code)->header('Cache-Control', 'no-store');
    }
}
