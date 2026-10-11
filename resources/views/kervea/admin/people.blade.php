@extends('kervea.admin.layout')
@section('title','Kişiler')
@section('content')
@php $depts = ['ceo'=>'CEO / Kurucu','purchasing'=>'Satın alma','sales'=>'Satış','export'=>'İhracat / İthalat','ops'=>'Operasyon','other'=>'Diğer']; @endphp
<h1>Kişiler</h1>
<p class="sub">Üyelerin kendi sektörleri dışındaki karar vericilere kredi ile ulaştığı rehber. E-posta ve telefon yalnızca kredi karşılığı açılır. Kişisel veri içerir: yalnızca meşru kaynaklardan ekleyin; kaldırma talepleri KVKK kapsamında işlenmelidir.</p>
<div class="filters">
 <a href="{{ route('admin.kervea.people') }}" class="{{ request()->routeIs('admin.kervea.people','admin.kervea.people.edit') ? 'on' : '' }}">Liste ({{ $counts['active'] }})</a>
 <a href="{{ route('admin.kervea.people.import') }}" class="{{ request()->routeIs('admin.kervea.people.import*') ? 'on' : '' }}">CSV içe aktar</a>
 <a href="{{ route('admin.kervea.people.removals') }}" class="{{ request()->routeIs('admin.kervea.people.removal*') ? 'on' : '' }}">KVKK kaldırma talepleri @if($newRemovals)<span class="n" style="background:#e0a100;color:#201500;border-radius:99px;font-size:11px;font-weight:700;padding:1px 8px">{{ $newRemovals }}</span>@endif</a>
</div>

<div class="card">
 <h3 style="margin:0 0 6px;color:var(--ink)">{{ $person ? 'Kişiyi düzenle' : 'Kişi ekle' }}</h3>
 @if($person && ($reveals ?? 0) > 0)<p class="sub" style="margin:0 0 8px">Bu kişinin bilgileri {{ $reveals }} kez açıldı.</p>@endif
 <form method="post" action="{{ $person ? route('admin.kervea.people.update', $person) : route('admin.kervea.people.store') }}">@csrf @if($person) @method('PUT') @endif
  <div class="grid2">
   <div><label for="p_name">Ad soyad *</label><input id="p_name" name="name" value="{{ old('name', $person?->name) }}" maxlength="160" required style="width:100%"></div>
   <div><label for="p_title">Ünvan</label><input id="p_title" name="title" value="{{ old('title', $person?->title) }}" maxlength="160" style="width:100%"></div>
   <div><label for="p_company">Firma adı *</label><input id="p_company" name="company_name" value="{{ old('company_name', $person?->company_name) }}" maxlength="200" required style="width:100%"></div>
   <div><label for="p_dept">Bölüm *</label><select id="p_dept" name="department" style="width:100%">@foreach($depts as $k=>$l)<option value="{{ $k }}" @selected(old('department', $person?->department ?? 'other') === $k)>{{ $l }}</option>@endforeach</select></div>
   <div><label for="p_cc">Ülke *</label><select id="p_cc" name="country_cc" required style="width:100%"><option value="">Seçin</option>@foreach($countries as $c)<option value="{{ $c->cc }}" @selected(old('country_cc', $person?->country_cc) === $c->cc)>{{ $c->names['tr'] ?? strtoupper($c->cc) }} ({{ strtoupper($c->cc) }})</option>@endforeach</select></div>
   <div><label for="p_sec">Sektör *</label><select id="p_sec" name="sector_id" required style="width:100%"><option value="">Seçin</option>@foreach($sectors as $s)<option value="{{ $s->id }}" @selected((int) old('sector_id', $person?->sector_id) === $s->id)>{{ $s->name('tr') }}</option>@endforeach</select></div>
   <div><label for="p_email">E-posta</label><input id="p_email" type="email" name="email" value="{{ old('email', $person?->email) }}" maxlength="254" style="width:100%"></div>
   <div><label for="p_phone">Telefon</label><input id="p_phone" name="phone" value="{{ old('phone', $person?->phone) }}" maxlength="64" placeholder="+90 212 000 00 00" style="width:100%"></div>
   <div style="grid-column:1/-1"><label for="p_li">LinkedIn (https://…)</label><input id="p_li" name="linkedin" value="{{ old('linkedin', $person?->linkedin) }}" maxlength="300" style="width:100%"></div>
  </div>
  <p style="margin-top:12px"><button class="btn">{{ $person ? 'Kaydet' : 'Ekle' }}</button> @if($person)<a class="btn sec" href="{{ route('admin.kervea.people') }}">Vazgeç</a>@endif <span class="k" style="margin-left:8px">E-posta veya telefondan en az biri gerekli.</span></p>
 </form>
</div>

@if($rows)
<form method="get" class="filters" style="align-items:center">
 <input type="search" name="q" value="{{ request('q') }}" placeholder="Ad, firma, e-posta veya ünvan" style="min-width:240px">
 <select name="sector"><option value="">Tüm sektörler</option>@foreach($sectors as $s)<option value="{{ $s->id }}" @selected((int) request('sector') === $s->id)>{{ $s->name('tr') }}</option>@endforeach</select>
 <select name="status"><option value="active" @selected($status==='active')>Aktif ({{ $counts['active'] }})</option><option value="removed" @selected($status==='removed')>Kaldırılmış ({{ $counts['removed'] }})</option></select>
 <button class="btn sm">Filtrele</button>
</form>
<div class="card">
 @if($rows->isEmpty())<div class="empty">Kayıt yok.</div>@else
 <table><thead><tr><th>Kişi</th><th>Firma</th><th>Sektör / ülke</th><th>Kanal</th><th>Kaynak</th><th></th></tr></thead><tbody>
 @foreach($rows as $p)
  <tr><td><b>{{ $p->name }}</b><br><span class="k">{{ $p->title ?: '—' }} · {{ $depts[$p->department] ?? $p->department }}</span></td>
   <td>{{ $p->company_name }}</td>
   <td>{{ $p->sector?->name('tr') ?? '—' }}<br><span class="k">{{ strtoupper($p->country_cc ?? '') }}</span></td>
   <td>@if($status==='active'){{ $p->email ?: '—' }}<br><span class="k">{{ $p->phone ?: '—' }}</span>@else<span class="k">silindi</span>@endif</td>
   <td>{{ $p->source }}</td>
   <td style="white-space:nowrap">@if($status==='active')<a class="btn sm sec" href="{{ route('admin.kervea.people.edit', $p) }}">Düzenle</a>
    <form method="post" action="{{ route('admin.kervea.people.delete', $p) }}" style="display:inline" onsubmit="return confirm('Kişi ve tüm kişisel verileri kalıcı olarak silinsin mi?')">@csrf @method('DELETE')<button class="btn sm bad">Kaldır</button></form>@endif</td></tr>
 @endforeach</tbody></table>{{ $rows->links() }}@endif
</div>
@endif
@endsection
