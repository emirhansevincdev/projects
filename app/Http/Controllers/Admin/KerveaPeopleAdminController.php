<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kv\Country;
use App\Models\Kv\Person;
use App\Models\Kv\PersonReveal;
use App\Models\Kv\RemovalRequest;
use App\Models\Kv\Sector;
use App\Services\Kv\PeopleImporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

/** Admin-only (auth + admin middleware): the people directory, CSV import and the KVKK removal inbox. */
class KerveaPeopleAdminController extends Controller
{
    // ── list / add / edit / remove ───────────────────────────────────────────────

    public function index(Request $r)
    {
        $status = $r->query('status') === 'removed' ? 'removed' : 'active';
        $q = Person::with('sector')->where('status', $status);
        if ($s = trim((string) $r->query('q'))) {
            $like = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\%', '\_'], $s).'%';
            $q->where(fn ($w) => $w->where('name', 'like', $like)->orWhere('company_name', 'like', $like)->orWhere('email', 'like', $like)->orWhere('title', 'like', $like));
        }
        if ($sec = (int) $r->query('sector')) {
            $q->where('sector_id', $sec);
        }
        $rows = $q->orderByDesc('id')->paginate(25)->withQueryString();
        return view('kervea.admin.people', [
            'rows' => $rows, 'status' => $status, 'sectors' => $this->sectors(), 'countries' => $this->countries(),
            'counts' => ['active' => Person::active()->count(), 'removed' => Person::where('status', 'removed')->count()],
            'newRemovals' => RemovalRequest::where('status', RemovalRequest::STATUS_NEW)->count(),
            'person' => null,
        ]);
    }

    public function store(Request $r)
    {
        $data = $this->validated($r);
        if ($dup = $this->duplicate($data)) {
            return back()->withErrors(['name' => "Bu kişi zaten kayıtlı (#{$dup->id}).", ])->withInput();
        }
        Person::create($data + ['source' => 'manual', 'status' => Person::STATUS_ACTIVE]);
        return redirect()->route('admin.kervea.people')->with('ok', 'Kişi eklendi.');
    }

    public function edit(Person $person)
    {
        abort_if($person->status === Person::STATUS_REMOVED, 404);
        return view('kervea.admin.people', [
            'rows' => null, 'status' => 'active', 'sectors' => $this->sectors(), 'countries' => $this->countries(),
            'counts' => ['active' => Person::active()->count(), 'removed' => Person::where('status', 'removed')->count()],
            'newRemovals' => RemovalRequest::where('status', RemovalRequest::STATUS_NEW)->count(),
            'person' => $person,
            'reveals' => PersonReveal::where('person_id', $person->id)->count(),
        ]);
    }

    public function update(Request $r, Person $person)
    {
        abort_if($person->status === Person::STATUS_REMOVED, 404);
        $data = $this->validated($r);
        if ($dup = $this->duplicate($data, $person->id)) {
            return back()->withErrors(['name' => "Bu kişi zaten kayıtlı (#{$dup->id}).", ])->withInput();
        }
        $person->update($data);
        return redirect()->route('admin.kervea.people')->with('ok', 'Kişi güncellendi.');
    }

    /** "Kaldır" = KVKK erasure: contact data and name are wiped, the row stays only as a tombstone (status = removed). */
    public function destroy(Person $person)
    {
        $person->erase();
        return redirect()->route('admin.kervea.people')->with('ok', 'Kişi kaldırıldı; tüm kişisel verileri silindi.');
    }

    // ── CSV import ──────────────────────────────────────────────────────────────

    public function importForm(Request $r)
    {
        return view('kervea.admin.people-import', [
            'report' => session('people_import_report'), 'columns' => PeopleImporter::COLUMNS, 'required' => PeopleImporter::REQUIRED,
            'max' => (int) config('kervea.people.import_max_rows', 2000), 'sectorHelp' => PeopleImporter::sectorHelp(),
            'newRemovals' => RemovalRequest::where('status', RemovalRequest::STATUS_NEW)->count(),
        ]);
    }

    public function importTemplate()
    {
        return response(PeopleImporter::template(), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8', 'Content-Disposition' => 'attachment; filename="kisiler-sablon.csv"', 'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    public function importRun(Request $r, PeopleImporter $importer)
    {
        $r->validate(['file' => 'required|file|max:4096'], ['file.required' => 'Bir CSV dosyası seçin.', 'file.max' => 'Dosya en fazla 4 MB olabilir.']);
        $f = $r->file('file');
        // sniff the real content: plain text only (CSV); anything binary / HTML / PDF / Excel is refused
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($f->getRealPath());
        if (! in_array($mime, ['text/plain', 'text/csv', 'application/csv', 'inode/x-empty', 'application/x-empty'], true)) {
            return back()->withErrors(['file' => 'Yalnızca CSV (metin) dosyası kabul edilir; Excel dosyasını “CSV UTF-8” olarak kaydedin.']);
        }
        $report = $importer->import($f->getRealPath());
        return redirect()->route('admin.kervea.people.import')->with('people_import_report', $report)
            ->with('ok', $report['fatal'] ? null : $report['imported'].' kişi eklendi.');
    }

    // ── KVKK removal inbox ───────────────────────────────────────────────────────

    public function removals(Request $r)
    {
        $status = in_array($r->query('status'), ['new', 'done', 'rejected'], true) ? $r->query('status') : 'new';
        $rows = RemovalRequest::where('status', $status)->orderByDesc('id')->paginate(20)->withQueryString();
        $matches = [];
        foreach ($rows as $req) {
            $matches[$req->id] = $this->candidates($req);
        }
        return view('kervea.admin.people-removals', [
            'rows' => $rows, 'status' => $status, 'matches' => $matches,
            'counts' => RemovalRequest::selectRaw('status, count(*) c')->groupBy('status')->pluck('c', 'status')->all(),
        ]);
    }

    /** Remove the selected people and close the request. Only ids that are really candidates for THIS request are accepted. */
    public function removalDone(Request $r, RemovalRequest $removal)
    {
        abort_unless($removal->status === RemovalRequest::STATUS_NEW, 422);
        $v = $r->validate(['person_ids' => 'nullable|array|max:50', 'person_ids.*' => 'integer', 'admin_note' => 'nullable|string|max:500']);
        $allowed = $this->candidates($removal)->pluck('id')->all();
        $ids = array_values(array_intersect(array_map('intval', $v['person_ids'] ?? []), $allowed));
        DB::transaction(function () use ($removal, $ids, $v, $r) {
            foreach (Person::whereIn('id', $ids)->get() as $p) {
                $p->erase();
            }
            $removal->forceFill([
                'status' => RemovalRequest::STATUS_DONE, 'handled_by' => $r->user()->id, 'handled_at' => now(),
                'admin_note' => isset($v['admin_note']) ? strip_tags($v['admin_note']) : (count($ids) ? count($ids).' kayıt kaldırıldı' : 'Eşleşen kayıt bulunamadı'),
            ])->save();
        });
        return redirect()->route('admin.kervea.people.removals')->with('ok', count($ids).' kişi kaldırıldı; talep kapatıldı.');
    }

    public function removalReject(Request $r, RemovalRequest $removal)
    {
        abort_unless($removal->status === RemovalRequest::STATUS_NEW, 422);
        $v = $r->validate(['admin_note' => 'required|string|min:3|max:500']);
        $removal->forceFill(['status' => RemovalRequest::STATUS_REJECTED, 'handled_by' => $r->user()->id, 'handled_at' => now(), 'admin_note' => strip_tags($v['admin_note'])])->save();
        return redirect()->route('admin.kervea.people.removals')->with('ok', 'Talep reddedildi.');
    }

    // ── helpers ──────────────────────────────────────────────────────────────────

    /** People that could be the subject of a request: exact e-mail match first, then name matches (listed but not pre-selected). */
    private function candidates(RemovalRequest $req)
    {
        $q = Person::active()->with('sector')->where(function ($w) use ($req) {
            $any = false;
            if ($req->person_email) {
                $w->where('email', mb_strtolower($req->person_email));
                $any = true;
            }
            if ($req->person_name) {
                $w->{$any ? 'orWhereRaw' : 'whereRaw'}('LOWER(name) = ?', [mb_strtolower($req->person_name)]);
            }
        });
        return $q->limit(20)->get();
    }

    private function validated(Request $r): array
    {
        if (is_string($r->input('country_cc'))) {
            $r->merge(['country_cc' => strtolower(trim($r->input('country_cc')))]);
        }
        $v = $r->validate([
            'name' => 'required|string|max:160',
            'title' => 'nullable|string|max:160',
            'department' => ['required', Rule::in(Person::DEPARTMENTS)],
            'company_name' => 'required|string|max:200',
            'country_cc' => ['required', 'alpha', 'size:2', Rule::exists('kv_countries', 'cc')],
            'sector_id' => ['required', Rule::exists('kv_sectors', 'id')->whereNull('parent_id')],
            'email' => 'nullable|email:rfc|max:254',
            'phone' => ['nullable', 'max:64', 'regex:/^\+?[0-9][0-9\s().\-]{3,}$/'],
            'linkedin' => ['nullable', 'max:300', 'regex:#^https://([a-z0-9-]+\.)?linkedin\.com/\S*$#i'],
        ], ['phone.regex' => 'Telefon yalnızca rakam, boşluk, + ( ) - . içerebilir.', 'linkedin.regex' => 'LinkedIn adresi https://…linkedin.com/… biçiminde olmalı.']);
        if (blank($v['email'] ?? null) && blank($v['phone'] ?? null)) {
            throw \Illuminate\Validation\ValidationException::withMessages(['email' => 'E-posta veya telefondan en az biri gerekli.']);
        }
        foreach (['name', 'title', 'company_name'] as $k) {
            if (isset($v[$k])) {
                $v[$k] = trim(preg_replace('/\s+/u', ' ', strip_tags($v[$k])));
            }
        }
        // spreadsheet-formula guard (same rule as the CSV import)
        foreach (['name', 'title', 'company_name'] as $k) {
            if (! empty($v[$k]) && in_array($v[$k][0], ['=', '@', '+', '-'], true)) {
                throw \Illuminate\Validation\ValidationException::withMessages([$k => 'Alan = + - @ ile başlayamaz.']);
            }
        }
        $v['country_cc'] = strtolower($v['country_cc']);
        $v['email'] = filled($v['email'] ?? null) ? mb_strtolower($v['email']) : null;
        $v['phone'] = filled($v['phone'] ?? null) ? $v['phone'] : null;
        $v['linkedin'] = filled($v['linkedin'] ?? null) ? $v['linkedin'] : null;
        $v['title'] = filled($v['title'] ?? null) ? $v['title'] : null;
        return $v;
    }

    private function duplicate(array $d, ?int $ignore = null): ?Person
    {
        $q = Person::active();
        if ($ignore) {
            $q->where('id', '!=', $ignore);
        }
        if ($d['email']) {
            return (clone $q)->where('email', $d['email'])->first();
        }
        return $q->whereRaw('LOWER(name) = ?', [mb_strtolower($d['name'])])->whereRaw('LOWER(company_name) = ?', [mb_strtolower($d['company_name'])])->first();
    }

    private function sectors()
    {
        return Sector::whereNull('parent_id')->orderBy('meta_idx')->get();
    }

    private function countries()
    {
        return Country::orderBy('sort')->get();
    }
}
