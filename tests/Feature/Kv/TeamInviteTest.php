<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class TeamInviteTest extends TeamTestCase
{
    private function body(array $over = []): array
    {
        return $over + ['email' => 'Ayse.Kaya@Acme-Colleague.test', 'name' => 'Ayşe Kaya', 'role' => 'ops'];
    }

    public function test_the_owner_invites_a_colleague_who_gets_a_pending_account_and_the_password_setup_mail(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$res, $mail] = $this->invite($owner, $this->body());

        $res->assertCreated()->assertJsonPath('ok', true)->assertJsonPath('mail_sent', true)
            ->assertJsonPath('member.email', 'ayse.kaya@acme-colleague.test')       // stored lower-case
            ->assertJsonPath('member.role', 'ops')->assertJsonPath('member.status', 'invited')
            ->assertJsonPath('member.perms', ['profile', 'docs'])->assertJsonPath('member.custom', false)
            ->assertJsonPath('seats.used', 2)->assertJsonPath('seats.max', 10);

        $m = TeamMember::firstOrFail();
        $this->assertSame($c->id, $m->company_id);
        $this->assertSame('invited', $m->status);
        $this->assertNull($m->accepted_at);
        $this->assertNull($m->perms);                                                // role defaults, no override
        $this->assertSame($owner->id, $m->invited_by);
        $this->assertNotNull($m->invited_at);

        $u = User::findOrFail($m->user_id);
        $this->assertSame(2, (int) $u->role);
        $this->assertNull($u->email_verified_at);                                    // unverified until the password is set
        $this->assertSame('Ayşe Kaya', $u->name);
        $this->assertNull(\App\Services\Kv\CompanyContext::resolve($u));             // an open invitation gives no panel access

        // the mail: right template, right recipient, a real password-broker link for THIS account, nothing else
        $this->assertSame('team_invite', $mail['template']);
        $this->assertStringContainsString('Acme', $mail['subject']);
        [$token, $email] = $this->linkOf($mail);
        $this->assertSame('ayse.kaya@acme-colleague.test', $email);
        $this->assertTrue(Password::broker()->tokenExists($u, $token));
        $this->assertStringStartsWith(url('/set-password?token='), $mail['url']);
        $this->assertSame(24, $mail['hours']);
        Mail::assertSent(KvMail::class, fn (KvMail $k) => $k->hasTo('ayse.kaya@acme-colleague.test'));
    }

    public function test_the_invitation_mail_renders_with_company_inviter_role_and_link(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        [, $mail] = $this->invite($owner, $this->body(['role' => 'sales']));
        $html = view('kervea.mail.team_invite', $mail)->render();
        $this->assertStringContainsString('Acme', $html);
        $this->assertStringContainsString('Satış', $html);
        $this->assertStringContainsString('Ayşe Kaya', $html);
        $this->assertStringContainsString('24 saat', $html);
        $this->assertStringContainsString(htmlspecialchars($mail['url'], ENT_QUOTES), $html);
    }

    public function test_invitation_links_and_tokens_never_reach_the_log(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Log::spy();
        [, $mail] = $this->invite($owner, $this->body());
        [$token] = $this->linkOf($mail);
        Log::shouldNotHaveReceived('warning');
        Log::shouldNotHaveReceived('info');
        // and a failing mail transport reports the member only, never the link
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('smtp down'));
        $res = $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'b@colleague.test']));
        $res->assertCreated()->assertJsonPath('mail_sent', false);
        Log::shouldHaveReceived('warning')->withArgs(function ($message, $ctx = []) use ($token) {
            return $message === 'kv: team invite mail failed' && ! str_contains(json_encode($ctx), 'token') && ! str_contains(json_encode($ctx), $token);
        })->once();
    }

    public function test_an_explicit_permission_list_is_stored_only_when_it_differs_from_the_role_defaults(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'x1@c.test', 'role' => 'ops', 'perms' => ['docs', 'profile']]))->assertCreated()
            ->assertJsonPath('member.custom', false);                                // same set as the defaults → stays "role defaults"
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'x2@c.test', 'role' => 'ops', 'perms' => ['docs', 'analytics']]))->assertCreated()
            ->assertJsonPath('member.custom', true)->assertJsonPath('member.perms', ['docs', 'analytics']);
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'x3@c.test', 'role' => 'sales', 'perms' => []]))->assertCreated()
            ->assertJsonPath('member.perms', [])->assertJsonPath('member.custom', true);
        $this->assertNull(TeamMember::where('email', 'x1@c.test')->value('perms'));
        $this->assertSame(['docs', 'analytics'], TeamMember::where('email', 'x2@c.test')->first()->perms);
    }

    public function test_addresses_that_already_have_an_account_cannot_be_invited(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $admin = $this->admin();
        [, $other] = $this->member('Beta', 'b@beta.test');
        [$mate] = $this->mate($c, 'sales', null, 'active', 'sales@team.test');
        $plain = new User(['name' => 'Plain', 'email' => 'plain@x.test', 'password' => 'Secret-pass-1']);
        $plain->role = 2;
        $plain->save();
        Mail::fake();

        foreach (['a@acme.test' => 'the owner', 'ADMIN@kervea.test' => 'an admin', 'b@beta.test' => 'a member of another firm', 'sales@team.test' => 'an existing team member', 'plain@x.test' => 'an account without a company'] as $email => $who) {
            $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => $email]))
                ->assertStatus(422)->assertJsonPath('error', 'email_taken');
        }
        Mail::assertNothingSent();
        $this->assertSame(1, TeamMember::count());                                   // only the fixture mate
        $this->assertSame(5, User::count());                                         // no account was created by the refusals
    }

    public function test_company_contact_addresses_cannot_be_invited_either(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        [, $pending] = $this->member('Pending', 'p@pending.test', ['rep_email' => 'boss@pending.test']);
        $pending->forceFill(['status' => 'pending'])->save();
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'rep-only@x.test']))->assertCreated();   // unknown address is fine
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'boss@pending.test']))->assertStatus(422)->assertJsonPath('error', 'email_taken');
    }

    public function test_the_same_address_cannot_be_invited_twice(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body())->assertCreated();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'AYSE.KAYA@acme-colleague.test']))->assertStatus(422)->assertJsonPath('error', 'email_taken');
        $this->assertSame(1, TeamMember::count());
        Mail::assertSentCount(1);
    }

    public function test_input_is_validated(): void
    {
        $this->withoutMiddleware(\Illuminate\Routing\Middleware\ThrottleRequests::class);       // 13 refusals in a row would trip the real limiter
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $cases = [
            ['email', ['email' => 'not-an-email']],
            ['email', ['email' => str_repeat('a', 250).'@x.test']],
            ['email', ['email' => ['x@y.test']]],
            ['name', ['name' => '']],
            ['name', ['name' => 'A']],
            ['name', ['name' => str_repeat('n', 121)]],
            ['name', ['name' => '<b></b> ']],                                        // nothing left after stripping tags
            ['role', ['role' => 'owner']],                                           // the owner is not a role
            ['role', ['role' => 'superuser']],
            ['role', ['role' => null]],
            ['perms', ['perms' => ['docs', 'root']]],
            ['perms', ['perms' => 'docs']],
            ['perms', ['perms' => [['docs']]]],
        ];
        foreach ($cases as [$field, $over]) {
            $res = $this->actingAs($owner)->postJson('/kv/team/invite', $this->body($over));
            $res->assertStatus(422)->assertJsonPath('error', 'validation')->assertJsonPath('field', $field);
        }
        Mail::assertNothingSent();
        $this->assertSame(0, TeamMember::count());
    }

    public function test_names_are_stored_without_markup(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['name' => "  <script>alert(1)</script>Mehmet   Kara  "]))->assertCreated();
        $this->assertSame('alert(1)Mehmet Kara', TeamMember::first()->name);
    }

    public function test_the_seat_limit_includes_the_owner_and_every_open_or_disabled_seat(): void
    {
        config(['kervea.team.max_members' => 3]);
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'one@c.test']))->assertCreated()->assertJsonPath('seats.free', 1);
        $this->mate($c, 'sales', null, 'disabled');                                  // a disabled person still holds a seat
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'two@c.test']))
            ->assertStatus(422)->assertJsonPath('error', 'seats_full')->assertJsonPath('max', 3);
        $this->assertSame(0, User::where('email', 'two@c.test')->count());
        // freeing a seat makes room again
        $this->actingAs($owner)->deleteJson('/kv/team/'.TeamMember::where('email', 'one@c.test')->value('id'))->assertOk();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'two@c.test']))->assertCreated();
        // another firm has its own seats
        [$o2] = $this->member('Beta', 'b@beta.test');
        $this->actingAs($o2)->postJson('/kv/team/invite', $this->body(['email' => 'three@c.test']))->assertCreated()->assertJsonPath('seats.used', 2);
    }

    public function test_only_people_with_the_team_permission_can_invite(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->postJson('/kv/team/invite', $this->body())->assertUnauthorized();
        foreach (['sales', 'ops'] as $role) {
            [$u] = $this->mate($c, $role);
            $this->actingAs($u)->postJson('/kv/team/invite', $this->body(['email' => "$role@new.test"]))->assertForbidden()->assertJsonPath('need', 'team');
        }
        [$disabled] = $this->mate($c, 'admin', null, 'disabled');
        $this->actingAs($disabled)->postJson('/kv/team/invite', $this->body())->assertForbidden();
        $this->assertSame(0, TeamMember::whereIn('email', ['sales@new.test', 'ops@new.test'])->count());
        Mail::assertNothingSent();
    }

    public function test_a_suspended_company_cannot_manage_its_team(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $c->forceFill(['status' => 'suspended'])->save();
        $this->actingAs($owner)->getJson('/kv/team')->assertForbidden();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body())->assertForbidden();
    }

    public function test_nobody_can_invite_somebody_with_permissions_they_do_not_hold_or_may_not_hand_out(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        // a "team admin" without the owner's blessing for billing: holds team, may NOT grant team or billing
        [$boss] = $this->mate($c, 'admin', ['matches', 'messages', 'team', 'profile']);
        Mail::fake();
        $deny = function (array $over, array $perms) use ($boss) {
            $this->actingAs($boss)->postJson('/kv/team/invite', $this->body($over))->assertForbidden()->assertJsonPath('error', 'cannot_grant')->assertJsonPath('perms', $perms);
        };
        $deny(['email' => 'e1@c.test', 'role' => 'admin'], ['docs', 'people', 'analytics', 'team']);   // role defaults contain team + things the boss lacks
        $deny(['email' => 'e2@c.test', 'role' => 'sales', 'perms' => ['messages', 'billing']], ['billing']);
        $deny(['email' => 'e3@c.test', 'role' => 'ops', 'perms' => ['team']], ['team']);                  // holds it, but only the owner may hand it out
        $deny(['email' => 'e4@c.test', 'role' => 'ops', 'perms' => ['analytics']], ['analytics']);        // does not hold it
        $deny(['email' => 'e5@c.test', 'role' => 'sales'], ['people']);                                    // sales defaults include people, boss has no people
        $this->assertSame(1, TeamMember::count());
        Mail::assertNothingSent();

        // what the boss holds and may hand out works
        $this->actingAs($boss)->postJson('/kv/team/invite', $this->body(['email' => 'ok@c.test', 'role' => 'ops', 'perms' => ['profile', 'messages']]))->assertCreated();
    }

    public function test_the_owner_can_grant_everything_including_billing_and_team(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['role' => 'admin', 'perms' => ['team', 'billing', 'matches']]))->assertCreated()
            ->assertJsonPath('member.perms', ['matches', 'team', 'billing']);
    }

    public function test_invitation_mails_per_company_and_day_are_capped(): void
    {
        config(['kervea.team.invites_per_day' => 2, 'kervea.team.max_members' => 50]);
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'm1@c.test']))->assertCreated();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'm2@c.test']))->assertCreated();
        $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => 'm3@c.test']))->assertStatus(429)->assertJsonPath('error', 'mail_limit');
        $this->assertSame(0, User::where('email', 'm3@c.test')->count());
        Mail::assertSentCount(2);
    }

    public function test_the_invite_endpoint_is_throttled(): void
    {
        config(['kervea.team.max_members' => 50, 'kervea.team.invites_per_day' => 500]);
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $last = null;
        for ($i = 0; $i < 12; $i++) {
            $last = $this->actingAs($owner)->postJson('/kv/team/invite', $this->body(['email' => "t$i@c.test"]));
        }
        $last->assertStatus(429);                                                    // 10 per 10 minutes
    }

    public function test_the_team_list_shows_the_owner_first_with_role_and_permission_catalogues(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $this->mate($c, 'sales', null, 'active', 's@team.test', 'Selin');
        $this->mate($c, 'ops', null, 'invited', 'o@team.test', 'Orhan');
        $res = $this->actingAs($owner)->getJson('/kv/team')->assertOk();
        $res->assertJsonPath('owner.email', 'a@acme.test')->assertJsonPath('owner.role', 'owner')->assertJsonPath('owner.you', true)
            ->assertJsonPath('company.name', 'Acme')->assertJsonPath('viewer.is_owner', true)
            ->assertJsonPath('seats.used', 3)->assertJsonPath('seats.free', 7)
            ->assertJsonPath('members.0.name', 'Selin')->assertJsonPath('members.0.status', 'active')->assertJsonPath('members.0.manageable', true)
            ->assertJsonPath('members.1.status', 'invited')->assertJsonPath('members.1.invite_expired', false)
            ->assertJsonPath('roles.0.key', 'admin')->assertJsonPath('roles.1.perms', ['matches', 'messages', 'people'])
            ->assertJsonPath('link_hours', 24);
        $this->assertCount(8, $res->json('perms'));
        $this->assertSame(['team', 'billing'], collect($res->json('perms'))->where('owner_only', true)->pluck('key')->values()->all());
        $this->assertStringNotContainsString('invite_token_hash', $res->getContent());
        $this->assertStringNotContainsString('password', $res->getContent());
        $this->assertStringNotContainsString('$2y$', $res->getContent());
    }

    public function test_an_invitation_is_marked_expired_once_its_link_cannot_work_any_more(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $m] = $this->mate($c, 'ops', null, 'invited');
        $m->forceFill(['invited_at' => now()->subHours(25)])->save();
        $this->actingAs($owner)->getJson('/kv/team')->assertJsonPath('members.0.invite_expired', true);
    }

    public function test_a_team_admin_sees_the_owner_and_only_what_they_can_manage(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$boss] = $this->mate($c, 'admin', ['matches', 'messages', 'team'], 'active', 'boss@team.test');
        [, $peer] = $this->mate($c, 'admin', ['matches', 'team'], 'active', 'peer@team.test');
        [, $junior] = $this->mate($c, 'sales', ['matches'], 'active', 'junior@team.test');
        $res = $this->actingAs($boss)->getJson('/kv/team')->assertOk();
        $res->assertJsonPath('owner.email', 'a@acme.test')->assertJsonPath('owner.you', false)->assertJsonPath('viewer.is_owner', false)
            ->assertJsonPath('viewer.grantable', ['matches', 'messages']);
        $byEmail = collect($res->json('members'))->keyBy('email');
        $this->assertTrue($byEmail['boss@team.test']['you']);
        $this->assertFalse($byEmail['boss@team.test']['manageable']);                // never yourself
        $this->assertFalse($byEmail['peer@team.test']['manageable']);                // holds "team": above a non-owner
        $this->assertTrue($byEmail['junior@team.test']['manageable']);
    }
}
