<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Consent;
use App\Models\Kv\Sector;
use App\Services\Kv\FirmPresenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

/** Everything here is scoped to the logged-in member's OWN company (no ids accepted from the client). */
class MemberController extends Controller
{
    private function company(Request $r): ?Company
    {
        return Company::with(['sector', 'photos', 'documents'])->where('user_id', $r->user()->id)->first();
    }

    public function show(Request $r)
    {
        $c = $this->company($r);
        $consents = [];
        if ($c) {
            foreach (Consent::TYPES as $t) {
                $consents[$t] = $c->hasConsent($t);
            }
        }
        return response()->json([
            'user' => AuthController::userPayload($r->user()),
            'company' => $c ? FirmPresenter::detail($c, $r->user()) + [
                'status' => $c->status,
                'raw' => $c->only(['name', 'name_en', 'tax_id', 'mersis', 'founded_year', 'employees', 'country_cc', 'city', 'address', 'website', 'kep', 'email', 'phone', 'rep_name', 'rep_title', 'rep_email', 'direction', 'hs_codes', 'moq', 'incoterm', 'payment_terms', 'products', 'description', 'certificates', 'social']),
            ] : null,
            'consents' => $consents,
        ])->header('Cache-Control', 'no-store');
    }

    /** Withdrawal of consent (KVKK m.11). Mandatory consents can only be withdrawn by closing the account. */
    public function consent(Request $r)
    {
        $v = $r->validate(['type' => 'required|in:marketing,contact_visibility', 'granted' => 'required|boolean']);
        $c = $this->company($r);
        abort_unless($c, 404);
        Consent::create([
            'company_id' => $c->id, 'user_id' => $r->user()->id, 'email' => $c->email,
            'type' => $v['type'], 'granted' => (bool) $v['granted'],
            'ip' => $r->ip(), 'user_agent' => mb_substr((string) $r->userAgent(), 0, 255),
        ]);
        return response()->json(['ok' => true, 'type' => $v['type'], 'granted' => (bool) $v['granted']]);
    }

    public function update(Request $r)
    {
        $c = $this->company($r);
        abort_unless($c, 404);
        $rules = ApplicationController::rules(false);
        // media, documents and identity numbers are not editable here (documents/tax id changes need re-verification)
        unset($rules['logo'], $rules['cover'], $rules['photos'], $rules['photos.*'], $rules['documents'], $rules['documents.*'], $rules['tax_id'], $rules['mersis'], $rules['country']);
        $v = $r->validate($rules);
        if (isset($v['description'])) {
            $wc = ApplicationController::wordCount($v['description']);
            [$min, $max] = [config('kervea.description_words.min'), config('kervea.description_words.max')];
            if ($wc < $min || $wc > $max) {
                return response()->json(['message' => "Firma açıklaması {$min}–{$max} kelime olmalıdır (şu an {$wc})."], 422);
            }
        }
        if (isset($v['sector'])) {
            $sec = Sector::where('meta_idx', (int) $v['sector'])->whereNull('parent_id')->first();
            abort_unless($sec, 422);
            $c->sector_id = $sec->id;
        }
        foreach (['name', 'name_en', 'founded_year', 'employees', 'city', 'address', 'website', 'kep', 'email', 'phone', 'rep_name', 'rep_title', 'rep_email', 'direction', 'hs_codes', 'moq', 'incoterm', 'payment_terms', 'products', 'description', 'certificates'] as $f) {
            if (array_key_exists($f, $v)) $c->{$f} = is_string($v[$f]) ? strip_tags($v[$f]) : $v[$f];
        }
        if (isset($v['social'])) $c->social = ApplicationController::cleanSocial($v['social']);
        $c->save();
        return response()->json(['ok' => true]);
    }

    /** Account closure → delete personal data, anonymise the company shell (KVKK m.7). */
    public function destroy(Request $r)
    {
        $v = $r->validate(['password' => 'required|string']);
        $u = $r->user();
        if (! Hash::check($v['password'], $u->password)) {
            return response()->json(['error' => 'invalid'], 422);
        }
        DB::transaction(function () use ($u) {
            $c = Company::with(['photos', 'documents'])->where('user_id', $u->id)->first();
            if ($c) {
                foreach ($c->documents as $d) Storage::disk('local')->delete($d->path);
                foreach ($c->photos as $p) Storage::disk('public')->delete($p->path);
                foreach ([$c->logo_path, $c->cover_path] as $f) if ($f) Storage::disk('public')->delete($f);
                $c->documents()->delete();
                $c->photos()->delete();
                $c->consents()->update(['email' => null, 'user_id' => null]);
                $c->delete();
            }
            Auth::guard('web')->logout();
            $u->delete();
        });
        $r->session()->invalidate();
        $r->session()->regenerateToken();
        return response()->json(['ok' => true]);
    }
}
