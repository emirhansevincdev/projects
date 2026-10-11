@extends('kervea.admin.layout')
@section('title','Kredi defteri · '.$company->name)
@section('content')
@php $reasons = ['signup'=>'Üyelik hediyesi','purchase'=>'Kredi paketi','pro_bonus'=>'Premium hediyesi','person_reveal'=>'Kişi bilgisi açıldı','admin_adjust'=>'Yönetici düzeltmesi','refund'=>'İade']; @endphp
<p><a href="{{ route('admin.kervea.credits') }}">← Tüm firmalar</a></p>
<h1>{{ $company->name }}</h1>
<p class="sub">{{ $company->email }} · durum: {{ $company->status }}</p>
@unless($audit['ok'])<div class="err">Tutarsızlık: defter toplamı {{ $audit['sum'] }}, kayıtlı bakiye {{ $audit['balance'] }}. Lütfen geliştiriciye bildirin (php artisan kervea:credits-backfill --audit).</div>@endunless
<div class="grid2" style="grid-template-columns:1fr 2fr;align-items:start">
 <div>
  <div class="card"><div class="k">Bakiye</div><div style="font:700 38px 'TeX Gyre Schola',Georgia,serif;color:var(--ink)">{{ number_format($balance) }}</div><div class="k">kredi</div></div>
  <div class="card">
   <h3 style="margin:0 0 4px;color:var(--ink)">Manuel düzeltme</h3>
   <p class="sub" style="margin:0 0 8px">Artı değer kredi ekler, eksi değer düşer. Bakiye sıfırın altına inemez. Gerekçe zorunludur ve deftere yazılır.</p>
   <form method="post" action="{{ route('admin.kervea.credits.adjust', $company) }}">@csrf
    <input type="hidden" name="idem" value="{{ $idem }}">
    <label for="cdelta">Değişim (örn. 25 veya -10)</label><input id="cdelta" type="number" name="delta" value="{{ old('delta') }}" required step="1" min="-100000" max="100000" style="width:100%">
    <label for="creason">Gerekçe</label><textarea id="creason" name="reason" rows="3" required minlength="5" maxlength="255" style="width:100%">{{ old('reason') }}</textarea>
    <p><button class="btn" onclick="return confirm('Kredi düzeltmesi uygulansın mı?')">Uygula</button></p>
   </form>
  </div>
 </div>
 <div class="card">
  <h3 style="margin:0 0 8px;color:var(--ink)">Defter</h3>
  @if($ledger->isEmpty())<div class="empty">Henüz hareket yok.</div>@else
  <table><thead><tr><th>Tarih</th><th>İşlem</th><th style="text-align:right">Değişim</th><th style="text-align:right">Bakiye</th><th>Not</th></tr></thead><tbody>
  @foreach($ledger as $e)
   <tr><td>{{ $e->created_at?->format('d.m.Y H:i') }}</td>
    <td>{{ $reasons[$e->reason] ?? $e->reason }}@if($e->ref_type)<br><span class="k">{{ $e->ref_type }} #{{ $e->ref_id }}</span>@endif</td>
    <td style="text-align:right;font-weight:700;color:{{ $e->delta > 0 ? 'var(--ok)' : 'var(--bad)' }}">{{ $e->delta > 0 ? '+' : '' }}{{ $e->delta }}</td>
    <td style="text-align:right">{{ $e->balance_after }}</td>
    <td>{{ $e->meta['note'] ?? ($e->meta['channel'] ?? ($e->meta['pack'] ?? '')) }}@if($e->user_id && isset($users[$e->user_id]))<br><span class="k">{{ $users[$e->user_id] }}</span>@endif</td></tr>
  @endforeach</tbody></table>{{ $ledger->links() }}@endif
 </div>
</div>
@endsection
