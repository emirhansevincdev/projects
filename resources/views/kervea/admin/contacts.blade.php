@extends('kervea.admin.layout')
@section('title','İletişim Mesajları')
@section('content')
<h1>İletişim mesajları</h1><p class="sub">Sitedeki iletişim formundan gelenler.</p>
<div class="card">
@if($rows->isEmpty())<div class="empty">Henüz mesaj yok.</div>@else
<table><thead><tr><th>Gönderen</th><th>Mesaj</th><th>Tarih</th><th>Durum</th></tr></thead><tbody>
@foreach($rows as $m)
<tr><td><strong>{{ $m->name }}</strong><br><a href="mailto:{{ $m->email }}">{{ $m->email }}</a></td>
<td>@if($m->subject)<strong>{{ $m->subject }}</strong><br>@endif<span style="white-space:pre-wrap">{{ $m->message }}</span></td>
<td>{{ $m->created_at->format('d.m.Y H:i') }}</td>
<td><form method="post" action="{{ route('admin.kervea.contact.status',$m) }}">@csrf<select name="status" onchange="this.form.submit()">@foreach(['new'=>'Yeni','read'=>'Okundu','replied'=>'Yanıtlandı'] as $k=>$l)<option value="{{ $k }}" @selected($m->status===$k)>{{ $l }}</option>@endforeach</select></form></td></tr>
@endforeach</tbody></table>{{ $rows->links() }}@endif
</div>
@endsection
