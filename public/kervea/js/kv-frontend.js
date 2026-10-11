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

})();
