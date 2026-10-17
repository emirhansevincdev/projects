<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\NewsletterSubscriber;

/** Small correctness fixes. */
class PolishFixesTest extends KvTestCase
{
    public function test_every_page_names_its_own_canonical_and_og_url_and_no_dead_language_alternates(): void
    {
        $base = rtrim(config('app.url'), '/');
        $home = $this->get('/')->assertOk()->getContent();
        $this->assertStringContainsString('<link rel="canonical" href="'.$base.'/">', $home);
        $this->assertStringNotContainsString('hreflang', $home);                // /en, /es … do not exist: the language switches in the browser

        $pricing = $this->get('/pricing')->assertOk()->getContent();
        $this->assertStringContainsString('<link rel="canonical" href="'.$base.'/pricing">', $pricing);
        $this->assertStringContainsString('<meta property="og:url" content="'.$base.'/pricing">', $pricing);

        $firm = $this->get('/company/ege-tekstil')->getContent();
        $this->assertStringContainsString('<link rel="canonical" href="'.$base.'/company/ege-tekstil">', $firm);
    }

    public function test_the_meta_csp_does_not_carry_directives_browsers_ignore_in_a_meta_tag(): void
    {
        foreach (['/', '/privacy'] as $url) {
            $html = $this->get($url)->assertOk()->getContent();
            $this->assertMatchesRegularExpression('/<meta http-equiv="Content-Security-Policy"/', $html, $url);
            $this->assertStringNotContainsString('frame-ancestors', $html, $url);     // X-Frame-Options: DENY (response header) already covers it
        }
    }

    public function test_admin_menu_links_to_the_newsletter_page_and_lists_page_with_a_small_pager(): void
    {
        foreach (range(1, 60) as $i) {
            NewsletterSubscriber::create(['email' => "n$i@example.org", 'consented_at' => now(), 'confirmed_at' => now()]);
        }
        $res = $this->actingAs($this->admin())->get('/admin/kervea/newsletter')->assertOk();
        $res->assertSee(route('admin.kervea.newsletter'), false);                  // menu entry
        $res->assertSee('class="kv-pg"', false);                                    // the admin's own pager ...
        $this->assertStringNotContainsString('<svg', $res->getContent());          // ... not the framework's Tailwind one with giant chevrons
    }

    public function test_an_existing_firm_page_is_200_and_an_unknown_one_is_404(): void
    {
        [, $c] = $this->member('Ege Tekstil', 'ege@example.test');
        $this->get('/company/'.$c->slug)->assertOk();
        $this->get('/company/no-such-firm-xyz')->assertNotFound()->assertSee('id="kvLoginEmail"', false);
    }

    public function test_security_headers_and_branded_page_also_on_framework_errors(): void
    {
        $this->get('/no-such-page-xyz')->assertNotFound()->assertHeader('X-Frame-Options', 'DENY')->assertHeader('X-Content-Type-Options', 'nosniff');
        $this->post('/privacy')->assertStatus(405)->assertSee('Kervea');           // wrong method on a page: the branded 405, not the framework default
    }

    public function test_developer_comments_do_not_reach_the_browser_and_the_structured_data_logo_exists(): void
    {
        $html = $this->get('/')->getContent();
        $leaking = array_filter(explode("\n", $html), fn ($l) => str_contains($l, '<!--') && preg_match('/kv-[a-z]+\.js|kervea-api\.js|GET \/kv\//', $l));
        $this->assertSame([], array_values($leaking), 'comments naming internal files must be Blade comments');
        preg_match('/"logo": "([^"]+)"/', $html, $m);
        $this->assertNotEmpty($m);
        $this->assertFileExists(public_path(parse_url($m[1], PHP_URL_PATH)));
    }
}
