/* Kervea panel · Krediler
   kervea-api.js yüklendikten sonra çalışır. Kullanılabilir olanlar:
     KV_API(method, url, body) -> Promise<{ok,status,data}>   (CSRF + oturum dahil)
     window.KV_USER, window.KV_ME (ilk /kv/me yanıtı geldikten sonra), kvShowAlert(variant, title, text), escapeHtml()
     document 'kv:member' olayı (detail = /kv/me yanıtı) ve 'kv:panel' olayı (detail.name = açılan sekme)
   Bu dosya yalnızca "Krediler" özelliğine aittir:
     - sunucudaki kredi defteri (GET /kv/credits) · bakiye rozetleri · kredi paketi penceresi (#mCredits) · Stripe ile ödeme
     - Premium kilidinin firma sayfasındaki görünümü (kvContactBlock / kvRepLocked / kvSocialsLocked, kervea-api.js çağırır)
     - çeviri altyapısı: KVC.i18n.register({tr:{…},en:{…}}) (kv-people.js de kullanır). Eksik çeviri İngilizceye düşer. */
(function(){
'use strict';

var API = window.KV_API;
var LANGS = ['tr','en','es','fr','ar','ru'];
function $(id){ return document.getElementById(id); }
function esc(s){ return window.escapeHtml ? window.escapeHtml(s) : String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function escJs(s){ return window.escapeJs ? window.escapeJs(s) : String(s==null?'':s).replace(/[\\'"<>\n\r]/g,function(c){ return '\\x'+('0'+c.charCodeAt(0).toString(16)).slice(-2); }); }
function lang(){ return (typeof LANG!=='undefined' && LANG) || 'tr'; }
function locale(){ if(typeof window.kvLocale==='function') return window.kvLocale(); return ({tr:'tr-TR',en:'en-GB',es:'es-ES',fr:'fr-FR',ar:'ar',ru:'ru-RU'})[lang()] || 'tr-TR'; }
function perms(){ return (window.KV_USER && window.KV_USER.perms) || []; }
function can(p){ return perms().indexOf(p)!==-1; }
function alertMsg(variant, title, text){ if(typeof kvShowAlert==='function') kvShowAlert(variant, title, text); else if(typeof toast==='function') toast(title+' – '+text); }

// ───────────────────────── çeviri altyapısı ─────────────────────────
var KEYS = {};                                     // bu dosyanın / kv-people.js'in kayıtlı anahtarları
var KVC = window.KVC = { data:null, balance:null, cat:null, loading:null, sel:null, i18n:{} };

KVC.i18n.register = function(dict){
  var en = dict.en || dict.tr || {};
  LANGS.forEach(function(l){
    if(!window.T) return;
    window.T[l] = window.T[l] || {};
    var src = dict[l] || {};
    Object.keys(dict.tr||{}).concat(Object.keys(en)).forEach(function(k){
      KEYS[k] = true;
      var v = src[k]!==undefined ? src[k] : (en[k]!==undefined ? en[k] : (dict.tr||{})[k]);   // eksik çeviri → İngilizce
      if(v!==undefined) window.T[l][k] = v;
    });
  });
};
// {signup} {bonus} {cost} gibi yer tutucular GERÇEK (sunucu yapılandırmasından gelen) değerlerle doldurulur
KVC.i18n.fill = function(str, extra){
  var cat = (KVC.data || KVC.cat || {}), costs = cat.costs || {};
  var cost = costs.email==null ? '1' : (costs.phone!=null && costs.phone!==costs.email ? costs.email+' / '+costs.phone : String(costs.email));
  var vars = {signup: cat.signup==null?'':cat.signup, bonus: cat.pro_bonus==null?'':cat.pro_bonus, cost: cost};
  if(extra) Object.keys(extra).forEach(function(k){ vars[k]=extra[k]; });
  return String(str).replace(/\{(\w+)\}/g,function(m,k){ return vars[k]!==undefined ? vars[k] : m; });
};
KVC.i18n.t = function(key, fallback, extra){
  var d = (window.T && window.T[lang()]) || {}, en = (window.T && window.T.en) || {};
  var v = d[key]!==undefined ? d[key] : (en[key]!==undefined ? en[key] : fallback);
  return v===undefined ? '' : KVC.i18n.fill(v, extra);
};
var t = KVC.i18n.t;
KVC.i18n.apply = function(root){
  root = root || document;
  var d = (window.T && window.T[lang()]) || {};
  [['data-i18n','html'],['data-i18n-placeholder','placeholder'],['data-i18n-ph','placeholder'],['data-i18n-title','title']].forEach(function(pair){
    root.querySelectorAll('['+pair[0]+']').forEach(function(n){
      var k = n.getAttribute(pair[0]); if(!KEYS[k] || d[k]===undefined) return;
      // amounts come from the server: until the catalog is loaded keep the markup's own text instead of printing blanks
      if(/\{(signup|bonus)\}/.test(d[k]) && !(KVC.data || KVC.cat)) return;
      var v = KVC.i18n.fill(d[k]);
      if(pair[1]==='html') n.innerHTML = v; else n.setAttribute(pair[1], v);
    });
  });
};

var X = {
 tr:{
  creds_sub:'Her karar vericinin e-posta veya telefonu {cost} kredi. Kullanılmayan krediler devreder.',
  creds_secure:'Kart ödemesi Stripe\'ın güvenli sayfasında alınır · 3D Secure',
  ppl_renew:'Kullanılmayan krediler devreder',
  pay_plan_sub:'Tek plan · Tüm özellikler · {bonus} kredi hediye · Komisyon yok',
  sp_f8:'Üyelikle birlikte {bonus} kredi hediye: farklı sektörlerdeki karar vericilere ulaşın',
  kvc_best:'En avantajlı', kvc_save:'%{pct} avantaj',
  kvc_step1:'Aşağıdaki düğme sizi Stripe\'ın güvenli ödeme sayfasına götürür.',
  kvc_step2:'Kart bilgilerinizi orada girersiniz; Kervea sunucularına ulaşmaz ve saklanmaz.',
  kvc_step3:'Ödeme onaylanınca krediler firma hesabınıza otomatik eklenir.',
  kvc_pay_btn:'Güvenli ödeme sayfasına git',
  kvc_load_err:'Paketler yüklenemedi. Lütfen tekrar deneyin.',
  kvc_no_buy:'Kredi satın alma yetkiniz yok. Firma yöneticinizden isteyin.',
  kvc_login_first:'Krediler için önce giriş yapın.',
  kvc_order_h:'Siparişiniz alındı',
  kvc_order_t:'Sipariş #{order} · {credits} kredi · ${price}. Ödeme onaylandığında krediler firma hesabınıza otomatik eklenir. Ödeme bilgileri e-postanızla paylaşılacaktır.',
  kvc_close:'Kapat', kvc_err_title:'İşlem yapılamadı', kvc_rate:'Çok sık deneme. Biraz sonra tekrar deneyin.', kvc_cant:'Bu işlem için yetkiniz yok.',
  kvc_paid_h:'Ödeme alındı', kvc_paid_t:'Kredileriniz hesabınıza eklendi. Yeni bakiye: {balance}.',
  kvc_paid_wait:'Ödemeniz alındı; krediler birkaç saniye içinde hesabınıza yüklenir.',
  kvc_pro_t:'Premium aktif; {bonus} kredi hesabınıza eklendi. Yeni bakiye: {balance}.',
  kvc_cancel_h:'Ödeme tamamlanmadı', kvc_cancel_t:'Karttan çekim yapılmadı, kredi eklenmedi.',
  kvc_hist:'Kredi hareketleri', kvc_hist_empty:'Henüz hareket yok.',
  kvc_r_signup:'Üyelik hediyesi', kvc_r_purchase:'Kredi paketi', kvc_r_pro_bonus:'Premium hediyesi', kvc_r_person_reveal:'Kişi bilgisi açıldı', kvc_r_admin_adjust:'Düzeltme', kvc_r_refund:'İade',
  kvc_ch_email:'e-posta', kvc_ch_phone:'telefon', kvc_bal:'Kredi bakiyesi',
  kvc_pr_h:'Kredi ile farklı sektörlere ulaşın',
  kvc_pr_p:'Her yeni üyeye {signup} kredi hediye, Premium üyelikle {bonus} kredi daha. Her e-posta veya telefon {cost} kredi; kullanılmayan krediler devreder.',
  kvc_pr_cta:'Kredi satın al',
  kvl_lock:'Premium ile açılır',
  kvl_login_sub:'İletişim bilgileri Premium üyelere açılır. Devam etmek için giriş yapın.',
  kvl_prem_sub:'E-posta, telefon, web sitesi ve adres Premium üyelere açılır.',
  kvl_reveal_sub:'Premium üyesiniz: bilgileri tek tıkla açabilirsiniz (günlük sınır uygulanır).',
  kvl_rep_lock:'Yetkili kişi Premium üyelere açılır.', kvl_soc_lock:'Sosyal medya bağlantıları Premium üyelere açılır.',
  kvl_login:'Giriş yap', kvl_upgrade:'Premium\'a Yükselt', kvl_reveal:'Bilgileri göster',
  kvl_declined:'Bu firma iletişim bilgilerini paylaşmamayı tercih etti.',
  kvl_sec_h:'Farklı sektör', kvl_sec_p:'Bu firma farklı bir sektörde. Bu sektördeki kişilere Kişiler sekmesinden kredi ile ulaşabilirsiniz.', kvl_sec_cta:'Kişiler\'e git',
  kvl_card_p:'Bu firma sektörünüzün dışında. Bu sektördeki kişilere Kişiler sekmesinden kredi ile ulaşın.', kvl_card_cta:'Kişiler', kvl_badge:'SEKTÖR',
  kvl_quota_h:'Günlük limit doldu', kvl_quota_t:'Bugün için iletişim bilgisi görüntüleme limitine ulaştınız. Yarın tekrar deneyin.'
 },
 en:{
  creds_sub:'Opening a decision maker\'s e-mail or phone costs {cost} credit. Unused credits carry over.',
  creds_secure:'Card payment is taken on Stripe\'s secure page · 3D Secure',
  ppl_renew:'Unused credits carry over',
  pay_plan_sub:'One plan · All features · {bonus} bonus credits · No commission',
  sp_f8:'{bonus} credits included with membership: reach decision makers in other sectors',
  kvc_best:'Best value', kvc_save:'{pct}% off',
  kvc_step1:'The button below takes you to Stripe\'s secure payment page.',
  kvc_step2:'You enter your card details there; they never reach Kervea\'s servers and are not stored.',
  kvc_step3:'Once the payment is confirmed, the credits are added to your company account automatically.',
  kvc_pay_btn:'Go to secure payment',
  kvc_load_err:'Packs could not be loaded. Please try again.',
  kvc_no_buy:'You are not allowed to buy credits. Ask your company administrator.',
  kvc_login_first:'Sign in first to use credits.',
  kvc_order_h:'Order received',
  kvc_order_t:'Order #{order} · {credits} credits · ${price}. When the payment is confirmed the credits are added to your company account automatically. Payment details will be sent to your e-mail.',
  kvc_close:'Close', kvc_err_title:'Action failed', kvc_rate:'Too many attempts. Please try again in a moment.', kvc_cant:'You are not allowed to do this.',
  kvc_paid_h:'Payment received', kvc_paid_t:'Your credits have been added. New balance: {balance}.',
  kvc_paid_wait:'Payment received; the credits will appear in your account in a few seconds.',
  kvc_pro_t:'Premium is active; {bonus} credits were added. New balance: {balance}.',
  kvc_cancel_h:'Payment not completed', kvc_cancel_t:'Your card was not charged and no credits were added.',
  kvc_hist:'Credit history', kvc_hist_empty:'No activity yet.',
  kvc_r_signup:'Membership gift', kvc_r_purchase:'Credit pack', kvc_r_pro_bonus:'Premium gift', kvc_r_person_reveal:'Contact opened', kvc_r_admin_adjust:'Adjustment', kvc_r_refund:'Refund',
  kvc_ch_email:'e-mail', kvc_ch_phone:'phone', kvc_bal:'Credit balance',
  kvc_pr_h:'Reach other sectors with credits',
  kvc_pr_p:'Every new member gets {signup} credits, Premium adds {bonus} more. Each e-mail or phone costs {cost} credit; unused credits carry over.',
  kvc_pr_cta:'Buy credits',
  kvl_lock:'Unlocked with Premium',
  kvl_login_sub:'Contact details are available to Premium members. Sign in to continue.',
  kvl_prem_sub:'E-mail, phone, website and address are available to Premium members.',
  kvl_reveal_sub:'You are a Premium member: open the details with one click (a daily limit applies).',
  kvl_rep_lock:'The representative is shown to Premium members.', kvl_soc_lock:'Social media links are shown to Premium members.',
  kvl_login:'Sign in', kvl_upgrade:'Upgrade to Premium', kvl_reveal:'Show details',
  kvl_declined:'This company chose not to share its contact details.',
  kvl_sec_h:'Different sector', kvl_sec_p:'This company is in a different sector. You can reach people in that sector with credits from the People tab.', kvl_sec_cta:'Go to People',
  kvl_card_p:'This company is outside your sector. Reach people in that sector with credits from the People tab.', kvl_card_cta:'People', kvl_badge:'SECTOR',
  kvl_quota_h:'Daily limit reached', kvl_quota_t:'You have reached today\'s limit for opening contact details. Try again tomorrow.'
 },
 es:{
  creds_sub:'Abrir el correo o el teléfono de un decisor cuesta {cost} crédito. Los créditos no usados se acumulan.',
  creds_secure:'El pago con tarjeta se realiza en la página segura de Stripe · 3D Secure',
  ppl_renew:'Los créditos no usados se acumulan',
  pay_plan_sub:'Un plan · Todas las funciones · {bonus} créditos de regalo · Sin comisión',
  sp_f8:'{bonus} créditos incluidos con la suscripción: llegue a decisores de otros sectores',
  kvc_best:'Mejor precio', kvc_save:'{pct}% de ahorro',
  kvc_step1:'El botón de abajo le lleva a la página de pago segura de Stripe.',
  kvc_step2:'Allí introduce los datos de su tarjeta; no llegan a los servidores de Kervea ni se guardan.',
  kvc_step3:'Cuando se confirma el pago, los créditos se añaden automáticamente a la cuenta de su empresa.',
  kvc_pay_btn:'Ir al pago seguro',
  kvc_load_err:'No se pudieron cargar los paquetes. Inténtelo de nuevo.',
  kvc_no_buy:'No tiene permiso para comprar créditos. Consulte al administrador de su empresa.',
  kvc_login_first:'Inicie sesión para usar créditos.',
  kvc_order_h:'Pedido recibido',
  kvc_order_t:'Pedido #{order} · {credits} créditos · ${price}. Cuando se confirme el pago, los créditos se añadirán automáticamente a la cuenta de su empresa. Los datos de pago se enviarán a su correo.',
  kvc_close:'Cerrar', kvc_err_title:'No se pudo completar', kvc_rate:'Demasiados intentos. Inténtelo en un momento.', kvc_cant:'No tiene permiso para esta acción.',
  kvc_paid_h:'Pago recibido', kvc_paid_t:'Sus créditos se han añadido. Nuevo saldo: {balance}.',
  kvc_paid_wait:'Pago recibido; los créditos aparecerán en su cuenta en unos segundos.',
  kvc_pro_t:'Premium activo; se añadieron {bonus} créditos. Nuevo saldo: {balance}.',
  kvc_cancel_h:'Pago no completado', kvc_cancel_t:'No se cobró nada a su tarjeta y no se añadieron créditos.',
  kvc_hist:'Movimientos de créditos', kvc_hist_empty:'Aún no hay movimientos.',
  kvc_r_signup:'Regalo de membresía', kvc_r_purchase:'Paquete de créditos', kvc_r_pro_bonus:'Regalo Premium', kvc_r_person_reveal:'Contacto abierto', kvc_r_admin_adjust:'Ajuste', kvc_r_refund:'Reembolso',
  kvc_ch_email:'correo', kvc_ch_phone:'teléfono', kvc_bal:'Saldo de créditos',
  kvc_pr_h:'Llegue a otros sectores con créditos',
  kvc_pr_p:'Cada nuevo miembro recibe {signup} créditos y Premium suma {bonus} más. Cada correo o teléfono cuesta {cost} crédito; los créditos no usados se acumulan.',
  kvc_pr_cta:'Comprar créditos',
  kvl_lock:'Se desbloquea con Premium',
  kvl_login_sub:'Los datos de contacto están disponibles para miembros Premium. Inicie sesión para continuar.',
  kvl_prem_sub:'Correo, teléfono, sitio web y dirección están disponibles para miembros Premium.',
  kvl_reveal_sub:'Es miembro Premium: abra los datos con un clic (se aplica un límite diario).',
  kvl_rep_lock:'El representante se muestra a los miembros Premium.', kvl_soc_lock:'Los enlaces de redes sociales se muestran a los miembros Premium.',
  kvl_login:'Iniciar sesión', kvl_upgrade:'Pasar a Premium', kvl_reveal:'Mostrar datos',
  kvl_declined:'Esta empresa prefirió no compartir sus datos de contacto.',
  kvl_sec_h:'Otro sector', kvl_sec_p:'Esta empresa pertenece a otro sector. Puede llegar a personas de ese sector con créditos desde la pestaña Personas.', kvl_sec_cta:'Ir a Personas',
  kvl_card_p:'Esta empresa está fuera de su sector. Llegue a personas de ese sector con créditos desde la pestaña Personas.', kvl_card_cta:'Personas', kvl_badge:'SECTOR',
  kvl_quota_h:'Límite diario alcanzado', kvl_quota_t:'Ha alcanzado el límite de hoy para abrir datos de contacto. Inténtelo mañana.'
 },
 fr:{
  creds_sub:'Ouvrir l\'e-mail ou le téléphone d\'un décideur coûte {cost} crédit. Les crédits non utilisés sont reportés.',
  creds_secure:'Le paiement par carte se fait sur la page sécurisée de Stripe · 3D Secure',
  ppl_renew:'Les crédits non utilisés sont reportés',
  pay_plan_sub:'Un seul plan · Toutes les fonctions · {bonus} crédits offerts · Sans commission',
  sp_f8:'{bonus} crédits offerts avec l\'abonnement : atteignez des décideurs d\'autres secteurs',
  kvc_best:'Meilleur prix', kvc_save:'{pct} % d\'économie',
  kvc_step1:'Le bouton ci-dessous vous mène à la page de paiement sécurisée de Stripe.',
  kvc_step2:'Vous y saisissez votre carte ; ses données n\'atteignent pas les serveurs de Kervea et ne sont pas conservées.',
  kvc_step3:'Une fois le paiement confirmé, les crédits sont ajoutés automatiquement au compte de votre entreprise.',
  kvc_pay_btn:'Aller au paiement sécurisé',
  kvc_load_err:'Impossible de charger les packs. Veuillez réessayer.',
  kvc_no_buy:'Vous n\'avez pas le droit d\'acheter des crédits. Demandez à l\'administrateur de votre entreprise.',
  kvc_login_first:'Connectez-vous pour utiliser les crédits.',
  kvc_order_h:'Commande reçue',
  kvc_order_t:'Commande n° {order} · {credits} crédits · ${price}. Dès que le paiement est confirmé, les crédits sont ajoutés automatiquement au compte de votre entreprise. Les informations de paiement vous seront envoyées par e-mail.',
  kvc_close:'Fermer', kvc_err_title:'Action impossible', kvc_rate:'Trop de tentatives. Réessayez dans un instant.', kvc_cant:'Vous n\'avez pas le droit d\'effectuer cette action.',
  kvc_paid_h:'Paiement reçu', kvc_paid_t:'Vos crédits ont été ajoutés. Nouveau solde : {balance}.',
  kvc_paid_wait:'Paiement reçu ; les crédits apparaîtront sur votre compte dans quelques secondes.',
  kvc_pro_t:'Premium actif ; {bonus} crédits ont été ajoutés. Nouveau solde : {balance}.',
  kvc_cancel_h:'Paiement non finalisé', kvc_cancel_t:'Votre carte n\'a pas été débitée et aucun crédit n\'a été ajouté.',
  kvc_hist:'Historique des crédits', kvc_hist_empty:'Aucun mouvement pour le moment.',
  kvc_r_signup:'Cadeau d\'adhésion', kvc_r_purchase:'Pack de crédits', kvc_r_pro_bonus:'Cadeau Premium', kvc_r_person_reveal:'Contact ouvert', kvc_r_admin_adjust:'Ajustement', kvc_r_refund:'Remboursement',
  kvc_ch_email:'e-mail', kvc_ch_phone:'téléphone', kvc_bal:'Solde de crédits',
  kvc_pr_h:'Atteignez d\'autres secteurs avec des crédits',
  kvc_pr_p:'Chaque nouveau membre reçoit {signup} crédits, Premium en ajoute {bonus}. Chaque e-mail ou téléphone coûte {cost} crédit ; les crédits non utilisés sont reportés.',
  kvc_pr_cta:'Acheter des crédits',
  kvl_lock:'Débloqué avec Premium',
  kvl_login_sub:'Les coordonnées sont réservées aux membres Premium. Connectez-vous pour continuer.',
  kvl_prem_sub:'E-mail, téléphone, site web et adresse sont réservés aux membres Premium.',
  kvl_reveal_sub:'Vous êtes membre Premium : ouvrez les coordonnées en un clic (une limite quotidienne s\'applique).',
  kvl_rep_lock:'Le représentant est affiché aux membres Premium.', kvl_soc_lock:'Les liens de réseaux sociaux sont affichés aux membres Premium.',
  kvl_login:'Se connecter', kvl_upgrade:'Passer à Premium', kvl_reveal:'Afficher les coordonnées',
  kvl_declined:'Cette entreprise a choisi de ne pas partager ses coordonnées.',
  kvl_sec_h:'Autre secteur', kvl_sec_p:'Cette entreprise appartient à un autre secteur. Vous pouvez joindre des personnes de ce secteur avec des crédits depuis l\'onglet Personnes.', kvl_sec_cta:'Aller à Personnes',
  kvl_card_p:'Cette entreprise est hors de votre secteur. Joignez des personnes de ce secteur avec des crédits depuis l\'onglet Personnes.', kvl_card_cta:'Personnes', kvl_badge:'SECTEUR',
  kvl_quota_h:'Limite quotidienne atteinte', kvl_quota_t:'Vous avez atteint la limite du jour pour ouvrir des coordonnées. Réessayez demain.'
 },
 ar:{
  creds_sub:'فتح البريد الإلكتروني أو هاتف صانع القرار يكلّف {cost} رصيد. الأرصدة غير المستخدمة تُرحَّل.',
  creds_secure:'يتم الدفع بالبطاقة على صفحة Stripe الآمنة · 3D Secure',
  ppl_renew:'الأرصدة غير المستخدمة تُرحَّل',
  pay_plan_sub:'خطة واحدة · جميع الميزات · {bonus} رصيد هدية · بلا عمولة',
  sp_f8:'{bonus} رصيد مع العضوية: تواصل مع صنّاع القرار في قطاعات أخرى',
  kvc_best:'الأفضل قيمة', kvc_save:'وفّر {pct}%',
  kvc_step1:'الزر أدناه ينقلك إلى صفحة الدفع الآمنة من Stripe.',
  kvc_step2:'تُدخل بيانات بطاقتك هناك؛ لا تصل إلى خوادم Kervea ولا تُحفظ.',
  kvc_step3:'عند تأكيد الدفع تُضاف الأرصدة تلقائيًا إلى حساب شركتك.',
  kvc_pay_btn:'الانتقال إلى الدفع الآمن',
  kvc_load_err:'تعذّر تحميل الباقات. حاول مرة أخرى.',
  kvc_no_buy:'ليست لديك صلاحية شراء الأرصدة. اطلب ذلك من مسؤول شركتك.',
  kvc_login_first:'سجّل الدخول أولًا لاستخدام الأرصدة.',
  kvc_order_h:'تم استلام الطلب',
  kvc_order_t:'الطلب #{order} · {credits} رصيد · ${price}. عند تأكيد الدفع تُضاف الأرصدة تلقائيًا إلى حساب شركتك. ستُرسل تفاصيل الدفع إلى بريدك الإلكتروني.',
  kvc_close:'إغلاق', kvc_err_title:'تعذّر تنفيذ العملية', kvc_rate:'محاولات كثيرة. حاول بعد قليل.', kvc_cant:'ليست لديك صلاحية لهذا الإجراء.',
  kvc_paid_h:'تم استلام الدفع', kvc_paid_t:'أُضيفت أرصدتك. الرصيد الجديد: {balance}.',
  kvc_paid_wait:'تم استلام الدفع؛ ستظهر الأرصدة في حسابك خلال ثوانٍ.',
  kvc_pro_t:'تم تفعيل Premium؛ أُضيف {bonus} رصيد. الرصيد الجديد: {balance}.',
  kvc_cancel_h:'لم يكتمل الدفع', kvc_cancel_t:'لم يتم خصم أي مبلغ من بطاقتك ولم تُضف أرصدة.',
  kvc_hist:'حركة الأرصدة', kvc_hist_empty:'لا توجد حركات بعد.',
  kvc_r_signup:'هدية العضوية', kvc_r_purchase:'باقة أرصدة', kvc_r_pro_bonus:'هدية Premium', kvc_r_person_reveal:'فتح بيانات التواصل', kvc_r_admin_adjust:'تعديل', kvc_r_refund:'استرداد',
  kvc_ch_email:'البريد', kvc_ch_phone:'الهاتف', kvc_bal:'رصيد الأرصدة',
  kvc_pr_h:'تواصل مع قطاعات أخرى بالأرصدة',
  kvc_pr_p:'يحصل كل عضو جديد على {signup} رصيد، وPremium يضيف {bonus} أخرى. كل بريد أو هاتف يكلّف {cost} رصيد؛ والأرصدة غير المستخدمة تُرحَّل.',
  kvc_pr_cta:'شراء أرصدة',
  kvl_lock:'يُفتح مع Premium',
  kvl_login_sub:'بيانات التواصل متاحة لأعضاء Premium. سجّل الدخول للمتابعة.',
  kvl_prem_sub:'البريد الإلكتروني والهاتف والموقع والعنوان متاحة لأعضاء Premium.',
  kvl_reveal_sub:'أنت عضو Premium: افتح البيانات بنقرة واحدة (يوجد حد يومي).',
  kvl_rep_lock:'يظهر المسؤول لأعضاء Premium.', kvl_soc_lock:'تظهر روابط التواصل الاجتماعي لأعضاء Premium.',
  kvl_login:'تسجيل الدخول', kvl_upgrade:'الترقية إلى Premium', kvl_reveal:'إظهار البيانات',
  kvl_declined:'اختارت هذه الشركة عدم مشاركة بيانات التواصل.',
  kvl_sec_h:'قطاع مختلف', kvl_sec_p:'هذه الشركة في قطاع مختلف. يمكنك التواصل مع أشخاص ذلك القطاع بالأرصدة من تبويب الأشخاص.', kvl_sec_cta:'الذهاب إلى الأشخاص',
  kvl_card_p:'هذه الشركة خارج قطاعك. تواصل مع أشخاص ذلك القطاع بالأرصدة من تبويب الأشخاص.', kvl_card_cta:'الأشخاص', kvl_badge:'القطاع',
  kvl_quota_h:'تم بلوغ الحد اليومي', kvl_quota_t:'بلغت حد اليوم لفتح بيانات التواصل. حاول غدًا.'
 },
 ru:{
  creds_sub:'Открытие e-mail или телефона лица, принимающего решения, стоит {cost} кредит. Неиспользованные кредиты переносятся.',
  creds_secure:'Оплата картой проходит на защищённой странице Stripe · 3D Secure',
  ppl_renew:'Неиспользованные кредиты переносятся',
  pay_plan_sub:'Один тариф · Все функции · {bonus} кредитов в подарок · Без комиссии',
  sp_f8:'{bonus} кредитов в подарок с подпиской: выходите на лиц, принимающих решения, в других отраслях',
  kvc_best:'Лучшая цена', kvc_save:'выгода {pct}%',
  kvc_step1:'Кнопка ниже ведёт на защищённую страницу оплаты Stripe.',
  kvc_step2:'Данные карты вы вводите там; они не попадают на серверы Kervea и не сохраняются.',
  kvc_step3:'После подтверждения оплаты кредиты автоматически зачисляются на счёт вашей компании.',
  kvc_pay_btn:'Перейти к безопасной оплате',
  kvc_load_err:'Не удалось загрузить пакеты. Повторите попытку.',
  kvc_no_buy:'У вас нет права покупать кредиты. Обратитесь к администратору компании.',
  kvc_login_first:'Войдите, чтобы пользоваться кредитами.',
  kvc_order_h:'Заказ принят',
  kvc_order_t:'Заказ №{order} · {credits} кредитов · ${price}. После подтверждения оплаты кредиты автоматически зачисляются на счёт вашей компании. Платёжные реквизиты будут отправлены на вашу почту.',
  kvc_close:'Закрыть', kvc_err_title:'Не удалось выполнить', kvc_rate:'Слишком много попыток. Повторите чуть позже.', kvc_cant:'У вас нет права на это действие.',
  kvc_paid_h:'Оплата получена', kvc_paid_t:'Кредиты зачислены. Новый баланс: {balance}.',
  kvc_paid_wait:'Оплата получена; кредиты появятся на счёте через несколько секунд.',
  kvc_pro_t:'Premium активен; зачислено {bonus} кредитов. Новый баланс: {balance}.',
  kvc_cancel_h:'Оплата не завершена', kvc_cancel_t:'С карты ничего не списано, кредиты не добавлены.',
  kvc_hist:'История кредитов', kvc_hist_empty:'Операций пока нет.',
  kvc_r_signup:'Подарок за регистрацию', kvc_r_purchase:'Пакет кредитов', kvc_r_pro_bonus:'Подарок Premium', kvc_r_person_reveal:'Контакт открыт', kvc_r_admin_adjust:'Корректировка', kvc_r_refund:'Возврат',
  kvc_ch_email:'e-mail', kvc_ch_phone:'телефон', kvc_bal:'Баланс кредитов',
  kvc_pr_h:'Выходите на другие отрасли за кредиты',
  kvc_pr_p:'Каждый новый участник получает {signup} кредитов, Premium добавляет ещё {bonus}. Каждый e-mail или телефон — {cost} кредит; неиспользованные кредиты переносятся.',
  kvc_pr_cta:'Купить кредиты',
  kvl_lock:'Открывается с Premium',
  kvl_login_sub:'Контактные данные доступны участникам Premium. Войдите, чтобы продолжить.',
  kvl_prem_sub:'E-mail, телефон, сайт и адрес доступны участникам Premium.',
  kvl_reveal_sub:'Вы участник Premium: откройте данные одним кликом (действует дневной лимит).',
  kvl_rep_lock:'Представитель виден участникам Premium.', kvl_soc_lock:'Ссылки на соцсети видны участникам Premium.',
  kvl_login:'Войти', kvl_upgrade:'Перейти на Premium', kvl_reveal:'Показать данные',
  kvl_declined:'Эта компания решила не раскрывать контактные данные.',
  kvl_sec_h:'Другая отрасль', kvl_sec_p:'Эта компания относится к другой отрасли. Сотрудников этой отрасли можно найти за кредиты на вкладке «Контакты».', kvl_sec_cta:'Перейти к контактам',
  kvl_card_p:'Эта компания вне вашей отрасли. Сотрудников этой отрасли можно найти за кредиты на вкладке «Контакты».', kvl_card_cta:'Контакты', kvl_badge:'ОТРАСЛЬ',
  kvl_quota_h:'Дневной лимит исчерпан', kvl_quota_t:'Вы достигли сегодняшнего лимита на открытие контактов. Повторите завтра.'
 }
};
KVC.i18n.register(X);

// ───────────────────────── bakiye (sunucu = tek doğruluk kaynağı) ─────────────────────────
function money(n){ try{ return new Intl.NumberFormat(locale(),{minimumFractionDigits:0,maximumFractionDigits:2}).format(n); }catch(e){ return String(n); } }
function perFmt(n){ try{ return new Intl.NumberFormat(locale(),{minimumFractionDigits:2,maximumFractionDigits:3}).format(n); }catch(e){ return String(n); } }
function intFmt(n){ try{ return new Intl.NumberFormat(locale()).format(n); }catch(e){ return String(n); } }
function canUse(){ return !!window.KV_USER && (can('people') || can('billing')); }

KVC.paint = function(){
  var on = canUse(), b = KVC.balance;
  var n = $('creditN'); if(n) n.textContent = (on && b!=null) ? intFmt(b) : '–';
  var cb = $('credCurrentBal'); if(cb) cb.textContent = (on && b!=null) ? intFmt(b) : '–';
  var badge = $('kvPplBadge');
  if(badge){ if(on && b!=null){ badge.hidden = false; badge.textContent = intFmt(b); badge.title = t('kvc_bal','Kredi bakiyesi'); } else badge.hidden = true; }
  var buy = $('kvCrBuy'); if(buy) buy.classList.toggle('kv-hide', !!(on && KVC.data && KVC.data.can_buy===false));
};
KVC.setBalance = function(n){ KVC.balance = n; if(KVC.data) KVC.data.balance = n; KVC.paint(); };
KVC.load = function(force){
  if(!canUse()){ KVC.data = null; KVC.balance = null; KVC.paint(); return Promise.resolve(null); }
  if(KVC.loading && !force) return KVC.loading;
  KVC.loading = API('GET','/kv/credits').then(function(r){
    KVC.loading = null;
    if(!r.ok) return null;
    KVC.data = r.data; KVC.balance = r.data.balance; KVC.cat = r.data;
    KVC.paint(); KVC.i18n.apply();
    try{ document.dispatchEvent(new CustomEvent('kv:credits',{detail:r.data})); }catch(e){}
    return r.data;
  });
  return KVC.loading;
};
// prototipin eski yerel kredi işlevleri artık sunucudaki bakiyeyi kullanır
window.getCredits = function(){ return KVC.balance || 0; };
window.setCredits = function(n){ KVC.setBalance(Math.max(0, parseInt(n,10)||0)); };

document.addEventListener('kv:member', function(){ KVC.load(true); });
document.addEventListener('kv:panel', function(e){ var n = e && e.detail && e.detail.name; if(n==='people' || n==='overview') KVC.load(true); });

// herkese açık fiyat listesi (giriş gerekmez): fiyat sayfası + metin yer tutucuları
function loadCatalog(){
  return API('GET','/kv/credits/packs').then(function(r){
    if(r.ok){ KVC.cat = r.data; KVC.i18n.apply(); renderPricing(); }
  });
}

// ───────────────────────── kredi paketi penceresi (#mCredits) ─────────────────────────
function modalReset(){
  var nt=$('kvCredNotice'); if(nt){ if(KVC.notice){ nt.textContent=KVC.notice; nt.hidden=false; } else { nt.hidden=true; nt.textContent=''; } }
  KVC.notice=null;                                        // one-shot: shown for this opening only
  var s1=$('credsStep1'), s2=$('credsStep2'); if(s1) s1.style.display='block'; if(s2) s2.style.display='none';
  var h=$('kvCredHosted'), p=$('kvCredPending'); if(h) h.hidden=false; if(p){ p.hidden=true; p.innerHTML=''; }
  var e=$('kvCredErr'); if(e){ e.hidden=true; e.textContent=''; }
}
function bestSave(packs){ var m=0; packs.forEach(function(p){ if(p.save_pct>m) m=p.save_pct; }); return m; }
function renderPacks(){
  var host=$('kvCredPacks'), d=KVC.data, err=$('kvCredErr'), next=$('kvCredNext');
  if(!host) return;
  if(!d || !d.packs || !d.packs.length){
    host.innerHTML=''; if(err){ err.hidden=false; err.textContent=t('kvc_load_err','Paketler yüklenemedi. Lütfen tekrar deneyin.'); } if(next) next.disabled=true; return;
  }
  if(err){ err.hidden=true; }
  var best=bestSave(d.packs), per=t('creds_per_lbl','kredi');
  var lbl=t('creds_lbl','Kredi');
  host.innerHTML = d.packs.map(function(p){
    var isBest = best>0 && p.save_pct===best;
    var perTxt = '$'+perFmt(p.per_credit)+' / '+esc(per)+(p.save_pct>0 ? ' · <span style="color:var(--teal);font-weight:700">'+esc(t('kvc_save','',{pct:p.save_pct}))+'</span>' : '');
    return '<div class="creds-pack'+(isBest?' popular':'')+'" role="button" tabindex="0" data-pack="'+esc(p.pack)+'" data-credits="'+esc(p.credits)+'" data-price="'+esc(money(p.price_usd))+'" data-badge="'+esc(t('kvc_best','En avantajlı'))+'" onclick="selectCredPack(this)" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();selectCredPack(this)}">'+
      '<div class="cp-n">'+esc(intFmt(p.credits))+'</div><div class="cp-l">'+esc(lbl)+'</div><div class="cp-p">$'+esc(money(p.price_usd))+'</div><div class="cp-pp">'+perTxt+'</div></div>';
  }).join('');
  var want = KVC.sel && host.querySelector('[data-pack="'+KVC.sel+'"]');
  var pick = want || host.querySelectorAll('.creds-pack')[d.packs.length>2 ? 1 : 0];
  if(pick) window.selectCredPack(pick);
  if(next) next.disabled = !pick;
  if(d.can_buy===false){
    if(err){ err.hidden=false; err.textContent=t('kvc_no_buy','Kredi satın alma yetkiniz yok.'); }
    if(next) next.disabled=true;
  }
  renderHistory();
}
window.selectCredPack = function(el){
  document.querySelectorAll('#kvCredPacks .creds-pack').forEach(function(p){ p.classList.remove('selected'); });
  el.classList.add('selected');
  KVC.sel = el.getAttribute('data-pack');
  var credits=el.getAttribute('data-credits'), price=el.getAttribute('data-price');
  [['credSelPack',intFmt(credits)],['credSelPrice',price],['credBuyPrice',price],['credCoPack',intFmt(credits)],['credCoPrice',price],['credCoBtnPrice',price]].forEach(function(x){ var n=$(x[0]); if(n) n.textContent=x[1]; });
  var next=$('kvCredNext'); if(next && !(KVC.data && KVC.data.can_buy===false)) next.disabled=false;
};
window.proceedToCredsCheckout = function(){
  if(!KVC.sel){ if(typeof toast==='function') toast(t('creds_pick_pack','Bir paket seçin')); return; }
  if(KVC.data && KVC.data.can_buy===false){ alertMsg('warning',t('kvc_err_title','İşlem yapılamadı'),t('kvc_no_buy','Kredi satın alma yetkiniz yok.')); return; }
  var s1=$('credsStep1'), s2=$('credsStep2'); if(s1) s1.style.display='none'; if(s2) s2.style.display='block';
};
window.backToCredsPack = function(){ var n=KVC.notice; modalReset(); };
// other features (people) open the modal with an explanation, e.g. "not enough credits"
KVC.open = function(notice){ KVC.notice = notice || null; window.openM('credits'); };

function renderHistory(){
  var s1=$('credsStep1'); if(!s1) return;
  var box=$('kvCredHist');
  if(!box){ box=document.createElement('details'); box.id='kvCredHist'; box.className='kv-cr-hist'; s1.appendChild(box); }
  var rows=(KVC.data&&KVC.data.ledger)||[];
  var loc=locale();
  function fmtDate(iso){ try{ return new Date(iso).toLocaleDateString(loc,{day:'numeric',month:'short',year:'numeric'}); }catch(e){ return ''; } }
  var body = rows.length ? rows.map(function(r){
    var lab=t('kvc_r_'+r.reason, r.reason);
    if(r.reason==='person_reveal' && r.channel) lab += ' ('+t('kvc_ch_'+r.channel, r.channel)+')';
    return '<div class="hr"><span class="d">'+esc(fmtDate(r.at))+'</span><span class="l">'+esc(lab)+'</span><span class="a '+(r.delta>0?'pos':'neg')+'">'+(r.delta>0?'+':'−')+esc(intFmt(Math.abs(r.delta)))+'</span><span class="b">'+esc(intFmt(r.balance_after))+'</span></div>';
  }).join('') : '<div class="hr empty">'+esc(t('kvc_hist_empty','Henüz hareket yok.'))+'</div>';
  box.innerHTML='<summary>'+esc(t('kvc_hist','Kredi hareketleri'))+'</summary><div class="hist-list">'+body+'</div>';
}

window.completeCreditsPurchase = function(){
  if(!KVC.sel) return;
  var btn=$('kvCredPay'); if(btn && btn.disabled) return;
  if(btn){ btn.disabled=true; btn.setAttribute('aria-busy','true'); btn.style.opacity='.6'; }
  var done=function(){ if(btn){ btn.disabled=false; btn.removeAttribute('aria-busy'); btn.style.opacity=''; } };
  API('POST','/kv/orders/credits',{pack:KVC.sel}).then(function(r){
    var d=r.data||{};
    if(r.ok && d.redirect){ location.href=d.redirect; return; }              // Stripe'ın barındırılan ödeme sayfası (düğme sayfa değişene kadar kilitli kalır)
    done();
    if(r.ok){                                                                // ödeme sağlayıcısı yok: sipariş beklemede, yönetici onaylayınca krediler yüklenir
      var h=$('kvCredHosted'), p=$('kvCredPending');
      if(h) h.hidden=true;
      if(p){
        p.hidden=false;
        p.innerHTML='<div class="kv-cr-pending-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>'+
          '<h4>'+esc(t('kvc_order_h','Siparişiniz alındı'))+'</h4><p>'+esc(t('kvc_order_t','',{order:d.order,credits:intFmt(d.credits),price:money((d.amount_cents||0)/100)}))+'</p>'+
          '<button type="button" class="btn sec sm" onclick="closeM(\'credits\')">'+esc(t('kvc_close','Kapat'))+'</button>';
      }
      KVC.load(true);
      return;
    }
    var e=d.error;
    if(r.status===403 && d.need==='billing') alertMsg('warning',t('kvc_err_title','İşlem yapılamadı'),t('kvc_no_buy','Kredi satın alma yetkiniz yok.'));
    else if(r.status===429) alertMsg('warning',t('kvc_err_title','İşlem yapılamadı'),t('kvc_rate','Çok sık deneme.'));
    else if(e==='unknown_pack'){ alertMsg('warning',t('kvc_err_title','İşlem yapılamadı'),t('kvc_load_err','Paketler yüklenemedi.')); KVC.load(true).then(function(){ modalReset(); renderPacks(); }); }
    else alertMsg('destructive',t('kvc_err_title','İşlem yapılamadı'),(d.message||t('kvc_load_err','Bir hata oluştu.')));
  });
};

var _openM = window.openM;
window.openM = function(k){
  if(k==='credits'){
    if(!window.KV_USER){ KVC.notice=null; if(typeof go==='function') go('login'); alertMsg('info',t('kvc_err_title','İşlem yapılamadı'),t('kvc_login_first','Krediler için önce giriş yapın.')); return; }
    if(!canUse()){ KVC.notice=null; alertMsg('warning',t('kvc_err_title','İşlem yapılamadı'),t('kvc_cant','Bu işlem için yetkiniz yok.')); return; }
    var r=_openM ? _openM.apply(this,arguments) : undefined;
    modalReset(); KVC.i18n.apply($('mCredits'));
    var host=$('kvCredPacks'); if(host && !host.children.length) host.innerHTML='<div class="kv-cr-skel"></div><div class="kv-cr-skel"></div><div class="kv-cr-skel"></div>';
    KVC.load(true).then(renderPacks);
    return r;
  }
  return _openM ? _openM.apply(this,arguments) : undefined;
};

// ───────────────────────── fiyat sayfası: kredi paketleri (herkese açık liste) ─────────────────────────
function renderPricing(){
  var box=$('kvPrCredits'), host=$('kvPrPacks'), c=KVC.cat;
  if(!box || !host || !c || !c.packs || !c.packs.length) return;
  box.hidden=false;
  host.innerHTML=c.packs.map(function(p){
    return '<button type="button" class="kv-pr-pack" onclick="kvBuyPack(\''+escJs(p.pack)+'\')"><b>'+esc(intFmt(p.credits))+'</b><span>'+esc(t('creds_lbl','Kredi'))+'</span><em>$'+esc(money(p.price_usd))+'</em></button>';
  }).join('');
  var li=$('kvSpF8'); if(li) li.hidden = !(c.pro_bonus>0);
}
window.kvBuyPack = function(pack){ KVC.sel = String(pack); window.openM('credits'); };

// ───────────────────────── Stripe dönüşü: ?paid=1[&credits=1] ─────────────────────────
function recentRow(reasons, minutes){
  var rows=(KVC.data&&KVC.data.ledger)||[], now=Date.now();
  return rows.filter(function(r){ return reasons.indexOf(r.reason)!==-1 && r.at && (now-new Date(r.at).getTime()) < minutes*60000; })[0] || null;
}
function pollForCredits(reasons, successKey, tries){
  KVC.load(true).then(function(d){
    if(!d) return;
    var row=recentRow(reasons, 15);
    if(row){ alertMsg('success',t('kvc_paid_h','Ödeme alındı'),t(successKey,'',{balance:intFmt(d.balance),bonus:intFmt(d.pro_bonus)})); return; }
    if(tries>0) setTimeout(function(){ pollForCredits(reasons, successKey, tries-1); }, 2000);
    else alertMsg('info',t('kvc_paid_h','Ödeme alındı'),t('kvc_paid_wait','Ödemeniz alındı; krediler birkaç saniye içinde hesabınıza yüklenir.'));
  });
}
function handleReturn(){
  var q=location.search, creds=/[?&]credits=1/.test(q);
  if(/[?&]paid=1/.test(q) && window.KV_USER){
    if(creds){
      setTimeout(function(){ try{ if(typeof showPanel==='function') showPanel('people'); }catch(e){} pollForCredits(['purchase'],'kvc_paid_t',9); }, 700);
    } else if(can('billing') || can('people')){
      setTimeout(function(){ pollForBonus(); }, 900);
    }
  } else if(/[?&]cancelled=1/.test(q) && creds){
    setTimeout(function(){ alertMsg('info',t('kvc_cancel_h','Ödeme tamamlanmadı'),t('kvc_cancel_t','Karttan çekim yapılmadı, kredi eklenmedi.')); },700);
  }
  if(creds){ try{ history.replaceState(history.state,'',location.pathname); }catch(e){} }
}
function pollForBonus(){
  // Premium: the +bonus credits arrive with the same webhook; tell the member when they are there (nothing to say when no bonus is configured)
  KVC.load(true).then(function(d){
    if(!d || !(d.pro_bonus>0)) return;
    var tries=9;
    (function loop(){
      var row=recentRow(['pro_bonus'],15);
      if(row){ alertMsg('success',t('kvc_paid_h','Ödeme alındı'),t('kvc_pro_t','',{bonus:intFmt(d.pro_bonus),balance:intFmt(KVC.balance)})); return; }
      if(tries--<=0) return;
      setTimeout(function(){ KVC.load(true).then(loop); },2000);
    })();
  });
}

// ───────────────────────── Premium kilidi: firma sayfasındaki görünüm ─────────────────────────
// Sunucu kilitli alanları HİÇ göndermez; burada yalnızca yer tutucu çizilir (gerçek değer yok, bulanıklaştırılmış gerçek metin yok).
var LOCK_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
function phRow(label){ return '<tr class="kv-lk-row"><td>'+label+'</td><td><span class="kv-ph" aria-hidden="true"></span></td></tr>'; }
function tr_(k,fb){ return (window.T && T[lang()] && T[lang()][k]) || fb; }
function lockCard(sub, rows, ctaHtml){
  return '<div class="kv-lock"><div class="kv-lock-hd"><span class="kv-lock-ic">'+LOCK_SVG+'</span><b>'+esc(t('kvl_lock','Premium ile açılır'))+'</b></div>'+
    (rows?'<table class="fptable kv-lock-tbl" role="presentation">'+rows+'</table>':'')+
    '<p class="kv-lock-sub">'+esc(sub)+'</p>'+ctaHtml+'</div>';
}
function openTable(p){
  var c=p.contact||{}, tt=window.T?(T[lang()]||T.tr):{};
  function row(k,v){ return v?'<tr><td>'+k+'</td><td>'+esc(v)+'</td></tr>':''; }
  var wa = c.wa ? '<div class="fpcta"><a class="btn fpwa" href="https://wa.me/'+String(c.wa).replace(/[^\d]/g,'')+'" target="_blank" rel="noopener noreferrer">'+((window.KV_ICONS&&KV_ICONS.wa)?KV_ICONS.wa.replace('<svg','<svg width="15" height="15"'):'')+' WhatsApp</a></div>' : '';
  var web = c.web ? '<tr><td>Web</td><td><a href="'+esc(window.sanitizeUrl?sanitizeUrl(c.web):'#')+'" target="_blank" rel="noopener noreferrer nofollow">'+esc(String(c.web).replace(/^https?:\/\//i,''))+'</a></td></tr>' : '';
  return wa+'<table class="fptable">'+row(tt.fp_email,c.email)+row(tt.fp_phone,c.phone)+web+row(tt.fl_address?String(tt.fl_address).toUpperCase():'ADRES',c.addr)+'</table>';
}
window.kvContactBlock = function(p){
  var tt=window.T?(T[lang()]||T.tr):{};
  var state = p.contact ? 'open' : (p.contact_state || 'login');
  var id=escJs(p.id);
  if(state==='open') return openTable(p);
  var rows = phRow(esc(tt.fp_email||'E-posta'))+phRow(esc(tt.fp_phone||'Telefon'))+phRow('Web')+phRow(esc(tt.fl_address?String(tt.fl_address).toUpperCase():'ADRES'));
  if(state==='declined') return '<p style="color:var(--faint);font-size:13.5px;margin:6px 0 0">'+esc(t('kvl_declined','Bu firma iletişim bilgilerini paylaşmamayı tercih etti.'))+'</p>';
  if(state==='reveal') return lockCard(t('kvl_reveal_sub','Premium üyesiniz: bilgileri tek tıkla açabilirsiniz.'), rows, '<button type="button" class="kv-lock-cta" onclick="revealContact(\''+id+'\')">'+esc(t('kvl_reveal','Bilgileri göster'))+' →</button>');
  if(state==='premium') return lockCard(t('kvl_prem_sub','E-posta, telefon, web sitesi ve adres Premium üyelere açılır.'), rows, '<button type="button" class="kv-lock-cta" onclick="upgradeToPro()">'+esc(t('kvl_upgrade',"Premium'a Yükselt"))+' →</button>');
  return lockCard(t('kvl_login_sub','İletişim bilgileri Premium üyelere açılır. Devam etmek için giriş yapın.'), rows, '<button type="button" class="kv-lock-cta" onclick="go(\'login\')">'+esc(t('kvl_login','Giriş yap'))+' →</button>');
};
window.kvRepLocked = function(p){
  var tt=window.T?(T[lang()]||T.tr):{};
  return '<div class="fpblock"><h3>'+esc(tt.fp_rep||'Yetkili')+'</h3><div class="kv-lock-mini"><span class="kv-lock-ic">'+LOCK_SVG+'</span><div><span class="kv-ph kv-ph-w" aria-hidden="true"></span><div class="kv-lock-note">'+esc(t('kvl_rep_lock','Yetkili kişi Premium üyelere açılır.'))+'</div></div></div></div>';
};
window.kvSocialsLocked = function(p){
  var tt=window.T?(T[lang()]||T.tr):{};
  return '<div class="fpblock"><h3>'+esc(tt.sec_social_sh||'Sosyal medya')+'</h3><div class="kv-lock-mini"><span class="kv-lock-ic">'+LOCK_SVG+'</span><div class="kv-lock-note">'+esc(t('kvl_soc_lock','Sosyal medya bağlantıları Premium üyelere açılır.'))+'</div></div></div>';
};
// sektörü farklı firma: maskeli sayfa + açıklama (sunucu kimliği ortaya çıkaran hiçbir şey göndermez)
window.kvSectorLockedPage = function(p){
  var host=$('fpgContent'); if(!host) return;
  var sm = window.getSecMeta ? getSecMeta(p.sec) : {g:'#0A211F',c:'#0D8A80',i:''};
  var secs=(typeof SI!=='undefined' && (SI[lang()]||SI.tr)) || {};
  var secName = (p.sec!=null && secs[p.sec]) || '';
  host.innerHTML='<div class="fpcover" style="background:'+sm.g+'"></div>'+
   '<div class="fphead"><div class="lgbig" style="background:'+sm.g+';color:#fff;border-color:var(--card);position:relative;padding:0"><div style="width:60%;height:60%;color:#fff">'+sm.i+'</div></div>'+
   '<div class="fpname"><div><h1>'+esc(p.nm||'••••')+'</h1>'+(secName?'<div class="taxln"><span>'+esc(secName)+'</span></div>':'')+'</div></div></div>'+
   '<div class="fpgridmain"><div class="fpblock kv-sector-lock"><span class="kv-lock-ic">'+LOCK_SVG+'</span><h3>'+esc(t('kvl_sec_h','Farklı sektör'))+'</h3><p>'+esc(t('kvl_sec_p','Bu firma farklı bir sektörde. Bu sektördeki kişilere Kişiler sekmesinden kredi ile ulaşabilirsiniz.'))+'</p>'+
   '<button type="button" class="kv-lock-cta" onclick="kvGoPeople()">'+esc(t('kvl_sec_cta',"Kişiler'e git"))+' →</button></div></div>';
};
window.kvGoPeople = function(){
  try{ if(typeof closeFirmModal==='function') closeFirmModal(); }catch(e){}
  if(!window.KV_USER){ go('login'); return; }
  go('panel');
  setTimeout(function(){ try{ var a=document.querySelector('.dmenu a[onclick*="showPanel(\'people\'"]'); showPanel('people',a||undefined); }catch(e){} },60);
};
window.kvLockOverlay = function(p, planLockHtml){
  // list/matches cards: "other sector" cards say so instead of offering Premium (Premium would not open them)
  if(p.lock!=='sector') return planLockHtml;
  return '<div class="lock-overlay kv-sec-lock" onclick="kvGoPeople()"><div class="lo-ic">'+LOCK_SVG+'</div><h4>'+esc(t('kvl_sec_h','Farklı sektör'))+'</h4><p>'+esc(t('kvl_card_p','Bu firma sektörünüzün dışında.'))+'</p><button class="lo-cta" onclick="event.stopPropagation();kvGoPeople()">'+esc(t('kvl_card_cta','Kişiler'))+'</button></div>';
};

// ───────────────────────── dil değişince ─────────────────────────
var _sl = window.setLang;
if(typeof _sl==='function'){
  window.setLang = function(l){ var r=_sl.apply(this,arguments); try{ KVC.i18n.apply(); KVC.paint(); renderPricing(); if($('mCredits') && $('mCredits').classList.contains('open')) renderPacks(); }catch(e){} return r; };
}
function boot(){
  KVC.i18n.apply();
  loadCatalog();
  if(window.KV_USER) KVC.load(true);
  handleReturn();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
