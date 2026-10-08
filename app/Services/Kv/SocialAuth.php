<?php

namespace App\Services\Kv;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * Minimal OpenID Connect "authorization code" client for Google and LinkedIn (no extra composer package).
 * The code is exchanged server-to-server and the profile is read from the provider's userinfo endpoint over TLS,
 * so no ID-token signature handling is needed.
 */
class SocialAuth
{
    public const PROVIDERS = ['google', 'linkedin'];

    private const SPEC = [
        'google' => [
            'authorize' => 'https://accounts.google.com/o/oauth2/v2/auth',
            'token' => 'https://oauth2.googleapis.com/token',
            'userinfo' => 'https://openidconnect.googleapis.com/v1/userinfo',
            'scope' => 'openid email profile',
            'pkce' => true,
            'extra' => ['prompt' => 'select_account'],
        ],
        'linkedin' => [
            'authorize' => 'https://www.linkedin.com/oauth/v2/authorization',
            'token' => 'https://www.linkedin.com/oauth/v2/accessToken',
            'userinfo' => 'https://api.linkedin.com/v2/userinfo',
            'scope' => 'openid profile email',
            'pkce' => false,     // LinkedIn only documents PKCE for public (native) clients
            'extra' => [],
        ],
    ];

    public static function known(string $provider): bool
    {
        return in_array($provider, self::PROVIDERS, true);
    }

    public static function enabled(string $provider): bool
    {
        return self::known($provider)
            && filled(config("kervea.social.$provider.client_id"))
            && filled(config("kervea.social.$provider.client_secret"));
    }

    /** @return array<string,bool> */
    public static function enabledMap(): array
    {
        return collect(self::PROVIDERS)->mapWithKeys(fn ($p) => [$p => self::enabled($p)])->all();
    }

    /** Must match, character for character, the URI registered in the provider's console. */
    public static function redirectUri(string $provider): string
    {
        return rtrim((string) config('app.url'), '/')."/auth/$provider/callback";
    }

    public static function usesPkce(string $provider): bool
    {
        return self::SPEC[$provider]['pkce'];
    }

    public static function newVerifier(): string
    {
        return self::b64url(random_bytes(32));
    }

    public static function authorizeUrl(string $provider, string $state, ?string $verifier): string
    {
        $s = self::SPEC[$provider];
        $q = [
            'response_type' => 'code',
            'client_id' => config("kervea.social.$provider.client_id"),
            'redirect_uri' => self::redirectUri($provider),
            'scope' => $s['scope'],
            'state' => $state,
        ] + $s['extra'];
        if ($s['pkce'] && $verifier) {
            $q['code_challenge'] = self::b64url(hash('sha256', $verifier, true));
            $q['code_challenge_method'] = 'S256';
        }
        return $s['authorize'].'?'.http_build_query($q, '', '&', PHP_QUERY_RFC3986);
    }

    /**
     * Exchanges the authorization code and returns the provider profile:
     * ['id' => stable provider user id, 'email' => lower-case, 'email_verified' => bool, 'name' => string]
     *
     * @throws SocialAuthException
     */
    public static function profile(string $provider, string $code, ?string $verifier): array
    {
        $s = self::SPEC[$provider];
        $form = [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_uri' => self::redirectUri($provider),
            'client_id' => config("kervea.social.$provider.client_id"),
            'client_secret' => config("kervea.social.$provider.client_secret"),
        ];
        if ($s['pkce'] && $verifier) {
            $form['code_verifier'] = $verifier;
        }

        try {
            $token = Http::asForm()->acceptJson()->connectTimeout(5)->timeout(10)->post($s['token'], $form);
            if (! $token->successful() || ! is_string($token->json('access_token')) || $token->json('access_token') === '') {
                throw new SocialAuthException("$provider token endpoint answered ".$token->status());
            }
            $info = Http::withToken($token->json('access_token'))->acceptJson()->connectTimeout(5)->timeout(10)->get($s['userinfo']);
            if (! $info->successful()) {
                throw new SocialAuthException("$provider userinfo answered ".$info->status());
            }
            $data = $info->json();
        } catch (ConnectionException|RequestException $e) {
            throw new SocialAuthException("$provider unreachable: ".$e::class, 0, $e);
        }

        $id = $data['sub'] ?? null;
        $id = is_string($id) || is_int($id) ? (string) $id : '';
        if ($id === '' || strlen($id) > 191) {
            throw new SocialAuthException("$provider returned no usable user id");
        }
        $email = Str::lower(trim((string) ($data['email'] ?? '')));
        if ($email !== '' && (strlen($email) > 254 || ! filter_var($email, FILTER_VALIDATE_EMAIL))) {
            $email = '';
        }

        return [
            'id' => $id,
            'email' => $email,
            // Only an e-mail the provider itself says it has verified may be used to find the member.
            'email_verified' => $email !== '' && filter_var($data['email_verified'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'name' => Str::limit(trim((string) ($data['name'] ?? '')), 120, ''),
        ];
    }

    private static function b64url(string $bin): string
    {
        return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
    }
}
