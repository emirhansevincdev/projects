<?php

namespace App\Services\Kv;

use RuntimeException;

/** Thrown by CreditService::spend() when the balance would go below zero. Nothing was changed. */
class InsufficientCreditsException extends RuntimeException
{
    public function __construct(public readonly int $balance, public readonly int $needed)
    {
        parent::__construct("Insufficient credits: balance {$balance}, needed {$needed}");
    }
}
