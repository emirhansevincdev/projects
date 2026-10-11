<?php

namespace App\Services\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * "Which company is this signed-in user acting for, in which role, with which permissions?"
 *
 * The owner is kv_companies.user_id (all permissions). Other people are rows of kv_team_members with status = active.
 * EVERY panel endpoint (messages, people/credits, analytics, team, billing …) must take its company from here and never
 * from an id sent by the browser. Only APPROVED companies give panel access.
 */
class CompanyContext
{
    /** Permission names understood by the panel (tabs / features). */
    public const PERMS = ['matches', 'profile', 'docs', 'messages', 'people', 'analytics', 'team', 'billing'];

    /**
     * @return array{company: Company, role: string, perms: list<string>, owner: User, is_owner: bool, member: ?TeamMember}|null
     */
    public static function resolve(?User $u): ?array
    {
        if (! $u) {
            return null;
        }
        $own = Company::where('user_id', $u->id)->first();
        if ($own) {
            return self::pack($own, 'owner', self::PERMS, $u, null);
        }
        $m = TeamMember::where('user_id', $u->id)->where('status', TeamMember::STATUS_ACTIVE)->with('company')->first();
        if (! $m || ! $m->company) {
            return null;
        }
        $perms = is_array($m->perms) ? array_values(array_intersect($m->perms, self::PERMS)) : self::defaultPerms($m->role);
        $owner = User::find($m->company->user_id) ?: $u;
        return self::pack($m->company, $m->role, $perms, $owner, $m);
    }

    /** Same, memoised on the request (one query set per request). */
    public static function forRequest(Request $r): ?array
    {
        if (! $r->attributes->has('kv_ctx')) {
            $r->attributes->set('kv_ctx', self::resolve($r->user()));
        }
        return $r->attributes->get('kv_ctx');
    }

    public static function company(?User $u): ?Company
    {
        return self::resolve($u)['company'] ?? null;
    }

    public static function can(?User $u, string $perm): bool
    {
        $ctx = self::resolve($u);
        return $ctx && $ctx['company']->status === Company::STATUS_APPROVED && in_array($perm, $ctx['perms'], true);
    }

    /** The user whose subscription counts for $u: the company owner for team members, $u itself otherwise. */
    public static function planOwner(User $u): User
    {
        $ctx = self::resolve($u);
        return $ctx ? $ctx['owner'] : $u;
    }

    /** @return list<string> */
    public static function defaultPerms(string $role): array
    {
        $roles = (array) config('kervea.team.roles');
        return array_values(array_intersect((array) ($roles[$role]['perms'] ?? []), self::PERMS));
    }

    private static function pack(Company $c, string $role, array $perms, User $owner, ?TeamMember $m): array
    {
        return ['company' => $c, 'role' => $role, 'perms' => array_values($perms), 'owner' => $owner, 'is_owner' => $role === 'owner', 'member' => $m];
    }
}
