<?php

return [
    'asset_version' => env('KERVEA_ASSET_VERSION', '1'),

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

    'stripe' => [
        'secret' => env('STRIPE_SECRET'),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],

    // "Sign in with Google / LinkedIn" (OpenID Connect). Only EXISTING, admin-approved members can sign in this way:
    // no account is ever created from a social login. A provider with an empty id/secret is switched off (its button is hidden).
    // Redirect URI to register at the provider: {APP_URL}/auth/{google|linkedin}/callback
    'social' => [
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
