<?php

namespace App\Console\Commands;

use App\Services\Kv\SocialAuth;
use Illuminate\Console\Command;

/**
 * php artisan kervea:social-setup google   (or linkedin)
 *
 * Asks for the Client ID and Client secret (secret typed hidden), checks them for the usual mix-ups and writes them
 * into .env — replacing the empty/old lines, never adding a second copy — then clears the config cache and shows the status.
 * Nothing is echoed back, nothing ends up in the shell history.
 */
class KerveaSocialSetup extends Command
{
    protected $signature = 'kervea:social-setup {provider : google veya linkedin} {--env= : (isteğe bağlı) .env dosyasının yolu}';
    protected $description = 'Google/LinkedIn Client ID ve Client secret değerlerini güvenle .env dosyasına yazar';

    public function handle(): int
    {
        $p = (string) $this->argument('provider');
        if (! SocialAuth::known($p)) {
            $this->error('Sağlayıcı google veya linkedin olmalı.  Örnek:  php artisan kervea:social-setup google');
            return self::FAILURE;
        }
        $file = $this->option('env') ?: base_path('.env');
        if (! is_file($file) || ! is_writable($file)) {
            $this->error("$file bulunamadı ya da yazılamıyor. root olarak çalıştırdığınızdan emin olun.");
            return self::FAILURE;
        }

        $name = ucfirst($p);
        $this->line("<options=bold>$name girişi</>  —  sağlayıcı konsoluna şu yönlendirme adresi yazılmış olmalı:");
        $this->line('  <info>'.SocialAuth::redirectUri($p).'</info>');
        $this->newLine();

        $id = trim((string) $this->ask('Client ID'));
        $secret = trim((string) $this->secret('Client secret (yazarken görünmez)'));

        if ($problems = $this->problems($p, $id, $secret)) {
            foreach ($problems as $m) {
                $this->error($m);
            }
            $this->warn('Hiçbir şey kaydedilmedi. Değerleri kontrol edip komutu yeniden çalıştırın.');
            return self::FAILURE;
        }

        $this->setEnv($file, strtoupper($p).'_CLIENT_ID', $id);
        $this->setEnv($file, strtoupper($p).'_CLIENT_SECRET', $secret);
        $this->info("✔ $name anahtarları .env dosyasına yazıldı.");

        $this->callSilently('config:clear');
        $this->newLine();
        return $this->call('kervea:social-status');
    }

    /** @return list<string> */
    private function problems(string $p, string $id, string $secret): array
    {
        $out = [];
        if ($id === '' || $secret === '') {
            $out[] = 'Client ID ve Client secret ikisi de dolu olmalı.';
        }
        foreach (['Client ID' => $id, 'Client secret' => $secret] as $label => $v) {
            if ($v !== '' && ! preg_match('/^[A-Za-z0-9._~+\/=:-]+$/', $v)) {
                $out[] = "$label içinde izin verilmeyen karakter var (boşluk, tırnak, #, \$ ya da '...' olmamalı). Konsoldan kopyalarken fazladan bir şey gelmiş olabilir.";
            }
        }
        if ($id !== '' && $id === $secret) {
            $out[] = 'Client ID ile Client secret aynı değer: ikisi farklı iki değerdir.';
        }
        if ($p === 'google') {
            if ($id !== '' && ! preg_match('/^\d+-[A-Za-z0-9_]+\.apps\.googleusercontent\.com$/', $id)) {
                $out[] = "Google Client ID şuna benzemeli: 123456789012-abcdefgh.apps.googleusercontent.com (rakamlarla başlar, '.apps.googleusercontent.com' ile biter).";
            }
            if ($secret !== '' && str_ends_with($secret, '.apps.googleusercontent.com')) {
                $out[] = 'Client secret satırına Client ID yapıştırılmış. Client secret kısa bir değerdir ve genelde GOCSPX- ile başlar.';
            }
        }
        return $out;
    }

    /** Sets KEY=value: replaces the first existing line, removes later duplicates (the first one wins in .env), appends if missing. */
    private function setEnv(string $file, string $key, string $value): void
    {
        $lines = preg_split('/\r\n|\n/', (string) file_get_contents($file));
        $done = false;
        $out = [];
        foreach ($lines as $l) {
            if (preg_match('/^\s*(export\s+)?'.preg_quote($key, '/').'\s*=/', $l)) {
                if (! $done) {
                    $out[] = $key.'='.$value;
                    $done = true;
                }
                continue;
            }
            $out[] = $l;
        }
        if (! $done) {
            while ($out && end($out) === '') {
                array_pop($out);
            }
            $out[] = $key.'='.$value;
        }
        $text = rtrim(implode("\n", $out), "\n")."\n";
        file_put_contents($file, $text, LOCK_EX);
    }
}
