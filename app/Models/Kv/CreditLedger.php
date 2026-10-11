<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** One immutable line of a company's credit history. Written only by App\Services\Kv\CreditService. */
class CreditLedger extends Model
{
    public $timestamps = false;
    protected $table = 'kv_credit_ledger';
    protected $guarded = ['id'];
    protected $casts = ['meta' => 'array', 'delta' => 'integer', 'balance_after' => 'integer', 'created_at' => 'datetime'];

    public const REASONS = ['signup', 'purchase', 'pro_bonus', 'person_reveal', 'admin_adjust', 'refund'];

    public function company() { return $this->belongsTo(Company::class); }
}
