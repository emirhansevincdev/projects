<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'kv_countries';
    protected $primaryKey = 'cc';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];
    protected $casts = ['names' => 'array', 'is_active' => 'boolean'];
}
