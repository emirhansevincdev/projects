<?php

namespace App\Services\Kv;

use App\Models\Kv\Message;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\HeaderUtils;

/**
 * Message attachments: jpg / png / webp / pdf. The real type is sniffed from the bytes (never the extension or the browser's
 * Content-Type). Raster images are decoded and re-encoded with GD (strips EXIF and anything appended to the file);
 * PDFs are kept byte-for-byte. Everything lands on the PRIVATE disk and is served only through an authorized route.
 */
class MessageAttachments
{
    public const TYPES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf'];

    /** Decoded images above this many pixels are refused (decompression bomb guard). */
    public const MAX_PIXELS = 36_000_000;
    public const MAX_SIDE = 2400;

    /**
     * @return array{path:string,name:string,mime:string,size:int}
     * @throws MessagingException invalid_file
     */
    public static function store(UploadedFile $file, int $conversationId): array
    {
        $real = $file->getRealPath();
        if (! $real || ! is_readable($real)) {
            throw new MessagingException('invalid_file');
        }
        $mime = (new \finfo(FILEINFO_MIME_TYPE))->file($real);
        if (! is_string($mime) || ! isset(self::TYPES[$mime])) {
            throw new MessagingException('invalid_file');
        }
        $raw = (string) file_get_contents($real);

        if ($mime === 'application/pdf') {
            if (! str_starts_with(ltrim(substr($raw, 0, 1024), "\xEF\xBB\xBF \t\r\n"), '%PDF-')) {
                throw new MessagingException('invalid_file');
            }
            $bin = $raw;
        } else {
            $bin = self::reencode($raw, $mime, $real);
        }

        $ext = self::TYPES[$mime];
        $path = 'kv/messages/'.$conversationId.'/'.Str::random(40).'.'.$ext;
        Storage::disk('local')->put($path, $bin);

        return [
            'path' => $path,
            'name' => self::displayName($file->getClientOriginalName(), $ext),
            'mime' => $mime,
            'size' => strlen($bin),
        ];
    }

    /**
     * Download response for a stored attachment. A plain Response (not a StreamedResponse): the site-wide PreventBackHistory
     * middleware calls ->header() on whatever it gets back. Files are capped at a few MB, so reading them whole is fine.
     */
    public static function response(Message $m): Response
    {
        abort_unless($m->attachment_path && Storage::disk('local')->exists($m->attachment_path), 404);
        $name = $m->attachment_name ?: 'file';
        $fallback = trim((string) preg_replace('/[^A-Za-z0-9._\- ]+/', '_', Str::ascii($name)), ' ') ?: 'file';
        return response((string) Storage::disk('local')->get($m->attachment_path), 200, [
            'Content-Type' => $m->attachment_mime ?: 'application/octet-stream',
            'Content-Disposition' => HeaderUtils::makeDisposition(HeaderUtils::DISPOSITION_ATTACHMENT, $name, $fallback),
            'X-Content-Type-Options' => 'nosniff',
            'Content-Security-Policy' => "default-src 'none'; sandbox",
            'Cache-Control' => 'private, no-store',
        ]);
    }

    /** Safe display / download name: letters, digits and a few separators; the extension always matches the stored type. */
    public static function displayName(?string $original, string $ext): string
    {
        $stem = pathinfo(str_replace('\\', '/', (string) $original), PATHINFO_FILENAME);
        $stem = preg_replace('/[^\p{L}\p{N}._\-() ]+/u', '_', $stem) ?? '';
        $stem = trim(preg_replace('/\.{2,}/', '.', $stem) ?? '', " ._");
        $stem = mb_substr($stem, 0, 100);
        return ($stem !== '' ? $stem : 'file').'.'.$ext;
    }

    private static function reencode(string $raw, string $mime, string $realPath): string
    {
        $info = @getimagesizefromstring($raw);
        if (! $info || ($info[0] * $info[1]) > self::MAX_PIXELS || ($info[0] * $info[1]) <= 0) {
            throw new MessagingException('invalid_file');
        }
        $src = @imagecreatefromstring($raw);
        if (! $src) {
            throw new MessagingException('invalid_file');
        }
        if ($mime === 'image/jpeg' && function_exists('exif_read_data')) {
            $src = self::applyOrientation($src, $realPath);
        }
        $w = imagesx($src);
        $h = imagesy($src);
        if (max($w, $h) > self::MAX_SIDE) {
            $scale = self::MAX_SIDE / max($w, $h);
            $dst = imagecreatetruecolor(max(1, (int) round($w * $scale)), max(1, (int) round($h * $scale)));
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            imagecopyresampled($dst, $src, 0, 0, 0, 0, imagesx($dst), imagesy($dst), $w, $h);
            imagedestroy($src);
            $src = $dst;
        }

        ob_start();
        match ($mime) {
            'image/png' => (function () use ($src) { imagealphablending($src, false); imagesavealpha($src, true); imagepng($src, null, 6); })(),
            'image/webp' => (function () use ($src) { imagealphablending($src, false); imagesavealpha($src, true); imagewebp($src, null, 85); })(),
            default => imagejpeg($src, null, 86),
        };
        $bin = (string) ob_get_clean();
        imagedestroy($src);
        if ($bin === '') {
            throw new MessagingException('invalid_file');
        }
        return $bin;
    }

    /** Phone photos carry their rotation in EXIF, which the re-encode drops: apply it first. */
    private static function applyOrientation(\GdImage $img, string $realPath): \GdImage
    {
        try {
            $exif = @exif_read_data($realPath);
            $o = (int) ($exif['Orientation'] ?? 1);
            $deg = [3 => 180, 6 => -90, 8 => 90][$o] ?? 0;
            if ($deg !== 0 && ($rot = imagerotate($img, $deg, 0))) {
                imagedestroy($img);
                return $rot;
            }
        } catch (\Throwable $e) {
            // orientation is cosmetic
        }
        return $img;
    }
}
