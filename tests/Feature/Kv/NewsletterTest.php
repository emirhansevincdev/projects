<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\NewsletterSubscriber;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

class NewsletterTest extends KvTestCase
{
    private function sub(array $over = [], array $headers = [])
    {
        return $this->withHeaders($headers)->postJson('/kv/newsletter', $over + ['email' => 'ayse@example.com', 'consent' => true, 'locale' => 'tr']);
    }

    public function test_guest_can_subscribe_and_the_consent_proof_is_stored(): void
    {
        $this->sub([], ['User-Agent' => 'KvTestBrowser/1.0'])->assertOk()->assertExactJson(['ok' => true]);

        $row = NewsletterSubscriber::firstOrFail();
        $this->assertSame('ayse@example.com', $row->email);
        $this->assertSame('tr', $row->locale);
        $this->assertNotNull($row->consented_at);
        $this->assertSame('127.0.0.1', $row->consent_ip);
        $this->assertSame('KvTestBrowser/1.0', $row->consent_user_agent);
        $this->assertNull($row->unsubscribed_at);
    }

    public function test_address_is_normalised_and_signing_up_twice_is_idempotent_without_overwriting_the_first_proof(): void
    {
        $this->sub(['email' => '  Ayse@Example.COM '], ['User-Agent' => 'first'])->assertOk();
        $first = NewsletterSubscriber::firstOrFail();
        $this->travel(2)->days();
        $this->sub(['email' => 'ayse@example.com', 'locale' => 'en'], ['User-Agent' => 'second'])->assertOk()->assertExactJson(['ok' => true]);

        $this->assertSame(1, NewsletterSubscriber::count());
        $row = NewsletterSubscriber::firstOrFail();
        $this->assertSame('ayse@example.com', $row->email);
        $this->assertSame('first', $row->consent_user_agent);                           // proof is write-once
        $this->assertSame('tr', $row->locale);
        $this->assertTrue($row->consented_at->equalTo($first->consented_at));
    }

    public function test_known_and_new_addresses_get_the_same_answer_so_the_list_cannot_be_probed(): void
    {
        $a = $this->sub(['email' => 'one@example.com']);
        $b = $this->sub(['email' => 'one@example.com']);
        $this->assertSame($a->getContent(), $b->getContent());
        $this->assertSame($a->status(), $b->status());
    }

    public function test_someone_who_left_can_sign_up_again_with_fresh_proof(): void
    {
        $this->sub([], ['User-Agent' => 'old'])->assertOk();
        NewsletterSubscriber::firstOrFail()->forceFill(['unsubscribed_at' => now()->subDay()])->save();

        $this->sub([], ['User-Agent' => 'new'])->assertOk();
        $row = NewsletterSubscriber::firstOrFail();
        $this->assertNull($row->unsubscribed_at);
        $this->assertSame('new', $row->consent_user_agent);
        $this->assertSame(1, NewsletterSubscriber::count());
    }

    public function test_invalid_input_is_rejected_with_validation_errors(): void
    {
        $this->sub(['email' => 'not-an-email'])->assertStatus(422)->assertJsonValidationErrors('email');
        $this->sub(['email' => ''])->assertStatus(422)->assertJsonValidationErrors('email');
        $this->sub(['email' => str_repeat('a', 250).'@example.com'])->assertStatus(422)->assertJsonValidationErrors('email');
        $this->sub(['email' => ['x@example.com']])->assertStatus(422);
        $this->sub(['locale' => 'xx'])->assertStatus(422)->assertJsonValidationErrors('locale');
        $this->assertSame(0, NewsletterSubscriber::count());
    }

    public function test_the_consent_checkbox_is_mandatory(): void
    {
        $this->postJson('/kv/newsletter', ['email' => 'a@example.com'])->assertStatus(422)->assertJsonValidationErrors('consent');
        $this->postJson('/kv/newsletter', ['email' => 'a@example.com', 'consent' => false])->assertStatus(422)->assertJsonValidationErrors('consent');
        $this->assertSame(0, NewsletterSubscriber::count());
    }

    public function test_honeypot_answers_ok_but_stores_nothing(): void
    {
        $this->sub(['website' => 'http://spam.example'])->assertOk()->assertExactJson(['ok' => true]);
        $this->assertSame(0, NewsletterSubscriber::count());
    }

    public function test_endpoint_is_throttled_with_its_own_bucket(): void
    {
        RateLimiter::clear('kv-newsletter');
        for ($i = 1; $i <= 5; $i++) {
            $this->sub(['email' => "n$i@example.com"])->assertOk();
        }
        $this->sub(['email' => 'n6@example.com'])->assertStatus(429);
        $this->assertSame(5, NewsletterSubscriber::count());
    }

    public function test_html_in_the_user_agent_cannot_break_the_admin_page(): void
    {
        $this->sub([], ['User-Agent' => '<script>alert(1)</script>'])->assertOk();
        $html = $this->actingAs($this->admin())->get('/admin/kervea/newsletter')->assertOk()->getContent();
        $this->assertStringNotContainsString('<script>alert(1)</script>', $html);
    }

    // ── admin list + CSV ────────────────────────────────────────────────────

    public function test_admin_pages_are_closed_to_guests_and_to_non_admins(): void
    {
        $this->sub()->assertOk();
        $row = NewsletterSubscriber::firstOrFail();

        $this->get('/admin/kervea/newsletter')->assertRedirect();
        $this->get('/admin/kervea/newsletter/export')->assertRedirect();
        $this->delete("/admin/kervea/newsletter/{$row->id}")->assertRedirect();

        [$member] = $this->member('Acme', 'acme@x.test');
        $this->actingAs($member);
        $this->get('/admin/kervea/newsletter')->assertRedirect('/');
        $this->get('/admin/kervea/newsletter/export')->assertRedirect('/');
        $this->delete("/admin/kervea/newsletter/{$row->id}")->assertRedirect('/');
        $this->assertSame(1, NewsletterSubscriber::count());
    }

    public function test_admin_sees_the_list_and_can_search_and_delete(): void
    {
        $this->sub(['email' => 'alpha@example.com'])->assertOk();
        $this->sub(['email' => 'beta@example.com'])->assertOk();
        $admin = $this->admin();

        $this->actingAs($admin)->get('/admin/kervea/newsletter')->assertOk()->assertSee('alpha@example.com')->assertSee('beta@example.com');
        $this->get('/admin/kervea/newsletter?q=alph')->assertOk()->assertSee('alpha@example.com')->assertDontSee('beta@example.com');
        $this->get('/admin/kervea/newsletter?q=%25')->assertOk()->assertDontSee('alpha@example.com');     // "%" is not a wildcard

        $row = NewsletterSubscriber::where('email', 'alpha@example.com')->firstOrFail();
        $this->delete("/admin/kervea/newsletter/{$row->id}")->assertRedirect();
        $this->assertNull(NewsletterSubscriber::where('email', 'alpha@example.com')->first());
        $this->assertNotNull(NewsletterSubscriber::where('email', 'beta@example.com')->first());
    }

    public function test_csv_export_contains_active_subscribers_with_proof_and_neutralises_formulas(): void
    {
        $this->sub(['email' => 'alpha@example.com', 'locale' => 'en'], ['User-Agent' => '=HYPERLINK("http://evil")'])->assertOk();
        $this->sub(['email' => 'gone@example.com'])->assertOk();
        NewsletterSubscriber::where('email', 'gone@example.com')->update(['unsubscribed_at' => now()]);

        $res = $this->actingAs($this->admin())->get('/admin/kervea/newsletter/export')->assertOk();
        $this->assertStringContainsString('text/csv', $res->headers->get('Content-Type'));
        $this->assertStringContainsString('attachment', $res->headers->get('Content-Disposition'));
        $csv = $res->getContent();
        $this->assertStringStartsWith("\xEF\xBB\xBF", $csv);
        $this->assertStringContainsString('alpha@example.com', $csv);
        $this->assertStringContainsString('127.0.0.1', $csv);
        $this->assertStringNotContainsString('gone@example.com', $csv);                       // unsubscribed addresses are not exported
        $this->assertStringContainsString("'=HYPERLINK", $csv);                                // formula injection neutralised
        $this->assertStringNotContainsString(',=HYPERLINK', $csv);
    }
}
