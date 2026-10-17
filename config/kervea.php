<?php

return [
    // Cache-buster for the Kervea js/css files: follows their newest modification time, so returning visitors get new code after an upload.
    'asset_version' => env('KERVEA_ASSET_VERSION') ?: (string) max(array_merge(
        [1],
        array_map(fn ($f) => (int) @filemtime($f), array_merge(glob(__DIR__.'/../public/kervea/js/*.js') ?: [], glob(__DIR__.'/../public/kervea/css/*.css') ?: []))
    )),

    // Legacy template routes (directory/listing front-end, customer/agent areas, installer). Keep false.
    'legacy_routes' => (bool) env('KERVEA_LEGACY_ROUTES', false),

    // Notifications about new applications / contact messages (falls back to all admin users).
    'admin_email' => env('KERVEA_ADMIN_EMAIL'),

    // Pricing is decided on the server only; the front-end merely displays it.
    // The final base fee (240 or 280 USD) still has to be confirmed.
    'premium' => [
        'price_usd' => (int) env('KERVEA_PREMIUM_PRICE_USD', 280),
        'currency' => 'USD',
        'period_days' => 365,
    ],

    // "About" copy for the company description (250–300 words).
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
        'import_max_rows' => 2000,         // admin CSV import: rows per file (all-or-nothing refusal above this)
    ],
    'messaging' => [
        'max_body' => 4000,
        'max_attachment_kb' => 5120,
        'new_conversations_per_day' => 20,
    ],
    'analytics' => [
        'retention_days' => 400,           // daily counters and profile-view rows older than this are deleted by kervea:analytics-prune
        'search_log_retention_days' => 90, // the search log (what people typed) is kept shorter
        'min_peers_for_benchmark' => 5,    // sector benchmark is shown only when at least this many firms are compared
        'view_dedupe_minutes' => 30,       // the same viewer opening the same company page again within this time is ONE visit
        'impression_cards' => 24,          // how many cards of the first result page count as "seen" (search impression)
        'search_log_per_minute' => 10,     // search-log rows one viewer can create per minute (anti-spam)
        'country_header' => 'CF-IPCountry', // request header that carries a guest's country (set by Cloudflare); absent = country unknown
    ],
    'team' => [
        // Seats include the owner (e.g. "4/10 seats"): owner + invited/active/disabled people may not exceed this.
        'max_members' => 10,
        'invite_days' => 7,                // informational: the password-setup link itself lives as long as auth.passwords.users.expire (24 h); "resend" issues a fresh one
        'invites_per_day' => 20,           // invitation + resend e-mails one company may trigger per rolling 24 h (anti mail-bombing)
        'activity_limit' => 100,           // entries returned by GET /kv/activity
        'activity_retention_days' => 400,  // older kv_activity rows are removed by `php artisan kervea:prune-activity` (schedule it daily)
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

    // Public site details shown on the contact page, About page and footer. Everything is optional: an empty value shows
    // a clearly marked placeholder (contact / About) or hides the item (social icons) until it is filled in .env.
    'frontend' => [
        'contact_email' => env('KERVEA_CONTACT_EMAIL', 'hello@kervea.ai'),
        'contact_phone' => env('KERVEA_CONTACT_PHONE'),
        'address' => env('KERVEA_ADDRESS'),
        'legal_name' => env('KERVEA_LEGAL_NAME'),
        'mersis' => env('KERVEA_MERSIS'),
        'founders' => env('KERVEA_FOUNDERS'),
        'links' => [
            'linkedin' => env('KERVEA_LINK_LINKEDIN'),
            'x' => env('KERVEA_LINK_X'),
            'youtube' => env('KERVEA_LINK_YOUTUBE'),
            'instagram' => env('KERVEA_LINK_INSTAGRAM'),
        ],
    ],
];
