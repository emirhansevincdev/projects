<?php

namespace Database\Seeders;

use App\Models\Kv\Country;
use App\Models\Kv\Sector;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Sectors (TİM taxonomy, 26 top-level) and countries (249, official names in 6 languages).
 * Idempotent: safe to re-run; admin edits are kept (only missing rows are created).
 */
class KerveaSeeder extends Seeder
{
    public function run(): void
    {
        $d = json_decode(file_get_contents(__DIR__.'/data/i18n.json'), true);
        $langs = array_keys($d['sectors']);

        foreach ($d['sectors']['tr'] as $i => $trName) {
            $names = [];
            foreach ($langs as $l) {
                $names[$l] = $d['sectors'][$l][$i];
            }
            Sector::firstOrCreate(
                ['slug' => Str::slug($names['en'])],
                ['names' => $names, 'meta_idx' => $i, 'sort' => $i, 'is_active' => true]
            );
        }

        foreach ($d['countries'] as $i => $cc) {
            $names = [];
            foreach ($langs as $l) {
                $names[$l] = $d['country_i18n'][$l][$cc] ?? $cc;
            }
            Country::firstOrCreate(['cc' => $cc], ['names' => $names, 'sort' => $i, 'is_active' => true]);
        }
    }
}
