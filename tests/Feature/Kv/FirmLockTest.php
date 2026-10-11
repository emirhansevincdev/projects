<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Reveal;
use App\Models\Kv\Sector;
use App\Services\Kv\FirmPresenter;

/**
 * C1 premium lock + C2 sector scoping. The JSON bodies are checked for the actual secret strings, not just for flags.
 */
class FirmLockTest extends CreditsTestCase
{
    /** Every string that must never reach a guest / free member (nor appear in the DOM). */
    private const SECRETS = [
        'Zeynep Karaca', 'Satın Alma Direktörü', 'zeynep.karaca@locktest.example', 'info@locktest.example', '+90 532 111 22 33',
        'locktest-secret.example', 'Gizli Sokak No 7', 'linkedin.com/company/locktest-secret', 'youtube.com/@locktestsecret', '905321112233',
    ];

    /** The firm whose data we try to read. Created first (lowest id) so it sorts LAST and is a locked card for non-Premium viewers. */
    private function secretFirm(array $over = []): Company
    {
        [, $c] = $this->member('Lock Test Tekstil', 'info@locktest.example', $over + [
            'rep_name' => 'Zeynep Karaca', 'rep_title' => 'Satın Alma Direktörü', 'rep_email' => 'zeynep.karaca@locktest.example',
            'phone' => '+90 532 111 22 33', 'website' => 'https://www.locktest-secret.example', 'address' => 'Gizli Sokak No 7 Kadıköy',
            'social' => ['li' => 'linkedin.com/company/locktest-secret', 'yt' => 'youtube.com/@locktestsecret', 'wa' => '905321112233'],
            'products' => 'pamuklu kumaş', 'direction' => 'EXP',
        ]);
        $this->consent($c, 'contact_visibility');
        return $c;
    }

    private function fillers(int $n, int $sectorIdx = 10): void
    {
        for ($i = 1; $i <= $n; $i++) {
            $this->member("Dolgu Firma $i", "dolgu$i@x.test", ['sector_id' => $this->sec($sectorIdx)]);
        }
    }

    private function assertNoSecrets(string $body, string $who): void
    {
        foreach (self::SECRETS as $s) {
            $this->assertStringNotContainsString($s, $body, "$who must not receive: $s");
        }
    }

    // ── guests ──────────────────────────────────────────────────────────────────

    public function test_guest_json_contains_none_of_the_firms_private_data_in_lists_or_detail(): void
    {
        $secret = $this->secretFirm();
        $this->fillers(4);

        $list = $this->getJson('/kv/firms')->assertOk();
        $this->assertNoSecrets($list->getContent(), 'guest list');
        $locked = collect($list->json('items'))->firstWhere('locked', true);
        $this->assertNotNull($locked);
        $this->assertStringNotContainsString('Lock Test', $list->getContent());          // the locked card does not spell the name…
        $this->assertStringNotContainsString($secret->slug, $list->getContent());        // …nor leaks the slug (= the name)

        $detail = $this->getJson('/kv/firms/'.$secret->slug)->assertOk();
        $this->assertNoSecrets($detail->getContent(), 'guest detail');
        $detail->assertJsonPath('contact_locked', true)->assertJsonPath('rep_locked', true)->assertJsonPath('socials_locked', true)
            ->assertJsonPath('contact_state', 'login')
            ->assertJsonMissingPath('contact')->assertJsonMissingPath('tem')->assertJsonMissingPath('temtitle')->assertJsonMissingPath('socials');
        // the public part of the profile is still there
        $detail->assertJsonPath('nm', 'Lock Test Tekstil')->assertJsonPath('products', 'pamuklu kumaş');
    }

    public function test_locked_cards_carry_an_opaque_id_that_cannot_be_used_to_open_the_firm(): void
    {
        $secret = $this->secretFirm();
        $this->fillers(4);
        $items = $this->getJson('/kv/firms')->json('items');
        $locked = collect($items)->where('locked', true)->values();
        $this->assertCount(2, $locked);                                                      // 5 firms, 3 open
        foreach ($locked as $card) {
            $this->assertStringStartsWith('lk', $card['id']);
            $this->assertSame('plan', $card['lock']);
            $this->getJson('/kv/firms/'.$card['id'])->assertNotFound();
            $this->postJson('/kv/firms/'.$card['id'].'/reveal')->assertUnauthorized();
        }
        $this->assertSame(FirmPresenter::opaqueRef($secret), $locked->last()['id']);        // stable across requests
        $this->assertNotContains($secret->slug, array_column($items, 'id'));
    }

    public function test_guests_are_not_sector_scoped_the_first_three_open_cards_span_all_sectors(): void
    {
        $this->member('Gıda A', 'g1@x.test', ['sector_id' => $this->sec(3)]);
        $this->member('Mobilya A', 'g2@x.test', ['sector_id' => $this->sec(9)]);
        $this->member('Tekstil A', 'g3@x.test', ['sector_id' => $this->sec(10)]);
        $this->member('Tekstil B', 'g4@x.test', ['sector_id' => $this->sec(10)]);
        $items = $this->getJson('/kv/firms')->json('items');
        $this->assertCount(3, array_filter($items, fn ($i) => ! $i['locked']));
        $this->assertSame([], array_filter($items, fn ($i) => ($i['lock'] ?? '') === 'sector'));
    }

    // ── free member ────────────────────────────────────────────────────────────

    public function test_free_member_gets_no_contact_rep_or_social_data_anywhere(): void
    {
        $secret = $this->secretFirm();
        $this->fillers(3);
        [$free] = $this->member('Free Co', 'free@x.test');

        $this->actingAs($free);
        $list = $this->getJson('/kv/firms')->assertOk();
        $this->assertNoSecrets($list->getContent(), 'free list');
        $detail = $this->getJson('/kv/firms/'.$secret->slug)->assertOk();
        $this->assertNoSecrets($detail->getContent(), 'free detail');
        $detail->assertJsonPath('contact_state', 'premium')->assertJsonPath('rep_locked', true)
            ->assertJsonMissingPath('contact')->assertJsonMissingPath('tem')->assertJsonMissingPath('socials');
        $this->assertNoSecrets($this->getJson('/kv/matches')->getContent(), 'free matches');
        $this->assertNoSecrets($this->getJson('/kv/firms?q=kumaş')->getContent(), 'free search');
        $this->assertNoSecrets($this->getJson('/kv/firms?cc=de&sec=10&dir=EXP')->getContent(), 'free filtered search');
    }

    public function test_free_member_cannot_reveal_even_after_the_firm_consented(): void
    {
        $secret = $this->secretFirm();
        [$free] = $this->member('Free Co', 'free@x.test');
        $this->actingAs($free)->postJson("/kv/firms/{$secret->slug}/reveal")->assertForbidden()->assertJsonPath('error', 'pro_required');
        $this->assertSame(0, Reveal::count());
    }

    // ── Premium member ──────────────────────────────────────────────────────────

    public function test_premium_member_sees_rep_and_socials_but_contact_only_through_a_consented_reveal(): void
    {
        $secret = $this->secretFirm();
        [$pro] = $this->member('Pro Co', 'pro@x.test');
        $this->makePro($pro);
        $this->actingAs($pro);

        $d = $this->getJson('/kv/firms/'.$secret->slug)->assertOk();
        $d->assertJsonPath('tem', 'Zeynep Karaca')->assertJsonPath('temtitle', 'Satın Alma Direktörü')->assertJsonPath('rep_locked', false)
            ->assertJsonPath('socials.li', 'linkedin.com/company/locktest-secret')->assertJsonPath('contact_state', 'reveal')
            ->assertJsonMissingPath('contact');
        foreach (['zeynep.karaca@locktest.example', '+90 532 111 22 33', 'locktest-secret.example', 'Gizli Sokak', '905321112233'] as $private) {
            $this->assertStringNotContainsString($private, $d->getContent(), "pre-reveal: $private");   // wa is gated contact data, not a public social
        }

        $this->postJson("/kv/firms/{$secret->slug}/reveal")->assertOk()
            ->assertJsonPath('contact.email', 'zeynep.karaca@locktest.example')->assertJsonPath('contact.phone', '+90 532 111 22 33')
            ->assertJsonPath('contact.addr', 'Gizli Sokak No 7 Kadıköy')->assertJsonPath('contact.wa', '905321112233');
        $this->getJson('/kv/firms/'.$secret->slug)->assertJsonPath('contact_state', 'open')->assertJsonPath('contact.web', 'https://www.locktest-secret.example');
    }

    public function test_premium_member_gets_no_contact_when_the_firm_withdrew_consent(): void
    {
        $secret = $this->secretFirm();
        $this->consent($secret, 'contact_visibility', false);
        [$pro] = $this->member('Pro Co', 'pro@x.test');
        $this->makePro($pro);
        $this->actingAs($pro)->postJson("/kv/firms/{$secret->slug}/reveal")->assertForbidden()->assertJsonPath('error', 'no_consent');
        $d = $this->getJson('/kv/firms/'.$secret->slug);
        $d->assertJsonPath('contact_state', 'declined')->assertJsonMissingPath('contact');
        $this->assertStringNotContainsString('zeynep.karaca@', $d->getContent());
    }

    public function test_team_members_inherit_the_owners_plan_for_the_lock(): void
    {
        $secret = $this->secretFirm();
        [$freeOwner, $freeCo] = $this->member('Free Co', 'free@x.test');
        $freeMate = $this->teammate($freeCo, 'sales');
        $this->actingAs($freeMate)->getJson('/kv/firms/'.$secret->slug)->assertJsonPath('rep_locked', true)->assertJsonMissingPath('tem');

        [$proOwner, $proCo] = $this->member('Pro Co', 'pro@x.test');
        $this->makePro($proOwner);
        $proMate = $this->teammate($proCo, 'sales');
        $this->actingAs($proMate)->getJson('/kv/firms/'.$secret->slug)->assertJsonPath('rep_locked', false)->assertJsonPath('tem', 'Zeynep Karaca');
        $this->postJson("/kv/firms/{$secret->slug}/reveal")->assertOk()->assertJsonPath('contact.email', 'zeynep.karaca@locktest.example');
    }

    public function test_an_expired_premium_plan_locks_everything_again(): void
    {
        $secret = $this->secretFirm();
        [$pro] = $this->member('Pro Co', 'pro@x.test');
        $pro->forceFill(['kv_plan' => 'pro', 'kv_plan_until' => now()->subDay()])->save();
        $this->actingAs($pro);
        $this->assertNoSecrets($this->getJson('/kv/firms/'.$secret->slug)->getContent(), 'expired plan');
        $this->postJson("/kv/firms/{$secret->slug}/reveal")->assertForbidden();
    }

    // ── own company / admin ─────────────────────────────────────────────────────

    public function test_owner_and_team_members_see_their_own_contact_data_and_admin_sees_everything(): void
    {
        $secret = $this->secretFirm();
        $owner = $secret->user;
        $mate = $this->teammate($secret, 'ops');
        foreach ([$owner, $mate] as $who) {
            $this->actingAs($who)->getJson('/kv/firms/'.$secret->slug)->assertOk()
                ->assertJsonPath('mine', true)->assertJsonPath('contact.email', 'zeynep.karaca@locktest.example')->assertJsonPath('tem', 'Zeynep Karaca');
            $this->getJson('/kv/me')->assertJsonPath('company.contact.phone', '+90 532 111 22 33');
        }
        $this->actingAs($this->admin())->getJson('/kv/firms/'.$secret->slug)->assertOk()
            ->assertJsonPath('contact.email', 'zeynep.karaca@locktest.example')->assertJsonPath('socials.yt', 'youtube.com/@locktestsecret');
    }

    public function test_another_free_member_does_not_see_the_owners_private_data_through_kv_me(): void
    {
        $this->secretFirm();
        [$free] = $this->member('Free Co', 'free@x.test');
        $this->assertNoSecrets($this->actingAs($free)->getJson('/kv/me')->getContent(), 'kv/me of another company');
    }

    // ── sector scoping (C2) ─────────────────────────────────────────────────────

    public function test_other_sector_firms_are_locked_cards_for_a_member_even_when_premium(): void
    {
        $secret = $this->secretFirm();                                    // textile
        $this->member('Mobilya X', 'm1@x.test', ['sector_id' => $this->sec(9)]);
        $this->member('Mobilya Y', 'm2@x.test', ['sector_id' => $this->sec(9)]);
        [$pro] = $this->member('Pro Gıda', 'pro@x.test', ['sector_id' => $this->sec(3)]);
        $this->makePro($pro);

        $items = $this->actingAs($pro)->getJson('/kv/firms')->assertOk()->json('items');
        $this->assertCount(4, $items);
        foreach ($items as $i) {
            if ($i['sec_id'] === $this->sec(3)) {
                $this->assertFalse($i['locked']);                         // own firm
            } else {
                $this->assertTrue($i['locked']);
                $this->assertSame('sector', $i['lock']);
            }
        }
        $this->assertNoSecrets(json_encode($items, JSON_UNESCAPED_UNICODE), 'Premium member, other sector');
        $this->assertStringNotContainsString('Mobilya', json_encode($items));
    }

    public function test_free_member_gets_three_open_cards_within_their_own_sector_only(): void
    {
        $this->fillers(5, 10);
        $this->member('Gıda 1', 'g1@x.test', ['sector_id' => $this->sec(3)]);
        $this->member('Gıda 2', 'g2@x.test', ['sector_id' => $this->sec(3)]);
        [$me] = $this->member('Ben Tekstil', 'me@x.test', ['sector_id' => $this->sec(10)]);

        $items = $this->actingAs($me)->getJson('/kv/firms')->assertOk()->json('items');
        $this->assertCount(8, $items);
        $open = array_values(array_filter($items, fn ($i) => ! $i['locked']));
        // 5 textile fillers + my own company: own is always open and uncounted → 3 counted + own = 4 open, all textile
        $this->assertCount(4, $open);
        $this->assertSame([$this->sec(10)], array_values(array_unique(array_column($open, 'sec_id'))));
        $this->assertCount(2, array_filter($items, fn ($i) => $i['locked'] && $i['lock'] === 'sector'));
        $this->assertCount(2, array_filter($items, fn ($i) => $i['locked'] && $i['lock'] === 'plan'));
    }

    public function test_premium_member_sees_all_firms_of_their_own_sector_open(): void
    {
        $this->fillers(6, 10);
        [$pro] = $this->member('Pro Tekstil', 'pro@x.test', ['sector_id' => $this->sec(10)]);
        $this->makePro($pro);
        $items = $this->actingAs($pro)->getJson('/kv/firms')->json('items');
        $this->assertCount(7, $items);
        $this->assertCount(0, array_filter($items, fn ($i) => $i['locked']));
    }

    public function test_detail_of_another_sector_is_a_masked_card_with_a_sector_flag_and_nothing_revealing(): void
    {
        $secret = $this->secretFirm();                                    // textile
        [$me] = $this->member('Gıda Co', 'g@x.test', ['sector_id' => $this->sec(3)]);
        $this->makePro($me);
        $res = $this->actingAs($me)->getJson('/kv/firms/'.$secret->slug)->assertOk();
        $res->assertJsonPath('sector_locked', true)->assertJsonPath('locked', true)->assertJsonPath('lock', 'sector')
            ->assertJsonPath('contact_state', 'sector')->assertJsonMissingPath('desc')->assertJsonMissingPath('contact');
        $this->assertNoSecrets($res->getContent(), 'other sector detail');
        $this->assertStringNotContainsString('Lock Test', $res->getContent());
        $this->assertStringNotContainsString($secret->slug, $res->getContent());
        $this->assertStringNotContainsString('pamuklu', $res->getContent());
    }

    public function test_reveal_refuses_other_sector_firms_even_for_premium_with_consent(): void
    {
        $secret = $this->secretFirm();
        [$me] = $this->member('Gıda Co', 'g@x.test', ['sector_id' => $this->sec(3)]);
        $this->makePro($me);
        $this->actingAs($me)->postJson("/kv/firms/{$secret->slug}/reveal")->assertForbidden()->assertJsonPath('error', 'sector_locked');
        $this->assertSame(0, Reveal::count());
    }

    public function test_matches_lock_other_sector_firms_and_keep_the_free_quota_inside_the_sector(): void
    {
        [$me] = $this->member('Seller', 's@x.test', ['direction' => 'EXP', 'hs_codes' => '5208', 'products' => 'pamuklu kumaş']);
        foreach (range(1, 4) as $i) {
            $this->member("Buyer $i", "b$i@x.test", ['direction' => 'IMP', 'hs_codes' => '5208', 'products' => 'kumaş']);
        }
        $this->member('Başka Sektör', 'o@x.test', ['direction' => 'IMP', 'hs_codes' => '5208', 'products' => 'pamuklu kumaş', 'sector_id' => $this->sec(9)]);

        $items = $this->actingAs($me)->getJson('/kv/matches')->assertOk()->json('items');
        $this->assertCount(5, $items);
        $this->assertCount(2, array_filter($items, fn ($i) => $i['locked']));
        $sectorLocked = array_values(array_filter($items, fn ($i) => ($i['lock'] ?? null) === 'sector'));
        $this->assertCount(1, $sectorLocked);
        $this->assertStringNotContainsString('Başka', json_encode($items));
    }

    public function test_members_without_a_sector_and_unapproved_companies_fall_back_to_the_guest_rule(): void
    {
        $this->fillers(2, 10);
        $this->member('Gıda', 'g@x.test', ['sector_id' => $this->sec(3)]);
        [$noSector, $c] = $this->member('Sektörsüz', 'ns@x.test');
        $c->forceFill(['sector_id' => null])->save();
        $items = $this->actingAs($noSector)->getJson('/kv/firms')->json('items');
        $this->assertSame([], array_filter($items, fn ($i) => ($i['lock'] ?? '') === 'sector'));
    }

    public function test_sub_sectors_belong_to_their_parent_sector(): void
    {
        $textile = $this->sec(10);
        $sub = Sector::create(['parent_id' => $textile, 'slug' => 'tekstil-ip', 'names' => ['tr' => 'İplik', 'en' => 'Yarn'], 'meta_idx' => 10, 'sort' => 1]);
        $this->member('İplikçi', 'ip@x.test', ['sector_id' => $textile, 'subsector_id' => $sub->id]);
        [$me] = $this->member('Dokuma', 'dk@x.test', ['sector_id' => $textile]);
        $items = $this->actingAs($me)->getJson('/kv/firms')->json('items');
        $this->assertCount(0, array_filter($items, fn ($i) => $i['locked']));
        $this->assertEqualsCanonicalizing([$textile, $sub->id], FirmPresenter::sectorTreeIds($sub->id));
    }

    public function test_admin_is_not_sector_scoped(): void
    {
        $this->fillers(5, 10);
        $this->member('Mobilya', 'm@x.test', ['sector_id' => $this->sec(9)]);
        $items = $this->actingAs($this->admin())->getJson('/kv/firms')->json('items');
        $this->assertCount(0, array_filter($items, fn ($i) => $i['locked']));
    }
}
