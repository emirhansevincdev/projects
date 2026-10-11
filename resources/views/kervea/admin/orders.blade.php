@extends('kervea.admin.layout')
@section('title','Siparişler')
@section('content')
<h1>Siparişler</h1><p class="sub">Premium üyelik ve kredi paketi siparişleri. Banka havalesi gibi manuel ödemeleri buradan işaretleyin; ödeme işaretlenince Premium etkinleşir (+{{ (int) config('kervea.credits.pro_bonus') }} kredi) veya kredi paketi firma hesabına eklenir. Aynı sipariş ikinci kez işaretlense bile bir kez teslim edilir.</p>
<div class="card">
@if($rows->isEmpty())<div class="empty">Henüz sipariş yok.</div>@else
<table><thead><tr><th>#</th><th>Üye / Firma</th><th>Tür</th><th>Tutar</th><th>Kod</th><th>Durum</th><th>Sağlayıcı</th><th>Tarih</th><th></th></tr></thead><tbody>
@foreach($rows as $o)
<tr><td>{{ $o->id }}</td>
<td>{{ $users[$o->user_id] ?? '—' }}@if($o->company)<br><span class="k">{{ $o->company->name }}</span>@endif</td>
<td>@if($o->kind==='credits')<b>Kredi paketi</b><br><span class="k">{{ $o->credits }} kredi</span>@else<b>Premium</b><br><span class="k">{{ $o->period==='month' ? 'aylık' : 'yıllık' }}</span>@endif</td>
<td>{{ number_format($o->amount_cents/100,2) }} {{ $o->currency }}@if($o->discount_cents)<br><span class="k">-{{ number_format($o->discount_cents/100,2) }}</span>@endif</td>
<td>{{ $o->promo?->code ?? '—' }}</td><td><span class="badge {{ $o->status==='paid'?'approved':($o->status==='pending'?'pending':'rejected') }}">{{ $o->status }}</span></td><td>{{ $o->provider ?? '—' }}</td><td>{{ $o->created_at->format('d.m.Y H:i') }}</td>
<td>@if($o->status==='pending')<form method="post" action="{{ route('admin.kervea.order.paid',$o) }}" onsubmit="return confirm('Ödendi olarak işaretlensin mi?')">@csrf<button class="btn sm">Ödendi</button></form>@endif</td></tr>
@endforeach</tbody></table>{{ $rows->links() }}@endif
</div>
@endsection
