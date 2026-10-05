<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'kv_orders';
    protected $guarded = ['status', 'paid_at'];
    protected $casts = ['paid_at' => 'datetime'];

    public function promo() { return $this->belongsTo(PromoCode::class, 'promo_code_id'); }
}
