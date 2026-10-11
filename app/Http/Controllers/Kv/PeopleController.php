<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Mail\Kv\KvMail;
use App\Models\Kv\Person;
use App\Models\Kv\PersonReveal;
use App\Models\Kv\RemovalRequest;
use App\Models\User;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\CreditService;
use App\Services\Kv\FirmPresenter;
use App\Services\Kv\InsufficientCreditsException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

/**
 * "Kişiler": decision makers of OTHER sectors, opened with the company's credits.
 * The company always comes from CompanyContext (kv.member:people); the browser never names a company.
 * A person's e-mail/phone leaves the server ONLY from reveal() (or, for a channel this company already paid for, the list).
 */
class PeopleController extends Controller
{
    /** People this company may see at all: active, with a sector, NOT of its own sector and never its own staff. */
    private function eligible(array $ctx): Builder
    {
        $company = $ctx['company'];
        $q = Person::query()->active()->whereNotNull('sector_id')
            ->where(fn ($w) => $w->whereNull('company_id')->orWhere('company_id', '!=', $company->id))
            ->whereRaw('LOWER(company_name) != ?', [mb_strtolower($company->name)]);
        $tree = FirmPresenter::sectorTreeIds($company->sector_id);
        if ($tree) {
            $q->whereNotIn('sector_id', $tree);
        }
        return $q;
    }

    /** GET /kv/people?q=&dept=&country=&page= */
    public function index(Request $r)
    {
        $v = $r->validate([
            'q' => 'nullable|string|max:120',
            'dept' => ['nullable', Rule::in(Person::DEPARTMENTS)],
            'country' => 'nullable|alpha|size:2',
            'page' => 'nullable|integer|min:1|max:100000',
        ]);
        $ctx = CompanyContext::forRequest($r);
        $company = $ctx['company'];
        $size = max(5, min(100, (int) config('kervea.people.page_size', 25)));
        $page = (int) ($v['page'] ?? 1);

        $base = $this->eligible($ctx);
        $countries = (clone $base)->whereNotNull('country_cc')->distinct()->orderBy('country_cc')->pluck('country_cc')->all();

        $q = clone $base;
        if (! empty($v['dept'])) {
            $q->where('department', $v['dept']);
        }
        if (! empty($v['country'])) {
            $q->where('country_cc', strtolower($v['country']));
        }
        if (isset($v['q']) && trim($v['q']) !== '') {
            $like = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], trim($v['q'])).'%';
            $q->where(fn ($w) => $w->where('name', 'like', $like)->orWhere('company_name', 'like', $like)->orWhere('title', 'like', $like));
        }
        $total = (clone $q)->count();
        $rows = $q->with('sector')->orderBy('company_name')->orderBy('name')->orderBy('id')->forPage($page, $size)->get();

        $opened = PersonReveal::where('company_id', $company->id)->whereIn('person_id', $rows->pluck('id'))->get()->groupBy('person_id');
        $items = $rows->map(function (Person $p) use ($opened) {
            $ch = ($opened[$p->id] ?? collect())->pluck('channel')->all();
            $emailOpen = in_array('email', $ch, true);
            $phoneOpen = in_array('phone', $ch, true);
            $item = [
                'id' => $p->id, 'name' => $p->name, 'title' => $p->title, 'dept' => $p->department,
                'company' => $p->company_name, 'cc' => $p->country_cc, 'sec' => $p->sector?->meta_idx,
                'has_email' => filled($p->email), 'has_phone' => filled($p->phone),
                'email_opened' => $emailOpen, 'phone_opened' => $phoneOpen,
            ];
            // values only for channels THIS company has already paid for (re-opening is free anyway)
            if ($emailOpen) $item['email'] = $p->email;
            if ($phoneOpen) $item['phone'] = $p->phone;
            if ($ch) $item['linkedin'] = $p->linkedin;
            return $item;
        })->values()->all();

        return response()->json([
            'items' => $items, 'total' => $total, 'page' => $page, 'pages' => max(1, (int) ceil($total / $size)), 'page_size' => $size,
            'countries' => $countries,
            'balance' => CreditService::balance($company->id),
            'costs' => ['email' => CreditService::revealCost('email'), 'phone' => CreditService::revealCost('phone')],
            'daily_left' => max(0, (int) config('kervea.people.daily_reveal_limit', 200) - $this->revealsToday($company->id)),
        ])->header('Cache-Control', 'no-store');
    }

    /**
     * POST /kv/people/{id}/reveal {channel: email|phone}
     * Charges the company's credits atomically; opening the same channel of the same person again is free (UNIQUE row + ledger key).
     */
    public function reveal(Request $r, int $id)
    {
        $v = $r->validate(['channel' => ['required', Rule::in(PersonReveal::CHANNELS)]]);
        $ctx = CompanyContext::forRequest($r);
        $company = $ctx['company'];
        $user = $r->user();
        $channel = $v['channel'];

        $person = $this->eligible($ctx)->whereKey($id)->first();
        if (! $person) {
            return response()->json(['error' => 'not_found'], 404);
        }
        $value = $channel === 'email' ? $person->email : $person->phone;
        if (blank($value)) {
            return response()->json(['error' => 'no_data'], 422);
        }
        $cost = CreditService::revealCost($channel);
        $limit = (int) config('kervea.people.daily_reveal_limit', 200);

        try {
            $res = DB::transaction(function () use ($company, $user, $person, $channel, $cost, $limit) {
                // every credit operation of one company is serialised on this row: the "already opened?" check, the daily
                // limit and the charge below cannot interleave with a double click or a colleague's parallel request
                DB::table('kv_companies')->where('id', $company->id)->lockForUpdate()->first(['id']);
                if (PersonReveal::where('company_id', $company->id)->where('person_id', $person->id)->where('channel', $channel)->exists()) {
                    return ['already' => true, 'balance' => CreditService::balance($company->id), 'spent' => 0];
                }
                if ($this->revealsToday($company->id) >= $limit) {
                    return ['limit' => true];
                }
                $spend = CreditService::spend($company->id, $cost, 'person_reveal', [
                    'user_id' => $user->id, 'ref_type' => 'person', 'ref_id' => $person->id,
                    'key' => "reveal:{$company->id}:{$person->id}:{$channel}", 'meta' => ['channel' => $channel],
                ]);
                PersonReveal::create([
                    'company_id' => $company->id, 'person_id' => $person->id, 'channel' => $channel,
                    'credits_spent' => $spend['applied'] ? $cost : 0, 'user_id' => $user->id, 'created_at' => now(),
                ]);
                return ['already' => false, 'balance' => $spend['balance'], 'spent' => $spend['applied'] ? $cost : 0];
            });
        } catch (InsufficientCreditsException $e) {
            return response()->json(['error' => 'no_credits', 'balance' => $e->balance, 'needed' => $e->needed], 402);
        }

        if (! empty($res['limit'])) {
            return response()->json(['error' => 'limit'], 429);
        }
        if (! $res['already']) {
            $this->track($company->id, $user->id, $person->id, $channel, $res['spent']);
        }
        return response()->json([
            'ok' => true, 'channel' => $channel, 'value' => $value, 'linkedin' => $person->linkedin,
            'already' => $res['already'], 'credits_spent' => $res['spent'], 'balance' => $res['balance'],
        ])->header('Cache-Control', 'no-store');
    }

    /** POST /kv/people/removal-request – public KVKK form ("buradan başvurabilir"). Honeypot + throttle; handled by an admin. */
    public function removalRequest(Request $r)
    {
        if ($r->filled('website')) {
            return response()->json(['ok' => true]);                       // honeypot: pretend success, store nothing
        }
        $v = $r->validate([
            'person_name' => 'required|string|min:2|max:160',
            'person_email' => 'nullable|email:rfc|max:254',
            'person_ref' => 'nullable|string|max:200',
            'requester_name' => 'required|string|min:2|max:160',
            'requester_email' => 'required|email:rfc|max:254',
            'reason' => 'required|string|min:5|max:2000',
        ]);
        $req = RemovalRequest::create([
            'person_name' => strip_tags($v['person_name']), 'person_email' => isset($v['person_email']) ? mb_strtolower($v['person_email']) : null,
            'person_ref' => isset($v['person_ref']) ? strip_tags($v['person_ref']) : null,
            'requester_name' => strip_tags($v['requester_name']), 'requester_email' => mb_strtolower($v['requester_email']),
            'reason' => strip_tags($v['reason']), 'ip' => $r->ip(),
        ]);
        try {
            $to = config('kervea.admin_email') ? [config('kervea.admin_email')] : User::where('role', 1)->pluck('email')->all();
            foreach ($to as $a) {
                Mail::to($a)->send(new KvMail('Yeni KVKK kaldırma talebi (Kişiler)', 'admin_removal_request', ['req' => $req]));
            }
        } catch (\Throwable $e) {
            Log::warning('kv: removal request mail failed', ['err' => $e->getMessage()]);
        }
        return response()->json(['ok' => true]);
    }

    private function revealsToday(int $companyId): int
    {
        return PersonReveal::where('company_id', $companyId)->where('created_at', '>=', now()->startOfDay())->count();
    }

    /** Metrics (ANALYTICS) and the activity feed (TEAM) – only when those features are installed; logging must never break a reveal. */
    private function track(int $companyId, int $userId, int $personId, string $channel, int $credits): void
    {
        try {
            if (class_exists(\App\Services\Kv\Metrics::class)) {
                \App\Services\Kv\Metrics::inc($companyId, 'person_reveal');
            }
            if (class_exists(\App\Services\Kv\Activity::class)) {
                \App\Services\Kv\Activity::log($companyId, $userId, 'person.reveal', ['person' => $personId, 'channel' => $channel, 'credits' => $credits]);
            }
        } catch (\Throwable $e) {
            Log::warning('kv: person.reveal tracking failed', ['err' => $e->getMessage()]);
        }
    }
}
