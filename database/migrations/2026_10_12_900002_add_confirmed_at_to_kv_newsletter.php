<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Double opt-in: an address is only mailed after its owner clicked the link we sent. Without this anyone could sign up a
 * third party (and "consent" would be the sign-up form's IP, not the address owner's). Existing rows stay unconfirmed.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('kv_newsletter') && ! Schema::hasColumn('kv_newsletter', 'confirmed_at')) {
            Schema::table('kv_newsletter', function (Blueprint $t) {
                $t->timestamp('confirmed_at')->nullable()->after('consent_user_agent');
                $t->timestamp('confirmation_sent_at')->nullable()->after('confirmed_at');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('kv_newsletter', 'confirmed_at')) {
            Schema::table('kv_newsletter', fn (Blueprint $t) => $t->dropColumn(['confirmed_at', 'confirmation_sent_at']));
        }
    }
};
