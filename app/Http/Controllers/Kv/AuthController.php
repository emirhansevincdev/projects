<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\User;
use App\Services\Kv\FirmPresenter;
use App\Services\Kv\Totp;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;

class AuthController extends Controller
{
    public static function userPayload(?User $u): ?array
    {
        if (! $u) return null;
        $company = Company::where('user_id', $u->id)->first();
        return [
            'name' => $u->name,
            'email' => $u->email,
            'is_admin' => (int) $u->role === 1,
            'plan' => FirmPresenter::viewerPlan($u),
            'plan_until' => $u->kv_plan_until?->toIso8601String(),
            'company' => $company?->slug,
            'two_factor' => (bool) $u->two_factor_confirmed_at,
        ];
    }

    public function me(Request $r)
    {
        return response()->json(['user' => self::userPayload($r->user())])->header('Cache-Control', 'no-store');
    }

    public function login(Request $r)
    {
        $v = $r->validate([
            'email' => 'required|email|max:254',
            'password' => 'required|string|max:128',
            'code' => 'nullable|string|max:10',
            'remember' => 'nullable|boolean',
        ]);
        $key = 'kv-login|'.Str::lower($v['email']).'|'.$r->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json(['error' => 'locked', 'retry_after' => RateLimiter::availableIn($key)], 429);
        }

        $user = User::where('email', $v['email'])->first();
        // Same message for unknown user / wrong password (no account enumeration).
        if (! $user || ! in_array((int) $user->role, [1, 2], true) || ! Hash::check($v['password'], $user->password)) {
            RateLimiter::hit($key, 900);
            return response()->json(['error' => 'invalid'], 422);
        }
        if ($user->two_factor_confirmed_at) {
            if (empty($v['code'])) {
                return response()->json(['error' => 'two_factor_required'], 401);
            }
            if (! Totp::verify((string) $user->two_factor_secret, $v['code'])) {
                RateLimiter::hit($key, 900);
                return response()->json(['error' => 'two_factor_invalid'], 422);
            }
        }
        if (! $user->email_verified_at) {
            return response()->json(['error' => 'unverified'], 403);
        }

        RateLimiter::clear($key);
        Auth::login($user, (bool) ($v['remember'] ?? false));
        $r->session()->regenerate();
        return response()->json(['ok' => true, 'user' => self::userPayload($user)]);
    }

    public function logout(Request $r)
    {
        Auth::guard('web')->logout();
        $r->session()->invalidate();
        $r->session()->regenerateToken();
        return response()->json(['ok' => true, 'csrf' => csrf_token()]);
    }

    /** Sends the reset link (also used for first-time password setup). Always answers ok. */
    public function forgot(Request $r)
    {
        $v = $r->validate(['email' => 'required|email|max:254']);
        Password::sendResetLink(['email' => $v['email']]);
        return response()->json(['ok' => true]);
    }

    /** Completing a reset/invite also proves ownership of the mailbox → mark e-mail verified. */
    public function setPassword(Request $r)
    {
        $v = $r->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => ['required', 'confirmed', PasswordRule::min(10)->letters()->mixedCase()->numbers()],
        ]);
        $status = Password::reset($v + ['password_confirmation' => $r->input('password_confirmation')], function (User $user, string $password) {
            $user->forceFill(['password' => $password, 'remember_token' => Str::random(60)]);
            if (! $user->email_verified_at) $user->email_verified_at = now();
            $user->save();
            event(new PasswordReset($user));
        });
        return $status === Password::PASSWORD_RESET
            ? response()->json(['ok' => true])
            : response()->json(['error' => 'invalid_token'], 422);
    }

    // ── 2FA (optional, TOTP) ────────────────────────────────────────────────
    public function twoFactorStart(Request $r)
    {
        $u = $r->user();
        $secret = Totp::newSecret();
        $u->forceFill(['two_factor_secret' => $secret, 'two_factor_confirmed_at' => null])->save();
        return response()->json(['secret' => $secret, 'uri' => Totp::uri($secret, $u->email)]);
    }

    public function twoFactorConfirm(Request $r)
    {
        $v = $r->validate(['code' => 'required|string|max:10']);
        $u = $r->user();
        if (! $u->two_factor_secret || ! Totp::verify($u->two_factor_secret, $v['code'])) {
            return response()->json(['error' => 'invalid_code'], 422);
        }
        $u->forceFill(['two_factor_confirmed_at' => now()])->save();
        return response()->json(['ok' => true]);
    }

    public function twoFactorDisable(Request $r)
    {
        $v = $r->validate(['password' => 'required|string']);
        $u = $r->user();
        if (! Hash::check($v['password'], $u->password)) {
            return response()->json(['error' => 'invalid'], 422);
        }
        $u->forceFill(['two_factor_secret' => null, 'two_factor_confirmed_at' => null])->save();
        return response()->json(['ok' => true]);
    }
}
