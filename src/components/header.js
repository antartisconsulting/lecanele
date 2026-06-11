import { businessConfig } from '../config/business.js?v=8';

/**
 * Componente Reutilizable: Header & Menú Móvil Refinado
 * Se inyecta automáticamente e integra el logotipo oficial y la navegación de alta gama.
 */
export function initHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  const currentPath = window.location.pathname;
  const getActive = (path) => {
    if ((currentPath === '/' || currentPath.endsWith('index.html')) && path === 'index.html') return 'active';
    if (currentPath.includes(path)) return 'active';
    return '';
  };

  // Construir WhatsApp URL dinámico
  const isPlaceholder = businessConfig.whatsapp.includes('[AÑADIR');
  const waPhone = isPlaceholder ? '600000000' : businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(businessConfig.whatsappInitialMessage)}`;

  const headerHtml = `
    <!-- Enlace de salto de accesibilidad -->
    <a href="#main-content" class="skip-link">Saltar al contenido principal</a>

    <header class="site-header" id="site-header">
      <div class="header-container">
        <!-- Logotipo (Extremo Izquierdo) -->
        <a href="index.html" class="logo-wrapper" aria-label="Volver al inicio - ${businessConfig.businessName}">
          <img src="images/brand/logo-le-canele-header.png" alt="Logotipo Oficial Le Canele" class="logo-img">
          <span class="logo-text">${businessConfig.businessName}</span>
        </a>

        <!-- Contenedor Derecho (Navegación Completa + Botón - Extremo Derecho) -->
        <div class="header-right-col">
          <nav class="header-nav" aria-label="Menú principal">
            <a href="productos.html" class="header-action-link">Productos</a>
            <a href="sobre-nosotros.html" class="header-action-link atelier-link">El Atelier</a>
            <a href="contacto.html" class="header-action-link">Contacto</a>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="header-action-link desktop-only-action">WhatsApp</a>
          </nav>
          
          <div class="header-actions">
            <button class="btn-cart-toggle" id="btn-cart-toggle" aria-label="Ver cesta de la compra">
              <span class="cart-icon">🛒</span>
              <span class="cart-count-badge" id="cart-count-badge">0</span>
            </button>
            <a href="tartas-personalizadas.html" class="btn-header-action">ENCARGOS</a>
          </div>
        </div>
      </div>
    </header>
  `;

  placeholder.innerHTML = headerHtml;

  const header = document.getElementById('site-header');

  // Activar scrolled class
  const checkScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  checkScroll();
  window.addEventListener('scroll', checkScroll);
}

document.addEventListener('DOMContentLoaded', initHeader);
