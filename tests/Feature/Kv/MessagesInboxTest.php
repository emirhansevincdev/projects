<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Models\Kv\MessageBlock;
use App\Services\Kv\Messaging;

/** Inbox list, thread, read/unread accounting, archive and block. */
class MessagesInboxTest extends MessagesTestCase
{
    public function test_unread_counts_follow_the_per_company_read_pointer(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, 'first');
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'second'])->assertCreated();

        // the sender never has unread items for its own messages
        $this->actingAs($a)->getJson('/kv/messages/unread-count')->assertOk()->assertExactJson(['unread' => 0]);
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertOk()->assertExactJson(['unread' => 2]);
        $list = $this->actingAs($b)->getJson('/kv/conversations')->assertOk();
        $list->assertJsonPath('unread', 2)->assertJsonPath('items.0.unread', 2)->assertJsonPath('items.0.preview', 'second')
            ->assertJsonPath('items.0.company.name', 'Alpha Textile')->assertJsonPath('items.0.preview_mine', false);

        // opening the thread reads it
        $this->actingAs($b)->getJson("/kv/conversations/$id")->assertOk()->assertJsonCount(2, 'messages');
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);
        $this->assertSame(Message::max('id'), Conversation::first()->{Conversation::first()->side($cb->id).'_last_read_message_id'});
        // A's pointer is untouched by B reading
        $this->assertNull(Conversation::first()->{Conversation::first()->side($ca->id).'_last_read_message_id'});

        // B answers: now A has one unread, B none
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'answer'])->assertCreated();
        $this->actingAs($a)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 1]);
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);
    }

    public function test_loading_older_pages_does_not_mark_anything_read_and_the_pointer_never_moves_back(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb, 'm1');
        foreach (['m2', 'm3', 'm4'] as $t) {
            $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => $t])->assertCreated();
        }
        $page = $this->actingAs($b)->getJson("/kv/conversations/$id?limit=2")->assertOk();
        $page->assertJsonCount(2, 'messages')->assertJsonPath('has_more', true)->assertJsonPath('messages.0.body', 'm3')->assertJsonPath('messages.1.body', 'm4');
        $firstId = $page->json('messages.0.id');
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);

        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'm5'])->assertCreated();
        $older = $this->actingAs($b)->getJson("/kv/conversations/$id?before=$firstId&limit=5")->assertOk();
        $older->assertJsonCount(2, 'messages')->assertJsonPath('has_more', false)->assertJsonPath('messages.0.body', 'm1');
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 1]);   // m5 is still unread

        // polling for what is new since the last known id
        $last = $page->json('last_id');
        $new = $this->actingAs($b)->getJson("/kv/conversations/$id?after=$last")->assertOk();
        $new->assertJsonCount(1, 'messages')->assertJsonPath('messages.0.body', 'm5');
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);
    }

    public function test_list_is_company_level_sorted_and_only_shows_the_viewers_own_conversations(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        [, $cc] = $this->firm('Gamma Mills');
        [$d, $cd] = $this->firm('Delta Yarn', true);
        $this->startConv($a, $cb, 'to beta');
        $this->travel(5)->minutes();
        $this->startConv($a, $cc, 'to gamma');
        $this->startConv($d, $cb, 'delta to beta');          // not A's business

        $items = $this->actingAs($a)->getJson('/kv/conversations')->assertOk()->json('items');
        $this->assertSame(['Gamma Mills', 'Beta Fabrics'], array_map(fn ($i) => $i['company']['name'], $items));
        foreach ($items as $i) {
            $this->assertEqualsCanonicalizing(['slug', 'name', 'logo', 'initials', 'cn_key', 'verified', 'sec', 'active'], array_keys($i['company']));
            $this->assertStringNotContainsString('@', json_encode($i['company']), 'no contact data in the company card');
        }
    }

    public function test_search_covers_company_names_and_message_text_but_only_inside_own_conversations(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        [, $cc] = $this->firm('Gamma Mills');
        [$d, $cd] = $this->firm('Delta Yarn', true);
        $this->startConv($a, $cb, 'We need organic cotton, 500 kg');
        $this->startConv($a, $cc, 'Looking for polyester');
        $this->startConv($d, $cb, 'secret cotton deal between delta and beta');

        $by = fn ($q) => collect($this->actingAs($a)->getJson('/kv/conversations?q='.urlencode($q))->assertOk()->json('items'))->pluck('company.name')->all();
        $this->assertSame(['Beta Fabrics'], $by('cotton'));
        $this->assertSame(['Gamma Mills'], $by('gamma'));
        $this->assertSame([], $by('delta'));
        $this->assertSame([], $by('secret'));
        $this->assertCount(2, $this->actingAs($a)->getJson('/kv/conversations?q=')->json('items'));
        $this->assertCount(2, $this->actingAs($a)->getJson('/kv/conversations?q=%25')->json('items'), 'wildcards typed by the user are not interpreted');
    }

    public function test_archive_hides_a_conversation_until_the_next_message_and_unarchive_brings_it_back(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);

        $this->actingAs($b)->postJson("/kv/conversations/$id/archive")->assertOk();
        $this->actingAs($b)->getJson('/kv/conversations')->assertJsonCount(0, 'items')->assertJsonPath('archived_count', 1);
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);        // archived chats do not nag
        $this->actingAs($b)->getJson('/kv/conversations?archived=1')->assertJsonCount(1, 'items')->assertJsonPath('items.0.archived', true);
        // A's side is independent
        $this->actingAs($a)->getJson('/kv/conversations')->assertJsonCount(1, 'items');

        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'ping'])->assertCreated();      // a new message brings it back
        $this->actingAs($b)->getJson('/kv/conversations')->assertJsonCount(1, 'items')->assertJsonPath('archived_count', 0);
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 2]);

        $this->actingAs($b)->postJson("/kv/conversations/$id/archive")->assertOk();
        $this->actingAs($b)->postJson("/kv/conversations/$id/unarchive")->assertOk();
        $this->actingAs($b)->getJson('/kv/conversations')->assertJsonCount(1, 'items');
    }

    public function test_blocking_archives_and_stops_both_directions_unblocking_restores(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics', true);
        $id = $this->startConv($a, $cb);

        $this->actingAs($b)->postJson("/kv/conversations/$id/block")->assertOk();
        $this->actingAs($b)->postJson("/kv/conversations/$id/block")->assertOk();      // idempotent
        $this->assertSame(1, MessageBlock::count());
        $this->assertTrue(MessageBlock::blocks($cb->id, $ca->id));
        $this->actingAs($b)->getJson('/kv/conversations')->assertJsonCount(0, 'items');
        $this->actingAs($b)->getJson('/kv/messages/unread-count')->assertExactJson(['unread' => 0]);

        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hello?'])->assertForbidden()->assertJsonPath('error', 'unavailable');
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'hi'])->assertForbidden()->assertJsonPath('error', 'blocked_by_me');
        $this->actingAs($a)->getJson("/kv/conversations/$id")->assertOk()->assertJsonPath('conversation.can_send', false)->assertJsonPath('conversation.send_reason', 'unavailable')->assertJsonPath('conversation.blocked_by_me', false);
        $this->actingAs($b)->getJson("/kv/conversations/$id")->assertOk()->assertJsonPath('conversation.blocked_by_me', true)->assertJsonPath('conversation.send_reason', 'blocked_by_me');

        $this->actingAs($b)->deleteJson("/kv/conversations/$id/block")->assertOk();
        $this->assertSame(0, MessageBlock::count());
        $this->actingAs($b)->getJson('/kv/conversations')->assertJsonCount(1, 'items');
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hello again'])->assertCreated();
    }

    public function test_a_company_cannot_be_blocked_through_a_conversation_it_is_not_part_of(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        [$c, $cc] = $this->firm('Gamma Mills', true);
        $id = $this->startConv($a, $cb);
        $this->actingAs($c)->postJson("/kv/conversations/$id/block")->assertNotFound();
        $this->actingAs($c)->deleteJson("/kv/conversations/$id/block")->assertNotFound();
        $this->assertSame(0, MessageBlock::count());
    }

    public function test_reply_accounting_is_recorded_for_the_company_that_answers(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $this->travel(90)->seconds();
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'answer'])->assertCreated();
        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'follow-up, not an answer'])->assertCreated();

        $sum = fn ($company, $metric) => (int) \Illuminate\Support\Facades\DB::table('kv_metrics_daily')->where('company_id', $company)->where('metric', $metric)->sum('n');
        $this->assertSame(2, $sum($ca->id, 'msg_received'), 'A received both messages of B');
        $this->assertSame(1, $sum($cb->id, 'msg_received'), 'B received the first message');
        $this->assertSame(1, $sum($cb->id, 'reply_count'), 'only the first message after the other side counts as an answer');
        $this->assertGreaterThanOrEqual(90, $sum($cb->id, 'reply_seconds'));
        $this->assertSame(0, $sum($ca->id, 'reply_count'));
        $this->assertSame(1, $sum($ca->id, 'conv_started'));
        $this->assertSame(1, $sum($cb->id, 'conv_started'));
    }
}
