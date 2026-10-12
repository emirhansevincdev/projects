<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\ActivityEntry;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/** /admin/kervea/teams: support's read-only view of every team, plus switching a person off / on. */
class TeamAdminTest extends TeamTestCase
{
    public function test_only_admins_reach_the_team_pages(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [, $m] = $this->mate($c, 'ops');
        $this->get('/admin/kervea/teams')->assertRedirect();
        $this->actingAs($owner)->get('/admin/kervea/teams')->assertRedirect('/');
        $this->actingAs($owner)->post("/admin/kervea/teams/{$m->id}/disable")->assertRedirect('/');
        $this->actingAs($owner)->post("/admin/kervea/teams/{$m->id}/enable")->assertRedirect('/');
        $this->assertSame('active', $m->fresh()->status);
        $this->actingAs($this->admin())->get('/admin/kervea/teams')->assertOk();
    }

    public function test_the_list_shows_companies_with_their_team_sizes_members_roles_and_status(): void
    {
        [, $c] = $this->member('Acme Textiles', 'a@acme.test');
        [, $c2] = $this->member('Beta Foods', 'b@beta.test');
        $this->member('Lonely Ltd', 'l@lonely.test');                                   // no team → not listed
        $this->mate($c, 'ops', null, 'active', 'ops@acme-team.test', 'Orhan Ops');
        $this->mate($c, 'sales', ['messages'], 'invited', 'sales@acme-team.test', 'Selin Sales');
        $this->mate($c2, 'admin', null, 'disabled', 'adm@beta-team.test', 'Adem Admin');
        $this->mate($c, 'admin', null, 'active', 'adm@acme-team.test', 'Ayla Admin');

        $html = $this->actingAs($this->admin())->get('/admin/kervea/teams')->assertOk()->getContent();
        $this->assertStringContainsString('Acme Textiles', $html);
        $this->assertStringContainsString('Beta Foods', $html);
        $this->assertStringNotContainsString('Lonely Ltd', $html);
        $this->assertStringContainsString('2 firmada 4 ekip üyesi', $html);
        $this->assertStringContainsString('4 / 10 koltuk', $html);                       // owner + 3
        foreach (['Orhan Ops', 'ops@acme-team.test', 'Operasyon', 'Davet bekliyor', 'Devre dışı', 'özel izinler', 'Yönetici'] as $needle) {
            $this->assertStringContainsString($needle, $html);
        }
        $this->assertLessThan(strpos($html, 'Beta Foods'), strpos($html, 'Acme Textiles'));     // biggest team first
        $this->assertStringContainsString('Ekipler', $html);                               // the side menu entry
    }

    public function test_the_list_can_be_searched_and_escapes_what_people_typed(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [, $c2] = $this->member('Beta', 'b@beta.test');
        $this->mate($c, 'ops', null, 'active', 'xss@c.test', '<script>alert(1)</script>');
        $this->mate($c2, 'ops', null, 'active', 'find-me@c.test', 'Finder');
        $admin = $this->admin();
        $html = $this->actingAs($admin)->get('/admin/kervea/teams')->getContent();
        $this->assertStringNotContainsString('<script>alert(1)</script>', $html);
        $this->assertStringContainsString('&lt;script&gt;', $html);
        // a name is never interpolated into inline JavaScript (the confirm text travels in a data attribute)
        $this->mate($c, 'sales', null, 'active', 'quote@c.test', "x');alert(document.cookie);('");
        $html = $this->actingAs($admin)->get('/admin/kervea/teams')->getContent();
        $this->assertStringNotContainsString("confirm('x", $html);
        $this->assertStringNotContainsString("alert(document.cookie);('", $html);
        $this->assertStringContainsString('onsubmit="return confirm(this.dataset.msg)"', $html);
        $html = $this->actingAs($admin)->get('/admin/kervea/teams?q=FIND-ME')->getContent();
        $this->assertStringContainsString('Finder', $html);
        $this->assertStringNotContainsString('xss@c.test', $html);
        $html = $this->actingAs($admin)->get('/admin/kervea/teams?q='.urlencode('100%_'))->getContent();     // wildcards are literal
        $this->assertStringContainsString('Aramanıza uyan ekip bulunamadı', $html);
    }

    public function test_an_admin_can_disable_and_enable_a_person_and_their_sessions_end(): void
    {
        config(['session.driver' => 'database']);
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        [$ops, $m] = $this->mate($c, 'ops');
        DB::table('sessions')->insert(['id' => 'ops-s', 'user_id' => $ops->id, 'ip_address' => null, 'user_agent' => null, 'payload' => '', 'last_activity' => time()]);
        $admin = $this->admin();

        $this->actingAs($admin)->post("/admin/kervea/teams/{$m->id}/disable")->assertRedirect()->assertSessionHas('ok');
        $this->assertSame('disabled', $m->fresh()->status);
        $this->assertSame(0, DB::table('sessions')->where('user_id', $ops->id)->count());
        $this->assertNull(\App\Services\Kv\CompanyContext::resolve($ops->fresh()));
        $this->actingAs($admin)->post("/admin/kervea/teams/{$m->id}/disable")->assertRedirect()->assertSessionHasErrors('team');      // already off
        $this->actingAs($admin)->post("/admin/kervea/teams/{$m->id}/enable")->assertRedirect()->assertSessionHas('ok');
        $this->assertSame('active', $m->fresh()->status);
        $this->actingAs($admin)->post("/admin/kervea/teams/{$m->id}/enable")->assertRedirect()->assertSessionHasErrors('team');

        // the company sees "support" in its log and never the admin's identity
        $entries = ActivityEntry::where('company_id', $c->id)->orderBy('id')->get();
        $this->assertSame(['team.disable', 'team.enable'], $entries->pluck('action')->all());
        $this->assertTrue((bool) $entries[0]->meta['support']);
        $items = $this->actingAs($owner)->getJson('/kv/activity')->json('items');
        $this->assertTrue($items[0]['support']);
        $this->assertNull($items[0]['by']);
    }

    public function test_an_open_invitation_cannot_be_switched_off_by_support(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        [, $inv] = $this->mate($c, 'ops', null, 'invited');
        $admin = $this->admin();
        $this->actingAs($admin)->post("/admin/kervea/teams/{$inv->id}/disable")->assertSessionHasErrors('team');
        $this->assertSame('invited', $inv->fresh()->status);
        $this->actingAs($admin)->post('/admin/kervea/teams/99999/disable')->assertNotFound();
    }

    public function test_the_page_is_empty_but_fine_without_any_team(): void
    {
        $this->member('Acme', 'a@acme.test');
        $this->actingAs($this->admin())->get('/admin/kervea/teams')->assertOk()->assertSee('Henüz hiçbir firma ekip üyesi eklememiş.');
    }
}
