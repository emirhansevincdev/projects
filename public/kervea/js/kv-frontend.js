/* ═══════════════════════════════════════════════════════════════════════════
   KERVEA · FRONTEND (kervea-app.js + kervea-api.js'den sonra yüklenir)
   Herkese açık site: açılır menüler, bülten, küçük düzeltmeler.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

function $(id){ return document.getElementById(id); }

// ───────────────────────── açılır menüler: yerleşim, Escape, modal kilidi ─────────────────────────
// Liste ekranın altına sığmıyorsa yukarı açılır ve yüksekliği sınırlanır; kaydırma liste içinde kalır.
function placePanel(panel, anchor, max){
  if(!panel || !anchor) return;
  panel.classList.remove('kv-up'); panel.style.maxHeight = '';
  var r = anchor.getBoundingClientRect(), vh = window.innerHeight;
  var below = vh - r.bottom - 14, above = r.top - 14;
  var want = Math.min(max, vh * 0.72);
  if(below >= Math.min(want, 260) || below >= above){
    panel.style.maxHeight = Math.max(160, Math.min(want, below)) + 'px';
  } else {
    panel.classList.add('kv-up');
    panel.style.maxHeight = Math.max(160, Math.min(want, above)) + 'px';
  }
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

})();
