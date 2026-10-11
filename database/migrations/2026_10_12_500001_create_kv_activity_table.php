<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Activity log of a member company's panel ("who did what, when"): team changes, profile/document edits, consent changes,
 * sign-ins and the events other panel features report through App\Services\Kv\Activity.
 * Re-runnable; user_id matches the legacy users.id type (see the first migration). Rows go away with their company.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('kv_activity')) {
            return;
        }
        $idType = strtolower((string) (collect(Schema::getColumns('users'))->firstWhere('name', 'id')['type'] ?? 'bigint unsigned'));
        $big = str_contains($idType, 'bigint');
        $unsigned = str_contains($idType, 'unsigned');
        $engine = in_array(DB::getDriverName(), ['mysql', 'mariadb'], true)
            ? strtolower((string) (DB::selectOne("select engine as e from information_schema.tables where table_schema = database() and table_name = 'users'")->e ?? 'innodb'))
            : 'innodb';

        Schema::create('kv_activity', function (Blueprint $t) use ($big, $unsigned, $engine) {
            $t->id();
            $t->foreignId('company_id')->nullable()->constrained('kv_companies')->cascadeOnDelete();
            $c = $big ? ($unsigned ? $t->unsignedBigInteger('user_id') : $t->bigInteger('user_id'))
                      : ($unsigned ? $t->unsignedInteger('user_id') : $t->integer('user_id'));
            $c->nullable();
            $engine === 'innodb' ? $t->foreign('user_id')->references('id')->on('users')->nullOnDelete() : $t->index('user_id');
            $t->string('action', 40);
            $t->json('meta')->nullable();
            $t->string('ip', 45)->nullable();
            $t->timestamp('created_at')->useCurrent();

            $t->index(['company_id', 'id']);
            $t->index('created_at');
            $t->index(['user_id', 'action']);        // "last sign-in of a person"
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_activity');
    }
};
