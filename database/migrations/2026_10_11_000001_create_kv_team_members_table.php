<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * People who work inside a member company's panel (besides its owner = kv_companies.user_id), each with a role and
 * optional per-person permission override. Re-runnable; user_id matches the legacy users.id type (see the first migration).
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('kv_team_members')) {
            return;
        }
        $idType = strtolower((string) (collect(Schema::getColumns('users'))->firstWhere('name', 'id')['type'] ?? 'bigint unsigned'));
        $big = str_contains($idType, 'bigint');
        $unsigned = str_contains($idType, 'unsigned');
        $engine = in_array(DB::getDriverName(), ['mysql', 'mariadb'], true)
            ? strtolower((string) (DB::selectOne("select engine as e from information_schema.tables where table_schema = database() and table_name = 'users'")->e ?? 'innodb'))
            : 'innodb';
        $userCol = function (Blueprint $t, string $col, bool $nullable) use ($big, $unsigned, $engine) {
            $c = $big ? ($unsigned ? $t->unsignedBigInteger($col) : $t->bigInteger($col))
                      : ($unsigned ? $t->unsignedInteger($col) : $t->integer($col));
            if ($nullable) { $c->nullable(); }
            $engine === 'innodb' ? $t->foreign($col)->references('id')->on('users')->onDelete($nullable ? 'set null' : 'cascade') : $t->index($col);
        };

        Schema::create('kv_team_members', function (Blueprint $t) use ($userCol) {
            $t->id();
            $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
            $userCol($t, 'user_id', true);                    // null while the invitation is still open
            $t->string('email', 254);                         // invited / login address (lower-case)
            $t->string('name', 120)->nullable();
            $t->string('role', 16)->default('sales');         // admin | sales | ops (owner is kv_companies.user_id)
            $t->json('perms')->nullable();                    // null = the role's default permissions
            $t->string('status', 16)->default('invited');     // invited | active | disabled
            $t->string('invite_token_hash', 64)->nullable();
            $t->timestamp('invited_at')->nullable();
            $t->timestamp('accepted_at')->nullable();
            $userCol($t, 'invited_by', true);
            $t->timestamps();

            $t->unique(['company_id', 'email']);
            $t->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_team_members');
    }
};
