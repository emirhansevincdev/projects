<?php

namespace App\Console\Commands;

use App\Models\Kv\SocialIdentity;
use App\Services\Kv\SocialAuth;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

/**
 * php artisan kervea:social-unlink linkedin uye@firma.com   (one member)
 * php artisan kervea:social-unlink linkedin --all           (everybody, e.g. after the LinkedIn app was re-created)
 *
 * Google/LinkedIn accounts are tied to a member by the provider's own user id. When that id changes (new LinkedIn app,
 * re-created Google account) the member sees "Farklı hesap bağlı"; clearing the link lets the next sign-in with the
 * verified e-mail link the new id (2FA still applies). Password login keeps working in the meantime.
 */
class KerveaSocialUnlink extends Command
{
    protected $signature = 'kervea:social-unlink {provider : google veya linkedin} {email? : Üyenin e-posta adresi} {--all : Bu sağlayıcıdaki tüm bağlantıları sil}';
    protected $description = 'Üyenin Google/LinkedIn bağlantısını siler (üye bir sonraki girişte yeniden bağlanır)';

    public function handle(): int
    {
        $provider = (string) $this->argument('provider');
        if (! SocialAuth::known($provider)) {
            $this->error('Sağlayıcı google veya linkedin olmalı.');
            return self::FAILURE;
        }

        $q = SocialIdentity::where('provider', $provider);
        if (! $this->option('all')) {
            $email = Str::lower(trim((string) $this->argument('email')));
            if ($email === '') {
                $this->error('Üyenin e-posta adresini yazın ya da tüm bağlantılar için --all ekleyin.');
                return self::FAILURE;
            }
            $q->whereIn('user_id', \App\Models\User::whereRaw('LOWER(email) = ?', [$email])->select('id'));
        } elseif (! $this->confirm("Tüm $provider bağlantıları silinsin mi? (Üyeler bir sonraki girişte yeniden bağlanır.)", false)) {
            return self::SUCCESS;
        }

        $n = $q->delete();
        $this->info("$n bağlantı silindi.");
        return self::SUCCESS;
    }
}
