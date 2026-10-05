<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Consent extends Model
{
    public $timestamps = false;
    protected $table = 'kv_consents';
    protected $guarded = [];
    protected $casts = ['granted' => 'boolean', 'created_at' => 'datetime'];

    public const TYPES = ['kvkk', 'terms', 'verification', 'marketing', 'contact_visibility', 'cross_border', 'cookies'];
}
