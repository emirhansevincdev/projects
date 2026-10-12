<!DOCTYPE html>
<html lang="tr" dir="ltr" data-theme="light"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'">
<meta name="robots" content="noindex,nofollow"/>
<title>{{ $title }} — Kervea</title>
<link rel="icon" href="/favicon.ico"/>
<link rel="stylesheet" href="{{ asset('kervea/css/kervea.css') }}?v={{ config('kervea.asset_version') }}">
<style>
html,body{background:#F5FAF8 !important;color:#0A2723}
.kv-nlr{max-width:560px;margin:12vh auto 0;padding:0 20px}
.kv-nlr-brand{display:block;font-family:var(--serif,Georgia,serif);font-size:22px;letter-spacing:.04em;color:var(--ink,#0A2723);text-decoration:none;margin-bottom:18px}
.kv-nlr-card{background:#fff;border:1px solid var(--line,rgba(13,138,128,.14));border-radius:16px;padding:26px 28px}
.kv-nlr-card h1{font-family:var(--serif,Georgia,serif);font-size:26px;margin:0 0 10px;color:var(--ink,#0A2723)}
.kv-nlr-card p{margin:0 0 16px;line-height:1.55}
.kv-nlr-card a{color:var(--emer,#0D8A80);font-weight:600}
</style>
</head>
<body>
<main class="kv-nlr">
  <a class="kv-nlr-brand" href="/">KERVEA</a>
  <div class="kv-nlr-card">
    <h1>{{ $title }}</h1>
    <p>{{ $text }}</p>
    <a href="/">← Ana sayfaya dön</a>
  </div>
</main>
</body></html>
