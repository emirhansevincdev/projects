<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** Public KVKK removal request for a person listed in "Kişiler". */
class RemovalRequest extends Model
{
    protected $table = 'kv_removal_requests';
    protected $guarded = ['id', 'status', 'handled_by', 'handled_at'];
    protected $casts = ['handled_at' => 'datetime'];

    public const STATUS_NEW = 'new';
    public const STATUS_DONE = 'done';
    public const STATUS_REJECTED = 'rejected';
}
