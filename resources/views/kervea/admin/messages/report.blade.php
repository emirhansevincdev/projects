@extends('kervea.admin.layout')
@section('title','Mesaj şikayeti #'.$report->id)
@section('content')
@php
    $cats = ['spam' => 'Spam / istenmeyen', 'abuse' => 'Taciz / hakaret', 'fraud' => 'Dolandırıcılık', 'contact_info' => 'İletişim bilgisi paylaşımı', 'other' => 'Diğer'];
    $labels = ['open' => 'Açık', 'reviewed' => 'İncelendi', 'dismissed' => 'Reddedildi'];
    $reported = $report->message;
    $bytes = fn ($n) => $n >= 1048576 ? number_format($n / 1048576, 1).' MB' : max(1, round($n / 1024)).' KB';
@endphp
<style>
    .chat{display:flex;flex-direction:column;gap:8px;max-height:520px;overflow:auto;padding:4px 2px}
    .bub{max-width:78%;padding:9px 12px;border-radius:12px;background:#eef3f2;border:1px solid var(--line);word-break:break-word}
    .bub .txt{white-space:pre-wrap}
    .bub.from-reported{background:#e7f1ef;margin-left:auto}
    .bub.hit{outline:3px solid #e0a100;background:#fff7e0}
    .bub .meta{font-size:11.5px;color:var(--faint);margin-bottom:3px;font-weight:700}
    .bub .att{margin-top:6px;font-size:13px}
    .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
    .actions form{margin:0}
</style>
<p><a href="{{ route('admin.kervea.messages.reports') }}">← Şikayetler</a></p>
<h1>Mesaj şikayeti #{{ $report->id }}</h1>
<p class="sub"><span class="badge {{ $report->status === 'open' ? 'pending' : ($report->status === 'reviewed' ? 'approved' : '') }}">{{ $labels[$report->status] ?? $report->status }}</span>
    @if($report->handled_at) · {{ $report->handler?->name ?? 'Yönetici' }} tarafından {{ $report->handled_at->format('d.m.Y H:i') }} @endif</p>

<div class="card">
    <div class="grid2">
        <div><div class="k">Şikayet eden firma</div><div class="v">{{ $report->reporterCompany?->name ?? '—' }}</div></div>
        <div><div class="k">Şikayet edilen firma (mesajı gönderen)</div>
            <div class="v"><strong>{{ $sender?->name ?? '—' }}</strong>
                @if($sender) <span class="badge {{ $sender->status }}">{{ $sender->status }}</span> · <a href="{{ route('admin.kervea.application', $sender) }}">Firma kaydı</a> @endif
                <div style="font-size:12.5px;color:var(--faint)">Bu firmanın mesajlarına toplam {{ $others }} şikayet yapıldı.</div></div></div>
        <div><div class="k">Tür</div><div class="v">{{ $cats[$report->category] ?? '—' }}</div></div>
        <div><div class="k">Bildirim tarihi</div><div class="v">{{ $report->created_at->format('d.m.Y H:i') }}</div></div>
    </div>
    <div class="k">Gerekçe</div>
    <div class="v" style="white-space:pre-wrap">{{ $report->reason }}</div>
</div>

<div class="card">
    <div class="k" style="margin-bottom:8px">Şikayet edilen mesaj ve çevresi</div>
    <div class="chat">
    @foreach($context as $m)
        <div class="bub {{ (int) $m->sender_company_id === (int) $reported->sender_company_id ? 'from-reported' : '' }} {{ $m->id === $reported->id ? 'hit' : '' }}">
            <div class="meta">{{ $m->senderCompany?->name ?? '—' }} · {{ $m->created_at->format('d.m.Y H:i') }} @if($m->id === $reported->id) · ŞİKAYET EDİLEN @endif</div>
            @if($m->body !== null && $m->body !== '')<div class="txt">{{ $m->body }}</div>@endif
            @if($m->hasAttachment())
                <div class="att">📎 <a href="{{ route('admin.kervea.messages.report.attachment', [$report, $m->id]) }}">{{ $m->attachment_name }}</a> <span style="color:var(--faint)">({{ $m->attachment_mime }} · {{ $bytes((int) $m->attachment_size) }})</span></div>
            @endif
        </div>
    @endforeach
    </div>
</div>

<div class="card">
    <div class="k">İşlem</div>
    <div class="actions">
        @if($report->status !== 'reviewed')
        <form method="post" action="{{ route('admin.kervea.messages.report.reviewed', $report) }}">@csrf<button class="btn">İncelendi olarak işaretle</button></form>
        @endif
        @if($report->status !== 'dismissed')
        <form method="post" action="{{ route('admin.kervea.messages.report.dismiss', $report) }}">@csrf<button class="btn sec">Şikayeti reddet</button></form>
        @endif
        @if($sender && $sender->status === 'approved')
        <form method="post" action="{{ route('admin.kervea.messages.report.suspend', $report) }}" onsubmit="return confirm('Gönderen firma askıya alınacak ve panele giremeyecek. Emin misiniz?')">@csrf<button class="btn bad">Gönderen firmayı askıya al</button></form>
        @endif
    </div>
</div>
@endsection
