<?php

namespace App\Models\Kv;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public const UPDATED_AT = null;

    protected $table = 'kv_messages';
    protected $guarded = ['id'];
    protected $casts = ['created_at' => 'datetime', 'attachment_size' => 'integer'];

    public function conversation() { return $this->belongsTo(Conversation::class, 'conversation_id'); }
    public function senderCompany() { return $this->belongsTo(Company::class, 'sender_company_id'); }
    public function senderUser() { return $this->belongsTo(User::class, 'sender_user_id'); }

    public function hasAttachment(): bool
    {
        return (bool) $this->attachment_path;
    }
}
