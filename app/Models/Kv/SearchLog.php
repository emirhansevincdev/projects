<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** One (deduplicated) search with criteria. No IP, no user id. Written only by App\Services\Kv\AnalyticsRecorder. */
class SearchLog extends Model
{
    public $timestamps = false;
    protected $table = 'kv_search_log';
    protected $guarded = [];
    protected $casts = ['created_at' => 'datetime'];
}
