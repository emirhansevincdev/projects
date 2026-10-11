<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\CompanyContext;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

/** Changing roles/permissions, disabling, removing and resending; escalation and cross-company attempts. */
class TeamManageTest extends TeamTestCase
{
    // ── roles and permissions ──────────────────────────────────────────────
    public function test_the_owner_changes_a_role_and_the_new_permissions_apply_on_the_very_next_request(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        $this->actingAs($ops)->getJson('/kv/me')->assertJsonPath('user.perms', ['profile', 'docs']);

        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'sales'])->assertOk()
            ->assertJsonPath('member.role', 'sales')->assertJsonPath('member.perms', ['matches', 'messages', 'people'])->assertJsonPath('member.custom', false);
        $this->assertNull($m->fresh()->perms);                                       // a new role starts from its own defaults

        $this->actingAs($ops->fresh())->getJson('/kv/me')->assertJsonPath('user.role', 'sales')->assertJsonPath('user.perms', ['matches', 'messages', 'people']);
    }

    public function test_per_person_permissions_override_the_role_and_null_resets_them(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $m] = $this->mate($c, 'ops');
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['perms' => ['docs', 'analytics', 'docs']])->assertOk()
            ->assertJsonPath('member.perms', ['docs', 'analytics'])->assertJsonPath('member.custom', true)->assertJsonPath('member.role', 'ops');
        $this->assertSame(['docs', 'analytics'], $m->fresh()->perms);

        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['perms' => null])->assertOk()->assertJsonPath('member.custom', false)->assertJsonPath('member.perms', ['profile', 'docs']);
        $this->assertNull($m->fresh()->perms);

        // role + perms together; role change without perms drops a previous override
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'sales', 'perms' => ['messages']])->assertOk()->assertJsonPath('member.perms', ['messages']);
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'ops'])->assertOk()->assertJsonPath('member.custom', false);
        // an empty list is a legitimate "overview only" person
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['perms' => []])->assertOk()->assertJsonPath('member.perms', [])->assertJsonPath('member.custom', true);
        $this->assertSame([], CompanyContext::resolve($m->user)['perms']);
    }

    public function test_update_validates_its_input(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $m] = $this->mate($c, 'ops');
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", [])->assertStatus(422)->assertJsonPath('error', 'validation');
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'owner'])->assertStatus(422)->assertJsonPath('field', 'role');
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['perms' => ['docs', 'sudo']])->assertStatus(422)->assertJsonPath('field', 'perms');
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['perms' => 'docs'])->assertStatus(422)->assertJsonPath('field', 'perms');
        $this->assertSame('ops', $m->fresh()->role);
        $this->assertNull($m->fresh()->perms);
    }

    // ── escalation ─────────────────────────────────────────────────────────
    public function test_nobody_can_change_their_own_role_or_permissions_or_switch_themselves_off(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [$boss, $m] = $this->mate($c, 'admin', ['matches', 'team']);
        $this->actingAs($boss)->patchJson("/kv/team/{$m->id}", ['perms' => ['matches', 'team', 'messages']])->assertForbidden()->assertJsonPath('error', 'self');
        $this->actingAs($boss)->patchJson("/kv/team/{$m->id}", ['role' => 'sales'])->assertForbidden()->assertJsonPath('error', 'self');
        $this->actingAs($boss)->postJson("/kv/team/{$m->id}/disable")->assertForbidden()->assertJsonPath('error', 'self');
        $this->actingAs($boss)->deleteJson("/kv/team/{$m->id}")->assertForbidden()->assertJsonPath('error', 'self');
        $this->assertSame(['matches', 'team'], $m->fresh()->perms);
        $this->assertSame('active', $m->fresh()->status);
    }

    public function test_a_team_admin_cannot_hand_out_permissions_they_lack_or_the_owner_only_ones(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [$boss] = $this->mate($c, 'admin', ['matches', 'messages', 'team', 'billing']);   // even a billing-holding admin may not hand out team/billing
        [, $junior] = $this->mate($c, 'sales', ['matches']);
        $try = fn (array $body, array $denied) => $this->actingAs($boss)->patchJson("/kv/team/{$junior->id}", $body)->assertForbidden()->assertJsonPath('error', 'cannot_grant')->assertJsonPath('perms', $denied);
        $try(['perms' => ['matches', 'team']], ['team']);
        $try(['perms' => ['billing']], ['billing']);
        $try(['perms' => ['analytics']], ['analytics']);                              // not held by the boss
        $try(['role' => 'admin'], ['profile', 'docs', 'people', 'analytics', 'team']);
        $this->assertSame(['matches'], $junior->fresh()->perms);

        $this->actingAs($boss)->patchJson("/kv/team/{$junior->id}", ['perms' => ['matches', 'messages']])->assertOk();
        $this->assertSame(['matches', 'messages'], $junior->fresh()->perms);
    }

    public function test_only_the_owner_manages_people_who_hold_owner_only_permissions(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$boss] = $this->mate($c, 'admin', ['matches', 'messages', 'team']);
        [, $peer] = $this->mate($c, 'admin', ['matches', 'team']);                    // same level as the boss
        [, $billing] = $this->mate($c, 'ops', ['docs', 'billing']);                   // holds billing
        foreach ([$peer, $billing] as $target) {
            $this->actingAs($boss)->patchJson("/kv/team/{$target->id}", ['perms' => []])->assertForbidden()->assertJsonPath('error', 'above_level');
            $this->actingAs($boss)->postJson("/kv/team/{$target->id}/disable")->assertForbidden()->assertJsonPath('error', 'above_level');
            $this->actingAs($boss)->postJson("/kv/team/{$target->id}/resend")->assertForbidden();
            $this->actingAs($boss)->deleteJson("/kv/team/{$target->id}")->assertForbidden()->assertJsonPath('error', 'above_level');
            $this->assertSame('active', $target->fresh()->status);
        }
        $this->actingAs($owner)->postJson("/kv/team/{$peer->id}/disable")->assertOk();      // the owner may
        $this->assertSame('disabled', $peer->fresh()->status);
    }

    public function test_the_owner_cannot_be_reached_through_the_team_routes(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$boss] = $this->mate($c, 'admin', ['matches', 'team']);
        // the owner is not a membership: the list gives the owner row no id and no actions, and an id that is no membership of this company answers 404
        $ownerRow = $this->actingAs($boss)->getJson('/kv/team')->assertOk()->json('owner');
        $this->assertArrayNotHasKey('id', $ownerRow);
        $this->assertArrayNotHasKey('manageable', $ownerRow);
        $ghost = TeamMember::max('id') + 50;
        foreach ([['patch', ['role' => 'ops']], ['post', null, '/disable'], ['post', null, '/enable'], ['post', null, '/resend'], ['delete', null]] as $call) {
            $this->actingAs($boss)->json(strtoupper($call[0]), "/kv/team/{$ghost}".($call[2] ?? ''), $call[1] ?? [])->assertNotFound();
        }
        $this->actingAs($boss)->postJson('/kv/team/invite', ['email' => 'a@acme.test', 'name' => 'Owner Again', 'role' => 'ops'])->assertStatus(422)->assertJsonPath('error', 'email_taken');
        $this->assertSame('a@acme.test', $c->fresh()->user->email);
        $this->assertNotNull(User::find($owner->id));
        $this->assertSame(1, TeamMember::count());
        $this->assertSame(\App\Services\Kv\CompanyContext::PERMS, \App\Services\Kv\CompanyContext::resolve($owner)['perms']);
    }

    public function test_a_sales_or_ops_person_cannot_use_any_team_route(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [$sales] = $this->mate($c, 'sales');
        [$ops, $other] = $this->mate($c, 'ops');
        foreach ([$sales, $ops] as $u) {
            $this->actingAs($u)->getJson('/kv/team')->assertForbidden();
            $this->actingAs($u)->getJson('/kv/activity')->assertForbidden();
            $this->actingAs($u)->postJson('/kv/team/invite', ['email' => 'z@z.test', 'name' => 'Zed', 'role' => 'ops'])->assertForbidden();
            $this->actingAs($u)->patchJson("/kv/team/{$other->id}", ['perms' => ['team']])->assertForbidden();
            $this->actingAs($u)->postJson("/kv/team/{$other->id}/disable")->assertForbidden();
            $this->actingAs($u)->postJson("/kv/team/{$other->id}/enable")->assertForbidden();
            $this->actingAs($u)->postJson("/kv/team/{$other->id}/resend")->assertForbidden();
            $this->actingAs($u)->deleteJson("/kv/team/{$other->id}")->assertForbidden();
        }
        $this->assertSame('active', $other->fresh()->status);
        $this->assertNull($other->fresh()->perms);
    }

    public function test_an_outsider_without_a_company_cannot_use_team_routes(): void
    {
        $this->member('Acme', 'a@acme.test');
        $nobody = new User(['name' => 'N', 'email' => 'n@n.test', 'password' => 'Secret-pass-1']);
        $nobody->role = 2;
        $nobody->save();
        $this->actingAs($nobody)->getJson('/kv/team')->assertForbidden()->assertJsonPath('error', 'no_company');
        $this->actingAs($this->admin())->getJson('/kv/team')->assertForbidden();         // admins have no company either
    }

    // ── IDOR ───────────────────────────────────────────────────────────────
    public function test_members_of_other_companies_are_unreachable_by_id(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$o2, $c2] = $this->otherFirm();
        [$victim, $vm] = $this->mate($c2, 'sales', null, 'active', 'victim@other.test');
        [, $vInvited] = $this->mate($c2, 'ops', null, 'invited', 'pending@other.test');
        [, $mine] = $this->mate($c, 'ops');
        Mail::fake();

        foreach ([$vm, $vInvited] as $t) {
            $this->actingAs($owner)->patchJson("/kv/team/{$t->id}", ['role' => 'admin'])->assertNotFound();
            $this->actingAs($owner)->postJson("/kv/team/{$t->id}/disable")->assertNotFound();
            $this->actingAs($owner)->postJson("/kv/team/{$t->id}/enable")->assertNotFound();
            $this->actingAs($owner)->postJson("/kv/team/{$t->id}/resend")->assertNotFound();
            $this->actingAs($owner)->deleteJson("/kv/team/{$t->id}")->assertNotFound();
        }
        Mail::assertNothingSent();
        $this->assertSame('active', $vm->fresh()->status);
        $this->assertSame('sales', $vm->fresh()->role);
        $this->assertNotNull(TeamMember::find($vInvited->id));
        $this->assertNotNull(User::find($victim->id));

        // the list never contains other firms' people, and ids sent in the body are ignored
        $list = $this->actingAs($owner)->getJson('/kv/team')->assertOk();
        $this->assertSame([$mine->id], collect($list->json('members'))->pluck('id')->all());
        $this->assertStringNotContainsString('victim@other.test', $list->getContent());
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'new@c.test', 'name' => 'New', 'role' => 'ops', 'company_id' => $c2->id, 'company' => $c2->slug])->assertCreated();
        $this->assertSame($c->id, TeamMember::where('email', 'new@c.test')->value('company_id'));
    }

    // ── disable / enable ───────────────────────────────────────────────────
    public function test_a_disabled_person_loses_panel_access_on_the_very_next_request_and_regains_it_when_enabled(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        $this->actingAs($ops)->putJson('/kv/me/company', ['phone' => '+49 7'])->assertOk();

        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/disable")->assertOk()->assertJsonPath('member.status', 'disabled');
        $this->actingAs($ops->fresh())->putJson('/kv/me/company', ['phone' => '+49 8'])->assertNotFound();      // no company context at all any more
        $this->actingAs($ops->fresh())->getJson('/kv/team')->assertForbidden();
        $this->actingAs($ops->fresh())->getJson('/kv/me')->assertOk()->assertJsonPath('user.company', null)->assertJsonPath('user.perms', [])->assertJsonPath('company', null);
        $this->assertSame('+49 7', $c->fresh()->phone);
        $this->assertNull(CompanyContext::resolve($ops->fresh()));
        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/disable")->assertStatus(422)->assertJsonPath('error', 'already_disabled');

        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/enable")->assertOk()->assertJsonPath('member.status', 'active');
        $this->actingAs($ops->fresh())->putJson('/kv/me/company', ['phone' => '+49 9'])->assertOk();
        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/enable")->assertStatus(422)->assertJsonPath('error', 'not_disabled');
    }

    public function test_open_invitations_cannot_be_disabled_only_removed_and_enabling_an_unaccepted_seat_returns_to_invited(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $inv] = $this->mate($c, 'ops', null, 'invited');
        $this->actingAs($owner)->postJson("/kv/team/{$inv->id}/disable")->assertStatus(422)->assertJsonPath('error', 'not_active');
        $inv->forceFill(['status' => 'disabled'])->save();                             // e.g. switched off by support before it was ever accepted
        $this->actingAs($owner)->postJson("/kv/team/{$inv->id}/enable")->assertOk()->assertJsonPath('member.status', 'invited');
    }

    public function test_disabling_closes_all_database_sessions_of_the_person_and_rotates_the_remember_token(): void
    {
        config(['session.driver' => 'database']);
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        $ops->forceFill(['remember_token' => 'old-remember-token'])->save();
        $row = fn ($id, $uid) => ['id' => $id, 'user_id' => $uid, 'ip_address' => '127.0.0.1', 'user_agent' => 'x', 'payload' => '', 'last_activity' => time()];
        DB::table('sessions')->insert([$row('s-ops-1', $ops->id), $row('s-ops-2', $ops->id), $row('s-owner', $owner->id), $row('s-guest', null)]);

        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/disable")->assertOk();
        $this->assertSame(0, DB::table('sessions')->where('user_id', $ops->id)->count());
        $this->assertSame(2, DB::table('sessions')->whereIn('id', ['s-guest', 's-owner'])->count());              // everybody else keeps theirs
        $this->assertNotSame('old-remember-token', $ops->fresh()->remember_token);
    }

    public function test_removing_closes_the_sessions_too(): void
    {
        config(['session.driver' => 'database']);
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        DB::table('sessions')->insert(['id' => 's1', 'user_id' => $ops->id, 'ip_address' => null, 'user_agent' => null, 'payload' => '', 'last_activity' => time()]);
        $this->actingAs($owner)->deleteJson("/kv/team/{$m->id}")->assertOk();
        $this->assertSame(0, DB::table('sessions')->where('user_id', $ops->id)->count());
    }

    // ── remove ─────────────────────────────────────────────────────────────
    public function test_removing_an_active_person_keeps_their_account_but_ends_their_access(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        $this->actingAs($owner)->deleteJson("/kv/team/{$m->id}")->assertOk()->assertJsonPath('account_deleted', false)->assertJsonPath('seats.used', 1);
        $this->assertNull(TeamMember::find($m->id));
        $this->assertNotNull(User::find($ops->id));
        $this->assertNull(CompanyContext::resolve($ops->fresh()));
        $this->actingAs($ops->fresh())->putJson('/kv/me/company', ['phone' => '1'])->assertNotFound();
        $this->actingAs($ops->fresh())->getJson('/kv/team')->assertForbidden();
    }

    public function test_removing_an_invitation_nobody_opened_deletes_the_account_that_was_created_for_it(): void
    {
        [$owner] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'ghost@c.test', 'name' => 'Ghost', 'role' => 'ops'])->assertCreated();
        $id = TeamMember::value('id');
        $uid = TeamMember::value('user_id');
        $this->assertDatabaseHas('password_reset_tokens', ['email' => 'ghost@c.test']);
        $this->actingAs($owner)->deleteJson("/kv/team/{$id}")->assertOk()->assertJsonPath('account_deleted', true);
        $this->assertNull(User::find($uid));
        $this->assertDatabaseMissing('password_reset_tokens', ['email' => 'ghost@c.test']);
        // the address is free again
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'ghost@c.test', 'name' => 'Ghost', 'role' => 'ops'])->assertCreated();
    }

    public function test_an_account_that_has_signed_in_before_survives_the_removal_of_its_invitation(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$u, $m] = $this->mate($c, 'ops', null, 'invited');
        $u->forceFill(['email_verified_at' => now()])->save();                        // e.g. verified through a social sign-in
        $this->actingAs($owner)->deleteJson("/kv/team/{$m->id}")->assertOk()->assertJsonPath('account_deleted', false);
        $this->assertNotNull(User::find($u->id));
    }

    // ── resend ─────────────────────────────────────────────────────────────
    public function test_resending_issues_a_fresh_link_and_invalidates_the_old_one(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'late@c.test', 'name' => 'Late', 'role' => 'sales'])->assertCreated();
        $m = TeamMember::firstOrFail();
        $user = User::findOrFail($m->user_id);
        $first = null;
        Mail::assertSent(KvMail::class, function (KvMail $k) use (&$first) { $first = $this->linkOf($k->data)[0]; return true; });
        $m->forceFill(['invited_at' => now()->subHours(30)])->save();

        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/resend")->assertOk()->assertJsonPath('mail_sent', true)->assertJsonPath('member.invite_expired', false);
        $second = null;
        Mail::assertSent(KvMail::class, function (KvMail $k) use (&$second, $first) { $t = $this->linkOf($k->data)[0]; if ($t !== $first) { $second = $t; } return true; });
        Mail::assertSentCount(2);
        $this->assertNotNull($second);
        $this->assertFalse(Password::broker()->tokenExists($user, $first));
        $this->assertTrue(Password::broker()->tokenExists($user, $second));
        $this->assertTrue($m->fresh()->invited_at->isAfter(now()->subMinute()));
    }

    public function test_resend_is_limited_per_person_and_only_for_open_invitations(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $inv] = $this->mate($c, 'ops', null, 'invited');
        [, $active] = $this->mate($c, 'sales');
        Mail::fake();
        $this->actingAs($owner)->postJson("/kv/team/{$inv->id}/resend")->assertOk();
        $this->actingAs($owner)->postJson("/kv/team/{$inv->id}/resend")->assertStatus(429)->assertJsonPath('error', 'too_soon');
        $this->actingAs($owner)->postJson("/kv/team/{$active->id}/resend")->assertStatus(422)->assertJsonPath('error', 'not_invited');
        Mail::assertSentCount(1);
    }

    // ── /kv/me for every role ──────────────────────────────────────────────
    public function test_me_reports_role_and_effective_permissions_for_each_role(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($owner)->getJson('/kv/me')->assertJsonPath('user.role', 'owner')->assertJsonPath('user.perms', CompanyContext::PERMS);
        $expect = [
            'admin' => ['matches', 'profile', 'docs', 'messages', 'people', 'analytics', 'team'],
            'sales' => ['matches', 'messages', 'people'],
            'ops' => ['profile', 'docs'],
        ];
        foreach ($expect as $role => $perms) {
            [$u] = $this->mate($c, $role);
            $this->actingAs($u)->getJson('/kv/me')->assertJsonPath('user.role', $role)->assertJsonPath('user.perms', $perms)->assertJsonPath('user.company', $c->slug);
        }
        [$custom] = $this->mate($c, 'sales', ['analytics', 'billing', 'bogus']);
        $this->actingAs($custom)->getJson('/kv/me')->assertJsonPath('user.perms', ['analytics', 'billing']);
    }

    public function test_team_members_never_get_owner_only_actions(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [$admin] = $this->mate($c, 'admin');                                           // even the broadest role
        $this->actingAs($admin)->deleteJson('/kv/me', ['password' => 'Secret-pass-1'])->assertForbidden()->assertJsonPath('error', 'owner_only');
        $this->actingAs($admin)->get('/kv/me/export')->assertForbidden();
        $this->actingAs($admin)->postJson('/kv/me/consents', ['type' => 'marketing', 'granted' => true])->assertForbidden();
        $this->assertNotNull(Company::find($c->id));
    }
}
