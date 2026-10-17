<?php

namespace Tests\Feature\Kv;

/**
 * The public single-page shell: server-rendered head, boot data, site details from config and no placeholder leaks.
 */
class PublicShellTest extends KvTestCase
{
    public function test_home_renders_without_placeholder_leaks_or_unverifiable_claims_in_the_head(): void
    {
        $html = $this->get('/')->assertOk()->getContent();

        $this->assertStringNotContainsString('__raw_block', $html);   // nested @verbatim used to leak this into the page
        $this->assertStringNotContainsString('__KV_BASE__', $html);
        $this->assertStringNotContainsString('__KV_PRICE__', $html);

        $head = substr($html, 0, strpos($html, '</head>'));
        foreach (['Trademap', 'numberOfEmployees', 'foundingDate', 'sameAs', 'AI asistan', '"price": "1000"'] as $bad) {
            $this->assertStringNotContainsString($bad, $head, "head must not contain: {$bad}");
        }
    }

    public function test_the_premium_price_in_meta_and_boot_data_comes_from_server_config(): void
    {
        config(['kervea.premium.price_usd' => 245]);
        $html = $this->get('/pricing')->assertOk()->getContent();

        $this->assertStringContainsString('Premium 245 USD/yıl', $html);       // meta description
        $this->assertStringContainsString('yıllıktır (245 USD)', $html);        // FAQ structured data
        $this->assertMatchesRegularExpression('/"premium":245\b/', $html);      // KV_BOOT, read by the pricing card
        $this->assertStringNotContainsString('280', substr($html, 0, strpos($html, '</head>')));
    }

    public function test_the_payment_window_asks_for_no_card_data_and_invents_no_tax_or_refund_terms(): void
    {
        $html = $this->get('/')->getContent();
        $a = strpos($html, 'id="mPay"');
        $pay = substr($html, $a, strpos($html, 'id="mGate"') - $a);

        $this->assertStringContainsString('id="kvPayConfirmBtn"', $pay);
        foreach (['kvCcNumber', 'kvCcCvc', 'ccPreview', 'KDV', '14 gün', 'PCI-DSS', 'Visa'] as $bad) {
            $this->assertStringNotContainsString($bad, $pay, "payment window must not contain: {$bad}");
        }
        // amounts are filled from the server price (KV_BOOT.premium), never typed into the markup
        $this->assertDoesNotMatchRegularExpression('/\$\d{3}\.\d\d/', $pay);
    }

    public function test_site_details_are_exposed_only_when_configured(): void
    {
        config(['kervea.frontend.address' => null, 'kervea.frontend.legal_name' => null, 'kervea.frontend.links' => ['linkedin' => null, 'x' => null, 'youtube' => null, 'instagram' => null]]);
        $html = $this->get('/')->getContent();
        $this->assertMatchesRegularExpression('/window\.KV_SITE = (\{.*?\});<\/script>/', $html);
        preg_match('/window\.KV_SITE = (\{.*?\});<\/script>/', $html, $m);
        $site = json_decode($m[1], true);
        $this->assertSame('hello@kervea.ai', $site['contact_email']);
        $this->assertArrayNotHasKey('address', $site);
        $this->assertArrayNotHasKey('legal_name', $site);

        config(['kervea.frontend.address' => 'Örnek Cad. 1, İstanbul', 'kervea.frontend.links.linkedin' => 'https://www.linkedin.com/company/example']);
        $html = $this->get('/')->getContent();
        preg_match('/window\.KV_SITE = (\{.*?\});<\/script>/', $html, $m);
        $site = json_decode($m[1], true);
        $this->assertSame('Örnek Cad. 1, İstanbul', $site['address']);
        $this->assertSame('https://www.linkedin.com/company/example', $site['links']['linkedin']);
    }

    public function test_site_details_never_contain_secrets(): void
    {
        config(['kervea.stripe.secret' => 'sk_test_SECRET', 'kervea.social.google.client_secret' => 'google-SECRET']);
        $html = $this->get('/')->getContent();
        $this->assertStringNotContainsString('sk_test_SECRET', $html);
        $this->assertStringNotContainsString('google-SECRET', $html);
    }

    public function test_every_public_address_serves_the_shell(): void
    {
        foreach (['/', '/about', '/pricing', '/contact', '/add-company', '/login'] as $path) {
            $this->get($path)->assertOk()->assertSee('id="kvNlForm"', false)->assertSee('id="dp-overview"', false);
        }
    }

    public function test_the_panel_markup_carries_no_sample_company_data(): void
    {
        $html = $this->get('/panel')->getContent();
        foreach (['Kervea Ticaret A.Ş.', 'Emrah Yılmaz', 'info@kervea.io', '94%', 'Ticaret Sicil Gazetesi', 'Pilot dönem'] as $fake) {
            $this->assertStringNotContainsString($fake, $this->panelSection($html), "panel must not contain sample data: {$fake}");
        }
    }

    /** Only the overview, profile and documents tabs belong to this front-end part (the others are other features'). */
    private function panelSection(string $html): string
    {
        $a = strpos($html, 'id="dp-overview"');
        $b = strpos($html, 'id="dp-messages"');
        $c = strpos($html, 'id="dp-docs"');
        $d = strpos($html, 'id="dp-team"');

        return substr($html, $a, $b - $a).substr($html, $c, $d - $c);
    }
}
