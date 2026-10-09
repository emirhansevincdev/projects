<!DOCTYPE html>
<html lang="tr" dir="ltr" data-theme="light"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="csrf-token" content="{{ csrf_token() }}">
{!! str_replace('__KV_BASE__', rtrim(config('app.url'), '/'), view('kervea.partials.head-seo')->render()) !!}
<link rel="stylesheet" href="{{ asset('kervea/css/kervea.css') }}?v={{ config('kervea.asset_version') }}">
@php($social = array_filter($boot['social'] ?? []))
{{-- "Sign in with Google/LinkedIn" buttons exist in the markup; hide the ones without keys already in the HTML so nothing flashes before JS runs. --}}
<style>@if(! $social)#login .kv-login-social,#login .kv-login-sep{display:none}@else @foreach(\App\Services\Kv\SocialAuth::PROVIDERS as $p)@unless(isset($social[$p]))#login .kv-login-social-btn[data-social="{{ $p }}"]{display:none}@endunless @endforeach @if(count($social) === 1)#login .kv-login-social{grid-template-columns:1fr}@endif @endif</style>
<script src="{{ asset('kervea/js/kervea-head.js') }}?v={{ config('kervea.asset_version') }}"></script>
<script src="{{ asset('kervea/vendor/gsap.min.js') }}"></script>
<script src="{{ asset('kervea/vendor/ScrollTrigger.min.js') }}"></script>
<script src="{{ asset('kervea/vendor/amcharts-world.min.js') }}" defer></script>
<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin">
<meta http-equiv="Cross-Origin-Resource-Policy" content="same-site">
</head>
<body>
@include('kervea.partials.svgdefs')
@include('kervea.partials.nav')
@include('kervea.partials.view-home')
@include('kervea.partials.view-add')
@include('kervea.partials.view-pricing')
@include('kervea.partials.view-about')
@include('kervea.partials.view-contact')
@include('kervea.partials.view-login')
@include('kervea.partials.view-panel')
@include('kervea.partials.view-firm')
@include('kervea.partials.footer')
@include('kervea.partials.firm-modal')
<script>window.KV_BOOT = @json($boot);</script>
<script src="{{ asset('kervea/js/kervea-app.js') }}?v={{ config('kervea.asset_version') }}"></script>
<script src="{{ asset('kervea/js/kervea-api.js') }}?v={{ config('kervea.asset_version') }}"></script>
</body>
</html>
