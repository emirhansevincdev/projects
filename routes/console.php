<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Kervea analytics: delete counters / visit rows / search log past their retention (config kervea.analytics.*).
// Needs the usual cron entry:  * * * * * cd /path/to/site && php artisan schedule:run >> /dev/null 2>&1
\Illuminate\Support\Facades\Schedule::command('kervea:analytics-prune')->daily();
