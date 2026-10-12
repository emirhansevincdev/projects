<?php

namespace App\Models\Kv;

use Illuminate\Database\Eloquent\Model;

/** A newsletter sign-up (kv_newsletter). The address is stored lower-case; consent proof is write-once. */
class NewsletterSubscriber extends Model
{
    protected $table = 'kv_newsletter';
    protected $guarded = ['id'];
    protected $casts = ['consented_at' => 'datetime', 'unsubscribed_at' => 'datetime', 'confirmed_at' => 'datetime', 'confirmation_sent_at' => 'datetime'];

    /** Signed links (no login, no expiry, tied to this row and the app key). Relative signatures survive proxies / host aliases. */
    public function confirmUrl(): string
    {
        return url(\Illuminate\Support\Facades\URL::signedRoute('kv.newsletter.confirm', ['subscriber' => $this->id], null, false));
    }

    public function unsubscribeUrl(): string
    {
        return url(\Illuminate\Support\Facades\URL::signedRoute('kv.newsletter.unsubscribe', ['subscriber' => $this->id], null, false));
    }
}
