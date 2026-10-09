<?php

namespace Tests\Feature\Kv;

/** Google/LinkedIn want real public URLs for the privacy policy and terms; the footer pop-ups keep working for visitors. */
class LegalPagesTest extends KvTestCase
{
    public function test_privacy_terms_and_kvkk_are_public_pages_with_the_policy_text(): void
    {
        $this->get('/privacy')->assertOk()->assertSee('Gizlilik ve Çerez Politikası', false)->assertSee('Zorunlu çerezler', false)
            ->assertSee('Google ve LinkedIn ile Giriş', false)->assertSee('yeni üyelik oluşturulmaz', false);
        $this->get('/terms')->assertOk()->assertSee('Üyelik Sözleşmesi', false)->assertSee('MADDE 11', false);
        $this->get('/kvkk')->assertOk()->assertSee('KVKK Aydınlatma Metni', false)->assertSee('6698 sayılı', false);
    }

    public function test_pages_are_standalone_and_script_free_and_not_served_by_the_legacy_template(): void
    {
        $html = $this->get('/privacy')->getContent();
        $this->assertStringContainsString("script-src 'none'", $html);
        $this->assertStringNotContainsString('<script', $html);
        $this->assertStringNotContainsString('KV_BOOT', $html);
        $this->assertStringContainsString('<link rel="canonical"', $html);
        $this->get('/privacy-policy')->assertNotFound();                  // legacy template URLs stay closed
    }

    public function test_footer_links_have_real_urls_and_still_open_the_pop_ups(): void
    {
        $html = $this->get('/')->getContent();
        foreach ([['/kvkk', 'kvkk'], ['/terms', 'sozl'], ['/privacy', 'cookie']] as [$href, $modal]) {
            $this->assertStringContainsString('<a href="'.$href.'" onclick="openM(\''.$modal.'\');return false"', $html);
        }
        // the pop-ups themselves still carry the same text
        $this->assertStringContainsString('id="mKvkk"', $html);
        $this->assertStringContainsString('6698 sayılı', $html);
        $this->assertStringContainsString('Google ve LinkedIn ile Giriş', $html);
    }
}
