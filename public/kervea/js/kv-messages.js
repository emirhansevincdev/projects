/* Kervea panel · Mesajlar
   Gerçek üyeden-üyeye mesajlaşma. Sunucu tek doğruluk kaynağıdır (yetki, sektör, Premium, engel, kota); bu dosya yalnızca gösterir.
   kervea-api.js yüklendikten sonra çalışır ve prototipin sahte openConv / sendMsg / startMsg işlevlerinin yerini alır.
   Kullanılan: KV_API(method,url,body) -> Promise<{ok,status,data}>, KV_USER, KV_ME, kvShowAlert, escapeHtml,
   'kv:member' ve 'kv:panel' olayları. Tüm kullanıcı metinleri escapeHtml ile kaçırılır. */
(function(){
'use strict';
if(typeof window.KV_API !== 'function') return;
var API = window.KV_API;

/* ═══════════════════════════ çeviriler (tr kaynak; eksik olan İngilizceye düşer) ═══════════════════════════ */
var X = {
tr:{
 sub:"Aynı sektördeki onaylı firmalarla platform içinde yazışın · JPG, PNG, WEBP veya PDF eki (en fazla {mb} MB)",
 tab_inbox:"Gelen kutusu", tab_archive:"Arşiv", pick:"Bir konuşma seçin",
 ph:"Mesajınızı yazın…", kbd:"Enter gönderir · Shift+Enter yeni satır", send:"Gönder",
 attach_file:"Dosya ekle", attach_img:"Resim ekle", emoji:"Emoji", remove_att:"Eki kaldır",
 hint:"Ek: JPG, PNG, WEBP veya PDF · en fazla {mb} MB · Mesaj en fazla {n} karakter",
 sending:"Gönderiliyor…", sent:"Gönderildi", read:"Okundu", failed:"Gönderilemedi", retry:"Tekrar dene", discard:"Sil",
 today:"Bugün", yesterday:"Dün", older:"Eski mesajları yükle", loading:"Yükleniyor…", download:"İndir",
 e_title:"Henüz konuşmanız yok",
 e_pro:"Aynı sektördeki bir firmanın sayfasını açıp “{btn}” düğmesiyle ilk konuşmayı başlatın. Yazışmalarınız burada listelenir.",
 e_free:"Yeni konuşma başlatmak Premium üyelere özeldir. Bir firma size yazdığında ise her zaman ücretsiz yanıt verebilirsiniz; mesajlar burada görünür.",
 upgrade:"Premium'a geç", explore:"Eşleşmelere git",
 e_arch:"Arşivde konuşma yok.", e_search:"Aramanızla eşleşen konuşma yok.", e_load:"Konuşmalar yüklenemedi.",
 e_noperm:"Mesajlaşma için yetkiniz yok. Yöneticinizden “Mesajlaşma” yetkisi isteyin.",
 e_noco:"Mesajlaşma, firma başvurunuz onaylandıktan sonra açılır.",
 verified:"Doğrulanmış firma", back:"Konuşmalara dön", profile:"Firma profili", archive:"Arşivle", unarchive:"Gelen kutusuna taşı",
 block:"Firmayı engelle", unblock:"Engeli kaldır", report:"Şikayet et", reported:"Şikayet edildi",
 b_blocked:"Bu firmayı engellediniz; engeli kaldırmadan mesaj gönderemezsiniz.",
 b_unavail:"Bu firmaya şu anda mesaj gönderilemiyor.",
 b_sector:"Firmalar farklı sektörlerde olduğundan yeni mesaj gönderilemez. Mesajlaşma yalnızca aynı sektördeki firmalar arasındadır.",
 c_archive_t:"Konuşma arşivlensin mi?", c_archive_d:"Konuşma gelen kutunuzdan kalkar. Karşı firma yazarsa yeniden görünür.",
 c_block_t:"Bu firma engellensin mi?", c_block_d:"Engellediğiniz firma size yeni mesaj gönderemez ve siz de ona yazamazsınız. Konuşma arşivlenir. Engeli istediğiniz zaman kaldırabilirsiniz.",
 confirm:"Onayla", cancel:"İptal", close:"Kapat",
 r_t:"Mesajı şikayet et", r_d:"Şikayet Kervea yönetimine iletilir; karşı firma şikayet edildiğini görmez.",
 r_cat:"Neden", r_spam:"İstenmeyen / reklam (spam)", r_abuse:"Taciz veya hakaret", r_fraud:"Dolandırıcılık şüphesi",
 r_contact:"Platform dışına çıkarma / iletişim bilgisi isteme", r_other:"Diğer",
 r_ph:"Ne olduğunu kısaca anlatın (en az 3 karakter)", r_send:"Şikayet et", r_done:"Şikayetiniz iletildi. Teşekkürler.", r_already:"Bu mesajı daha önce şikayet ettiniz.",
 n_t:"{name} firmasına mesaj", n_d:"Mesajınız firmanın panel gelen kutusuna düşer. E-posta adresi veya telefon numarası paylaşılmaz.",
 n_ph:"Merhaba, ürünleriniz hakkında bilgi almak istiyoruz…",
 fp_msg:"Mesaj Gönder", fp_open:"Konuşmayı aç", fp_login:"Mesaj göndermek için giriş yapın.",
 fp_sector:"Mesajlaşma yalnızca kendi sektörünüzdeki firmalarla yapılır; bu firma farklı bir sektörde.",
 fp_unavail:"Bu firmaya şu anda mesaj gönderilemiyor.", fp_blocked:"Bu firmayı engellediniz. Mesajlar bölümünden engeli kaldırabilirsiniz.",
 fp_quota:"Bugün başlatabileceğiniz yeni konuşma sayısına ulaştınız. Yarın tekrar deneyin.",
 fp_noco:"Mesajlaşma için onaylı bir firma hesabı gerekir.", fp_noperm:"Mesajlaşma yetkiniz yok.",
 fp_pro_t:"Premium gerekli", fp_pro_d:"Yeni konuşma başlatmak Premium üyelere özeldir. Premium ile aynı sektördeki tüm firmalara yazabilirsiniz; gelen mesajlara ise her zaman ücretsiz yanıt verebilirsiniz.",
 x_self:"Kendi firmanıza mesaj gönderemezsiniz.", x_unavail:"Bu firmaya şu anda mesaj gönderilemiyor.",
 x_sector:"Mesajlaşma yalnızca aynı sektördeki firmalar arasındadır.", x_blocked:"Bu firmayı engellediniz. Önce engeli kaldırın.",
 x_pro:"Yeni konuşma başlatmak için Premium üyelik gerekir.", x_quota:"Bugün başlatabileceğiniz yeni konuşma sayısına ulaştınız.",
 x_file:"Bu dosya türü kabul edilmiyor (JPG, PNG, WEBP veya PDF).", x_big:"Dosya çok büyük (en fazla {mb} MB).",
 x_rate:"Çok hızlı mesaj gönderiyorsunuz. Lütfen biraz bekleyin.", x_generic:"İşlem tamamlanamadı. Bağlantınızı kontrol edip tekrar deneyin.",
 x_empty:"Mesaj boş olamaz.", x_long:"Mesaj en fazla {n} karakter olabilir.", x_gone:"Konuşma bulunamadı.", x_perm:"Bu işlem için yetkiniz yok.",
 t_err:"Mesaj gönderilemedi", t_action:"İşlem yapılamadı",
 d_archived:"Konuşma arşivlendi", d_unarchived:"Konuşma gelen kutusuna taşındı", d_blocked:"Firma engellendi · Arşiv sekmesinden engeli kaldırabilirsiniz", d_unblocked:"Engel kaldırıldı", d_sent:"Mesaj gönderildi",
 ov_unread:"okunmamış mesaj"
},
en:{
 sub:"Write to approved companies in your sector, inside the platform · JPG, PNG, WEBP or PDF attachments (up to {mb} MB)",
 tab_inbox:"Inbox", tab_archive:"Archive", pick:"Select a conversation",
 ph:"Write your message…", kbd:"Enter sends · Shift+Enter adds a line", send:"Send",
 attach_file:"Attach a file", attach_img:"Attach an image", emoji:"Emoji", remove_att:"Remove attachment",
 hint:"Attachments: JPG, PNG, WEBP or PDF · up to {mb} MB · messages up to {n} characters",
 sending:"Sending…", sent:"Sent", read:"Read", failed:"Not sent", retry:"Try again", discard:"Discard",
 today:"Today", yesterday:"Yesterday", older:"Load earlier messages", loading:"Loading…", download:"Download",
 e_title:"No conversations yet",
 e_pro:"Open the page of a company in your sector and use “{btn}” to start your first conversation. Your conversations are listed here.",
 e_free:"Starting a new conversation is a Premium feature. When a company writes to you, you can always reply for free; its messages appear here.",
 upgrade:"Go Premium", explore:"See your matches",
 e_arch:"No archived conversations.", e_search:"No conversation matches your search.", e_load:"Conversations could not be loaded.",
 e_noperm:"You do not have access to messaging. Ask your administrator for the “Messaging” permission.",
 e_noco:"Messaging opens once your company application is approved.",
 verified:"Verified company", back:"Back to conversations", profile:"Company profile", archive:"Archive", unarchive:"Move to inbox",
 block:"Block company", unblock:"Unblock", report:"Report", reported:"Reported",
 b_blocked:"You blocked this company. Unblock it to send messages.",
 b_unavail:"Messages to this company cannot be sent right now.",
 b_sector:"New messages cannot be sent because the companies are in different sectors. Messaging works between companies of the same sector only.",
 c_archive_t:"Archive this conversation?", c_archive_d:"It leaves your inbox. If the other company writes again, it comes back.",
 c_block_t:"Block this company?", c_block_d:"The company will not be able to message you and you cannot write to it. The conversation is archived. You can unblock it at any time.",
 confirm:"Confirm", cancel:"Cancel", close:"Close",
 r_t:"Report this message", r_d:"The report goes to the Kervea team; the other company is not told.",
 r_cat:"Reason", r_spam:"Spam / unwanted advertising", r_abuse:"Harassment or abuse", r_fraud:"Suspected fraud",
 r_contact:"Moving off-platform / asking for contact details", r_other:"Other",
 r_ph:"Briefly describe the problem (at least 3 characters)", r_send:"Report", r_done:"Your report was sent. Thank you.", r_already:"You already reported this message.",
 n_t:"Message to {name}", n_d:"Your message goes to the company's inbox in its panel. No e-mail address or phone number is shared.",
 n_ph:"Hello, we would like to learn more about your products…",
 fp_msg:"Send Message", fp_open:"Open conversation", fp_login:"Sign in to send a message.",
 fp_sector:"Messaging is only possible with companies in your own sector; this company is in a different sector.",
 fp_unavail:"Messages to this company cannot be sent right now.", fp_blocked:"You blocked this company. You can unblock it in the Messages section.",
 fp_quota:"You reached today's limit for new conversations. Try again tomorrow.",
 fp_noco:"Messaging requires an approved company account.", fp_noperm:"You do not have permission to use messaging.",
 fp_pro_t:"Premium required", fp_pro_d:"Starting a new conversation is a Premium feature. With Premium you can write to every company in your sector; replying to incoming messages is always free.",
 x_self:"You cannot message your own company.", x_unavail:"Messages to this company cannot be sent right now.",
 x_sector:"Messaging works between companies of the same sector only.", x_blocked:"You blocked this company. Unblock it first.",
 x_pro:"Starting a conversation requires a Premium membership.", x_quota:"You reached today's limit for new conversations.",
 x_file:"This file type is not accepted (JPG, PNG, WEBP or PDF).", x_big:"The file is too large (up to {mb} MB).",
 x_rate:"You are sending messages too fast. Please wait a moment.", x_generic:"The action could not be completed. Check your connection and try again.",
 x_empty:"The message cannot be empty.", x_long:"A message can be at most {n} characters.", x_gone:"Conversation not found.", x_perm:"You do not have permission for this.",
 t_err:"Message not sent", t_action:"Action failed",
 d_archived:"Conversation archived", d_unarchived:"Conversation moved to your inbox", d_blocked:"Company blocked · you can unblock it in the Archive tab", d_unblocked:"Company unblocked", d_sent:"Message sent",
 ov_unread:"unread messages"
},
es:{
 sub:"Escriba a empresas aprobadas de su sector dentro de la plataforma · adjuntos JPG, PNG, WEBP o PDF (hasta {mb} MB)",
 tab_inbox:"Bandeja", tab_archive:"Archivo", pick:"Seleccione una conversación",
 ph:"Escriba su mensaje…", kbd:"Enter envía · Shift+Enter nueva línea", send:"Enviar",
 attach_file:"Adjuntar archivo", attach_img:"Adjuntar imagen", emoji:"Emoji", remove_att:"Quitar adjunto",
 hint:"Adjuntos: JPG, PNG, WEBP o PDF · hasta {mb} MB · mensajes de hasta {n} caracteres",
 sending:"Enviando…", sent:"Enviado", read:"Leído", failed:"No enviado", retry:"Reintentar", discard:"Descartar",
 today:"Hoy", yesterday:"Ayer", older:"Cargar mensajes anteriores", loading:"Cargando…", download:"Descargar",
 e_title:"Aún no tiene conversaciones",
 e_pro:"Abra la página de una empresa de su sector y use «{btn}» para iniciar su primera conversación. Sus conversaciones aparecerán aquí.",
 e_free:"Iniciar una conversación nueva es una función Premium. Cuando una empresa le escriba, siempre podrá responder gratis; sus mensajes aparecerán aquí.",
 upgrade:"Pasar a Premium", explore:"Ver sus coincidencias",
 e_arch:"No hay conversaciones archivadas.", e_search:"Ninguna conversación coincide con su búsqueda.", e_load:"No se pudieron cargar las conversaciones.",
 e_noperm:"No tiene acceso a la mensajería. Pida el permiso «Mensajería» a su administrador.",
 e_noco:"La mensajería se activa cuando se aprueba la solicitud de su empresa.",
 verified:"Empresa verificada", back:"Volver a las conversaciones", profile:"Perfil de empresa", archive:"Archivar", unarchive:"Mover a la bandeja",
 block:"Bloquear empresa", unblock:"Desbloquear", report:"Denunciar", reported:"Denunciado",
 b_blocked:"Bloqueó a esta empresa. Desbloquéela para enviar mensajes.",
 b_unavail:"No se pueden enviar mensajes a esta empresa en este momento.",
 b_sector:"No se pueden enviar mensajes nuevos porque las empresas son de sectores distintos. La mensajería solo funciona entre empresas del mismo sector.",
 c_archive_t:"¿Archivar la conversación?", c_archive_d:"Saldrá de su bandeja. Si la otra empresa escribe, volverá a aparecer.",
 c_block_t:"¿Bloquear a esta empresa?", c_block_d:"La empresa no podrá escribirle ni usted a ella. La conversación se archiva. Puede desbloquearla cuando quiera.",
 confirm:"Confirmar", cancel:"Cancelar", close:"Cerrar",
 r_t:"Denunciar este mensaje", r_d:"La denuncia llega al equipo de Kervea; la otra empresa no lo sabe.",
 r_cat:"Motivo", r_spam:"Spam / publicidad no deseada", r_abuse:"Acoso o insultos", r_fraud:"Sospecha de fraude",
 r_contact:"Sacar la conversación de la plataforma / pedir datos de contacto", r_other:"Otro",
 r_ph:"Describa brevemente el problema (mínimo 3 caracteres)", r_send:"Denunciar", r_done:"Su denuncia fue enviada. Gracias.", r_already:"Ya denunció este mensaje.",
 n_t:"Mensaje a {name}", n_d:"Su mensaje llega a la bandeja del panel de la empresa. No se comparte ningún correo ni teléfono.",
 n_ph:"Hola, nos gustaría saber más sobre sus productos…",
 fp_msg:"Enviar Mensaje", fp_open:"Abrir conversación", fp_login:"Inicie sesión para enviar un mensaje.",
 fp_sector:"La mensajería solo es posible con empresas de su propio sector; esta empresa es de otro sector.",
 fp_unavail:"No se pueden enviar mensajes a esta empresa en este momento.", fp_blocked:"Bloqueó a esta empresa. Puede desbloquearla en la sección Mensajes.",
 fp_quota:"Alcanzó el límite de hoy para conversaciones nuevas. Inténtelo mañana.",
 fp_noco:"La mensajería requiere una cuenta de empresa aprobada.", fp_noperm:"No tiene permiso para usar la mensajería.",
 fp_pro_t:"Se requiere Premium", fp_pro_d:"Iniciar una conversación nueva es una función Premium. Con Premium puede escribir a todas las empresas de su sector; responder a los mensajes recibidos es siempre gratis.",
 x_self:"No puede enviar mensajes a su propia empresa.", x_unavail:"No se pueden enviar mensajes a esta empresa en este momento.",
 x_sector:"La mensajería solo funciona entre empresas del mismo sector.", x_blocked:"Bloqueó a esta empresa. Desbloquéela primero.",
 x_pro:"Iniciar una conversación requiere una membresía Premium.", x_quota:"Alcanzó el límite de hoy para conversaciones nuevas.",
 x_file:"Este tipo de archivo no se acepta (JPG, PNG, WEBP o PDF).", x_big:"El archivo es demasiado grande (hasta {mb} MB).",
 x_rate:"Está enviando mensajes demasiado rápido. Espere un momento.", x_generic:"No se pudo completar la acción. Compruebe su conexión e inténtelo de nuevo.",
 x_empty:"El mensaje no puede estar vacío.", x_long:"Un mensaje puede tener como máximo {n} caracteres.", x_gone:"Conversación no encontrada.", x_perm:"No tiene permiso para esta acción.",
 t_err:"Mensaje no enviado", t_action:"No se pudo completar la acción",
 d_archived:"Conversación archivada", d_unarchived:"Conversación movida a la bandeja", d_blocked:"Empresa bloqueada · puede desbloquearla en la pestaña Archivo", d_unblocked:"Empresa desbloqueada", d_sent:"Mensaje enviado",
 ov_unread:"mensajes sin leer"
},
fr:{
 sub:"Écrivez aux entreprises approuvées de votre secteur, dans la plateforme · pièces jointes JPG, PNG, WEBP ou PDF (jusqu'à {mb} Mo)",
 tab_inbox:"Réception", tab_archive:"Archives", pick:"Sélectionnez une conversation",
 ph:"Écrivez votre message…", kbd:"Entrée envoie · Maj+Entrée nouvelle ligne", send:"Envoyer",
 attach_file:"Joindre un fichier", attach_img:"Joindre une image", emoji:"Émoji", remove_att:"Retirer la pièce jointe",
 hint:"Pièces jointes : JPG, PNG, WEBP ou PDF · jusqu'à {mb} Mo · messages de {n} caractères maximum",
 sending:"Envoi…", sent:"Envoyé", read:"Lu", failed:"Non envoyé", retry:"Réessayer", discard:"Supprimer",
 today:"Aujourd'hui", yesterday:"Hier", older:"Charger les messages précédents", loading:"Chargement…", download:"Télécharger",
 e_title:"Aucune conversation pour l'instant",
 e_pro:"Ouvrez la page d'une entreprise de votre secteur et utilisez « {btn} » pour démarrer votre première conversation. Vos conversations apparaissent ici.",
 e_free:"Démarrer une nouvelle conversation est réservé aux membres Premium. Lorsqu'une entreprise vous écrit, vous pouvez toujours répondre gratuitement ; ses messages apparaissent ici.",
 upgrade:"Passer à Premium", explore:"Voir vos correspondances",
 e_arch:"Aucune conversation archivée.", e_search:"Aucune conversation ne correspond à votre recherche.", e_load:"Impossible de charger les conversations.",
 e_noperm:"Vous n'avez pas accès à la messagerie. Demandez l'autorisation « Messagerie » à votre administrateur.",
 e_noco:"La messagerie s'ouvre une fois la demande de votre entreprise approuvée.",
 verified:"Entreprise vérifiée", back:"Retour aux conversations", profile:"Profil d'entreprise", archive:"Archiver", unarchive:"Remettre en réception",
 block:"Bloquer l'entreprise", unblock:"Débloquer", report:"Signaler", reported:"Signalé",
 b_blocked:"Vous avez bloqué cette entreprise. Débloquez-la pour envoyer des messages.",
 b_unavail:"Impossible d'envoyer des messages à cette entreprise pour le moment.",
 b_sector:"Impossible d'envoyer de nouveaux messages : les entreprises sont dans des secteurs différents. La messagerie ne fonctionne qu'entre entreprises du même secteur.",
 c_archive_t:"Archiver la conversation ?", c_archive_d:"Elle quitte votre boîte de réception. Si l'autre entreprise écrit, elle réapparaît.",
 c_block_t:"Bloquer cette entreprise ?", c_block_d:"Cette entreprise ne pourra plus vous écrire et vous ne pourrez plus lui écrire. La conversation est archivée. Vous pouvez la débloquer à tout moment.",
 confirm:"Confirmer", cancel:"Annuler", close:"Fermer",
 r_t:"Signaler ce message", r_d:"Le signalement est transmis à l'équipe Kervea ; l'autre entreprise n'en est pas informée.",
 r_cat:"Motif", r_spam:"Spam / publicité indésirable", r_abuse:"Harcèlement ou insultes", r_fraud:"Soupçon de fraude",
 r_contact:"Sortie de la plateforme / demande de coordonnées", r_other:"Autre",
 r_ph:"Décrivez brièvement le problème (3 caractères minimum)", r_send:"Signaler", r_done:"Votre signalement a été envoyé. Merci.", r_already:"Vous avez déjà signalé ce message.",
 n_t:"Message à {name}", n_d:"Votre message arrive dans la boîte de réception du panneau de l'entreprise. Aucune adresse e-mail ni aucun numéro n'est partagé.",
 n_ph:"Bonjour, nous aimerions en savoir plus sur vos produits…",
 fp_msg:"Envoyer Message", fp_open:"Ouvrir la conversation", fp_login:"Connectez-vous pour envoyer un message.",
 fp_sector:"La messagerie n'est possible qu'avec les entreprises de votre secteur ; cette entreprise est dans un autre secteur.",
 fp_unavail:"Impossible d'envoyer des messages à cette entreprise pour le moment.", fp_blocked:"Vous avez bloqué cette entreprise. Vous pouvez la débloquer dans la section Messages.",
 fp_quota:"Vous avez atteint la limite du jour pour les nouvelles conversations. Réessayez demain.",
 fp_noco:"La messagerie nécessite un compte d'entreprise approuvé.", fp_noperm:"Vous n'avez pas l'autorisation d'utiliser la messagerie.",
 fp_pro_t:"Premium requis", fp_pro_d:"Démarrer une nouvelle conversation est réservé aux membres Premium. Avec Premium, vous pouvez écrire à toutes les entreprises de votre secteur ; répondre aux messages reçus reste toujours gratuit.",
 x_self:"Vous ne pouvez pas écrire à votre propre entreprise.", x_unavail:"Impossible d'envoyer des messages à cette entreprise pour le moment.",
 x_sector:"La messagerie ne fonctionne qu'entre entreprises du même secteur.", x_blocked:"Vous avez bloqué cette entreprise. Débloquez-la d'abord.",
 x_pro:"Démarrer une conversation nécessite un abonnement Premium.", x_quota:"Vous avez atteint la limite du jour pour les nouvelles conversations.",
 x_file:"Ce type de fichier n'est pas accepté (JPG, PNG, WEBP ou PDF).", x_big:"Le fichier est trop volumineux (jusqu'à {mb} Mo).",
 x_rate:"Vous envoyez des messages trop vite. Patientez un instant.", x_generic:"L'action n'a pas pu aboutir. Vérifiez votre connexion et réessayez.",
 x_empty:"Le message ne peut pas être vide.", x_long:"Un message peut contenir au maximum {n} caractères.", x_gone:"Conversation introuvable.", x_perm:"Vous n'avez pas l'autorisation pour cette action.",
 t_err:"Message non envoyé", t_action:"Action impossible",
 d_archived:"Conversation archivée", d_unarchived:"Conversation remise dans la boîte de réception", d_blocked:"Entreprise bloquée · vous pouvez la débloquer dans l'onglet Archives", d_unblocked:"Entreprise débloquée", d_sent:"Message envoyé",
 ov_unread:"messages non lus"
},
ar:{
 sub:"راسل الشركات المعتمدة في قطاعك داخل المنصة · مرفقات JPG وPNG وWEBP أو PDF (حتى {mb} ميغابايت)",
 tab_inbox:"الوارد", tab_archive:"الأرشيف", pick:"اختر محادثة",
 ph:"اكتب رسالتك…", kbd:"Enter للإرسال · Shift+Enter لسطر جديد", send:"إرسال",
 attach_file:"إرفاق ملف", attach_img:"إرفاق صورة", emoji:"إيموجي", remove_att:"إزالة المرفق",
 hint:"المرفقات: JPG أو PNG أو WEBP أو PDF · حتى {mb} ميغابايت · الرسالة حتى {n} حرفًا",
 sending:"جارٍ الإرسال…", sent:"تم الإرسال", read:"مقروء", failed:"لم تُرسل", retry:"أعد المحاولة", discard:"حذف",
 today:"اليوم", yesterday:"أمس", older:"تحميل الرسائل الأقدم", loading:"جارٍ التحميل…", download:"تنزيل",
 e_title:"لا توجد محادثات بعد",
 e_pro:"افتح صفحة شركة في قطاعك واستخدم «{btn}» لبدء أول محادثة. ستظهر محادثاتك هنا.",
 e_free:"بدء محادثة جديدة ميزة لأعضاء Premium. أما عندما تراسلك شركة فيمكنك الرد دائمًا مجانًا، وستظهر رسائلها هنا.",
 upgrade:"الترقية إلى Premium", explore:"عرض التطابقات",
 e_arch:"لا توجد محادثات مؤرشفة.", e_search:"لا توجد محادثة تطابق بحثك.", e_load:"تعذّر تحميل المحادثات.",
 e_noperm:"ليست لديك صلاحية المراسلة. اطلب صلاحية «المراسلة» من المسؤول.",
 e_noco:"تُفعَّل المراسلة بعد الموافقة على طلب شركتك.",
 verified:"شركة موثقة", back:"العودة إلى المحادثات", profile:"ملف الشركة", archive:"أرشفة", unarchive:"إعادة إلى الوارد",
 block:"حظر الشركة", unblock:"إلغاء الحظر", report:"إبلاغ", reported:"تم الإبلاغ",
 b_blocked:"لقد حظرت هذه الشركة. ألغِ الحظر لإرسال الرسائل.",
 b_unavail:"لا يمكن إرسال رسائل إلى هذه الشركة حاليًا.",
 b_sector:"لا يمكن إرسال رسائل جديدة لأن الشركتين في قطاعين مختلفين. المراسلة متاحة بين شركات القطاع نفسه فقط.",
 c_archive_t:"أرشفة المحادثة؟", c_archive_d:"ستختفي من الوارد، وتعود إذا راسلتك الشركة الأخرى.",
 c_block_t:"حظر هذه الشركة؟", c_block_d:"لن تستطيع الشركة مراسلتك ولن تستطيع مراسلتها. ستُؤرشف المحادثة. يمكنك إلغاء الحظر في أي وقت.",
 confirm:"تأكيد", cancel:"إلغاء", close:"إغلاق",
 r_t:"الإبلاغ عن هذه الرسالة", r_d:"يصل البلاغ إلى فريق Kervea ولا تعرف الشركة الأخرى به.",
 r_cat:"السبب", r_spam:"رسائل مزعجة / إعلانات غير مرغوبة", r_abuse:"مضايقة أو إساءة", r_fraud:"اشتباه في احتيال",
 r_contact:"نقل المحادثة خارج المنصة / طلب بيانات الاتصال", r_other:"أخرى",
 r_ph:"صِف المشكلة باختصار (3 أحرف على الأقل)", r_send:"إبلاغ", r_done:"تم إرسال بلاغك. شكرًا لك.", r_already:"سبق أن أبلغت عن هذه الرسالة.",
 n_t:"رسالة إلى {name}", n_d:"تصل رسالتك إلى صندوق الوارد في لوحة الشركة. لا تتم مشاركة أي بريد إلكتروني أو رقم هاتف.",
 n_ph:"مرحبًا، نود معرفة المزيد عن منتجاتكم…",
 fp_msg:"أرسل رسالة", fp_open:"فتح المحادثة", fp_login:"سجّل الدخول لإرسال رسالة.",
 fp_sector:"المراسلة متاحة فقط مع شركات قطاعك؛ هذه الشركة في قطاع مختلف.",
 fp_unavail:"لا يمكن إرسال رسائل إلى هذه الشركة حاليًا.", fp_blocked:"لقد حظرت هذه الشركة. يمكنك إلغاء الحظر من قسم الرسائل.",
 fp_quota:"بلغت حد اليوم للمحادثات الجديدة. حاول غدًا.",
 fp_noco:"تتطلب المراسلة حساب شركة معتمدًا.", fp_noperm:"ليست لديك صلاحية استخدام المراسلة.",
 fp_pro_t:"مطلوب Premium", fp_pro_d:"بدء محادثة جديدة ميزة لأعضاء Premium. مع Premium يمكنك مراسلة كل شركات قطاعك، أما الرد على الرسائل الواردة فمجاني دائمًا.",
 x_self:"لا يمكنك مراسلة شركتك.", x_unavail:"لا يمكن إرسال رسائل إلى هذه الشركة حاليًا.",
 x_sector:"المراسلة متاحة بين شركات القطاع نفسه فقط.", x_blocked:"لقد حظرت هذه الشركة. ألغِ الحظر أولًا.",
 x_pro:"بدء محادثة يتطلب عضوية Premium.", x_quota:"بلغت حد اليوم للمحادثات الجديدة.",
 x_file:"نوع الملف غير مقبول (JPG أو PNG أو WEBP أو PDF).", x_big:"الملف كبير جدًا (حتى {mb} ميغابايت).",
 x_rate:"ترسل الرسائل بسرعة كبيرة. انتظر قليلًا.", x_generic:"تعذّر إكمال العملية. تحقق من اتصالك وحاول مرة أخرى.",
 x_empty:"لا يمكن أن تكون الرسالة فارغة.", x_long:"يمكن أن تصل الرسالة إلى {n} حرفًا كحد أقصى.", x_gone:"المحادثة غير موجودة.", x_perm:"ليست لديك صلاحية لهذا الإجراء.",
 t_err:"لم تُرسل الرسالة", t_action:"تعذّر تنفيذ العملية",
 d_archived:"تمت أرشفة المحادثة", d_unarchived:"أُعيدت المحادثة إلى الوارد", d_blocked:"تم حظر الشركة · يمكنك إلغاء الحظر من تبويب الأرشيف", d_unblocked:"أُلغي حظر الشركة", d_sent:"تم إرسال الرسالة",
 ov_unread:"رسائل غير مقروءة"
},
ru:{
 sub:"Пишите одобренным компаниям вашей отрасли прямо на платформе · вложения JPG, PNG, WEBP или PDF (до {mb} МБ)",
 tab_inbox:"Входящие", tab_archive:"Архив", pick:"Выберите диалог",
 ph:"Напишите сообщение…", kbd:"Enter — отправить · Shift+Enter — новая строка", send:"Отправить",
 attach_file:"Прикрепить файл", attach_img:"Прикрепить изображение", emoji:"Эмодзи", remove_att:"Убрать вложение",
 hint:"Вложения: JPG, PNG, WEBP или PDF · до {mb} МБ · сообщение до {n} символов",
 sending:"Отправка…", sent:"Отправлено", read:"Прочитано", failed:"Не отправлено", retry:"Повторить", discard:"Удалить",
 today:"Сегодня", yesterday:"Вчера", older:"Загрузить более ранние сообщения", loading:"Загрузка…", download:"Скачать",
 e_title:"Пока нет диалогов",
 e_pro:"Откройте страницу компании вашей отрасли и нажмите «{btn}», чтобы начать первый диалог. Диалоги будут показаны здесь.",
 e_free:"Начинать новые диалоги могут только участники Premium. Если вам напишет компания, отвечать можно всегда и бесплатно — сообщения появятся здесь.",
 upgrade:"Перейти на Premium", explore:"Перейти к совпадениям",
 e_arch:"В архиве нет диалогов.", e_search:"По вашему запросу диалогов нет.", e_load:"Не удалось загрузить диалоги.",
 e_noperm:"У вас нет доступа к сообщениям. Попросите администратора выдать право «Сообщения».",
 e_noco:"Сообщения станут доступны после одобрения заявки вашей компании.",
 verified:"Проверенная компания", back:"К списку диалогов", profile:"Профиль компании", archive:"Архивировать", unarchive:"Вернуть во входящие",
 block:"Заблокировать компанию", unblock:"Разблокировать", report:"Пожаловаться", reported:"Жалоба отправлена",
 b_blocked:"Вы заблокировали эту компанию. Разблокируйте её, чтобы писать.",
 b_unavail:"Сейчас нельзя отправить сообщение этой компании.",
 b_sector:"Новые сообщения отправить нельзя: компании работают в разных отраслях. Переписка возможна только внутри одной отрасли.",
 c_archive_t:"Архивировать диалог?", c_archive_d:"Диалог исчезнет из входящих. Если другая компания напишет снова, он вернётся.",
 c_block_t:"Заблокировать эту компанию?", c_block_d:"Компания не сможет писать вам, а вы — ей. Диалог будет архивирован. Блокировку можно снять в любой момент.",
 confirm:"Подтвердить", cancel:"Отмена", close:"Закрыть",
 r_t:"Пожаловаться на сообщение", r_d:"Жалоба уходит команде Kervea; другая компания об этом не узнает.",
 r_cat:"Причина", r_spam:"Спам / нежелательная реклама", r_abuse:"Оскорбления или домогательства", r_fraud:"Подозрение на мошенничество",
 r_contact:"Увод с платформы / запрос контактов", r_other:"Другое",
 r_ph:"Кратко опишите проблему (не менее 3 символов)", r_send:"Пожаловаться", r_done:"Жалоба отправлена. Спасибо.", r_already:"Вы уже жаловались на это сообщение.",
 n_t:"Сообщение для {name}", n_d:"Сообщение попадёт во входящие кабинета компании. E-mail и телефон не раскрываются.",
 n_ph:"Здравствуйте, хотим узнать больше о вашей продукции…",
 fp_msg:"Отправить", fp_open:"Открыть диалог", fp_login:"Войдите, чтобы отправить сообщение.",
 fp_sector:"Переписка возможна только с компаниями вашей отрасли; эта компания — из другой отрасли.",
 fp_unavail:"Сейчас нельзя отправить сообщение этой компании.", fp_blocked:"Вы заблокировали эту компанию. Блокировку можно снять в разделе «Сообщения».",
 fp_quota:"Вы исчерпали сегодняшний лимит новых диалогов. Попробуйте завтра.",
 fp_noco:"Для сообщений нужен одобренный аккаунт компании.", fp_noperm:"У вас нет права пользоваться сообщениями.",
 fp_pro_t:"Нужен Premium", fp_pro_d:"Начинать новые диалоги могут только участники Premium. С Premium можно писать всем компаниям вашей отрасли; отвечать на входящие сообщения всегда бесплатно.",
 x_self:"Нельзя писать собственной компании.", x_unavail:"Сейчас нельзя отправить сообщение этой компании.",
 x_sector:"Переписка возможна только внутри одной отрасли.", x_blocked:"Вы заблокировали эту компанию. Сначала разблокируйте её.",
 x_pro:"Чтобы начать диалог, нужна подписка Premium.", x_quota:"Вы исчерпали сегодняшний лимит новых диалогов.",
 x_file:"Такой тип файла не принимается (JPG, PNG, WEBP или PDF).", x_big:"Файл слишком большой (до {mb} МБ).",
 x_rate:"Вы отправляете сообщения слишком быстро. Подождите немного.", x_generic:"Не удалось выполнить действие. Проверьте соединение и повторите.",
 x_empty:"Сообщение не может быть пустым.", x_long:"Сообщение — не более {n} символов.", x_gone:"Диалог не найден.", x_perm:"У вас нет права на это действие.",
 t_err:"Сообщение не отправлено", t_action:"Действие не выполнено",
 d_archived:"Диалог архивирован", d_unarchived:"Диалог возвращён во входящие", d_blocked:"Компания заблокирована · разблокировать можно во вкладке «Архив»", d_unblocked:"Компания разблокирована", d_sent:"Сообщение отправлено",
 ov_unread:"непрочитанных сообщений"
}
};
function lang(){ return window.LANG || 'tr'; }
function L(k, v){
  var d = X[lang()], s = (d && d[k] != null) ? d[k] : (X.en[k] != null ? X.en[k] : (X.tr[k] != null ? X.tr[k] : k));
  if(v){ for(var a in v){ if(Object.prototype.hasOwnProperty.call(v, a)) s = String(s).split('{'+a+'}').join(v[a]); } }
  return s;
}
// T sözlüğüne kaydet: data-i18n / data-i18n-ph / data-i18n-title öznitelikleri setLang ile çevrilir; eksik dil İngilizceye düşer
(function(){
  if(!window.T) return;
  Object.keys(X).forEach(function(l){
    if(!T[l]) T[l] = {};
    Object.keys(X.tr).forEach(function(k){ T[l]['kvm_'+k] = (X[l] && X[l][k] != null) ? X[l][k] : X.en[k]; });
  });
})();

/* ═══════════════════════════ yardımcılar ═══════════════════════════ */
function $(id){ return document.getElementById(id); }
function esc(s){ return window.escapeHtml(s == null ? '' : String(s)); }
function root(){ return $('dp-messages'); }
function panelOpen(){ var r = root(), p = $('panel'); return !!(r && r.classList.contains('on') && p && p.classList.contains('on')); }
function perms(){ return (window.KV_USER && window.KV_USER.perms) || []; }
function hasCompany(){ return !!(window.KV_USER && window.KV_USER.company); }
function approved(){ var m = window.KV_ME; return !(m && m.company && m.company.status && m.company.status !== 'approved'); }
function gate(){
  if(!window.KV_USER) return 'noco';
  if(S.deny) return S.deny;                      // the server said no (no approved company / no messaging permission)
  if(!hasCompany() || !approved()) return 'noco';
  if(perms().indexOf('messages') < 0) return 'noperm';
  return null;
}
function canUse(){ return !gate(); }
function mb(){ return Math.max(1, Math.round((S.limits.attachment_kb || 5120) / 1024)); }
function alertBox(variant, title, text){ if(typeof window.kvShowAlert === 'function') window.kvShowAlert(variant, title, text); else if(typeof window.toast === 'function') window.toast(text); }
function say(text){ if(typeof window.toast === 'function') window.toast(text); }

var IC = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg>',
  clip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>',
  file:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  firm:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01"/></svg>',
  arch:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
  inbox:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>',
  block:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><polyline points="15 18 9 12 15 6"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  chatS:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
};

/* tarih / saat: arayüz diline göre */
function loc(){ return ({tr:'tr-TR', en:'en-GB', es:'es-ES', fr:'fr-FR', ar:'ar', ru:'ru-RU'})[lang()] || 'tr-TR'; }
function toDate(iso){ var d = new Date(iso); return isNaN(d.getTime()) ? null : d; }
function sameDay(a, b){ return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function isYesterday(d){ return sameDay(d, new Date(Date.now() - 864e5)); }
function fmtTime(d){ try{ return d.toLocaleTimeString(loc(), {hour:'2-digit', minute:'2-digit'}); }catch(e){ return ''; } }
function fmtFull(d){ try{ return d.toLocaleDateString(loc(), {day:'numeric', month:'long', year:'numeric'}); }catch(e){ return d.toDateString(); } }
function dayKey(d){ return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); }
function dayLabel(d){ if(sameDay(d, new Date())) return L('today') + ' · ' + fmtFull(d); if(isYesterday(d)) return L('yesterday') + ' · ' + fmtFull(d); return fmtFull(d); }
function listTime(d){
  if(sameDay(d, new Date())) return fmtTime(d);
  if(isYesterday(d)) return L('yesterday');
  try{ return d.toLocaleDateString(loc(), {day:'numeric', month:'short'}); }catch(e){ return ''; }
}
function fmtSize(n){ var kb = (n || 0) / 1024; return kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(kb)) + ' KB'; }
function kindOf(a){ return a && a.mime === 'application/pdf' ? 'PDF' : String((a && a.mime || '').split('/')[1] || '').toUpperCase(); }

var GRAD = [['#0D8A80','#0A5F56'],['#5b7c99','#809bb8'],['#8a5a2e','#b47a49'],['#8b5cf6','#6366f1'],['#c78a2a','#e0a64d'],['#a44a2e','#c46e50'],['#3b82f6','#60a5fa'],['#22a06b','#1b7f55']];
function hash(s){ var h = 0; s = String(s); for(var i = 0; i < s.length; i++){ h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }
function avatar(c){
  var g = GRAD[hash(c.slug || c.name) % GRAD.length];
  return '<div class="av" style="background:linear-gradient(135deg,'+g[0]+','+g[1]+')">'+esc(c.initials || '?')+(c.logo ? '<img src="'+esc(c.logo)+'" alt="" loading="lazy">' : '')+'</div>';
}
// logo yüklenemezse görsel kalkar, baş harfler görünür
document.addEventListener('error', function(e){
  var t = e.target; if(t && t.tagName === 'IMG' && t.closest && t.closest('#dp-messages .av')) t.remove();
}, true);
function countryName(c){ var d = (window.CI && (CI[lang()] || CI.tr)) || {}; return d[c.cn_key] || String(c.cn_key || '').toUpperCase(); }

/* ═══════════════════════════ durum ═══════════════════════════ */
var S = {
  uid:null, deny:null, items:[], archivedCount:0, tab:'inbox', q:'', loaded:false, loadErr:false, isPro:false, dailyLeft:null,
  limits:{body:4000, attachment_kb:5120}, unread:0,
  cur:null, conv:null, msgs:[], hasMore:false, lastId:0, peerRead:0, file:null, drafts:{},
  listSeq:0, thrSeq:0, olderBusy:false, sendBusy:0, deepDone:false, stickTs:0
};
function resetState(){
  S.deny = null; S.items = []; S.archivedCount = 0; S.tab = 'inbox'; S.q = ''; S.loaded = false; S.loadErr = false; S.cur = null; S.conv = null;
  S.msgs = []; S.file = null; S.drafts = {}; S.unread = 0; S.listSeq++; S.thrSeq++;
}
function ensureIdentity(){
  var id = window.KV_USER ? String(window.KV_USER.email || '') : '';
  if(S.uid !== id){ var had = S.uid !== null; S.uid = id; if(had){ resetState(); renderAll(); setBadge(0, true); } }
}
function findItem(id){ for(var i = 0; i < S.items.length; i++){ if(S.items[i].id === id) return S.items[i]; } return null; }

/* ═══════════════════════════ hata metinleri ═══════════════════════════ */
function errText(r){
  var d = r.data || {}, c = d.error;
  var map = {self:'x_self', unavailable:'x_unavail', sector_mismatch:'x_sector', blocked_by_me:'x_blocked', pro_required:'x_pro', quota:'x_quota', invalid_file:'x_file', not_found:'x_gone', own_message:'x_perm'};
  if(c && map[c]) return L(map[c]);
  if(r.status === 429) return L('x_rate');
  if(r.status === 413) return L('x_big', {mb:mb()});
  if(r.status === 403 && (c === 'forbidden' || c === 'no_company')) return L('x_perm');
  if(r.status === 404) return L('x_gone');
  if(r.status === 422){
    var e = d.errors || {};
    if(e.attachment) return /kilobytes|greater|large|exceed/i.test(String(e.attachment[0])) ? L('x_big', {mb:mb()}) : L('x_file');
    if(e.body) return /empty/i.test(String(e.body[0])) ? L('x_empty') : L('x_long', {n:S.limits.body});
  }
  return L('x_generic');
}

/* ═══════════════════════════ liste ═══════════════════════════ */
function loadList(quiet){
  ensureIdentity();
  if(!canUse()){ renderAll(); return Promise.resolve(); }
  var seq = ++S.listSeq;
  var url = '/kv/conversations?' + (S.tab === 'archive' ? 'archived=1&' : '') + (S.q.length >= 2 ? 'q=' + encodeURIComponent(S.q) : '');
  return API('GET', url).then(function(r){
    if(seq !== S.listSeq) return;
    if(!r.ok){
      var why = (r.data || {}).error;
      if(r.status === 403 && (why === 'no_company' || why === 'forbidden')){ S.deny = why === 'forbidden' ? 'noperm' : 'noco'; renderAll(); return; }
      if(!quiet || !S.loaded){ S.loadErr = true; renderList(); }
      return;
    }
    S.deny = null;
    var d = r.data || {};
    S.loadErr = false; S.loaded = true; S.items = d.items || []; S.archivedCount = d.archived_count || 0;
    S.isPro = !!d.is_pro; S.dailyLeft = d.daily_left; if(d.limits) S.limits = d.limits;
    setBadge(d.unread || 0);
    renderList(); applyLimits();
  });
}
function renderAll(){ renderList(); renderPaneState(); applyLimits(); }

function noteHtml(icon, title, text, btns){
  return '<div class="kvm-note">'+icon+(title ? '<h4>'+esc(title)+'</h4>' : '')+'<p>'+esc(text)+'</p>'+(btns || '')+'</div>';
}
function btnHtml(act, label, ghost){ return '<button type="button" class="btn'+(ghost ? ' kvm-ghost' : '')+'" data-act="'+act+'">'+esc(label)+'</button>'; }

function renderList(){
  var box = $('kvMsgItems'); if(!box) return;
  var g = gate(), tabs = $('kvmTabs'), sr = document.querySelector('#dp-messages .ml-sr');
  if(tabs) tabs.hidden = !!g; if(sr) sr.hidden = !!g;
  var keep = box.scrollTop, html = '';
  if(g){
    html = noteHtml(IC.lock, '', L(g === 'noperm' ? 'e_noperm' : 'e_noco'));
  } else if(!S.loaded && !S.loadErr){
    html = '<div class="kvm-loading">'+esc(L('loading'))+'</div>';
  } else if(S.loadErr && !S.items.length){
    html = noteHtml(IC.info, '', L('e_load'), btnHtml('reload', L('retry'), true));
  } else if(!S.items.length){
    if(S.q.length >= 2) html = noteHtml(IC.chat, '', L('e_search'));
    else if(S.tab === 'archive') html = noteHtml(IC.arch, '', L('e_arch'));
    else {
      var btn = (window.T && T[lang()] && T[lang()].message) || L('fp_msg');
      html = S.isPro
        ? noteHtml(IC.chat, L('e_title'), L('e_pro', {btn:btn}), btnHtml('matches', L('explore')))
        : noteHtml(IC.chat, L('e_title'), L('e_free'), btnHtml('upgrade', L('upgrade')) + btnHtml('matches', L('explore'), true));
    }
  } else {
    html = S.items.map(rowHtml).join('');
  }
  box.innerHTML = html; box.scrollTop = keep;
  var cnt = $('kvmArchCnt'); if(cnt){ cnt.hidden = !(S.archivedCount > 0); cnt.textContent = S.archivedCount; }
  document.querySelectorAll('#kvmTabs button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-tab') === S.tab); b.setAttribute('aria-selected', b.getAttribute('data-tab') === S.tab ? 'true' : 'false'); });
}
function rowHtml(it){
  var c = it.company, d = it.last_message_at ? toDate(it.last_message_at) : null, un = it.unread > 0;
  var pv = (it.preview_mine ? '<span style="display:inline-flex;flex:none">'+IC.check+'</span>' : '') + (it.preview_att ? '<span style="display:inline-flex;flex:none">'+IC.clip+'</span>' : '') + '<span dir="auto">'+esc(it.preview || '')+'</span>';
  return '<div class="msg-conv'+(it.id === S.cur ? ' on' : '')+(un ? ' kvm-unread' : '')+'" data-id="'+(+it.id)+'" role="button" tabindex="0">'+
    avatar(c)+
    '<div class="cn"><div class="cn-t"><span class="cn-n" dir="auto">'+esc(c.name)+'</span><span class="cn-tm">'+esc(d ? listTime(d) : '')+'</span></div><div class="cn-p">'+pv+'</div></div>'+
    (un ? '<div class="un">'+(it.unread > 99 ? '99+' : (+it.unread))+'</div>' : '')+'</div>';
}

/* ═══════════════════════════ rozet (menü + genel bakış) ═══════════════════════════ */
function setBadge(n, force){
  n = Math.max(0, parseInt(n, 10) || 0); S.unread = n;
  var b = document.querySelector('.dmenu a[onclick*="\'messages\'"] .dm-badge');
  if(b){ b.textContent = n > 99 ? '99+' : String(n); b.classList.toggle('kvm-on', n > 0); }
  var lbl = document.querySelector('#dp-overview [data-i18n="ov_stat_msgs"]'), card = lbl && lbl.closest('.ov-stat-card');
  if(card && (canUse() || force)){
    var v = card.querySelector('.ov-stat-val'), s = card.querySelector('.ov-stat-sub');
    if(canUse()){
      if(v){ v.textContent = String(n); }
      if(s){ s.removeAttribute('data-i18n'); s.textContent = L('ov_unread'); }
      card.classList.add('kvm-link'); card.setAttribute('data-act', 'open-messages');
    }
  }
}
function pollUnread(){
  ensureIdentity();
  if(!canUse() || document.hidden) return Promise.resolve();
  return API('GET', '/kv/messages/unread-count').then(function(r){ if(r.ok) setBadge(r.data.unread); });
}

/* ═══════════════════════════ konuşma (thread) ═══════════════════════════ */
function wrap(){ return $('kvMsgWrap'); }
function showThread(on){
  var t = $('kvMsgThread'), p = $('kvMsgPick'), w = wrap();
  if(t) t.hidden = !on; if(p) p.hidden = !!on;
  if(w) w.classList.toggle('kvm-open', !!on);
}
function renderPaneState(){
  var p = $('kvMsgPickTxt'); if(p){ p.textContent = L('pick'); }
  if(!S.cur) showThread(false);
}
function closeThread(){
  saveDraft(); S.cur = null; S.conv = null; S.msgs = []; S.file = null; S.thrSeq++; showThread(false);
  document.querySelectorAll('#kvMsgItems .msg-conv.on').forEach(function(n){ n.classList.remove('on'); });
}
function saveDraft(){ var ta = $('kvMsgText'); if(S.cur && ta){ S.drafts[S.cur] = ta.value; } }

function openConversation(id){
  id = parseInt(id, 10); if(!id) return Promise.resolve();
  ensureIdentity();
  if(!canUse()) return Promise.resolve();
  if(S.cur && S.cur !== id) saveDraft();
  var seq = ++S.thrSeq; S.cur = id; S.conv = null; S.msgs = []; S.file = null; S.hasMore = false; S.lastId = 0; S.peerRead = 0;
  showThread(true);
  document.querySelectorAll('#kvMsgItems .msg-conv').forEach(function(n){ n.classList.toggle('on', +n.getAttribute('data-id') === id); });
  var head = $('kvMsgHead'), body = $('mpBody'); if(head) head.innerHTML = ''; if(body) body.innerHTML = '<div class="kvm-loading">'+esc(L('loading'))+'</div>';
  var ta = $('kvMsgText'); if(ta){ ta.value = S.drafts[id] || ''; autosize(); }
  renderAttChip(); setComposerVisible(false);
  return API('GET', '/kv/conversations/' + id).then(function(r){
    if(seq !== S.thrSeq) return;
    if(!r.ok){ closeThread(); say(errText(r)); loadList(true); return; }
    S.conv = r.data.conversation; S.msgs = r.data.messages || []; S.hasMore = !!r.data.has_more; S.lastId = r.data.last_id || 0; S.peerRead = S.conv.peer_read_id || 0;
    renderHead(); renderThread(true); renderComposer();
    var it = findItem(id); if(it && it.unread){ it.unread = 0; renderList(); }
    pollUnread();
    if(ta && window.matchMedia && !window.matchMedia('(max-width:820px)').matches && S.conv.can_send) ta.focus();
  });
}

function renderHead(){
  var head = $('kvMsgHead'); if(!head || !S.conv || !S.conv.company) return;
  var c = S.conv.company, bits = [countryName(c)];
  if(c.verified) bits.push(L('verified'));
  var btn = function(act, ic, label, cls){ return '<button type="button" data-act="'+act+'" class="'+(cls || '')+'" title="'+esc(label)+'" aria-label="'+esc(label)+'">'+ic+'</button>'; };
  head.innerHTML =
    '<button type="button" class="kvm-back" data-act="back" title="'+esc(L('back'))+'" aria-label="'+esc(L('back'))+'">'+IC.back+'</button>'+
    avatar(c)+
    '<div class="mp-info"><b dir="auto">'+esc(c.name)+'</b><span>'+esc(bits.join(' · '))+'</span></div>'+
    '<div class="mp-actions">'+
      btn('profile', IC.firm, L('profile'))+
      (S.conv.archived ? btn('unarchive', IC.inbox, L('unarchive')) : btn('archive', IC.arch, L('archive')))+
      (S.conv.blocked_by_me ? btn('unblock', IC.block, L('unblock')) : btn('block', IC.block, L('block'), 'kvm-danger'))+
    '</div>';
}

function setComposerVisible(on){
  var c = $('kvMsgComposer'), h = $('kvMsgHint'), b = $('kvMsgBanner');
  if(c) c.hidden = !on; if(h) h.hidden = !on; if(b && on) b.hidden = true;
}
function renderComposer(){
  var b = $('kvMsgBanner'); if(!S.conv || !b) return;
  if(S.conv.can_send){
    setComposerVisible(true); updateHint();
  } else {
    setComposerVisible(false);
    var key = S.conv.send_reason === 'blocked_by_me' ? 'b_blocked' : (S.conv.send_reason === 'sector_mismatch' ? 'b_sector' : 'b_unavail');
    b.innerHTML = '<span>'+esc(L(key))+'</span>' + (S.conv.blocked_by_me ? '<button type="button" class="btn kvm-ghost" data-act="unblock">'+esc(L('unblock'))+'</button>' : '');
    b.hidden = false;
  }
}
/* panelin sabit metinleri (data-i18n="kvm_*"): setLang yalnızca T'de olanı çevirir, burada eksik dil İngilizceye düşer */
function applyStatic(){
  var r = root(); if(!r) return;
  r.querySelectorAll('[data-i18n^="kvm_"]').forEach(function(n){ n.textContent = L(n.getAttribute('data-i18n').slice(4)); });
  r.querySelectorAll('[data-i18n-ph^="kvm_"]').forEach(function(n){ n.setAttribute('placeholder', L(n.getAttribute('data-i18n-ph').slice(4))); });
  r.querySelectorAll('[data-i18n-title^="kvm_"]').forEach(function(n){ var t = L(n.getAttribute('data-i18n-title').slice(4)); n.setAttribute('title', t); n.setAttribute('aria-label', t); });
  var s = $('kvMsgSearch'); if(s){ var ph = (window.T && T[lang()] && T[lang()].msg_search) || (window.T && T.en && T.en.msg_search) || ''; if(ph){ s.setAttribute('placeholder', ph); s.setAttribute('aria-label', ph); } }
}
function applyLimits(){
  applyStatic();
  var ta = $('kvMsgText'); if(ta) ta.setAttribute('maxlength', String(S.limits.body || 4000));
  var sub = $('kvMsgSub'); if(sub){ sub.removeAttribute('data-i18n'); sub.textContent = L('sub', {mb:mb()}); }
  updateHint();
}
function updateHint(){
  var h = $('kvMsgHint'); if(!h) return;
  var ta = $('kvMsgText'), n = ta ? ta.value.length : 0, lim = S.limits.body || 4000;
  var narrow = window.matchMedia && window.matchMedia('(max-width:820px)').matches;
  h.innerHTML = IC.info + '<span style="flex:1">'+esc((narrow ? '' : L('kbd') + ' · ') + L('hint', {mb:mb(), n:lim}))+'</span><span class="kvm-cnt'+(n > lim * 0.95 ? ' warn' : '')+'">'+(n >= lim * 0.8 ? n+' / '+lim : '')+'</span>';
}

/* mesaj balonları */
function attHtml(m){
  var a = m.att; if(!a) return '';
  var href = m.id && !m.tmp ? '/kv/messages/' + (+m.id) + '/attachment' : null;
  var chip = '<'+(href ? 'a href="'+href+'" download="'+esc(a.name)+'" title="'+esc(L('download'))+'"' : 'div')+' class="mb-attach"><div class="mb-ai">'+IC.file+'</div><div><b>'+esc(a.name)+'</b><span>'+esc(fmtSize(a.size))+' · '+esc(kindOf(a))+(href ? '' : ' · '+esc(L('sending')))+'</span></div></'+(href ? 'a' : 'div')+'>';
  if(a.image && href) return '<a class="kvm-img" href="'+href+'" download="'+esc(a.name)+'" title="'+esc(L('download'))+'"><img src="'+href+'" alt="'+esc(a.name)+'" loading="lazy"></a>' + chip;
  return chip;
}
function bubble(m){
  var d = toDate(m.at), time = d ? fmtTime(d) : '', meta = [esc(time)], extra = '';
  if(m.mine){
    if(m.by) meta.push(esc(m.by));
    if(m.state === 'sending') meta.push(esc(L('sending')));
    else if(m.state === 'failed') meta.push('<span class="kvm-err">'+esc(L('failed'))+'</span> <button type="button" data-act="retry" data-cid="'+esc(m.cid)+'">'+esc(L('retry'))+'</button> · <button type="button" data-act="discard" data-cid="'+esc(m.cid)+'">'+esc(L('discard'))+'</button>');
    else meta.push(m.id <= S.peerRead ? '✓✓ '+esc(L('read')) : '✓ '+esc(L('sent')));
  } else {
    extra = m.reported ? '<span class="kvm-flagged">'+IC.flag.replace('<svg','<svg width="11" height="11"')+' '+esc(L('reported'))+'</span>'
                       : '<button type="button" class="kvm-flag" data-act="report" data-mid="'+(+m.id)+'" title="'+esc(L('report'))+'" aria-label="'+esc(L('report'))+'">'+IC.flag+'<span>'+esc(L('report'))+'</span></button>';
  }
  return '<div class="mb-msg '+(m.mine ? 'me' : 'them')+(m.state === 'sending' ? ' kvm-pending' : '')+(m.state === 'failed' ? ' kvm-fail' : '')+'" data-mid="'+esc(m.id)+'">'+
    (m.body ? '<div class="kvm-txt" dir="auto">'+esc(m.body)+'</div>' : '')+attHtml(m)+
    '<div class="mb-t"><span>'+meta.join(' · ')+'</span>'+extra+'</div></div>';
}
function renderThread(stick){
  var body = $('mpBody'); if(!body) return;
  var near = body.scrollHeight - body.scrollTop - body.clientHeight < 90, html = S.hasMore ? '<button type="button" class="kvm-more" data-act="older">'+esc(L('older'))+'</button>' : '', last = '';
  S.msgs.forEach(function(m){
    var d = toDate(m.at);
    if(d){ var k = dayKey(d); if(k !== last){ html += '<div class="mb-day">'+esc(dayLabel(d))+'</div>'; last = k; } }
    html += bubble(m);
  });
  body.innerHTML = html;
  if(stick || near){ body.scrollTop = body.scrollHeight; S.stickTs = Date.now(); }
}
function loadOlder(){
  if(!S.cur || !S.hasMore || S.olderBusy) return;
  var first = null; for(var i = 0; i < S.msgs.length; i++){ if(!S.msgs[i].tmp){ first = S.msgs[i].id; break; } }
  if(!first) return;
  var cid = S.cur, seq = S.thrSeq, body = $('mpBody'); S.olderBusy = true;
  API('GET', '/kv/conversations/' + cid + '?before=' + first).then(function(r){
    S.olderBusy = false;
    if(!r.ok || cid !== S.cur || seq !== S.thrSeq) return;
    var old = body ? body.scrollHeight : 0;
    S.msgs = (r.data.messages || []).concat(S.msgs); S.hasMore = !!r.data.has_more;
    renderThread(false);
    if(body) body.scrollTop = body.scrollHeight - old;
  });
}
/* açık konuşmada yeni mesajlar (20 sn'de bir) */
function loadNew(){
  if(!S.cur || !S.conv) return Promise.resolve();
  var cid = S.cur, seq = S.thrSeq;
  return API('GET', '/kv/conversations/' + cid + '?after=' + S.lastId).then(function(r){
    if(!r.ok || cid !== S.cur || seq !== S.thrSeq) return;
    var sending = S.msgs.some(function(m){ return m.tmp && m.state === 'sending'; }), skipped = false, added = 0;
    (r.data.messages || []).forEach(function(m){
      if(S.msgs.some(function(x){ return x.id === m.id; })) return;
      if(m.mine && sending){ skipped = true; return; }                  // kendi gönderimimizin yanıtı birazdan gelecek
      S.msgs.push(m); added++;
    });
    if(!skipped) S.lastId = Math.max(S.lastId, r.data.last_id || 0);
    var c = r.data.conversation, canChanged = c.can_send !== S.conv.can_send || c.send_reason !== S.conv.send_reason || c.blocked_by_me !== S.conv.blocked_by_me;
    var readChanged = (c.peer_read_id || 0) !== S.peerRead;
    S.conv = c; S.peerRead = c.peer_read_id || 0;
    if(canChanged){ renderHead(); renderComposer(); }
    if(added || readChanged) renderThread(false);
  });
}

/* ═══════════════════════════ gönderme ═══════════════════════════ */
function newCid(){ return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 9); }
function autosize(){ var ta = $('kvMsgText'); if(!ta) return; ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
function sendNow(){
  if(!S.cur || !S.conv || !S.conv.can_send) return;
  var ta = $('kvMsgText'), text = ta ? ta.value.replace(/\s+$/, '').replace(/^\s+/, '') : '', file = S.file;
  if(!text && !file) return;
  if(text.length > (S.limits.body || 4000)){ alertBox('warning', L('t_err'), L('x_long', {n:S.limits.body})); return; }
  var m = {tmp:true, id:'t' + newCid(), cid:newCid(), mine:true, by:(window.KV_USER && window.KV_USER.name) || '', body:text, at:new Date().toISOString(), state:'sending',
           att:file ? {name:file.name, size:file.size, mime:file.type, image:/^image\//.test(file.type)} : null, file:file};
  S.msgs.push(m);
  if(ta){ ta.value = ''; delete S.drafts[S.cur]; autosize(); updateHint(); }
  S.file = null; renderAttChip();
  renderThread(true);
  post(m);
}
function post(m){
  var convId = S.cur, req;
  m.state = 'sending';
  if(m.file){
    var fd = new FormData(); fd.append('body', m.body); fd.append('client_id', m.cid); fd.append('attachment', m.file);
    req = API('POST', '/kv/conversations/' + convId + '/messages', fd);
  } else {
    req = API('POST', '/kv/conversations/' + convId + '/messages', {body:m.body, client_id:m.cid});
  }
  S.sendBusy++;
  return req.then(function(r){
    S.sendBusy--;
    if(convId !== S.cur){                                                      // başka konuşmaya geçildi
      if(r.ok) loadList(true); else alertBox(r.status === 429 ? 'warning' : 'destructive', L('t_err'), errText(r));
      return;
    }
    var i = S.msgs.indexOf(m);
    if(r.ok){
      var sm = r.data.message;
      var dupe = S.msgs.some(function(x){ return !x.tmp && x.id === sm.id; });
      if(i >= 0){ if(dupe) S.msgs.splice(i, 1); else S.msgs[i] = sm; }
      renderThread(true); loadList(true);
      return;
    }
    if(i >= 0){ m.state = 'failed'; }
    renderThread(true);
    alertBox(r.status === 429 ? 'warning' : 'destructive', L('t_err'), errText(r));
    var c = (r.data || {}).error;
    if(c === 'unavailable' || c === 'blocked_by_me' || c === 'sector_mismatch'){ S.msgs = S.msgs.filter(function(x){ return x !== m; }); openConversation(convId); }
  });
}
function findTmp(cid){ for(var i = 0; i < S.msgs.length; i++){ if(S.msgs[i].tmp && S.msgs[i].cid === cid) return S.msgs[i]; } return null; }

/* ek dosya */
function pickFile(kind){ var el = $(kind === 'image' ? 'kvMsgImage' : 'kvMsgFile'); if(el) el.click(); }
function okFile(f){
  var okType = ['image/jpeg','image/png','image/webp','application/pdf'].indexOf(f.type) >= 0 || (!f.type && /\.(jpe?g|png|webp|pdf)$/i.test(f.name));
  if(!okType || !/\.(jpe?g|png|webp|pdf)$/i.test(f.name)){ alertBox('warning', L('t_err'), L('x_file')); return false; }
  if(f.size > (S.limits.attachment_kb || 5120) * 1024){ alertBox('warning', L('t_err'), L('x_big', {mb:mb()})); return false; }
  if(f.size === 0){ alertBox('warning', L('t_err'), L('x_file')); return false; }
  return true;
}
function onFile(ev){
  var f = ev.target.files && ev.target.files[0]; ev.target.value = '';
  if(!f || !S.cur || !S.conv || !S.conv.can_send) return;
  if(!okFile(f)) return;
  S.file = f; renderAttChip();
  var ta = $('kvMsgText'); if(ta) ta.focus();
}
function renderAttChip(){
  var c = $('kvMsgAttChip'); if(!c) return;
  if(!S.file){ c.hidden = true; c.innerHTML = ''; return; }
  c.hidden = false;
  c.innerHTML = IC.file + '<b>'+esc(S.file.name)+'</b><span>'+esc(fmtSize(S.file.size))+'</span><button type="button" data-act="remove-att" title="'+esc(L('remove_att'))+'" aria-label="'+esc(L('remove_att'))+'">×</button>';
}

/* emoji */
var EMOJI = ['👍','🙏','🤝','✅','📦','🚢','📄','🙂'];
function toggleEmoji(ev){
  if(ev) ev.stopPropagation();
  var box = $('kvEmoji'); if(!box) return;
  if(!box.firstChild){
    EMOJI.forEach(function(e){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = e;
      b.addEventListener('click', function(x){
        x.stopPropagation();
        var ta = $('kvMsgText'); if(!ta) return;
        var a = ta.selectionStart == null ? ta.value.length : ta.selectionStart, z = ta.selectionEnd == null ? a : ta.selectionEnd;
        ta.value = ta.value.slice(0, a) + e + ta.value.slice(z); ta.focus(); ta.selectionStart = ta.selectionEnd = a + e.length;
        box.classList.remove('open'); autosize(); updateHint();
      });
      box.appendChild(b);
    });
  }
  box.classList.toggle('open');
}

/* ═══════════════════════════ diyaloglar ═══════════════════════════ */
var DLG = null;
function closeDlg(){
  if(!DLG) return;
  var d = DLG; DLG = null;
  document.removeEventListener('keydown', d.key, true);
  if(d.el.parentNode) d.el.parentNode.removeChild(d.el);
  document.body.classList.remove('kvm-dlg-open');
  try{ if(d.prev && d.prev.focus) d.prev.focus(); }catch(e){}
}
/* o.html önceden kaçırılmış olmalı; düğmeler DOM ile kurulur */
function dialog(o){
  closeDlg();
  var el = document.createElement('div'); el.className = 'modal kvm-dlg open'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
  var tid = 'kvmDlgT' + Date.now();
  el.setAttribute('aria-labelledby', tid);
  el.innerHTML = '<div class="mbox kvm-box"><div class="mhead"><h3 id="'+tid+'">'+esc(o.title)+'</h3><button type="button" class="mclose" aria-label="'+esc(L('close'))+'">×</button></div><div class="kvm-dbody">'+(o.html || '')+'</div><div class="kvm-dfoot"></div></div>';
  var foot = el.querySelector('.kvm-dfoot'), api = {el:el, buttons:[], close:closeDlg};
  (o.buttons || []).forEach(function(b){
    var n = document.createElement('button'); n.type = 'button'; n.className = 'btn' + (b.kind ? ' ' + b.kind : ''); n.textContent = b.label;
    n.addEventListener('click', function(){ if(b.fn) b.fn(api, n); else closeDlg(); });
    foot.appendChild(n); api.buttons.push(n);
  });
  el.querySelector('.mclose').addEventListener('click', closeDlg);
  el.addEventListener('mousedown', function(e){ if(e.target === el) closeDlg(); });
  var key = function(e){
    if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); closeDlg(); return; }
    if(e.key === 'Tab'){
      var f = el.querySelectorAll('button:not([disabled]),textarea,select,input,a[href]');
      if(!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener('keydown', key, true);
  DLG = {el:el, key:key, prev:document.activeElement};
  document.body.appendChild(el); document.body.classList.add('kvm-dlg-open');
  var focus = el.querySelector('textarea,select') || api.buttons[api.buttons.length - 1];
  setTimeout(function(){ try{ focus && focus.focus(); }catch(e){} }, 30);
  return api;
}
function busy(b, on){ if(b){ b.disabled = !!on; } }

function confirmDlg(title, text, label, kind, fn){
  dialog({title:title, html:'<p>'+esc(text)+'</p>', buttons:[
    {label:L('cancel'), kind:'kvm-ghost'},
    {label:label, kind:kind, fn:function(api, btn){ busy(btn, true); fn(function(){ closeDlg(); }, function(){ busy(btn, false); }); }}
  ]});
}

/* eylemler */
function doArchive(on){
  if(!S.cur) return;
  var id = S.cur;
  var run = function(done, fail){
    API('POST', '/kv/conversations/' + id + (on ? '/archive' : '/unarchive')).then(function(r){
      if(!r.ok){ fail(); alertBox('destructive', L('t_action'), errText(r)); return; }
      done(); closeThread(); say(L(on ? 'd_archived' : 'd_unarchived')); loadList(true); pollUnread();
    });
  };
  if(on) confirmDlg(L('c_archive_t'), L('c_archive_d'), L('archive'), '', run); else run(function(){}, function(){});
}
function doBlock(){
  if(!S.cur) return;
  var id = S.cur;
  confirmDlg(L('c_block_t'), L('c_block_d'), L('block'), 'danger', function(done, fail){
    API('POST', '/kv/conversations/' + id + '/block').then(function(r){
      if(!r.ok){ fail(); alertBox('destructive', L('t_action'), errText(r)); return; }
      done(); closeThread(); say(L('d_blocked')); loadList(true); pollUnread();
    });
  });
}
function doUnblock(){
  if(!S.cur) return;
  var id = S.cur;
  API('DELETE', '/kv/conversations/' + id + '/block').then(function(r){
    if(!r.ok){ alertBox('destructive', L('t_action'), errText(r)); return; }
    say(L('d_unblocked'));
    if(S.tab === 'archive'){ S.tab = 'inbox'; }
    loadList(true).then(function(){ openConversation(id); });
  });
}
function doReport(mid){
  mid = +mid; if(!mid) return;
  var cats = ['spam','abuse','fraud','contact','other'], codes = {spam:'spam', abuse:'abuse', fraud:'fraud', contact:'contact_info', other:'other'};
  var opts = cats.map(function(c){ return '<option value="'+codes[c]+'">'+esc(L('r_'+c))+'</option>'; }).join('');
  var api = dialog({title:L('r_t'), html:'<p>'+esc(L('r_d'))+'</p><label for="kvmRCat">'+esc(L('r_cat'))+'</label><select id="kvmRCat">'+opts+'</select><textarea id="kvmRTxt" rows="3" maxlength="1000" placeholder="'+esc(L('r_ph'))+'" aria-label="'+esc(L('r_ph'))+'" style="margin-top:10px"></textarea><div class="kvm-derr" id="kvmRErr" role="alert"></div>',
    buttons:[{label:L('cancel'), kind:'kvm-ghost'}, {label:L('r_send'), kind:'danger', fn:function(a, btn){
      var reason = a.el.querySelector('#kvmRTxt').value.trim(), cat = a.el.querySelector('#kvmRCat').value, err = a.el.querySelector('#kvmRErr');
      if(reason.length < 3){ err.textContent = L('r_ph'); return; }
      busy(btn, true);
      API('POST', '/kv/messages/' + mid + '/report', {reason:reason, category:cat}).then(function(r){
        if(!r.ok){ busy(btn, false); err.textContent = errText(r); return; }
        closeDlg(); say(L(r.data && r.data.already ? 'r_already' : 'r_done'));
        for(var i = 0; i < S.msgs.length; i++){ if(S.msgs[i].id === mid) S.msgs[i].reported = true; }
        renderThread(false);
      });
    }}]});
  return api;
}

/* ═══════════════════════════ olay bağlama ═══════════════════════════ */
function bind(){
  var r = root(); if(!r || r.getAttribute('data-kvm') === '1') return; r.setAttribute('data-kvm', '1');
  r.addEventListener('click', function(e){
    var row = e.target.closest('.msg-conv');
    if(row && r.contains(row)){ openConversation(row.getAttribute('data-id')); return; }
    var tab = e.target.closest('#kvmTabs button');
    if(tab){ S.tab = tab.getAttribute('data-tab') === 'archive' ? 'archive' : 'inbox'; loadList(); return; }
    var a = e.target.closest('[data-act]'); if(!a || !r.contains(a)) return;
    act(a.getAttribute('data-act'), a, e);
  });
  r.addEventListener('keydown', function(e){
    var row = e.target.closest && e.target.closest('.msg-conv');
    if(row && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); openConversation(row.getAttribute('data-id')); }
  });
  var s = $('kvMsgSearch'), t = null;
  if(s) s.addEventListener('input', function(){ clearTimeout(t); t = setTimeout(function(){ var v = s.value.trim(); if(v !== S.q){ S.q = v; if(v.length >= 2 || v === '') loadList(); } }, 280); });
  var ta = $('kvMsgText');
  if(ta){
    ta.addEventListener('keydown', function(e){ if(e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229){ e.preventDefault(); sendNow(); } });
    ta.addEventListener('input', function(){ autosize(); updateHint(); });
  }
  var mb2 = $('mpBody');       // images change the height after layout: stay at the bottom while a fresh render is settling
  if(mb2) mb2.addEventListener('load', function(e){ if(e.target && e.target.tagName === 'IMG' && Date.now() - (S.stickTs || 0) < 5000) mb2.scrollTop = mb2.scrollHeight; }, true);
  var sb = $('kvMsgSend'); if(sb) sb.addEventListener('click', sendNow);
  ['kvMsgFile', 'kvMsgImage'].forEach(function(id){ var f = $(id); if(f) f.addEventListener('change', onFile); });
  document.addEventListener('click', function(){ var b = $('kvEmoji'); if(b) b.classList.remove('open'); });
}
function act(name, node, e){
  switch(name){
    case 'back': saveDraft(); closeThread(); break;
    case 'profile': if(S.conv && S.conv.company && typeof window.openFirm === 'function') window.openFirm(S.conv.company.slug); break;
    case 'archive': doArchive(true); break;
    case 'unarchive': doArchive(false); break;
    case 'block': doBlock(); break;
    case 'unblock': doUnblock(); break;
    case 'report': doReport(node.getAttribute('data-mid')); break;
    case 'older': loadOlder(); break;
    case 'retry': var m = findTmp(node.getAttribute('data-cid')); if(m){ renderThread(false); post(m); } break;
    case 'discard': S.msgs = S.msgs.filter(function(x){ return !(x.tmp && x.cid === node.getAttribute('data-cid')); }); renderThread(false); break;
    case 'pick-file': pickFile('file'); break;
    case 'pick-image': pickFile('image'); break;
    case 'emoji': toggleEmoji(e); break;
    case 'remove-att': S.file = null; renderAttChip(); break;
    case 'reload': S.loadErr = false; S.loaded = false; renderList(); loadList(); break;
    case 'upgrade': if(typeof window.upgradeToPro === 'function') window.upgradeToPro(); break;
    case 'matches': if(typeof window.showPanel === 'function') window.showPanel('matches'); break;
    case 'open-messages': if(typeof window.showPanel === 'function') window.showPanel('messages'); break;
  }
}
document.addEventListener('click', function(e){          // genel bakış kartı panelin dışında
  var n = e.target.closest && e.target.closest('#dp-overview [data-act="open-messages"]');
  if(n && typeof window.showPanel === 'function') window.showPanel('messages');
});

/* ═══════════════════════════ sekme açıldığında + yoklama ═══════════════════════════ */
function activate(){
  bind(); ensureIdentity(); applyLimits(); renderPaneState();
  if(!canUse()){ renderAll(); return Promise.resolve(); }
  renderList();
  return loadList().then(function(){ if(S.cur) loadNew(); });
}
document.addEventListener('kv:panel', function(e){ if(e.detail && e.detail.name === 'messages') activate(); });
document.addEventListener('kv:member', function(){
  ensureIdentity(); S.deny = null;
  var g = gate();
  document.body.classList.toggle('kvm-noperm', !!window.KV_USER && hasCompany() && perms().indexOf('messages') < 0);
  pollUnread();
  if(!S.deepDone && /[?&]tab=messages(&|$)/.test(location.search)){
    S.deepDone = true;
    try{ history.replaceState(history.state, '', location.pathname); }catch(err){}
    if(!g && typeof window.showPanel === 'function'){ window.showPanel('messages'); }
  }
  if(panelOpen()) activate();
});
setInterval(function(){                                  // açık sekmede 20 sn
  if(document.hidden || !window.KV_USER || !panelOpen() || !canUse()) return;
  loadList(true).then(function(){ if(S.cur) loadNew(); });
}, 20000);
setInterval(function(){                                  // rozet 60 sn
  if(document.hidden || !window.KV_USER || !canUse() || panelOpen()) return;
  pollUnread();
}, 60000);
document.addEventListener('visibilitychange', function(){
  if(document.hidden || !window.KV_USER || !canUse()) return;
  if(panelOpen()){ loadList(true).then(function(){ if(S.cur) loadNew(); }); } else pollUnread();
});

/* dil değişince metinler, tarihler ve balonlar yeniden çizilir */
var _setLang = window.setLang;
if(typeof _setLang === 'function'){
  window.setLang = function(l){
    var r = _setLang.apply(this, arguments);
    try{ applyLimits(); renderList(); renderPaneState(); if(S.cur && S.conv){ renderHead(); renderThread(false); renderComposer(); renderAttChip(); } setBadge(S.unread); var f = window.__kvmFirm; if(f) paintFirm(f.box, f.p, f.state); }catch(e){}
    return r;
  };
}

/* prototipin sahte işlevleri gerçekleriyle değiştirilir (kervea-app.js kendi içinden çağırsa da veri boştur) */
window.CONVOS = {}; window.CUR_CONV = null;
window.openConv = function(id){ return openConversation(id); };
window.sendMsg = sendNow;
window.filterMsgList = function(q){ var s = $('kvMsgSearch'); if(s){ s.value = q || ''; } S.q = String(q || '').trim(); loadList(); };
window.kvMsgPick = pickFile;
window.kvMsgAttach = onFile;
window.kvMsgEmoji = toggleEmoji;

/* ═══════════════════════════ firma sayfası: "Mesaj Gönder" ═══════════════════════════ */
function openInPanel(id){
  closeDlg();
  try{ if(typeof window.closeFirmModal === 'function') window.closeFirmModal(); }catch(e){}
  if(typeof window.go === 'function') window.go('panel');
  if(typeof window.showPanel === 'function') window.showPanel('messages');
  S.tab = 'inbox';
  setTimeout(function(){ openConversation(id); }, 60);
}
function upgradeDlg(){
  dialog({title:L('fp_pro_t'), html:'<p>'+esc(L('fp_pro_d'))+'</p>', buttons:[
    {label:L('cancel'), kind:'kvm-ghost'},
    {label:L('upgrade'), fn:function(){ closeDlg(); try{ if(typeof window.closeFirmModal === 'function') window.closeFirmModal(); }catch(e){} if(typeof window.upgradeToPro === 'function') window.upgradeToPro(); }}
  ]});
}
function composeDlg(slug, name){
  var lim = S.limits.body || 4000;
  var api = dialog({title:L('n_t', {name:name || ''}), html:'<p>'+esc(L('n_d'))+'</p><textarea id="kvmNTxt" rows="6" maxlength="'+lim+'" placeholder="'+esc(L('n_ph'))+'" aria-label="'+esc(L('n_t', {name:name || ''}))+'"></textarea><div class="kvm-dcount" id="kvmNCnt"></div><div class="kvm-derr" id="kvmNErr" role="alert"></div>',
    buttons:[{label:L('cancel'), kind:'kvm-ghost'}, {label:L('send'), fn:function(a, btn){
      var ta = a.el.querySelector('#kvmNTxt'), err = a.el.querySelector('#kvmNErr'), text = ta.value.trim();
      if(!text){ err.textContent = L('x_empty'); ta.focus(); return; }
      busy(btn, true); err.textContent = '';
      API('POST', '/kv/conversations', {company:slug, body:text, client_id:a.cid}).then(function(r){
        if(r.ok){ say(L('d_sent')); openInPanel(r.data.conversation_id); return; }
        busy(btn, false);
        var c = (r.data || {}).error;
        if(c === 'pro_required'){ closeDlg(); upgradeDlg(); return; }
        err.textContent = errText(r);
      });
    }}]});
  api.cid = newCid();                                                     // aynı diyalogdan tekrarlanan istek ikinci mesaj üretmez
  var ta = api.el.querySelector('#kvmNTxt'), cnt = api.el.querySelector('#kvmNCnt');
  ta.addEventListener('input', function(){ cnt.textContent = ta.value.length >= lim * 0.8 ? ta.value.length + ' / ' + lim : ''; });
  ta.addEventListener('keydown', function(e){ if(e.key === 'Enter' && (e.ctrlKey || e.metaKey)){ e.preventDefault(); api.buttons[1].click(); } });
}

/* firmaya mesaj göndermeye uygun mu? (sunucu karar verir; bu yalnızca düğmenin durumu) */
function checkFirm(slug){
  if(!window.KV_USER) return Promise.resolve({kind:'guest'});
  if(window.KV_USER.is_admin) return Promise.resolve({kind:'none'});
  var g = gate();
  if(g) return Promise.resolve({kind:g === 'noperm' ? 'noperm' : 'noco'});
  return API('GET', '/kv/messages/can-message/' + encodeURIComponent(slug)).then(function(r){
    if(!r.ok){
      var c = (r.data || {}).error;
      return {kind: r.status === 403 ? (c === 'forbidden' ? 'noperm' : 'noco') : 'unavail'};
    }
    var d = r.data;
    if(d.can) return {kind:'ok', conversation_id:d.conversation_id, name:(d.company || {}).name};
    var map = {self:'none', sector_mismatch:'sector', unavailable:'unavail', blocked_by_me:'blocked', pro_required:'pro', quota:'quota'};
    return {kind: map[d.reason] || 'unavail', name:(d.company || {}).name};
  });
}
var NOTE = {guest:'fp_login', noco:'fp_noco', noperm:'fp_noperm', sector:'fp_sector', unavail:'fp_unavail', blocked:'fp_blocked', quota:'fp_quota'};
function paintFirm(box, p, st){
  if(!box || !box.isConnected) return;
  var b = box.querySelector('.kvm-fp-btn'), note = box.querySelector('.kvm-fp-note'), label = b.querySelector('span');
  var disabled = ['sector', 'unavail', 'blocked', 'quota', 'noco', 'noperm'].indexOf(st.kind) >= 0;
  label.textContent = st.kind === 'ok' && st.conversation_id ? L('fp_open') : ((window.T && T[lang()] && T[lang()].message) || L('fp_msg'));
  b.disabled = disabled; b.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  box.setAttribute('data-state', st.kind);
  var txt = NOTE[st.kind] ? L(NOTE[st.kind]) : '';
  note.textContent = txt; note.hidden = !txt;
  window.__kvmFirm = {box:box, p:p, state:st};
}
function decorateFirm(p){
  var host = $('fpgContent'); if(!host || !p || p.mine) return;
  var aside = host.querySelector('.fpaside'); if(!aside) return;
  host.querySelectorAll('.kvm-fp').forEach(function(n){ n.remove(); });
  host.querySelectorAll('[onclick*="startMsg("]').forEach(function(n){ var w = n.closest('.fpcta'); (w && w.children.length === 1 ? w : n).remove(); });   // başka bir "mesaj" düğmesi varsa bizimkiyle değişir
  var box = document.createElement('div'); box.className = 'fpblock kvm-fp';
  box.innerHTML = '<div class="fpcta"><button type="button" class="btn kvm-fp-btn">'+IC.chatS+'<span></span></button></div><p class="kvm-fp-note" hidden></p>';
  aside.insertBefore(box, aside.firstChild);
  var slug = p.id, state = {kind:window.KV_USER ? 'checking' : 'guest'};
  box.querySelector('.kvm-fp-btn span').textContent = (window.T && T[lang()] && T[lang()].message) || L('fp_msg');
  if(window.KV_USER && window.KV_USER.is_admin){ box.remove(); return; }
  paintFirm(box, p, state);
  box.querySelector('.kvm-fp-btn').addEventListener('click', function(){
    var st = (window.__kvmFirm && window.__kvmFirm.box === box) ? window.__kvmFirm.state : state;
    if(st.kind === 'guest'){ if(typeof window.go === 'function') window.go('login'); say(L('fp_login')); return; }
    if(st.kind === 'ok'){ if(st.conversation_id) openInPanel(st.conversation_id); else composeDlg(slug, p.nm); return; }
    if(st.kind === 'pro'){ upgradeDlg(); return; }
  });
  if(!window.KV_USER) return;
  box.querySelector('.kvm-fp-btn').disabled = true;
  checkFirm(slug).then(function(st){ paintFirm(box, p, st); });
}
var _renderFirmPage = window.renderFirmPage;
if(typeof _renderFirmPage === 'function'){
  window.renderFirmPage = function(p){
    var out = _renderFirmPage.apply(this, arguments);
    try{ decorateFirm(p); }catch(e){}
    return out;
  };
}
/* startMsg(slug): diğer yerlerden (kart/eşleşme düğmeleri) çağrılırsa aynı akış */
window.startMsg = function(slug){
  if(!slug) return;
  if(!window.KV_USER){ if(typeof window.go === 'function') window.go('login'); say(L('fp_login')); return; }
  checkFirm(slug).then(function(st){
    if(st.kind === 'ok'){ if(st.conversation_id) openInPanel(st.conversation_id); else composeDlg(slug, st.name); }
    else if(st.kind === 'pro') upgradeDlg();
    else if(NOTE[st.kind]) alertBox('info', L('fp_msg'), L(NOTE[st.kind]));
  });
};

window.kvMsg = {open:openConversation, refresh:loadList, state:S};

/* ilk açılış: sayfa yüklenirken oturum açıksa rozeti getir */
bind(); applyLimits();
document.body.classList.toggle('kvm-noperm', !!window.KV_USER && hasCompany() && perms().indexOf('messages') < 0);
setBadge(0);
if(window.KV_USER) pollUnread();
})();
