/* Kervea panel · Kişiler
   kervea-api.js yüklendikten sonra çalışır. Kullanılabilir olanlar:
     KV_API(method, url, body) -> Promise<{ok,status,data}>   (CSRF + oturum dahil)
     window.KV_USER, window.KV_ME (ilk /kv/me yanıtı geldikten sonra), kvShowAlert(variant, title, text), escapeHtml()
     document 'kv:member' olayı (detail = /kv/me yanıtı) ve 'kv:panel' olayı (detail.name = açılan sekme)
   Bu dosya yalnızca "Kişiler" özelliğine aittir: prototipin sahte PEOPLE listesi yerine GET /kv/people (yalnızca BAŞKA sektörlerin kişileri),
   e-posta/telefon yalnızca POST /kv/people/{id}/reveal ile (kredi harcar, aynı kanalı tekrar açmak ücretsizdir), KVKK kaldırma başvurusu.
   Kişi bilgisi sunucudan açılmadan hiçbir zaman sayfaya gelmez. Kredi bakiyesi/penceresi kv-credits.js'tedir (window.KVC). */
(function(){
'use strict';

var API = window.KV_API;
function $(id){ return document.getElementById(id); }
function esc(s){ return window.escapeHtml ? window.escapeHtml(s) : String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function lang(){ return (typeof LANG!=='undefined' && LANG) || 'tr'; }
function locale(){ if(typeof window.kvLocale==='function') return window.kvLocale(); return ({tr:'tr-TR',en:'en-GB',es:'es-ES',fr:'fr-FR',ar:'ar',ru:'ru-RU'})[lang()] || 'tr-TR'; }
function alertMsg(v,ti,tx){ if(typeof kvShowAlert==='function') kvShowAlert(v,ti,tx); else if(typeof toast==='function') toast(ti+' – '+tx); }
function I18N(){ return (window.KVC && KVC.i18n) || null; }

// ───────────────────────── çeviriler ─────────────────────────
var X = {
 tr:{
  ppl_sub:'Kendi sektörünüzün dışındaki firmalarda karar vericilere doğrudan erişim. Her e-posta veya telefon bilgisi {cost} kredi.',
  ppl_empty:'Bu kriterlere uyan kişi yok',
  kvp_rule:'Burada kendi sektörünüz dışındaki kişiler listelenir. Kendi sektörünüzdeki firmalara Eşleşmeler sekmesinden ulaşırsınız.',
  kvp_all_countries:'Tüm ülkeler', kvp_country:'Ülke', kvp_open:'Aç', kvp_open_email:'E-posta adresini {cost} krediyle aç', kvp_open_phone:'Telefon numarasını {cost} krediyle aç',
  kvp_na:'Kayıtlı değil', kvp_copy:'Kopyala', kvp_copied:'Panoya kopyalandı', kvp_details:'Ayrıntı', kvp_close:'Kapat',
  kvp_empty_all:'Şu an kendi sektörünüz dışında listelenmiş kişi yok.',
  kvp_err:'Liste yüklenemedi.', kvp_retry:'Tekrar dene', kvp_noperm:'Kişiler bölümünü kullanma yetkiniz yok. Firma yöneticinizden isteyin.',
  kvp_page:'Sayfa {page} / {pages}', kvp_total:'{total} kişi', kvp_prev:'Önceki', kvp_next:'Sonraki',
  kvp_opened_email:'E-posta açıldı · {n} kredi kullanıldı', kvp_opened_phone:'Telefon açıldı · {n} kredi kullanıldı', kvp_already:'Daha önce açılmıştı; kredi harcanmadı.',
  kvp_nc_h:'Krediniz yetersiz', kvp_nc_t:'Bu bilgiyi açmak için {need} kredi gerekir. Kredi paketi alabilirsiniz.',
  kvp_limit_h:'Günlük limit doldu', kvp_limit_t:'Bugün için kişi bilgisi açma limitine ulaştınız. Yarın tekrar deneyin.',
  kvp_nodata:'Bu kişi için bu bilgi kayıtlı değil.', kvp_gone:'Bu kişi artık listede değil.', kvp_fail:'İşlem yapılamadı', kvp_rate:'Çok sık deneme. Biraz sonra tekrar deneyin.',
  kvp_d_contact:'İletişim', kvp_d_firm:'Firma', kvp_d_country:'Ülke', kvp_d_sector:'Sektör', kvp_d_dept:'Bölüm', kvp_d_linkedin:'LinkedIn profili', kvp_d_locked:'Kredi ile açılır',
  kvp_dept_ceo:'CEO / Kurucu', kvp_dept_purchasing:'Satın alma', kvp_dept_sales:'Satış', kvp_dept_export:'İhracat / İthalat', kvp_dept_ops:'Operasyon', kvp_dept_other:'Diğer',
  kvp_rm_h:'KVKK kaldırma başvurusu', kvp_rm_intro:'Bu listede yer alan bilgilerinizin kaldırılmasını isteyebilirsiniz. Başvurunuz kaydedilir ve ekibimiz tarafından incelenir.',
  kvp_rm_name:'Kaldırılması istenen kişinin adı soyadı', kvp_rm_email:'Kişinin e-posta adresi (varsa)', kvp_rm_ref:'Firma adı veya profil bağlantısı (isteğe bağlı)',
  kvp_rm_you:'Sizin adınız soyadınız', kvp_rm_you_email:'Sizin e-posta adresiniz', kvp_rm_reason:'Gerekçe', kvp_rm_send:'Başvuruyu gönder',
  kvp_rm_ok_h:'Başvurunuz alındı', kvp_rm_ok_t:'Talebiniz kaydedildi ve ekibimiz tarafından incelenecek.', kvp_rm_missing:'Lütfen zorunlu alanları doldurun.'
 },
 en:{
  ppl_sub:'Direct access to decision makers at companies outside your own sector. Each e-mail or phone costs {cost} credit.',
  ppl_empty:'No people match these criteria',
  kvp_rule:'People outside your own sector are listed here. Companies in your own sector are reached from the Matches tab.',
  kvp_all_countries:'All countries', kvp_country:'Country', kvp_open:'Open', kvp_open_email:'Open the e-mail address for {cost} credit', kvp_open_phone:'Open the phone number for {cost} credit',
  kvp_na:'Not on file', kvp_copy:'Copy', kvp_copied:'Copied to clipboard', kvp_details:'Details', kvp_close:'Close',
  kvp_empty_all:'There is nobody listed outside your sector yet.',
  kvp_err:'The list could not be loaded.', kvp_retry:'Try again', kvp_noperm:'You are not allowed to use People. Ask your company administrator.',
  kvp_page:'Page {page} / {pages}', kvp_total:'{total} people', kvp_prev:'Previous', kvp_next:'Next',
  kvp_opened_email:'E-mail opened · {n} credit used', kvp_opened_phone:'Phone opened · {n} credit used', kvp_already:'Opened before; no credit was used.',
  kvp_nc_h:'Not enough credits', kvp_nc_t:'Opening this needs {need} credit. You can buy a credit pack.',
  kvp_limit_h:'Daily limit reached', kvp_limit_t:'You have reached today\'s limit for opening contact details. Try again tomorrow.',
  kvp_nodata:'This detail is not on file for this person.', kvp_gone:'This person is no longer listed.', kvp_fail:'Action failed', kvp_rate:'Too many attempts. Please try again in a moment.',
  kvp_d_contact:'Contact', kvp_d_firm:'Company', kvp_d_country:'Country', kvp_d_sector:'Sector', kvp_d_dept:'Department', kvp_d_linkedin:'LinkedIn profile', kvp_d_locked:'Opens with credits',
  kvp_dept_ceo:'CEO / Founder', kvp_dept_purchasing:'Purchasing', kvp_dept_sales:'Sales', kvp_dept_export:'Export / Import', kvp_dept_ops:'Operations', kvp_dept_other:'Other',
  kvp_rm_h:'Removal request (KVKK / GDPR)', kvp_rm_intro:'You can ask for your details to be removed from this list. Your request is recorded and reviewed by our team.',
  kvp_rm_name:'Full name of the person to remove', kvp_rm_email:'E-mail address of that person (if known)', kvp_rm_ref:'Company name or profile link (optional)',
  kvp_rm_you:'Your full name', kvp_rm_you_email:'Your e-mail address', kvp_rm_reason:'Reason', kvp_rm_send:'Send request',
  kvp_rm_ok_h:'Request received', kvp_rm_ok_t:'Your request has been recorded and will be reviewed by our team.', kvp_rm_missing:'Please fill in the required fields.'
 },
 es:{
  ppl_sub:'Acceso directo a decisores de empresas fuera de su propio sector. Cada correo o teléfono cuesta {cost} crédito.',
  ppl_empty:'Ninguna persona coincide con estos criterios',
  kvp_rule:'Aquí se listan personas de fuera de su sector. A las empresas de su propio sector llega desde la pestaña Coincidencias.',
  kvp_all_countries:'Todos los países', kvp_country:'País', kvp_open:'Abrir', kvp_open_email:'Abrir el correo por {cost} crédito', kvp_open_phone:'Abrir el teléfono por {cost} crédito',
  kvp_na:'No registrado', kvp_copy:'Copiar', kvp_copied:'Copiado al portapapeles', kvp_details:'Detalles', kvp_close:'Cerrar',
  kvp_empty_all:'Todavía no hay nadie listado fuera de su sector.',
  kvp_err:'No se pudo cargar la lista.', kvp_retry:'Reintentar', kvp_noperm:'No tiene permiso para usar Personas. Consulte al administrador de su empresa.',
  kvp_page:'Página {page} / {pages}', kvp_total:'{total} personas', kvp_prev:'Anterior', kvp_next:'Siguiente',
  kvp_opened_email:'Correo abierto · {n} crédito usado', kvp_opened_phone:'Teléfono abierto · {n} crédito usado', kvp_already:'Ya estaba abierto; no se gastó ningún crédito.',
  kvp_nc_h:'Créditos insuficientes', kvp_nc_t:'Abrir esto requiere {need} crédito. Puede comprar un paquete de créditos.',
  kvp_limit_h:'Límite diario alcanzado', kvp_limit_t:'Ha alcanzado el límite de hoy para abrir datos de contacto. Inténtelo mañana.',
  kvp_nodata:'Este dato no está registrado para esta persona.', kvp_gone:'Esta persona ya no figura en la lista.', kvp_fail:'No se pudo completar', kvp_rate:'Demasiados intentos. Inténtelo en un momento.',
  kvp_d_contact:'Contacto', kvp_d_firm:'Empresa', kvp_d_country:'País', kvp_d_sector:'Sector', kvp_d_dept:'Departamento', kvp_d_linkedin:'Perfil de LinkedIn', kvp_d_locked:'Se abre con créditos',
  kvp_dept_ceo:'CEO / Fundador', kvp_dept_purchasing:'Compras', kvp_dept_sales:'Ventas', kvp_dept_export:'Exportación / Importación', kvp_dept_ops:'Operaciones', kvp_dept_other:'Otro',
  kvp_rm_h:'Solicitud de eliminación (KVKK / RGPD)', kvp_rm_intro:'Puede solicitar que sus datos se eliminen de esta lista. Su solicitud se registra y la revisa nuestro equipo.',
  kvp_rm_name:'Nombre completo de la persona a eliminar', kvp_rm_email:'Correo de esa persona (si lo conoce)', kvp_rm_ref:'Empresa o enlace del perfil (opcional)',
  kvp_rm_you:'Su nombre completo', kvp_rm_you_email:'Su correo electrónico', kvp_rm_reason:'Motivo', kvp_rm_send:'Enviar solicitud',
  kvp_rm_ok_h:'Solicitud recibida', kvp_rm_ok_t:'Su solicitud se ha registrado y será revisada por nuestro equipo.', kvp_rm_missing:'Rellene los campos obligatorios.'
 },
 fr:{
  ppl_sub:'Accès direct aux décideurs d\'entreprises hors de votre secteur. Chaque e-mail ou téléphone coûte {cost} crédit.',
  ppl_empty:'Aucune personne ne correspond à ces critères',
  kvp_rule:'Les personnes hors de votre secteur sont listées ici. Les entreprises de votre secteur se trouvent dans l\'onglet Correspondances.',
  kvp_all_countries:'Tous les pays', kvp_country:'Pays', kvp_open:'Ouvrir', kvp_open_email:'Ouvrir l\'e-mail pour {cost} crédit', kvp_open_phone:'Ouvrir le téléphone pour {cost} crédit',
  kvp_na:'Non renseigné', kvp_copy:'Copier', kvp_copied:'Copié dans le presse-papiers', kvp_details:'Détails', kvp_close:'Fermer',
  kvp_empty_all:'Personne n\'est encore listé hors de votre secteur.',
  kvp_err:'Impossible de charger la liste.', kvp_retry:'Réessayer', kvp_noperm:'Vous n\'avez pas le droit d\'utiliser Personnes. Demandez à l\'administrateur de votre entreprise.',
  kvp_page:'Page {page} / {pages}', kvp_total:'{total} personnes', kvp_prev:'Précédent', kvp_next:'Suivant',
  kvp_opened_email:'E-mail ouvert · {n} crédit utilisé', kvp_opened_phone:'Téléphone ouvert · {n} crédit utilisé', kvp_already:'Déjà ouvert ; aucun crédit utilisé.',
  kvp_nc_h:'Crédits insuffisants', kvp_nc_t:'L\'ouverture nécessite {need} crédit. Vous pouvez acheter un pack de crédits.',
  kvp_limit_h:'Limite quotidienne atteinte', kvp_limit_t:'Vous avez atteint la limite du jour pour ouvrir des coordonnées. Réessayez demain.',
  kvp_nodata:'Cette information n\'est pas renseignée pour cette personne.', kvp_gone:'Cette personne n\'est plus listée.', kvp_fail:'Action impossible', kvp_rate:'Trop de tentatives. Réessayez dans un instant.',
  kvp_d_contact:'Contact', kvp_d_firm:'Entreprise', kvp_d_country:'Pays', kvp_d_sector:'Secteur', kvp_d_dept:'Service', kvp_d_linkedin:'Profil LinkedIn', kvp_d_locked:'S\'ouvre avec des crédits',
  kvp_dept_ceo:'PDG / Fondateur', kvp_dept_purchasing:'Achats', kvp_dept_sales:'Ventes', kvp_dept_export:'Export / Import', kvp_dept_ops:'Opérations', kvp_dept_other:'Autre',
  kvp_rm_h:'Demande de suppression (KVKK / RGPD)', kvp_rm_intro:'Vous pouvez demander la suppression de vos données de cette liste. Votre demande est enregistrée et examinée par notre équipe.',
  kvp_rm_name:'Nom complet de la personne à supprimer', kvp_rm_email:'E-mail de cette personne (si connu)', kvp_rm_ref:'Entreprise ou lien du profil (facultatif)',
  kvp_rm_you:'Votre nom complet', kvp_rm_you_email:'Votre adresse e-mail', kvp_rm_reason:'Motif', kvp_rm_send:'Envoyer la demande',
  kvp_rm_ok_h:'Demande reçue', kvp_rm_ok_t:'Votre demande a été enregistrée et sera examinée par notre équipe.', kvp_rm_missing:'Veuillez remplir les champs obligatoires.'
 },
 ar:{
  ppl_sub:'وصول مباشر إلى صنّاع القرار في شركات خارج قطاعك. كل بريد إلكتروني أو هاتف يكلّف {cost} رصيد.',
  ppl_empty:'لا يوجد أشخاص مطابقون لهذه المعايير',
  kvp_rule:'تُعرض هنا أسماء من خارج قطاعك. أما الشركات في قطاعك فتصل إليها من تبويب المطابقات.',
  kvp_all_countries:'كل الدول', kvp_country:'الدولة', kvp_open:'فتح', kvp_open_email:'افتح البريد الإلكتروني مقابل {cost} رصيد', kvp_open_phone:'افتح رقم الهاتف مقابل {cost} رصيد',
  kvp_na:'غير مسجّل', kvp_copy:'نسخ', kvp_copied:'تم النسخ', kvp_details:'التفاصيل', kvp_close:'إغلاق',
  kvp_empty_all:'لا يوجد حاليًا أشخاص من خارج قطاعك في القائمة.',
  kvp_err:'تعذّر تحميل القائمة.', kvp_retry:'أعد المحاولة', kvp_noperm:'ليست لديك صلاحية استخدام الأشخاص. اطلب ذلك من مسؤول شركتك.',
  kvp_page:'الصفحة {page} / {pages}', kvp_total:'{total} شخص', kvp_prev:'السابق', kvp_next:'التالي',
  kvp_opened_email:'تم فتح البريد · استُخدم {n} رصيد', kvp_opened_phone:'تم فتح الهاتف · استُخدم {n} رصيد', kvp_already:'سبق فتحه؛ لم يُستهلك أي رصيد.',
  kvp_nc_h:'الرصيد غير كافٍ', kvp_nc_t:'يتطلب الفتح {need} رصيد. يمكنك شراء باقة أرصدة.',
  kvp_limit_h:'تم بلوغ الحد اليومي', kvp_limit_t:'بلغت حد اليوم لفتح بيانات التواصل. حاول غدًا.',
  kvp_nodata:'هذه البيانات غير مسجّلة لهذا الشخص.', kvp_gone:'لم يعد هذا الشخص في القائمة.', kvp_fail:'تعذّر تنفيذ العملية', kvp_rate:'محاولات كثيرة. حاول بعد قليل.',
  kvp_d_contact:'التواصل', kvp_d_firm:'الشركة', kvp_d_country:'الدولة', kvp_d_sector:'القطاع', kvp_d_dept:'القسم', kvp_d_linkedin:'ملف LinkedIn', kvp_d_locked:'يُفتح بالأرصدة',
  kvp_dept_ceo:'المدير التنفيذي / المؤسس', kvp_dept_purchasing:'المشتريات', kvp_dept_sales:'المبيعات', kvp_dept_export:'التصدير / الاستيراد', kvp_dept_ops:'العمليات', kvp_dept_other:'أخرى',
  kvp_rm_h:'طلب إزالة (KVKK / GDPR)', kvp_rm_intro:'يمكنك طلب إزالة بياناتك من هذه القائمة. يُسجَّل طلبك ويراجعه فريقنا.',
  kvp_rm_name:'الاسم الكامل للشخص المطلوب إزالته', kvp_rm_email:'البريد الإلكتروني لذلك الشخص (إن عُرف)', kvp_rm_ref:'اسم الشركة أو رابط الملف (اختياري)',
  kvp_rm_you:'اسمك الكامل', kvp_rm_you_email:'بريدك الإلكتروني', kvp_rm_reason:'السبب', kvp_rm_send:'إرسال الطلب',
  kvp_rm_ok_h:'تم استلام الطلب', kvp_rm_ok_t:'سُجّل طلبك وسيراجعه فريقنا.', kvp_rm_missing:'يرجى ملء الحقول المطلوبة.'
 },
 ru:{
  ppl_sub:'Прямой доступ к лицам, принимающим решения, в компаниях вне вашей отрасли. Каждый e-mail или телефон — {cost} кредит.',
  ppl_empty:'Нет людей, подходящих под эти условия',
  kvp_rule:'Здесь перечислены люди вне вашей отрасли. К компаниям вашей отрасли вы переходите на вкладке «Совпадения».',
  kvp_all_countries:'Все страны', kvp_country:'Страна', kvp_open:'Открыть', kvp_open_email:'Открыть e-mail за {cost} кредит', kvp_open_phone:'Открыть телефон за {cost} кредит',
  kvp_na:'Нет данных', kvp_copy:'Копировать', kvp_copied:'Скопировано', kvp_details:'Подробнее', kvp_close:'Закрыть',
  kvp_empty_all:'Вне вашей отрасли пока никого нет в списке.',
  kvp_err:'Не удалось загрузить список.', kvp_retry:'Повторить', kvp_noperm:'У вас нет права пользоваться разделом «Контакты». Обратитесь к администратору компании.',
  kvp_page:'Страница {page} / {pages}', kvp_total:'{total} чел.', kvp_prev:'Назад', kvp_next:'Далее',
  kvp_opened_email:'E-mail открыт · списано кредитов: {n}', kvp_opened_phone:'Телефон открыт · списано кредитов: {n}', kvp_already:'Уже было открыто; кредиты не списаны.',
  kvp_nc_h:'Недостаточно кредитов', kvp_nc_t:'Для открытия нужно кредитов: {need}. Вы можете купить пакет кредитов.',
  kvp_limit_h:'Дневной лимит исчерпан', kvp_limit_t:'Вы достигли сегодняшнего лимита на открытие контактов. Повторите завтра.',
  kvp_nodata:'Этих данных для этого человека нет.', kvp_gone:'Этого человека больше нет в списке.', kvp_fail:'Не удалось выполнить', kvp_rate:'Слишком много попыток. Повторите чуть позже.',
  kvp_d_contact:'Контакты', kvp_d_firm:'Компания', kvp_d_country:'Страна', kvp_d_sector:'Отрасль', kvp_d_dept:'Отдел', kvp_d_linkedin:'Профиль LinkedIn', kvp_d_locked:'Открывается за кредиты',
  kvp_dept_ceo:'CEO / Основатель', kvp_dept_purchasing:'Закупки', kvp_dept_sales:'Продажи', kvp_dept_export:'Экспорт / Импорт', kvp_dept_ops:'Операции', kvp_dept_other:'Другое',
  kvp_rm_h:'Заявка на удаление (KVKK / GDPR)', kvp_rm_intro:'Вы можете попросить удалить ваши данные из этого списка. Заявка фиксируется и рассматривается нашей командой.',
  kvp_rm_name:'Полное имя человека, данные которого нужно удалить', kvp_rm_email:'E-mail этого человека (если известен)', kvp_rm_ref:'Компания или ссылка на профиль (необязательно)',
  kvp_rm_you:'Ваше полное имя', kvp_rm_you_email:'Ваш e-mail', kvp_rm_reason:'Причина', kvp_rm_send:'Отправить заявку',
  kvp_rm_ok_h:'Заявка получена', kvp_rm_ok_t:'Ваша заявка записана и будет рассмотрена нашей командой.', kvp_rm_missing:'Заполните обязательные поля.'
 }
};
if(I18N()) I18N().register(X); else if(window.T){ Object.keys(X).forEach(function(l){ window.T[l]=window.T[l]||{}; Object.assign(window.T[l], X[l]); }); }
function t(k, fb, extra){ var i=I18N(); return i ? i.t(k, fb, extra) : (fb||''); }

// ───────────────────────── durum ─────────────────────────
var S = { q:'', dept:'all', cc:'', page:1, data:null, items:[], loading:false, err:null, stamp:0, seq:0, pending:{}, openId:null };
function can(){ var p=(window.KV_USER&&window.KV_USER.perms)||[]; return p.indexOf('people')!==-1; }
function intFmt(n){ try{ return new Intl.NumberFormat(locale()).format(n); }catch(e){ return String(n); } }
function cost(ch){ var c=(window.KVC&&KVC.data&&KVC.data.costs)||(S.data&&S.data.costs)||{}; return c[ch]!=null ? c[ch] : 1; }
function countryName(cc){ var d=(typeof CI!=='undefined' && (CI[lang()]||CI.tr))||{}; return d[cc] || String(cc||'').toUpperCase(); }
function sectorName(idx){ var s=(typeof SI!=='undefined' && (SI[lang()]||SI.tr))||[]; return (idx!=null && s[idx]) || ''; }
function initialsOf(nm){ var p=String(nm||'').trim().split(/\s+/); return ((p[0]||'?').charAt(0)+(p.length>1?p[p.length-1].charAt(0):'')).toUpperCase(); }
function palette(i){ if(typeof window.avatarColor==='function') return window.avatarColor(i); var pals=[['#0D8A80','#0A5F56'],['#8b5cf6','#6366f1'],['#c78a2a','#e6a54a'],['#3b82f6','#60a5fa'],['#c94040','#dc6b6b'],['#8a5a2e','#b47a49']]; return pals[i%pals.length]; }
var BOLT='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
var MAIL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>';
var PHONE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
var CHECK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
var COPY='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';

// ───────────────────────── liste ─────────────────────────
function query(){
  var qs=['page='+S.page];
  if(S.q) qs.push('q='+encodeURIComponent(S.q));
  if(S.dept!=='all') qs.push('dept='+encodeURIComponent(S.dept));
  if(S.cc) qs.push('country='+encodeURIComponent(S.cc));
  return qs.join('&');
}
function load(){
  if(!window.KV_USER) return;
  var my=++S.seq; S.loading=true; S.err=null; draw();
  API('GET','/kv/people?'+query()).then(function(r){
    if(my!==S.seq) return;                                   // a newer request is on its way
    S.loading=false;
    if(r.ok){
      S.data=r.data; S.items=r.data.items||[]; S.stamp=Date.now(); S.err=null;
      if(S.page>r.data.pages && r.data.pages>=1 && S.page>1){ S.page=r.data.pages; load(); return; }
      if(window.KVC && r.data.balance!=null) KVC.setBalance(r.data.balance);
    } else if(r.status===403){ S.err='noperm'; }
    else { S.err='fail'; }
    draw();
  });
}
document.addEventListener('kv:logout', function(){ S.seq++; S.data=null; S.items=[]; S.stamp=0; S.err=null; S.loading=false; S.q=''; S.dept='all'; S.cc=''; S.page=1; S.openId=null; S.pending={}; try{ draw(); }catch(e){} });
function fresh(){ if(S.loading){ draw(); return; } if(!S.data || Date.now()-S.stamp>20000) load(); else draw(); }

function chCell(p, ch){
  var has = ch==='email' ? p.has_email : p.has_phone;
  if(!has) return '<span class="reveal-btn no" title="'+esc(t('kvp_na','Kayıtlı değil'))+'">—</span>';
  var val = p[ch];
  if(p[ch+'_opened'] && val){
    return '<span class="reveal-btn revealed kv-val" dir="ltr" title="'+esc(val)+'">'+CHECK+'<span class="kv-vt">'+esc(val)+'</span><button type="button" class="kv-cp" title="'+esc(t('kvp_copy','Kopyala'))+'" aria-label="'+esc(t('kvp_copy','Kopyala'))+'" onclick="event.stopPropagation();kvPplCopy(\''+p.id+'\',\''+ch+'\')">'+COPY+'</button></span>';
  }
  var key=p.id+':'+ch, busy=S.pending[key];
  var title=t(ch==='email'?'kvp_open_email':'kvp_open_phone','',{cost:cost(ch)});
  return '<button type="button" class="reveal-btn kv-open'+(busy?' busy':'')+'" '+(busy?'disabled ':'')+'title="'+esc(title)+'" aria-label="'+esc(title)+'" onclick="event.stopPropagation();kvPplReveal('+p.id+',\''+ch+'\')">'+(ch==='email'?MAIL:PHONE)+'<span>'+esc(t('kvp_open','Aç'))+'</span><i class="kv-cost">'+BOLT+cost(ch)+'</i></button>';
}
function rowHtml(p, i){
  var col=palette(p.id||i);
  var secN=sectorName(p.sec);
  return '<div class="ppl-row kv" data-id="'+p.id+'">'+
    '<div class="ppl-nm" role="button" tabindex="0" onclick="openPersonDrawer('+p.id+')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openPersonDrawer('+p.id+')}"><div class="av" style="background:linear-gradient(135deg,'+col[0]+','+col[1]+')">'+esc(initialsOf(p.name))+'</div><div style="min-width:0"><b>'+esc(p.name)+'</b><span>'+esc(countryName(p.cc))+'</span></div></div>'+
    '<div class="ppl-cmp col-cmp"><div style="min-width:0"><b>'+(p.cc?'<img src="/flags/'+esc(p.cc)+'.svg" alt="" onerror="this.style.display=\'none\'"/>':'')+esc(p.company)+'</b><span>'+esc(secN)+'</span></div></div>'+
    '<div class="ppl-ttl col-ttl">'+esc(p.title||'')+'</div>'+
    '<div class="kv-ch kv-em">'+chCell(p,'email')+'</div>'+
    '<div class="kv-ch col-phn kv-phn">'+chCell(p,'phone')+'</div>'+
    '<div class="ppl-act col-act"><button type="button" title="'+esc(t('kvp_details','Ayrıntı'))+'" aria-label="'+esc(t('kvp_details','Ayrıntı'))+'" onclick="openPersonDrawer('+p.id+')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></div>'+
  '</div>';
}
function skeleton(){ var s=''; for(var i=0;i<4;i++) s+='<div class="ppl-row kv kv-skel-row" aria-hidden="true"><div class="kv-skel" style="width:70%"></div><div class="kv-skel col-cmp" style="width:60%"></div><div class="kv-skel col-ttl" style="width:50%"></div><div class="kv-skel" style="width:60px"></div><div class="kv-skel col-phn" style="width:60px"></div><div class="col-act"></div></div>'; return s; }
function msgBlock(text, withRetry){
  return '<div class="kv-ppl-state"><p>'+esc(text)+'</p>'+(withRetry?'<button type="button" class="btn sec sm" onclick="kvPplReload()">'+esc(t('kvp_retry','Tekrar dene'))+'</button>':'')+'</div>';
}
function draw(){
  var body=$('pplBody'); if(!body) return;
  body.classList.remove('locked');
  var old=$('pplPwOverlay'); if(old) old.remove();                      // the prototype's Premium paywall does not apply: credits unlock people
  if(S.err==='noperm') body.innerHTML=msgBlock(t('kvp_noperm','Yetkiniz yok.'),false);
  else if(S.err) body.innerHTML=msgBlock(t('kvp_err','Liste yüklenemedi.'),true);
  else if(S.loading && !S.data) body.innerHTML=skeleton();
  else if(!S.items.length){
    var filtered = !!(S.q || S.dept!=='all' || S.cc);
    body.innerHTML=msgBlock(filtered ? t('kvp_empty','Bu kriterlere uyan kişi yok') : t('kvp_empty_all','Henüz listelenmiş kişi yok.'),false);
  } else body.innerHTML=S.items.map(rowHtml).join('');
  body.style.opacity = (S.loading && S.data) ? '.55' : '';
  drawCountries(); drawPager();
  var r=$('kvPplRule'); if(r) r.hidden=!!S.err;
}
function drawCountries(){
  var sel=$('kvPplCountry'); if(!sel) return;
  var list=(S.data&&S.data.countries)||[], cur=S.cc;
  var all=t('kvp_all_countries','Tüm ülkeler');
  var opts='<option value="">'+esc(all)+'</option>'+list.slice().sort(function(a,b){ return countryName(a).localeCompare(countryName(b), locale()); }).map(function(cc){ return '<option value="'+esc(cc)+'"'+(cc===cur?' selected':'')+'>'+esc(countryName(cc))+'</option>'; }).join('');
  if(sel.getAttribute('data-sig')!==opts){ sel.innerHTML=opts; sel.setAttribute('data-sig',opts); }
  sel.value=cur;
}
function drawPager(){
  var box=$('kvPplPager'); if(!box) return;
  var d=S.data; if(!d || S.err || !S.items.length && d.total===0){ box.innerHTML=''; return; }
  box.innerHTML='<span class="kv-pg-info">'+esc(t('kvp_total','',{total:intFmt(d.total)}))+'</span>'+
    '<div class="kv-pg-btns"><button type="button" class="btn sec sm" '+(d.page<=1?'disabled ':'')+'onclick="kvPplPage(-1)">‹ '+esc(t('kvp_prev','Önceki'))+'</button>'+
    '<span class="kv-pg-cur">'+esc(t('kvp_page','',{page:d.page,pages:d.pages}))+'</span>'+
    '<button type="button" class="btn sec sm" '+(d.page>=d.pages?'disabled ':'')+'onclick="kvPplPage(1)">'+esc(t('kvp_next','Sonraki'))+' ›</button></div>';
}
window.kvPplPage = function(dir){ var d=S.data; if(!d) return; var n=S.page+dir; if(n<1||n>d.pages) return; S.page=n; load(); var tb=document.querySelector('#dp-people .ppl-fil'); if(tb && tb.scrollIntoView) tb.scrollIntoView({block:'nearest',behavior:'smooth'}); };
window.kvPplReload = function(){ load(); };

// ───────────────────────── e-posta / telefon aç ─────────────────────────
function find(id){ for(var i=0;i<S.items.length;i++) if(String(S.items[i].id)===String(id)) return S.items[i]; return null; }
window.kvPplReveal = function(id, ch){
  var p=find(id); if(!p) return;
  var key=id+':'+ch; if(S.pending[key]) return;
  var need=cost(ch);
  if(window.KVC && KVC.balance!=null && KVC.balance<need && !p[ch+'_opened']){ noCredits(need); return; }   // no request needed: the server would refuse as well
  S.pending[key]=true; draw(); if(S.openId===String(id)) drawerRender(p);
  API('POST','/kv/people/'+encodeURIComponent(id)+'/reveal',{channel:ch}).then(function(r){
    delete S.pending[key];
    var d=r.data||{};
    if(r.ok){
      p[ch+'_opened']=true; p[ch]=d.value; if(d.linkedin) p.linkedin=d.linkedin;
      if(window.KVC && d.balance!=null) KVC.setBalance(d.balance);
      if(d.already) { if(typeof toast==='function') toast(t('kvp_already','Daha önce açılmıştı; kredi harcanmadı.')); }
      else if(typeof toast==='function') toast(t(ch==='email'?'kvp_opened_email':'kvp_opened_phone','',{n:d.credits_spent}));
    } else if(r.status===402 || d.error==='no_credits'){ if(window.KVC && d.balance!=null) KVC.setBalance(d.balance); noCredits(d.needed||need); }
    else if(r.status===429 && d.error==='limit') alertMsg('warning',t('kvp_limit_h','Günlük limit doldu'),t('kvp_limit_t','Bugün için limite ulaştınız.'));
    else if(r.status===429) alertMsg('warning',t('kvp_fail','İşlem yapılamadı'),t('kvp_rate','Çok sık deneme.'));
    else if(r.status===404){ alertMsg('info',t('kvp_fail','İşlem yapılamadı'),t('kvp_gone','Bu kişi artık listede değil.')); closeDrawer(); load(); return; }
    else if(r.status===422 && d.error==='no_data') alertMsg('info',t('kvp_fail','İşlem yapılamadı'),t('kvp_nodata','Bu bilgi kayıtlı değil.'));
    else if(r.status===403) alertMsg('warning',t('kvp_fail','İşlem yapılamadı'),t('kvp_noperm','Yetkiniz yok.'));
    else alertMsg('destructive',t('kvp_fail','İşlem yapılamadı'),(d.message||t('kvp_err','Bir hata oluştu.')));
    draw(); if(S.openId===String(id)) drawerRender(p);
  });
};
function noCredits(need){
  var msg=t('kvp_nc_h','Krediniz yetersiz')+'. '+t('kvp_nc_t','',{need:need});
  if(window.KVC && KVC.open) KVC.open(msg);                                        // running out of credits opens the credit modal, which says why
  else { alertMsg('warning',t('kvp_nc_h','Krediniz yetersiz'),t('kvp_nc_t','',{need:need})); if(typeof openM==='function') openM('credits'); }
}
window.kvPplCopy = function(id, ch){
  var p=find(id); if(!p||!p[ch]) return;
  var done=function(){ if(typeof toast==='function') toast(t('kvp_copied','Panoya kopyalandı')+': '+p[ch]); };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p[ch]).then(done,function(){});
  else { var ta=document.createElement('textarea'); ta.value=p[ch]; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){} document.body.removeChild(ta); }
};

// ───────────────────────── kişi çekmecesi (gerçek alanlar; uydurma "son görülme / yanıt süresi" yok) ─────────────────────────
function drawerRender(p){
  var hd=$('pdHd'), bd=$('pdBody'), acts=$('pdActs'); if(!hd||!bd) return;
  var col=palette(p.id);
  hd.innerHTML='<div class="pd-av" style="background:linear-gradient(135deg,'+col[0]+','+col[1]+')">'+esc(initialsOf(p.name))+'</div>'+
    '<div class="pd-nm">'+esc(p.name)+'</div>'+(p.title?'<div class="pd-ttl">'+esc(p.title)+'</div>':'')+
    '<div class="pd-cmp">'+(p.cc?'<img src="/flags/'+esc(p.cc)+'.svg" alt="" onerror="this.style.display=\'none\'"/>':'')+esc(p.company)+' · '+esc(countryName(p.cc))+'</div>'+
    '<div class="pd-tags"><span class="pt">'+esc(t('kvp_dept_'+p.dept,p.dept))+'</span></div>';
  function field(ch, label, has){
    var key=p.id+':'+ch;
    var inner;
    if(!has) inner='<span style="color:var(--faint)">'+esc(t('kvp_na','Kayıtlı değil'))+'</span>';
    else if(p[ch+'_opened'] && p[ch]) inner='<span dir="ltr">'+esc(p[ch])+'</span><button type="button" class="cp" title="'+esc(t('kvp_copy','Kopyala'))+'" aria-label="'+esc(t('kvp_copy','Kopyala'))+'" onclick="kvPplCopy(\''+p.id+'\',\''+ch+'\')">'+COPY+'</button>';
    else inner='<button type="button" class="reveal-btn kv-open'+(S.pending[key]?' busy':'')+'" '+(S.pending[key]?'disabled ':'')+'onclick="kvPplReveal('+p.id+',\''+ch+'\')">'+(ch==='email'?MAIL:PHONE)+'<span>'+esc(t('kvp_open','Aç'))+'</span><i class="kv-cost">'+BOLT+cost(ch)+'</i></button>';
    return '<div class="pd-fld"><span class="k">'+esc(label)+'</span><span class="v">'+inner+'</span></div>';
  }
  var tt=window.T?(T[lang()]||T.tr):{};
  var li = p.linkedin ? '<div class="pd-fld"><span class="k">LinkedIn</span><span class="v"><a href="'+esc(window.sanitizeUrl?sanitizeUrl(p.linkedin):'#')+'" target="_blank" rel="noopener noreferrer nofollow">'+esc(t('kvp_d_linkedin','LinkedIn profili'))+' ↗</a></span></div>' : '';
  bd.innerHTML='<div class="pd-sec"><h4>'+esc(t('kvp_d_contact','İletişim'))+'</h4>'+field('email',tt.fp_email||'E-posta',p.has_email)+field('phone',tt.fp_phone||'Telefon',p.has_phone)+li+'</div>'+
    '<div class="pd-sec"><h4>'+esc(t('kvp_d_firm','Firma'))+'</h4>'+
    '<div class="pd-fld"><span class="k">'+esc(t('kvp_d_firm','Firma'))+'</span><span class="v">'+esc(p.company)+'</span></div>'+
    '<div class="pd-fld"><span class="k">'+esc(t('kvp_d_country','Ülke'))+'</span><span class="v">'+esc(countryName(p.cc))+'</span></div>'+
    (sectorName(p.sec)?'<div class="pd-fld"><span class="k">'+esc(t('kvp_d_sector','Sektör'))+'</span><span class="v">'+esc(sectorName(p.sec))+'</span></div>':'')+
    '<div class="pd-fld"><span class="k">'+esc(t('kvp_d_dept','Bölüm'))+'</span><span class="v">'+esc(t('kvp_dept_'+p.dept,p.dept))+'</span></div></div>';
  if(acts) acts.innerHTML='<button type="button" class="btn sec" onclick="closePersonDrawer()">'+esc(t('kvp_close','Kapat'))+'</button>';
}
window.openPersonDrawer = function(id){
  var p=find(id); if(!p) return;
  S.openId=String(id);
  drawerRender(p);
  var d=$('pdDrawer'), b=$('pdBack'); if(d) d.classList.add('open'); if(b) b.classList.add('open');
  document.body.style.overflow='hidden';
};
function closeDrawer(){ S.openId=null; var d=$('pdDrawer'), b=$('pdBack'); if(d) d.classList.remove('open'); if(b) b.classList.remove('open'); document.body.style.overflow=''; }
window.closePersonDrawer = closeDrawer;
document.addEventListener('keydown', function(e){ if(e.key==='Escape' && S.openId) closeDrawer(); });

// prototip uyumluluğu: eski çağrılar gerçek listeyi kullanır; sahte kişi üreten işlev boş döner
window.renderPeople = function(){ if(!window.KV_USER) return; fresh(); };
window.revealField = function(id, f){ window.kvPplReveal(id, f==='em'?'email':'phone'); };
window.synthPeopleForFirm = function(){ return []; };
window.pplFilter = function(el, role){ setDept(role); };
window.filterPeople = function(q){ S.q=String(q||'').trim(); S.page=1; load(); };

// ───────────────────────── filtreler ─────────────────────────
function setDept(d){
  S.dept=d||'all'; S.page=1;
  document.querySelectorAll('#dp-people .ppl-fil .fx').forEach(function(f){ f.classList.toggle('active', f.getAttribute('data-dept')===S.dept); });
  load();
}
var timer=null;
document.addEventListener('input', function(e){
  if(!e.target || e.target.id!=='kvPplSearch') return;
  clearTimeout(timer); var v=e.target.value;
  timer=setTimeout(function(){ var q=String(v||'').trim(); if(q!==S.q){ S.q=q; S.page=1; load(); } }, 320);
});
document.addEventListener('change', function(e){
  if(e.target && e.target.id==='kvPplCountry'){ S.cc=e.target.value||''; S.page=1; load(); }
});
document.addEventListener('click', function(e){
  var f=e.target.closest && e.target.closest('#dp-people .ppl-fil .fx[data-dept]');
  if(f){ setDept(f.getAttribute('data-dept')); return; }
  var a=e.target.closest && e.target.closest('#kvPplRemovalLink');
  if(a){ e.preventDefault(); window.kvPplOpenRemoval(); }
});

// ───────────────────────── KVKK kaldırma başvurusu (herkese açık uç nokta) ─────────────────────────
function removalModal(){
  var m=$('mPplRemove'); if(m) return m;
  m=document.createElement('div'); m.className='modal'; m.id='mPplRemove';
  m.innerHTML='<div class="mbox" role="dialog" aria-modal="true" aria-labelledby="kvRmH" style="max-width:520px;width:calc(100vw - 32px)"><div class="mhead"><h3 id="kvRmH" data-i18n="kvp_rm_h"></h3><button class="mclose" type="button" aria-label="Close" onclick="closeM(\'pplRemove\')">×</button></div><div class="mbody kv-rm" style="padding:20px">'+
    '<p class="kv-rm-intro" data-i18n="kvp_rm_intro"></p>'+
    '<form id="kvRmForm" novalidate autocomplete="off">'+
    '<label for="kvRm1" data-i18n="kvp_rm_name"></label><input id="kvRm1" name="person_name" maxlength="160" required>'+
    '<label for="kvRm2" data-i18n="kvp_rm_email"></label><input id="kvRm2" name="person_email" type="email" maxlength="254">'+
    '<label for="kvRm3" data-i18n="kvp_rm_ref"></label><input id="kvRm3" name="person_ref" maxlength="200">'+
    '<label for="kvRm4" data-i18n="kvp_rm_you"></label><input id="kvRm4" name="requester_name" maxlength="160" required>'+
    '<label for="kvRm5" data-i18n="kvp_rm_you_email"></label><input id="kvRm5" name="requester_email" type="email" maxlength="254" required>'+
    '<label for="kvRm6" data-i18n="kvp_rm_reason"></label><textarea id="kvRm6" name="reason" rows="3" maxlength="2000" required></textarea>'+
    '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="kv-hp">'+
    '<button type="submit" class="btn kv-rm-send" id="kvRmSend" data-i18n="kvp_rm_send"></button></form></div></div>';
  document.body.appendChild(m);
  m.addEventListener('click', function(e){ if(e.target===m) closeM('pplRemove'); });
  $('kvRmForm').addEventListener('submit', submitRemoval);
  if(I18N()) I18N().apply(m);
  return m;
}
function submitRemoval(e){
  e.preventDefault();
  var f=$('kvRmForm'), b={}; Array.prototype.forEach.call(f.elements,function(i){ if(i.name) b[i.name]=(i.value||'').trim(); });
  if(!b.person_name||!b.requester_name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.requester_email||'')||(b.reason||'').length<5||(b.person_email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.person_email))){
    alertMsg('destructive',t('kvp_fail','İşlem yapılamadı'),t('kvp_rm_missing','Lütfen zorunlu alanları doldurun.')); return;
  }
  var btn=$('kvRmSend'); btn.disabled=true; btn.style.opacity='.6';
  API('POST','/kv/people/removal-request',b).then(function(r){
    btn.disabled=false; btn.style.opacity='';
    if(r.ok){ f.reset(); closeM('pplRemove'); alertMsg('success',t('kvp_rm_ok_h','Başvurunuz alındı'),t('kvp_rm_ok_t','Talebiniz kaydedildi.')); }
    else if(r.status===429) alertMsg('warning',t('kvp_fail','İşlem yapılamadı'),t('kvp_rate','Çok sık deneme.'));
    else { var d=r.data||{}, first=''; if(d.errors){ var k=Object.keys(d.errors)[0]; if(k) first=d.errors[k][0]; } alertMsg('destructive',t('kvp_fail','İşlem yapılamadı'),first||d.message||t('kvp_err','Bir hata oluştu.')); }
  });
}
window.kvPplOpenRemoval = function(){ removalModal(); if(I18N()) I18N().apply($('mPplRemove')); openM('pplRemove'); setTimeout(function(){ var i=$('kvRm1'); if(i) i.focus(); },80); };

// ───────────────────────── olaylar ─────────────────────────
document.addEventListener('kv:panel', function(e){ if(e && e.detail && e.detail.name==='people') fresh(); });
document.addEventListener('kv:credits', function(){ if(S.data) draw(); });      // prices may have changed
var _sl=window.setLang;
if(typeof _sl==='function'){
  window.setLang=function(l){
    var r=_sl.apply(this,arguments);
    try{ if(S.data){ draw(); } var p=S.openId && find(S.openId); if(p) drawerRender(p); }catch(e){}
    return r;
  };
}
function boot(){ if(I18N()) I18N().apply(); var panel=$('dp-people'); if(panel && panel.classList.contains('on')) fresh(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
