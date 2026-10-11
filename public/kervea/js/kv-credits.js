/* Kervea panel · Krediler
   kervea-api.js yüklendikten sonra çalışır. Kullanılabilir olanlar:
     KV_API(method, url, body) -> Promise<{ok,status,data}>   (CSRF + oturum dahil)
     window.KV_USER, window.KV_ME (ilk /kv/me yanıtı geldikten sonra), kvShowAlert(variant, title, text), escapeHtml()
     document 'kv:member' olayı (detail = /kv/me yanıtı) ve 'kv:panel' olayı (detail.name = açılan sekme)
   Bu dosya yalnızca "Krediler" özelliğine aittir. */
(function(){
'use strict';
})();
