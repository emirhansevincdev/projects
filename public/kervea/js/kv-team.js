/* Kervea panel · Ekip ve Aktivite
   Gerçek ekip yönetimi (davet, roller, izinler), firma aktivite kaydı ve panelin izne duyarlı kabuğu.
   Sunucu tek doğruluk kaynağıdır: yetkiyi her istekte CompanyContext verir; bu dosya yalnızca gösterir ve kullanıcıyı yönlendirir.
   kervea-api.js yüklendikten sonra çalışır. Kullanılan: KV_API(method,url,body) -> Promise<{ok,status,data}>, KV_USER, KV_ME,
   kvShowAlert, toast, 'kv:member' ve 'kv:panel' olayları. Kullanıcıdan gelen tüm metinler esc() ile kaçırılır. */
(function(){
'use strict';
if(typeof window.KV_API !== 'function') return;
var API = window.KV_API;

/* ═══════════════════════════ çeviriler (tr kaynak; eksik olan İngilizceye düşer) ═══════════════════════════ */
var X = {
tr:{
 title:"Ekip Yönetimi", sub:"Firmanız için çalışma arkadaşlarınızı davet edin; rollerini ve erişebilecekleri bölümleri belirleyin.",
 invite:"Kullanıcı Davet Et", loading:"Yükleniyor…", retry:"Tekrar dene", cancel:"İptal", close:"Kapat", save:"Kaydet", saving:"Kaydediliyor…", sending:"Gönderiliyor…", you:"Sen",
 seats:"{used}/{max} koltuk", seats_full_t:"Koltuk sınırına ulaştınız",
 c_user:"Kullanıcı", c_role:"Rol", c_perms:"İzinler", c_last:"Son giriş", c_status:"Durum",
 r_owner:"Sahip", r_admin:"Yönetici", r_sales:"Satış", r_ops:"Operasyon",
 pl_matches:"Eşleşmeler", pl_messages:"Mesajlar", pl_people:"Kişiler", pl_analytics:"Analiz", pl_profile:"Firma profili", pl_docs:"Belgeler", pl_team:"Ekip ve aktivite", pl_billing:"Premium ve kredi satın alma",
 pd_matches:"Eşleşme önerilerini ve firma sayfalarını inceler.", pd_messages:"Firmanın mesajlarını okur ve yanıtlar.",
 pd_people:"Kişiler bölümünü kullanır; kredi harcayarak iletişim bilgisi açar.", pd_analytics:"Görüntülenme, erişim ve karşılaştırma istatistiklerini görür.",
 pd_profile:"Firma bilgilerini, ürünleri ve sosyal bağlantıları düzenler.", pd_docs:"Doğrulama belgelerini görür, yenilerini yükler.",
 pd_team:"Kişi davet eder, rolleri düzenler, aktivite kaydını görür. Yalnızca sahip verebilir.", pd_billing:"Premium ve kredi satın alır. Yalnızca sahip verebilir.",
 g_work:"Çalışma alanı", g_company:"Firma", g_admin:"Yönetim",
 all:"Tüm modüller", none:"Yalnızca genel bakış",
 s_active:"Aktif", s_invited:"Davet bekliyor", s_disabled:"Devre dışı", s_expired:"Bağlantının süresi doldu",
 never:"Henüz giriş yok", inv_on:"Davet: {date}",
 m_edit:"Rol ve izinleri düzenle", m_resend:"Daveti yeniden gönder", m_disable:"Devre dışı bırak", m_enable:"Yeniden etkinleştir", m_remove:"Ekipten çıkar", m_open:"İşlemler",
 lk_owner:"Sahip hesabı değiştirilemez", lk_self:"Kendi rolünüzü ve izinlerinizi değiştiremezsiniz", lk_above:"Bu kişiyi yalnızca firma sahibi yönetebilir",
 i_h:"Yeni kullanıcı davet et", i_sub:"Davet e-postayla gider; kişi parolasını belirleyince hesabı etkinleşir.",
 i_name:"Ad soyad", i_email:"E-posta", i_ph_name:"Örn. Ahmet Kaya", i_ph_email:"ahmet@firma.com", i_role:"Rol",
 i_custom:"İzinleri özelleştir", i_custom_hint:"Rolün varsayılan izinleri işaretlidir; kişiye göre açıp kapatabilirsiniz.",
 i_note:"Parola belirleme bağlantısı {h} saat geçerlidir. Koltuk kullanımı: {n}/{max} (siz dahil).",
 i_send:"Davet gönder", i_mailfail:"Davet kaydedildi ancak e-posta gönderilemedi. “Daveti yeniden gönder” ile tekrar deneyin.",
 e_h:"Rol ve izinleri düzenle", e_sub:"{name} için rolü ve erişebileceği bölümleri belirleyin.", e_role:"Rol", e_perms:"İzinler",
 e_hint:"Rol değiştirildiğinde izinler o rolün varsayılanlarına döner; sonra tek tek ayarlayabilirsiniz.", e_custom:"Özel izinler",
 trimmed:"Rolün bazı izinleri çıkarıldı; çünkü bunları siz veremezsiniz.",
 e_locked_you:"Bu izne siz sahip değilsiniz; veremezsiniz", e_locked_owner:"Bu izni yalnızca firma sahibi verebilir",
 cf_dis_t:"{name} devre dışı bırakılsın mı?", cf_dis_d:"Kişi hemen oturumdan çıkar ve yeniden etkinleştirilene kadar panele giremez. Hesabı silinmez.",
 cf_rem_t:"{name} ekipten çıkarılsın mı?", cf_rem_a:"Kişinin bu firmaya erişimi hemen sona erer. Hesabı kendisinde kalır.", cf_rem_i:"Davet iptal edilir ve bu e-posta için oluşturulan hesap silinir.",
 t_invited:"{name} davet edildi", t_resent:"Davet {name} için yeniden gönderildi", t_updated:"{name} güncellendi", t_disabled:"{name} devre dışı bırakıldı", t_enabled:"{name} yeniden etkinleştirildi", t_removed:"{name} ekipten çıkarıldı",
 x_title:"İşlem yapılamadı",
 x_email_taken:"Bu e-posta adresiyle zaten bir hesap var. Lütfen başka bir adres kullanın.", x_seats_full:"Koltuk sınırına ({max}) ulaştınız. Yeni davet için birini ekipten çıkarın.",
 x_cannot_grant:"Sahip olmadığınız ya da yalnızca firma sahibinin verebildiği bir izni veremezsiniz.", x_above:"Bu kişiyi yalnızca firma sahibi yönetebilir.",
 x_self:"Kendi rolünüzü, izinlerinizi veya durumunuzu değiştiremezsiniz.", x_not_invited:"Bu kişinin bekleyen bir daveti yok.",
 x_too_soon:"Davet az önce gönderildi. Bir dakika sonra tekrar deneyin.", x_mail_limit:"Bugün için davet e-postası sınırına ulaştınız. Yarın tekrar deneyin.",
 x_rate:"Çok fazla istek gönderdiniz. Biraz bekleyip tekrar deneyin.",
 x_v_email:"Geçerli bir e-posta adresi girin.", x_v_name:"Ad soyad en az 2 karakter olmalı.", x_v_role:"Bir rol seçin.", x_validation:"Girilen bilgiler geçerli değil.",
 x_forbidden:"Bu işlem için yetkiniz yok.", x_gone:"Kişi bulunamadı; liste yenilendi.", x_state:"Kişinin durumu değişmiş; liste yenilendi.",
 x_network:"Bağlantı kurulamadı. İnternetinizi kontrol edip tekrar deneyin.", x_generic:"İşlem tamamlanamadı. Lütfen tekrar deneyin.", x_load:"Ekip bilgisi yüklenemedi.",
 n_h:"Rol tabanlı erişim", n_p:"Her rol varsayılan olarak aşağıdaki bölümlere erişir; kişi bazında özel izin de verebilirsiniz. Her değişiklik Aktivite kaydına yazılır.",
 n_active:"Aktif kullanıcı", n_free:"Boş koltuk",
 em_h:"Henüz ekip arkadaşınız yok", em_p:"Yönetici, satış ya da operasyon rolüyle birini davet edin; her kişi yalnızca yetkili olduğu bölümleri görür.",
 na_h:"Bu bölüm için yetkiniz yok", na_p:"“{tab}” bölümünü kullanma izniniz yok. Gerekirse firma yöneticinizden izin isteyin.", na_back:"Genel bakışa dön",
 nc_h:"Bu hesap şu anda bir firmaya bağlı değil", nc_p:"Erişiminiz kapatılmış ya da ekipten çıkarılmış olabilir. Firma yöneticinizle iletişime geçin.",
 nb_h:"Satın alma yetkiniz yok", nb_p:"Premium ve kredi satın alma yetkisi firma sahibindedir. Gerekirse sahibinden isteyin.",
 ac_title:"Aktivite", ac_sub:"Firmanızın panelindeki son hareketler: ekip değişiklikleri, profil ve belge güncellemeleri, girişler.",
 f_all:"Tümü", f_team:"Ekip", f_profile:"Profil", f_docs:"Belgeler", f_sec:"Giriş ve izinler", f_credits:"Kredi ve erişim", f_msgs:"Mesajlar", f_other:"Diğer",
 d_today:"Bugün", d_yesterday:"Dün",
 a_empty:"Henüz kayıtlı bir hareket yok. Ekip değişiklikleri, profil güncellemeleri ve girişler burada listelenir.", a_empty_f:"Bu filtreye uyan kayıt yok.",
 a_load:"Aktivite kaydı yüklenemedi.", a_limit:"Son {n} hareket gösteriliyor.", a_by:"Yapan: {by}", a_you:"Sen", a_support:"Kervea desteği", a_someone:"Bir kullanıcı",
 ev_team_invite:"Ekibe davet gönderildi", ev_team_resend:"Davet yeniden gönderildi", ev_team_update:"Rol veya izinler güncellendi", ev_team_remove:"Ekipten çıkarıldı",
 ev_team_disable:"Kullanıcı devre dışı bırakıldı", ev_team_enable:"Kullanıcı yeniden etkinleştirildi", ev_auth_login:"Giriş yapıldı",
 ev_consent_change:"İzin tercihi değiştirildi", ev_profile_update:"Firma profili güncellendi", ev_doc_upload:"Belge yüklendi",
 ev_credits_purchase:"Kredi satın alındı", ev_credits_grant:"Hesaba kredi tanımlandı", ev_person_reveal:"Bir kişinin iletişim bilgisi açıldı",
 ev_firm_reveal:"Bir firmanın iletişim bilgisi açıldı", ev_message_start:"Yeni konuşma başlatıldı",
 ct_contact_visibility:"İletişim bilgilerinin gösterilmesi", ct_marketing:"E-posta bildirimleri", on:"açık", off:"kapalı",
 dt_role:"Rol: {role}", dt_perms:"İzinler: {list}", dt_fields:"Alanlar: {list}", dt_credits:"{n} kredi", dt_files:"{n} dosya",
 pf_name:"firma adı", pf_sector:"sektör", pf_description:"açıklama", pf_social:"sosyal bağlantılar", pf_products:"ürünler", pf_hs_codes:"GTİP kodları",
 pf_website:"web sitesi", pf_email:"e-posta", pf_phone:"telefon", pf_address:"adres", pf_city:"şehir"
},
en:{
 title:"Team", sub:"Invite colleagues to your company's panel and decide their role and which sections they can open.",
 invite:"Invite user", loading:"Loading…", retry:"Try again", cancel:"Cancel", close:"Close", save:"Save", saving:"Saving…", sending:"Sending…", you:"You",
 seats:"{used}/{max} seats", seats_full_t:"You have reached the seat limit",
 c_user:"User", c_role:"Role", c_perms:"Access", c_last:"Last sign-in", c_status:"Status",
 r_owner:"Owner", r_admin:"Admin", r_sales:"Sales", r_ops:"Operations",
 pl_matches:"Matches", pl_messages:"Messages", pl_people:"People", pl_analytics:"Analytics", pl_profile:"Company profile", pl_docs:"Documents", pl_team:"Team and activity", pl_billing:"Premium and credit purchases",
 pd_matches:"Browses match suggestions and company pages.", pd_messages:"Reads and answers the company's messages.",
 pd_people:"Uses the People section and spends credits to open contact details.", pd_analytics:"Sees views, reach and benchmark statistics.",
 pd_profile:"Edits company details, products and social links.", pd_docs:"Sees verification documents and uploads new ones.",
 pd_team:"Invites people, edits roles and reads the activity log. Only the owner can grant it.", pd_billing:"Buys Premium and credits. Only the owner can grant it.",
 g_work:"Workspace", g_company:"Company", g_admin:"Administration",
 all:"All sections", none:"Overview only",
 s_active:"Active", s_invited:"Invitation pending", s_disabled:"Disabled", s_expired:"Link expired",
 never:"Not signed in yet", inv_on:"Invited: {date}",
 m_edit:"Edit role and permissions", m_resend:"Resend invitation", m_disable:"Disable", m_enable:"Enable again", m_remove:"Remove from team", m_open:"Actions",
 lk_owner:"The owner account cannot be changed", lk_self:"You cannot change your own role or permissions", lk_above:"Only the company owner can manage this person",
 i_h:"Invite a new user", i_sub:"The invitation goes out by e-mail; the account becomes active once the person sets a password.",
 i_name:"Full name", i_email:"E-mail", i_ph_name:"e.g. Alex Morgan", i_ph_email:"alex@company.com", i_role:"Role",
 i_custom:"Customise permissions", i_custom_hint:"The role's default permissions are ticked; switch them on or off for this person.",
 i_note:"The password link is valid for {h} hours. Seats in use: {n}/{max} (including you).",
 i_send:"Send invitation", i_mailfail:"The invitation was saved but the e-mail could not be sent. Use “Resend invitation” to try again.",
 e_h:"Edit role and permissions", e_sub:"Choose the role and the sections {name} can open.", e_role:"Role", e_perms:"Permissions",
 e_hint:"Changing the role resets the permissions to that role's defaults; you can then adjust them one by one.", e_custom:"Custom permissions",
 trimmed:"Some of the role's permissions were left out because you cannot grant them.",
 e_locked_you:"You do not hold this permission, so you cannot grant it", e_locked_owner:"Only the company owner can grant this permission",
 cf_dis_t:"Disable {name}?", cf_dis_d:"They are signed out at once and cannot open the panel until you enable them again. The account is not deleted.",
 cf_rem_t:"Remove {name} from the team?", cf_rem_a:"Their access to this company ends at once. They keep their own account.", cf_rem_i:"The invitation is cancelled and the account created for this e-mail address is deleted.",
 t_invited:"{name} was invited", t_resent:"Invitation sent again to {name}", t_updated:"{name} updated", t_disabled:"{name} disabled", t_enabled:"{name} enabled again", t_removed:"{name} removed from the team",
 x_title:"Action failed",
 x_email_taken:"An account with this e-mail address already exists. Please use another address.", x_seats_full:"You reached the seat limit ({max}). Remove someone from the team to invite a new person.",
 x_cannot_grant:"You cannot grant a permission you do not hold, or one that only the company owner can grant.", x_above:"Only the company owner can manage this person.",
 x_self:"You cannot change your own role, permissions or status.", x_not_invited:"This person has no pending invitation.",
 x_too_soon:"The invitation was just sent. Try again in a minute.", x_mail_limit:"You reached today's limit for invitation e-mails. Try again tomorrow.",
 x_rate:"Too many requests. Please wait a moment and try again.",
 x_v_email:"Enter a valid e-mail address.", x_v_name:"The name must have at least 2 characters.", x_v_role:"Choose a role.", x_validation:"The information entered is not valid.",
 x_forbidden:"You do not have permission for this.", x_gone:"Person not found; the list was refreshed.", x_state:"The person's status has changed; the list was refreshed.",
 x_network:"Could not connect. Check your internet connection and try again.", x_generic:"The action could not be completed. Please try again.", x_load:"The team could not be loaded.",
 n_h:"Role-based access", n_p:"Each role opens the sections below by default; you can also give an individual custom permissions. Every change is written to the Activity log.",
 n_active:"Active users", n_free:"Free seats",
 em_h:"No teammates yet", em_p:"Invite someone as admin, sales or operations; each person only sees the sections they are allowed to use.",
 na_h:"You do not have access to this section", na_p:"You are not allowed to use “{tab}”. Ask your company administrator for access if you need it.", na_back:"Back to overview",
 nc_h:"This account is not linked to a company right now", nc_p:"Your access may have been switched off or you may have been removed from the team. Contact your company administrator.",
 nb_h:"You cannot make purchases", nb_p:"Buying Premium and credits is reserved for the company owner. Ask the owner if you need it.",
 ac_title:"Activity", ac_sub:"Recent actions in your company's panel: team changes, profile and document updates, sign-ins.",
 f_all:"All", f_team:"Team", f_profile:"Profile", f_docs:"Documents", f_sec:"Sign-ins and consents", f_credits:"Credits and access", f_msgs:"Messages", f_other:"Other",
 d_today:"Today", d_yesterday:"Yesterday",
 a_empty:"No recorded activity yet. Team changes, profile updates and sign-ins will be listed here.", a_empty_f:"No entries match this filter.",
 a_load:"The activity log could not be loaded.", a_limit:"Showing the latest {n} actions.", a_by:"By: {by}", a_you:"You", a_support:"Kervea support", a_someone:"A user",
 ev_team_invite:"Invitation sent to the team", ev_team_resend:"Invitation sent again", ev_team_update:"Role or permissions updated", ev_team_remove:"Removed from the team",
 ev_team_disable:"User disabled", ev_team_enable:"User enabled again", ev_auth_login:"Signed in",
 ev_consent_change:"Consent preference changed", ev_profile_update:"Company profile updated", ev_doc_upload:"Document uploaded",
 ev_credits_purchase:"Credits purchased", ev_credits_grant:"Credits added to the account", ev_person_reveal:"A person's contact details were opened",
 ev_firm_reveal:"A company's contact details were opened", ev_message_start:"New conversation started",
 ct_contact_visibility:"Showing contact details", ct_marketing:"E-mail notifications", on:"on", off:"off",
 dt_role:"Role: {role}", dt_perms:"Permissions: {list}", dt_fields:"Fields: {list}", dt_credits:"{n} credits", dt_files:"{n} files",
 pf_name:"company name", pf_sector:"sector", pf_description:"description", pf_social:"social links", pf_products:"products", pf_hs_codes:"HS codes",
 pf_website:"website", pf_email:"e-mail", pf_phone:"phone", pf_address:"address", pf_city:"city"
},
es:{
 title:"Equipo", sub:"Invite a compañeros al panel de su empresa y decida su rol y las secciones que pueden abrir.",
 invite:"Invitar usuario", loading:"Cargando…", retry:"Reintentar", cancel:"Cancelar", close:"Cerrar", save:"Guardar", saving:"Guardando…", sending:"Enviando…", you:"Usted",
 seats:"{used}/{max} puestos", seats_full_t:"Ha alcanzado el límite de puestos",
 c_user:"Usuario", c_role:"Rol", c_perms:"Acceso", c_last:"Último acceso", c_status:"Estado",
 r_owner:"Propietario", r_admin:"Administrador", r_sales:"Ventas", r_ops:"Operaciones",
 pl_matches:"Coincidencias", pl_messages:"Mensajes", pl_people:"Personas", pl_analytics:"Análisis", pl_profile:"Perfil de empresa", pl_docs:"Documentos", pl_team:"Equipo y actividad", pl_billing:"Compra de Premium y créditos",
 pd_matches:"Consulta sugerencias de coincidencia y páginas de empresas.", pd_messages:"Lee y responde los mensajes de la empresa.",
 pd_people:"Usa la sección Personas y gasta créditos para abrir datos de contacto.", pd_analytics:"Ve estadísticas de visitas, alcance y comparación.",
 pd_profile:"Edita datos de la empresa, productos y enlaces sociales.", pd_docs:"Ve los documentos de verificación y sube nuevos.",
 pd_team:"Invita personas, edita roles y lee el registro de actividad. Solo el propietario puede concederlo.", pd_billing:"Compra Premium y créditos. Solo el propietario puede concederlo.",
 g_work:"Espacio de trabajo", g_company:"Empresa", g_admin:"Administración",
 all:"Todas las secciones", none:"Solo resumen",
 s_active:"Activo", s_invited:"Invitación pendiente", s_disabled:"Desactivado", s_expired:"Enlace caducado",
 never:"Aún no ha entrado", inv_on:"Invitación: {date}",
 m_edit:"Editar rol y permisos", m_resend:"Reenviar invitación", m_disable:"Desactivar", m_enable:"Activar de nuevo", m_remove:"Quitar del equipo", m_open:"Acciones",
 lk_owner:"La cuenta del propietario no se puede modificar", lk_self:"No puede cambiar su propio rol ni sus permisos", lk_above:"Solo el propietario de la empresa puede gestionar a esta persona",
 i_h:"Invitar a un nuevo usuario", i_sub:"La invitación se envía por correo; la cuenta se activa cuando la persona elige su contraseña.",
 i_name:"Nombre completo", i_email:"Correo electrónico", i_ph_name:"p. ej. Ana García", i_ph_email:"ana@empresa.com", i_role:"Rol",
 i_custom:"Personalizar permisos", i_custom_hint:"Los permisos predeterminados del rol están marcados; actívelos o desactívelos para esta persona.",
 i_note:"El enlace para elegir contraseña es válido {h} horas. Puestos en uso: {n}/{max} (usted incluido).",
 i_send:"Enviar invitación", i_mailfail:"La invitación se guardó pero no se pudo enviar el correo. Use «Reenviar invitación» para intentarlo de nuevo.",
 e_h:"Editar rol y permisos", e_sub:"Elija el rol y las secciones que {name} puede abrir.", e_role:"Rol", e_perms:"Permisos",
 e_hint:"Al cambiar el rol, los permisos vuelven a los predeterminados de ese rol; después puede ajustarlos uno a uno.", e_custom:"Permisos personalizados",
 trimmed:"Se omitieron algunos permisos del rol porque usted no puede concederlos.",
 e_locked_you:"No tiene este permiso, así que no puede concederlo", e_locked_owner:"Solo el propietario de la empresa puede conceder este permiso",
 cf_dis_t:"¿Desactivar a {name}?", cf_dis_d:"Se cierra su sesión de inmediato y no podrá abrir el panel hasta que la active de nuevo. La cuenta no se elimina.",
 cf_rem_t:"¿Quitar a {name} del equipo?", cf_rem_a:"Su acceso a esta empresa termina de inmediato. Conserva su propia cuenta.", cf_rem_i:"Se cancela la invitación y se elimina la cuenta creada para este correo.",
 t_invited:"{name} fue invitado/a", t_resent:"Invitación reenviada a {name}", t_updated:"{name} actualizado/a", t_disabled:"{name} desactivado/a", t_enabled:"{name} activado/a de nuevo", t_removed:"{name} quitado/a del equipo",
 x_title:"No se pudo completar la acción",
 x_email_taken:"Ya existe una cuenta con este correo. Use otra dirección.", x_seats_full:"Alcanzó el límite de puestos ({max}). Quite a alguien del equipo para invitar a otra persona.",
 x_cannot_grant:"No puede conceder un permiso que no tiene ni uno que solo el propietario puede conceder.", x_above:"Solo el propietario de la empresa puede gestionar a esta persona.",
 x_self:"No puede cambiar su propio rol, permisos ni estado.", x_not_invited:"Esta persona no tiene una invitación pendiente.",
 x_too_soon:"La invitación se acaba de enviar. Inténtelo de nuevo en un minuto.", x_mail_limit:"Alcanzó el límite de correos de invitación de hoy. Inténtelo mañana.",
 x_rate:"Demasiadas solicitudes. Espere un momento e inténtelo de nuevo.",
 x_v_email:"Introduzca un correo válido.", x_v_name:"El nombre debe tener al menos 2 caracteres.", x_v_role:"Elija un rol.", x_validation:"Los datos introducidos no son válidos.",
 x_forbidden:"No tiene permiso para esta acción.", x_gone:"Persona no encontrada; se actualizó la lista.", x_state:"El estado de la persona cambió; se actualizó la lista.",
 x_network:"No se pudo conectar. Compruebe su conexión e inténtelo de nuevo.", x_generic:"No se pudo completar la acción. Inténtelo de nuevo.", x_load:"No se pudo cargar el equipo.",
 n_h:"Acceso por roles", n_p:"Cada rol abre por defecto las secciones siguientes; también puede dar permisos personalizados a cada persona. Todo cambio queda en el registro de Actividad.",
 n_active:"Usuarios activos", n_free:"Puestos libres",
 em_h:"Aún no tiene compañeros", em_p:"Invite a alguien como administrador, ventas u operaciones; cada persona solo ve las secciones que puede usar.",
 na_h:"No tiene acceso a esta sección", na_p:"No tiene permiso para usar «{tab}». Pida acceso al administrador de su empresa si lo necesita.", na_back:"Volver al resumen",
 nc_h:"Esta cuenta no está vinculada a ninguna empresa ahora", nc_p:"Es posible que su acceso se haya desactivado o que lo hayan quitado del equipo. Contacte con el administrador de su empresa.",
 nb_h:"No puede realizar compras", nb_p:"La compra de Premium y créditos corresponde al propietario de la empresa. Pídasela si la necesita.",
 ac_title:"Actividad", ac_sub:"Acciones recientes en el panel de su empresa: cambios del equipo, actualizaciones de perfil y documentos, accesos.",
 f_all:"Todo", f_team:"Equipo", f_profile:"Perfil", f_docs:"Documentos", f_sec:"Accesos y consentimientos", f_credits:"Créditos y acceso", f_msgs:"Mensajes", f_other:"Otros",
 d_today:"Hoy", d_yesterday:"Ayer",
 a_empty:"Aún no hay actividad registrada. Aquí aparecerán los cambios del equipo, las actualizaciones de perfil y los accesos.", a_empty_f:"Ninguna entrada coincide con este filtro.",
 a_load:"No se pudo cargar el registro de actividad.", a_limit:"Se muestran las últimas {n} acciones.", a_by:"Por: {by}", a_you:"Usted", a_support:"Soporte de Kervea", a_someone:"Un usuario",
 ev_team_invite:"Invitación enviada al equipo", ev_team_resend:"Invitación reenviada", ev_team_update:"Rol o permisos actualizados", ev_team_remove:"Quitado del equipo",
 ev_team_disable:"Usuario desactivado", ev_team_enable:"Usuario activado de nuevo", ev_auth_login:"Inicio de sesión",
 ev_consent_change:"Preferencia de consentimiento modificada", ev_profile_update:"Perfil de empresa actualizado", ev_doc_upload:"Documento subido",
 ev_credits_purchase:"Créditos comprados", ev_credits_grant:"Créditos añadidos a la cuenta", ev_person_reveal:"Se abrieron los datos de contacto de una persona",
 ev_firm_reveal:"Se abrieron los datos de contacto de una empresa", ev_message_start:"Nueva conversación iniciada",
 ct_contact_visibility:"Mostrar datos de contacto", ct_marketing:"Notificaciones por correo", on:"activado", off:"desactivado",
 dt_role:"Rol: {role}", dt_perms:"Permisos: {list}", dt_fields:"Campos: {list}", dt_credits:"{n} créditos", dt_files:"{n} archivos",
 pf_name:"nombre de la empresa", pf_sector:"sector", pf_description:"descripción", pf_social:"enlaces sociales", pf_products:"productos", pf_hs_codes:"códigos HS",
 pf_website:"sitio web", pf_email:"correo", pf_phone:"teléfono", pf_address:"dirección", pf_city:"ciudad"
},
fr:{
 title:"Équipe", sub:"Invitez vos collègues dans l'espace de votre entreprise et définissez leur rôle et les sections qu'ils peuvent ouvrir.",
 invite:"Inviter un utilisateur", loading:"Chargement…", retry:"Réessayer", cancel:"Annuler", close:"Fermer", save:"Enregistrer", saving:"Enregistrement…", sending:"Envoi…", you:"Vous",
 seats:"{used}/{max} places", seats_full_t:"Vous avez atteint la limite de places",
 c_user:"Utilisateur", c_role:"Rôle", c_perms:"Accès", c_last:"Dernière connexion", c_status:"Statut",
 r_owner:"Propriétaire", r_admin:"Administrateur", r_sales:"Ventes", r_ops:"Opérations",
 pl_matches:"Correspondances", pl_messages:"Messages", pl_people:"Personnes", pl_analytics:"Analyses", pl_profile:"Profil de l'entreprise", pl_docs:"Documents", pl_team:"Équipe et activité", pl_billing:"Achat de Premium et de crédits",
 pd_matches:"Consulte les suggestions de correspondance et les pages d'entreprises.", pd_messages:"Lit et répond aux messages de l'entreprise.",
 pd_people:"Utilise la section Personnes et dépense des crédits pour ouvrir des coordonnées.", pd_analytics:"Voit les statistiques de vues, de portée et de comparaison.",
 pd_profile:"Modifie les informations de l'entreprise, les produits et les liens sociaux.", pd_docs:"Voit les documents de vérification et en ajoute de nouveaux.",
 pd_team:"Invite des personnes, modifie les rôles et lit le journal d'activité. Seul le propriétaire peut l'accorder.", pd_billing:"Achète Premium et des crédits. Seul le propriétaire peut l'accorder.",
 g_work:"Espace de travail", g_company:"Entreprise", g_admin:"Administration",
 all:"Toutes les sections", none:"Aperçu uniquement",
 s_active:"Actif", s_invited:"Invitation en attente", s_disabled:"Désactivé", s_expired:"Lien expiré",
 never:"Pas encore connecté", inv_on:"Invitation : {date}",
 m_edit:"Modifier le rôle et les droits", m_resend:"Renvoyer l'invitation", m_disable:"Désactiver", m_enable:"Réactiver", m_remove:"Retirer de l'équipe", m_open:"Actions",
 lk_owner:"Le compte du propriétaire ne peut pas être modifié", lk_self:"Vous ne pouvez pas modifier votre propre rôle ni vos droits", lk_above:"Seul le propriétaire de l'entreprise peut gérer cette personne",
 i_h:"Inviter un nouvel utilisateur", i_sub:"L'invitation part par e-mail ; le compte devient actif quand la personne choisit son mot de passe.",
 i_name:"Nom complet", i_email:"E-mail", i_ph_name:"p. ex. Léa Martin", i_ph_email:"lea@entreprise.com", i_role:"Rôle",
 i_custom:"Personnaliser les droits", i_custom_hint:"Les droits par défaut du rôle sont cochés ; activez-les ou désactivez-les pour cette personne.",
 i_note:"Le lien de création du mot de passe est valable {h} heures. Places utilisées : {n}/{max} (vous compris).",
 i_send:"Envoyer l'invitation", i_mailfail:"L'invitation est enregistrée mais l'e-mail n'a pas pu être envoyé. Utilisez « Renvoyer l'invitation » pour réessayer.",
 e_h:"Modifier le rôle et les droits", e_sub:"Choisissez le rôle et les sections que {name} peut ouvrir.", e_role:"Rôle", e_perms:"Droits",
 e_hint:"Changer le rôle rétablit les droits par défaut de ce rôle ; vous pouvez ensuite les ajuster un à un.", e_custom:"Droits personnalisés",
 trimmed:"Certains droits du rôle ont été retirés car vous ne pouvez pas les accorder.",
 e_locked_you:"Vous ne détenez pas ce droit, vous ne pouvez donc pas l'accorder", e_locked_owner:"Seul le propriétaire de l'entreprise peut accorder ce droit",
 cf_dis_t:"Désactiver {name} ?", cf_dis_d:"La personne est déconnectée aussitôt et ne peut plus ouvrir l'espace tant que vous ne la réactivez pas. Le compte n'est pas supprimé.",
 cf_rem_t:"Retirer {name} de l'équipe ?", cf_rem_a:"Son accès à cette entreprise prend fin aussitôt. Elle conserve son propre compte.", cf_rem_i:"L'invitation est annulée et le compte créé pour cette adresse e-mail est supprimé.",
 t_invited:"{name} a été invité(e)", t_resent:"Invitation renvoyée à {name}", t_updated:"{name} mis(e) à jour", t_disabled:"{name} désactivé(e)", t_enabled:"{name} réactivé(e)", t_removed:"{name} retiré(e) de l'équipe",
 x_title:"Action impossible",
 x_email_taken:"Un compte existe déjà avec cette adresse e-mail. Utilisez une autre adresse.", x_seats_full:"Vous avez atteint la limite de places ({max}). Retirez quelqu'un de l'équipe pour inviter une nouvelle personne.",
 x_cannot_grant:"Vous ne pouvez pas accorder un droit que vous n'avez pas, ni un droit que seul le propriétaire peut accorder.", x_above:"Seul le propriétaire de l'entreprise peut gérer cette personne.",
 x_self:"Vous ne pouvez pas modifier votre propre rôle, vos droits ni votre statut.", x_not_invited:"Cette personne n'a pas d'invitation en attente.",
 x_too_soon:"L'invitation vient d'être envoyée. Réessayez dans une minute.", x_mail_limit:"Vous avez atteint la limite d'e-mails d'invitation pour aujourd'hui. Réessayez demain.",
 x_rate:"Trop de demandes. Patientez un instant et réessayez.",
 x_v_email:"Saisissez une adresse e-mail valide.", x_v_name:"Le nom doit comporter au moins 2 caractères.", x_v_role:"Choisissez un rôle.", x_validation:"Les informations saisies ne sont pas valides.",
 x_forbidden:"Vous n'avez pas l'autorisation d'effectuer cette action.", x_gone:"Personne introuvable ; la liste a été actualisée.", x_state:"Le statut de la personne a changé ; la liste a été actualisée.",
 x_network:"Connexion impossible. Vérifiez votre connexion internet et réessayez.", x_generic:"L'action n'a pas pu être effectuée. Réessayez.", x_load:"Impossible de charger l'équipe.",
 n_h:"Accès par rôle", n_p:"Chaque rôle ouvre par défaut les sections ci-dessous ; vous pouvez aussi accorder des droits personnalisés à chaque personne. Chaque modification est inscrite au journal d'activité.",
 n_active:"Utilisateurs actifs", n_free:"Places libres",
 em_h:"Pas encore de collègues", em_p:"Invitez quelqu'un comme administrateur, ventes ou opérations ; chaque personne ne voit que les sections qu'elle peut utiliser.",
 na_h:"Vous n'avez pas accès à cette section", na_p:"Vous n'avez pas l'autorisation d'utiliser « {tab} ». Demandez l'accès à l'administrateur de votre entreprise si nécessaire.", na_back:"Retour à l'aperçu",
 nc_h:"Ce compte n'est actuellement lié à aucune entreprise", nc_p:"Votre accès a peut-être été désactivé ou vous avez été retiré de l'équipe. Contactez l'administrateur de votre entreprise.",
 nb_h:"Vous ne pouvez pas effectuer d'achats", nb_p:"L'achat de Premium et de crédits est réservé au propriétaire de l'entreprise. Demandez-le-lui si nécessaire.",
 ac_title:"Activité", ac_sub:"Actions récentes dans l'espace de votre entreprise : changements d'équipe, mises à jour du profil et des documents, connexions.",
 f_all:"Tout", f_team:"Équipe", f_profile:"Profil", f_docs:"Documents", f_sec:"Connexions et consentements", f_credits:"Crédits et accès", f_msgs:"Messages", f_other:"Autres",
 d_today:"Aujourd'hui", d_yesterday:"Hier",
 a_empty:"Aucune activité enregistrée pour l'instant. Les changements d'équipe, mises à jour du profil et connexions apparaîtront ici.", a_empty_f:"Aucune entrée ne correspond à ce filtre.",
 a_load:"Impossible de charger le journal d'activité.", a_limit:"Affichage des {n} dernières actions.", a_by:"Par : {by}", a_you:"Vous", a_support:"Support Kervea", a_someone:"Un utilisateur",
 ev_team_invite:"Invitation envoyée à l'équipe", ev_team_resend:"Invitation renvoyée", ev_team_update:"Rôle ou droits mis à jour", ev_team_remove:"Retiré de l'équipe",
 ev_team_disable:"Utilisateur désactivé", ev_team_enable:"Utilisateur réactivé", ev_auth_login:"Connexion",
 ev_consent_change:"Préférence de consentement modifiée", ev_profile_update:"Profil de l'entreprise mis à jour", ev_doc_upload:"Document téléversé",
 ev_credits_purchase:"Crédits achetés", ev_credits_grant:"Crédits ajoutés au compte", ev_person_reveal:"Les coordonnées d'une personne ont été ouvertes",
 ev_firm_reveal:"Les coordonnées d'une entreprise ont été ouvertes", ev_message_start:"Nouvelle conversation démarrée",
 ct_contact_visibility:"Affichage des coordonnées", ct_marketing:"Notifications par e-mail", on:"activé", off:"désactivé",
 dt_role:"Rôle : {role}", dt_perms:"Droits : {list}", dt_fields:"Champs : {list}", dt_credits:"{n} crédits", dt_files:"{n} fichiers",
 pf_name:"nom de l'entreprise", pf_sector:"secteur", pf_description:"description", pf_social:"liens sociaux", pf_products:"produits", pf_hs_codes:"codes SH",
 pf_website:"site web", pf_email:"e-mail", pf_phone:"téléphone", pf_address:"adresse", pf_city:"ville"
},
ar:{
 title:"الفريق", sub:"ادعُ زملاءك إلى لوحة شركتك وحدّد دور كل منهم والأقسام التي يمكنه فتحها.",
 invite:"دعوة مستخدم", loading:"جارٍ التحميل…", retry:"أعد المحاولة", cancel:"إلغاء", close:"إغلاق", save:"حفظ", saving:"جارٍ الحفظ…", sending:"جارٍ الإرسال…", you:"أنت",
 seats:"{used}/{max} مقاعد", seats_full_t:"وصلت إلى الحد الأقصى للمقاعد",
 c_user:"المستخدم", c_role:"الدور", c_perms:"الصلاحيات", c_last:"آخر دخول", c_status:"الحالة",
 r_owner:"المالك", r_admin:"مدير", r_sales:"المبيعات", r_ops:"العمليات",
 pl_matches:"المطابقات", pl_messages:"الرسائل", pl_people:"الأشخاص", pl_analytics:"التحليلات", pl_profile:"ملف الشركة", pl_docs:"المستندات", pl_team:"الفريق والنشاط", pl_billing:"شراء Premium والرصيد",
 pd_matches:"يتصفح اقتراحات المطابقة وصفحات الشركات.", pd_messages:"يقرأ رسائل الشركة ويرد عليها.",
 pd_people:"يستخدم قسم الأشخاص وينفق رصيدًا لفتح بيانات الاتصال.", pd_analytics:"يطّلع على إحصاءات المشاهدات والوصول والمقارنة.",
 pd_profile:"يعدّل بيانات الشركة ومنتجاتها وروابطها الاجتماعية.", pd_docs:"يطّلع على مستندات التحقق ويرفع مستندات جديدة.",
 pd_team:"يدعو الأشخاص ويعدّل الأدوار ويقرأ سجل النشاط. لا يمنحها إلا المالك.", pd_billing:"يشتري Premium والرصيد. لا يمنحها إلا المالك.",
 g_work:"مساحة العمل", g_company:"الشركة", g_admin:"الإدارة",
 all:"جميع الأقسام", none:"النظرة العامة فقط",
 s_active:"نشط", s_invited:"الدعوة قيد الانتظار", s_disabled:"معطّل", s_expired:"انتهت صلاحية الرابط",
 never:"لم يسجّل الدخول بعد", inv_on:"الدعوة: {date}",
 m_edit:"تعديل الدور والصلاحيات", m_resend:"إعادة إرسال الدعوة", m_disable:"تعطيل", m_enable:"إعادة التفعيل", m_remove:"إزالة من الفريق", m_open:"الإجراءات",
 lk_owner:"لا يمكن تعديل حساب المالك", lk_self:"لا يمكنك تغيير دورك أو صلاحياتك", lk_above:"لا يديره إلا مالك الشركة",
 i_h:"دعوة مستخدم جديد", i_sub:"تُرسل الدعوة بالبريد الإلكتروني ويُفعَّل الحساب عندما يختار الشخص كلمة مروره.",
 i_name:"الاسم الكامل", i_email:"البريد الإلكتروني", i_ph_name:"مثال: أحمد كايا", i_ph_email:"ahmet@company.com", i_role:"الدور",
 i_custom:"تخصيص الصلاحيات", i_custom_hint:"صلاحيات الدور الافتراضية محددة؛ يمكنك تفعيلها أو إيقافها لهذا الشخص.",
 i_note:"رابط تعيين كلمة المرور صالح لمدة {h} ساعة. المقاعد المستخدمة: {n}/{max} (بما فيها مقعدك).",
 i_send:"إرسال الدعوة", i_mailfail:"حُفظت الدعوة لكن تعذّر إرسال البريد. استخدم «إعادة إرسال الدعوة» للمحاولة مجددًا.",
 e_h:"تعديل الدور والصلاحيات", e_sub:"حدّد دور {name} والأقسام التي يمكنه فتحها.", e_role:"الدور", e_perms:"الصلاحيات",
 e_hint:"عند تغيير الدور تعود الصلاحيات إلى الافتراضي لذلك الدور؛ ثم يمكنك ضبطها واحدة واحدة.", e_custom:"صلاحيات مخصصة",
 trimmed:"استُبعدت بعض صلاحيات الدور لأنك لا تستطيع منحها.",
 e_locked_you:"لا تملك هذه الصلاحية، لذا لا يمكنك منحها", e_locked_owner:"لا يمنح هذه الصلاحية إلا مالك الشركة",
 cf_dis_t:"تعطيل {name}؟", cf_dis_d:"يُسجَّل خروجه فورًا ولا يمكنه فتح اللوحة حتى تعيد تفعيله. لا يُحذف الحساب.",
 cf_rem_t:"إزالة {name} من الفريق؟", cf_rem_a:"ينتهي وصوله إلى هذه الشركة فورًا ويحتفظ بحسابه الخاص.", cf_rem_i:"تُلغى الدعوة ويُحذف الحساب الذي أُنشئ لهذا البريد الإلكتروني.",
 t_invited:"تمت دعوة {name}", t_resent:"أُعيد إرسال الدعوة إلى {name}", t_updated:"تم تحديث {name}", t_disabled:"تم تعطيل {name}", t_enabled:"أُعيد تفعيل {name}", t_removed:"أُزيل {name} من الفريق",
 x_title:"تعذّر تنفيذ الإجراء",
 x_email_taken:"يوجد حساب بهذا البريد الإلكتروني بالفعل. استخدم عنوانًا آخر.", x_seats_full:"وصلت إلى الحد الأقصى للمقاعد ({max}). أزل شخصًا من الفريق لدعوة شخص جديد.",
 x_cannot_grant:"لا يمكنك منح صلاحية لا تملكها أو صلاحية لا يمنحها إلا مالك الشركة.", x_above:"لا يديره إلا مالك الشركة.",
 x_self:"لا يمكنك تغيير دورك أو صلاحياتك أو حالتك.", x_not_invited:"ليس لهذا الشخص دعوة معلّقة.",
 x_too_soon:"أُرسلت الدعوة للتو. حاول مجددًا بعد دقيقة.", x_mail_limit:"بلغت الحد اليومي لرسائل الدعوة. حاول غدًا.",
 x_rate:"طلبات كثيرة. انتظر قليلًا ثم حاول مجددًا.",
 x_v_email:"أدخل بريدًا إلكترونيًا صحيحًا.", x_v_name:"يجب ألا يقل الاسم عن حرفين.", x_v_role:"اختر دورًا.", x_validation:"المعلومات المدخلة غير صالحة.",
 x_forbidden:"ليست لديك صلاحية لهذا الإجراء.", x_gone:"لم يُعثر على الشخص؛ حُدّثت القائمة.", x_state:"تغيّرت حالة الشخص؛ حُدّثت القائمة.",
 x_network:"تعذّر الاتصال. تحقق من الإنترنت وحاول مجددًا.", x_generic:"تعذّر إكمال الإجراء. حاول مجددًا.", x_load:"تعذّر تحميل الفريق.",
 n_h:"الوصول حسب الدور", n_p:"يفتح كل دور الأقسام أدناه افتراضيًا، ويمكنك أيضًا منح صلاحيات مخصصة لكل شخص. تُسجَّل كل التغييرات في سجل النشاط.",
 n_active:"المستخدمون النشطون", n_free:"المقاعد الشاغرة",
 em_h:"لا يوجد زملاء بعد", em_p:"ادعُ شخصًا بدور مدير أو مبيعات أو عمليات؛ يرى كل شخص الأقسام المسموح له بها فقط.",
 na_h:"ليس لديك صلاحية الوصول إلى هذا القسم", na_p:"لا يُسمح لك باستخدام «{tab}». اطلب الإذن من مدير شركتك عند الحاجة.", na_back:"العودة إلى النظرة العامة",
 nc_h:"هذا الحساب غير مرتبط بشركة حاليًا", nc_p:"ربما أُوقف وصولك أو أُزلتَ من الفريق. تواصل مع مدير شركتك.",
 nb_h:"لا تملك صلاحية الشراء", nb_p:"شراء Premium والرصيد من صلاحيات مالك الشركة. اطلب ذلك من المالك عند الحاجة.",
 ac_title:"النشاط", ac_sub:"أحدث الإجراءات في لوحة شركتك: تغييرات الفريق وتحديثات الملف والمستندات وعمليات الدخول.",
 f_all:"الكل", f_team:"الفريق", f_profile:"الملف", f_docs:"المستندات", f_sec:"الدخول والموافقات", f_credits:"الرصيد والوصول", f_msgs:"الرسائل", f_other:"أخرى",
 d_today:"اليوم", d_yesterday:"أمس",
 a_empty:"لا يوجد نشاط مسجَّل بعد. ستظهر هنا تغييرات الفريق وتحديثات الملف وعمليات الدخول.", a_empty_f:"لا توجد إدخالات تطابق هذا الفلتر.",
 a_load:"تعذّر تحميل سجل النشاط.", a_limit:"عرض آخر {n} إجراء.", a_by:"بواسطة: {by}", a_you:"أنت", a_support:"دعم Kervea", a_someone:"مستخدم",
 ev_team_invite:"أُرسلت دعوة إلى الفريق", ev_team_resend:"أُعيد إرسال الدعوة", ev_team_update:"تم تحديث الدور أو الصلاحيات", ev_team_remove:"أُزيل من الفريق",
 ev_team_disable:"تم تعطيل المستخدم", ev_team_enable:"أُعيد تفعيل المستخدم", ev_auth_login:"تسجيل دخول",
 ev_consent_change:"تغيّر تفضيل الموافقة", ev_profile_update:"تم تحديث ملف الشركة", ev_doc_upload:"تم رفع مستند",
 ev_credits_purchase:"تم شراء رصيد", ev_credits_grant:"أُضيف رصيد إلى الحساب", ev_person_reveal:"فُتحت بيانات الاتصال بشخص",
 ev_firm_reveal:"فُتحت بيانات الاتصال بشركة", ev_message_start:"بدأت محادثة جديدة",
 ct_contact_visibility:"إظهار بيانات الاتصال", ct_marketing:"إشعارات البريد الإلكتروني", on:"مفعّل", off:"متوقف",
 dt_role:"الدور: {role}", dt_perms:"الصلاحيات: {list}", dt_fields:"الحقول: {list}", dt_credits:"{n} رصيد", dt_files:"{n} ملف",
 pf_name:"اسم الشركة", pf_sector:"القطاع", pf_description:"الوصف", pf_social:"الروابط الاجتماعية", pf_products:"المنتجات", pf_hs_codes:"رموز HS",
 pf_website:"الموقع", pf_email:"البريد الإلكتروني", pf_phone:"الهاتف", pf_address:"العنوان", pf_city:"المدينة"
},
ru:{
 title:"Команда", sub:"Приглашайте коллег в кабинет вашей компании и задавайте их роль и доступные разделы.",
 invite:"Пригласить пользователя", loading:"Загрузка…", retry:"Повторить", cancel:"Отмена", close:"Закрыть", save:"Сохранить", saving:"Сохранение…", sending:"Отправка…", you:"Вы",
 seats:"{used}/{max} мест", seats_full_t:"Достигнут лимит мест",
 c_user:"Пользователь", c_role:"Роль", c_perms:"Доступ", c_last:"Последний вход", c_status:"Статус",
 r_owner:"Владелец", r_admin:"Администратор", r_sales:"Продажи", r_ops:"Операции",
 pl_matches:"Совпадения", pl_messages:"Сообщения", pl_people:"Люди", pl_analytics:"Аналитика", pl_profile:"Профиль компании", pl_docs:"Документы", pl_team:"Команда и активность", pl_billing:"Покупка Premium и кредитов",
 pd_matches:"Просматривает рекомендации совпадений и страницы компаний.", pd_messages:"Читает сообщения компании и отвечает на них.",
 pd_people:"Работает с разделом «Люди» и тратит кредиты на открытие контактов.", pd_analytics:"Видит статистику просмотров, охвата и сравнения.",
 pd_profile:"Редактирует данные компании, продукцию и ссылки на соцсети.", pd_docs:"Видит документы для проверки и загружает новые.",
 pd_team:"Приглашает людей, меняет роли и читает журнал активности. Выдать может только владелец.", pd_billing:"Покупает Premium и кредиты. Выдать может только владелец.",
 g_work:"Рабочая область", g_company:"Компания", g_admin:"Управление",
 all:"Все разделы", none:"Только обзор",
 s_active:"Активен", s_invited:"Ожидает приглашения", s_disabled:"Отключён", s_expired:"Ссылка истекла",
 never:"Ещё не входил", inv_on:"Приглашение: {date}",
 m_edit:"Изменить роль и права", m_resend:"Отправить приглашение снова", m_disable:"Отключить", m_enable:"Включить снова", m_remove:"Удалить из команды", m_open:"Действия",
 lk_owner:"Учётную запись владельца изменить нельзя", lk_self:"Вы не можете менять собственную роль и права", lk_above:"Этим человеком может управлять только владелец компании",
 i_h:"Пригласить нового пользователя", i_sub:"Приглашение уходит по e-mail; учётная запись активируется, когда человек задаст пароль.",
 i_name:"Имя и фамилия", i_email:"E-mail", i_ph_name:"Напр. Иван Петров", i_ph_email:"ivan@company.com", i_role:"Роль",
 i_custom:"Настроить права", i_custom_hint:"Права роли по умолчанию отмечены; включите или отключите их для этого человека.",
 i_note:"Ссылка для задания пароля действует {h} ч. Занято мест: {n}/{max} (включая вас).",
 i_send:"Отправить приглашение", i_mailfail:"Приглашение сохранено, но письмо отправить не удалось. Нажмите «Отправить приглашение снова», чтобы повторить.",
 e_h:"Изменить роль и права", e_sub:"Задайте роль и разделы, доступные {name}.", e_role:"Роль", e_perms:"Права",
 e_hint:"При смене роли права возвращаются к значениям этой роли по умолчанию; затем их можно настроить по отдельности.", e_custom:"Особые права",
 trimmed:"Часть прав роли исключена, так как вы не можете их выдавать.",
 e_locked_you:"У вас нет этого права, поэтому вы не можете его выдать", e_locked_owner:"Это право может выдать только владелец компании",
 cf_dis_t:"Отключить {name}?", cf_dis_d:"Человек сразу выйдет из системы и не сможет открыть кабинет, пока вы не включите его снова. Учётная запись не удаляется.",
 cf_rem_t:"Удалить {name} из команды?", cf_rem_a:"Доступ к этой компании прекращается сразу. Собственная учётная запись сохраняется.", cf_rem_i:"Приглашение отменяется, а созданная для этого e-mail учётная запись удаляется.",
 t_invited:"{name} приглашён(а)", t_resent:"Приглашение повторно отправлено: {name}", t_updated:"{name} обновлён(а)", t_disabled:"{name} отключён(а)", t_enabled:"{name} снова включён(а)", t_removed:"{name} удалён(а) из команды",
 x_title:"Действие не выполнено",
 x_email_taken:"Учётная запись с этим e-mail уже существует. Используйте другой адрес.", x_seats_full:"Достигнут лимит мест ({max}). Удалите кого-нибудь из команды, чтобы пригласить нового человека.",
 x_cannot_grant:"Нельзя выдать право, которого у вас нет, или право, которое выдаёт только владелец компании.", x_above:"Этим человеком может управлять только владелец компании.",
 x_self:"Вы не можете менять собственную роль, права или статус.", x_not_invited:"У этого человека нет ожидающего приглашения.",
 x_too_soon:"Приглашение только что отправлено. Повторите через минуту.", x_mail_limit:"Достигнут дневной лимит писем-приглашений. Повторите завтра.",
 x_rate:"Слишком много запросов. Подождите немного и повторите.",
 x_v_email:"Введите корректный адрес e-mail.", x_v_name:"Имя должно содержать не менее 2 символов.", x_v_role:"Выберите роль.", x_validation:"Введённые данные недопустимы.",
 x_forbidden:"У вас нет прав на это действие.", x_gone:"Человек не найден; список обновлён.", x_state:"Статус человека изменился; список обновлён.",
 x_network:"Нет соединения. Проверьте интернет и повторите.", x_generic:"Не удалось выполнить действие. Повторите попытку.", x_load:"Не удалось загрузить команду.",
 n_h:"Доступ по ролям", n_p:"Каждая роль по умолчанию открывает перечисленные разделы; отдельному человеку можно выдать особые права. Каждое изменение записывается в журнал активности.",
 n_active:"Активных пользователей", n_free:"Свободных мест",
 em_h:"Пока нет коллег", em_p:"Пригласите человека с ролью администратора, продаж или операций; каждый видит только разрешённые ему разделы.",
 na_h:"У вас нет доступа к этому разделу", na_p:"Вам не разрешено пользоваться разделом «{tab}». При необходимости попросите доступ у администратора компании.", na_back:"Назад к обзору",
 nc_h:"Эта учётная запись сейчас не привязана к компании", nc_p:"Возможно, ваш доступ отключён или вас удалили из команды. Свяжитесь с администратором компании.",
 nb_h:"У вас нет права на покупки", nb_p:"Покупка Premium и кредитов — право владельца компании. При необходимости обратитесь к нему.",
 ac_title:"Активность", ac_sub:"Последние действия в кабинете вашей компании: изменения команды, обновления профиля и документов, входы.",
 f_all:"Все", f_team:"Команда", f_profile:"Профиль", f_docs:"Документы", f_sec:"Входы и согласия", f_credits:"Кредиты и доступ", f_msgs:"Сообщения", f_other:"Другое",
 d_today:"Сегодня", d_yesterday:"Вчера",
 a_empty:"Записей активности пока нет. Здесь появятся изменения команды, обновления профиля и входы.", a_empty_f:"Нет записей, подходящих под этот фильтр.",
 a_load:"Не удалось загрузить журнал активности.", a_limit:"Показаны последние {n} действий.", a_by:"Кто: {by}", a_you:"Вы", a_support:"Поддержка Kervea", a_someone:"Пользователь",
 ev_team_invite:"Приглашение отправлено в команду", ev_team_resend:"Приглашение отправлено повторно", ev_team_update:"Роль или права обновлены", ev_team_remove:"Удалён из команды",
 ev_team_disable:"Пользователь отключён", ev_team_enable:"Пользователь снова включён", ev_auth_login:"Вход в систему",
 ev_consent_change:"Изменено согласие", ev_profile_update:"Профиль компании обновлён", ev_doc_upload:"Документ загружен",
 ev_credits_purchase:"Куплены кредиты", ev_credits_grant:"На счёт начислены кредиты", ev_person_reveal:"Открыты контакты человека",
 ev_firm_reveal:"Открыты контакты компании", ev_message_start:"Начат новый диалог",
 ct_contact_visibility:"Показ контактных данных", ct_marketing:"E-mail-уведомления", on:"включено", off:"выключено",
 dt_role:"Роль: {role}", dt_perms:"Права: {list}", dt_fields:"Поля: {list}", dt_credits:"{n} кредитов", dt_files:"Файлов: {n}",
 pf_name:"название компании", pf_sector:"отрасль", pf_description:"описание", pf_social:"соцсети", pf_products:"продукция", pf_hs_codes:"коды ТН ВЭД",
 pf_website:"сайт", pf_email:"e-mail", pf_phone:"телефон", pf_address:"адрес", pf_city:"город"
}
};

function lang(){ return window.LANG || 'tr'; }
function L(k, v){
  var d = X[lang()], s = (d && d[k] != null) ? d[k] : (X.en[k] != null ? X.en[k] : (X.tr[k] != null ? X.tr[k] : k));
  if(v){ for(var a in v){ if(Object.prototype.hasOwnProperty.call(v, a)) s = String(s).split('{'+a+'}').join(v[a] == null ? '' : v[a]); } }
  return s;
}
// T sözlüğüne kaydet (data-i18n="kvt_*" öznitelikleri setLang ile çevrilir); eksik dil İngilizceye düşer
(function(){
  if(!window.T) return;
  Object.keys(X).forEach(function(l){
    if(!T[l]) T[l] = {};
    Object.keys(X.tr).forEach(function(k){ T[l]['kvt_'+k] = (X[l] && X[l][k] != null) ? X[l][k] : X.en[k]; });
  });
})();
function applyStaticI18n(){
  document.querySelectorAll('[data-i18n^="kvt_"]').forEach(function(n){ n.innerHTML = L(n.getAttribute('data-i18n').slice(4)); });
}

/* ═══════════════════════════ yardımcılar ═══════════════════════════ */
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function say(text){ if(typeof window.toast === 'function') window.toast(text); }
function alertBox(variant, title, text){ if(typeof window.kvShowAlert === 'function') window.kvShowAlert(variant, title, text); else say(text || title); }
function loc(){
  if(typeof window.kvLocale === 'function'){ try{ var l = window.kvLocale(); if(l) return l; }catch(e){} }
  return ({tr:'tr-TR', en:'en-GB', es:'es-ES', fr:'fr-FR', ar:'ar', ru:'ru-RU'})[lang()] || 'tr-TR';
}
function toDate(iso){ var d = iso ? new Date(iso) : null; return d && !isNaN(d.getTime()) ? d : null; }
function fmtDate(iso){ var d = toDate(iso); if(!d) return ''; try{ return d.toLocaleDateString(loc(), {day:'numeric', month:'short', year:'numeric'}); }catch(e){ return d.toDateString(); } }
function fmtDateTime(iso){ var d = toDate(iso); if(!d) return ''; try{ return d.toLocaleString(loc(), {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'}); }catch(e){ return d.toString(); } }
function fmtTime(d){ try{ return d.toLocaleTimeString(loc(), {hour:'2-digit', minute:'2-digit'}); }catch(e){ return ''; } }
function sameDay(a, b){ return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function initials(name){ var w = String(name || '?').trim().split(/\s+/).filter(Boolean); return ((w[0] || '?').charAt(0) + (w.length > 1 ? w[w.length - 1].charAt(0) : '')).toUpperCase(); }
var GRAD = [['#0D8A80','#0A5F56'],['#8b5cf6','#6366f1'],['#c78a2a','#e6a54a'],['#3b82f6','#60a5fa'],['#a44a2e','#c46e50'],['#22a06b','#1b7f55'],['#5b7c99','#809bb8']];
function hash(s){ var h = 0; s = String(s); for(var i = 0; i < s.length; i++){ h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }
function avatar(name, seed){ var g = GRAD[hash(seed || name) % GRAD.length]; return '<div class="av" style="background:linear-gradient(135deg,'+g[0]+','+g[1]+')">'+esc(initials(name))+'</div>'; }
function sameSet(a, b){ a = (a || []).slice().sort(); b = (b || []).slice().sort(); return a.length === b.length && a.every(function(x, i){ return x === b[i]; }); }
function inter(a, b){ return (a || []).filter(function(x){ return b.indexOf(x) >= 0; }); }

var IC = {
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 4 20 12 6 20 6 4"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  team:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  login:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  prof:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  coin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5C9.5 8.4 10.6 8 12 8s2.5.6 2.5 1.7c0 2.3-5 1.3-5 3.6C9.5 14.4 10.6 15 12 15s2.5-.5 2.5-1.5"/></svg>',
  msg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  dot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg>',
  info:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
};

/* ═══════════════════════════ kimlik / izinler (sunucu söyler, burada yalnızca okunur) ═══════════════════════════ */
var PERM_ORDER = ['matches', 'messages', 'people', 'analytics', 'profile', 'docs', 'team', 'billing'];
var TAB_PERM = {matches:'matches', profile:'profile', messages:'messages', people:'people', analytics:'analytics', docs:'docs', team:'team', activity:'team'};
var TAB_LABEL = {overview:['p_over','Genel Bakış'], matches:['p_matches','Eşleşmeler'], profile:['p_profile','Firma Profilim'], messages:['p_msgs','Mesajlar'], people:['p_people','Kişiler'], analytics:['p_ana','Analiz'], docs:['p_docs','Belgelerim'], team:['p_team','Ekip'], activity:['p_activity','Aktivite'], settings:['p_set','Ayarlar']};
function me(){
  var u = window.KV_USER; if(!u) return null;
  var m = window.KV_ME && window.KV_ME.user;
  return (m && m.email === u.email) ? m : u;
}
function myPerms(){ var u = me(); return (u && u.perms) || []; }
function can(p){ return myPerms().indexOf(p) >= 0; }
function myRole(){ var u = me(); return (u && u.role) || null; }
function inCompany(){ var u = me(); return !!(u && u.company); }
function roleLabel(key){ var k = 'r_' + key; return X[lang()] && X[lang()][k] != null ? X[lang()][k] : (X.en[k] != null ? X.en[k] : key); }
function permLabel(key){
  var c = S.data && S.data.perms && S.data.perms.filter(function(p){ return p.key === key; })[0];
  var k = 'pl_' + key; return (X[lang()] && X[lang()][k]) || X.en[k] || (c && c.label) || key;
}

/* ═══════════════════════════ panel kabuğu: sekmeleri izne göre gizle / engelle ═══════════════════════════ */
var NO_ACCESS_OPEN = null;
function gateStyle(){
  var s = $('kvt-gate');
  if(!s){ s = document.createElement('style'); s.id = 'kvt-gate'; document.head.appendChild(s); }
  return s;
}
function blocked(sec){
  if(!window.KV_USER) return false;
  var p = TAB_PERM[sec];
  return !!p && !can(p);
}
function tabName(sec){ var t = TAB_LABEL[sec]; return t ? ((window.T && T[lang()] && T[lang()][t[0]]) || t[1]) : sec; }
function ensureNoAccessPanel(){
  var p = $('dp-noaccess');
  if(!p){
    var host = $('dp-overview') && $('dp-overview').parentNode; if(!host) return null;
    p = document.createElement('div'); p.className = 'dpanel'; p.id = 'dp-noaccess';
    host.appendChild(p);
  }
  return p;
}
function showNoAccess(sec){
  var p = ensureNoAccessPanel(); if(!p) return;
  NO_ACCESS_OPEN = sec;
  p.innerHTML = '<div class="kvt-na"><div class="kvt-na-ic">'+IC.lock+'</div><h2>'+esc(L('na_h'))+'</h2><p>'+esc(L('na_p', {tab: tabName(sec)}))+'</p><button class="btn" type="button" id="kvtNaBack">'+esc(L('na_back'))+'</button></div>';
  $('kvtNaBack').addEventListener('click', function(){ NO_ACCESS_OPEN = null; goOverview(); });
  if(_showPanel) _showPanel('noaccess');
}
function goOverview(){
  var btn = document.querySelector('.dmenu a[onclick*="showPanel(\'overview\'"]');
  if(window.showPanel) window.showPanel('overview', btn);
}
var _showPanel = window.showPanel;
if(typeof _showPanel === 'function'){
  window.showPanel = function(sec, btn){
    if(blocked(sec)){ showNoAccess(sec); revealOnPhone('noaccess'); return; }
    NO_ACCESS_OPEN = null;
    var r = _showPanel.apply(this, arguments);
    revealOnPhone(sec);
    return r;
  };
}
// phones stack the menu above the content: after choosing a tab, bring the tab's content into view
function revealOnPhone(sec){
  if(!window.matchMedia || !window.matchMedia('(max-width:820px)').matches) return;
  setTimeout(function(){ var el = $('dp-' + sec); if(el && el.classList.contains('on') && el.scrollIntoView){ try{ el.scrollIntoView({block:'start', behavior:'smooth'}); }catch(e){ el.scrollIntoView(); } } }, 60);
}
function ownerOnlyToggle(hide){
  var cls = 'kvt-hide';
  var els = [];
  document.querySelectorAll('#dp-overview [onclick*="kvExportData"]').forEach(function(n){ els.push(n); });
  ['kvSetExport', 'kvSetDelete'].forEach(function(id){ var n = $(id); if(n) els.push(n); });
  var vis = $('kvSetVis');                      // KVKK consent switches (heading, note and both rows) belong to the owner
  if(vis){
    var row = vis.closest('.tglrow');
    if(row){
      var n = row.previousElementSibling; while(n && n.tagName !== 'H3'){ els.push(n); n = n.previousElementSibling; }
      if(n) els.push(n);
      for(n = row; n && !(n.tagName === 'H3'); n = n.nextElementSibling){ els.push(n); }
    }
  }
  els.forEach(function(n){ n.classList.toggle(cls, !!hide); });
}
function whoChip(){
  var ph = document.querySelector('#panel .ph'); if(!ph) return;
  var w = $('kvtWho');
  if(!w){ w = document.createElement('div'); w.id = 'kvtWho'; w.className = 'kvt-who'; ph.appendChild(w); }
  var u = me(), role = myRole();
  if(!u || !inCompany() || !role){ w.hidden = true; w.innerHTML = ''; return; }
  var co = (window.KV_ME && window.KV_ME.company && (window.KV_ME.company.nm || window.KV_ME.company.name)) || '';
  w.hidden = false;
  w.innerHTML = '<span class="tm-role-badge '+esc(role)+'">'+esc(roleLabel(role))+'</span>'+(co ? '<span class="kvt-who-co"><bdi>'+esc(co)+'</bdi></span>' : '');
}
function nocoBanner(){
  var host = $('dp-overview'); if(!host) return;
  var u = me(), show = !!(u && !inCompany() && !u.is_admin);
  var b = $('kvtNoco');
  if(!show){ if(b) b.remove(); return; }
  if(!b){ b = document.createElement('div'); b.id = 'kvtNoco'; b.className = 'kvt-noco'; b.setAttribute('role', 'status'); host.insertBefore(b, host.firstChild); }
  b.innerHTML = '<div class="kvt-noco-ic">'+IC.lock+'</div><div><b>'+esc(L('nc_h'))+'</b><p>'+esc(L('nc_p'))+'</p></div>';
}
function applyGate(){
  var u = me(), css = '';
  if(u){
    Object.keys(TAB_PERM).forEach(function(k){
      if(!can(TAB_PERM[k])){ css += '.dmenu a[onclick*="showPanel(\''+k+'\'"]{display:none!important}'; }
    });
  }
  gateStyle().textContent = css;
  var b = document.body, role = myRole();
  b.classList.toggle('kvt-member', !!(u && inCompany() && role !== 'owner'));
  b.classList.toggle('kvt-noco', !!(u && !inCompany() && !u.is_admin));
  b.classList.toggle('kvt-nobilling', !!(u && inCompany() && !can('billing')));
  ownerOnlyToggle(!!(u && inCompany() && role !== 'owner'));
  whoChip(); nocoBanner();
  // a tab that is open although this person may not use it (permissions were taken away, forced open) → the first allowed one
  var open = document.querySelector('.dpanel.on');
  if(u && open && /^dp-/.test(open.id)){
    var name = open.id.slice(3);
    if(name !== 'noaccess' && blocked(name)){ goOverview(); }
  }
}

/* billing: people without the permission neither see nor can open the Premium / credit purchase windows */
function noBilling(){ alertBox('info', L('nb_h'), L('nb_p')); }
function billingBlocked(){ return !!(window.KV_USER && inCompany() && !can('billing')); }
(function(){
  var _up = window.upgradeToPro;
  if(typeof _up === 'function'){ window.upgradeToPro = function(){ if(billingBlocked()){ noBilling(); return; } return _up.apply(this, arguments); }; }
  var _om = window.openM;
  if(typeof _om === 'function'){ window.openM = function(k){ if((k === 'pay' || k === 'credits') && billingBlocked()){ noBilling(); return; } return _om.apply(this, arguments); }; }
})();

/* ═══════════════════════════ durum ═══════════════════════════ */
var S = {data:null, loading:false, err:false, busy:{}, filter:'all', ac:null, acLoading:false, acErr:false, forEmail:null};

function panelOpen(name){ var p = $('dp-' + name), root = $('panel'); return !!(p && p.classList.contains('on') && root && root.classList.contains('on')); }
function refreshMe(){ if(typeof window.loadMember === 'function') window.loadMember(); }

function errText(r){
  var d = r.data || {}, e = d.error;
  if(r.status === 0) return L('x_network');
  if(r.status === 429) return e === 'too_soon' ? L('x_too_soon') : (e === 'mail_limit' ? L('x_mail_limit') : L('x_rate'));
  switch(e){
    case 'email_taken': return L('x_email_taken');
    case 'seats_full': return L('x_seats_full', {max: d.max});
    case 'cannot_grant': return L('x_cannot_grant');
    case 'above_level': return L('x_above');
    case 'self': return L('x_self');
    case 'not_invited': return L('x_not_invited');
    case 'validation': return d.field === 'email' ? L('x_v_email') : (d.field === 'name' ? L('x_v_name') : (d.field === 'role' ? L('x_v_role') : L('x_validation')));
    case 'already_disabled': case 'not_active': case 'not_disabled': return L('x_state');
    case 'forbidden': case 'no_company': return L('x_forbidden');
  }
  if(r.status === 404) return L('x_gone');
  if(r.status === 403) return L('x_forbidden');
  return L('x_generic');
}
function isStale(r){ var e = (r.data || {}).error; return r.status === 404 || e === 'already_disabled' || e === 'not_active' || e === 'not_disabled' || e === 'not_invited'; }

/* ═══════════════════════════ pencereler ═══════════════════════════ */
var MODAL = null;
function closeModal(){
  if(!MODAL) return;
  var m = MODAL; MODAL = null;
  if(m.back.parentNode) m.back.parentNode.removeChild(m.back);
  if(m.box.parentNode) m.box.parentNode.removeChild(m.box);
  if(m.opener && document.body.contains(m.opener) && typeof m.opener.focus === 'function'){ try{ m.opener.focus(); }catch(e){} }
}
function openModal(html, cls){
  closeModal();
  var back = document.createElement('div'); back.className = 'tm-modal-back kvt-back open';
  var box = document.createElement('div'); box.className = 'tm-modal kvt-modal open' + (cls ? ' ' + cls : '');
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.innerHTML = html;
  var h = box.querySelector('h3'); if(h){ h.id = 'kvtDlgT'; box.setAttribute('aria-labelledby', 'kvtDlgT'); }
  document.body.appendChild(back); document.body.appendChild(box);
  MODAL = {back: back, box: box, opener: document.activeElement};
  back.addEventListener('mousedown', closeModal);
  box.addEventListener('click', function(e){ if(e.target.closest('[data-close]')) closeModal(); });
  setTimeout(function(){ var f = box.querySelector('[data-autofocus]') || box.querySelector('input,select,button.btn'); if(f && MODAL && MODAL.box === box) f.focus(); }, 30);
  return box;
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ if(MODAL){ closeModal(); e.stopPropagation(); } else closeMenus(); return; }
  if(e.key === 'Tab' && MODAL){
    var f = MODAL.box.querySelectorAll('input:not([disabled]),select:not([disabled]),button:not([disabled]),summary,[tabindex="0"]');
    if(!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    else if(!MODAL.box.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
  }
});
function confirmDlg(opts, onOk){
  var box = openModal('<div class="mh"><h3>'+esc(opts.title)+'</h3><p>'+esc(opts.text)+'</p><button class="mx" type="button" data-close aria-label="'+esc(L('close'))+'">×</button></div>'+
    '<div class="mf"><button class="btn sec" type="button" data-close>'+esc(L('cancel'))+'</button><button class="btn '+(opts.danger ? 'kvt-danger' : '')+'" type="button" id="kvtOk" data-autofocus>'+esc(opts.ok)+'</button></div>', 'kvt-confirm');
  $('kvtOk').addEventListener('click', function(){ closeModal(); onOk(); });
  return box;
}

/* ═══════════════════════════ ekip sekmesi ═══════════════════════════ */
function loadTeam(){
  if(!can('team') || S.loading) return;
  S.loading = true;
  if(!S.data){ S.err = false; renderTeam(); }
  API('GET', '/kv/team').then(function(r){
    S.loading = false;
    if(r.ok){ S.data = r.data; S.err = false; }
    else { S.err = true; if(r.status === 403) refreshMe(); }
    renderTeam();
  });
}
function findMember(id){ return S.data && S.data.members.filter(function(m){ return m.id === id; })[0]; }
function permsSummary(perms, owner){
  var total = (S.data && S.data.perms ? S.data.perms.length : PERM_ORDER.length);
  if(owner || (perms && perms.length >= total)) return '<span class="kvt-all">'+esc(L('all'))+'</span>';
  if(!perms || !perms.length) return '<span class="kvt-none">'+esc(L('none'))+'</span>';
  var sorted = PERM_ORDER.filter(function(p){ return perms.indexOf(p) >= 0; });
  var shown = sorted.slice(0, 3).map(function(p){ return '<span class="kvt-chip">'+esc(permLabel(p))+'</span>'; }).join('');
  var rest = sorted.slice(3);
  if(rest.length) shown += '<span class="kvt-chip more" title="'+esc(rest.map(permLabel).join(', '))+'">+'+rest.length+'</span>';
  return shown;
}
function statusHtml(m){
  var cls = m.status === 'active' ? 'ok' : (m.status === 'invited' ? 'wn' : 'off');
  var label = L(m.status === 'active' ? 's_active' : (m.status === 'invited' ? 's_invited' : 's_disabled'));
  return '<span class="tm-status '+cls+'"><span class="dot"></span>'+esc(label)+'</span>'+(m.status === 'invited' && m.invite_expired ? '<div class="kvt-expired">'+esc(L('s_expired'))+'</div>' : '');
}
function lastHtml(m, owner){
  if(m.status === 'invited') return esc(L('inv_on', {date: fmtDate(m.invited_at)}));
  return m.last_login_at ? esc(fmtDateTime(m.last_login_at)) : '<span class="kvt-dim">'+esc(L('never'))+'</span>';
}
function rowHtml(m, owner){
  var role = owner ? 'owner' : m.role;
  var menu;
  if(owner){ menu = '<span class="kvt-lock" title="'+esc(L('lk_owner'))+'" aria-label="'+esc(L('lk_owner'))+'">'+IC.lock+'</span>'; }
  else if(m.you){ menu = '<span class="kvt-lock" title="'+esc(L('lk_self'))+'" aria-label="'+esc(L('lk_self'))+'">'+IC.lock+'</span>'; }
  else if(!m.manageable){ menu = '<span class="kvt-lock" title="'+esc(L('lk_above'))+'" aria-label="'+esc(L('lk_above'))+'">'+IC.lock+'</span>'; }
  else { menu = '<button class="tm-dot kvt-dot" type="button" data-act="menu" data-id="'+Number(m.id)+'" aria-haspopup="menu" aria-expanded="false" title="'+esc(L('m_open'))+'" aria-label="'+esc(L('m_open'))+'">⋮</button>'; }
  var busy = !owner && S.busy[m.id];
  return '<div class="tm-row kvt-row'+(busy ? ' kvt-busy' : '')+'"'+(owner ? ' data-owner="1"' : ' data-id="'+Number(m.id)+'"')+'>'+
    '<div class="tm-user col-user">'+avatar(m.name || m.email, m.email)+'<div><b><bdi>'+esc(m.name || m.email)+'</bdi>'+(m.you ? ' <span class="kvt-you">'+esc(L('you'))+'</span>' : '')+'</b><span><bdi>'+esc(m.email)+'</bdi></span></div></div>'+
    '<div class="col-role"><span class="tm-role-badge '+esc(role)+'">'+esc(roleLabel(role))+'</span>'+(!owner && m.custom ? '<div class="kvt-custom-tag">'+esc(L('e_custom'))+'</div>' : '')+'</div>'+
    '<div class="col-perms">'+permsSummary(m.perms, owner)+'</div>'+
    '<div class="col-last">'+lastHtml(m, owner)+'</div>'+
    '<div class="col-status">'+statusHtml(m)+'</div>'+
    '<div class="col-menu">'+menu+'</div></div>';
}
function renderTeam(){
  var st = $('kvtState'), tb = $('kvtTable'), em = $('kvtEmpty'), inf = $('kvtInfo'), seats = $('kvtSeats'), btn = $('kvtInviteBtn');
  if(!st || !tb) return;
  var d = S.data;
  if(!d){
    tb.hidden = em.hidden = inf.hidden = seats.hidden = true; btn.disabled = true;
    st.hidden = false;
    st.innerHTML = S.err ? '<div class="kvt-errbox"><span>'+esc(L('x_load'))+'</span><button class="btn sec sm" type="button" data-act="reload">'+esc(L('retry'))+'</button></div>' : '<span>'+esc(L('loading'))+'</span>';
    return;
  }
  st.hidden = true;
  seats.hidden = false; seats.textContent = L('seats', {used: d.seats.used, max: d.seats.max});
  var full = d.seats.free <= 0;
  btn.disabled = full; btn.title = full ? L('seats_full_t') : '';
  var head = '<div class="tm-thd"><div>'+esc(L('c_user'))+'</div><div class="col-role">'+esc(L('c_role'))+'</div><div class="col-perms">'+esc(L('c_perms'))+'</div><div class="col-last">'+esc(L('c_last'))+'</div><div class="col-status">'+esc(L('c_status'))+'</div><div class="col-menu"></div></div>';
  tb.innerHTML = head + rowHtml(d.owner, true) + d.members.map(function(m){ return rowHtml(m, false); }).join('');
  tb.hidden = false;
  if(!d.members.length){
    em.hidden = false;
    em.innerHTML = '<div class="kvt-empty-ic">'+IC.users+'</div><h4>'+esc(L('em_h'))+'</h4><p>'+esc(L('em_p'))+'</p>';
  } else { em.hidden = true; em.innerHTML = ''; }
  renderInfo();
}
function renderInfo(){
  var inf = $('kvtInfo'), d = S.data; if(!inf || !d) return;
  var active = 1 + d.members.filter(function(m){ return m.status === 'active'; }).length;
  var roles = d.roles.map(function(r){
    return '<div class="kvt-role-line"><span class="tm-role-badge '+esc(r.key)+'">'+esc(roleLabel(r.key))+'</span><span>'+esc(r.perms.length ? PERM_ORDER.filter(function(p){ return r.perms.indexOf(p) >= 0; }).map(permLabel).join(', ') : L('none'))+'</span></div>';
  }).join('');
  inf.hidden = false;
  inf.innerHTML = '<div><h4>'+esc(L('n_h'))+'</h4><p>'+esc(L('n_p'))+'</p>'+roles+'</div>'+
    '<div class="kvt-stat"><div class="kvt-stat-v">'+active+'</div><div class="kvt-stat-l">'+esc(L('n_active'))+'</div></div>'+
    '<div class="kvt-stat"><div class="kvt-stat-v alt">'+Math.max(0, d.seats.free)+'</div><div class="kvt-stat-l">'+esc(L('n_free'))+'</div></div>';
}

/* ⋮ menüsü */
function closeMenus(){
  document.querySelectorAll('.kvt-menu').forEach(function(m){ m.remove(); });
  document.querySelectorAll('.kvt-dot[aria-expanded="true"]').forEach(function(b){ b.setAttribute('aria-expanded', 'false'); });
}
function openMenu(btn){
  var was = btn.getAttribute('aria-expanded') === 'true';
  closeMenus(); if(was) return;
  var m = findMember(Number(btn.getAttribute('data-id'))); if(!m) return;
  var id = Number(m.id), items = [];
  items.push(['edit', IC.edit, L('m_edit'), '']);
  if(m.status === 'invited') items.push(['resend', IC.mail, L('m_resend'), '']);
  if(m.status === 'active') items.push(['disable', IC.pause, L('m_disable'), '']);
  if(m.status === 'disabled') items.push(['enable', IC.play, L('m_enable'), '']);
  items.push(['remove', IC.trash, L('m_remove'), 'danger']);
  var menu = document.createElement('div'); menu.className = 'tm-menu open kvt-menu'; menu.setAttribute('role', 'menu');
  menu.innerHTML = items.map(function(i, n){ return (i[3] === 'danger' ? '<div class="div"></div>' : '')+'<button type="button" role="menuitem" class="'+i[3]+'" data-act="'+i[0]+'" data-id="'+id+'">'+i[1]+esc(i[2])+'</button>'; }).join('');
  btn.parentNode.appendChild(menu);
  btn.setAttribute('aria-expanded', 'true');
  var r = menu.getBoundingClientRect();
  if(r.bottom > window.innerHeight - 8 && btn.getBoundingClientRect().top > r.height + 16) menu.classList.add('up');
  var first = menu.querySelector('button'); if(first) first.focus();
  menu.addEventListener('keydown', function(e){
    var bs = Array.prototype.slice.call(menu.querySelectorAll('button')), i = bs.indexOf(document.activeElement);
    if(e.key === 'ArrowDown'){ e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); bs[(i - 1 + bs.length) % bs.length].focus(); }
    else if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); closeMenus(); btn.focus(); }
  });
}
document.addEventListener('click', function(e){ if(!e.target.closest || (!e.target.closest('.kvt-menu') && !e.target.closest('.kvt-dot'))) closeMenus(); });

/* iyimser (optimistic) işlem: ekranı hemen güncelle, sunucu reddederse geri al ve nedenini göster */
function mutate(id, apply, request, done){
  var snap = JSON.stringify(S.data);
  S.busy[id] = true;
  apply(); renderTeam();
  request().then(function(r){
    delete S.busy[id];
    if(r.ok){
      if(r.data && r.data.member){ var i = S.data.members.map(function(m){ return m.id; }).indexOf(id); if(i >= 0) S.data.members[i] = r.data.member; }
      if(r.data && r.data.seats) S.data.seats = r.data.seats;
      renderTeam(); if(done) done(r);
    } else {
      S.data = JSON.parse(snap); renderTeam();
      alertBox('destructive', L('x_title'), errText(r));
      if(isStale(r)) loadTeam();
      if(r.status === 403 && !(r.data && (r.data.error === 'above_level' || r.data.error === 'self' || r.data.error === 'cannot_grant'))) refreshMe();
    }
  });
}
function doDisable(id){
  var m = findMember(id); if(!m) return;
  var name = m.name || m.email;
  confirmDlg({title: L('cf_dis_t', {name: name}), text: L('cf_dis_d'), ok: L('m_disable'), danger: true}, function(){
    mutate(id, function(){ findMember(id).status = 'disabled'; }, function(){ return API('POST', '/kv/team/'+id+'/disable'); }, function(){ say(L('t_disabled', {name: name})); });
  });
}
function doEnable(id){
  var m = findMember(id); if(!m) return; var name = m.name || m.email;
  mutate(id, function(){ findMember(id).status = 'active'; }, function(){ return API('POST', '/kv/team/'+id+'/enable'); }, function(){ say(L('t_enabled', {name: name})); });
}
function doRemove(id){
  var m = findMember(id); if(!m) return; var name = m.name || m.email;
  confirmDlg({title: L('cf_rem_t', {name: name}), text: L(m.status === 'invited' ? 'cf_rem_i' : 'cf_rem_a'), ok: L('m_remove'), danger: true}, function(){
    var snap = JSON.stringify(S.data);
    S.data.members = S.data.members.filter(function(x){ return x.id !== id; });
    S.data.seats.used = Math.max(1, S.data.seats.used - 1); S.data.seats.free = S.data.seats.max - S.data.seats.used;
    renderTeam();
    API('DELETE', '/kv/team/'+id).then(function(r){
      if(r.ok){ if(r.data && r.data.seats){ S.data.seats = r.data.seats; renderTeam(); } say(L('t_removed', {name: name})); }
      else { S.data = JSON.parse(snap); renderTeam(); alertBox('destructive', L('x_title'), errText(r)); if(isStale(r)) loadTeam(); }
    });
  });
}
function doResend(id, btn){
  var m = findMember(id); if(!m || S.busy[id]) return; var name = m.name || m.email;
  S.busy[id] = true; renderTeam();
  API('POST', '/kv/team/'+id+'/resend').then(function(r){
    delete S.busy[id];
    if(r.ok){
      var i = S.data.members.map(function(x){ return x.id; }).indexOf(id); if(i >= 0 && r.data.member) S.data.members[i] = r.data.member;
      renderTeam();
      if(r.data.mail_sent === false) alertBox('warning', L('x_title'), L('i_mailfail')); else say(L('t_resent', {name: name}));
    } else { renderTeam(); alertBox('destructive', L('x_title'), errText(r)); if(isStale(r)) loadTeam(); }
  });
}

/* izin ızgarası + rol seçimi (davet ve düzenleme pencereleri) */
function permGroups(){
  var order = ['work', 'company', 'admin'], cat = (S.data && S.data.perms) || [];
  return order.map(function(g){ return {key: g, items: cat.filter(function(p){ return p.group === g; })}; }).filter(function(g){ return g.items.length; });
}
function permGridHtml(checked){
  var grantable = S.data.viewer.grantable;
  return permGroups().map(function(g){
    return '<div class="kvt-grp">'+esc(L('g_' + g.key))+'</div>'+g.items.map(function(p){
      var ok = grantable.indexOf(p.key) >= 0, on = checked.indexOf(p.key) >= 0;
      var why = ok ? '' : L(p.owner_only && !S.data.viewer.is_owner ? 'e_locked_owner' : 'e_locked_you');
      return '<label class="tm-perm-item kvt-perm'+(on ? ' checked' : '')+(ok ? '' : ' locked')+'"'+(why ? ' title="'+esc(why)+'"' : '')+'>'+
        '<input type="checkbox" class="kvt-cb" value="'+esc(p.key)+'"'+(on ? ' checked' : '')+(ok ? '' : ' disabled')+'>'+
        '<i class="cx">'+IC.check+'</i>'+
        '<div class="kvt-perm-t"><b>'+esc(permLabel(p.key))+(ok ? '' : ' <span class="kvt-lk">'+IC.lock+'</span>')+'</b><span>'+esc(L('pd_' + p.key))+'</span></div></label>';
    }).join('');
  }).join('');
}
function checkedPerms(box){ return PERM_ORDER.filter(function(p){ var i = box.querySelector('.kvt-cb[value="'+p+'"]'); return i && i.checked && !i.disabled; }); }
function setChecked(box, perms){
  box.querySelectorAll('.kvt-cb').forEach(function(i){ var on = perms.indexOf(i.value) >= 0 && !i.disabled; i.checked = on; i.closest('.kvt-perm').classList.toggle('checked', on); });
}
function roleDefaults(key){ var r = S.data.roles.filter(function(x){ return x.key === key; })[0]; return r ? r.perms : []; }
function presetFor(key){ return inter(roleDefaults(key), S.data.viewer.grantable); }   // what the viewer is allowed to give with this role
function bindPerms(box, onChange){
  box.addEventListener('change', function(e){
    var i = e.target.closest && e.target.closest('.kvt-cb'); if(!i) return;
    i.closest('.kvt-perm').classList.toggle('checked', i.checked);
    onChange();
  });
}

/* davet penceresi */
function openInvite(){
  if(!S.data){ loadTeam(); return; }
  if(S.data.seats.free <= 0) return;
  var D = S.data, role = 'sales';
  var cards = D.roles.map(function(r){
    var list = PERM_ORDER.filter(function(p){ return r.perms.indexOf(p) >= 0; }).map(permLabel).join(', ');
    return '<button type="button" class="rc'+(r.key === role ? ' on' : '')+'" data-role="'+esc(r.key)+'" aria-pressed="'+(r.key === role)+'"><b>'+esc(roleLabel(r.key))+'</b><span>'+esc(list || L('none'))+'</span></button>';
  }).join('');
  var box = openModal('<div class="mh"><h3>'+esc(L('i_h'))+'</h3><p>'+esc(L('i_sub'))+'</p><button class="mx" type="button" data-close aria-label="'+esc(L('close'))+'">×</button></div>'+
    '<div class="mb"><form id="kvtInvForm" novalidate autocomplete="off">'+
    '<div class="fld"><label for="kvtInvName">'+esc(L('i_name'))+'</label><input id="kvtInvName" type="text" maxlength="120" placeholder="'+esc(L('i_ph_name'))+'" data-autofocus></div>'+
    '<div class="fld"><label for="kvtInvEmail">'+esc(L('i_email'))+'</label><input id="kvtInvEmail" type="email" maxlength="254" dir="ltr" placeholder="'+esc(L('i_ph_email'))+'"></div>'+
    '<div class="fld"><label>'+esc(L('i_role'))+'</label><div class="tm-role-choice kvt-roles" id="kvtRoles">'+cards+'</div></div>'+
    '<details class="kvt-details" id="kvtCustom"><summary>'+esc(L('i_custom'))+'</summary><p class="kvt-hint">'+esc(L('i_custom_hint'))+'</p><div class="tm-perm-grid kvt-grid" id="kvtGrid">'+permGridHtml(presetFor(role))+'</div></details>'+
    '<div class="kvt-trim" id="kvtTrim" hidden>'+esc(L('trimmed'))+'</div>'+
    '<div class="kvt-note">'+IC.info+'<span>'+esc(L('i_note', {h: D.link_hours, n: D.seats.used + 1, max: D.seats.max}))+'</span></div>'+
    '<div class="kvt-err" id="kvtErr" role="alert" hidden></div></form></div>'+
    '<div class="mf"><button class="btn sec" type="button" data-close>'+esc(L('cancel'))+'</button><button class="btn" type="button" id="kvtSend">'+esc(L('i_send'))+'</button></div>');
  var grid = $('kvtGrid');
  function syncTrim(){ var t = $('kvtTrim'); if(t) t.hidden = sameSet(presetFor(role), roleDefaults(role)); }
  syncTrim();
  $('kvtRoles').addEventListener('click', function(e){
    var c = e.target.closest('.rc'); if(!c) return;
    role = c.getAttribute('data-role');
    box.querySelectorAll('#kvtRoles .rc').forEach(function(x){ var on = x === c; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    setChecked(grid, presetFor(role)); syncTrim();
  });
  bindPerms(grid, function(){ $('kvtTrim').hidden = true; });
  function showErr(text){ var e = $('kvtErr'); e.textContent = text; e.hidden = !text; }
  function send(){
    var name = $('kvtInvName').value.trim(), email = $('kvtInvEmail').value.trim();
    if(name.length < 2){ showErr(L('x_v_name')); $('kvtInvName').focus(); return; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showErr(L('x_v_email')); $('kvtInvEmail').focus(); return; }
    showErr('');
    var body = {name: name, email: email, role: role}, perms = checkedPerms(grid);
    if(!sameSet(perms, roleDefaults(role))) body.perms = perms;           // only when it differs from what the role gives anyway
    var b = $('kvtSend'); b.disabled = true; b.textContent = L('sending');
    API('POST', '/kv/team/invite', body).then(function(r){
      if(r.ok){
        closeModal();
        S.data.members.push(r.data.member); S.data.seats = r.data.seats; renderTeam();
        if(r.data.mail_sent === false) alertBox('warning', L('x_title'), L('i_mailfail')); else say(L('t_invited', {name: name}));
      } else {
        b.disabled = false; b.textContent = L('i_send');
        showErr(errText(r));
        if(r.data && r.data.error === 'seats_full') loadTeam();
      }
    });
  }
  $('kvtSend').addEventListener('click', send);
  $('kvtInvForm').addEventListener('submit', function(e){ e.preventDefault(); send(); });
}

/* düzenleme penceresi: rol (açılır liste) + izinler */
function openEdit(id){
  var m = findMember(id); if(!m || !m.manageable) return;
  var D = S.data, name = m.name || m.email;
  var opts = D.roles.map(function(r){ return '<option value="'+esc(r.key)+'"'+(r.key === m.role ? ' selected' : '')+'>'+esc(roleLabel(r.key))+'</option>'; }).join('');
  var box = openModal('<div class="mh"><h3>'+esc(L('e_h'))+'</h3><p>'+esc(L('e_sub', {name: name}))+'</p><button class="mx" type="button" data-close aria-label="'+esc(L('close'))+'">×</button></div>'+
    '<div class="mb"><div class="tm-user-preview">'+avatar(name, m.email)+'<div style="flex:1;min-width:0"><b><bdi>'+esc(name)+'</bdi></b><span><bdi>'+esc(m.email)+'</bdi></span></div></div>'+
    '<div class="fld"><label for="kvtRole">'+esc(L('e_role'))+'</label><select id="kvtRole">'+opts+'</select><p class="kvt-hint">'+esc(L('e_hint'))+'</p></div>'+
    '<div class="fld"><label>'+esc(L('e_perms'))+' <span class="kvt-custom-tag" id="kvtCustomTag" hidden>'+esc(L('e_custom'))+'</span></label><div class="tm-perm-grid kvt-grid" id="kvtGrid">'+permGridHtml(m.perms)+'</div></div>'+
    '<div class="kvt-trim" id="kvtTrim" hidden>'+esc(L('trimmed'))+'</div>'+
    '</div><div class="mf"><button class="btn sec" type="button" data-close>'+esc(L('cancel'))+'</button><button class="btn" type="button" id="kvtSave" disabled>'+esc(L('save'))+'</button></div>');
  var sel = $('kvtRole'), grid = $('kvtGrid');
  function state(){
    var role = sel.value, perms = checkedPerms(grid);
    var changed = role !== m.role || !sameSet(perms, m.perms);
    $('kvtSave').disabled = !changed;
    $('kvtCustomTag').hidden = sameSet(perms, roleDefaults(role));
  }
  state();
  sel.addEventListener('change', function(){
    setChecked(grid, presetFor(sel.value));
    $('kvtTrim').hidden = sameSet(presetFor(sel.value), roleDefaults(sel.value));
    state();
  });
  bindPerms(grid, function(){ $('kvtTrim').hidden = true; state(); });
  $('kvtSave').addEventListener('click', function(){
    var role = sel.value, perms = checkedPerms(grid);
    closeModal();
    mutate(id, function(){ var x = findMember(id); x.role = role; x.perms = perms; x.custom = !sameSet(perms, roleDefaults(role)); },
      function(){ return API('PATCH', '/kv/team/'+id, {role: role, perms: perms}); },
      function(){ say(L('t_updated', {name: name})); });
  });
}

/* tıklamalar (olay delegasyonu) */
document.addEventListener('click', function(e){
  var t = e.target.closest && e.target.closest('#dp-team [data-act], #kvtInviteBtn'); if(!t) return;
  if(t.id === 'kvtInviteBtn'){ openInvite(); return; }
  var act = t.getAttribute('data-act'), id = Number(t.getAttribute('data-id'));
  if(act === 'menu'){ openMenu(t); return; }
  if(act === 'reload'){ S.data = null; loadTeam(); return; }
  closeMenus();
  if(act === 'edit') openEdit(id);
  else if(act === 'resend') doResend(id, t);
  else if(act === 'disable') doDisable(id);
  else if(act === 'enable') doEnable(id);
  else if(act === 'remove') doRemove(id);
});
window.openInviteModal = openInvite;                       // prototip adı
window.closeTmModal = closeModal;

/* ═══════════════════════════ aktivite sekmesi ═══════════════════════════ */
var AC_CATS = ['team', 'profile', 'docs', 'sec', 'credits', 'msgs', 'other'];
function catOf(a){
  if(/^team\./.test(a)) return 'team';
  if(a === 'profile.update') return 'profile';
  if(a === 'doc.upload') return 'docs';
  if(a === 'auth.login' || a === 'consent.change') return 'sec';
  if(/^credits\.|^person\.reveal$|^firm\.reveal$/.test(a)) return 'credits';
  if(/^message\./.test(a)) return 'msgs';
  return 'other';
}
var AC_ICON = {team:IC.team, profile:IC.prof, docs:IC.doc, sec:IC.login, credits:IC.coin, msgs:IC.msg, other:IC.dot};
function loadActivity(){
  if(!can('team') || S.acLoading) return;
  S.acLoading = true;
  if(!S.ac){ S.acErr = false; renderActivity(); }
  API('GET', '/kv/activity').then(function(r){
    S.acLoading = false;
    if(r.ok){ S.ac = r.data; S.acErr = false; } else { S.acErr = true; if(r.status === 403) refreshMe(); }
    renderActivity();
  });
}
function whoOf(it){ return it.support ? L('a_support') : (it.you ? L('a_you') : (it.by || L('a_someone'))); }
function eventLine(it){
  var a = it.action, m = it.meta || {}, key = 'ev_' + a.replace(/\./g, '_'), title, detail = '';
  if(!(X.en[key] != null)){ title = a; }
  else { title = L(key); }
  var list = function(arr, fn){ return (arr || []).map(fn).join(', '); };
  if(a === 'team.invite') detail = [m.name, m.role ? roleLabel(m.role) : ''].filter(Boolean).join(' · ');
  else if(a === 'team.update') detail = [m.name, m.role ? L('dt_role', {role: roleLabel(m.role)}) : '', (m.perms && m.perms.length) ? L('dt_perms', {list: list(PERM_ORDER.filter(function(p){ return m.perms.indexOf(p) >= 0; }), permLabel)}) : (m.perms ? L('none') : '')].filter(Boolean).join(' · ');
  else if(/^team\./.test(a)) detail = m.name || '';
  else if(a === 'consent.change'){ var ct = 'ct_' + m.type; detail = (X.en[ct] != null ? L(ct) : esc2(m.type)) + ': ' + L(m.granted ? 'on' : 'off'); }
  else if(a === 'profile.update'){ detail = (m.fields && m.fields.length) ? L('dt_fields', {list: list(m.fields, function(f){ return X.en['pf_' + f] != null ? L('pf_' + f) : String(f); })}) : ''; }
  else if(a === 'doc.upload') detail = m.count ? L('dt_files', {n: m.count}) : '';
  else if(a === 'credits.purchase' || a === 'credits.grant') detail = (m.credits || m.amount) ? L('dt_credits', {n: m.credits || m.amount}) : '';
  return {title: title, detail: detail};
}
function esc2(s){ return String(s == null ? '' : s); }
function renderActivity(){
  var st = $('kvtAcState'), list = $('acList'), chips = $('kvtAcFilters'); if(!st || !list) return;
  var d = S.ac;
  if(!d){
    chips.innerHTML = ''; list.hidden = true; st.hidden = false;
    st.innerHTML = S.acErr ? '<div class="kvt-errbox"><span>'+esc(L('a_load'))+'</span><button class="btn sec sm" type="button" data-act="ac-reload">'+esc(L('retry'))+'</button></div>' : '<span>'+esc(L('loading'))+'</span>';
    return;
  }
  var items = d.items || [], counts = {}; items.forEach(function(i){ var c = catOf(i.action); counts[c] = (counts[c] || 0) + 1; });
  var show = AC_CATS.filter(function(c){ return counts[c]; });
  if(S.filter !== 'all' && !counts[S.filter]) S.filter = 'all';
  chips.innerHTML = items.length ? ['all'].concat(show).map(function(c){
    var n = c === 'all' ? items.length : counts[c], on = S.filter === c;
    return '<button type="button" class="ac-fx'+(on ? ' active' : '')+'" role="tab" aria-selected="'+on+'" data-ac="'+c+'">'+esc(L('f_' + c))+' <i>'+n+'</i></button>';
  }).join('') : '';
  if(!items.length){
    list.hidden = true; st.hidden = false;
    st.innerHTML = '<div class="kvt-empty-ic">'+IC.dot+'</div><p>'+esc(L('a_empty'))+'</p>';
    return;
  }
  var rows = items.filter(function(i){ return S.filter === 'all' || catOf(i.action) === S.filter; });
  st.hidden = true; list.hidden = false;
  var now = new Date(), yest = new Date(now.getTime() - 864e5), html = '', day = '';
  rows.forEach(function(it){
    var dt = toDate(it.at), label = '';
    if(dt){ label = sameDay(dt, now) ? L('d_today') : (sameDay(dt, yest) ? L('d_yesterday') : fmtDate(it.at)); }
    if(label !== day){ if(day !== '') html += '</div>'; html += '<div class="ac-day"><div class="ac-day-hd">'+esc(label)+'</div>'; day = label; }
    var ev = eventLine(it), c = catOf(it.action);
    html += '<div class="ac-i '+c+'"><div class="ac-ic">'+AC_ICON[c]+'</div><div class="ac-body"><b>'+esc(ev.title)+'</b><p>'+esc(L('a_by', {by: whoOf(it)}) + (ev.detail ? ' · ' + ev.detail : ''))+'</p></div><span class="ac-tm">'+esc(dt ? fmtTime(dt) : '')+'</span></div>';
  });
  if(day !== '') html += '</div>';
  if(!rows.length) html = '<div class="kvt-state">'+esc(L('a_empty_f'))+'</div>';
  html += '<p class="kvt-limit">'+esc(L('a_limit', {n: d.limit || items.length}))+'</p>';
  list.innerHTML = html;
}
document.addEventListener('click', function(e){
  var c = e.target.closest && e.target.closest('#kvtAcFilters [data-ac]');
  if(c){ S.filter = c.getAttribute('data-ac'); renderActivity(); return; }
  if(e.target.closest && e.target.closest('[data-act="ac-reload"]')){ S.ac = null; loadActivity(); }
});
window.renderActivity = function(){};                      // prototipin sahte akışı kapalı; kv:panel olayı gerçek kaydı yükler
window.acFilter = function(){};

/* ═══════════════════════════ olaylar ═══════════════════════════ */
document.addEventListener('kv:panel', function(e){
  var n = e.detail && e.detail.name;
  if(n === 'team') loadTeam(); else if(n === 'activity') loadActivity();
});
// capture: our sync runs BEFORE the other features' kv:member listeners (all are registered on document)
document.addEventListener('kv:member', function(e){
  var u = e.detail && e.detail.user;
  if(window.KV_USER && u && u.email === window.KV_USER.email){ window.KV_USER.perms = u.perms; window.KV_USER.role = u.role; window.KV_USER.company = u.company; }
}, true);
document.addEventListener('kv:member', function(){
  var who = me() ? me().email : null;
  if(S.forEmail !== who){ S.forEmail = who; S.data = null; S.ac = null; S.filter = 'all'; S.busy = {}; renderTeam(); renderActivity(); }     // another person signed in on this page
  applyGate();
  if(!can('team')){ S.data = null; S.ac = null; }
  else { if(panelOpen('team')) loadTeam(); if(panelOpen('activity')) loadActivity(); }
});
var _setLang = window.setLang;
if(typeof _setLang === 'function'){
  window.setLang = function(l){
    var r = _setLang.apply(this, arguments);
    try{ applyStaticI18n(); applyGate(); if(S.data) renderTeam(); renderActivity(); closeMenus(); closeModal(); if(NO_ACCESS_OPEN && $('dp-noaccess') && $('dp-noaccess').classList.contains('on')) showNoAccess(NO_ACCESS_OPEN); }catch(err){}
    return r;
  };
}
applyStaticI18n();
applyGate();                                               // right at load, from the permissions the server put into the page
renderTeam(); renderActivity();
})();
