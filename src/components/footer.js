import { businessConfig } from '../config/business.js?v=7';

/**
 * Componente Reutilizable: Footer (Rediseñado de alta gama)
 * Se inyecta automáticamente e integra la estructura premium en 4 columnas.
 */
export function initFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  const currentYear = new Date().getFullYear();

  // Función para determinar si un valor es un marcador de posición
  const isPlaceholder = (val) => !val || val.includes('[AÑADIR');

  // Construir columna de contacto de forma dinámica según datos existentes
  let contactItemsHtml = '';

  if (!isPlaceholder(businessConfig.whatsapp)) {
    const waPhone = businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(businessConfig.whatsappInitialMessage)}`;
    contactItemsHtml += `
      <li class="footer-contact-item">
        <span style="color: var(--color-brand-coral);">💬</span> <a href="${waUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </li>
    `;
  }

  if (!isPlaceholder(businessConfig.phone)) {
    const phoneVal = businessConfig.phone.replace(/\s/g, '');
    contactItemsHtml += `
      <li class="footer-contact-item">
        <span style="color: var(--color-brand-coral);">📞</span> <a href="tel:${phoneVal}">${businessConfig.phone}</a>
      </li>
    `;
  }

  if (!isPlaceholder(businessConfig.email)) {
    contactItemsHtml += `
      <li class="footer-contact-item">
        <span style="color: var(--color-brand-coral);">✉️</span> <a href="mailto:${businessConfig.email}">${businessConfig.email}</a>
      </li>
    `;
  }

  if (!isPlaceholder(businessConfig.address)) {
    const cpPart = isPlaceholder(businessConfig.postalCode) ? '' : businessConfig.postalCode;
    const cityPart = isPlaceholder(businessConfig.city) ? '' : businessConfig.city;
    const separator = (cpPart && cityPart) ? ', ' : '';
    contactItemsHtml += `
      <li class="footer-contact-item" style="margin-top: 10px; font-size: 0.9rem; line-height: 1.4;">
        📍 ${businessConfig.address}<br>${cpPart}${separator}${cityPart}
      </li>
    `;
  }

  if (!isPlaceholder(businessConfig.openingHours)) {
    contactItemsHtml += `
      <li class="footer-contact-item" style="margin-top: 10px; font-size: 0.9rem;">
        🕒 ${businessConfig.openingHours}
      </li>
    `;
  }

  // Construir enlaces sociales de forma dinámica
  let socialLinksHtml = '';
  if (!isPlaceholder(businessConfig.instagram)) {
    socialLinksHtml += `
      <li>
        <a href="${businessConfig.socialLinks.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
      </li>
    `;
  }

  // Generar bloque de contacto si hay información disponible
  const hasContact = contactItemsHtml.trim() !== '';
  const contactColumnHtml = hasContact ? `
    <!-- Columna 3: Contacto y Horario -->
    <div class="footer-column">
      <h5>Contacto & Horario</h5>
      <ul class="footer-links">
        ${contactItemsHtml}
      </ul>
    </div>
  ` : '';

  const footerHtml = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          
          <!-- Columna 1: Branding y Sello -->
          <div class="footer-brand">
            <a href="index.html" class="footer-brand-logo-link">
              <img src="images/brand/logo-le-canele-footer.png" alt="Logotipo Oficial Le Canele" class="footer-logo-img">
              <h4 class="logo-text" style="color: var(--color-white);">${businessConfig.businessName}</h4>
            </a>
            <p>${businessConfig.shortDescription}</p>
          </div>

          <!-- Columna 2: Navegación -->
          <div class="footer-column">
            <h5>Navegación</h5>
            <ul class="footer-links">
              <li><a href="index.html">Inicio</a></li>
              <li><a href="productos.html">Creaciones</a></li>
              <li><a href="tartas-personalizadas.html">Tartas personalizadas</a></li>
              <li><a href="sobre-nosotros.html">Nuestra esencia</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>

          ${contactColumnHtml}

          <!-- Columna 4: Social & Legal -->
          <div class="footer-column">
            <h5>Social & Legal</h5>
            <ul class="footer-links">
              ${socialLinksHtml}
              <li style="${socialLinksHtml ? 'margin-top: 15px;' : ''}">
                <a href="legal.html#aviso-legal">Aviso Legal</a>
              </li>
              <li>
                <a href="legal.html#privacidad">Política de Privacidad</a>
              </li>
              <li>
                <a href="legal.html#cookies">Política de Cookies</a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Parte Inferior: Copyright -->
        <div class="footer-bottom">
          <p>&copy; ${currentYear} ${businessConfig.businessName}. Todos los derechos reservados.</p>
          <p style="font-size: 0.8rem; opacity: 0.8;">Atelier de Pastelería Artesanal Boutique</p>
        </div>
      </div>
    </footer>
  `;

  placeholder.innerHTML = footerHtml;
}

document.addEventListener('DOMContentLoaded', initFooter);

