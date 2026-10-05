@extends('kervea.admin.layout')
@section('title','Sektörler')
@section('content')
<h1>Sektörler</h1><p class="sub">26 ana sektör TİM taksonomisine göre gelir. Alt sektörleri buradan ekleyebilirsiniz (ör. Demir → İskele-Kalıp, Hırdavat, Alüminyum).</p>
<div class="card"><form method="post" action="{{ route('admin.kervea.sector.store') }}" style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">@csrf
 <div><label>Ana sektör</label><select name="parent_id">@foreach($top as $t)<option value="{{ $t->id }}">{{ $t->name('tr') }}</option>@endforeach</select></div>
 <div><label>Ad (TR)*</label><input name="name_tr" required></div><div><label>Ad (EN)*</label><input name="name_en" required></div>
 <div><label>ES</label><input name="name_es"></div><div><label>FR</label><input name="name_fr"></div><div><label>AR</label><input name="name_ar" dir="rtl"></div><div><label>RU</label><input name="name_ru"></div>
 <button class="btn">Alt sektör ekle</button></form></div>
<div class="card"><table><tbody>
@foreach($top as $t)<tr><td style="width:36px">{{ $t->sort+1 }}</td><td><strong>{{ $t->name('tr') }}</strong> <span class="k">{{ $t->name('en') }}</span>
@foreach($t->children as $c)<div style="margin:6px 0 0 18px">↳ {{ $c->name('tr') }} <span class="k">{{ $c->name('en') }}</span>
 <form method="post" action="{{ route('admin.kervea.sector.delete',$c) }}" style="display:inline" onsubmit="return confirm('Silinsin mi?')">@csrf @method('DELETE')<button class="btn bad sm">Sil</button></form></div>@endforeach</td></tr>@endforeach
</tbody></table></div>
@endsection
