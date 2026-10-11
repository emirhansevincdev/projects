<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\TeamMember;
use App\Models\User;
use App\Services\Kv\Activity;
use App\Services\Kv\TeamService;
use Illuminate\Http\Request;

/** Read-only overview of every company's team (support), plus switching a person off / on again. Routes: routes/kv/admin-team.php. */
class TeamAdminController extends Controller
{
    public function index(Request $r)
    {
        $q = trim((string) $r->query('q', ''));
        $base = TeamMember::query()->join('kv_companies', 'kv_companies.id', '=', 'kv_team_members.company_id')
            ->when($q !== '', function ($w) use ($q) {
                $like = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], mb_strtolower($q)).'%';
                $w->where(fn ($x) => $x->whereRaw('LOWER(kv_companies.name) like ?', [$like])
                    ->orWhereRaw('LOWER(kv_team_members.email) like ?', [$like])
                    ->orWhereRaw('LOWER(kv_team_members.name) like ?', [$like]));
            });

        // one page of companies that have at least one team member, biggest teams first
        $page = (clone $base)->selectRaw('kv_team_members.company_id as company_id, count(*) as people')
            ->groupBy('kv_team_members.company_id')->orderByDesc('people')->orderBy('company_id')->paginate(20)->withQueryString();
        $ids = $page->pluck('company_id')->all();

        $companies = Company::whereIn('id', $ids)->get()->keyBy('id');
        $owners = User::whereIn('id', $companies->pluck('user_id')->filter()->all())->get(['id', 'name', 'email'])->keyBy('id');
        $members = TeamMember::whereIn('company_id', $ids)->orderBy('id')->get()->groupBy('company_id');
        $logins = Activity::lastLogins($members->flatten()->pluck('user_id')->filter()->unique()->values()->all());

        $rows = $page->getCollection()->map(function ($p) use ($companies, $owners, $members) {
            $c = $companies[$p->company_id] ?? null;
            return $c ? ['company' => $c, 'owner' => $owners[$c->user_id] ?? null, 'members' => $members[$c->id] ?? collect(), 'people' => (int) $p->people] : null;
        })->filter()->values();

        return view('kervea.admin.teams', [
            'rows' => $rows, 'page' => $page, 'q' => $q, 'logins' => $logins, 'max' => TeamService::seatsMax(),
            'roles' => (array) config('kervea.team.roles'),
            'totals' => ['companies' => (clone $base)->distinct()->count('kv_team_members.company_id'), 'people' => (clone $base)->count()],
        ]);
    }

    public function disable(Request $r, TeamMember $member)
    {
        if ($member->status !== TeamMember::STATUS_ACTIVE) {
            return back()->withErrors(['team' => 'Yalnızca etkin kişiler devre dışı bırakılabilir.']);
        }
        $member->forceFill(['status' => TeamMember::STATUS_DISABLED])->save();
        if ($member->user_id && ($u = User::find($member->user_id))) {
            TeamService::revokeAccess($u);
        }
        Activity::log($member->company_id, $r->user()->id, 'team.disable', ['name' => $member->name, 'member' => $member->id, 'support' => true]);
        return back()->with('ok', ($member->name ?: $member->email).' devre dışı bırakıldı; açık oturumları kapatıldı.');
    }

    public function enable(Request $r, TeamMember $member)
    {
        if ($member->status !== TeamMember::STATUS_DISABLED) {
            return back()->withErrors(['team' => 'Yalnızca devre dışı kişiler yeniden etkinleştirilebilir.']);
        }
        $member->forceFill(['status' => $member->accepted_at || ! $member->user_id ? TeamMember::STATUS_ACTIVE : TeamMember::STATUS_INVITED])->save();
        Activity::log($member->company_id, $r->user()->id, 'team.enable', ['name' => $member->name, 'member' => $member->id, 'support' => true]);
        return back()->with('ok', ($member->name ?: $member->email).' yeniden etkinleştirildi.');
    }
}
