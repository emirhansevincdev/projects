@extends('kervea.admin.layout')
@section('title','Kişiler · KVKK kaldırma talepleri')
@section('content')
<h1>KVKK kaldırma talepleri</h1>
<p class="sub">“Kişiler” listesindeki bir kaydın kaldırılmasını isteyen herkese açık form başvuruları. İşleme alınca seçtiğiniz kişilerin adı ve iletişim bilgileri kalıcı olarak silinir; talep kaydı kanıt olarak kalır ve aynı e-posta yeniden içe aktarılmaz.</p>
<div class="filters">
 <a href="{{ route('admin.kervea.people') }}">Liste</a>
 <a href="{{ route('admin.kervea.people.import') }}">CSV içe aktar</a>
 @foreach(['new'=>'Yeni','done'=>'Tamamlanan','rejected'=>'Reddedilen'] as $k=>$l)<a href="{{ route('admin.kervea.people.removals', ['status'=>$k]) }}" class="{{ $status===$k ? 'on' : '' }}">{{ $l }} ({{ $counts[$k] ?? 0 }})</a>@endforeach
</div>
@if($rows->isEmpty())<div class="card"><div class="empty">Bu durumda talep yok.</div></div>@endif
@foreach($rows as $req)
<div class="card">
 <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
  <div><b>{{ $req->requester_name }}</b> &lt;{{ $req->requester_email }}&gt;<br><span class="k">{{ $req->created_at->format('d.m.Y H:i') }} · IP {{ $req->ip }}</span></div>
  <span class="badge {{ $req->status==='done'?'approved':($req->status==='new'?'pending':'rejected') }}">{{ $req->status }}</span>
 </div>
 <p style="margin:10px 0 4px"><span class="k">Kaldırılması istenen</span><br><b>{{ $req->person_name }}</b>@if($req->person_email) &lt;{{ $req->person_email }}&gt;@endif @if($req->person_ref) · {{ $req->person_ref }}@endif</p>
 <p style="white-space:pre-wrap;margin:6px 0 10px">{{ $req->reason }}</p>
 @if($req->status==='new')
  <form method="post" action="{{ route('admin.kervea.people.removal.done', $req) }}">@csrf
   <div class="k">Eşleşen kayıtlar</div>
   @forelse($matches[$req->id] as $p)
    <label style="display:flex;gap:8px;align-items:center;font-weight:400;margin:4px 0"><input type="checkbox" name="person_ids[]" value="{{ $p->id }}" @checked($req->person_email && $p->email === mb_strtolower($req->person_email))>
     #{{ $p->id }} {{ $p->name }} · {{ $p->company_name }} · {{ $p->email ?: '—' }} · {{ $p->sector?->name('tr') }}</label>
   @empty
    <p class="k" style="text-transform:none">Eşleşen kayıt yok. Talebi yine de kapatabilirsiniz (not düşün).</p>
   @endforelse
   <label for="n{{ $req->id }}">Not (isteğe bağlı)</label><input id="n{{ $req->id }}" name="admin_note" maxlength="500" style="width:100%">
   <p style="margin-top:10px"><button class="btn" onclick="return confirm('Seçili kişiler kalıcı olarak silinsin ve talep kapatılsın mı?')">Kişileri kaldır ve talebi kapat</button></p>
  </form>
  <form method="post" action="{{ route('admin.kervea.people.removal.reject', $req) }}" style="display:flex;gap:8px;flex-wrap:wrap;align-items:end">@csrf
   <div style="flex:1;min-width:220px"><label for="r{{ $req->id }}">Reddetme gerekçesi</label><input id="r{{ $req->id }}" name="admin_note" maxlength="500" required minlength="3" style="width:100%"></div>
   <button class="btn sec">Talebi reddet</button>
  </form>
 @else
  <p class="k" style="text-transform:none">İşlem: {{ $req->handled_at?->format('d.m.Y H:i') }} · {{ $req->admin_note }}</p>
 @endif
</div>
@endforeach
{{ $rows->links() }}
@endsection
