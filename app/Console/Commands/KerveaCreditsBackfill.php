<?php

namespace App\Console\Commands;

use App\Models\Kv\Company;
use App\Services\Kv\CreditService;
use Illuminate\Console\Command;

/**
 * php artisan kervea:credits-backfill [--dry-run] [--audit]
 *
 * Gives the signup credits (config kervea.credits.signup) to every APPROVED company that never got them (companies
 * approved before credits existed). Idempotent: the ledger key "signup:<company id>" makes a second run a no-op.
 * --audit additionally checks that every ledger adds up to the stored balance.
 */
class KerveaCreditsBackfill extends Command
{
    protected $signature = 'kervea:credits-backfill {--dry-run : Sadece kaç firmanın kredi alacağını göster} {--audit : Defter toplamı ile bakiyeyi karşılaştır}';
    protected $description = 'Onaylı ama henüz üyelik kredisi almamış firmalara kredi verir (tekrar çalıştırmak güvenlidir)';

    public function handle(): int
    {
        $amount = (int) config('kervea.credits.signup', 0);
        if ($amount < 1) {
            $this->warn('config kervea.credits.signup 0: verilecek kredi yok.');
            return self::SUCCESS;
        }
        $dry = (bool) $this->option('dry-run');
        $n = CreditService::backfillSignup($dry);
        $this->info($dry ? "$n firma $amount'şer kredi alacak (dry-run: hiçbir şey yazılmadı)." : "$n firmaya $amount'şer kredi verildi.");

        if ($this->option('audit')) {
            $bad = 0;
            Company::query()->orderBy('id')->each(function (Company $c) use (&$bad) {
                $a = CreditService::audit($c->id);
                if (! $a['ok']) {
                    $bad++;
                    $this->error("#{$c->id} {$c->name}: defter toplamı {$a['sum']}, bakiye {$a['balance']}");
                }
            });
            $bad ? $this->error("$bad firmada tutarsızlık var.") : $this->info('Tüm firmalarda defter toplamı bakiyeye eşit.');
            return $bad ? self::FAILURE : self::SUCCESS;
        }
        return self::SUCCESS;
    }
}
