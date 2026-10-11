<?php

return [
    // Cache-buster for kervea.css / kervea-*.js: follows the files' modification time, so returning visitors get new code after an upload.
    'asset_version' => env('KERVEA_ASSET_VERSION') ?: (string) max(
        (int) @filemtime(__DIR__.'/../public/kervea/js/kervea-api.js'),
        (int) @filemtime(__DIR__.'/../public/kervea/js/kervea-app.js'),
        (int) @filemtime(__DIR__.'/../public/kervea/css/kervea.css'),
        1
    ),

    // Legacy template routes (directory/listing front-end, customer/agent areas, installer). Keep false.
    'legacy_routes' => (bool) env('KERVEA_LEGACY_ROUTES', false),

    // Notifications about new applications / contact messages (falls back to all admin users).
    'admin_email' => env('KERVEA_ADMIN_EMAIL'),

    // Pricing is decided on the server only; the front-end merely displays it.
    // Customer still has to confirm the final base fee (240 vs 280 USD).
    'premium' => [
        'price_usd' => (int) env('KERVEA_PREMIUM_PRICE_USD', 280),
        'currency' => 'USD',
        'period_days' => 365,
    ],

    // "About" copy for the company description (customer spec: 250–300 words).
    'description_words' => ['min' => 250, 'max' => 300],

    'uploads' => [
        'image_max_kb' => 5120,
        'logo_max_kb' => 2048,
        'doc_max_kb' => 10240,
        'max_photos' => 5,
        'max_docs' => 20,
    ],

    // Panel features (credits, people, messaging, analytics, team). Amounts are decided on the server only.
    'credits' => [
        'signup' => 50,                    // granted when an application is approved ("üye olduğunda otomatik 50 kredi")
        'pro_bonus' => 100,                // granted on every Premium purchase
        'reveal_email' => 1,               // credits to open ONE person's e-mail
        'reveal_phone' => 1,               // credits to open ONE person's phone
        'packs' => [                       // credits => price in USD
            100 => 10,
            500 => 45,
            1000 => 85,
        ],
    ],
    'people' => [
        'page_size' => 25,
        'daily_reveal_limit' => 200,       // anti-scraping ceiling per company and day (credits are the main limit)
    ],
    'messaging' => [
        'max_body' => 4000,
        'max_attachment_kb' => 5120,
        'new_conversations_per_day' => 20,
    ],
    'analytics' => [
        'retention_days' => 400,
        'min_peers_for_benchmark' => 5,    // sector benchmark is shown only when at least this many firms are compared
    ],
    'team' => [
        // Seats include the owner (prototype: "4/10 koltuk"): owner + invited/active/disabled people may not exceed this.
        'max_members' => 10,
        'invite_days' => 7,                // informational: the password-setup link itself lives as long as auth.passwords.users.expire (24 h); "resend" issues a fresh one
        'invites_per_day' => 20,           // invitation + resend e-mails one company may trigger per rolling 24 h (anti mail-bombing)
        'activity_limit' => 100,           // entries returned by GET /kv/activity
        'activity_retention_days' => 400,  // older kv_activity rows are removed by `php artisan kv:prune-activity`
        // roles: default permissions per role; the owner always has all of them and is not a role you can assign
        'roles' => [
            'admin' => ['label' => 'Yönetici', 'perms' => ['matches', 'profile', 'docs', 'messages', 'people', 'analytics', 'team']],
            'sales' => ['label' => 'Satış', 'perms' => ['matches', 'messages', 'people']],
            'ops' => ['label' => 'Operasyon', 'perms' => ['profile', 'docs']],
        ],
        // permission catalogue (labels are Turkish source texts; the panel translates them by key)
        'perms' => [
            'matches' => ['label' => 'Eşleşmeler', 'group' => 'work'],
            'messages' => ['label' => 'Mesajlar', 'group' => 'work'],
            'people' => ['label' => 'Kişiler', 'group' => 'work'],
            'analytics' => ['label' => 'Analiz', 'group' => 'work'],
            'profile' => ['label' => 'Firma profili', 'group' => 'company'],
            'docs' => ['label' => 'Belgeler', 'group' => 'company'],
            'team' => ['label' => 'Ekip ve aktivite', 'group' => 'admin'],
            'billing' => ['label' => 'Premium ve kredi satın alma', 'group' => 'admin'],
        ],
        // only the company owner may hand these out (and manage people who hold them)
        'owner_only_perms' => ['team', 'billing'],
    ],

    'stripe' => [
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],

    // "Sign in with Google / LinkedIn" (OpenID Connect). Only EXISTING, admin-approved members can sign in this way:
    // no account is ever created from a social login. A provider with an empty id/secret is switched off (its button is hidden).
    // Redirect URI to register at the provider: {APP_URL}/auth/{google|linkedin}/callback
    // (this template's config/app.php derives app.url from the request host, NOT from .env, so APP_URL is read here directly.)
    'social' => [
        'redirect_base' => env('APP_URL'),
        'google' => [
            'client_id' => env('GOOGLE_CLIENT_ID'),
            'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        ],
        'linkedin' => [
            'client_id' => env('LINKEDIN_CLIENT_ID'),
            'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
        ],
    ],
];
