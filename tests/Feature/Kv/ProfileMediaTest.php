<?php

namespace Tests\Feature\Kv;

use App\Models\Kv\Company;
use App\Models\Kv\CompanyPhoto;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileMediaTest extends KvTestCase
{
    private function img(string $name = 'x.png', int $w = 120, int $h = 80): UploadedFile
    {
        return UploadedFile::fake()->image($name, $w, $h);
    }

    private function teamUser(Company $c, string $role, ?array $perms = null): User
    {
        $u = new User(['name' => 'Team '.$role, 'email' => $role.'@team.test', 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        TeamMember::create(['company_id' => $c->id, 'user_id' => $u->id, 'email' => $u->email, 'role' => $role, 'perms' => $perms, 'status' => 'active']);

        return $u;
    }

    public function test_guest_is_turned_away(): void
    {
        $this->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img()])->assertStatus(401);
        $this->getJson('/kv/me/media')->assertStatus(401);
        $this->deleteJson('/kv/me/media/cover')->assertStatus(401);
    }

    public function test_user_without_a_company_gets_404(): void
    {
        $u = new User(['name' => 'Loner', 'email' => 'l@x.test', 'password' => 'Secret-pass-1']);
        $u->role = 2;
        $u->email_verified_at = now();
        $u->save();
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img()])->assertStatus(404);
    }

    public function test_owner_replaces_the_logo_and_the_old_file_is_deleted(): void
    {
        [$u, $c] = $this->member();
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'logo', 'file' => $this->img('a.png')])->assertOk()->assertJsonStructure(['logo', 'cover', 'photos', 'limits']);
        $first = $c->fresh()->logo_path;
        $this->assertNotNull($first);
        Storage::disk('public')->assertExists($first);

        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'logo', 'file' => $this->img('b.png')])->assertOk();
        $second = $c->fresh()->logo_path;
        $this->assertNotSame($first, $second);
        Storage::disk('public')->assertMissing($first);
        Storage::disk('public')->assertExists($second);
    }

    public function test_cover_can_be_set_and_removed_but_the_logo_cannot_be_removed(): void
    {
        [$u, $c] = $this->member();
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img('c.jpg', 400, 100)])->assertOk();
        $path = $c->fresh()->cover_path;
        Storage::disk('public')->assertExists($path);

        $this->actingAs($u)->deleteJson('/kv/me/media/cover')->assertOk()->assertJsonPath('cover', null);
        $this->assertNull($c->fresh()->cover_path);
        Storage::disk('public')->assertMissing($path);

        $this->actingAs($u)->deleteJson('/kv/me/media/logo')->assertStatus(404);
    }

    public function test_gallery_is_limited_and_a_photo_can_be_removed_by_its_owner(): void
    {
        [$u, $c] = $this->member();
        $max = (int) config('kervea.uploads.max_photos');
        for ($i = 0; $i < $max; $i++) {
            $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'photo', 'file' => $this->img("p$i.png")])->assertOk();
        }
        $this->assertSame($max, $c->photos()->count());
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'photo', 'file' => $this->img('extra.png')])
            ->assertStatus(422)->assertJsonPath('error', 'photo_limit');
        $this->assertSame($max, $c->photos()->count());

        $one = $c->photos()->first();
        $this->actingAs($u)->deleteJson('/kv/me/media/photo/'.$one->id)->assertOk();
        $this->assertSame($max - 1, $c->photos()->count());
        Storage::disk('public')->assertMissing($one->path);
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'photo', 'file' => $this->img('again.png')])->assertOk();
    }

    public function test_another_company_cannot_touch_my_photo(): void
    {
        [$u1, $c1] = $this->member('One', 'one@x.test');
        [$u2, $c2] = $this->member('Two', 'two@x.test');
        $this->actingAs($u1)->postJson('/kv/me/media', ['kind' => 'photo', 'file' => $this->img()])->assertOk();
        $photo = $c1->photos()->firstOrFail();

        $this->actingAs($u2)->deleteJson('/kv/me/media/photo/'.$photo->id)->assertStatus(404);
        $this->assertNotNull(CompanyPhoto::find($photo->id));
        Storage::disk('public')->assertExists($photo->path);
        // and the listing of the other company never shows it
        $this->actingAs($u2)->getJson('/kv/me/media')->assertOk()->assertJsonCount(0, 'photos');
    }

    public function test_invalid_input_is_rejected(): void
    {
        [$u] = $this->member();
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'banner', 'file' => $this->img()])->assertStatus(422);
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover'])->assertStatus(422);
        // not an image: a PDF named .png
        $fake = UploadedFile::fake()->createWithContent('evil.png', "%PDF-1.4\n1 0 obj<<>>endobj\n%%EOF");
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $fake])->assertStatus(422);
        // SVG is never accepted
        $svg = UploadedFile::fake()->createWithContent('x.svg', '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $svg])->assertStatus(422);
        // too large for a logo (limit in KB)
        $big = UploadedFile::fake()->image('big.png', 100, 100)->size((int) config('kervea.uploads.logo_max_kb') + 10);
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'logo', 'file' => $big])->assertStatus(422);
        // absurd pixel dimensions are refused before the image is decoded
        $huge = UploadedFile::fake()->image('huge.png', 9000, 20);
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $huge])->assertStatus(422);
        // delete with a junk kind or a non-numeric photo id does not resolve
        $this->actingAs($u)->deleteJson('/kv/me/media/banner')->assertStatus(404);
        $this->actingAs($u)->deleteJson('/kv/me/media/photo/abc')->assertStatus(404);
        $this->actingAs($u)->deleteJson('/kv/me/media/photo')->assertStatus(404);
    }

    public function test_team_members_need_the_profile_permission(): void
    {
        [, $c] = $this->member();
        $ops = $this->teamUser($c, 'ops');       // role default includes "profile"
        $sales = $this->teamUser($c, 'sales');   // role default does not
        $this->actingAs($ops)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img()])->assertOk();
        $this->assertNotNull($c->fresh()->cover_path);

        $this->actingAs($sales)->postJson('/kv/me/media', ['kind' => 'photo', 'file' => $this->img()])->assertStatus(403);
        $this->actingAs($sales)->deleteJson('/kv/me/media/cover')->assertStatus(403);
        $this->assertNotNull($c->fresh()->cover_path);
        $this->assertSame(0, $c->photos()->count());
    }

    public function test_the_acting_company_comes_from_the_server_never_from_the_request(): void
    {
        [$u1, $c1] = $this->member('One', 'one@x.test');
        [, $c2] = $this->member('Two', 'two@x.test');
        $this->actingAs($u1)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img(), 'company_id' => $c2->id, 'company' => $c2->id])->assertOk();
        $this->assertNotNull($c1->fresh()->cover_path);
        $this->assertNull($c2->fresh()->cover_path);
    }

    public function test_a_pending_application_may_still_fix_its_images(): void
    {
        [$u, $c] = $this->member();
        $c->forceFill(['status' => 'pending'])->save();
        $this->actingAs($u)->postJson('/kv/me/media', ['kind' => 'cover', 'file' => $this->img()])->assertOk();
    }
}
