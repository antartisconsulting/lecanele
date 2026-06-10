/**
 * Componente Reutilizable: Banner de Consentimiento de Cookies (Rediseñado)
 * Añade detalles visuales del logotipo e integra con la nueva paleta de color.
 */
export function initCookieBanner() {
  const consent = localStorage.getItem('le_canele_cookies_consent');
  if (consent === 'accepted' || consent === 'declined') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-labelledby', 'cookie-title');
  banner.setAttribute('aria-describedby', 'cookie-desc');

  banner.innerHTML = `
    <div class="cookie-banner-title" id="cookie-title">
      <img src="images/brand/logo-le-canele-header.png" alt="" style="width: 28px; height: 28px; object-fit: contain;" aria-hidden="true">
      El valor del detalle
    </div>
    <div class="cookie-banner-text" id="cookie-desc">
      Utilizamos cookies propias y de terceros para comprender cómo interactúas con nuestra web y ofrecerte una experiencia refinada acorde a nuestra pastelería boutique.
    </div>
    <div class="cookie-banner-buttons">
      <button class="cookie-banner-btn cookie-banner-decline" id="cookie-decline">Rechazar</button>
      <button class="cookie-banner-btn cookie-banner-accept" id="cookie-accept">Aceptar</button>
    </div>
  `;

  document.body.appendChild(banner);

  setTimeout(() => {
    banner.style.display = 'block';
  }, 1000);

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (acceptBtn && declineBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('le_canele_cookies_consent', 'accepted');
      dismissBanner();
    });

    declineBtn.addEventListener('click', () => {
      localStorage.setItem('le_canele_cookies_consent', 'declined');
      dismissBanner();
    });
  }

  function dismissBanner() {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(24px)';
    banner.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      banner.remove();
    }, 400);
  }
}

document.addEventListener('DOMContentLoaded', initCookieBanner);
