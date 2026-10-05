@extends('kervea.mail._layout')
@section('body')
<p>Merhaba {{ $company->rep_name }},</p>
<p><strong>{{ $company->name }}</strong> başvurunuzu şu aşamada onaylayamadık.</p>
@if($note)<p><em>{{ $note }}</em></p>@endif
<p>Eksik belgeleri tamamlayarak yeniden başvurabilir veya bize yazabilirsiniz.</p>
@endsection
