@extends('kervea.mail._layout')
@section('body')
<p>Merhaba,</p>
<p>Bu e-posta adresi, Kervea sitesindeki bülten kutusuna yazıldı. Duyuruları almak istiyorsanız aboneliği onaylayın:</p>
<p style="margin:22px 0"><a href="{{ $url }}" style="background:#0D8A80;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700">Aboneliği onayla</a></p>
<p style="color:#566A6C;font-size:13px">Düğmeye tıklayamıyorsanız şu adresi tarayıcınıza yapıştırın:<br>{{ $url }}</p>
<p style="color:#566A6C;font-size:13px">Bu isteği siz yapmadıysanız hiçbir şey yapmanız gerekmez: onaylamadığınız sürece size duyuru gönderilmez.</p>
@endsection
