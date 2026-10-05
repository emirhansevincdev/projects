@extends('kervea.admin.layout')
@section('title','Başvurular')
@section('content')
<h1>Firma başvuruları</h1><p class="sub">Yalnızca yöneticiler görür. Onaylanan firma yayına girer ve üyeye parola belirleme bağlantısı gider.</p>
<div class="filters">
 @foreach(['pending'=>'Bekleyen','approved'=>'Onaylı','rejected'=>'Reddedilen','suspended'=>'Askıda'] as $k=>$l)
  <a href="?status={{ $k }}" class="{{ $status===$k?'on':'' }}">{{ $l }}</a>
 @endforeach
</div>
<div class="card">
@if($rows->isEmpty())<div class="empty">Bu durumda başvuru yok.</div>@else
<table><thead><tr><th>#</th><th>Firma</th><th>Ülke</th><th>Sektör</th><th>Tarih</th><th></th></tr></thead><tbody>
@foreach($rows as $c)
<tr><td>{{ $c->id }}</td><td><strong>{{ $c->name }}</strong><br><span class="k">{{ $c->rep_name }}</span></td>
<td>{{ strtoupper($c->country_cc) }}</td><td>{{ $c->sector?->name('tr') }}</td><td>{{ $c->created_at->format('d.m.Y H:i') }}</td>
<td><a class="btn sm" href="{{ route('admin.kervea.application', $c) }}">İncele</a></td></tr>
@endforeach
</tbody></table>{{ $rows->links() }}
@endif
</div>
@endsection
