<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Consent;
use App\Models\Kv\Sector;
use App\Models\User;
use Database\Seeders\KerveaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

abstract class KvTestCase extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(KerveaSeeder::class);
        Storage::fake('public');
        Storage::fake('local');
    }

    protected function admin(): User
    {
        $u = new User(['name' => 'Admin', 'email' => 'admin@kervea.test', 'password' => 'Secret-pass-1']);
        $u->role = 1;
        $u->email_verified_at = now();
        $u->save();
        return $u;
    }

    protected function words(int $n): string
    {
        $base = ['ihracat', 'kalite', 'sertifika', 'üretim'];
        return implode(' ', array_map(fn ($i) => $base[$i % 4], range(0, $n - 1)));
    }

    protected function payload(array $over = []): array
    {
        return array_replace_recursive([
            'name' => 'Ege Tekstil A.Ş.', 'tax_id' => '1234567890', 'founded_year' => 2005, 'country' => 'tr',
            'email' => 'info@egetekstil.test', 'phone' => '+90 212 000 00 00', 'rep_name' => 'Ayşe Yılmaz',
            'sector' => 10, 'direction' => 'EXP', 'hs_codes' => '5208', 'description' => $this->words(260),
            'logo' => UploadedFile::fake()->image('logo.png', 200, 200),
            'documents' => [UploadedFile::fake()->createWithContent('sicil.pdf', "%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF")],
            'consents' => ['kvkk' => 1, 'terms' => 1, 'verification' => 1, 'cross_border' => 1, 'contact_visibility' => 1, 'marketing' => 0],
        ], $over);
    }

    /** Approved company with a verified member user. */
    protected function member(string $name = 'Acme', string $email = 'a@acme.test', array $co = []): array
    {
        $u = new User(['name' => $name, 'email' => $email, 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        $c = Company::create($co + [
            'slug' => Company::uniqueSlug($name), 'name' => $name, 'tax_id' => (string) random_int(1e9, 9e9),
            'country_cc' => 'de', 'email' => $email, 'phone' => '+49 1', 'rep_name' => 'Rep',
            'sector_id' => Sector::where('meta_idx', 10)->value('id'), 'direction' => 'IMP', 'description' => 'x',
        ]);
        $c->forceFill(['user_id' => $u->id, 'status' => 'approved', 'is_verified' => true])->save();
        return [$u, $c];
    }

    protected function consent(Company $c, string $type, bool $granted = true): void
    {
        Consent::create(['company_id' => $c->id, 'email' => $c->email, 'type' => $type, 'granted' => $granted]);
    }
}
