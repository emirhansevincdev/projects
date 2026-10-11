/* ═══════════════════════════════════════════════════════════════════════════
   KERVEA · KÜRE (amCharts 5, orthographic) — ana sayfa arka planı
   • Ülkenin üzerine gelince (dokunulunca / klavye odağında) imlecin yanında kart açılır:
     ülke adı (arayüz dilinde) + bayrak + yalnızca gerçekse "N doğrulanmış firma".
   • Tıklama, ülke açılır listesiyle birebir aynı filtreyi uygular (selectCountry).
   • Ok / koridor çizgisi yok; yalnızca seçili ülke renklenir.
   • Küre hep döner (üzerindeyken yavaşlar, sürüklenince durur, bırakılınca devam eder).
   Ülke tespiti amCharts'ın kendi isabet testine değil, koordinat ters çevirmesine (chart.invert)
   ve world-low GeoJSON üzerinde nokta-çokgen sınamasına dayanır: küre dönerken imleç sabit
   dursa bile kart doğru ülkeyi gösterir.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var REDUCED = false, COARSE = false;
try{ REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
try{ COARSE = window.matchMedia('(pointer: coarse)').matches; }catch(e){}

var SPIN_MS = 45000, SPIN_SLOW_MS = 160000;
var C = null;   // am5 renkleri (init içinde)

var S = {
  selected: '', hovered: '', cc: null,
  inside: false, dragging: false, rotating: false, kb: null,
  down: null, px: 0, py: 0, raf: 0, resumeT: 0, hideT: 0, stats: {},
  geo: null, geoNames: {}, series: null, hubSeries: null
};
var card, cImg, cName, cSub, nodesHost;

// ───────────────────────── yardımcılar ─────────────────────────
function G(){ return window.AM_GLOBE; }
function lang(){ return window.LANG || 'tr'; }
function cnames(){ return (window.CI && (CI[lang()] || CI.tr)) || {}; }
function tx(k, fb){
  var T_ = window.T || {};
  return (T_[lang()] && T_[lang()][k]) || (T_.en && T_.en[k]) || fb || '';
}
function nameOf(cc){ return cnames()[cc] || S.geoNames[cc] || String(cc).toUpperCase(); }
function countOf(cc){ var b = (window.KV_STATS && KV_STATS.by_country) || {}; var n = +b[cc] || 0; return n > 0 ? n : 0; }
function countText(n){
  var rule = 'other';
  try{ rule = new Intl.PluralRules(window.kvLocale ? kvLocale() : 'en').select(n); }catch(e){}
  var s = tx('gc_firms_' + rule) || tx('gc_firms_other') || '{n}';
  var num = n; try{ num = n.toLocaleString(window.kvLocale ? kvLocale() : 'en'); }catch(e){}
  return s.replace('{n}', num);
}
function chart(){ var g = G(); return g && g.chart; }
function globeEl(){ return document.getElementById('globeMap'); }

// ───────────────────────── ülke tespiti (GeoJSON üzerinde) ─────────────────────────
function buildGeoIndex(){
  var out = [];
  var feats = (window.am5geodata_worldLow && am5geodata_worldLow.features) || [];
  feats.forEach(function(f){
    var id = f.id, g = f.geometry;
    if(!id || !g || id === 'AQ') return;
    var cc = String(id).toLowerCase();
    S.geoNames[cc] = (f.properties && f.properties.name) || '';
    var polys = g.type === 'Polygon' ? [g.coordinates] : (g.type === 'MultiPolygon' ? g.coordinates : []);
    var items = polys.map(function(rings){
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      rings[0].forEach(function(c){ if(c[0] < x0) x0 = c[0]; if(c[0] > x1) x1 = c[0]; if(c[1] < y0) y0 = c[1]; if(c[1] > y1) y1 = c[1]; });
      return { rings: rings, bb: [x0, y0, x1, y1] };
    });
    out.push({ cc: cc, polys: items });
  });
  return out;
}
function pip(rings, x, y){
  var inside = false;
  for(var r = 0; r < rings.length; r++){
    var ring = rings[r];
    for(var i = 0, j = ring.length - 1; i < ring.length; j = i++){
      var xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if(((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
    }
  }
  return inside;
}
function countryAtGeo(lon, lat){
  if(!S.geo) return null;
  for(var i = 0; i < S.geo.length; i++){
    var c = S.geo[i];
    for(var k = 0; k < c.polys.length; k++){
      var p = c.polys[k], bb = p.bb;
      if(lon < bb[0] || lon > bb[2] || lat < bb[1] || lat > bb[3]) continue;
      if(pip(p.rings, lon, lat)) return c.cc;
    }
  }
  return null;
}
// Ekran noktası -> kürenin üzerindeki coğrafi nokta (küre dışındaysa null)
function geoAtClient(cx, cy){
  var ch = chart(), el = globeEl(); if(!ch || !el) return null;
  var r = el.getBoundingClientRect(), pt = { x: cx - r.left, y: cy - r.top };
  var g, b;
  try{ g = ch.invert(pt); }catch(e){ return null; }
  if(!g || !isFinite(g.longitude) || !isFinite(g.latitude)) return null;
  try{ b = ch.convert(g); }catch(e){ return null; }
  // ters çevirme küre dışında da sayı döner; geri izdüşüm tutmuyorsa nokta kürenin dışındadır
  if(!b || Math.abs(b.x - pt.x) > 1.5 || Math.abs(b.y - pt.y) > 1.5) return null;
  return g;
}
function frontSide(lon, lat){
  var ch = chart(); if(!ch) return false;
  var l0 = -(ch.get('rotationX') || 0) * Math.PI / 180, p0 = -(ch.get('rotationY') || 0) * Math.PI / 180;
  var l1 = lon * Math.PI / 180, p1 = lat * Math.PI / 180;
  var d = Math.acos(Math.max(-1, Math.min(1, Math.sin(p0) * Math.sin(p1) + Math.cos(p0) * Math.cos(p1) * Math.cos(l1 - l0))));
  return d < Math.PI / 2 * 0.97;
}
// Çok küçük ülkeler (çokgeni birkaç piksel): hub noktasına yakınsa o ülke sayılır
function nearHub(cx, cy){
  var ch = chart(), el = globeEl(); if(!ch || !el || !window.KERVEA_HUBS) return null;
  var r = el.getBoundingClientRect(), best = null, bd = 12;
  KERVEA_HUBS.forEach(function(h){
    if(!frontSide(h.lon, h.lat)) return;
    var p; try{ p = ch.convert({ longitude: h.lon, latitude: h.lat }); }catch(e){ return; }
    if(!p) return;
    var d = Math.sqrt(Math.pow(r.left + p.x - cx, 2) + Math.pow(r.top + p.y - cy, 2));
    if(d < bd){ bd = d; best = h.cc; }
  });
  return best;
}
function countryAtClient(cx, cy){
  var g = geoAtClient(cx, cy);
  if(!g) return null;
  return countryAtGeo(g.longitude, g.latitude) || nearHub(cx, cy);
}

// ───────────────────────── renkler / boyama ─────────────────────────
function look(cc){
  if(cc === S.selected) return { fill: C.sel, fillOpacity: 0.92 };
  if(cc === S.hovered) return { fill: C.hov, fillOpacity: 0.78 };
  if(S.stats[cc] > 0) return { fill: C.has, fillOpacity: 0.72 };
  return { fill: C.land, fillOpacity: 0.5 };
}
function polyOf(cc){
  if(!S.series || !cc) return null;
  var di = S.series.getDataItemById(String(cc).toUpperCase());
  return di && di.get('mapPolygon');
}
function paint(cc){
  var p = polyOf(cc); if(!p || !C) return;
  p.setAll(look(cc));
}
function paintAll(){
  if(!S.series) return;
  S.series.dataItems.forEach(function(di){
    var id = di.dataContext && di.dataContext.id; if(!id) return;
    var p = di.get('mapPolygon'); if(p) p.setAll(look(id.toLowerCase()));
  });
}

// ───────────────────────── dönüş ─────────────────────────
function stopSpin(){ var g = G(); if(g && g.spin){ try{ g.spin.stop(); }catch(e){} g.spin = null; } }
function canSpin(){ return !REDUCED && !S.dragging && !S.rotating && !S.kb && !document.hidden && !!chart(); }
function startSpin(slow){
  var ch = chart(); if(!ch || REDUCED) return;
  stopSpin();
  var r = ch.get('rotationX') || 0;
  G().spin = ch.animate({ key: 'rotationX', from: r, to: r - 360, duration: slow ? SPIN_SLOW_MS : SPIN_MS, loops: Infinity });
}
function resumeSpinSoon(delay){
  clearTimeout(S.resumeT);
  S.resumeT = setTimeout(function(){ if(canSpin()) startSpin(S.inside && !COARSE); }, delay == null ? 300 : delay);
}
// Seçilen ülkeyi öne çevir (yalnızca görünür yarımkürenin kenarındaysa ya da arkadaysa)
function rotateToGeo(lon, lat, done){
  var ch = chart(); if(!ch){ if(done) done(); return; }
  var rx = ch.get('rotationX') || 0, ry = ch.get('rotationY') || 0;
  var d = ((-lon - rx + 540) % 360) - 180;
  var ty = Math.max(-40, Math.min(40, -lat));
  stopSpin();
  if(REDUCED){
    ch.set('rotationX', rx + d); ch.set('rotationY', ty);
    if(done) done(); return;
  }
  S.rotating = true;
  var ease = am5.ease.out(am5.ease.cubic), finished = false;
  function fin(){ if(finished) return; finished = true; S.rotating = false; if(done) done(); resumeSpinSoon(500); }
  var a = ch.animate({ key: 'rotationX', to: rx + d, duration: 850, easing: ease });
  ch.animate({ key: 'rotationY', to: ty, duration: 850, easing: ease });
  if(a && a.events) a.events.on('stopped', fin); else setTimeout(fin, 900);
  setTimeout(fin, 1100);   // emniyet
}
function centroidOf(cc){
  var di = S.series && S.series.getDataItemById(String(cc).toUpperCase());
  var geom = di && di.get('geometry');
  var c = geom && am5map.getGeoCentroid(geom);
  if(c && isFinite(c.longitude)) return c;
  var h = (window.KERVEA_HUBS || []).filter(function(x){ return x.cc === cc; })[0];
  return h ? { longitude: h.lon, latitude: h.lat } : null;
}

// ───────────────────────── kart ─────────────────────────
function ensureCard(){
  if(card) return;
  card = document.createElement('div');
  card.className = 'kv-gcard';
  card.setAttribute('aria-hidden', 'true');
  card.innerHTML = '<img class="kv-gcard-flag" alt="" width="44" height="30"><div class="kv-gcard-txt"><b class="kv-gcard-name"></b><span class="kv-gcard-sub"></span></div>';
  document.body.appendChild(card);
  cImg = card.querySelector('img'); cName = card.querySelector('b'); cSub = card.querySelector('span');
  cImg.addEventListener('error', function(){ cImg.style.visibility = 'hidden'; });
}
function fillCard(cc){
  ensureCard();
  cImg.style.visibility = 'visible';
  cImg.src = '/flags/' + encodeURIComponent(cc) + '.svg';
  cName.textContent = nameOf(cc);
  var n = countOf(cc);
  if(n > 0){ cSub.textContent = countText(n); cSub.style.display = ''; } else { cSub.textContent = ''; cSub.style.display = 'none'; }
  card.setAttribute('data-cc', cc);
}
function placeCard(x, y, above){
  var w = card.offsetWidth, h = card.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
  var left = x + 16, top = y + 20;
  if(above){ left = x - w / 2; top = y - h - 26; }
  if(left + w > vw - 8) left = x - 16 - w;
  if(top + h > vh - 8) top = y - 20 - h;
  if(above && top < 8) top = y + 26;
  left = Math.max(8, left); top = Math.max(8, top);
  card.style.transform = 'translate3d(' + Math.round(left) + 'px,' + Math.round(top) + 'px,0)';
}
function showCard(cc, x, y, above){
  clearTimeout(S.hideT);
  ensureCard();
  if(card.getAttribute('data-cc') !== cc) fillCard(cc);
  placeCard(x, y, above);
  card.classList.add('on');
}
function hideCard(){
  clearTimeout(S.hideT);
  if(card) card.classList.remove('on');
}
function refreshCard(){ if(card && card.classList.contains('on') && S.cc) fillCard(S.cc); }

// ───────────────────────── işaretçi ─────────────────────────
function setHover(cc){
  if(cc === S.hovered) return;
  var old = S.hovered; S.hovered = cc || '';
  if(old) paint(old);
  if(S.hovered) paint(S.hovered);
  var el = globeEl(); if(el) el.style.cursor = S.hovered ? 'pointer' : '';
}
function hoverTick(){
  S.raf = 0;
  if(!S.inside || S.dragging || S.kb) return;
  var cc = countryAtClient(S.px, S.py);
  S.cc = cc;
  setHover(cc || '');
  if(cc) showCard(cc, S.px, S.py, false); else hideCard();
  S.raf = requestAnimationFrame(hoverTick);   // küre dönerken de sürekli yeniden test et
}
function onEnter(e){
  if(e.pointerType === 'touch') return;
  S.inside = true;
  if(!S.dragging && canSpin() && G().spin) startSpin(true);
  if(!S.raf) S.raf = requestAnimationFrame(hoverTick);
}
function onMove(e){
  S.px = e.clientX; S.py = e.clientY;
  if(e.pointerType === 'touch') return;
  S.inside = true;
  if(!S.raf && !S.dragging && !S.kb) S.raf = requestAnimationFrame(hoverTick);
}
function onLeave(e){
  if(e && e.pointerType === 'touch') return;
  S.inside = false;
  if(S.raf){ cancelAnimationFrame(S.raf); S.raf = 0; }
  S.cc = null; setHover(''); hideCard();
  if(!S.dragging && canSpin()) startSpin(false);
}
function onDown(e){
  if(e.pointerType === 'mouse' && e.button !== 0) return;
  S.down = { x: e.clientX, y: e.clientY, t: Date.now(), type: e.pointerType };
  S.dragging = true; stopSpin(); hideCard();
}
function onUp(e){
  var d = S.down; S.down = null;
  if(!S.dragging) return;
  S.dragging = false;
  resumeSpinSoon(300);
  if(!d || e.type === 'pointercancel') return;
  var moved = Math.sqrt(Math.pow(e.clientX - d.x, 2) + Math.pow(e.clientY - d.y, 2));
  if(moved > 6 || Date.now() - d.t > 800) return;
  if(!globeEl() || !globeEl().contains(e.target) && e.target !== globeEl()) return;
  onTap(e.clientX, e.clientY, e.pointerType);
}
function onTap(x, y, type){
  var cc = countryAtClient(x, y);
  if(!cc) return;
  selectFromGlobe(cc);
  if(type === 'touch'){
    showCard(cc, x, y, true);
    clearTimeout(S.hideT);
    S.hideT = setTimeout(hideCard, 3200);
  }
}
function selectFromGlobe(cc){
  var again = (window.CUR_CC || '') === cc;     // seçili ülkeye yeniden tıklamak filtreyi kaldırır
  var g = G(); g._noRotateOnce = true;
  if(typeof window.selectCountry === 'function') window.selectCountry('ddCountry', again ? '' : cc);
  g._noRotateOnce = false;
  var t = document.getElementById('firmsSec');
  if(t && !COARSE){
    var top = t.getBoundingClientRect().top;
    if(top > window.innerHeight * 0.55) t.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  }
}

// ───────────────────────── klavye: hub düğümleri ─────────────────────────
function buildNodes(){
  if(nodesHost || !window.KERVEA_HUBS) return;
  var hero = document.querySelector('.hhero'); if(!hero) return;
  nodesHost = document.createElement('div');
  nodesHost.className = 'kv-gnodes';
  nodesHost.setAttribute('role', 'group');
  hero.appendChild(nodesHost);
  KERVEA_HUBS.forEach(function(h, i){
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'kv-gnode'; b.setAttribute('data-cc', h.cc);
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener('focus', function(){ onNodeFocus(h); });
    b.addEventListener('blur', onNodeBlur);
    b.addEventListener('keydown', function(e){ onNodeKey(e, i); });
    b.addEventListener('click', function(){ selectFromGlobe(h.cc); });
    nodesHost.appendChild(b);
  });
  labelNodes();
}
function labelNodes(){
  if(!nodesHost) return;
  nodesHost.setAttribute('aria-label', tx('gc_group', 'Küre üzerindeki ülkeler'));
  var btns = nodesHost.querySelectorAll('.kv-gnode');
  for(var i = 0; i < btns.length; i++){
    var cc = btns[i].getAttribute('data-cc'), n = countOf(cc);
    btns[i].textContent = nameOf(cc) + (n ? ' — ' + countText(n) : '');
  }
}
function onNodeKey(e, i){
  var btns = nodesHost.querySelectorAll('.kv-gnode'), n = btns.length, j = -1;
  if(e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
  else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
  else if(e.key === 'Home') j = 0;
  else if(e.key === 'End') j = n - 1;
  else if(e.key === 'Escape'){ btns[i].blur(); return; }
  if(j < 0) return;
  e.preventDefault();
  btns[i].tabIndex = -1; btns[j].tabIndex = 0; btns[j].focus();
}
function onNodeFocus(h){
  S.kb = h.cc; S.cc = h.cc;
  stopSpin(); hideCard(); setHover(h.cc);
  rotateToGeo(h.lon, h.lat, function(){
    if(S.kb !== h.cc) return;
    var ch = chart(), el = globeEl(), p = null;
    try{ p = ch.convert({ longitude: h.lon, latitude: h.lat }); }catch(e){}
    var r = el.getBoundingClientRect();
    var x = p ? r.left + p.x : r.left + r.width / 2, y = p ? r.top + p.y : r.top + r.height / 2;
    showCard(h.cc, x, y, true);
  });
}
function onNodeBlur(){
  S.kb = null; S.cc = null; setHover(''); hideCard();
  resumeSpinSoon(400);
}

// ───────────────────────── seçim (ülke listesiyle eşzamanlı) ─────────────────────────
function selectCountry(cc, opts){
  var g = G();
  var old = S.selected; S.selected = String(cc || '').toLowerCase();
  if(old && old !== S.selected) paint(old);
  if(S.selected) paint(S.selected);
  if(!S.selected || !chart()) return;
  var noRotate = (opts && opts.rotate === false) || (g && g._noRotateOnce);
  if(noRotate) return;
  var c = centroidOf(S.selected);
  if(c && !frontSide(c.longitude, c.latitude)) rotateToGeo(c.longitude, c.latitude);
  else if(c){
    // görünür yarımkürede: yalnızca merkeze uzaksa çevir
    var ch = chart(), l0 = -(ch.get('rotationX') || 0), p0 = -(ch.get('rotationY') || 0);
    var d = Math.acos(Math.max(-1, Math.min(1, Math.sin(p0 * Math.PI / 180) * Math.sin(c.latitude * Math.PI / 180) + Math.cos(p0 * Math.PI / 180) * Math.cos(c.latitude * Math.PI / 180) * Math.cos((c.longitude - l0) * Math.PI / 180)))) * 180 / Math.PI;
    if(d > 35) rotateToGeo(c.longitude, c.latitude);
  }
}

// ───────────────────────── gerçek sayılar (GET /kv/stats) ─────────────────────────
function applyStats(){
  var b = (window.KV_STATS && KV_STATS.by_country) || {};
  S.stats = {};
  Object.keys(b).forEach(function(k){ if(+b[k] > 0) S.stats[String(k).toLowerCase()] = +b[k]; });
  if(!C) return;
  paintAll();
  if(S.hubSeries){
    S.hubSeries.dataItems.forEach(function(di){
      var dc = di.dataContext; if(!dc || !dc.pulse) return;
      var has = S.stats[dc.cc] > 0;
      dc.dot.setAll({ fill: has ? C.hubHas : C.hubNone, fillOpacity: has ? 1 : 0.85 });
      dc.pulse.set('visible', has && !REDUCED);
      if(has && !REDUCED && !dc.pulseAnims){
        dc.pulseAnims = [
          dc.pulse.animate({ key: 'scale', from: 0.6, to: 2.4, duration: 2000, loops: Infinity, easingFunction: am5.ease.out(am5.ease.cubic) }),
          dc.pulse.animate({ key: 'opacity', from: 0.5, to: 0, duration: 2000, loops: Infinity })
        ];
      } else if(!has && dc.pulseAnims){
        dc.pulseAnims.forEach(function(a){ try{ a.stop(); }catch(e){} }); dc.pulseAnims = null;
      }
    });
  }
  labelNodes();
}

// ───────────────────────── başlatma ─────────────────────────
window.initAmChartsGlobe = function(){
  if(typeof am5 === 'undefined' || typeof am5map === 'undefined'){ setTimeout(window.initAmChartsGlobe, 200); return; }
  var el = globeEl();
  var g = G();
  if(!el || !g || g.ready) return;
  try {
    am5.ready(function(){
      var root = am5.Root.new('globeMap');
      g.root = root;
      try{ root._logo && root._logo.dispose && root._logo.dispose(); }catch(e){}
      root.setThemes([ am5themes_Animated.new(root) ]);

      var ch = root.container.children.push(am5map.MapChart.new(root, {
        panX: 'rotateX', panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
        homeGeoPoint: { longitude: 30, latitude: 25 },
        homeZoomLevel: 1
      }));
      g.chart = ch;

      C = {
        land: am5.color(0x0d8a80), has: am5.color(0x25b5a2), hov: am5.color(0x8fe9c4), sel: am5.color(0xf0d98a),
        sea: am5.color(0x02100e), grid: am5.color(0x8fe9c4),
        hubHas: am5.color(0xeaf7f2), hubNone: am5.color(0x8fe9c4), label: am5.color(0xeaf7f2)
      };

      var bg = ch.series.push(am5map.MapPolygonSeries.new(root, {}));
      bg.mapPolygons.template.setAll({ fill: C.sea, fillOpacity: 1, strokeOpacity: 0, interactive: false });
      bg.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

      var grat = ch.series.push(am5map.GraticuleSeries.new(root, { step: 15 }));
      grat.mapLines.template.setAll({ strokeOpacity: 0.09, stroke: C.grid, interactive: false });

      var poly = ch.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_worldLow, exclude: ['AQ'] }));
      poly.mapPolygons.template.setAll({
        fill: C.land, fillOpacity: 0.5, stroke: am5.color(0x000000), strokeOpacity: 0.35, strokeWidth: 0.5,
        interactive: false     // hover/tıklama kendi isabet testimizle (küre dönerken de doğru kalsın)
      });
      S.series = poly;

      // Hub noktaları: etiket yalnızca öne çıkan hublarda; nabız yalnızca gerçek firması olan ülkelerde
      var pts = ch.series.push(am5map.MapPointSeries.new(root, {}));
      S.hubSeries = pts;
      pts.bullets.push(function(root_, series, di){
        var dc = di.dataContext;
        var showLbl = dc.main === true;      // yalnızca Türkiye etiketi kalıcı; diğer adlar hover kartında (metinle çakışmasın)
        var box = am5.Container.new(root_, { interactive: false });
        dc.pulse = box.children.push(am5.Circle.new(root_, { radius: 7, fill: C.hubHas, fillOpacity: 0.3, visible: false }));
        dc.dot = box.children.push(am5.Circle.new(root_, { radius: 3.2, fill: C.hubNone, fillOpacity: 0.85, stroke: am5.color(0x04120f), strokeWidth: 1, strokeOpacity: 0.6 }));
        box.children.push(am5.Label.new(root_, {
          text: dc.name, fill: C.label, fontSize: 10.5, fontWeight: '600', fontFamily: 'Georgia, serif',
          centerX: am5.p50, centerY: am5.p100, y: -9,
          background: am5.Rectangle.new(root_, { fill: am5.color(0x04120f), fillOpacity: 0.62 }),
          paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2,
          opacity: showLbl ? 0.95 : 0
        }));
        return am5.Bullet.new(root_, { sprite: box });
      });
      var cn = cnames();
      (window.KERVEA_HUBS || []).forEach(function(h){
        var nm = (cn[h.cc] || h.cc.toUpperCase());
        try{ nm = (lang() === 'tr') ? nm.toLocaleUpperCase('tr-TR') : nm.toUpperCase(); }catch(e){ nm = nm.toUpperCase(); }
        pts.data.push({ geometry: { type: 'Point', coordinates: [h.lon, h.lat] }, name: nm, cc: h.cc, main: !!h.main, featured: !!h.featured });
      });

      S.geo = buildGeoIndex();
      S.selected = String(window.CUR_CC || '').toLowerCase();

      // işaretçi olayları
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', onLeave);
      el.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      window.addEventListener('scroll', function(){ if(!S.kb) hideCard(); }, { passive: true });
      document.addEventListener('visibilitychange', function(){ if(!document.hidden) resumeSpinSoon(200); });

      // dönüş emniyeti: herhangi bir nedenle durursa yeniden başlat
      var lastRot = null;
      setInterval(function(){
        if(!canSpin()) { lastRot = null; return; }
        var r = ch.get('rotationX');
        if(!g.spin || (lastRot !== null && Math.abs(r - lastRot) < 0.01)) startSpin(S.inside && !COARSE);
        lastRot = r;
      }, 2500);

      if(!REDUCED){ startSpin(false); }
      ch.appear(900, 100);
      g.ready = true;
      g.selectCountry = selectCountry;
      g.countryAtClient = countryAtClient;
      g.state = S;
      g.refreshStats = applyStats;
      buildNodes();
      poly.events.once('datavalidated', function(){ applyStats(); paintAll(); });
      setTimeout(function(){ applyStats(); }, 50);
    });
  } catch(err){
    console.error('[Globe] Init hatası:', err);
  }
};

// dil değişince kart ve düğüm etiketleri
document.addEventListener('kv:lang', function(){ refreshCard(); labelNodes(); });
// istatistikler (gerçek firma sayıları) geldiğinde
document.addEventListener('kv:stats', function(){ try{ if(G() && G().ready) applyStats(); }catch(e){} });
})();
