<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Member-to-member messaging (company level, one conversation per pair of companies).
 *  - kv_conversations: canonical pair (company_a_id < company_b_id), per-side read pointer / archive flag / notification stamp
 *  - kv_messages: plain-text body + optional private attachment, written by a person (sender_user_id) for a company
 *  - kv_message_blocks: "company X does not want messages from company Y"
 *  - kv_message_reports: abuse reports, handled in the admin area
 * Re-runnable (MySQL DDL is not transactional); user columns match the legacy users.id type (see the first migration).
 */
return new class extends Migration
{
    public function up(): void
    {
        $idType = strtolower((string) (collect(Schema::getColumns('users'))->firstWhere('name', 'id')['type'] ?? 'bigint unsigned'));
        $big = str_contains($idType, 'bigint');
        $unsigned = str_contains($idType, 'unsigned');
        $engine = in_array(DB::getDriverName(), ['mysql', 'mariadb'], true)
            ? strtolower((string) (DB::selectOne("select engine as e from information_schema.tables where table_schema = database() and table_name = 'users'")->e ?? 'innodb'))
            : 'innodb';
        $userCol = function (Blueprint $t, string $col) use ($big, $unsigned, $engine) {
            $c = $big ? ($unsigned ? $t->unsignedBigInteger($col) : $t->bigInteger($col))
                      : ($unsigned ? $t->unsignedInteger($col) : $t->integer($col));
            $c->nullable();
            $engine === 'innodb' ? $t->foreign($col)->references('id')->on('users')->onDelete('set null') : $t->index($col);
        };

        if (! Schema::hasTable('kv_conversations')) {
            Schema::create('kv_conversations', function (Blueprint $t) {
                $t->id();
                $t->foreignId('company_a_id')->constrained('kv_companies')->cascadeOnDelete();      // always the smaller id
                $t->foreignId('company_b_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->foreignId('started_by_company_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->timestamp('last_message_at')->nullable();
                $t->unsignedBigInteger('a_last_read_message_id')->nullable();
                $t->unsignedBigInteger('b_last_read_message_id')->nullable();
                $t->timestamp('a_archived_at')->nullable();
                $t->timestamp('b_archived_at')->nullable();
                $t->timestamp('a_notified_at')->nullable();       // last "you have a new message" e-mail per side (30-minute throttle)
                $t->timestamp('b_notified_at')->nullable();
                $t->timestamps();

                $t->unique(['company_a_id', 'company_b_id']);
                $t->index(['company_a_id', 'last_message_at']);
                $t->index(['company_b_id', 'last_message_at']);
            });
        }

        if (! Schema::hasTable('kv_messages')) {
            Schema::create('kv_messages', function (Blueprint $t) use ($userCol) {
                $t->id();
                $t->foreignId('conversation_id')->constrained('kv_conversations')->cascadeOnDelete();
                $t->foreignId('sender_company_id')->constrained('kv_companies')->cascadeOnDelete();
                $userCol($t, 'sender_user_id');
                $t->text('body')->nullable();                      // plain text, tags stripped; empty when only an attachment is sent
                $t->string('attachment_path')->nullable();         // PRIVATE disk: kv/messages/<conversation>/<random>
                $t->string('attachment_name', 160)->nullable();
                $t->string('attachment_mime', 64)->nullable();
                $t->unsignedInteger('attachment_size')->nullable();
                $t->string('client_id', 40)->nullable();           // browser-generated id: a retried request never creates a second message
                $t->timestamp('created_at')->useCurrent();

                $t->index(['conversation_id', 'id']);
                $t->unique(['conversation_id', 'sender_company_id', 'client_id'], 'kv_messages_client_unique');
            });
        }

        if (! Schema::hasTable('kv_message_blocks')) {
            Schema::create('kv_message_blocks', function (Blueprint $t) {
                $t->id();
                $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();             // the blocker
                $t->foreignId('blocked_company_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->timestamp('created_at')->useCurrent();

                $t->unique(['company_id', 'blocked_company_id']);
                $t->index('blocked_company_id');
            });
        }

        if (! Schema::hasTable('kv_message_reports')) {
            Schema::create('kv_message_reports', function (Blueprint $t) use ($userCol) {
                $t->id();
                $t->foreignId('message_id')->constrained('kv_messages')->cascadeOnDelete();
                $t->foreignId('reporter_company_id')->constrained('kv_companies')->cascadeOnDelete();
                $userCol($t, 'reporter_user_id');
                $t->string('category', 24)->nullable();            // spam | abuse | fraud | contact_info | other
                $t->string('reason', 1000);
                $t->string('status', 16)->default('open');          // open | reviewed | dismissed
                $userCol($t, 'handled_by');
                $t->timestamp('handled_at')->nullable();
                $t->timestamp('created_at')->useCurrent();

                $t->unique(['message_id', 'reporter_company_id']);  // one report per company and message
                $t->index(['status', 'id']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_message_reports');
        Schema::dropIfExists('kv_message_blocks');
        Schema::dropIfExists('kv_messages');
        Schema::dropIfExists('kv_conversations');
    }
};
