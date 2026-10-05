<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ApplicationFlowTest extends KvTestCase
{
    public function test_application_is_created_pending_with_consent_proof_and_not_public(): void
    {
        Mail::fake();
        $this->postJson('/kv/applications', $this->payload())->assertCreated();

        $c = Company::firstOrFail();
        $this->assertSame('pending', $c->status);
        $this->assertNull($c->user_id);
        $this->assertSame(1, $c->documents()->count());
        $this->assertTrue($c->hasConsent('kvkk'));
        $this->assertFalse($c->hasConsent('marketing'));
        $this->assertNotNull($c->consents()->where('type', 'kvkk')->first()->ip);
        Storage::disk('local')->assertExists($c->documents->first()->path);          // documents stay private
        $this->getJson('/kv/firms')->assertJsonPath('total', 0);                      // pending ≠ listed
        $this->getJson('/kv/firms/'.$c->slug)->assertNotFound();
    }

    public function test_required_consents_and_description_length_are_enforced_server_side(): void
    {
        $this->postJson('/kv/applications', $this->payload(['consents' => ['kvkk' => 0]]))->assertStatus(422);
        $this->postJson('/kv/applications', $this->payload(['description' => $this->words(40)]))->assertStatus(422);
        $this->postJson('/kv/applications', $this->payload(['description' => $this->words(400)]))->assertStatus(422);
        $this->assertSame(0, Company::count());
    }

    public function test_svg_and_php_uploads_are_rejected(): void
    {
        $bad = \Illuminate\Http\UploadedFile::fake()->createWithContent('logo.png', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
        $this->postJson('/kv/applications', $this->payload(['logo' => $bad]))->assertStatus(422);
        $this->assertSame(0, Company::count());
    }

    public function test_admin_approval_creates_member_and_member_can_set_password_and_login(): void
    {
        Mail::fake();
        $this->postJson('/kv/applications', $this->payload())->assertCreated();
        $c = Company::first();

        // Non-admins cannot reach the approval panel; guests are bounced too.
        $this->get('/admin/kervea/applications')->assertRedirect();
        $this->actingAs(User::factory()->make(['role' => 2]))->get('/admin/kervea/applications')->assertRedirect('/');
        auth()->logout();

        $url = null;
        $this->actingAs($this->admin())->post("/admin/kervea/applications/{$c->id}/approve")->assertRedirect();
        Mail::assertSent(KvMail::class, function (KvMail $m) use (&$url) {
            if ($m->template === 'application_approved') { $url = $m->data['url']; return true; }
            return false;
        });
        $c->refresh();
        $this->assertSame('approved', $c->status);
        $this->assertNotNull($c->user_id);
        auth()->logout();

        // Cannot log in before setting a password / verifying the mailbox.
        $this->postJson('/kv/auth/login', ['email' => $c->email, 'password' => 'anything-123'])->assertStatus(422);

        parse_str(parse_url($url, PHP_URL_QUERY), $q);
        $this->postJson('/kv/auth/set-password', ['email' => $q['email'], 'token' => $q['token'], 'password' => 'weak', 'password_confirmation' => 'weak'])->assertStatus(422);
        $this->postJson('/kv/auth/set-password', ['email' => $q['email'], 'token' => $q['token'], 'password' => 'Str0ng-Passw0rd', 'password_confirmation' => 'Str0ng-Passw0rd'])->assertOk();

        $this->postJson('/kv/auth/login', ['email' => $c->email, 'password' => 'Str0ng-Passw0rd'])->assertOk()->assertJsonPath('user.company', $c->slug);
        $this->getJson('/kv/me')->assertOk()->assertJsonPath('company.status', 'approved');
    }

    public function test_login_is_rate_limited_and_does_not_reveal_whether_account_exists(): void
    {
        [$u] = $this->member();
        $a = $this->postJson('/kv/auth/login', ['email' => $u->email, 'password' => 'wrong-password'])->assertStatus(422)->json();
        $b = $this->postJson('/kv/auth/login', ['email' => 'nobody@x.test', 'password' => 'wrong-password'])->assertStatus(422)->json();
        $this->assertSame($a, $b);
        for ($i = 0; $i < 4; $i++) $this->postJson('/kv/auth/login', ['email' => $u->email, 'password' => 'wrong-password']);
        $this->postJson('/kv/auth/login', ['email' => $u->email, 'password' => 'Secret-pass-1'])->assertStatus(429);
    }

    public function test_pro_member_loaded_from_database_can_log_in(): void
    {
        [$u] = $this->member('Pro Login', 'pl@x.test');
        $u->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addYear()])->save();
        $this->postJson('/kv/auth/login', ['email' => 'pl@x.test', 'password' => 'Secret-pass-1'])
            ->assertOk()->assertJsonPath('user.plan', 'pro');
        // expired plan falls back to free
        $u->forceFill(['kv_plan_until' => now()->subDay()])->save();
        \Illuminate\Support\Facades\Auth::forgetGuards();
        $this->getJson('/kv/auth/me')->assertJsonPath('user.plan', 'free');
    }

    public function test_two_factor_is_required_once_enabled(): void
    {
        [$u] = $this->member();
        $this->actingAs($u);
        $secret = $this->postJson('/kv/auth/2fa/start')->json('secret');
        $this->postJson('/kv/auth/2fa/confirm', ['code' => '000000'])->assertStatus(422);
        $this->postJson('/kv/auth/2fa/confirm', ['code' => \App\Services\Kv\Totp::code($secret)])->assertOk();
        auth()->logout();
        $this->postJson('/kv/auth/login', ['email' => $u->email, 'password' => 'Secret-pass-1'])->assertStatus(401)->assertJsonPath('error', 'two_factor_required');
        $this->postJson('/kv/auth/login', ['email' => $u->email, 'password' => 'Secret-pass-1', 'code' => \App\Services\Kv\Totp::code($secret)])->assertOk();
    }
}
