<?php

namespace App\Models\Kv;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $table = 'kv_team_members';
    protected $guarded = ['id'];
    protected $casts = ['perms' => 'array', 'invited_at' => 'datetime', 'accepted_at' => 'datetime'];
    protected $hidden = ['invite_token_hash'];

    public const STATUS_INVITED = 'invited';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_DISABLED = 'disabled';

    public function company() { return $this->belongsTo(Company::class); }
    public function user() { return $this->belongsTo(User::class); }
}
