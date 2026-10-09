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

Sonra tarayıcıda `https://siteniz/login` adresini açın.

### Sorun giderme

| Ekranda gördüğünüz | Ne yapın |
|---|---|
| `unzip: command not found` ya da `apt-get: command not found` | Sunucunuz Debian/Ubuntu değildir. `yum install -y unzip` yazın, sonra 5. adımdan devam edin. |
| `No such file or directory` (`scp`, `cd` ya da `bash` satırında) | `cd ~ && ls` yazın. `kervea.zip` yoksa 2. adımı tekrarlayın (Windows dosyayı `... (1).zip` diye indirdiyse adını düzeltin ya da WinSCP ile sürükleyip adını `kervea.zip` yapın). `projects-main` gibi başka bir klasör görürseniz yanlış ZIP'i indirmişsiniz demektir; 1. adımdaki adresi kullanın. |
| `Site klasörü bulunamadı: /var/www/kervea.ai` | Sitenin gerçek yerini bulun: `find /var/www /www /home /srv -maxdepth 4 -name artisan -not -path '*/vendor/*' 2>/dev/null`. Çıkan yoldan sondaki `/artisan` kısmını atın (örn. `/home/x/public_html/artisan` → `/home/x/public_html`) ve şöyle çalıştırın: `TARGET=/home/x/public_html bash kervea-deploy.sh` |
| Google/LinkedIn'de `redirect_uri_mismatch` | Konsoldaki yönlendirme adresi, `.env` içindeki `APP_URL` + `/auth/google/callback` (veya `/auth/linkedin/callback`) ile **harfi harfine** aynı olmalı (`https`, `www` yok, sonda `/` yok). Düzelttikten sonra Google'da birkaç dakika bekleyin. |
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
| `APP_URL=https://kervea.ai` | Sitenin tarayıcıda açıldığı **tam adres** (https, `www` yok, sonda `/` yok). Betiğin sağlık testi ve Google/LinkedIn yönlendirme adresi buradan alınır. |
| `SESSION_SECURE_COOKIE=true` | HTTPS'te. |
| `MAIL_*` | **Zorunlu.** Onay e-postası (parola belirleme bağlantısı) gitmeden hiçbir üye giriş yapamaz. SPF/DKIM/DMARC kurulmalı. |
| `KERVEA_ADMIN_EMAIL` | Yeni başvuru / iletişim bildirimi gidecek adres (boşsa tüm yöneticilere). |
| `KERVEA_PREMIUM_PRICE_USD` | Varsayılan 280. Müşteri 240 mı 280 mi kararını vermeli. |
| `STRIPE_SECRET`, `STRIPE_WEBHOOK_SECRET` | Ödeme sağlayıcısı kararından sonra. Webhook: `POST /kv/webhooks/stripe`. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | Google / LinkedIn ile giriş. Boşsa o düğme sitede görünmez. Nasıl alınır: aşağıdaki **Google ve LinkedIn ile giriş** bölümü. |
| `KERVEA_LEGACY_ROUTES=false` | Şablonun eski otel/araç/ilan rotaları kapalı kalmalı. |

### Google ve LinkedIn ile giriş

**Nasıl çalışır (kısaca):** Bu yolla **yeni hesap açılmaz.** Üyelik yalnızca yönetici başvuruyu onaylayınca oluşur (müşterinin "yalnızca yönetici onayı" kuralı). Google/LinkedIn, **mevcut üyelerin** giriş kolaylığıdır: üyenin başvuruda yazdığı e-posta adresiyle, sağlayıcının **doğruladığı** aynı adres eşleşirse giriş açılır. Eşleşme yoksa "bu e-posta ile üyelik bulunamadı, önce firmanı ekle" uyarısı çıkar.

Güvenlik kuralları: sağlayıcı e-postayı doğrulamamışsa giriş reddedilir · yönetici hesapları yalnızca parola ile girer · 2FA açık üyeler sağlayıcıdan döndükten sonra yine authenticator kodunu girer · ilk girişten sonra üye sağlayıcının kalıcı kimliğine bağlanır (e-posta adresi sonradan başkasına geçse bile başka biri giremez) · giriş adımı tek kullanımlık `state` ve 10 dakikalık süre ile korunur.

Önce `.env` içindeki **`APP_URL`** sitenin tam adresi olmalı (örn. `https://kervea.ai`; `http://localhost` gibi kalmamalı — betik kontrol sonunda bunu uyarır). Sağlayıcıya yazacağınız **yönlendirme adresleri** (harfi harfine aynı olmalı: `https`, `www` yok, sonda `/` yok) şunlardır:

- Google: `https://kervea.ai/auth/google/callback`
- LinkedIn: `https://kervea.ai/auth/linkedin/callback`

`www.kervea.ai` de açılıyorsa onu **ana adrese yönlendirin** (hosting panelinde *Redirects / Yönlendirmeler* → `www` → `https://kervea.ai`, 301). Betik anahtarlar girildiğinde bu adresleri ekrana yazar.

**Google** (müşterinin Google hesabıyla):
1. https://console.cloud.google.com → proje oluşturun → *Google Auth Platform* (eski adıyla *APIs & Services → OAuth consent screen*; menüde eski ad görünüyorsa aynı yere gider).
   - *Branding*: uygulama adı **Kervea**, destek e-postası, logo, gizlilik ve kullanım koşulları bağlantıları (`https://kervea.ai/...`); *Authorized domains* alanına `kervea.ai`.
   - *Audience*: kullanıcı türü **External**; *Publish app* ile durumu **In production** yapın (*Testing*'de yalnızca ekli test kullanıcıları girebilir).
   - *Data Access*: yalnızca `openid`, `email`, `profile` (hassas kapsam yok → kapsam incelemesi gerekmez).
   - Not: Uygulama adı ve logo, Google'ın *marka doğrulaması* (*Verification Center* → *Verify Branding*; alan adının Google Search Console'da doğrulanması gerekir, birkaç gün sürebilir) bitene kadar onay ekranında görünmez, yalnızca alan adı görünür. Giriş doğrulama olmadan da çalışır.
2. *Clients* → *Create client* → tür **Web application** → *Authorized redirect URIs* alanına **tam adresi** yazın: `https://kervea.ai/auth/google/callback` (yalnızca `https://kervea.ai` yazmak yetmez, sonundaki `/auth/google/callback` da olmalı). *Authorized JavaScript origins* boş kalabilir. Yeni adresin devreye girmesi 5 dakikadan birkaç saate kadar sürebilir; bu sürede `redirect_uri_mismatch` hatası normaldir, adres doğruysa bekleyin.
3. Çıkan **Client ID** ve **Client secret**'ı sunucudaki `.env`'e yazın. Client secret'ı bir daha göremezsiniz (kapatmadan kopyalayın) ve **kimseyle paylaşmayın** (sohbet, e-posta, ekran görüntüsü); yanlışlıkla paylaşıldıysa *Clients → Kervea Web → Client secrets → Add secret* ile yenisini üretip eskisini devre dışı bırakın.

**LinkedIn:**
1. https://www.linkedin.com/developers/apps → *Create app* (bir LinkedIn *Company Page* seçmeniz istenir; Kervea sayfası olmalı) → Products sekmesinden **Sign In with LinkedIn using OpenID Connect** ürününü ekleyin.
2. *Auth* sekmesi → *Authorized redirect URLs for your app* → yukarıdaki LinkedIn adresini ekleyin.
3. *Auth* sekmesindeki **Client ID** ve **Primary Client Secret**'ı `.env`'e yazın.

`.env` içindeki **hazır, boş satırları doldurun** (aynı anahtarı ikinci kez eklemeyin; çift satır varsa ilki geçerli olur). Değerlerin başına/sonuna tırnak, boşluk ya da `...` koymayın, açıklama eklemeyin. **Hangi değer nereye:** Google'daki **Client ID** (uzun, `apps.googleusercontent.com` ile biter) → `GOOGLE_CLIENT_ID`; **Client secret** (kısa, `GOCSPX-` ile başlar) → `GOOGLE_CLIENT_SECRET`. İkisini birbirine karıştırmayın.

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

Sonra `cd /var/www/kervea.ai && php artisan config:clear` ve `/login` sayfasını yenileyin: anahtarı girilen sağlayıcının düğmesi görünür.

**Nasıl denenir:** Yönetici hesabıyla (kendi Google hesabıyla) giriş **yapılamaz** (bilerek). Denemek için: (1) sitede **Firmanı ekle** ile, kendi Gmail (ya da LinkedIn'e kayıtlı) adresinizi e-posta olarak yazarak bir deneme başvurusu yapın; (2) yönetici panelinden başvuruyu **onaylayın** ve gelen e-postadaki bağlantıdan parola belirleyin; (3) çıkış yapıp `/login` sayfasında **Google** düğmesine basın: aynı adresli Google hesabıyla girer. Aynı adresle onaylı üyeliği olmayan bir hesap "bu e-posta ile üyelik bulunamadı" uyarısı alır.

**Bağlantıyı sıfırlama:** Üye Google/LinkedIn'e ilk girdiğinde hesabı sağlayıcının kalıcı kimliğine bağlanır. LinkedIn uygulamasını silip yeniden oluşturursanız (kimlikler değişir) ya da üye Google hesabını yeniden açtıysa "Farklı hesap bağlı" uyarısı çıkar. Bağlantıyı silin; üye bir sonraki girişte doğrulanmış e-postasıyla yeniden bağlanır (e-posta/parola girişi bu sırada çalışmaya devam eder):

```bash
cd /var/www/kervea.ai
php artisan kervea:social-unlink linkedin uye@firma.com     # tek üye
php artisan kervea:social-unlink linkedin --all             # LinkedIn'deki herkes
```

Not: Yeni tablo (`kv_social_identities`) `kervea-deploy.sh` ile otomatik oluşur; yeni dosyaları yükleyip betiği yeniden çalıştırmanız yeterlidir. Pilotta LinkedIn/Google'ın kendi gizlilik metinlerine ek olarak, KVKK aydınlatma metnine "giriş için sağlayıcıdan yalnızca e-posta, ad ve kimlik numarası alınır" cümlesinin eklenmesini öneririz.

Web sunucusu belge kökü **`public/`** olmalı; `.env`, `storage/`, `vendor/` web'den erişilemez olmalı (betik bunu da dışarıdan dener ve uyarır).

## 2. Yönetici

Yönetici = `users.role = 1`. Mevcut Atlas yöneticisi aynen geçerlidir; **Kervea giriş sayfasından (`/login`) girince doğrudan `/admin/kervea/applications` açılır.**
Yönetici yoksa (parola komut satırına yazılmaz, ekranda gizli girilir):

```bash
cd /var/www/kervea.ai && php artisan kervea:make-admin
```

Yönetici menüsü: Başvurular · Firmalar · Sektörler (alt sektör ekleme) · İletişim Mesajları · Promosyon Kodları · Siparişler.

## 3. Akış

1. Ziyaretçi **Firmanı Ekle** formunu doldurur (6 adım; KVKK/rıza kutuları işaretlenmemiş gelir) → `kv_companies` (durum: *pending*). Belgeler **özel** diskte (`storage/app/kv/docs/<firma-id>/`, web üzerinden erişilemez), logo/fotoğraflar yeniden kodlanarak `storage/app/public/kv/…` altında tutulur.
2. Yönetici başvuruyu inceler → **Onayla**: üye hesabı oluşur, firmaya *parola belirleme* bağlantısı gider (24 saat). Aynı sektördeki, e-posta iznini vermiş üyelere "yeni firma" bildirimi gider.
3. Üye `/login` ile girer. Plan: *free* (ilk 3 firma açık, kalanı sunucuda maskeli) · *Premium* (hepsi + iletişim bilgisi açma, günde 40).
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
| Veri modeli | `database/migrations/2026_10_05_000001_create_kervea_tables.php`, `2026_10_08_000001_create_kv_social_identities_table.php`, `app/Models/Kv/` |
| Google / LinkedIn girişi | `app/Http/Controllers/Kv/SocialController.php`, `app/Services/Kv/SocialAuth.php`, `app/Console/Commands/KerveaSocialUnlink.php`, ön yüz: `kervea-api.js` ("Google / LinkedIn ile giriş" bölümü) |
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
