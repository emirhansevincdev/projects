<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kv_sectors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('kv_sectors')->nullOnDelete();
            $table->string('slug')->unique();
            $table->json('names');                 // {tr,en,es,fr,ar,ru}
            $table->unsignedSmallInteger('meta_idx')->default(0); // front-end icon/colour index
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('kv_countries', function (Blueprint $table) {
            $table->string('cc', 2)->primary();
            $table->json('names');                 // {tr,en,es,fr,ar,ru} official names
            $table->unsignedInteger('sort')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('kv_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('status', 16)->default('pending')->index(); // pending|approved|rejected|suspended
            $table->text('review_note')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_verified')->default(false);

            // identity
            $table->string('name');
            $table->string('name_en')->nullable();
            $table->string('tax_id');
            $table->string('mersis')->nullable();
            $table->unsignedSmallInteger('founded_year')->nullable();
            $table->string('employees', 32)->nullable();
            $table->string('country_cc', 2)->index();
            $table->string('city')->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('website')->nullable();
            $table->string('kep')->nullable();

            // contact (gated – never listed publicly)
            $table->string('email');
            $table->string('phone', 64);
            $table->string('rep_name');
            $table->string('rep_title')->nullable();
            $table->string('rep_email')->nullable();

            // trade profile (all optional – card must not break when empty)
            $table->foreignId('sector_id')->nullable()->constrained('kv_sectors')->nullOnDelete();
            $table->foreignId('subsector_id')->nullable()->constrained('kv_sectors')->nullOnDelete();
            $table->string('direction', 8)->nullable()->index(); // EXP|IMP|BOTH
            $table->string('hs_codes')->nullable();
            $table->string('moq')->nullable();
            $table->string('incoterm')->nullable();
            $table->string('payment_terms')->nullable();
            $table->string('products', 500)->nullable();
            $table->text('description')->nullable();   // 250–300 words
            $table->string('certificates', 500)->nullable();

            // media + social
            $table->string('logo_path')->nullable();
            $table->string('cover_path')->nullable();
            $table->json('social')->nullable();        // {wa,li,ig,fb,x,yt}

            $table->timestamps();
        });

        Schema::create('kv_company_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
            $table->string('path');
            $table->unsignedSmallInteger('sort')->default(0);
            $table->timestamps();
        });

        Schema::create('kv_company_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
            $table->string('path');                    // private disk only
            $table->string('original_name');
            $table->string('mime', 64);
            $table->unsignedInteger('size');
            $table->timestamps();
        });

        Schema::create('kv_consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('company_id')->nullable()->constrained('kv_companies')->nullOnDelete();
            $table->string('email')->nullable();
            $table->string('type', 32)->index();       // kvkk|terms|verification|marketing|contact_visibility|cross_border|cookies
            $table->string('version', 16)->default('v1.2');
            $table->boolean('granted');
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('kv_contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('status', 16)->default('new')->index(); // new|read|replied
            $table->string('ip', 45)->nullable();
            $table->timestamps();
        });

        Schema::create('kv_promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('type', 8)->default('percent'); // percent|fixed
            $table->unsignedInteger('value');              // percent, or cents when fixed
            $table->unsignedInteger('max_uses')->nullable();
            $table->unsignedInteger('used_count')->default(0);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('note')->nullable();
            $table->timestamps();
        });

        Schema::create('kv_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()->constrained('kv_companies')->nullOnDelete();
            $table->string('plan', 16);                    // pro|enterprise
            $table->string('period', 8)->default('year');  // month|year
            $table->unsignedInteger('amount_cents');       // computed on the server only
            $table->unsignedInteger('discount_cents')->default(0);
            $table->string('currency', 3)->default('USD');
            $table->foreignId('promo_code_id')->nullable()->constrained('kv_promo_codes')->nullOnDelete();
            $table->string('status', 16)->default('pending')->index(); // pending|paid|failed|cancelled
            $table->string('provider', 24)->nullable();
            $table->string('provider_ref')->nullable()->unique();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        Schema::create('kv_reveals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('company_id')->constrained('kv_companies')->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->unique(['user_id', 'company_id']);
        });

        // Password setup / reset links need this table; the template's SQL installer may not have created it.
        if (! Schema::hasTable('password_reset_tokens')) {
            Schema::create('password_reset_tokens', function (Blueprint $table) {
                $table->string('email')->primary();
                $table->string('token');
                $table->timestamp('created_at')->nullable();
            });
        }
        if (! Schema::hasColumn('users', 'email_verified_at')) {
            Schema::table('users', fn (Blueprint $t) => $t->timestamp('email_verified_at')->nullable());
        }

        // Extra member columns on the shared users table (idempotent: production DB may already have some).
        $add = function (string $col, callable $def) {
            if (! Schema::hasColumn('users', $col)) {
                Schema::table('users', fn (Blueprint $t) => $def($t));
            }
        };
        $add('kv_plan', fn ($t) => $t->string('kv_plan', 16)->default('free'));
        $add('kv_plan_until', fn ($t) => $t->timestamp('kv_plan_until')->nullable());
        $add('two_factor_secret', fn ($t) => $t->text('two_factor_secret')->nullable());
        $add('two_factor_confirmed_at', fn ($t) => $t->timestamp('two_factor_confirmed_at')->nullable());
    }

    public function down(): void
    {
        foreach (['kv_reveals', 'kv_orders', 'kv_promo_codes', 'kv_contact_messages', 'kv_consents',
                  'kv_company_documents', 'kv_company_photos', 'kv_companies', 'kv_countries', 'kv_sectors'] as $t) {
            Schema::dropIfExists($t);
        }
        foreach (['kv_plan', 'kv_plan_until', 'two_factor_secret', 'two_factor_confirmed_at'] as $c) {
            if (Schema::hasColumn('users', $c)) {
                Schema::table('users', fn (Blueprint $t) => $t->dropColumn($c));
            }
        }
    }
};
