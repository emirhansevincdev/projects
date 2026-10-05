<?php

namespace Tests\Feature\Kv;

use Tests\TestCase;

/** kervea-dosyalar.txt (used by kervea-deploy.sh to detect missing uploads) must not go stale. */
class ManifestTest extends TestCase
{
    private const SKIP = '#^(public/assets/|public/plugin/|public/image/|public/uploads/|tests/|storage/|bootstrap/cache/|\.git|\.phpunit)|^(README\.md|index\.php|server\.php|\.htaccess|public/index\.php|public/\.htaccess|config/database\.php|kervea-dosyalar\.txt)$#';

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
}
