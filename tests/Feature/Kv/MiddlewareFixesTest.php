<?php

namespace Tests\Feature\Kv;

use App\Http\Middleware\PreventBackHistory;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MiddlewareFixesTest extends KvTestCase
{
    public function test_no_cache_headers_can_be_added_to_streamed_and_file_responses(): void
    {
        $mw = new PreventBackHistory();
        $streamed = $mw->handle(Request::create('/x'), fn () => new StreamedResponse(fn () => print('x')));
        $this->assertStringContainsString('no-store', $streamed->headers->get('Cache-Control'));
        $file = $mw->handle(Request::create('/x'), fn () => new BinaryFileResponse(__FILE__));
        $this->assertSame('no-cache', $file->headers->get('Pragma'));
    }

    public function test_asset_version_changes_when_any_kervea_asset_changes(): void
    {
        $this->assertMatchesRegularExpression('/^\d{6,}$/', config('kervea.asset_version'));
        $files = array_merge(glob(public_path('kervea/js/*.js')), glob(public_path('kervea/css/*.css')));
        $newest = max(array_map('filemtime', $files));
        $this->assertSame((string) $newest, config('kervea.asset_version'));
    }
}
