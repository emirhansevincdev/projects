<?php

namespace App\Models\Kv;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MessageReport extends Model
{
    public const UPDATED_AT = null;
    public const STATUS_OPEN = 'open';
    public const STATUS_REVIEWED = 'reviewed';
    public const STATUS_DISMISSED = 'dismissed';
    public const CATEGORIES = ['spam', 'abuse', 'fraud', 'contact_info', 'other'];

    protected $table = 'kv_message_reports';
    protected $guarded = ['id'];
    protected $casts = ['created_at' => 'datetime', 'handled_at' => 'datetime'];

    public function message() { return $this->belongsTo(Message::class, 'message_id'); }
    public function reporterCompany() { return $this->belongsTo(Company::class, 'reporter_company_id'); }
    public function reporterUser() { return $this->belongsTo(User::class, 'reporter_user_id'); }
    public function handler() { return $this->belongsTo(User::class, 'handled_by'); }
}
