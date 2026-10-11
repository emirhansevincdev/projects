<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * "Kişiler" (Prospeo-style contact discovery).
 *  - kv_people:          decision makers of OTHER sectors; contact data (email/phone) is only handed out through a paid reveal.
 *  - kv_person_reveals:  which company opened which channel of which person (UNIQUE → re-opening is free).
 *  - kv_removal_requests: public KVKK "remove me" requests, processed by an admin.
 * Re-runnable; user columns match the legacy users.id type (see the first Kervea migration).
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

        if (! Schema::hasTable('kv_people')) {
            Schema::create('kv_people', function (Blueprint $t) {
                $t->id();
                $t->foreignId('company_id')->nullable()->constrained('kv_companies')->nullOnDelete();   // set when the person works for a member company
                $t->string('name', 160);
                $t->string('title', 160)->nullable();
                $t->string('department', 16)->default('other');                                        // ceo|purchasing|sales|export|ops|other
                $t->string('company_name', 200);
                $t->string('country_cc', 2)->nullable();
                $t->foreignId('sector_id')->nullable()->constrained('kv_sectors')->nullOnDelete();
                $t->string('email', 254)->nullable();
                $t->string('phone', 64)->nullable();
                $t->string('linkedin', 300)->nullable();
                $t->string('source', 16)->default('manual');                                           // import|manual|member
                $t->string('status', 16)->default('active');                                           // active|removed
                $t->timestamps();

                $t->index(['status', 'sector_id']);
                $t->index(['status', 'country_cc']);
                $t->index(['status', 'department']);
                $t->index('email');
                $t->index('company_name');
                $t->index('company_id');
            });
        }

        if (! Schema::hasTable('kv_person_reveals')) {
            Schema::create('kv_person_reveals', function (Blueprint $t) use ($userCol) {
                $t->id();
                $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->foreignId('person_id')->constrained('kv_people')->cascadeOnDelete();
                $t->string('channel', 8);                                                              // email|phone
                $t->unsignedSmallInteger('credits_spent')->default(0);
                $userCol($t, 'user_id');
                $t->timestamp('created_at')->useCurrent();

                $t->unique(['company_id', 'person_id', 'channel']);
                $t->index(['company_id', 'created_at']);
            });
        }

        if (! Schema::hasTable('kv_removal_requests')) {
            Schema::create('kv_removal_requests', function (Blueprint $t) use ($userCol) {
                $t->id();
                $t->string('person_ref', 200)->nullable();         // free text the requester gave (profile link, company, …)
                $t->string('person_email', 254)->nullable();
                $t->string('person_name', 160)->nullable();
                $t->string('requester_name', 160);
                $t->string('requester_email', 254);
                $t->text('reason');
                $t->string('status', 16)->default('new')->index();  // new|done|rejected
                $t->string('ip', 45)->nullable();
                $t->string('admin_note', 500)->nullable();
                $userCol($t, 'handled_by');
                $t->timestamp('handled_at')->nullable();
                $t->timestamps();
            });
        }
    }

    public function down(): void
    {
        foreach (['kv_removal_requests', 'kv_person_reveals', 'kv_people'] as $t) {
            Schema::dropIfExists($t);
        }
    }
};
