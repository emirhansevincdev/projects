<!DOCTYPE html>
<html lang="tr" dir="ltr" data-theme="light"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="csrf-token" content="{{ csrf_token() }}">
{!! str_replace('__KV_BASE__', rtrim(config('app.url'), '/'), view('kervea.partials.head-seo')->render()) !!}
<link rel="stylesheet" href="{{ asset('kervea/css/kervea.css') }}?v={{ config('kervea.asset_version') }}">
<script src="{{ asset('kervea/js/kervea-head.js') }}?v={{ config('kervea.asset_version') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.amcharts.com/lib/5/index.js" defer></script>
<script src="https://cdn.amcharts.com/lib/5/map.js" defer></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js" defer></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js" defer></script>
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
