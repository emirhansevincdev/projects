/* ═══════════════════════════════════════════════════════════════════════════
   KERVEA · FRONTEND (kervea-app.js + kervea-api.js'den sonra yüklenir)
   Herkese açık site: açılır menüler, bülten, küçük düzeltmeler.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

function $(id){ return document.getElementById(id); }

// ───────────────────────── açılır menüler: yerleşim, Escape, modal kilidi ─────────────────────────
// Liste ekranın altına sığmıyorsa yukarı açılır ve yüksekliği sınırlanır; kaydırma liste içinde kalır.
// Ekranın üstündeki başlığın (menü + şehir bandı) altı: açılır liste bunun altına taşmaz.
function headerBottom(){
  var b = 0;
  ['.nav', '.nav-marquee'].forEach(function(sel){
    var e = document.querySelector(sel); if(!e) return;
    var cs = getComputedStyle(e);
    if(cs.display === 'none' || cs.visibility === 'hidden') return;
    var r = e.getBoundingClientRect(); if(r.bottom > b && r.top < window.innerHeight) b = r.bottom;
  });
  return Math.max(0, b);
}
function placePanel(panel, anchor, max){
  if(!panel || !anchor) return;
  panel.classList.remove('kv-up'); panel.style.maxHeight = ''; panel.style.marginLeft = ''; panel.style.width = '';
  var r = anchor.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight, hb = headerBottom();
  var below = vh - r.bottom - 14, above = r.top - hb - 12;
  var want = Math.min(max, vh * 0.72);
  if(below >= Math.min(want, 260) || below >= above){
    panel.style.maxHeight = Math.max(160, Math.min(want, below)) + 'px';
  } else {
    panel.classList.add('kv-up');
    panel.style.maxHeight = Math.max(160, Math.min(want, above)) + 'px';
  }
  // dar ekranda panel görünür alana sığar: genişlik kısılır, taşan kısım geri çekilir (RTL'de de geçerli)
  if(vw <= 520){ panel.style.width = Math.min(panel.offsetWidth || vw, vw - 24) + 'px'; }
  var pr = panel.getBoundingClientRect(), dx = 0;
  if(pr.right > vw - 8) dx = vw - 8 - pr.right; else if(pr.left < 8) dx = 8 - pr.left;
  if(pr.width > vw - 16){ panel.style.width = (vw - 16) + 'px'; pr = panel.getBoundingClientRect(); dx = pr.right > vw - 8 ? vw - 8 - pr.right : (pr.left < 8 ? 8 - pr.left : 0); }
  if(dx) panel.style.marginLeft = Math.round(dx) + 'px';
}
var _toggleDD = window.toggleDD;
window.toggleDD = function(id){
  var r = _toggleDD.apply(this, arguments);
  var list = $(id + '-list');
  if(list && list.classList.contains('open')){
    placePanel(list, list.parentNode, 340);
    var s = list.querySelector('.ddsearch input'); if(s && !('ontouchstart' in window)) { try{ s.focus({preventScroll:true}); }catch(e){ s.focus(); } }
  }
  return r;
};
var _toggleSecPick = window.toggleSecPick;
window.toggleSecPick = function(){
  var r = _toggleSecPick.apply(this, arguments);
  var box = $('secPick');
  if(box && box.classList.contains('open')) placePanel($('secPickPanel'), box, 520);
  return r;
};
function replaceOpen(){
  document.querySelectorAll('.ddlist.open').forEach(function(l){ placePanel(l, l.parentNode, 340); });
  var box = $('secPick'); if(box && box.classList.contains('open')) placePanel($('secPickPanel'), box, 520);
}
window.addEventListener('resize', replaceOpen);
window.addEventListener('scroll', replaceOpen, { passive: true });

function closePopups(){
  var closed = false;
  document.querySelectorAll('.ddlist.open').forEach(function(l){ l.classList.remove('open'); closed = true; });
  var sp = $('secPick'); if(sp && sp.classList.contains('open')){ sp.classList.remove('open'); closed = true; }
  var um = $('kvUserMenu'); if(um && um.classList.contains('open') && typeof window.closeUserMenu === 'function'){ window.closeUserMenu(); closed = true; }
  var lm = $('lm'); if(lm && lm.classList.contains('open')){ lm.classList.remove('open'); closed = true; var b = document.querySelector('.langbtn'); if(b) b.focus(); }
  return closed;
}
document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape') return;
  if(closePopups()) return;
  var m = document.querySelector('.modal.open');
  if(m && m.id && typeof window.closeM === 'function'){
    var k = m.id.charAt(1).toLowerCase() + m.id.slice(2);
    e.preventDefault(); window.closeM(k);
  }
});
// modal açıkken sayfa arkada kaymasın
function syncModalLock(){
  var any = !!document.querySelector('.modal.open, .modal-backdrop.open, #firmModal.open, .tm-modal-back.on');
  document.documentElement.classList.toggle('kv-modal-open', any);
}
if(window.MutationObserver){
  var mo = new MutationObserver(syncModalLock);
  document.querySelectorAll('.modal, .modal-backdrop, #firmModal, .tm-modal-back').forEach(function(m){ mo.observe(m, { attributes: true, attributeFilter: ['class'] }); });
}
syncModalLock();

// ───────────────────────── Premium fiyatı: yalnızca sunucu yapılandırmasından ─────────────────────────
// Ödeme penceresindeki tutarlar da buradan gelir (KDV vb. satır uydurulmaz; gerçek tutar sipariş anında sunucuda hesaplanır).
(function(){
  var amt = $('spAmount');
  var price = window.KV_BOOT && KV_BOOT.premium;
  if(amt && price) amt.textContent = String(price);
  if(price){
    var txt = '$' + Number(price).toFixed(2);
    ['kvPayPlanPrice', 'kvPayTotal', 'kvPayCtaTotal'].forEach(function(id){ var e = $(id); if(e) e.textContent = txt; });
  }
})();

// ───────────────────────── erişilebilirlik etiketleri, ipuçları, yer tutucular: arayüz diline çevrilir ─────────────────────────
// Kaynak metin Türkçe (aria-label / title / placeholder); sözlükte karşılığı varsa seçili dilde gösterilir, yoksa olduğu gibi kalır.
// Sonradan eklenen öğeler (JS ile üretilen kartlar, modallar) için aşağıdaki gözlemci aynı işlemi yapar.
var ATTRS = [['aria-label', 'data-i18n-aria'], ['title', 'data-i18n-title'], ['placeholder', 'data-i18n-ph']];
function translateAttrs(root){
  if(typeof window.kvT !== 'function') return;
  var base = root || document;
  var list = [];
  if(base.nodeType === 1 && (base.hasAttribute('aria-label') || base.hasAttribute('title') || base.hasAttribute('placeholder'))) list.push(base);
  Array.prototype.forEach.call(base.querySelectorAll('[aria-label],[title],[placeholder]'), function(e){ list.push(e); });
  list.forEach(function(el){
    ATTRS.forEach(function(pair){
      var a = pair[0], cur = el.getAttribute(a); if(cur === null || cur === '') return;
      var ok = 'data-kv-o-' + a;
      var src = el.getAttribute(ok);
      if(src === null){
        if(el.hasAttribute(pair[1])) return;   // anahtarlı olanlara setLang bakar
        src = cur; el.setAttribute(ok, src);
      }
      var out = window.kvT(src);
      if(out !== cur) el.setAttribute(a, out);
    });
  });
}
document.addEventListener('kv:lang', function(){ translateAttrs(); });
translateAttrs();
// modal pencereleri sonradan açılınca (ör. ödeme) etiketleri tazele
var _openM = window.openM;
if(typeof _openM === 'function'){
  window.openM = function(id){
    var r = _openM.apply(this, arguments);
    try{ var m = $('m' + String(id).charAt(0).toUpperCase() + String(id).slice(1)); if(m) translateAttrs(m); }catch(e){}
    return r;
  };
}

// ───────────────────────── metin çevirisi: data-kvt (Türkçe kaynak metin → seçili dil) ─────────────────────────
function kt(s, v){ return typeof window.kvT === 'function' ? window.kvT(s, v) : s; }
function translateDom(root){
  var base = root || document, list = [];
  if(base.nodeType === 1 && base.hasAttribute('data-kvt')) list.push(base);
  Array.prototype.forEach.call(base.querySelectorAll('[data-kvt]'), function(e){ list.push(e); });
  list.forEach(function(el){
    var src = el.getAttribute('data-kvt-src');
    if(src === null){ src = el.textContent.trim(); if(!src) return; el.setAttribute('data-kvt-src', src); }
    var out = kt(src); if(el.textContent !== out) el.textContent = out;
  });
}
window.kvTranslateDom = translateDom;
document.addEventListener('kv:lang', function(){ translateDom(); });
translateDom();

// JS ile sonradan eklenen düğümler (firma kartları, listeler, açılır pencereler) seçili dilde doğar:
// eklenen alt ağaçlar bir sonraki karede taranır; yalnızca Türkçe dışı bir dil seçiliyken iş yapılır.
(function(){
  if(!window.MutationObserver) return;
  var queue = [], scheduled = false;
  function flush(){
    scheduled = false;
    var items = queue; queue = [];
    if((window.LANG || 'tr') === 'tr') return;
    items.forEach(function(n){ if(n.isConnected){ translateAttrs(n); translateDom(n); } });
  }
  new MutationObserver(function(muts){
    muts.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes, function(n){ if(n.nodeType === 1) queue.push(n); }); });
    if(queue.length && !scheduled){ scheduled = true; (window.requestAnimationFrame || setTimeout)(flush); }
  }).observe(document.body, { childList: true, subtree: true });
})();

// ───────────────────────── üye paneli: genel bakış ve profil başlığı (gerçek veriden) ─────────────────────────
var PROFILE_FIELDS = ['name', 'tax_id', 'country_cc', 'city', 'address', 'email', 'phone', 'rep_name', 'founded_year', 'direction', 'hs_codes', 'products', 'description', 'website', 'certificates'];
function completion(me){
  var co = me && me.company, raw = (co && co.raw) || {}, n = 0, total = PROFILE_FIELDS.length + 1;   // +1: sektör
  PROFILE_FIELDS.forEach(function(f){ var v = raw[f]; if(v !== null && v !== undefined && String(v).trim() !== '') n++; });
  if(co && co.sec !== null && co.sec !== undefined) n++;
  return { n: n, total: total, pct: Math.round(n / total * 100) };
}
function setText(id, v){ var e = $(id); if(e) e.textContent = v; }
function countryName(cc){ var d = (window.CI && (CI[window.LANG] || CI.tr)) || {}; return d[cc] || String(cc || '').toUpperCase(); }
function sectorName(idx){ var d = (window.SI && (SI[window.LANG] || SI.tr)) || {}; return d[idx] || ''; }
function icon(path){ return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>'; }

var NEXT_ICON_DONE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
var NEXT_ICON_TODO = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>';

window.kvFillOverview = function(me){
  if(!me || !$('dp-overview')) return;
  var co = me.company, u = me.user || {}, st = co && co.status, c = completion(me), docs = (me.documents || []).length, approved = st === 'approved';
  setText('ovUserName', u.name || '');

  // doğrulama durumu: yalnızca sunucudaki başvuru durumu
  var badge = $('ovVerifyBadge');
  if(badge){
    var map = {
      approved: ['ov-badge-info', 'Firma doğrulandı'],
      pending: ['ov-badge-warn', 'Başvurunuz inceleniyor — sonuç e-posta ile bildirilecek'],
      rejected: ['ov-badge-warn', 'Başvurunuz onaylanmadı — e-postanızı kontrol edin'],
      suspended: ['ov-badge-warn', 'Hesap askıda; destek ile iletişime geçin']
    };
    var m = co ? (map[st] || map.pending) : ['ov-badge-warn', 'Henüz firma başvurunuz yok'];
    badge.className = 'ov-badge ' + m[0];
    badge.innerHTML = icon(approved ? '<polyline points="20 6 9 17 4 12"/>' : '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>') + '<span>' + escapeHtml(kt(m[1])) + '</span>';
  }

  // sayılar
  setText('ovStatProfile', co ? c.pct + '%' : '—');
  setText('ovStatProfileSub', co ? kt('{n} / {total} alan dolu', { n: c.n, total: c.total }) : '');
  setText('ovStatDocs', co ? String(docs) : '—');
  setText('ovStatDocsSub', co ? kt(docs ? 'Yalnızca Kervea yöneticileri görür' : 'Henüz belge yüklenmedi') : '');
  setText('ovStatVerify', co ? kt(approved ? 'Doğrulandı' : 'Beklemede') : '—');
  setText('ovStatVerifySub', co ? kt(approved ? 'Belgeler Kervea ekibince incelendi' : 'Belgeler inceleniyor') : '');
  setText('ovStatMatchesSub', kt(approved ? 'Sektör ve ürün kriterlerinize göre' : 'Başvurunuz onaylandıktan sonra listelenir'));

  // sonraki adımlar (hepsi gerçek durumdan)
  var steps = [];
  if(!co){
    steps.push({ done: false, t: 'Firma başvurunuzu yapın', go: 'add' });
  } else {
    steps.push({ done: approved, t: approved ? 'Başvurunuz onaylandı' : (st === 'rejected' ? 'Başvurunuz onaylanmadı; e-postanızı kontrol edin' : (st === 'suspended' ? 'Hesap askıda; destek ile iletişime geçin' : 'Başvurunuzun incelenmesini bekleyin')) });
    steps.push({ done: c.pct >= 100, t: c.pct >= 100 ? 'Profiliniz eksiksiz' : kt('Profilinizi tamamlayın (%{n} dolu)', { n: c.pct }), panel: 'profile' });
    steps.push({ done: docs > 0, t: docs > 0 ? kt('Belgeleriniz yüklendi ({n})', { n: docs }) : 'Doğrulama belgelerinizi yükleyin', panel: 'docs' });
    var vis = !!(me.consents && me.consents.contact_visibility);
    steps.push({ done: vis, t: vis ? 'İletişim bilgileriniz Premium üyelere gösteriliyor' : 'İletişim bilgilerinizin gösterilmesine izin verin', panel: 'settings' });
  }
  var ul = $('ovNext');
  if(ul){
    ul.innerHTML = steps.map(function(x){
      var label = escapeHtml(kt(x.t));
      var body = (x.panel || x.go) ? '<button type="button" class="ov-next-btn" data-panel="' + (x.panel || '') + '" data-go="' + (x.go || '') + '">' + label + '</button>' : '<span>' + label + '</span>';
      return '<li class="' + (x.done ? 'done' : 'todo') + '"><i aria-hidden="true">' + (x.done ? NEXT_ICON_DONE : NEXT_ICON_TODO) + '</i>' + body + '</li>';
    }).join('');
  }

  // eşleşmeler: yalnızca sunucudan (30 sn önbellek: dil değişimi ve sekme geçişleri sunucuyu yormaz)
  function paintMatches(items){
    var approvedNow = approved;
    setText('ovStatMatches', items.length ? String(items.length) : (approvedNow ? '0' : '—'));
    var empty = document.querySelector('#dp-overview .ov-portfolio-empty, #dp-overview .ov-portfolio-list');
    if(empty && items.length){
      var d = (window.CI && (CI[window.LANG] || CI.tr)) || {};
      empty.className = 'ov-portfolio-list';
      empty.innerHTML = items.slice(0, 3).map(function(p){
        return '<div class="ov-pl-row" role="button" tabindex="0" onclick="openFirm(\'' + escapeJs(p.id) + '\')">' + window.kvLogoTile(p, 40, 10) +
          '<div style="flex:1;min-width:0"><b>' + escapeHtml(p.nm) + '</b><div style="color:var(--faint);font-size:13px">' + escapeHtml(d[p.cn_key] || p.cn_key) + '</div></div>' +
          '<span class="pill" style="background:var(--emer);color:#fff">' + escapeHtml(p.uyum) + ' ' + escapeHtml((T[window.LANG] || T.tr).match_score || '') + '</span></div>';
      }).join('');
    }
  }
  if(matchCache && Date.now() - matchCache.at < 30000){ paintMatches(matchCache.items); return; }
  KV_API('GET', '/kv/matches').then(function(r){
    if(!r.ok) return;
    var items = (r.data.items || []).filter(function(p){ return !p.locked; });
    matchCache = { at: Date.now(), items: items };
    paintMatches(items);
  });
};
var matchCache = null;
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('.ov-next-btn'); if(!b) return;
  var go = b.getAttribute('data-go'), panel = b.getAttribute('data-panel');
  if(go && typeof window.go === 'function') window.go(go);
  else if(panel && typeof window.showPanel === 'function') window.showPanel(panel);
});

function renderProfileHead(me){
  if(!me || !$('pfRingFg')) return;
  var co = me.company, raw = (co && co.raw) || {}, c = completion(me), docs = (me.documents || []).length;
  var fg = $('pfRingFg'); if(fg) fg.style.strokeDashoffset = String(Math.round(201 * (1 - c.pct / 100)));
  setText('pfRingTxt', co ? c.pct + '%' : '—');
  setText('pfName', raw.name || '');
  var metaParts = [];
  if(co) metaParts.push(kt(co.status === 'approved' ? 'Doğrulanmış firma' : 'Başvuru inceleniyor'));
  if(raw.country_cc) metaParts.push(countryName(raw.country_cc) + (raw.city ? ' · ' + raw.city : ''));
  if(raw.founded_year) metaParts.push(((window.T && (T[window.LANG] || T.tr).since) || '') + ' ' + raw.founded_year);
  setText('pfMeta', metaParts.join(' · '));
  var soc = raw.social || {}, hasSoc = Object.keys(soc).some(function(k){ return soc[k]; });
  var np = MEDIA ? MEDIA.photos.length : null, maxp = MEDIA ? MEDIA.limits.photos : 5;
  var chips = [
    { ok: !!(MEDIA ? MEDIA.logo : (co && co.logo)), t: 'Logo' },
    { ok: docs > 0, t: 'Belgeler' },
    { ok: hasSoc, t: 'Sosyal medya' }
  ];
  if(np !== null) chips.push({ ok: np >= maxp, t: kt('Galeri ({n}/{max})', { n: np, max: maxp }), raw: true });
  var ch = $('pfChips');
  if(ch) ch.innerHTML = chips.map(function(x){ return '<span class="phchip' + (x.ok ? '' : ' warn') + '">' + escapeHtml(x.raw ? x.t : kt(x.t)) + '</span>'; }).join('');
  // canlı kart
  setText('ppName', raw.name || '');
  setText('ppMeta', metaParts.slice(1).join(' · '));
  var tg = $('ppTags'); if(tg){ var sn = co && co.sec != null ? sectorName(co.sec) : ''; tg.innerHTML = sn ? '<span>' + escapeHtml(sn) + '</span>' : ''; }
  renderMedia();
}

// ───────────────────────── firma profili: logo, kapak, galeri (gerçek yükleme) ─────────────────────────
var MEDIA = null, mediaBusy = false;
function mediaStatus(msg, bad){ var e = $('pfMediaStatus'); if(!e) return; e.textContent = msg || ''; e.classList.toggle('bad', !!bad); }
function serverMsg(r, fallback){
  var d = (r && r.data) || {};
  if(d.errors){ var k = Object.keys(d.errors)[0]; if(k && d.errors[k][0]) return d.errors[k][0]; }
  return d.message || fallback;
}
function initials(name){ var w = String(name || '').trim().split(/\s+/).filter(Boolean); return ((w[0] || '')[0] || '') + ((w[1] || '')[0] || ''); }
function renderMedia(){
  var me = window.KV_ME, raw = (me && me.company && me.company.raw) || {};
  var logo = MEDIA && MEDIA.logo, cover = MEDIA && MEDIA.cover;
  var box = $('phbox'), pl = $('ppLogo');
  var logoHtml = logo ? '<img src="' + escapeHtml(logo) + '" alt="" style="width:100%;height:100%;object-fit:contain">' : escapeHtml(initials(raw.name).toUpperCase());
  if(box) box.innerHTML = logoHtml;
  if(pl) pl.innerHTML = logoHtml;
  var pc = $('ppCover'); if(pc){ pc.style.backgroundImage = cover ? 'url("' + String(cover).replace(/"/g, '%22') + '")' : ''; pc.classList.toggle('has-img', !!cover); }
  var rm = $('pfCoverRemove'); if(rm) rm.hidden = !cover;
  var prev = $('profGalPrev');
  if(prev){
    var photos = MEDIA ? MEDIA.photos : [];
    prev.innerHTML = photos.map(function(p){
      return '<div class="thumb"><img src="' + escapeHtml(p.url) + '" alt="" loading="lazy"><button type="button" class="del" data-photo="' + Number(p.id) + '" aria-label="' + escapeHtml(kt('Fotoğrafı kaldır')) + '">×</button></div>';
    }).join('');
  }
  var full = MEDIA && MEDIA.photos.length >= MEDIA.limits.photos, gd = $('pfGalDrop');
  if(gd){ gd.classList.toggle('kv-disabled', !!full); gd.setAttribute('aria-disabled', full ? 'true' : 'false'); }
}
function loadMedia(){
  if(!window.KV_USER || !window.KV_ME || !window.KV_ME.company) return;
  KV_API('GET', '/kv/me/media').then(function(r){ if(r.ok){ MEDIA = r.data; renderProfileHead(window.KV_ME); } });
}
function sendMedia(kind, file, okMsg){
  if(!file || mediaBusy || !MEDIA) return;
  var maxKb = kind === 'logo' ? MEDIA.limits.logo_kb : MEDIA.limits.image_kb;
  if(file.size > maxKb * 1024){ mediaStatus(kt('Dosya çok büyük (max {mb} MB)', { mb: Math.floor(maxKb / 1024) }), true); return; }
  if(!/^image\/(jpeg|png|webp)$/.test(file.type)){ mediaStatus(kt('Bu alana yalnızca görsel (JPEG, PNG, WebP) yüklenebilir.'), true); return; }
  if(kind === 'photo' && MEDIA.photos.length >= MEDIA.limits.photos){ mediaStatus(kt('En fazla {n} fotoğraf eklenebilir.', { n: MEDIA.limits.photos }), true); return; }
  var fd = new FormData(); fd.append('kind', kind); fd.append('file', file);
  mediaBusy = true; mediaStatus(kt('Görsel yükleniyor…'));
  return KV_API('POST', '/kv/me/media', fd).then(function(r){
    mediaBusy = false;
    if(r.ok){ MEDIA = r.data; renderProfileHead(window.KV_ME); mediaStatus(kt(okMsg)); }
    else mediaStatus(serverMsg(r, kt('Görsel yüklenemedi')), true);
    return r;
  });
}
function removeMedia(url, okMsg){
  if(mediaBusy) return; mediaBusy = true;
  KV_API('DELETE', url).then(function(r){
    mediaBusy = false;
    if(r.ok){ MEDIA = r.data; renderProfileHead(window.KV_ME); mediaStatus(kt(okMsg)); }
    else mediaStatus(serverMsg(r, kt('Görsel kaldırılamadı')), true);
  });
}
function wireMedia(){
  var lb = $('pfLogoBtn'), lf = $('phfile');
  if(lb && lf){
    lb.addEventListener('click', function(){ lf.click(); });
    lf.addEventListener('change', function(){ var f = lf.files && lf.files[0]; lf.value = ''; sendMedia('logo', f, 'Logo güncellendi'); });
  }
  function dropper(boxId, inputId, handler){
    var box = $(boxId), inp = $(inputId); if(!box || !inp) return;
    function open(){ if(!box.classList.contains('kv-disabled')) inp.click(); }
    box.addEventListener('click', function(e){ if(e.target !== inp) open(); });
    box.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } });
    inp.addEventListener('change', function(){ var files = Array.prototype.slice.call(inp.files || []); inp.value = ''; handler(files); });
  }
  dropper('pfCoverDrop', 'profCoverFile', function(files){ sendMedia('cover', files[0], 'Kapak güncellendi'); });
  dropper('pfGalDrop', 'profGalFile', function(files){
    // seçilen fotoğraflar sırayla yüklenir (her biri kendi isteğiyle; sunucu üst sınırı denetler)
    var chain = Promise.resolve();
    files.forEach(function(f){ chain = chain.then(function(){ var p = sendMedia('photo', f, 'Fotoğraf eklendi'); return p; }); });
  });
  var rm = $('pfCoverRemove'); if(rm) rm.addEventListener('click', function(){ removeMedia('/kv/me/media/cover', 'Kapak kaldırıldı'); });
  var prev = $('profGalPrev');
  if(prev) prev.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.del[data-photo]'); if(!b) return;
    removeMedia('/kv/me/media/photo/' + encodeURIComponent(b.getAttribute('data-photo')), 'Fotoğraf kaldırıldı');
  });
}
wireMedia();

document.addEventListener('kv:member', function(e){ var me = e.detail || window.KV_ME; renderProfileHead(me); window.kvFillOverview(me); loadMedia(); });
document.addEventListener('kv:lang', function(){ if(window.KV_ME){ renderProfileHead(window.KV_ME); window.kvFillOverview(window.KV_ME); } });


// ───────────────────────── site bilgileri (config/kervea.php 'frontend'): iletişim, şirket, sosyal bağlantılar ─────────────────────────
// Dolu olan alan gösterilir; boş olan, müşterinin dolduracağı yer olarak işaretli kalır (iletişim/Hakkımızda) ya da gizlenir (sosyal simgeler).
(function(){
  var SITE = window.KV_SITE || {};
  function safeUrl(u){ return /^https?:\/\//i.test(String(u || '')) ? String(u) : ''; }
  function fill(id, v){
    var e = $(id); if(!e || !v) return;
    e.classList.remove('kv-todo'); e.removeAttribute('data-i18n'); e.textContent = String(v);
  }
  fill('ctAddr', SITE.address); fill('ctPhone', SITE.contact_phone);
  fill('aboCoName', SITE.legal_name); fill('aboCoAddr', SITE.address); fill('aboCoMersis', SITE.mersis); fill('aboCoFounders', SITE.founders);
  var mail = $('ctMail'); if(mail){ if(SITE.contact_email){ mail.textContent = SITE.contact_email; mail.href = 'mailto:' + SITE.contact_email; } }
  var any = false, links = SITE.links || {};
  document.querySelectorAll('[data-site-link]').forEach(function(a){
    var u = safeUrl(links[a.getAttribute('data-site-link')]);
    if(u){ a.href = u; a.hidden = false; any = true; } else { a.hidden = true; a.removeAttribute('href'); }
  });
  var box = $('fxSocial'); if(box) box.hidden = !any;
})();


// firması olan ülkeler (Hakkımızda haritası) gerçek sayılar gelince yeniden çizilir
document.addEventListener('kv:stats', function(){ if(typeof window.renderAboMap === 'function') window.renderAboMap(); });


// ───────────────────────── bülten: POST /kv/newsletter (e-posta + onay kutusu; sonuç sunucudan gelir) ─────────────────────────
(function(){
  var form = $('kvNlForm'); if(!form) return;
  var btn = $('kvNlBtn'), st = $('kvNlStatus'), busy = false;
  function say(msg, cls){ if(!st) return; st.textContent = msg || ''; st.className = 'kv-nl-status' + (cls ? ' ' + cls : ''); }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(busy) return;
    var email = ($('kvNlEmail').value || '').trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ say(kt('Lütfen geçerli bir e-posta adresi girin.'), 'err'); $('kvNlEmail').focus(); return; }
    if(!$('kvNlConsent').checked){ say(kt('Devam etmek için onay kutusunu işaretleyin.'), 'err'); $('kvNlConsent').focus(); return; }
    busy = true; if(btn) btn.disabled = true; say(kt('Gönderiliyor…'));
    KV_API('POST', '/kv/newsletter', { email: email, consent: true, locale: window.LANG || 'tr', website: ($('kvNlWebsite') || {}).value || '' }).then(function(r){
      busy = false; if(btn) btn.disabled = false;
      if(r.ok){
        say(((window.T && (T[window.LANG] || T.tr).nl_ok) || kt('Teşekkürler, e-posta adresiniz kaydedildi.')), 'ok');
        $('kvNlEmail').value = ''; $('kvNlConsent').checked = false;
      } else if(r.status === 429){ say(kt('Kısa süre sonra tekrar deneyin.'), 'err'); }
      else if(r.status === 422){ say(serverMsg(r, kt('Lütfen geçerli bir e-posta adresi girin.')), 'err'); }
      else say(serverMsg(r, kt('Bir hata oluştu. Lütfen tekrar deneyin.')), 'err');
    });
  });
})();

// ───────────────────────── firma ekleme: taslak (yalnızca bu tarayıcıda; belge ve görseller hariç) ─────────────────────────
(function(){
  var KEY = 'kv_add_draft_v1', restored = false;
  var lb = $('addLogoBox'); if(lb && !lb.getAttribute('data-empty')) lb.setAttribute('data-empty', lb.innerHTML);
  function fields(){ return Array.prototype.slice.call(document.querySelectorAll('#add [data-f]')).filter(function(i){ return i.type !== 'file' && i.type !== 'password' && i.type !== 'checkbox'; }); }
  function load(){ try{ var raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; }catch(e){ return null; } }
  function drop(){ try{ localStorage.removeItem(KEY); }catch(e){} }
  window.kvDraftSave = function(){
    var d = { f: {}, step: window.CS || 1, at: Date.now() };
    fields().forEach(function(i){ var k = i.getAttribute('data-f'); if(i.value !== '') d.f[k] = i.value; });
    var cb = $('ddAddCountry'); d.cc = (cb && cb.getAttribute('data-cc')) || '';
    var cy = $('ddAddCity'), ci = cy && cy.querySelector('.cityinput'); d.city = ci ? ci.value : ((cy && cy.getAttribute('data-city')) || '');
    try{ localStorage.setItem(KEY, JSON.stringify(d)); window.toast(kt('Taslak bu tarayıcıya kaydedildi (belgeler ve görseller hariç).')); showNote(true); }
    catch(e){ window.toast(kt('Taslak kaydedilemedi: tarayıcı depolaması kapalı.')); }
  };
  function showNote(on){
    var n = $('kvDraftNote');
    if(!on){ if(n) n.remove(); return; }
    var host = document.querySelector('#add .stp-sub'); if(!host) return;
    if(!n){
      n = document.createElement('div'); n.id = 'kvDraftNote'; n.className = 'kv-draft-note';
      n.innerHTML = '<span id="kvDraftTxt"></span> <button type="button" class="kv-draft-del"></button>';
      host.parentNode.appendChild(n);
      n.querySelector('button').addEventListener('click', function(){ drop(); showNote(false); window.toast(kt('Taslak silindi.')); });
    }
    n.querySelector('#kvDraftTxt').textContent = kt('Kayıtlı taslağınız geri yüklendi.');
    n.querySelector('button').textContent = kt('Taslağı sil');
  }
  function restore(){
    var d = load(); if(!d || !d.f) return;
    fields().forEach(function(i){ var k = i.getAttribute('data-f'); if(d.f[k] !== undefined) i.value = d.f[k]; });
    try{ if(d.cc && typeof window.selectCountry === 'function'){ window.selectCountry('ddAddCountry', d.cc); var cb = $('ddAddCountry'); if(cb) cb.setAttribute('data-cc', d.cc); } }catch(e){}
    try{ if(d.city){ var ci = document.querySelector('#ddAddCity .cityinput'); if(ci) ci.value = d.city; else if(typeof window.selectCity === 'function') window.selectCity('ddAddCity', d.city); } }catch(e){}
    try{ if(typeof window.renderAddSecChip === 'function') window.renderAddSecChip(); }catch(e){}
    showNote(true);
  }
  restored = true; restore();      // sayfa yüklenirken (alanlar DOM'da hazır; adres /add-company olsa da olmasa da)
  document.addEventListener('kv:lang', function(){ if($('kvDraftNote')) showNote(true); });
  // başvuru gerçekten gönderilip sunucu kabul edince taslak silinir
  var _alert = window.kvShowAlert;
  if(typeof _alert === 'function') window.kvShowAlert = function(variant, title){
    if(variant === 'success' && title === 'Başvurunuz alındı'){ drop(); showNote(false); }
    return _alert.apply(this, arguments);
  };
})();


// ───────────────────────── prospektüs: firmanın kendi profil verisinden tek sayfalık belge ─────────────────────────
// Veri yalnızca sunucudaki profilden (KV_ME) gelir. Belge yeni sekmede açılır; "yazdır" modunda yazdır penceresi kendiliğinden açılır.
window.kvProspectus = function(mode){
  var st = $('kvProspStatus'); function say(m, bad){ if(st){ st.textContent = m || ''; st.classList.toggle('bad', !!bad); } }
  var me = window.KV_ME, co = me && me.company, raw = (co && co.raw) || null;
  if(!raw || !raw.name){ say(kt('Önce firma profilinizi doldurun.'), true); return; }
  var L = window.LANG || 'tr', rtl = L === 'ar', T_ = (window.T && (T[L] || T.tr)) || {};
  var target = window._prospTarget || 'meetings';
  var sub = kt(target === 'fair' ? 'Dijital kartvizit' : (target === 'social' ? 'Referans özeti' : 'Firma tanıtım belgesi'));
  function row(k, v, ltr){ return v ? '<tr><td class="k">' + escapeHtml(k) + '</td><td class="v"' + (ltr ? ' dir="ltr" style="text-align:start"' : '') + '>' + escapeHtml(v) + '</td></tr>' : ''; }
  var dirTxt = raw.direction === 'EXP' ? T_.dir_exp : (raw.direction === 'IMP' ? T_.dir_imp : (raw.direction === 'BOTH' ? kt('Her ikisi') : ''));
  var basics = row(kt('Kuruluş yılı'), raw.founded_year) + row(T_.fl_country ? String(T_.fl_country).replace(/\s*\*$/, '') : kt('Ülke'), [countryName(raw.country_cc), raw.city].filter(Boolean).join(' · ')) +
    row(kt('Çalışan sayısı'), raw.employees) + row(kt('Adres'), raw.address) + row(kt('Web sitesi'), raw.website, true) + row(T_.fp_email || kt('E-posta'), raw.email, true) + row(T_.fp_phone || kt('Telefon'), raw.phone, true) +
    row(T_.fp_rep || kt('Yetkili'), [raw.rep_name, raw.rep_title].filter(Boolean).join(' — '));
  var trade = row(T_.fp_sector, co.sec != null ? sectorName(co.sec) : '') + row(T_.fp_dir, dirTxt) + row(T_.fp_hs, raw.hs_codes, true) + row(T_.fp_moq, raw.moq) + row('INCOTERM', raw.incoterm) + row(T_.fp_pay, raw.payment_terms);
  var certs = String(raw.certificates || '').split(',').map(function(x){ return x.trim(); }).filter(Boolean);
  var logo = MEDIA && MEDIA.logo ? '<img class="lg" src="' + escapeHtml(MEDIA.logo) + '" alt="">' : '<div class="lg lgt">' + escapeHtml(initials(raw.name).toUpperCase()) + '</div>';
  var origin = location.origin;
  var date = new Date().toLocaleDateString((typeof window.kvLocale === 'function') ? window.kvLocale() : 'tr-TR');
  var profileUrl = co.id ? origin + '/company/' + encodeURIComponent(co.id) : origin;
  var css = '@font-face{font-family:"TeX Gyre Schola";src:url("' + origin + '/fonts/texgyreschola-regular.woff2") format("woff2");font-weight:400}' +
    '@font-face{font-family:"TeX Gyre Schola";src:url("' + origin + '/fonts/texgyreschola-bold.woff2") format("woff2");font-weight:700}' +
    '@font-face{font-family:"Carlito";src:url("' + origin + '/fonts/Carlito-Regular.woff2") format("woff2");font-weight:400}' +
    '@font-face{font-family:"Carlito";src:url("' + origin + '/fonts/Carlito-Bold.woff2") format("woff2");font-weight:700}' +
    '@font-face{font-family:"Noto Sans Arabic";src:url("' + origin + '/fonts/NotoSansArabic-Regular.woff2") format("woff2");font-weight:400}' +
    '@font-face{font-family:"Noto Sans Arabic";src:url("' + origin + '/fonts/NotoSansArabic-Bold.woff2") format("woff2");font-weight:700}' +
    '@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font-family:"Carlito","Noto Sans Arabic",Arial,sans-serif;color:#0A211F;line-height:1.55;max-width:780px;margin:0 auto;padding:28px 24px;font-size:14px}' +
    '.hdr{display:flex;align-items:center;gap:16px;border-bottom:3px solid #0D8A80;padding-bottom:14px;margin-bottom:6px}.lg{width:64px;height:64px;border-radius:12px;object-fit:contain;border:1px solid #DCE9E6;background:#fff;flex:none}' +
    '.lgt{display:flex;align-items:center;justify-content:center;background:#0D8A80;color:#fff;font-family:"TeX Gyre Schola",Georgia,serif;font-weight:700;font-size:22px;border:0}' +
    'h1{font-family:"TeX Gyre Schola",Georgia,serif;color:#0A5F56;margin:0;font-size:26px;line-height:1.2}.sub{color:#5A6C6D;font-size:13px;margin-top:4px}' +
    'h2{font-family:"TeX Gyre Schola",Georgia,serif;color:#0D8A80;margin:22px 0 6px;font-size:16px;border-inline-start:3px solid #0D8A80;padding-inline-start:10px}' +
    'table{width:100%;border-collapse:collapse}td{padding:7px 10px;border-bottom:1px solid #DCE9E6;vertical-align:top}.k{color:#6B7C7D;font-size:11px;text-transform:uppercase;letter-spacing:.05em;width:30%}.v{font-weight:700}' +
    '.desc{background:#F5FAF8;border-inline-start:3px solid #0D8A80;padding:12px 16px;white-space:pre-line;margin:6px 0}.tag{display:inline-block;background:#E6F0EC;color:#0A5F56;font-size:12px;padding:3px 10px;border-radius:100px;margin:2px 4px 2px 0;font-weight:700}' +
    '.foot{margin-top:28px;border-top:1px solid #DCE9E6;padding-top:12px;color:#6B7C7D;font-size:12px;text-align:center}.bar{position:sticky;top:0;background:#0A211F;color:#fff;padding:10px 16px;margin:-28px -24px 20px;display:flex;gap:12px;align-items:center;justify-content:space-between;font-size:13px}' +
    '.bar button{background:#0D8A80;color:#fff;border:0;border-radius:8px;padding:8px 14px;font:inherit;font-weight:700;cursor:pointer}@media print{.bar{display:none}body{padding:0}}';
  var statusTxt = kt(co.status === 'approved' ? 'Doğrulanmış firma · Kervea' : 'Başvurusu inceleniyor · Kervea');
  var doc = '<!DOCTYPE html><html lang="' + L + '" dir="' + (rtl ? 'rtl' : 'ltr') + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escapeHtml(raw.name) + ' — Kervea</title><style>' + css + '</style></head><body>' +
    '<div class="bar"><span>' + escapeHtml(raw.name) + '</span><button type="button" onclick="window.print()">' + escapeHtml(kt('Prospektüsü aç ve yazdır / PDF kaydet')) + '</button></div>' +
    '<div class="hdr">' + logo + '<div><h1>' + escapeHtml(raw.name) + '</h1><div class="sub">' + escapeHtml(sub) + ' · ' + escapeHtml(statusTxt) + '</div></div></div>' +
    (raw.description ? '<h2>' + escapeHtml(kt('Firma özeti')) + '</h2><div class="desc">' + escapeHtml(raw.description) + '</div>' : '') +
    '<h2>' + escapeHtml(kt('Temel bilgiler')) + '</h2><table>' + basics + '</table>' +
    (trade ? '<h2>' + escapeHtml(kt('Ticari bilgiler')) + '</h2><table>' + trade + '</table>' : '') +
    (raw.products ? '<h2>' + escapeHtml(kt('Ürünler')) + '</h2><p>' + escapeHtml(raw.products) + '</p>' : '') +
    (certs.length ? '<h2>' + escapeHtml(T_.fp_cert || '') + '</h2><p>' + certs.map(function(x){ return '<span class="tag">' + escapeHtml(x) + '</span>'; }).join(' ') + '</p>' : '') +
    '<div class="foot">' + escapeHtml(kt('Bu belge {date} tarihinde Kervea üyelik panelinden hazırlanmıştır.', { date: date })) + '<br>' + escapeHtml(profileUrl) + '</div>' +
    (mode === 'print' ? '<script>window.addEventListener("load",function(){setTimeout(function(){window.print()},500)})<\/script>' : '') +
    '</body></html>';
  var url = URL.createObjectURL(new Blob([doc], { type: 'text/html;charset=utf-8' }));
  var w = window.open(url, '_blank');
  if(!w){ say(kt('Prospektüs penceresi açılamadı: tarayıcınızın açılır pencere engelini bu site için kapatın.'), true); URL.revokeObjectURL(url); return; }
  say('');
  setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
};

// role="button" olan ama düğme olmayan öğeler klavyeyle (Enter / Boşluk) çalışır
document.addEventListener('keydown', function(e){
  if(e.key !== 'Enter' && e.key !== ' ') return;
  var t = e.target; if(!t || !t.getAttribute || t.getAttribute('role') !== 'button') return;
  if(/^(BUTTON|A|INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && t.tagName !== 'A') return;
  if(t.tagName === 'A' && t.getAttribute('href')) return;
  e.preventDefault(); t.click();
});

})();
