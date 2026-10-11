@extends('kervea.mail._layout')
@section('body')
<p><strong>{{ $req->requester_name }}</strong> &lt;{{ $req->requester_email }}&gt; "Kişiler" listesinden bir kaydın kaldırılmasını talep etti (KVKK).</p>
<p>Kişi: <strong>{{ $req->person_name }}</strong>@if($req->person_email) &lt;{{ $req->person_email }}&gt;@endif @if($req->person_ref) · {{ $req->person_ref }}@endif</p>
<p style="white-space:pre-wrap">{{ $req->reason }}</p>
<p>Yönetim paneli → Kişiler → Kaldırma talepleri bölümünden işleme alın.</p>
@endsection
