/* Kervea panel · Analiz
   kervea-api.js yüklendikten sonra çalışır. Kullanılabilir olanlar:
     KV_API(method, url, body) -> Promise<{ok,status,data}>   (CSRF + oturum dahil)
     window.KV_USER, window.KV_ME (ilk /kv/me yanıtı geldikten sonra), kvShowAlert(variant, title, text), escapeHtml()
     document 'kv:member' olayı (detail = /kv/me yanıtı) ve 'kv:panel' olayı (detail.name = açılan sekme)
   Bu dosya yalnızca "Analiz" özelliğine aittir.

   Sayılar yalnızca GET /kv/analytics yanıtından gelir (sunucu, işlem yapan firmayı oturumdan çözer; tarayıcı firma seçemez).
   Hiçbir yerde örnek / uydurma sayı yoktur: veri yoksa "Henüz veri yok" gösterilir. Dış kütüphane yok (CSP: yalnızca kendi dosyalarımız):
   grafik, elle çizilen duyarlı bir SVG'dir. Kullanıcı kaynaklı her metin textContent ile yazılır (innerHTML yok). */
(function(){
'use strict';

// ───────────────────────── çeviriler (tr kaynak; eksik anahtar önce İngilizceye düşer, ham anahtar asla görünmez) ─────────────────────────
var X={
 tr:{
  an_h:'Analiz', an_sub:'Firma sayfanızın ağda ne kadar görüldüğü. Yalnızca platformun gerçekten ölçtüğü veriler gösterilir.',
  an_range_lbl:'Zaman aralığı', an_r7:'7 gün', an_r30:'30 gün', an_r90:'90 gün', an_r365:'1 yıl',
  an_loading:'Analiz verileri yükleniyor…', an_err:'Analiz verileri yüklenemedi.', an_retry:'Yeniden dene',
  an_noperm:'Analiz sayfasını görüntüleme yetkiniz yok. Firma yöneticinizden “Analiz” yetkisi isteyin.',
  an_since:'Ölçüm {d} tarihinde başladı; bu tarihten önceki günler için veri yoktur.',
  an_empty_h:'Henüz veri yok',
  an_empty_p:'Firma sayfanız ziyaret edildikçe ve aramalarda göründükçe sayılar burada oluşur. Profilinizi tamamlamak (açıklama, ürünler, HS kodları, logo) bulunma şansınızı artırır.',
  an_empty_cta:'Profili tamamla',
  an_k_views:'Profil görüntülenme', an_k_unique:'Tekil ziyaretçi', an_k_imp:'Aramada gösterilme', an_k_reveal:'İletişim bilgisi açılması', an_k_msgs:'Gelen mesaj', an_k_reply:'Ort. ilk yanıt süresi',
  an_s_views:'firma sayfanızın açılması', an_s_unique:'farklı ziyaretçi', an_s_imp:'kartınızın arama sonuçlarında görünmesi', an_s_reveal:'Kişi bilgisi açılması: {n}', an_s_msgs:'Başlatılan konuşma: {n}', an_s_reply:'{n} yanıta göre',
  an_nodata:'Henüz veri yok', an_nodata_reply:'Bir ilk mesajı yanıtladığınızda ölçülür',
  an_d_vs:'önceki {n} güne göre', an_d_nocmp:'Önceki dönemle karşılaştırma için yeterli ölçüm yok', an_d_prevzero:'önceki dönemde 0 idi', an_d_same:'önceki dönemle aynı', an_d_prev:'Önceki dönem: {v}',
  an_ch_h:'Zaman içinde', an_ch_views:'Profil görüntülenme', an_ch_imp:'Aramada gösterilme', an_ch_weekly:'Her çubuk bir haftanın toplamı', an_ch_days:'Her çubuk {n} günün toplamı',
  an_ch_empty:'Bu dönemde kayıt yok', an_tbl_show:'Tablo olarak göster', an_tbl_hide:'Grafiği göster', an_col_period:'Dönem', an_ch_aria:'{s}: toplam {n}, {a} – {b}',
  an_c_h:'Ziyaretçi ülkeleri', an_c_unknown:'Ülke bilinmiyor', an_c_empty:'Ülke bilgisi olan ziyaret yok.',
  an_src_h:'Sayfanıza nereden geldiler', an_src_search:'Arama listesi', an_src_match:'Eşleşmeler (üye paneli)', an_src_detail:'Doğrudan bağlantı', an_src_empty:'Bu dönemde ziyaret yok.',
  an_v_h:'Son ziyaretler', an_v_member:'Üye firma', an_v_guest:'Ziyaretçi', an_v_masked:'Üye firma (başka sektör)', an_v_empty:'Bu dönemde ziyaret yok.',
  an_v_locked_h:'Ziyaret eden firmaları Premium ile görün',
  an_v_locked_p:'Ücretsiz üyelikte her ziyaretin sayısı, ülkesi ve zamanı görünür. Hangi firmanın baktığı Premium üyelere açılır.',
  an_v_cta:'Premium’a geç',
  an_hs_h:'HS kodlarınıza yönelik aramalar', an_hs_sub:'Aramaya yazılan HS kodu sizinkiyle aynı rakamlarla başlıyorsa sayılır (2, 4 ve 6 hane).',
  an_hs_n:'{n} arama', an_hs_nocodes:'Profilinize HS kodu eklediğinizde, bu kodlarla yapılan aramalar burada görünür.', an_hs_cta:'HS kodu ekle',
  an_hs_zero:'Bu dönemde HS kodlarınızla eşleşen arama yapılmadı.', an_hs_sector:'Sektörünüzde bu dönemde {n} arama yapıldı.',
  an_re_h:'Potansiyel erişim', an_re_p:'Sektörünüzde sizi tamamlayan {n} onaylı firma var; {m} ülkede.', an_re_sub:'Aynı sektörde toplam {k} diğer onaylı firma',
  an_re_zero:'Şu an sizi tamamlayan onaylı firma yok.', an_re_none:'Firma sektörünüz tanımlı olmadığı için hesaplanamadı.',
  an_b_h:'Sektör karşılaştırması', an_b_sub:'Aynı sektördeki diğer {n} onaylı firmanın ortalamasıyla', an_b_you:'Sizin firmanız', an_b_avg:'Sektör ortalaması',
  an_b_none:'Karşılaştırma, aynı sektörde en az {n} diğer onaylı firma olduğunda gösterilir; böylece tek bir firmanın verisi ortalamadan okunamaz.', an_b_have:'Şu an: {k}',
  an_u_s:'sn', an_u_m:'dk', an_u_h:'sa', an_u_d:'g',
  an_nocompany:'Analiz, firma başvurunuz onaylandıktan sonra açılır.', an_ov_pending:'Onaydan sonra',
  an_ov_30:'Son 30 gün', an_ov_noperm:'Analiz yetkiniz yok', an_ov_err:'Yüklenemedi'
 },
 en:{
  an_h:'Analytics', an_sub:'How often your company page is seen across the network. Only what the platform actually measures is shown.',
  an_range_lbl:'Time range', an_r7:'7 days', an_r30:'30 days', an_r90:'90 days', an_r365:'1 year',
  an_loading:'Loading analytics…', an_err:'Analytics could not be loaded.', an_retry:'Try again',
  an_noperm:'You do not have permission to view analytics. Ask your company admin for the “Analytics” permission.',
  an_since:'Measuring started on {d}; there is no data for earlier days.',
  an_empty_h:'No data yet',
  an_empty_p:'Numbers appear here as your company page is visited and shown in search results. A complete profile (description, products, HS codes, logo) makes you easier to find.',
  an_empty_cta:'Complete profile',
  an_k_views:'Profile views', an_k_unique:'Unique visitors', an_k_imp:'Search impressions', an_k_reveal:'Contact detail opens', an_k_msgs:'Messages received', an_k_reply:'Avg. first reply time',
  an_s_views:'times your company page was opened', an_s_unique:'different visitors', an_s_imp:'times your card was shown in search results', an_s_reveal:'People details opened: {n}', an_s_msgs:'Conversations started: {n}', an_s_reply:'based on {n} replies',
  an_nodata:'No data yet', an_nodata_reply:'Measured once you reply to a first message',
  an_d_vs:'vs. previous {n} days', an_d_nocmp:'Not enough measurements in the previous period to compare', an_d_prevzero:'was 0 in the previous period', an_d_same:'same as the previous period', an_d_prev:'Previous period: {v}',
  an_ch_h:'Over time', an_ch_views:'Profile views', an_ch_imp:'Search impressions', an_ch_weekly:'Each bar is one week', an_ch_days:'Each bar is {n} days',
  an_ch_empty:'No records in this period', an_tbl_show:'Show as table', an_tbl_hide:'Show chart', an_col_period:'Period', an_ch_aria:'{s}: {n} in total, {a} – {b}',
  an_c_h:'Visitor countries', an_c_unknown:'Country unknown', an_c_empty:'No visits with a known country.',
  an_src_h:'Where they came from', an_src_search:'Search results', an_src_match:'Matches (member panel)', an_src_detail:'Direct link', an_src_empty:'No visits in this period.',
  an_v_h:'Recent visits', an_v_member:'Member company', an_v_guest:'Visitor', an_v_masked:'Member company (other sector)', an_v_empty:'No visits in this period.',
  an_v_locked_h:'See which companies visited with Premium',
  an_v_locked_p:'On the free plan you see the number, country and time of each visit. Which company looked is shown to Premium members.',
  an_v_cta:'Upgrade to Premium',
  an_hs_h:'Searches for your HS codes', an_hs_sub:'A search counts when the HS code typed starts with the same digits as yours (2, 4 and 6 digits).',
  an_hs_n:'{n} searches', an_hs_nocodes:'Add HS codes to your profile and the searches made with those codes will appear here.', an_hs_cta:'Add HS codes',
  an_hs_zero:'No searches matched your HS codes in this period.', an_hs_sector:'{n} searches were made in your sector in this period.',
  an_re_h:'Potential reach', an_re_p:'{n} approved companies in your sector complement you, in {m} countries.', an_re_sub:'{k} other approved companies in the same sector in total',
  an_re_zero:'There are no complementary approved companies right now.', an_re_none:'Could not be calculated because your company has no sector set.',
  an_b_h:'Sector comparison', an_b_sub:'Against the average of the other {n} approved companies in your sector', an_b_you:'Your company', an_b_avg:'Sector average',
  an_b_none:'The comparison is shown once at least {n} other approved companies are in your sector, so no single company can be read from the average.', an_b_have:'Right now: {k}',
  an_u_s:'s', an_u_m:'min', an_u_h:'h', an_u_d:'d',
  an_nocompany:'Analytics opens once your company application is approved.', an_ov_pending:'After approval',
  an_ov_30:'Last 30 days', an_ov_noperm:'No analytics permission', an_ov_err:'Could not be loaded'
 },
 es:{
  an_h:'Análisis', an_sub:'Cuánto se ve la página de su empresa en la red. Solo se muestra lo que la plataforma mide realmente.',
  an_range_lbl:'Intervalo de tiempo', an_r7:'7 días', an_r30:'30 días', an_r90:'90 días', an_r365:'1 año',
  an_loading:'Cargando análisis…', an_err:'No se pudieron cargar los datos.', an_retry:'Reintentar',
  an_noperm:'No tiene permiso para ver el análisis. Pida el permiso “Análisis” al administrador de su empresa.',
  an_since:'La medición comenzó el {d}; no hay datos de días anteriores.',
  an_empty_h:'Aún no hay datos',
  an_empty_p:'Los números aparecerán aquí cuando se visite la página de su empresa y aparezca en las búsquedas. Un perfil completo (descripción, productos, códigos HS, logotipo) facilita que le encuentren.',
  an_empty_cta:'Completar perfil',
  an_k_views:'Visitas al perfil', an_k_unique:'Visitantes únicos', an_k_imp:'Apariciones en búsquedas', an_k_reveal:'Datos de contacto abiertos', an_k_msgs:'Mensajes recibidos', an_k_reply:'Tiempo medio de primera respuesta',
  an_s_views:'veces que se abrió la página de su empresa', an_s_unique:'visitantes distintos', an_s_imp:'veces que su tarjeta apareció en los resultados', an_s_reveal:'Datos de personas abiertos: {n}', an_s_msgs:'Conversaciones iniciadas: {n}', an_s_reply:'según {n} respuestas',
  an_nodata:'Aún no hay datos', an_nodata_reply:'Se mide cuando responde a un primer mensaje',
  an_d_vs:'frente a los {n} días anteriores', an_d_nocmp:'No hay suficientes mediciones del periodo anterior para comparar', an_d_prevzero:'era 0 en el periodo anterior', an_d_same:'igual que el periodo anterior', an_d_prev:'Periodo anterior: {v}',
  an_ch_h:'Evolución', an_ch_views:'Visitas al perfil', an_ch_imp:'Apariciones en búsquedas', an_ch_weekly:'Cada barra es una semana', an_ch_days:'Cada barra son {n} días',
  an_ch_empty:'Sin registros en este periodo', an_tbl_show:'Ver como tabla', an_tbl_hide:'Ver gráfico', an_col_period:'Periodo', an_ch_aria:'{s}: {n} en total, {a} – {b}',
  an_c_h:'Países de los visitantes', an_c_unknown:'País desconocido', an_c_empty:'No hay visitas con país conocido.',
  an_src_h:'De dónde llegaron', an_src_search:'Resultados de búsqueda', an_src_match:'Coincidencias (panel de miembros)', an_src_detail:'Enlace directo', an_src_empty:'No hay visitas en este periodo.',
  an_v_h:'Últimas visitas', an_v_member:'Empresa miembro', an_v_guest:'Visitante', an_v_masked:'Empresa miembro (otro sector)', an_v_empty:'No hay visitas en este periodo.',
  an_v_locked_h:'Vea qué empresas le visitaron con Premium',
  an_v_locked_p:'En el plan gratuito ve el número, el país y la hora de cada visita. Qué empresa miró se muestra a los miembros Premium.',
  an_v_cta:'Pasar a Premium',
  an_hs_h:'Búsquedas de sus códigos HS', an_hs_sub:'Una búsqueda cuenta si el código HS escrito empieza con las mismas cifras que el suyo (2, 4 y 6 dígitos).',
  an_hs_n:'{n} búsquedas', an_hs_nocodes:'Añada códigos HS a su perfil y las búsquedas con esos códigos aparecerán aquí.', an_hs_cta:'Añadir códigos HS',
  an_hs_zero:'Ninguna búsqueda coincidió con sus códigos HS en este periodo.', an_hs_sector:'Se hicieron {n} búsquedas en su sector en este periodo.',
  an_re_h:'Alcance potencial', an_re_p:'{n} empresas aprobadas de su sector le complementan, en {m} países.', an_re_sub:'{k} otras empresas aprobadas del mismo sector en total',
  an_re_zero:'Ahora mismo no hay empresas aprobadas complementarias.', an_re_none:'No se pudo calcular porque su empresa no tiene sector definido.',
  an_b_h:'Comparación con el sector', an_b_sub:'Frente a la media de las otras {n} empresas aprobadas de su sector', an_b_you:'Su empresa', an_b_avg:'Media del sector',
  an_b_none:'La comparación se muestra cuando hay al menos {n} otras empresas aprobadas en su sector, para que no se puedan deducir los datos de una sola empresa a partir de la media.', an_b_have:'Ahora: {k}',
  an_u_s:'s', an_u_m:'min', an_u_h:'h', an_u_d:'d',
  an_nocompany:'El análisis se activa cuando se apruebe la solicitud de su empresa.', an_ov_pending:'Tras la aprobación',
  an_ov_30:'Últimos 30 días', an_ov_noperm:'Sin permiso de análisis', an_ov_err:'No se pudo cargar'
 },
 fr:{
  an_h:'Analyses', an_sub:'Visibilité de la page de votre société sur le réseau. Seules les données réellement mesurées par la plateforme sont affichées.',
  an_range_lbl:'Période', an_r7:'7 jours', an_r30:'30 jours', an_r90:'90 jours', an_r365:'1 an',
  an_loading:'Chargement des analyses…', an_err:'Les données n’ont pas pu être chargées.', an_retry:'Réessayer',
  an_noperm:'Vous n’avez pas l’autorisation de voir les analyses. Demandez l’autorisation « Analyses » à l’administrateur de votre société.',
  an_since:'La mesure a commencé le {d} ; il n’y a pas de données pour les jours précédents.',
  an_empty_h:'Pas encore de données',
  an_empty_p:'Les chiffres apparaîtront ici dès que la page de votre société sera visitée et affichée dans les recherches. Un profil complet (description, produits, codes SH, logo) vous rend plus facile à trouver.',
  an_empty_cta:'Compléter le profil',
  an_k_views:'Vues du profil', an_k_unique:'Visiteurs uniques', an_k_imp:'Apparitions dans les recherches', an_k_reveal:'Coordonnées ouvertes', an_k_msgs:'Messages reçus', an_k_reply:'Délai moyen de première réponse',
  an_s_views:'ouvertures de la page de votre société', an_s_unique:'visiteurs différents', an_s_imp:'fois où votre fiche est apparue dans les résultats', an_s_reveal:'Coordonnées de personnes ouvertes : {n}', an_s_msgs:'Conversations lancées : {n}', an_s_reply:'sur {n} réponses',
  an_nodata:'Pas encore de données', an_nodata_reply:'Mesuré dès que vous répondez à un premier message',
  an_d_vs:'par rapport aux {n} jours précédents', an_d_nocmp:'Pas assez de mesures sur la période précédente pour comparer', an_d_prevzero:'était 0 sur la période précédente', an_d_same:'identique à la période précédente', an_d_prev:'Période précédente : {v}',
  an_ch_h:'Évolution', an_ch_views:'Vues du profil', an_ch_imp:'Apparitions dans les recherches', an_ch_weekly:'Chaque barre représente une semaine', an_ch_days:'Chaque barre représente {n} jours',
  an_ch_empty:'Aucun enregistrement sur cette période', an_tbl_show:'Afficher en tableau', an_tbl_hide:'Afficher le graphique', an_col_period:'Période', an_ch_aria:'{s} : {n} au total, {a} – {b}',
  an_c_h:'Pays des visiteurs', an_c_unknown:'Pays inconnu', an_c_empty:'Aucune visite avec un pays connu.',
  an_src_h:'D’où ils viennent', an_src_search:'Résultats de recherche', an_src_match:'Correspondances (espace membre)', an_src_detail:'Lien direct', an_src_empty:'Aucune visite sur cette période.',
  an_v_h:'Dernières visites', an_v_member:'Société membre', an_v_guest:'Visiteur', an_v_masked:'Société membre (autre secteur)', an_v_empty:'Aucune visite sur cette période.',
  an_v_locked_h:'Voyez quelles sociétés vous ont visité avec Premium',
  an_v_locked_p:'Avec l’offre gratuite, vous voyez le nombre, le pays et l’heure de chaque visite. La société qui a consulté votre page est visible pour les membres Premium.',
  an_v_cta:'Passer à Premium',
  an_hs_h:'Recherches sur vos codes SH', an_hs_sub:'Une recherche est comptée si le code SH saisi commence par les mêmes chiffres que le vôtre (2, 4 et 6 chiffres).',
  an_hs_n:'{n} recherches', an_hs_nocodes:'Ajoutez des codes SH à votre profil : les recherches faites avec ces codes apparaîtront ici.', an_hs_cta:'Ajouter des codes SH',
  an_hs_zero:'Aucune recherche ne correspondait à vos codes SH sur cette période.', an_hs_sector:'{n} recherches ont été faites dans votre secteur sur cette période.',
  an_re_h:'Portée potentielle', an_re_p:'{n} sociétés approuvées de votre secteur vous complètent, dans {m} pays.', an_re_sub:'{k} autres sociétés approuvées du même secteur au total',
  an_re_zero:'Aucune société approuvée complémentaire pour le moment.', an_re_none:'Calcul impossible : votre société n’a pas de secteur défini.',
  an_b_h:'Comparaison sectorielle', an_b_sub:'Par rapport à la moyenne des {n} autres sociétés approuvées de votre secteur', an_b_you:'Votre société', an_b_avg:'Moyenne du secteur',
  an_b_none:'La comparaison s’affiche lorsqu’au moins {n} autres sociétés approuvées sont dans votre secteur, afin qu’on ne puisse pas déduire les données d’une seule société de la moyenne.', an_b_have:'Actuellement : {k}',
  an_u_s:'s', an_u_m:'min', an_u_h:'h', an_u_d:'j',
  an_nocompany:'Les analyses s’ouvrent une fois la demande de votre société approuvée.', an_ov_pending:'Après l’approbation',
  an_ov_30:'30 derniers jours', an_ov_noperm:'Pas d’autorisation d’analyses', an_ov_err:'Chargement impossible'
 },
 ar:{
  an_h:'التحليلات', an_sub:'مدى ظهور صفحة شركتكم في الشبكة. تُعرض فقط البيانات التي تقيسها المنصة فعلاً.',
  an_range_lbl:'الفترة الزمنية', an_r7:'7 أيام', an_r30:'30 يومًا', an_r90:'90 يومًا', an_r365:'سنة',
  an_loading:'جارٍ تحميل التحليلات…', an_err:'تعذّر تحميل البيانات.', an_retry:'إعادة المحاولة',
  an_noperm:'ليست لديكم صلاحية عرض التحليلات. اطلبوا صلاحية «التحليلات» من مدير الشركة.',
  an_since:'بدأ القياس في {d}؛ لا توجد بيانات للأيام السابقة.',
  an_empty_h:'لا توجد بيانات بعد',
  an_empty_p:'ستظهر الأرقام هنا عند زيارة صفحة شركتكم وظهورها في نتائج البحث. الملف الكامل (الوصف والمنتجات ورموز HS والشعار) يسهّل العثور عليكم.',
  an_empty_cta:'أكملوا الملف',
  an_k_views:'مشاهدات الملف', an_k_unique:'زوّار فريدون', an_k_imp:'الظهور في البحث', an_k_reveal:'فتح بيانات الاتصال', an_k_msgs:'الرسائل الواردة', an_k_reply:'متوسط وقت أول رد',
  an_s_views:'مرة فُتحت فيها صفحة شركتكم', an_s_unique:'زائرًا مختلفًا', an_s_imp:'مرة ظهرت فيها بطاقتكم في نتائج البحث', an_s_reveal:'فتح بيانات الأشخاص: {n}', an_s_msgs:'محادثات بدأت: {n}', an_s_reply:'بناءً على {n} ردًا',
  an_nodata:'لا توجد بيانات بعد', an_nodata_reply:'يُقاس عند ردّكم على أول رسالة',
  an_d_vs:'مقارنة بالأيام الـ{n} السابقة', an_d_nocmp:'لا توجد قياسات كافية في الفترة السابقة للمقارنة', an_d_prevzero:'كان 0 في الفترة السابقة', an_d_same:'مثل الفترة السابقة', an_d_prev:'الفترة السابقة: {v}',
  an_ch_h:'عبر الزمن', an_ch_views:'مشاهدات الملف', an_ch_imp:'الظهور في البحث', an_ch_weekly:'كل عمود يمثل أسبوعًا', an_ch_days:'كل عمود يمثل {n} أيام',
  an_ch_empty:'لا سجلات في هذه الفترة', an_tbl_show:'عرض كجدول', an_tbl_hide:'عرض الرسم', an_col_period:'الفترة', an_ch_aria:'{s}: {n} في المجموع، {a} – {b}',
  an_c_h:'بلدان الزوّار', an_c_unknown:'البلد غير معروف', an_c_empty:'لا توجد زيارات ببلد معروف.',
  an_src_h:'من أين وصلوا', an_src_search:'نتائج البحث', an_src_match:'التطابقات (لوحة الأعضاء)', an_src_detail:'رابط مباشر', an_src_empty:'لا زيارات في هذه الفترة.',
  an_v_h:'آخر الزيارات', an_v_member:'شركة عضو', an_v_guest:'زائر', an_v_masked:'شركة عضو (قطاع آخر)', an_v_empty:'لا زيارات في هذه الفترة.',
  an_v_locked_h:'اعرفوا الشركات الزائرة مع Premium',
  an_v_locked_p:'في الخطة المجانية ترون عدد الزيارات وبلد كل زيارة ووقتها. أما اسم الشركة التي اطّلعت فيظهر لأعضاء Premium.',
  an_v_cta:'الترقية إلى Premium',
  an_hs_h:'عمليات البحث عن رموز HS الخاصة بكم', an_hs_sub:'يُحتسب البحث إذا بدأ رمز HS المكتوب بالأرقام نفسها التي يبدأ بها رمزكم (2 و4 و6 أرقام).',
  an_hs_n:'{n} عملية بحث', an_hs_nocodes:'أضيفوا رموز HS إلى ملفكم وستظهر هنا عمليات البحث التي تمت بهذه الرموز.', an_hs_cta:'إضافة رموز HS',
  an_hs_zero:'لم تتطابق أي عملية بحث مع رموز HS الخاصة بكم في هذه الفترة.', an_hs_sector:'أُجريت {n} عملية بحث في قطاعكم خلال هذه الفترة.',
  an_re_h:'الوصول المحتمل', an_re_p:'{n} شركة معتمدة في قطاعكم تكمّلكم، في {m} بلدًا.', an_re_sub:'{k} شركة معتمدة أخرى في القطاع نفسه إجمالًا',
  an_re_zero:'لا توجد حاليًا شركات معتمدة مكمّلة.', an_re_none:'تعذّر الحساب لأن قطاع شركتكم غير محدد.',
  an_b_h:'المقارنة مع القطاع', an_b_sub:'مقابل متوسط الشركات المعتمدة الأخرى في قطاعكم وعددها {n}', an_b_you:'شركتكم', an_b_avg:'متوسط القطاع',
  an_b_none:'تظهر المقارنة عندما يوجد في قطاعكم {n} شركات معتمدة أخرى على الأقل، حتى لا يمكن استنتاج بيانات شركة واحدة من المتوسط.', an_b_have:'حاليًا: {k}',
  an_u_s:'ث', an_u_m:'د', an_u_h:'س', an_u_d:'ي',
  an_nocompany:'تُتاح التحليلات بعد الموافقة على طلب شركتكم.', an_ov_pending:'بعد الموافقة',
  an_ov_30:'آخر 30 يومًا', an_ov_noperm:'لا صلاحية للتحليلات', an_ov_err:'تعذّر التحميل'
 },
 ru:{
  an_h:'Аналитика', an_sub:'Насколько заметна страница вашей компании в сети. Показываются только данные, которые платформа действительно измеряет.',
  an_range_lbl:'Период', an_r7:'7 дней', an_r30:'30 дней', an_r90:'90 дней', an_r365:'1 год',
  an_loading:'Загрузка аналитики…', an_err:'Не удалось загрузить данные.', an_retry:'Повторить',
  an_noperm:'У вас нет права просматривать аналитику. Попросите у администратора компании разрешение «Аналитика».',
  an_since:'Измерения начались {d}; за более ранние дни данных нет.',
  an_empty_h:'Данных пока нет',
  an_empty_p:'Цифры появятся здесь, когда страницу вашей компании посетят и она покажется в результатах поиска. Полный профиль (описание, продукция, коды ТН ВЭД, логотип) повышает шансы быть найденным.',
  an_empty_cta:'Заполнить профиль',
  an_k_views:'Просмотры профиля', an_k_unique:'Уникальные посетители', an_k_imp:'Показы в поиске', an_k_reveal:'Открытия контактов', an_k_msgs:'Входящие сообщения', an_k_reply:'Среднее время первого ответа',
  an_s_views:'раз открывали страницу вашей компании', an_s_unique:'разных посетителей', an_s_imp:'раз ваша карточка показывалась в результатах поиска', an_s_reveal:'Открытий данных людей: {n}', an_s_msgs:'Начато диалогов: {n}', an_s_reply:'по {n} ответам',
  an_nodata:'Данных пока нет', an_nodata_reply:'Измеряется после вашего ответа на первое сообщение',
  an_d_vs:'к предыдущим {n} дням', an_d_nocmp:'За предыдущий период недостаточно измерений для сравнения', an_d_prevzero:'в прошлом периоде было 0', an_d_same:'как в прошлом периоде', an_d_prev:'Прошлый период: {v}',
  an_ch_h:'Динамика', an_ch_views:'Просмотры профиля', an_ch_imp:'Показы в поиске', an_ch_weekly:'Каждый столбец — одна неделя', an_ch_days:'Каждый столбец — {n} дн.',
  an_ch_empty:'Нет записей за этот период', an_tbl_show:'Показать таблицей', an_tbl_hide:'Показать график', an_col_period:'Период', an_ch_aria:'{s}: всего {n}, {a} – {b}',
  an_c_h:'Страны посетителей', an_c_unknown:'Страна неизвестна', an_c_empty:'Нет посещений с известной страной.',
  an_src_h:'Откуда пришли', an_src_search:'Результаты поиска', an_src_match:'Совпадения (кабинет участника)', an_src_detail:'Прямая ссылка', an_src_empty:'За этот период посещений нет.',
  an_v_h:'Последние посещения', an_v_member:'Компания-участник', an_v_guest:'Посетитель', an_v_masked:'Компания-участник (другая отрасль)', an_v_empty:'За этот период посещений нет.',
  an_v_locked_h:'Узнайте, какие компании заходили, с Premium',
  an_v_locked_p:'На бесплатном тарифе видны число, страна и время каждого посещения. Название заходившей компании показывается участникам Premium.',
  an_v_cta:'Перейти на Premium',
  an_hs_h:'Поиски по вашим кодам ТН ВЭД', an_hs_sub:'Поиск засчитывается, если введённый код начинается с тех же цифр, что и ваш (2, 4 и 6 знаков).',
  an_hs_n:'Поисков: {n}', an_hs_nocodes:'Добавьте коды ТН ВЭД в профиль, и поиски по этим кодам появятся здесь.', an_hs_cta:'Добавить коды',
  an_hs_zero:'За этот период не было поисков по вашим кодам.', an_hs_sector:'В вашей отрасли за этот период выполнено поисков: {n}.',
  an_re_h:'Потенциальный охват', an_re_p:'В вашей отрасли {n} одобренных компаний дополняют вас, в {m} странах.', an_re_sub:'Всего других одобренных компаний в отрасли: {k}',
  an_re_zero:'Сейчас нет подходящих одобренных компаний.', an_re_none:'Расчёт невозможен: у вашей компании не указана отрасль.',
  an_b_h:'Сравнение с отраслью', an_b_sub:'Со средним по другим одобренным компаниям вашей отрасли ({n})', an_b_you:'Ваша компания', an_b_avg:'Среднее по отрасли',
  an_b_none:'Сравнение появляется, когда в вашей отрасли есть минимум {n} других одобренных компаний, чтобы по среднему нельзя было узнать данные одной компании.', an_b_have:'Сейчас: {k}',
  an_u_s:'с', an_u_m:'мин', an_u_h:'ч', an_u_d:'дн',
  an_nocompany:'Аналитика откроется после одобрения заявки вашей компании.', an_ov_pending:'После одобрения',
  an_ov_30:'Последние 30 дней', an_ov_noperm:'Нет права на аналитику', an_ov_err:'Не удалось загрузить'
 }
};
function register(){
  if(typeof window.T==='undefined' || !window.T) return;
  Object.keys(X).forEach(function(l){ if(!window.T[l]) window.T[l]={}; Object.assign(window.T[l], X[l]); });   // tt() and data-i18n see them too
}
register();

function lang(){ return window.LANG || 'tr'; }
function L(k, vars){
  var d=X[lang()], s=(d && d[k]) || X.en[k] || X.tr[k] || '';
  return vars ? s.replace(/\{(\w+)\}/g, function(m,n){ return vars[n]!=null ? vars[n] : m; }) : s;
}
var LOCALES={tr:'tr-TR',en:'en-GB',es:'es-ES',fr:'fr-FR',ar:'ar',ru:'ru-RU'};
function loc(){ return typeof window.kvLocale==='function' ? window.kvLocale() : (LOCALES[lang()]||'en-GB'); }
function nf(n, o){ try{ return new Intl.NumberFormat(loc(), o||{}).format(n); }catch(e){ return String(n); } }
function pct(p){ return nf(p/100, {style:'percent', maximumFractionDigits:1}); }
function compact(n){ try{ return new Intl.NumberFormat(loc(), {notation:'compact', maximumFractionDigits:1}).format(n); }catch(e){ return String(n); } }
function ymd(s){ var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(s||''); return m ? new Date(+m[1], +m[2]-1, +m[3]) : null; }
function fdate(dt, o){ if(!dt) return ''; try{ return dt.toLocaleDateString(loc(), o||{day:'numeric',month:'short',year:'numeric'}); }catch(e){ return ''; } }
function fdatetime(iso){
  var dt=iso ? new Date(iso) : null; if(!dt || isNaN(dt.getTime())) return '';
  try{ return dt.toLocaleString(loc(), {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'}); }catch(e){ return ''; }
}
function dur(sec){
  if(sec==null) return '';
  sec=Math.max(0, Math.round(sec));
  var u={s:L('an_u_s'), m:L('an_u_m'), h:L('an_u_h'), d:L('an_u_d')};
  if(sec<60) return nf(sec)+' '+u.s;
  var m=Math.round(sec/60);
  if(m<60) return nf(m)+' '+u.m;
  var h=Math.floor(m/60); m=m%60;
  if(h<24) return nf(h)+' '+u.h+(m?' '+nf(m)+' '+u.m:'');
  var d=Math.floor(h/24); h=h%24;
  return nf(d)+' '+u.d+(h?' '+nf(h)+' '+u.h:'');
}
function countryName(cc){
  var c=(window.CI && (window.CI[lang()] || window.CI.en || window.CI.tr)) || {};
  return c[cc] || String(cc||'').toUpperCase();
}

// ───────────────────────── küçük DOM yardımcıları (hiçbir yerde innerHTML ile veri yazılmaz) ─────────────────────────
function $(id){ return document.getElementById(id); }
function E(tag, cls, text){ var e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; return e; }
function S(tag, attrs){ var e=document.createElementNS('http://www.w3.org/2000/svg', tag); if(attrs) Object.keys(attrs).forEach(function(k){ e.setAttribute(k, attrs[k]); }); return e; }
function icon(path, size){
  var s=S('svg',{width:size||14,height:size||14,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':2,'stroke-linecap':'round','stroke-linejoin':'round','aria-hidden':'true'});
  String(path).split('|').forEach(function(d){ s.appendChild(S('path',{d:d})); });
  return s;
}
var ICO={
  eye:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z|M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75',
  search:'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z|M21 21l-4.35-4.35',
  unlock:'M3 11h18v11H3z|M7 11V7a5 5 0 0 1 9.9-1',
  msg:'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  clock:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M12 6v6l4 2',
  globe:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M2 12h20|M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
  lock:'M5 11h14v10H5z|M8 11V7a4 4 0 0 1 8 0v4',
  info:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z|M12 16v-4|M12 8h.01',
  warn:'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z|M12 9v4|M12 17h.01',
  trend:'M22 12h-4l-3 9L9 3l-3 9H2'
};

// ───────────────────────── durum ─────────────────────────
var S_={range:30, series:'profile_view', data:null, err:null, loading:false, seq:0, at:0, table:false, activeBar:-1, who:null};
var OV={data:null, state:'idle'};            // overview card (last 30 days)

// Numbers belong to the signed-in person's company: when another person signs in, nothing of the previous one may stay on screen.
function who(){ var u=window.KV_USER; return u ? String(u.email||u.name||'1') : ''; }
function sameUser(){
  var w=who();
  if(S_.who!==w){ S_.who=w; S_.data=null; S_.err=null; S_.at=0; S_.loading=false; S_.seq++; OV.data=null; OV.state='idle'; }
}

// The server is the authority (403 below); this only avoids a request that is certain to be refused for a team member without the permission.
function mayView(){ var u=window.KV_USER; return !(u && Array.isArray(u.perms) && u.perms.indexOf('analytics')===-1); }

function api(method, url){ return window.KV_API ? window.KV_API(method, url) : Promise.resolve({ok:false,status:0,data:{}}); }

function load(){
  sameUser();
  if(!mayView()){ S_.seq++; S_.loading=false; S_.data=null; S_.err='perm'; render(); return; }
  var seq=++S_.seq; S_.loading=true; S_.err=null;
  render();
  api('GET','/kv/analytics?range='+S_.range).then(function(r){
    if(seq!==S_.seq) return;
    S_.loading=false;
    if(r.ok && r.data && r.data.totals){ S_.data=r.data; S_.err=null; S_.at=Date.now(); if(S_.range===30) renderOverview(r.data, 'ok'); }
    else { S_.data=null; S_.err = r.status===403 ? (r.data && r.data.error==='no_company' ? 'nocompany' : 'perm') : 'err'; }   // never leave another range's numbers under the new range
    render();
  });
}

// ───────────────────────── sayfa çizimi ─────────────────────────
function setPills(){
  var box=$('anRange'); if(!box) return;
  box.setAttribute('aria-label', L('an_range_lbl'));
  Array.prototype.forEach.call(box.querySelectorAll('button'), function(b){
    var on=(+b.getAttribute('data-range'))===S_.range;
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', on?'true':'false');
    var k='an_r'+b.getAttribute('data-range'); b.textContent=L(k);
  });
}
function applyStatic(){
  var root=$('dp-analytics'); if(!root) return;
  var h=root.querySelector('h2'), s=root.querySelector('.an-head .sub');
  if(h) h.textContent=L('an_h'); if(s) s.textContent=L('an_sub');
  setPills();
}

function box(cls, ico, title, text, actions){
  var b=E('div','an-box'+(cls?' '+cls:'')); b.appendChild(icon(ICO[ico]||ICO.info, 22));
  var d=E('div'); if(title) d.appendChild(E('h4',null,title)); if(text) d.appendChild(E('p',null,text));
  (actions||[]).forEach(function(a){ d.appendChild(a); });
  b.appendChild(d); return b;
}
function btn(label, fn, cls){ var b=E('button', cls||'btn sm', label); b.type='button'; b.addEventListener('click', fn); return b; }
function goProfile(){ if(typeof window.showPanel==='function') window.showPanel('profile'); }
function upgrade(){ if(typeof window.upgradeToPro==='function') window.upgradeToPro(); }

var post=[];                                  // work that needs the nodes to be attached (chart widths)
function render(){
  var host=$('anBody'); if(!host) return;
  sameUser(); applyStatic();
  host.classList.toggle('an-busy', S_.loading && !!S_.data);
  if(S_.loading && S_.data) return;                                   // keep the old numbers (dimmed) while the next range loads
  var f=document.createDocumentFragment(); post=[];
  host.removeAttribute('aria-busy');
  if(S_.err==='perm'){ f.appendChild(box('', 'lock', null, L('an_noperm'))); }
  else if(S_.err==='nocompany'){ f.appendChild(box('', 'info', null, L('an_nocompany'))); }
  else if(!S_.data && S_.err){ f.appendChild(box('err','warn', L('an_err'), null, [btn(L('an_retry'), load)])); }
  else if(!S_.data){
    var sk=E('div','an-kpis'); for(var i=0;i<6;i++) sk.appendChild(E('div','an-sk')); f.appendChild(sk);
    var sk2=E('div','an-sk'); sk2.style.minHeight='260px'; f.appendChild(sk2);
    host.setAttribute('aria-busy','true');
  } else {
    var d=S_.data;
    var since=ymd(d.tracking_since), from=ymd(d.from);
    if(since && from && since>from){
      var n=E('div','an-note'); n.appendChild(icon(ICO.info,14)); n.appendChild(E('span',null,L('an_since',{d:fdate(since)}))); f.appendChild(n);
    }
    if(d.previous && d.previous.available===false){
      var n2=E('div','an-note'); n2.appendChild(icon(ICO.info,14)); n2.appendChild(E('span',null,L('an_d_nocmp'))); f.appendChild(n2);
    }
    var t=d.totals||{};
    var none=!((t.profile_view||{}).n || (t.search_impression||{}).n || (t.contact_reveal||{}).n || (t.msg_received||{}).n || (d.visitors&&d.visitors.items&&d.visitors.items.length));
    if(none) f.appendChild(box('', 'info', L('an_empty_h'), L('an_empty_p'), [btn(L('an_empty_cta'), goProfile)]));
    f.appendChild(kpis(d));
    f.appendChild(chartCard(d));
    var cols=E('div','an-cols'), left=E('div'), right=E('div');
    left.appendChild(countriesCard(d)); right.appendChild(sourcesCard(d)); right.appendChild(reachCard(d));
    cols.appendChild(left); cols.appendChild(right); f.appendChild(cols);
    f.appendChild(visitorsCard(d));
    f.appendChild(hsCard(d));
    f.appendChild(benchCard(d));
  }
  host.replaceChildren(f);
  post.forEach(function(fn){ try{ fn(); }catch(e){} });
}

// ── KPI cards ──
function deltaEl(tot, range){
  if(!tot || tot.delta==null || (tot.n===0 && tot.prev===0)) return null;     // nothing to compare (said once above the cards, not on every card)
  var e=E('div','an-d');
  if(tot.delta===0){ e.textContent='= '+L('an_d_same'); return e; }
  var up=tot.delta>0; e.classList.add(up?'up':'dn');
  var head=(up?'↑ ':'↓ ') + (tot.pct!=null ? pct(Math.abs(tot.pct)) : '+'+nf(Math.abs(tot.delta)));
  e.textContent=head+' · '+(tot.pct!=null ? L('an_d_vs',{n:nf(range)}) : L('an_d_prevzero'));
  return e;
}
function kpi(label, ico, value, delta, sub){
  var c=E('div','an-c'), h=E('h4'); h.appendChild(icon(ICO[ico],14)); h.appendChild(E('span',null,label)); c.appendChild(h);
  var n=E('div','an-n', value==null ? L('an_nodata') : nf(value)); if(value==null) n.classList.add('na'); c.appendChild(n);
  if(delta) c.appendChild(delta);
  if(sub) c.appendChild(E('div','an-s',sub));
  return c;
}
function kpis(d){
  var t=d.totals||{}, g=E('div','an-kpis'), r=d.range, rp=d.replies||{};
  g.appendChild(kpi(L('an_k_views'),'eye', (t.profile_view||{}).n||0, deltaEl(t.profile_view,r), L('an_s_views')));
  g.appendChild(kpi(L('an_k_unique'),'users', d.unique_viewers||0, null, L('an_s_unique')));
  g.appendChild(kpi(L('an_k_imp'),'search', (t.search_impression||{}).n||0, deltaEl(t.search_impression,r), L('an_s_imp')));
  g.appendChild(kpi(L('an_k_reveal'),'unlock', (t.contact_reveal||{}).n||0, deltaEl(t.contact_reveal,r), L('an_s_reveal',{n:nf((t.person_reveal||{}).n||0)})));
  g.appendChild(kpi(L('an_k_msgs'),'msg', (t.msg_received||{}).n||0, deltaEl(t.msg_received,r), L('an_s_msgs',{n:nf((t.conv_started||{}).n||0)})));
  // first reply time: only a real average; "lower is better" colouring against the previous period when that exists
  var avg=rp.avg_seconds, c=E('div','an-c'), h=E('h4'); h.appendChild(icon(ICO.clock,14)); h.appendChild(E('span',null,L('an_k_reply'))); c.appendChild(h);
  var n=E('div','an-n', avg==null ? L('an_nodata') : dur(avg)); if(avg==null) n.classList.add('na'); c.appendChild(n);
  if(avg==null){ c.appendChild(E('div','an-s',L('an_nodata_reply'))); }
  else {
    var dd=E('div','an-d');
    if(rp.prev_avg_seconds!=null){
      var diff=avg-rp.prev_avg_seconds, arrow=diff<0?'↓ ':(diff>0?'↑ ':'= ');
      dd.textContent=arrow+(diff!==0 ? dur(Math.abs(diff))+' · ' : '')+L('an_d_prev',{v:dur(rp.prev_avg_seconds)});
      if(diff<0) dd.classList.add('up'); else if(diff>0) dd.classList.add('dn');             // a shorter reply time is the good direction
    }
    else dd=null;
    if(dd) c.appendChild(dd);
    c.appendChild(E('div','an-s',L('an_s_reply',{n:nf(rp.count||0)})));
  }
  g.appendChild(c);
  return g;
}

// ── chart ──
function niceScale(max){
  if(max<=0) return {top:4, step:1};
  var raw=max/4, pow=Math.pow(10, Math.floor(Math.log(raw)/Math.LN10)), f=raw/pow;
  var step=(f<=1?1:f<=2?2:f<=5?5:10)*pow; step=Math.max(1, step);
  return {top:Math.ceil(max/step)*step, step:step};
}
function bucketize(days, vals, range, plotW){
  var n=days.length, size=range>=365 ? 7 : 1;
  while(Math.ceil(n/size)*4 > plotW && size<28) size++;               // never thinner than 4px per bar
  var out=[];
  for(var end=n; end>0; end-=size){                                   // from the newest day backwards: the newest bar is always complete
    var start=Math.max(0,end-size), sum=0;
    for(var i=start;i<end;i++) sum+=vals[i]||0;
    out.unshift({from:days[start], to:days[end-1], n:sum});
  }
  return {size:size, items:out};
}
function barPath(x,y,w,h,r){
  r=Math.min(r, w/2, h);
  return 'M'+x+','+(y+h)+' V'+(y+r)+' Q'+x+','+y+' '+(x+r)+','+y+' H'+(x+w-r)+' Q'+(x+w)+','+y+' '+(x+w)+','+(y+r)+' V'+(y+h)+' Z';
}
function spanLabel(b){
  var a=ymd(b.from), z=ymd(b.to);
  if(b.from===b.to) return fdate(a);
  return fdate(a,{day:'numeric',month:'short'})+' – '+fdate(z);
}
var chartObs=null;
function chartCard(d){
  if(chartObs){ chartObs.disconnect(); chartObs=null; }              // the previous chart's nodes are gone
  var card=E('div','an-card'), h=E('h3'); h.appendChild(E('span',null,L('an_ch_h'))); card.appendChild(h);
  var tools=E('div','an-chart-tools'), seg=E('div','an-seg'); seg.setAttribute('role','group');
  [['profile_view','an_ch_views'],['search_impression','an_ch_imp']].forEach(function(p){
    var b=E('button',S_.series===p[0]?'on':'',L(p[1])); b.type='button'; b.setAttribute('aria-pressed', S_.series===p[0]?'true':'false');
    b.addEventListener('click', function(){ S_.series=p[0]; S_.activeBar=-1; render(); });
    seg.appendChild(b);
  });
  tools.appendChild(seg);
  var meta=E('div','an-chart-meta'); tools.appendChild(meta);
  var tb=btn(L(S_.table?'an_tbl_hide':'an_tbl_show'), function(){ S_.table=!S_.table; render(); }, 'an-link'); meta.appendChild(tb);
  card.appendChild(tools);

  var vals=(d.series||{})[S_.series]||[], days=(d.series||{}).days||[];
  var total=vals.reduce(function(a,b){ return a+b; }, 0);
  if(S_.table){
    var w=E('div','an-tbl-wrap'), tbl=E('table','an-tbl'), thd=E('thead'), tr=E('tr');
    tr.appendChild(E('th',null,L('an_col_period'))); tr.appendChild(E('th',null,L(S_.series==='profile_view'?'an_ch_views':'an_ch_imp'))); thd.appendChild(tr); tbl.appendChild(thd);
    var tbd=E('tbody'), bk=bucketize(days, vals, d.range, 9999).items.slice().reverse();
    bk.forEach(function(b){ var r=E('tr'); r.appendChild(E('td',null,spanLabel(b))); r.appendChild(E('td',null,nf(b.n))); tbd.appendChild(r); });
    tbl.appendChild(tbd); w.appendChild(tbl); card.appendChild(w); return card;
  }
  var wrap=E('div','an-chart-wrap'); card.appendChild(wrap);
  var live=E('div','an-sr'); live.setAttribute('aria-live','polite'); card.appendChild(live);
  var tip=E('div','an-tip'); tip.hidden=true; wrap.appendChild(tip);
  function draw(){
    var old=wrap.querySelector('svg'); if(old) old.remove();
    var W=Math.max(260, Math.round(wrap.clientWidth||wrap.parentNode.clientWidth||600)), H=W<480?190:230;
    var padL=38, padR=6, padT=10, padB=24, pw=W-padL-padR, ph=H-padT-padB;
    var bk=bucketize(days, vals, d.range, pw), items=bk.items, max=0;
    items.forEach(function(b){ if(b.n>max) max=b.n; });
    var sc=niceScale(max), band=pw/Math.max(1,items.length), bw=Math.max(2, Math.min(24, band-2));
    var svg=S('svg',{viewBox:'0 0 '+W+' '+H, width:W, height:H, role:'img', tabindex:'0', 'aria-label':L('an_ch_aria',{s:L(S_.series==='profile_view'?'an_ch_views':'an_ch_imp'), n:nf(total), a:fdate(ymd(d.from)), b:fdate(ymd(d.to))})});
    for(var v=0; v<=sc.top; v+=sc.step){
      var y=padT+ph-(v/sc.top)*ph;
      svg.appendChild(S('line',{x1:padL,x2:W-padR,y1:y,y2:y,'class':'an-grid-line'}));
      var tx=S('text',{x:padL-6,y:y+4,'text-anchor':'end','class':'an-axis'}); tx.textContent=compact(v); svg.appendChild(tx);
    }
    var bars=[];
    items.forEach(function(b,i){
      var x=padL+i*band+(band-bw)/2, bh=sc.top?Math.round((b.n/sc.top)*ph):0;
      var p=null;
      if(bh>0){ p=S('path',{d:barPath(x, padT+ph-bh, bw, bh, 4), 'class':'an-bar-mark'}); svg.appendChild(p); }
      bars.push(p);
    });
    // x labels: first, middle, last (anchored so they stay inside the plot)
    [[0,'start'],[Math.floor((items.length-1)/2),'middle'],[items.length-1,'end']].forEach(function(q,k){
      if(!items.length || (k===1 && items.length<5)) return;
      var b=items[q[0]], x=padL+q[0]*band+band/2;
      if(k===0) x=Math.max(padL, x-bw/2); if(k===2) x=Math.min(W-padR, x+bw/2);
      var tx=S('text',{x:x,y:H-6,'text-anchor':q[1],'class':'an-axis'}); tx.textContent=fdate(ymd(b.from),{day:'numeric',month:'short'}); svg.appendChild(tx);
    });
    items.forEach(function(b,i){
      var hit=S('rect',{x:padL+i*band,y:padT,width:band,height:ph+padB,'class':'an-hit'});
      hit.addEventListener('pointerenter', function(){ show(i, false); });
      hit.addEventListener('pointermove', function(){ show(i, false); });
      hit.addEventListener('pointerleave', hide);
      svg.appendChild(hit);
    });
    function hide(){ tip.hidden=true; bars.forEach(function(p){ if(p) p.classList.remove('on'); }); }
    function show(i, announce){
      var b=items[i]; if(!b) return;
      bars.forEach(function(p,j){ if(p) p.classList.toggle('on', j===i); });
      while(tip.firstChild) tip.removeChild(tip.firstChild);
      tip.appendChild(E('b',null,nf(b.n))); tip.appendChild(document.createTextNode(spanLabel(b)));
      tip.hidden=false;
      var cx=padL+i*band+band/2, sx=wrap.clientWidth/W, tw=tip.offsetWidth, px=cx*sx;
      px=Math.max(tw/2, Math.min(wrap.clientWidth-tw/2, px));
      var by=padT+ph-(sc.top?(b.n/sc.top)*ph:0);
      tip.style.left=px+'px'; tip.style.top=Math.max(tip.offsetHeight+8, by*(wrap.clientWidth/W))+'px';
      if(announce) live.textContent=spanLabel(b)+': '+nf(b.n);
    }
    svg.addEventListener('keydown', function(e){
      var k=e.key, i=S_.activeBar<0?items.length-1:S_.activeBar;
      if(k==='ArrowLeft') i=Math.max(0,i-1); else if(k==='ArrowRight') i=Math.min(items.length-1,i+1);
      else if(k==='Home') i=0; else if(k==='End') i=items.length-1; else if(k==='Escape'){ hide(); return; } else return;
      e.preventDefault(); S_.activeBar=i; show(i,true);
    });
    svg.addEventListener('blur', hide);
    wrap.appendChild(svg);
    var old2=wrap.querySelector('.an-chart-empty'); if(old2) old2.remove();
    if(!max){ var em=E('div','an-chart-empty'); em.appendChild(E('span',null,L('an_ch_empty'))); wrap.appendChild(em); }
    var note=meta.querySelector('.an-bk'); if(note) note.remove();
    if(bk.size>1){ var nn=E('span','an-bk', bk.size===7?L('an_ch_weekly'):L('an_ch_days',{n:nf(bk.size)})); meta.insertBefore(nn, tb); }
  }
  post.push(function(){
    draw();
    if(typeof ResizeObserver!=='undefined'){
      if(chartObs) chartObs.disconnect();
      var raf=0, lastW=wrap.clientWidth;
      chartObs=new ResizeObserver(function(){ if(!wrap.clientWidth || Math.abs(wrap.clientWidth-lastW)<2) return; lastW=wrap.clientWidth; cancelAnimationFrame(raf); raf=requestAnimationFrame(draw); });
      chartObs.observe(wrap);
    }
  });
  return card;
}

// ── lists with bars ──
function flagEl(cc){
  if(cc && /^[a-z]{2}$/.test(cc)){                                     // codes come from the server; still only [a-z]{2} ever reaches a URL
    var im=E('img'); im.alt=''; im.src='/flags/'+cc+'.svg';
    im.addEventListener('error', function(){ im.style.visibility='hidden'; });
    return im;
  }
  var wrap=E('span','gl'); wrap.appendChild(icon(ICO.globe,14)); return wrap;
}
function barRow(nameNodes, value, max, label){
  var r=E('div','an-lr'), nm=E('div','nm'); [].concat(nameNodes).forEach(function(n){ nm.appendChild(n); }); r.appendChild(nm);
  var bt=E('div','an-bt'), f=E('div'); f.style.width=(max>0?Math.max(2, Math.round(value/max*100)):0)+'%'; bt.appendChild(f); r.appendChild(bt);
  r.appendChild(E('div','v',label!=null?label:nf(value))); return r;
}
function countriesCard(d){
  var card=E('div','an-card'); card.appendChild(E('h3',null,L('an_c_h')));
  var items=(d.countries&&d.countries.items)||[], unk=(d.countries&&d.countries.unknown)||0;
  if(!items.length && !unk){ card.appendChild(E('div','an-empty-inline',L('an_c_empty'))); return card; }
  var max=0; items.forEach(function(i){ max=Math.max(max,i.n); }); max=Math.max(max,unk);
  var list=E('div','an-list');
  items.forEach(function(i){ list.appendChild(barRow([flagEl(i.cc), E('span',null,countryName(i.cc))], i.n, max)); });
  if(unk) list.appendChild(barRow([flagEl(null), E('span',null,L('an_c_unknown'))], unk, max));
  card.appendChild(list); return card;
}
function sourcesCard(d){
  var card=E('div','an-card'); card.appendChild(E('h3',null,L('an_src_h')));
  var s=d.sources||{}, tot=(s.search||0)+(s.match||0)+(s.detail||0);
  if(!tot){ card.appendChild(E('div','an-empty-inline',L('an_src_empty'))); return card; }
  var max=Math.max(s.search||0, s.match||0, s.detail||0), list=E('div','an-list');
  [['search','an_src_search'],['match','an_src_match'],['detail','an_src_detail']].forEach(function(p){
    list.appendChild(barRow([E('span',null,L(p[1]))], s[p[0]]||0, max, nf(s[p[0]]||0)+' · '+pct((s[p[0]]||0)/tot*100)));
  });
  card.appendChild(list); return card;
}
function reachCard(d){
  var card=E('div','an-card an-reach'); card.appendChild(E('h3',null,L('an_re_h')));
  var r=d.reach;
  if(!r){ card.appendChild(E('p',null,L('an_re_none'))); return card; }
  if(!r.companies){ card.appendChild(E('p',null,L('an_re_zero'))); card.appendChild(E('div','an-s',L('an_re_sub',{k:nf(r.sector_companies||0)}))); return card; }
  card.appendChild(E('div','an-n',nf(r.companies)));
  card.appendChild(E('p',null,L('an_re_p',{n:nf(r.companies), m:nf(r.countries||0)})));
  card.appendChild(E('div','an-s',L('an_re_sub',{k:nf(r.sector_companies||0)})));
  return card;
}

// ── visitors ──
var SRC_LBL={search:'an_src_search', match:'an_src_match', detail:'an_src_detail'};
function visitorsCard(d){
  var card=E('div','an-card'), v=d.visitors||{items:[]}; card.appendChild(E('h3',null,L('an_v_h')));
  if(v.locked){
    var lk=E('div','an-lock'); lk.appendChild(icon(ICO.lock,22));
    var tx=E('div'); tx.appendChild(E('b',null,L('an_v_locked_h'))); tx.appendChild(E('span',null,L('an_v_locked_p'))); lk.appendChild(tx);
    lk.appendChild(btn(L('an_v_cta'), upgrade)); card.appendChild(lk);
  }
  if(!v.items.length){ card.appendChild(E('div','an-empty-inline',L('an_v_empty'))); return card; }
  var list=E('div','an-vis');
  v.items.forEach(function(it){
    var row=E('div','an-vr'), who=E('div','who');
    who.appendChild(flagEl(it.cc));
    var label;
    if(it.company){
      label=E('button','an-link',it.company.name); label.type='button';
      label.addEventListener('click', function(){ if(typeof window.openFirm==='function') window.openFirm(it.company.slug); });
    } else label=E('span',null, it.masked ? L('an_v_masked') : (it.kind==='member' ? L('an_v_member') : L('an_v_guest')));
    who.appendChild(label); row.appendChild(who);
    row.appendChild(E('div','when',fdatetime(it.at)));
    var sub=E('div','sub');
    if(it.cc) sub.appendChild(E('span',null,countryName(it.cc)));
    if(SRC_LBL[it.source]) sub.appendChild(E('span','an-chip',L(SRC_LBL[it.source])));
    if(it.company) sub.appendChild(E('span','an-chip pro',L('an_v_member')));
    row.appendChild(sub); list.appendChild(row);
  });
  card.appendChild(list); return card;
}

// ── HS demand ──
function hsCard(d){
  var card=E('div','hs-table'), h=E('h3'); h.appendChild(E('span',null,L('an_hs_h')));
  h.appendChild(E('small',null,L('an_r'+d.range))); card.appendChild(h);
  var hs=d.hs||{items:[]};
  if(!hs.has_codes){
    card.appendChild(E('p','an-hint',L('an_hs_nocodes')));
    card.appendChild(btn(L('an_hs_cta'), goProfile)); return card;
  }
  card.appendChild(E('p','an-hint',L('an_hs_sub')));
  var max=0; hs.items.forEach(function(i){ max=Math.max(max,i.searches); });
  hs.items.forEach(function(i){
    var r=E('div','hs-r'), c=E('span','hs-c',String(i.code).replace(/^(\d{4})(\d{2})(\d*)$/,'$1.$2$3'));
    r.appendChild(c);
    var b=E('div','hs-b'), f=E('div'); f.style.width=(max>0?Math.max(i.searches>0?3:0, Math.round(i.searches/max*100)):0)+'%'; b.appendChild(f); r.appendChild(b);
    var vv=E('span','hs-v',nf(i.searches)); vv.title=L('an_hs_n',{n:nf(i.searches)}); r.appendChild(vv);
    card.appendChild(r);
  });
  if(!max) card.appendChild(E('p','an-hint an-top',L('an_hs_zero')));
  if(hs.sector_searches) card.appendChild(E('p','an-hint an-top',L('an_hs_sector',{n:nf(hs.sector_searches)})));
  return card;
}

// ── benchmark ──
function benchCard(d){
  var card=E('div','hs-table an-bench'), h=E('h3'); h.appendChild(E('span',null,L('an_b_h'))); card.appendChild(h);
  var b=d.benchmark;
  if(!b){
    card.appendChild(E('p','an-hint',L('an_b_none',{n:nf(d.benchmark_min_peers||5)})));
    if(d.reach && d.reach.sector_companies!=null) card.appendChild(E('p','an-hint',L('an_b_have',{k:nf(d.reach.sector_companies)})));
    return card;
  }
  card.appendChild(E('p','an-hint',L('an_b_sub',{n:nf(b.peers)})));
  var hd=E('div','hs-r hd'); hd.appendChild(E('span')); hd.appendChild(E('span',null,L('an_k_views'))); hd.appendChild(E('span',null,L('an_k_imp'))); card.appendChild(hd);
  function row(label, a, c, cls, dec){
    var r=E('div','hs-r'), w=E('div','who'); w.appendChild(E('b',null,label)); r.appendChild(w);
    [[a, Math.max(b.profile_view.mine, b.profile_view.avg)],[c, Math.max(b.search_impression.mine, b.search_impression.avg)]].forEach(function(p){
      var cell=E('div','cell '+cls); cell.appendChild(E('b',null,nf(p[0], dec?{maximumFractionDigits:1}:{})));
      var bt=E('div','an-bt'), f=E('div'); f.style.width=(p[1]>0?Math.max(p[0]>0?3:0, Math.round(p[0]/p[1]*100)):0)+'%'; bt.appendChild(f); cell.appendChild(bt); r.appendChild(cell);
    });
    return r;
  }
  card.appendChild(row(L('an_b_you'), b.profile_view.mine, b.search_impression.mine, 'me', false));
  card.appendChild(row(L('an_b_avg'), b.profile_view.avg, b.search_impression.avg, 'avg', true));
  return card;
}

// ───────────────────────── panel Genel Bakış: "Profil Görüntülenme" kartı ─────────────────────────
function overviewCard(){
  var lbl=document.querySelector('#dp-overview [data-i18n="ov_stat_views"]');
  return lbl && lbl.closest ? lbl.closest('.ov-stat-card') : null;
}
function renderOverview(data, state){
  OV.data=data||OV.data; OV.state=state||OV.state;
  var card=overviewCard(); if(!card) return;
  var v=card.querySelector('.ov-stat-val'), s=card.querySelector('.ov-stat-sub');
  if(s) s.removeAttribute('data-i18n');
  if(OV.state==='perm'){ if(v) v.textContent='—'; if(s) s.textContent=L('an_ov_noperm'); return; }
  if(OV.state==='nocompany'){ if(v) v.textContent='—'; if(s) s.textContent=L('an_ov_pending'); return; }
  if(OV.state==='err' || !OV.data){ if(v) v.textContent='—'; if(s) s.textContent=L('an_ov_err'); return; }
  var t=(OV.data.totals||{}).profile_view||{n:0};
  if(v) v.textContent=nf(t.n||0);
  if(s){
    var txt=L('an_ov_30');
    if(t.delta!=null && t.delta!==0) txt+=' · '+(t.delta>0?'↑ ':'↓ ')+(t.pct!=null ? pct(Math.abs(t.pct)) : '+'+nf(Math.abs(t.delta)));
    s.textContent=txt;
  }
}
window.kvAnalyticsOverview=function(){
  sameUser();
  if(!mayView()){ renderOverview(null,'perm'); return; }
  var w=S_.who;
  api('GET','/kv/analytics?range=30').then(function(r){
    if(w!==who()) return;                                              // someone else signed in meanwhile
    if(r.ok && r.data && r.data.totals) renderOverview(r.data,'ok');
    else renderOverview(null, r.status===403 ? (r.data && r.data.error==='no_company' ? 'nocompany' : 'perm') : 'err');
  });
};

// ───────────────────────── bağlantılar ─────────────────────────
document.addEventListener('click', function(e){
  var b=e.target.closest && e.target.closest('#anRange button[data-range]'); if(!b) return;
  var r=+b.getAttribute('data-range'); if(r===S_.range && S_.data) return;
  S_.range=r; S_.activeBar=-1; load();
});
document.addEventListener('kv:panel', function(e){
  if(!e.detail || e.detail.name!=='analytics') return;
  sameUser();
  if(!S_.data || S_.err || Date.now()-S_.at>60000) load(); else render();
});
document.addEventListener('kv:member', function(){
  var was=S_.who; sameUser();
  var open=$('dp-analytics') && $('dp-analytics').classList.contains('on');
  if(open && (was!==S_.who || !S_.data)) load();
});
var _setLang=window.setLang;
if(typeof _setLang==='function'){
  window.setLang=function(){
    var r=_setLang.apply(this, arguments);
    try{ register(); applyStatic(); if(S_.data) render(); if(OV.data||OV.state==='perm'||OV.state==='nocompany'||OV.state==='err') renderOverview(); }catch(e){}
    return r;
  };
}
applyStatic();
})();
