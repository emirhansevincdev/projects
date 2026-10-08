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
            'app.url' => 'https://kervea.test',
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
        $this->assertSame('https://kervea.test/auth/google/callback', $q['redirect_uri']);
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
            && $r['redirect_uri'] === 'https://kervea.test/auth/google/callback');
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
}
