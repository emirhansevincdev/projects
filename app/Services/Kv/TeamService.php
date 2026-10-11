<?php

namespace App\Services\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

/**
 * Rules of the company team (invitations, roles, permissions). The controllers only translate HTTP into these calls.
 *
 * Hierarchy, in one sentence: nobody can hand out a permission they do not hold themselves, only the owner can hand out
 * the owner-only ones (team, billing), and you may manage only people whose permissions you could grant yourself.
 */
class TeamService
{
    /** @return list<string> assignable roles (the owner is not a role) */
    public static function roleKeys(): array
    {
        return array_keys((array) config('kervea.team.roles'));
    }

    /** @return list<string> */
    public static function ownerOnlyPerms(): array
    {
        return array_values((array) config('kervea.team.owner_only_perms', ['team', 'billing']));
    }

    /** Permissions the acting person may give to somebody else. @param array{perms: list<string>, is_owner: bool} $ctx @return list<string> */
    public static function grantable(array $ctx): array
    {
        $perms = array_values(array_intersect(CompanyContext::PERMS, $ctx['perms']));
        return $ctx['is_owner'] ? $perms : array_values(array_diff($perms, self::ownerOnlyPerms()));
    }

    /** May the actor change / disable / remove this person? (never themselves, never above their level) */
    public static function canManage(array $ctx, TeamMember $m): bool
    {
        if ((int) $m->company_id !== (int) $ctx['company']->id) {
            return false;
        }
        if ($ctx['member'] && (int) $ctx['member']->id === (int) $m->id) {
            return false;
        }
        return ! array_diff(CompanyContext::effectivePerms($m), self::grantable($ctx));
    }

    /**
     * What gets stored in kv_team_members.perms: null (= the role's defaults) when the list equals them, else the list.
     * @param list<string>|null $perms @return list<string>|null
     */
    public static function normalizePerms(?array $perms, string $role): ?array
    {
        if ($perms === null) {
            return null;
        }
        $perms = array_values(array_intersect(CompanyContext::PERMS, $perms));
        return $perms === CompanyContext::defaultPerms($role) ? null : $perms;
    }

    /** People using a seat: the owner plus every invited, active or disabled member (removing someone frees the seat). */
    public static function seatsUsed(int $companyId): int
    {
        return 1 + TeamMember::where('company_id', $companyId)->count();
    }

    public static function seatsMax(): int
    {
        return max(1, (int) config('kervea.team.max_members', 10));
    }

    /** Hours the password-setup link of an invitation stays valid (the standard password broker's lifetime). */
    public static function linkHours(): int
    {
        return max(1, (int) round(((int) config('auth.passwords.users.expire', 1440)) / 60));
    }

    public static function inviteExpired(TeamMember $m): bool
    {
        return $m->status === TeamMember::STATUS_INVITED && $m->invited_at !== null
            && $m->invited_at->copy()->addMinutes((int) config('auth.passwords.users.expire', 1440))->isPast();
    }

    /**
     * Issues a fresh password-setup link (same flow as KerveaAdminController::approve) and mails it.
     * The link is never logged or returned; a mail failure is reported as false so the panel can tell the inviter.
     */
    public static function sendInvite(TeamMember $m, User $user, Company $company, ?User $inviter): bool
    {
        $token = Password::broker()->createToken($user);
        $url = url('/set-password?token='.$token.'&email='.urlencode($user->email));
        try {
            Mail::to($user->email)->send(new KvMail('Kervea ekip daveti · '.$company->name, 'team_invite', [
                'name' => $m->name ?: $user->name,
                'company' => $company,
                'inviter' => $inviter?->name,
                'roleLabel' => (string) (config('kervea.team.roles.'.$m->role.'.label') ?? $m->role),
                'url' => $url,
                'hours' => self::linkHours(),
            ]));
            return true;
        } catch (\Throwable $e) {
            Log::warning('kv: team invite mail failed', ['member' => $m->id, 'err' => get_class($e)]);      // transport messages may echo the mail body (= the link), so never log them
            return false;
        }
    }

    /** Called by AuthController::setPassword: choosing a password through the e-mailed link activates the open invitation. */
    public static function activateFor(User $user): void
    {
        TeamMember::where('user_id', $user->id)->where('status', TeamMember::STATUS_INVITED)
            ->update(['status' => TeamMember::STATUS_ACTIVE, 'accepted_at' => now(), 'updated_at' => now()]);
    }

    /** Disabled / removed people are signed out everywhere (database sessions) and their "remember me" cookies stop working. */
    public static function revokeAccess(User $user): void
    {
        $user->forceFill(['remember_token' => Str::random(60)])->save();
        try {
            if (config('session.driver') === 'database') {
                $table = (string) config('session.table', 'sessions');
                $conn = config('session.connection');
                if (Schema::connection($conn)->hasTable($table)) {
                    DB::connection($conn)->table($table)->where('user_id', $user->id)->delete();
                }
            }
        } catch (\Throwable $e) {
            Log::warning('kv: could not clear sessions', ['user' => $user->id, 'err' => $e->getMessage()]);
        }
    }

    /**
     * A person who never opened their invitation has no data worth keeping: the account created for the invitation goes away
     * with it. Anybody who ever got in (or has any other tie to the platform) keeps the account and only loses access here.
     */
    public static function discardUnusedAccount(TeamMember $m): bool
    {
        $user = $m->user_id ? User::find($m->user_id) : null;
        if (! $user || $m->accepted_at !== null || $m->status !== TeamMember::STATUS_INVITED) {
            return false;
        }
        $inUse = $user->email_verified_at !== null
            || (int) $user->role !== 2
            || Company::where('user_id', $user->id)->exists()
            || TeamMember::where('user_id', $user->id)->where('id', '!=', $m->id)->exists()
            || \App\Models\Kv\SocialIdentity::where('user_id', $user->id)->exists();
        if ($inUse) {
            return false;
        }
        DB::table('password_reset_tokens')->where('email', $user->email)->delete();
        $user->delete();
        return true;
    }
}
