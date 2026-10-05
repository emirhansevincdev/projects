<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    protected $table = 'kv_promo_codes';
    protected $guarded = ['used_count'];
    protected $casts = ['is_active' => 'boolean', 'starts_at' => 'datetime', 'expires_at' => 'datetime'];

    public function isUsable(): bool
    {
        if (! $this->is_active) return false;
        if ($this->starts_at && $this->starts_at->isFuture()) return false;
        if ($this->expires_at && $this->expires_at->isPast()) return false;
        if ($this->max_uses !== null && $this->used_count >= $this->max_uses) return false;
        return true;
    }

    /** Discount in cents for a given amount. */
    public function discountFor(int $amountCents): int
    {
        $d = $this->type === 'percent'
            ? intdiv($amountCents * min(100, $this->value), 100)
            : $this->value;
        return min($amountCents, $d);
    }

    public static function normalize(string $code): string
    {
        return strtoupper(trim($code));
    }
}
