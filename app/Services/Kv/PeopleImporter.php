<?php

namespace App\Services\Kv;

use App\Models\Kv\Country;
use App\Models\Kv\Person;
use App\Models\Kv\RemovalRequest;
use App\Models\Kv\Sector;
use Illuminate\Support\Facades\DB;

/**
 * CSV import of "Kişiler". Hostile-input safe:
 *  - header is validated (unknown / missing columns refuse the whole file), row count is capped (config kervea.people.import_max_rows)
 *  - every cell is stripped of tags/control characters; cells that start like a spreadsheet formula (= @ tab CR, and + - outside a
 *    phone number) are REJECTED, so nothing we store can run when an admin later opens it in Excel
 *  - dedupe by e-mail (or name + company when there is no e-mail), inside the file and against the database
 *  - people who asked for removal (KVKK) are never re-imported
 *  - row-level report: valid rows are imported, bad rows are listed with their line number and the reason
 */
class PeopleImporter
{
    public const COLUMNS = ['name', 'title', 'department', 'company_name', 'country', 'sector', 'email', 'phone', 'linkedin'];
    public const REQUIRED = ['name', 'company_name', 'country', 'sector'];
    private const MAX_ERRORS_KEPT = 200;

    /** Header line of the downloadable template (UTF-8 with BOM so Excel opens it correctly). */
    public static function template(): string
    {
        return "\xEF\xBB\xBF".implode(',', self::COLUMNS)."\r\n";
    }

    /** @return array{imported: int, duplicates: int, suppressed: int, errors: list<array{row: int, msg: string}>, fatal: ?string, rows: int} */
    public function import(string $path): array
    {
        $out = ['imported' => 0, 'duplicates' => 0, 'suppressed' => 0, 'errors' => [], 'fatal' => null, 'rows' => 0];
        $raw = @file_get_contents($path);
        if ($raw === false || trim($raw) === '') {
            $out['fatal'] = 'Dosya boş ya da okunamadı.';
            return $out;
        }
        $raw = $this->toUtf8($raw);
        $lines = $this->parse($raw);
        if (! $lines) {
            $out['fatal'] = 'Dosyada satır bulunamadı.';
            return $out;
        }

        // header
        $head = array_map(fn ($h) => mb_strtolower(trim((string) $h)), array_shift($lines));
        $unknown = array_values(array_diff(array_filter($head, fn ($h) => $h !== ''), self::COLUMNS));
        if ($unknown) {
            $out['fatal'] = 'Bilinmeyen sütun(lar): '.implode(', ', $unknown).'. Şablondaki başlıkları aynen kullanın: '.implode(', ', self::COLUMNS).'.';
            return $out;
        }
        $missing = array_values(array_diff(self::REQUIRED, $head));
        if ($missing) {
            $out['fatal'] = 'Zorunlu sütun(lar) eksik: '.implode(', ', $missing).'.';
            return $out;
        }
        if (count($head) !== count(array_unique($head))) {
            $out['fatal'] = 'Aynı sütun başlığı birden fazla kez geçiyor.';
            return $out;
        }

        $data = [];
        foreach ($lines as $i => $cells) {
            if (! array_filter($cells, fn ($c) => trim((string) $c) !== '')) {
                continue;                                                   // empty line
            }
            $data[] = [$i + 2, $cells];                                     // +2: header is line 1
        }
        $max = max(1, (int) config('kervea.people.import_max_rows', 2000));
        if (count($data) > $max) {
            $out['fatal'] = "Bir seferde en fazla {$max} satır içe aktarılabilir (dosyada ".count($data).' var). Dosyayı bölün.';
            return $out;
        }
        $out['rows'] = count($data);

        $sectors = $this->sectorMap();
        $countries = Country::pluck('cc')->flip()->all();
        $suppressed = RemovalRequest::where('status', RemovalRequest::STATUS_DONE)->whereNotNull('person_email')->pluck('person_email')->map(fn ($e) => mb_strtolower($e))->flip()->all();
        $seen = [];
        $batch = [];
        $now = now();

        foreach ($data as [$line, $cells]) {
            $row = [];
            foreach ($head as $k => $col) {
                if ($col !== '') {
                    $row[$col] = (string) ($cells[$k] ?? '');
                }
            }
            $err = $this->clean($row);
            if ($err) {
                $this->error($out, $line, $err);
                continue;
            }
            $rec = $this->validate($row, $sectors, $countries);
            if (is_string($rec)) {
                $this->error($out, $line, $rec);
                continue;
            }
            if ($rec['email'] && isset($suppressed[$rec['email']])) {
                $out['suppressed']++;
                $this->error($out, $line, 'Bu kişi için kaldırma talebi var; eklenmedi.');
                continue;
            }
            $key = $rec['email'] ? 'e:'.$rec['email'] : 'n:'.mb_strtolower($rec['name']).'|'.mb_strtolower($rec['company_name']);
            if (isset($seen[$key]) || $this->exists($rec)) {
                $out['duplicates']++;
                continue;
            }
            $seen[$key] = true;
            $batch[] = $rec + ['source' => 'import', 'status' => Person::STATUS_ACTIVE, 'company_id' => null, 'created_at' => $now, 'updated_at' => $now];
            if (count($batch) >= 200) {
                $out['imported'] += $this->flush($batch);
                $batch = [];
            }
        }
        $out['imported'] += $this->flush($batch);
        return $out;
    }

    // ── internals ────────────────────────────────────────────────────────────────

    private function error(array &$out, int $line, string $msg): void
    {
        if (count($out['errors']) < self::MAX_ERRORS_KEPT) {
            $out['errors'][] = ['row' => $line, 'msg' => $msg];
        } elseif (count($out['errors']) === self::MAX_ERRORS_KEPT) {
            $out['errors'][] = ['row' => 0, 'msg' => 'Daha fazla hata var; ilk '.self::MAX_ERRORS_KEPT.' hata gösteriliyor.'];
        }
    }

    private function flush(array $batch): int
    {
        if (! $batch) {
            return 0;
        }
        DB::transaction(fn () => DB::table('kv_people')->insert($batch));
        return count($batch);
    }

    private function exists(array $rec): bool
    {
        if ($rec['email']) {
            return Person::where('email', $rec['email'])->exists();
        }
        return Person::active()->whereRaw('LOWER(name) = ?', [mb_strtolower($rec['name'])])->whereRaw('LOWER(company_name) = ?', [mb_strtolower($rec['company_name'])])->exists();
    }

    /** UTF-8 as is, otherwise Windows-1254 (what Turkish Excel writes), BOM removed. */
    private function toUtf8(string $s): string
    {
        $s = preg_replace('/^\xEF\xBB\xBF/', '', $s);
        if (! mb_check_encoding($s, 'UTF-8')) {
            $s = mb_convert_encoding($s, 'UTF-8', 'Windows-1254');
        }
        return str_replace(["\r\n", "\r"], "\n", $s);
    }

    /** @return list<list<string>> */
    private function parse(string $s): array
    {
        $first = strtok($s, "\n") ?: '';
        $delim = ',';
        $best = substr_count($first, ',');
        foreach ([';' => ';', "\t" => "\t"] as $d) {
            if (substr_count($first, $d) > $best) {
                $best = substr_count($first, $d);
                $delim = $d;
            }
        }
        $h = fopen('php://temp', 'r+');
        fwrite($h, $s);
        rewind($h);
        $rows = [];
        while (($r = fgetcsv($h, 0, $delim, '"', '')) !== false) {
            if ($r === [null]) {
                continue;
            }
            $rows[] = array_map(fn ($c) => (string) $c, $r);
        }
        fclose($h);
        return $rows;
    }

    /** Strip tags/control characters in place. Returns an error message for formula-looking cells. */
    private function clean(array &$row): ?string
    {
        foreach ($row as $col => $v) {
            $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
            $v = trim(strip_tags($v));
            if ($v !== '' && in_array($v[0], ['=', '@', "\t", "\r"], true)) {
                return "“{$col}” sütunundaki hücre formül gibi başlıyor ({$v[0]}); güvenlik nedeniyle reddedildi.";
            }
            if ($v !== '' && in_array($v[0], ['+', '-'], true) && ! ($col === 'phone' && preg_match('/^\+[0-9][0-9\s().\-]{4,}$/', $v))) {
                return "“{$col}” sütunundaki hücre “{$v[0]}” ile başlıyor; güvenlik nedeniyle reddedildi.";
            }
            $row[$col] = $col === 'phone' ? $v : preg_replace('/\s+/u', ' ', $v);
        }
        return null;
    }

    /** @return array<string, mixed>|string normalised record, or the error message */
    private function validate(array $row, array $sectors, array $countries): array|string
    {
        $name = $row['name'] ?? '';
        $company = $row['company_name'] ?? '';
        if ($name === '' || mb_strlen($name) > 160) return 'Ad zorunlu (en fazla 160 karakter).';
        if ($company === '' || mb_strlen($company) > 200) return 'Firma adı zorunlu (en fazla 200 karakter).';
        $title = $row['title'] ?? '';
        if (mb_strlen($title) > 160) return 'Ünvan çok uzun (en fazla 160 karakter).';

        $dept = mb_strtolower($row['department'] ?? '') ?: 'other';
        if (! in_array($dept, Person::DEPARTMENTS, true)) return 'Bölüm geçersiz: “'.$row['department'].'” ('.implode(', ', Person::DEPARTMENTS).' olabilir).';

        $cc = mb_strtolower($row['country'] ?? '');
        if (! preg_match('/^[a-z]{2}$/', $cc) || ! isset($countries[$cc])) return 'Ülke kodu geçersiz: “'.($row['country'] ?? '').'” (2 harfli ISO kodu, örn. de).';

        $sec = $this->resolveSector($row['sector'] ?? '', $sectors);
        if (! $sec) return 'Sektör bulunamadı: “'.($row['sector'] ?? '').'” (sektör numarası, adı veya kısa adı).';

        $email = mb_strtolower($row['email'] ?? '');
        if ($email !== '' && (! filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254)) return 'E-posta geçersiz: “'.$row['email'].'”.';
        $phone = $row['phone'] ?? '';
        if ($phone !== '' && (! preg_match('/^\+?[0-9][0-9\s().\-]{3,}$/', $phone) || mb_strlen($phone) > 64)) return 'Telefon geçersiz: “'.$phone.'”.';
        if ($email === '' && $phone === '') return 'E-posta veya telefondan en az biri gerekli.';
        $li = $row['linkedin'] ?? '';
        if ($li !== '' && (! preg_match('#^https://([a-z0-9-]+\.)?linkedin\.com/[^\s]*$#i', $li) || mb_strlen($li) > 300)) return 'LinkedIn adresi https://…linkedin.com/… biçiminde olmalı.';

        return [
            'name' => $name, 'title' => $title ?: null, 'department' => $dept, 'company_name' => $company,
            'country_cc' => $cc, 'sector_id' => $sec, 'email' => $email ?: null, 'phone' => $phone ?: null, 'linkedin' => $li ?: null,
        ];
    }

    /** @return array{idx: array<int, int>, name: array<string, int>} */
    private function sectorMap(): array
    {
        $map = ['idx' => [], 'name' => []];
        foreach (Sector::whereNull('parent_id')->get() as $s) {
            $map['idx'][(int) $s->meta_idx] = $s->id;
            $map['name'][mb_strtolower($s->slug)] = $s->id;
            foreach ((array) $s->names as $n) {
                $map['name'][mb_strtolower((string) $n)] = $s->id;
            }
        }
        return $map;
    }

    private function resolveSector(string $v, array $map): ?int
    {
        $v = trim($v);
        if ($v === '') return null;
        if (ctype_digit($v)) return $map['idx'][(int) $v] ?? null;
        return $map['name'][mb_strtolower($v)] ?? null;
    }

    /** Sector choices for the admin help table: [meta_idx, tr name, en name]. */
    public static function sectorHelp(): array
    {
        return Sector::whereNull('parent_id')->orderBy('meta_idx')->get()->map(fn ($s) => [(int) $s->meta_idx, $s->name('tr'), $s->name('en')])->all();
    }
}
