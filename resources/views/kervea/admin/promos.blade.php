@extends('kervea.admin.layout')
@section('title','Promosyon Kodları')
@section('content')
<h1>Promosyon kodları</h1><p class="sub">Ön iletişime geçen (ör. ilk ihracatçı) üyelere verilen indirim kodları. İndirim sunucuda hesaplanır.</p>
<div class="card"><form method="post" action="{{ route('admin.kervea.promo.store') }}" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">@csrf
 <div><label>Kod (boşsa üretilir)</label><input name="code" maxlength="64" value="{{ old('code') }}"></div>
 <div><label>Tür</label><select name="type"><option value="percent">Yüzde (%)</option><option value="fixed">Sabit (USD)</option></select></div>
 <div><label>Değer</label><input name="value" type="number" min="1" value="{{ old('value',30) }}" style="width:90px"></div>
 <div><label>Kullanım limiti</label><input name="max_uses" type="number" min="1" style="width:110px"></div>
 <div><label>Son kullanma</label><input name="expires_at" type="datetime-local"></div>
 <div><label>Not</label><input name="note" maxlength="255"></div>
 <button class="btn">Kod oluştur</button></form></div>
<div class="card">
@if($rows->isEmpty())<div class="empty">Henüz kod yok.</div>@else
<table><thead><tr><th>Kod</th><th>İndirim</th><th>Kullanım</th><th>Bitiş</th><th>Not</th><th></th></tr></thead><tbody>
@foreach($rows as $p)
<tr><td><strong>{{ $p->code }}</strong> @unless($p->is_active)<span class="badge rejected">pasif</span>@endunless</td>
<td>{{ $p->type==='percent' ? '%'.$p->value : '$'.number_format($p->value/100,2) }}</td>
<td>{{ $p->used_count }}{{ $p->max_uses ? ' / '.$p->max_uses : '' }}</td><td>{{ $p->expires_at?->format('d.m.Y') ?? '—' }}</td><td>{{ $p->note }}</td>
<td style="white-space:nowrap"><form method="post" action="{{ route('admin.kervea.promo.toggle',$p) }}" style="display:inline">@csrf<button class="btn sec sm">{{ $p->is_active?'Pasifleştir':'Etkinleştir' }}</button></form>
<form method="post" action="{{ route('admin.kervea.promo.delete',$p) }}" style="display:inline" onsubmit="return confirm('Silinsin mi?')">@csrf @method('DELETE')<button class="btn bad sm">Sil</button></form></td></tr>
@endforeach</tbody></table>@endif
</div>
@endsection
