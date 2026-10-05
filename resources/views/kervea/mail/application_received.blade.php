@extends('kervea.mail._layout')
@section('body')
<p>Merhaba {{ $company->rep_name }},</p>
<p><strong>{{ $company->name }}</strong> için firma başvurunuz alındı. Ekibimiz belgelerinizi inceleyecek; sonuç e-posta adresinize bildirilecektir.</p>
<p>Başvuru numaranız: <strong>#{{ $company->id }}</strong></p>
@endsection
