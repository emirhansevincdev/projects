@verbatim
<section id="pricing" class="view">
 <div class="wrap">
  <div class="ph"><h1 data-i18n="pr_h">Fiyatlandırma</h1><p data-i18n="pr_p">Listeleme ücretsiz. Premium yıllık. Komisyon yok.</p></div>
  <div class="sec" style="text-align:center">

   <!-- ═══ TEK PLAN KARTI (fiyat sunucu yapılandırmasından gelir) ═══ -->
   <div class="single-plan">
    <div class="sp-inner">
     <div class="sp-badge" data-i18n="sp_badge">KERVEA PREMIUM</div>
     <div class="sp-price">
      <span class="sp-currency">$</span><span class="sp-amount" id="spAmount"></span><span class="sp-per" data-i18n="sp_per">/yıl</span>
     </div>
     <p class="sp-sub" data-i18n="sp_sub">Yıllık üyelik · Komisyon yok · Sıralama satın alınamaz</p>

     <ul class="sp-features">
      <li><span class="sp-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span><span data-i18n="sp_f1">Firmaların e-posta, telefon ve web sitesi bilgileri (firma izin verdiyse)</span></li>
      <li><span class="sp-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span><span data-i18n="sp_f2">Her Premium alımında bonus kredi</span></li>
      <li><span class="sp-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></span><span data-i18n="sp_f3">Komisyon ve işlem ücreti yok</span></li>
     </ul>

     <button class="btn sp-cta" type="button" onclick="openM('pay')" data-i18n="sp_cta">Kervea Premium'a Başla</button>
     <p class="sp-note" data-i18n="sp_note">Premium olmadan da firma ekleyebilir, arama yapabilir ve profilinizi yayınlayabilirsiniz.</p>

    </div>
   </div>


   <!-- ═══ PROMO KODU ═══ -->
   <div class="promobox">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
    <div class="txt"><b data-i18n="promo_h2">Promosyon kodu</b><span data-i18n="promo_s2">Elinizde bir kod varsa buraya girin; indirim ödeme adımında uygulanır.</span></div>
    <input maxlength="200" data-i18n-ph="promo_ph" placeholder="Promosyon kodu" id="prPromo" autocomplete="off"/>
    <button class="btn sm" type="button" onclick="applyPromo('prPromo')" data-i18n="apply">Uygula</button>
   </div>

  </div>
 </div>
</section>

@endverbatim
