<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Sector extends Model
{
    protected $table = 'kv_sectors';
    protected $guarded = [];
    protected $casts = ['names' => 'array', 'is_active' => 'boolean'];

    public function parent() { return $this->belongsTo(self::class, 'parent_id'); }
    public function children() { return $this->hasMany(self::class, 'parent_id')->orderBy('sort'); }

    public function name(string $lang = 'tr'): string
    {
        return $this->names[$lang] ?? $this->names['tr'] ?? $this->slug;
    }
}
