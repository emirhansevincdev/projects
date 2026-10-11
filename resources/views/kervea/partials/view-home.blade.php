@verbatim
<section id="home" class="view on">
 <div class="hhero">
  <div class="h-photo"></div>
  <div class="hbg">
   <!-- 3D dönen dünya küresi (amCharts 5 orthographic projection) -->
   <div id="globeMap" aria-label="Kervea küresel koridor haritası" role="img"></div>
 </div><!-- /.hbg -->

  <div class="wrap">
   <div class="htag"><span class="dot"></span><span data-i18n="tag_live">TÜRKİYE ↔ DÜNYA · 6 DİL</span></div>
   <h1 data-i18n="h_title">Modern <em>İpek Yolu</em> ile alıcınızı ve tedarikçinizi bulun.</h1>
      <div class="kv-hero-loop">
        <span class="kv-hero-loop-static" data-i18n="hero_loop_prefix">Doğrulanmış tedarikçiler:</span>
        <span class="kv-hero-loop-container" id="kvHeroLoopContainer" aria-live="polite">
          <span class="kv-hero-loop-item kv-hero-loop-active" data-region="tr" data-i18n="loop_tr">Türkiye</span>
          <span class="kv-hero-loop-item" data-region="af" data-i18n="loop_af">Batı Afrika</span>
          <span class="kv-hero-loop-item" data-region="eu" data-i18n="loop_eu">Avrupa</span>
          <span class="kv-hero-loop-item" data-region="me" data-i18n="loop_me">Ortadoğu</span>
          <span class="kv-hero-loop-item" data-region="as" data-i18n="loop_as">Asya</span>
        </span>
      </div>
   <p class="lead" data-i18n="h_lead">Vergi levhası ve sicil kaydıyla doğrulanmış firmalar. 6 dilde çeviri, uçtan uca şifreli mesajlaşma.</p>
   <div class="searchbig">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9FC3B9" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
    <input maxlength="200" id="qinput" placeholder="Buraya aramak istediğinizi yazın — ürün, firma veya HS kodu"/>
    <button class="btn" onclick="runSearch()" data-i18n="f_match">Eşleştir</button>
   </div>
   <div class="dene">
    <span class="lbl" data-i18n="dene_lbl">DENE</span>
    <span class="c" data-i18n="qt1" onclick="quickTry(this.textContent)">Finlandiya'da mobilya aksesuarı satın almacısı</span>
    <span class="c" data-i18n="qt2" onclick="quickTry(this.textContent)">Fildişi Sahili'nde kakao tedarikçisi</span>
    <span class="c" data-i18n="qt3" onclick="quickTry(this.textContent)">Kazakistan'da tekstil alıcısı</span>
   </div>
   <div class="qf">
    <span class="lbl" data-i18n="qf_lbl">HIZLI FİLTRE</span>
    <div class="dd" id="ddCountry"></div>
    <div class="seg">
     <button class="on" onclick="setDir('EXP',this)" data-i18n="f_exp">İhracat</button>
     <button onclick="setDir('IMP',this)" data-i18n="f_imp">İthalat</button>
    </div>
    <!-- Compact sector picker inline with the filter row -->
    <div class="secpick compact" id="secPick">
     <button class="secpick-trigger" onclick="toggleSecPick()">
      <span id="secPickTrigger"><span class="sp-lbl">Sektör</span></span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chev"><polyline points="6 9 12 15 18 9"/></svg>
     </button>
     <div class="secpick-panel" id="secPickPanel">
      <div class="secpick-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg><input type="text" placeholder="Sektör ara..." id="secSearch" oninput="filterSecGrid(this.value)"/ maxlength="200"></div>
      <div class="secpick-grid" id="secStripHero"></div>
     </div>
    </div>
    <!-- Sector select kept for state, hidden — visual chip strip below is the primary UI -->
    <select id="secSel" onchange="applyFilters();renderSecStrip()" style="display:none"></select>
   </div>
   <div class="stats" id="statsBar">
    <div class="statc"><div class="n" data-stat="firms" data-target="0">0</div><div class="l" data-i18n="s_pos">Aktif firma</div></div>
    <div class="statc"><div class="n" data-stat="countries" data-target="0">0</div><div class="l" data-i18n="s_ctr">Ülke ve bölge</div></div>
    <div class="statc"><div class="n" data-stat="sectors" data-target="0">0</div><div class="l" data-i18n="s_sec">Sektör</div></div>
    <div class="statc"><div class="n" data-stat="langs" data-target="0">0</div><div class="l" data-i18n="s_lng">Dil</div></div>
   </div>
  </div>
 </div>
 <div class="wrap sec" id="firmsSec">
  <div class="firmshead">
   <div>
    <h2 data-i18n="firms_h">Firmalar</h2>
    <div class="cnt"><span id="firmCnt">25</span> <span data-i18n="firms_cnt">eşleşme · uyum skoruna göre sıralı</span></div>
   </div>
   <div class="sort">
    <span data-i18n="sort_lbl">Sırala:</span>
    <select onchange="sortBy(this.value)">
     <option value="uyum" data-i18n="sort_match">Uyum</option>
     <option value="yr" data-i18n="sort_year">Kuruluş</option>
     <option value="nm" data-i18n="sort_name">İsim</option>
    </select>
   </div>
  </div>
  <div class="pgrid" id="posgrid"></div>
 </div>


 <!-- WHY KERVEA (trust bar - 3 photo cards over image backgrounds) -->
<div class="whyk-sec"><div class="wrap">
 <div class="whyk-hd">
  <h2 data-i18n="why_h">Neden Kervea?</h2>
  <p data-i18n="why_p">Doğrulanmış firmalarla doğrudan iletişim. Komisyon yok, güvenilmez tedarikçi yok, sadece gerçek ticaret.</p>
 </div>
 <div class="whyk">
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20l2-14h16l2 14"/><path d="M6 20V10M18 20V10M12 20V10"/></svg></div>
    <div class="whyk-n">249</div>
    <div class="whyk-l" data-i18n="why_1t">Ülke koridoru</div>
   </div>
  </div>
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
    <div class="whyk-n">%94</div>
    <div class="whyk-l" data-i18n="why_2t">Doğrulama başarısı</div>
   </div>
  </div>
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8l6 6 4-4 6 6M15 8h6v6"/></svg></div>
    <div class="whyk-n">6</div>
    <div class="whyk-l" data-i18n="why_3t">Dilde canlı çeviri</div>
   </div>
  </div>
 </div>
</div></div>

 <!-- HOW KERVEA WORKS (3 photo cards) -->
<div class="hiw-sec"><div class="wrap">
 <div class="hiw-hd">
  <span class="tag" data-i18n="hiw_tag">NASIL ÇALIŞIR</span>
  <h2 data-i18n="hiw_h">Aracı yok. Sadece <em style="font-style:normal;color:var(--teal)">gerçek ticaret</em>.</h2>
 </div>
 <div class="hiw">
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">01</div>
    <h3 data-i18n="hiw_1t">Doğrulanmış partneri bulun</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_1a">AI eşleştirme</span><span class="hiw-tg" data-i18n="hiw_1b">3 aşamalı doğrulama</span><span class="hiw-tg" data-i18n="hiw_1c">Kervea rozeti</span></div>
   </div>
  </div>
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">02</div>
    <h3 data-i18n="hiw_2t">Doğrudan üreticiyle konuşun</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_2a">Otomatik çeviri</span><span class="hiw-tg" data-i18n="hiw_2b">E2E şifreli</span><span class="hiw-tg" data-i18n="hiw_2c">Karar vericiye erişim</span></div>
   </div>
  </div>
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">03</div>
    <h3 data-i18n="hiw_3t">Anlaşın, sevk edin</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_3a">INCOTERM standardı</span><span class="hiw-tg" data-i18n="hiw_3b">LC/TT desteği</span><span class="hiw-tg" data-i18n="hiw_3c">Lojistik ağı</span></div>
   </div>
  </div>
 </div>
</div></div>

<!-- ============================================
     KERVEA KÜRSÜSÜ (Faz 2 · Wall of Love)
     Dürüst versiyon: Kervea 2026'da başladı, sahte
     referans yok. Schema.org iskeleti hazır — ilk
     doğrulanmış üye referansları geldikçe doldurulacak.
     ============================================ -->
<section id="kd-block" class="kd-wrap" aria-labelledby="kd-title" itemscope itemtype="https://schema.org/Organization">
  <meta itemprop="name" content="Kervea"/>
  <meta itemprop="url" content="https://kervea.com"/>
  <div class="kd-inner">

    <header class="kd-head">
      <div class="kd-eyebrow" data-i18n="kd_eyebrow">KERVEA KÜRSÜSÜ</div>
      <h2 id="kd-title" class="kd-title" data-i18n="kd_title">Referanslarımızı satın alamazsınız.</h2>
      <p class="kd-lead" data-i18n="kd_lead">
        Kervea 2026 pilot dönemindedir. Bu bölümde sadece <strong>doğrulanmış üyelerin gerçek yorumları</strong> yayınlanır — LinkedIn hesabı, şirket sicili ve gerçek ticaret hacmi eşleşen üyeler.
      </p>
    </header>

    <!-- MANIFESTO KART · Neden burada sahte yorum yok -->
    <article class="kd-card kd-manifesto" aria-label="Referans standardımız">
      <div class="kd-badge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
        </svg>
        <span data-i18n="kd_badge">Referans Standardımız</span>
      </div>
      <h3 class="kd-mtitle" data-i18n="kd_m_title">Neden burada henüz yorum yok?</h3>
      <div class="kd-mgrid">
        <div class="kd-mrow">
          <span class="kd-mnum">01</span>
          <div>
            <div class="kd-mrow-t" data-i18n="kd_m1t">Kervea 2026 pilot dönemindedir</div>
            <div class="kd-mrow-d" data-i18n="kd_m1d">İlk 10 doğrulanmış üye şu anda entegrasyon aşamasında. Referansları yayına alındıkça buraya, tarih ve doğrulama rozetiyle eklenir.</div>
          </div>
        </div>
        <div class="kd-mrow">
          <span class="kd-mnum">02</span>
          <div>
            <div class="kd-mrow-t" data-i18n="kd_m2t">Ödeme karşılığı yorum kabul etmiyoruz</div>
            <div class="kd-mrow-d" data-i18n="kd_m2d">Hiçbir üye, yorum veya öne çıkma karşılığında ücretlendirilmez. Yorumlar üyenin kendi profilinden, düzenlenmemiş olarak alınır.</div>
          </div>
        </div>
        <div class="kd-mrow">
          <span class="kd-mnum">03</span>
          <div>
            <div class="kd-mrow-t" data-i18n="kd_m3t">Her yorumun arkasında doğrulanabilir bir üye vardır</div>
            <div class="kd-mrow-d" data-i18n="kd_m3d">Yorum yazan her üyenin LinkedIn profili, şirket ticari sicili ve son 12 aydaki ticaret hacmi kontrol edilir. Bu üç kontrol tamamlanmadan yorum yayınlanmaz.</div>
          </div>
        </div>
        <div class="kd-mrow">
          <span class="kd-mnum">04</span>
          <div>
            <div class="kd-mrow-t" data-i18n="kd_m4t">Olumsuz yorumlar da yayınlanır</div>
            <div class="kd-mrow-d" data-i18n="kd_m4d">Kervea'yı değerlendiren üyeler bunu 1–5 yıldız aralığında yapar. Filtreleme yoktur; olumsuz geri bildirim, cevabımızla birlikte yayınlanır.</div>
          </div>
        </div>
      </div>
    </article>

    <!-- YER TUTUCU KARTLAR · İlk 3 referans slot'u -->
    <div class="kd-grid" aria-label="İlk referans slotları">
      <article class="kd-slot" aria-label="İlk referans slotu">
        <div class="kd-slot-tag" data-i18n="kd_slot_open">SLOT AÇIK</div>
        <div class="kd-slot-icon" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <div class="kd-slot-txt" data-i18n="kd_slot1">İlk doğrulanmış üye referansı için ayrıldı.</div>
        <div class="kd-slot-sub" data-i18n="kd_slot_when">Üye entegrasyonu tamamlandığında yayına alınır.</div>
      </article>
      <article class="kd-slot" aria-label="İkinci referans slotu">
        <div class="kd-slot-tag" data-i18n="kd_slot_open">SLOT AÇIK</div>
        <div class="kd-slot-icon" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <div class="kd-slot-txt" data-i18n="kd_slot2">İkinci doğrulanmış üye referansı için ayrıldı.</div>
        <div class="kd-slot-sub" data-i18n="kd_slot_when">Üye entegrasyonu tamamlandığında yayına alınır.</div>
      </article>
      <article class="kd-slot" aria-label="Üçüncü referans slotu">
        <div class="kd-slot-tag" data-i18n="kd_slot_open">SLOT AÇIK</div>
        <div class="kd-slot-icon" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <div class="kd-slot-txt" data-i18n="kd_slot3">Üçüncü doğrulanmış üye referansı için ayrıldı.</div>
        <div class="kd-slot-sub" data-i18n="kd_slot_when">Üye entegrasyonu tamamlandığında yayına alınır.</div>
      </article>
    </div>

    <!-- CTA · Erken üye ol -->
    <div class="kd-cta">
      <div class="kd-cta-txt">
        <div class="kd-cta-t" data-i18n="kd_cta_t">İlk 10 pilot üyeden biri olun.</div>
        <div class="kd-cta-d" data-i18n="kd_cta_d">Kervea'nın pilot döneminde yer alan üyeler, referansları platform ana sayfasında ve arama sonuçlarında öne çıkar. Listeleme ücretsizdir; Premium yıllık 280 USD'dir.</div>
      </div>
      <a class="btn kd-cta-btn" onclick="go('add')" data-i18n="kd_cta_btn">Firmamı Ekle</a>
    </div>

  </div>
</section>
<!-- /KERVEA KÜRSÜSÜ -->

<!-- ============================================
     KERVEA GEO BLOĞU (Faz 3 · Generative Engine Optimization)
     1) AI arama motorlarına doğrudan Kervea sorgulama butonları
     2) FAQPage schema.org markup — ChatGPT/Perplexity/Google AI
        Overviews'un yanıtlarına içerik olarak alması için
     ============================================ -->
<section id="geo-block" class="geo-wrap" aria-labelledby="geo-title" itemscope itemtype="https://schema.org/FAQPage">
  <div class="geo-inner">

    <!-- ÜST · AI'da Kervea'yı Sorun -->
    <header class="geo-head">
      <div class="geo-eyebrow" data-i18n="geo_eyebrow">AI ARAMA MOTORLARINDA KERVEA</div>
      <h2 id="geo-title" class="geo-title" data-i18n="geo_title">Kervea'yı AI'a sorun.</h2>
      <p class="geo-lead" data-i18n="geo_lead">
        Kervea hakkında bağımsız bir görüş almak için doğrudan AI arama motorlarına sorun. Aşağıdaki bağlantılar hazır sorguyla ilgili motoru açar — Kervea'nın kamuya açık bilgilerine dair yanıt alırsınız.
      </p>
    </header>

    <div class="geo-btns">
      <a class="geo-btn" href="https://chatgpt.com/?q=Kervea%20nedir%3F%20T%C3%BCrkiye-Bat%C4%B1%20Afrika%20aras%C4%B1%20B2B%20ticaret%20e%C5%9Fle%C5%9Ftirme%20platformu%20Kervea%20hakk%C4%B1nda%20bilgi%20ver." target="_blank" rel="noopener noreferrer nofollow">
        <svg class="geo-ico" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.28 10.24a5.9 5.9 0 0 0-.51-4.85 6 6 0 0 0-6.46-2.87A6 6 0 0 0 4.98 4.44 5.9 5.9 0 0 0 1.72 13.76a5.9 5.9 0 0 0 .51 4.85 6 6 0 0 0 6.46 2.87 5.98 5.98 0 0 0 4.51 2.02 6 6 0 0 0 5.82-4.34 5.9 5.9 0 0 0 3.26-9.32z"/></svg>
        <span class="geo-btn-l">ChatGPT</span>
        <span class="geo-btn-s" data-i18n="geo_ask">Sor</span>
      </a>
      <a class="geo-btn" href="https://www.perplexity.ai/?q=Kervea%20nedir%3F%20T%C3%BCrkiye-Bat%C4%B1%20Afrika%20aras%C4%B1%20B2B%20ticaret%20e%C5%9Fle%C5%9Ftirme%20platformu" target="_blank" rel="noopener noreferrer nofollow">
        <svg class="geo-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 21a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><path d="m21 21-4.35-4.35"/></svg>
        <span class="geo-btn-l">Perplexity</span>
        <span class="geo-btn-s" data-i18n="geo_ask">Sor</span>
      </a>
      <a class="geo-btn" href="https://www.google.com/search?q=Kervea+B2B+ticaret+e%C5%9Fle%C5%9Ftirme+platformu" target="_blank" rel="noopener noreferrer nofollow">
        <svg class="geo-ico" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        <span class="geo-btn-l">Google</span>
        <span class="geo-btn-s" data-i18n="geo_ask">Sor</span>
      </a>
      <a class="geo-btn" href="https://www.bing.com/search?q=Kervea+B2B+ticaret+e%C5%9Fle%C5%9Ftirme+platformu" target="_blank" rel="noopener noreferrer nofollow">
        <svg class="geo-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h6v16H4z"/><path d="M10 10l6 3-6 4z"/></svg>
        <span class="geo-btn-l">Bing</span>
        <span class="geo-btn-s" data-i18n="geo_ask">Sor</span>
      </a>
      <a class="geo-btn" href="https://you.com/search?q=Kervea+B2B+trade+matchmaking+platform+Turkey+West+Africa" target="_blank" rel="noopener noreferrer nofollow">
        <svg class="geo-ico" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M2 12h20"/></svg>
        <span class="geo-btn-l">You.com</span>
        <span class="geo-btn-s" data-i18n="geo_ask">Sor</span>
      </a>
    </div>

    <!-- SIKÇA SORULAN SORULAR · Schema.org FAQPage -->
    <div class="geo-faq">
      <h3 class="geo-faq-title" data-i18n="geo_faq_title">Sıkça Sorulan Sorular</h3>
      <p class="geo-faq-sub" data-i18n="geo_faq_sub">Kervea hakkında en çok sorulan sorular ve doğrudan cevapları. Bu bölüm AI arama motorları tarafından da okunur.</p>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q1_q">Kervea nedir?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q1_a">Kervea, satıcı ile alıcıyı Trademap ve resmi gümrük verileriyle doğrudan buluşturan bir B2B ticaret eşleştirme ağıdır. Aracı değildir, komisyon almaz. Listeleme ücretsizdir, Premium üyelik yıllık 280 USD'dir. İlk odak koridoru Türkiye ile Batı Afrika arasındadır.</div>
        </div>
      </details>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q2_q">Kervea Alibaba veya benzeri platformlardan nasıl farklıdır?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q2_a">Üç temel farkımız vardır. Birincisi, Kervea aracı değildir — satıcı ile alıcı doğrudan iletişim kurar, komisyon alınmaz. İkincisi, sıralama satın alınamaz — üyeler yalnızca uyum skorlarına göre sıralanır, öne çıkma ücreti yoktur. Üçüncüsü, ücretlendirme tamamen şeffaftır — yıllık 280 USD sabit Premium ücret, listeleme ücretsiz.</div>
        </div>
      </details>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q3_q">Kervea üyelerini nasıl doğrular?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q3_a">Kervea 4 kademeli bir doğrulama sistemi uygular: (1) e-posta doğrulaması, (2) resmi ticaret sicili kontrolü, (3) banka hesabı ve IBAN eşleştirmesi, (4) opsiyonel saha doğrulaması. Bu kademelerin hiçbiri ödeme karşılığında atlanamaz.</div>
        </div>
      </details>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q4_q">Kervea üyelik ücretlendirmesi nasıldır?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q4_a">Temel listeleme ücretsizdir — hiçbir sınırlama olmadan profil oluşturabilir, ürünlerinizi listeleyebilir, gelen talepleri alabilirsiniz. Premium üyelik yıllık 280 USD sabit bedeldir ve gelişmiş arama, öncelikli müşteri desteği, ticaret veri erişimi gibi ek özellikler sunar. Komisyon veya işlem bedeli yoktur.</div>
        </div>
      </details>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q5_q">Kervea hangi ülkeleri kapsıyor?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q5_a">Kervea 2026 pilot döneminde Türkiye ile Batı Afrika koridoruna (özellikle Senegal, Fildişi Sahili, Nijerya, Fas, Gana) odaklanır. Sonraki dönemlerde Kuzey Afrika, Körfez ülkeleri ve BDT koridorları eklenecektir.</div>
        </div>
      </details>

      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q6_q">Kervea hangi ödeme ve lojistik altyapısını sunar?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q6_a">Kervea LC (akreditif) ve TT (havale) gibi standart uluslararası ödeme yöntemlerini destekler. INCOTERMS standartlarına göre çalışan doğrulanmış lojistik ortaklarıyla entegrasyonu vardır. Ödeme ve teslimat işlemleri üyeler arasında doğrudan yürütülür — Kervea sürece taraf olmaz.</div>
        </div>
      </details>

    </div>

  </div>
</section>
<!-- /KERVEA GEO BLOĞU -->


</section>

<!-- ADD -->
@endverbatim
