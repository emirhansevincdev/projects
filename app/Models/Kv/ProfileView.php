<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** One (deduplicated) visit of a company page. Written only by App\Services\Kv\AnalyticsRecorder. */
class ProfileView extends Model
{
    public $timestamps = false;
    protected $table = 'kv_profile_views';
    protected $guarded = [];
    protected $casts = ['created_at' => 'datetime'];

    public function company() { return $this->belongsTo(Company::class); }
    public function viewerCompany() { return $this->belongsTo(Company::class, 'viewer_company_id'); }
}
