<?php

namespace Tests\Feature\Kv;

class RoutesTest extends KvTestCase
{
    public function test_english_urls_serve_the_kervea_shell_with_the_right_view(): void
    {
        foreach (['/' => 'home', '/login' => 'login', '/add-company' => 'add', '/pricing' => 'pricing', '/about' => 'about', '/contact' => 'contact', '/panel' => 'panel'] as $url => $view) {
            $res = $this->get($url)->assertOk();
            $this->assertStringContainsString('"view":"'.$view.'"', $res->getContent(), $url);
            $this->assertStringContainsString('id="kvLoginEmail"', $res->getContent());      // same single-page shell everywhere
        }
        $res = $this->get('/company/some-firm')->assertOk();
        $this->assertStringContainsString('"view":"firm"', $res->getContent());
        $this->assertStringContainsString('"firm":"some-firm"', $res->getContent());
    }

    public function test_old_turkish_urls_redirect_permanently_and_keep_the_query_string(): void
    {
        $this->get('/giris')->assertStatus(301)->assertRedirect('/login');
        $this->get('/firma-ekle')->assertStatus(301)->assertRedirect('/add-company');
        $this->get('/fiyatlar?cancelled=1')->assertStatus(301)->assertRedirect('/pricing?cancelled=1');
        $loc = $this->get('/sifre-belirle?token=abc&email=a%40b.test')->assertStatus(301)->headers->get('Location');
        $this->assertStringStartsWith(url('/set-password?'), $loc);
        parse_str(parse_url($loc, PHP_URL_QUERY), $q);
        $this->assertEquals(['token' => 'abc', 'email' => 'a@b.test'], $q);
        $this->get('/firma/ege-tekstil')->assertStatus(301)->assertRedirect('/company/ege-tekstil');
    }

    public function test_guests_are_sent_to_the_kervea_login_and_framework_login_route_points_there(): void
    {
        $this->assertSame(url('/login'), route('login'));
        $this->get('/admin/kervea/applications')->assertRedirect('/login');
        $this->get('/register')->assertRedirect('/add-company');
    }

    public function test_the_set_password_page_exists_and_is_not_indexed(): void
    {
        $this->get('/set-password?token=t&email=a@b.test')->assertOk()->assertSee('noindex', false);
    }
}
