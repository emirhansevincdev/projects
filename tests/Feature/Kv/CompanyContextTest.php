<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\FirmPresenter;
use Illuminate\Support\Facades\Route;

class CompanyContextTest extends KvTestCase
{
    private function teammate(Company $c, string $role, ?array $perms = null, string $status = 'active'): User
    {
        $u = new User(['name' => ucfirst($role), 'email' => "$role@team.test", 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $u->email, 'role' => $role, 'perms' => $perms, 'status' => $status]);
        return $u;
    }

    public function test_owner_has_every_permission_and_team_members_get_their_role_defaults(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $sales = $this->teammate($c, 'sales');

        $o = CompanyContext::resolve($owner);
        $this->assertSame('owner', $o['role']);
        $this->assertTrue($o['is_owner']);
        $this->assertEqualsCanonicalizing(CompanyContext::PERMS, $o['perms']);

        $s = CompanyContext::resolve($sales);
        $this->assertSame('sales', $s['role']);
        $this->assertFalse($s['is_owner']);
        $this->assertSame($c->id, $s['company']->id);
        $this->assertEqualsCanonicalizing(['matches', 'messages', 'people'], $s['perms']);
        $this->assertTrue(CompanyContext::can($sales, 'messages'));
        $this->assertFalse(CompanyContext::can($sales, 'billing'));
        $this->assertFalse(CompanyContext::can($sales, 'team'));
    }

    public function test_per_person_permissions_override_the_role_and_unknown_names_are_ignored(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        $u = $this->teammate($c, 'ops', ['analytics', 'made-up', 'billing']);
        $this->assertEqualsCanonicalizing(['analytics', 'billing'], CompanyContext::resolve($u)['perms']);
    }

    public function test_disabled_or_invited_members_and_outsiders_have_no_context(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        $this->assertNull(CompanyContext::resolve($this->teammate($c, 'sales', null, 'disabled')));
        $outsider = new User(['name' => 'X', 'email' => 'x@x.test', 'password' => 'Secret-pass-1']);
        $outsider->role = 2;
        $outsider->save();
        $this->assertNull(CompanyContext::resolve($outsider));
        $this->assertNull(CompanyContext::resolve(null));
    }

    public function test_team_members_use_the_subscription_of_the_company_owner(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $mate = $this->teammate($c, 'sales');
        $this->assertSame('free', FirmPresenter::viewerPlan($mate));
        $owner->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addMonth()])->save();
        $this->assertSame('pro', FirmPresenter::viewerPlan($mate->fresh()));
        $this->assertTrue(FirmPresenter::isPro($mate->fresh()));
        $owner->forceFill(['kv_plan_until' => now()->subDay()])->save();
        $this->assertSame('free', FirmPresenter::viewerPlan($mate->fresh()));
    }

    public function test_middleware_demands_an_approved_company_and_the_listed_permissions(): void
    {
        Route::middleware(['web', 'auth', 'kv.member:messages'])->get('/kv/_t/messages', fn (\Illuminate\Http\Request $r) => response()->json(['company' => $r->attributes->get('kv_ctx')['company']->id]));
        Route::middleware(['web', 'auth', 'kv.member:billing'])->get('/kv/_t/billing', fn () => response()->json(['ok' => true]));

        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $sales = $this->teammate($c, 'sales');

        $this->getJson('/kv/_t/messages')->assertUnauthorized();
        $this->actingAs($sales)->getJson('/kv/_t/messages')->assertOk()->assertJsonPath('company', $c->id);
        $this->actingAs($sales)->getJson('/kv/_t/billing')->assertForbidden()->assertJsonPath('need', 'billing');
        $this->actingAs($owner)->getJson('/kv/_t/billing')->assertOk();

        $c->forceFill(['status' => 'suspended'])->save();            // suspended company: nobody gets panel features
        $this->actingAs($owner)->getJson('/kv/_t/messages')->assertForbidden()->assertJsonPath('error', 'no_company');
    }

    public function test_panel_payload_tells_the_front_end_the_role_and_permissions(): void
    {
        [, $c] = $this->member('Acme', 'a@acme.test');
        $mate = $this->teammate($c, 'ops');
        $this->actingAs($mate)->getJson('/kv/me')->assertOk()
            ->assertJsonPath('user.role', 'ops')->assertJsonPath('user.company', $c->slug)
            ->assertJsonFragment(['perms' => ['profile', 'docs']]);
    }

    public function test_team_members_cannot_close_the_company_or_change_consents_and_need_the_right_permission_to_edit(): void
    {
        [$owner, $c] = $this->member('Acme', 'a@acme.test');
        $ops = $this->teammate($c, 'ops');            // profile + docs
        $sales = $this->teammate($c, 'sales');        // no profile

        $this->actingAs($ops)->deleteJson('/kv/me', ['password' => 'Secret-pass-1'])->assertForbidden()->assertJsonPath('error', 'owner_only');
        $this->actingAs($ops)->postJson('/kv/me/consents', ['type' => 'marketing', 'granted' => true])->assertForbidden();
        $this->actingAs($sales)->putJson('/kv/me/company', ['phone' => '+49 5'])->assertForbidden();
        $this->actingAs($ops)->get('/kv/me/export')->assertForbidden();
        $this->actingAs($ops)->putJson('/kv/me/company', ['phone' => '+49 5'])->assertOk();
        $this->assertSame('+49 5', $c->fresh()->phone);
        $this->assertNotNull(User::find($owner->id));
        $this->assertNotNull(Company::find($c->id));
    }
}
