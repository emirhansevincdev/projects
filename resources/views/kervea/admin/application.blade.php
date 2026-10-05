@extends('kervea.admin.layout')
@section('title', $company->name)
@section('content')
<h1>{{ $company->name }} <span class="badge {{ $company->status }}">{{ ['pending'=>'Bekliyor','approved'=>'Onaylı','rejected'=>'Reddedildi','suspended'=>'Askıda'][$company->status] }}</span></h1>
<p class="sub">Başvuru #{{ $company->id }} · {{ $company->created_at->format('d.m.Y H:i') }}</p>
<div class="card"><div class="grid2">
 @foreach([
  'Ticari ünvan (EN)'=>$company->name_en,'Vergi no'=>$company->tax_id,'MERSİS'=>$company->mersis,'Kuruluş yılı'=>$company->founded_year,
  'Çalışan'=>$company->employees,'Ülke'=>($country?->names['tr'] ?? strtoupper($company->country_cc)),'Şehir'=>$company->city,'Adres'=>$company->address,
  'Web'=>$company->website,'KEP'=>$company->kep,'E-posta'=>$company->email,'Telefon'=>$company->phone,
  'Yetkili'=>$company->rep_name.' · '.$company->rep_title,'Yetkili e-posta'=>$company->rep_email,
  'Sektör'=>$company->sector?->name('tr'),'Yön'=>$company->direction,'HS kodları'=>$company->hs_codes,'MOQ'=>$company->moq,
  'INCOTERM'=>$company->incoterm,'Ödeme'=>$company->payment_terms,'Ürünler'=>$company->products,'Sertifikalar'=>$company->certificates,
 ] as $k=>$v)<div><div class="k">{{ $k }}</div><div class="v">{{ $v ?: '—' }}</div></div>@endforeach
</div>
<div class="k">Hakkında ({{ \App\Http\Controllers\Kv\ApplicationController::wordCount($company->description ?? '') }} kelime)</div><div class="v" style="white-space:pre-wrap">{{ $company->description }}</div>
<div class="k">Sosyal</div><div class="v">@forelse($company->social ?? [] as $k=>$v){{ strtoupper($k) }}: {{ $v }}<br>@empty — @endforelse</div>
</div>
<div class="card"><h3 style="margin-top:0">Belgeler (özel depolama)</h3>
@forelse($company->documents as $d)<div><a href="{{ route('admin.kervea.document', $d) }}" target="_blank" rel="noopener">{{ $d->original_name }}</a> <span class="k">{{ $d->mime }} · {{ number_format($d->size/1024) }} KB</span></div>@empty<div class="empty">Belge yok.</div>@endforelse
@if($company->logo_path)<h3>Logo</h3><img src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($company->logo_path) }}" style="max-height:80px">@endif
@if($company->photos->count())<h3>Fotoğraflar</h3>@foreach($company->photos as $p)<img src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($p->path) }}" style="height:80px;border-radius:8px;margin-right:6px">@endforeach @endif
</div>
<div class="card"><h3 style="margin-top:0">Rıza kayıtları</h3>
<table><thead><tr><th>Tür</th><th>Durum</th><th>Sürüm</th><th>IP</th><th>Zaman</th></tr></thead><tbody>
@foreach($company->consents as $c)<tr><td>{{ $c->type }}</td><td>{{ $c->granted ? 'Verildi' : 'Verilmedi/geri alındı' }}</td><td>{{ $c->version }}</td><td>{{ $c->ip }}</td><td>{{ $c->created_at->format('d.m.Y H:i') }}</td></tr>@endforeach
</tbody></table></div>
@if($company->status==='pending')
<div class="card" style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start">
 <form method="post" action="{{ route('admin.kervea.approve', $company) }}">@csrf<button class="btn" onclick="return confirm('Başvuru onaylansın ve üyeye bağlantı gönderilsin mi?')">Onayla</button></form>
 <form method="post" action="{{ route('admin.kervea.reject', $company) }}" style="flex:1;min-width:260px">@csrf
  <textarea name="note" rows="2" placeholder="Red gerekçesi (üyeye e-postayla iletilir)" style="width:100%"></textarea><br>
  <button class="btn bad" style="margin-top:8px" onclick="return confirm('Başvuru reddedilsin mi?')">Reddet</button></form>
</div>
@elseif($company->review_note)<div class="card"><div class="k">Red gerekçesi</div><div class="v">{{ $company->review_note }}</div></div>@endif
<a href="{{ route('admin.kervea.applications') }}">← Listeye dön</a>
@endsection
