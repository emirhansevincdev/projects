<?php

namespace App\Http\Controllers\Kv;

use App\Http\Controllers\Controller;
use App\Models\Kv\Company;
use App\Models\Kv\Conversation;
use App\Models\Kv\Message;
use App\Models\Kv\MessageBlock;
use App\Models\Kv\MessageReport;
use App\Services\Kv\CompanyContext;
use App\Services\Kv\FirmPresenter;
use App\Services\Kv\MessageAttachments;
use App\Services\Kv\Messaging;
use App\Services\Kv\MessagingException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * Member-to-member messaging. Every route sits behind kv.member:messages; the acting company ALWAYS comes from
 * CompanyContext (the whole team of a company shares one inbox) — an id from the browser only ever selects a row that
 * the acting company must itself be part of (otherwise 404).
 */
class MessageController extends Controller
{
    private const TEXT = [
        'self' => 'You cannot message your own company.',
        'unavailable' => 'This company cannot be messaged.',
        'sector_mismatch' => 'You can only message companies in your own sector.',
        'blocked_by_me' => 'You blocked this company. Unblock it to write again.',
        'pro_required' => 'Starting a conversation requires a Premium membership.',
        'quota' => 'You reached the daily limit for new conversations.',
        'not_found' => 'Not found.',
        'own_message' => 'You cannot report your own message.',
        'invalid_file' => 'This file type is not accepted (JPG, PNG, WEBP or PDF).',
    ];

    private function me(Request $r): Company
    {
        return CompanyContext::forRequest($r)['company'];
    }

    private function fail(string $code, ?int $status = null): JsonResponse
    {
        return response()->json(['error' => $code, 'message' => self::TEXT[$code] ?? $code], $status ?? MessagingException::STATUS[$code] ?? 403);
    }

    private function conversationFor(Request $r, $id): Conversation
    {
        $me = $this->me($r);
        return Conversation::where('id', (int) $id)
            ->where(fn ($w) => $w->where('company_a_id', $me->id)->orWhere('company_b_id', $me->id))
            ->firstOrFail();
    }

    private function companyCard(Company $c): array
    {
        return [
            'slug' => $c->slug, 'name' => $c->name, 'logo' => FirmPresenter::fileUrl($c->logo_path),
            'initials' => FirmPresenter::initials($c->name), 'cn_key' => strtolower((string) $c->country_cc),
            'verified' => (bool) $c->is_verified, 'sec' => $c->sector?->meta_idx, 'active' => $c->status === Company::STATUS_APPROVED,
        ];
    }

    private function messageRow(Message $m, int $meId, array $reportedIds = []): array
    {
        $mine = (int) $m->sender_company_id === $meId;
        return [
            'id' => $m->id, 'mine' => $mine,
            'by' => $mine ? $m->senderUser?->name : null,               // the other side's individual names are not exposed
            'body' => (string) $m->body,
            'at' => $m->created_at->toIso8601String(),
            'att' => $m->hasAttachment() ? [
                'name' => $m->attachment_name, 'mime' => $m->attachment_mime, 'size' => (int) $m->attachment_size,
                'image' => str_starts_with((string) $m->attachment_mime, 'image/'), 'url' => '/kv/messages/'.$m->id.'/attachment',
            ] : null,
            'reported' => ! $mine && in_array($m->id, $reportedIds, true),
        ];
    }

    private function json(array $data, int $status = 200): JsonResponse
    {
        return response()->json($data, $status)->header('Cache-Control', 'no-store');
    }

    /** Plain-text body of the request; null when it is empty after cleaning. 422 when too long. */
    private function body(Request $r, bool $required): ?string
    {
        $max = (int) config('kervea.messaging.max_body', 4000);
        $body = Messaging::cleanBody((string) $r->input('body', ''));
        if (mb_strlen($body) > $max) {
            abort(response()->json(['message' => "The message can be at most {$max} characters.", 'errors' => ['body' => ["The message can be at most {$max} characters."]]], 422));
        }
        if ($body === '' && $required) {
            abort(response()->json(['message' => 'The message is empty.', 'errors' => ['body' => ['The message is empty.']]], 422));
        }
        return $body;
    }

    // ── GET /kv/conversations?q=&archived= ─────────────────────────────────────────────────────
    public function index(Request $r)
    {
        $v = $r->validate(['q' => 'nullable|string|max:100', 'archived' => 'nullable|boolean']);
        $me = $this->me($r);
        $archived = (bool) ($v['archived'] ?? false);
        $mine = fn ($w) => $w->where('company_a_id', $me->id)->orWhere('company_b_id', $me->id);
        $flag = $archived ? 'whereNotNull' : 'whereNull';

        $q = Conversation::query()->select('kv_conversations.*')
            ->selectRaw('(select count(*) from kv_messages m where m.conversation_id = kv_conversations.id and m.sender_company_id <> ? and m.id > coalesce(case when kv_conversations.company_a_id = ? then kv_conversations.a_last_read_message_id else kv_conversations.b_last_read_message_id end, 0)) as unread', [$me->id, $me->id])
            ->where($mine)
            ->where(fn ($w) => $w
                ->where(fn ($x) => $x->where('company_a_id', $me->id)->{$flag}('a_archived_at'))
                ->orWhere(fn ($x) => $x->where('company_b_id', $me->id)->{$flag}('b_archived_at')));

        $term = trim(str_replace(['%', '_', '\\'], ' ', (string) ($v['q'] ?? '')));
        if (mb_strlen($term) >= 2) {
            // search stays inside the viewer's own conversations: partner names first, then message text
            $mineIds = Conversation::where($mine)->limit(2000)->get(['id', 'company_a_id', 'company_b_id']);
            $partner = $mineIds->mapWithKeys(fn ($c) => [$c->id => $c->otherId((int) $me->id)]);
            $like = '%'.$term.'%';
            $byName = Company::whereIn('id', $partner->values()->unique()->all())->where(fn ($w) => $w->where('name', 'like', $like)->orWhere('name_en', 'like', $like))->pluck('id')->all();
            $byText = Message::whereIn('conversation_id', $mineIds->pluck('id')->all())->where('body', 'like', $like)->distinct()->pluck('conversation_id')->all();
            $hit = $partner->filter(fn ($cid) => in_array($cid, $byName, true))->keys()->merge($byText)->unique()->values()->all();
            $q->whereIn('kv_conversations.id', $hit ?: [0]);
        }

        $rows = $q->orderByDesc('last_message_at')->orderByDesc('kv_conversations.id')->limit(100)->get();
        $others = Company::with('sector')->whereIn('id', $rows->map(fn ($c) => $c->otherId((int) $me->id))->unique()->all())->get()->keyBy('id');
        $mids = $rows->isEmpty() ? collect() : DB::table('kv_messages')->whereIn('conversation_id', $rows->pluck('id')->all())->selectRaw('max(id) as mid')->groupBy('conversation_id')->pluck('mid');
        $lasts = Message::whereIn('id', $mids->all())->get()->keyBy('conversation_id');

        $items = $rows->map(function (Conversation $c) use ($me, $others, $lasts) {
            $other = $others->get($c->otherId((int) $me->id));
            $last = $lasts->get($c->id);
            if (! $other) {
                return null;
            }
            return [
                'id' => $c->id, 'company' => $this->companyCard($other),
                'preview' => $last ? Messaging::preview($last) : '', 'preview_mine' => $last ? (int) $last->sender_company_id === (int) $me->id : false,
                'preview_att' => $last ? $last->hasAttachment() : false,
                'unread' => (int) $c->unread, 'last_message_at' => $c->last_message_at?->toIso8601String(),
                'archived' => $c->isArchivedFor((int) $me->id),
            ];
        })->filter()->values()->all();

        $archivedCount = Conversation::where($mine)->where(fn ($w) => $w
            ->where(fn ($x) => $x->where('company_a_id', $me->id)->whereNotNull('a_archived_at'))
            ->orWhere(fn ($x) => $x->where('company_b_id', $me->id)->whereNotNull('b_archived_at')))->count();

        return $this->json([
            'items' => $items,
            'archived_count' => $archivedCount,
            'unread' => Messaging::unreadCount((int) $me->id),
            'is_pro' => FirmPresenter::isPro($r->user()),
            'daily_left' => max(0, Messaging::dailyLimit() - Messaging::startedLastDay((int) $me->id)),
            'limits' => ['body' => (int) config('kervea.messaging.max_body', 4000), 'attachment_kb' => (int) config('kervea.messaging.max_attachment_kb', 5120)],
        ]);
    }

    // ── GET /kv/conversations/{id}?before=&after= ─────────────────────────────────────────────
    public function show(Request $r, $id)
    {
        $v = $r->validate(['before' => 'nullable|integer|min:1', 'after' => 'nullable|integer|min:0', 'limit' => 'nullable|integer|min:1|max:100']);
        $conv = $this->conversationFor($r, $id);
        $me = $this->me($r);
        $limit = (int) ($v['limit'] ?? 40);

        $base = Message::where('conversation_id', $conv->id)->with('senderUser:id,name');
        $hasMore = false;
        if (isset($v['after'])) {
            $rows = (clone $base)->where('id', '>', (int) $v['after'])->orderBy('id')->limit(100)->get();
        } else {
            if (isset($v['before'])) {
                $base->where('id', '<', (int) $v['before']);
            }
            $rows = $base->orderByDesc('id')->limit($limit + 1)->get();
            $hasMore = $rows->count() > $limit;
            $rows = $rows->take($limit)->reverse()->values();
        }
        if (! isset($v['before'])) {                                       // opening / polling the thread = reading it
            Messaging::markRead($conv, (int) $me->id, (int) Message::where('conversation_id', $conv->id)->max('id'));
        }

        $other = Company::with('sector')->find($conv->otherId((int) $me->id));
        $reason = $other ? Messaging::pairReason($me, $other) : 'unavailable';
        $reported = MessageReport::where('reporter_company_id', $me->id)->whereIn('message_id', $rows->pluck('id')->all())->pluck('message_id')->all();

        return $this->json([
            'conversation' => [
                'id' => $conv->id, 'company' => $other ? $this->companyCard($other) : null,
                'archived' => $conv->isArchivedFor((int) $me->id),
                'blocked_by_me' => $other ? MessageBlock::blocks($me->id, $other->id) : false,
                'can_send' => $reason === null, 'send_reason' => $reason,
                'started_by_me' => (int) $conv->started_by_company_id === (int) $me->id,
                'peer_read_id' => $other ? $conv->lastReadFor((int) $other->id) : 0,     // for the "read" tick under the viewer's own messages
            ],
            'messages' => $rows->map(fn ($m) => $this->messageRow($m, (int) $me->id, $reported))->all(),
            'has_more' => $hasMore,
            'last_id' => (int) ($rows->last()->id ?? 0),
        ]);
    }

    // ── POST /kv/conversations {company, body, client_id?} ────────────────────────────────────
    public function store(Request $r)
    {
        $v = $r->validate([
            'company' => 'required|string|max:190',
            'body' => 'required|string|max:'.((int) config('kervea.messaging.max_body', 4000) * 2),
            'client_id' => ['nullable', 'string', 'max:40', 'regex:/^[A-Za-z0-9_\-]+$/'],
        ]);
        $me = $this->me($r);
        $body = $this->body($r, true);
        $other = Company::approved()->where('slug', $v['company'])->first();
        if (! $other) {
            return $this->fail('not_found');
        }
        try {
            $out = Messaging::start($me, $r->user(), $other, $body, $v['client_id'] ?? null);
        } catch (MessagingException $e) {
            return $this->fail($e->errorCode, $e->status);
        }
        return $this->json([
            'ok' => true, 'conversation_id' => $out['conversation']->id, 'created' => $out['started'],
            'message' => $this->messageRow($out['message']->load('senderUser:id,name'), (int) $me->id),
        ], 201);
    }

    // ── POST /kv/conversations/{id}/messages {body?, attachment?, client_id?} ─────────────────
    public function send(Request $r, $id)
    {
        $v = $r->validate([
            'body' => 'nullable|string|max:'.((int) config('kervea.messaging.max_body', 4000) * 2),
            'attachment' => 'nullable|file|max:'.((int) config('kervea.messaging.max_attachment_kb', 5120)),
            'client_id' => ['nullable', 'string', 'max:40', 'regex:/^[A-Za-z0-9_\-]+$/'],
        ]);
        $conv = $this->conversationFor($r, $id);
        $me = $this->me($r);
        $file = $r->file('attachment');
        $body = $this->body($r, $file === null);

        // cheap refusal before a file is processed (the same rules run again under the conversation lock)
        $other = Company::find($conv->otherId((int) $me->id));
        $reason = $other ? Messaging::pairReason($me, $other) : 'unavailable';
        if ($reason) {
            return $this->fail($reason);
        }

        $att = null;
        try {
            $att = $file ? MessageAttachments::store($file, $conv->id) : null;
            $out = Messaging::send($conv, $me, $r->user(), $body ?? '', $att, $v['client_id'] ?? null);
        } catch (MessagingException $e) {
            if ($att) {
                Storage::disk('local')->delete($att['path']);
            }
            return $this->fail($e->errorCode, $e->status);
        } catch (\Throwable $e) {
            if ($att) {
                Storage::disk('local')->delete($att['path']);
            }
            throw $e;
        }
        if (! $out['created'] && $att) {
            Storage::disk('local')->delete($att['path']);                  // a retried request: the message already exists
        }
        return $this->json(['ok' => true, 'duplicate' => ! $out['created'], 'message' => $this->messageRow($out['message']->load('senderUser:id,name'), (int) $me->id)], $out['created'] ? 201 : 200);
    }

    // ── GET /kv/messages/{id}/attachment ──────────────────────────────────────────────────────
    public function attachment(Request $r, $id)
    {
        $me = $this->me($r);
        $m = Message::with('conversation')->whereNotNull('attachment_path')->find((int) $id);
        abort_unless($m && $m->conversation && $m->conversation->involves((int) $me->id), 404);
        return MessageAttachments::response($m);
    }

    // ── archive / block ───────────────────────────────────────────────────────────────────────
    public function archive(Request $r, $id)
    {
        return $this->setArchived($r, $id, true);
    }

    public function unarchive(Request $r, $id)
    {
        return $this->setArchived($r, $id, false);
    }

    private function setArchived(Request $r, $id, bool $on): JsonResponse
    {
        $conv = $this->conversationFor($r, $id);
        $col = $conv->side((int) $this->me($r)->id).'_archived_at';
        DB::table('kv_conversations')->where('id', $conv->id)->update([$col => $on ? now() : null]);
        return $this->json(['ok' => true, 'archived' => $on]);
    }

    public function block(Request $r, $id)
    {
        $conv = $this->conversationFor($r, $id);
        $me = $this->me($r);
        DB::table('kv_message_blocks')->insertOrIgnore(['company_id' => $me->id, 'blocked_company_id' => $conv->otherId((int) $me->id), 'created_at' => now()]);
        DB::table('kv_conversations')->where('id', $conv->id)->update([$conv->side((int) $me->id).'_archived_at' => now()]);
        Messaging::markRead($conv, (int) $me->id, (int) Message::where('conversation_id', $conv->id)->max('id'));
        return $this->json(['ok' => true, 'blocked' => true]);
    }

    public function unblock(Request $r, $id)
    {
        $conv = $this->conversationFor($r, $id);
        $me = $this->me($r);
        MessageBlock::where('company_id', $me->id)->where('blocked_company_id', $conv->otherId((int) $me->id))->delete();
        DB::table('kv_conversations')->where('id', $conv->id)->update([$conv->side((int) $me->id).'_archived_at' => null]);
        return $this->json(['ok' => true, 'blocked' => false]);
    }

    // ── POST /kv/messages/{id}/report {reason, category?} ─────────────────────────────────────
    public function report(Request $r, $id)
    {
        $v = $r->validate([
            'reason' => 'required|string|min:3|max:1000',
            'category' => 'nullable|string|in:'.implode(',', MessageReport::CATEGORIES),
        ]);
        $me = $this->me($r);
        $m = Message::with('conversation')->find((int) $id);
        abort_unless($m && $m->conversation && $m->conversation->involves((int) $me->id), 404);
        if ((int) $m->sender_company_id === (int) $me->id) {
            return $this->fail('own_message', 422);                             // only the other side's messages can be reported
        }
        $existing = MessageReport::where('message_id', $m->id)->where('reporter_company_id', $me->id)->exists();
        if (! $existing) {
            DB::table('kv_message_reports')->insertOrIgnore([
                'message_id' => $m->id, 'reporter_company_id' => $me->id, 'reporter_user_id' => $r->user()->id,
                'category' => $v['category'] ?? null, 'reason' => strip_tags($v['reason']), 'status' => MessageReport::STATUS_OPEN, 'created_at' => now(),
            ]);
        }
        return $this->json(['ok' => true, 'already' => $existing]);
    }

    // ── GET /kv/messages/unread-count ─────────────────────────────────────────────────────────
    public function unread(Request $r)
    {
        return $this->json(['unread' => Messaging::unreadCount((int) $this->me($r)->id)]);
    }

    // ── GET /kv/messages/can-message/{slug} ───────────────────────────────────────────────────
    public function canMessage(Request $r, string $slug)
    {
        $me = $this->me($r);
        $other = Company::approved()->where('slug', $slug)->first();
        if (! $other) {
            return $this->fail('not_found');
        }
        return $this->json(Messaging::eligibility($me, $r->user(), $other) + ['company' => ['slug' => $other->slug, 'name' => $other->name]]);
    }
}
