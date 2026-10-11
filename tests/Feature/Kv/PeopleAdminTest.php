<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Person;
use App\Models\Kv\PersonReveal;
use App\Models\Kv\RemovalRequest;
use App\Services\Kv\CreditService;
use Illuminate\Http\UploadedFile;

/** C4 admin side: directory CRUD, CSV import (hostile input), KVKK removal inbox. */
class PeopleAdminTest extends CreditsTestCase
{
    private function csv(string $body, string $name = 'kisiler.csv'): UploadedFile
    {
        return UploadedFile::fake()->createWithContent($name, $body);
    }

    private ?\App\Models\User $adminUser = null;

    private function import(string $body, string $name = 'kisiler.csv')
    {
        $this->actingAs($this->adminUser ??= $this->admin());
        return $this->post('/admin/kervea/people/import', ['file' => $this->csv($body, $name)]);
    }

    private function report(): array
    {
        return session('people_import_report');
    }

    private const HEAD = "name,title,department,company_name,country,sector,email,phone,linkedin\n";

    // ── access ───────────────────────────────────────────────────────────────────

    public function test_every_admin_people_route_is_admin_only(): void
    {
        [$member] = $this->member();
        $p = $this->person();
        $req = RemovalRequest::create(['person_name' => 'X', 'requester_name' => 'Y', 'requester_email' => 'y@y.test', 'reason' => 'reason']);
        foreach ([['get', '/admin/kervea/people'], ['get', '/admin/kervea/people/import'], ['get', '/admin/kervea/people/import/template'],
                  ['get', '/admin/kervea/people/removals'], ['get', "/admin/kervea/people/{$p->id}/edit"]] as [$m, $url]) {
            $this->get($url)->assertRedirect();                                           // guests
            $this->actingAs($member)->get($url)->assertRedirect('/');                      // members
            auth()->logout();
        }
        foreach ([['post', '/admin/kervea/people', []], ['put', "/admin/kervea/people/{$p->id}", []], ['delete', "/admin/kervea/people/{$p->id}", []],
                  ['post', '/admin/kervea/people/import', []], ['post', "/admin/kervea/people/removals/{$req->id}/done", []], ['post', "/admin/kervea/people/removals/{$req->id}/reject", []]] as [$m, $url, $d]) {
            $this->actingAs($member)->{$m}($url, $d)->assertRedirect('/');
            auth()->logout();
        }
        $this->assertSame('active', $p->fresh()->status);
        $this->assertSame('new', $req->fresh()->status);
    }

    // ── directory ────────────────────────────────────────────────────────────────

    public function test_admin_adds_edits_searches_and_removes_people(): void
    {
        $this->actingAs($this->admin());
        $this->get('/admin/kervea/people')->assertOk()->assertSee('Kişi ekle');
        $data = ['name' => '  Anna   <b>Müller</b> ', 'title' => 'Einkaufsleiterin', 'department' => 'purchasing', 'company_name' => 'Berlin Möbel GmbH',
                 'country_cc' => 'DE', 'sector_id' => $this->sec(9), 'email' => 'Anna.Mueller@Berlin-Moebel.TEST', 'phone' => '+49 30 1234 5678', 'linkedin' => 'https://www.linkedin.com/in/annam'];
        $this->post('/admin/kervea/people', $data)->assertRedirect('/admin/kervea/people')->assertSessionHas('ok');
        $p = Person::sole();
        $this->assertSame('Anna Müller', $p->name);                                       // tags stripped, whitespace collapsed
        $this->assertSame('de', $p->country_cc);
        $this->assertSame('anna.mueller@berlin-moebel.test', $p->email);
        $this->assertSame('manual', $p->source);

        $this->get('/admin/kervea/people?q=berlin')->assertOk()->assertSee('Anna Müller');
        $this->get('/admin/kervea/people?q=nothing-here')->assertOk()->assertDontSee('Anna Müller');
        $this->get("/admin/kervea/people/{$p->id}/edit")->assertOk()->assertSee('Kişiyi düzenle');

        $this->put("/admin/kervea/people/{$p->id}", ['title' => 'Head of Purchasing'] + $data)->assertRedirect();
        $this->assertSame('Head of Purchasing', $p->fresh()->title);

        $this->delete("/admin/kervea/people/{$p->id}")->assertRedirect();
        $p->refresh();
        $this->assertSame('removed', $p->status);
        foreach (['name' => '—', 'email' => null, 'phone' => null, 'linkedin' => null, 'title' => null, 'company_name' => '—'] as $col => $expected) {
            $this->assertSame($expected, $p->$col, "$col must be wiped on removal");
        }
        $this->get("/admin/kervea/people/{$p->id}/edit")->assertNotFound();
        $this->get('/admin/kervea/people?status=removed')->assertOk()->assertSee('silindi');
    }

    public function test_admin_form_validation_and_duplicates(): void
    {
        $this->actingAs($this->admin());
        $ok = ['name' => 'Valid Person', 'department' => 'ceo', 'company_name' => 'Valid Co', 'country_cc' => 'de', 'sector_id' => $this->sec(9), 'email' => 'v@valid.test'];
        $this->post('/admin/kervea/people', ['email' => 'x@y.test'])->assertSessionHasErrors(['name', 'company_name', 'country_cc', 'sector_id']);
        $this->post('/admin/kervea/people', ['email' => null, 'phone' => null] + $ok)->assertSessionHasErrors('email');                 // no channel at all
        $this->post('/admin/kervea/people', ['country_cc' => 'zz'] + $ok)->assertSessionHasErrors('country_cc');
        $this->post('/admin/kervea/people', ['department' => 'janitor'] + $ok)->assertSessionHasErrors('department');
        $this->post('/admin/kervea/people', ['phone' => 'call me maybe'] + $ok)->assertSessionHasErrors('phone');
        $this->post('/admin/kervea/people', ['linkedin' => 'http://evil.test/in/x'] + $ok)->assertSessionHasErrors('linkedin');
        $this->post('/admin/kervea/people', ['linkedin' => 'javascript:alert(1)'] + $ok)->assertSessionHasErrors('linkedin');
        $this->post('/admin/kervea/people', ['name' => '=HYPERLINK("http://x")'] + $ok)->assertSessionHasErrors('name');
        $this->post('/admin/kervea/people', ['company_name' => '@SUM(1)'] + $ok)->assertSessionHasErrors('company_name');
        $subSector = \App\Models\Kv\Sector::create(['parent_id' => $this->sec(9), 'slug' => 'mobilya-alt', 'names' => ['tr' => 'Alt', 'en' => 'Sub'], 'meta_idx' => 9, 'sort' => 1]);
        $this->post('/admin/kervea/people', ['sector_id' => $subSector->id] + $ok)->assertSessionHasErrors('sector_id');                // top-level sectors only
        $this->assertSame(0, Person::count());

        $this->post('/admin/kervea/people', $ok)->assertSessionHasNoErrors();
        $this->post('/admin/kervea/people', ['name' => 'Someone Else', 'email' => 'V@VALID.test'] + $ok)->assertSessionHasErrors('name');   // same e-mail
        $this->post('/admin/kervea/people', ['name' => 'Phone Pat', 'email' => null, 'phone' => '+49 30 111 222'] + $ok)->assertSessionHasNoErrors();   // phone-only person is fine…
        $this->post('/admin/kervea/people', ['name' => 'PHONE PAT', 'company_name' => 'valid co', 'email' => null, 'phone' => '+49 30 999 888'] + $ok)->assertSessionHasErrors('name');   // …but not twice (name + company)
        $this->post('/admin/kervea/people', ['email' => null, 'phone' => '+49 30 777 666'] + $ok)->assertSessionHasErrors('name');            // same name + company as the first one, other channel
        $this->assertSame(2, Person::count());
    }

    // ── CSV import ───────────────────────────────────────────────────────────────

    public function test_template_download_has_exactly_the_required_header(): void
    {
        $this->actingAs($this->admin());
        $res = $this->get('/admin/kervea/people/import/template')->assertOk();
        $this->assertStringContainsString('text/csv', $res->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $res->headers->get('Content-Disposition'));
        $this->assertSame("\xEF\xBB\xBFname,title,department,company_name,country,sector,email,phone,linkedin\r\n", $res->getContent());
        $this->get('/admin/kervea/people/import')->assertOk()->assertSee('Şablonu indir')->assertSee('Mobilya');
    }

    public function test_valid_csv_is_imported_with_semicolons_bom_and_quoted_fields(): void
    {
        $body = "\xEF\xBB\xBFname;title;department;company_name;country;sector;email;phone;linkedin\n"
              ."Hans Müller;Einkaufsleiter;purchasing;Berlin Möbel GmbH;de;9;h.mueller@berlin-moebel.test;+49 30 1234 5678;https://www.linkedin.com/in/hm\n"
              ."\"Sophie \"\"Soso\"\" Weber\";\"Vertrieb, Leitung\";sales;Berlin Möbel GmbH;DE;Furniture, Paper & Forest Products;s.weber@berlin-moebel.test;;\n"
              ."Kwame Adjei;Export Director;;Abidjan Cacao;ci;Kuru Meyve;;+225 27 22 45 67;\n";
        $this->import($body)->assertRedirect('/admin/kervea/people/import');
        $r = $this->report();
        $this->assertNull($r['fatal']);
        $this->assertSame(3, $r['imported']);
        $this->assertSame([], $r['errors']);
        $this->assertSame(3, Person::count());
        $sophie = Person::where('email', 's.weber@berlin-moebel.test')->sole();
        $this->assertSame('Sophie "Soso" Weber', $sophie->name);
        $this->assertSame('Vertrieb, Leitung', $sophie->title);
        $this->assertSame($this->sec(9), $sophie->sector_id);
        $this->assertSame('import', $sophie->source);
        $kwame = Person::where('name', 'Kwame Adjei')->sole();
        $this->assertSame('other', $kwame->department);                                   // blank → other
        $this->assertNull($kwame->email);
        $this->get('/admin/kervea/people/import')->assertOk()->assertSee('3</b> kişi eklendi', false);
    }

    public function test_windows_1254_encoded_turkish_files_are_converted(): void
    {
        $utf8 = self::HEAD."Şükrü Çelik;CEO;ceo;Çelik Gıda A.Ş.;tr;3;sukru@celik.test;;\n";
        $body = mb_convert_encoding(str_replace(',', ';', self::HEAD)."Şükrü Çelik;CEO;ceo;Çelik Gıda A.Ş.;tr;3;sukru@celik.test;;\n", 'Windows-1254', 'UTF-8');
        $this->import($body);
        $this->assertSame(1, $this->report()['imported']);
        $this->assertSame('Şükrü Çelik', Person::sole()->name);
        $this->assertSame('Çelik Gıda A.Ş.', Person::sole()->company_name);
    }

    public function test_header_problems_refuse_the_whole_file(): void
    {
        $this->import("name,company,country,sector,email\nA,B,de,9,a@b.test\n");
        $this->assertStringContainsString('Bilinmeyen sütun', $this->report()['fatal']);
        $this->import("name,country,sector,email\nA,de,9,a@b.test\n");
        $this->assertStringContainsString('company_name', $this->report()['fatal']);
        $this->import("name,name,company_name,country,sector,email\nA,A,B,de,9,a@b.test\n");
        $this->assertStringContainsString('birden fazla', $this->report()['fatal']);
        $this->import('');
        $this->assertNotNull($this->report()['fatal']);
        $this->assertSame(0, Person::count());
    }

    public function test_spreadsheet_formulas_are_rejected_but_international_phone_numbers_are_fine(): void
    {
        $body = self::HEAD
            .'=HYPERLINK("http://evil.test"),,ceo,Evil Co,de,9,e1@p.test,,'."\n"
            .'Good Name,,ceo,@SUM(A1:A9),de,9,e2@p.test,,'."\n"
            .'+cmd|calc,,ceo,Plus Co,de,9,e3@p.test,,'."\n"
            .'-2+3,,ceo,Minus Co,de,9,e4@p.test,,'."\n"
            ."Tab Name,\t=1+1,ceo,Tab Co,de,9,e5@p.test,,\n"
            .'Phone Plus,,ceo,Phone Co,de,9,,+49 30 1234 5678,'."\n"
            .'Phone Formula,,ceo,Phone Co 2,de,9,,+1+1,'."\n"
            .'Phone Minus,,ceo,Phone Co 3,de,9,,-49 30 1234,'."\n";
        $this->import($body);
        $r = $this->report();
        $this->assertSame(1, $r['imported']);                                              // only “Phone Plus”
        $this->assertSame('Phone Plus', Person::sole()->name);
        $this->assertCount(7, $r['errors']);
        $this->assertSame([2, 3, 4, 5, 6, 8, 9], array_column($r['errors'], 'row'));
        $this->assertStringContainsString('formül', $r['errors'][0]['msg']);
    }

    public function test_html_is_stripped_and_row_errors_are_reported_with_line_numbers(): void
    {
        $body = self::HEAD
            ."<script>alert(1)</script>Ok Name,<i>Boss</i>,ceo,Fine Co,de,9,ok@p.test,,\n"       // line 2: valid after stripping
            ."No Channel,,ceo,Fine Co,de,9,,,\n"                                                   // 3
            ."Bad Mail,,ceo,Fine Co,de,9,not-an-email,,\n"                                         // 4
            ."Bad Country,,ceo,Fine Co,xx,9,bc@p.test,,\n"                                         // 5
            ."Bad Sector,,ceo,Fine Co,de,Nonexistent,bs@p.test,,\n"                                // 6
            ."Bad Dept,,janitor,Fine Co,de,9,bd@p.test,,\n"                                        // 7
            ."Bad Phone,,ceo,Fine Co,de,9,,call me,\n"                                             // 8
            ."Bad LinkedIn,,ceo,Fine Co,de,9,bl@p.test,,http://evil.test/x\n"                      // 9
            .",,ceo,Fine Co,de,9,nn@p.test,,\n"                                                    // 10: no name
            ."\n"                                                                                  // blank lines are skipped silently
            ."Last Good,,sales,Fine Co,de,9,lg@p.test,,\n";
        $this->import($body);
        $r = $this->report();
        $this->assertSame(2, $r['imported']);
        $this->assertSame([3, 4, 5, 6, 7, 8, 9, 10], array_column($r['errors'], 'row'));
        $ok = Person::where('email', 'ok@p.test')->sole();
        $this->assertSame('alert(1)Ok Name', $ok->name);                                       // tags removed (text content stays, harmless as text)
        $this->assertStringNotContainsString('<', $ok->name.$ok->title);
        $this->assertSame('Boss', $ok->title);
    }

    public function test_duplicates_in_the_file_and_in_the_database_are_skipped(): void
    {
        $this->person(['name' => 'Existing Ed', 'email' => 'ed@p.test']);
        $this->person(['name' => 'Phone Only', 'company_name' => 'Same Co', 'email' => null, 'phone' => '+1 555 111 22 33']);
        $body = self::HEAD
            ."Existing Edward,,ceo,Other Co,de,9,ED@P.test,,\n"                                  // same e-mail as DB (case-insensitive)
            ."New One,,ceo,New Co,de,9,new@p.test,,\n"
            ."New One Again,,ceo,New Co,de,9,new@p.test,,\n"                                     // same e-mail inside the file
            ."phone only,,ceo,SAME CO,de,9,,+1 555 999 88 77,\n"                                 // no e-mail: name + company match in DB
            ."Twin,,ceo,Twin Co,de,9,,+1 555 000 11 22,\n"
            ."TWIN,,ceo,twin co,de,9,,+1 555 000 11 33,\n";                                      // name + company inside the file
        $this->import($body);
        $r = $this->report();
        $this->assertSame(2, $r['imported']);                                                    // New One, Twin
        $this->assertSame(4, $r['duplicates']);
        $this->assertSame(4, Person::count());
    }

    public function test_row_limit_and_file_size_and_type_are_enforced(): void
    {
        config(['kervea.people.import_max_rows' => 3]);
        $rows = '';
        foreach (range(1, 4) as $i) {
            $rows .= "P$i,,ceo,Co $i,de,9,p$i@p.test,,\n";
        }
        $this->import(self::HEAD.$rows);
        $this->assertStringContainsString('en fazla 3 satır', $this->report()['fatal']);
        $this->assertSame(0, Person::count());                                                   // all or nothing for an oversized file

        $this->actingAs($this->adminUser ??= $this->admin());
        $this->post('/admin/kervea/people/import', ['file' => UploadedFile::fake()->createWithContent('x.csv', "%PDF-1.4\n%âãÏÓ\n1 0 obj<<>>endobj\n".random_bytes(200))])->assertSessionHasErrors('file');
        $this->post('/admin/kervea/people/import', ['file' => UploadedFile::fake()->createWithContent('x.csv', '<html><body>nope</body></html>')])->assertSessionHasErrors('file');
        $this->post('/admin/kervea/people/import', ['file' => UploadedFile::fake()->create('big.csv', 5000, 'text/csv')])->assertSessionHasErrors('file');
        $this->post('/admin/kervea/people/import', [])->assertSessionHasErrors('file');
        $this->assertSame(0, Person::count());
    }

    public function test_people_with_a_processed_removal_request_are_not_imported_again(): void
    {
        RemovalRequest::create(['person_name' => 'Gone Gina', 'person_email' => 'gina@p.test', 'requester_name' => 'Gina', 'requester_email' => 'gina@p.test', 'reason' => 'remove me'])
            ->forceFill(['status' => 'done'])->save();
        $this->import(self::HEAD."Gina Again,,ceo,Co,de,9,GINA@p.test,,\nFine Fred,,ceo,Co,de,9,fred@p.test,,\n");
        $r = $this->report();
        $this->assertSame(1, $r['imported']);
        $this->assertSame(1, $r['suppressed']);
        $this->assertNull(Person::where('email', 'gina@p.test')->first());
    }

    // ── KVKK removal inbox ───────────────────────────────────────────────────────

    public function test_processing_a_removal_request_erases_only_the_selected_matching_people(): void
    {
        $match = $this->person(['name' => 'Mikko Virtanen', 'email' => 'mikko@x.test']);
        $sameName = $this->person(['name' => 'mikko virtanen', 'email' => 'other-mikko@y.test', 'company_name' => 'Elsewhere']);
        $bystander = $this->person(['name' => 'Innocent Ina', 'email' => 'ina@x.test']);
        $req = RemovalRequest::create(['person_name' => 'Mikko Virtanen', 'person_email' => 'mikko@x.test', 'requester_name' => 'Mikko', 'requester_email' => 'mikko@x.test', 'reason' => 'KVKK']);

        $admin = $this->admin();
        $this->actingAs($admin)->get('/admin/kervea/people/removals')->assertOk()->assertSee('Mikko Virtanen')->assertSee('other-mikko@y.test');
        // a crafted id list cannot reach people that are not candidates of THIS request
        $this->post("/admin/kervea/people/removals/{$req->id}/done", ['person_ids' => [$match->id, $bystander->id]])->assertRedirect();

        $this->assertSame('removed', $match->fresh()->status);
        $this->assertNull($match->fresh()->email);
        $this->assertSame('active', $bystander->fresh()->status);
        $this->assertSame('active', $sameName->fresh()->status);                               // name-only match: listed, not auto-selected, not selected → kept
        $req->refresh();
        $this->assertSame('done', $req->status);
        $this->assertSame($admin->id, $req->handled_by);
        $this->assertNotNull($req->handled_at);
        $this->post("/admin/kervea/people/removals/{$req->id}/done", ['person_ids' => [$sameName->id]])->assertStatus(422);   // already closed
        $this->assertSame('active', $sameName->fresh()->status);
    }

    public function test_removed_people_disappear_from_member_lists_and_keep_reveals_consistent(): void
    {
        [$u, $c] = $this->member('Ege', 'ege@x.test', ['sector_id' => $this->sec(10)]);
        CreditService::grantSignup($c);
        $p = $this->person();
        $this->actingAs($u)->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertOk();
        $this->actingAs($this->admin())->delete("/admin/kervea/people/{$p->id}");
        $this->actingAs($u)->getJson('/kv/people')->assertJsonPath('total', 0);
        $this->postJson("/kv/people/{$p->id}/reveal", ['channel' => 'email'])->assertNotFound();      // not even the free re-open
        $this->assertSame(1, PersonReveal::count());                                                   // history stays, data is gone
    }

    public function test_rejecting_a_request_needs_a_reason_and_changes_nothing_else(): void
    {
        $p = $this->person();
        $req = RemovalRequest::create(['person_name' => 'Mikko Virtanen', 'requester_name' => 'Someone', 'requester_email' => 's@x.test', 'reason' => 'please']);
        $this->actingAs($this->admin());
        $this->post("/admin/kervea/people/removals/{$req->id}/reject", [])->assertSessionHasErrors('admin_note');
        $this->post("/admin/kervea/people/removals/{$req->id}/reject", ['admin_note' => 'Talep sahibinin kimliği doğrulanamadı'])->assertRedirect();
        $this->assertSame('rejected', $req->fresh()->status);
        $this->assertSame('active', $p->fresh()->status);
        $this->get('/admin/kervea/people/removals?status=rejected')->assertOk()->assertSee('kimliği doğrulanamadı');
    }

    public function test_admin_menu_shows_credits_and_people_entries(): void
    {
        $this->actingAs($this->admin());
        RemovalRequest::create(['person_name' => 'X', 'requester_name' => 'Y', 'requester_email' => 'y@y.test', 'reason' => 'reason']);
        $this->get('/admin/kervea/orders')->assertOk()->assertSee('Krediler')->assertSee('Kişiler');
    }
}
