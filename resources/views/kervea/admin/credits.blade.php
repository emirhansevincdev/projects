@extends('kervea.admin.layout')
@section('title','Krediler')
@section('content')
<h1>Krediler</h1><p class="sub">Kredi bakiyesi firmaya aittir (ekip ortak kullanır). Onaylanan her firmaya {{ (int) config('kervea.credits.signup') }} kredi otomatik verilir; kredi yalnızca başka sektördeki kişilerin iletişim bilgisini açmak için harcanır.</p>
<div class="grid2" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
 <div class="card" style="margin:0"><div class="k">Dolaşımdaki kredi</div><div style="font:700 26px 'TeX Gyre Schola',Georgia,serif;color:var(--ink)">{{ number_format($totals['balance']) }}</div></div>
 <div class="card" style="margin:0"><div class="k">Toplam verilen</div><div style="font:700 26px 'TeX Gyre Schola',Georgia,serif;color:var(--ink)">{{ number_format($totals['granted']) }}</div></div>
 <div class="card" style="margin:0"><div class="k">Toplam harcanan</div><div style="font:700 26px 'TeX Gyre Schola',Georgia,serif;color:var(--ink)">{{ number_format($totals['spent']) }}</div></div>
</div>
<form method="get" class="filters" style="align-items:center"><input type="search" name="q" value="{{ request('q') }}" placeholder="Firma adı veya e-posta" style="min-width:260px"><button class="btn sm">Ara</button></form>
<div class="card">
@if($rows->isEmpty())<div class="empty">Kayıt yok.</div>@else
<table><thead><tr><th>Firma</th><th>Sektör</th><th>Durum</th><th style="text-align:right">Bakiye</th><th></th></tr></thead><tbody>
@foreach($rows as $c)
<tr><td><b>{{ $c->name }}</b><br><span class="k">{{ $c->email }}</span></td><td>{{ $c->sector?->name('tr') ?? '—' }}</td>
<td><span class="badge {{ $c->status }}">{{ $c->status }}</span></td>
<td style="text-align:right;font-weight:700">{{ number_format($c->credit_balance) }}</td>
<td style="text-align:right"><a class="btn sm sec" href="{{ route('admin.kervea.credits.show', $c) }}">Defter / düzelt</a></td></tr>
@endforeach</tbody></table>{{ $rows->links() }}@endif
</div>
@endsection
