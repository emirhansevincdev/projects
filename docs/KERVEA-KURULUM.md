# Kervea · Kurulum ve Devir Notları

Bu proje, hazır Atlas (Laravel 11) scriptinin üzerine müşterinin onayladığı **`kervea-FAZ17_4.html`** tasarımını ve gerçek backend bağlantılarını ekler.

## 1. Sunucuya alma (mevcut kurulumun üzerine)

**Ne yapacaksınız?** Kodu GitHub'dan ZIP olarak indirip sunucuya yükleyecek, sonra **tek bir betiği** (`kervea-deploy.sh`) çalıştıracaksınız. Betik önce yedek alır, sonra yalnızca Kervea dosyalarını ve `kv_*` tablolarını ekler. Mevcut Atlas verilerine, `.env` dosyanıza ve veritabanı ayarınıza (`config/database.php`) dokunmaz.

> **`git pull`, `composer install` ya da `php artisan migrate` yazmayın.** Bu sunucu SQL dosyasıyla kurulduğu için düz `migrate` "table users already exists" hatası verir. Gerekli her şeyi betik yapar.
> Yanınızda şunlar olsun: sunucunun **IP adresi** ve **SSH parolası**. Aşağıdaki satırları aynen kopyalayıp yapıştırın; yalnızca `SUNUCU_IP` yerine kendi IP adresinizi yazın.

### A. Windows bilgisayarınızda

1. **ZIP'i indirin.** GitHub'a giriş yapmış tarayıcınızda bu adresi açın:
   `https://github.com/emirhansevincdev/projects/archive/refs/heads/claude/admiring-babbage-mqjbmi.zip`
   → İndirilenler klasörüne `projects-claude-admiring-babbage-mqjbmi.zip` (yaklaşık 30 MB) iner.
   **Depo sayfasındaki yeşil "Code → Download ZIP" düğmesini kullanmayın**; o yanlış dalı (`main`) indirir.

2. **ZIP'i sunucuya gönderin.** Başlat menüsüne `PowerShell` yazıp açın ve yapıştırın:
   ```
   scp "$env:USERPROFILE\Downloads\projects-claude-admiring-babbage-mqjbmi.zip" root@SUNUCU_IP:kervea.zip
   ```
   *Dosyayı sunucuya `kervea.zip` adıyla yükler.* İlk seferde `Are you sure you want to continue connecting` sorarsa `yes` yazıp Enter'a basın. Sonra sunucu parolasını yazın (**yazarken ekranda hiçbir şey görünmez, normaldir**). En sonda `100%` yazar. Kullanıcınız `root` değilse `root` yerine kendi kullanıcı adınızı yazın.

### B. SSH terminalinde (sunucuya bağlandıktan sonra, sırayla)

3. `cd ~`  
   *Ev klasörüne gider (ZIP'i yüklediğiniz yer).*
4. `command -v unzip >/dev/null || (apt-get update -qq && apt-get install -y unzip)`  
   *ZIP açıcı yoksa kurar; varsa hiçbir şey yazmaz.*
5. `unzip -oq kervea.zip`  
   *ZIP'i açar. Birkaç saniye sürer ve sessizdir.*
6. `cd projects-claude-admiring-babbage-mqjbmi`  
   *Açılan klasöre girer.*
7. `bash kervea-deploy.sh --kontrol`  
   *Hiçbir şeyi değiştirmeden sadece kontrol eder.* Yeşil `✔` satırları ve en sonda **"Her şey hazır"** görmelisiniz. Kırmızı `✖` çıkarsa aşağıdaki "Sorun giderme"ye bakın.
8. `bash kervea-deploy.sh`  
   *Yedek alır, siteyi birkaç dakikalığına bakıma alır, günceller, test eder ve siteyi açar.* `Devam edilsin mi? (evet/hayır)` diye sorar; **`evet`** yazıp Enter'a basın. Pencereyi kapatmayın. Sonunda `▶ Bitti` ve yedeklerin yolu yazar.
   Sarı `⚠` satırları hata değil, **yapılacaklar listesidir**:
   - `Yönetici hesabı yok` → 9. adım
   - `APP_URL`, `MAIL_*`, `APP_DEBUG`, `APP_ENV` → 10. adım
   - `veritabanı parolası … GitHub'a gitti` → aşağıdaki **"Veritabanı parolasını değiştirme"** bölümü
   - başka bir sarı satır → ekranın görüntüsünü geliştiriciye gönderin.
9. *(Yalnızca "Yönetici hesabı yok" uyarısı çıktıysa)*  
   `cd /var/www/kervea.ai && php artisan kervea:make-admin`  
   *Yönetici oluşturur. E-posta ve parola sorar. Parolayı yazarken ekranda hiçbir şey görünmez, normaldir; en az 12 karakter olmalıdır.*
10. *(Yalnızca `.env` uyarısı çıktıysa)*  
   `nano /var/www/kervea.ai/.env`  
   *Ayar dosyasını açar. Ok tuşlarıyla satırı değiştirin. Kaydetmek için `Ctrl+O`, Enter; çıkmak için `Ctrl+X`. Aşağıdaki `.env` tablosuna bakın.*

Sonra tarayıcıda `https://siteniz/giris` adresini açın.

### Sorun giderme

| Ekranda gördüğünüz | Ne yapın |
|---|---|
| `unzip: command not found` ya da `apt-get: command not found` | Sunucunuz Debian/Ubuntu değildir. `yum install -y unzip` yazın, sonra 5. adımdan devam edin. |
| `No such file or directory` (`scp`, `cd` ya da `bash` satırında) | `cd ~ && ls` yazın. `kervea.zip` yoksa 2. adımı tekrarlayın (Windows dosyayı `... (1).zip` diye indirdiyse adını düzeltin ya da WinSCP ile sürükleyip adını `kervea.zip` yapın). `projects-main` gibi başka bir klasör görürseniz yanlış ZIP'i indirmişsiniz demektir; 1. adımdaki adresi kullanın. |
| `Site klasörü bulunamadı: /var/www/kervea.ai` | Sitenin gerçek yerini bulun: `find /var/www /www /home /srv -maxdepth 4 -name artisan -not -path '*/vendor/*' 2>/dev/null`. Çıkan yoldan sondaki `/artisan` kısmını atın (örn. `/home/x/public_html/artisan` → `/home/x/public_html`) ve şöyle çalıştırın: `TARGET=/home/x/public_html bash kervea-deploy.sh` |
| `Bu klasöre yazma/okuma yetkiniz yok` | `root` olarak bağlanın ya da `sudo bash kervea-deploy.sh` yazın. Sizde `sudo` yoksa `su -` ile root olup 6. adımdan tekrarlayın. |
| `Veritabanına bağlanılamadı` | `.env` ve `config/database.php` içindeki veritabanı adı/kullanıcı/parolayı kontrol edin; hata satırlarını geliştiriciye gönderin. |
| Betik yarıda kesildi, site "bakım" ekranında | `cd /var/www/kervea.ai && php artisan up` ile siteyi açın; sorunu çözüp betiği **yeniden** çalıştırabilirsiniz (güvenle tekrarlanabilir). |

Her çalıştırmada yedekler `~/kervea-yedekler/` altına alınır (dosya yedeği, veritabanı yedeği ve işlem kaydı). Bir sorun çıkarsa **işlem kaydı** dosyasını geliştiriciye gönderin.

### Veritabanı parolasını değiştirme (önemli)

Atlas şablonu, veritabanı parolasını `.env` yerine **`config/database.php` içine düz yazı** olarak yazmış; bu dosya GitHub'a da yüklendi. Depo "Private" olsa bile parola değiştirilmelidir:

1. Güçlü bir parola üretin: `openssl rand -base64 24`
2. MySQL'de değiştirin (kullanıcı adı genelde `kervea_user`): `mysql -u root -p -e "ALTER USER 'kervea_user'@'localhost' IDENTIFIED BY 'YENI_PAROLA';"` (hosting paneli varsa oradan da değiştirebilirsiniz)
3. Sitedeki dosyada eski parolayı yenisiyle değiştirin: `nano /var/www/kervea.ai/config/database.php` (`'password' => '…'` satırı), kaydedin, sonra `cd /var/www/kervea.ai && php artisan config:clear`
4. Siteyi açıp test edin. Yedek: eski parola artık geçersiz olduğundan, `.env` içindeki `DB_PASSWORD` satırını da yeni parolayla güncelleyin.

Bu depodaki `config/database.php` artık parolayı `.env`'den (`DB_*`) okur; betik sunucudaki dosyanıza dokunmaz.

### `.env` ayarları

`.env` dosyası sunucuda `/var/www/kervea.ai/.env` yolundadır; betik yalnızca eksik Kervea anahtarlarını **ekler**, var olanları değiştirmez.

| Anahtar | Not |
|---|---|
| `APP_ENV=production`, `APP_DEBUG=false` | **Zorunlu.** Debug açıkken hata sayfaları sır sızdırır. |
| `APP_URL=https://…` | Canonical/OG adresleri ve sağlık testi buradan alınır. |
| `SESSION_SECURE_COOKIE=true` | HTTPS'te. |
| `MAIL_*` | **Zorunlu.** Onay e-postası (parola belirleme bağlantısı) gitmeden hiçbir üye giriş yapamaz. SPF/DKIM/DMARC kurulmalı. |
| `KERVEA_ADMIN_EMAIL` | Yeni başvuru / iletişim bildirimi gidecek adres (boşsa tüm yöneticilere). |
| `KERVEA_PREMIUM_PRICE_USD` | Varsayılan 280. Müşteri 240 mı 280 mi kararını vermeli. |
| `STRIPE_SECRET`, `STRIPE_WEBHOOK_SECRET` | Ödeme sağlayıcısı kararından sonra. Webhook: `POST /kv/webhooks/stripe`. |
| `KERVEA_LEGACY_ROUTES=false` | Şablonun eski otel/araç/ilan rotaları kapalı kalmalı. |

Web sunucusu belge kökü **`public/`** olmalı; `.env`, `storage/`, `vendor/` web'den erişilemez olmalı (betik bunu da dışarıdan dener ve uyarır).

## 2. Yönetici

Yönetici = `users.role = 1`. Mevcut Atlas yöneticisi aynen geçerlidir; **Kervea giriş sayfasından (`/giris`) girince doğrudan `/admin/kervea/applications` açılır.**
Yönetici yoksa (parola komut satırına yazılmaz, ekranda gizli girilir):

```bash
cd /var/www/kervea.ai && php artisan kervea:make-admin
```

Yönetici menüsü: Başvurular · Firmalar · Sektörler (alt sektör ekleme) · İletişim Mesajları · Promosyon Kodları · Siparişler.

## 3. Akış

1. Ziyaretçi **Firmanı Ekle** formunu doldurur (6 adım; KVKK/rıza kutuları işaretlenmemiş gelir) → `kv_companies` (durum: *pending*). Belgeler **özel** diskte (`storage/app/private`), logo/fotoğraflar yeniden kodlanarak `storage/app/public/kv/…` altında tutulur.
2. Yönetici başvuruyu inceler → **Onayla**: üye hesabı oluşur, firmaya *parola belirleme* bağlantısı gider (24 saat). Aynı sektördeki, e-posta iznini vermiş üyelere "yeni firma" bildirimi gider.
3. Üye `/giris` ile girer. Plan: *free* (ilk 3 firma açık, kalanı sunucuda maskeli) · *Premium* (hepsi + iletişim bilgisi açma, günde 40).
4. İletişim bilgisi yalnızca **firma rıza verdiyse** ve **görüntüleyen Premium ise** açılır; her açma kaydedilir.
5. Premium: `/kv/orders` sunucuda fiyatı hesaplar (promosyon dahil) → Stripe Checkout'a yönlendirir. Stripe anahtarı yoksa sipariş *pending* kalır, yönetici "Siparişler"den *Ödendi* işaretleyebilir (havale).

## 4. Dosya haritası

| Konu | Yol |
|---|---|
| Tasarım (CSS/JS/görsel) | `public/kervea/` (`css/kervea.css`, `js/kervea-app.js`, `js/kervea-api.js`) |
| Sayfa parçaları (Blade) | `resources/views/kervea/` |
| **Backend bağlantısı (tek dosya)** | `public/kervea/js/kervea-api.js` |
| Kamu/üye uç noktaları | `app/Http/Controllers/Kv/` (`FirmController`, `ApplicationController`, `AuthController`, `MemberController`, `OrderController`, …) |
| Yönetici paneli | `app/Http/Controllers/Admin/KerveaAdminController.php`, `resources/views/kervea/admin/` |
| Görünürlük/kapı mantığı | `app/Services/Kv/FirmPresenter.php` |
| Yükleme güvenliği | `app/Services/Kv/ImageStore.php` |
| Veri modeli | `database/migrations/2026_10_05_000001_create_kervea_tables.php`, `app/Models/Kv/` |
| Güvenlik başlıkları / eski rota kapatma | `app/Http/Middleware/SecurityHeaders.php`, `LegacyRoutes.php` |
| Hata sayfaları | `resources/views/errors/` |
| Güncelleme betiği / yönetici komutu | `kervea-deploy.sh`, `app/Console/Commands/KerveaMakeAdmin.php` |
| Marka dosyaları | `public/brand/`, `public/favicon.ico`, `public/icon*.png`, `public/og-image.jpg` |
| Yazı tipleri / bayraklar / GSAP / harita | `public/fonts/`, `public/flags/`, `public/kervea/vendor/` (CDN yok) |
| Testler | `tests/Feature/Kv/` → `php artisan test` |

## 5. Bilinçli kararlar

* **Şablonun açık kayıt/giriş/şifre-sıfırlama uçları kaldırıldı** (`routes/auth.php`); hesaplar yalnızca yönetici onayıyla oluşur.
* **Eski ilan/otel/araç rotaları, installer, `/clear-cache` vb. 404** döner (`legacy` middleware). Eski admin ekranları dosya olarak durur ama menüden kullanılmaz.
* **Sahte demo veriler kaldırıldı** (firma, kişi, mesaj, ziyaretçi, ekip, sahte belge listesi). Veri yoksa boş durum gösterilir.
* **Panelde gizlenen sekmeler:** Mesajlar, Analiz, Ekip, Aktivite, Prospektüs, Kişiler — gerçek veri kaynağı yok; marka kılavuzu "taraflar arası mesajlaşma yok / veri simsarı değiliz" diyor. Müşteri kararıyla yeniden açılabilir.
* **Kart bilgisi sitede toplanmaz** (PCI). Kart alanları gizlidir; ödeme sağlayıcının sayfasında alınır.
* amCharts harita paketi (ücretsiz lisans) kendi sunucumuzdan yüklenir; lisans gereği amCharts logosu görünür kalmalıdır.

## 6. Müşteriden beklenenler

1. Ödeme sağlayıcısı (Stripe / iyzico / PayTR) ve **nihai ücret** (240 mı 280 USD mı), KDV/fatura yaklaşımı.
2. **Hakkımızda** içeriği (misyon, vizyon, kurumsal kimlik), gerçek ekip bilgileri.
3. Sitedeki **doğrulanamayan metinler**: "uçtan uca şifreli mesajlaşma", "Trademap gümrük veri erişimi", "%94 doğrulama başarısı", "E2E şifreleme: Aktif". Marka kılavuzu "sahte metrik / boş vaat yok" der; ya gerçekleşmeli ya metinden çıkarılmalı.
4. KVKK metinlerinin (Aydınlatma, Açık Rıza, Gizlilik, Üyelik Sözleşmesi v1.2) pencere içeriği.
5. Mesajlaşma/analitik gibi gizlenen panel sekmeleri için karar.
6. Firmalar için TİM alt sektör listesi (admin panelinden girilebilir).
