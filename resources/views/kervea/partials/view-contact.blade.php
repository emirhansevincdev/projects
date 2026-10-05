@verbatim
<section id="contact" class="view">
 <div class="wrap">
  <div class="ph"><h1 data-i18n="ct_h">İletişim</h1><p data-i18n="ct_p">Sorularınız için buradayız.</p></div>
  <div class="sec two">
   <div class="form">
    <div class="fg">
     <div><label class="fl" data-i18n="ct_name">Ad Soyad</label><input maxlength="200" data-i18n-ph="ct_ph_name" placeholder="Adınız"/></div>
     <div><label class="fl" data-i18n="ct_email">E-posta</label><input type="email" data-i18n-ph="ct_ph_email" placeholder="you@..."/ maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"></div>
    </div>
    <label class="fl" data-i18n="ct_subject">Konu</label><input maxlength="200" data-i18n-ph="ct_ph_subject" placeholder="Nasıl yardımcı olabiliriz?"/>
    <label class="fl" data-i18n="fl_yourmsg">Mesajınız</label><textarea maxlength="4000" rows="5"></textarea>
    <button class="btn" onclick="toast((T[LANG]&&T[LANG].toast_msg_sent)||'Mesajınız iletildi')" data-i18n="btn_send">Gönder</button>
   </div>
   <div class="dcard">
    <h3 data-i18n="ct_center">Merkez</h3>
    <p style="font-size:14px;color:var(--body);margin-bottom:16px">Kervea Ticaret A.Ş.<br/>Levent, İstanbul, Türkiye</p>
    <p style="font-size:14px;color:var(--body)"><b data-i18n="ct_email_lbl">E-posta:</b> hello@kervea.io<br/><b data-i18n="ct_phone_lbl">Telefon:</b> +90 212 xxx xx xx</p>
   </div>
  </div>
 </div>


  <!-- ═══ Newsletter Subscribe (Form9 adaptasyonu) ═══ -->
  <div class="kv-newsletter">
    <div class="kv-nl-inner">
      <div class="kv-nl-text">
        <div class="kv-nl-tag" data-i18n="nl_tag">PİLOT GÜNCELLEMELERİ</div>
        <h3 class="kv-nl-h" data-i18n="nl_h">İlk 10 üye ilan edildiğinde haberdar olun</h3>
      </div>
      <form class="kv-nl-form" onsubmit="kvSubscribeNewsletter(event)">
        <div class="kv-nl-input-wrap">
          <svg class="kv-nl-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input type="email" id="kvNlEmail" class="kv-nl-input" placeholder=" " required maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"/>
          <label class="kv-nl-lbl" for="kvNlEmail" data-i18n="nl_ph">E-posta adresiniz</label>
        </div>
        <button type="submit" class="btn kv-nl-btn">
          <span data-i18n="nl_submit">Abone ol</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </form>
      <div class="kv-nl-trust">
        <span class="kv-nl-trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          <span data-i18n="nl_trust1">Spam yok</span>
        </span>
        <span class="kv-nl-trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span data-i18n="nl_trust2">KVKK uyumlu</span>
        </span>
        <span class="kv-nl-trust-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          <span data-i18n="nl_trust3">Tek tık iptal</span>
        </span>
      </div>
    </div>
  </div>
</section>

<!-- LOGIN -->
@endverbatim
