<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\CompanyPhoto;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\FirmPresenter;
use App\Services\Kv\ImageStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * Logo, cover and gallery of the member's OWN company (member panel, "Firma Profilim").
 * The company always comes from CompanyContext and the person must hold the "profile" permission (checked in company());
 * no company or photo id from the browser is trusted without an ownership check.
 * Files are sniffed and re-encoded by ImageStore (EXIF stripped, SVG/GIF refused) before they are stored.
 */
class ProfileMediaController extends Controller
{
    private function company(Request $r): Company
    {
        $ctx = CompanyContext::forRequest($r);
        abort_unless($ctx, 404);
        // Same rule as PUT /kv/me/company: the owner, or a team member holding the "profile" permission (a pending application may still fix its images).
        abort_unless(in_array('profile', $ctx['perms'], true), 403, 'forbidden');

        return $ctx['company'];
    }

    /** GET /kv/me/media – current images with the ids needed to remove gallery photos. */
    public function show(Request $r)
    {
        return response()->json($this->payload($this->company($r)))->header('Cache-Control', 'no-store');
    }

    /** POST /kv/me/media  (kind = logo | cover | photo, file) */
    public function store(Request $r)
    {
        $company = $this->company($r);
        $u = config('kervea.uploads');
        $v = $r->validate([
            'kind' => 'required|in:logo,cover,photo',
            // the pixel limit keeps a tiny, highly compressed file from being decoded into a gigantic bitmap (memory exhaustion)
            'file' => 'required|file|mimetypes:image/jpeg,image/png,image/webp|dimensions:max_width=8000,max_height=8000|max:'.($r->input('kind') === 'logo' ? $u['logo_max_kb'] : $u['image_max_kb']),
        ]);
        $dir = 'kv/companies/'.$company->id;

        if ($v['kind'] === 'photo') {
            // The count check and the insert share one transaction on the company row, so two parallel uploads cannot exceed the limit.
            $max = (int) $u['max_photos'];
            $saved = null;
            try {
                DB::transaction(function () use ($company, $r, $dir, $max, &$saved) {
                    $locked = Company::whereKey($company->id)->lockForUpdate()->first();
                    if ($locked->photos()->count() >= $max) {
                        throw new \OverflowException('photo_limit');
                    }
                    $saved = ImageStore::save($r->file('file'), $dir, 1600);
                    CompanyPhoto::create(['company_id' => $company->id, 'path' => $saved, 'sort' => (int) $locked->photos()->max('sort') + 1]);
                });
            } catch (\OverflowException $e) {
                return response()->json(['message' => "En fazla {$max} fotoğraf eklenebilir.", 'error' => 'photo_limit'], 422);
            } catch (\InvalidArgumentException $e) {
                return response()->json(['message' => 'Görsel kabul edilmedi.', 'error' => 'bad_image'], 422);
            } catch (\Throwable $e) {
                if ($saved) {
                    Storage::disk('public')->delete($saved);   // no orphan file when the insert failed
                }
                throw $e;
            }
        } else {
            try {
                $path = ImageStore::save($r->file('file'), $dir, $v['kind'] === 'logo' ? 600 : 1600);
            } catch (\InvalidArgumentException $e) {
                return response()->json(['message' => 'Görsel kabul edilmedi.', 'error' => 'bad_image'], 422);
            }
            $col = $v['kind'].'_path';
            $old = $company->{$col};
            $company->{$col} = $path;
            $company->save();
            if ($old) {
                Storage::disk('public')->delete($old);
            }
        }

        return response()->json($this->payload($company->fresh()));
    }

    /** DELETE /kv/me/media/cover  |  DELETE /kv/me/media/photo/{photo}.  The logo can be replaced but not removed. */
    public function destroy(Request $r, string $kind, ?int $photo = null)
    {
        $company = $this->company($r);

        if ($kind === 'cover') {
            $old = $company->cover_path;
            $company->cover_path = null;
            $company->save();
            if ($old) {
                Storage::disk('public')->delete($old);
            }
        } elseif ($kind === 'photo' && $photo !== null) {
            // Ownership: the photo must belong to the acting company, otherwise it does not exist for this person.
            $p = CompanyPhoto::where('company_id', $company->id)->whereKey($photo)->first();
            abort_unless($p, 404);
            Storage::disk('public')->delete($p->path);
            $p->delete();
        } else {
            abort(404);
        }

        return response()->json($this->payload($company->fresh()));
    }

    private function payload(Company $c): array
    {
        return [
            'logo' => FirmPresenter::fileUrl($c->logo_path),
            'cover' => FirmPresenter::fileUrl($c->cover_path),
            'photos' => $c->photos()->get()->map(fn ($p) => ['id' => $p->id, 'url' => FirmPresenter::fileUrl($p->path)])->all(),
            'limits' => ['photos' => (int) config('kervea.uploads.max_photos'), 'logo_kb' => (int) config('kervea.uploads.logo_max_kb'), 'image_kb' => (int) config('kervea.uploads.image_max_kb')],
        ];
    }
}
