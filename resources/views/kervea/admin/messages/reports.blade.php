@extends('kervea.admin.layout')
@section('title','Mesaj şikayetleri')
@section('content')
@php
    $cats = ['spam' => 'Spam / istenmeyen', 'abuse' => 'Taciz / hakaret', 'fraud' => 'Dolandırıcılık', 'contact_info' => 'İletişim bilgisi paylaşımı', 'other' => 'Diğer'];
    $labels = ['open' => 'Açık', 'reviewed' => 'İncelendi', 'dismissed' => 'Reddedildi'];
@endphp
<h1>Mesaj şikayetleri</h1>
<p class="sub">Üyelerin bildirdiği mesajlar. Özel yazışmalar yalnızca bir şikayet üzerinden, şikayet edilen mesajın çevresiyle birlikte açılır.</p>
<div class="filters">
    @foreach(['open' => 'Açık', 'reviewed' => 'İncelendi', 'dismissed' => 'Reddedildi'] as $k => $label)
        <a href="{{ route('admin.kervea.messages.reports', ['status' => $k]) }}" class="{{ $status === $k ? 'on' : '' }}">{{ $label }} ({{ (int) ($counts[$k] ?? 0) }})</a>
    @endforeach
    <a href="{{ route('admin.kervea.messages.reports', ['status' => 'all']) }}" class="{{ $status === 'all' ? 'on' : '' }}">Tümü ({{ array_sum($counts) }})</a>
</div>
<div class="card">
@if($rows->isEmpty())
    <div class="empty">Bu durumda şikayet yok.</div>
@else
<table>
    <thead><tr><th>Tarih</th><th>Şikayet eden</th><th>Şikayet edilen</th><th>Tür</th><th>Gerekçe</th><th>Durum</th><th></th></tr></thead>
    <tbody>
    @foreach($rows as $r)
        <tr>
            <td style="white-space:nowrap">{{ $r->created_at->format('d.m.Y H:i') }}</td>
            <td>{{ $r->reporterCompany?->name ?? '—' }}</td>
            <td><strong>{{ $r->message?->senderCompany?->name ?? '—' }}</strong></td>
            <td>{{ $cats[$r->category] ?? '—' }}</td>
            <td style="max-width:320px;word-break:break-word">{{ \Illuminate\Support\Str::limit($r->reason, 140) }}</td>
            <td><span class="badge {{ $r->status === 'open' ? 'pending' : ($r->status === 'reviewed' ? 'approved' : '') }}">{{ $labels[$r->status] ?? $r->status }}</span></td>
            <td><a class="btn sec sm" href="{{ route('admin.kervea.messages.report', $r) }}">İncele</a></td>
        </tr>
    @endforeach
    </tbody>
</table>
{{ $rows->links() }}
@endif
</div>
@endsection
