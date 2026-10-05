<!DOCTYPE html>
<html lang="tr" data-theme="light"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="robots" content="noindex">
<title>Parola belirle · Kervea</title>
<link rel="stylesheet" href="{{ asset('kervea/css/kervea.css') }}?v={{ config('kervea.asset_version') }}">
</head><body>
<div class="wrap" style="max-width:440px;margin:0 auto;padding:60px 20px">
 <div class="kv-login-card">
  <div class="kv-login-hd"><h2>Parolanızı belirleyin</h2><p>En az 10 karakter; büyük/küçük harf ve rakam içermeli.</p></div>
  <div class="kv-login-body">
   <input type="hidden" id="spToken" value="{{ request('token') }}">
   <div class="kv-float-input"><input type="email" id="spEmail" class="kv-float-in" placeholder=" " value="{{ request('email') }}" autocomplete="email" required><label class="kv-float-lbl" for="spEmail">E-posta adresi</label></div>
   <div class="kv-float-input"><input type="password" id="spPass" class="kv-float-in" placeholder=" " autocomplete="new-password" minlength="10" required><label class="kv-float-lbl" for="spPass">Yeni parola</label></div>
   <div class="kv-float-input"><input type="password" id="spPass2" class="kv-float-in" placeholder=" " autocomplete="new-password" minlength="10" required><label class="kv-float-lbl" for="spPass2">Parola (tekrar)</label></div>
   <button type="button" class="btn kv-login-btn" id="spBtn">Kaydet ve giriş yap</button>
   <p id="spMsg" style="margin-top:14px;font-size:14px"></p>
  </div>
 </div>
</div>
<script>
document.getElementById('spBtn').addEventListener('click', async function(){
  var msg=document.getElementById('spMsg'); msg.style.color='#b3261e'; msg.textContent='';
  var body={email:spEmail.value.trim(),token:spToken.value,password:spPass.value,password_confirmation:spPass2.value};
  if(body.password!==body.password_confirmation){msg.textContent='Parolalar eşleşmiyor.';return;}
  var r=await fetch('/kv/auth/set-password',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name=csrf-token]').content},body:JSON.stringify(body)});
  var j=await r.json().catch(function(){return{};});
  if(r.ok){msg.style.color='#0D8A80';msg.textContent='Parolanız kaydedildi. Yönlendiriliyorsunuz…';setTimeout(function(){location.href='/giris';},1200);}
  else if(j.error==='invalid_token'){msg.textContent='Bağlantı geçersiz veya süresi dolmuş. Giriş sayfasından yeni bağlantı isteyin.';}
  else{msg.textContent=(j.errors&&Object.values(j.errors)[0][0])||'Parola kurallara uymuyor.';}
});
</script>
</body></html>
