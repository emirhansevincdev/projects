@verbatim
<section id="home" class="view on">
 <div class="hhero">
  <div class="h-photo"></div>
  <div class="hbg">
   {{-- 3D dönen dünya küresi (amCharts 5 orthographic projection) --}}
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
   <p class="lead" data-i18n="h_lead">Belgeleri bir yönetici tarafından incelenmiş firmalar. Ürün, firma adı veya HS koduyla arayın; sonuçları ülke ve sektöre göre daraltın.</p>
   <div class="searchbig">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9FC3B9" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
    <input maxlength="200" id="qinput" placeholder="Buraya aramak istediğinizi yazın — ürün, firma veya HS kodu"/>
    <button class="btn" onclick="runSearch()" data-i18n="f_match">Eşleştir</button>
   </div>
   <div class="dene">
    <span class="lbl" data-i18n="dene_lbl">DENE</span>
    <button type="button" class="c" data-i18n="qt1" data-cc="fi" data-dir="IMP" data-sec="9" onclick="quickTry(this)">Finlandiya'da mobilya alıcısı</button>
    <button type="button" class="c" data-i18n="qt2" data-cc="ci" data-dir="EXP" data-q="1801" onclick="quickTry(this)">Fildişi Sahili'nde kakao tedarikçisi</button>
    <button type="button" class="c" data-i18n="qt3" data-cc="kz" data-dir="IMP" data-sec="10" onclick="quickTry(this)">Kazakistan'da tekstil alıcısı</button>
   </div>
   <div class="qf">
    <span class="lbl" data-i18n="qf_lbl">HIZLI FİLTRE</span>
    <div class="dd" id="ddCountry"></div>
    <div class="seg">
     <button class="on" onclick="setDir('EXP',this)" data-i18n="f_exp">İhracat</button>
     <button onclick="setDir('IMP',this)" data-i18n="f_imp">İthalat</button>
    </div>
    {{-- Compact sector picker inline with the filter row --}}
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
    {{-- Sector select kept for state, hidden — visual chip strip below is the primary UI --}}
    <select id="secSel" onchange="applyFilters();renderSecStrip()" style="display:none"></select>
   </div>
   <div class="stats" id="statsBar">
    <div class="statc"><div class="n" data-stat="firms" data-target="0">0</div><div class="l" data-i18n="s_pos">Doğrulanmış firma</div></div>
    <div class="statc"><div class="n" data-stat="countries" data-target="0">0</div><div class="l" data-i18n="s_ctr">Firması olan ülke</div></div>
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


 {{-- WHY KERVEA (trust bar - 3 photo cards over image backgrounds) --}}
<div class="whyk-sec"><div class="wrap">
 <div class="whyk-hd">
  <h2 data-i18n="why_h">Neden Kervea?</h2>
  <p data-i18n="why_p">Kervea bir pazaryeri değildir: sepet, ödeme ve komisyon yoktur. Firmalar belgeleriyle başvurur, bir yönetici inceler; ticareti taraflar kendi aralarında yapar.</p>
 </div>
  <div class="whyk">
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></div>
    <div class="whyk-n" data-i18n="why_1n">Belge incelemesi</div>
    <div class="whyk-l" data-i18n="why_1t">Başvuran her firmanın belgeleri bir yönetici tarafından kontrol edilir; onaylananlar “doğrulanmış” rozetiyle listelenir.</div>
   </div>
  </div>
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 20l2-14h16l2 14"/><path d="M6 20V10M18 20V10M12 20V10"/></svg></div>
    <div class="whyk-n" data-i18n="why_2n">Komisyon yok</div>
    <div class="whyk-l" data-i18n="why_2t">Kervea satışa karışmaz. Sepet ve ödeme yoktur; anlaşma ve ödeme firmalar arasında yapılır.</div>
   </div>
  </div>
  <div class="whyk-card">
   <div class="whyk-content">
    <div class="whyk-ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></svg></div>
    <div class="whyk-n" data-i18n="why_3n">6 dil</div>
    <div class="whyk-l" data-i18n="why_3t">Site Türkçe, İngilizce, İspanyolca, Fransızca, Arapça ve Rusça kullanılabilir.</div>
   </div>
  </div>
 </div>
</div></div>

 {{-- HOW KERVEA WORKS (3 photo cards) --}}
<div class="hiw-sec"><div class="wrap">
 <div class="hiw-hd">
  <span class="tag" data-i18n="hiw_tag">NASIL ÇALIŞIR</span>
  <h2 data-i18n="hiw_h">Aracı yok. Sadece <em style="font-style:normal;color:var(--teal)">gerçek ticaret</em>.</h2>
 </div>
 <div class="hiw">
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">01</div>
    <h3 data-i18n="hiw_1t">Doğrulanmış firmayı bulun</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_1a">Ürün, firma veya HS kodu</span><span class="hiw-tg" data-i18n="hiw_1b">Ülke ve sektör filtresi</span><span class="hiw-tg" data-i18n="hiw_1c">Doğrulanmış rozeti</span></div>
   </div>
  </div>
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">02</div>
    <h3 data-i18n="hiw_2t">Doğrudan firmayla iletişime geçin</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_2a">Aynı sektörde mesajlaşma</span><span class="hiw-tg" data-i18n="hiw_2b">İletişim bilgisi: Premium</span><span class="hiw-tg" data-i18n="hiw_2c">Diğer sektörler: kredi</span></div>
   </div>
  </div>
  <div class="hiw-card">
   <div class="hiw-body">
    <div class="hiw-num">03</div>
    <h3 data-i18n="hiw_3t">Anlaşın, sevk edin</h3>
    <div class="hiw-tags"><span class="hiw-tg" data-i18n="hiw_3a">Profilde INCOTERM bilgisi</span><span class="hiw-tg" data-i18n="hiw_3b">Ödeme şekli firmalar arasında</span><span class="hiw-tg" data-i18n="hiw_3c">Kervea satışa karışmaz</span></div>
   </div>
  </div>
 </div>
</div></div>

<!-- ============================================
     KERVEA KÜRSÜSÜ
     Dürüst versiyon: Kervea 2026'da başladı, sahte
     referans yok. Schema.org iskeleti hazır — ilk
     doğrulanmış üye referansları geldikçe doldurulacak.
     ============================================ -->
<section id="kd-block" class="kd-wrap" aria-labelledby="kd-title">
  <div class="kd-inner">
    <header class="kd-head">
      <div class="kd-eyebrow" data-i18n="kd_eyebrow">KERVEA KÜRSÜSÜ</div>
      <h2 id="kd-title" class="kd-title" data-i18n="kd_title">Referanslar, gerçek üyeler yazdıkça yayınlanır.</h2>
      <p class="kd-lead" data-i18n="kd_lead">Kervea yeni bir ağdır ve henüz yayınlanmış bir üye yorumu yoktur. Sahte referans göstermiyoruz; üyeler yazıp onay verdikçe burada yer alacak. Yorum karşılığında ücret alınmaz.</p>
    </header>
    <div class="kd-cta">
      <div class="kd-cta-txt">
        <div class="kd-cta-t" data-i18n="kd_cta_t">Firmanızı Kervea'ya ekleyin.</div>
        <div class="kd-cta-d" data-i18n="kd_cta_d">Listeleme ücretsizdir. Başvurunuzdaki belgeler incelendikten sonra profiliniz yayına girer.</div>
      </div>
      <a class="btn kd-cta-btn" role="button" tabindex="0" onclick="go('add')" data-i18n="kd_cta_btn">Firmamı Ekle</a>
    </div>
  </div>
</section>
{{-- /KERVEA KÜRSÜSÜ --}}

<!-- ============================================
     SIKÇA SORULAN SORULAR (schema.org FAQPage)
     ============================================ -->
<section id="geo-block" class="geo-wrap" aria-labelledby="geo-title" itemscope itemtype="https://schema.org/FAQPage">
  <div class="geo-inner">
    <header class="geo-head">
      <div class="geo-eyebrow" data-i18n="geo_eyebrow">SSS</div>
      <h2 id="geo-title" class="geo-title" data-i18n="geo_title">Sıkça sorulan sorular</h2>
      <p class="geo-lead" data-i18n="geo_lead">Kervea'nın ne yaptığı ve ne yapmadığı hakkında kısa cevaplar.</p>
    </header>
    <div class="geo-faq">
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q1_q">Kervea nedir?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q1_a">Kervea, doğrulanmış firmaları ülke ve sektöre göre listeleyen çok dilli bir B2B ticaret eşleştirme ağıdır. Pazaryeri değildir; sepet, ödeme ve komisyon yoktur. Satıcı ile alıcıyı buluşturur, ticareti taraflar kendi aralarında yapar.</div>
        </div>
      </details>
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q2_q">Kervea bir pazaryeri mi?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q2_a">Hayır. Kervea satış yapmaz, ödeme toplamaz ve komisyon almaz. Firmaları belgeleriyle doğrular, listeler ve iletişim kurmalarını sağlar.</div>
        </div>
      </details>
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q3_q">Firmalar nasıl doğrulanıyor?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q3_a">Başvuran firma ticari kimliğini ve belgelerini (ör. vergi levhası, ticaret sicili) yükler. Belgeleri bir yönetici inceler. Onaylanan firmanın profili “doğrulanmış” rozetiyle yayına girer; onaylanmayan başvuru yayınlanmaz.</div>
        </div>
      </details>
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q4_q">Ücret nasıl işliyor?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q4_a">Firma eklemek ve listelenmek ücretsizdir. Premium üyelik yıllıktır ve firmaların iletişim bilgilerini görmenizi sağlar. Başka sektörlerdeki kişilere ulaşmak için kredi kullanılır: üyelikte başlangıç kredisi tanımlanır, ek kredi paketi satın alınabilir. Kervea hiçbir işlemden komisyon almaz.</div>
        </div>
      </details>
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q5_q">Hangi ülkelerden firma var?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q5_a">Herhangi bir ülkeden başvurulabilir. Ana sayfadaki küre üzerinde firması olan ülkeler vurgulanır; bir ülkenin üzerine gelince o ülkedeki doğrulanmış firma sayısını görürsünüz.</div>
        </div>
      </details>
      <details class="geo-q" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <summary itemprop="name" data-i18n="geo_q6_q">Ödeme ve lojistik hizmeti var mı?</summary>
        <div class="geo-a" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <div itemprop="text" data-i18n="geo_q6_a">Hayır. Ödeme şekli (ör. akreditif, havale) ve teslimat şartları (INCOTERM) firma profilinde belirtilir; ödeme ve sevkiyat firmalar arasında yürür, Kervea sürece taraf olmaz.</div>
        </div>
      </details>
    </div>
  </div>
</section>
{{-- /SSS --}}


</section>

{{-- ADD --}}
@endverbatim
