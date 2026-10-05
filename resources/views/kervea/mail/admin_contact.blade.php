@extends('kervea.mail._layout')
@section('body')
<p><strong>{{ $msg->name }}</strong> &lt;{{ $msg->email }}&gt; iletişim formundan yazdı:</p>
<p style="white-space:pre-wrap">{{ $msg->message }}</p>
@endsection
