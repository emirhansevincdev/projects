@extends('kervea.mail._layout')
@section('body')
<p>Merhaba,</p>
<p>Sektörünüzde yeni bir doğrulanmış firma Kervea'ya katıldı: <strong>{{ $company->name }}</strong> ({{ $country }}).</p>
<p><a href="{{ url('/company/'.$company->slug) }}" style="color:#0D8A80;font-weight:700">Profili görüntüle →</a></p>
<p style="color:#566A6C;font-size:12px">Bu bildirimi, ticari elektronik ileti onayı verdiğiniz için alıyorsunuz. Üye panelinden istediğiniz zaman kapatabilirsiniz.</p>
@endsection
