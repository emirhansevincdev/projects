<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Housekeeping for the member panel (needs the server cron entry documented in docs/KERVEA-KURULUM.md).
Schedule::command('kv:prune-message-files')->daily();
// Kervea analytics: delete counters / visit rows / search log past their retention (config kervea.analytics.*).
// Needs the usual cron entry:  * * * * * cd /path/to/site && php artisan schedule:run >> /dev/null 2>&1
\Illuminate\Support\Facades\Schedule::command('kervea:analytics-prune')->daily();
// Team activity log: delete entries past kervea.team.activity_retention_days.
Schedule::command('kervea:prune-activity')->daily();
