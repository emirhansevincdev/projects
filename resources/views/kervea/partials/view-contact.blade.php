@verbatim
<section id="contact" class="view">
 <div class="wrap">
  <div class="ph"><h1 data-i18n="ct_h">İletişim</h1><p data-i18n="ct_p">Soru, öneri ya da sorun için yazın; en kısa sürede dönüş yapıyoruz.</p></div>
  <div class="sec two">
   <div class="form">
    <div class="fg">
     <div><label class="fl" data-i18n="ct_name">Ad Soyad</label><input maxlength="200" data-i18n-ph="ct_ph_name" placeholder="Adınız"/></div>
     <div><label class="fl" data-i18n="ct_email">E-posta</label><input type="email" data-i18n-ph="ct_ph_email" placeholder="you@..."/ maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"></div>
    </div>
    <label class="fl" data-i18n="ct_subject">Konu</label><input maxlength="200" data-i18n-ph="ct_ph_subject" placeholder="Nasıl yardımcı olabiliriz?"/>
    <label class="fl" data-i18n="fl_yourmsg">Mesajınız</label><textarea maxlength="4000" rows="5"></textarea>
    <button class="btn" type="button" data-i18n="btn_send">Gönder</button>
   </div>
   <div class="dcard">
    <h3 data-i18n="ct_center">Kervea</h3>
    <p style="font-size:14px;color:var(--body);margin-bottom:16px"><b data-i18n="ct_addr_lbl">Adres:</b> <span class="kv-todo" data-i18n="abo_co_todo">[Eklenecek]</span></p>
    <p style="font-size:14px;color:var(--body)"><b data-i18n="ct_email_lbl">E-posta:</b> <a href="mailto:hello@kervea.ai">hello@kervea.ai</a><br/><b data-i18n="ct_phone_lbl">Telefon:</b> <span class="kv-todo" data-i18n="abo_co_todo">[Eklenecek]</span></p>
   </div>
  </div>
 </div>


  <!-- ═══ Bülten: POST /kv/newsletter (e-posta + onay kanıtı sunucuda saklanır) ═══ -->
  <div class="kv-newsletter">
    <div class="kv-nl-inner">
      <div class="kv-nl-text">
        <div class="kv-nl-tag" data-i18n="nl_tag">DUYURULAR</div>
        <h3 class="kv-nl-h" data-i18n="nl_h">Yeni özellikler ve duyurular için e-posta bırakın</h3>
      </div>
      <form class="kv-nl-form" id="kvNlForm" novalidate>
        <div class="kv-nl-input-wrap">
          <svg class="kv-nl-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input type="email" id="kvNlEmail" class="kv-nl-input" placeholder=" " required maxlength="254" autocomplete="email" inputmode="email"/>
          <label class="kv-nl-lbl" for="kvNlEmail" data-i18n="nl_ph">E-posta adresiniz</label>
        </div>
        <button type="submit" class="btn kv-nl-btn" id="kvNlBtn">
          <span data-i18n="nl_submit">Abone ol</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <input type="text" id="kvNlWebsite" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0"/>
        <label class="kv-nl-consent"><input type="checkbox" id="kvNlConsent"/> <span data-i18n="nl_consent">Duyuru e-postaları almayı kabul ediyorum. İstediğim zaman çıkarılmayı isteyebilirim.</span></label>
        <p class="kv-nl-status" id="kvNlStatus" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>

<!-- LOGIN -->
@endverbatim
