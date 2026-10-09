<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\SocialIdentity;
use App\Models\User;
use App\Services\Kv\Totp;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

class SocialLoginTest extends KvTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config([
            'kervea.social.redirect_base' => 'http://localhost',     // = the host the test client uses (no canonical hop)
            'kervea.social.google' => ['client_id' => 'g-client', 'client_secret' => 'g-secret'],
            'kervea.social.linkedin' => ['client_id' => 'l-client', 'client_secret' => 'l-secret'],
        ]);
    }

    private function fakeProvider(array $profile, string $provider = 'google', int $tokenStatus = 200): void
    {
        $hosts = $provider === 'google'
            ? ['oauth2.googleapis.com/token', 'openidconnect.googleapis.com/v1/userinfo']
            : ['www.linkedin.com/oauth/v2/accessToken', 'api.linkedin.com/v2/userinfo'];
        Http::fake([
            $hosts[0] => Http::response($tokenStatus === 200 ? ['access_token' => 'at-123', 'token_type' => 'Bearer'] : ['error' => 'invalid_grant'], $tokenStatus),
            $hosts[1] => Http::response($profile, 200),
        ]);
    }

    /** Starts the flow like the browser would and returns the state the provider will echo back. */
    private function start(string $provider = 'google'): string
    {
        $res = $this->get("/auth/$provider/redirect")->assertRedirect();
        parse_str((string) parse_url($res->headers->get('Location'), PHP_URL_QUERY), $q);
        return $q['state'];
    }

    private function finish(string $state, string $provider = 'google', string $code = 'auth-code')
    {
        return $this->get("/auth/$provider/callback?".http_build_query(['code' => $code, 'state' => $state]));
    }

    public function test_buttons_are_only_offered_for_configured_providers(): void
    {
        config(['kervea.social.linkedin.client_secret' => null]);
        $html = $this->get('/login')->assertOk()->getContent();
        $this->assertStringContainsString('"social":{"google":true,"linkedin":false}', $html);
        $this->assertStringNotContainsString('g-secret', $html);

        $this->get('/auth/linkedin/redirect')->assertRedirect('/login?social=unavailable');
    }

    public function test_unknown_provider_is_404(): void
    {
        $this->get('/auth/facebook/redirect')->assertNotFound();
        $this->get('/auth/facebook/callback')->assertNotFound();
    }

    public function test_redirect_to_google_carries_state_pkce_and_the_registered_callback_uri(): void
    {
        $loc = $this->get('/auth/google/redirect')->assertRedirect()->headers->get('Location');
        $this->assertStringStartsWith('https://accounts.google.com/o/oauth2/v2/auth?', $loc);
        parse_str((string) parse_url($loc, PHP_URL_QUERY), $q);
        $this->assertSame('g-client', $q['client_id']);
        $this->assertSame('http://localhost/auth/google/callback', $q['redirect_uri']);
        $this->assertSame('code', $q['response_type']);
        $this->assertStringContainsString('email', $q['scope']);
        $this->assertSame('S256', $q['code_challenge_method']);
        $this->assertGreaterThanOrEqual(40, strlen($q['state']));
        $this->assertArrayNotHasKey('client_secret', $q);

        $lin = $this->get('/auth/linkedin/redirect')->headers->get('Location');
        $this->assertStringStartsWith('https://www.linkedin.com/oauth/v2/authorization?', $lin);
        $this->assertStringNotContainsString('code_challenge', $lin);
    }

    public function test_existing_member_signs_in_and_the_provider_account_gets_linked(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $u->forceFill(['email_verified_at' => null])->save();
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'A@Acme.test', 'email_verified' => true, 'name' => 'A']);

        $state = $this->start();
        $this->finish($state)->assertRedirect('/panel');

        $this->assertAuthenticatedAs($u->fresh());
        $this->assertNotNull($u->fresh()->email_verified_at);                       // provider proved the mailbox
        $this->assertDatabaseHas('kv_social_identities', ['user_id' => $u->id, 'provider' => 'google', 'provider_user_id' => 'g-1']);
        Http::assertSent(fn (Request $r) => str_contains($r->url(), 'oauth2.googleapis.com/token')
            && $r['code'] === 'auth-code' && $r['client_secret'] === 'g-secret' && ! empty($r['code_verifier'])
            && $r['redirect_uri'] === 'http://localhost/auth/google/callback');
        Http::assertSent(fn (Request $r) => str_contains($r->url(), 'userinfo') && $r->hasHeader('Authorization', 'Bearer at-123'));
        $this->getJson('/kv/auth/me')->assertJsonPath('user.email', 'a@acme.test');
    }

    public function test_linkedin_member_signs_in_too(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $this->fakeProvider(['sub' => 'li-9', 'email' => 'a@acme.test', 'email_verified' => true], 'linkedin');
        $this->finish($this->start('linkedin'), 'linkedin')->assertRedirect('/panel');
        $this->assertAuthenticatedAs($u->fresh());
        $this->assertDatabaseHas('kv_social_identities', ['user_id' => $u->id, 'provider' => 'linkedin', 'provider_user_id' => 'li-9']);
    }

    public function test_no_account_is_ever_created_from_a_social_login(): void
    {
        $this->fakeProvider(['sub' => 'g-77', 'email' => 'stranger@nowhere.test', 'email_verified' => true]);
        $before = User::count();
        $this->finish($this->start())->assertRedirect('/login?social=not_member');
        $this->assertGuest();
        $this->assertSame($before, User::count());
        $this->assertSame(0, SocialIdentity::count());
    }

    public function test_an_unverified_provider_email_cannot_take_over_a_member(): void
    {
        $this->member('Acme', 'a@acme.test');
        foreach ([false, 'false', null] as $flag) {
            $this->fakeProvider(['sub' => 'evil', 'email' => 'a@acme.test', 'email_verified' => $flag]);
            $this->finish($this->start())->assertRedirect('/login?social=email_unverified');
            $this->assertGuest();
        }
        $this->assertSame(0, SocialIdentity::count());
    }

    public function test_admins_cannot_use_social_login(): void
    {
        $this->admin();
        $this->fakeProvider(['sub' => 'g-adm', 'email' => 'admin@kervea.test', 'email_verified' => true]);
        $this->finish($this->start())->assertRedirect('/login?social=admin_password');
        $this->assertGuest();
        $this->assertSame(0, SocialIdentity::count());
    }

    public function test_state_is_mandatory_single_use_and_checked_before_anything_is_sent_to_the_provider(): void
    {
        $this->member('Acme', 'a@acme.test');
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $this->get('/auth/google/callback?code=x&state=whatever')->assertRedirect('/login?social=expired');   // never started
        $state = $this->start();
        $this->finish('wrong-state')->assertRedirect('/login?social=expired');                              // mismatch consumes the flow
        $this->finish($state)->assertRedirect('/login?social=expired');
        $this->get('/auth/google/callback?code=x')->assertRedirect('/login?social=expired');                  // no state at all
        Http::assertNothingSent();
        $this->assertGuest();

        $state = $this->start();
        $this->finish($state)->assertRedirect('/panel');
        auth()->logout();
        $this->finish($state)->assertRedirect('/login?social=expired');                                     // replay of a used state
    }

    public function test_a_flow_started_for_one_provider_cannot_be_completed_as_another(): void
    {
        $this->member('Acme', 'a@acme.test');
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $state = $this->start('google');
        $this->finish($state, 'linkedin')->assertRedirect('/login?social=expired');
        Http::assertNothingSent();
    }

    public function test_an_expired_flow_is_refused(): void
    {
        $this->member('Acme', 'a@acme.test');
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $state = $this->start();
        $this->travel(11)->minutes();
        $this->finish($state)->assertRedirect('/login?social=expired');
        Http::assertNothingSent();
    }

    public function test_user_cancelling_and_provider_failures_are_reported_without_echoing_provider_text(): void
    {
        $this->member('Acme', 'a@acme.test');
        $state = $this->start();
        $this->get('/auth/google/callback?'.http_build_query(['error' => 'access_denied', 'error_description' => '<script>x</script>', 'state' => $state]))
            ->assertRedirect('/login?social=cancelled');

        $this->fakeProvider([], 'google', 400);
        $this->finish($this->start())->assertRedirect('/login?social=failed');

        Http::fake(['*' => Http::response('boom', 500)]);
        $this->finish($this->start())->assertRedirect('/login?social=failed');

        Http::fake(['oauth2.googleapis.com/token' => Http::response(['access_token' => 'x']), 'openidconnect.googleapis.com/*' => Http::response(['email' => 'a@acme.test', 'email_verified' => true])]);   // no "sub"
        $this->finish($this->start())->assertRedirect('/login?social=failed');
        $this->assertGuest();
    }

    public function test_a_linked_member_is_found_by_provider_id_not_by_email(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        SocialIdentity::create(['user_id' => $u->id, 'provider' => 'google', 'provider_user_id' => 'g-1', 'email' => 'a@acme.test']);
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'new-address@gmail.test', 'email_verified' => true]);
        $this->finish($this->start())->assertRedirect('/panel');
        $this->assertAuthenticatedAs($u->fresh());
        $this->assertNotNull(SocialIdentity::first()->last_login_at);
    }

    public function test_a_recycled_email_with_a_different_provider_account_is_not_relinked(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        SocialIdentity::create(['user_id' => $u->id, 'provider' => 'google', 'provider_user_id' => 'g-original', 'email' => 'a@acme.test']);
        $this->fakeProvider(['sub' => 'g-someone-else', 'email' => 'a@acme.test', 'email_verified' => true]);
        $this->finish($this->start())->assertRedirect('/login?social=other_account');
        $this->assertGuest();
        $this->assertSame(1, SocialIdentity::count());
    }

    public function test_member_with_two_factor_must_also_enter_the_authenticator_code(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $secret = Totp::newSecret();
        $u->forceFill(['two_factor_secret' => $secret, 'two_factor_confirmed_at' => now()])->save();
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);

        $this->finish($this->start())->assertRedirect('/login?social=two_factor');
        $this->assertGuest();
        $this->assertSame(0, SocialIdentity::count());                                            // not linked before the 2nd factor

        $this->postJson('/kv/auth/social/2fa', ['code' => '000000'])->assertStatus(422)->assertJsonPath('error', 'two_factor_invalid');
        $this->assertGuest();
        $this->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])->assertOk()->assertJsonPath('user.email', 'a@acme.test');
        $this->assertAuthenticatedAs($u->fresh());
        $this->assertSame(1, SocialIdentity::count());
        $this->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])->assertStatus(422);   // pending step is gone
    }

    public function test_two_factor_step_is_unavailable_without_the_provider_step_and_is_rate_limited(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $secret = Totp::newSecret();
        $u->forceFill(['two_factor_secret' => $secret, 'two_factor_confirmed_at' => now()])->save();

        $this->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])->assertStatus(422)->assertJsonPath('error', 'expired');
        $this->assertGuest();

        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $this->finish($this->start());
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/kv/auth/social/2fa', ['code' => '111111'])->assertStatus(422);
        }
        $this->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])->assertStatus(429);   // locked even for the right code
        $this->assertGuest();
    }

    public function test_already_signed_in_visitors_are_sent_home_without_contacting_the_provider(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        Http::fake();
        $this->actingAs($u)->get('/auth/google/redirect')->assertRedirect('/panel');
        Http::assertNothingSent();
    }

    public function test_session_id_changes_on_social_login(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $state = $this->start();
        $before = session()->getId();
        $this->finish($state)->assertRedirect('/panel');
        $this->assertNotSame($before, session()->getId());
    }

    public function test_the_flow_always_starts_on_the_app_url_host(): void
    {
        config(['kervea.social.redirect_base' => 'https://kervea.ai']);
        // arrived on another host (www.) or over http → one hop to the canonical address, never to the provider
        $this->get('/auth/google/redirect')->assertRedirect('https://kervea.ai/auth/google/redirect?c=1');
        $this->assertNull(session('kv_oauth'));
        // the marker stops any loop; the redirect URI is built from APP_URL, not from the request host
        $loc = $this->get('/auth/google/redirect?c=1')->assertRedirect()->headers->get('Location');
        $this->assertStringStartsWith('https://accounts.google.com/', $loc);
        parse_str((string) parse_url($loc, PHP_URL_QUERY), $q);
        $this->assertSame('https://kervea.ai/auth/google/callback', $q['redirect_uri']);
    }

    public function test_redirect_uri_follows_env_app_url_even_though_config_app_url_is_host_derived(): void
    {
        config(['kervea.social.redirect_base' => null, 'app.url' => 'http://localhost/']);
        $this->assertSame('http://localhost/auth/linkedin/callback', \App\Services\Kv\SocialAuth::redirectUri('linkedin'));
        config(['kervea.social.redirect_base' => 'https://kervea.ai/']);
        $this->assertSame('https://kervea.ai/auth/linkedin/callback', \App\Services\Kv\SocialAuth::redirectUri('linkedin'));
    }

    public function test_an_orphaned_identity_is_dropped_and_the_member_can_link_again(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        // what a MyISAM users table leaves behind: the same table without the FK that would cascade
        \Illuminate\Support\Facades\Schema::drop('kv_social_identities');
        \Illuminate\Support\Facades\Schema::create('kv_social_identities', function (\Illuminate\Database\Schema\Blueprint $t) {
            $t->id();
            $t->unsignedBigInteger('user_id')->index();
            $t->string('provider', 20);
            $t->string('provider_user_id', 191);
            $t->string('email', 254)->nullable();
            $t->timestamp('last_login_at')->nullable();
            $t->timestamps();
            $t->unique(['provider', 'provider_user_id']);
            $t->unique(['user_id', 'provider']);
        });
        SocialIdentity::create(['user_id' => 987654, 'provider' => 'google', 'provider_user_id' => 'g-1', 'email' => 'a@acme.test']);
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $this->finish($this->start())->assertRedirect('/panel');
        $this->assertAuthenticatedAs($u->fresh());
        $this->assertSame([$u->id], SocialIdentity::pluck('user_id')->all());
    }

    public function test_deleting_the_account_removes_the_provider_links(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        SocialIdentity::create(['user_id' => $u->id, 'provider' => 'google', 'provider_user_id' => 'g-1', 'email' => 'a@acme.test']);
        $this->actingAs($u)->deleteJson('/kv/me', ['password' => 'Secret-pass-1'])->assertOk();
        $this->assertSame(0, SocialIdentity::count());
    }

    public function test_linkedin_cancel_codes_are_reported_as_cancelled(): void
    {
        $this->member('Acme', 'a@acme.test');
        foreach (['user_cancelled_login', 'user_cancelled_authorize', 'access_denied'] as $err) {
            $state = $this->start('linkedin');
            $this->get('/auth/linkedin/callback?'.http_build_query(['error' => $err, 'state' => $state]))->assertRedirect('/login?social=cancelled');
        }
        $state = $this->start('linkedin');
        $this->get('/auth/linkedin/callback?'.http_build_query(['error' => 'server_error', 'state' => $state]))->assertRedirect('/login?social=failed');
    }

    public function test_social_routes_have_their_own_rate_limit_buckets(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $secret = Totp::newSecret();
        $u->forceFill(['two_factor_secret' => $secret, 'two_factor_confirmed_at' => now()])->save();
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        for ($i = 0; $i < 12; $i++) {
            $this->getJson('/kv/firms')->assertOk();            // ordinary browsing used to eat the 2FA budget (shared per-IP counter)
        }
        $this->finish($this->start())->assertRedirect('/login?social=two_factor');
        $this->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])->assertOk();
    }

    public function test_two_factor_guessing_is_limited_per_member_across_ip_addresses(): void
    {
        [$u] = $this->member('Acme', 'a@acme.test');
        $secret = Totp::newSecret();
        $u->forceFill(['two_factor_secret' => $secret, 'two_factor_confirmed_at' => now()])->save();
        $this->fakeProvider(['sub' => 'g-1', 'email' => 'a@acme.test', 'email_verified' => true]);
        $this->finish($this->start())->assertRedirect('/login?social=two_factor');

        foreach (['10.0.0.1', '10.0.0.2', '10.0.0.3'] as $ip) {
            for ($i = 0; $i < 5; $i++) {
                $this->withServerVariables(['REMOTE_ADDR' => $ip])->postJson('/kv/auth/social/2fa', ['code' => '111111'])->assertStatus(422);
            }
        }
        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.4'])->postJson('/kv/auth/social/2fa', ['code' => Totp::code($secret)])
            ->assertStatus(429)->assertJsonPath('error', 'locked');
        $this->assertGuest();
    }

    public function test_unlink_command_clears_one_member_or_everybody_of_a_provider(): void
    {
        [$a] = $this->member('Acme', 'a@acme.test');
        [$b] = $this->member('Beta', 'b@beta.test');
        foreach ([[$a, 'google', 'g-a'], [$a, 'linkedin', 'l-a'], [$b, 'linkedin', 'l-b']] as [$u, $p, $sub]) {
            SocialIdentity::create(['user_id' => $u->id, 'provider' => $p, 'provider_user_id' => $sub, 'email' => $u->email]);
        }
        $this->artisan('kervea:social-unlink', ['provider' => 'linkedin', 'email' => 'A@Acme.test'])->expectsOutput('1 bağlantı silindi.')->assertSuccessful();
        $this->assertSame(2, SocialIdentity::count());
        $this->artisan('kervea:social-unlink', ['provider' => 'linkedin'])->assertFailed();                    // neither e-mail nor --all
        $this->artisan('kervea:social-unlink', ['provider' => 'facebook', '--all' => true])->assertFailed();
        $this->artisan('kervea:social-unlink', ['provider' => 'linkedin', '--all' => true])->expectsConfirmation('Tüm linkedin bağlantıları silinsin mi? (Üyeler bir sonraki girişte yeniden bağlanır.)', 'yes')->assertSuccessful();
        $this->assertSame(['google'], SocialIdentity::pluck('provider')->all());
    }

    public function test_unconfigured_buttons_are_hidden_in_the_html_itself_so_nothing_flashes(): void
    {
        $off = ['client_id' => null, 'client_secret' => null];
        $on = ['client_id' => 'x', 'client_secret' => 'y'];

        config(['kervea.social.google' => $on, 'kervea.social.linkedin' => $off]);
        $html = $this->get('/login')->getContent();
        $this->assertStringContainsString('[data-social="linkedin"]{display:none}', $html);
        $this->assertStringNotContainsString('[data-social="google"]{display:none}', $html);
        $this->assertStringContainsString('#login .kv-login-social{grid-template-columns:1fr}', $html);

        config(['kervea.social.google' => $off]);
        $html = $this->get('/login')->getContent();
        $this->assertStringContainsString('#login .kv-login-social,#login .kv-login-sep{display:none}', $html);

        config(['kervea.social.google' => $on, 'kervea.social.linkedin' => $on]);
        $html = $this->get('/login')->getContent();
        $this->assertStringNotContainsString('data-social="google"]{display:none}', $html);
        $this->assertStringNotContainsString('data-social="linkedin"]{display:none}', $html);
        $this->assertStringNotContainsString('.kv-login-sep{display:none}', $html);
    }

    public function test_status_command_explains_a_client_id_pasted_into_the_secret_and_never_prints_secrets(): void
    {
        $secret = '510535883838-fakefakefake.apps.googleusercontent.com';
        config(['kervea.social.redirect_base' => 'https://kervea.ai', 'kervea.social.google' => ['client_id' => '...apps.googleusercontent.com', 'client_secret' => $secret]]);
        $this->withoutMockingConsoleOutput();
        \Illuminate\Support\Facades\Artisan::call('kervea:social-status');
        $out = \Illuminate\Support\Facades\Artisan::output();
        $this->assertStringContainsString('GOOGLE_CLIENT_SECRET satırına Client ID yazılmış', $out);
        $this->assertStringContainsString("'...'", $out);
        $this->assertStringContainsString('https://kervea.ai/auth/google/callback', $out);
        $this->assertStringContainsString('AÇIK', $out);            // both are non-empty, so the button is on — the hints say what is wrong
        $this->assertStringNotContainsString($secret, $out);
    }

    public function test_status_command_reports_missing_keys_and_a_localhost_app_url(): void
    {
        config(['kervea.social.redirect_base' => 'http://127.0.0.1:8000', 'kervea.social.google' => ['client_id' => 'abc.apps.googleusercontent.com', 'client_secret' => null], 'kervea.social.linkedin' => ['client_id' => null, 'client_secret' => null]]);
        $this->withoutMockingConsoleOutput();
        \Illuminate\Support\Facades\Artisan::call('kervea:social-status');
        $out = \Illuminate\Support\Facades\Artisan::output();
        $this->assertStringContainsString('APP_URL gerçek ve https:// ile başlayan', $out);
        $this->assertStringContainsString('KAPALI', $out);
        $this->assertStringContainsString('Biri boş', $out);
        $this->assertStringContainsString('GOOGLE_CLIENT_SECRET', $out);
    }

    private function tmpEnv(string $content): string
    {
        $f = tempnam(sys_get_temp_dir(), 'kvenv');
        file_put_contents($f, $content);
        return $f;
    }

    public function test_setup_command_writes_the_keys_into_env_without_duplicates_or_echoing_the_secret(): void
    {
        $env = $this->tmpEnv("APP_NAME=Kervea\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\nGOOGLE_CLIENT_ID=old\nMAIL_HOST=smtp.test\nLINKEDIN_CLIENT_ID=\n");
        $secret = 'GOCSPX-abcDEF123_-xyz';
        $this->artisan('kervea:social-setup', ['provider' => 'google', '--env' => $env])
            ->expectsQuestion('Client ID', '123456789012-abc.apps.googleusercontent.com')
            ->expectsQuestion('Client secret (yazarken görünmez)', $secret)
            ->doesntExpectOutputToContain($secret)
            ->expectsOutputToContain('anahtarları .env dosyasına yazıldı')
            ->assertSuccessful();

        $text = file_get_contents($env);
        $this->assertSame(1, substr_count($text, 'GOOGLE_CLIENT_ID='));                          // the duplicate line is gone
        $this->assertStringContainsString("GOOGLE_CLIENT_ID=123456789012-abc.apps.googleusercontent.com\n", $text);
        $this->assertStringContainsString("GOOGLE_CLIENT_SECRET=$secret\n", $text);
        $this->assertStringContainsString("APP_NAME=Kervea\n", $text);                          // other lines untouched
        $this->assertStringContainsString("MAIL_HOST=smtp.test\n", $text);
        $this->assertStringContainsString("LINKEDIN_CLIENT_ID=\n", $text);
        $this->assertStringEndsWith("\n", $text);
        unlink($env);
    }

    public function test_setup_command_appends_missing_keys_and_handles_a_file_without_trailing_newline(): void
    {
        $env = $this->tmpEnv("APP_NAME=Kervea");
        $this->artisan('kervea:social-setup', ['provider' => 'linkedin', '--env' => $env])
            ->expectsQuestion('Client ID', '77abcd1234xyz')
            ->expectsQuestion('Client secret (yazarken görünmez)', 'WPL_AP1.abc.def==')
            ->assertSuccessful();
        $this->assertSame("APP_NAME=Kervea\nLINKEDIN_CLIENT_ID=77abcd1234xyz\nLINKEDIN_CLIENT_SECRET=WPL_AP1.abc.def==\n", file_get_contents($env));
        unlink($env);
    }

    public function test_setup_command_refuses_the_usual_mix_ups_and_writes_nothing(): void
    {
        $original = "GOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n";
        $env = $this->tmpEnv($original);
        $cases = [
            ['...apps.googleusercontent.com', 'GOCSPX-x'],                                       // the "..." from the docs example
            ['123-abc.apps.googleusercontent.com', '123-abc2.apps.googleusercontent.com'],       // Client ID pasted as the secret
            ['not-a-google-id', 'GOCSPX-x'],                                                     // wrong ending
            ['123-abc.apps.googleusercontent.com', 'GOCSPX-x y'],                                // space inside
            ['123-abc.apps.googleusercontent.com', ''],                                          // empty secret
        ];
        foreach ($cases as [$id, $sec]) {
            $this->artisan('kervea:social-setup', ['provider' => 'google', '--env' => $env])
                ->expectsQuestion('Client ID', $id)
                ->expectsQuestion('Client secret (yazarken görünmez)', $sec)
                ->expectsOutputToContain('Hiçbir şey kaydedilmedi')
                ->assertFailed();
            $this->assertSame($original, file_get_contents($env));
        }
        $this->artisan('kervea:social-setup', ['provider' => 'facebook', '--env' => $env])->assertFailed();
        unlink($env);
    }
}
