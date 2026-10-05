@extends('kervea.mail._layout')
@section('body')
<p>Merhaba {{ $company->rep_name }},</p>
<p><strong>{{ $company->name }}</strong> başvurunuz onaylandı. Hesabınızı kullanmaya başlamak için parolanızı belirleyin:</p>
<p style="margin:22px 0"><a href="{{ $url }}" style="background:#0D8A80;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:700">Parolamı belirle</a></p>
<p style="color:#566A6C;font-size:13px">Bu bağlantı 24 saat geçerlidir. Düğmeye tıklayamıyorsanız şu adresi tarayıcınıza yapıştırın:<br>{{ $url }}</p>
@endsection
