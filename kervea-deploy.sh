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
#  Güvenli olması için: .env, config/database.php, storage/, yüklenen dosyalar, public/index.php ve
#  .htaccess'e DOKUNMAZ; önce dosya + veritabanı yedeği alır; güncelleme sırasında siteyi "bakım" moduna alır.
# ─────────────────────────────────────────────────────────────────────────────
[ -n "${BASH_VERSION:-}" ] || { echo "Lütfen şöyle çalıştırın:  bash kervea-deploy.sh" >&2; exit 1; }
set -Eeuo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
TARGET="${TARGET:-/var/www/kervea.ai}"
PHP="${PHP_BIN:-php}"
COMPOSER="${COMPOSER_BIN:-composer}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="${BACKUP_DIR:-$HOME/kervea-yedekler}"
MIGRATIONS=(database/migrations/2026_10_05_000001_create_kervea_tables.php database/migrations/2026_10_08_000001_create_kv_social_identities_table.php)
CHECK_ONLY=0

case "${1:-}" in
  "") ;;
  --kontrol) CHECK_ONLY=1 ;;
  -h|--help|--yardim) sed -n '2,13p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,2\}//'; exit 0 ;;
  *) echo "Bilinmeyen seçenek: $1   (kullanım: bash kervea-deploy.sh [--kontrol])" >&2; exit 2 ;;
esac

if [ -t 1 ]; then G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; B=$'\e[1m'; N=$'\e[0m'; else G=; Y=; R=; B=; N=; fi
say()  { printf '\n%s▶ %s%s\n' "$B" "$*" "$N"; }
ok()   { printf '  %s✔%s %s\n' "$G" "$N" "$*"; }
warn() { printf '  %s⚠%s %s\n' "$Y" "$N" "$*"; WARNINGS=$((WARNINGS+1)); }
die()  { printf '\n%s✖ %s%s\n' "$R" "$*" "$N" >&2; exit 1; }
WARNINGS=0; MAINT=0; DONE=0; STARTED=0; ENVWARN=0; BACKUP_FILE=""; DB_DUMP=""; OWNER=""; LOGFILE=""

# ── web sunucusunun kullanıcısı: storage'ın sahibi (sayısal) ya da çalışan php-fpm/apache kullanıcısı ──
detect_owner() {
  local web
  OWNER="$(stat -c '%u:%g' "$TARGET/storage" 2>/dev/null || true)"
  web="$(ps -eo user:32=,comm= 2>/dev/null | awk '$2 ~ /^(php-fpm|apache2|httpd|lsphp)/ && $1 != "root" {print $1; exit}' || true)"
  if [ -n "$web" ] && id -u "$web" >/dev/null 2>&1; then OWNER="$(id -u "$web"):$(id -g "$web")"; fi
  case "$OWNER" in ""|":"|*:|:*) OWNER="" ;; esac
}
fix_perms() {  # yazılabilir klasörler: bu betik root ise oluşan dosyaların sahibi web kullanıcısı olmalı
  [ -d "$TARGET/storage" ] || return 0
  chmod -R u+rwX,g+rwX "$TARGET/storage" "$TARGET/bootstrap/cache" 2>/dev/null || true
  if [ "$(id -u)" -eq 0 ] && [ -n "$OWNER" ]; then
    chown -R "$OWNER" "$TARGET/storage" "$TARGET/bootstrap/cache" 2>/dev/null || true
  fi
}

on_exit() {
  local code=$?
  trap - EXIT
  if [ "$code" -ne 0 ] && [ "$DONE" -eq 0 ] && [ "$STARTED" -eq 0 ]; then
    printf '  Hiçbir şey değiştirilmedi.\n' >&2
  elif [ "$code" -ne 0 ] && [ "$DONE" -eq 0 ]; then
    fix_perms
    printf '\n%s✖ Güncelleme yarıda kaldı.%s\n' "$R" "$N" >&2
    if [ "$MAINT" -eq 1 ]; then
      printf '  Site "bakım" modunda bırakıldı (yarım bir hâli ziyaretçiye göstermemek için).\n' >&2
      printf '  Sorunu çözüp betiği TEKRAR çalıştırabilirsiniz (güvenle tekrarlanabilir). Siteyi hemen açmak için:\n' >&2
      printf '    cd %q && %q artisan up\n' "$TARGET" "$PHP" >&2
    fi
    [ -n "$BACKUP_FILE" ] && printf '  Dosya yedeği : %s\n' "$BACKUP_FILE" >&2
    [ -n "$DB_DUMP" ] && printf '  Veritabanı   : %s\n' "$DB_DUMP" >&2
    if [ -n "$LOGFILE" ]; then printf '  Şu dosyayı geliştiriciye gönderin: %s\n' "$LOGFILE" >&2
    else printf '  Bu ekranın görüntüsünü geliştiriciye gönderin.\n' >&2; fi
  fi
  exit "$code"
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
MIGOK=1; for m in "${MIGRATIONS[@]}"; do [ -f "$SRC/$m" ] || MIGOK=0; done
[ -f "$SRC/artisan" ] && [ -f "$SRC/routes/web.php" ] && [ "$MIGOK" = 1 ] \
  || die "Bu betik, indirdiğiniz Kervea klasörünün içinden çalıştırılmalı (artisan ve database/ klasörü yanında olmalı)."
[ -d "$TARGET" ] && [ -f "$TARGET/artisan" ] \
  || die "Site klasörü bulunamadı: $TARGET  (farklıysa: TARGET=/yol/klasör bash kervea-deploy.sh)"
TARGET="$(cd "$TARGET" && pwd -P)"          # göreli yol, sonda '/', sembolik bağ → gerçek yol
[ -f "$TARGET/.env" ] || die "$TARGET/.env bulunamadı. Bu betik mevcut, çalışan kurulumu günceller."
if [ ! -r "$TARGET/.env" ] || [ ! -w "$TARGET" ] || { [ -d "$TARGET/storage" ] && [ ! -w "$TARGET/storage" ]; }; then
  die "Bu klasöre yazma/okuma yetkiniz yok. 'root' olarak bağlanın ya da şöyle çalıştırın:   sudo bash kervea-deploy.sh"
fi
command -v "$PHP" >/dev/null 2>&1 || die "PHP bulunamadı ('$PHP'). Farklı bir PHP kullanıyorsanız: PHP_BIN=/usr/bin/php8.3 bash kervea-deploy.sh"
"$PHP" -r 'exit(PHP_VERSION_ID >= 80200 ? 0 : 1);' || die "PHP 8.2 veya üstü gerekiyor (şu an: $("$PHP" -r 'echo PHP_VERSION;'))."
ok "PHP $("$PHP" -r 'echo PHP_VERSION;')"
MODS="$("$PHP" -m)"
for ext in mbstring openssl pdo fileinfo gd xml; do
  grep -qix "$ext" <<<"$MODS" || die "PHP '$ext' eklentisi kurulu değil (yüklenen görselleri işlemek için gerekli)."
done
"$PHP" -r 'exit(function_exists("imagewebp") ? 0 : 1);' || die "PHP GD eklentisi WebP desteğiyle kurulu olmalı."
ok "PHP eklentileri tamam"

SAME=0
[ "$(cd "$SRC" && pwd -P)" = "$TARGET" ] && SAME=1
[ "$SAME" -eq 1 ] && ok "Betik doğrudan site klasöründen çalışıyor (dosya kopyalama atlanacak)"

# Dosya listesi kontrolü: elle yüklenen (SAME) ya da açılan ZIP'te (aksi hâlde) eksik dosya var mı?
if [ -f "$SRC/kervea-dosyalar.txt" ]; then
  CHECKDIR="$SRC"; [ "$SAME" -eq 1 ] && CHECKDIR="$TARGET"
  MISSING="$(while IFS= read -r f; do [ -z "$f" ] || [ -f "$CHECKDIR/$f" ] || printf '%s\n' "$f"; done < "$SRC/kervea-dosyalar.txt")"
  if [ -n "$MISSING" ]; then
    NMISS="$(printf '%s\n' "$MISSING" | wc -l | tr -d ' ')"
    printf '\n  Eksik dosyalar (%s adet, ilk 40):\n' "$NMISS" >&2
    printf '%s\n' "$MISSING" | head -n 40 | sed 's/^/    - /' >&2
    die "$CHECKDIR içinde $NMISS dosya eksik (yukarıdaki liste). Bunları ZIP'ten aynı yollara yükleyip betiği tekrar çalıştırın. Hiçbir şey değiştirilmedi."
  fi
  ok "Tüm Kervea dosyaları yerinde ($(wc -l < "$SRC/kervea-dosyalar.txt" | tr -d ' ') dosya)"
fi

DBOUT="$(artisan tinker --execute='DB::connection()->getPdo(); echo "KV_DB_OK";' 2>&1 || true)"
grep -q "KV_DB_OK" <<<"$DBOUT" || { printf '%s\n' "$DBOUT" | tail -n 8 >&2; die "Veritabanına bağlanılamadı (yukarıdaki hata mesajına bakın). Bağlantı ayarları .env ve config/database.php içindedir."; }
ok "Veritabanına bağlanıldı"

# Mevcut 'users' tablosunda, hesap oluşturmayı engelleyecek zorunlu (NOT NULL, varsayılansız) ek sütun var mı?
BAD="$(artisan tinker --execute='echo "KV_USERCOLS=".collect(Schema::getColumns("users"))->filter(fn($c)=>!$c["nullable"] && $c["default"]===null && empty($c["auto_increment"]) && !in_array($c["name"],["id","name","email","password","role"]))->pluck("name")->implode(",");' 2>/dev/null | grep -o 'KV_USERCOLS=.*' | head -n1 | cut -d= -f2- || true)"
if [ -n "$BAD" ]; then
  ok "'users' tablosunda ek zorunlu sütunlar var ($BAD): hesap açılırken şablonun kendi değerleriyle otomatik doldurulacak"
else
  ok "'users' tablosu uyumlu"
fi

dbcfg() {
  artisan tinker --execute='$c=config("database.connections.".config("database.default")); foreach(["driver","host","port","database","username","password","unix_socket"] as $k) echo "KV_",$k,"=",base64_encode((string)($c[$k] ?? "")),"\n";' 2>/dev/null \
    | grep "^KV_$1=" | head -n1 | cut -d= -f2- | base64 -d 2>/dev/null || true
}
DBC="$(dbcfg driver)"
case "$DBC" in mysql|mariadb) command -v mysqldump >/dev/null 2>&1 && ok "mysqldump var (veritabanı yedeği alınabilir)" || warn "mysqldump bulunamadı: veritabanı yedeği alınamaz (güncellemeden önce hosting panelinden elle yedek alın)." ;; esac
SRC_LOCK="$(md5sum "$SRC/composer.lock" | cut -d' ' -f1)"
if [ ! -f "$TARGET/vendor/autoload.php" ] || [ "$(cat "$TARGET/vendor/.kervea-lock-md5" 2>/dev/null || true)" != "$SRC_LOCK" ]; then
  if [ -f "$TARGET/composer.lock" ] && [ "$(md5sum "$TARGET/composer.lock" | cut -d' ' -f1)" = "$SRC_LOCK" ] && [ -f "$TARGET/vendor/autoload.php" ]; then
    ok "PHP paketleri sitedeki mevcut kurulumla aynı (kurulum gerekmiyor)"
  else
    command -v "$COMPOSER" >/dev/null 2>&1 && ok "composer var" || warn "composer bulunamadı; paketler güncellenmesi gerekirse işlem yarıda kalır."
  fi
fi
NEED_KB=$(( $(du -sk "$TARGET" --exclude=vendor --exclude=node_modules 2>/dev/null | cut -f1) + 50000 ))
AVAIL_KB="$(df -Pk "${BACKUP_DIR%/*}" 2>/dev/null | awk 'NR==2{print $4}')"
[ -n "$AVAIL_KB" ] && [ "$AVAIL_KB" -lt "$NEED_KB" ] && die "Yedek için disk alanı yetersiz (gereken ~$((NEED_KB/1024)) MB, boş $((AVAIL_KB/1024)) MB)."
ok "Disk alanı yeterli"

if [ "$CHECK_ONLY" -eq 1 ]; then
  say "Kontrol bitti — hiçbir şey değiştirilmedi."
  [ "$WARNINGS" -eq 0 ] && ok "Her şey hazır. Güncellemek için:  bash kervea-deploy.sh" || true
  DONE=1; exit 0
fi

if [ "${YES:-0}" != "1" ] && [ ! -t 0 ]; then
  die "Etkileşimsiz çalışıyor; onaylamak için YES=1 verin (örn: YES=1 bash kervea-deploy.sh)."
fi

ans=""
ask_yes() {  # evet / e / yes / y (büyük-küçük harf ve boşluk önemsiz)
  read -r -p "$1" ans
  ans="$(printf '%s' "$ans" | tr '[:upper:]' '[:lower:]' | tr -d '[:space:]')"
  case "$ans" in evet|e|yes|y) return 0 ;; *) return 1 ;; esac
}
if [ "${YES:-0}" != "1" ]; then
  printf '\n  Bu işlem önce yedek alır, sonra siteyi birkaç dakikalığına bakım moduna alıp %s klasörünü günceller.\n' "$TARGET"
  ask_yes "  Devam edilsin mi? (evet/hayır): " || { DONE=1; printf '\n  İptal edildi. Hiçbir şey değiştirilmedi.\n'; exit 0; }
fi

# ───────────────────────── 2. Yedek ─────────────────────────
say "2/7  Yedek alınıyor (geri dönüş için)"
STARTED=1
( umask 077; mkdir -p "$BACKUP_DIR" ); chmod 700 "$BACKUP_DIR"
LOGFILE="$BACKUP_DIR/kervea-log-$STAMP.log"; ( umask 077; : > "$LOGFILE" )
exec > >(tee -a "$LOGFILE") 2>&1
BACKUP_FILE="$BACKUP_DIR/site-$STAMP.tar.gz"
site_name="$(basename "$TARGET")"
if ! ( umask 077; tar -czf "$BACKUP_FILE" -C "$(dirname "$TARGET")" --anchored \
        --exclude="$site_name/vendor" --exclude="$site_name/node_modules" \
        --exclude="$site_name/storage/logs" --exclude="$site_name/storage/framework" "$site_name" ); then
  rm -f "$BACKUP_FILE"; BACKUP_FILE=""
  die "Dosya yedeği alınamadı (disk dolu olabilir: 'df -h' ile bakın). Güvenlik için durduruldu."
fi
tar -tzf "$BACKUP_FILE" 2>/dev/null | grep '/artisan$' >/dev/null || { rm -f "$BACKUP_FILE"; BACKUP_FILE=""; die "Dosya yedeği doğrulanamadı; güvenlik için durduruldu."; }
ok "Dosya yedeği: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

# Uygulamanın GERÇEKTE kullandığı bağlantı (bu şablon bilgileri .env'den değil config/database.php içinden okuyabilir)
DBH="$(dbcfg host)"; DBP="$(dbcfg port)"; DBN="$(dbcfg database)"; DBU="$(dbcfg username)"; DBPW="$(dbcfg password)"; DBS="$(dbcfg unix_socket)"
case "$DBC" in
  mysql|mariadb)
    if command -v mysqldump >/dev/null 2>&1; then
      DB_DUMP="$BACKUP_DIR/veritabani-$STAMP.sql.gz"
      CONN=(-u "$DBU"); if [ -n "$DBS" ]; then CONN+=(-S "$DBS"); else CONN+=(-h "${DBH:-127.0.0.1}" -P "${DBP:-3306}"); fi
      if ! ( umask 077; set -o pipefail; MYSQL_PWD="$DBPW" mysqldump --single-transaction --no-tablespaces "${CONN[@]}" "$DBN" | gzip > "$DB_DUMP" ); then
        rm -f "$DB_DUMP"; DB_DUMP=""; die "Veritabanı yedeği alınamadı; güvenlik için durduruldu."
      fi
      [ "$(gzip -dc "$DB_DUMP" | wc -c)" -gt 500 ] || { rm -f "$DB_DUMP"; DB_DUMP=""; die "Veritabanı yedeği boş çıktı; güvenlik için durduruldu."; }
      ok "Veritabanı yedeği: $DB_DUMP ($(du -h "$DB_DUMP" | cut -f1))"
    else
      warn "mysqldump bulunamadı; veritabanı yedeği ALINAMADI. (Hosting panelinden elle yedek alın.)"
    fi ;;
  sqlite)
    if [ -f "$DBN" ]; then cp "$DBN" "$BACKUP_DIR/veritabani-$STAMP.sqlite" && DB_DUMP="$BACKUP_DIR/veritabani-$STAMP.sqlite" && ok "SQLite yedeği alındı"; fi ;;
  *) warn "Veritabanı türü '$DBC' için otomatik yedek yok; elle yedek alın." ;;
esac

if [ -z "$DB_DUMP" ] && [ "${YES:-0}" != "1" ]; then
  ask_yes "  Veritabanı yedeği OLMADAN devam edilsin mi? (evet/hayır): " || { DONE=1; printf '\n  İptal edildi. Hiçbir şey değiştirilmedi (yalnızca dosya yedeği alındı).\n'; exit 0; }
fi

# ───────────────────────── 3. Bakım modu ─────────────────────────
say "3/7  Site bakım moduna alınıyor"
mkdir -p "$TARGET/storage/framework/views" "$TARGET/storage/framework/cache/data" "$TARGET/storage/framework/sessions" \
         "$TARGET/storage/logs" "$TARGET/storage/app/public" "$TARGET/storage/app/private" "$TARGET/bootstrap/cache"
detect_owner; fix_perms
if artisan down --retry=60 >/dev/null 2>&1; then MAINT=1; ok "Bakım modu açık"; else warn "Bakım modu açılamadı; devam ediliyor."; fi

# ───────────────────────── 4. Dosyalar ─────────────────────────
say "4/7  Yeni dosyalar kopyalanıyor"
if [ "$SAME" -eq 0 ]; then
  # Dokunulmayacaklar: gizli ayarlar, veritabanı ayarı, yüklemeler, sunucuya özel dosyalar, eski şablonun görselleri
  tar -C "$SRC" -cf - --anchored \
      --exclude='./.git' --exclude='./.env' --exclude='./vendor' --exclude='./node_modules' \
      --exclude='./storage' --exclude='./bootstrap/cache' --exclude='./tests' --exclude='./README.md' \
      --exclude='./config/database.php' \
      --exclude='./index.php' --exclude='./server.php' --exclude='./.htaccess' \
      --exclude='./public/index.php' --exclude='./public/.htaccess' --exclude='./public/storage' \
      --exclude='./public/assets' --exclude='./public/plugin' --exclude='./public/image' --exclude='./public/uploads' \
      --exclude='./upload' --exclude='./database/database.sqlite' --exclude='./.phpunit.cache' . \
    | tar -C "$TARGET" -xf - --no-overwrite-dir --no-same-owner
  ok "Dosyalar kopyalandı"
fi
# eski şablonun /public/... adreslerinin çalışması için (public/public → .) — zaten varsa dokunulmaz
if [ ! -e "$TARGET/public/public" ] && ln -s . "$TARGET/public/public" 2>/dev/null; then ok "public/public bağlantısı oluşturuldu"; fi

# ───────────────────────── 5. Bağımlılıklar ─────────────────────────
say "5/7  PHP paketleri"
STAMPF="$TARGET/vendor/.kervea-lock-md5"
LOCKSUM="$(md5sum "$TARGET/composer.lock" | cut -d' ' -f1)"
if [ ! -f "$TARGET/vendor/autoload.php" ] || [ "$(cat "$STAMPF" 2>/dev/null || true)" != "$LOCKSUM" ]; then
  if ! command -v "$COMPOSER" >/dev/null 2>&1; then
    # Bu sürüm yeni PHP paketi eklemiyor: mevcut vendor/ ile çalışmak güvenlidir
    [ -f "$TARGET/vendor/autoload.php" ] || die "composer bulunamadı ve vendor/ klasörü yok; paketler kurulamıyor."
    warn "composer bulunamadı; mevcut paketler olduğu gibi bırakıldı (bu sürümde yeni paket yok)."
  else
    SHIM="$(mktemp -d)"; ln -s "$(command -v "$PHP")" "$SHIM/php"       # composer, PHP_BIN ile seçilen PHP'yi kullansın
    (cd "$TARGET" && PATH="$SHIM:$PATH" COMPOSER_ALLOW_SUPERUSER=1 "$COMPOSER" install --no-dev --optimize-autoloader --no-interaction --prefer-dist)
    rm -rf "$SHIM"
    printf '%s\n' "$LOCKSUM" > "$STAMPF"
    ok "Paketler kuruldu"
  fi
else
  ok "Paketler güncel, atlandı"
fi

# ───────────────────────── 6. Veritabanı ─────────────────────────
say "6/7  Veritabanı güncelleniyor (yalnızca Kervea tabloları eklenir; mevcut verilere dokunulmaz)"
printf '  (Aşağıdaki İngilizce satırlar Laravel'"'"'in kendi çıktısıdır, normaldir.)\n'
# DİKKAT: tüm 'migrate' çalıştırılmaz — eski şablon tabloları zaten var. Yalnızca Kervea migration'ları (tekrar çalıştırılabilir).
MIGARGS=(); for m in "${MIGRATIONS[@]}"; do MIGARGS+=("--path=$m"); done
artisan migrate "${MIGARGS[@]}" --force
artisan db:seed --class=KerveaSeeder --force
ok "Kervea tabloları, 26 sektör ve 249 ülke hazır"

if [ ! -e "$TARGET/public/storage" ]; then artisan storage:link >/dev/null && ok "storage bağlantısı oluşturuldu"; fi

# .env'e (gizli olmayan) ayar anahtarlarını yoksa ekle — var olanlara dokunma
[ -z "$(tail -c1 "$TARGET/.env" 2>/dev/null)" ] || printf '\n' >> "$TARGET/.env"       # son satır \n ile bitsin
add_env() { if ! grep -qE "^$1=" "$TARGET/.env"; then printf '%s=%s\n' "$1" "$2" >> "$TARGET/.env"; ok "$1 .env'e eklendi"; fi; }
grep -qx '# Kervea' "$TARGET/.env" || printf '\n# Kervea\n' >> "$TARGET/.env"
add_env KERVEA_PREMIUM_PRICE_USD 280
add_env KERVEA_LEGACY_ROUTES false
add_env KERVEA_ADMIN_EMAIL ""
add_env GOOGLE_CLIENT_ID ""
add_env GOOGLE_CLIENT_SECRET ""
add_env LINKEDIN_CLIENT_ID ""
add_env LINKEDIN_CLIENT_SECRET ""

for c in config:clear route:clear view:clear; do artisan "$c" >/dev/null 2>&1 || true; done
fix_perms
# PHP önbelleği (OPcache) eski dosyaları tutmasın — mümkünse php-fpm'i yenile
if [ "$(id -u)" -eq 0 ] && command -v systemctl >/dev/null 2>&1; then
  for svc in $(systemctl list-units --type=service --state=running --no-legend 'php*-fpm*' 2>/dev/null | awk '{print $1}'); do
    if systemctl reload "$svc" >/dev/null 2>&1; then ok "$svc yenilendi"; fi
  done
fi
ok "Önbellekler temizlendi, izinler ayarlandı"

# ───────────────────────── 7. Yayına al + test ─────────────────────────
say "7/7  Site açılıyor ve test ediliyor"
artisan up >/dev/null 2>&1 || die "Bakım modu kapatılamadı. Elle deneyin:  cd $TARGET && $PHP artisan up"
MAINT=0; ok "Bakım modu kapandı"

BASE="$(envget APP_URL)"; BASE="${BASE%/}"
if command -v curl >/dev/null 2>&1 && [ -n "$BASE" ]; then
  code() { curl -ks -o /dev/null -m 15 -w '%{http_code}' "$BASE$1" || true; }
  c="$(code /)"
  if [ "$c" = "000" ] || [ -z "$c" ]; then
    warn "Siteye bağlanılamadı ($BASE). Güvenlik/tasarım testleri yapılamadı. APP_URL'yi gerçek adresinize çevirin."; ENVWARN=1
  else
    if [ "$c" = "200" ]; then ok "Ana sayfa açılıyor (200)"; else warn "Ana sayfa $c döndü ($BASE/). Ayrıntı: $TARGET/storage/logs/laravel.log"; fi
    CSSURL="$(curl -ks -m 15 "$BASE/" | grep -o 'href="[^"]*kervea\.css[^"]*"' | head -n1 | sed -E 's/^href="//; s/"$//; s#^https?://[^/]+##' || true)"
    c="$(code "${CSSURL:-/kervea/css/kervea.css}")"
    if [ "$c" = "200" ]; then ok "Tasarım dosyaları yükleniyor (200)"; else warn "Tasarım dosyası bulunamadı ($c). Sitenin kök klasörü yanlış olabilir: hosting panelinde (cPanel: Domains → Document Root) 'public' klasörünü seçin."; fi
    c="$(code /fonts/Carlito-Regular.woff2)"; if [ "$c" = "200" ]; then ok "Yazı tipleri yükleniyor (200)"; else warn "Yazı tipi bulunamadı ($c). Sitenin kök klasörü 'public' olmalı."; fi
    c="$(code /kv/stats)"; if [ "$c" = "200" ]; then ok "Kervea API çalışıyor (200)"; else warn "/kv/stats $c döndü. Ayrıntı: $TARGET/storage/logs/laravel.log"; fi
    c="$(code /kv/firms)"; if [ "$c" = "200" ]; then ok "Firma araması (önbellek/oturum) çalışıyor (200)"; else warn "/kv/firms $c döndü; .env'de CACHE_STORE/SESSION_DRIVER=database ise 'cache'/'sessions' tablosu var mı? Ayrıntı: $TARGET/storage/logs/laravel.log"; fi
    c="$(code /.env)"; case "$c" in 200) warn "!!! .env DIŞARIDAN İNDİRİLEBİLİYOR !!! Sitenin kök klasörü yanlış: hosting panelinde 'public' klasörünü seçin. Sonra APP_KEY, veritabanı parolası ve e-posta parolasını DEĞİŞTİRİN." ;; *) ok ".env dışarıdan erişilemiyor ($c)" ;; esac
    c="$(code /storage/logs/laravel.log)"; case "$c" in 200) warn "Log dosyası dışarıdan okunabiliyor: sitenin kök klasörü 'public' olmalı." ;; *) ok "Log dosyası dışarıdan erişilemiyor ($c)" ;; esac
  fi
else
  warn "curl yok ya da APP_URL boş; otomatik web testi atlandı."
fi

if [ "$(envget APP_DEBUG)" = "true" ]; then warn "APP_DEBUG=true: canlıda false olmalı."; ENVWARN=1; fi
if [ "$(envget APP_ENV)" != "production" ]; then warn "APP_ENV='$(envget APP_ENV)': canlıda production olmalı."; ENVWARN=1; fi
case "$(envget MAIL_MAILER)" in ""|log|array) warn "MAIL_MAILER='$(envget MAIL_MAILER)': e-posta gönderilmiyor! Onay e-postası gitmezse hiçbir üye giriş yapamaz (MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD... ayarlarını girin)."; ENVWARN=1;; esac
case "$BASE" in https://*) ;; *) warn "APP_URL https:// ile başlamıyor ($BASE)."; ENVWARN=1;; esac
ADMINS="$(artisan tinker --execute='echo "KV_ADMINS=".App\Models\User::where("role",1)->count();' 2>/dev/null | grep -o 'KV_ADMINS=[0-9]*' | head -n1 | cut -d= -f2 || true)"
if [ -z "$ADMINS" ]; then warn "Yönetici sayısı okunamadı.";
elif [ "$ADMINS" = "0" ]; then warn "Yönetici hesabı yok. Oluşturmak için:  cd $TARGET && $PHP artisan kervea:make-admin";
else ok "Yönetici hesabı sayısı: $ADMINS"; fi
if grep -q "Kervea2026Pass" "$TARGET/config/database.php" 2>/dev/null; then
  warn "config/database.php içinde veritabanı parolası düz yazı olarak duruyor ve bu parola GitHub'a gitti: parolayı DEĞİŞTİRİN (docs/KERVEA-KURULUM.md · 'Veritabanı parolasını değiştirme')."
fi
for P in GOOGLE LINKEDIN; do
  p="$(printf '%s' "$P" | tr 'A-Z' 'a-z')"
  if [ -n "$(envget ${P}_CLIENT_ID)" ] && [ -n "$(envget ${P}_CLIENT_SECRET)" ]; then
    ok "$P ile giriş etkin. Sağlayıcı konsoluna şu yönlendirme adresi yazılmış olmalı (harfi harfine): $BASE/auth/$p/callback"
    if command -v curl >/dev/null 2>&1; then
      case "$p" in google) PROBE="https://accounts.google.com/.well-known/openid-configuration";; *) PROBE="https://www.linkedin.com/oauth/.well-known/openid-configuration";; esac
      pc="$(curl -s -o /dev/null -m 10 -w '%{http_code}' "$PROBE" || true)"
      if [ "$pc" = "200" ]; then ok "$P sunucusuna bu makineden erişilebiliyor"; else warn "$P sunucusuna bu makineden erişilemedi ($pc): giriş çalışmaz. Sunucunun dışarı HTTPS (443) çıkışı kapalı olabilir."; fi
    fi
  else printf '  %s ile giriş kapalı (.env içinde %s_CLIENT_ID / %s_CLIENT_SECRET boş; düğme gizli kalır)\n' "$P" "$P" "$P"; fi
done

DONE=1
say "Bitti"
printf '  Dosya yedeği : %s\n' "$BACKUP_FILE"
if [ -n "$DB_DUMP" ]; then printf '  Veritabanı   : %s\n' "$DB_DUMP"; fi
printf '  Yönetici girişi: %s/login   (onay paneli: %s/admin/kervea/applications)\n' "$BASE" "$BASE"
if [ "$WARNINGS" -gt 0 ]; then
  printf '\n%s  %d uyarı var. Sarı satırlar hata değil, yapılacaklar listesidir; çözemezseniz bu ekranın görüntüsünü geliştiriciye gönderin.%s\n' "$Y" "$WARNINGS" "$N"
  [ "$ENVWARN" -eq 1 ] && printf '  Ayar dosyasını düzeltmek için:  nano %s/.env   (kaydet: Ctrl+O, Enter · çık: Ctrl+X)\n' "$TARGET"
else printf '\n%s  Hiç uyarı yok. Güle güle kullanın!%s\n' "$G" "$N"; fi
printf '\n  Bir sorun çıkarsa geri dönmek için yedekleriniz hazır (geliştiriciye yazın):\n    dosyalar     : %s\n' "$BACKUP_FILE"
if [ -n "$DB_DUMP" ]; then printf '    veritabanı   : %s\n' "$DB_DUMP"; fi
printf '    işlem kaydı  : %s\n' "$LOGFILE"
printf '  (Dosyaları geri almak: tar -xzf %q -C %q)\n' "$BACKUP_FILE" "$(dirname "$TARGET")"
