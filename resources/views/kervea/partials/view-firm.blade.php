@verbatim
<section id="firm" class="view">
 <div class="wrap sec">
  <a class="fpback" onclick="go('home')">
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
   <span data-i18n="back_list">Firma listesine dön</span>
  </a>
  <div class="fpg" id="fpgContent"></div>
 </div>
</section>

<!-- MODALS -->

<!-- v20: Credits Purchase Modal -->
<div class="modal" id="mCredits"><div class="mbox creds-modal" style="max-width:640px;width:calc(100vw - 32px)"><div class="mhead"><h3 data-i18n="creds_h">Kredi Paketleri</h3><button class="mclose" onclick="closeM('credits')">×</button></div><div class="mbody" style="padding:22px">
 <!-- STEP 1: Paket seçimi -->
 <div id="credsStep1">
  <p style="font-size:14px;color:var(--body);margin-bottom:8px" data-i18n="creds_sub">Her karar vericinin e-posta veya telefonu 1 kredi. Kullanılmayan krediler bir sonraki aya devreder.</p>
  <div style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--chip);border-radius:10px;margin-bottom:16px">
   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
   <span style="font-size:13px;color:var(--body)"><b id="credCurrentBal">47</b> <span data-i18n="creds_current">mevcut krediniz var</span></span>
  </div>
  <div class="creds-grid">
   <div class="creds-pack" data-pack="100" data-price="10" onclick="selectCredPack(this)">
    <div class="cp-n">100</div>
    <div class="cp-l" data-i18n="creds_lbl">Kredi</div>
    <div class="cp-p">$10</div>
    <div class="cp-pp">$0.10 / <span data-i18n="creds_per_lbl">kredi</span></div>
   </div>
   <div class="creds-pack popular selected" data-pack="500" data-price="45" onclick="selectCredPack(this)">
    <div class="cp-n">500</div>
    <div class="cp-l" data-i18n="creds_lbl">Kredi</div>
    <div class="cp-p">$45</div>
    <div class="cp-pp">$0.09 / <span data-i18n="creds_per_lbl">kredi</span> · <span style="color:var(--teal);font-weight:700" data-i18n="creds_save10">%10 avantaj</span></div>
   </div>
   <div class="creds-pack" data-pack="1000" data-price="85" onclick="selectCredPack(this)">
    <div class="cp-n">1000</div>
    <div class="cp-l" data-i18n="creds_lbl">Kredi</div>
    <div class="cp-p">$85</div>
    <div class="cp-pp">$0.085 / <span data-i18n="creds_per_lbl">kredi</span> · <span style="color:var(--teal);font-weight:700" data-i18n="creds_save15">%15 avantaj</span></div>
  </div>
  </div>
  <div class="creds-summary">
   <div class="lb"><span data-i18n="creds_you_get">Alacağınız</span>: <b><span id="credSelPack">500</span> <span data-i18n="creds_lbl">Kredi</span></b></div>
   <div class="vv">$<span id="credSelPrice">45</span></div>
  </div>
  <button class="creds-btn-buy" onclick="proceedToCredsCheckout()">
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
   <span data-i18n="creds_continue">Ödemeye Devam</span> · $<span id="credBuyPrice">45</span>
  </button>
  <p style="font-size:11.5px;color:var(--faint);margin-top:12px;text-align:center">
   🔒 <span data-i18n="creds_secure">Stripe ile güvenli ödeme · 3D Secure</span>
  </p>
 </div>
 <!-- STEP 2: Kart bilgileri ve ödeme -->
 <div id="credsStep2" style="display:none">
  <button onclick="backToCredsPack()" style="background:none;border:none;color:var(--teal);font-size:13px;cursor:pointer;margin-bottom:14px;padding:0;display:inline-flex;align-items:center;gap:5px">
   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
   <span data-i18n="creds_back">Paketlere dön</span>
  </button>
  <div style="background:linear-gradient(135deg,rgba(13,138,128,.08),rgba(143,233,196,.05));border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center">
   <div>
    <div style="font-family:var(--serif);font-size:18px;font-weight:700;color:var(--ink)"><span id="credCoPack">500</span> <span data-i18n="creds_lbl">Kredi</span></div>
    <div style="font-size:12px;color:var(--faint);margin-top:2px" data-i18n="creds_onetime">Tek seferlik ödeme</div>
   </div>
   <div style="font-family:var(--serif);font-size:24px;font-weight:700;color:var(--teal)">$<span id="credCoPrice">45</span></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr;gap:12px">
   <div>
    <label style="display:block;font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em;font-weight:600;margin-bottom:5px" data-i18n="pay_card">Kart Numarası</label>
    <input id="credCoCardNo" type="text" placeholder="4242 4242 4242 4242" maxlength="19" oninput="formatCardNo(this)" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font-family:var(--mono);font-size:14px;background:var(--card);color:var(--ink);box-sizing:border-box"/>
   </div>
   <div>
    <label style="display:block;font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em;font-weight:600;margin-bottom:5px" data-i18n="pay_card_holder_lbl">Kart Sahibi</label>
    <input id="credCoName" type="text" placeholder="AD SOYAD" oninput="this.value=this.value.toUpperCase()" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font-family:var(--sans);font-size:14px;background:var(--card);color:var(--ink);box-sizing:border-box"/ maxlength="200">
   </div>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div>
     <label style="display:block;font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em;font-weight:600;margin-bottom:5px" data-i18n="pay_exp">Son Tarih</label>
     <input id="credCoExp" type="text" placeholder="AA/YY" maxlength="5" oninput="formatExp(this)" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font-family:var(--mono);font-size:14px;background:var(--card);color:var(--ink);box-sizing:border-box"/>
    </div>
    <div>
     <label style="display:block;font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em;font-weight:600;margin-bottom:5px">CVC</label>
     <input id="credCoCvc" type="text" placeholder="123" maxlength="4" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;font-family:var(--mono);font-size:14px;background:var(--card);color:var(--ink);box-sizing:border-box"/>
    </div>
   </div>
  </div>
  <button class="creds-btn-buy" onclick="completeCreditsPurchase()" style="margin-top:20px">
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
   <span data-i18n="pay_btn">Öde</span> · $<span id="credCoBtnPrice">45</span>
  </button>
  <p style="font-size:11.5px;color:var(--faint);margin-top:12px;text-align:center">
   🔒 <span data-i18n="creds_secure">Stripe ile güvenli ödeme · 3D Secure</span>
  </p>
 </div>
</div></div></div>

<div class="modal" id="mKvkk"><div class="mbox legal-mbox"><div class="mhead"><h3><span data-i18n="modal_kvkk_h">KVKK Aydınlatma Metni</span> <span class="ver-tag">v1.2 · 16.08.2026</span></h3><button class="mclose" onclick="closeM('kvkk')" aria-label="Close">×</button></div><div class="mbody legal-body">
 <div class="info-box" style="background:#fef3c7;border-color:#fde68a;color:#78350f" data-i18n="legal_disclaimer"><b>ⓘ</b> Bu doküman Türkçe yasal orijinaldir. Türk hukuku kapsamında bağlayıcıdır. Diğer dillerde bilgilendirme amaçlı özet mevcuttur.</div>
 <div class="info-box"><b>Kanuni Dayanak:</b> 6698 sayılı Kişisel Verilerin Korunması Kanunu (7/4/2016; 7499 s. Kanun ile değişik) ve ikincil mevzuat. Madde atıfları, Kanun'un yürürlükteki metni esas alınarak hazırlanmıştır.</div>
 
 <h4>1.1. Veri Sorumlusu</h4>
 <p>İşbu aydınlatma metni, KVKK'nın 10. maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri sorumlusu sıfatıyla <b>Kervea Ticaret A.Ş.</b> ("Kervea", "Şirket") tarafından hazırlanmıştır.</p>
 <ul>
  <li><b>Ünvan:</b> Kervea Ticaret A.Ş.</li>
  <li><b>Adres:</b> [Şirket Adresi — İstanbul, Türkiye]</li>
  <li><b>MERSİS No:</b> [MERSİS Numarası — atanacak]</li>
  <li><b>E-posta / KEP:</b> destek@kervea.ai · kervea@hs01.kep.tr</li>
  <li><b>Web sitesi:</b> kervea.ai</li>
 </ul>
 
 <h4>1.2. İşlenen Kişisel Veri Kategorileri</h4>
 <ul>
  <li><b>Kimlik verisi:</b> firma yetkilisinin/kullanıcının adı, soyadı, unvanı.</li>
  <li><b>İletişim verisi:</b> e-posta adresi, telefon numarası, iş adresi.</li>
  <li><b>Üyelik ve müşteri işlem verisi:</b> kullanıcı adı, üyelik tipi, temsil edilen firma bilgileri, tercih edilen dil ve pazarlar.</li>
  <li><b>Ticari faaliyet verisi:</b> temsil edilen firmaya ait ürün/sektör bilgisi ile kamuya açık kaynaklardan (Trademap, gümrük istatistikleri) elde edilen ithalat/ihracat geçmişi.</li>
  <li><b>İşlem güvenliği verisi:</b> IP adresi, giriş/çıkış (log) kayıtları, oturum ve cihaz bilgileri, çerez verileri.</li>
  <li><b>Finansal veri</b> (Premium üyelik devreye girdiğinde): fatura bilgileri ve ödeme referansları. <b>Kart bilgileri Kervea tarafından saklanmaz;</b> ödeme, PCI-DSS uyumlu ödeme hizmeti sağlayıcısı (Stripe) altyapısında işlenir.</li>
 </ul>
 <div class="info-box"><b>KVKK kapsamı — önemli ayrım:</b> Platformda gösterilen firma-seviyesi ticaret verileri (tüzel kişiye ait ünvan, sektör, ürün ve ihracat/ithalat istatistikleri), KVKK anlamında kişisel veri DEĞİLDİR ve Kanun kapsamı dışındadır (m.3/d). Kervea'nın KVKK yükümlülükleri esasen (i) firma yetkilisinin iletişim bilgileri ve (ii) şahıs firması niteliğindeki kayıtlar ile sınırlıdır.</div>
 
 <h4>1.3. İşleme Amaçları</h4>
 <ul>
  <li>Üyelik kaydının oluşturulması ve üyelik ilişkisinin yönetilmesi;</li>
  <li>Satıcı ve alıcı firmaların eşleştirilmesine yönelik istihbarat/eşleştirme hizmetinin sunulması;</li>
  <li>Firma bilgilerinin kamuya açık ticaret verileriyle (Trademap, gümrük) teyit edilmesi (doğrulama);</li>
  <li>Kullanıcının <b>açık rızası dâhilinde</b> iletişim bilgilerinin eşleşen kayıtlı firmalara gösterilmesi;</li>
  <li>Talep, öneri ve şikâyetlerin karşılanması ve kullanıcı ile iletişim;</li>
  <li>Platform güvenliğinin sağlanması, kötüye kullanım ve dolandırıcılığın önlenmesi;</li>
  <li>Hizmet kalitesinin ölçülmesi, iyileştirilmesi ve istatistik (kişisel olmayan/kümelenmiş biçimde);</li>
  <li>İlgili mevzuattan doğan yükümlülüklerin yerine getirilmesi.</li>
 </ul>
 
 <h4>1.4. Hukuki Sebepler (KVKK m.5)</h4>
 <ul>
  <li><b>m.5/2-c</b> Sözleşmenin kurulması/ifası — üyelik ve hizmet sunumu için gerekli veriler.</li>
  <li><b>m.5/2-ç</b> Hukuki yükümlülük — mevzuattan doğan saklama/bildirim yükümlülükleri.</li>
  <li><b>m.5/2-e</b> Bir hakkın tesisi, kullanılması veya korunması — uyuşmazlık yönetimi.</li>
  <li><b>m.5/2-f</b> Meşru menfaat — eşleştirme kalitesi, güvenlik ve dolandırıcılığın önlenmesi.</li>
  <li><b>m.5/2-d</b> Alenileştirme — kişinin kendisi tarafından alenileştirilmiş veriler.</li>
  <li><b>m.5/1</b> Açık rıza — iletişim bilgisinin diğer kullanıcılara gösterilmesi ve ticari elektronik ileti.</li>
 </ul>
 
 <h4>1.5. Toplama Yöntemi</h4>
 <p>Kişisel verileriniz; web sitesi ve kayıt/başvuru formları (elektronik ortam), platform kullanımı sırasında otomatik yollarla (çerezler, log kayıtları) ve kamuya açık kaynaklar (Trademap, gümrük istatistikleri) ile firma beyanları aracılığıyla toplanır.</p>
 
 <h4>1.6. Aktarım — Yurt İçi ve Yurt Dışı</h4>
 <h5>Yurt içi aktarım (m.8)</h5>
 <p>Verileriniz; barındırma (hosting), e-posta, analitik ve bilişim hizmeti sağlayıcılarımıza, gerektiğinde hukuki/mali danışmanlara ve yetkili kamu kurumlarına, yalnızca yukarıdaki amaçlarla ve KVKK m.8 çerçevesinde aktarılabilir.</p>
 <h5>Yurt dışı aktarım (m.9)</h5>
 <p>Kervea küresel bir eşleştirme ağı olduğundan yurt dışı aktarım iki farklı akış bakımından değerlendirilir. Genel kural olarak Kurul'un yeterlilik kararı varsa aktarım yapılabilir; yoksa m.9/4'teki uygun güvencelerden biri (özellikle Kurul'ca ilan edilen standart sözleşme, bağlayıcı şirket kuralları veya taahhütname + Kurul izni) sağlanır.</p>
 
 <h4>1.7. İlgili Kişinin Hakları (m.11)</h4>
 <p>KVKK m.11 uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içi/yurt dışı aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini isteme, silme veya yok etme talep etme, düzeltme/silme/yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme, otomatik sistemler vasıtasıyla analiz edilmesi neticesinde aleyhinize bir sonuç çıkmasına itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz.</p>
 
 <div class="warn-box"><b>ÖNEMLİ — HUKUKİ UYARI:</b> Bu metin, KVKK ve ilgili mevzuat esas alınarak hazırlanmış bir TASLAK'tır; hukuki mütalaa veya avukatlık hizmeti değildir. Yayına almadan önce bir veri koruma / bilişim hukuku avukatına inceletiniz.</div>
</div></div></div>

<div class="modal" id="mSozl"><div class="mbox legal-mbox"><div class="mhead"><h3><span data-i18n="modal_sozl_h">Üyelik Sözleşmesi</span> <span class="ver-tag">v1.2 · 16.08.2026</span></h3><button class="mclose" onclick="closeM('sozl')" aria-label="Close">×</button></div><div class="mbody legal-body">
 <div class="info-box" style="background:#fef3c7;border-color:#fde68a;color:#78350f" data-i18n="legal_disclaimer">Bu doküman Türkçe yasal orijinaldir. Türk hukuku kapsamında bağlayıcıdır. Diğer dillerde bilgilendirme amaçlı özet mevcuttur.</div>
 <h4>MADDE 1 — Taraflar</h4>
 <p>İşbu Üyelik Sözleşmesi ("Sözleşme"), bir tarafta <b>Kervea Ticaret A.Ş.</b> ("Kervea") ile diğer tarafta platforma üye olan gerçek/tüzel kişi ("Kullanıcı") arasında elektronik ortamda kurulmuştur.</p>
 
 <h4>MADDE 2 — Tanımlar</h4>
 <ul>
  <li><b>Platform:</b> kervea.ai alan adı ve alt alan adlarında sunulan web/uygulama hizmeti.</li>
  <li><b>Eşleştirme:</b> satıcı ve alıcı firmaların ticaret verileri temelinde birbirine önerilmesi.</li>
  <li><b>Kullanıcı:</b> üyelik oluşturan kişi.</li>
 </ul>
 
 <h4>MADDE 3 — Hizmetin Niteliği</h4>
 <div class="info-box"><b>Kervea bir ticaret istihbarat ve EŞLEŞTİRME ağıdır; bir PAZARYERİ DEĞİLDİR.</b> Platformda alışveriş sepeti, ödeme tahsilatı, komisyon veya taraflar arası mesajlaşma altyapısı sunulmaz. Kervea uygun alıcı/satıcıyı bulup taraflara gösterir; müzakere, sözleşme ve ifa tamamen taraflar arasında ve platform dışında gerçekleşir.</div>
 
 <h4>MADDE 4 — Üyelik Koşulları</h4>
 <p>Kullanıcı, verdiği bilgilerin doğru ve güncel olduğunu; bir firmayı temsilen üye oluyorsa temsil yetkisini haiz olduğunu kabul eder. Hesap güvenliği ve giriş bilgilerinin gizliliği Kullanıcı'nın sorumluluğundadır.</p>
 
 <h4>MADDE 5 — Kullanıcı Yükümlülükleri ve Yasak Kullanımlar</h4>
 <p>Kullanıcı; yanıltıcı/sahte bilgi girmemeyi, üçüncü kişi haklarını ve mevzuatı ihlal etmemeyi, platformdan edindiği iletişim verilerini yalnızca meşru ticari amaçla kullanmayı, toplu veri kazıma (scraping), spam ve platform güvenliğini tehdit eden fiillerden kaçınmayı kabul eder.</p>
 
 <h4>MADDE 6 — Veri Doğruluğu ve Sorumluluğun Sınırı</h4>
 <p>Platformdaki firma ve ticaret bilgileri önemli ölçüde kamuya açık kaynaklardan (<b>Trademap, gümrük</b>) ve firma beyanlarından derlenir. Kervea, bu verilerin kesintisizliği, doğruluğu veya bir ticari sonuç doğuracağı yönünde garanti vermez. Eşleştirme bir öneri niteliğindedir; ticari karar ve risk Kullanıcı'ya aittir. Kervea, taraflar arası ilişkiden ve dolaylı zararlardan sorumlu tutulamaz.</p>
 
 <h4>MADDE 7 — Fikri Mülkiyet</h4>
 <p>Platform, arayüz, marka ("Kervea"), logo, yazılım ve derlenmiş veri tabanının hakları Kervea'ya aittir. Kullanıcı'ya yalnızca hizmetten yararlanma amaçlı, devredilemez ve münhasır olmayan bir kullanım hakkı tanınır.</p>
 
 <h4>MADDE 8 — Ücretlendirme</h4>
 <div class="info-box">Ağ kurma döneminde <b>(2026)</b> yurt dışı kullanıcılardan ücret alınmaz. Ücretli model, Türkiye pazarının açılışıyla <b>Ocak 2028</b>'de devreye alınması planlanmaktadır. Güncel ücret ve Premium kapsamı Üyelik/Fiyatlandırma sayfasında ilan edilir; değişiklikler ileriye etkili uygulanır.</div>
 
 <h4>MADDE 9 — Kişisel Verilerin Korunması</h4>
 <p>Kişisel verilerin işlenmesine ilişkin esaslar, Aydınlatma Metni, Açık Rıza Metni ve Gizlilik/Çerez Politikası'nda düzenlenmiş olup Sözleşme'nin ayrılmaz parçasıdır.</p>
 
 <h4>MADDE 10 — Fesih ve Askıya Alma</h4>
 <p>Kullanıcı üyeliğini dilediği zaman sonlandırabilir. Kervea, Sözleşme'ye veya mevzuata aykırılık hâlinde üyeliği askıya alabilir veya feshedebilir.</p>
 
 <h4>MADDE 11 — Değişiklikler ve Uygulanacak Hukuk</h4>
 <p>Kervea Sözleşme'yi güncelleyebilir. Önemli değişiklikler üyeye e-posta ile bildirilir. İşbu Sözleşme Türk hukukuna tabi olup, uyuşmazlıklarda İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.</p>
</div></div></div>

<div class="modal" id="mCookie"><div class="mbox legal-mbox"><div class="mhead"><h3><span data-i18n="modal_cookie_h">Gizlilik ve Çerez Politikası</span> <span class="ver-tag">v1.2</span></h3><button class="mclose" onclick="closeM('cookie')" aria-label="Close">×</button></div><div class="mbody legal-body">
 <div class="info-box" style="background:#fef3c7;border-color:#fde68a;color:#78350f" data-i18n="legal_disclaimer">Bu doküman Türkçe yasal orijinaldir. Türk hukuku kapsamında bağlayıcıdır. Diğer dillerde bilgilendirme amaçlı özet mevcuttur.</div>
 <h4>Genel İlkeler</h4>
 <p>Kervea kişisel verileri; hukuka ve dürüstlük kurallarına uygun, doğru ve güncel, belirli-açık-meşru amaçlarla, amaçla bağlantılı-sınırlı-ölçülü ve mevzuatın öngördüğü ya da amaç için gerekli süre kadar saklanacak şekilde işler.</p>
 <h4>Veri Güvenliği Tedbirleri</h4>
 <ul>
  <li>Aktarımda ve saklamada şifreleme (<b>TLS 1.3 / HTTPS, AES-256</b>);</li>
  <li>Rol ve yetki bazlı erişim kontrolü, en az yetki ilkesi;</li>
  <li>Erişim ve işlem kayıtlarının (log) tutulması ve izlenmesi;</li>
  <li>Düzenli yedekleme, güncelleme ve sızma/zafiyet testleri;</li>
  <li>Çalışan ve tedarikçilerle gizlilik taahhütleri;</li>
  <li>Veri ihlalinde Kurul'a ve ilgili kişilere en kısa sürede bildirim.</li>
 </ul>
 <h4>Çerezler (Cookies)</h4>
 <ul>
  <li><b>Zorunlu çerezler:</b> oturum, güvenlik ve temel işlevler için gereklidir; devre dışı bırakılamaz.</li>
  <li><b>Tercih çerezleri:</b> dil ve pazar seçimi gibi tercihlerinizi hatırlar.</li>
  <li><b>Analitik çerezler:</b> site kullanımını ölçer; <b>rızanıza tabidir.</b></li>
 </ul>
 <p>Çerez tercihlerinizi site üzerindeki çerez panelinden veya tarayıcı ayarlarınızdan güncelleyebilirsiniz. Zorunlu olmayan çerezler rızanız alınmadan çalıştırılmaz.</p>
</div></div></div>

<div class="modal" id="mPay">
 <div class="mbox kv-pay-box">
  <div class="mhead kv-pay-head">
    <div class="kv-pay-title">
      <div class="kv-pay-badge" data-i18n="pay_badge">KERVEA PREMIUM</div>
      <h3 data-i18n="pay_h">Ödemeyi tamamla</h3>
    </div>
    <button class="mclose" onclick="closeM('pay')" aria-label="Kapat">×</button>
  </div>
  <div class="mbody kv-pay-body">
    
    <!-- Sol: Özet + Kart tercihi -->
    <div class="kv-pay-left">
      <!-- Fiyat özet kartı -->
      <div class="kv-pay-summary">
        <div class="kv-pay-plan-row">
          <span class="kv-pay-plan-lbl" data-i18n="pay_plan_name">Kervea Premium · Yıllık</span>
          <span class="kv-pay-plan-price">$280.00</span>
        </div>
        <div class="kv-pay-plan-sub" data-i18n="pay_plan_sub">Tek plan · Tüm özellikler · Komisyon yok</div>
        
        <div class="kv-pay-divider"></div>
        
        <div class="kv-pay-row">
          <span data-i18n="pay_subtotal">Ara toplam</span>
          <span>$280.00</span>
        </div>
        <div class="kv-pay-row kv-pay-row-muted">
          <span data-i18n="pay_kdv">KDV (%20)</span>
          <span>$56.00</span>
        </div>
        <div class="kv-pay-row kv-pay-row-disc" id="kvPayDiscRow" style="display:none">
          <span data-i18n="pay_disc">İndirim</span>
          <span id="kvPayDisc">−$0.00</span>
        </div>
        <div class="kv-pay-total-row">
          <span data-i18n="pay_total">Toplam</span>
          <span id="kvPayTotal">$336.00</span>
        </div>
      </div>
      
      <!-- Kayıtlı kartlar (yoksa "Kart ekle") -->
      <div class="kv-pay-cards">
        <div class="kv-pay-section-lbl" data-i18n="pay_payment_method">Ödeme yöntemi</div>
        <div class="kv-pay-cards-list" id="kvPayCardsList">
          <!-- Placeholder: yeni kart -->
          <label class="kv-card-item kv-card-item-active">
            <input type="radio" name="kv_payment_card" value="new" checked/>
            <div class="kv-card-info">
              <div class="kv-card-icons">
                <svg viewBox="0 0 40 24" width="32" height="20" aria-hidden="true"><rect width="40" height="24" rx="3" fill="#1a1f71"/><text x="20" y="17" text-anchor="middle" fill="#fff" font-family="Arial Black" font-size="10" font-weight="900" font-style="italic">VISA</text></svg>
                <svg viewBox="0 0 40 24" width="32" height="20" aria-hidden="true"><rect width="40" height="24" rx="3" fill="#fff" stroke="#eee"/><circle cx="16" cy="12" r="7" fill="#eb001b"/><circle cx="24" cy="12" r="7" fill="#f79e1b" opacity=".85"/></svg>
              </div>
              <div class="kv-card-txt">
                <div class="kv-card-nm" data-i18n="pay_new_card">Yeni kart</div>
                <div class="kv-card-sub" data-i18n="pay_new_card_sub">Visa, Mastercard, Amex</div>
              </div>
            </div>
            <div class="kv-card-check">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </label>
        </div>
        
        <!-- Promo kodu -->
        <div class="kv-pay-promo">
          <input type="text" id="kvPayPromo" placeholder="Promosyon kodu (isteğe bağlı)" data-i18n-ph="pay_promo_ph" maxlength="30"/>
          <button type="button" class="btn sm sec" onclick="applyKvPromo()" data-i18n="apply">Uygula</button>
        </div>
      </div>
    </div>
    
    <!-- Sağ: Kart bilgileri formu -->
    <div class="kv-pay-right">
      <!-- Canlı kart önizleme -->
      <div class="card3d" id="ccPreview">
        <div class="brand"><div class="kv">Kervea</div><div class="chip"></div></div>
        <div class="num" id="ccNum">•••• •••• •••• ••••</div>
        <div class="foot">
          <div><div class="lbl" data-i18n="pay_card_holder">KART SAHİBİ</div><div class="val" id="ccName" data-i18n="pay_card_holder_ph">AD SOYAD</div></div>
          <div><div class="lbl" data-i18n="pay_card_exp_short">SON TARİH</div><div class="val" id="ccExp">••/••</div></div>
          <div class="visa">VISA</div>
        </div>
      </div>
      
      <div class="kv-pay-form">
        <label class="fl">
          <span data-i18n="pay_card_holder_name">Kart sahibi adı</span>
          <input type="text" id="kvCcHolder" placeholder="Ad Soyad" data-i18n-ph="pay_card_holder_ph2" maxlength="80" oninput="kvUpdateCardPreview()"/>
        </label>
        <label class="fl">
          <span data-i18n="pay_card_number">Kart numarası</span>
          <input type="text" id="kvCcNumber" placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric" oninput="kvFormatCardNumber(this);kvUpdateCardPreview()"/>
        </label>
        <div class="kv-pay-form-row">
          <label class="fl">
            <span data-i18n="pay_card_exp">Son kullanma</span>
            <input type="text" id="kvCcExp" placeholder="AA/YY" maxlength="5" inputmode="numeric" oninput="kvFormatExp(this);kvUpdateCardPreview()"/>
          </label>
          <label class="fl">
            <span data-i18n="pay_card_cvc">CVC</span>
            <input type="password" id="kvCcCvc" placeholder="123" maxlength="4" inputmode="numeric" pattern="[0-9]{3,4}" autocomplete="cc-csc"/>
          </label>
        </div>
      </div>
      
      <!-- Disclosure: güvenlik bilgisi -->
      <div class="kv-pay-disclosure">
        <div class="kv-pay-disc-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span data-i18n="pay_disc_secure">Kart bilgileriniz Kervea sunucularında saklanmaz. Ödemeler Stripe (PCI-DSS L1) altyapısı üzerinden işlenir.</span>
        </div>
        <div class="kv-pay-disc-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span data-i18n="pay_disc_cancel">İstediğiniz zaman iptal edebilir, 14 gün içinde koşulsuz iade talep edebilirsiniz.</span>
        </div>
      </div>
      
      <!-- Confirm CTA -->
      <button type="button" class="btn kv-pay-cta" id="kvPayConfirmBtn" onclick="kvConfirmPayment()">
        <span class="kv-pay-cta-txt" data-i18n="pay_confirm">Ödemeyi Onayla — <b>$336.00</b></span>
        <span class="kv-pay-cta-loading" style="display:none">
          <svg class="kv-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/></svg>
          <span data-i18n="pay_processing">İşleniyor…</span>
        </span>
      </button>
    </div>
    
  </div>
 </div>
</div>
<div class="modal gate-modal" id="mGate"><div class="mbox"><button class="mclose" onclick="closeM('gate')" style="position:absolute;right:12px;top:12px;z-index:10">×</button><div id="gateBody" class="mbody" style="padding:0"></div></div></div>
<!-- Team Management Modals -->
<div class="tm-modal-back" id="tmBack" onclick="closeTmModal()"></div>

<!-- Invite User Modal -->
<div class="tm-modal" id="tmInviteModal" role="dialog" aria-modal="true">
 <div class="mh">
  <h3 data-i18n="tm_inv_h">Yeni Kullanıcı Davet Et</h3>
  <p data-i18n="tm_inv_sub">Firmanıza yeni bir ekip üyesi ekleyin. Davet e-postayla gönderilir; kullanıcı kabul ettiğinde aktif olur.</p>
  <button class="mx" onclick="closeTmModal()">×</button>
 </div>
 <div class="mb">
  <div class="fld"><label data-i18n="tm_fld_name">Ad Soyad *</label><input type="text" id="tmInvName" data-i18n-ph="ph_tm_name" placeholder="Örn. Ahmet Kaya"/ maxlength="200"></div>
  <div class="fld"><label data-i18n="tm_fld_email">E-posta *</label><input type="email" id="tmInvEmail" data-i18n-ph="ph_tm_email" placeholder="ahmet@firma.com"/ maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"></div>
  <div class="fld"><label data-i18n="tm_fld_role">Rol *</label>
   <div class="tm-role-choice" id="tmRoleChoice">
    <div class="rc" data-role="admin" onclick="pickInvRole(this,'admin')"><b data-i18n="tm_role_admin">Yönetici</b><span data-i18n="tm_role_admin_desc">Tüm modüller · davet edebilir</span></div>
    <div class="rc on" data-role="sales" onclick="pickInvRole(this,'sales')"><b data-i18n="tm_role_sales">Satış</b><span data-i18n="tm_role_sales_desc">Mesajlaşma + Kişiler</span></div>
    <div class="rc" data-role="ops" onclick="pickInvRole(this,'ops')"><b data-i18n="tm_role_ops">Operasyon</b><span data-i18n="tm_role_ops_desc">Profil + Belgeler</span></div>
    <div class="rc" data-role="view" onclick="pickInvRole(this,'view')"><b data-i18n="tm_role_view">Sadece Görüntüleme</b><span data-i18n="tm_role_view_desc">Yalnızca okuma erişimi</span></div>
   </div>
  </div>
  <div style="padding:12px;background:var(--paper);border-radius:9px;font-size:12.5px;color:var(--body);line-height:1.5;display:flex;gap:10px;align-items:flex-start">
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2" style="flex:0 0 auto;margin-top:1px"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
   <span data-i18n="tm_inv_info">Rolü sonradan değiştirebilirsin. Bu kullanıcı <b>4/10 koltuk</b> kullanımınızın 5.'si olacak.</span>
  </div>
 </div>
 <div class="mf">
  <button class="btn sec" onclick="closeTmModal()" data-i18n="btn_cancel">İptal</button>
  <button class="btn" onclick="submitInvite()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span data-i18n="tm_btn_invite">Davet Gönder</span></button>
 </div>
</div>

<!-- Permissions Editor Modal -->
<div class="tm-modal" id="tmPermModal" role="dialog" aria-modal="true">
 <div class="mh">
  <h3 data-i18n="tm_perm_h">Rol ve İzinleri Düzenle</h3>
  <p id="tmPermSub" data-i18n="tm_perm_sub">Bu kullanıcının erişebileceği modülleri belirleyin.</p>
  <button class="mx" onclick="closeTmModal()">×</button>
 </div>
 <div class="mb">
  <div class="tm-user-preview" id="tmPermUser"></div>
  <div class="fld"><label data-i18n="tm_lbl_role">Rol</label>
   <div class="tm-role-choice" id="tmPermRoleChoice">
    <div class="rc" data-role="admin" onclick="pickPermRole(this,'admin')"><b data-i18n="tm_role_admin">Yönetici</b><span data-i18n="tm_role_admin_short">Tüm modüller</span></div>
    <div class="rc" data-role="sales" onclick="pickPermRole(this,'sales')"><b data-i18n="tm_role_sales">Satış</b><span data-i18n="tm_role_sales_short">Mesaj + Kişiler</span></div>
    <div class="rc" data-role="ops" onclick="pickPermRole(this,'ops')"><b data-i18n="tm_role_ops">Operasyon</b><span data-i18n="tm_role_ops_desc">Profil + Belgeler</span></div>
    <div class="rc" data-role="view" onclick="pickPermRole(this,'view')"><b data-i18n="tm_role_view">Sadece Görüntüleme</b><span data-i18n="tm_role_view_short">Okuma</span></div>
   </div>
  </div>
  <div class="fld"><label data-i18n="tm_lbl_perms">İzinler</label>
   <div class="tm-perm-grid" id="tmPermGrid">
    <div class="tm-perm-item checked" data-p="messages" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_msg">Mesajlaşma</b><span data-i18n="tm_perm_msg_desc">Tüm konuşmalara erişim, mesaj gönderme ve dosya paylaşımı.</span></div></div>
    <div class="tm-perm-item checked" data-p="matches" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_match">Eşleşmeler & Kişiler</b><span data-i18n="tm_perm_match_desc">AI eşleşme önerilerini görüntüle, kişi kredilerini kullan.</span></div></div>
    <div class="tm-perm-item" data-p="profile" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_prof">Firma Profili</b><span data-i18n="tm_perm_prof_desc">Firma bilgilerini, galeriyi, sosyal medya bağlantılarını düzenle.</span></div></div>
    <div class="tm-perm-item" data-p="docs" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_docs">Belgeler</b><span data-i18n="tm_perm_docs_desc">Sertifika, vergi levhası, KEP evraklarını yükle ve onayla.</span></div></div>
    <div class="tm-perm-item" data-p="analytics" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_ana">Analitik</b><span data-i18n="tm_perm_ana_desc">Ağ erişimi, dönüşüm oranı, rakip karşılaştırması ve raporlar.</span></div></div>
    <div class="tm-perm-item" data-p="team" onclick="tmTogglePerm(this)"><div class="cx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><div><b data-i18n="tm_perm_team">Ekip Yönetimi</b><span data-i18n="tm_perm_team_desc">Yeni kullanıcı davet et, rol ata, hesapları devre dışı bırak.</span></div></div>
   </div>
  </div>
 </div>
 <div class="mf">
  <button class="btn sec" onclick="closeTmModal()" data-i18n="btn_cancel">İptal</button>
  <button class="btn" onclick="savePermissions()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span data-i18n="tm_btn_save">Değişiklikleri Kaydet</span></button>
 </div>
</div>

<!-- Person Detail Drawer (Prospeo-style side sheet) -->
<div class="pdrawer-back" id="pdBack" onclick="closePersonDrawer()"></div>
<div class="pdrawer" id="pdDrawer" role="dialog" aria-modal="true">
 <div class="pd-hd">
  <button class="pd-close" onclick="closePersonDrawer()">×</button>
  <div id="pdHd"></div>
 </div>
 <div class="pd-body" id="pdBody"></div>
 <div class="pd-actions" id="pdActs"></div>
</div>

<div class="toast" id="tst" data-i18n="toast_saved">Kaydedildi</div>
@endverbatim
