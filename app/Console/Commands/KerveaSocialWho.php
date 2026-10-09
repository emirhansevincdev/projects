<?php

namespace App\Console\Commands;

use App\Models\Kv\Company;
use App\Models\Kv\SocialIdentity;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

/**
 * php artisan kervea:social-who ornek@gmail.com
 *
 * "I applied and was approved, why does Google say there is no membership?" — answers that question for one e-mail address
 * by applying exactly the rules of the Google/LinkedIn sign-in (SocialController::callback).
 */
class KerveaSocialWho extends Command
{
    protected $signature = 'kervea:social-who {email : Google/LinkedIn hesabının e-posta adresi}';
    protected $description = 'Bu e-posta ile Google/LinkedIn girişinin neden çalıştığını ya da çalışmadığını açıklar';

    public function handle(): int
    {
        $email = Str::lower(trim((string) $this->argument('email')));
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Geçerli bir e-posta adresi yazın.');
            return self::FAILURE;
        }
        $this->line("E-posta: <info>$email</info>");
        $this->newLine();

        $user = User::whereRaw('LOWER(email) = ?', [$email])->first();
        $companies = Company::where(fn ($q) => $q->whereRaw('LOWER(email) = ?', [$email])->orWhereRaw('LOWER(rep_email) = ?', [$email]))->get();

        // 1) the member account
        if ($user) {
            $roleName = match ((int) $user->role) { 1 => 'yönetici', 2 => 'üye', default => 'üye değil (eski şablondan kalma rol '.$user->role.')' };
            $this->line("Kullanıcı hesabı : VAR (id {$user->id}, rol: <comment>$roleName</comment>)");
            $this->line('E-posta doğrulandı: '.($user->email_verified_at ? 'evet' : 'hayır (ilk girişte Google/LinkedIn doğrulayacak)'));
            $this->line('2FA             : '.($user->two_factor_confirmed_at ? 'açık (girişte kod da istenir)' : 'kapalı'));
            foreach (SocialIdentity::where('user_id', $user->id)->get() as $i) {
                $this->line("Bağlı hesap     : {$i->provider} (son giriş: ".($i->last_login_at?->format('d.m.Y H:i') ?? '—').')');
            }
        } else {
            $this->line('Kullanıcı hesabı : <comment>YOK</comment>');
        }

        // 2) applications that mention this address
        $this->newLine();
        if ($companies->isEmpty()) {
            $this->line('Bu e-posta hiçbir firma başvurusunda yazılı değil (ne firma e-postası ne yetkili e-postası).');
        }
        foreach ($companies as $c) {
            $as = Str::lower((string) $c->email) === $email ? 'FİRMA e-postası' : 'YETKİLİ e-postası';
            $this->line("Başvuru #{$c->id} «{$c->name}»: durum <comment>{$c->status}</comment>; bu adres başvuruda <comment>$as</comment> olarak yazılı.");
            if ($as === 'YETKİLİ e-postası') {
                $this->line("   → Üyelik girişi <comment>FİRMA e-postasıyla</comment> açılır: {$c->email}");
            }
            if ($c->user_id) {
                $owner = User::find($c->user_id);
                $this->line("   → Bu başvurunun üyelik hesabı: ".($owner ? "{$owner->email} (rol {$owner->role})" : "id {$c->user_id} (silinmiş)"));
            }
        }

        // 3) verdict, same rules as SocialController::callback
        $this->newLine();
        if (! $user) {
            $this->error('SONUÇ: Bu e-postayla Google/LinkedIn girişi OLMAZ — bu adrese ait bir üyelik hesabı yok.');
            $other = $companies->first(fn ($c) => Str::lower((string) $c->email) !== $email);
            if ($other) {
                $this->warn("Üyelik «{$other->email}» adresiyle açıldı. Google/LinkedIn girişi için o adrese bağlı bir hesap gerekir; ya da başvuruyu bu adresi FİRMA e-postası yaparak yeniden yapın.");
            } elseif ($companies->isEmpty()) {
                $this->warn('Önce sitede «Firmanı ekle» ile bu adresi FİRMA e-postası olarak yazıp başvurun ve yönetici panelinden onaylayın.');
            } else {
                $this->warn('Başvuru henüz onaylanmamış ya da onaylanırken hesap oluşmamış. Yönetici panelinde durumuna bakın.');
            }
            return self::SUCCESS;
        }
        if ((int) $user->role === 1) {
            $this->error('SONUÇ: Bu hesap YÖNETİCİ. Yöneticiler Google/LinkedIn ile giremez (bilerek); e-posta ve parola kullanın.');
            return self::SUCCESS;
        }
        if ((int) $user->role !== 2) {
            $this->error('SONUÇ: Hesap var ama rolü "üye" değil, bu yüzden giriş reddedilir. Başvuruyu yönetici panelinden yeniden onaylayın (rol düzeltilir) ya da hesabın rolünü 2 yapın.');
            return self::SUCCESS;
        }
        $this->info('SONUÇ: Bu e-postayla Google/LinkedIn girişi ÇALIŞMALI.');
        if ($companies->where('status', Company::STATUS_APPROVED)->isEmpty()) {
            $this->warn('Not: bu adrese bağlı ONAYLI bir firma kaydı görünmüyor; giriş açılır ama panelde firma çıkmaz.');
        }
        $this->line('Hâlâ olmuyorsa Google tarafındaki hesabın e-posta adresinin tam olarak bu olduğundan emin olun ve:  php artisan kervea:social-status --log');
        return self::SUCCESS;
    }
}
