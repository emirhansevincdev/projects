<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Analytics for member companies (panel "Analiz" tab, overview numbers).
 *
 *  kv_metrics_daily  one counter per company, day and metric (profile_view, search_impression, contact_reveal, person_reveal,
 *                    msg_received, conv_started, reply_count, reply_seconds). Written by App\Services\Kv\Metrics with an atomic upsert.
 *  kv_profile_views  one row per (deduplicated) visit of a company page: who (company, only when signed in), from where (country), how.
 *                    viewer_key is a keyed hash (never the raw IP / user agent / user id) used only to count unique viewers.
 *  kv_search_log     one row per (deduplicated) search with criteria: what was typed / chosen. No IP, no user id.
 *
 * Re-runnable: MySQL DDL is not transactional, so an interrupted attempt can leave tables behind.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('kv_metrics_daily')) {
            Schema::create('kv_metrics_daily', function (Blueprint $t) {
                $t->id();
                $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->date('day');
                $t->string('metric', 32);
                $t->unsignedBigInteger('n')->default(0);
                $t->unique(['company_id', 'day', 'metric'], 'kv_metrics_daily_uq');
                $t->index('day');
            });
        }

        if (! Schema::hasTable('kv_profile_views')) {
            Schema::create('kv_profile_views', function (Blueprint $t) {
                $t->id();
                $t->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
                $t->foreignId('viewer_company_id')->nullable()->constrained('kv_companies')->nullOnDelete();
                $t->char('viewer_country', 2)->nullable();
                $t->char('viewer_key', 16)->nullable();
                $t->string('source', 8)->default('detail');          // detail | match | search
                $t->timestamp('created_at')->useCurrent();
                $t->index(['company_id', 'created_at'], 'kv_pv_company_time');
                $t->index('created_at');
            });
        }

        if (! Schema::hasTable('kv_search_log')) {
            Schema::create('kv_search_log', function (Blueprint $t) {
                $t->id();
                $t->string('q', 80)->nullable();                     // normalised: lower-case, single spaces
                $t->string('hs', 16)->nullable();                    // digits of the first HS-code-looking token
                $t->foreignId('sector_id')->nullable()->constrained('kv_sectors')->nullOnDelete();
                $t->char('country_cc', 2)->nullable();
                $t->foreignId('viewer_company_id')->nullable()->constrained('kv_companies')->nullOnDelete();
                $t->timestamp('created_at')->useCurrent();
                $t->index('created_at');
                $t->index(['hs', 'created_at'], 'kv_sl_hs_time');
                $t->index(['sector_id', 'created_at'], 'kv_sl_sector_time');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('kv_search_log');
        Schema::dropIfExists('kv_profile_views');
        Schema::dropIfExists('kv_metrics_daily');
    }
};
