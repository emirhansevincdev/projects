<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Person;
use App\Models\Kv\Sector;
use App\Models\Kv\TeamMember;
use App\Models\User;

/** Shared helpers for the credits / people / sector tests. */
abstract class CreditsTestCase extends KvTestCase
{
    /** top-level sector id by its front-end index (10 = textile, 9 = furniture, 3 = food …) */
    protected function sec(int $metaIdx): int
    {
        return (int) Sector::where('meta_idx', $metaIdx)->whereNull('parent_id')->value('id');
    }

    protected function teammate(Company $c, string $role = 'sales', ?array $perms = null, string $email = null): User
    {
        $email ??= "$role-".uniqid().'@team.test';
        $u = new User(['name' => ucfirst($role), 'email' => $email, 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $email, 'role' => $role, 'perms' => $perms, 'status' => 'active']);
        return $u;
    }

    protected function makePro(User $owner): void
    {
        $owner->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addYear()])->save();
    }

    /** Person of another sector with both channels (never use real-looking data outside tests). */
    protected function person(array $over = []): Person
    {
        return Person::create($over + [
            'name' => 'Mikko Virtanen', 'title' => 'CEO & Founder', 'department' => 'ceo', 'company_name' => 'Nordic Kaluste Oy',
            'country_cc' => 'fi', 'sector_id' => $this->sec(9), 'email' => 'mikko@nordic-kaluste.test', 'phone' => '+358 40 123 4567',
            'linkedin' => 'https://linkedin.com/in/mikko-v', 'source' => 'manual',
        ]);
    }

    protected function giveCredits(Company $c, int $n): void
    {
        \App\Services\Kv\CreditService::grant($c->id, $n, 'admin_adjust', ['meta' => ['note' => 'test'], 'silent' => true]);
    }
}
