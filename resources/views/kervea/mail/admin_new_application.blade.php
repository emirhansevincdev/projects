@extends('kervea.mail._layout')
@section('body')
<p>Yeni firma başvurusu: <strong>{{ $company->name }}</strong> ({{ strtoupper($company->country_cc) }})</p>
<p><a href="{{ url('/admin/kervea/applications') }}">Onay paneline git</a></p>
@endsection
