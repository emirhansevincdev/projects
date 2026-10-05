# Kervea · Kurulum ve Devir Notları

Bu proje, hazır Atlas (Laravel 11) scriptinin üzerine müşterinin onayladığı **`kervea-FAZ17_4.html`** tasarımını ve gerçek backend bağlantılarını ekler.

## 1. Sunucuya alma (mevcut kurulumun üzerine)

> Önce **veritabanı + dosya yedeği** alın. Bu paket mevcut Atlas tablolarına dokunmaz; yalnızca `kv_*` tablolarını ekler ve `users` tablosuna 4 kolon (`kv_plan`, `kv_plan_until`, `two_factor_secret`, `two_factor_confirmed_at`) ekler.

```bash
cd /var/www/kervea.ai
git pull origin claude/admiring-babbage-mqjbmi      # veya değişen dosyaları kopyalayın
composer install --no-dev --optimize-autoloader
php artisan migrate --force                          # kv_* tabloları
php artisan db:seed --class=KerveaSeeder --force     # 26 TİM sektörü + 249 ülke (tekrar çalıştırılabilir)
php artisan storage:link                             # yüklenen logo/fotoğraflar için
php artisan config:clear && php artisan route:clear && php artisan view:clear
```

`.env` (örnek: `.env.example` sonundaki *Kervea* bölümü):

| Anahtar | Not |
|---|---|
| `APP_ENV=production`, `APP_DEBUG=false` | **Zorunlu.** Debug açıkken hata sayfaları sır sızdırır. |
| `APP_URL=https://…` | Canonical/OG adresleri buradan üretilir. |
| `SESSION_SECURE_COOKIE=true` | HTTPS'te. |
| `MAIL_*` | **Zorunlu.** Onay e-postası (parola belirleme bağlantısı) gitmeden hiçbir üye giriş yapamaz. SPF/DKIM/DMARC kurulmalı. |
| `KERVEA_ADMIN_EMAIL` | Yeni başvuru / iletişim bildirimi gidecek adres (boşsa tüm yöneticilere). |
| `KERVEA_PREMIUM_PRICE_USD` | Varsayılan 280. Müşteri 240 mı 280 mi kararını vermeli. |
| `STRIPE_SECRET`, `STRIPE_WEBHOOK_SECRET` | Ödeme sağlayıcısı kararından sonra. Webhook: `POST /kv/webhooks/stripe`. |
| `KERVEA_LEGACY_ROUTES=false` | Şablonun eski otel/araç/ilan rotaları kapalı kalmalı. |

Web sunucusu belge kökü `public/` olmalı; `.env`, `storage/`, `vendor/` web'den erişilemez olmalı.

## 2. Yönetici

Yönetici = `users.role = 1`. Mevcut Atlas yöneticisi aynen geçerlidir; **Kervea giriş sayfasından (`/giris`) girince doğrudan `/admin/kervea/applications` açılır.**
Yönetici yoksa:

```bash
php artisan tinker
>>> $u = new App\Models\User(['name'=>'Yönetici','email'=>'siz@firma.com','password'=>'GüçlüParola-123']); $u->role=1; $u->email_verified_at=now(); $u->save();
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
