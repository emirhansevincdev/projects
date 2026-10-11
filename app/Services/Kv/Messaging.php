<?php

namespace App\Services\Kv;

use App\Mail\Kv\KvMail;
use App\Models\Kv\Company;
use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Models\Kv\MessageBlock;
use App\Models\Kv\TeamMember;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/**
 * The messaging rules in ONE place (controllers only translate HTTP):
 *  - only APPROVED companies of the SAME sector (sector_id) talk to each other, never with themselves, never across a block
 *  - STARTING a conversation needs the Premium plan of the acting company (team members use the owner's plan) and is capped per day;
 *    REPLYING in an existing conversation is always allowed
 *  - a message's text is plain text (tags stripped); contact data is never part of a notification e-mail
 */
class Messaging
{
    public const NOTIFY_MINUTES = 30;

    // ── rules ───────────────────────────────────────────────────────────────────────────────
    /** Why $me may not write to $other at all (plan/quota not considered). null = allowed. */
    public static function pairReason(Company $me, Company $other): ?string
    {
        if ((int) $me->id === (int) $other->id) {
            return 'self';
        }
        if ($me->status !== Company::STATUS_APPROVED || $other->status !== Company::STATUS_APPROVED) {
            return 'unavailable';
        }
        if (! $me->sector_id || (int) $me->sector_id !== (int) $other->sector_id) {
            return 'sector_mismatch';
        }
        if (MessageBlock::blocks($me->id, $other->id)) {
            return 'blocked_by_me';
        }
        if (MessageBlock::blocks($other->id, $me->id)) {
            return 'unavailable';          // the blocked side is never told who blocked
        }
        return null;
    }

    /** Extra conditions for a NEW conversation: Premium plan and the daily cap. */
    public static function startReason(Company $me, User $user, Company $other): ?string
    {
        if ($r = self::pairReason($me, $other)) {
            return $r;
        }
        if (! FirmPresenter::isPro($user)) {
            return 'pro_required';
        }
        if (self::startedLastDay($me->id) >= self::dailyLimit()) {
            return 'quota';
        }
        return null;
    }

    public static function dailyLimit(): int
    {
        return max(1, (int) config('kervea.messaging.new_conversations_per_day', 20));
    }

    public static function startedLastDay(int $companyId): int
    {
        return Conversation::where('started_by_company_id', $companyId)->where('created_at', '>=', now()->subDay())->count();
    }

    /** What the firm page needs to know: may $me write to $other, and is there already a conversation to open? */
    public static function eligibility(Company $me, User $user, Company $other): array
    {
        $conv = (int) $me->id === (int) $other->id ? null : Conversation::between($me->id, $other->id);
        $reason = $conv ? self::pairReason($me, $other) : self::startReason($me, $user, $other);
        return [
            'can' => $reason === null,
            'reason' => $reason,
            'conversation_id' => ($reason === null && $conv) ? $conv->id : null,
            'is_pro' => FirmPresenter::isPro($user),
        ];
    }

    // ── text ────────────────────────────────────────────────────────────────────────────────
    /** Plain text only: control characters and HTML are removed, line breaks kept. */
    public static function cleanBody(?string $s): string
    {
        $s = mb_scrub((string) $s, 'UTF-8');
        $s = str_replace(["\r\n", "\r"], "\n", $s);
        $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? $s;
        $s = preg_replace('#<\s*(script|style)\b[^>]*>.*?<\s*/\s*\1\s*>#is', '', $s) ?? $s;
        $s = preg_replace('#<!--.*?-->#s', '', $s) ?? $s;
        $s = preg_replace('#</?[a-zA-Z][^>]*>#', '', $s) ?? $s;
        $s = preg_replace("/\n{3,}/", "\n\n", $s) ?? $s;
        return trim($s);
    }

    public static function preview(Message $m): string
    {
        $t = trim(preg_replace('/\s+/u', ' ', (string) $m->body) ?? '');
        if ($t === '' && $m->hasAttachment()) {
            return (string) $m->attachment_name;
        }
        return mb_strlen($t) > 120 ? mb_substr($t, 0, 119).'…' : $t;
    }

    // ── writing ─────────────────────────────────────────────────────────────────────────────
    /**
     * Start a conversation (or, when the pair already talks, simply write in it — the plan/cap only guard NEW conversations).
     * @return array{conversation:Conversation,message:Message,created:bool,started:bool}
     * @throws MessagingException
     */
    public static function start(Company $me, User $user, Company $other, string $body, ?string $clientId = null): array
    {
        $out = DB::transaction(function () use ($me, $user, $other, $body, $clientId) {
            Company::whereKey($me->id)->lockForUpdate()->first();             // two parallel starts of one company are serialised (daily cap)
            $conv = Conversation::between($me->id, $other->id);
            $started = false;
            if (! $conv) {
                if ($r = self::startReason($me, $user, $other)) {
                    throw new MessagingException($r);
                }
                [$a, $b] = Conversation::pair($me->id, $other->id);
                $now = now();
                $started = DB::table('kv_conversations')->insertOrIgnore([
                    'company_a_id' => $a, 'company_b_id' => $b, 'started_by_company_id' => $me->id,
                    'last_message_at' => $now, 'created_at' => $now, 'updated_at' => $now,
                ]) === 1;
                $conv = Conversation::between($me->id, $other->id);
            }
            return self::append($conv, $me, $user, $body, null, $clientId) + ['started' => $started];
        });
        self::afterWrite($out, $me, $user);
        return $out;
    }

    /**
     * Write into an existing conversation (reply or follow-up). Always allowed between two eligible companies — also for free members.
     * @param  array{path:string,name:string,mime:string,size:int}|null  $att  already stored attachment
     * @return array{conversation:Conversation,message:Message,created:bool,started:bool}
     * @throws MessagingException
     */
    public static function send(Conversation $conv, Company $me, User $user, string $body, ?array $att = null, ?string $clientId = null): array
    {
        $out = DB::transaction(fn () => self::append($conv, $me, $user, $body, $att, $clientId) + ['started' => false]);
        self::afterWrite($out, $me, $user);
        return $out;
    }

    /** @return array{conversation:Conversation,message:Message,created:bool,reply_seconds:?int,other:Company} */
    private static function append(Conversation $conv, Company $me, User $user, string $body, ?array $att, ?string $clientId): array
    {
        $conv = Conversation::whereKey($conv->id)->lockForUpdate()->firstOrFail();      // one writer per conversation at a time
        if (! $conv->involves((int) $me->id)) {
            throw new MessagingException('not_found');
        }
        $other = Company::find($conv->otherId((int) $me->id));
        if (! $other) {
            throw new MessagingException('unavailable');
        }
        if ($r = self::pairReason($me, $other)) {
            throw new MessagingException($r);
        }
        if ($clientId !== null && ($dup = Message::where('conversation_id', $conv->id)->where('sender_company_id', $me->id)->where('client_id', $clientId)->first())) {
            return ['conversation' => $conv, 'message' => $dup, 'created' => false, 'reply_seconds' => null, 'other' => $other];
        }

        // Answering = the first message after the other side's latest one.
        $last = Message::where('conversation_id', $conv->id)->orderByDesc('id')->first();
        $replySeconds = ($last && (int) $last->sender_company_id !== (int) $me->id)
            ? max(0, now()->timestamp - $last->created_at->timestamp) : null;

        $msg = Message::create([
            'conversation_id' => $conv->id, 'sender_company_id' => $me->id, 'sender_user_id' => $user->id,
            'body' => $body, 'client_id' => $clientId,
            'attachment_path' => $att['path'] ?? null, 'attachment_name' => $att['name'] ?? null,
            'attachment_mime' => $att['mime'] ?? null, 'attachment_size' => $att['size'] ?? null,
        ]);
        DB::table('kv_conversations')->where('id', $conv->id)->update([
            'last_message_at' => $msg->created_at, 'a_archived_at' => null, 'b_archived_at' => null, 'updated_at' => now(),   // a new message brings the chat back for both
        ]);
        return ['conversation' => $conv->fresh(), 'message' => $msg, 'created' => true, 'reply_seconds' => $replySeconds, 'other' => $other];
    }

    /** Metrics, activity log and the (throttled) e-mail — after the commit, and never able to break the send itself. */
    private static function afterWrite(array $out, Company $me, User $user): void
    {
        if (! $out['created']) {
            return;
        }
        $other = $out['other'];
        $conv = $out['conversation'];
        try {
            if (class_exists(\App\Services\Kv\Metrics::class)) {
                \App\Services\Kv\Metrics::inc((int) $other->id, 'msg_received');
                if ($out['started']) {
                    \App\Services\Kv\Metrics::inc((int) $other->id, 'conv_started');
                    \App\Services\Kv\Metrics::inc((int) $me->id, 'conv_started');
                }
                if ($out['reply_seconds'] !== null) {
                    \App\Services\Kv\Metrics::inc((int) $me->id, 'reply_count');
                    \App\Services\Kv\Metrics::inc((int) $me->id, 'reply_seconds', (int) $out['reply_seconds']);
                }
            }
            if ($out['started'] && class_exists(\App\Services\Kv\Activity::class)) {
                \App\Services\Kv\Activity::log((int) $me->id, (int) $user->id, 'message.start', ['conversation' => $conv->id, 'with' => (int) $other->id]);
            }
        } catch (\Throwable $e) {
            Log::warning('kv: messaging hook failed', ['err' => $e->getMessage()]);
        }
        try {
            self::notify($conv, $me, $other);
        } catch (\Throwable $e) {
            Log::warning('kv: message notification failed', ['err' => $e->getMessage()]);
        }
    }

    // ── notification e-mail ────────────────────────────────────────────────────────────────
    /**
     * "Yeni mesajınız var": at most one per conversation, recipient side and 30 minutes — decided by ONE atomic UPDATE, so
     * parallel messages cannot send two. The e-mail carries the sender COMPANY name and a panel link, never message text or contact data.
     */
    public static function notify(Conversation $conv, Company $from, Company $to): bool
    {
        $side = $conv->side((int) $to->id);
        if ($side === null) {
            return false;
        }
        $col = $side.'_notified_at';
        $won = DB::table('kv_conversations')->where('id', $conv->id)
            ->where(fn ($q) => $q->whereNull($col)->orWhere($col, '<=', now()->subMinutes(self::NOTIFY_MINUTES)))
            ->update([$col => now()]);
        if ($won !== 1) {
            return false;
        }
        $addresses = self::recipientAddresses($to);
        $fromName = (string) $from->name;
        $url = url('/panel?tab=messages');
        $done = false;
        app()->terminating(function () use ($addresses, $fromName, $url, &$done) {
            if ($done) {                                      // long-lived workers / test apps run terminating callbacks again on every request
                return;
            }
            $done = true;
            foreach ($addresses as $addr) {
                try {
                    Mail::to($addr)->send(new KvMail('Yeni mesajınız var · Kervea', 'new_message', ['from' => $fromName, 'url' => $url]));
                } catch (\Throwable $e) {
                    Log::warning('kv: message notification mail failed', ['err' => $e->getMessage()]);
                }
            }
        });
        return true;
    }

    /** The company's address plus active team members who may use messaging. @return list<string> */
    public static function recipientAddresses(Company $c): array
    {
        $out = [];
        if ($c->email) {
            $out[mb_strtolower($c->email)] = $c->email;
        }
        $members = TeamMember::where('company_id', $c->id)->where('status', TeamMember::STATUS_ACTIVE)->whereNotNull('user_id')->limit(20)->get();
        foreach ($members as $m) {
            $perms = is_array($m->perms) ? $m->perms : CompanyContext::defaultPerms((string) $m->role);
            if ($m->email && in_array('messages', $perms, true)) {
                $out[mb_strtolower($m->email)] = $m->email;
            }
        }
        return array_values($out);
    }

    // ── reading ─────────────────────────────────────────────────────────────────────────────
    /** Unread incoming messages in the conversations of $companyId that are not archived. */
    public static function unreadCount(int $companyId): int
    {
        return (int) DB::table('kv_messages as m')
            ->join('kv_conversations as c', 'c.id', '=', 'm.conversation_id')
            ->where(fn ($q) => $q->where('c.company_a_id', $companyId)->orWhere('c.company_b_id', $companyId))
            ->where('m.sender_company_id', '<>', $companyId)
            ->whereRaw('m.id > coalesce(case when c.company_a_id = ? then c.a_last_read_message_id else c.b_last_read_message_id end, 0)', [$companyId])
            ->whereRaw('case when c.company_a_id = ? then c.a_archived_at else c.b_archived_at end is null', [$companyId])
            ->count();
    }

    /** Move the company's read pointer forward (never backwards). */
    public static function markRead(Conversation $conv, int $companyId, int $uptoMessageId): void
    {
        $side = $conv->side($companyId);
        if ($side === null || $uptoMessageId <= 0) {
            return;
        }
        $col = $side.'_last_read_message_id';
        DB::table('kv_conversations')->where('id', $conv->id)
            ->where(fn ($q) => $q->whereNull($col)->orWhere($col, '<', $uptoMessageId))
            ->update([$col => $uptoMessageId]);
    }
}
