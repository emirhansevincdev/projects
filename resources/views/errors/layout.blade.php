<!DOCTYPE html>
<html lang="tr" data-theme="light"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>@yield('code') · Kervea</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<style>
@font-face{font-family:"TeX Gyre Schola";src:url("/fonts/texgyreschola-bold.woff2") format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:"Carlito";src:url("/fonts/Carlito-Regular.woff2") format("woff2");font-weight:400;font-display:swap}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0A211F;color:#F5FAF8;font:17px/1.6 Carlito,Calibri,Segoe UI,sans-serif;padding:24px;position:relative;overflow:hidden}
.bg{position:absolute;right:-8vw;top:-6vh;width:62vw;max-width:760px;opacity:.07;pointer-events:none}
.box{position:relative;max-width:520px}
.brand{display:flex;align-items:center;gap:14px;margin-bottom:34px;font:700 28px "TeX Gyre Schola",Georgia,serif;letter-spacing:1px;text-decoration:none;color:#F5FAF8}.brand b{color:#8FE9C4}
.code{font:700 96px/1 "TeX Gyre Schola",Georgia,serif;color:#0D8A80;margin:0 0 6px}
h1{font:700 34px/1.2 "TeX Gyre Schola",Georgia,serif;margin:0 0 12px}
p{margin:0 0 26px;color:#B9CDC9}
a.btn{display:inline-block;background:#0D8A80;color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:12px}a.btn:hover{background:#0A6F67}
</style></head><body>
<svg class="bg" viewBox="0 0 200 200" aria-hidden="true"><path transform="translate(100 100) rotate(45) scale(.58) translate(-100 -100)" d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#fff" fill-opacity=".6"/><path d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#fff"/><circle cx="100" cy="100" r="10" fill="#0A211F"/></svg>
<div class="box">
 <a class="brand" href="/"><img src="/icon.svg" width="40" height="40" alt=""><span>KER<b>VEA</b></span></a>
 <div class="code">@yield('code')</div>
 <h1>@yield('title')</h1>
 <p>@yield('message')</p>
 <a class="btn" href="/">Ana sayfaya dön</a>
</div></body></html>
