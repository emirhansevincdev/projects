<!doctype html>
<html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}"><meta name="robots" content="noindex,nofollow">
<title>@yield('title', 'Yönetim') · Kervea</title>
<style>
:root{--teal:#0D8A80;--teal-d:#0A5F56;--ink:#0A211F;--body:#34474A;--faint:#6b7f82;--line:#dbe7e4;--bg:#f3f7f6;--card:#fff;--bad:#b3261e;--warn:#b26a00;--ok:#1F9D6B}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 Carlito,Calibri,Arial,sans-serif;color:var(--body);background:var(--bg)}
a{color:var(--teal)}
.side{position:fixed;inset:0 auto 0 0;width:236px;background:var(--ink);color:#cfe3df;padding:20px 14px;overflow:auto}
.side .brand{font:700 22px/1 "TeX Gyre Schola",Georgia,serif;color:#fff;letter-spacing:.5px;padding:4px 10px 18px}.side .brand b{color:#43c6b9}
.side a{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;color:#cfe3df;text-decoration:none;margin-bottom:2px}
.side a:hover{background:rgba(255,255,255,.07)}.side a.on{background:var(--teal);color:#fff}
.side .n{background:#e0a100;color:#201500;border-radius:99px;font-size:11px;font-weight:700;padding:1px 8px}
.side .sep{height:1px;background:rgba(255,255,255,.1);margin:12px 6px}
.main{margin-left:236px;padding:28px 32px;max-width:1280px}
h1{font:700 26px "TeX Gyre Schola",Georgia,serif;color:var(--ink);margin:0 0 4px}.sub{color:var(--faint);margin:0 0 22px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:18px}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:var(--faint);padding:8px 10px;border-bottom:1px solid var(--line)}
td{padding:11px 10px;border-bottom:1px solid #eef3f2;vertical-align:top}tr:last-child td{border-bottom:0}
.btn{display:inline-block;border:0;border-radius:10px;padding:8px 14px;font:600 14px inherit;font-family:inherit;cursor:pointer;background:var(--teal);color:#fff;text-decoration:none}
.btn:hover{background:var(--teal-d)}.btn.sec{background:#e7f1ef;color:var(--teal-d)}.btn.bad{background:var(--bad)}.btn.sm{padding:5px 10px;font-size:13px}
.badge{display:inline-block;border-radius:99px;padding:2px 10px;font-size:12px;font-weight:700;background:#e7f1ef;color:var(--teal-d)}
.badge.pending{background:#fff1d6;color:var(--warn)}.badge.approved{background:#dcf5ea;color:#0f6b46}.badge.rejected,.badge.suspended{background:#fde3e1;color:var(--bad)}
input,select,textarea{font:inherit;border:1px solid var(--line);border-radius:10px;padding:8px 10px;background:#fff;color:var(--ink);max-width:100%}
label{display:block;font-size:13px;font-weight:700;color:var(--ink);margin:12px 0 4px}
.flash{background:#dcf5ea;border:1px solid #b6e6d0;color:#0f6b46;padding:10px 14px;border-radius:10px;margin-bottom:16px}
.err{background:#fde3e1;border:1px solid #f4b8b3;color:var(--bad);padding:10px 14px;border-radius:10px;margin-bottom:16px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:6px 28px}.k{color:var(--faint);font-size:12px;text-transform:uppercase;letter-spacing:.4px}.v{margin-bottom:10px;word-break:break-word}
.empty{text-align:center;color:var(--faint);padding:36px}
.filters{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}.filters a{padding:6px 14px;border-radius:99px;background:#e7f1ef;color:var(--teal-d);text-decoration:none;font-weight:600;font-size:13px}.filters a.on{background:var(--teal);color:#fff}
@media(max-width:860px){.side{position:static;width:auto}.main{margin:0;padding:18px}.grid2{grid-template-columns:1fr}}
</style></head><body>
@php $pending = \App\Models\Kv\Company::where('status','pending')->count(); $newMsgs = \App\Models\Kv\ContactMessage::where('status','new')->count(); @endphp
<aside class="side">
 <div class="brand">KER<b>VEA</b></div>
 <a href="{{ route('admin.kervea.applications') }}" class="{{ request()->routeIs('admin.kervea.applications*') ? 'on' : '' }}">Başvurular @if($pending)<span class="n">{{ $pending }}</span>@endif</a>
 <a href="{{ route('admin.kervea.companies') }}" class="{{ request()->routeIs('admin.kervea.companies*') ? 'on' : '' }}">Firmalar</a>
 <a href="{{ route('admin.kervea.sectors') }}" class="{{ request()->routeIs('admin.kervea.sectors*') ? 'on' : '' }}">Sektörler</a>
 <a href="{{ route('admin.kervea.contacts') }}" class="{{ request()->routeIs('admin.kervea.contacts*') ? 'on' : '' }}">İletişim Mesajları @if($newMsgs)<span class="n">{{ $newMsgs }}</span>@endif</a>
 <a href="{{ route('admin.kervea.promos') }}" class="{{ request()->routeIs('admin.kervea.promos*') ? 'on' : '' }}">Promosyon Kodları</a>
 <a href="{{ route('admin.kervea.orders') }}" class="{{ request()->routeIs('admin.kervea.orders*') ? 'on' : '' }}">Siparişler</a>
 <div class="sep"></div>
 <a href="{{ url('/') }}" target="_blank">Siteyi aç ↗</a>
</aside>
<main class="main">
 @if(session('ok'))<div class="flash">{{ session('ok') }}</div>@endif
 @if($errors->any())<div class="err">{{ $errors->first() }}</div>@endif
 @yield('content')
</main></body></html>
