<?php

namespace App\Console\Commands;

use App\Services\Kv\SocialAuth;
use Illuminate\Console\Command;

/**
 * php artisan kervea:social-status — shows, in plain Turkish, whether the Google/LinkedIn buttons are on and why not.
 * Never prints a secret (only whether it is set, its length and its first characters).
 */
class KerveaSocialStatus extends Command
{
    protected $signature = 'kervea:social-status';
    protected $description = 'Google/LinkedIn girişinin açık olup olmadığını ve olası ayar hatalarını gösterir';

    public function handle(): int
    {
        $problems = 0;

        if (app()->configurationIsCached()) {
            $this->warn('⚠ Yapılandırma önbelleği açık: .env içindeki değişiklikler görünmez. Çözüm:  php artisan config:clear');
            $problems++;
        }

        $base = SocialAuth::baseUrl();
        $host = (string) parse_url($base, PHP_URL_HOST);
        $this->line("Site adresi (.env APP_URL): <info>$base</info>");
        if (! str_starts_with($base, 'https://') || in_array($host, ['', 'localhost', '127.0.0.1'], true)) {
            $this->warn('⚠ APP_URL gerçek ve https:// ile başlayan site adresi olmalı (örn. https://kervea.ai). Sağlayıcılar başka adresi kabul etmez.');
            $problems++;
        }

        foreach (SocialAuth::PROVIDERS as $p) {
            $name = ucfirst($p);
            $id = (string) config("kervea.social.$p.client_id");
            $secret = (string) config("kervea.social.$p.client_secret");
            $on = SocialAuth::enabled($p);

            $this->newLine();
            $this->line("<options=bold>$name</>: ".($on ? '<info>AÇIK</info> — giriş sayfasında düğme görünür' : '<comment>KAPALI</comment> — giriş sayfasında düğme gizli'));
            $this->line('  Client ID    : '.($id === '' ? '<comment>BOŞ</comment> (.env: '.strtoupper($p).'_CLIENT_ID)' : substr($id, 0, 6).'… ('.strlen($id).' karakter)'));
            $this->line('  Client secret: '.($secret === '' ? '<comment>BOŞ</comment> (.env: '.strtoupper($p).'_CLIENT_SECRET)' : substr($secret, 0, 3).'… ('.strlen($secret).' karakter)'));
            $this->line('  Sağlayıcıya yazılması gereken adres: <info>'.SocialAuth::redirectUri($p).'</info>');

            foreach ($this->hints($p, $id, $secret) as $hint) {
                $this->warn("  ⚠ $hint");
                $problems++;
            }
            if (! $on && ($id !== '' || $secret !== '')) {
                $this->warn('  ⚠ Biri boş: düğmenin görünmesi için Client ID ve Client secret ikisi de dolu olmalı.');
                $problems++;
            }
        }

        $this->newLine();
        $problems === 0 ? $this->info('Ayarlarda sorun görünmüyor.') : $this->comment("$problems uyarı var (yukarıya bakın).");
        return self::SUCCESS;
    }

    /** @return list<string> */
    private function hints(string $p, string $id, string $secret): array
    {
        $out = [];
        foreach (['Client ID' => $id, 'Client secret' => $secret] as $label => $v) {
            if ($v !== '' && preg_match('/[\s"\'#]|\.\.\./', $v)) {
                $out[] = "$label içinde boşluk, tırnak, # ya da '...' var: .env satırında değerden başka bir şey olmamalı.";
            }
        }
        if ($p === 'google') {
            if ($id !== '' && ! str_ends_with($id, '.apps.googleusercontent.com')) {
                $out[] = "Google Client ID '.apps.googleusercontent.com' ile bitmeli. Yanlış değeri mi yapıştırdınız (Client secret ile karıştırmış olabilirsiniz)?";
            }
            if ($secret !== '' && str_ends_with($secret, '.apps.googleusercontent.com')) {
                $out[] = 'GOOGLE_CLIENT_SECRET satırına Client ID yazılmış. Client secret kısa bir değerdir ve genelde GOCSPX- ile başlar.';
            }
            if ($id !== '' && $id === $secret) {
                $out[] = 'Client ID ile Client secret aynı değer.';
            }
        }
        if ($p === 'linkedin' && $id !== '' && $id === $secret) {
            $out[] = 'Client ID ile Client secret aynı değer.';
        }
        return $out;
    }
}
