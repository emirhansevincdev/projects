<?php

namespace App\Models\Kv;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Company extends Model
{
    protected $table = 'kv_companies';
    protected $guarded = ['id', 'status', 'is_verified', 'user_id', 'reviewed_at', 'reviewed_by'];
    protected $casts = ['social' => 'array', 'is_verified' => 'boolean', 'reviewed_at' => 'datetime'];

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_SUSPENDED = 'suspended';

    public function user() { return $this->belongsTo(User::class); }
    public function sector() { return $this->belongsTo(Sector::class); }
    public function subsector() { return $this->belongsTo(Sector::class, 'subsector_id'); }
    public function country() { return $this->belongsTo(Country::class, 'country_cc', 'cc'); }
    public function photos() { return $this->hasMany(CompanyPhoto::class)->orderBy('sort'); }
    public function documents() { return $this->hasMany(CompanyDocument::class); }
    public function consents() { return $this->hasMany(Consent::class); }

    public function scopeApproved($q) { return $q->where('status', self::STATUS_APPROVED); }

    public static function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'firma';
        $slug = $base;
        $i = 2;
        while (static::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }
        return $slug;
    }

    public function hasConsent(string $type): bool
    {
        $last = $this->consents()->where('type', $type)->latest('id')->first();
        return (bool) ($last && $last->granted);
    }
}
