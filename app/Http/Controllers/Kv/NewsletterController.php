<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\NewsletterSubscriber;
use Illuminate\Database\QueryException;
use App\Mail\Kv\KvMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    /**
     * POST /kv/newsletter – public sign-up (throttled in the route).
     * Idempotent per address, and the answer is identical for new, known and unsubscribed addresses, so the endpoint
     * cannot be used to find out who is subscribed. The first consent proof is never overwritten. Double opt-in (see below).
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

        // Double opt-in. The form only proves that SOMEONE typed this address; the owner confirms through the mailed link.
        //  - someone who left stays out: a third party cannot undo an opt-out with this form (a person who really wants back
        //    writes to us; the admin can delete the row)
        //  - already confirmed: nothing to do
        //  - waiting for confirmation: the mail is sent for new rows and re-sent at most once an hour (no mail bombing of a victim)
        if (! $row->unsubscribed_at && ! $row->confirmed_at
            && (! $row->confirmation_sent_at || $row->confirmation_sent_at->lt(now()->subHour()))) {
            $row->forceFill(['confirmation_sent_at' => now()])->save();
            try {
                Mail::to($row->email)->send(new KvMail('Bülten aboneliğinizi onaylayın · Kervea', 'newsletter_confirm', ['url' => $row->confirmUrl()]));
            } catch (\Throwable $e) {
                Log::warning('kv: newsletter confirmation mail failed', ['err' => get_class($e)]);   // never the address or the link
            }
        }

        return response()->json(['ok' => true]);
    }

    /** GET /kv/newsletter/confirm/{subscriber} (signed link from the confirmation mail). */
    public function confirm(NewsletterSubscriber $subscriber)
    {
        if (! $subscriber->unsubscribed_at && ! $subscriber->confirmed_at) {
            $subscriber->forceFill(['confirmed_at' => now()])->save();
        }
        $done = ! $subscriber->unsubscribed_at;
        return response()->view('kervea.newsletter-result', [
            'title' => $done ? 'Aboneliğiniz onaylandı' : 'Abonelik tamamlanamadı',
            'text' => $done ? 'Teşekkürler. Kervea duyurularını bu adrese göndereceğiz. Her e-postadaki bağlantıdan istediğiniz zaman ayrılabilirsiniz.' : 'Bu adres daha önce listeden ayrıldı. Yeniden abone olmak için bize İletişim sayfasından yazın.',
        ])->header('Cache-Control', 'no-store')->header('Referrer-Policy', 'no-referrer');
    }

    /** GET /kv/newsletter/unsubscribe/{subscriber} (signed link, put into every newsletter e-mail). */
    public function unsubscribe(NewsletterSubscriber $subscriber)
    {
        if (! $subscriber->unsubscribed_at) {
            $subscriber->forceFill(['unsubscribed_at' => now()])->save();
        }
        return response()->view('kervea.newsletter-result', [
            'title' => 'Listeden çıkarıldınız',
            'text' => 'Bu adrese artık Kervea duyurusu göndermeyeceğiz.',
        ])->header('Cache-Control', 'no-store')->header('Referrer-Policy', 'no-referrer');
    }
}
