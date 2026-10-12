<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\NewsletterSubscriber;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    /**
     * POST /kv/newsletter – public sign-up (throttled in the route).
     * Idempotent per address, and the answer is identical for new and known addresses, so the endpoint
     * cannot be used to find out who is subscribed. The first consent proof is never overwritten.
     */
    public function store(Request $r)
    {
        // Honeypot: real visitors never fill the hidden "website" field. Pretend success, store nothing.
        if ($r->filled('website')) {
            return response()->json(['ok' => true]);
        }
        $v = $r->validate([
            'email' => 'required|string|email:rfc|max:254',
            'consent' => 'accepted',
            'locale' => 'nullable|in:tr,en,es,fr,ar,ru',
        ]);
        $email = mb_strtolower(trim($v['email']));
        $proof = [
            'locale' => $v['locale'] ?? null,
            'consented_at' => now(),
            'consent_ip' => substr((string) $r->ip(), 0, 45),
            'consent_user_agent' => substr((string) $r->userAgent(), 0, 255),
        ];

        try {
            $row = NewsletterSubscriber::firstOrCreate(['email' => $email], $proof);
        } catch (QueryException $e) {
            // Two simultaneous requests for the same address: the unique index stopped the second one.
            $row = NewsletterSubscriber::where('email', $email)->first();
            if (! $row) {
                throw $e;
            }
        }
        if (! $row->wasRecentlyCreated && $row->unsubscribed_at) {
            // Someone who had left signs up again: fresh consent, fresh proof.
            $row->forceFill($proof + ['unsubscribed_at' => null])->save();
        }

        return response()->json(['ok' => true]);
    }
}
