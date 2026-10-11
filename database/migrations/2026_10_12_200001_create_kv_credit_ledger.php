<?php

use App\Services\Kv\CreditService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Credit ledger (append-only) + the denormalised balance on kv_companies.
 * Credits belong to the COMPANY (shared by its team). The balance column is only ever changed by CreditService,
 * inside a transaction that also writes the ledger row, so SUM(kv_credit_ledger.delta) == kv_companies.credit_balance.
 * Re-runnable (MySQL DDL is not transactional). Companies that were approved before this migration get their 50 signup
 * credits here (idempotent, same code as `php artisan kervea:credits-backfill`).
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('kv_companies', 'credit_balance')) {
            Schema::table('kv_companies', function (Blueprint $t) {
                $t->unsignedInteger('credit_balance')->default(0);
            });
        }

        if (! Schema::hasTable('kv_credit_ledger')) {
            // users.id may be INT / INT UNSIGNED / BIGINT UNSIGNED on a SQL-imported install: an FK column must match it exactly.
            $idType = strtolower((string) (collect(Schema::getColumns('users'))->firstWhere('name', 'id')['type'] ?? 'bigint unsigned'));
            $big = str_contains($idType, 'bigint');
            $unsigned = str_contains($idType, 'unsigned');
            $engine = in_array(DB::getDriverName(), ['mysql', 'mariadb'], true)
                ? strtolower((string) (DB::selectOne("select engine as e from information_schema.tables where table_schema = database() and table_name = 'users'")->e ?? 'innodb'))
                : 'innodb';

            Schema::create('kv_credit_ledger', function (Blueprint $t) use ($big, $unsigned, $engine) {
                $t->id();
                $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
                $c = $big ? ($unsigned ? $t->unsignedBigInteger('user_id') : $t->bigInteger('user_id'))
                          : ($unsigned ? $t->unsignedInteger('user_id') : $t->integer('user_id'));
                $c->nullable();
                $engine === 'innodb' ? $t->foreign('user_id')->references('id')->on('users')->onDelete('set null') : $t->index('user_id');
                $t->integer('delta');                                   // + grant / - spend
                $t->unsignedInteger('balance_after');
                $t->string('reason', 24);                               // signup|purchase|pro_bonus|person_reveal|admin_adjust|refund
                $t->string('ref_type', 32)->nullable();                 // order | person | ...
                $t->unsignedBigInteger('ref_id')->nullable();
                $t->string('idempotency_key', 120)->nullable()->unique();
                $t->json('meta')->nullable();
                $t->timestamp('created_at')->useCurrent();

                $t->index(['company_id', 'id']);
                $t->index(['ref_type', 'ref_id']);
            });
        }

        // Companies approved before credits existed → their signup credits (idempotent).
        CreditService::backfillSignup();
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_credit_ledger');
        if (Schema::hasColumn('kv_companies', 'credit_balance')) {
            Schema::table('kv_companies', fn (Blueprint $t) => $t->dropColumn('credit_balance'));
        }
    }
};
