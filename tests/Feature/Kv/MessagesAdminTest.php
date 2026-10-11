<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Message;
use App\Models\Kv\MessageReport;
use App\Models\User;
use Illuminate\Http\UploadedFile;

/** Admin moderation: reports inbox, context window, actions. */
class MessagesAdminTest extends MessagesTestCase
{
    /** A (Premium) writes to B, B reports A's message. Returns [admin, A user, A company, B user, B company, conversation id, report]. */
    private function reported(string $body = 'buy my crypto <script>alert(1)</script>'): array
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, $body);
        $mid = Message::firstOrFail()->id;
        $this->actingAs($b)->postJson("/kv/messages/$mid/report", ['reason' => 'Looks like a scam', 'category' => 'fraud'])->assertOk();
        return [$this->admin(), $a, $ca, $b, $cb, $id, MessageReport::firstOrFail()];
    }

    public function test_only_administrators_reach_the_moderation_pages(): void
    {
        [, $a, , $b, , , $report] = $this->reported();
        auth()->guard('web')->logout();
        $this->get('/admin/kervea/messages/reports')->assertRedirect();
        foreach ([$a, $b] as $member) {
            $this->actingAs($member)->get('/admin/kervea/messages/reports')->assertRedirect('/');
            $this->actingAs($member)->get("/admin/kervea/messages/reports/{$report->id}")->assertRedirect('/');
            $this->actingAs($member)->post("/admin/kervea/messages/reports/{$report->id}/dismiss")->assertRedirect('/');
            $this->actingAs($member)->post("/admin/kervea/messages/reports/{$report->id}/suspend")->assertRedirect('/');
        }
        $this->assertSame('open', $report->fresh()->status);
    }

    public function test_the_inbox_lists_reports_with_counts_per_status_and_escapes_everything(): void
    {
        [$admin, , $ca, , $cb] = $this->reported();
        $ca->forceFill(['name' => '<img src=x onerror=alert(9)>Alpha'])->save();
        $page = $this->actingAs($admin)->get('/admin/kervea/messages/reports')->assertOk();
        $page->assertSee('Mesaj şikayetleri')->assertSee('Açık (1)', false)->assertSee('İncelendi (0)', false)->assertSee('Reddedildi (0)', false)
            ->assertSee('Beta Fabrics')->assertSee('Looks like a scam')->assertSee('Dolandırıcılık');
        $page->assertDontSee('<img src=x onerror=alert(9)>', false)->assertSee('&lt;img src=x onerror=alert(9)&gt;Alpha', false);
        $this->actingAs($admin)->get('/admin/kervea/messages/reports?status=dismissed')->assertOk()->assertSee('Bu durumda şikayet yok.');
        $this->actingAs($admin)->get('/admin/kervea/messages/reports?status=bogus')->assertOk()->assertSee('Looks like a scam');       // unknown filter falls back to "open"
        // the side menu shows the open count
        $this->actingAs($admin)->get('/admin/kervea/companies')->assertOk()->assertSee('Mesaj Şikayetleri', false);
    }

    public function test_a_report_shows_the_reported_message_with_its_surroundings_escaped(): void
    {
        [$admin, $a, , $b, , $id, $report] = $this->reported('first message <b>bold</b> <script>alert(1)</script>');
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'reply after'])->assertCreated();
        $page = $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}")->assertOk();
        $page->assertSee('ŞİKAYET EDİLEN')->assertSee('Looks like a scam')->assertSee('Alpha Textile')->assertSee('reply after')->assertSee('bold');
        $page->assertDontSee('<script>alert(1)</script>', false);
        $this->actingAs($admin)->get('/admin/kervea/messages/reports/99999')->assertNotFound();
    }

    public function test_the_suspend_button_shows_only_while_the_sender_is_approved(): void
    {
        [$admin, , $ca, , , , $report] = $this->reported();
        $url = "/admin/kervea/messages/reports/{$report->id}";
        $this->actingAs($admin)->get($url)->assertOk()->assertSee('Gönderen firmayı askıya al')->assertSee('approved');
        $ca->forceFill(['status' => Company::STATUS_SUSPENDED])->save();
        $this->actingAs($admin)->get($url)->assertOk()->assertDontSee('Gönderen firmayı askıya al')->assertSee('suspended');
    }

    public function test_there_is_no_way_to_browse_arbitrary_conversations(): void
    {
        [$admin, , , , , $id] = $this->reported();
        foreach (['/admin/kervea/messages', '/admin/kervea/messages/conversations', "/admin/kervea/messages/conversations/$id", "/admin/kervea/conversations/$id", "/kv/conversations/$id"] as $url) {
            $this->actingAs($admin)->getJson($url)->assertStatus(in_array($url, ['/kv/conversations/'.$id], true) ? 403 : 404);
        }
    }

    public function test_the_context_window_is_limited_and_attachments_open_only_through_the_report(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, 'msg 0');
        $pdf = fn () => UploadedFile::fake()->createWithContent('contract.pdf', "%PDF-1.4\n1 0 obj<<>>endobj\n%%EOF");
        $this->actingAs($a)->post("/kv/conversations/$id/messages", ['attachment' => $pdf(), 'body' => 'early attachment'], ['Accept' => 'application/json'])->assertCreated();
        $earlyAtt = Message::whereNotNull('attachment_path')->firstOrFail();
        for ($i = 1; $i <= 12; $i++) {
            $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => "filler $i"])->assertCreated();
        }
        $this->actingAs($a)->post("/kv/conversations/$id/messages", ['attachment' => $pdf(), 'body' => 'the reported one'], ['Accept' => 'application/json'])->assertCreated();
        $reportedMsg = Message::where('body', 'the reported one')->firstOrFail();
        for ($i = 1; $i <= 8; $i++) {
            $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => "later $i"])->assertCreated();
        }
        $this->actingAs($b)->postJson("/kv/messages/{$reportedMsg->id}/report", ['reason' => 'illegal contract'])->assertOk();
        $report = MessageReport::firstOrFail();
        $admin = $this->admin();

        $page = $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}")->assertOk();
        $page->assertSee('the reported one')->assertSee('filler 12')->assertSee('filler 5')->assertSee('later 4')
            ->assertDontSee('filler 4<', false)->assertDontSee('later 5')->assertDontSee('msg 0')->assertDontSee('early attachment');

        $dl = $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}/attachment/{$reportedMsg->id}")->assertOk();
        $this->assertStringContainsString('attachment', (string) $dl->headers->get('Content-Disposition'));
        $this->assertSame('nosniff', $dl->headers->get('X-Content-Type-Options'));
        // an attachment outside the window stays private even though it is the same conversation
        $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}/attachment/{$earlyAtt->id}")->assertNotFound();
        $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}/attachment/999999")->assertNotFound();
        // messages of another conversation are not reachable through this report
        [$c, $cc] = $this->firm('Gamma Mills', true);
        $this->startConv($c, $cb, 'other conversation');
        $other = Message::where('body', 'other conversation')->firstOrFail();
        $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}/attachment/{$other->id}")->assertNotFound();
    }

    public function test_dismiss_and_reviewed_record_who_handled_the_report(): void
    {
        [$admin, , , , , , $report] = $this->reported();
        $this->actingAs($admin)->post("/admin/kervea/messages/reports/{$report->id}/reviewed")->assertRedirect(route('admin.kervea.messages.report', $report));
        $report = $report->fresh();
        $this->assertSame('reviewed', $report->status);
        $this->assertSame($admin->id, $report->handled_by);
        $this->assertNotNull($report->handled_at);
        $this->actingAs($admin)->get('/admin/kervea/messages/reports?status=reviewed')->assertSee('Looks like a scam');

        $this->actingAs($admin)->post("/admin/kervea/messages/reports/{$report->id}/dismiss")->assertRedirect();
        $this->assertSame('dismissed', $report->fresh()->status);
        $this->actingAs($admin)->get("/admin/kervea/messages/reports/{$report->id}")->assertOk()->assertSee('Reddedildi');
    }

    public function test_suspending_the_sender_uses_the_company_status_path_and_locks_it_out(): void
    {
        [$admin, $a, $ca, $b, $cb, $id, $report] = $this->reported();
        $this->actingAs($admin)->post("/admin/kervea/messages/reports/{$report->id}/suspend", ['status' => 'approved', 'company' => $cb->id])->assertRedirect();   // body input is ignored
        $this->assertSame(Company::STATUS_SUSPENDED, $ca->fresh()->status, 'the company that SENT the message is suspended');
        $this->assertSame(Company::STATUS_APPROVED, $cb->fresh()->status, 'the reporter is untouched');
        $report = $report->fresh();
        $this->assertSame('reviewed', $report->status);
        $this->assertSame($admin->id, $report->handled_by);

        // the suspended sender is out of the messaging area; the other side can no longer write to it
        $this->actingAs($a)->getJson('/kv/conversations')->assertForbidden()->assertJsonPath('error', 'no_company');
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'hello?'])->assertForbidden()->assertJsonPath('error', 'unavailable');
        // a second suspend is harmless (button is hidden once suspended, the route is still safe)
        $this->actingAs($admin)->post("/admin/kervea/messages/reports/{$report->id}/suspend")->assertRedirect();
    }
}
