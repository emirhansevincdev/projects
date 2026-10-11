<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Services\Kv\Messaging;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/** Housekeeping: orphaned attachment files, deleted companies, cleaning of text. */
class MessagesMaintenanceTest extends MessagesTestCase
{
    public function test_the_prune_command_removes_only_files_that_no_message_refers_to(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $id = $this->startConv($a, $cb);
        $this->actingAs($a)->post("/kv/conversations/$id/messages", ['attachment' => UploadedFile::fake()->createWithContent('keep.pdf', "%PDF-1.4\n%%EOF")], ['Accept' => 'application/json'])->assertCreated();
        $kept = Message::whereNotNull('attachment_path')->firstOrFail()->attachment_path;
        Storage::disk('local')->put('kv/messages/999/orphan.pdf', 'x');          // a conversation that no longer exists
        Storage::disk('local')->put("kv/messages/$id/aborted.pdf", 'x');          // stored by a send that never completed

        $this->artisan('kv:prune-message-files', ['--dry-run' => true, '--min-age' => 0])->expectsOutputToContain('Would remove 2')->assertSuccessful();
        Storage::disk('local')->assertExists('kv/messages/999/orphan.pdf');

        $this->artisan('kv:prune-message-files', ['--min-age' => 0])->expectsOutputToContain('Removed 2')->assertSuccessful();
        Storage::disk('local')->assertMissing('kv/messages/999/orphan.pdf');
        Storage::disk('local')->assertMissing("kv/messages/$id/aborted.pdf");
        Storage::disk('local')->assertExists($kept);
        $this->assertNotContains('kv/messages/999', Storage::disk('local')->directories('kv/messages'));
    }

    public function test_young_files_are_left_alone_by_default(): void
    {
        Storage::disk('local')->put('kv/messages/5/fresh.pdf', 'x');
        $this->artisan('kv:prune-message-files')->expectsOutputToContain('Removed 0')->assertSuccessful();
        Storage::disk('local')->assertExists('kv/messages/5/fresh.pdf');
    }

    public function test_deleting_a_company_removes_its_conversations_and_messages_by_cascade(): void
    {
        [$a] = $this->firm('Alpha Textile', true);
        [, $cb] = $this->firm('Beta Fabrics');
        $this->startConv($a, $cb);
        $this->assertSame(1, Conversation::count());
        $cb->delete();
        $this->assertSame(0, Conversation::count());
        $this->assertSame(0, Message::count());
    }

    public function test_clean_body_keeps_ordinary_text_and_drops_markup_and_control_characters(): void
    {
        $this->assertSame('Price < 5 USD & > 3 pcs', Messaging::cleanBody("  Price < 5 USD & > 3 pcs \u{0007}\u{0000} "));
        $this->assertSame('hello', Messaging::cleanBody('<script type="text/javascript">alert(1)</script><b>hel</b><i>lo</i><!-- note -->'));
        $this->assertSame("line one\n\nline two", Messaging::cleanBody("line one\r\n\r\n\r\n\r\nline two"));
        $this->assertSame('', Messaging::cleanBody('<p> </p>'));
        $this->assertSame('ürün 产品 منتج 🙂', Messaging::cleanBody('ürün 产品 منتج 🙂'));
        $this->assertStringNotContainsString("\xFF", Messaging::cleanBody("bad \xFF byte"));
    }
}
