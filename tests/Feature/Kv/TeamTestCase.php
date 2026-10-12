<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

/** Helpers shared by the team / activity tests. */
abstract class TeamTestCase extends KvTestCase
{
    /** An ACTIVE team member (an account that has set its password) of $c. */
    protected function mate(Company $c, string $role, ?array $perms = null, string $status = 'active', ?string $email = null, string $name = null): array
    {
        $email ??= "{$role}".random_int(1000, 999999)."@team.test";
        $u = new User(['name' => $name ?? ucfirst($role).' Person', 'email' => $email, 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        $m = TeamMember::create([
            'company_id' => $c->id, 'user_id' => $u->id, 'email' => $email, 'name' => $u->name, 'role' => $role, 'perms' => $perms,
            'status' => $status, 'invited_at' => now()->subHour(), 'accepted_at' => $status === 'invited' ? null : now()->subMinutes(30),
        ]);
        return [$u, $m];
    }

    /** Owner + approved company in another firm (for cross-company checks). */
    protected function otherFirm(): array
    {
        return $this->member('Other Co', 'owner@other.test', ['tax_id' => '9999999999']);
    }

    /** Invites through the API and returns [response, KvMail data of the mail that was sent (or null)]. */
    protected function invite(User $as, array $body)
    {
        Mail::fake();
        $res = $this->actingAs($as)->postJson('/kv/team/invite', $body);
        $data = null;
        Mail::assertSent(KvMail::class, function (KvMail $m) use (&$data) {
            $data = $m->data + ['template' => $m->template, 'subject' => $m->mailSubject];
            return true;
        }) ;
        return [$res, $data];
    }

    /** token + e-mail of the password-setup link inside an invitation mail. */
    protected function linkOf(array $mailData): array
    {
        parse_str((string) parse_url($mailData['url'], PHP_URL_QUERY), $q);
        return [$q['token'], $q['email']];
    }
}
