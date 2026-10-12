<?php

namespace App\Console\Commands;

use App\Services\Kv\Activity;
use Illuminate\Console\Command;

/** php artisan kervea:prune-activity — removes activity-log entries older than kervea.team.activity_retention_days. */
class KerveaPruneActivity extends Command
{
    protected $signature = 'kervea:prune-activity {--days= : Saklama süresi (gün); boşsa config kervea.team.activity_retention_days}';
    protected $description = 'Süresi dolan firma aktivite kayıtlarını siler';

    public function handle(): int
    {
        $days = (int) ($this->option('days') ?: config('kervea.team.activity_retention_days', 400));
        $n = Activity::prune($days);
        $this->info("{$n} aktivite kaydı silindi ({$days} günden eski).");
        return self::SUCCESS;
    }
}
