/* ═══════════════════════════════════════════════════════════════════════════
   KERVEA · İLETİ ÇEVİRİLERİ (kervea-app.js'den sonra, kervea-api.js'den ÖNCE yüklenir)
   Uyarı kutuları, toast, onay/parola pencereleri ve JS ile üretilen kısa metinler.
   Kaynak dil Türkçe: kvT("Türkçe metin") seçili dildeki karşılığı döndürür; karşılık yoksa İngilizce,
   o da yoksa Türkçe metin gösterilir (ham anahtar asla görünmez). {ad} yer tutucuları kvT(metin, {ad: değer}) ile doldurulur.
   Sütun sırası: en, es, fr, ar, ru.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var IDX = { en:0, es:1, fr:2, ar:3, ru:4 };
var C = {};
function add(rows){ rows.forEach(function(r){ C[r[0]] = r.slice(1); }); }

add([
 // ── oturum / giriş ──
 ['Oturum süreniz doldu. Lütfen tekrar giriş yapın.','Your session has expired. Please sign in again.','Su sesión ha caducado. Inicie sesión de nuevo.','Votre session a expiré. Veuillez vous reconnecter.','انتهت جلستك. يُرجى تسجيل الدخول مجددًا.','Сессия истекла. Войдите снова.'],
 ['Devam etmek için giriş yapın','Sign in to continue','Inicie sesión para continuar','Connectez-vous pour continuer','سجّل الدخول للمتابعة','Войдите, чтобы продолжить'],
 ['Bir hata oluştu. Lütfen tekrar deneyin.','Something went wrong. Please try again.','Ocurrió un error. Inténtelo de nuevo.','Une erreur est survenue. Veuillez réessayer.','حدث خطأ. يُرجى المحاولة مرة أخرى.','Произошла ошибка. Повторите попытку.'],
 ['E-posta hatalı','Invalid e-mail','Correo no válido','E-mail invalide','بريد إلكتروني غير صالح','Неверный e-mail'],
 ['Lütfen geçerli bir e-posta adresi girin.','Please enter a valid e-mail address.','Introduzca un correo electrónico válido.','Veuillez saisir une adresse e-mail valide.','يُرجى إدخال بريد إلكتروني صالح.','Введите корректный адрес e-mail.'],
 ['Parola çok kısa','Password too short','Contraseña demasiado corta','Mot de passe trop court','كلمة المرور قصيرة جدًا','Слишком короткий пароль'],
 ['Parola en az 8 karakter olmalı.','The password must be at least 8 characters.','La contraseña debe tener al menos 8 caracteres.','Le mot de passe doit comporter au moins 8 caractères.','يجب ألا تقل كلمة المرور عن 8 أحرف.','Пароль должен содержать не менее 8 символов.'],
 ['Giriş yapılıyor…','Signing in…','Iniciando sesión…','Connexion…','جارٍ تسجيل الدخول…','Вход…'],
 ['Hoş geldiniz','Welcome','Bienvenido','Bienvenue','مرحبًا بك','Добро пожаловать'],
 ['Kervea paneline yönlendiriliyorsunuz.','Taking you to your Kervea panel.','Le llevamos a su panel de Kervea.','Redirection vers votre espace Kervea.','جارٍ تحويلك إلى لوحة Kervea.','Переходим в ваш кабинет Kervea.'],
 ['Doğrulama kodu gerekli','Verification code required','Se requiere el código de verificación','Code de vérification requis','رمز التحقق مطلوب','Нужен код подтверждения'],
 ['Authenticator uygulamanızdaki 6 haneli kodu girin.','Enter the 6-digit code from your authenticator app.','Introduzca el código de 6 dígitos de su aplicación de autenticación.','Saisissez le code à 6 chiffres de votre application d\'authentification.','أدخل الرمز المكوّن من 6 أرقام من تطبيق المصادقة.','Введите 6-значный код из приложения-аутентификатора.'],
 ['Doğrulama kodu (2FA)','Verification code (2FA)','Código de verificación (2FA)','Code de vérification (2FA)','رمز التحقق (2FA)','Код подтверждения (2FA)'],
 ['Giriş geçici olarak kilitlendi','Sign-in temporarily locked','Inicio de sesión bloqueado temporalmente','Connexion temporairement bloquée','تم قفل تسجيل الدخول مؤقتًا','Вход временно заблокирован'],
 ['Çok fazla hatalı deneme. {m} dakika sonra tekrar deneyin.','Too many failed attempts. Try again in {m} minutes.','Demasiados intentos fallidos. Inténtelo de nuevo en {m} minutos.','Trop de tentatives échouées. Réessayez dans {m} minutes.','محاولات فاشلة كثيرة. حاول مجددًا بعد {m} دقيقة.','Слишком много неудачных попыток. Повторите через {m} мин.'],
 ['E-posta doğrulanmadı','E-mail not verified','Correo no verificado','E-mail non vérifié','البريد الإلكتروني غير مُوثَّق','E-mail не подтверждён'],
 ['Hesabınızı etkinleştirmek için e-postanızdaki bağlantıdan parola belirleyin.','To activate your account, set a password using the link in your e-mail.','Para activar su cuenta, establezca una contraseña con el enlace de su correo.','Pour activer votre compte, définissez un mot de passe via le lien reçu par e-mail.','لتفعيل حسابك، عيّن كلمة مرور عبر الرابط في بريدك الإلكتروني.','Чтобы активировать аккаунт, задайте пароль по ссылке из письма.'],
 ['Giriş başarısız','Sign-in failed','Error al iniciar sesión','Échec de la connexion','فشل تسجيل الدخول','Не удалось войти'],
 ['E-posta veya parola hatalı.','Wrong e-mail or password.','Correo o contraseña incorrectos.','E-mail ou mot de passe incorrect.','البريد الإلكتروني أو كلمة المرور غير صحيحة.','Неверный e-mail или пароль.'],
 ['E-posta adresinizi yazın','Enter your e-mail address','Escriba su correo electrónico','Saisissez votre adresse e-mail','اكتب بريدك الإلكتروني','Введите ваш e-mail'],
 ['Parola bağlantısı için önce yukarıdaki alana e-posta adresinizi girin.','For the password link, first enter your e-mail address in the field above.','Para recibir el enlace de contraseña, escriba primero su correo en el campo de arriba.','Pour recevoir le lien, saisissez d\'abord votre adresse e-mail dans le champ ci-dessus.','للحصول على رابط كلمة المرور، أدخل بريدك الإلكتروني أولًا في الحقل أعلاه.','Для получения ссылки сначала введите e-mail в поле выше.'],
 ['Sık talep','Too many requests','Demasiadas solicitudes','Trop de demandes','طلبات كثيرة','Слишком много запросов'],
 ['Kısa süre sonra tekrar deneyin.','Please try again shortly.','Inténtelo de nuevo en breve.','Réessayez dans un instant.','حاول مرة أخرى بعد قليل.','Повторите чуть позже.'],
 ['Bağlantı gönderildi','Link sent','Enlace enviado','Lien envoyé','تم إرسال الرابط','Ссылка отправлена'],
 ['Bu e-posta ile kayıtlı bir hesap varsa parola belirleme bağlantısı gönderildi.','If an account exists for this e-mail, a password link has been sent.','Si existe una cuenta con este correo, se ha enviado un enlace para la contraseña.','Si un compte existe pour cet e-mail, un lien de mot de passe a été envoyé.','إذا كان هناك حساب بهذا البريد فقد أُرسل رابط تعيين كلمة المرور.','Если для этого e-mail есть аккаунт, ссылка для пароля отправлена.'],
 ['Çıkış yapıldı','Signed out','Sesión cerrada','Déconnecté','تم تسجيل الخروج','Вы вышли'],
 ['Kervea hesabınızdan güvenle çıkış yaptınız.','You have signed out of your Kervea account.','Ha cerrado sesión en su cuenta de Kervea.','Vous êtes déconnecté de votre compte Kervea.','لقد سجّلت الخروج من حسابك في Kervea.','Вы вышли из аккаунта Kervea.'],

 // ── listeler / firma sayfası ──
 ['Liste yüklenemedi. Lütfen sayfayı yenileyin.','The list could not be loaded. Please refresh the page.','No se pudo cargar la lista. Actualice la página.','La liste n\'a pas pu être chargée. Actualisez la page.','تعذّر تحميل القائمة. يُرجى تحديث الصفحة.','Не удалось загрузить список. Обновите страницу.'],
 ['Filtrenize uyan firma bulunamadı.','No company matches your filters.','Ninguna empresa coincide con sus filtros.','Aucune entreprise ne correspond à vos filtres.','لا توجد شركة تطابق عوامل التصفية.','Нет компаний, подходящих под фильтры.'],
 ['Firma bulunamadı','Company not found','Empresa no encontrada','Entreprise introuvable','لم يتم العثور على الشركة','Компания не найдена'],
 ['Bu firma iletişim bilgilerini paylaşmamayı tercih etti.','This company has chosen not to share its contact details.','Esta empresa ha decidido no compartir sus datos de contacto.','Cette entreprise a choisi de ne pas partager ses coordonnées.','اختارت هذه الشركة عدم مشاركة بيانات الاتصال الخاصة بها.','Эта компания решила не раскрывать свои контакты.'],
 ['Paylaşım kapalı','Sharing is off','Compartir está desactivado','Partage désactivé','المشاركة متوقفة','Раскрытие отключено'],
 ['Kuruluş Yılı','Founded','Año de fundación','Année de création','سنة التأسيس','Год основания'],
 ['Ödeme','Payment','Pago','Paiement','الدفع','Оплата'],
 ['İşlem yapılamadı','The action could not be completed','No se pudo completar la acción','L\'action n\'a pas pu être effectuée','تعذّر إتمام الإجراء','Не удалось выполнить действие'],

 // ── firma ekleme formu ──
 ['En fazla 5 fotoğraf yüklenebilir; ilk 5 seçildi.','You can upload at most 5 photos; the first 5 were selected.','Se pueden subir como máximo 5 fotos; se han seleccionado las 5 primeras.','5 photos maximum ; les 5 premières ont été sélectionnées.','يمكن رفع 5 صور كحد أقصى؛ تم اختيار أول 5.','Можно загрузить не более 5 фото; выбраны первые 5.'],
 ['Eksik alanlar','Missing fields','Campos obligatorios','Champs manquants','حقول ناقصة','Не заполнены поля'],
 ['{list} zorunludur.','{list} are required.','Obligatorio: {list}.','Obligatoire : {list}.','الحقول التالية مطلوبة: {list}.','Обязательные поля: {list}.'],
 ['Firma adı','Company name','Nombre de la empresa','Nom de l\'entreprise','اسم الشركة','Название компании'],
 ['Vergi no','Tax ID','NIF / ID fiscal','N° fiscal','الرقم الضريبي','ИНН / налоговый номер'],
 ['Kuruluş yılı','Year founded','Año de fundación','Année de création','سنة التأسيس','Год основания'],
 ['E-posta','E-mail','Correo electrónico','E-mail','البريد الإلكتروني','E-mail'],
 ['Telefon','Phone','Teléfono','Téléphone','الهاتف','Телефон'],
 ['Yetkili adı','Representative name','Nombre del representante','Nom du représentant','اسم المسؤول','Имя представителя'],
 ['Ülke','Country','País','Pays','الدولة','Страна'],
 ['Logo','Logo','Logotipo','Logo','الشعار','Логотип'],
 ['Belgeler','Documents','Documentos','Documents','المستندات','Документы'],
 ['Firma açıklaması','Company description','Descripción de la empresa','Description de l\'entreprise','وصف الشركة','Описание компании'],
 ['Açıklama 250–300 kelime olmalı (şu an {n}).','The description must be 250–300 words (currently {n}).','La descripción debe tener entre 250 y 300 palabras (ahora {n}).','La description doit compter 250 à 300 mots (actuellement {n}).','يجب أن يكون الوصف بين 250 و300 كلمة (الآن {n}).','Описание должно содержать 250–300 слов (сейчас {n}).'],
 ['Başvurunuz alındı','Application received','Solicitud recibida','Candidature reçue','تم استلام طلبك','Заявка принята'],
 ['Belgeleriniz incelenecek; sonuç e-posta adresinize bildirilecek.','Your documents will be reviewed; the result will be sent to your e-mail address.','Revisaremos sus documentos; el resultado se enviará a su correo.','Vos documents seront examinés ; le résultat sera envoyé à votre adresse e-mail.','ستتم مراجعة مستنداتك وسيُرسل القرار إلى بريدك الإلكتروني.','Документы будут проверены; результат придёт на ваш e-mail.'],
 ['Çok sık deneme','Too many attempts','Demasiados intentos','Trop de tentatives','محاولات كثيرة جدًا','Слишком много попыток'],
 ['Kısa süre içinde çok fazla başvuru gönderildi. Lütfen daha sonra deneyin.','Too many applications were sent in a short time. Please try again later.','Se enviaron demasiadas solicitudes en poco tiempo. Inténtelo más tarde.','Trop de candidatures ont été envoyées en peu de temps. Réessayez plus tard.','أُرسلت طلبات كثيرة في وقت قصير. يُرجى المحاولة لاحقًا.','За короткое время отправлено слишком много заявок. Повторите позже.'],
 ['Başvuru gönderilemedi','The application could not be sent','No se pudo enviar la solicitud','La candidature n\'a pas pu être envoyée','تعذّر إرسال الطلب','Не удалось отправить заявку'],
 ['Zorunlu onaylar eksik','Required consents missing','Faltan consentimientos obligatorios','Consentements obligatoires manquants','الموافقات الإلزامية ناقصة','Не хватает обязательных согласий'],
 ['Devam etmeden önce 5. adımdaki zorunlu onayları işaretleyin.','Before continuing, tick the required consents in step 5.','Antes de continuar, marque los consentimientos obligatorios del paso 5.','Avant de continuer, cochez les consentements obligatoires de l\'étape 5.','قبل المتابعة، حدّد الموافقات الإلزامية في الخطوة 5.','Перед продолжением отметьте обязательные согласия на шаге 5.'],
 ['Firma kaydı için zorunlu maddeleri onaylayın.','Confirm the required items to register the company.','Confirme los puntos obligatorios para registrar la empresa.','Confirmez les éléments obligatoires pour enregistrer l\'entreprise.','أكّد البنود الإلزامية لتسجيل الشركة.','Подтвердите обязательные пункты для регистрации компании.'],
 ['Onaylar sıfırlandı','Consents reset','Consentimientos restablecidos','Consentements réinitialisés','تمت إعادة ضبط الموافقات','Согласия сброшены'],
 ['Taslak bu tarayıcıya kaydedildi (belgeler ve görseller hariç).','Draft saved in this browser (documents and images are not included).','Borrador guardado en este navegador (sin documentos ni imágenes).','Brouillon enregistré dans ce navigateur (documents et images exclus).','تم حفظ المسودة في هذا المتصفح (دون المستندات والصور).','Черновик сохранён в этом браузере (без документов и изображений).'],
 ['Kayıtlı taslağınız geri yüklendi.','Your saved draft has been restored.','Se ha restaurado su borrador guardado.','Votre brouillon enregistré a été restauré.','تمت استعادة مسودتك المحفوظة.','Сохранённый черновик восстановлен.'],
 ['Taslağı sil','Delete draft','Eliminar borrador','Supprimer le brouillon','حذف المسودة','Удалить черновик'],
 ['Taslak silindi.','Draft deleted.','Borrador eliminado.','Brouillon supprimé.','تم حذف المسودة.','Черновик удалён.'],

 // ── iletişim ──
 ['Eksik bilgi','Missing information','Información incompleta','Informations manquantes','معلومات ناقصة','Не хватает данных'],
 ['Ad, geçerli bir e-posta ve mesaj zorunludur.','Name, a valid e-mail and a message are required.','Se requieren nombre, un correo válido y un mensaje.','Le nom, un e-mail valide et un message sont obligatoires.','الاسم وبريد إلكتروني صالح ورسالة حقول مطلوبة.','Нужны имя, корректный e-mail и сообщение.'],
 ['Mesajınız iletildi','Your message has been sent','Su mensaje ha sido enviado','Votre message a été envoyé','تم إرسال رسالتك','Ваше сообщение отправлено'],
 ['Sık gönderim','Sending too often','Envíos demasiado frecuentes','Envois trop fréquents','إرسال متكرر','Слишком частая отправка'],
 ['Kısa süre içinde çok fazla mesaj gönderdiniz.','You have sent too many messages in a short time.','Ha enviado demasiados mensajes en poco tiempo.','Vous avez envoyé trop de messages en peu de temps.','أرسلت رسائل كثيرة في وقت قصير.','Вы отправили слишком много сообщений за короткое время.'],
 ['Mesaj gönderilemedi','The message could not be sent','No se pudo enviar el mensaje','Le message n\'a pas pu être envoyé','تعذّر إرسال الرسالة','Не удалось отправить сообщение'],
 ['Arama uygulandı','Search applied','Búsqueda aplicada','Recherche appliquée','تم تطبيق البحث','Поиск применён'],

 // ── profil / ayarlar / belgeler ──
 ['Kimlik numarası değişikliği için destek ile iletişime geçin','Contact support to change the identification number','Contacte con soporte para cambiar el número de identificación','Contactez le support pour modifier le numéro d\'identification','تواصل مع الدعم لتغيير رقم الهوية','Для изменения идентификационного номера обратитесь в поддержку'],
 ['Profil güncellendi','Profile updated','Perfil actualizado','Profil mis à jour','تم تحديث الملف','Профиль обновлён'],
 ['Profil kaydedilemedi','The profile could not be saved','No se pudo guardar el perfil','Le profil n\'a pas pu être enregistré','تعذّر حفظ الملف','Не удалось сохранить профиль'],
 ['Güvenlik','Security','Seguridad','Sécurité','الأمان','Безопасность'],
 ['Hesabınızı koruyan katmanlar.','Layers that protect your account.','Capas que protegen su cuenta.','Les protections de votre compte.','طبقات تحمي حسابك.','Уровни защиты вашего аккаунта.'],
 ['İki Faktörlü Kimlik Doğrulama (2FA)','Two-factor authentication (2FA)','Autenticación en dos pasos (2FA)','Authentification à deux facteurs (2FA)','المصادقة الثنائية (2FA)','Двухфакторная аутентификация (2FA)'],
 ['Authenticator uygulaması ile giriş kodu','Sign-in code from an authenticator app','Código de acceso con una aplicación de autenticación','Code de connexion via une application d\'authentification','رمز تسجيل الدخول عبر تطبيق المصادقة','Код входа из приложения-аутентификатора'],
 ['İzinler ve Bildirimler (KVKK)','Permissions and notifications (KVKK)','Permisos y notificaciones (KVKK)','Autorisations et notifications (KVKK)','الأذونات والإشعارات (KVKK)','Разрешения и уведомления (KVKK)'],
 ['Verdiğiniz izinleri istediğiniz zaman geri alabilirsiniz; her değişiklik kayıt altına alınır.','You can withdraw your permissions at any time; every change is recorded.','Puede retirar sus permisos en cualquier momento; cada cambio queda registrado.','Vous pouvez retirer vos autorisations à tout moment ; chaque modification est enregistrée.','يمكنك سحب أذوناتك في أي وقت؛ ويُسجَّل كل تغيير.','Вы можете отозвать разрешения в любой момент; каждое изменение фиксируется.'],
 ['İletişim bilgilerimin gösterilmesi','Showing my contact details','Mostrar mis datos de contacto','Affichage de mes coordonnées','إظهار بيانات الاتصال الخاصة بي','Показ моих контактных данных'],
 ['E-posta/telefon yalnızca Pro üyelere gösterilir. Kapatırsanız kimseye gösterilmez.','E-mail and phone are shown to Premium members only. If you turn this off they are shown to no one.','El correo y el teléfono solo se muestran a miembros Premium. Si lo desactiva, no se muestran a nadie.','L\'e-mail et le téléphone ne sont montrés qu\'aux membres Premium. Si vous désactivez, ils ne sont montrés à personne.','يظهر البريد الإلكتروني والهاتف للأعضاء Premium فقط. وإذا أوقفت هذا الخيار فلن يراهما أحد.','E-mail и телефон видны только участникам Premium. Если отключить, их не увидит никто.'],
 ['E-posta bildirimleri','E-mail notifications','Notificaciones por correo','Notifications par e-mail','إشعارات البريد الإلكتروني','Уведомления по e-mail'],
 ['Sektörünüze yeni firma katıldığında ve platform duyurularında e-posta (ticari elektronik ileti)','E-mail when a new company joins your sector and for platform announcements (commercial electronic message)','Correo cuando se une una empresa nueva a su sector y para anuncios de la plataforma (mensaje comercial electrónico)','E-mail lorsqu\'une nouvelle entreprise rejoint votre secteur et pour les annonces de la plateforme (message commercial électronique)','بريد إلكتروني عند انضمام شركة جديدة إلى قطاعك ولإعلانات المنصة (رسالة تجارية إلكترونية)','E-mail, когда в ваш сектор приходит новая компания, и для объявлений платформы (коммерческое электронное сообщение)'],
 ['KVKK / GDPR — Veri Hakları','KVKK / GDPR: data rights','KVKK / GDPR: derechos sobre los datos','KVKK / RGPD : droits sur les données','KVKK / GDPR: حقوق البيانات','KVKK / GDPR: права на данные'],
 ['Verileriniz KVKK ve GDPR standartlarında saklanır.','Your data is handled under KVKK and GDPR rules.','Sus datos se tratan conforme a KVKK y GDPR.','Vos données sont traitées conformément à la KVKK et au RGPD.','تُعالَج بياناتك وفق معايير KVKK وGDPR.','Ваши данные обрабатываются по правилам KVKK и GDPR.'],
 ['Verilerimi İndir (JSON)','Download my data (JSON)','Descargar mis datos (JSON)','Télécharger mes données (JSON)','تنزيل بياناتي (JSON)','Скачать мои данные (JSON)'],
 ['Aydınlatma Metni','Privacy notice','Aviso de privacidad','Notice d\'information','نص الإفصاح','Уведомление о конфиденциальности'],
 ['Gizlilik / Çerez Politikası','Privacy / cookie policy','Política de privacidad / cookies','Politique de confidentialité / cookies','سياسة الخصوصية / ملفات تعريف الارتباط','Политика конфиденциальности / cookie'],
 ['Üyelik Sözleşmesi','Membership agreement','Contrato de membresía','Contrat d\'adhésion','اتفاقية العضوية','Соглашение об участии'],
 ['Hesabı Sil','Delete account','Eliminar cuenta','Supprimer le compte','حذف الحساب','Удалить аккаунт'],
 ['İzin kaydedildi','Permission saved','Permiso guardado','Autorisation enregistrée','تم حفظ الإذن','Разрешение сохранено'],
 ['İzin geri alındı','Permission withdrawn','Permiso retirado','Autorisation retirée','تم سحب الإذن','Разрешение отозвано'],
 ['İzin güncellenemedi','The permission could not be updated','No se pudo actualizar el permiso','L\'autorisation n\'a pas pu être mise à jour','تعذّر تحديث الإذن','Не удалось обновить разрешение'],
 ['2FA başlatılamadı','2FA could not be started','No se pudo iniciar 2FA','La 2FA n\'a pas pu être lancée','تعذّر بدء المصادقة الثنائية','Не удалось запустить 2FA'],
 ['2FA etkinleştirildi','2FA enabled','2FA activada','2FA activée','تم تفعيل المصادقة الثنائية','2FA включена'],
 ['2FA kapatıldı','2FA disabled','2FA desactivada','2FA désactivée','تم إيقاف المصادقة الثنائية','2FA отключена'],
 ['Kod hatalı','Wrong code','Código incorrecto','Code incorrect','الرمز غير صحيح','Неверный код'],
 ['Parola hatalı','Wrong password','Contraseña incorrecta','Mot de passe incorrect','كلمة المرور غير صحيحة','Неверный пароль'],
 ['Parola hatalı.','Wrong password.','Contraseña incorrecta.','Mot de passe incorrect.','كلمة المرور غير صحيحة.','Неверный пароль.'],
 ['2FA\'yı kapatmak için parolanızı girin:','Enter your password to turn off 2FA:','Introduzca su contraseña para desactivar 2FA:','Saisissez votre mot de passe pour désactiver la 2FA :','أدخل كلمة المرور لإيقاف المصادقة الثنائية:','Введите пароль, чтобы отключить 2FA:'],
 ['Hesabınız ve tüm verileriniz kalıcı olarak silinecek. Emin misiniz?','Your account and all your data will be permanently deleted. Are you sure?','Su cuenta y todos sus datos se eliminarán de forma permanente. ¿Está seguro?','Votre compte et toutes vos données seront définitivement supprimés. Confirmer ?','سيُحذف حسابك وكل بياناتك نهائيًا. هل أنت متأكد؟','Ваш аккаунт и все данные будут удалены безвозвратно. Вы уверены?'],
 ['Onaylamak için parolanızı girin:','Enter your password to confirm:','Introduzca su contraseña para confirmar:','Saisissez votre mot de passe pour confirmer :','أدخل كلمة المرور للتأكيد:','Введите пароль для подтверждения:'],
 ['Hesap silindi','Account deleted','Cuenta eliminada','Compte supprimé','تم حذف الحساب','Аккаунт удалён'],
 ['Verileriniz silindi.','Your data has been deleted.','Sus datos se han eliminado.','Vos données ont été supprimées.','تم حذف بياناتك.','Ваши данные удалены.'],
 ['Hesap silinemedi','The account could not be deleted','No se pudo eliminar la cuenta','Le compte n\'a pas pu être supprimé','تعذّر حذف الحساب','Не удалось удалить аккаунт'],
 ['Firma doğrulandı','Company verified','Empresa verificada','Entreprise vérifiée','تم توثيق الشركة','Компания проверена'],
 ['Başvurunuz inceleniyor — sonuç e-posta ile bildirilecek','Your application is under review; the result will be sent by e-mail','Su solicitud está en revisión; el resultado se enviará por correo','Votre candidature est en cours d\'examen ; le résultat vous sera envoyé par e-mail','طلبك قيد المراجعة؛ سيصلك القرار عبر البريد الإلكتروني','Заявка на проверке; результат придёт по e-mail'],
 ['Başvurunuz onaylanmadı — e-postanızı kontrol edin','Your application was not approved; check your e-mail','Su solicitud no fue aprobada; revise su correo','Votre candidature n\'a pas été approuvée ; consultez votre e-mail','لم يتم اعتماد طلبك؛ راجع بريدك الإلكتروني','Заявка не одобрена; проверьте e-mail'],
 ['Hesap askıda — destek ile iletişime geçin','Account suspended; contact support','Cuenta suspendida; contacte con soporte','Compte suspendu ; contactez le support','الحساب موقوف؛ تواصل مع الدعم','Аккаунт приостановлен; свяжитесь с поддержкой'],
 ['Doğrulandı','Verified','Verificada','Vérifiée','موثّقة','Проверена'],
 ['Beklemede','Pending','Pendiente','En attente','قيد الانتظار','На рассмотрении'],
 ['Belgeler Kervea ekibince incelendi','Documents reviewed by the Kervea team','Documentos revisados por el equipo de Kervea','Documents examinés par l\'équipe Kervea','راجع فريق Kervea المستندات','Документы проверены командой Kervea'],
 ['Belgeler inceleniyor','Documents under review','Documentos en revisión','Documents en cours d\'examen','المستندات قيد المراجعة','Документы на проверке'],
 ['Sektör ve ürün kriterlerinize göre','Based on your sector and product criteria','Según su sector y sus criterios de producto','Selon votre secteur et vos critères de produit','حسب قطاعك ومعايير منتجك','По вашему сектору и критериям товара'],
 ['Doğrulama sonrası listelenir','Listed after verification','Se muestra tras la verificación','Affiché après la vérification','تُعرض بعد التوثيق','Появится после проверки'],
 ['İncelendi','Reviewed','Revisado','Examiné','تمت المراجعة','Проверено'],
 ['İnceleniyor','Under review','En revisión','En cours d\'examen','قيد المراجعة','На проверке'],
 ['Belgeler yüklendi','Documents uploaded','Documentos subidos','Documents téléversés','تم رفع المستندات','Документы загружены'],
 ['Belge yüklenemedi','The document could not be uploaded','No se pudo subir el documento','Le document n\'a pas pu être téléversé','تعذّر رفع المستند','Не удалось загрузить документ'],
 ['Eşleşmeler için önce firma profilinizi oluşturun.','Create your company profile first to see matches.','Cree primero el perfil de su empresa para ver coincidencias.','Créez d\'abord le profil de votre entreprise pour voir les correspondances.','أنشئ ملف شركتك أولًا لعرض المطابقات.','Сначала создайте профиль компании, чтобы увидеть совпадения.'],
 ['Başvurunuz onaylandığında eşleşmeler burada listelenir.','Matches will be listed here once your application is approved.','Las coincidencias aparecerán aquí cuando se apruebe su solicitud.','Les correspondances s\'afficheront ici une fois votre candidature approuvée.','ستُعرض المطابقات هنا عند اعتماد طلبك.','Совпадения появятся здесь после одобрения заявки.'],
 ['Filtrelere uyan eşleşme yok','No match fits the filters','Ninguna coincidencia cumple los filtros','Aucune correspondance ne répond aux filtres','لا توجد مطابقة تناسب عوامل التصفية','Нет совпадений под фильтры'],
 ['Karşılıklı yön','Complementary direction','Orientación complementaria','Orientation complémentaire','اتجاه متكامل','Встречное направление'],
 ['Aynı sektör','Same sector','Mismo sector','Même secteur','القطاع نفسه','Тот же сектор'],
 ['HS kodu ortak','Shared HS code','Código HS compartido','Code SH commun','رمز HS مشترك','Общий код ТН ВЭД'],
 ['Deneyimli firma','Established company','Empresa con trayectoria','Entreprise établie','شركة ذات خبرة','Опытная компания'],
 ['Ürün Uyumu','Product fit','Afinidad de producto','Adéquation produit','توافق المنتج','Совпадение по товару'],
 ['Yön Uyumu','Direction fit','Afinidad de orientación','Adéquation d\'orientation','توافق الاتجاه','Совпадение по направлению'],
 ['Ödeme alındı','Payment received','Pago recibido','Paiement reçu','تم استلام الدفع','Платёж получен'],
 ['Premium üyeliğiniz birkaç saniye içinde aktif olur.','Your Premium membership will be active in a few seconds.','Su membresía Premium se activará en unos segundos.','Votre abonnement Premium sera actif dans quelques secondes.','سيتفعّل اشتراك Premium خلال ثوانٍ.','Ваша подписка Premium активируется через несколько секунд.'],

 // ── dosya doğrulama (kervea-head.js) ──
 ['Dosya kabul edilmedi','File not accepted','Archivo no aceptado','Fichier refusé','لم يُقبل الملف','Файл не принят'],
 ['Tek seferde en fazla 12 dosya yüklenebilir.','You can upload at most 12 files at a time.','Solo se pueden subir 12 archivos a la vez.','12 fichiers maximum à la fois.','يمكن رفع 12 ملفًا كحد أقصى في المرة الواحدة.','За раз можно загрузить не более 12 файлов.'],
 ['Bu alana yalnızca görsel (JPEG, PNG, WebP) yüklenebilir.','Only images (JPEG, PNG, WebP) can be uploaded here.','Aquí solo se pueden subir imágenes (JPEG, PNG, WebP).','Seules les images (JPEG, PNG, WebP) sont acceptées ici.','يمكن رفع الصور فقط (JPEG وPNG وWebP) هنا.','Здесь можно загружать только изображения (JPEG, PNG, WebP).'],
 ['Dosyanın içeriği uzantısıyla uyuşmuyor.','The file content does not match its extension.','El contenido del archivo no coincide con su extensión.','Le contenu du fichier ne correspond pas à son extension.','محتوى الملف لا يطابق امتداده.','Содержимое файла не соответствует расширению.'],
 ['Dosya seçilmedi','No file selected','Ningún archivo seleccionado','Aucun fichier sélectionné','لم يتم اختيار ملف','Файл не выбран'],
 ['Güvenlik: bu dosya tipine izin verilmez','Security: this file type is not allowed','Seguridad: este tipo de archivo no está permitido','Sécurité : ce type de fichier n\'est pas autorisé','الأمان: نوع الملف هذا غير مسموح به','Безопасность: этот тип файла не разрешён'],
 ['İzin verilmeyen dosya tipi. Yalnızca JPEG, PNG, WebP ve PDF kabul edilir.','File type not allowed. Only JPEG, PNG, WebP and PDF are accepted.','Tipo de archivo no permitido. Solo se aceptan JPEG, PNG, WebP y PDF.','Type de fichier non autorisé. Seuls JPEG, PNG, WebP et PDF sont acceptés.','نوع الملف غير مسموح به. يُقبل JPEG وPNG وWebP وPDF فقط.','Тип файла не разрешён. Принимаются только JPEG, PNG, WebP и PDF.'],
 ['İzin verilmeyen dosya tipi. Yalnızca JPEG, PNG, WebP kabul edilir.','File type not allowed. Only JPEG, PNG and WebP are accepted.','Tipo de archivo no permitido. Solo se aceptan JPEG, PNG y WebP.','Type de fichier non autorisé. Seuls JPEG, PNG et WebP sont acceptés.','نوع الملف غير مسموح به. يُقبل JPEG وPNG وWebP فقط.','Тип файла не разрешён. Принимаются только JPEG, PNG и WebP.'],
 ['Dosya çok büyük (max {mb} MB)','The file is too large (max {mb} MB)','El archivo es demasiado grande (máx. {mb} MB)','Le fichier est trop volumineux (max {mb} Mo)','الملف كبير جدًا (الحد الأقصى {mb} ميغابايت)','Файл слишком большой (макс. {mb} МБ)'],

 // ── panel: küçük metinler ──
 ['Değişiklikler geri alındı','Changes reverted','Cambios revertidos','Modifications annulées','تم التراجع عن التغييرات','Изменения отменены'],
 ['Authenticator uygulamanıza şu anahtarı ekleyin (veya {link}):','Add this key to your authenticator app (or {link}):','Añada esta clave a su aplicación de autenticación (o {link}):','Ajoutez cette clé à votre application d\'authentification (ou {link}) :','أضف هذا المفتاح إلى تطبيق المصادقة (أو {link}):','Добавьте этот ключ в приложение-аутентификатор (или {link}):'],
 ['buraya tıklayın','click here','haga clic aquí','cliquez ici','انقر هنا','нажмите здесь'],
 ['6 haneli kod','6-digit code','Código de 6 dígitos','Code à 6 chiffres','رمز من 6 أرقام','6-значный код'],
 ['Doğrula','Verify','Verificar','Vérifier','تحقق','Подтвердить'],
 ['Yeni belge ekle','Add a new document','Añadir un documento','Ajouter un document','إضافة مستند جديد','Добавить документ'],

 // ── küre / filtre ──
 ['Küre üzerindeki ülkeler','Countries on the globe','Países en el globo','Pays sur le globe','الدول على الكرة الأرضية','Страны на глобусе']
]);


// ── erişilebilirlik etiketleri / ipuçları (aria-label, title) ──
add([
 ['Tema değiştir','Toggle theme','Cambiar tema','Changer de thème','تبديل المظهر','Сменить тему'],
 ['Dünya küresi: ülkeler ve doğrulanmış firma sayıları','World globe: countries and verified company counts','Globo terráqueo: países y número de empresas verificadas','Globe terrestre : pays et nombre d\'entreprises vérifiées','كرة أرضية: الدول وعدد الشركات الموثّقة','Глобус: страны и число проверенных компаний'],
 ['Sosyal medya','Social media','Redes sociales','Réseaux sociaux','وسائل التواصل الاجتماعي','Социальные сети'],
 ['Parolayı göster','Show password','Mostrar contraseña','Afficher le mot de passe','إظهار كلمة المرور','Показать пароль'],
 ['Parolayı gizle','Hide password','Ocultar contraseña','Masquer le mot de passe','إخفاء كلمة المرور','Скрыть пароль'],
 ['Kapat','Close','Cerrar','Fermer','إغلاق','Закрыть'],
 ['Kapat (ESC)','Close (Esc)','Cerrar (Esc)','Fermer (Échap)','إغلاق (Esc)','Закрыть (Esc)'],
 ['Panel menüsü','Panel menu','Menú del panel','Menu du tableau de bord','قائمة اللوحة','Меню кабинета'],
 ['Sayfa içi gezinme','On-page navigation','Navegación de la página','Navigation de la page','التنقل داخل الصفحة','Навигация по странице'],
 ['Ticaret akışı','Trade flow','Flujo comercial','Flux commercial','مسار التجارة','Схема сделки'],
 ['Daha fazla','More','Más','Plus','المزيد','Ещё'],
 ['Pro üyeler için','For Premium members','Para miembros Premium','Pour les membres Premium','لأعضاء Premium','Для участников Premium'],
 ['Hukuken yalnızca Türkçe metin geçerlidir.','Only the Turkish text is legally binding.','Solo el texto en turco tiene validez jurídica.','Seul le texte turc fait foi.','النص التركي وحده هو الملزم قانونًا.','Юридическую силу имеет только текст на турецком языке.'],
]);


// ── üye paneli: genel bakış, profil görselleri, belgeler ──
add([
 ['Durum yükleniyor…','Loading status…','Cargando estado…','Chargement du statut…','جارٍ تحميل الحالة…','Загрузка статуса…'],
 ['Yükleniyor…','Loading…','Cargando…','Chargement…','جارٍ التحميل…','Загрузка…'],
 ['Profili düzenle','Edit profile','Editar perfil','Modifier le profil','تعديل الملف','Редактировать профиль'],
 ['Profil doluluğu','Profile completeness','Perfil completo','Profil renseigné','اكتمال الملف','Заполненность профиля'],
 ['Yüklenen belge','Documents uploaded','Documentos subidos','Documents envoyés','المستندات المرفوعة','Загруженные документы'],
 ['Sonraki adımlar','Next steps','Próximos pasos','Prochaines étapes','الخطوات التالية','Следующие шаги'],
 ['Başvurunuz onaylandıktan sonra listelenir','Listed once your application is approved','Se listan cuando se apruebe su solicitud','Listées après l\'approbation de votre candidature','تظهر بعد الموافقة على طلبك','Появятся после одобрения заявки'],
 ['{n} / {total} alan dolu','{n} of {total} fields filled','{n} de {total} campos completos','{n} champs sur {total} renseignés','{n} من {total} حقول مكتملة','Заполнено {n} из {total} полей'],
 ['Yalnızca Kervea yöneticileri görür','Visible to Kervea administrators only','Solo los administradores de Kervea las ven','Visibles uniquement par les administrateurs Kervea','يراها مسؤولو Kervea فقط','Видны только администраторам Kervea'],
 ['Henüz belge yüklenmedi','No documents uploaded yet','Aún no se han subido documentos','Aucun document envoyé pour l\'instant','لم يتم رفع أي مستند بعد','Документы ещё не загружены'],
 ['Başvurunuz onaylandı','Your application is approved','Su solicitud está aprobada','Votre candidature est approuvée','تمت الموافقة على طلبك','Ваша заявка одобрена'],
 ['Başvurunuzun incelenmesini bekleyin','Wait for your application to be reviewed','Espere a que se revise su solicitud','Attendez l\'examen de votre candidature','انتظر مراجعة طلبك','Дождитесь рассмотрения заявки'],
 ['Başvurunuz onaylanmadı; e-postanızı kontrol edin','Your application was not approved; check your e-mail','Su solicitud no fue aprobada; revise su correo','Votre candidature n\'a pas été approuvée ; vérifiez vos e-mails','لم تتم الموافقة على طلبك؛ راجع بريدك الإلكتروني','Заявка не одобрена; проверьте почту'],
 ['Hesap askıda; destek ile iletişime geçin','Account suspended; contact support','Cuenta suspendida; contacte con soporte','Compte suspendu ; contactez le support','الحساب معلّق؛ تواصل مع الدعم','Аккаунт приостановлен; обратитесь в поддержку'],
 ['Profilinizi tamamlayın (%{n} dolu)','Complete your profile ({n}% filled)','Complete su perfil ({n} % completo)','Complétez votre profil ({n} % renseigné)','أكمل ملفك ({n}٪ مكتمل)','Заполните профиль (заполнено {n}%)'],
 ['Profiliniz eksiksiz','Your profile is complete','Su perfil está completo','Votre profil est complet','ملفك مكتمل','Профиль заполнен полностью'],
 ['Doğrulama belgelerinizi yükleyin','Upload your verification documents','Suba sus documentos de verificación','Envoyez vos documents de vérification','ارفع مستندات التحقق','Загрузите документы для проверки'],
 ['Belgeleriniz yüklendi ({n})','Your documents are uploaded ({n})','Sus documentos están subidos ({n})','Vos documents sont envoyés ({n})','تم رفع مستنداتك ({n})','Документы загружены ({n})'],
 ['İletişim bilgilerinizin gösterilmesine izin verin','Allow your contact details to be shown','Permita que se muestren sus datos de contacto','Autorisez l\'affichage de vos coordonnées','اسمح بإظهار بيانات الاتصال الخاصة بك','Разрешите показ ваших контактов'],
 ['İletişim bilgileriniz Premium üyelere gösteriliyor','Your contact details are shown to Premium members','Sus datos de contacto se muestran a miembros Premium','Vos coordonnées sont affichées aux membres Premium','تُعرض بيانات اتصالك لأعضاء Premium','Ваши контакты видны участникам Premium'],
 ['Doğrulanmış firma','Verified company','Empresa verificada','Entreprise vérifiée','شركة موثّقة','Проверенная компания'],
 ['Başvuru inceleniyor','Application under review','Solicitud en revisión','Candidature en cours d\'examen','الطلب قيد المراجعة','Заявка на рассмотрении'],
 ['Logo','Logo','Logotipo','Logo','الشعار','Логотип'],
 ['Belgeler','Documents','Documentos','Documents','المستندات','Документы'],
 ['Sosyal medya','Social media','Redes sociales','Réseaux sociaux','وسائل التواصل الاجتماعي','Социальные сети'],
 ['Galeri ({n}/{max})','Gallery ({n}/{max})','Galería ({n}/{max})','Galerie ({n}/{max})','المعرض ({n}/{max})','Галерея ({n}/{max})'],
 ['Şu anki görünüm','Current look','Aspecto actual','Aperçu actuel','المظهر الحالي','Текущий вид'],
 ['PNG, JPG veya WebP · en fazla 2 MB','PNG, JPG or WebP · max 2 MB','PNG, JPG o WebP · máx. 2 MB','PNG, JPG ou WebP · 2 Mo max','PNG أو JPG أو WebP · بحد أقصى 2 ميغابايت','PNG, JPG или WebP · до 2 МБ'],
 ['Kapak görseli','Cover image','Imagen de portada','Image de couverture','صورة الغلاف','Обложка'],
 ['PNG, JPG veya WebP · en fazla 5 MB','PNG, JPG or WebP · max 5 MB','PNG, JPG o WebP · máx. 5 MB','PNG, JPG ou WebP · 5 Mo max','PNG أو JPG أو WebP · بحد أقصى 5 ميغابايت','PNG, JPG или WebP · до 5 МБ'],
 ['Kapak görselini kaldır','Remove cover image','Quitar la imagen de portada','Retirer l\'image de couverture','إزالة صورة الغلاف','Удалить обложку'],
 ['Fotoğraf ekle','Add a photo','Añadir una foto','Ajouter une photo','إضافة صورة','Добавить фото'],
 ['PNG, JPG veya WebP · her biri en fazla 5 MB','PNG, JPG or WebP · max 5 MB each','PNG, JPG o WebP · máx. 5 MB cada una','PNG, JPG ou WebP · 5 Mo max chacune','PNG أو JPG أو WebP · بحد أقصى 5 ميغابايت لكل صورة','PNG, JPG или WebP · до 5 МБ каждое'],
 ['Görseller yüklenir yüklenmez kaydedilir.','Images are saved as soon as they are uploaded.','Las imágenes se guardan en cuanto se suben.','Les images sont enregistrées dès leur envoi.','تُحفظ الصور فور رفعها.','Изображения сохраняются сразу после загрузки.'],
 ['Görsel yükleniyor…','Uploading image…','Subiendo imagen…','Envoi de l\'image…','جارٍ رفع الصورة…','Загрузка изображения…'],
 ['Logo güncellendi','Logo updated','Logotipo actualizado','Logo mis à jour','تم تحديث الشعار','Логотип обновлён'],
 ['Kapak güncellendi','Cover updated','Portada actualizada','Couverture mise à jour','تم تحديث الغلاف','Обложка обновлена'],
 ['Kapak kaldırıldı','Cover removed','Portada eliminada','Couverture retirée','تمت إزالة الغلاف','Обложка удалена'],
 ['Fotoğraf eklendi','Photo added','Foto añadida','Photo ajoutée','تمت إضافة الصورة','Фото добавлено'],
 ['Fotoğraf kaldırıldı','Photo removed','Foto eliminada','Photo retirée','تمت إزالة الصورة','Фото удалено'],
 ['Fotoğrafı kaldır','Remove photo','Quitar la foto','Retirer la photo','إزالة الصورة','Удалить фото'],
 ['Görsel yüklenemedi','The image could not be uploaded','No se pudo subir la imagen','L\'image n\'a pas pu être envoyée','تعذّر رفع الصورة','Не удалось загрузить изображение'],
 ['Görsel kaldırılamadı','The image could not be removed','No se pudo quitar la imagen','L\'image n\'a pas pu être retirée','تعذّرت إزالة الصورة','Не удалось удалить изображение'],
 ['En fazla {n} fotoğraf eklenebilir.','At most {n} photos can be added.','Se pueden añadir como máximo {n} fotos.','{n} photos maximum.','يمكن إضافة {n} صور كحد أقصى.','Можно добавить не более {n} фото.'],
 ['Belgelerim','My documents','Mis documentos','Mes documents','مستنداتي','Мои документы'],
 ['Başvuruda yüklediğiniz belgeler yalnızca Kervea yöneticilerine görünür; başka firmalara gösterilmez.','The documents you upload with your application are visible only to Kervea administrators; they are not shown to other companies.','Los documentos que sube con su solicitud solo los ven los administradores de Kervea; no se muestran a otras empresas.','Les documents envoyés avec votre candidature ne sont visibles que par les administrateurs Kervea ; ils ne sont pas montrés aux autres entreprises.','المستندات التي ترفعها مع طلبك يراها مسؤولو Kervea فقط ولا تُعرض للشركات الأخرى.','Документы, загруженные с заявкой, видны только администраторам Kervea и не показываются другим компаниям.'],
 ['Yeni Belge Yükle','Upload a new document','Subir un documento','Envoyer un document','رفع مستند جديد','Загрузить документ'],
 ['Ayarlar','Settings','Ajustes','Paramètres','الإعدادات','Настройки'],
 ['Hesap ve güvenlik tercihleri.','Account and security preferences.','Preferencias de cuenta y seguridad.','Préférences du compte et de sécurité.','تفضيلات الحساب والأمان.','Настройки аккаунта и безопасности.'],
 ['Gönderiliyor…','Sending…','Enviando…','Envoi…','جارٍ الإرسال…','Отправка…'],
]);

// Türkçe metnin seçili dildeki karşılığı (yer tutucular: {ad}).
function fill(s, vars){
  if(!vars) return s;
  return String(s).replace(/\{([a-z0-9_]+)\}/gi, function(m, k){ return vars[k] !== undefined ? vars[k] : m; });
}
window.kvT = function(s, vars){
  if(s === null || s === undefined || s === '') return s;
  s = String(s);
  var lang = window.LANG || 'tr';
  var row = C[s], out = s;
  if(lang !== 'tr' && row){
    var i = IDX[lang];
    out = (i !== undefined && row[i]) ? row[i] : (row[0] || s);
  }
  return fill(out, vars);
};
window.kvDict = add;     // diğer dosyalar kendi satırlarını ekleyebilir

// Mevcut çağrılar (kvShowAlert / toast / confirm / prompt) Türkçe kaynak metinle yazılmış: çıktıdan hemen önce çevrilir.
function wrap(name, positions){
  var orig = window[name];
  if(typeof orig !== 'function' || orig.__kvT) return;
  var w = function(){
    var a = Array.prototype.slice.call(arguments);
    positions.forEach(function(p){ if(typeof a[p] === 'string') a[p] = window.kvT(a[p]); });
    return orig.apply(this, a);
  };
  w.__kvT = true;
  window[name] = w;
}
wrap('kvShowAlert', [1, 2]);
wrap('toast', [0]);
(function(){
  var _confirm = window.confirm, _prompt = window.prompt;
  if(_confirm && !_confirm.__kvT){ window.confirm = function(m){ return _confirm.call(window, window.kvT(m)); }; window.confirm.__kvT = true; }
  if(_prompt && !_prompt.__kvT){ window.prompt = function(m, d){ return _prompt.call(window, window.kvT(m), d); }; window.prompt.__kvT = true; }
})();

// Metin düzeltmeleri: T sözlüğündeki eski, abartılı ya da doğrulanamayan ifadelerin yerine geçer (anahtar aynı, metin yeni).
(function(){
  if(!window.T) return;
  var X = {
   tr:{ mt_sub:'Sektörünüze, ürünlerinize ve ticaret yönünüze göre sıralanır. Filtreleyebilir ve CSV olarak indirebilirsiniz.',
        ov_port_empty_p:'Firma başvurunuz onaylandığında, sektörünüze ve HS kodlarınıza göre eşleşen firmalar burada listelenir.' },
   en:{ mt_sub:'Ranked by your sector, products and trade direction. You can filter them and download them as CSV.',
        ov_port_empty_p:'Once your application is approved, companies that match your sector and HS codes are listed here.' },
   es:{ mt_sub:'Ordenadas según su sector, sus productos y su orientación comercial. Puede filtrarlas y descargarlas en CSV.',
        ov_port_empty_p:'Cuando se apruebe su solicitud, aquí aparecerán las empresas que coincidan con su sector y sus códigos HS.' },
   fr:{ mt_sub:'Classées selon votre secteur, vos produits et votre sens d\'échange. Vous pouvez les filtrer et les télécharger en CSV.',
        ov_port_empty_p:'Une fois votre candidature approuvée, les entreprises correspondant à votre secteur et à vos codes SH seront listées ici.' },
   ar:{ mt_sub:'مرتبة حسب قطاعك ومنتجاتك واتجاه تجارتك. يمكنك تصفيتها وتنزيلها بصيغة CSV.',
        ov_port_empty_p:'بعد الموافقة على طلبك، ستظهر هنا الشركات المطابقة لقطاعك ورموز HS الخاصة بك.' },
   ru:{ mt_sub:'Отсортированы по вашей отрасли, товарам и направлению торговли. Можно отфильтровать и скачать в CSV.',
        ov_port_empty_p:'После одобрения заявки здесь появятся компании, подходящие по вашей отрасли и кодам ТН ВЭД.' }
  };
  Object.keys(X).forEach(function(l){ if(!T[l]) T[l] = {}; Object.assign(T[l], X[l]); });
})();

// Eksik çeviri anahtarı: önce İngilizce, sonra Türkçe (ham anahtar ya da undefined asla görünmez).
// T[dil][anahtar] okuyan tüm kod (panel dosyaları dâhil) bu geri dönüşü otomatik alır.
(function(){
  if(!window.T || typeof Proxy === 'undefined') return;
  ['en','es','fr','ar','ru'].forEach(function(l){
    var base = T[l];
    if(!base || base.__kvFb) return;
    var fb = l === 'en' ? 'tr' : 'en';
    var p = new Proxy(base, {
      get: function(t, k){
        if(k === '__kvFb') return true;
        var v = t[k];
        if(v !== undefined || typeof k !== 'string') return v;
        var f = T[fb]; return f ? f[k] : undefined;
      },
      has: function(t, k){ return (k in t) || (typeof k === 'string' && T[fb] && (k in T[fb])); }
    });
    T[l] = p;
  });
})();
})();
