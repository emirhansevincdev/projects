<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Kv\OrderController;
use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\CompanyDocument;
use App\Models\Kv\ContactMessage;
use App\Models\Kv\Country;
use App\Models\Kv\Order;
use App\Models\Kv\PromoCode;
use App\Models\Kv\Sector;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/** Admin-only (route group: auth + admin middleware). Personal/company data never leaves these routes. */
class KerveaAdminController extends Controller
{
    // ── Applications (approval panel) ────────────────────────────────────────
    public function applications(Request $r)
    {
        $status = in_array($r->query('status'), ['pending', 'approved', 'rejected', 'suspended']) ? $r->query('status') : 'pending';
        $rows = Company::with('sector')->where('status', $status)->latest()->paginate(25)->withQueryString();
        return view('kervea.admin.applications', compact('rows', 'status'));
    }

    public function applicationShow(Company $company)
    {
        $company->load(['sector', 'photos', 'documents', 'consents']);
        $country = Country::find($company->country_cc);
        return view('kervea.admin.application', compact('company', 'country'));
    }

    public function document(CompanyDocument $document)
    {
        abort_unless(Storage::disk('local')->exists($document->path), 404);
        return Storage::disk('local')->response($document->path, $document->original_name, [
            'Content-Type' => $document->mime,
            'X-Content-Type-Options' => 'nosniff',
            'Content-Disposition' => 'inline; filename="'.addslashes($document->original_name).'"',
        ]);
    }

    public function approve(Request $r, Company $company)
    {
        abort_unless($company->status === Company::STATUS_PENDING, 422);
        DB::transaction(function () use ($r, $company) {
            $user = User::where('email', $company->email)->first();
            if (! $user) {
                $user = new User(['name' => $company->rep_name, 'email' => $company->email, 'password' => Str::random(48)]);
                $user->role = 2;
                $user->save();
            }
            $company->user_id = $user->id;
            $company->status = Company::STATUS_APPROVED;
            $company->is_verified = true;
            $company->reviewed_at = now();
            $company->reviewed_by = $r->user()->id;
            $company->review_note = null;
            $company->save();

            $token = Password::broker()->createToken($user);
            $url = url('/sifre-belirle?token='.$token.'&email='.urlencode($user->email));
            $this->mail($company->email, 'Başvurunuz onaylandı · Kervea', 'application_approved', compact('company', 'url'));
        });
        $this->notifyMatching($company);
        return redirect()->route('admin.kervea.applications')->with('ok', "{$company->name} onaylandı; üyeye parola belirleme bağlantısı gönderildi.");
    }

    public function reject(Request $r, Company $company)
    {
        $v = $r->validate(['note' => 'nullable|string|max:1000']);
        abort_unless($company->status === Company::STATUS_PENDING, 422);
        $company->forceFill(['status' => Company::STATUS_REJECTED, 'review_note' => $v['note'] ?? null, 'reviewed_at' => now(), 'reviewed_by' => $r->user()->id])->save();
        $this->mail($company->email, 'Başvurunuz hakkında · Kervea', 'application_rejected', ['company' => $company, 'note' => $v['note'] ?? null]);
        return redirect()->route('admin.kervea.applications')->with('ok', "{$company->name} reddedildi.");
    }

    /** Tell opted-in members of the same sector (opposite/any direction) that a new verified firm joined. */
    private function notifyMatching(Company $new): void
    {
        $want = $new->direction === 'EXP' ? ['IMP', 'BOTH'] : ($new->direction === 'IMP' ? ['EXP', 'BOTH'] : ['EXP', 'IMP', 'BOTH']);
        $targets = Company::approved()->where('id', '!=', $new->id)->where('sector_id', $new->sector_id)
            ->where(fn ($q) => $q->whereIn('direction', $want)->orWhereNull('direction'))
            ->limit(200)->get()->filter(fn ($c) => $c->hasConsent('marketing'))->take(50);
        $country = Country::find($new->country_cc)?->names['tr'] ?? strtoupper($new->country_cc);
        foreach ($targets as $t) {
            $this->mail($t->email, 'Sektörünüzde yeni bir firma · Kervea', 'sector_match', ['company' => $new, 'country' => $country]);
        }
    }

    private function mail(string $to, string $subject, string $tpl, array $data): void
    {
        try {
            Mail::to($to)->send(new KvMail($subject, $tpl, $data));
        } catch (\Throwable $e) {
            Log::warning('kv: mail failed', ['tpl' => $tpl, 'err' => $e->getMessage()]);
        }
    }

    // ── Companies ────────────────────────────────────────────────────────────
    public function companies(Request $r)
    {
        $q = Company::with('sector')->where('status', '!=', 'pending');
        if ($s = trim((string) $r->query('q'))) {
            $q->where(fn ($w) => $w->where('name', 'like', "%$s%")->orWhere('email', 'like', "%$s%")->orWhere('tax_id', 'like', "%$s%"));
        }
        $rows = $q->latest()->paginate(25)->withQueryString();
        return view('kervea.admin.companies', compact('rows'));
    }

    public function companyStatus(Request $r, Company $company)
    {
        $v = $r->validate(['status' => 'required|in:approved,suspended']);
        abort_if($company->status === 'pending' || $company->status === 'rejected', 422);
        $company->forceFill(['status' => $v['status']])->save();
        return back()->with('ok', 'Durum güncellendi.');
    }

    // ── Contact messages ─────────────────────────────────────────────────────
    public function contacts()
    {
        $rows = ContactMessage::latest()->paginate(25);
        return view('kervea.admin.contacts', compact('rows'));
    }

    public function contactStatus(Request $r, ContactMessage $message)
    {
        $v = $r->validate(['status' => 'required|in:new,read,replied']);
        $message->forceFill(['status' => $v['status']])->save();
        return back();
    }

    // ── Promo codes ──────────────────────────────────────────────────────────
    public function promos()
    {
        $rows = PromoCode::latest()->get();
        return view('kervea.admin.promos', compact('rows'));
    }

    public function promoStore(Request $r)
    {
        $v = $r->validate([
            'code' => 'nullable|string|max:64|regex:/^[A-Za-z0-9_-]*$/',
            'type' => 'required|in:percent,fixed',
            'value' => 'required|integer|min:1|max:100000',
            'max_uses' => 'nullable|integer|min:1',
            'expires_at' => 'nullable|date|after:now',
            'note' => 'nullable|string|max:255',
        ]);
        if ($v['type'] === 'percent' && $v['value'] > 100) {
            return back()->withErrors(['value' => 'Yüzde en fazla 100 olabilir.'])->withInput();
        }
        $code = PromoCode::normalize($v['code'] ?? '') ?: strtoupper(Str::random(8));
        if (PromoCode::where('code', $code)->exists()) {
            return back()->withErrors(['code' => 'Bu kod zaten var.'])->withInput();
        }
        PromoCode::create([
            'code' => $code, 'type' => $v['type'],
            'value' => $v['type'] === 'fixed' ? $v['value'] * 100 : $v['value'], // fixed amounts are entered in USD
            'max_uses' => $v['max_uses'] ?? null, 'expires_at' => $v['expires_at'] ?? null, 'note' => $v['note'] ?? null,
        ]);
        return back()->with('ok', "Kod oluşturuldu: $code");
    }

    public function promoToggle(PromoCode $promo)
    {
        $promo->update(['is_active' => ! $promo->is_active]);
        return back();
    }

    public function promoDelete(PromoCode $promo)
    {
        $promo->delete();
        return back()->with('ok', 'Kod silindi.');
    }

    // ── Sectors (TİM list + admin-managed sub-sectors) ───────────────────────
    public function sectors()
    {
        $top = Sector::whereNull('parent_id')->with('children')->orderBy('sort')->get();
        return view('kervea.admin.sectors', compact('top'));
    }

    public function sectorStore(Request $r)
    {
        $v = $r->validate([
            'parent_id' => 'required|exists:kv_sectors,id',
            'name_tr' => 'required|string|max:120', 'name_en' => 'required|string|max:120',
            'name_es' => 'nullable|string|max:120', 'name_fr' => 'nullable|string|max:120',
            'name_ar' => 'nullable|string|max:120', 'name_ru' => 'nullable|string|max:120',
        ]);
        $parent = Sector::whereNull('parent_id')->findOrFail($v['parent_id']);
        $names = [];
        foreach (['tr', 'en', 'es', 'fr', 'ar', 'ru'] as $l) $names[$l] = trim($v["name_$l"] ?? '') ?: $v['name_en'];
        Sector::create([
            'parent_id' => $parent->id, 'slug' => Str::slug($parent->slug.'-'.$v['name_en']).'-'.Str::lower(Str::random(3)),
            'names' => $names, 'meta_idx' => $parent->meta_idx, 'sort' => ($parent->children()->max('sort') ?? 0) + 1,
        ]);
        return back()->with('ok', 'Alt sektör eklendi.');
    }

    public function sectorDelete(Sector $sector)
    {
        abort_if($sector->parent_id === null, 422, 'Ana sektörler silinemez.');
        $sector->delete();
        return back()->with('ok', 'Alt sektör silindi.');
    }

    // ── Orders ───────────────────────────────────────────────────────────────
    public function orders()
    {
        $rows = Order::with('promo')->latest()->paginate(25);
        $users = User::whereIn('id', $rows->pluck('user_id'))->pluck('email', 'id');
        return view('kervea.admin.orders', compact('rows', 'users'));
    }

    public function orderPaid(Order $order)
    {
        OrderController::markPaid($order, 'manual-'.$order->id, 'manual');
        return back()->with('ok', 'Sipariş ödendi olarak işaretlendi; üyelik etkinleştirildi.');
    }
}
