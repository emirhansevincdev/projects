<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\ActivityEntry;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\CompanyContext;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

/** The invitation round trip: link in the mail -> password -> active membership -> sign in with the role's permissions. */
class TeamAcceptTest extends TeamTestCase
{
    private function setPw(string $token, string $email, string $pw = 'New-Pass-12345')
    {
        return $this->postJson('/kv/auth/set-password', ['email' => $email, 'token' => $token, 'password' => $pw, 'password_confirmation' => $pw]);
    }

    public function test_choosing_a_password_through_the_link_activates_the_invitation_and_the_person_can_sign_in(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $mail] = $this->invite($owner, ['email' => 'ops@colleague.test', 'name' => 'Orhan Ops', 'role' => 'ops']);
        [$token, $email] = $this->linkOf($mail);
        $m = TeamMember::firstOrFail();
        $this->assertSame('invited', $m->status);

        // until then: no sign-in, no access
        $this->postJson('/kv/auth/login', ['email' => $email, 'password' => 'whatever-12345'])->assertStatus(422);
        $this->assertNull(CompanyContext::resolve(User::find($m->user_id)));

        $this->setPw($token, $email)->assertOk();
        $m->refresh();
        $this->assertSame('active', $m->status);
        $this->assertNotNull($m->accepted_at);
        $this->assertNotNull(User::find($m->user_id)->email_verified_at);             // the mailbox is proven

        $this->postJson('/kv/auth/login', ['email' => $email, 'password' => 'New-Pass-12345'])->assertOk()
            ->assertJsonPath('user.role', 'ops')->assertJsonPath('user.perms', ['profile', 'docs'])->assertJsonPath('user.company', $c->slug);
        $this->getJson('/kv/me')->assertOk()->assertJsonPath('user.role', 'ops');
        $this->getJson('/kv/team')->assertForbidden();
        $this->getJson('/kv/activity')->assertForbidden();

        // the owner now sees the person as active, with a first sign-in time
        $this->app['auth']->forgetGuards();
        $row = collect($this->actingAs($owner)->getJson('/kv/team')->json('members'))->firstWhere('email', 'ops@colleague.test');
        $this->assertSame('active', $row['status']);
        $this->assertNotNull($row['accepted_at']);
        $this->assertNotNull($row['last_login_at']);
    }

    public function test_a_wrong_or_replayed_link_changes_nothing(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        [, $mail] = $this->invite($owner, ['email' => 'ops@colleague.test', 'name' => 'Orhan Ops', 'role' => 'ops']);
        [$token, $email] = $this->linkOf($mail);
        $m = TeamMember::firstOrFail();

        $this->setPw('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', $email)->assertStatus(422)->assertJsonPath('error', 'invalid_token');
        $this->setPw($token, 'someone-else@colleague.test')->assertStatus(422);
        $this->setPw($token, $email, 'weak')->assertStatus(422);                                   // password rules still apply
        $this->assertSame('invited', $m->fresh()->status);

        $this->setPw($token, $email)->assertOk();
        $this->setPw($token, $email, 'Another-Pass-9999')->assertStatus(422);                     // a used link is dead
        $this->assertSame('active', $m->fresh()->status);
    }

    public function test_an_expired_link_does_not_activate_and_resending_fixes_it(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $mail] = $this->invite($owner, ['email' => 'late@colleague.test', 'name' => 'Late One', 'role' => 'sales']);
        [$token, $email] = $this->linkOf($mail);
        $this->travel(25)->hours();
        $this->setPw($token, $email)->assertStatus(422);
        $m = TeamMember::firstOrFail();
        $this->assertSame('invited', $m->status);
        $this->actingAs($owner)->getJson('/kv/team')->assertJsonPath('members.0.invite_expired', true);

        $res = $this->actingAs($owner)->postJson("/kv/team/{$m->id}/resend")->assertOk()->assertJsonPath('mail_sent', true);
        $fresh = null;
        Mail::assertSent(\App\Mail\Kv\KvMail::class, function ($k) use (&$fresh, $token) { $t = $this->linkOf($k->data)[0]; if ($t !== $token) { $fresh = $t; } return true; });
        $this->app['auth']->forgetGuards();
        $this->setPw($fresh, $email)->assertOk();
        $this->assertSame('active', $m->fresh()->status);
    }

    public function test_the_forgot_password_mail_also_opens_an_invitation_because_it_proves_the_mailbox_too(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$u, $m] = $this->mate($c, 'sales', null, 'invited', 'late@colleague.test');
        $u->forceFill(['email_verified_at' => null])->save();
        $token = Password::broker()->createToken($u);
        $this->setPw($token, 'late@colleague.test')->assertOk();
        $this->assertSame('active', $m->fresh()->status);
    }

    public function test_setting_a_password_never_revives_a_disabled_or_removed_person_nor_touches_other_companies(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$disabled, $dm] = $this->mate($c, 'ops', null, 'disabled', 'dis@c.test');
        [$active, $am] = $this->mate($c, 'sales', null, 'active', 'act@c.test');
        [, $c2] = $this->otherFirm();
        [$u2, $m2] = $this->mate($c2, 'ops', null, 'invited', 'inv2@c.test');
        $before = $am->fresh()->accepted_at;

        // a plain password reset by a disabled person: still disabled
        $this->setPw(Password::broker()->createToken($disabled), 'dis@c.test')->assertOk();
        $this->assertSame('disabled', $dm->fresh()->status);
        // an active person resetting the password keeps their accepted_at
        $this->setPw(Password::broker()->createToken($active), 'act@c.test')->assertOk();
        $this->assertEquals($before, $am->fresh()->accepted_at);
        // somebody else's open invitation is not affected by all this
        $this->assertSame('invited', $m2->fresh()->status);
    }

    public function test_an_invited_person_is_not_a_member_until_the_password_is_set_and_a_removed_invitation_cannot_be_used(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        [, $mail] = $this->invite($owner, ['email' => 'gone@colleague.test', 'name' => 'Gone Soon', 'role' => 'ops']);
        [$token, $email] = $this->linkOf($mail);
        $m = TeamMember::firstOrFail();
        $this->actingAs($owner)->deleteJson("/kv/team/{$m->id}")->assertOk();
        $this->app['auth']->forgetGuards();
        $this->setPw($token, $email)->assertStatus(422);                               // account and token are gone
        $this->assertSame(0, User::where('email', $email)->count());
    }

    public function test_panel_sign_ins_are_logged_for_the_company_but_admin_sign_ins_are_not(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops] = $this->mate($c, 'ops', null, 'active', 'ops@c.test');
        $admin = $this->admin();
        $this->postJson('/kv/auth/login', ['email' => 'a@acme.test', 'password' => 'Secret-pass-1'])->assertOk();
        $this->app['auth']->forgetGuards();
        $this->postJson('/kv/auth/login', ['email' => 'ops@c.test', 'password' => 'Secret-pass-1'])->assertOk();
        $this->app['auth']->forgetGuards();
        $this->postJson('/kv/auth/login', ['email' => 'admin@kervea.test', 'password' => 'Secret-pass-1'])->assertOk();
        $this->postJson('/kv/auth/login', ['email' => 'ops@c.test', 'password' => 'wrong-password-1'])->assertStatus(422);

        $rows = ActivityEntry::where('action', 'auth.login')->orderBy('id')->get();
        $this->assertCount(2, $rows);
        $this->assertSame([$owner->id, $ops->id], $rows->pluck('user_id')->all());
        $this->assertSame([$c->id, $c->id], $rows->pluck('company_id')->all());
        $this->assertSame(['owner', 'ops'], $rows->pluck('meta.role')->all());
    }
}
