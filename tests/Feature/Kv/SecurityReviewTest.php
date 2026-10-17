<?php

namespace Tests\Feature\Kv;

use Illuminate\Foundation\Testing\RefreshDatabase;

/** Security regression tests. */
class SecurityReviewTest extends CreditsTestCase
{
    use RefreshDatabase;

    public function test_a_member_cannot_move_the_firm_to_another_sector(): void
    {
        [$owner, $c] = $this->member('Tex', 'tex@x.test');                       // sector 10 (textile)
        $this->actingAs($owner)->putJson('/kv/me/company', ['sector' => 3])
            ->assertStatus(422)->assertJsonPath('error', 'sector_locked');
        $this->assertSame($this->sec(10), (int) $c->fresh()->sector_id);

        // saving the profile with the sector it already has is fine (the form always sends it)
        $this->actingAs($owner)->putJson('/kv/me/company', ['sector' => 10, 'phone' => '+49 5'])->assertOk();
    }

    public function test_support_can_change_the_sector_from_the_admin_page(): void
    {
        [, $c] = $this->member('Tex', 'tex@x.test');
        $admin = $this->admin();
        $this->actingAs($admin)->post("/admin/kervea/applications/{$c->id}/sector", ['sector_id' => $this->sec(3)])->assertRedirect();
        $this->assertSame($this->sec(3), (int) $c->fresh()->sector_id);
        $this->actingAs($admin)->get("/admin/kervea/applications/{$c->id}")->assertOk()->assertSee('Sektör değişikliği');
    }

    public function test_only_admins_can_use_the_sector_endpoint(): void
    {
        [$owner, $c] = $this->member('Tex', 'tex@x.test');
        $res = $this->actingAs($owner)->post("/admin/kervea/applications/{$c->id}/sector", ['sector_id' => $this->sec(3)]);
        $this->assertContains($res->status(), [302, 403, 404]);
        $this->assertSame($this->sec(10), (int) $c->fresh()->sector_id);
    }

    public function test_starting_two_factor_setup_cannot_switch_off_an_enabled_two_factor(): void
    {
        [$owner] = $this->member('Tex', 'tex@x.test');
        $owner->forceFill(['two_factor_secret' => 'JBSWY3DPEHPK3PXP', 'two_factor_confirmed_at' => now()])->save();
        $this->actingAs($owner)->postJson('/kv/auth/2fa/start')->assertStatus(409)->assertJsonPath('error', 'already_enabled');
        $this->assertNotNull($owner->fresh()->two_factor_confirmed_at);
        $this->assertSame('JBSWY3DPEHPK3PXP', $owner->fresh()->two_factor_secret);

        // without 2FA the setup starts as before
        [$other] = $this->member('Foo', 'foo@x.test');
        $this->actingAs($other)->postJson('/kv/auth/2fa/start')->assertOk()->assertJsonStructure(['secret', 'uri']);
    }

    public function test_unknown_accounts_and_wrong_passwords_get_the_same_answer(): void
    {
        $this->member('Tex', 'tex@x.test');
        $a = $this->postJson('/kv/auth/login', ['email' => 'nobody@x.test', 'password' => 'Wrong-pass-123']);
        $b = $this->postJson('/kv/auth/login', ['email' => 'tex@x.test', 'password' => 'Wrong-pass-123']);
        $a->assertStatus(422)->assertJsonPath('error', 'invalid');
        $b->assertStatus(422)->assertJsonPath('error', 'invalid');
    }

    public function test_team_members_without_the_profile_permission_do_not_get_identity_or_contact_data(): void
    {
        [$owner, $c] = $this->member('Tex', 'tex@x.test', ['tax_id' => '9876543210', 'phone' => '+49 123 456', 'address' => 'Hauptstr. 1', 'rep_email' => 'rep@tex.test']);
        $msgOnly = $this->teammate($c, 'sales', ['messages']);
        $profile = $this->teammate($c, 'ops', ['profile']);

        $mine = $this->actingAs($owner)->getJson('/kv/me')->assertOk()->json();
        $this->assertSame('9876543210', $mine['company']['raw']['tax_id']);
        $this->assertArrayHasKey('contact', $mine['company']);

        $res = $this->actingAs($msgOnly)->getJson('/kv/me')->assertOk();
        $json = json_encode($res->json());
        foreach (['9876543210', '+49 123 456', 'Hauptstr. 1', 'rep@tex.test'] as $secret) {
            $this->assertStringNotContainsString($secret, $json, $secret);
        }
        $this->assertArrayNotHasKey('contact', $res->json('company'));
        $this->assertSame('•', $res->json('company.raw.tax_id'));

        $this->assertSame('9876543210', $this->actingAs($profile)->getJson('/kv/me')->json('company.raw.tax_id'));
    }
}
