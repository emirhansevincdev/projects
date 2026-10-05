@verbatim
<nav class="nav"><div class="wrap">
 <a class="brand" onclick="go('home')">
  <svg width="26" height="26" viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="lg" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#0D8A80"/><stop offset="1" stop-color="#0A5F56"/></linearGradient></defs>
<circle cx="100" cy="100" r="92" fill="url(#lg)"/>
<path transform="translate(100 100) rotate(45) scale(.58) translate(-100 -100)" d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#F5FAF8" fill-opacity=".45"/>
<path d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#F5FAF8"/>
<circle cx="100" cy="100" r="10" fill="#0A5F56"/>
</svg>
  <span>KER<span class="v">VEA</span></span>
 </a>
 <div class="tabs">
  <a class="tab on" data-v="home" onclick="go('home')" data-i18n="nav_home">Ana Sayfa</a>
  <a class="tab" data-v="add" onclick="go('add')" data-i18n="nav_add">Ekle</a>
  <a class="tab" data-v="pricing" onclick="go('pricing')" data-i18n="nav_pricing">Fiyatlandırma</a>
  <a class="tab" data-v="about" onclick="go('about')" data-i18n="nav_about">Hakkımızda</a>
  <a class="tab" data-v="contact" onclick="go('contact')" data-i18n="nav_contact">İletişim</a>
 <a class="tab" onclick="goAnchor('kd-block')" data-i18n="nav_kursusu">Kürsüsü</a>
 <a class="tab" onclick="goAnchor('geo-block')" data-i18n="nav_sss">SSS</a>
 </div>
 <button class="kv-theme-switch" onclick="toggleTheme()" title="Tema değiştir" aria-label="Tema değiştir" role="switch" aria-checked="false" id="kvThemeSwitch">
   <span class="kv-theme-track">
     <span class="kv-theme-thumb"></span>
     <span class="kv-theme-icon kv-theme-icon-sun" aria-hidden="true">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
     </span>
     <span class="kv-theme-icon kv-theme-icon-moon" aria-hidden="true">
       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
     </span>
   </span>
 </button>
 <div class="langwrap">
  <button class="langbtn" onclick="document.getElementById('lm').classList.toggle('open')">
   <span id="cf">🇹🇷</span> <span id="cn">TR</span> ▾
  </button>
  <div class="langmenu" id="lm">
   <a onclick="setLang('tr')">🇹🇷 Türkçe</a>
   <a onclick="setLang('en')">🇬🇧 English</a>
   <a onclick="setLang('es')">🇪🇸 Español</a>
   <a onclick="setLang('fr')">🇫🇷 Français</a>
   <a onclick="setLang('ar')">🇸🇦 العربية</a>
   <a onclick="setLang('ru')">🇷🇺 Русский</a>
  </div>
 </div>
 <a class="ghostbtn" onclick="go('login')" data-i18n="nav_login">Giriş</a>
 
 <!-- User Dropdown (DropdownMenu1 adaptasyonu) -->
 <div class="kv-usermenu" id="kvUserMenu" style="display:none">
   <button class="kv-usermenu-trigger" onclick="toggleUserMenu(event)" aria-haspopup="menu" aria-expanded="false" aria-label="Panel menüsü">
     <span class="kv-usermenu-avatar" id="kvUserAvatar">K</span>
     <span class="kv-usermenu-arrow">
       <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
     </span>
   </button>
   <div class="kv-usermenu-content" role="menu" aria-labelledby="kvUserMenuTrigger">
     <div class="kv-usermenu-head">
       <p class="kv-usermenu-title" data-i18n="um_title">Panel</p>
       <p class="kv-usermenu-sub" data-i18n="um_sub">Hesabınızı ve tercihlerinizi yönetin</p>
     </div>
     <div class="kv-usermenu-sep"></div>
     <a class="kv-usermenu-item" onclick="closeUserMenu();go('panel')" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
       <span data-i18n="um_dashboard">Panel</span>
     </a>
     <a class="kv-usermenu-item" onclick="closeUserMenu();go('panel')" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
       <span data-i18n="um_account">Hesabım</span>
     </a>
     <a class="kv-usermenu-item" onclick="closeUserMenu();go('panel')" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
       <span data-i18n="um_notif">Bildirimler</span>
       <span class="kv-usermenu-badge">3</span>
     </a>
     <a class="kv-usermenu-item" onclick="closeUserMenu();openM('kvkk')" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
       <span data-i18n="um_privacy">Gizlilik</span>
     </a>
     <a class="kv-usermenu-item" onclick="closeUserMenu();go('panel')" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
       <span data-i18n="um_prefs">Tercihler</span>
     </a>
     <div class="kv-usermenu-sep"></div>
     <a class="kv-usermenu-item kv-usermenu-danger" onclick="closeUserMenu();kvLogout()" role="menuitem">
       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
       <span data-i18n="um_logout">Çıkış</span>
     </a>
   </div>
 </div>
</div></nav>

<!-- v25: Compliance / Data Source Marquee -->
<div class="nav-marquee" aria-hidden="true">
 <div class="nm-track" id="nmTrack"></div>
</div>


<!-- HOME -->
@endverbatim
