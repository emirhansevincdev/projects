<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** A newsletter sign-up (kv_newsletter). The address is stored lower-case; consent proof is write-once. */
class NewsletterSubscriber extends Model
{
    protected $table = 'kv_newsletter';
    protected $guarded = ['id'];
    protected $casts = ['consented_at' => 'datetime', 'unsubscribed_at' => 'datetime'];
}
