/* ═══════════════════════════════════════════════════════════════════════════
   KERVEA · BACKEND BAĞLANTISI
   kervea-app.js (tasarım) yüklendikten SONRA çalışır ve prototipteki sahte
   veri/işlevleri gerçek Laravel uç noktalarıyla değiştirir.
   Sunucu tek doğruluk kaynağıdır: yetki, kota, maskeleme ve fiyat orada hesaplanır.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var BOOT = window.KV_BOOT || {};
var ICONS = {"wa": "<svg fill=\"#25D366\" viewBox=\"0 0 24 24\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z\"/></svg>", "li": "<svg fill=\"#0A66C2\" viewBox=\"0 0 24 24\"><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/></svg>", "ig": "<svg viewBox=\"0 0 24 24\"><defs><linearGradient id=\"ig1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f09433\"/><stop offset=\".3\" stop-color=\"#e6683c\"/><stop offset=\".6\" stop-color=\"#dc2743\"/><stop offset=\"1\" stop-color=\"#bc1888\"/></linearGradient></defs><path fill=\"url(#ig1)\" d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z\"/></svg>", "fb": "<svg fill=\"#1877F2\" viewBox=\"0 0 24 24\"><path d=\"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z\"/></svg>", "x": "<svg fill=\"#000\" viewBox=\"0 0 24 24\"><path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"/></svg>", "yt": "<svg fill=\"#FF0000\" viewBox=\"0 0 24 24\"><path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/></svg>"};
window.KV_ICONS = ICONS;

// ───────────────────────── yardımcılar ─────────────────────────
function csrf(){ var m=document.querySelector('meta[name="csrf-token"]'); return m?m.content:''; }
function api(method, url, body){
  var opts={method:method, credentials:'same-origin', headers:{'Accept':'application/json','X-Requested-With':'XMLHttpRequest','X-CSRF-TOKEN':csrf()}};
  if(typeof FormData!=='undefined' && body instanceof FormData){ opts.body=body; }
  else if(body!==undefined){ opts.headers['Content-Type']='application/json'; opts.body=JSON.stringify(body); }
  return fetch(url,opts).then(function(r){
    return r.json().catch(function(){return {};}).then(function(d){
      if((r.status===401||r.status===419) && window.KV_USER && !/\/kv\/auth\//.test(url)){ applyUser(null); if(typeof toast==='function') toast(tt('toast_session_end','Oturum süreniz doldu. Lütfen tekrar giriş yapın.')); }
      return {ok:r.ok,status:r.status,data:d};
    });
  }).catch(function(){ return {ok:false,status:0,data:{}}; });
}
window.KV_API = api;
function T_(){ return (window.T && T[LANG]) || (window.T && T.tr) || {}; }
function firstError(res){
  var d=res.data||{};
  if(d.errors){ var k=Object.keys(d.errors)[0]; if(k) return d.errors[k][0]; }
  return d.message || '';
}
function alertErr(title, res, fallback){
  var msg = firstError(res) || fallback || 'Bir hata oluştu. Lütfen tekrar deneyin.';
  if(typeof kvShowAlert==='function') kvShowAlert('destructive', title, msg); else if(typeof toast==='function') toast(msg);
}
function el(id){ return document.getElementById(id); }
function setCsrf(t){ if(!t) return; var m=document.querySelector('meta[name="csrf-token"]'); if(m) m.content=t; }
function setBusy(btn, on){ if(!btn) return; btn.disabled = !!on; btn.style.opacity = on ? '.6' : ''; }

// ───────────────────────── oturum (sunucu = gerçek) ─────────────────────────
window.KV_USER = BOOT.user || null;
window.kvIsLoggedIn = function(){ return !!window.KV_USER; };
function applyUser(u){
  window.KV_USER = u || null;
  if(u){
    window.USER = {plan:u.plan, name:u.name, email:u.email, company:u.company, is_admin:!!u.is_admin};
    try{ if(window.safeStorage) safeStorage.set('session', {name:u.name,email:u.email,ts:Date.now(),last:Date.now()}); }catch(e){}
  } else {
    window.USER = null;
    try{ if(window.safeStorage) safeStorage.remove('session'); }catch(e){}
  }
  try{ kvUpdateAuthUI(); }catch(e){}
  try{ var a=el('kvUserAvatar'); if(a && u) a.textContent=String(u.name||'').split(/\s+/).map(function(w){return w[0]||'';}).join('').substring(0,2).toUpperCase(); }catch(e){}
  var panel=el('panel'); if(!u && panel && panel.classList.contains('on')) go('login');
}
applyUser(window.KV_USER);
window.kvSetLoggedIn = function(){ /* oturumu yalnızca sunucu açar */ try{ kvUpdateAuthUI(); }catch(e){} };

window.kvSubmitLogin = function(){
  var email = el('kvLoginEmail').value.trim(), pass = el('kvLoginPass').value, remember = el('kvRememberMe').checked;
  var codeEl = el('kvLoginCode'), code = codeEl ? codeEl.value.trim() : '';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ kvShowAlert('destructive','E-posta hatalı','Lütfen geçerli bir e-posta adresi girin.'); return; }
  if(pass.length < 8){ kvShowAlert('destructive','Parola çok kısa','Parola en az 8 karakter olmalı.'); return; }
  var btn=document.querySelector('.kv-login-btn'), old=btn.innerHTML;
  setBusy(btn,true); btn.innerHTML='<span>Giriş yapılıyor…</span>';
  api('POST','/kv/auth/login',{email:email,password:pass,remember:remember,code:code||undefined}).then(function(r){
    setBusy(btn,false); btn.innerHTML=old;
    if(r.ok){
      setCsrf(r.data.csrf);
      el('kvLoginPass').value=''; if(codeEl) codeEl.value='';
      applyUser(r.data.user);
      if(r.data.user && r.data.user.is_admin){ location.href='/admin/kervea/applications'; return; }   // yöneticiler onay paneline
      kvShowAlert('success','Hoş geldiniz','Kervea paneline yönlendiriliyorsunuz.');
      setTimeout(function(){ go('panel'); loadMember(); }, 500);
    } else if(r.data && r.data.error==='two_factor_required'){
      showCodeField(); kvShowAlert('info','Doğrulama kodu gerekli','Authenticator uygulamanızdaki 6 haneli kodu girin.');
    } else if(r.status===429){
      var m=Math.ceil(((r.data&&r.data.retry_after)||60)/60);
      kvShowAlert('destructive','Giriş geçici olarak kilitlendi','Çok fazla hatalı deneme. '+m+' dakika sonra tekrar deneyin.');
    } else if(r.data && r.data.error==='unverified'){
      kvShowAlert('warning','E-posta doğrulanmadı','Hesabınızı etkinleştirmek için e-postanızdaki bağlantıdan parola belirleyin.');
    } else {
      kvShowAlert('destructive','Giriş başarısız','E-posta veya parola hatalı.');
    }
  });
};
function showCodeField(){
  if(el('kvLoginCode')) return;
  var row=document.querySelector('.kv-login-row'); if(!row) return;
  var d=document.createElement('div'); d.className='kv-float-input';
  d.innerHTML='<input type="text" id="kvLoginCode" class="kv-float-in" placeholder=" " inputmode="numeric" maxlength="6" autocomplete="one-time-code"/><label for="kvLoginCode" class="kv-float-lbl">Doğrulama kodu (2FA)</label>';
  row.parentNode.insertBefore(d,row);
  el('kvLoginCode').focus();
}
// "Parolamı unuttum"
document.addEventListener('click', function(e){
  var a=e.target.closest && e.target.closest('.kv-login-forgot'); if(!a) return;
  e.preventDefault();
  var email=(el('kvLoginEmail').value||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ kvShowAlert('info','E-posta adresinizi yazın','Parola bağlantısı için önce yukarıdaki alana e-posta adresinizi girin.'); return; }
  api('POST','/kv/auth/forgot',{email:email}).then(function(r){
    if(r.status===429){ kvShowAlert('warning','Sık talep','Kısa süre sonra tekrar deneyin.'); return; }
    kvShowAlert('success','Bağlantı gönderildi','Bu e-posta ile kayıtlı bir hesap varsa parola belirleme bağlantısı gönderildi.');
  });
}, true);
function serverLogout(){
  return api('POST','/kv/auth/logout').then(function(r){
    setCsrf(r.data && r.data.csrf);
    applyUser(null);
  });
}
window.kvLogout = function(){ serverLogout().then(function(){ if(typeof kvShowAlert==='function') kvShowAlert('info','Çıkış yapıldı','Kervea hesabınızdan güvenle çıkış yaptınız.'); go('home'); renderPositions(); }); };
window.doLogout = window.kvLogout;
// oturum canlı mı? (sekme geri gelince / 2 dk'da bir)
function pingSession(){
  if(!window.KV_USER) return;
  api('GET','/kv/auth/me').then(function(r){ if(r.ok && !r.data.user) applyUser(null); });
}
document.addEventListener('visibilitychange', function(){ if(!document.hidden) pingSession(); });
setInterval(pingSession, 120000);

// ───────────────────────── firmalar: liste / detay ─────────────────────────
window.POS = [];
window.FREE_FIRM_LIMIT = 3;
window.bumpSearchCount = function(){ return true; };       // kota artık sunucuda (maskeleme)
var KV_Q = '', KV_SEQ = 0, KV_TOTAL = 0;

function dirLabel(p){
  var t=T_();
  if(p.dir==='EXP') return t.dir_exp; if(p.dir==='IMP') return t.dir_imp;
  return t.dir_both || ((t.dir_exp||'')+' / '+(t.dir_imp||''));
}
function logoTile(p, size, radius){
  if(p.logo) return '<div style="width:'+size+'px;height:'+size+'px;border-radius:'+radius+'px;overflow:hidden;background:#fff;border:1px solid var(--line);flex:none"><img src="'+escapeHtml(p.logo)+'" alt="" style="width:100%;height:100%;object-fit:contain"/></div>';
  return secTileHTML(p.sec, size, radius);
}
function query(){
  var qs=[];
  if(DIR) qs.push('dir='+encodeURIComponent(DIR));
  if(CUR_CC && CUR_CC!=='tr') qs.push('cc='+encodeURIComponent(CUR_CC));
  if(CUR_SEC!=='' && CUR_SEC!=null) qs.push('sec='+encodeURIComponent(CUR_SEC));
  if(KV_Q) qs.push('q='+encodeURIComponent(KV_Q));
  return qs.join('&');
}
window.renderPositions = function(){
  var grid=el('posgrid'); if(!grid) return;
  var seq=++KV_SEQ;
  api('GET','/kv/firms?'+query()).then(function(r){
    if(seq!==KV_SEQ) return;
    var cnt=el('firmCnt');
    if(!r.ok){
      grid.innerHTML='<div class="empty" style="grid-column:1/-1;padding:60px;text-align:center;color:var(--faint)">'+tt('err_load','Liste yüklenemedi. Lütfen sayfayı yenileyin.')+'</div>';
      return;
    }
    var items=r.data.items||[]; POS=items; KV_TOTAL=r.data.total||0;
    if(cnt) cnt.textContent=KV_TOTAL;
    if(!items.length){ grid.innerHTML='<div class="empty" style="grid-column:1/-1;padding:60px;text-align:center;color:var(--faint)">'+tt('empty_firms','Filtrenize uyan firma bulunamadı.')+'</div>'; return; }
    var d=CI[LANG]||CI.tr, secs=SI[LANG]||SI.tr, t=T_();
    grid.innerHTML=items.map(function(p){
      var locked=!!p.locked, cn=d[p.cn_key]||p.cn_key, sec=(p.sec!=null?secs[p.sec]:'')||'', sm=getSecMeta(p.sec);
      var lockBadge = locked ? '<div class="lockbadge" title="Pro üyeler için"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg><span style="font-size:9px;font-weight:700;letter-spacing:.06em;margin-left:4px">PRO</span></div>' : '';
      var lockOverlay = locked ? ('<div class="lock-overlay" onclick="upgradeToPro()"><div class="lo-ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><h4>'+t.gate_title+'</h4><p>'+t.gate_sub+'</p><button class="lo-cta" onclick="event.stopPropagation();upgradeToPro()">'+t.gate_cta+'</button></div>') : '';
      var click = locked ? '' : 'onclick="openFirm(\''+escapeJs(p.id)+'\')"';
      var score = (p.uyum!=null) ? '<span class="mid"><span class="uyum">'+escapeHtml(p.uyum)+' '+t.match_score+'</span></span>' : '<span class="mid"></span>';
      var flag = (!locked && p.fc) ? '<img src="/flags/'+escapeHtml(p.fc)+'.svg" onerror="this.style.visibility=\'hidden\'"/>' : '';
      var meta = flag+escapeHtml(locked?'•••••••':cn)+(p.yr?' · '+escapeHtml(p.yr):'')+(locked?'':' · <span style="color:var(--verify)">● '+t.verified+'</span>');
      var secChip = (p.sec!=null) ? '<span class="sec-chip" style="background:'+sm.c+'18;color:'+sm.c+';padding:3px 9px;border-radius:100px;font-size:11.5px;font-weight:600;display:inline-flex;align-items:center;gap:5px"><span style="width:12px;height:12px;display:inline-flex">'+sm.i+'</span>'+sec+'</span>' : '';
      var yr = p.yr ? ' · <b>'+tt('fl_year','Kuruluş Yılı')+':</b> '+escapeHtml(p.yr) : '';
      var tags = (p.tags&&p.tags.length) ? '<div class="pc-tags">'+p.tags.map(function(x){return '<span class="pc-tag">'+escapeHtml(x)+'</span>';}).join('')+'</div>' : '';
      // Seçili alanlar opsiyonel: boşsa hücre yerine "—" (kart bozulmaz)
      function cell(k,v){ return '<div><div class="k">'+k+'</div><b>'+(v?escapeHtml(v):'—')+'</b></div>'; }
      return '<div class="pc'+(locked?' locked':'')+'" '+click+' style="cursor:'+(locked?'default':'pointer')+'">'+lockBadge+lockOverlay+
        '<div class="pcbar"><span>'+escapeHtml(p.code)+'</span>'+score+'<span>'+escapeHtml(p.dst)+'</span></div>'+
        '<div class="pchead">'+(locked?secTileHTML(p.sec,46,11):logoTile(p,46,11))+'<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span class="nm">'+escapeHtml(p.nm)+'</span>'+(p.dir?'<span class="side">'+dirLabel(p)+'</span>':'')+'</div><div class="meta">'+meta+'</div></div></div>'+
        '<div class="tmrow">'+secChip+yr+'</div>'+tags+
        '<div class="hsrow">'+cell('HS',p.hs)+cell('MOQ',p.moq)+cell('INCOTERM',p.inc)+cell(tt('fp_pay','Ödeme'),p.pay)+'</div></div>';
    }).join('');
  });
};
window.runSearch = function(){
  KV_Q = (el('qinput').value||'').trim();
  var q = KV_Q.toLowerCase();
  var kw = {finland:'fi',fildişi:'ci',ivory:'ci',kazak:'kz',alman:'de',germany:'de',fransa:'fr',france:'fr',italya:'it',italy:'it',japon:'jp',japan:'jp',çin:'cn',china:'cn',hind:'in',india:'in',ukrayna:'ua',ukraine:'ua',dubai:'ae',bae:'ae',brezilya:'br',brazil:'br',mısır:'eg',egypt:'eg',nijerya:'ng',nigeria:'ng'};
  for(var k in kw){ if(q.indexOf(k)>-1){ CUR_CC=kw[k]; break; } }
  if(/alıcı|almac|buyer|ithalat|import/.test(q)) DIR='IMP';
  if(/tedarik|satıcı|supplier|ihracat|export/.test(q)) DIR='EXP';
  buildCountryDD('ddCountry', CUR_CC);
  document.querySelectorAll('.qf .seg button').forEach(function(b,i){ b.classList.toggle('on',(i===0&&DIR==='EXP')||(i===1&&DIR==='IMP')); });
  renderPositions();
  if(typeof toast==='function') toast(tt('toast_search_applied','Arama uygulandı'));
};
// ana sayfa istatistikleri gerçek sayımlardan
window.computeStats = function(){ var s=window.KV_STATS||{firms:0,countries:0}; return {firms:s.firms||0,countries:s.countries||0,sectors:s.sectors||26,langs:6}; };
api('GET','/kv/stats').then(function(r){ if(r.ok){ window.KV_STATS=r.data; try{updateStats(false);}catch(e){} } });

var FIRM_CACHE = {};
window.openFirm = function(slug){
  api('GET','/kv/firms/'+encodeURIComponent(slug)).then(function(r){
    if(!r.ok){ toast(tt('toast_firm_notfound','Firma bulunamadı')); return; }
    FIRM_CACHE[slug]=r.data; CUR_FIRM=slug;
    renderFirmPage(r.data);
    openFirmModal(slug);
  });
};
function socialLink(k, v, cls){
  if(!v) return '';
  var href = /^https?:\/\//i.test(v) ? v : (k==='li'||k==='fb'||k==='yt' ? 'https://'+String(v).replace(/^\/+/,'') : (k==='ig' ? 'https://instagram.com/'+String(v).replace(/^@/,'') : (k==='x' ? 'https://x.com/'+String(v).replace(/^@/,'') : '')));
  if(!href) return '';
  var titles={li:'LinkedIn',yt:'YouTube',ig:'Instagram',fb:'Facebook',x:'X'};
  return '<a class="'+cls+' '+k+'" href="'+escapeHtml(sanitizeUrl(href))+'" target="_blank" rel="noopener noreferrer nofollow" title="'+titles[k]+'" style="display:inline-flex;align-items:center;justify-content:center">'+ICONS[k].replace('<svg','<svg width="20" height="20"')+'</a>';
}
window.renderFirmPage = function(p){
  var t=T_(), d=CI[LANG]||CI.tr, secs=SI[LANG]||SI.tr;
  var cn=d[p.cn_key]||p.cn_key, sec=(p.sec!=null?secs[p.sec]:'')||'', sm=getSecMeta(p.sec);
  var soc=p.socials||{}, c=p.contact||null;
  var cover = p.cover ? '<div class="fpcover" style="background:#0A211F url(\''+escapeHtml(p.cover)+'\') center/cover no-repeat"></div>' : '<div class="fpcover" style="background:'+sm.g+'"></div>';
  var logo = p.logo ? '<div class="lgbig" style="background:#fff;border-color:var(--card);padding:0;overflow:hidden"><img src="'+escapeHtml(p.logo)+'" alt="" style="width:100%;height:100%;object-fit:contain"/></div>' : '<div class="lgbig" style="background:'+sm.g+';color:#fff;border-color:var(--card);position:relative;padding:0"><div style="width:60%;height:60%;color:#fff">'+sm.i+'</div></div>';
  var pills = '<span class="pill vf">● '+t.verified+'</span>'+(p.dir?'<span class="pill '+(p.dir==='IMP'?'imp':'exp')+'">'+dirLabel(p)+'</span>':'')+(p.sec!=null?'<span class="pill" style="background:'+sm.c+'22;color:'+sm.c+';display:inline-flex;align-items:center;gap:5px"><span style="width:12px;height:12px;display:inline-flex">'+sm.i+'</span>'+sec+'</span>':'');
  var actions = ['li','yt','ig','fb','x'].map(function(k){ return socialLink(k,soc[k],'ic'); }).join('') + ((c&&c.web)?'<a class="ic web" href="'+escapeHtml(sanitizeUrl(c.web))+'" target="_blank" rel="noopener noreferrer nofollow" title="Web"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></a>':'');
  var tags = (p.tags&&p.tags.length)?'<div class="fptags">'+p.tags.map(function(x){return '<span class="tg">'+escapeHtml(x)+'</span>';}).join('')+'</div>':'';
  var gal = (p.photos&&p.photos.length) ? '<div class="fpblock"><h3>'+t.fp_gallery+'</h3><div class="fpgal">'+p.photos.map(function(u){return '<div class="g"><img src="'+escapeHtml(u)+'" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:10px"/></div>';}).join('')+'</div></div>' : '';
  function row(k,v){ return v?'<tr><td>'+k+'</td><td>'+escapeHtml(v)+'</td></tr>':''; }
  var trade = row(t.fp_sector,sec)+row(t.fp_hs,p.hs)+row(t.fp_moq,p.moq)+row('INCOTERM',p.inc)+row(t.fp_pay,p.pay)+(p.dir?'<tr><td>'+t.fp_dir+'</td><td>'+dirLabel(p)+'</td></tr>':'')+row(t.fp_cert,p.certs);
  var tradeBlock = trade ? '<div class="fpblock"><h3>'+t.fp_trade+'</h3><table class="fptable">'+trade+'</table></div>' : '';
  var rep = (p.tem) ? '<div class="fpblock"><h3>'+(t.fp_rep||'Yetkili')+'</h3><div style="display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:50%;background:'+sm.g+';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">'+escapeHtml(initials(p.tem))+'</div><div><b>'+escapeHtml(p.tem)+'</b>'+(p.temtitle?'<div style="color:var(--faint);font-size:13px">'+escapeHtml(p.temtitle)+'</div>':'')+'</div></div></div>' : '';

  var contact;
  if(c){
    var wa = c.wa ? '<a class="btn fpwa" href="https://wa.me/'+String(c.wa).replace(/[^\d]/g,'')+'" target="_blank" rel="noopener noreferrer">'+ICONS.wa.replace('<svg','<svg width="15" height="15"')+' WhatsApp</a>' : '';
    contact = (wa?'<div class="fpcta">'+wa+'</div>':'')+'<table class="fptable">'+row(t.fp_rep,p.tem)+row(t.fp_email,c.email)+row(t.fp_phone,c.phone)+row(t.fl_address?t.fl_address.toUpperCase():'ADRES',c.addr)+'</table>';
  } else if(p.contact_consent===false){
    contact = '<p style="color:var(--faint);font-size:13.5px;margin:6px 0 0">'+tt('fp_no_consent','Bu firma iletişim bilgilerini paylaşmamayı tercih etti.')+'</p>';
  } else {
    var isGuest=!window.KV_USER;
    contact = '<div class="contact-lock"><div class="locked-inner"><table class="fptable"><tr><td>'+t.fp_rep+'</td><td>'+escapeHtml(p.tem||'—')+'</td></tr><tr><td>'+t.fp_email+'</td><td>••••••@•••••.•••</td></tr><tr><td>'+t.fp_phone+'</td><td>+•• ••• ••• ••</td></tr></table></div>'+
      '<div class="lock-veil" role="button" tabindex="0" onclick="'+(isGuest?'go(\'login\')':'revealContact(\''+escapeJs(p.id)+'\')')+'"><div class="lock-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>'+
      '<div class="lock-title">'+(t.lock_title||'İletişim bilgileri Pro üyelere açık')+'</div><div class="lock-sub">'+(t.lock_sub||'Telefon, e-posta ve web sitesi Pro üyelere açılır.')+'</div>'+
      '<button class="lock-cta" onclick="event.stopPropagation();'+(isGuest?'go(\'login\')':(isPro()?'revealContact(\''+escapeJs(p.id)+'\')':'upgradeToPro()'))+'">'+(isGuest?(t.nav_login||'Giriş')+' →':(isPro()?(t.fp_reveal||'Bilgileri göster')+' →':(t.lock_cta||"Pro'a Yükselt")+' →'))+'</button></div></div>';
  }
  var socials = ['li','yt','ig','fb','x'].map(function(k){ return socialLink(k,soc[k],'sbtn'); }).join('');
  var years = p.yr ? (new Date().getFullYear()-p.yr) : null;
  el('fpgContent').innerHTML = cover+
   '<div class="fphead">'+logo+'<div class="toprow">'+pills+(p.uyum!=null?'<span class="pill" style="background:var(--emer);color:#fff">'+escapeHtml(p.uyum)+' '+t.match_score+'</span>':'')+'</div>'+
   '<div class="fpname"><div><h1>'+escapeHtml(p.nm)+'</h1><div class="taxln"><img src="/flags/'+escapeHtml(p.fc)+'.svg" alt="'+escapeHtml(String(p.fc).toUpperCase())+'"/><span>'+escapeHtml(cn)+(p.city?' · '+escapeHtml(p.city):'')+'</span>'+(p.yr?'· <span>'+t.since+' '+escapeHtml(p.yr)+'</span>':'')+'· <span class="v">'+t.verified+'</span></div>'+(actions?'<div class="fpactions">'+actions+'</div>':'')+'</div></div></div>'+
   '<div class="fpgridmain"><div>'+
    '<div class="fpblock"><h3>'+t.fp_about+'</h3><p style="white-space:pre-line">'+escapeHtml(p.desc||'')+'</p>'+tags+'</div>'+gal+tradeBlock+'</div>'+
   '<aside class="fpaside"><div class="fpblock"><h3>'+t.fp_contact+'</h3>'+contact+'</div>'+rep+
   (socials?'<div class="fpblock"><h3>'+(t.sec_social_sh||'Sosyal medya')+'</h3><div class="fpsocials">'+socials+'</div></div>':'')+
   (years!=null?'<div class="fpblock"><h3>'+t.fp_stats+'</h3><div class="fpstat"><div class="s"><div class="n">'+years+'</div><div class="l">'+t.fp_years+'</div></div></div></div>':'')+
   '</aside></div>';
  if(window.gsap){ gsap.utils.toArray('#fpgContent .fpblock').forEach(function(b,i){ gsap.fromTo(b,{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.45,delay:.1+i*.06,ease:'expo.out',clearProps:'transform,opacity'}); }); }
};
window.revealContact = function(slug){
  api('POST','/kv/firms/'+encodeURIComponent(slug)+'/reveal').then(function(r){
    if(r.ok && r.data.contact){ var p=FIRM_CACHE[slug]; if(p){ p.contact=r.data.contact; p.contact_locked=false; renderFirmPage(p); } return; }
    var e=(r.data||{}).error;
    if(e==='pro_required') upgradeToPro();
    else if(e==='no_consent') kvShowAlert('info','Paylaşım kapalı','Bu firma iletişim bilgilerini paylaşmamayı tercih etti.');
    else if(e==='quota' || r.status===429) kvShowAlert('warning','Günlük limit doldu','Bugün için iletişim bilgisi görüntüleme limitine ulaştınız. Yarın tekrar deneyin.');
    else alertErr('İşlem yapılamadı', r);
  });
};
window.upgradeToPro = function(){
  try{ closeM('gate'); }catch(e){}
  if(!window.KV_USER){ go('login'); if(typeof toast==='function') toast('Premium için önce giriş yapın'); return; }
  go('pricing'); try{ openM('pay'); }catch(e){}
};
window.startMsg = function(){ /* Kervea pazaryeri değildir: platform içi taraflar-arası mesajlaşma yok */ };

// ───────────────────────── "Firmanı Ekle" gönderimi ─────────────────────────
function F(name){ return document.querySelector('#add [data-f="'+name+'"]'); }
function fv(name){ var e=F(name); return e? (e.value||'').trim() : ''; }
function wordCount(s){ var m=String(s||'').trim().match(/\S+/g); return m?m.length:0; }
var ADD_FILES = { logo:null, cover:null, photos:[] };
document.addEventListener('change', function(e){
  var i=e.target; if(!i || i.type!=='file') return;
  if(i.id==='addLogoFile') ADD_FILES.logo=i.files[0]||null;
  if(i.id==='addCoverFile') ADD_FILES.cover=i.files[0]||null;
  if(i.id==='addGalFile'){ ADD_FILES.photos=Array.prototype.slice.call(i.files||[],0,5); if((i.files||[]).length>5) toast('En fazla 5 fotoğraf yüklenebilir; ilk 5 seçildi.'); }
});
// açıklama kelime sayacı (250–300)
document.addEventListener('input', function(e){
  var i=e.target; if(!i || i.getAttribute('data-f')!=='description') return;
  var n=wordCount(i.value), box=el('kvWordCnt');
  if(!box){ box=document.createElement('div'); box.id='kvWordCnt'; box.style.cssText='font-size:12.5px;margin:4px 0 10px;font-weight:600'; i.parentNode.insertBefore(box,i.nextSibling); }
  var ok=n>=250&&n<=300; box.style.color=ok?'var(--verify)':'var(--faint)'; box.textContent=n+' / 250–300 '+tt('words','kelime');
});
function addValue(name){ var e=F(name); return e? e.value : ''; }
window.submitAddCompany = function(){
  var btn=el('kvConsentContinue');
  var wc=wordCount(addValue('description'));
  var missing=[];
  [['name','Firma adı'],['tax_id','Vergi no'],['founded_year','Kuruluş yılı'],['email','E-posta'],['phone','Telefon'],['rep_name','Yetkili adı']].forEach(function(f){ if(!fv(f[0])) missing.push(f[1]); });
  var ccBox=el('ddAddCountry'), ccBtn=ccBox&&ccBox.querySelector('.ddbtn .cc');
  var cc=(ccBox&&ccBox.getAttribute('data-cc'))||(ccBtn?ccBtn.textContent.trim().toLowerCase():'');
  if(!cc) missing.push('Ülke');
  if(!ADD_FILES.logo) missing.push('Logo');
  var docs=F('documents'); if(!docs || !docs.files.length) missing.push('Belgeler');
  if(missing.length){ kvShowAlert('destructive','Eksik alanlar', missing.join(', ')+' zorunludur.'); return; }
  if(wc<250||wc>300){ kvShowAlert('destructive','Firma açıklaması','Açıklama 250–300 kelime olmalı (şu an '+wc+').'); stp(2); return; }
  var fd=new FormData();
  ['name','name_en','tax_id','mersis','founded_year','employees','website','kep','email','phone','rep_name','rep_title','rep_email','address','direction','hs_codes','moq','incoterm','payment_terms','products','certificates'].forEach(function(k){ var v=fv(k); if(v) fd.append(k,v); });
  fd.append('description', addValue('description').trim());
  fd.append('country', cc);
  var cityBox=el('ddAddCity'), city='';
  if(cityBox){ var ci=cityBox.querySelector('.cityinput'); city = ci ? ci.value.trim() : (cityBox.getAttribute('data-city') || ((cityBox.querySelector('.lbl2')||{}).textContent||'')); }
  if(city) fd.append('city',city);
  fd.append('sector', fv('sector'));
  ['wa','li','ig','fb','x','yt'].forEach(function(k){ var v=fv('social_'+k); if(v) fd.append('social['+k+']',v); });
  fd.append('logo', ADD_FILES.logo);
  if(ADD_FILES.cover) fd.append('cover', ADD_FILES.cover);
  ADD_FILES.photos.forEach(function(f){ fd.append('photos[]',f); });
  Array.prototype.forEach.call(docs.files,function(f){ fd.append('documents[]',f); });
  var C={kvkk:'cx1',terms:'cx2',verification:'cx3',marketing:'cx4',contact_visibility:'cx5',cross_border:'cx6'};
  Object.keys(C).forEach(function(k){ var b=el(C[k]); fd.append('consents['+k+']', b&&b.checked?'1':'0'); });
  setBusy(btn,true);
  api('POST','/kv/applications',fd).then(function(r){
    setBusy(btn,false);
    if(r.ok){
      kvShowAlert('success','Başvurunuz alındı','Belgeleriniz incelenecek; sonuç e-posta adresinize bildirilecek.');
      kvResetConsents && kvResetConsents();
      document.querySelectorAll('#add [data-f]').forEach(function(i){ if(i.type!=='file') i.value=''; else i.value=''; });
      ADD_FILES={logo:null,cover:null,photos:[]};
      setTimeout(function(){ go('home'); }, 1200);
    } else if(r.status===429){
      kvShowAlert('warning','Çok sık deneme','Kısa süre içinde çok fazla başvuru gönderildi. Lütfen daha sonra deneyin.');
    } else {
      alertErr('Başvuru gönderilemedi', r);
    }
  });
};
// Yayınla (6. adım) artık gerçekten gönderir
var _stp=window.stp;
window.stp=function(n){ if(n===0 && typeof CS!=='undefined' && CS>=6){ var b=el('kvConsentContinue'); if(b && b.disabled){ kvShowAlert('destructive','Zorunlu onaylar eksik','Devam etmeden önce 5. adımdaki zorunlu onayları işaretleyin.'); return stp(5); } return window.submitAddCompany(); } return _stp.apply(this,arguments); };
// Dil değişince ülke seçimi sıfırlanmasın
var _bcd=window.buildCountryDD;
window.buildCountryDD=function(id,selected){
  if(id==='ddAddCountry'){ var cur=el(id); var keep=cur&&cur.getAttribute('data-cc'); if(keep) selected=keep; }
  _bcd(id,selected);
  if(id==='ddAddCountry'){ var c2=el(id); if(c2) c2.setAttribute('data-cc',selected); }
};

// ───────────────────────── iletişim formu ─────────────────────────
(function(){
  var sec=document.querySelector('#contact .form'); if(!sec) return;
  var inputs=sec.querySelectorAll('input,textarea'); var map=['name','email','subject','message'];
  inputs.forEach(function(i,k){ if(map[k]) i.setAttribute('data-c',map[k]); });
  var hp=document.createElement('input'); hp.type='text'; hp.name='website'; hp.tabIndex=-1; hp.autocomplete='off'; hp.setAttribute('aria-hidden','true'); hp.style.cssText='position:absolute;left:-9999px;opacity:0;height:0;width:0'; hp.setAttribute('data-c','website'); sec.appendChild(hp);
  var btn=sec.querySelector('button.btn'); if(!btn) return;
  btn.removeAttribute('onclick');
  btn.addEventListener('click', function(){
    var b={}; sec.querySelectorAll('[data-c]').forEach(function(i){ b[i.getAttribute('data-c')]=(i.value||'').trim(); });
    if(!b.name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email||'')||!b.message||b.message.length<5){ kvShowAlert('destructive','Eksik bilgi','Ad, geçerli bir e-posta ve mesaj zorunludur.'); return; }
    setBusy(btn,true);
    api('POST','/kv/contact',b).then(function(r){
      setBusy(btn,false);
      if(r.ok){ sec.querySelectorAll('[data-c]').forEach(function(i){ i.value=''; }); toast((T_().toast_msg_sent)||'Mesajınız iletildi'); }
      else if(r.status===429){ kvShowAlert('warning','Sık gönderim','Kısa süre içinde çok fazla mesaj gönderdiniz.'); }
      else alertErr('Mesaj gönderilemedi', r);
    });
  });
})();

// ───────────────────────── promosyon + ödeme ─────────────────────────
var PROMO = { code:'', valid:false, discount:0, total:null };
function fmtUsd(cents){ return '$'+(cents/100).toFixed(2); }
function checkPromo(code, cb){
  code=(code||'').trim();
  if(!code){ cb(null); return; }
  api('POST','/kv/promo/check',{code:code}).then(function(r){ cb(r.ok&&r.data.valid?r.data:false); });
}
window.applyPromo = function(id){
  var inp=el(id); if(!inp) return; var code=inp.value.trim().toUpperCase();
  checkPromo(code,function(d){
    if(d){ PROMO={code:code,valid:true,discount:d.discount_cents,total:d.total_cents}; inp.style.borderColor='var(--verify)'; toast(code+' · '+(d.type==='percent'?'%'+d.value:fmtUsd(d.value))+' indirim uygulandı ✓'); }
    else if(code){ PROMO={code:'',valid:false,discount:0,total:null}; inp.style.borderColor='#d97757'; toast(tt('toast_invalid_promo','Geçersiz promosyon kodu')); }
  });
};
window.applyKvPromo = function(){
  var inp=el('kvPayPromo'); var code=(inp.value||'').trim().toUpperCase();
  checkPromo(code,function(d){
    var discRow=el('kvPayDiscRow'), discEl=el('kvPayDisc'), totalEl=el('kvPayTotal'), cta=document.querySelector('.kv-pay-cta-txt');
    if(d){
      PROMO={code:code,valid:true,discount:d.discount_cents,total:d.total_cents};
      discRow.style.display='flex'; discEl.textContent='−'+fmtUsd(d.discount_cents); totalEl.textContent=fmtUsd(d.total_cents);
      if(cta) cta.innerHTML=((T_().pay_confirm)||'Ödemeyi Onayla — ')+'<b>'+fmtUsd(d.total_cents)+'</b>';
      toast(code+' uygulandı');
    } else if(code){ kvShowAlert('destructive','Geçersiz promosyon kodu',code+' kodu geçersiz, süresi dolmuş veya kullanım limiti dolmuş.'); }
  });
};
window.kvConfirmPayment = function(){
  if(!window.KV_USER){ closeM('pay'); go('login'); return; }
  var btn=el('kvPayConfirmBtn'); setBusy(btn,true);
  api('POST','/kv/orders',{promo:PROMO.valid?PROMO.code:undefined}).then(function(r){
    setBusy(btn,false);
    if(!r.ok){
      var e=(r.data||{}).error;
      if(e==='no_company') kvShowAlert('warning','Onaylı firma gerekli','Premium için önce firma başvurunuzun onaylanması gerekir.');
      else if(e==='invalid_promo') kvShowAlert('destructive','Promosyon kodu geçersiz','Kod artık kullanılamıyor.');
      else alertErr('Ödeme başlatılamadı', r);
      return;
    }
    if(r.data.redirect){ location.href=r.data.redirect; return; }       // Stripe barındırılan ödeme sayfası
    closeM('pay');
    if(r.data.paid){ kvShowAlert('success','Premium aktif','Üyeliğiniz etkinleştirildi.'); pingSession(); loadMember(); return; }
    kvShowAlert('info','Siparişiniz alındı','Sipariş #'+r.data.order+' oluşturuldu. Ödeme bilgileri e-postanızla paylaşılacak; ödeme onaylanınca Premium otomatik açılır.');
  });
};
// Kart verisi bu sayfada toplanmaz (PCI): kart alanlarını gizle, ödeme sağlayıcının sayfasında alınır.
(function(){
  var ids=['kvCcNumber','kvCcHolder','kvCcExp','kvCcCvc'];
  ids.forEach(function(id){ var i=el(id); if(!i) return; var wrap=i.closest('.kv-float-input,.kv-pay-field,.kv-field,div'); if(wrap) wrap.style.display='none'; i.removeAttribute('required'); });
  var prev=document.querySelector('.kv-card-preview,.kv-cc-preview'); if(prev) prev.style.display='none';
  var note=document.createElement('p'); note.style.cssText='font-size:13px;color:var(--faint);margin:10px 0'; note.textContent=tt('pay_hosted','Kart bilgileri bu sayfada alınmaz; güvenli ödeme sayfasına yönlendirileceksiniz.');
  var host=el('kvCcNumber'); if(host){ var form=host.closest('form')||host.closest('.kv-pay-form')||host.parentElement.parentElement; if(form) form.insertBefore(note,form.firstChild); }
})();

// ───────────────────────── üye paneli (gerçek veri) ─────────────────────────
var ME=null;
function loadMember(){
  if(!window.KV_USER) return;
  api('GET','/kv/me').then(function(r){ if(!r.ok) return; ME=r.data; fillPanel(); });
}
window.loadMember=loadMember;
var fillPanel=function(){
  if(!ME) return;
  var co=ME.company, raw=co&&co.raw||{};
  var P=document.querySelectorAll('#dp-profile input[type=text], #dp-profile input:not([type]), #dp-profile input[type=email], #dp-profile input[type=number], #dp-profile select, #dp-profile textarea');
  // alanları sırasıyla etiketle (panel işaretlemesi sabit sıradadır)
  var order=['name','name_en','tax_id','mersis','founded_year','employees','city','kep','website','email','phone','rep_name','rep_title','address','sector','direction','incoterm','payment_terms','description','hs_codes','moq','certificates','social_wa','social_li','social_ig','social_fb','social_x','social_yt'];
  var k=0; P.forEach(function(i){ if(i.type==='file'||i.type==='checkbox') return; if(order[k]) i.setAttribute('data-pf',order[k]); k++; });
  document.querySelectorAll('#dp-profile [data-pf]').forEach(function(i){
    var f=i.getAttribute('data-pf'), v='';
    if(/^social_/.test(f)) v=(raw.social||{})[f.slice(7)]||'';
    else if(f==='sector') v=(co&&co.sec!=null)?String(co.sec):'';
    else v=raw[f]==null?'':raw[f];
    if(i.tagName==='SELECT'){ for(var o=0;o<i.options.length;o++){ if((i.options[o].value||i.options[o].text)==v){ i.selectedIndex=o; break; } } }
    else i.value=v;
    if(f==='tax_id'||f==='mersis'){ i.readOnly=true; i.title='Kimlik numarası değişikliği için destek ile iletişime geçin'; i.style.opacity='.7'; }
  });
  try{ renderProfSecChip(); }catch(e){}
  fillSettings();
}
function saveProfile(){
  var b={social:{}};
  document.querySelectorAll('#dp-profile [data-pf]').forEach(function(i){
    var f=i.getAttribute('data-pf'); if(f==='tax_id'||f==='mersis') return;
    var v=(i.value||'').trim();
    if(/^social_/.test(f)) b.social[f.slice(7)]=v; else if(v!=='') b[f]=v;
  });
  if(b.founded_year) b.founded_year=parseInt(b.founded_year,10);
  if(b.sector!==undefined) b.sector=parseInt(b.sector,10);
  api('PUT','/kv/me/company',b).then(function(r){ if(r.ok){ toast(tt('toast_profile_updated','Profil güncellendi')); loadMember(); } else alertErr('Profil kaydedilemedi', r); });
}
document.addEventListener('click', function(e){
  var b=e.target.closest && e.target.closest('#dp-profile button[onclick*="toast("]'); if(!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); saveProfile();
}, true);

// Ayarlar: gerçek tercihler (KVKK geri alma, 2FA, veri indirme, hesap silme)
function fillSettings(){
  var host=el('dp-settings'); if(!host || !ME) return;
  var card=host.querySelector('.dcard'); if(!card || card.getAttribute('data-kv')==='1') { refreshSettingsState(); return; }
  card.setAttribute('data-kv','1');
  card.innerHTML =
   '<h3>Güvenlik</h3><p class="card-sub">Hesabınızı koruyan katmanlar.</p>'+
   '<div class="tglrow"><div class="l"><b>İki Faktörlü Kimlik Doğrulama (2FA)</b><span>Authenticator uygulaması ile giriş kodu</span></div><label class="tgl"><input type="checkbox" id="kvSet2fa"/><span class="slider"></span></label></div>'+
   '<div id="kv2faBox" style="display:none;margin:8px 0 16px;padding:14px;border:1px solid var(--line);border-radius:12px"></div>'+
   '<h3 style="margin-top:24px">İzinler ve Bildirimler (KVKK)</h3><p class="card-sub">Verdiğiniz izinleri istediğiniz zaman geri alabilirsiniz; her değişiklik kayıt altına alınır.</p>'+
   '<div class="tglrow"><div class="l"><b>İletişim bilgilerimin gösterilmesi</b><span>E-posta/telefon yalnızca Pro üyelere gösterilir. Kapatırsanız kimseye gösterilmez.</span></div><label class="tgl"><input type="checkbox" id="kvSetVis"/><span class="slider"></span></label></div>'+
   '<div class="tglrow"><div class="l"><b>E-posta bildirimleri</b><span>Sektörünüze yeni firma katıldığında ve platform duyurularında e-posta (ticari elektronik ileti)</span></div><label class="tgl"><input type="checkbox" id="kvSetMkt"/><span class="slider"></span></label></div>'+
   '<h3 style="margin-top:24px">KVKK / GDPR — Veri Hakları</h3><p class="card-sub">Verileriniz KVKK ve GDPR standartlarında saklanır.</p>'+
   '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">'+
    '<button class="btn sec sm" id="kvSetExport">Verilerimi İndir (JSON)</button>'+
    '<button class="btn sec sm" onclick="openM(\'kvkk\')">Aydınlatma Metni</button>'+
    '<button class="btn sec sm" onclick="openM(\'cookie\')">Gizlilik / Çerez Politikası</button>'+
    '<button class="btn sec sm" onclick="openM(\'sozl\')">Üyelik Sözleşmesi</button>'+
    '<button class="btn sm" id="kvSetDelete" style="background:#fff3f0;border-color:#ffcdc0;color:#c33">Hesabı Sil</button></div>';
  el('kvSetVis').addEventListener('change',function(){ setConsent('contact_visibility',this.checked,this); });
  el('kvSetMkt').addEventListener('change',function(){ setConsent('marketing',this.checked,this); });
  el('kvSet2fa').addEventListener('change',function(){ this.checked ? start2fa(this) : disable2fa(this); });
  el('kvSetExport').addEventListener('click',function(){ window.open('/kv/me/export','_blank','noopener'); });
  el('kvSetDelete').addEventListener('click',deleteAccount);
  refreshSettingsState();
}
function refreshSettingsState(){
  if(!ME||!el('kvSetVis')) return;
  el('kvSetVis').checked=!!(ME.consents&&ME.consents.contact_visibility);
  el('kvSetMkt').checked=!!(ME.consents&&ME.consents.marketing);
  el('kvSet2fa').checked=!!(ME.user&&ME.user.two_factor);
}
function setConsent(type,granted,box){
  api('POST','/kv/me/consents',{type:type,granted:granted}).then(function(r){
    if(r.ok){ ME.consents[type]=granted; toast(granted?'İzin kaydedildi':'İzin geri alındı'); }
    else { box.checked=!granted; alertErr('İzin güncellenemedi',r); }
  });
}
function start2fa(box){
  api('POST','/kv/auth/2fa/start').then(function(r){
    if(!r.ok){ box.checked=false; alertErr('2FA başlatılamadı',r); return; }
    var b=el('kv2faBox'); b.style.display='block';
    b.innerHTML='<p style="margin:0 0 8px;font-size:13.5px">Authenticator uygulamanıza şu anahtarı ekleyin (veya <a href="'+escapeHtml(r.data.uri)+'">buraya tıklayın</a>):</p><code style="display:block;padding:8px 10px;background:var(--chip);border-radius:8px;font-size:14px;letter-spacing:.08em;word-break:break-all">'+escapeHtml(r.data.secret)+'</code><div style="display:flex;gap:8px;margin-top:10px"><input id="kv2faCode" inputmode="numeric" maxlength="6" placeholder="6 haneli kod" style="flex:1"/><button class="btn sm" id="kv2faOk">Doğrula</button></div>';
    el('kv2faOk').addEventListener('click',function(){
      api('POST','/kv/auth/2fa/confirm',{code:el('kv2faCode').value}).then(function(r2){
        if(r2.ok){ b.style.display='none'; ME.user.two_factor=true; toast('2FA etkinleştirildi'); } else alertErr('Kod hatalı',r2);
      });
    });
  });
}
function disable2fa(box){
  var pw=prompt('2FA\'yı kapatmak için parolanızı girin:');
  if(!pw){ box.checked=true; return; }
  api('POST','/kv/auth/2fa/disable',{password:pw}).then(function(r){
    if(r.ok){ ME.user.two_factor=false; el('kv2faBox').style.display='none'; toast('2FA kapatıldı'); } else { box.checked=true; alertErr('Parola hatalı',r); }
  });
}
function deleteAccount(){
  if(!confirm(tt('confirm_delete_account','Hesabınız ve tüm verileriniz kalıcı olarak silinecek. Emin misiniz?'))) return;
  var pw=prompt('Onaylamak için parolanızı girin:'); if(!pw) return;
  api('DELETE','/kv/me',{password:pw}).then(function(r){
    if(r.ok){ applyUser(null); kvShowAlert('info','Hesap silindi','Verileriniz silindi.'); go('home'); } else alertErr('Hesap silinemedi',r,'Parola hatalı.');
  });
}
var _showPanel=window.showPanel;
window.showPanel=function(sec,btn){ _showPanel(sec,btn); if(sec==='profile'||sec==='settings') loadMember(); };


// ───────────────────────── panel: gerçek veri olmayan bölümler gizlenir ─────────────────────────
// Mesajlaşma/analitik/ekip/kişi rehberi için gerçek veri kaynağı yok (ve Kervea pazaryeri/veri simsarı değildir):
// sahte içerik göstermek yerine bu sekmeler kapalı tutulur.
(function(){
  var hide=['messages','analytics','team','activity','prospect','people'], css='';
  hide.forEach(function(k){ css+='.dmenu a[onclick*="showPanel(\''+k+'\'"]{display:none!important}#dp-'+k+'{display:none!important}'; });
  var st=document.createElement('style'); st.id='kv-hide-mock'; st.textContent=css; document.head.appendChild(st);
})();
window.kvExportData = function(){ window.open('/kv/me/export','_blank','noopener'); };

function fillOverview(){
  if(!ME) return;
  var co=ME.company, u=ME.user||{};
  var nm=el('ovUserName'); if(nm) nm.textContent=u.name||'';
  var b=el('ovVerifyBadge');
  if(b){
    var st=co&&co.status;
    var map={approved:['ov-badge-ok','Firma doğrulandı'],pending:['ov-badge-warn','Başvurunuz inceleniyor — sonuç e-posta ile bildirilecek'],rejected:['ov-badge-warn','Başvurunuz onaylanmadı — e-postanızı kontrol edin'],suspended:['ov-badge-warn','Hesap askıda — destek ile iletişime geçin']};
    var m=map[st]||map.pending;
    b.className='ov-badge '+m[0]; b.innerHTML='<span>'+m[1]+'</span>';
  }
  var vals=document.querySelectorAll('#dp-overview .ov-stat-card');
  if(vals[3]){
    var v=vals[3].querySelector('.ov-stat-val'), s=vals[3].querySelector('.ov-stat-sub');
    var ok=co&&co.status==='approved';
    if(v){ v.removeAttribute('data-i18n'); v.textContent=ok?'Doğrulandı':'Beklemede'; }
    if(s){ s.removeAttribute('data-i18n'); s.textContent=ok?'Belgeler Kervea ekibince incelendi':'Belgeler inceleniyor'; }
  }
  api('GET','/kv/matches').then(function(r){
    if(!r.ok) return;
    var n=(r.data.items||[]).length;
    if(vals[0]){ var vv=vals[0].querySelector('.ov-stat-val'), ss=vals[0].querySelector('.ov-stat-sub'); if(vv) vv.textContent=n||'—'; if(ss){ ss.removeAttribute('data-i18n'); ss.textContent=n?'Sektör ve ürün kriterlerinize göre':'Doğrulama sonrası listelenir'; } }
    var empty=document.querySelector('#dp-overview .ov-portfolio-empty');
    if(empty && n){
      var d=CI[LANG]||CI.tr;
      empty.className='ov-portfolio-list';
      empty.innerHTML=r.data.items.slice(0,3).map(function(p){
        var ico = p.locked?secTileHTML(p.sec,40,10):logoTile(p,40,10);
        return '<div style="display:flex;align-items:center;gap:12px;padding:12px 4px;border-bottom:1px solid var(--line);cursor:'+(p.locked?'default':'pointer')+'" '+(p.locked?'':'onclick="openFirm(\''+escapeJs(p.id)+'\')"')+'>'+ico+
          '<div style="flex:1;min-width:0"><b>'+escapeHtml(p.nm)+'</b><div style="color:var(--faint);font-size:13px">'+escapeHtml(p.locked?'•••••':(d[p.cn_key]||p.cn_key))+'</div></div>'+
          '<span class="pill" style="background:var(--emer);color:#fff">'+escapeHtml(p.uyum)+' '+T_().match_score+'</span></div>';
      }).join('');
    }
  });
}
function fillDocs(){
  var host=el('dp-docs'); if(!host||!ME) return;
  var grid=host.querySelector('.doc-grid'); if(!grid) return;
  var ok=ME.company&&ME.company.status==='approved';
  var ICO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
  var cards=(ME.documents||[]).map(function(d){
    var kind=/pdf/.test(d.mime)?'pdf':'img';
    return '<div class="doc-c '+kind+'"><div class="d-ic">'+ICO+'</div><h4 style="word-break:break-word">'+escapeHtml(d.name)+'</h4><div class="d-sub">'+escapeHtml(String(d.mime).replace('application/','').replace('image/','').toUpperCase())+'</div><span class="d-st '+(ok?'ok':'wn')+'">'+(ok?'İncelendi':'İnceleniyor')+'</span><div class="d-meta"><span>'+Math.max(1,Math.round(d.size/1024))+' KB</span><span>'+escapeHtml(d.at)+'</span></div></div>';
  }).join('');
  grid.innerHTML = cards + '<div class="doc-add" id="kvDocAdd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><b style="color:var(--body);display:block;margin-bottom:2px">Yeni belge ekle</b><span style="font-size:11px">PDF, PNG, JPG · max 10 MB</span></div>';
  var pick=function(){ var f=el('kvDocFile'); if(!f){ f=document.createElement('input'); f.type='file'; f.id='kvDocFile'; f.multiple=true; f.accept='application/pdf,image/jpeg,image/png,image/webp'; f.style.display='none'; f.setAttribute('data-kvdoc','1'); document.body.appendChild(f); f.addEventListener('change',uploadDocs); } f.click(); };
  el('kvDocAdd').addEventListener('click',pick);
  var btn=host.querySelector('.btn'); if(btn && !btn.getAttribute('data-kv')){ btn.setAttribute('data-kv','1'); btn.addEventListener('click',pick); }
}
function uploadDocs(e){
  var f=e.target.files; if(!f||!f.length) return;
  var fd=new FormData(); Array.prototype.forEach.call(f,function(x){ fd.append('documents[]',x); });
  api('POST','/kv/me/documents',fd).then(function(r){ e.target.value=''; if(r.ok){ toast('Belgeler yüklendi'); loadMember(); } else alertErr('Belge yüklenemedi',r); });
}
var _fillPanel=fillPanel;
fillPanel=function(){ _fillPanel(); fillOverview(); fillDocs(); };

window.renderMatchTable = function(){
  var wrap=el('mtable-wrap'); if(!wrap || !window.KV_USER) return;
  var d=CI[LANG]||CI.tr, secs=SI[LANG]||SI.tr, t=T_();
  var q=(el('mfSearch')||{value:''}).value.toLowerCase().trim();
  var dirf=(el('mfDir')||{value:''}).value, scoref=parseInt((el('mfScore')||{value:'0'}).value)||0;
  api('GET','/kv/matches').then(function(r){
    var all=(r.ok&&r.data.items)||[];
    POS=all;
    var list=all.filter(function(p){
      if(dirf&&p.dir!==dirf) return false;
      if(scoref&&p.uyum<scoref) return false;
      if(q && !p.locked && ((p.nm+' '+(p.hs||'')+' '+(secs[p.sec]||'')+' '+(d[p.cn_key]||'')).toLowerCase().indexOf(q)===-1)) return false;
      return true;
    });
    var cnt=el('mfCount'); if(cnt) cnt.textContent=list.length;
    if(!list.length){
      var why = (r.data&&r.data.reason==='no_company') ? 'Eşleşmeler için önce firma profilinizi oluşturun.' : ((r.data&&r.data.reason==='not_approved') ? 'Başvurunuz onaylandığında eşleşmeler burada listelenir.' : tt('empty_matches','Filtrelere uyan eşleşme yok'));
      wrap.innerHTML='<div class="empty" style="padding:40px 20px;text-align:center;color:var(--faint)">'+why+'</div>'; return;
    }
    var RZ={dir_c:'Karşılıklı yön',sec:'Aynı sektör',hs:'HS kodu ortak',vf:'Doğrulanmış',veteran:'Deneyimli firma'};
    var CIRC=2*Math.PI*32;
    wrap.innerHTML='<div class="mgrid">'+list.map(function(p){
      var cls=p.uyum>=90?'hi':p.uyum>=80?'md':'lo', off=CIRC-(p.uyum/100)*CIRC, dirCls=p.dir==='IMP'?'imp':'exp';
      var reasons=(p.reasons||[]).map(function(k){ return '<span class="rz'+(k==='dir_c'?' hot':'')+'">'+RZ[k]+'</span>'; }).join('');
      var lockedCls=p.locked?' style="position:relative;filter:blur(3px);pointer-events:none;user-select:none"':'';
      return '<div class="mcard"'+lockedCls+'><div class="mring '+cls+'"><svg viewBox="0 0 76 76"><circle class="rbg" cx="38" cy="38" r="32"/><circle class="rfg" cx="38" cy="38" r="32" stroke-dasharray="'+CIRC.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/></svg><div class="rtxt"><div class="n">'+escapeHtml(p.uyum)+'</div><div class="s">Match</div></div></div>'+
       '<div class="mmid"><div class="mhead"><div style="flex:1;min-width:0;display:flex;align-items:center;gap:10px">'+(p.locked?secTileHTML(p.sec,44,10):logoTile(p,44,10))+'<div style="flex:1;min-width:0"><div class="mnm">'+escapeHtml(p.nm)+'</div><div class="msub">'+escapeHtml(p.locked?'•••••':((d[p.cn_key]||p.cn_key)+(p.yr?' · '+p.yr:'')))+(p.sec!=null?' · '+escapeHtml(secs[p.sec]||''):'')+'</div></div></div>'+(p.dir?'<span class="mdirpill '+dirCls+'">'+dirLabel(p)+'</span>':'')+'</div>'+
       '<div class="mreasons">'+reasons+'</div>'+
       '<div class="mbars"><div class="mbar"><div class="bl"><span>Ürün Uyumu</span><b>'+p.prod+'</b></div><div class="bt"><div style="width:'+p.prod+'%"></div></div></div><div class="mbar"><div class="bl"><span>Yön Uyumu</span><b>'+p.dirfit+'</b></div><div class="bt"><div style="width:'+p.dirfit+'%"></div></div></div></div></div>'+
       '<div class="mact">'+(p.locked?'<button class="btn" onclick="upgradeToPro()" style="pointer-events:auto">PRO</button>':'<button class="btn sec" onclick="openFirm(\''+escapeJs(p.id)+'\')">'+t.detail+' →</button>')+'</div></div>';
    }).join('')+'</div>';
  });
};


// ───────────────────────── Google / LinkedIn ile giriş ─────────────────────────
// Yalnızca mevcut (yönetici onaylı) üyeler girer; bu yolla hesap OLUŞMAZ. Anahtarı (.env) girilmemiş sağlayıcının düğmesi gizlenir.
(function(){
  var SOC = BOOT.social || {};
  var M = {
    tr:{
      unavailable:['Giriş yöntemi kapalı','Bu giriş yöntemi şu an etkin değil. E-posta ve parola ile giriş yapın.'],
      expired:['İşlem süresi doldu','Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.'],
      cancelled:['Giriş iptal edildi','Giriş işlemini onaylamadınız. İsterseniz tekrar deneyin.'],
      failed:['Giriş tamamlanamadı','Sağlayıcı ile bağlantı kurulamadı. Biraz sonra tekrar deneyin ya da e-posta ile giriş yapın.'],
      email_unverified:['E-posta doğrulanmamış','Bu hesabın e-posta adresi sağlayıcı tarafından doğrulanmamış. Doğrulanmış bir hesap kullanın ya da e-posta ile giriş yapın.'],
      not_member:['Bu e-posta ile üyelik bulunamadı','Bu hesabın e-posta adresiyle onaylanmış bir Kervea üyeliği yok. Üyelik, firma başvurunuz onaylandıktan sonra açılır: önce «Firmanı ekle» ile başvurun ve başvuruda yazdığınız e-posta adresine bağlı hesabla giriş yapın.'],
      admin_password:['Yönetici hesabı','Yönetici hesapları yalnızca e-posta ve parola ile giriş yapar.'],
      other_account:['Farklı hesap bağlı','Üyeliğiniz bu sağlayıcıda başka bir hesaba bağlanmış. O hesapla ya da e-posta ile giriş yapın.'],
      tfa_title:['Doğrulama kodu gerekli','Authenticator uygulamanızdaki 6 haneli kodu girin.'],
      tfa_label:'Doğrulama kodu (2FA)', tfa_btn:'Doğrula', tfa_back:'Vazgeç', tfa_bad:['Kod hatalı','Girdiğiniz kod geçersiz. Tekrar deneyin.'], tfa_lock:['Geçici olarak kilitlendi','Çok fazla hatalı deneme. Daha sonra tekrar deneyin.']
    },
    en:{
      unavailable:['Sign-in method unavailable','This sign-in method is not active right now. Please sign in with e-mail and password.'],
      expired:['Request expired','The sign-in timed out. Please try again.'],
      cancelled:['Sign-in cancelled','You did not approve the sign-in. You can try again.'],
      failed:['Sign-in could not be completed','The provider could not be reached. Please try again shortly or sign in with e-mail.'],
      email_unverified:['E-mail not verified','The e-mail address of this account is not verified by the provider. Use a verified account or sign in with e-mail.'],
      not_member:['No membership for this e-mail','There is no approved Kervea membership for this account\'s e-mail address. A membership is created once your company application is approved: apply with “Add your company” first, then sign in with the account tied to the e-mail you applied with.'],
      admin_password:['Administrator account','Administrator accounts sign in with e-mail and password only.'],
      other_account:['Different account linked','Your membership is linked to another account at this provider. Sign in with that account or with e-mail.'],
      tfa_title:['Verification code required','Enter the 6-digit code from your authenticator app.'],
      tfa_label:'Verification code (2FA)', tfa_btn:'Verify', tfa_back:'Cancel', tfa_bad:['Wrong code','The code you entered is not valid. Please try again.'], tfa_lock:['Temporarily locked','Too many failed attempts. Please try again later.']
    }
  };
  function m(k){ var d = M[LANG] || M.en; return d[k] !== undefined ? d[k] : M.en[k]; }

  window.kvSocialLogin = function(p){
    if(!SOC[p]){ var u=m('unavailable'); kvShowAlert('info',u[0],u[1]); return; }
    location.href = '/auth/' + encodeURIComponent(p) + '/redirect';
  };

  function initButtons(){
    var shown = 0;
    document.querySelectorAll('#login .kv-login-social-btn[data-social]').forEach(function(b){
      var on = !!SOC[b.getAttribute('data-social')];
      b.style.display = on ? '' : 'none';
      if(on) shown++;
    });
    var box = document.querySelector('#login .kv-login-social'), sep = document.querySelector('#login .kv-login-sep');
    if(box){ box.style.display = shown ? '' : 'none'; box.style.gridTemplateColumns = shown === 1 ? '1fr' : ''; }
    if(sep) sep.style.display = shown ? '' : 'none';
  }

  // Üyede 2FA açıksa sağlayıcıdan döndükten sonra kod istenir.
  function showTfa(){
    var body = document.querySelector('#login .kv-login-body'); if(!body || el('kvSocialTfa')) return;
    Array.prototype.forEach.call(body.children, function(c){ c.style.display = 'none'; });
    var d = document.createElement('div'); d.id = 'kvSocialTfa';
    d.innerHTML = '<div class="kv-float-input"><input type="text" id="kvSocialCode" class="kv-float-in" placeholder=" " inputmode="numeric" maxlength="6" autocomplete="one-time-code"/><label for="kvSocialCode" class="kv-float-lbl"></label></div>'
      + '<button type="button" class="btn kv-login-btn" id="kvSocialCodeBtn"></button>'
      + '<div class="kv-login-footer" style="margin-top:14px"><a href="/login" class="kv-login-signup" id="kvSocialTfaBack"></a></div>';
    body.appendChild(d);
    d.querySelector('label').textContent = m('tfa_label');
    el('kvSocialCodeBtn').textContent = m('tfa_btn');
    el('kvSocialTfaBack').textContent = m('tfa_back');
    var t = m('tfa_title'); kvShowAlert('info', t[0], t[1]);
    el('kvSocialCode').focus();
    function submit(){
      var code = el('kvSocialCode').value.trim(); if(!code) return;
      var btn = el('kvSocialCodeBtn'); setBusy(btn, true);
      api('POST', '/kv/auth/social/2fa', {code: code}).then(function(r){
        setBusy(btn, false);
        if(r.ok){
          setCsrf(r.data.csrf); applyUser(r.data.user);
          setTimeout(function(){ go('panel'); loadMember(); }, 300);
        } else if(r.status === 429){ var l = m('tfa_lock'); kvShowAlert('destructive', l[0], l[1]); setTimeout(function(){ location.href = '/login'; }, 2500); }
        else if(r.data && r.data.error === 'expired'){ var x = m('expired'); kvShowAlert('warning', x[0], x[1]); setTimeout(function(){ location.href = '/login'; }, 2000); }
        else { var b = m('tfa_bad'); kvShowAlert('destructive', b[0], b[1]); }
      });
    }
    el('kvSocialCodeBtn').addEventListener('click', submit);
    el('kvSocialCode').addEventListener('keydown', function(e){ if(e.key === 'Enter') submit(); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    initButtons();
    var mm = /[?&]social=([a-z_]+)/.exec(location.search); if(!mm) return;
    try{ history.replaceState(history.state, '', location.pathname); }catch(e){}     // adres çubuğunda kod kalmasın
    if(mm[1] === 'two_factor'){ showTfa(); return; }
    var msg = m(mm[1]);
    if(Array.isArray(msg)) setTimeout(function(){ kvShowAlert(mm[1] === 'cancelled' ? 'info' : 'warning', msg[0], msg[1]); }, 500);
  });
})();

// ───────────────────────── yeni alanların çevirileri ─────────────────────────
(function(){
  var X={
   tr:{fl_repemail:"Yetkili E-posta (şahsi)",consent_vis_t:"İletişim bilgilerimin gösterilmesi",consent_vis_d:"İletişim bilgilerimin (e-posta, telefon, web sitesi) yalnızca Pro üyelere gösterilmesine açık rızam vardır. Rızamı üye panelinden istediğim zaman geri alabilirim.",consent_xb_t:"Yurt dışı aktarım bilgilendirmesi",consent_xb_d:"Firma profilimin yurt dışındaki üyelere gösterileceğini; bu aktarımın, bulunduğu ülkenin Türkiye ile aynı koruma seviyesini sağlamayabileceği riskini anladığımı beyan ederim."},
   en:{fl_repemail:"Representative e-mail (personal)",consent_vis_t:"Showing my contact details",consent_vis_d:"I explicitly consent to my contact details (e-mail, phone, website) being shown to Pro members only. I can withdraw this consent at any time from the member panel.",consent_xb_t:"Cross-border transfer notice",consent_xb_d:"I understand that my company profile will be shown to members abroad and that the destination country may not offer the same level of data protection as Türkiye."},
   es:{fl_repemail:"Correo del representante (personal)",consent_vis_t:"Mostrar mis datos de contacto",consent_vis_d:"Doy mi consentimiento expreso para que mis datos de contacto (correo, teléfono, web) se muestren solo a miembros Pro. Puedo retirarlo en cualquier momento desde el panel.",consent_xb_t:"Aviso de transferencia internacional",consent_xb_d:"Entiendo que el perfil de mi empresa se mostrará a miembros en el extranjero y que el país de destino puede no ofrecer el mismo nivel de protección de datos que Türkiye."},
   fr:{fl_repemail:"E-mail du représentant (personnel)",consent_vis_t:"Affichage de mes coordonnées",consent_vis_d:"Je consens expressément à ce que mes coordonnées (e-mail, téléphone, site web) soient affichées uniquement aux membres Pro. Je peux retirer ce consentement à tout moment depuis l'espace membre.",consent_xb_t:"Information sur le transfert à l'étranger",consent_xb_d:"Je comprends que le profil de mon entreprise sera visible par des membres à l'étranger et que le pays de destination peut ne pas offrir le même niveau de protection des données que la Türkiye."},
   ar:{fl_repemail:"البريد الإلكتروني للمسؤول (الشخصي)",consent_vis_t:"إظهار بيانات الاتصال الخاصة بي",consent_vis_d:"أوافق صراحةً على إظهار بيانات الاتصال الخاصة بي (البريد الإلكتروني، الهاتف، الموقع) لأعضاء Pro فقط. يمكنني سحب هذه الموافقة في أي وقت من لوحة العضو.",consent_xb_t:"إشعار النقل إلى الخارج",consent_xb_d:"أدرك أن ملف شركتي سيُعرض لأعضاء في الخارج، وأن بلد الوجهة قد لا يوفر نفس مستوى حماية البيانات المتوفر في تركيا."},
   ru:{fl_repemail:"E-mail представителя (личный)",consent_vis_t:"Показ моих контактных данных",consent_vis_d:"Я явно соглашаюсь на показ моих контактных данных (e-mail, телефон, сайт) только Pro-участникам. Я могу отозвать согласие в любое время в личном кабинете.",consent_xb_t:"Уведомление о передаче за рубеж",consent_xb_d:"Я понимаю, что профиль моей компании будет показан участникам за рубежом и что страна назначения может не обеспечивать тот же уровень защиты данных, что и Турция."}
  };
  Object.keys(X).forEach(function(l){ if(!T[l]) T[l]={}; Object.assign(T[l],X[l]); });
  window.kvApplyExtraI18n=function(){
    var d=T[LANG]||T.tr; Object.keys(X.tr).forEach(function(k){ document.querySelectorAll('[data-i18n="'+k+'"]').forEach(function(n){ if(d[k]) n.innerHTML=d[k]; }); });
  };
  kvApplyExtraI18n();
  // Dil değişince yeniden uygula
  var _sl=window.setLang; window.setLang=function(l){ var r=_sl.apply(this,arguments); try{ kvApplyExtraI18n(); }catch(e){} return r; };
})();

// ───────────────────────── adresler (gerçek URL) ─────────────────────────
var PATHS={home:'/',add:'/add-company',pricing:'/pricing',about:'/about',contact:'/contact',login:'/login',panel:'/panel'};
var _go=window.go;
window.go=function(v){
  _go(v);
  try{
    var cur=document.querySelector('.view.on'); var id=cur?cur.id:v;
    if(PATHS[id] && location.pathname!==PATHS[id] && !location.hash) history.pushState({kv:id},'',PATHS[id]);
  }catch(e){}
  if(v==='panel' && window.KV_USER) loadMember();
};
window.addEventListener('popstate',function(){
  if(location.hash.indexOf('#firm-')===0) return;
  var id='home'; Object.keys(PATHS).forEach(function(k){ if(PATHS[k]===location.pathname) id=k; });
  _go(id);
});
document.addEventListener('DOMContentLoaded',function(){
  renderPositions();
  if(BOOT.view==='firm' && BOOT.firm){ api('GET','/kv/firms/'+encodeURIComponent(BOOT.firm)).then(function(r){ if(r.ok){ FIRM_CACHE[BOOT.firm]=r.data; CUR_FIRM=BOOT.firm; renderFirmPage(r.data); go('firm'); } else go('home'); }); }
  else if(BOOT.view && BOOT.view!=='home'){
    _go(BOOT.view);
    // e.g. /panel opened by a guest lands on the login view: show the matching address
    var cur=document.querySelector('.view.on'); if(cur && cur.id!==BOOT.view && PATHS[cur.id]){ try{ history.replaceState({kv:cur.id},'',PATHS[cur.id]); }catch(e){} }
  }
  if(window.KV_USER){ loadMember(); }
  if(/[?&]paid=1/.test(location.search)){ setTimeout(function(){ pingSession(); kvShowAlert('success','Ödeme alındı','Premium üyeliğiniz birkaç saniye içinde aktif olur.'); },600); }
});
})();
