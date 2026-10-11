<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class PersonReveal extends Model
{
    public $timestamps = false;
    protected $table = 'kv_person_reveals';
    protected $guarded = ['id'];
    protected $casts = ['created_at' => 'datetime'];

    public const CHANNELS = ['email', 'phone'];

    public function person() { return $this->belongsTo(Person::class); }
}
