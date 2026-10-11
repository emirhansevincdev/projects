<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kv\Message;
use App\Models\Kv\MessageReport;
use App\Services\Kv\MessageAttachments;
use Illuminate\Http\Request;

/**
 * Moderation of reported messages. Administrators do NOT browse private conversations: a conversation can only be opened
 * through a report, and only a small window of messages around the reported one is shown.
 */
class MessageReportController extends Controller
{
    private const BEFORE = 8;       // messages shown before the reported one
    private const AFTER = 4;        // …and after it

    public function index(Request $r)
    {
        $status = (string) $r->query('status', MessageReport::STATUS_OPEN);
        if (! in_array($status, [MessageReport::STATUS_OPEN, MessageReport::STATUS_REVIEWED, MessageReport::STATUS_DISMISSED, 'all'], true)) {
            $status = MessageReport::STATUS_OPEN;
        }
        $counts = MessageReport::selectRaw('status, count(*) as n')->groupBy('status')->pluck('n', 'status')->all();
        $q = MessageReport::with(['message.senderCompany', 'reporterCompany'])->orderByDesc('id');
        if ($status !== 'all') {
            $q->where('status', $status);
        }
        $rows = $q->paginate(25)->withQueryString();
        return view('kervea.admin.messages.reports', compact('rows', 'status', 'counts'));
    }

    public function show(MessageReport $report)
    {
        $report->load(['message.senderCompany', 'reporterCompany', 'reporterUser', 'handler']);
        abort_unless($report->message, 404);
        $context = $this->context($report);
        $sender = $report->message->senderCompany;
        $others = $sender ? MessageReport::whereHas('message', fn ($q) => $q->where('sender_company_id', $sender->id))->count() : 0;
        return view('kervea.admin.messages.report', compact('report', 'context', 'sender', 'others'));
    }

    public function dismiss(Request $r, MessageReport $report)
    {
        return $this->mark($report, MessageReport::STATUS_DISMISSED, $r, 'Şikayet reddedildi.');
    }

    public function reviewed(Request $r, MessageReport $report)
    {
        return $this->mark($report, MessageReport::STATUS_REVIEWED, $r, 'Şikayet incelendi olarak işaretlendi.');
    }

    /** Suspend the company that SENT the reported message (never a company id from the request) through the normal company-status code path. */
    public function suspend(Request $r, MessageReport $report)
    {
        $report->load('message.senderCompany');
        $company = $report->message?->senderCompany;
        abort_unless($company, 404);
        app(KerveaAdminController::class)->companyStatus($r->merge(['status' => 'suspended']), $company);     // aborts (422) for pending / rejected companies
        $this->stamp($report, MessageReport::STATUS_REVIEWED, $r);
        return redirect()->route('admin.kervea.messages.report', $report)->with('ok', "{$company->name} askıya alındı; şikayet incelendi olarak işaretlendi.");
    }

    /** Attachment of the reported message or of a message in the window shown with it – nothing else. */
    public function attachment(MessageReport $report, int $message)
    {
        $report->load('message');
        abort_unless($report->message, 404);
        $m = $this->context($report)->firstWhere('id', $message);
        abort_unless($m && $m->hasAttachment(), 404);
        return MessageAttachments::response($m);
    }

    private function mark(MessageReport $report, string $status, Request $r, string $flash)
    {
        $this->stamp($report, $status, $r);
        return redirect()->route('admin.kervea.messages.report', $report)->with('ok', $flash);
    }

    private function stamp(MessageReport $report, string $status, Request $r): void
    {
        $report->forceFill(['status' => $status, 'handled_by' => $r->user()->id, 'handled_at' => now()])->save();
    }

    /** @return \Illuminate\Support\Collection<int,Message> the reported message with a few neighbours, oldest first */
    private function context(MessageReport $report)
    {
        $m = $report->message;
        $before = Message::where('conversation_id', $m->conversation_id)->where('id', '<', $m->id)->orderByDesc('id')->limit(self::BEFORE)->get()->reverse();
        $after = Message::where('conversation_id', $m->conversation_id)->where('id', '>', $m->id)->orderBy('id')->limit(self::AFTER)->get();
        return $before->push($m)->concat($after)->values()->loadMissing('senderCompany');
    }
}
