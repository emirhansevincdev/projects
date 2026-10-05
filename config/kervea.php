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
];
