<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\CreditLedger;
use App\Services\Kv\CreditService;
use App\Services\Kv\InsufficientCreditsException;
use Illuminate\Http\Request;

/** Admin-only (auth + admin middleware): balances, ledgers and manual corrections of the credit system. */
class KerveaCreditsAdminController extends Controller
{
    public function index(Request $r)
    {
        $q = Company::with('sector')->whereIn('status', [Company::STATUS_APPROVED, Company::STATUS_SUSPENDED]);
        if ($s = trim((string) $r->query('q'))) {
            $like = '%'.str_replace(['%', '_'], ['\%', '\_'], $s).'%';
            $q->where(fn ($w) => $w->where('name', 'like', $like)->orWhere('email', 'like', $like));
        }
        $rows = $q->orderByDesc('credit_balance')->orderBy('name')->paginate(25)->withQueryString();
        $totals = [
            'balance' => (int) Company::sum('credit_balance'),
            'granted' => (int) CreditLedger::where('delta', '>', 0)->sum('delta'),
            'spent' => (int) -CreditLedger::where('delta', '<', 0)->sum('delta'),
        ];
        return view('kervea.admin.credits', compact('rows', 'totals'));
    }

    public function show(Company $company)
    {
        $ledger = CreditLedger::where('company_id', $company->id)->orderByDesc('id')->paginate(50);
        $audit = CreditService::audit($company->id);
        $users = \App\Models\User::whereIn('id', $ledger->pluck('user_id')->filter()->unique())->pluck('email', 'id');
        return view('kervea.admin.credits-company', [
            'company' => $company, 'ledger' => $ledger, 'audit' => $audit, 'users' => $users,
            'balance' => CreditService::balance($company->id), 'idem' => bin2hex(random_bytes(12)),
        ]);
    }

    public function adjust(Request $r, Company $company)
    {
        $v = $r->validate([
            'delta' => 'required|integer|not_in:0|between:-100000,100000',
            'reason' => 'required|string|min:5|max:255',
            'idem' => 'required|alpha_num|min:16|max:40',
        ], [
            'delta.not_in' => 'Değişim 0 olamaz.',
            'reason.required' => 'Gerekçe zorunludur.', 'reason.min' => 'Gerekçe en az 5 karakter olmalı.',
        ]);
        try {
            $res = CreditService::adjust($company->id, (int) $v['delta'], strip_tags($v['reason']), $r->user()->id, 'admin:'.$company->id.':'.$v['idem']);
        } catch (InsufficientCreditsException $e) {
            return back()->withErrors(['delta' => "Bakiye yetersiz (mevcut {$e->balance}); bakiye sıfırın altına inemez."])->withInput();
        }
        return redirect()->route('admin.kervea.credits.show', $company)->with('ok', $res['applied']
            ? ((int) $v['delta'] > 0 ? '+' : '').(int) $v['delta']." kredi işlendi. Yeni bakiye: {$res['balance']}."
            : 'Bu düzeltme zaten işlenmişti; tekrar uygulanmadı.');
    }
}
