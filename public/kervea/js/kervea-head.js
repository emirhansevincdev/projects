
// ═══════════════════════════════════════════════════════════════
// KERVEA · GÜVENLİK YARDIMCILARI (Faz 9)
// ═══════════════════════════════════════════════════════════════

// XSS Protection: user input'u HTML-safe hale getir
window.escapeHtml = function(str){
  if(str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;');
};

// URL sanitization: sadece http/https/mailto/tel ve relative izin
window.sanitizeUrl = function(url){
  if(!url) return '#';
  var u = String(url).trim();
  // Data/JavaScript URI'leri engelle
  if(/^(javascript|data|vbscript):/i.test(u)) return '#';
  return u;
};

// Inline handler içindeki JS string bağlamı (onclick="fn('...')") için kaçış.
// HTML kaçışı burada yetmez: &#039; öznitelikte tekrar ' olur ve string'den çıkılır.
window.escapeJs = function(str){
  if(str === null || str === undefined) return '';
  return String(str).replace(/[^A-Za-z0-9 _.,:@+\-\u00A0-\uFFFF]/g, function(ch){
    var h = ch.charCodeAt(0).toString(16);
    return '\\u' + ('0000' + h).slice(-4);
  });
};

// Attribute sanitization: quote ve script kaçış
window.escapeAttr = function(str){
  if(str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Global Exception Handling — hata izleme
window.addEventListener('error', function(e){
  // Prod'da Sentry/Rollbar'a gidebilir. Şimdilik konsola.
  try {
    console.error('[Kervea] Global error:', {
      message: e.message,
      source: e.filename,
      line: e.lineno,
      col: e.colno,
      stack: e.error && e.error.stack
    });
    // Sensitive bilgi loglanmasın: e.error kırpılıyor
  } catch(_){}
  // Kullanıcıya sessiz kal, sayfa çalışmaya devam etsin
  return false;
});

window.addEventListener('unhandledrejection', function(e){
  try {
    console.error('[Kervea] Unhandled promise rejection:', e.reason);
  } catch(_){}
  e.preventDefault();
});

// File upload güvenlik doğrulaması (10 MB üst sınır)
window.validateFileUpload = function(file, opts){
  opts = opts || {};
  var maxSize = opts.maxSize || 10 * 1024 * 1024; // 10MB
  var allowedTypes = opts.allowedTypes || /^(image\/(jpeg|png|webp)|application\/pdf)$/i; // SVG (script taşıyabilir) ve GIF kabul edilmez
  var errors = [];
  if(!file) return { ok:false, errors:['Dosya seçilmedi'] };
  if(file.size > maxSize){
    errors.push('Dosya çok büyük (max ' + (maxSize/1024/1024).toFixed(1) + ' MB)');
  }
  if(!file.type || !allowedTypes.test(file.type)){
    errors.push('İzin verilmeyen dosya tipi. Yalnızca JPEG, PNG, WebP' + (opts.allowPdf === false ? '' : ' ve PDF') + ' kabul edilir.');
  }
  // Uzantı çift kontrolü (magic bytes doğrulaması backend'de yapılmalı)
  var name = (file.name || '').toLowerCase();
  var badExt = /\.(exe|bat|sh|cmd|com|scr|vbs|js|mjs|jar|php|phtml|py|rb|pl|dll|msi|ps1|html?|svg|hta|lnk)(\.|$)/i; // çift uzantı dahil (fatura.pdf.exe, logo.php.png)
  if(badExt.test(name) || !/\.(jpe?g|png|webp|pdf)$/i.test(name)){
    errors.push('Güvenlik: bu dosya tipine izin verilmez');
  }
  return { ok: errors.length === 0, errors: errors };
};

// Dosya içeriğinin ilk baytları beyan edilen türle uyuşuyor mu? (uzantı/MIME kolayca sahtelenir)
window.kvSniffFile = function(file, cb){
  try {
    var r = new FileReader();
    r.onload = function(){
      var b = new Uint8Array(r.result), t = '';
      function at(o, arr){ for(var i=0;i<arr.length;i++){ if(b[o+i] !== arr[i]) return false; } return true; }
      if(at(0,[0xFF,0xD8,0xFF])) t = 'image/jpeg';
      else if(at(0,[0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A])) t = 'image/png';
      else if(at(0,[0x52,0x49,0x46,0x46]) && at(8,[0x57,0x45,0x42,0x50])) t = 'image/webp';
      else if(at(0,[0x25,0x50,0x44,0x46,0x2D])) t = 'application/pdf';
      cb(t);
    };
    r.onerror = function(){ cb(''); };
    r.readAsArrayBuffer(file.slice(0, 16));
  } catch(e){ cb(''); }
};
// Tüm dosya alanları için tek kapı: önce doğrula, geçerse sayfanın kendi onchange işleyicisine bırak.
// (Sunucu aynı kontrolleri tekrar yapmalıdır; bu katman atlanabilir.)
document.addEventListener('change', function(e){
  var inp = e.target;
  if(!inp || inp.tagName !== 'INPUT' || inp.type !== 'file') return;
  if(inp.__kvPass){ inp.__kvPass = false; return; }
  e.stopImmediatePropagation();
  var files = Array.prototype.slice.call(inp.files || []);
  if(!files.length) return;
  var pdfOk = /pdf/i.test(inp.getAttribute('accept') || '');
  function reject(msg){
    inp.value = '';
    if(typeof kvShowAlert === 'function') kvShowAlert('destructive', 'Dosya kabul edilmedi', msg);
    else if(typeof toast === 'function') toast(msg);
  }
  if(files.length > 12){ reject('Tek seferde en fazla 12 dosya yüklenebilir.'); return; }
  var i = 0;
  (function next(){
    if(i >= files.length){ inp.__kvPass = true; inp.dispatchEvent(new Event('change', {bubbles:true})); return; }
    var f = files[i++], isPdf = f.type === 'application/pdf';
    if(isPdf && !pdfOk){ reject('Bu alana yalnızca görsel (JPEG, PNG, WebP) yüklenebilir.'); return; }
    var v = validateFileUpload(f, { maxSize: (isPdf ? 40 : 10) * 1024 * 1024, allowPdf: pdfOk });
    if(!v.ok){ reject(v.errors[0]); return; }
    kvSniffFile(f, function(real){
      if(real !== f.type){ reject('Dosyanın içeriği uzantısıyla uyuşmuyor.'); return; }
      next();
    });
  })();
}, true);

// Clickjacking koruması. frame-ancestors yalnızca HTTP başlığında geçerlidir; <meta> içinde tarayıcı
// yok sayar. Sunucu başlığı gelene kadar: sayfa yabancı bir kaynağın çerçevesindeyse içeriği gösterme.
(function(){
  try {
    if(window.top === window.self) return;
    var same = false;
    try { same = (window.top.location.origin === window.location.origin) && window.location.origin !== 'null'; } catch(e){ same = false; }
    if(same) return;
    document.documentElement.style.display = 'none';
    try { window.top.location = window.self.location.href; } catch(e){}
  } catch(e){}
})();

// Kaba kuvvet (brute force) freni — kalıcı, artan bekleme süreli.
// ÖNEMLİ: Bu yalnızca arayüz freni. Saldırgan tarayıcıyı atlayıp doğrudan sunucuya istek atabilir;
// asıl koruma sunucuda (hesap+IP bazlı limit, kilit, CAPTCHA) yapılmalıdır.
// Backend bağlanınca: 401 yanıtında kvLoginGuard.fail(), başarılı girişte kvLoginGuard.ok() çağrılır.
window.kvLoginGuard = (function(){
  var KEY = 'kervea_lg', FREE = 5, STEPS = [1, 5, 15, 60]; // dk
  function read(){ try { return JSON.parse(localStorage.getItem(KEY)) || {n:0,until:0,lvl:0}; } catch(e){ return {n:0,until:0,lvl:0}; } }
  function write(o){ try { localStorage.setItem(KEY, JSON.stringify(o)); } catch(e){} }
  return {
    waitMs: function(){ var o = read(); return Math.max(0, (o.until||0) - Date.now()); },
    fail: function(){
      var o = read(); o.n = (o.n||0) + 1;
      if(o.n >= FREE){ var l = Math.min(o.lvl||0, STEPS.length-1); o.until = Date.now() + STEPS[l]*60000; o.lvl = (o.lvl||0) + 1; o.n = 0; }
      write(o); return o;
    },
    ok: function(){ write({n:0,until:0,lvl:0}); }
  };
})();

// LocalStorage sensitive data koruması — key prefix zorunluluğu
window.safeStorage = {
  set: function(key, value){
    try {
      // Sensitive key'leri engelle (token, password, secret)
      if(/token|password|secret|apikey|api_key/i.test(key)){
        console.warn('[Kervea] Sensitive key localStorage\'a yazılmıyor:', key);
        return false;
      }
      localStorage.setItem('kervea_' + key, JSON.stringify(value));
      return true;
    } catch(e){ return false; }
  },
  get: function(key){
    try {
      var v = localStorage.getItem('kervea_' + key);
      return v ? JSON.parse(v) : null;
    } catch(e){ return null; }
  },
  remove: function(key){
    try { localStorage.removeItem('kervea_' + key); return true; } catch(e){ return false; }
  }
};

// Rate Limiting (client-side — sadece UX koruması, backend'te de olmalı)
window.rateLimit = (function(){
  var buckets = {};
  return function(key, maxPerMinute){
    var now = Date.now();
    if(!buckets[key]) buckets[key] = [];
    // 1 dakika içindeki eylemleri say
    buckets[key] = buckets[key].filter(function(t){ return now - t < 60000; });
    if(buckets[key].length >= (maxPerMinute || 30)){
      return false; // limit aşıldı
    }
    buckets[key].push(now);
    return true;
  };
})();



  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 2000
  });
(function () {
  try {
    if (typeof Node === "undefined" || !Node.prototype) return;
    if (typeof window !== "undefined") {
      if (window.__kerveaTranslateGuardInstalled__) return;
      window.__kerveaTranslateGuardInstalled__ = true;
    }
    var originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child && child.parentNode !== this) return child;
      return originalRemoveChild.apply(this, arguments);
    };
    var originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) return newNode;
      return originalInsertBefore.apply(this, arguments);
    };
  } catch (e) { /* Sessiz — koruma katmanı sayfayı bozmamalı */ }
})();