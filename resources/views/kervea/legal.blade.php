<!DOCTYPE html>
<html lang="tr" dir="ltr" data-theme="light"><head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; base-uri 'self';"/>
<title>{{ $title }} — Kervea</title>
<meta name="description" content="{{ $title }} — Kervea B2B ticaret eşleştirme ağı."/>
<link rel="canonical" href="{{ rtrim(config('app.url'), '/') }}/{{ $path }}"/>
<link rel="icon" href="/favicon.ico"/>
<link rel="stylesheet" href="{{ asset('kervea/css/kervea.css') }}?v={{ config('kervea.asset_version') }}">
<style>
html,body{background:#F5FAF8 !important;color:#0A2723}
.kv-legal-top{display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:860px;margin:0 auto;padding:22px 20px 0}
.kv-legal-top a{color:var(--emer,#0D8A80);text-decoration:none;font-weight:600}
.kv-legal-brand{font-family:var(--serif,Georgia,serif);font-size:22px;letter-spacing:.04em;color:var(--ink,#0A2723)}
.kv-legal-card{max-width:860px;margin:18px auto 40px;background:#fff;border:1px solid var(--line,rgba(13,138,128,.14));border-radius:16px;padding:8px 12px 20px}
.kv-legal-card h1{font-family:var(--serif,Georgia,serif);font-size:28px;color:var(--ink,#0A2723);margin:22px 28px 0}
.kv-legal-card .ver-tag{font-size:12px;font-weight:600;margin-left:8px;color:var(--emer,#0D8A80)}
.kv-legal-nav{max-width:860px;margin:0 auto 40px;padding:0 20px;display:flex;flex-wrap:wrap;gap:8px 18px;font-size:14px}
.kv-legal-nav a{color:var(--emer,#0D8A80)}
</style>
</head>
<body>
<div class="kv-legal-top"><a class="kv-legal-brand" href="/">KERVEA</a><a href="/">← Ana sayfa</a></div>
<main class="kv-legal-card">
  <h1>{{ $title }}<span class="ver-tag">{{ $version }}</span></h1>
  <article class="legal-body">@include('kervea.legal.'.$partial)</article>
</main>
<nav class="kv-legal-nav" aria-label="Yasal metinler">
  <a href="/privacy">Gizlilik ve Çerez Politikası</a>
  <a href="/kvkk">KVKK Aydınlatma Metni</a>
  <a href="/terms">Üyelik Sözleşmesi</a>
  <a href="/contact">İletişim</a>
</nav>
</body></html>
