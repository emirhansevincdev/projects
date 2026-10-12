@extends('kervea.admin.layout')
@section('title','Bülten')
@section('content')
<h1>Bülten aboneleri</h1>
<p class="sub">Sitedeki bülten kutusundan bırakılan e-postalar. {{ $active }} onaylı ve aktif · toplam {{ $total }}. Adrese onay bağlantısı gider; yalnızca bağlantıya tıklayanlar (çift onay) CSV'ye girer. Form zamanı, IP ve tarayıcı bilgisi kanıt olarak saklanır; CSV'deki "çıkış bağlantısı" sütununu her bülten e-postasının altına koyun.</p>
<div class="card">
<form method="get" class="filters" style="align-items:center">
 <input type="search" name="q" value="{{ $q }}" placeholder="E-posta ara" maxlength="100">
 <button class="btn sm sec" type="submit">Ara</button>
 <a class="btn sm" href="{{ route('admin.kervea.newsletter.export', array_filter(['q' => $q])) }}" style="margin-left:auto;color:#fff">CSV indir</a>
</form>
@if($rows->isEmpty())<div class="empty">Kayıt yok.</div>@else
<table><thead><tr><th>E-posta</th><th>Dil</th><th>Form zamanı</th><th>IP</th><th>Durum</th><th></th></tr></thead><tbody>
@foreach($rows as $s)
<tr>
 <td><strong>{{ $s->email }}</strong></td>
 <td>{{ strtoupper((string) $s->locale) ?: '—' }}</td>
 <td>{{ optional($s->consented_at)->format('d.m.Y H:i') }}</td>
 <td>{{ $s->consent_ip ?: '—' }}</td>
 <td>@if($s->unsubscribed_at)<span class="badge rejected">Ayrıldı {{ $s->unsubscribed_at->format('d.m.Y') }}</span>@elseif($s->confirmed_at)<span class="badge approved">Onaylı</span>@else<span class="badge pending">Onay bekliyor</span>@endif</td>
 <td><form method="post" action="{{ route('admin.kervea.newsletter.delete', $s) }}" onsubmit="return confirm('Bu kayıt kalıcı olarak silinsin mi?')">@csrf @method('DELETE')<button class="btn sm bad" type="submit">Sil</button></form></td>
</tr>
@endforeach
</tbody></table>
{{ $rows->links() }}
@endif
</div>
@endsection
