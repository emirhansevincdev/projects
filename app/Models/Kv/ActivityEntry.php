<?php

namespace App\Models\Kv;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/** One line of a company's activity log (written only through App\Services\Kv\Activity). */
class ActivityEntry extends Model
{
    public const UPDATED_AT = null;

    protected $table = 'kv_activity';
    protected $guarded = ['id'];
    protected $casts = ['meta' => 'array', 'created_at' => 'datetime'];
    protected $hidden = ['ip'];

    public function company() { return $this->belongsTo(Company::class); }
    public function user() { return $this->belongsTo(User::class); }
}
