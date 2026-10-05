@verbatim
<footer class="foot-x" role="contentinfo">
  <div class="wrap">
    <div class="fx-grid">
      <!-- Marka -->
      <div class="fx-brand">
        <a class="fx-logo" onclick="go('home')" role="button" aria-label="Kervea">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M10 10 L10 22 M10 16 L18 10 M10 16 L22 22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <b>KERVEA</b>
        </a>
        <p class="fx-tag" data-i18n="ft_brand_desc">Doğrulanmış B2B ticaret ağı. Aracısız, komisyonsuz, gerçek ihracat ve ithalat bağlantıları.</p>
      </div>

      <!-- Platform -->
      <div class="fx-col">
        <h4 data-i18n="ft_col_platform">Platform</h4>
        <ul>
          <li><a onclick="go('home')" data-i18n="nav_home">Ana Sayfa</a></li>
          <li><a onclick="go('add')" data-i18n="nav_add">Firma Ekle</a></li>
          <li><a onclick="go('pricing')" data-i18n="nav_pricing">Fiyatlar</a></li>
          <li><a onclick="go('home');setTimeout(function(){goAnchor&&goAnchor('hiw')},100)" data-i18n="ft_l_hiw">Nasıl Çalışır</a></li>
        </ul>
      </div>

      <!-- Şirket -->
      <div class="fx-col">
        <h4 data-i18n="ft_col_company">Şirket</h4>
        <ul>
          <li><a onclick="go('about')" data-i18n="nav_about">Hakkımızda</a></li>
          <li><a onclick="go('contact')" data-i18n="nav_contact">İletişim</a></li>
          <li><a onclick="go('pricing')" data-i18n="ft_l_enterprise">Kurumsal Çözümler</a></li>
        </ul>
      </div>

      <!-- Yasal -->
      <div class="fx-col">
        <h4 data-i18n="ft_col_legal">Yasal</h4>
        <ul>
          <li><a onclick="openM('kvkk')" data-i18n="ft_kvkk">KVKK Aydınlatma</a></li>
          <li><a onclick="openM('sozl')" data-i18n="ft_terms">Üyelik Sözleşmesi</a></li>
          <li><a onclick="openM('cookie')" data-i18n="ft_cookie">Gizlilik/Çerez</a></li>
        </ul>
      </div>
    </div>

    <div class="fx-bar">
      <div class="fx-copy">
        <b>© 2026 Kervea Ticaret A.Ş.</b> · v10.0 · <span data-i18n="ft_tagline">Modern İpek Yolu</span>
      </div>
      <div class="fx-social" aria-label="Sosyal medya">
        <a href="https://www.linkedin.com/company/kervea" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
        </a>
        <a href="https://x.com/kervea" target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.youtube.com/@kervea" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M23.5 6.19a3 3 0 00-2.11-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.52A3 3 0 00.5 6.19 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.81 3 3 0 002.11 2.12c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 002.11-2.12A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.81zM9.6 15.6V8.4l6.24 3.6z"/></svg>
        </a>
      </div>
    </div>
  </div>
</footer>
@endverbatim
