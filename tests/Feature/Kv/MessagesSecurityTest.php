<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Models\Kv\MessageReport;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

/** Ownership (IDOR), permissions, attachment sniffing, escaping, team inbox and the notification e-mail. */
class MessagesSecurityTest extends MessagesTestCase
{
    private function pdf(string $name = 'offer.pdf'): UploadedFile
    {
        return UploadedFile::fake()->createWithContent($name, "%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF");
    }

    private function upload(User $u, int $conv, UploadedFile $file, array $extra = [])
    {
        return $this->actingAs($u)->post("/kv/conversations/$conv/messages", ['attachment' => $file] + $extra, ['Accept' => 'application/json']);
    }

    // ── routing ─────────────────────────────────────────────────────────────────────────────
    public function test_every_messaging_route_needs_the_messages_permission_and_has_its_own_throttle_bucket(): void
    {
        $buckets = [];
        $count = 0;
        foreach (\Illuminate\Support\Facades\Route::getRoutes() as $route) {
            if (! preg_match('#^kv/(conversations|messages)#', $route->uri())) {
                continue;
            }
            $count++;
            $mw = $route->gatherMiddleware();
            $this->assertContains('auth', $mw, $route->uri());
            $this->assertContains('kv.member:messages', $mw, $route->uri());
            $throttle = collect($mw)->first(fn ($m) => is_string($m) && str_starts_with($m, 'throttle:'));
            $this->assertNotNull($throttle, 'no throttle on '.$route->uri());
            $parts = explode(',', substr($throttle, strlen('throttle:')));
            $this->assertCount(3, $parts, 'bucket name missing on '.$route->uri());
            $this->assertStringStartsWith('kv-msg-', $parts[2]);
            $buckets[] = $parts[2];
        }
        $this->assertGreaterThanOrEqual(12, $count);
        $this->assertSame($buckets, array_values(array_unique($buckets)), 'every endpoint has a DISTINCT bucket');
    }

    public function test_invalid_paging_parameters_are_rejected(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        foreach (['after=-1', 'after=abc', 'before=0', 'before=x', 'limit=0', 'limit=1000'] as $q) {
            $this->actingAs($a)->getJson("/kv/conversations/$id?$q")->assertStatus(422);
        }
        $this->actingAs($a)->getJson('/kv/conversations?archived=maybe')->assertStatus(422);
        $this->actingAs($a)->getJson('/kv/conversations?q='.str_repeat('x', 101))->assertStatus(422);
        $this->actingAs($a)->getJson('/kv/messages/unread-count')->assertOk()->assertHeader('Cache-Control');
    }

    // ── permissions ─────────────────────────────────────────────────────────────────────────
    public function test_guests_and_users_without_an_approved_company_are_refused_everywhere(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $routes = [['get', '/kv/conversations'], ['get', "/kv/conversations/$id"], ['post', '/kv/conversations'], ['post', "/kv/conversations/$id/messages"],
            ['get', '/kv/messages/unread-count'], ['get', '/kv/messages/1/attachment'], ['post', '/kv/messages/1/report'], ['post', "/kv/conversations/$id/block"]];
        auth()->guard('web')->logout();
        foreach ($routes as [$m, $url]) {
            $this->json($m, $url)->assertUnauthorized();
        }
        $nobody = new User(['name' => 'No Co', 'email' => 'noco@x.test', 'password' => 'Secret-pass-1']);
        $nobody->role = 2;
        $nobody->save();
        foreach ($routes as [$m, $url]) {
            $this->actingAs($nobody)->json($m, $url)->assertForbidden()->assertJsonPath('error', 'no_company');
        }
        [$p, $cp] = $this->firm('Pending Co');
        $cp->forceFill(['status' => 'pending'])->save();
        $this->actingAs($p)->getJson('/kv/conversations')->assertForbidden();
    }

    public function test_team_members_share_the_company_inbox_and_the_owners_plan(): void
    {
        [$owner, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $sales = $this->teammate($ca, 'sales');                                // default role perms include messages
        $id = $this->startConv($owner, $cb, 'written by the owner');

        $this->actingAs($sales)->getJson('/kv/conversations')->assertOk()->assertJsonCount(1, 'items')->assertJsonPath('items.0.id', $id);
        $this->actingAs($sales)->getJson("/kv/conversations/$id")->assertOk()->assertJsonPath('messages.0.body', 'written by the owner')->assertJsonPath('messages.0.by', $owner->name);
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'reply to the company'])->assertCreated();
        // unread is per COMPANY: the teammate reading it clears it for the owner too
        $this->actingAs($owner)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 1]);
        $this->actingAs($sales)->getJson("/kv/conversations/$id")->assertOk();
        $this->actingAs($owner)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);

        // the teammate writes for the company: sender_user_id records who, and the owner's Premium lets them start new ones
        $res = $this->actingAs($sales)->postJson("/kv/conversations/$id/messages", ['body' => 'from sales'])->assertCreated();
        $this->assertSame($sales->id, Message::find($res->json('message.id'))->sender_user_id);
        [, $cc] = $this->firm('Gamma Mills');
        $this->actingAs($sales)->postJson('/kv/conversations', ['company' => $cc->slug, 'body' => 'new from sales'])->assertCreated();
        $this->assertSame($ca->id, Conversation::latest('id')->first()->started_by_company_id);
        // …and sees the same thread names for itself
        $this->actingAs($owner)->getJson("/kv/conversations/$id")->assertJsonPath('messages.2.by', $sales->name);
    }

    public function test_team_members_without_the_messages_permission_get_403(): void
    {
        [$owner, $ca] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($owner, $cb);
        $ops = $this->teammate($ca, 'ops');                                     // role default: profile + docs
        $custom = $this->teammate($ca, 'sales', ['matches']);                   // per-person override without messages
        foreach ([$ops, $custom] as $u) {
            $this->actingAs($u)->getJson('/kv/conversations')->assertForbidden()->assertJsonPath('need', 'messages');
            $this->actingAs($u)->getJson("/kv/conversations/$id")->assertForbidden();
            $this->actingAs($u)->postJson("/kv/conversations/$id/messages", ['body' => 'x'])->assertForbidden();
            $this->actingAs($u)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'x'])->assertForbidden();
            $this->actingAs($u)->getJson('/kv/messages/unread-count')->assertForbidden();
            $this->actingAs($u)->getJson("/kv/messages/can-message/{$cb->slug}")->assertForbidden();
        }
        $disabled = $this->teammate($ca, 'admin', null, 'disabled');
        $this->actingAs($disabled)->getJson('/kv/conversations')->assertForbidden();
        $this->assertSame(1, Message::count());
    }

    // ── IDOR ────────────────────────────────────────────────────────────────────────────────
    public function test_a_company_outside_the_conversation_cannot_touch_it_by_guessing_ids(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        [$c, $cc] = $this->firm('Gamma Mills', true);
        $id = $this->startConv($a, $cb, 'private');
        $msgId = Message::firstOrFail()->id;
        $this->upload($a, $id, $this->pdf())->assertCreated();
        $attId = Message::whereNotNull('attachment_path')->firstOrFail()->id;

        $this->actingAs($c)->getJson("/kv/conversations/$id")->assertNotFound();
        $this->actingAs($c)->getJson("/kv/conversations/$id?after=0")->assertNotFound();
        $this->actingAs($c)->postJson("/kv/conversations/$id/messages", ['body' => 'intruder'])->assertNotFound();
        $this->actingAs($c)->postJson("/kv/conversations/$id/archive")->assertNotFound();
        $this->actingAs($c)->postJson("/kv/conversations/$id/unarchive")->assertNotFound();
        $this->actingAs($c)->getJson("/kv/messages/$attId/attachment")->assertNotFound();
        $this->actingAs($c)->postJson("/kv/messages/$msgId/report", ['reason' => 'because'])->assertNotFound();
        $this->actingAs($c)->getJson('/kv/conversations')->assertJsonCount(0, 'items');
        $this->actingAs($c)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);
        $this->actingAs($c)->getJson('/kv/conversations/999999')->assertNotFound();
        $this->actingAs($c)->getJson('/kv/conversations/abc')->assertNotFound();
        $this->actingAs($c)->getJson('/kv/messages/999999/attachment')->assertNotFound();
        $this->assertSame(2, Message::count());
        $this->assertSame(0, MessageReport::count());
    }

    public function test_a_body_cannot_name_a_different_company_to_send_as(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        [, $cc] = $this->firm('Gamma Mills');
        $id = $this->startConv($a, $cb);
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hi', 'sender_company_id' => $cc->id, 'conversation_id' => 99, 'company_id' => $cc->id])->assertCreated();
        $this->assertSame([$ca->id, $ca->id], Message::orderBy('id')->pluck('sender_company_id')->all());
    }

    // ── attachments ─────────────────────────────────────────────────────────────────────────
    public function test_a_pdf_attachment_is_stored_privately_and_streamed_only_to_the_two_companies(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        [$c] = $this->firm('Gamma Mills');
        $id = $this->startConv($a, $cb);

        $res = $this->upload($a, $id, $this->pdf('Price list 2026.pdf'), ['body' => 'see attached'])->assertCreated();
        $res->assertJsonPath('message.att.mime', 'application/pdf')->assertJsonPath('message.att.name', 'Price list 2026.pdf')->assertJsonPath('message.att.image', false);
        $m = Message::whereNotNull('attachment_path')->firstOrFail();
        $this->assertStringStartsWith("kv/messages/$id/", $m->attachment_path);
        Storage::disk('local')->assertExists($m->attachment_path);
        Storage::disk('public')->assertMissing($m->attachment_path);
        $this->assertSame('see attached', $m->body);

        foreach ([$a, $b] as $who) {
            $dl = $this->actingAs($who)->get("/kv/messages/{$m->id}/attachment")->assertOk();
            $this->assertStringContainsString('attachment', (string) $dl->headers->get('Content-Disposition'));
            $this->assertStringContainsString('Price list 2026.pdf', (string) $dl->headers->get('Content-Disposition'));
            $this->assertSame('nosniff', $dl->headers->get('X-Content-Type-Options'));
            $this->assertSame('application/pdf', $dl->headers->get('Content-Type'));
            $this->assertStringContainsString('no-store', (string) $dl->headers->get('Cache-Control'));
        }
        $this->actingAs($c)->get("/kv/messages/{$m->id}/attachment")->assertNotFound();
        auth()->logout();
        $this->get("/kv/messages/{$m->id}/attachment", ['Accept' => 'application/json'])->assertUnauthorized();
    }

    public function test_an_attachment_only_message_is_allowed_and_previews_as_the_file_name(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $this->upload($b, $id, $this->pdf('catalogue.pdf'))->assertCreated()->assertJsonPath('message.body', '');
        $this->actingAs($a)->getJson('/kv/conversations')->assertJsonPath('items.0.preview', 'catalogue.pdf')->assertJsonPath('items.0.preview_att', true);
        // nothing at all is not a message
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", [])->assertStatus(422);
    }

    public function test_images_are_decoded_and_re_encoded_so_embedded_payloads_do_not_survive(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $png = UploadedFile::fake()->image('photo.png', 40, 30);
        $raw = file_get_contents($png->getRealPath()).'<?php system($_GET["c"]); ?>';          // payload appended after a valid image
        $file = UploadedFile::fake()->createWithContent('photo.png', $raw);

        $res = $this->upload($a, $id, $file)->assertCreated()->assertJsonPath('message.att.mime', 'image/png')->assertJsonPath('message.att.image', true)->assertJsonPath('message.att.name', 'photo.png');
        $m = Message::whereNotNull('attachment_path')->firstOrFail();
        $stored = Storage::disk('local')->get($m->attachment_path);
        $this->assertStringNotContainsString('<?php', $stored);
        $this->assertSame('image/png', (new \finfo(FILEINFO_MIME_TYPE))->buffer($stored));
        $this->assertSame(strlen($stored), $m->attachment_size);

        // the display name always matches the stored type (a .jpg that is really a png)
        $jpgNamed = UploadedFile::fake()->createWithContent('holiday.jpg', file_get_contents($png->getRealPath()));
        $this->upload($a, $id, $jpgNamed)->assertCreated()->assertJsonPath('message.att.name', 'holiday.png');
    }

    public function test_content_sniffing_rejects_fake_images_scripts_and_other_types(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $bad = [
            UploadedFile::fake()->createWithContent('photo.png', '<?php echo "pwned"; ?>'),
            UploadedFile::fake()->createWithContent('photo.jpg', 'just some text pretending to be a jpeg'),
            UploadedFile::fake()->createWithContent('doc.pdf', '<html><script>alert(1)</script></html>'),
            UploadedFile::fake()->createWithContent('image.svg', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'),
            UploadedFile::fake()->createWithContent('anim.gif', "GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;"),
            UploadedFile::fake()->createWithContent('run.exe', "MZ\x90\x00\x03\x00\x00\x00"),
            UploadedFile::fake()->createWithContent('page.html', '<!doctype html><title>x</title>'),
            UploadedFile::fake()->createWithContent('empty.pdf', ''),
        ];
        foreach ($bad as $f) {
            $this->upload($a, $id, $f)->assertStatus(422);
        }
        // a corrupt image: valid PNG header, garbage after it
        $this->upload($a, $id, UploadedFile::fake()->createWithContent('corrupt.png', "\x89PNG\r\n\x1a\n".str_repeat("\x00", 40)))->assertStatus(422);
        $this->assertSame(1, Message::count());
        $this->assertSame([], Storage::disk('local')->allFiles("kv/messages/$id"), 'refused files leave nothing behind');
    }

    public function test_attachment_size_limit_and_rules_checked_before_the_file_is_kept(): void
    {
        config(['kervea.messaging.max_attachment_kb' => 10]);
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $this->upload($a, $id, UploadedFile::fake()->createWithContent('big.pdf', "%PDF-1.4\n".str_repeat('x', 11 * 1024)))->assertStatus(422);
        $this->upload($a, $id, UploadedFile::fake()->createWithContent('ok.pdf', "%PDF-1.4\n".str_repeat('x', 8 * 1024)))->assertCreated();

        \App\Models\Kv\MessageBlock::create(['company_id' => $cb->id, 'blocked_company_id' => $ca->id]);
        $this->upload($a, $id, $this->pdf())->assertForbidden();
        $this->assertCount(1, Storage::disk('local')->allFiles("kv/messages/$id"));
    }

    // ── escaping ────────────────────────────────────────────────────────────────────────────
    public function test_html_in_messages_is_stored_as_plain_text_and_html_in_names_is_returned_raw_for_escaping(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $cb->forceFill(['name' => '<img src=x onerror=alert(1)>Beta & "Sons"'])->save();
        $ca->forceFill(['name' => '<script>alert("co")</script>Alpha'])->save();
        $id = $this->startConv($a, $cb, '<script>alert(1)</script>Hello <b>bold</b> <img src=x onerror=alert(2)> 5 < 6 and 7 > 3 & done');

        $m = Message::firstOrFail();
        $this->assertStringNotContainsString('<script', $m->body);
        $this->assertStringNotContainsString('<b>', $m->body);
        $this->assertStringNotContainsString('onerror', $m->body);
        $this->assertStringContainsString('5 < 6 and 7 > 3 & done', $m->body, 'ordinary text with < and > survives');
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => '"quotes" & <i>italics</i>'])->assertCreated()->assertJsonPath('message.body', '"quotes" & italics');

        // the API is JSON data: names come back untouched and the front end escapes them (see kv-messages.js)
        $list = $this->actingAs($b)->getJson('/kv/conversations')->assertOk();
        $this->assertSame('<script>alert("co")</script>Alpha', $list->json('items.0.company.name'));
        $this->assertStringNotContainsString('<script', $list->json('items.0.preview'));
        $this->assertStringContainsString('application/json', (string) $list->headers->get('Content-Type'));
    }

    // ── report ──────────────────────────────────────────────────────────────────────────────
    public function test_a_report_is_recorded_once_per_company_and_only_for_the_other_sides_messages(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, 'buy my crypto');
        $mid = Message::firstOrFail()->id;

        $this->actingAs($a)->postJson("/kv/messages/$mid/report", ['reason' => 'my own message'])->assertStatus(422);       // not own messages
        $this->actingAs($b)->postJson("/kv/messages/$mid/report", ['reason' => 'x'])->assertStatus(422);                       // too short
        $this->actingAs($b)->postJson("/kv/messages/$mid/report", ['reason' => 'spam', 'category' => 'weird'])->assertStatus(422);
        $this->actingAs($b)->postJson("/kv/messages/$mid/report", ['reason' => 'It is spam <b>x</b>', 'category' => 'spam'])->assertOk()->assertJsonPath('already', false);
        $this->actingAs($b)->postJson("/kv/messages/$mid/report", ['reason' => 'It is spam again'])->assertOk()->assertJsonPath('already', true);
        $this->assertSame(1, MessageReport::count());
        $r = MessageReport::firstOrFail();
        $this->assertSame('open', $r->status);
        $this->assertSame($cb->id, $r->reporter_company_id);
        $this->assertSame($b->id, $r->reporter_user_id);
        $this->assertSame('spam', $r->category);
        $this->assertSame('It is spam x', $r->reason);
        $this->actingAs($b)->getJson("/kv/conversations/$id")->assertJsonPath('messages.0.reported', true);
    }

    // ── notification e-mail ─────────────────────────────────────────────────────────────────
    public function test_the_notification_mail_has_no_message_text_or_contact_data_and_is_sent_at_most_every_30_minutes(): void
    {
        Mail::fake();
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, 'TOP-SECRET-PRICE 12345 call me on +49 1234');
        Mail::assertSent(KvMail::class, 1);
        Mail::assertSent(KvMail::class, function (KvMail $m) use ($cb) {
            $html = $m->render();
            $this->assertTrue($m->hasTo($cb->email));
            $this->assertSame('new_message', $m->template);
            $this->assertStringContainsString('Yeni mesajınız var', $html);
            $this->assertStringContainsString('Alpha Textile', $html);
            $this->assertStringContainsString('/panel?tab=messages', $html);
            foreach (['TOP-SECRET', '12345', '+49', 'alpha@firm.test', 'alphatextile@firm.test'] as $forbidden) {
                $this->assertStringNotContainsString($forbidden, $html);
            }
            return true;
        });

        // more messages inside the window: no second mail
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'one more'])->assertCreated();
        $this->travel(29)->minutes();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'and another'])->assertCreated();
        Mail::assertSent(KvMail::class, 1);
        // the other direction has its own window
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'reply'])->assertCreated();
        Mail::assertSent(KvMail::class, 2);
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'reply 2'])->assertCreated();
        Mail::assertSent(KvMail::class, 2);
        // after 30 minutes the next message notifies again
        $this->travel(2)->minutes();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'late message'])->assertCreated();
        Mail::assertSent(KvMail::class, 3);
    }

    public function test_the_notification_goes_to_the_company_and_to_team_members_who_may_read_messages(): void
    {
        Mail::fake();
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $sales = $this->teammate($cb, 'sales');
        $ops = $this->teammate($cb, 'ops');
        $this->startConv($a, $cb);
        Mail::assertSent(KvMail::class, fn (KvMail $m) => $m->hasTo($cb->email));
        Mail::assertSent(KvMail::class, fn (KvMail $m) => $m->hasTo($sales->email));
        Mail::assertNotSent(KvMail::class, fn (KvMail $m) => $m->hasTo($ops->email));
    }

    public function test_a_failing_mailer_never_breaks_sending(): void
    {
        Mail::shouldReceive('to')->andThrow(new \RuntimeException('smtp down'));
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi'])->assertCreated();
        $this->assertSame(1, Message::count());
    }
}
