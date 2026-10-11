<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Newsletter sign-ups from the public site. One row per address (idempotent); the consent proof
 * (time, IP, user agent) is kept as evidence of the opt-in. Re-runnable.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('kv_newsletter')) {
            return;
        }
        Schema::create('kv_newsletter', function (Blueprint $t) {
            $t->id();
            $t->string('email', 254)->unique();            // lower-case
            $t->string('locale', 5)->nullable();           // UI language at sign-up (tr|en|es|fr|ar|ru)
            $t->timestamp('consented_at');
            $t->string('consent_ip', 45)->nullable();
            $t->string('consent_user_agent', 255)->nullable();
            $t->timestamp('unsubscribed_at')->nullable();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_newsletter');
    }
};
