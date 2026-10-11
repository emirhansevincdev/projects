<?php

namespace App\Services\Kv;

/** A messaging rule refused the action. `errorCode` is what the browser receives in {error}. */
class MessagingException extends \RuntimeException
{
    /** HTTP status per error code. */
    public const STATUS = [
        'self' => 422,
        'unavailable' => 403,
        'sector_mismatch' => 403,
        'blocked_by_me' => 403,
        'pro_required' => 403,
        'quota' => 429,
        'not_found' => 404,
        'invalid_file' => 422,
    ];

    public function __construct(public string $errorCode, ?int $status = null)
    {
        parent::__construct($errorCode);
        $this->status = $status ?? (self::STATUS[$errorCode] ?? 403);
    }

    public int $status = 403;
}
