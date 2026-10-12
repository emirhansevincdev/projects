@extends('kervea.admin.layout')
@section('title','Ekipler')
@section('content')
<h1>Ekipler</h1>
<p class="sub">Üye firmaların panelde çalışan kişileri. Burada yalnızca görüntüleyebilir, destek gerektiğinde bir kişiyi devre dışı bırakabilirsiniz; roller ve davetler firma sahibi tarafından yönetilir. Koltuk sınırı: firma başına en fazla {{ $max }} kişi (sahip dahil).</p>
<form class="filters" method="get"><input name="q" value="{{ $q }}" placeholder="Firma, kişi adı veya e-posta"><button class="btn sec sm">Ara</button>@if($q !== '')<a href="{{ route('admin.kervea.teams') }}">Temizle</a>@endif</form>
<p class="sub" style="margin-bottom:12px">{{ $totals['companies'] }} firmada {{ $totals['people'] }} ekip üyesi{{ $q !== '' ? ' (aramaya uyan)' : '' }}.</p>
@if($rows->isEmpty())
 <div class="card"><div class="empty">{{ $q !== '' ? 'Aramanıza uyan ekip bulunamadı.' : 'Henüz hiçbir firma ekip üyesi eklememiş.' }}</div></div>
@endif
@foreach($rows as $row)
 @php $c = $row['company']; @endphp
 <div class="card">
  <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
   <div><a href="{{ route('admin.kervea.application', $c) }}"><strong style="font-size:17px">{{ $c->name }}</strong></a> <span class="badge {{ $c->status }}">{{ $c->status }}</span></div>
   <div class="k">{{ 1 + $row['people'] }} / {{ $max }} koltuk · Sahip: {{ $row['owner']?->name ?? '—' }} @if($row['owner'])({{ $row['owner']->email }})@endif</div>
  </div>
  <table style="margin-top:8px"><thead><tr><th>Kişi</th><th>Rol</th><th>İzinler</th><th>Durum</th><th>Son giriş</th><th></th></tr></thead><tbody>
  @foreach($row['members'] as $m)
   @php
    $perms = \App\Services\Kv\CompanyContext::effectivePerms($m);
    $statusLabel = ['invited' => 'Davet bekliyor', 'active' => 'Etkin', 'disabled' => 'Devre dışı'][$m->status] ?? $m->status;
    $last = $m->user_id ? ($logins[$m->user_id] ?? null) : null;
   @endphp
   <tr>
    <td><strong>{{ $m->name ?: '—' }}</strong><div class="k" style="text-transform:none">{{ $m->email }}</div></td>
    <td>{{ $roles[$m->role]['label'] ?? $m->role }}@if(is_array($m->perms)) <span class="k" style="text-transform:none">· özel izinler</span>@endif</td>
    <td style="max-width:280px">{{ $perms ? implode(', ', array_map(fn ($p) => config('kervea.team.perms.'.$p.'.label', $p), $perms)) : 'Yalnızca genel bakış' }}</td>
    <td><span class="badge {{ $m->status === 'active' ? 'approved' : ($m->status === 'disabled' ? 'suspended' : 'pending') }}">{{ $statusLabel }}</span>
     @if($m->status === 'invited' && $m->invited_at)<div class="k" style="text-transform:none">Davet: {{ $m->invited_at->format('d.m.Y H:i') }}</div>@endif</td>
    <td>{{ $last ? \Illuminate\Support\Carbon::parse($last)->format('d.m.Y H:i') : '—' }}</td>
    <td style="white-space:nowrap">
     @if($m->status === 'active')
      <form method="post" action="{{ route('admin.kervea.team.disable', $m->id) }}" data-msg="{{ ($m->name ?: $m->email).' devre dışı bırakılsın mı? Açık oturumları kapanır.' }}" onsubmit="return confirm(this.dataset.msg)">@csrf<button class="btn bad sm">Devre dışı bırak</button></form>
     @elseif($m->status === 'disabled')
      <form method="post" action="{{ route('admin.kervea.team.enable', $m->id) }}">@csrf<button class="btn sm">Etkinleştir</button></form>
     @endif
    </td>
   </tr>
  @endforeach
  </tbody></table>
 </div>
@endforeach
{{ $page->links() }}
@endsection
