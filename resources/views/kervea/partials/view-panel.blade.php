@verbatim
<section id="panel" class="view">
 <div class="wrap">
  <div class="ph"><h1 data-i18n="pn_h">Firma Paneli</h1><p data-i18n="pn_p">Profil, eşleşme ve mesajlarınızı yönetin.</p></div>
  <div class="dash">
   <div class="dmenu">
    <a class="on" onclick="showPanel('overview',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><span data-i18n="p_over">Genel Bakış</span></a>
    <a onclick="showPanel('matches',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span data-i18n="p_matches">Eşleşmeler</span></a>
    <a onclick="showPanel('profile',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span data-i18n="p_profile">Firma Profilim</span></a>
    <a onclick="showPanel('messages',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span data-i18n="p_msgs">Mesajlar</span><span class="dm-badge" id="dmMsgBadge" hidden></span></a>
    <a onclick="showPanel('people',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg><span data-i18n="p_people">Kişiler</span><span class="dm-badge kv-cr-badge" id="kvPplBadge" hidden title="Kredi"></span></a>
    <a onclick="showPanel('analytics',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span data-i18n="p_ana">Analiz</span></a>
    <a onclick="showPanel('docs',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><span data-i18n="p_docs">Belgelerim</span></a>
    <a onclick="showPanel('team',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M22 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg><span data-i18n="p_team">Ekip</span></a>
    <a onclick="showPanel('activity',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg><span data-i18n="p_activity">Aktivite</span></a>
    <a onclick="showPanel('prospect',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span data-i18n="p_pros">Prospektüs</span></a>
    <div class="sep2"></div>
    <a onclick="showPanel('settings',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg><span data-i18n="p_set">Ayarlar</span></a>
    <a onclick="doLogout()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span data-i18n="p_out">Çıkış</span></a>
   </div>
   <div>
    {{-- OVERVIEW --}}
    <div class="dpanel on" id="dp-overview">
     {{-- Hoş geldin: ad ve doğrulama durumu sunucudan gelir (kervea-api.js fillOverview) --}}
     <div class="ov-welcome">
       <div class="ov-welcome-t">
         <h2 class="ov-welcome-h"><span data-i18n="ov_greeting">Merhaba</span>, <span id="ovUserName"></span></h2>
         <div class="ov-welcome-badges">
           <span class="ov-badge ov-badge-warn" id="ovVerifyBadge">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             <span data-kvt>Durum yükleniyor…</span>
           </span>
         </div>
       </div>
       <div class="ov-welcome-ctas">
         <button class="btn ov-cta-primary" type="button" onclick="showPanel('profile')">
           <span data-kvt>Profili düzenle</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
         </button>
         <button class="btn sec ov-cta-secondary" type="button" onclick="kvExportData()">
           <span data-i18n="ov_cta_export">Verileri İndir</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         </button>
       </div>
     </div>

     {{-- Sayılar: yalnızca gerçek veri; veri yoksa "—" --}}
     <div class="ov-stats">
       <div class="ov-stat-card">
         <div class="ov-stat-hd"><div class="ov-stat-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><div class="ov-stat-lbl" data-i18n="ov_stat_matches">Eşleşme</div></div>
         <div class="ov-stat-val" id="ovStatMatches">—</div>
         <div class="ov-stat-sub" id="ovStatMatchesSub"></div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd"><div class="ov-stat-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div><div class="ov-stat-lbl" data-kvt>Profil doluluğu</div></div>
         <div class="ov-stat-val" id="ovStatProfile">—</div>
         <div class="ov-stat-sub" id="ovStatProfileSub"></div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd"><div class="ov-stat-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div><div class="ov-stat-lbl" data-i18n="ov_stat_views">Profil Görüntülenme</div></div>
         <div class="ov-stat-val">—</div>
         <div class="ov-stat-sub"></div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd"><div class="ov-stat-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div><div class="ov-stat-lbl" data-i18n="ov_stat_verif">Doğrulama Seviyesi</div></div>
         <div class="ov-stat-val ov-stat-val-txt" id="ovStatVerify">—</div>
         <div class="ov-stat-sub" id="ovStatVerifySub"></div>
       </div>
     </div>

     <div class="ov-portfolio-grid">
       <div class="ov-portfolio">
         <div class="ov-section-hd">
           <h3 data-i18n="ov_port_h">Firma Portföyünüz</h3>
           <button class="btn sec sm" type="button" onclick="showPanel('matches')">
             <span data-i18n="ov_port_all">Tümünü Gör</span>
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
           </button>
         </div>
         <div class="ov-portfolio-empty">
           <div class="ov-empty-ico">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           </div>
           <div class="ov-empty-t" data-i18n="ov_port_empty_h">Henüz aktif firma eşleşmesi yok</div>
           <div class="ov-empty-p" data-i18n="ov_port_empty_p">Firma başvurunuz onaylandığında, sektörünüze ve HS kodlarınıza göre eşleşen firmalar burada listelenir.</div>
         </div>
       </div>
       <div class="ov-next">
         <div class="ov-section-hd"><h3 data-kvt>Sonraki adımlar</h3></div>
         <ul class="ov-next-list" id="ovNext"></ul>
       </div>
     </div>

    </div>
    {{-- MATCHES --}}
    <div class="dpanel" id="dp-matches">
     <h2 data-i18n="mt_h">Eşleşmelerim</h2>
     <p class="sub" data-i18n="mt_sub">Sektörünüze, ürünlerinize ve ticaret yönünüze göre sıralanır. Filtreleyebilir ve CSV olarak indirebilirsiniz.</p>
     <div class="mfil">
      <input maxlength="200" placeholder="Firma, ürün veya HS kodu ara..." id="mfSearch" oninput="renderMatchTable()"/>
      <select id="mfDir" onchange="renderMatchTable()"><option value="" data-i18n="all_dir">Tüm yönler</option><option value="EXP" data-i18n="dir_exp">Satıyor</option><option value="IMP" data-i18n="dir_imp">Alıyor</option></select>
      <select id="mfScore" onchange="renderMatchTable()"><option value="0" data-i18n="all_scores">Tüm skorlar</option><option value="90">90+ %</option><option value="80">80+ %</option></select>
      <button class="btn sm" onclick="exportMatchesCSV()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span data-i18n="export_csv">CSV</span></button>
      <span class="r"><span id="mfCount">0</span> <span data-i18n="results">sonuç</span></span>
     </div>
     <div class="dcard" style="padding:0;overflow:hidden"><div id="mtable-wrap"></div></div>
    </div>
    {{-- PROFILE --}}
    <div class="dpanel" id="dp-profile">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div>
       <h2 data-i18n="prof_h">Firma Profilim</h2>
       <p class="sub" data-i18n="prof_sub">Kayıt sırasındaki tüm veriler. Değiştir, kaydet — anında yayına girer.</p>
      </div>
      <button class="btn sec" onclick="openMyProfile()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span data-i18n="preview_page">Herkese Görünen Sayfayı Aç</span></button>
     </div>

     {{-- Profil başlığı: ad, ülke ve doluluk oranı sunucudaki verilerden hesaplanır --}}
     <div class="profhero">
      <div class="phring-wrap">
       <div class="phring">
        <svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="32" fill="none" stroke="var(--line)" stroke-width="6"/><circle id="pfRingFg" cx="38" cy="38" r="32" fill="none" stroke="var(--verify)" stroke-width="6" stroke-linecap="round" stroke-dasharray="201" stroke-dashoffset="201"/></svg>
        <div class="txt" id="pfRingTxt">—</div>
       </div>
       <div class="phring-cap" data-kvt>Profil doluluğu</div>
      </div>
      <div class="phinfo">
       <h3 id="pfName"></h3>
       <p id="pfMeta"></p>
       <div class="phchips" id="pfChips"></div>
      </div>
     </div>

     {{-- Section anchor navigation --}}
     <div class="prof-anchors">
      <a href="#sec_visual" onclick="scrollAnchor('sec_visual',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg><span data-kvt>Görsel Kimlik</span></a>
      <a href="#sec_legal" onclick="scrollAnchor('sec_legal',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span data-kvt>Yasal & Firma</span></a>
      <a href="#sec_biz" onclick="scrollAnchor('sec_biz',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2l3 6 5 1-3.5 3.5.83 5.5L6 15l-5.33 2.5.83-5.5L-1.5 8.5 3.5 8 6 2z" transform="translate(6,4)"/></svg><span data-kvt>Ticari Bilgiler</span></a>
      <a href="#sec_social" onclick="scrollAnchor('sec_social',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><span data-kvt>Sosyal & İletişim</span></a>
     </div>

     <div class="dcard" id="sec_visual">
      <h3 data-i18n="sec_visual">Görsel Kimlik</h3>
      {{-- Herkese açık firma kartının şu anki hâli (gerçek logo, kapak, sektör) --}}
      <div class="prof-preview">
       <div class="pp-cover" id="ppCover"></div>
       <div class="pp-logo" id="ppLogo"></div>
       <div class="pp-info">
        <b id="ppName"></b>
        <span id="ppMeta"></span>
        <div class="pp-tags" id="ppTags"></div>
       </div>
       <div class="pp-badge" data-kvt>Şu anki görünüm</div>
      </div>
      <div class="logoup">
       <div class="box" id="phbox"></div>
       <div class="info">
        <b data-i18n="logo_lbl">Logo *</b>
        <span data-kvt>PNG, JPG veya WebP · en fazla 2 MB</span>
        <div style="display:flex;gap:6px"><button class="btn sm" type="button" id="pfLogoBtn" data-i18n="upload">Yükle</button><input type="file" id="phfile" accept="image/jpeg,image/png,image/webp" hidden/></div>
       </div>
      </div>
      <label class="fl" data-kvt>Kapak görseli</label>
      <div class="upl2" id="pfCoverDrop" role="button" tabindex="0" style="margin-bottom:6px">
       <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg></div>
       <div class="tt" data-i18n="cover_change">Kapak fotoğrafı yükle veya değiştir</div>
       <div class="st" data-kvt>PNG, JPG veya WebP · en fazla 5 MB</div>
       <input type="file" id="profCoverFile" accept="image/jpeg,image/png,image/webp" hidden/>
      </div>
      <button class="btn sm sec" type="button" id="pfCoverRemove" hidden data-kvt>Kapak görselini kaldır</button>
      <label class="fl" style="margin-top:14px" data-i18n="gal_lbl">Ürün / Tesis Fotoğrafları</label>
      <div class="upl2" id="pfGalDrop" role="button" tabindex="0">
       <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
       <div class="tt" data-kvt>Fotoğraf ekle</div>
       <div class="st" id="pfGalHint" data-kvt>PNG, JPG veya WebP · her biri en fazla 5 MB</div>
       <input type="file" id="profGalFile" accept="image/jpeg,image/png,image/webp" multiple hidden/>
      </div>
      <div class="galpreview" id="profGalPrev"></div>
      <p class="kv-hint" id="pfMediaStatus" role="status" aria-live="polite" data-kvt>Görseller yüklenir yüklenmez kaydedilir.</p>
     </div>

     <div class="dcard" id="sec_legal">
      <h3 data-i18n="sec_legal">Yasal & Firma Bilgileri</h3>
      <div class="fg">
       <div><label class="fl" data-i18n="fl_cname">Firma Adı *</label><input data-pf="name" maxlength="200"/></div>
       <div><label class="fl" data-i18n="fl_ctitle">Ticari Ünvan (EN)</label><input data-pf="name_en" maxlength="200"/></div>
       <div><label class="fl" data-i18n="fl_tax">Vergi No / Tax ID *</label><input data-pf="tax_id" maxlength="64" readonly/></div>
       <div><label class="fl" data-i18n="fl_mersis">MERSIS / Sicil No</label><input data-pf="mersis" maxlength="64" readonly/></div>
       <div><label class="fl" data-i18n="fl_year">Kuruluş Yılı</label><input data-pf="founded_year" type="number" min="1800" max="2100"/></div>
       <div><label class="fl" data-i18n="fl_emp">Çalışan Sayısı</label><select data-pf="employees"><option value="">—</option><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></div>
       <div><label class="fl" data-i18n="fl_country">Ülke</label><div id="ddProfCountry" class="kv-ro" data-pf-ro="country" title="Ülke değişikliği için destek ile iletişime geçin"></div></div>
       <div><label class="fl" data-i18n="fl_city">Şehir</label><input data-pf="city" maxlength="120"/></div>
       <div><label class="fl" data-i18n="fl_kep">KEP Adresi</label><input data-pf="kep" maxlength="200"/></div>
       <div><label class="fl" data-i18n="fl_web">Web Sitesi</label><input data-pf="website" type="url" maxlength="200" inputmode="url" placeholder="https://"/></div>
       <div><label class="fl" data-i18n="fl_email">E-posta *</label><input data-pf="email" type="email" maxlength="254"/></div>
       <div><label class="fl" data-i18n="fl_phone">Telefon *</label><input data-pf="phone" maxlength="64" inputmode="tel"/></div>
       <div><label class="fl" data-i18n="fl_repname">Yetkili Kişi</label><input data-pf="rep_name" maxlength="200"/></div>
       <div><label class="fl" data-i18n="fl_reptitle">Yetkili Ünvan</label><input data-pf="rep_title" maxlength="200"/></div>
      </div>
      <label class="fl" data-i18n="fl_address">Firma Adresi</label><textarea data-pf="address" maxlength="1000" rows="2"></textarea>
      <div class="prof-save-row"><button class="btn sm" type="button" onclick="kvSaveProfile(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span data-kvt>Bu bölümü kaydet</span></button></div>
     </div>

     <div class="dcard" id="sec_biz">
      <h3 data-i18n="sec_biz">Ticari Bilgiler</h3>
      <div class="fg">
       <div><label class="fl" data-i18n="fl_sec">Ana Sektör</label><select id="profSec" data-pf="sector" onchange="renderProfSecChip()"></select><div id="profSecChip" style="margin-top:8px"></div></div>
       <div><label class="fl" data-i18n="fl_dir">Ticaret Yönü</label><select data-pf="direction"><option value="">—</option><option value="EXP" data-i18n="dir_exp">İhracat</option><option value="IMP" data-i18n="dir_imp">İthalat</option><option value="BOTH" data-i18n="dir_both">Her ikisi</option></select></div>
       <div><label class="fl" data-i18n="fl_inc">INCOTERM</label><select data-pf="incoterm"><option value="">—</option><option>FOB</option><option>CIF</option><option>DAP</option><option>EXW</option><option>FCA</option><option>DDP</option></select></div>
       <div><label class="fl" data-i18n="fl_pay">Ödeme Şekli</label><select data-pf="payment_terms"><option value="">—</option><option value="LC">LC</option><option value="TT Peşin" data-i18n="pay_tt_cash">TT Peşin</option><option value="TT 30 gün" data-i18n="pay_tt_30">TT 30 gün</option><option value="TT 60 gün" data-i18n="pay_tt_60">TT 60 gün</option><option value="CAD">CAD</option></select></div>
      </div>
      <label class="fl" data-i18n="fl_desc">Firma Açıklaması</label><textarea data-pf="description" maxlength="3000" rows="6"></textarea><div class="kv-hint" id="pfDescCount"></div>
      <label class="fl" data-kvt>Ürünler</label><textarea data-pf="products" maxlength="500" rows="2"></textarea>
      <label class="fl" data-i18n="fl_hs">HS Kodu (virgülle)</label><input data-pf="hs_codes" maxlength="200"/>
      <label class="fl" data-i18n="fl_moq">MOQ (Minimum Sipariş)</label><input data-pf="moq" maxlength="200"/>
      <label class="fl" data-i18n="fl_certs">Sertifikalar</label><input data-pf="certificates" maxlength="500"/>
      <div class="prof-save-row"><button class="btn sm" type="button" onclick="kvSaveProfile(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span data-kvt>Bu bölümü kaydet</span></button></div>
     </div>

     <div class="dcard" id="sec_social">
      <h3 data-i18n="sec_social">Sosyal Medya & İletişim Kanalları</h3>
      <div class="social-grid">
       <div class="social-inp"><div class="pref"><svg fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Z"/></svg>WhatsApp</div><input data-pf="social_wa" maxlength="200"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>LinkedIn</div><input data-pf="social_li" maxlength="200"/></div>
       <div class="social-inp"><div class="pref"><svg viewBox="0 0 24 24"><defs><linearGradient id="ig2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f09433"/><stop offset=".3" stop-color="#e6683c"/><stop offset=".6" stop-color="#dc2743"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path fill="url(#ig2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>Instagram</div><input data-pf="social_ig" maxlength="200"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</div><input data-pf="social_fb" maxlength="200"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#000" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X (Twitter)</div><input data-pf="social_x" maxlength="200"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</div><input data-pf="social_yt" maxlength="200"/></div>
      </div>
      <div class="prof-save-row"><button class="btn sm" type="button" onclick="kvSaveProfile(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span data-kvt>Bu bölümü kaydet</span></button></div>
     </div>

     <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" type="button" onclick="kvSaveProfile(this)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span data-i18n="save_all">Tüm Değişiklikleri Kaydet</span></button>
      <button class="btn sec" type="button" onclick="kvCancelProfile()" data-i18n="cancel">İptal</button>
     </div>
    </div>
    {{-- MESSAGES --}}
    <div class="dpanel" id="dp-messages">
     <h2 data-i18n="msg_h">Mesajlarım</h2>
     <p class="sub" id="kvMsgSub" data-i18n="kvm_sub">Aynı sektördeki onaylı firmalarla platform içinde yazışın.</p>
     <div class="msgwrap" id="kvMsgWrap">
      <div class="msglist" id="msglist">
       <div class="ml-sr"><svg class="sricon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg><input type="search" id="kvMsgSearch" placeholder="Konuşmalarda ara..." data-i18n-ph="msg_search" maxlength="100" autocomplete="off" aria-label="Konuşmalarda ara"/></div>
       <div class="kvm-tabs" id="kvmTabs" role="tablist">
        <button type="button" role="tab" class="on" data-tab="inbox"><span data-i18n="kvm_tab_inbox">Gelen kutusu</span></button>
        <button type="button" role="tab" data-tab="archive"><span data-i18n="kvm_tab_archive">Arşiv</span> <i id="kvmArchCnt" hidden></i></button>
       </div>
       <div id="kvMsgItems" aria-live="polite"></div>
      </div>
      <div class="msgpane" id="msgpane">
       <div class="kvm-pick" id="kvMsgPick">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <p id="kvMsgPickTxt" data-i18n="kvm_pick">Bir konuşma seçin</p>
       </div>
       <div class="kvm-thread" id="kvMsgThread" hidden>
        <div class="mp-h" id="kvMsgHead"></div>
        <div class="mp-body" id="mpBody"></div>
        <div class="kvm-banner" id="kvMsgBanner" hidden></div>
        <div class="mp-input" id="kvMsgComposer">
         <div class="kvm-attchip" id="kvMsgAttChip" hidden></div>
         <div class="mp-tools">
          <button type="button" data-act="pick-file" data-i18n-title="kvm_attach_file" title="Dosya ekle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
          <button type="button" data-act="pick-image" data-i18n-title="kvm_attach_img" title="Resim"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
          <button type="button" data-act="emoji" data-i18n-title="kvm_emoji" title="Emoji"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg></button>
         </div>
         <input type="file" id="kvMsgFile" accept="image/jpeg,image/png,image/webp,application/pdf" hidden>
         <input type="file" id="kvMsgImage" accept="image/jpeg,image/png,image/webp" hidden>
         <div class="kv-emoji" id="kvEmoji"></div>
         <textarea id="kvMsgText" rows="1" maxlength="4000" placeholder="Mesajınızı yazın…" data-i18n-ph="kvm_ph" aria-label="Mesaj"></textarea>
         <button type="button" class="mp-send" id="kvMsgSend" data-i18n-title="kvm_send" title="Gönder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        </div>
        <div class="mp-lang" id="kvMsgHint"></div>
       </div>
      </div>
     </div>
    </div>

    {{-- PEOPLE / contact discovery (kv-people.js renders the table from /kv/people) --}}
    <div class="dpanel" id="dp-people">
     <div class="ppl-hd">
      <div>
       <h2><span data-i18n="ppl_title">Kişiler</span></h2>
       <p class="sub" data-i18n="ppl_sub">Kendi sektörünüzün dışındaki firmalarda karar vericilere doğrudan erişim. Her e-posta veya telefon bilgisi 1 kredi.</p>
      </div>
      <div class="credits" id="kvCreditBox">
       <div class="cr-i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
       <div style="flex:1"><div class="cr-n"><span id="creditN">–</span></div><div class="cr-l" data-i18n="ppl_credits">Kredi kaldı</div><div class="cr-b" data-i18n="ppl_renew">Kullanılmayan krediler devreder</div></div><button type="button" id="kvCrBuy" onclick="openM('credits')" style="padding:8px 12px;background:linear-gradient(135deg,var(--teal),var(--emer));color:#fff;border:none;border-radius:8px;font-family:var(--sans);font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;white-space:nowrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span data-i18n="creds_add_btn">Kredi Ekle</span></button>
      </div>
     </div>
     <div class="kv-ppl-rule" id="kvPplRule">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <span data-i18n="kvp_rule">Burada kendi sektörünüz dışındaki kişiler listelenir. Kendi sektörünüzdeki firmalara Eşleşmeler sekmesinden ulaşırsınız.</span>
     </div>
     <div class="ppl-fil">
      <div class="ppl-sr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg><input id="kvPplSearch" maxlength="120" placeholder="Kişi adı, firma veya ünvan ara..." data-i18n-placeholder="ppl_search" autocomplete="off"/></div>
      <span class="fx active" data-dept="all" data-i18n="ppl_all">Tümü</span>
      <span class="fx" data-dept="ceo" data-i18n="ppl_ceo">CEO/Kurucu</span>
      <span class="fx" data-dept="purchasing" data-i18n="ppl_purchasing">Satın Alma</span>
      <span class="fx" data-dept="sales" data-i18n="ppl_sales">Satış</span>
      <span class="fx" data-dept="export" data-i18n="ppl_export">İhracat/İthalat</span>
      <span class="fx" data-dept="ops" data-i18n="ppl_ops">Operasyon</span>
      <select id="kvPplCountry" class="kv-ppl-country" aria-label="Ülke"><option value="" data-i18n="kvp_all_countries">Tüm ülkeler</option></select>
     </div>
     <div class="ppl-tbl">
      <div class="ppl-thd">
       <div data-i18n="ppl_col_person">KİŞİ</div><div class="col-cmp" data-i18n="ppl_col_firm">FİRMA</div><div class="col-ttl" data-i18n="ppl_col_title">ÜNVAN</div><div data-i18n="ppl_col_email">E-POSTA</div><div class="col-phn" data-i18n="ppl_col_phone">TELEFON</div><div class="col-act" data-i18n="ppl_col_act">İŞLEM</div>
      </div>
      <div id="pplBody" class="ppl-body" aria-live="polite"></div>
     </div>
     <div class="kv-ppl-pager" id="kvPplPager"></div>
     <div style="margin-top:14px;padding:14px;background:var(--paper);border-radius:12px;font-size:12.5px;color:var(--body);display:flex;gap:12px;align-items:center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2" style="flex:0 0 auto"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <span><span data-i18n="ppl_kvkk">Kişi bilgileri kamuya açık kaynaklardan derlenmiştir.</span> <a href="#" id="kvPplRemovalLink" style="color:var(--teal);cursor:pointer" data-i18n="ppl_kvkk_link">buradan başvurabilir</a>.</span>
     </div>
    </div>

    {{-- ANALYSIS: every number comes from GET /kv/analytics (rendered by public/kervea/js/kv-analytics.js); nothing here is a sample --}}
    <div class="dpanel" id="dp-analytics">
     <div class="an-head">
      <div>
       <h2 data-i18n="an_h">Analiz</h2>
       <p class="sub" data-i18n="an_sub">Firma sayfanızın ağda ne kadar görüldüğü. Yalnızca platformun gerçekten ölçtüğü veriler gösterilir.</p>
      </div>
      <div class="an-range" id="anRange" role="group" aria-label="Zaman aralığı" data-i18n-aria="an_range_lbl">
       <button type="button" data-range="7" data-i18n="an_r7">7 gün</button>
       <button type="button" data-range="30" class="on" aria-pressed="true" data-i18n="an_r30">30 gün</button>
       <button type="button" data-range="90" data-i18n="an_r90">90 gün</button>
       <button type="button" data-range="365" data-i18n="an_r365">1 yıl</button>
      </div>
     </div>
     <div id="anBody" class="an-body" aria-live="polite"><div class="an-empty-inline" data-i18n="an_loading">Analiz verileri yükleniyor…</div></div>
    </div>

    {{-- DOCUMENTS --}}
    <div class="dpanel" id="dp-docs">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
       <h2 data-kvt>Belgelerim</h2>
       <p class="sub" data-kvt>Başvuruda yüklediğiniz belgeler yalnızca Kervea yöneticilerine görünür; başka firmalara gösterilmez.</p>
      </div>
      <button class="btn" type="button"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span data-kvt>Yeni Belge Yükle</span></button>
     </div>
     <div class="doc-grid"></div>
    </div>

    {{-- TEAM MANAGEMENT (kv-team.js renders the list from GET /kv/team) --}}
    <div class="dpanel" id="dp-team">
     <div class="kvt-head">
      <div>
       <h2 data-i18n="kvt_title">Ekip Yönetimi</h2>
       <p class="sub" data-i18n="kvt_sub">Firmanız için çalışma arkadaşlarınızı davet edin, rollerini ve erişebilecekleri bölümleri belirleyin.</p>
      </div>
      <div class="kvt-head-actions">
       <span class="kvt-seats" id="kvtSeats" hidden></span>
       <button class="btn" type="button" id="kvtInviteBtn" disabled><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg><span data-i18n="kvt_invite">Kullanıcı Davet Et</span></button>
      </div>
     </div>
     <div class="kvt-state" id="kvtState" role="status" aria-live="polite"><span data-i18n="kvt_loading">Yükleniyor…</span></div>
     <div class="tm-tbl kvt-tbl" id="kvtTable" hidden></div>
     <div class="kvt-empty" id="kvtEmpty" hidden></div>
     <div class="kvt-info" id="kvtInfo" hidden></div>
    </div>

    {{-- ACTIVITY (kv-team.js renders the list from GET /kv/activity) --}}
    <div class="dpanel" id="dp-activity">
     <div class="kvt-head">
      <div>
       <h2 data-i18n="kvt_ac_title">Aktivite</h2>
       <p class="sub" data-i18n="kvt_ac_sub">Firmanızın panelindeki son hareketler: ekip değişiklikleri, profil ve belge güncellemeleri, girişler.</p>
      </div>
     </div>
     <div class="ac-filters" id="kvtAcFilters" role="tablist"></div>
     <div class="kvt-state" id="kvtAcState" role="status" aria-live="polite"><span data-i18n="kvt_loading">Yükleniyor…</span></div>
     <div class="ac-timeline" id="acList" hidden></div>
    </div>

    {{-- PROSPECT: firmanın kendi profil verisinden tek sayfalık tanıtım belgesi (yazdır / PDF olarak kaydet) --}}
    <div class="dpanel" id="dp-prospect">
     <h2 data-i18n="pr_title">Prospektüs Üretici</h2>
     <p class="sub" data-kvt>Firma profilinizden tek sayfalık bir tanıtım belgesi hazırlanır. Belge yeni sekmede açılır; yazdır penceresinde “PDF olarak kaydet”i seçerek indirebilirsiniz.</p>
     <div class="dcard">
      <label class="fl" data-i18n="pr_who">Kimin için hazırlıyorsunuz?</label>
      <div class="prosp-usecases">
       <div class="prosp-uc-tile" role="button" tabindex="0" onclick="selectProspTarget(this,'meetings')" data-selected="true">
        <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
        <div class="prosp-uc-t" data-i18n="pr_l1">Alıcı görüşmeleri öncesi bilgi paylaşımı</div>
       </div>
       <div class="prosp-uc-tile" role="button" tabindex="0" onclick="selectProspTarget(this,'fair')">
        <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
        <div class="prosp-uc-t" data-i18n="pr_l2">Fuar ve etkinliklerde dijital kartvizit</div>
       </div>
       <div class="prosp-uc-tile" role="button" tabindex="0" onclick="selectProspTarget(this,'social')">
        <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
        <div class="prosp-uc-t" data-i18n="pr_l3">Sosyal medya ve web sitesinde referans</div>
       </div>
      </div>
      <div class="prosp-cta-row">
       <button class="btn prosp-cta-primary" type="button" onclick="kvProspectus('print')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        <span data-kvt>Prospektüsü aç ve yazdır / PDF kaydet</span>
       </button>
       <button class="btn sec prosp-cta-secondary" type="button" onclick="kvProspectus('view')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <span data-kvt>Önizle</span>
       </button>
      </div>
      <p class="kv-hint" id="kvProspStatus" role="status" aria-live="polite"></p>
     </div>
    </div>
   {{-- SETTINGS --}}
    <div class="dpanel" id="dp-settings">
     <h2 data-kvt>Ayarlar</h2>
     <p class="sub" data-kvt>Hesap ve güvenlik tercihleri.</p>
     <div class="dcard"><p class="card-sub" data-kvt>Yükleniyor…</p></div>
    </div>
   </div>
  </div>
 </div>
</section>

{{-- FIRM PROFILE PAGE (real page, not modal) --}}
@endverbatim
