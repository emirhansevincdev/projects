<?php

namespace Tests\Feature\Kv;

use App\Models\User;
use App\Support\CanonicalUrl;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class CanonicalUrlTest extends TestCase
{
    use RefreshDatabase;

    public function test_local_and_malformed_app_urls_are_not_pinned(): void
    {
        foreach ([null, '', 'kervea.ai', 'ftp://kervea.ai', 'http://localhost', 'http://127.0.0.1:8000', 'https://x.test', 'https://site.local'] as $v) {
            $this->assertNull(CanonicalUrl::base($v), (string) $v);
        }
        $this->assertSame('https://kervea.ai', CanonicalUrl::base('https://Kervea.ai/'));
        $this->assertSame('https://kervea.ai', CanonicalUrl::base('https://kervea.ai/panel?x=1'));
    }

    public function test_reset_link_is_built_from_app_url_not_from_the_host_header(): void
    {
        Notification::fake();
        $user = User::factory()->create(['email' => 'victim@example.org', 'role' => 2, 'email_verified_at' => now()]);
        CanonicalUrl::apply('https://kervea.ai');

        $this->call('POST', '/kv/auth/forgot', ['email' => 'victim@example.org'], [], [], ['HTTP_HOST' => 'evil.example', 'HTTPS' => 'on'])->assertOk();

        Notification::assertSentTo($user, ResetPassword::class, function (ResetPassword $n) use ($user) {
            $url = call_user_func(ResetPassword::$createUrlCallback, $user, $n->token);
            return str_starts_with($url, 'https://kervea.ai/set-password?token=') && ! str_contains($url, 'evil.example');
        });
        $this->assertSame('https://kervea.ai', config('app.url'));
    }
}
