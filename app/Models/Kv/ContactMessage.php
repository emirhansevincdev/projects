<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $table = 'kv_contact_messages';
    protected $guarded = ['status'];
}
