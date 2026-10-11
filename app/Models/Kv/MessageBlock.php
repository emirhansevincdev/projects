<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** company_id does not want messages from blocked_company_id. */
class MessageBlock extends Model
{
    public const UPDATED_AT = null;

    protected $table = 'kv_message_blocks';
    protected $guarded = ['id'];

    /** True when either company has blocked the other. */
    public static function either(int $x, int $y): bool
    {
        return static::where(fn ($q) => $q->where('company_id', $x)->where('blocked_company_id', $y))
            ->orWhere(fn ($q) => $q->where('company_id', $y)->where('blocked_company_id', $x))
            ->exists();
    }

    public static function blocks(int $blocker, int $blocked): bool
    {
        return static::where('company_id', $blocker)->where('blocked_company_id', $blocked)->exists();
    }
}
