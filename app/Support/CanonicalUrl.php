<?php

namespace App\Support;

use Illuminate\Support\Facades\URL;

/**
 * This template's config/app.php derives app.url from the request's Host header, which an attacker controls:
 * a password-reset request sent with "Host: evil.example" would mail a genuine link that points to evil.example.
 * When APP_URL names a real public address, every generated URL (url(), route(), mail links, config('app.url')) is pinned to it.
 * Local addresses (localhost, 127.x, *.test, *.local) are left alone so development keeps working.
 */
class CanonicalUrl
{
    /** The pinned base ("https://kervea.ai") or null when APP_URL is missing, malformed or a local address. */
    public static function base(?string $configured = null): ?string
    {
        $raw = trim((string) ($configured ?? config('kervea.social.redirect_base')));
        $p = parse_url($raw);
        if (! $p || empty($p['scheme']) || empty($p['host']) || ! in_array(strtolower($p['scheme']), ['http', 'https'], true)) {
            return null;
        }
        $host = strtolower($p['host']);
        if (in_array($host, ['localhost', '127.0.0.1', '::1', '[::1]', '0.0.0.0'], true) || preg_match('/\.(test|local|localhost|invalid|example)$/', $host)) {
            return null;
        }
        return strtolower($p['scheme']).'://'.$host.(isset($p['port']) ? ':'.$p['port'] : '');
    }

    public static function apply(?string $configured = null): ?string
    {
        $base = self::base($configured);
        if ($base === null) {
            return null;
        }
        config(['app.url' => $base]);
        URL::forceRootUrl($base);
        URL::forceScheme(parse_url($base, PHP_URL_SCHEME));
        return $base;
    }
}
