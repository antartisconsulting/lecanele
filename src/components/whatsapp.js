import { businessConfig } from '../config/business.js';

/**
 * Componente Reutilizable: Botón Flotante de WhatsApp (Rediseñado)
 * Agrega un aro circular ondulado rosa que rota sutilmente.
 */
export function initWhatsAppButton() {
  if (document.getElementById('whatsapp-floating-btn')) return;

  const btnContainer = document.createElement('div');
  btnContainer.id = 'whatsapp-floating-btn';
  btnContainer.className = 'whatsapp-float-container';

  const isPlaceholder = businessConfig.whatsapp.includes('[AÑADIR');
  const phoneNumber = isPlaceholder ? '600000000' : businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');
  const message = encodeURIComponent(businessConfig.whatsappInitialMessage);
  
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  btnContainer.innerHTML = `
    <!-- Aro giratorio ondulado decorativo -->
    <div class="whatsapp-wave-border"></div>
    
    <!-- Botón de chat principal -->
    <a href="${waUrl}" class="whatsapp-float" target="_blank" rel="noopener noreferrer" 
       aria-label="Contactar con Le Canele por WhatsApp (se abre en una nueva pestaña)" 
       title="Contactar por WhatsApp">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="display: block;">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.119.957 11.99.957 6.558.957 2.13 5.327 2.127 10.756c-.001 1.674.452 3.308 1.311 4.757l-.989 3.612 3.608-.946zm11.402-4.578c-.307-.154-1.82-.9-2.102-1.002-.281-.102-.486-.154-.69.154-.204.307-.791.998-.97 1.202-.18.204-.36.228-.668.074-1.07-.539-1.921-.991-2.678-2.284-.666-1.14-.85-2.042-.993-2.316-.142-.274-.015-.423.123-.561.124-.124.275-.32.412-.48.136-.16.182-.274.274-.457.092-.183.046-.343-.023-.48-.068-.137-.594-1.429-.815-1.96-.215-.519-.432-.448-.595-.457-.153-.008-.328-.01-.502-.01-.174 0-.457.065-.697.327-.24.262-.915.894-.915 2.178 0 1.285.934 2.528 1.065 2.703.13.174 1.838 2.808 4.452 3.937.622.268 1.107.428 1.487.548.625.198 1.194.171 1.643.104.5-.075 1.82-.743 2.076-1.46.256-.718.256-1.332.18-1.46-.077-.128-.282-.204-.59-.358z"/>
      </svg>
    </a>
  `;

  // Crear la mini-ventana flotante (tooltip de bienvenida)
  const tooltip = document.createElement('div');
  tooltip.className = 'wa-welcome-tooltip';
  tooltip.innerHTML = `
    <div class="wa-tooltip-header">
      <span class="wa-tooltip-dot"></span>
      <strong>Atelier Le Canele</strong>
      <button class="wa-tooltip-close" aria-label="Cerrar saludo">&times;</button>
    </div>
    <div class="wa-tooltip-body">
      <p>✨ ¿Buscas algo especial para un evento o deseas diseñar tu tarta a medida? Chatea directamente con nuestro obrador.</p>
    </div>
  `;
  btnContainer.appendChild(tooltip);

  document.body.appendChild(btnContainer);

  // Mostrar el tooltip después de 4 segundos
  setTimeout(() => {
    if (sessionStorage.getItem('wa_tooltip_closed') !== 'true') {
      tooltip.classList.add('visible');
    }
  }, 4000);

  // Cerrar el tooltip al pulsar la cruz
  const closeTooltip = tooltip.querySelector('.wa-tooltip-close');
  if (closeTooltip) {
    closeTooltip.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      tooltip.classList.remove('visible');
      sessionStorage.setItem('wa_tooltip_closed', 'true');
    });
  }
}

document.addEventListener('DOMContentLoaded', initWhatsAppButton);
