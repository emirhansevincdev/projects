#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  KERVEA · TEK KOMUTLA GÜNCELLEME
#
#  Kullanım (indirdiğiniz klasörün içinde):
#      bash kervea-deploy.sh --kontrol     # hiçbir şeyi değiştirmeden sadece kontrol eder
#      bash kervea-deploy.sh               # yedek alır, günceller, test eder
#
#  Ayarlar (gerekirse):  TARGET=/var/www/kervea.ai   PHP_BIN=/usr/bin/php8.3   YES=1
#
#  Güvenli olması için: .env, storage/, yüklenen dosyalar, public/index.php ve .htaccess'e DOKUNMAZ;
#  önce dosya + veritabanı yedeği alır; güncelleme sırasında siteyi "bakım" moduna alır.
# ─────────────────────────────────────────────────────────────────────────────
set -Eeuo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${TARGET:-/var/www/kervea.ai}"
PHP="${PHP_BIN:-php}"
COMPOSER="${COMPOSER_BIN:-composer}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="${BACKUP_DIR:-$HOME/kervea-yedekler}"
MIGRATION="database/migrations/2026_10_05_000001_create_kervea_tables.php"
CHECK_ONLY=0
[ "${1:-}" = "--kontrol" ] && CHECK_ONLY=1

if [ -t 1 ]; then G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; B=$'\e[1m'; N=$'\e[0m'; else G=; Y=; R=; B=; N=; fi
say()  { printf '\n%s▶ %s%s\n' "$B" "$*" "$N"; }
ok()   { printf '  %s✔%s %s\n' "$G" "$N" "$*"; }
warn() { printf '  %s⚠%s %s\n' "$Y" "$N" "$*"; WARNINGS=$((WARNINGS+1)); }
die()  { printf '\n%s✖ %s%s\n' "$R" "$*" "$N" >&2; exit 1; }
WARNINGS=0
MAINT=0
DONE=0

on_exit() {
  local code=$?
  if [ "$code" -ne 0 ] && [ "$DONE" -eq 0 ]; then
    printf '\n%s✖ Güncelleme yarıda kaldı.%s\n' "$R" "$N" >&2
    if [ "$MAINT" -eq 1 ]; then
      printf '  Site "bakım" modunda bırakıldı (yarım bir hâli ziyaretçiye göstermemek için).\n' >&2
      printf '  Sorunu çözüp tekrar deneyebilir ya da yedekten dönebilirsiniz:\n' >&2
      printf '    cd %s && %s artisan up      # siteyi açmak için\n' "$TARGET" "$PHP" >&2
    fi
    [ -n "${BACKUP_FILE:-}" ] && printf '  Yedek: %s\n' "$BACKUP_FILE" >&2
    printf '  Bu ekranın tamamını bana gönderirseniz hatayı bulurum.\n' >&2
  fi
}
trap on_exit EXIT

envget() {  # .env dosyasından değer okur (tırnakları ve satır sonlarını temizler)
  local v
  v="$(grep -E "^$1=" "$TARGET/.env" 2>/dev/null | tail -n1 | cut -d= -f2- || true)"
  v="${v%$'\r'}"; v="${v#\"}"; v="${v%\"}"; v="${v#\'}"; v="${v%\'}"
  printf '%s' "$v"
}
artisan() { (cd "$TARGET" && "$PHP" artisan "$@"); }

# ───────────────────────── 1. Kontroller ─────────────────────────
say "1/7  Ön kontroller"
[ -f "$SRC/artisan" ] && [ -f "$SRC/routes/web.php" ] && [ -f "$SRC/$MIGRATION" ] \
  || die "Bu betik, indirdiğiniz Kervea klasörünün içinden çalıştırılmalı (artisan ve database/ klasörü yanında olmalı)."
[ -d "$TARGET" ] && [ -f "$TARGET/artisan" ] \
  || die "Site klasörü bulunamadı: $TARGET  (farklıysa: TARGET=/yol/klasör bash kervea-deploy.sh)"
[ -f "$TARGET/.env" ] || die "$TARGET/.env bulunamadı. Bu betik mevcut, çalışan kurulumu günceller."
command -v "$PHP" >/dev/null 2>&1 || die "PHP bulunamadı ('$PHP'). Farklı bir PHP kullanıyorsanız: PHP_BIN=/usr/bin/php8.3 bash kervea-deploy.sh"
"$PHP" -r 'exit(PHP_VERSION_ID >= 80200 ? 0 : 1);' || die "PHP 8.2 veya üstü gerekiyor (şu an: $("$PHP" -r 'echo PHP_VERSION;'))."
ok "PHP $("$PHP" -r 'echo PHP_VERSION;')"
for ext in mbstring openssl pdo fileinfo gd xml; do
  "$PHP" -m | grep -qi "^$ext$" || die "PHP '$ext' eklentisi kurulu değil (yüklenen görselleri işlemek için gerekli)."
done
"$PHP" -r 'exit(function_exists("imagewebp") ? 0 : 1);' || die "PHP GD eklentisi WebP desteğiyle kurulu olmalı."
ok "PHP eklentileri tamam"

if ! artisan tinker --execute='DB::connection()->getPdo(); echo "db-ok";' 2>/dev/null | grep -q db-ok; then
  die "Veritabanına bağlanılamadı. $TARGET/.env içindeki DB_* ayarlarını kontrol edin."
fi
ok "Veritabanına bağlanıldı ($(envget DB_CONNECTION):$(envget DB_DATABASE))"

SAME=0
[ "$(cd "$SRC" && pwd -P)" = "$(cd "$TARGET" && pwd -P)" ] && SAME=1
[ "$SAME" -eq 1 ] && ok "Betik doğrudan site klasöründen çalışıyor (dosya kopyalama atlanacak)"

if [ "$CHECK_ONLY" -eq 1 ]; then
  say "Kontrol bitti — hiçbir şey değiştirilmedi."
  [ "$WARNINGS" -eq 0 ] && ok "Her şey hazır. Güncellemek için: bash kervea-deploy.sh" || true
  DONE=1; exit 0
fi

# ───────────────────────── 2. Yedek ─────────────────────────
say "2/7  Yedek alınıyor (geri dönüş için)"
mkdir -p "$BACKUP_DIR"; chmod 700 "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/site-$STAMP.tar.gz"
tar -czf "$BACKUP_FILE" -C "$(dirname "$TARGET")" \
  --anchored --exclude="$(basename "$TARGET")/vendor" --exclude="$(basename "$TARGET")/node_modules" \
  --exclude="$(basename "$TARGET")/storage/logs" --exclude="$(basename "$TARGET")/storage/framework" \
  "$(basename "$TARGET")"
chmod 600 "$BACKUP_FILE"
ok "Dosya yedeği: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

DBC="$(envget DB_CONNECTION)"; DB_DUMP=""; DBH="$(envget DB_HOST)"; DBP="$(envget DB_PORT)"
case "$DBC" in
  mysql|mariadb)
    if command -v mysqldump >/dev/null 2>&1; then
      DB_DUMP="$BACKUP_DIR/veritabani-$STAMP.sql.gz"
      ( umask 077; MYSQL_PWD="$(envget DB_PASSWORD)" mysqldump --single-transaction --no-tablespaces \
          -h "${DBH:-127.0.0.1}" -P "${DBP:-3306}" -u "$(envget DB_USERNAME)" "$(envget DB_DATABASE)" | gzip > "$DB_DUMP" ) \
        || die "Veritabanı yedeği alınamadı; güvenlik için durduruldu."
      [ -s "$DB_DUMP" ] || die "Veritabanı yedeği boş çıktı; güvenlik için durduruldu."
      ok "Veritabanı yedeği: $DB_DUMP ($(du -h "$DB_DUMP" | cut -f1))"
    else
      warn "mysqldump bulunamadı; veritabanı yedeği ALINAMADI. (Hosting panelinden elle yedek alın.)"
    fi ;;
  sqlite)
    SQLITE="$(envget DB_DATABASE)"; [ -f "$SQLITE" ] && cp "$SQLITE" "$BACKUP_DIR/veritabani-$STAMP.sqlite" && ok "SQLite yedeği alındı" ;;
  *) warn "Veritabanı türü '$DBC' için otomatik yedek yok; elle yedek alın." ;;
esac

if [ -z "$DB_DUMP" ] && [ "$DBC" != "sqlite" ]; then
  if [ "${YES:-0}" != "1" ] && [ -t 0 ]; then
    read -r -p "  Veritabanı yedeği olmadan devam edilsin mi? (evet/hayır): " ans
    [ "$ans" = "evet" ] || die "İptal edildi. Önce veritabanı yedeği alın."
  fi
fi

if [ "${YES:-0}" != "1" ] && [ -t 0 ]; then
  printf '\n  Bu işlem siteyi birkaç dakikalığına bakım moduna alır ve %s klasörünü günceller.\n' "$TARGET"
  read -r -p "  Devam edilsin mi? (evet/hayır): " ans
  [ "$ans" = "evet" ] || die "İptal edildi. Hiçbir şey değiştirilmedi (yalnızca yedek alındı)."
fi

# ───────────────────────── 3. Bakım modu ─────────────────────────
say "3/7  Site bakım moduna alınıyor"
mkdir -p "$TARGET/storage/framework/views" "$TARGET/storage/framework/cache/data" "$TARGET/storage/framework/sessions" \
         "$TARGET/storage/logs" "$TARGET/storage/app/public" "$TARGET/storage/app/private" "$TARGET/bootstrap/cache"
artisan down --retry=60 >/dev/null 2>&1 && MAINT=1 && ok "Bakım modu açık" || warn "Bakım modu açılamadı; devam ediliyor."

# ───────────────────────── 4. Dosyalar ─────────────────────────
say "4/7  Yeni dosyalar kopyalanıyor"
LOCK_BEFORE="$(md5sum "$TARGET/composer.lock" 2>/dev/null | cut -d' ' -f1 || true)"
if [ "$SAME" -eq 0 ]; then
  # Dokunulmayacaklar: gizli ayarlar, yüklemeler, sunucuya özel dosyalar, eski şablonun görselleri
  tar -C "$SRC" -cf - --anchored \
      --exclude='./.git' --exclude='./.env' --exclude='./vendor' --exclude='./node_modules' \
      --exclude='./storage' --exclude='./bootstrap/cache' --exclude='./tests' --exclude='./README.md' \
      --exclude='./index.php' --exclude='./server.php' --exclude='./.htaccess' \
      --exclude='./public/index.php' --exclude='./public/.htaccess' --exclude='./public/storage' \
      --exclude='./public/assets' --exclude='./public/plugin' --exclude='./public/image' --exclude='./public/uploads' \
      --exclude='./upload' --exclude='./database/database.sqlite' --exclude='./.phpunit.cache' . \
    | tar -C "$TARGET" -xf -
  ok "Dosyalar kopyalandı"
fi
LOCK_AFTER="$(md5sum "$TARGET/composer.lock" 2>/dev/null | cut -d' ' -f1 || true)"

# ───────────────────────── 5. Bağımlılıklar ─────────────────────────
say "5/7  PHP paketleri"
if [ ! -f "$TARGET/vendor/autoload.php" ] || [ "$LOCK_BEFORE" != "$LOCK_AFTER" ]; then
  command -v "$COMPOSER" >/dev/null 2>&1 || die "composer bulunamadı; paketler güncellenemiyor."
  (cd "$TARGET" && COMPOSER_ALLOW_SUPERUSER=1 "$COMPOSER" install --no-dev --optimize-autoloader --no-interaction --prefer-dist)
  ok "Paketler kuruldu"
else
  ok "Paketler değişmemiş, atlandı"
fi

# ───────────────────────── 6. Veritabanı ─────────────────────────
say "6/7  Veritabanı güncelleniyor (yalnızca Kervea tabloları eklenir; mevcut verilere dokunulmaz)"
# DİKKAT: tüm 'migrate' çalıştırılmaz — eski şablon tabloları zaten var. Yalnızca Kervea migration'ı.
artisan migrate --path="$MIGRATION" --force
artisan db:seed --class=KerveaSeeder --force
ok "Kervea tabloları, 26 sektör ve 249 ülke hazır"

[ -e "$TARGET/public/storage" ] || { artisan storage:link >/dev/null && ok "storage bağlantısı oluşturuldu"; }

# ayar anahtarlarını (gizli olmayan) yoksa ekle — var olanlara dokunma
add_env() { grep -qE "^$1=" "$TARGET/.env" || { printf '%s=%s\n' "$1" "$2" >> "$TARGET/.env"; ok "$1 .env'e eklendi"; }; }
grep -q 'Kervea' "$TARGET/.env" || printf '\n# Kervea\n' >> "$TARGET/.env"
add_env KERVEA_PREMIUM_PRICE_USD 280
add_env KERVEA_LEGACY_ROUTES false
add_env KERVEA_ADMIN_EMAIL ""

# yazma izinleri: web sunucusunun kullanıcısı = storage klasörünün sahibi
OWNER="$(stat -c '%U:%G' "$TARGET/storage" 2>/dev/null || true)"
chmod -R u+rwX,g+rwX "$TARGET/storage" "$TARGET/bootstrap/cache"
[ -n "$OWNER" ] && [ "$(id -u)" -eq 0 ] && chown -R "$OWNER" "$TARGET/storage" "$TARGET/bootstrap/cache"
chmod 600 "$TARGET/.env" 2>/dev/null || true
for c in config:clear route:clear view:clear; do artisan "$c" >/dev/null 2>&1 || true; done
ok "Önbellekler temizlendi, izinler ayarlandı"

# ───────────────────────── 7. Yayına al + test ─────────────────────────
say "7/7  Site açılıyor ve test ediliyor"
artisan up >/dev/null 2>&1 && MAINT=0 && ok "Bakım modu kapandı"

BASE="$(envget APP_URL)"; BASE="${BASE%/}"
if command -v curl >/dev/null 2>&1 && [ -n "$BASE" ]; then
  code() { curl -ks -o /dev/null -m 15 -w '%{http_code}' "$BASE$1" || true; }
  c="$(code /)";                       [ "$c" = "200" ] && ok "Ana sayfa açılıyor (200)"           || warn "Ana sayfa $c döndü ($BASE/) — APP_URL doğru mu?"
  c="$(code /kervea/css/kervea.css)";  [ "$c" = "200" ] && ok "Tasarım dosyaları yükleniyor (200)" || warn "Tasarım dosyası $c döndü — web sunucusunun kök klasörü 'public' olmalı"
  c="$(code /kv/stats)";               [ "$c" = "200" ] && ok "Kervea API çalışıyor (200)"          || warn "/kv/stats $c döndü"
  c="$(code /.env)";                   case "$c" in 200) warn "!!! .env DIŞARIDAN İNDİRİLEBİLİYOR !!! Web sunucusu kökünü 'public' klasörüne çevirin ve tüm anahtarları değiştirin." ;; *) ok ".env dışarıdan erişilemiyor ($c)" ;; esac
  c="$(code /storage/logs/laravel.log)"; case "$c" in 200) warn "Log dosyası dışarıdan okunabiliyor — web sunucusu kökünü 'public' yapın." ;; *) ok "Log dosyası dışarıdan erişilemiyor ($c)" ;; esac
else
  warn "curl yok ya da APP_URL boş; otomatik web testi atlandı."
fi

[ "$(envget APP_DEBUG)" = "true" ] && warn "APP_DEBUG=true — canlıda false olmalı (.env)."
[ "$(envget APP_ENV)" = "production" ] || warn "APP_ENV='$(envget APP_ENV)' — canlıda production olmalı (.env)."
case "$(envget MAIL_MAILER)" in ""|log|array) warn "MAIL_MAILER='$(envget MAIL_MAILER)' — e-posta gönderilmiyor! Onay e-postası gitmezse hiçbir üye giriş yapamaz (.env MAIL_* ayarları).";; esac
case "$BASE" in https://*) ;; *) warn "APP_URL https:// ile başlamıyor ($BASE).";; esac
ADMINS="$(artisan tinker --execute='echo App\Models\User::where("role",1)->count();' 2>/dev/null | tr -dc '0-9' || true)"
if [ "${ADMINS:-0}" = "0" ]; then warn "Yönetici hesabı yok. Oluşturmak için:  cd $TARGET && $PHP artisan kervea:make-admin"; else ok "Yönetici hesabı sayısı: $ADMINS"; fi

DONE=1
say "Bitti"
printf '  Dosya yedeği : %s\n' "$BACKUP_FILE"
[ -n "$DB_DUMP" ] && printf '  Veritabanı   : %s\n' "$DB_DUMP"
printf '  Yönetici girişi: %s/giris   (onay paneli: %s/admin/kervea/applications)\n' "$BASE" "$BASE"
if [ "$WARNINGS" -gt 0 ]; then printf '\n%s  %d uyarı var — yukarıdaki sarı satırlara bakın.%s\n' "$Y" "$WARNINGS" "$N"; else printf '\n%s  Hiç uyarı yok. Güle güle kullanın!%s\n' "$G" "$N"; fi
printf '\n  Geri dönmek isterseniz:\n    tar -xzf %s -C %s\n' "$BACKUP_FILE" "$(dirname "$TARGET")"
