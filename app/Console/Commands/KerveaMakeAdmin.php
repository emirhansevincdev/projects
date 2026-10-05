<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

/** php artisan kervea:make-admin — creates (or promotes) an administrator without putting the password in shell history. */
class KerveaMakeAdmin extends Command
{
    protected $signature = 'kervea:make-admin {email? : Yönetici e-posta adresi} {--name= : Görünen ad}';
    protected $description = 'Kervea yönetici hesabı oluşturur (veya mevcut hesabı yönetici yapar)';

    public function handle(): int
    {
        $email = $this->argument('email') ?: $this->ask('Yönetici e-posta adresi');
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Geçerli bir e-posta adresi girin.');
            return self::FAILURE;
        }

        $user = User::where('email', $email)->first();
        if ($user) {
            if (! $this->confirm("{$email} zaten kayıtlı. Yönetici yapılsın ve parolası değiştirilsin mi?", false)) {
                return self::SUCCESS;
            }
        }

        $password = $this->secret('Parola (en az 12 karakter)');
        if (strlen((string) $password) < 12) {
            $this->error('Parola en az 12 karakter olmalı.');
            return self::FAILURE;
        }
        if ($password !== $this->secret('Parolayı tekrar yazın')) {
            $this->error('Parolalar eşleşmiyor.');
            return self::FAILURE;
        }

        $user ??= new User(['email' => $email]);
        $user->name = $this->option('name') ?: ($user->name ?: 'Yönetici');
        $user->password = $password;
        $user->role = 1;
        $user->email_verified_at = $user->email_verified_at ?: now();
        \App\Services\Kv\LegacyUserColumns::apply($user, 'admin');
        $user->save();

        $this->info("Tamam: {$email} yönetici olarak hazır. Giriş: /giris");
        return self::SUCCESS;
    }
}
