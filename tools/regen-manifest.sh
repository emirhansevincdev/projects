#!/usr/bin/env bash
# Regenerates kervea-dosyalar.txt (file list) and kervea-sha256.txt (checksums) used by kervea-deploy.sh.
# Run from the project root after ANY change, then commit both files (tests/Feature/Kv/ManifestTest.php fails if they are stale).
# Text files are hashed with carriage returns removed, so Windows (CRLF) and Linux (LF) copies of the same file count as equal.
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

SKIP='^(public/assets/|public/plugin/|public/image/|public/uploads/|tests/|storage/|bootstrap/cache/|\.git|\.phpunit)|^(README\.md|index\.php|server\.php|\.htaccess|public/index\.php|public/\.htaccess|config/database\.php|kervea-dosyalar\.txt|kervea-sha256\.txt)$'

# KEEP IN SYNC with kvhash() in kervea-deploy.sh and ManifestTest::normalizedHash()
kvhash() {
  case "$1" in
    *.php|*.js|*.css|*.html|*.htm|*.md|*.txt|*.json|*.sh|*.xml|*.svg|*.csv|*.yml|*.yaml|artisan|.env.example|.editorconfig|.gitattributes|.gitignore)
      tr -d '\r' < "$1" | sha256sum | cut -d' ' -f1 ;;
    *) sha256sum < "$1" | cut -d' ' -f1 ;;
  esac
}

git add -A
git ls-files | grep -vE "$SKIP" | LC_ALL=C sort > kervea-dosyalar.txt
: > kervea-sha256.txt
while IFS= read -r f; do printf '%s  %s\n' "$(kvhash "$f")" "$f" >> kervea-sha256.txt; done < kervea-dosyalar.txt
wc -l kervea-dosyalar.txt kervea-sha256.txt
