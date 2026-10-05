@verbatim
<section id="login" class="view">
 <div class="wrap" style="max-width:440px;margin:0 auto;padding:40px 20px">
  <div class="kv-login-card">
    <div class="kv-login-hd">
      <div class="kv-login-logo">
        <svg width="44" height="44" viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="lgl" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#0D8A80"/><stop offset="1" stop-color="#0A5F56"/></linearGradient></defs>
<circle cx="100" cy="100" r="92" fill="url(#lgl)"/>
<path transform="translate(100 100) rotate(45) scale(.58) translate(-100 -100)" d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#F5FAF8" fill-opacity=".45"/>
<path d="M100,31 L115.27,84.73 L169,100 L115.27,115.27 L100,169 L84.73,115.27 L31,100 L84.73,84.73 Z" fill="#F5FAF8"/>
<circle cx="100" cy="100" r="10" fill="#0A5F56"/>
</svg>
      </div>
      <h2 data-i18n="login_h">Kervea'ya giriş yap</h2>
      <p data-i18n="login_p">Doğrulanmış B2B ticaret ağınıza erişin</p>
    </div>
    
    <div class="kv-login-body">
      <!-- Floating input · Email -->
      <div class="kv-float-input">
        <input type="email" id="kvLoginEmail" class="kv-float-in" placeholder=" " autocomplete="email" maxlength="254" pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}" required/>
        <label for="kvLoginEmail" class="kv-float-lbl" data-i18n="login_email">E-posta adresi</label>
        <div class="kv-float-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
      </div>
      
      <!-- Floating input · Password -->
      <div class="kv-float-input">
        <input type="password" id="kvLoginPass" class="kv-float-in" placeholder=" " autocomplete="current-password" maxlength="128" required minlength="8"/>
        <label for="kvLoginPass" class="kv-float-lbl" data-i18n="login_pass">Parola</label>
        <div class="kv-float-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <button type="button" class="kv-float-toggle" onclick="kvTogglePw(this)" aria-label="Parolayı göster">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      
      <div class="kv-login-row">
        <label class="kv-login-remember">
          <input type="checkbox" id="kvRememberMe"/>
          <span data-i18n="login_remember">Beni hatırla</span>
        </label>
        <a href="#" onclick="return false" class="kv-login-forgot" data-i18n="login_forgot">Parolamı unuttum</a>
      </div>
      
      <button type="button" class="btn kv-login-btn" onclick="kvSubmitLogin()">
        <span data-i18n="login_submit">Giriş yap</span>
      </button>
      
      <div class="kv-login-sep"><span data-i18n="login_or">veya</span></div>
      
      <div class="kv-login-social">
        <button type="button" class="kv-login-social-btn" onclick="kvSocialLogin('google')">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span>Google</span>
        </button>
        <button type="button" class="kv-login-social-btn" onclick="kvSocialLogin('linkedin')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
          <span>LinkedIn</span>
        </button>
      </div>
      
      <div class="kv-login-footer">
        <span data-i18n="login_no_account">Hesabın yok mu?</span>
        <a href="#" onclick="go('add');return false" class="kv-login-signup" data-i18n="login_signup">Firmanı ekle</a>
      </div>
    </div>
  </div>
 </div>
</section>

@endverbatim
