<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Models\Kv\MessageBlock;

/** Who may START a conversation, and the replies that are always allowed. */
class MessagesStartTest extends MessagesTestCase
{
    public function test_a_premium_member_starts_a_conversation_with_a_company_of_the_same_sector(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');

        $res = $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => "  Hello\n\n\n\nthere  "]);
        $res->assertCreated()->assertJsonPath('created', true)->assertJsonPath('message.mine', true)->assertJsonPath('message.body', "Hello\n\nthere");

        $conv = Conversation::firstOrFail();
        $this->assertLessThan($conv->company_b_id, $conv->company_a_id, 'pair is stored in canonical order');
        $this->assertEqualsCanonicalizing([$ca->id, $cb->id], [$conv->company_a_id, $conv->company_b_id]);
        $this->assertSame($ca->id, $conv->started_by_company_id);
        $this->assertNotNull($conv->last_message_at);
        $msg = Message::firstOrFail();
        $this->assertSame($a->id, $msg->sender_user_id);
        $this->assertSame($ca->id, $msg->sender_company_id);
        $this->assertNull($msg->attachment_path);
    }

    public function test_starting_again_reuses_the_same_conversation(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id1 = $this->startConv($a, $cb, 'one');
        $res = $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'two']);
        $res->assertCreated()->assertJsonPath('created', false)->assertJsonPath('conversation_id', $id1);
        $this->assertSame(1, Conversation::count());
        $this->assertSame(2, Message::count());
    }

    public function test_a_free_member_cannot_start_a_conversation(): void
    {
        [$a] = $this->firm('Alpha Textile');
        [, $cb] = $this->firm('Beta Fabrics', true);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi'])
            ->assertForbidden()->assertJsonPath('error', 'pro_required');
        $this->assertSame(0, Conversation::count());
    }

    public function test_an_expired_premium_plan_cannot_start_either(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        $a->forceFill(['kv_plan_until' => now()->subDay()])->save();
        [, $cb] = $this->firm('Beta Fabrics');
        $this->actingAs($a->fresh())->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi'])->assertForbidden()->assertJsonPath('error', 'pro_required');
    }

    public function test_companies_of_another_sector_cannot_be_messaged(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics', true, $this->otherSectorIdx());
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi'])
            ->assertForbidden()->assertJsonPath('error', 'sector_mismatch');
        $this->assertSame(0, Conversation::count());
    }

    public function test_you_cannot_message_yourself(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $ca->slug, 'body' => 'hi'])->assertStatus(422)->assertJsonPath('error', 'self');
    }

    public function test_pending_rejected_suspended_and_unknown_companies_are_not_found(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        foreach (['pending', 'rejected', 'suspended'] as $i => $status) {
            [, $c] = $this->firm("Gamma $i");
            $c->forceFill(['status' => $status])->save();
            $this->actingAs($a)->postJson('/kv/conversations', ['company' => $c->slug, 'body' => 'hi'])->assertNotFound()->assertJsonPath('error', 'not_found');
        }
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => 'no-such-company', 'body' => 'hi'])->assertNotFound();
        $this->assertSame(0, Conversation::count());
    }

    public function test_blocks_stop_a_new_conversation_in_both_directions_without_telling_the_blocked_side(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics', true);
        MessageBlock::create(['company_id' => $cb->id, 'blocked_company_id' => $ca->id]);
        // A is blocked by B: the generic "cannot be messaged" answer, not "you were blocked"
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi'])->assertForbidden()->assertJsonPath('error', 'unavailable');
        // B blocked A: B is told to unblock first
        $this->actingAs($b)->postJson('/kv/conversations', ['company' => $ca->slug, 'body' => 'hi'])->assertForbidden()->assertJsonPath('error', 'blocked_by_me');
        $this->assertSame(0, Conversation::count());
    }

    public function test_the_daily_cap_for_new_conversations_is_enforced_per_company(): void
    {
        config(['kervea.messaging.new_conversations_per_day' => 2]);
        [$a] = $this->firm('Alpha Textile', true);
        foreach (['B1', 'B2', 'B3'] as $n) {
            $others[$n] = $this->firm("Beta $n")[1];
        }
        $this->startConv($a, $others['B1']);
        $this->startConv($a, $others['B2']);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $others['B3']->slug, 'body' => 'hi'])->assertStatus(429)->assertJsonPath('error', 'quota');
        $this->assertSame(2, Conversation::count());
        // writing in an existing conversation is not a "new conversation"
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $others['B1']->slug, 'body' => 'again'])->assertCreated();
        // after a day the cap resets
        $this->travel(25)->hours();
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $others['B3']->slug, 'body' => 'hi'])->assertCreated();
    }

    public function test_the_cap_does_not_count_conversations_other_companies_started(): void
    {
        config(['kervea.messaging.new_conversations_per_day' => 1]);
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b] = $this->firm('Beta Fabrics', true);
        [, $cc] = $this->firm('Gamma Mills');
        $this->startConv($b, $ca);                       // B → A does not use A's allowance
        $this->startConv($a, $cc);
        $this->assertSame(2, Conversation::count());
    }

    public function test_a_free_member_can_always_reply_and_a_reply_is_not_a_new_conversation(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');                     // free plan
        $id = $this->startConv($a, $cb, 'Offer for you');

        $this->actingAs($b)->postJson("/kv/conversations/$id/messages", ['body' => 'Thanks, we are interested'])
            ->assertCreated()->assertJsonPath('message.mine', true)->assertJsonPath('message.by', $b->name);
        // the same pair through the "start" endpoint is also just a reply for the free member
        $this->actingAs($b)->postJson('/kv/conversations', ['company' => $ca->slug, 'body' => 'And one more thing'])
            ->assertCreated()->assertJsonPath('created', false)->assertJsonPath('conversation_id', $id);
        $this->assertSame(1, Conversation::count());
        $this->assertSame(3, Message::count());
        $this->assertSame($ca->id, Conversation::first()->started_by_company_id);
    }

    public function test_sending_stops_for_a_suspended_partner_a_block_or_a_changed_sector(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);

        $cb->forceFill(['status' => Company::STATUS_SUSPENDED])->save();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'x'])->assertForbidden()->assertJsonPath('error', 'unavailable');
        $cb->forceFill(['status' => Company::STATUS_APPROVED])->save();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'x'])->assertCreated();

        $cb->forceFill(['sector_id' => \App\Models\Kv\Sector::where('meta_idx', $this->otherSectorIdx())->value('id')])->save();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'x'])->assertForbidden()->assertJsonPath('error', 'sector_mismatch');
        // reading stays possible
        $this->actingAs($a)->getJson("/kv/conversations/$id")->assertOk()->assertJsonPath('conversation.can_send', false)->assertJsonPath('conversation.send_reason', 'sector_mismatch');
    }

    public function test_message_text_is_validated_and_cleaned(): void
    {
        config(['kervea.messaging.max_body' => 50]);
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => '   '])->assertStatus(422);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => '<b></b>'])->assertStatus(422);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => str_repeat('a', 51)])->assertStatus(422);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug])->assertStatus(422);
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => ['x'], 'body' => 'hi'])->assertStatus(422);
        $this->assertSame(0, Conversation::count());
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => str_repeat('a', 50)])->assertCreated();
    }

    public function test_a_retried_request_with_the_same_client_id_does_not_create_a_second_message(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $first = $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi', 'client_id' => 'abc-123'])->assertCreated();
        $id = $first->json('conversation_id');
        $this->actingAs($a)->postJson('/kv/conversations', ['company' => $cb->slug, 'body' => 'hi', 'client_id' => 'abc-123'])->assertCreated();
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hi', 'client_id' => 'abc-123'])->assertOk()->assertJsonPath('duplicate', true);
        $this->assertSame(1, Message::count());
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hi', 'client_id' => 'abc-124'])->assertCreated();
        $this->assertSame(2, Message::count());
        $this->actingAs($a)->postJson("/kv/conversations/$id/messages", ['body' => 'hi', 'client_id' => 'bad id!'])->assertStatus(422);
    }

    public function test_can_message_tells_the_firm_page_what_to_show(): void
    {
        [$a, $ca] = $this->firm('Alpha Textile', true);
        [$b, $cb] = $this->firm('Beta Fabrics');
        [, $cc] = $this->firm('Gamma Mills', true, $this->otherSectorIdx());

        $this->actingAs($a)->getJson("/kv/messages/can-message/{$cb->slug}")->assertOk()->assertJson(['can' => true, 'reason' => null, 'conversation_id' => null, 'is_pro' => true]);
        $this->actingAs($b)->getJson("/kv/messages/can-message/{$ca->slug}")->assertOk()->assertJson(['can' => false, 'reason' => 'pro_required', 'is_pro' => false]);
        $this->actingAs($a)->getJson("/kv/messages/can-message/{$cc->slug}")->assertNotFound();     // other sector = indistinguishable from a firm that does not exist
        $this->actingAs($a)->getJson("/kv/messages/can-message/{$ca->slug}")->assertOk()->assertJson(['can' => false, 'reason' => 'self']);
        $this->actingAs($a)->getJson('/kv/messages/can-message/nobody')->assertNotFound();

        $id = $this->startConv($a, $cb);
        // an existing conversation can be opened by the free side too
        $this->actingAs($b)->getJson("/kv/messages/can-message/{$ca->slug}")->assertOk()->assertJson(['can' => true, 'conversation_id' => $id]);
    }
}
