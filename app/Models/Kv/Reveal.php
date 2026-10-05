<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Reveal extends Model
{
    public $timestamps = false;
    protected $table = 'kv_reveals';
    protected $guarded = [];
}
