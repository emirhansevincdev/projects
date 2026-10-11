<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** A decision maker listed in "Kişiler". Contact data leaves the server only through PeopleController::reveal (paid). */
class Person extends Model
{
    protected $table = 'kv_people';
    protected $guarded = ['id', 'status'];
    protected $hidden = ['email', 'phone'];          // never serialised by accident

    public const STATUS_ACTIVE = 'active';
    public const STATUS_REMOVED = 'removed';
    public const DEPARTMENTS = ['ceo', 'purchasing', 'sales', 'export', 'ops', 'other'];
    public const SOURCES = ['import', 'manual', 'member'];

    public function sector() { return $this->belongsTo(Sector::class); }
    public function company() { return $this->belongsTo(Company::class); }
    public function reveals() { return $this->hasMany(PersonReveal::class); }

    public function scopeActive($q) { return $q->where('status', self::STATUS_ACTIVE); }

    /** KVKK removal: keep the row (so the person is not re-imported by mistake and reveals stay consistent) but drop everything personal. */
    public function erase(): void
    {
        $this->forceFill([
            'status' => self::STATUS_REMOVED, 'name' => '—', 'title' => null, 'company_name' => '—', 'email' => null, 'phone' => null,
            'linkedin' => null, 'company_id' => null,
        ])->save();
    }
}
