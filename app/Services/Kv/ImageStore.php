<?php

namespace App\Services\Kv;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Stores user-supplied images safely: content is sniffed (not the extension), decoded and
 * re-encoded with GD, which also strips EXIF/embedded payloads. SVG/GIF are never accepted.
 */
class ImageStore
{
    public const MIMES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];

    public static function save(UploadedFile $file, string $dir, int $maxSide = 1600): string
    {
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($file->getRealPath());
        if (! isset(self::MIMES[$mime])) {
            throw new \InvalidArgumentException('Unsupported image type');
        }
        $src = @imagecreatefromstring(file_get_contents($file->getRealPath()));
        if (! $src) {
            throw new \InvalidArgumentException('Corrupt image');
        }
        $w = imagesx($src);
        $h = imagesy($src);
        if (max($w, $h) > $maxSide) {
            $scale = $maxSide / max($w, $h);
            $dst = imagecreatetruecolor((int) round($w * $scale), (int) round($h * $scale));
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            imagecopyresampled($dst, $src, 0, 0, 0, 0, imagesx($dst), imagesy($dst), $w, $h);
            imagedestroy($src);
            $src = $dst;
        }

        $ext = $mime === 'image/png' ? 'png' : 'webp';  // photos → webp, transparency kept for PNG logos
        ob_start();
        $ext === 'png' ? imagepng($src, null, 6) : imagewebp($src, null, 82);
        $bin = ob_get_clean();
        imagedestroy($src);

        $path = trim($dir, '/').'/'.Str::random(32).'.'.$ext;
        Storage::disk('public')->put($path, $bin);
        return $path;
    }

    /** Documents (PDF/images) go to the private disk and are served only through admin routes. */
    public static function saveDocument(UploadedFile $file, string $dir): array
    {
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($file->getRealPath());
        $allowed = ['application/pdf' => 'pdf', 'image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
        if (! isset($allowed[$mime])) {
            throw new \InvalidArgumentException('Unsupported document type');
        }
        $path = trim($dir, '/').'/'.Str::random(40).'.'.$allowed[$mime];
        Storage::disk('local')->put($path, file_get_contents($file->getRealPath()));
        return [
            'path' => $path,
            'original_name' => Str::limit(preg_replace('/[^\w.\- ]+/u', '_', $file->getClientOriginalName()), 120, ''),
            'mime' => $mime,
            'size' => $file->getSize(),
        ];
    }
}
