<?php

namespace Tests\Feature\Kv;

use App\Models\User;

class MakeAdminCommandTest extends KvTestCase
{
    public function test_creates_a_verified_admin_without_putting_the_password_on_the_command_line(): void
    {
        $this->artisan('kervea:make-admin', ['email' => 'boss@example.com', '--name' => 'Patron'])
            ->expectsQuestion('Parola (en az 12 karakter)', 'cok-guclu-parola-1')
            ->expectsQuestion('Parolayı tekrar yazın', 'cok-guclu-parola-1')
            ->assertSuccessful();

        $u = User::where('email', 'boss@example.com')->firstOrFail();
        $this->assertSame(1, (int) $u->role);
        $this->assertNotNull($u->email_verified_at);
        $this->postJson('/kv/auth/login', ['email' => 'boss@example.com', 'password' => 'cok-guclu-parola-1'])->assertOk()->assertJsonPath('user.is_admin', true);
    }

    public function test_rejects_short_or_mismatched_passwords(): void
    {
        $this->artisan('kervea:make-admin', ['email' => 'x@example.com'])
            ->expectsQuestion('Parola (en az 12 karakter)', 'kisa')
            ->assertFailed();
        $this->artisan('kervea:make-admin', ['email' => 'x@example.com'])
            ->expectsQuestion('Parola (en az 12 karakter)', 'cok-guclu-parola-1')
            ->expectsQuestion('Parolayı tekrar yazın', 'baska-parola-12345')
            ->assertFailed();
        $this->assertSame(0, User::count());
    }
}
