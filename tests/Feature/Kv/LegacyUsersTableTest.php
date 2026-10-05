<?php

namespace Tests\Feature\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;

/** The SQL-imported template `users` table has NOT NULL columns without defaults (type, status, …). */
class LegacyUsersTableTest extends KvTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Schema::disableForeignKeyConstraints();
        Schema::drop('users');
        Schema::create('users', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('email')->unique();
            $t->timestamp('email_verified_at')->nullable();
            $t->string('password');
            $t->string('role');
            $t->rememberToken();
            $t->timestamps();
            $t->string('type');                 // NOT NULL, no default
            $t->tinyInteger('status');          // NOT NULL, no default
            $t->string('phone');                // NOT NULL, no default (unknown to us)
            $t->string('kv_plan', 16)->default('free');
            $t->timestamp('kv_plan_until')->nullable();
            $t->text('two_factor_secret')->nullable();
            $t->timestamp('two_factor_confirmed_at')->nullable();
        });
        Schema::enableForeignKeyConstraints();
    }

    public function test_make_admin_and_approval_work_with_required_legacy_columns(): void
    {
        Mail::fake();
        $this->artisan('kervea:make-admin', ['email' => 'boss@example.com'])
            ->expectsQuestion('Parola (en az 12 karakter)', 'cok-guclu-parola-1')
            ->expectsQuestion('Parolayı tekrar yazın', 'cok-guclu-parola-1')
            ->assertSuccessful();
        $admin = User::where('email', 'boss@example.com')->firstOrFail();
        $this->assertSame('admin', $admin->type);
        $this->assertEquals(0, $admin->status);

        $this->postJson('/kv/applications', $this->payload())->assertCreated();
        $company = Company::firstOrFail();
        $this->actingAs($admin)->post("/admin/kervea/applications/{$company->id}/approve")->assertRedirect();

        $member = User::where('email', $company->email)->firstOrFail();
        $this->assertSame('customer', $member->type);
        $this->assertEquals(1, $member->status);
        $this->assertSame('', $member->phone);            // unknown required column → harmless empty value
        Mail::assertSent(KvMail::class, fn (KvMail $m) => $m->template === 'application_approved');
    }
}
