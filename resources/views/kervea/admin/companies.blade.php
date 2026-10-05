@extends('kervea.admin.layout')
@section('title','Firmalar')
@section('content')
<h1>Firmalar</h1><p class="sub">Onaylanmış, reddedilmiş ve askıdaki firmalar.</p>
<form class="filters"><input name="q" value="{{ request('q') }}" placeholder="Ad, e-posta veya vergi no"><button class="btn sec sm">Ara</button></form>
<div class="card">
@if($rows->isEmpty())<div class="empty">Kayıt bulunamadı.</div>@else
<table><thead><tr><th>Firma</th><th>Ülke</th><th>Sektör</th><th>Durum</th><th>E-posta</th><th></th></tr></thead><tbody>
@foreach($rows as $c)
<tr><td><a href="{{ route('admin.kervea.application',$c) }}"><strong>{{ $c->name }}</strong></a></td><td>{{ strtoupper($c->country_cc) }}</td><td>{{ $c->sector?->name('tr') }}</td>
<td><span class="badge {{ $c->status }}">{{ $c->status }}</span></td><td>{{ $c->email }}</td>
<td>@if($c->status==='approved')<form method="post" action="{{ route('admin.kervea.company.status',$c) }}">@csrf<input type="hidden" name="status" value="suspended"><button class="btn bad sm">Askıya al</button></form>
@elseif($c->status==='suspended')<form method="post" action="{{ route('admin.kervea.company.status',$c) }}">@csrf<input type="hidden" name="status" value="approved"><button class="btn sm">Yayına al</button></form>@endif</td></tr>
@endforeach</tbody></table>{{ $rows->links() }}@endif
</div>
@endsection
