<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/** kv_orders now carries two kinds of purchase: the yearly Premium plan (kind = pro) and credit packs (kind = credits). Additive. */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kv_orders', function (Blueprint $t) {
            if (! Schema::hasColumn('kv_orders', 'kind')) {
                $t->string('kind', 16)->default('pro');                // pro | credits
            }
            if (! Schema::hasColumn('kv_orders', 'credits')) {
                $t->unsignedInteger('credits')->nullable();            // credits delivered by a credits order
            }
            if (! Schema::hasColumn('kv_orders', 'pack')) {
                $t->string('pack', 16)->nullable();                    // pack code as configured (kervea.credits.packs key)
            }
        });
    }

    public function down(): void
    {
        foreach (['kind', 'credits', 'pack'] as $c) {
            if (Schema::hasColumn('kv_orders', $c)) {
                Schema::table('kv_orders', fn (Blueprint $t) => $t->dropColumn($c));
            }
        }
    }
};
