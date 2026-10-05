<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\CompanyDocument;
use App\Models\Kv\CompanyPhoto;
use App\Models\Kv\Consent;
use App\Models\Kv\Country;
use App\Models\Kv\Sector;
use App\Models\User;
use App\Services\Kv\ImageStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

/** "Firmanı Ekle": one submission = one pending application. Nothing is public until an admin approves. */
class ApplicationController extends Controller
{
    public static function rules(bool $creating = true): array
    {
        $u = config('kervea.uploads');
        $req = $creating ? 'required' : 'sometimes';
        return [
            'name' => "$req|string|max:200",
            'name_en' => 'nullable|string|max:200',
            'tax_id' => "$req|string|max:64",
            'mersis' => 'nullable|string|max:64',
            'founded_year' => "$req|integer|between:1800,".(date('Y') + 1),
            'employees' => 'nullable|string|max:32',
            'country' => ["$req", 'string', Rule::exists('kv_countries', 'cc')],
            'city' => 'nullable|string|max:120',
            'address' => 'nullable|string|max:1000',
            'website' => 'nullable|url|max:200',
            'kep' => 'nullable|string|max:200',
            'email' => "$req|email:rfc|max:254",
            'phone' => "$req|string|max:64",
            'rep_name' => "$req|string|max:200",
            'rep_title' => 'nullable|string|max:200',
            'rep_email' => 'nullable|email:rfc|max:254',
            'sector' => ["$req", 'integer', 'min:0'],
            'direction' => 'nullable|in:EXP,IMP,BOTH',
            'hs_codes' => 'nullable|string|max:200',
            'moq' => 'nullable|string|max:200',
            'incoterm' => 'nullable|string|max:32',
            'payment_terms' => 'nullable|string|max:64',
            'products' => 'nullable|string|max:500',
            'description' => "$req|string|max:3000",
            'certificates' => 'nullable|string|max:500',
            'social' => 'nullable|array',
            'social.*' => 'nullable|string|max:200',
            'logo' => ($creating ? 'required' : 'sometimes')."|file|mimetypes:image/jpeg,image/png,image/webp|max:{$u['logo_max_kb']}",
            'cover' => "nullable|file|mimetypes:image/jpeg,image/png,image/webp|max:{$u['image_max_kb']}",
            'photos' => "nullable|array|max:{$u['max_photos']}",
            'photos.*' => "file|mimetypes:image/jpeg,image/png,image/webp|max:{$u['image_max_kb']}",
            'documents' => ($creating ? 'required' : 'nullable')."|array|max:{$u['max_docs']}",
            'documents.*' => "file|mimetypes:application/pdf,image/jpeg,image/png,image/webp|max:{$u['doc_max_kb']}",
        ];
    }

    public static function wordCount(string $text): int
    {
        return count(preg_split('/\s+/u', trim($text), -1, PREG_SPLIT_NO_EMPTY));
    }

    /** Only http(s) social links; handles are kept as plain text. */
    public static function cleanSocial(?array $in): array
    {
        $out = [];
        foreach (['wa', 'li', 'ig', 'fb', 'x', 'yt'] as $k) {
            $v = trim((string) ($in[$k] ?? ''));
            if ($v === '') continue;
            if (preg_match('#^[a-z]+://#i', $v) && ! preg_match('#^https?://#i', $v)) continue; // javascript:, data: ...
            $out[$k] = mb_substr(strip_tags($v), 0, 200);
        }
        return $out;
    }

    public function store(Request $r)
    {
        $v = $r->validate(self::rules(true));
        $wc = self::wordCount($v['description']);
        $min = config('kervea.description_words.min');
        $max = config('kervea.description_words.max');
        if ($wc < $min || $wc > $max) {
            return response()->json(['message' => "Firma açıklaması {$min}–{$max} kelime olmalıdır (şu an {$wc}).", 'errors' => ['description' => ["{$min}–{$max} kelime"]]], 422);
        }

        // Mandatory consents must be explicit & independent (never pre-ticked, never bundled).
        $c = $r->input('consents', []);
        foreach (['kvkk', 'terms', 'verification', 'cross_border'] as $req) {
            if (! filter_var($c[$req] ?? false, FILTER_VALIDATE_BOOLEAN)) {
                return response()->json(['message' => 'Zorunlu onaylar eksik.', 'errors' => ['consents' => [$req]]], 422);
            }
        }

        $sector = Sector::where('meta_idx', (int) $v['sector'])->whereNull('parent_id')->first();
        if (! $sector) {
            return response()->json(['message' => 'Geçersiz sektör.', 'errors' => ['sector' => ['invalid']]], 422);
        }
        if (User::where('email', $v['email'])->exists()
            || Company::where('country_cc', strtolower($v['country']))->where('tax_id', $v['tax_id'])->whereIn('status', ['pending', 'approved'])->exists()) {
            return response()->json(['message' => 'Bu firma veya e-posta için zaten bir kayıt var.', 'errors' => ['email' => ['duplicate']]], 422);
        }

        try {
            $company = DB::transaction(function () use ($r, $v, $sector, $c) {
                $company = Company::create([
                    'slug' => Company::uniqueSlug($v['name']),
                    'name' => strip_tags($v['name']),
                    'name_en' => isset($v['name_en']) ? strip_tags($v['name_en']) : null,
                    'tax_id' => $v['tax_id'],
                    'mersis' => $v['mersis'] ?? null,
                    'founded_year' => $v['founded_year'],
                    'employees' => $v['employees'] ?? null,
                    'country_cc' => strtolower($v['country']),
                    'city' => isset($v['city']) ? strip_tags($v['city']) : null,
                    'address' => isset($v['address']) ? strip_tags($v['address']) : null,
                    'website' => $v['website'] ?? null,
                    'kep' => $v['kep'] ?? null,
                    'email' => $v['email'],
                    'phone' => $v['phone'],
                    'rep_name' => strip_tags($v['rep_name']),
                    'rep_title' => isset($v['rep_title']) ? strip_tags($v['rep_title']) : null,
                    'rep_email' => $v['rep_email'] ?? null,
                    'sector_id' => $sector->id,
                    'direction' => $v['direction'] ?? null,
                    'hs_codes' => $v['hs_codes'] ?? null,
                    'moq' => $v['moq'] ?? null,
                    'incoterm' => $v['incoterm'] ?? null,
                    'payment_terms' => $v['payment_terms'] ?? null,
                    'products' => isset($v['products']) ? strip_tags($v['products']) : null,
                    'description' => strip_tags($v['description']),
                    'certificates' => isset($v['certificates']) ? strip_tags($v['certificates']) : null,
                    'social' => self::cleanSocial($v['social'] ?? null),
                ]);

                $dir = 'kv/companies/'.$company->id;
                $company->logo_path = ImageStore::save($r->file('logo'), $dir, 600);
                if ($r->hasFile('cover')) $company->cover_path = ImageStore::save($r->file('cover'), $dir, 1600);
                $company->save();
                foreach (array_slice($r->file('photos', []), 0, config('kervea.uploads.max_photos')) as $i => $f) {
                    CompanyPhoto::create(['company_id' => $company->id, 'path' => ImageStore::save($f, $dir, 1600), 'sort' => $i]);
                }
                foreach ($r->file('documents', []) as $f) {
                    CompanyDocument::create(['company_id' => $company->id] + ImageStore::saveDocument($f, 'kv/docs/'.$company->id));
                }

                // Proof of consent (who / what / when / from where) – KVKK accountability.
                foreach (Consent::TYPES as $type) {
                    if ($type === 'cookies' || ! array_key_exists($type, $c)) continue;
                    Consent::create([
                        'company_id' => $company->id, 'email' => $company->email, 'type' => $type,
                        'granted' => filter_var($c[$type], FILTER_VALIDATE_BOOLEAN),
                        'ip' => $r->ip(), 'user_agent' => mb_substr((string) $r->userAgent(), 0, 255),
                    ]);
                }
                return $company;
            });
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => 'Dosya kabul edilmedi: '.$e->getMessage()], 422);
        }

        $this->notify($company);
        return response()->json(['ok' => true, 'id' => $company->id], 201);
    }

    private function notify(Company $company): void
    {
        try {
            Mail::to($company->email)->send(new KvMail('Başvurunuz alındı · Kervea', 'application_received', ['company' => $company]));
            $admins = config('kervea.admin_email') ? [config('kervea.admin_email')] : User::where('role', 1)->pluck('email')->all();
            foreach ($admins as $a) {
                Mail::to($a)->send(new KvMail('Yeni firma başvurusu', 'admin_new_application', ['company' => $company]));
            }
        } catch (\Throwable $e) {
            Log::warning('kv: application mail failed', ['company' => $company->id, 'err' => $e->getMessage()]);
        }
    }
}
