<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\Activity;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\LegacyUserColumns;
use App\Services\Kv\TeamService;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

/**
 * Team management of the acting person's OWN company (routes: routes/kv/team.php, middleware kv.member:team).
 * The company, role and permissions come only from CompanyContext; an id in the URL is just a lookup key and is
 * always resolved inside that company (a member of another company answers 404, exactly like a missing one).
 */
class TeamController extends Controller
{
    /** @return array{company: Company, role: string, perms: list<string>, owner: User, is_owner: bool, member: ?TeamMember} */
    private function ctx(Request $r): array
    {
        $ctx = CompanyContext::forRequest($r);
        abort_unless($ctx, 403);
        return $ctx;
    }

    private function fail(string $code, int $status, array $extra = []): JsonResponse
    {
        return response()->json(['error' => $code] + $extra, $status);
    }

    /** Validates or answers 422 {error:'validation', field, rule}; the panel shows its own translated text per field. */
    private function check(Request $r, array $rules): array
    {
        $v = Validator::make($r->all(), $rules);
        if ($v->fails()) {
            $field = (string) array_key_first($v->failed());
            $rule = Str::snake((string) array_key_first($v->failed()[$field] ?? []));
            throw new HttpResponseException($this->fail('validation', 422, ['field' => explode('.', $field)[0], 'rule' => $rule]));
        }
        return $v->validated();
    }

    private function member(array $ctx, $id): TeamMember
    {
        return TeamMember::where('company_id', $ctx['company']->id)->whereKey((int) $id)->firstOrFail();
    }

    /** The row shape the panel renders (no secrets, no token hash). */
    private function row(array $ctx, TeamMember $m, array $logins = []): array
    {
        $you = $ctx['member'] && (int) $ctx['member']->id === (int) $m->id;
        return [
            'id' => $m->id,
            'name' => $m->name ?: ($m->user?->name ?? ''),
            'email' => $m->email,
            'role' => $m->role,
            'status' => $m->status,
            'perms' => CompanyContext::effectivePerms($m),
            'custom' => is_array($m->perms),
            'invited_at' => $m->invited_at?->toIso8601String(),
            'accepted_at' => $m->accepted_at?->toIso8601String(),
            'last_login_at' => $m->user_id ? ($logins[$m->user_id] ?? null) : null,
            'invite_expired' => TeamService::inviteExpired($m),
            'you' => $you,
            'manageable' => ! $you && TeamService::canManage($ctx, $m),
        ];
    }

    private function seats(Company $c): array
    {
        $used = TeamService::seatsUsed($c->id);
        $max = TeamService::seatsMax();
        return ['used' => $used, 'max' => $max, 'free' => max(0, $max - $used)];
    }

    // ── GET /kv/team ────────────────────────────────────────────────────────
    public function index(Request $r)
    {
        $ctx = $this->ctx($r);
        $company = $ctx['company'];
        $members = TeamMember::where('company_id', $company->id)->with('user:id,name')->orderBy('id')->get();
        $logins = Activity::lastLogins(array_values(array_filter(array_merge([$ctx['owner']->id], $members->pluck('user_id')->all()))));
        $owner = $ctx['owner'];

        $roles = [];
        foreach ((array) config('kervea.team.roles') as $key => $def) {
            $roles[] = ['key' => $key, 'label' => $def['label'] ?? $key, 'perms' => CompanyContext::defaultPerms($key)];
        }
        $perms = [];
        foreach (CompanyContext::PERMS as $key) {
            $def = config('kervea.team.perms.'.$key, []);
            $perms[] = ['key' => $key, 'label' => $def['label'] ?? $key, 'group' => $def['group'] ?? 'work', 'owner_only' => in_array($key, TeamService::ownerOnlyPerms(), true)];
        }

        return response()->json([
            'company' => ['name' => $company->name],
            'viewer' => ['role' => $ctx['role'], 'is_owner' => $ctx['is_owner'], 'perms' => $ctx['perms'], 'grantable' => TeamService::grantable($ctx)],
            'owner' => [
                'name' => $owner->name, 'email' => $owner->email, 'role' => 'owner', 'status' => 'active',
                'perms' => CompanyContext::PERMS, 'you' => $ctx['is_owner'], 'last_login_at' => $logins[$owner->id] ?? null,
            ],
            'members' => $members->map(fn (TeamMember $m) => $this->row($ctx, $m, $logins))->values()->all(),
            'seats' => $this->seats($company),
            'roles' => $roles,
            'perms' => $perms,
            'link_hours' => TeamService::linkHours(),
        ])->header('Cache-Control', 'no-store');
    }

    // ── POST /kv/team/invite ────────────────────────────────────────────────
    public function invite(Request $r)
    {
        $ctx = $this->ctx($r);
        $company = $ctx['company'];
        $v = $this->check($r, [
            'email' => 'required|string|email:rfc|max:254',
            'name' => 'required|string|min:2|max:120',
            'role' => ['required', 'string', Rule::in(TeamService::roleKeys())],
            'perms' => 'sometimes|nullable|array|max:'.count(CompanyContext::PERMS),
            'perms.*' => ['string', Rule::in(CompanyContext::PERMS)],
        ]);
        $email = Str::lower(trim($v['email']));
        $name = trim((string) preg_replace('/\s+/u', ' ', strip_tags($v['name'])));
        if (mb_strlen($name) < 2) {
            return $this->fail('validation', 422, ['field' => 'name', 'rule' => 'min']);
        }

        // one e-mail = one person: an address that already has ANY account (or is a company contact address) cannot be invited
        if (self::emailKnown($email)) {
            return $this->fail('email_taken', 422);
        }

        // a role's defaults or the explicit list: the inviter must be able to grant every permission of it
        $custom = array_key_exists('perms', $v) && is_array($v['perms']) ? array_values(array_unique($v['perms'])) : null;
        $effective = $custom ?? CompanyContext::defaultPerms($v['role']);
        $denied = array_values(array_diff($effective, TeamService::grantable($ctx)));
        if ($denied) {
            return $this->fail('cannot_grant', 403, ['perms' => $denied]);
        }

        // invitation mails per company and day are limited (nobody can use the form to mail strangers in bulk)
        $limiterKey = 'kv-team-mail|'.$company->id;
        $cap = max(1, (int) config('kervea.team.invites_per_day', 20));
        if (RateLimiter::tooManyAttempts($limiterKey, $cap)) {
            return $this->fail('mail_limit', 429, ['retry_after' => RateLimiter::availableIn($limiterKey)]);
        }

        try {
            [$member, $user] = DB::transaction(function () use ($company, $email, $name, $v, $custom, $r) {
                // serialise concurrent invitations of one company so the seat limit cannot be overrun
                Company::whereKey($company->id)->lockForUpdate()->first();
                if (TeamService::seatsUsed($company->id) >= TeamService::seatsMax()) {
                    throw new HttpResponseException($this->fail('seats_full', 422, ['max' => TeamService::seatsMax()]));
                }
                $user = new User(['name' => $name, 'email' => $email, 'password' => Str::random(48)]);
                $user->role = 2;
                LegacyUserColumns::apply($user, 'customer');
                $user->save();
                $member = TeamMember::create([
                    'company_id' => $company->id, 'user_id' => $user->id, 'email' => $email, 'name' => $name,
                    'role' => $v['role'], 'perms' => TeamService::normalizePerms($custom, $v['role']),
                    'status' => TeamMember::STATUS_INVITED, 'invited_at' => now(), 'invited_by' => $r->user()->id,
                ]);
                return [$member, $user];
            });
        } catch (UniqueConstraintViolationException $e) {
            return $this->fail('email_taken', 422);       // somebody else invited the same address a moment ago
        }

        RateLimiter::hit($limiterKey, 86400);
        $sent = TeamService::sendInvite($member, $user, $company, $r->user());
        Activity::log($company->id, $r->user()->id, 'team.invite', ['name' => $name, 'role' => $member->role, 'member' => $member->id]);

        return response()->json(['ok' => true, 'mail_sent' => $sent, 'member' => $this->row($ctx, $member->load('user:id,name')), 'seats' => $this->seats($company)], 201);
    }

    // ── POST /kv/team/{id}/resend ───────────────────────────────────────────
    public function resend(Request $r, $id)
    {
        $ctx = $this->ctx($r);
        $m = $this->member($ctx, $id);
        if (! TeamService::canManage($ctx, $m)) {
            return $this->fail($ctx['member'] && (int) $ctx['member']->id === (int) $m->id ? 'self' : 'above_level', 403);
        }
        $user = $m->status === TeamMember::STATUS_INVITED && $m->user_id ? User::find($m->user_id) : null;
        if (! $user) {
            return $this->fail('not_invited', 422);
        }
        $each = 'kv-team-resend|'.$m->id;
        if (RateLimiter::tooManyAttempts($each, 1)) {
            return $this->fail('too_soon', 429, ['retry_after' => RateLimiter::availableIn($each)]);
        }
        $limiterKey = 'kv-team-mail|'.$ctx['company']->id;
        if (RateLimiter::tooManyAttempts($limiterKey, max(1, (int) config('kervea.team.invites_per_day', 20)))) {
            return $this->fail('mail_limit', 429, ['retry_after' => RateLimiter::availableIn($limiterKey)]);
        }
        RateLimiter::hit($each, 60);
        RateLimiter::hit($limiterKey, 86400);

        $m->forceFill(['invited_at' => now()])->save();
        $sent = TeamService::sendInvite($m, $user, $ctx['company'], $r->user());
        Activity::log($ctx['company']->id, $r->user()->id, 'team.resend', ['name' => $m->name, 'member' => $m->id]);
        return response()->json(['ok' => true, 'mail_sent' => $sent, 'member' => $this->row($ctx, $m->load('user:id,name'))]);
    }

    // ── PATCH /kv/team/{id} ─────────────────────────────────────────────────
    public function update(Request $r, $id)
    {
        $ctx = $this->ctx($r);
        $m = $this->member($ctx, $id);
        if (! TeamService::canManage($ctx, $m)) {
            return $this->fail($ctx['member'] && (int) $ctx['member']->id === (int) $m->id ? 'self' : 'above_level', 403);
        }
        $v = $this->check($r, [
            'role' => ['sometimes', 'string', Rule::in(TeamService::roleKeys())],
            'perms' => 'sometimes|nullable|array|max:'.count(CompanyContext::PERMS),
            'perms.*' => ['string', Rule::in(CompanyContext::PERMS)],
        ]);
        if (! array_key_exists('role', $v) && ! array_key_exists('perms', $v)) {
            return $this->fail('validation', 422, ['field' => 'role', 'rule' => 'required']);
        }

        $role = $v['role'] ?? $m->role;
        if (array_key_exists('perms', $v)) {
            $perms = is_array($v['perms']) ? array_values(array_unique($v['perms'])) : null;       // null = back to the role's defaults
        } else {
            $perms = $role !== $m->role ? null : (is_array($m->perms) ? $m->perms : null);        // a new role starts from its own defaults
        }
        $perms = TeamService::normalizePerms($perms, $role);
        $effective = $perms ?? CompanyContext::defaultPerms($role);
        $denied = array_values(array_diff($effective, TeamService::grantable($ctx)));
        if ($denied) {
            return $this->fail('cannot_grant', 403, ['perms' => $denied]);
        }

        $before = [$m->role, CompanyContext::effectivePerms($m)];
        $m->forceFill(['role' => $role, 'perms' => $perms])->save();
        if ($before[0] !== $role || $before[1] !== CompanyContext::effectivePerms($m)) {
            Activity::log($ctx['company']->id, $r->user()->id, 'team.update', [
                'name' => $m->name, 'member' => $m->id, 'role' => $role, 'from_role' => $before[0], 'perms' => CompanyContext::effectivePerms($m),
            ]);
        }
        return response()->json(['ok' => true, 'member' => $this->row($ctx, $m->load('user:id,name'))]);
    }

    // ── POST /kv/team/{id}/disable | enable ─────────────────────────────────
    public function disable(Request $r, $id)
    {
        $ctx = $this->ctx($r);
        $m = $this->member($ctx, $id);
        if (! TeamService::canManage($ctx, $m)) {
            return $this->fail($ctx['member'] && (int) $ctx['member']->id === (int) $m->id ? 'self' : 'above_level', 403);
        }
        if ($m->status !== TeamMember::STATUS_ACTIVE) {
            return $this->fail($m->status === TeamMember::STATUS_DISABLED ? 'already_disabled' : 'not_active', 422);
        }
        $m->forceFill(['status' => TeamMember::STATUS_DISABLED])->save();
        if ($m->user_id && ($u = User::find($m->user_id))) {
            TeamService::revokeAccess($u);
        }
        Activity::log($ctx['company']->id, $r->user()->id, 'team.disable', ['name' => $m->name, 'member' => $m->id]);
        return response()->json(['ok' => true, 'member' => $this->row($ctx, $m->load('user:id,name'))]);
    }

    public function enable(Request $r, $id)
    {
        $ctx = $this->ctx($r);
        $m = $this->member($ctx, $id);
        if (! TeamService::canManage($ctx, $m)) {
            return $this->fail($ctx['member'] && (int) $ctx['member']->id === (int) $m->id ? 'self' : 'above_level', 403);
        }
        if ($m->status !== TeamMember::STATUS_DISABLED) {
            return $this->fail('not_disabled', 422);
        }
        $m->forceFill(['status' => $m->accepted_at || ! $m->user_id ? TeamMember::STATUS_ACTIVE : TeamMember::STATUS_INVITED])->save();
        Activity::log($ctx['company']->id, $r->user()->id, 'team.enable', ['name' => $m->name, 'member' => $m->id]);
        return response()->json(['ok' => true, 'member' => $this->row($ctx, $m->load('user:id,name'))]);
    }

    // ── DELETE /kv/team/{id} ────────────────────────────────────────────────
    public function destroy(Request $r, $id)
    {
        $ctx = $this->ctx($r);
        $m = $this->member($ctx, $id);
        if (! TeamService::canManage($ctx, $m)) {
            return $this->fail($ctx['member'] && (int) $ctx['member']->id === (int) $m->id ? 'self' : 'above_level', 403);
        }
        $user = $m->user_id ? User::find($m->user_id) : null;
        $name = $m->name;
        $role = $m->role;
        $deletedAccount = false;
        DB::transaction(function () use ($m, $user, &$deletedAccount) {
            $m->delete();
            if ($user) {
                $deletedAccount = TeamService::discardUnusedAccount($m);     // checks the (already loaded) membership's state
            }
        });
        if ($user && ! $deletedAccount) {
            TeamService::revokeAccess($user);
        }
        Activity::log($ctx['company']->id, $r->user()->id, 'team.remove', ['name' => $name, 'role' => $role]);
        return response()->json(['ok' => true, 'seats' => $this->seats($ctx['company']), 'account_deleted' => $deletedAccount]);
    }

    /** Any account, company contact address or open invitation already uses this (lower-case) address. */
    public static function emailKnown(string $email): bool
    {
        return User::whereRaw('LOWER(email) = ?', [$email])->exists()
            || TeamMember::whereRaw('LOWER(email) = ?', [$email])->exists()
            || Company::whereRaw('LOWER(email) = ?', [$email])->orWhereRaw('LOWER(rep_email) = ?', [$email])->exists();
    }
}
