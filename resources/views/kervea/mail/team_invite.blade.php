@extends('kervea.mail._layout')
@section('body')
<p>Merhaba {{ $name }},</p>
<p>@if($inviter)<strong>{{ $inviter }}</strong>, @endif<strong>{{ $company->name }}</strong> firmasının Kervea panelinde sizi <strong>{{ $roleLabel }}</strong> olarak ekip üyesi olarak ekledi. Hesabınızı kullanmaya başlamak için parolanızı belirleyin:</p>
<p style="margin:22px 0"><a href="{{ $url }}" style="background:#0D8A80;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700">Parolamı belirle</a></p>
<p style="color:#566A6C;font-size:13px">Bu bağlantı {{ $hours }} saat geçerlidir; süresi dolarsa firma yöneticinizden daveti yeniden göndermesini isteyin. Düğmeye tıklayamıyorsanız şu adresi tarayıcınıza yapıştırın:<br>{{ $url }}</p>
<p style="color:#566A6C;font-size:13px">Bu daveti beklemiyorsanız e-postayı yok sayabilirsiniz; parolanızı belirlemediğiniz sürece hesap etkinleşmez.</p>
@endsection
