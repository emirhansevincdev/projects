<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\ActivityEntry;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\Activity;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ActivityTest extends TeamTestCase
{
    // ── the service ────────────────────────────────────────────────────────
    public function test_log_stores_the_entry_with_cleaned_metadata_and_the_request_ip(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        Activity::log($c->id, $owner->id, 'credits.purchase', [
            'credits' => 100, 'note' => str_repeat('x', 500), 'nested' => ['a' => 1, 'deep' => ['b' => ['c' => 1]]],
            'obj' => new \stdClass, 'bad key!' => 'ok', 'flag' => true, 'nothing' => null,
        ]);
        $e = ActivityEntry::firstOrFail();
        $this->assertSame($c->id, $e->company_id);
        $this->assertSame($owner->id, $e->user_id);
        $this->assertSame('credits.purchase', $e->action);
        $this->assertSame(100, $e->meta['credits']);
        $this->assertSame(160, mb_strlen($e->meta['note']));                          // strings are cut
        $this->assertArrayNotHasKey('obj', $e->meta);                                 // objects are dropped
        $this->assertSame('ok', $e->meta['badkey']);                                  // key characters are restricted
        $this->assertTrue($e->meta['flag']);
        $this->assertArrayNotHasKey('b', $e->meta['nested']['deep'] ?? []);           // only shallow lists
        $this->assertNotNull($e->created_at);
        $this->assertArrayNotHasKey('ip', $e->toArray());                             // never serialised by accident
    }

    public function test_log_accepts_system_events_without_company_or_person_and_ignores_empty_actions(): void
    {
        Activity::log(null, null, 'credits.grant');
        Activity::log(null, null, '!!!');
        Activity::log(null, null, str_repeat('a', 80));
        $this->assertSame(2, ActivityEntry::count());
        $this->assertSame(40, strlen(ActivityEntry::orderByDesc('id')->value('action')));
        $this->assertNull(ActivityEntry::first()->meta);
    }

    public function test_a_failing_log_call_never_breaks_the_caller_and_reports_only_the_action(): void
    {
        Log::spy();
        Activity::log(987654, null, 'team.invite', ['secret' => 'hunter2']);          // unknown company → foreign key violation
        $this->assertSame(0, ActivityEntry::count());
        Log::shouldHaveReceived('warning')->withArgs(fn ($m, $ctx = []) => $m === 'kv: activity log failed' && ! str_contains(json_encode($ctx), 'hunter2'))->once();
    }

    public function test_rows_disappear_with_their_company_and_keep_the_entry_when_a_person_is_deleted(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$u] = $this->mate($c, 'ops');
        Activity::log($c->id, $u->id, 'doc.upload');
        $u->delete();
        $this->assertNull(ActivityEntry::first()->user_id);
        $c->delete();
        $this->assertSame(0, ActivityEntry::count());
    }

    public function test_the_prune_command_removes_only_old_entries(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        Activity::log($c->id, $owner->id, 'auth.login');
        Activity::log($c->id, $owner->id, 'auth.login');
        ActivityEntry::orderBy('id')->first()->forceFill(['created_at' => now()->subDays(401)])->save();
        $this->artisan('kervea:prune-activity')->expectsOutputToContain('1 aktivite kaydı silindi')->assertSuccessful();
        $this->assertSame(1, ActivityEntry::count());
        $this->artisan('kervea:prune-activity', ['--days' => 0])->assertSuccessful();     // never prunes "everything older than now" by accident
        $this->assertSame(1, ActivityEntry::count());
    }

    // ── what gets logged ───────────────────────────────────────────────────
    public function test_every_team_action_is_logged_against_the_company_and_the_acting_person(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        Mail::fake();
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'new@c.test', 'name' => 'Nora New', 'role' => 'sales'])->assertCreated();
        $m = TeamMember::firstOrFail();
        $m->forceFill(['status' => 'active', 'accepted_at' => now()])->save();
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'ops'])->assertOk();
        $this->actingAs($owner)->patchJson("/kv/team/{$m->id}", ['role' => 'ops'])->assertOk();                  // no change → no entry
        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/disable")->assertOk();
        $this->actingAs($owner)->postJson("/kv/team/{$m->id}/enable")->assertOk();
        $this->actingAs($owner)->deleteJson("/kv/team/{$m->id}")->assertOk();

        $rows = ActivityEntry::orderBy('id')->get();
        $this->assertSame(['team.invite', 'team.update', 'team.disable', 'team.enable', 'team.remove'], $rows->pluck('action')->all());
        $this->assertSame([$c->id], $rows->pluck('company_id')->unique()->values()->all());
        $this->assertSame([$owner->id], $rows->pluck('user_id')->unique()->values()->all());
        $this->assertSame('Nora New', $rows[0]->meta['name']);
        $this->assertSame('ops', $rows[1]->meta['role']);
        $this->assertSame('sales', $rows[1]->meta['from_role']);
        $this->assertStringNotContainsString('new@c.test', json_encode($rows->pluck('meta')));          // no e-mail addresses in the log
        $this->assertStringNotContainsString('token', json_encode($rows->pluck('meta')));
    }

    public function test_refused_team_actions_leave_no_entry(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$sales] = $this->mate($c, 'sales');
        $this->actingAs($sales)->postJson('/kv/team/invite', ['email' => 'x@c.test', 'name' => 'Xan', 'role' => 'ops'])->assertForbidden();
        $this->actingAs($owner)->postJson('/kv/team/invite', ['email' => 'a@acme.test', 'name' => 'Dup', 'role' => 'ops'])->assertStatus(422);
        $this->assertSame(0, ActivityEntry::count());
    }

    public function test_profile_consent_and_document_changes_are_logged(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $this->actingAs($owner)->putJson('/kv/me/company', ['phone' => '+49 55', 'website' => 'https://acme.test'])->assertOk();
        $this->actingAs($owner)->postJson('/kv/me/consents', ['type' => 'marketing', 'granted' => true])->assertOk();
        $this->actingAs($owner)->post('/kv/me/documents', ['documents' => [UploadedFile::fake()->createWithContent('a.pdf', "%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF")]], ['Accept' => 'application/json'])->assertOk();

        $rows = ActivityEntry::orderBy('id')->get()->keyBy('action');
        $this->assertSame(['profile.update', 'consent.change', 'doc.upload'], $rows->keys()->all());
        $this->assertEqualsCanonicalizing(['phone', 'website'], $rows['profile.update']->meta['fields']);
        $this->assertSame(['type' => 'marketing', 'granted' => true], $rows['consent.change']->meta);
        $this->assertSame(1, $rows['doc.upload']->meta['count']);
        $this->assertSame($c->id, $rows['doc.upload']->company_id);
    }

    public function test_a_team_member_edit_is_logged_under_the_members_name(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops] = $this->mate($c, 'ops', null, 'active', 'ops@c.test', 'Orhan Ops');
        $this->actingAs($ops)->putJson('/kv/me/company', ['phone' => '+49 1'])->assertOk();
        $this->assertSame($ops->id, ActivityEntry::firstOrFail()->user_id);
        $this->assertSame($c->id, ActivityEntry::firstOrFail()->company_id);
    }

    // ── GET /kv/activity ───────────────────────────────────────────────────
    public function test_the_activity_list_is_scoped_to_the_company_and_needs_the_team_permission(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$o2, $c2] = $this->otherFirm();
        [$boss] = $this->mate($c, 'admin', null, 'active', 'boss@c.test', 'Bora Boss');
        [$sales] = $this->mate($c, 'sales');
        Activity::log($c->id, $owner->id, 'profile.update', ['fields' => ['phone']]);
        Activity::log($c2->id, $o2->id, 'profile.update', ['fields' => ['secret-of-the-other-firm']]);
        Activity::log($c->id, $boss->id, 'doc.upload', ['count' => 2]);

        $res = $this->actingAs($boss)->getJson('/kv/activity')->assertOk();
        $items = $res->json('items');
        $this->assertSame(['doc.upload', 'profile.update'], array_column($items, 'action'));      // newest first
        $this->assertSame('Bora Boss', $items[0]['by']);
        $this->assertTrue($items[0]['you']);
        $this->assertFalse($items[1]['you']);
        $this->assertSame('Acme', $c->name);
        $this->assertStringNotContainsString('secret-of-the-other-firm', $res->getContent());
        $this->assertStringNotContainsString('127.0.0.1', $res->getContent());                    // no IP addresses
        $this->assertStringNotContainsString('@', $res->getContent());                            // no e-mail addresses
        $this->assertArrayNotHasKey('user_id', $items[0]);

        $this->actingAs($owner)->getJson('/kv/activity')->assertOk()->assertJsonCount(2, 'items');
        $this->actingAs($sales)->getJson('/kv/activity')->assertForbidden()->assertJsonPath('need', 'team');
        $this->actingAs($o2)->getJson('/kv/activity')->assertOk()->assertJsonCount(1, 'items');
        $this->app['auth']->forgetGuards();
        $this->getJson('/kv/activity')->assertUnauthorized();
    }

    public function test_the_list_returns_at_most_the_configured_number_of_newest_entries(): void
    {
        config(['kervea.team.activity_limit' => 5]);
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        foreach (range(1, 9) as $i) {
            Activity::log($c->id, $owner->id, 'doc.upload', ['count' => $i]);
        }
        $res = $this->actingAs($owner)->getJson('/kv/activity')->assertOk();
        $this->assertSame([9, 8, 7, 6, 5], array_column(array_column($res->json('items'), 'meta'), 'count'));
        $res->assertJsonPath('limit', 5);
    }

    public function test_support_actions_never_reveal_which_admin_acted(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $admin = $this->admin();
        Activity::log($c->id, $admin->id, 'team.disable', ['name' => 'Orhan', 'support' => true]);
        Activity::log($c->id, $admin->id, 'credits.grant', ['credits' => 50]);          // another feature that did not flag it: an admin account is support anyway
        $items = $this->actingAs($owner)->getJson('/kv/activity')->json('items');
        foreach ($items as $i) {
            $this->assertTrue($i['support']);
            $this->assertNull($i['by']);
            $this->assertFalse($i['you']);
        }
        $this->assertCount(2, $items);
        $this->assertStringNotContainsString('Admin', json_encode($items));
    }

    public function test_entries_of_removed_people_keep_their_name_in_the_meta_and_show_no_actor_if_the_account_is_gone(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$u] = $this->mate($c, 'ops', null, 'active', 'x@c.test', 'Gone Person');
        Activity::log($c->id, $u->id, 'doc.upload');
        $u->delete();
        $items = $this->actingAs($owner)->getJson('/kv/activity')->json('items');
        $this->assertNull($items[0]['by']);
        $this->assertFalse($items[0]['you']);
    }
}
