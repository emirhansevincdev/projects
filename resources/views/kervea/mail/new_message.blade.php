@extends('kervea.mail._layout')
@section('body')
<p style="font-size:18px;font-weight:700;margin:0 0 10px">Yeni mesajınız var</p>
<p><strong>{{ $from }}</strong> firmasından Kervea üzerinden yeni bir mesaj aldınız.</p>
<p style="margin:22px 0"><a href="{{ $url }}" style="background:#0D8A80;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700">Mesajlara git</a></p>
<p style="color:#566A6C;font-size:13px">Güvenliğiniz için mesaj içeriği e-postayla gönderilmez; yalnızca üye panelinizde okunur.</p>
<hr style="border:0;border-top:1px solid #dbe7e4;margin:22px 0">
<p style="font-size:16px;font-weight:700;margin:0 0 8px">You have a new message</p>
<p><strong>{{ $from }}</strong> sent you a new message on Kervea. Sign in to your member panel to read and answer it: <a href="{{ $url }}" style="color:#0D8A80;font-weight:700">Go to messages</a>.</p>
<p style="color:#566A6C;font-size:13px">For your security the message text is never sent by e-mail.</p>
@endsection
