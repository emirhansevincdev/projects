<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'kv_orders';
    protected $guarded = ['status', 'paid_at'];
    protected $casts = ['paid_at' => 'datetime', 'credits' => 'integer'];

    public const KIND_PRO = 'pro';
    public const KIND_CREDITS = 'credits';

    public function promo() { return $this->belongsTo(PromoCode::class, 'promo_code_id'); }
    public function company() { return $this->belongsTo(Company::class); }
}
