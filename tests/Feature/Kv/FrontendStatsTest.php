<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;

/** GET /kv/stats: the numbers on the home page and the globe card are counted from approved companies only. */
class FrontendStatsTest extends KvTestCase
{
    public function test_empty_platform_returns_zero_counters_and_an_empty_by_country_object(): void
    {
        $res = $this->getJson('/kv/stats')->assertOk();
        $res->assertJsonPath('firms', 0)->assertJsonPath('countries', 0);
        $this->assertSame([], $res->json('by_country'));
        $this->assertStringContainsString('"by_country":{}', $res->getContent());
        $this->assertGreaterThan(0, $res->json('sectors'));
    }

    public function test_by_country_counts_approved_companies_per_country_only(): void
    {
        $this->member('De Eins', 'de1@x.test', ['country_cc' => 'de']);
        $this->member('De Zwei', 'de2@x.test', ['country_cc' => 'de']);
        $this->member('Tr Eins', 'tr1@x.test', ['country_cc' => 'tr']);
        // not approved companies never count: pending, rejected and suspended
        foreach (['pending', 'rejected', 'suspended'] as $i => $status) {
            [, $c] = $this->member("Hidden $i", "h$i@x.test", ['country_cc' => 'ng']);
            $c->forceFill(['status' => $status])->save();
        }

        $res = $this->getJson('/kv/stats')->assertOk();
        $this->assertSame(['de' => 2, 'tr' => 1], $res->json('by_country'));
        $res->assertJsonPath('firms', 3)->assertJsonPath('countries', 2);
        $this->assertArrayNotHasKey('ng', $res->json('by_country'));            // no zero entries
    }

    public function test_country_codes_are_merged_case_insensitively_and_totals_stay_consistent(): void
    {
        $this->member('Upper', 'u@x.test', ['country_cc' => 'DE']);
        $this->member('Lower', 'l@x.test', ['country_cc' => 'de']);

        $res = $this->getJson('/kv/stats')->assertOk();
        $this->assertSame(['de' => 2], $res->json('by_country'));
        $res->assertJsonPath('firms', 2)->assertJsonPath('countries', 1);
        $this->assertSame(Company::approved()->count(), $res->json('firms'));
    }

    public function test_stats_are_public_and_expose_no_company_data(): void
    {
        [, $c] = $this->member('Secret Co', 'secret@x.test', ['country_cc' => 'de', 'phone' => '+49 999 888']);
        $body = $this->getJson('/kv/stats')->assertOk()->getContent();
        foreach (['Secret Co', 'secret@x.test', '+49 999', $c->slug] as $leak) {
            $this->assertStringNotContainsString($leak, $body);
        }
    }
}
