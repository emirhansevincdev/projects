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
(function(){
  var amt = $('spAmount');
  var price = window.KV_BOOT && KV_BOOT.premium;
  if(amt && price) amt.textContent = String(price);
})();

// ───────────────────────── erişilebilirlik etiketleri / ipuçları: arayüz diline çevrilir ─────────────────────────
// Kaynak metin Türkçe (aria-label / title); sözlükte karşılığı varsa seçili dilde gösterilir, yoksa olduğu gibi kalır.
function translateAttrs(root){
  if(typeof window.kvT !== 'function') return;
  (root || document).querySelectorAll('[aria-label],[title]').forEach(function(el){
    ['aria-label', 'title'].forEach(function(a){
      var cur = el.getAttribute(a); if(cur === null || cur === '') return;
      var ok = 'data-kv-o-' + a;
      var src = el.getAttribute(ok);
      if(src === null){
        if(el.hasAttribute('data-i18n-aria') && a === 'aria-label') return;   // anahtarlı olanlara setLang bakar
        if(el.hasAttribute('data-i18n-title') && a === 'title') return;
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
    try{ var m = $('m' + String(id).charAt(0).toUpperCase() + String(id).slice(1)); if(m) translateAttrs(m); legalNote(id); }catch(e){}
    return r;
  };
}

// ───────────────────────── yasal metinler: Türkçe dışındaki dillerde "yalnızca Türkçe metin geçerlidir" notu ─────────────────────────
function legalNote(id){
  if(['kvkk', 'sozl', 'cookie'].indexOf(id) < 0) return;
  var m = $('m' + id.charAt(0).toUpperCase() + id.slice(1)); if(!m) return;
  var host = m.querySelector('.mbody') || m.querySelector('.mbox'); if(!host) return;
  var n = m.querySelector('.kv-legal-note');
  if((window.LANG || 'tr') === 'tr'){ if(n) n.remove(); return; }
  if(!n){ n = document.createElement('p'); n.className = 'kv-legal-note'; n.setAttribute('role', 'note'); host.insertBefore(n, host.firstChild); }
  n.textContent = window.kvT('Hukuken yalnızca Türkçe metin geçerlidir.');
}
document.addEventListener('kv:lang', function(){ ['kvkk', 'sozl', 'cookie'].forEach(function(id){ var m = $('m' + id.charAt(0).toUpperCase() + id.slice(1)); if(m && m.classList.contains('open')) legalNote(id); }); });


// ───────────────────────── metin çevirisi: data-kvt (Türkçe kaynak metin → seçili dil) ─────────────────────────
function kt(s, v){ return typeof window.kvT === 'function' ? window.kvT(s, v) : s; }
function translateDom(root){
  (root || document).querySelectorAll('[data-kvt]').forEach(function(el){
    var src = el.getAttribute('data-kvt-src');
    if(src === null){ src = el.textContent.trim(); if(!src) return; el.setAttribute('data-kvt-src', src); }
    var out = kt(src); if(el.textContent !== out) el.textContent = out;
  });
}
window.kvTranslateDom = translateDom;
document.addEventListener('kv:lang', function(){ translateDom(); });
translateDom();

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

})();
