<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Links a member to the Google / LinkedIn account used to sign in (matched by the provider's stable "sub", never by e-mail after linking).
 * Re-runnable and independent of the first Kervea migration (it is deployed to servers where that one already ran).
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('kv_social_identities')) {
            return;
        }

        // Same trick as the first migration: users.id may be INT / INT UNSIGNED / BIGINT UNSIGNED in the SQL-imported template.
        $idType = strtolower((string) (collect(Schema::getColumns('users'))->firstWhere('name', 'id')['type'] ?? 'bigint unsigned'));
        $big = str_contains($idType, 'bigint');
        $unsigned = str_contains($idType, 'unsigned');
        $engine = in_array(DB::getDriverName(), ['mysql', 'mariadb'], true)
            ? strtolower((string) (DB::selectOne("select engine as e from information_schema.tables where table_schema = database() and table_name = 'users'")->e ?? 'innodb'))
            : 'innodb';

        Schema::create('kv_social_identities', function (Blueprint $t) use ($big, $unsigned, $engine) {
            $t->id();
            $c = $big ? ($unsigned ? $t->unsignedBigInteger('user_id') : $t->bigInteger('user_id'))
                      : ($unsigned ? $t->unsignedInteger('user_id') : $t->integer('user_id'));
            if ($engine === 'innodb') {
                $t->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            } else {
                $t->index('user_id');
            }
            $t->string('provider', 20);
            $t->string('provider_user_id', 191);
            $t->string('email', 254)->nullable();      // address the provider reported when the account was linked
            $t->timestamp('last_login_at')->nullable();
            $t->timestamps();

            $t->unique(['provider', 'provider_user_id']);   // one provider account → one member
            $t->unique(['user_id', 'provider']);            // one account per provider per member
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_social_identities');
    }
};
