<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Sector;
use App\Models\Kv\TeamMember;
use App\Models\User;

/** Shared helpers for the messaging tests. */
abstract class MessagesTestCase extends KvTestCase
{
    protected function pro(User $u): User
    {
        $u->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->addMonth()])->save();
        return $u->fresh();
    }

    /** An approved member of the default sector (meta_idx 10) – `$sectorIdx` picks another one. */
    protected function firm(string $name, bool $pro = false, ?int $sectorIdx = null): array
    {
        $co = $sectorIdx !== null ? ['sector_id' => Sector::where('meta_idx', $sectorIdx)->whereNull('parent_id')->value('id')] : [];
        [$u, $c] = $this->member($name, strtolower(preg_replace('/\W+/', '', $name)).'@firm.test', $co);
        return [$pro ? $this->pro($u) : $u, $c];
    }

    protected function otherSectorIdx(): int
    {
        return (int) Sector::whereNull('parent_id')->where('meta_idx', '!=', 10)->orderBy('meta_idx')->value('meta_idx');
    }

    protected function teammate(Company $c, string $role, ?array $perms = null, string $status = 'active'): User
    {
        $u = new User(['name' => ucfirst($role).' Mate', 'email' => "$role@{$c->slug}.test", 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $u->email, 'role' => $role, 'perms' => $perms, 'status' => $status]);
        return $u;
    }

    /** Start a conversation from $from to $to and return the conversation id. */
    protected function startConv(User $from, Company $to, string $body = 'Hello, interested in your goods.'): int
    {
        $res = $this->actingAs($from)->postJson('/kv/conversations', ['company' => $to->slug, 'body' => $body]);
        $res->assertStatus(201);
        return (int) $res->json('conversation_id');
    }
}
