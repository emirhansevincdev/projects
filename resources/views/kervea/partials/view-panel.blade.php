@verbatim
<section id="panel" class="view">
 <div class="wrap">
  <div class="ph"><h1 data-i18n="pn_h">Firma Paneli</h1><p data-i18n="pn_p">Profil, eşleşme ve mesajlarınızı yönetin.</p></div>
  <div class="dash">
   <div class="dmenu">
    <a class="on" onclick="showPanel('overview',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><span data-i18n="p_over">Genel Bakış</span></a>
    <a onclick="showPanel('matches',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span data-i18n="p_matches">Eşleşmeler</span></a>
    <a onclick="showPanel('profile',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span data-i18n="p_profile">Firma Profilim</span></a>
    <a onclick="showPanel('messages',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span data-i18n="p_msgs">Mesajlar</span><span class="dm-badge">3</span></a>
    <a onclick="showPanel('people',this)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg><span data-i18n="p_people">Kişiler</span><span class="dm-badge new">PRO</span></a>
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
    <!-- OVERVIEW -->
    <div class="dpanel on" id="dp-overview">
     <!-- ═══ HOŞ GELDİN + AKSİYON BAND (Dashboard component adaptasyonu) ═══ -->
     <div class="ov-welcome">
       <div class="ov-welcome-t">
         <h2 class="ov-welcome-h"><span data-i18n="ov_greeting">Merhaba</span>, <span id="ovUserName">Kervea üyesi</span></h2>
         <div class="ov-welcome-badges">
           <span class="ov-badge ov-badge-info">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
             <span data-i18n="ov_pilot_status">Pilot dönem · Aralık 2026'da tam başlangıç</span>
           </span>
           <span class="ov-badge ov-badge-warn" id="ovVerifyBadge">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
             <span data-i18n="ov_verify_pending">Firma doğrulama bekliyor — Kervea ekibi 24 saat içinde iletişime geçecek</span>
           </span>
         </div>
       </div>
       <div class="ov-welcome-ctas">
         <button class="btn ov-cta-primary" onclick="go('add')">
           <span data-i18n="ov_cta_new">Yeni Firma</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
         </button>
         <button class="btn sec ov-cta-secondary" onclick="kvExportData()">
           <span data-i18n="ov_cta_export">Verileri İndir</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         </button>
         <div class="ov-filter-wrap">
           <button class="btn sec ov-cta-secondary" onclick="this.parentElement.classList.toggle('open')">
             <span data-i18n="ov_cta_filter">Filtrele</span>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/></svg>
           </button>
           <div class="ov-filter-menu">
             <div class="ov-filter-lbl" data-i18n="ov_filter_h">Panel Filtreleri</div>
             <div class="ov-filter-sep"></div>
             <label class="ov-filter-item"><input type="checkbox" checked/> <span data-i18n="ov_filter_active">Aktif profil</span></label>
             <label class="ov-filter-item"><input type="checkbox"/> <span data-i18n="ov_filter_pending">Doğrulama bekliyor</span></label>
             <label class="ov-filter-item"><input type="checkbox" checked/> <span data-i18n="ov_filter_hi_score">Yüksek eşleşme skoru</span></label>
             <label class="ov-filter-item"><input type="checkbox"/> <span data-i18n="ov_filter_unread">Okunmamış mesajlar</span></label>
             <div class="ov-filter-sep"></div>
             <a class="ov-filter-clear" onclick="kvClearFilters()" data-i18n="ov_filter_clear">Filtreleri temizle</a>
           </div>
         </div>
       </div>
     </div>

     <!-- ═══ STATS GRID (honest empty state) ═══ -->
     <div class="ov-stats">
       <div class="ov-stat-card">
         <div class="ov-stat-hd">
           <div class="ov-stat-ico">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           </div>
           <div class="ov-stat-lbl" data-i18n="ov_stat_matches">Eşleşme</div>
         </div>
         <div class="ov-stat-val">—</div>
         <div class="ov-stat-sub" data-i18n="ov_stat_pilot">Pilot dönem — veri toplanıyor</div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd">
           <div class="ov-stat-ico">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
           </div>
           <div class="ov-stat-lbl" data-i18n="ov_stat_msgs">Mesaj</div>
         </div>
         <div class="ov-stat-val">—</div>
         <div class="ov-stat-sub" data-i18n="ov_stat_pilot">Pilot dönem — veri toplanıyor</div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd">
           <div class="ov-stat-ico">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
           </div>
           <div class="ov-stat-lbl" data-i18n="ov_stat_views">Profil Görüntülenme</div>
         </div>
         <div class="ov-stat-val">—</div>
         <div class="ov-stat-sub" data-i18n="ov_stat_pilot">Pilot dönem — veri toplanıyor</div>
       </div>
       <div class="ov-stat-card">
         <div class="ov-stat-hd">
           <div class="ov-stat-ico">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           </div>
           <div class="ov-stat-lbl" data-i18n="ov_stat_verif">Doğrulama Seviyesi</div>
         </div>
         <div class="ov-stat-val ov-stat-val-txt" data-i18n="ov_stat_level_pending">Beklemede</div>
         <div class="ov-stat-sub" data-i18n="ov_stat_verify_next">4 kademeden 0 tamamlandı</div>
       </div>
     </div>

     <!-- ═══ PORTFÖY + AI INSIGHTS (3fr 1fr grid) ═══ -->
     <div class="ov-portfolio-grid">
       <div class="ov-portfolio">
         <div class="ov-section-hd">
           <h3 data-i18n="ov_port_h">Firma Portföyünüz</h3>
           <button class="btn sec sm" onclick="showPanel('matches')">
             <span data-i18n="ov_port_all">Tümünü Gör</span>
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
           </button>
         </div>
         <div class="ov-portfolio-empty">
           <div class="ov-empty-ico">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           </div>
           <div class="ov-empty-t" data-i18n="ov_port_empty_h">Henüz aktif firma eşleşmesi yok</div>
           <div class="ov-empty-p" data-i18n="ov_port_empty_p">Firmanız doğrulandığında, sektör ve HS kodunuza göre eşleşen firmalar burada listelenecek. Pilot döneminde ilk 10 doğrulanmış firmaya öncelik verilir.</div>
           <button class="btn sm" onclick="go('add')" data-i18n="ov_port_empty_cta">Firma Profili Oluştur</button>
         </div>
       </div>
       <div class="ov-ai-panel">
         <div class="ov-section-hd">
           <h3><span data-i18n="ov_ai_h">AI Öneriler</span> <span class="ov-ai-badge" data-i18n="ov_ai_soon">YAKINDA</span></h3>
         </div>
         <div class="ov-ai-card">
       <div class="ov-side-hd">
         <h3 class="ov-side-h"><span data-i18n="ov_ai_h">AI Öneriler</span> <span class="ov-ai-badge" data-i18n="ov_ai_soon">YAKINDA</span></h3>
         <button class="ov-side-more" onclick="closeUserMenu();go('panel')" aria-label="Daha fazla">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
         </button>
       </div>
       <p class="ov-ai-msg" data-i18n="ov_ai_msg1">Kervea AI motoru, ilk 10 doğrulanmış firma katıldığında sizin sektör, ürün ve hedef pazarınıza en uygun 3 firmayı burada listeleyecek. Şu an eşleşme algoritması pilot fazında sabitleniyor.</p>
       <p class="ov-ai-msg" data-i18n="ov_ai_msg2">Trademap gümrük veri entegrasyonu Kasım 2026'da tamamlanacak. Sonrasında koridor hacim fırsatları, HS bazlı ithalat/ihracat açıkları ve rakip yoğunluk uyarıları burada anlık gösterilecek.</p>
       <div class="ov-ai-actions">
         <button class="btn sec ov-ai-cta-sec" onclick="this.closest('.ov-ai-card').classList.add('ov-ai-dismissed');setTimeout(function(){var c=document.querySelector('.ov-ai-card');if(c)c.style.display='none';},400)">
           <span data-i18n="ov_ai_dismiss">Kapat</span>
         </button>
         <button class="btn ov-ai-cta-pri" onclick="go('kd-block' in window ? 'home' : 'home');setTimeout(function(){var k=document.getElementById('kd-block');if(k)k.scrollIntoView({behavior:'smooth',block:'start'});},200)">
           <span data-i18n="ov_ai_open">Kürsüsü'ne katıl</span>
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
         </button>
       </div>
     </div>
       </div>
     </div>

     <!-- ═══ ACTIVITY / UPCOMING / RISK 3-COLUMN ═══ -->
     <div class="ov-lower-grid">
       <div class="ov-lower-card">
         <div class="ov-section-hd">
           <h3 data-i18n="ov_activity_h">Son Aktiviteler</h3>
         </div>
         <div class="ov-lower-empty">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
           <div class="ov-lower-empty-p" data-i18n="ov_activity_empty">Firma profil hareketleri, mesajlar ve doğrulama adımları burada listelenecek.</div>
         </div>
       </div>
       <div class="ov-lower-card">
         <div class="ov-section-hd">
           <h3 data-i18n="ov_upcoming_h">Yaklaşan Tarihler</h3>
         </div>
         <div class="ov-lower-empty">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
           <div class="ov-lower-empty-p" data-i18n="ov_upcoming_empty">Kervea Premium yenileme tarihi, planlanan görüşmeler ve son teslim tarihleri burada görünecek.</div>
         </div>
       </div>
       <div class="ov-lower-card">
         <div class="ov-section-hd">
           <h3 data-i18n="ov_risk_h">Risk Uyarıları</h3>
         </div>
         <div class="ov-lower-empty">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           <div class="ov-lower-empty-p" data-i18n="ov_risk_empty">Doğrulanmamış karşı taraflar, geç yanıt süreleri ve güvenlik uyarıları burada görünecek.</div>
         </div>
       </div>
     </div>

    </div>
    <!-- MATCHES -->
    <div class="dpanel" id="dp-matches">
     <h2 data-i18n="mt_h">Eşleşmelerim</h2>
     <p class="sub" data-i18n="mt_sub">AI eşleştirme motoru sizin için sıraladı. Filtrele, dışa aktar, doğrudan mesajlaş.</p>
     <div class="mfil">
      <input maxlength="200" placeholder="Firma, ürün veya HS kodu ara..." id="mfSearch" oninput="renderMatchTable()"/>
      <select id="mfDir" onchange="renderMatchTable()"><option value="" data-i18n="all_dir">Tüm yönler</option><option value="EXP" data-i18n="dir_exp">Satıyor</option><option value="IMP" data-i18n="dir_imp">Alıyor</option></select>
      <select id="mfScore" onchange="renderMatchTable()"><option value="0" data-i18n="all_scores">Tüm skorlar</option><option value="90">90+ %</option><option value="80">80+ %</option></select>
      <button class="btn sm" onclick="exportMatchesCSV()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span data-i18n="export_csv">CSV</span></button>
      <span class="r"><span id="mfCount">0</span> <span data-i18n="results">sonuç</span></span>
     </div>
     <div class="dcard" style="padding:0;overflow:hidden"><div id="mtable-wrap"></div></div>
    </div>
    <!-- PROFILE -->
    <div class="dpanel" id="dp-profile">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div>
       <h2 data-i18n="prof_h">Firma Profilim</h2>
       <p class="sub" data-i18n="prof_sub">Kayıt sırasındaki tüm veriler. Değiştir, kaydet — anında yayına girer.</p>
      </div>
      <button class="btn sec" onclick="openMyProfile()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span data-i18n="preview_page">Herkese Görünen Sayfayı Aç</span></button>
     </div>

     <!-- Premium profile header widget -->
     <div class="profhero">
      <div class="phring">
       <svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="32" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="38" cy="38" r="32" fill="none" stroke="var(--verify)" stroke-width="6" stroke-linecap="round" stroke-dasharray="201" stroke-dashoffset="12"/></svg>
       <div class="txt">94%<small>Tamamlandı</small></div>
      </div>
      <div class="phinfo">
       <h3>Kervea Ticaret A.Ş.</h3>
       <p><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--verify)" stroke-width="3" style="display:inline;vertical-align:middle;margin-right:3px"><polyline points="20 6 9 17 4 12"/></svg>Doğrulanmış firma · Türkiye · 2015'ten beri</p>
       <div class="phchips">
        <span class="phchip">Logo</span>
        <span class="phchip">Belgeler</span>
        <span class="phchip">Sosyal medya</span>
        <span class="phchip warn">Galeri (5/12)</span>
       </div>
      </div>
     </div>

     <!-- Live KPI strip -->
     <div class="prof-kpi">
      <div class="pkpi"><div class="pkpi-v">32</div><div class="pkpi-l">İhracat ülkesi</div><div class="pkpi-s" style="color:var(--verify)">↑ 4 son 30g</div></div>
      <div class="pkpi"><div class="pkpi-v">1h 47dk</div><div class="pkpi-l">Ort. cevap süresi</div><div class="pkpi-s" style="color:var(--verify)">Sektör ort. altı</div></div>
      <div class="pkpi"><div class="pkpi-v">247</div><div class="pkpi-l">Profil görüntüleme</div><div class="pkpi-s" style="color:var(--faint)">Son 30 gün</div></div>
      <div class="pkpi"><div class="pkpi-v">89%</div><div class="pkpi-l">Ort. eşleşme skoru</div><div class="pkpi-s" style="color:var(--verify)">↑ 3p önceki aya göre</div></div>
     </div>

     <!-- Section anchor navigation -->
     <div class="prof-anchors">
      <a href="#sec_visual" onclick="scrollAnchor('sec_visual',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>Görsel Kimlik</a>
      <a href="#sec_legal" onclick="scrollAnchor('sec_legal',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>Yasal & Firma</a>
      <a href="#sec_biz" onclick="scrollAnchor('sec_biz',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2l3 6 5 1-3.5 3.5.83 5.5L6 15l-5.33 2.5.83-5.5L-1.5 8.5 3.5 8 6 2z" transform="translate(6,4)"/></svg>Ticari Bilgiler</a>
      <a href="#sec_social" onclick="scrollAnchor('sec_social',event)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>Sosyal & İletişim</a>
     </div>

     <div class="dcard" id="sec_visual">
      <h3 data-i18n="sec_visual">Görsel Kimlik</h3>
      <!-- Live public preview card -->
      <div class="prof-preview">
       <div class="pp-cover" id="ppCover"></div>
       <div class="pp-logo" id="ppLogo">KT</div>
       <div class="pp-info">
        <b>Kervea Ticaret A.Ş.</b>
        <span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--verify)" stroke-width="3" style="display:inline;vertical-align:middle;margin-right:2px"><polyline points="20 6 9 17 4 12"/></svg>Doğrulanmış · Türkiye · 2015</span>
        <div class="pp-tags"><span>Tekstil</span><span>Orman Ürünleri</span><span>Gıda</span></div>
       </div>
       <div class="pp-badge" data-i18n="pp_live_prev">CANLI ÖNİZLEME</div>
      </div>
      <div class="logoup">
       <div class="box" id="phbox">KT</div>
       <div class="info">
        <b data-i18n="logo_lbl">Logo *</b>
        <span data-i18n="logo_hint2">400×400 · PNG / JPG / SVG · max 2MB</span>
        <div style="display:flex;gap:6px"><button class="btn sm" onclick="document.getElementById('phfile').click()" data-i18n="upload">Yükle</button><button class="btn sm sec" onclick="removePhoto()" data-i18n="remove">Kaldır</button><input type="file" id="phfile" style="display:none" accept="image/*" onchange="uploadPhoto(event)"/></div>
       </div>
      </div>
      <label class="fl" data-i18n="cover_lbl">Kapak Görseli · 1600×400</label>
      <div class="upl2" onclick="document.getElementById('profCoverFile').click()" style="margin-bottom:6px">
       <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg></div>
       <div class="tt" data-i18n="cover_change">Kapak fotoğrafı yükle veya değiştir</div>
       <input type="file" id="profCoverFile" accept="image/*" onchange="toast(tt('toast_cover_updated','Kapak güncellendi'))"/>
      </div>
      <label class="fl" style="margin-top:14px" data-i18n="gal_lbl">Ürün / Tesis Fotoğrafları</label>
      <div class="upl2" onclick="document.getElementById('profGalFile').click()">
       <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
       <div class="tt" data-i18n="gal_add">Yeni görsel ekle · Sürükle-bırak destekli</div>
       <div class="st" data-i18n="gal_max">JPG/PNG/WEBP · en fazla 12 görsel · her biri max 5MB</div>
       <input type="file" id="profGalFile" accept="image/*" multiple onchange="previewGallery(event,'profGalPrev')"/>
      </div>
      <div class="galpreview" id="profGalPrev"></div>
      <div class="prof-save-row"><button class="btn sm" onclick="toast(tt('toast_visual_saved','Görsel kimlik kaydedildi'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Bu bölümü kaydet</button></div>
     </div>

     <div class="dcard" id="sec_legal">
      <h3 data-i18n="sec_legal">Yasal & Firma Bilgileri</h3>
      <div class="fg">
       <div><label class="fl" data-i18n="fl_cname">Firma Adı *</label><input maxlength="200" value="Kervea Ticaret A.Ş."/></div>
       <div><label class="fl" data-i18n="fl_ctitle">Ticari Ünvan (EN)</label><input maxlength="200" value="Kervea Trading Ltd."/></div>
       <div><label class="fl" data-i18n="fl_tax">Vergi No / Tax ID *</label><input maxlength="200" value="TR-1234567890"/></div>
       <div><label class="fl" data-i18n="fl_mersis">MERSIS / Sicil No</label><input maxlength="200" value="0123-4567-8901-2345"/></div>
       <div><label class="fl" data-i18n="fl_year">Kuruluş Yılı</label><input type="number" value="2015"/ min="0" max="999999999"></div>
       <div><label class="fl" data-i18n="fl_emp">Çalışan Sayısı</label><select><option>1-10</option><option selected>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></div>
       <div><label class="fl" data-i18n="fl_country">Ülke</label><div id="ddProfCountry"></div></div>
       <div><label class="fl" data-i18n="fl_city">Şehir</label><input maxlength="200" value="İstanbul"/></div>
       <div><label class="fl" data-i18n="fl_kep">KEP Adresi</label><input maxlength="200" value="kervea@hs01.kep.tr"/></div>
       <div><label class="fl" data-i18n="fl_web">Web Sitesi</label><input maxlength="200" value="https://kervea.io"/></div>
       <div><label class="fl" data-i18n="fl_email">E-posta *</label><input type="email" value="info@kervea.io"/ maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"></div>
       <div><label class="fl" data-i18n="fl_phone">Telefon *</label><input maxlength="200" value="+90 212 555 44 33"/></div>
       <div><label class="fl" data-i18n="fl_repname">Yetkili Kişi</label><input maxlength="200" value="Ahmet Yılmaz"/></div>
       <div><label class="fl" data-i18n="fl_reptitle">Yetkili Ünvan</label><input maxlength="200" value="Genel Müdür"/></div>
      </div>
      <label class="fl" data-i18n="fl_address">Firma Adresi</label><textarea maxlength="4000" rows="2">Büyükdere Cad. No:123 Levent 34394 Şişli / İstanbul</textarea>
      <div class="prof-save-row"><button class="btn sm" onclick="toast(tt('toast_legal_saved','Yasal bilgiler kaydedildi'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Bu bölümü kaydet</button></div>
     </div>

     <div class="dcard" id="sec_biz">
      <h3 data-i18n="sec_biz">Ticari Bilgiler</h3>
      <div class="fg">
       <div><label class="fl" data-i18n="fl_sec">Ana Sektör</label><select id="profSec" onchange="renderProfSecChip()"></select><div id="profSecChip" style="margin-top:8px"></div></div>
       <div><label class="fl" data-i18n="fl_dir">Ticaret Yönü</label><select><option value="EXP" data-i18n="dir_exp">İhracat</option><option value="IMP" data-i18n="dir_imp">İthalat</option><option>Her ikisi</option></select></div>
       <div><label class="fl" data-i18n="fl_inc">INCOTERM</label><select><option>FOB</option><option>CIF</option><option selected>DAP</option><option>EXW</option></select></div>
       <div><label class="fl" data-i18n="fl_pay">Ödeme Şekli</label><select><option selected>LC</option><option>TT Peşin</option><option>TT 30/60 gün</option></select></div>
      </div>
      <label class="fl" data-i18n="fl_desc">Firma Açıklaması</label><textarea maxlength="4000" rows="4">2015 yılından bu yana Türkiye ve Batı Afrika koridorunda tekstil, gıda ve orman ürünleri ticareti gerçekleştiriyoruz. 30+ ülkeye ihracat yapıyoruz.</textarea>
      <label class="fl" data-i18n="fl_hs">Anahtar Ürünler / HS Kodları</label><input maxlength="200" value="5205, 5208, 9403, 4415"/>
      <label class="fl" data-i18n="fl_moq">MOQ (Minimum Sipariş)</label><input maxlength="200" value="10 ton / 1000 adet"/>
      <label class="fl" data-i18n="fl_certs">Sertifikalar</label><input maxlength="200" value="ISO 9001, ISO 14001, GOTS"/>
      <div class="prof-save-row"><button class="btn sm" onclick="toast(tt('toast_trade_saved','Ticari bilgiler kaydedildi'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Bu bölümü kaydet</button></div>
     </div>

     <div class="dcard" id="sec_social">
      <h3 data-i18n="sec_social">Sosyal Medya & İletişim Kanalları</h3>
      <div class="social-grid">
       <div class="social-inp"><div class="pref"><svg fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.518.804.537-.054 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Z"/></svg>WhatsApp</div><input maxlength="200" value="+90 532 123 45 67"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#0A66C2" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>LinkedIn</div><input maxlength="200" value="linkedin.com/company/kervea"/></div>
       <div class="social-inp"><div class="pref"><svg viewBox="0 0 24 24"><defs><linearGradient id="ig2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f09433"/><stop offset=".3" stop-color="#e6683c"/><stop offset=".6" stop-color="#dc2743"/><stop offset="1" stop-color="#bc1888"/></linearGradient></defs><path fill="url(#ig2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>Instagram</div><input maxlength="200" value="@kervea_official"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>Facebook</div><input maxlength="200" value="facebook.com/kervea"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#000" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>X (Twitter)</div><input maxlength="200" value="@kervea"/></div>
       <div class="social-inp"><div class="pref"><svg fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</div><input maxlength="200" value="youtube.com/@kervea"/></div>
      </div>
      <div class="prof-save-row"><button class="btn sm" onclick="toast(tt('toast_social_saved','Sosyal medya bilgileri kaydedildi'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Bu bölümü kaydet</button></div>
     </div>

     <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" onclick="toast(tt('toast_profile_updated','Profil güncellendi'))"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg><span data-i18n="save_all">Tüm Değişiklikleri Kaydet</span></button>
      <button class="btn sec" onclick="toast(tt('toast_cancelled','İptal edildi'))" data-i18n="cancel">İptal</button>
     </div>
    </div>
    <!-- MESSAGES -->
    <div class="dpanel" id="dp-messages">
     <h2 data-i18n="msg_h">Mesajlarım</h2>
     <p class="sub" data-i18n="msg_sub">Uçtan uca şifreli · Otomatik çeviri · 40 MB'a kadar dosya paylaşımı</p>
     <div class="msgwrap">
      <div class="msglist" id="msglist">
       <div class="ml-sr"><svg class="sricon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" placeholder="Konuşmalarda ara..." oninput="filterMsgList(this.value)"/ maxlength="200"></div>
       <div class="msg-conv on" onclick="openConv('nordic')">
        <div class="av" style="background:linear-gradient(135deg,#8a5a2e,#b47a49)">NK<span class="st-dot"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Nordic Kaluste Oy</span><span class="cn-tm">14:22</span></div><div class="cn-p"><svg fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Tack för snabb offert! Vi vill…</div></div>
        <div class="un">2</div>
       </div>
       <div class="msg-conv" onclick="openConv('abidjan')">
        <div class="av" style="background:linear-gradient(135deg,#a44a2e,#c46e50)">AC<span class="st-dot" style="background:#c78a2a"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Abidjan Cacao Export</span><span class="cn-tm">09:47</span></div><div class="cn-p"><svg fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Bonjour, nous confirmons la commande…</div></div>
        <div class="un">1</div>
       </div>
       <div class="msg-conv" onclick="openConv('almaty')">
        <div class="av" style="background:linear-gradient(135deg,#a679d1,#c69fea)">AT<span class="st-dot" style="background:var(--faint)"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Almaty Tekstil</span><span class="cn-tm">Dün</span></div><div class="cn-p">Здравствуйте! Пришлите пожалуйста…</div></div>
       </div>
       <div class="msg-conv" onclick="openConv('milano')">
        <div class="av" style="background:linear-gradient(135deg,#5b7c99,#809bb8)">MM<span class="st-dot"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Milano Machinery</span><span class="cn-tm">2 gün</span></div><div class="cn-p">Grazie mille, il preventivo è arrivato…</div></div>
       </div>
       <div class="msg-conv" onclick="openConv('dubai')">
        <div class="av" style="background:linear-gradient(135deg,#8FE9C4,#0D8A80);color:#04140f">DT<span class="st-dot"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Dubai Trading LLC</span><span class="cn-tm">3 gün</span></div><div class="cn-p">شكراً لكم على الاستجابة السريعة…</div></div>
       </div>
       <div class="msg-conv" onclick="openConv('mumbai')">
        <div class="av" style="background:linear-gradient(135deg,#FFD68A,#c78a2a)">MI<span class="st-dot" style="background:#c78a2a"></span></div>
        <div class="cn"><div class="cn-t"><span class="cn-n">Mumbai Impex</span><span class="cn-tm">5 gün</span></div><div class="cn-p">Thank you for the samples, we're testing…</div></div>
       </div>
      </div>
      <div class="msgpane" id="msgpane">
       <div class="mp-h">
        <div class="av" style="background:linear-gradient(135deg,#8a5a2e,#b47a49)">NK</div>
        <div class="mp-info"><b>Nordic Kaluste Oy · Mikko Virtanen</b><span><span data-i18n="chat_online">Çevrimiçi</span> · Finlandiya · <span data-i18n="chat_verified_firm">Doğrulanmış firma</span></span></div>
        <div class="mp-actions">
         <button data-i18n-title="chat_btn_firm" title="Firma profili" onclick="toast(tt('toast_firm_opening','Firma profili açılıyor'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></button>
         <button data-i18n-title="chat_btn_video" title="Görüntülü ara" onclick="toast(tt('toast_video_call','Görüntülü arama başlatılıyor'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></button>
         <button data-i18n-title="chat_btn_archive" title="Arşivle" onclick="toast(tt('toast_chat_archived','Konuşma arşivlendi'))"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg></button>
        </div>
       </div>
       <div class="mp-body" id="mpBody">
        <div class="mb-day">Bugün · 12 Eylül 2026</div>
        <div class="mb-msg them">
         <div class="tr-flag"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>FI → TR · Otomatik çeviri</div>
         Merhaba! Türkiye'den mobilya aksesuarı arıyoruz. HS 9403 kapsamında sunumunuzu inceledik. 500 adet metal mobilya iskeleti için fiyat teklifi alabilir miyiz? CFR Helsinki, Ocak 2027 teslim.
         <div class="mb-orig">"Hei! Etsimme huonekalutarvikkeita Turkista. Tutkimme esityksesi HS 9403 alle…"</div>
         <div class="mb-t">14:15 · Mikko Virtanen</div>
        </div>
        <div class="mb-msg me">
         Merhaba Mikko, teklifinizi hazırlıyoruz. 500 adet için birim fiyat CFR Helsinki $47.50 · minimum sipariş karşılandı · L/C veya %30 avans + %70 B/L kopyasında ödeme koşulları geçerli.
         <div class="mb-t">14:18 · ✓✓ Okundu</div>
        </div>
        <div class="mb-msg me">
         Ürün kataloğumuzun son sürümü ekte. Sertifikalarımız (ISO 9001, FSC, TSE) sayfa 12'de.
         <div class="mb-attach"><div class="mb-ai"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div><b>Katalog-2026-Q3.pdf</b><br><span style="font-size:10.5px;opacity:.7">8.4 MB · PDF</span></div></div>
         <div class="mb-t">14:19 · ✓✓ Okundu</div>
        </div>
        <div class="mb-msg them">
         <div class="tr-flag"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>FI → TR · Otomatik çeviri</div>
         Hızlı teklif için teşekkürler! Fiyat rekabetçi. 500 adet yerine 800 adet için indirim yapabilir misiniz? Ayrıca gümrük hattımızın Rotterdam üzerinden geçmesini tercih ederiz.
         <div class="mb-orig">"Tack för snabb offert! Priset är konkurrenskraftigt. Kan ni ge rabatt för 800 st…"</div>
         <div class="mb-t">14:22 · Mikko Virtanen</div>
        </div>
        <div class="mb-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span> Mikko <span data-i18n="chat_typing">yazıyor…</span></div>
       </div>
       <div class="mp-input">
        <div class="mp-tools">
         <button title="Dosya ekle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
         <button title="Resim"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
         <button title="Emoji"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg></button>
        </div>
        <textarea maxlength="4000" placeholder="Yanıt yazın… (Enter göndermek, Shift+Enter yeni satır)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
        <button class="mp-send" onclick="sendMsg()" title="Gönder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
       </div>
       <div class="mp-lang"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/></svg>Türkçe yazın · Karşı tarafa <b>Fince</b> olarak iletilecek · Otomatik çeviri aktif</div>
      </div>
     </div>
    </div>

    <!-- PEOPLE / Prospeo-style contact discovery -->
    <div class="dpanel" id="dp-people">
     <div class="ppl-hd">
      <div>
       <h2><span data-i18n="ppl_title">Kişiler</span> <span style="background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;font-size:11px;padding:3px 9px;border-radius:100px;font-weight:700;letter-spacing:.05em;margin-left:6px;vertical-align:middle">PRO</span></h2>
       <p class="sub" data-i18n="ppl_sub">Doğrulanmış firmalardaki karar vericilere doğrudan erişim. E-posta ve telefon bilgilerini tek tıkla açın.</p>
      </div>
      <div class="credits">
       <div class="cr-i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
       <div style="flex:1"><div class="cr-n"><span id="creditN">47</span></div><div class="cr-l" data-i18n="ppl_credits">Kredi kaldı</div><div class="cr-b" data-i18n="ppl_renew">Aylık yenilenir</div></div><button onclick="openM('credits')" style="padding:8px 12px;background:linear-gradient(135deg,var(--teal),var(--emer));color:#fff;border:none;border-radius:8px;font-family:var(--sans);font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;white-space:nowrap"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span data-i18n="creds_add_btn">Kredi Ekle</span></button>
      </div>
     </div>
     <div class="ppl-fil">
      <div class="ppl-sr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg><input maxlength="200" placeholder="Kişi adı, firma veya ünvan ara..." data-i18n-placeholder="ppl_search" oninput="filterPeople(this.value)"/></div>
      <span class="fx active" onclick="pplFilter(this,'all')" data-i18n="ppl_all">Tümü</span>
      <span class="fx" onclick="pplFilter(this,'ceo')" data-i18n="ppl_ceo">CEO/Kurucu</span>
      <span class="fx" onclick="pplFilter(this,'purchasing')" data-i18n="ppl_purchasing">Satın Alma</span>
      <span class="fx" onclick="pplFilter(this,'sales')" data-i18n="ppl_sales">Satış</span>
      <span class="fx" onclick="pplFilter(this,'export')" data-i18n="ppl_export">İhracat/İthalat</span>
      <span class="fx" onclick="pplFilter(this,'ops')" data-i18n="ppl_ops">Operasyon</span>
     </div>
     <div class="ppl-tbl">
      <div class="ppl-thd">
       <div data-i18n="ppl_col_person">KİŞİ</div><div class="col-cmp" data-i18n="ppl_col_firm">FİRMA</div><div class="col-ttl" data-i18n="ppl_col_title">ÜNVAN</div><div data-i18n="ppl_col_email">E-POSTA</div><div class="col-phn" data-i18n="ppl_col_phone">TELEFON</div><div class="col-act" data-i18n="ppl_col_act">İŞLEM</div>
      </div>
      <div id="pplBody" class="ppl-body"></div>
     </div>
     <div style="margin-top:14px;padding:14px;background:var(--paper);border-radius:12px;font-size:12.5px;color:var(--body);display:flex;gap:12px;align-items:center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2" style="flex:0 0 auto"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <span><span data-i18n="ppl_kvkk">Kişi bilgileri kamuya açık kaynaklardan derlenmiştir.</span> <a onclick="toast(tt('toast_form_opened','Talep formu açıldı'))" style="color:var(--teal);cursor:pointer" data-i18n="ppl_kvkk_link">buradan başvurabilir</a>.</span>
     </div>
    </div>

    <!-- ANALYTICS / DEEP -->
    <div class="dpanel" id="dp-analytics">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
       <h2 data-i18n="an_deep_h">Derin Analiz</h2>
       <p class="sub">Firmanızın ağdaki konumu, ticaret akışı ve rakip karşılaştırması</p>
      </div>
      <div class="rr"><span>7g</span><span class="on">30g</span><span>90g</span><span>1y</span></div>
     </div>
     <div class="an-grid">
      <div class="an-c"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Ağ Erişimi</h4><div class="an-n">24,586</div><div class="an-d up">↑ %18 — Firmanız 24.586 kişilik ağa ulaştı</div><div class="an-bar"><div style="width:68%"></div></div></div>
      <div class="an-c"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>Ort. Eşleşme Skoru</h4><div class="an-n">89.4%</div><div class="an-d up">↑ 3.2 puan — Sektör ort. 76%</div><div class="an-bar"><div style="width:89%"></div></div></div>
      <div class="an-c"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Ort. Cevap Süresi</h4><div class="an-n">2s 14dk</div><div class="an-d dn">↓ 32dk daha yavaş — hedef: 2s altı</div><div class="an-bar"><div style="width:58%;background:linear-gradient(90deg,#c78a2a,#e6a54a)"></div></div></div>
      <div class="an-c"><h4><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>Dönüşüm Oranı</h4><div class="an-n">%12.4</div><div class="an-d up">↑ %2.1 — 100 eşleşmenin 12'si teklife dönüştü</div><div class="an-bar"><div style="width:12%"></div></div></div>
     </div>
     <div class="hs-table">
      <h3>En Çok Talep Gören HS Kodlarınız <span style="font-size:11px;font-weight:400;color:var(--faint)">Son 30 gün</span></h3>
      <div class="hs-r"><span class="hs-c">5208</span><div class="hs-nm"><b>Pamuklu dokuma kumaş</b><span>34 talep · 12 aktif teklif · 3 kapanan sipariş</span></div><div class="hs-b"><div style="width:88%"></div></div><span class="hs-v">88</span></div>
      <div class="hs-r"><span class="hs-c">9403</span><div class="hs-nm"><b>Mobilya (metal iskeletli)</b><span>28 talep · 8 aktif · 2 kapanan</span></div><div class="hs-b"><div style="width:72%"></div></div><span class="hs-v">72</span></div>
      <div class="hs-r"><span class="hs-c">5205</span><div class="hs-nm"><b>Pamuk ipliği (tarak)</b><span>19 talep · 5 aktif</span></div><div class="hs-b"><div style="width:52%"></div></div><span class="hs-v">52</span></div>
      <div class="hs-r"><span class="hs-c">4415</span><div class="hs-nm"><b>Ahşap paletler ve sandıklar</b><span>14 talep · 3 aktif · 1 kapanan</span></div><div class="hs-b"><div style="width:38%"></div></div><span class="hs-v">38</span></div>
      <div class="hs-r"><span class="hs-c">6006</span><div class="hs-nm"><b>Örme kumaşlar (elastan)</b><span>11 talep · 4 aktif</span></div><div class="hs-b"><div style="width:29%"></div></div><span class="hs-v">29</span></div>
     </div>
     <div class="hs-table">
      <h3>Rakip Karşılaştırması <span style="font-size:11px;font-weight:400;color:var(--faint)">Aynı sektör · aynı ülke · benzer büyüklük</span></h3>
      <div class="hs-r" style="grid-template-columns:1fr 100px 100px 100px"><div><b>Sizin firmanız</b><span style="color:var(--faint);font-size:11px">Kervea Ticaret A.Ş.</span></div><span style="text-align:center;color:var(--verify);font-weight:700">89.4%</span><span style="text-align:center;font-weight:700">142</span><span style="text-align:center;font-weight:700">%12.4</span></div>
      <div class="hs-r" style="grid-template-columns:1fr 100px 100px 100px"><div><b>Sektör Ortalaması</b><span style="color:var(--faint);font-size:11px">Tekstil · Türkiye · 10-50 çalışan</span></div><span style="text-align:center;color:var(--faint)">76%</span><span style="text-align:center;color:var(--faint)">98</span><span style="text-align:center;color:var(--faint)">%8.1</span></div>
      <div class="hs-r" style="grid-template-columns:1fr 100px 100px 100px;color:var(--faint)"><div><b>En iyi %10 (P90)</b><span style="font-size:11px">Sektör lideri firmalar</span></div><span style="text-align:center">94%</span><span style="text-align:center">218</span><span style="text-align:center">%18.7</span></div>
      <div class="hs-r" style="grid-template-columns:1fr 100px;color:var(--faint);border-top:1px solid var(--line);padding-top:12px;margin-top:6px"><b style="color:var(--body);font-family:var(--sans);font-weight:600">Metrikler:</b><span style="font-size:11px;text-align:right">Skor · Eşleşme · Dönüşüm</span></div>
     </div>
    </div>

    <!-- DOCUMENTS -->
    <div class="dpanel" id="dp-docs">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
       <h2>Belgelerim</h2>
       <p class="sub">Doğrulanmış belgeler firma sıralamanızı yükseltir. Belgeler AES-256 ile şifreli saklanır.</p>
      </div>
      <button class="btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Yeni Belge Yükle</button>
     </div>
     <div class="doc-grid">
      <div class="doc-c rgi">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
       <h4>Ticaret Sicil Gazetesi</h4>
       <div class="d-sub">Kervea Ticaret A.Ş.</div>
       <span class="d-st ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Doğrulandı</span>
       <div class="d-meta"><span>PDF · 1.2 MB</span><span>16.08.2026</span></div>
      </div>
      <div class="doc-c pdf">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
       <h4>Vergi Levhası</h4>
       <div class="d-sub">2026 dönemi</div>
       <span class="d-st ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Doğrulandı</span>
       <div class="d-meta"><span>PDF · 340 KB</span><span>02.01.2026</span></div>
      </div>
      <div class="doc-c pdf">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
       <h4>Faaliyet Belgesi</h4>
       <div class="d-sub">İTO tarafından onaylı</div>
       <span class="d-st ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Doğrulandı</span>
       <div class="d-meta"><span>PDF · 520 KB</span><span>14.03.2026</span></div>
      </div>
      <div class="doc-c iso">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z"/></svg></div>
       <h4>ISO 9001:2015</h4>
       <div class="d-sub">Kalite Yönetim Sistemi</div>
       <span class="d-st ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Doğrulandı</span>
       <div class="d-meta"><span>PDF · 890 KB</span><span>Yenileme: 2027</span></div>
      </div>
      <div class="doc-c iso">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 8 7 2-7 2-3 8-3-8-7-2 7-2 3-8z"/></svg></div>
       <h4>ISO 14001:2015</h4>
       <div class="d-sub">Çevre Yönetim Sistemi</div>
       <span class="d-st wn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2v6M12 16h.01"/></svg>15g içinde yenile</span>
       <div class="d-meta"><span>PDF · 760 KB</span><span>01.10.2026 sona eriyor</span></div>
      </div>
      <div class="doc-c img">
       <div class="d-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
       <h4>İmza Sirküleri</h4>
       <div class="d-sub">Genel Müdür — Emrah Yılmaz</div>
       <span class="d-st ok"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>Doğrulandı</span>
       <div class="d-meta"><span>PNG · 2.1 MB</span><span>05.02.2026</span></div>
      </div>
      <div class="doc-add" onclick="toast(tt('toast_docs_opening','Belge yükleme aracı açılıyor'))">
       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
       <b style="color:var(--body);display:block;margin-bottom:2px">Yeni belge ekle</b>
       <span style="font-size:11px">PDF, PNG, JPG · max 20 MB</span>
      </div>
     </div>
    </div>

    <!-- TEAM MANAGEMENT -->
    <div class="dpanel" id="dp-team">
     <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
       <h2 data-i18n="tm_title">Ekip Yönetimi</h2>
       <p class="sub" data-i18n="tm_sub">Firmanızda birden fazla kullanıcı hesabı yönetin. Roller ve izinler.</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
       <span style="font-size:12px;color:var(--faint)"><b style="color:var(--ink)">4/10</b> <span data-i18n="tm_seats">koltuk</span></span>
       <button class="btn" onclick="openInviteModal()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg><span data-i18n="tm_invite">Kullanıcı Davet Et</span></button>
      </div>
     </div>
     <div class="tm-tbl">
      <div class="tm-thd">
       <div data-i18n="tm_col_user">KULLANICI</div><div class="col-role" data-i18n="tm_role">ROL</div><div class="col-perms" data-i18n="tm_perms">İZİNLER</div><div class="col-last" data-i18n="tm_last">SON ETKİNLİK</div><div data-i18n="tm_status">DURUM</div><div></div>
      </div>
      <div class="tm-row" id="tm-emrah"><div class="tm-user"><div class="av" style="background:linear-gradient(135deg,#0D8A80,#0A5F56)">EY</div><div><b>Emrah Yılmaz</b><span>emrah@kervea.com · Sen</span></div></div>
       <div class="col-role"><span class="tm-role-badge owner" data-i18n="tm_owner">Sahip</span></div>
       <div class="col-perms" style="font-size:12px;color:var(--body)" data-i18n="tm_p_all">Tüm modüller</div>
       <div class="col-last" style="font-size:12px;color:var(--faint)">Şu an aktif</div>
       <div><span class="tm-status ok"><span class="dot"></span><span data-i18n="tm_active">Aktif</span></span></div>
       <div style="text-align:right;position:relative"><button class="tm-dot" onclick="toggleTmMenu('emrah',this)" title="Menu">⋮</button></div>
      </div>
      <div class="tm-row" id="tm-selin"><div class="tm-user"><div class="av" style="background:linear-gradient(135deg,#8b5cf6,#6366f1)">SD</div><div><b>Selin Demir</b><span>selin.demir@kervea.com</span></div></div>
       <div class="col-role"><span class="tm-role-badge admin" data-i18n="tm_admin">Yönetici</span></div>
       <div class="col-perms" style="font-size:12px;color:var(--body)" data-i18n="tm_p_all">Tüm modüller</div>
       <div class="col-last" style="font-size:12px;color:var(--faint)">2 saat önce</div>
       <div><span class="tm-status ok"><span class="dot"></span><span data-i18n="tm_active">Aktif</span></span></div>
       <div style="text-align:right;position:relative"><button class="tm-dot" onclick="toggleTmMenu('selin',this)" title="Menu">⋮</button></div>
      </div>
      <div class="tm-row" id="tm-mehmet"><div class="tm-user"><div class="av" style="background:linear-gradient(135deg,#c78a2a,#e6a54a)">MK</div><div><b>Mehmet Karaca</b><span>mehmet.k@kervea.com</span></div></div>
       <div class="col-role"><span class="tm-role-badge sales" data-i18n="tm_sales">Satış</span></div>
       <div class="col-perms" style="font-size:12px;color:var(--body)" data-i18n="tm_p_msg">Sadece mesajlaşma</div>
       <div class="col-last" style="font-size:12px;color:var(--faint)">Dün 18:34</div>
       <div><span class="tm-status ok"><span class="dot"></span><span data-i18n="tm_active">Aktif</span></span></div>
       <div style="text-align:right;position:relative"><button class="tm-dot" onclick="toggleTmMenu('mehmet',this)" title="Menu">⋮</button></div>
      </div>
      <div class="tm-row" id="tm-ayse"><div class="tm-user"><div class="av" style="background:linear-gradient(135deg,#3b82f6,#60a5fa)">AŞ</div><div><b>Ayşe Şahin</b><span>ayse.sahin@kervea.com</span></div></div>
       <div class="col-role"><span class="tm-role-badge ops" data-i18n="tm_ops">Operasyon</span></div>
       <div class="col-perms" style="font-size:12px;color:var(--body)" data-i18n="tm_p_prof">Profil + Doküman</div>
       <div class="col-last" style="font-size:12px;color:var(--faint)">3 gün önce</div>
       <div><span class="tm-status wn"><span class="dot"></span><span data-i18n="tm_pending">Beklemede</span></span></div>
       <div style="text-align:right;position:relative"><button class="tm-dot" onclick="toggleTmMenu('ayse',this)" title="Menu">⋮</button></div>
      </div>
     </div>
     <div style="margin-top:16px;background:linear-gradient(135deg,var(--card),var(--paper));border:1px solid var(--line);border-radius:12px;padding:20px;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:20px">
      <div>
       <h4 style="font-family:var(--serif);font-size:14px;margin-bottom:6px;color:var(--ink)">Rol tabanlı erişim kontrolü</h4>
       <p style="font-size:12px;color:var(--body);line-height:1.6">Her kullanıcının erişebileceği modüller ve gerçekleştirebileceği işlemler rolüne göre otomatik ayarlanır. Sahip &gt; Yönetici &gt; Satış = Operasyon &gt; Sadece görüntüleme.</p>
      </div>
      <div style="border-left:1px solid var(--line);padding-left:20px">
       <div style="font-family:var(--serif);font-size:20px;font-weight:700;color:var(--teal)">4</div>
       <div style="font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em">Aktif kullanıcı</div>
      </div>
      <div style="border-left:1px solid var(--line);padding-left:20px">
       <div style="font-family:var(--serif);font-size:20px;font-weight:700;color:var(--ink)">6</div>
       <div style="font-size:11px;color:var(--faint);text-transform:uppercase;letter-spacing:.05em">Boş koltuk</div>
      </div>
     </div>
    </div>

    <!-- ACTIVITY TIMELINE -->
    <div class="dpanel" id="dp-activity">
     <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
       <h2 data-i18n="ac_title">Aktivite Zaman Çizelgesi</h2>
       <p class="sub" data-i18n="ac_sub">Son 30 günün tam kaydı.</p>
      </div>
     </div>
     <div class="ac-filters">
      <span class="ac-fx active" onclick="acFilter(this,'all')" data-i18n="ac_filter_all">Tümü</span>
      <span class="ac-fx" onclick="acFilter(this,'msg')" data-i18n="ac_filter_msg">Mesajlar</span>
      <span class="ac-fx" onclick="acFilter(this,'match')" data-i18n="ac_filter_match">Eşleşmeler</span>
      <span class="ac-fx" onclick="acFilter(this,'doc')" data-i18n="ac_filter_doc">Belgeler</span>
      <span class="ac-fx" onclick="acFilter(this,'prof')" data-i18n="ac_filter_prof">Profil</span>
     </div>
     <div class="ac-timeline" id="acList">
      <!-- Populated by renderActivity() -->
     </div>
    </div>

    <!-- PROSPECT -->
    <div class="dpanel" id="dp-prospect">
     <h2 data-i18n="pr_title">Prospektüs Üretici</h2>
     <p class="sub" data-i18n="pr_desc">Firmanızın veya bir eşleşmenin tek sayfalık tanıtım belgesini üretin. Aktif dilde, gerçek profil verilerinden.</p>
     <div class="dcard">
      <div class="fg" style="grid-template-columns:1fr">
       <div>
        <label class="fl" data-i18n="pr_who">Kimin için hazırlıyorsunuz?</label>
       <div class="prosp-usecases">
        <div class="prosp-uc-tile" onclick="selectProspTarget(this,'meetings')" data-selected="true">
         <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
         <div class="prosp-uc-t" data-i18n="pr_l1">Alıcı görüşmeleri öncesi bilgi paylaşımı</div>
        </div>
        <div class="prosp-uc-tile" onclick="selectProspTarget(this,'fair')">
         <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
         <div class="prosp-uc-t" data-i18n="pr_l2">Fuar ve etkinliklerde dijital kartvizit</div>
        </div>
        <div class="prosp-uc-tile" onclick="selectProspTarget(this,'social')">
         <div class="prosp-uc-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
         <div class="prosp-uc-t" data-i18n="pr_l3">Sosyal medya ve web sitesinde referans</div>
        </div>
       </div>
       <div class="prosp-cta-row">
        <button class="btn prosp-cta-primary" onclick="downloadProspectus(window._prospTarget||'meetings')">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         <span data-i18n="pr_dl_pdf">Prospektüsümü PDF olarak indir</span>
        </button>
        <button class="btn btn-ghost prosp-cta-secondary" onclick="toast((T[LANG]&&T[LANG].vs_prev)||'Önizle')">
         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
         <span data-i18n="vs_prev">Önizle</span>
        </button>
       </div>
       <button class="btn sec" onclick="toast(tt('toast_print_pdf','Tarayıcının yazdır menüsünden PDF olarak kaydedin'))"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg><span data-i18n="pr_pdf">PDF Olarak Yazdır</span></button>
      </div>
     </div>
    </div>
    </div><!-- /dp-prospect (eksik kapanış — Faz 17) -->
   <!-- SETTINGS -->
    <div class="dpanel" id="dp-settings">
     <h2>Ayarlar</h2>
     <p class="sub">Hesap ve güvenlik tercihleri.</p>
     <div class="dcard">
      <h3>Güvenlik</h3>
      <p class="card-sub">Hesabınızı ve verilerinizi koruma altına alan katmanlar.</p>
      <div class="tglrow"><div class="l"><b>İki Faktörlü Kimlik Doğrulama (2FA)</b><span>SMS + Authenticator uygulaması ile ek onay</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Giriş bildirimleri</b><span>Yeni cihaz veya lokasyondan giriş olduğunda e-posta al</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Hassas veri değişiklikleri için ek onay</b><span>Vergi No, KEP, IBAN değişikliğinde SMS onayı</span></div><label class="tgl"><input type="checkbox"/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Şüpheli aktivite otomatik askıya alma</b><span>Kısa sürede çok sayıda başarısız giriş denemesinde hesabı kilitle</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      
      <h3 style="margin-top:24px">Bildirim Tercihleri</h3>
      <p class="card-sub">E-posta ve messenger bildirimlerinizi yönetin.</p>
      <div class="tglrow" style="background:var(--chip)"><div class="l"><b>Tüm sistem bildirimleri</b><span>Alt kategoriler için hepsini kontrol eder</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Yeni eşleşmeler & mesajlar</b><span>Uyum skoru yüksek yeni firma önerileri</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Ürün & sektör güncellemeleri</b><span>Takip ettiğiniz ürün/sektörlerde yeni fırsatlar</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Hatırlatmalar, durumlar ve güncellemeler</b><span>Yarım kalan işlemler, profil eksikleri, doğrulama bildirimleri</span></div><label class="tgl"><input type="checkbox"/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Navlun/lojistik fiyat değişimleri</b><span>Seçili destinasyonlar için haftalık navlun raporu</span></div><label class="tgl"><input type="checkbox"/><span class="slider"></span></label></div>
      <div class="tglrow"><div class="l"><b>Haftalık özet raporu</b><span>Pazartesi sabahı geçmiş haftanın performans özeti</span></div><label class="tgl"><input type="checkbox" checked/><span class="slider"></span></label></div>
      
      <h3 style="margin-top:24px">Anlık Bildirim Kanalı</h3>
      <p class="card-sub">Yeni eşleşme geldiğinde nereden haber almak istersiniz?</p>
      <div class="msg-conn selected" onclick="this.classList.add('selected');this.nextElementSibling.classList.remove('selected')">
       <div class="ico tg"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3L2 10l7 3 3 7 10-17zm-3 3L9 15l-4-1.5L19 6z"/></svg></div>
       <div class="info"><b>Telegram</b><span>@KerveaBot ile bağlan · saniyeler içinde bildirim al</span></div>
       <div class="radio"></div>
      </div>
      <div class="msg-conn" onclick="this.classList.add('selected');this.previousElementSibling.classList.remove('selected')">
       <div class="ico wa"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 2 .5 3.8 1.5 5.4L2 22l4.8-1.4C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm5 14c-.3.7-1.5 1.4-2.2 1.5-.6.1-1.3.1-4.5-1.3-3.2-1.4-5.2-4.7-5.4-4.9-.1-.2-1.2-1.7-1.2-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.7-.4 1-.4h.5c.3 0 .7 0 1 .8.4.9 1.2 3 1.3 3.2.1.2.2.4 0 .7-.1.2-.2.4-.4.6-.2.2-.4.5-.6.6-.2.2-.4.4-.2.8.3.4 1.2 2 2.6 3.2 1.8 1.6 3.3 2.1 3.7 2.3.4.2.7.2.9-.1.3-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2s2.4 1.1 2.8 1.3c.4.2.7.3.8.5.1.2.1 1-.3 1.7z"/></svg></div>
       <div class="info"><b>WhatsApp</b><span>WhatsApp Business ile bağlan · +90 850 XXX XXXX</span></div>
       <div class="radio"></div>
      </div>
      
      <h3 style="margin-top:24px">KVKK / GDPR — Veri Hakları</h3>
      <p class="card-sub">Verileriniz KVKK ve GDPR standartlarında saklanır.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
       <button class="btn sec sm" onclick="toast(tt('toast_data_export','Verilerin hazırlanıyor, e-postaya link gönderilecek'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v10m0 0l4-4m-4 4L8 8m-6 8v4a2 2 0 002 2h16a2 2 0 002-2v-4"/></svg>Verilerimi İndir (JSON)</button>
       <button class="btn sec sm" onclick="openM('kvkk')">Aydınlatma Metni</button>
       <button class="btn sec sm" onclick="openM('cookie')">Gizlilik / Çerez Politikası</button>
       <button class="btn sec sm" onclick="openM('sozl')">Üyelik Sözleşmesi</button>
       <button class="btn sm" style="background:#fff3f0;border-color:#ffcdc0;color:#c33" onclick="if(confirm(tt('confirm_delete_account','Hesabınız ve tüm verileriniz kalıcı olarak silinecek. Emin misiniz?'))) toast(tt('toast_delete_requested','Silme talebi alındı — 7 gün içinde tamamlanacak'))"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>Hesabı Sil</button>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</section>

<!-- FIRM PROFILE PAGE (real page, not modal) -->
@endverbatim
