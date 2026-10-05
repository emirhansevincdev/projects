@verbatim
<section id="add" class="view">
 <div class="wrap">
  <div class="stp-hd-new">
   <div>
    <h1 data-i18n="add_h">Firmanı Ekle</h1>
    <p class="stp-sub" data-i18n="add_p">6 adımda küresel görünürlük. Her adım kaydedilir; istediğin an dönebilirsin.</p>
   </div>
   <button class="stp-save" onclick="toast((T[LANG]&&T[LANG].add_draft_saved)||'Taslak kaydedildi — devam etmek için giriş yapın')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span data-i18n="add_draft_btn">Sonra Devam Et</span></button>
  </div>
  <div class="stp-progress" data-step="1" id="stpProg">
   <div class="stp-progress-fill" id="stpFill" style="width:0"></div>
   <div class="stp-node active" onclick="stp(1)"><div class="st-cir">1</div><div class="st-lb" data-i18n="s1">Firma</div></div>
   <div class="stp-node" onclick="stp(2)"><div class="st-cir">2</div><div class="st-lb" data-i18n="s2">Sektör</div></div>
   <div class="stp-node" onclick="stp(3)"><div class="st-cir">3</div><div class="st-lb" data-i18n="s3_media">Logo</div></div>
   <div class="stp-node" onclick="stp(4)"><div class="st-cir">4</div><div class="st-lb" data-i18n="s4_social">Sosyal</div></div>
   <div class="stp-node" onclick="stp(5)"><div class="st-cir">5</div><div class="st-lb" data-i18n="s5_doc">Belge</div></div>
   <div class="stp-node" onclick="stp(6)"><div class="st-cir">6</div><div class="st-lb" data-i18n="s6_pub">Yayın</div></div>
  </div>
  <div class="sec">
   <div class="form">
    <!-- STEP 1: Company -->
    <div class="panelstep on" id="ps1">
     <div class="fg">
      <div><label class="fl" data-i18n="fl_cname">Firma Adı *</label><input maxlength="200" data-i18n-ph="ph_cname" placeholder="Örn. XYZ Ticaret A.Ş."/></div>
      <div><label class="fl" data-i18n="fl_ctitle">Ticari Ünvan (EN)</label><input maxlength="200" placeholder="Kervea Trading Ltd."/></div>
      <div><label class="fl" data-i18n="fl_tax">Vergi No / Tax ID *</label><input maxlength="200" placeholder="TR-1234567890"/></div>
      <div><label class="fl" data-i18n="fl_mersis">MERSIS / Sicil No</label><input maxlength="200" placeholder="0123-4567-8901-2345"/></div>
      <div><label class="fl" data-i18n="fl_year">Kuruluş Yılı *</label><input type="number" placeholder="2015"/ min="0" max="999999999"></div>
      <div><label class="fl" data-i18n="fl_emp">Çalışan Sayısı</label><select><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></div>
      <div><label class="fl" data-i18n="fl_country">Ülke *</label><div id="ddAddCountry"></div></div>
      <div><label class="fl" data-i18n="fl_city">Şehir</label><div id="ddAddCity"></div></div>
      <div><label class="fl" data-i18n="fl_web">Web Sitesi</label><input maxlength="200" placeholder="https://"/></div>
      <div><label class="fl" data-i18n="fl_kep">KEP Adresi</label><input maxlength="200" placeholder="firma@hs01.kep.tr"/></div>
      <div><label class="fl" data-i18n="fl_email">E-posta *</label><input type="email" placeholder="info@..."/ maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"></div>
      <div><label class="fl" data-i18n="fl_phone">Telefon *</label><input maxlength="200" placeholder="+90 212 xxx xx xx"/></div>
      <div><label class="fl" data-i18n="fl_repname">Yetkili Adı *</label><input maxlength="200" data-i18n-ph="ph_fullname" placeholder="Ad Soyad"/></div>
      <div><label class="fl" data-i18n="fl_reptitle">Yetkili Ünvanı</label><input maxlength="200" data-i18n-ph="ph_gm" placeholder="Genel Müdür"/></div>
     </div>
     <label class="fl" data-i18n="fl_address">Firma Adresi</label>
     <textarea maxlength="4000" rows="2" data-i18n-ph="ph_address" placeholder="Cadde, No, Semt / İlçe / Şehir / Ülke"></textarea>
    </div>
    <!-- STEP 2: Sector -->
    <div class="panelstep" id="ps2">
     <div class="fg">
      <div><label class="fl" data-i18n="fl_sec">Ana Sektör *</label><select id="addSecSel" onchange="renderAddSecChip()"></select><div id="addSecChip" style="margin-top:8px"></div></div>
      <div><label class="fl" data-i18n="fl_dir">Ticaret Yönü *</label><select><option value="EXP" data-i18n="dir_exp">Satıyorum (İhracat)</option><option value="IMP" data-i18n="dir_imp">Alıyorum (İthalat)</option><option data-i18n="dir_both">Her ikisi</option></select></div>
      <div><label class="fl" data-i18n="fl_hs">HS Kodu (virgülle)</label><input maxlength="200" placeholder="5205, 5208, 9403"/></div>
      <div><label class="fl" data-i18n="fl_moq">MOQ (Minimum Sipariş)</label><input maxlength="200" placeholder="10 ton / 1000 adet"/></div>
      <div><label class="fl" data-i18n="fl_inc">INCOTERM Tercihi</label><select><option>FOB</option><option>CIF</option><option>DAP</option><option>EXW</option><option>FCA</option><option>DDP</option></select></div>
      <div><label class="fl" data-i18n="fl_pay">Ödeme Şekli</label><select><option>LC</option><option data-i18n="pay_tt_cash">TT Peşin</option><option data-i18n="pay_tt_30">TT 30 gün</option><option data-i18n="pay_tt_60">TT 60 gün</option><option>CAD</option></select></div>
     </div>
     <label class="fl" data-i18n="fl_products">Ana Ürünler / Hizmetler</label>
     <input maxlength="200" data-i18n-ph="ph_products" placeholder="Örn. Pamuk ipliği, Dokuma kumaş, Örme kumaş"/>
     <label class="fl" data-i18n="fl_desc">Firma Açıklaması *</label>
     <textarea maxlength="4000" rows="5" data-i18n-ph="ph_desc" placeholder="Firmanızı, üretim kapasitenizi, ihracat pazarlarınızı bir paragrafta anlatın..."></textarea>
     <label class="fl" data-i18n="fl_certs">Sertifikalar</label>
     <input maxlength="200" placeholder="ISO 9001, ISO 14001, GOTS, HACCP..."/>
    </div>
    <!-- STEP 3: Logo + Gallery -->
    <div class="panelstep" id="ps3">
     <div class="logoup">
      <div class="box" id="addLogoBox">KT</div>
      <div class="info">
       <b data-i18n="logo_h">Firma Logosu *</b>
       <span data-i18n="logo_hint">Önerilen: 400×400px, PNG/JPG/SVG, max 2MB</span>
       <div style="display:flex;gap:6px"><button type="button" class="btn sm" onclick="document.getElementById('addLogoFile').click()" data-i18n="upload">Yükle</button><button type="button" class="btn sm sec" onclick="document.getElementById('addLogoBox').innerHTML='KT';toast((T[LANG]&&T[LANG].toast_logo_removed)||'Logo kaldırıldı')" data-i18n="remove">Kaldır</button></div>
       <input type="file" id="addLogoFile" accept="image/*" style="display:none" onchange="uploadAddLogo(event)"/>
      </div>
     </div>

     <label class="fl" data-i18n="cover_h">Kapak Görseli</label>
     <div class="upl2" onclick="document.getElementById('addCoverFile').click()">
      <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg></div>
      <div class="tt" data-i18n="cover_tt">Kapak fotoğrafını yükle</div>
      <div class="st" data-i18n="cover_st">Firma sayfanızın üstünde görünecek · 1600×400px önerilen · max 5MB</div>
      <input type="file" id="addCoverFile" accept="image/*" onchange="toast((T[LANG]&&T[LANG].toast_cover_uploaded)||'Kapak yüklendi')"/>
     </div>

     <label class="fl" style="margin-top:8px" data-i18n="gal_h">Ürün / Tesis Fotoğrafları (max 12)</label>
     <div class="upl2" onclick="document.getElementById('addGalFile').click()">
      <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
      <div class="tt" data-i18n="gal_tt">Görselleri sürükle-bırak veya seç</div>
      <div class="st" data-i18n="gal_st">JPG, PNG, WEBP · her biri max 5MB · toplam 12 görsel</div>
      <input type="file" id="addGalFile" accept="image/*" multiple onchange="previewGallery(event)"/>
     </div>
     <div class="galpreview" id="addGalPrev"></div>
    </div>

    <!-- STEP 4: Social Media & Links -->
    <div class="panelstep" id="ps4">
     <p style="color:var(--faint);font-size:13.5px;margin-bottom:16px" data-i18n="social_intro">Sosyal medya ve iletişim kanallarınız — alıcılar buradan size ulaşacak.</p>
     <div class="social-grid">
      <div class="social-inp"><div class="pref"><svg fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>WhatsApp</div><input maxlength="200" placeholder="+90 5xx xxx xx xx"/></div>
      <div class="social-inp"><div class="pref"><svg fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</div><input maxlength="200" placeholder="linkedin.com/company/..."/></div>
      <div class="social-inp"><div class="pref"><svg viewBox="0 0 24 24"><defs><linearGradient id="ig1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f09433"/><stop offset=".3" stop-color="#e6683c"/><stop offset=".6" stop-color="#dc2743"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path fill="url(#ig1)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>Instagram</div><input maxlength="200" placeholder="@kullaniciadi"/></div>
      <div class="social-inp"><div class="pref"><svg fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</div><input maxlength="200" placeholder="facebook.com/..."/></div>
      <div class="social-inp"><div class="pref"><svg fill="#000" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X (Twitter)</div><input maxlength="200" placeholder="@kullaniciadi"/></div>
      <div class="social-inp"><div class="pref"><svg fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</div><input maxlength="200" placeholder="youtube.com/@..."/></div>
     </div>
    </div>

    <!-- STEP 5: Documents & Consent -->
    <div class="panelstep" id="ps5">
     <label class="fl" data-i18n="doc_h">Belgeler *</label>
     <div class="upl" onclick="this.querySelector('input').click()"><span data-i18n="doc_txt">📄 Faaliyet Belgesi, Sicil Gazetesi, İmza Sirküleri, Kalite Sertifikaları</span><input type="file" multiple/ accept="image/jpeg,image/png,image/webp,application/pdf"></div>
     <p class="hint" data-i18n="doc_hint">PDF, JPG, PNG · her dosya max 10MB · en fazla 20 belge</p>
     <div class="consent kv-consent-wrap" style="margin-top:16px">
      <div class="kv-consent-hd">
        <div class="kv-consent-hd-t" data-i18n="consent_hd">Yasal onaylar ve tercihler</div>
        <div class="kv-consent-hd-s" data-i18n="consent_hd_sub">Firma kaydınızı tamamlamak için aşağıdaki zorunlu maddeleri onaylayın.</div>
      </div>
      
      <div class="kv-ck-item">
        <input type="checkbox" id="cx1" class="kv-ck-input" onchange="kvUpdateConsentState()"/>
        <label for="cx1" class="kv-ck-label">
          <span class="kv-ck-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="kv-ck-text">
            <span class="kv-ck-title" data-i18n="consent_kvkk_t">KVKK Aydınlatma Metni</span>
            <span class="kv-ck-desc" data-i18n="consent_kvkk_d">Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini okudum ve anladım. <a onclick="openM('kvkk');return false" href="#" class="kv-ck-link" data-i18n="consent_read">Metni oku</a></span>
          </span>
        </label>
        <span class="kv-ck-req" data-i18n="consent_req">Zorunlu</span>
      </div>
      
      <div class="kv-ck-item">
        <input type="checkbox" id="cx2" class="kv-ck-input" onchange="kvUpdateConsentState()"/>
        <label for="cx2" class="kv-ck-label">
          <span class="kv-ck-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="kv-ck-text">
            <span class="kv-ck-title" data-i18n="consent_terms_t">Kullanıcı Sözleşmesi</span>
            <span class="kv-ck-desc" data-i18n="consent_terms_d">Kervea kullanıcı sözleşmesinin ve platform kullanım koşullarının tamamını okudum. <a onclick="openM('sozl');return false" href="#" class="kv-ck-link" data-i18n="consent_read">Metni oku</a></span>
          </span>
        </label>
        <span class="kv-ck-req" data-i18n="consent_req">Zorunlu</span>
      </div>
      
      <div class="kv-ck-item">
        <input type="checkbox" id="cx3" class="kv-ck-input" onchange="kvUpdateConsentState()"/>
        <label for="cx3" class="kv-ck-label">
          <span class="kv-ck-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="kv-ck-text">
            <span class="kv-ck-title" data-i18n="consent_verify_t">Doğrulama izni</span>
            <span class="kv-ck-desc" data-i18n="consent_verify_d">Verilerimin sicil ve doğrulama amacıyla resmi kaynaklardan kontrol edilmesine izin veriyorum.</span>
          </span>
        </label>
        <span class="kv-ck-req" data-i18n="consent_req">Zorunlu</span>
      </div>
      
      <div class="kv-ck-item">
        <input type="checkbox" id="cx4" class="kv-ck-input"/>
        <label for="cx4" class="kv-ck-label">
          <span class="kv-ck-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="kv-ck-text">
            <span class="kv-ck-title" data-i18n="consent_marketing_t">E-posta bildirimleri</span>
            <span class="kv-ck-desc" data-i18n="consent_marketing_d">Kervea platform güncellemeleri, sektör raporları ve fırsat bültenleri hakkında e-posta bildirimi almak istiyorum.</span>
          </span>
        </label>
        <span class="kv-ck-opt" data-i18n="consent_opt">İsteğe bağlı</span>
      </div>
      
      <div class="kv-consent-foot">
        <button type="button" class="btn sec sm" onclick="kvResetConsents()" data-i18n="consent_reset">Sıfırla</button>
        <button type="button" class="btn sm" id="kvConsentContinue" disabled onclick="kvContinueConsents()" data-i18n="consent_continue">Kaydı tamamla</button>
      </div>
     </div>
    </div>

    <!-- STEP 6: Publish + Promo -->
    <div class="panelstep" id="ps6">
     <div style="text-align:center;padding:20px 20px 10px">
      <div style="font-size:52px;margin-bottom:10px">🎉</div>
      <h3 style="font-size:22px;margin-bottom:6px" data-i18n="pub_h">Başvurunuz alındı</h3>
      <p style="color:var(--faint);font-size:14px;max-width:480px;margin:0 auto 20px" data-i18n="pub_p">Manuel doğrulama 24-48 saat içinde tamamlanır. Yayın hazır olduğunda e-posta ve SMS ile bilgilendirileceksiniz.</p>
     </div>
     <div class="promobox" style="max-width:520px;margin:10px auto 0">
      <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
      <div class="txt"><b data-i18n="promo_h">Promosyon Kodun mu var?</b><span data-i18n="promo_s">İlk 3 ay Pro plana %30 indirim.</span></div>
      <input maxlength="200" placeholder="KERVEA2026" id="addPromo"/>
      <button class="btn sm" onclick="applyPromo('addPromo')" data-i18n="apply">Uygula</button>
     </div>
    </div>

    <div class="stepnav-pro">
     <div class="snp-left">
      <button class="snp-btn snp-prev" onclick="stp(-1)" id="snpPrevBtn">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 18 9 12 15 6"/></svg>
       <span data-i18n="step_prev">Önceki</span>
      </button>
     </div>
     <div class="snp-mid">
      <div class="snp-num"><span id="snpNumCur">1</span> <em>/ 6 <span data-i18n="step_of">·</span> <span id="snpNumLbl" data-i18n="s1">Firma</span></em></div>
      <div class="snp-bar"><div class="snp-bar-fill" id="snpBarFill" style="width:16.66%"></div></div>
     </div>
     <div class="snp-right">
      <button class="snp-btn snp-next" onclick="stp(0)" id="snpNextBtn">
       <span id="snpNextTxt" data-i18n="step_next">Sonraki</span>
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
     </div>
    </div>
   </div>
  </div>
 </div>
</section>

<!-- PRICING -->
@endverbatim
