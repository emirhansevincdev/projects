<?php

namespace Tests\Feature\Kv;

use Tests\TestCase;

/** kervea-dosyalar.txt (used by kervea-deploy.sh to detect missing uploads) must not go stale. */
class ManifestTest extends TestCase
{
    private const SKIP = '#^(public/assets/|public/plugin/|public/image/|public/uploads/|tests/|storage/|bootstrap/cache/|\.git|\.phpunit)|^(README\.md|index\.php|server\.php|\.htaccess|public/index\.php|public/\.htaccess|config/database\.php|kervea-dosyalar\.txt|kervea-sha256\.txt)$#';

    public function test_manifest_lists_exactly_the_deployable_tracked_files(): void
    {
        $tracked = shell_exec('cd '.escapeshellarg(base_path()).' && git ls-files 2>/dev/null');
        if (! $tracked) {
            $this->markTestSkipped('git not available');
        }
        $expected = array_values(array_filter(explode("\n", trim($tracked)), fn ($f) => $f !== '' && ! preg_match(self::SKIP, $f)));
        sort($expected, SORT_STRING);
        $listed = array_values(array_filter(explode("\n", trim(file_get_contents(base_path('kervea-dosyalar.txt'))))));

        $this->assertSame([], array_values(array_diff($expected, $listed)), 'Yeni dosyalar listede yok — kervea-dosyalar.txt yeniden üretin.');
        $this->assertSame([], array_values(array_diff($listed, $expected)), 'Listede artık olmayan dosyalar var.');
        $this->assertContains('database/seeders/data/i18n.json', $listed);
    }

    /** kervea-sha256.txt lets the deploy script spot files that were uploaded but are an OLD version. */
    public function test_checksums_match_the_files_so_the_deploy_script_does_not_cry_wolf(): void
    {
        $tracked = shell_exec('cd '.escapeshellarg(base_path()).' && git ls-files 2>/dev/null');
        if (! $tracked) {
            $this->markTestSkipped('git not available');
        }
        $expected = array_values(array_filter(explode("\n", trim($tracked)), fn ($f) => $f !== '' && ! preg_match(self::SKIP, $f)));
        sort($expected, SORT_STRING);

        $lines = array_values(array_filter(explode("\n", trim(file_get_contents(base_path('kervea-sha256.txt'))))));
        $sums = [];
        foreach ($lines as $l) {
            $this->assertMatchesRegularExpression('/^[0-9a-f]{64}  \S.*$/', $l);
            $sums[substr($l, 66)] = substr($l, 0, 64);
        }
        $paths = array_keys($sums);
        sort($paths, SORT_STRING);
        $this->assertSame($expected, $paths, 'kervea-sha256.txt dosya listesi güncel değil — yeniden üretin.');
        $stale = [];
        foreach ($sums as $path => $sum) {
            if (! is_file(base_path($path)) || hash_file('sha256', base_path($path)) !== $sum) {
                $stale[] = $path;
            }
        }
        $this->assertSame([], $stale, 'Bu dosyalar değişti ama kervea-sha256.txt yeniden üretilmedi.');
    }
}
