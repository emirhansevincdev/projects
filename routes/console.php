<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Housekeeping for the member panel (needs the server cron entry documented in docs/KERVEA-KURULUM.md).
Schedule::command('kv:prune-message-files')->daily();
