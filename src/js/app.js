import { businessConfig } from '../config/business.js';
import { productsData } from '../data/products.js?v=3';
import { testimonialsData } from '../data/testimonials.js';

/**
 * Script Principal Le Canele (Rediseñado con Parallax y Lightbox)
 * Controla la lógica interactiva premium de la web.
 */
document.addEventListener('DOMContentLoaded', () => {
  try { initLoader(); } catch (e) { console.error('Loader failed:', e); }
  try { initScrollProgressBar(); } catch (e) { console.error('Scroll progress failed:', e); }
  try { initCustomCursor(); } catch (e) { console.error('Custom cursor failed:', e); }
  try { initProductsShowcase(); } catch (e) { console.error('Products showcase failed:', e); }
  try { initTestimonials(); } catch (e) { console.error('Testimonials failed:', e); }
  try { initScrollAnimations(); } catch (e) { console.error('Scroll animations failed:', e); }
  try { initObradorProgress(); } catch (e) { console.error('Obrador progress failed:', e); }
  try { initQuickView(); } catch (e) { console.error('Quick view failed:', e); }
  try { initCakeBuilder(); } catch (e) { console.error('Cake builder failed:', e); }
  try { initCart(); } catch (e) { console.error('Cart failed:', e); }
  try { initForms(); } catch (e) { console.error('Forms failed:', e); }
  try { initMapCoords(); } catch (e) { console.error('Map coords failed:', e); }
  try { initVideoControl(); } catch (e) { console.error('Video control failed:', e); }
  try { initGalleryLightbox(); } catch (e) { console.error('Gallery lightbox failed:', e); }
});

/**
 * 0a. Loader inicial con fundido
 */
function initLoader() {
  const loader = document.getElementById('initial-loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 750);
}

/**
 * 0b-1. Barra de progreso de lectura (scroll superior)
 */
function initScrollProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.id = 'page-scroll-progress';
  progressBar.className = 'page-scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  });
}

/**
 * 0b. Cursor personalizado con retraso magnético y texto dinámico
 */
function initCustomCursor() {
  return; // Desactivado por petición de usuario: usar cursor nativo
  const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!isDesktop || prefersReduced) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorRing = document.createElement('div');
  cursorRing.className = 'custom-cursor-ring';
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });
  
  function animateCursor() {
    const ease = 0.15;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);
  
  const interactiveSelector = 'a, button, input, select, textarea, [role="button"], .gallery-item';
  
  document.addEventListener('mouseover', (e) => {
    if (!e.target || typeof e.target.closest !== 'function') return;
    const target = e.target.closest(interactiveSelector);
    if (target) {
      if (target.classList.contains('gallery-item')) {
        document.body.classList.add('cursor-view-gallery');
        document.body.classList.remove('cursor-hover');
        cursorRing.textContent = 'VER';
      } else {
        document.body.classList.add('cursor-hover');
        document.body.classList.remove('cursor-view-gallery');
        cursorRing.textContent = '';
      }
    } else {
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-view-gallery');
      cursorRing.textContent = '';
    }
  });
}

/**
 * 0c. Barra de progreso para el Obrador Sticky
 */
function initObradorProgress() {
  const section = document.querySelector('.process-sticky-section');
  const progressBar = document.getElementById('process-progress-bar');
  if (!section || !progressBar) return;

  const stepsNav = document.querySelectorAll('.process-step-nav');
  const imageItems = document.querySelectorAll('.process-sticky-right .process-image-item');

  const updateProgress = () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewHeight = window.innerHeight;
    const totalDuration = sectionHeight - viewHeight;

    if (totalDuration <= 0) {
      progressBar.style.width = '0%';
      return;
    }

    const scrolled = -rect.top;
    let percentage = (scrolled / totalDuration) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    progressBar.style.width = `${percentage}%`;

    // Resaltar el paso activo según la visibilidad de las imágenes en pantalla
    let activeStep = 1;
    imageItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      // Si la parte superior de la imagen pasa de la mitad del viewport
      if (itemRect.top < (viewHeight / 2) + 120) {
        activeStep = parseInt(item.getAttribute('data-step')) || 1;
      }
    });

    stepsNav.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-step')) || 1;
      if (stepNum === activeStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Ejecución inicial para fijar el paso actual en carga
  updateProgress();
}

/**
 * 1. Animaciones al hacer scroll (Intersection Observer)
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up, .scroll-reveal, .reveal-mask');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('active'));
  }
}

/**
 * 2. Gestión y validación de Formularios
 */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const cakeOrderForm = document.getElementById('cake-order-form');

  if (contactForm) {
    setupFormValidation(contactForm, () => {
      showFormSuccess('contact-form-container', '¡Mensaje Enviado!', 'Hemos recibido tu consulta. Nos pondremos en contacto contigo a través del correo electrónico o teléfono facilitado en menos de 24 horas laborables.');
    });
  }

  if (cakeOrderForm) {
    setupFormValidation(cakeOrderForm, () => {
      showFormSuccess('cake-order-form-container', '¡Solicitud de Tarta Recibida!', 'Gracias por contarnos tu idea. Nuestro maestro pastelero revisará tu propuesta y te contactaremos por WhatsApp o correo electrónico para definir las opciones y el presupuesto de tu tarta personalizada.');
    });
  }
}

function setupFormValidation(form, onSuccess) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control[required], input[type="checkbox"][required]');

    inputs.forEach(input => {
      const errorMsg = input.parentNode.querySelector('.form-error-msg');
      
      if (input.type === 'checkbox') {
        if (!input.checked) {
          isValid = false;
          if (errorMsg) errorMsg.style.display = 'block';
        } else {
          if (errorMsg) errorMsg.style.display = 'none';
        }
      } else {
        if (!input.value.trim()) {
          isValid = false;
          if (errorMsg) errorMsg.style.display = 'block';
          input.style.borderColor = 'var(--color-error)';
        } else {
          if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            if (errorMsg) {
              errorMsg.textContent = 'Por favor, introduce un correo electrónico válido.';
              errorMsg.style.display = 'block';
            }
            input.style.borderColor = 'var(--color-error)';
          } else if (input.type === 'tel' && !validatePhone(input.value)) {
            isValid = false;
            if (errorMsg) {
              errorMsg.textContent = 'Por favor, introduce un teléfono de contacto válido.';
              errorMsg.style.display = 'block';
            }
            input.style.borderColor = 'var(--color-error)';
          } else {
            if (errorMsg) errorMsg.style.display = 'none';
            input.style.borderColor = '';
          }
        }
      }
    });

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const spinner = submitBtn.querySelector('.loader-spinner');
      const btnText = submitBtn.querySelector('.btn-text');

      if (submitBtn && spinner && btnText) {
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Enviando...';
        
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        onSuccess();
      }
    }
  });

  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      const errorMsg = input.parentNode.querySelector('.form-error-msg');
      if (errorMsg) errorMsg.style.display = 'none';
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\+?[0-9\s\-]{7,15}$/;
  return re.test(phone);
}

function showFormSuccess(containerId, title, message) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="form-success-wrapper" style="display: block;">
      <div class="form-success-icon">✓</div>
      <h3 class="form-serif" style="margin-bottom: 15px; font-size: 1.8rem; color: var(--color-brand-coral);">${title}</h3>
      <p style="margin-bottom: 25px; max-width: 550px; margin-left: auto; margin-right: auto;">${message}</p>
      <a href="index.html" class="btn btn-secondary">Volver al Inicio</a>
    </div>
  `;
}

function initMapCoords() {
  const openMapBtn = document.getElementById('open-map-btn');
  if (openMapBtn) {
    const isPlaceholder = businessConfig.mapCoordinates.includes('[AÑADIR');
    const coords = isPlaceholder ? '40.416775,-3.703790' : businessConfig.mapCoordinates;
    openMapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coords)}`;
  }
}

/**
 * 3. Control de reproducción/pausa del video de fondo del Hero
 */
function initVideoControl() {
  const video = document.querySelector('.hero-video-bg');
  const controlBtn = document.getElementById('video-control');
  if (!video) return;

  let currentMode = null; // 'desktop' o 'mobile'

  // 1. Cargar fuentes del video de forma dinámica según resolución
  const updateVideoSource = () => {
    const isMobile = window.innerWidth <= 768;
    const targetMode = isMobile ? 'mobile' : 'desktop';

    // Evitar recargar si ya está en el modo correcto
    if (currentMode === targetMode) return;
    currentMode = targetMode;

    const poster = isMobile 
      ? 'images/posters/hero-le-canele-mobile.jpg' 
      : 'images/posters/hero-le-canele-desktop.jpg';
      
    const webmSrc = isMobile 
      ? 'videos/hero-le-canele-mobile.webm' 
      : 'videos/hero-le-canele-desktop.webm';
      
    const mp4Src = isMobile 
      ? 'videos/hero-le-canele-mobile.mp4' 
      : 'videos/hero-le-canele-desktop.mp4';

    video.setAttribute('poster', poster);

    // Limpiar y crear los nuevos elementos source
    video.innerHTML = '';
    
    const sourceWebm = document.createElement('source');
    sourceWebm.src = webmSrc;
    sourceWebm.type = 'video/webm';
    
    const sourceMp4 = document.createElement('source');
    sourceMp4.src = mp4Src;
    sourceMp4.type = 'video/mp4';
    
    video.appendChild(sourceWebm);
    video.appendChild(sourceMp4);
    
    video.load();

    // Respetar prefers-reduced-motion y reproducir
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      video.removeAttribute('autoplay');
      video.pause();
      if (controlBtn) {
        controlBtn.textContent = '▶';
        controlBtn.setAttribute('aria-label', 'Reproducir video');
      }
    } else {
      video.play().then(() => {
        if (controlBtn) {
          controlBtn.textContent = '⏸';
          controlBtn.setAttribute('aria-label', 'Pausar video');
        }
      }).catch(() => {
        // En caso de que el navegador requiera interacción previa del usuario para reproducir
        if (controlBtn) {
          controlBtn.textContent = '▶';
          controlBtn.setAttribute('aria-label', 'Reproducir video');
        }
      });
    }
  };

  // Inicializar fuentes
  updateVideoSource();

  // Escuchar cambios de tamaño con un debounce para evitar recargas constantes al arrastrar
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateVideoSource, 250);
  });

  // 2. Respetar prefers-reduced-motion (no autoplay)
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleMotionChange = (e) => {
    if (e.matches) {
      video.removeAttribute('autoplay');
      video.pause();
      if (controlBtn) {
        controlBtn.textContent = '▶';
        controlBtn.setAttribute('aria-label', 'Reproducir video');
      }
    } else {
      video.play().then(() => {
        if (controlBtn) {
          controlBtn.textContent = '⏸';
          controlBtn.setAttribute('aria-label', 'Pausar video');
        }
      }).catch(() => {});
    }
  };
  motionQuery.addEventListener('change', handleMotionChange);

  // 3. Control manual de pausa/reproducción
  if (controlBtn) {
    controlBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play().then(() => {
          controlBtn.textContent = '⏸';
          controlBtn.setAttribute('aria-label', 'Pausar video');
        }).catch(() => {});
      } else {
        video.pause();
        controlBtn.textContent = '▶';
        controlBtn.setAttribute('aria-label', 'Reproducir video');
      }
    });
    
    // Soporte para teclado (espacio o enter al enfocar)
    controlBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        controlBtn.click();
      }
    });
  }
}

/**
 * 4. Visualizador Lightbox de la Galería
 * Renderiza dinámicamente un visor a pantalla completa para explorar fotos.
 */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Crear la estructura HTML del Lightbox dinámicamente si no existe
  let lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualizador de imagen');

    lightbox.innerHTML = `
      <button class="lightbox-close" id="lightbox-close" aria-label="Cerrar visualizador">&times;</button>
      <button class="lightbox-btn lightbox-prev" id="lightbox-prev" aria-label="Imagen anterior">&#10094;</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-img" id="lightbox-img">
        <div class="lightbox-caption" id="lightbox-caption"></div>
      </div>
      <button class="lightbox-btn lightbox-next" id="lightbox-next" aria-label="Imagen siguiente">&#10095;</button>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentIndex = 0;

  // Recopilar información de imágenes en la galería
  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('.gallery-img');
    return {
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt')
    };
  });

  // Abrir Lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    updateLightboxContent();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
    closeBtn.focus();
    
    // Registrar escuchadores de teclado
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeyDown);
  }

  function navigateLightbox(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    
    // Pequeño fundido sutil al cambiar de foto
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
      updateLightboxContent();
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  function updateLightboxContent() {
    const currentImg = images[currentIndex];
    lightboxImg.setAttribute('src', currentImg.src);
    lightboxImg.setAttribute('alt', currentImg.alt);
    lightboxCaption.textContent = currentImg.alt;
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }

  // Event Listeners del Lightbox
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));
  
  // Cerrar al pulsar el fondo (fuera de la caja)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

/**
 * 5. Renderizado dinámico del showcase de productos en la Home (estilo boutique francesa)
 */
function initProductsShowcase() {
  const container = document.getElementById('products-showcase-container');
  if (!container) return;

  // Tomamos los primeros 4 productos del catálogo de Le Canele
  const showcaseProducts = productsData.slice(0, 4);

  showcaseProducts.forEach(prod => {
    const spec = prod.spec || '';

    const actionsHtml = `
      <span class="btn-showcase-action solid disabled" style="background-color: var(--color-text-light); border-color: var(--color-text-light); color: var(--color-white); cursor: default; width: 100%; text-align: center;">Pedidos Online Próximamente</span>
    `;

    const card = document.createElement('article');
    card.className = 'product-showcase-card scroll-reveal';
    card.setAttribute('data-product-id', prod.id);
    card.innerHTML = `
      <div class="product-showcase-img-wrapper">
        <img src="${prod.image}" alt="${prod.alt || prod.name}" class="product-showcase-img" loading="lazy">
        <div class="product-upcoming-badge">Próximamente</div>
      </div>
      <div class="product-showcase-info-row">
        <h3 class="product-showcase-card-title">${prod.name}</h3>
        <span class="product-showcase-spec">${spec}</span>
      </div>
      <div class="product-showcase-actions">
        ${actionsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * 6. Motor de testimonios (Carrusel Editorial Deslizable)
 */
function initTestimonials() {
  const section = document.getElementById('testimonials-section');
  const container = document.getElementById('testimonials-container');
  if (!section || !container) return;

  if (testimonialsData && testimonialsData.length > 0) {
    section.style.display = 'block';
    
    // Crear estructura del carrusel
    container.innerHTML = `
      <div class="testimonials-carousel-wrapper">
        <div class="testimonials-slides-container" id="testimonials-slides">
          <!-- Slides -->
        </div>
        <div class="testimonials-dots" id="testimonials-dots">
          <!-- Dots -->
        </div>
      </div>
    `;

    const slidesContainer = document.getElementById('testimonials-slides');
    const dotsContainer = document.getElementById('testimonials-dots');

    testimonialsData.forEach((item, idx) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = `testimonial-slide ${idx === 0 ? 'active' : ''}`;
      
      let stars = '';
      for (let i = 0; i < (item.rating || 5); i++) {
        stars += '★';
      }

      slide.innerHTML = `
        <div class="testimonial-stars">${stars}</div>
        <p class="testimonial-comment">"${item.comment}"</p>
        <h4 class="testimonial-author">${item.name}</h4>
        <span class="testimonial-role">${item.role}</span>
      `;
      slidesContainer.appendChild(slide);

      // Dot
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir a reseña ${idx + 1}`);
      dot.addEventListener('click', () => showTestimonial(idx));
      dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    let timer = null;

    function showTestimonial(index) {
      const slides = slidesContainer.querySelectorAll('.testimonial-slide');
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      if (slides.length === 0) return;

      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      currentSlide = index;

      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');

      resetTimer();
    }

    function nextTestimonial() {
      const nextIndex = (currentSlide + 1) % testimonialsData.length;
      showTestimonial(nextIndex);
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextTestimonial, 6000);
    }

    resetTimer();
  } else {
    section.style.display = 'none';
  }
}

/**
 * 7. Lógica del modal de Vista Rápida (Quick View)
 */
function initQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('quickview-close');
  const overlay = modal.querySelector('.quickview-overlay');

  const img = document.getElementById('quickview-img');
  const category = document.getElementById('quickview-category');
  const title = document.getElementById('quickview-title');
  const price = document.getElementById('quickview-price');
  const spec = document.getElementById('quickview-spec');
  const desc = document.getElementById('quickview-desc');
  const ingredients = document.getElementById('quickview-ingredients');
  const allergensContainer = document.getElementById('quickview-allergens');
  const note = document.getElementById('quickview-note');
  const btnDelivery = document.getElementById('quickview-btn-delivery');
  const btnCollect = document.getElementById('quickview-btn-collect');

  const allergenMap = {
    'huevos': '🥚 Huevos Camperos',
    'frutos-de-cascara': '🥜 Frutos de Cáscara',
    'lacteos': '🥛 Lácteos (Mantequilla DOP)',
    'gluten': '🌾 Gluten',
    'soja': '🫘 Soja'
  };

  const isPlaceholder = businessConfig.whatsapp.includes('[AÑADIR');
  const phone = isPlaceholder ? '600000000' : businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.favorite-card, .product-showcase-card');
    if (!card) return;

    if (e.target.closest('.btn-favorite-action, .btn-showcase-action, a, button')) return;

    const prodId = card.getAttribute('data-product-id');
    const prod = productsData.find(p => p.id === prodId);
    if (!prod) return;

    // Rellenar modal
    img.src = prod.image;
    img.alt = prod.alt || prod.name;
    category.textContent = prod.category.replace('-', ' ').toUpperCase();
    title.textContent = prod.name;
    price.textContent = '';
    price.style.display = 'none';
    spec.textContent = prod.spec || '';
    desc.textContent = prod.description;
    
    ingredients.textContent = prod.ingredients || 'Ingredientes artesanales seleccionados.';
    note.textContent = prod.bakerNote || 'Elaborado diariamente con mimo en nuestro obrador.';

    // Alérgenos
    allergensContainer.innerHTML = '';
    if (prod.allergens && prod.allergens.length > 0) {
      prod.allergens.forEach(alg => {
        const span = document.createElement('span');
        span.className = `allergen-pill allergen-${alg}`;
        span.textContent = allergenMap[alg] || alg;
        allergensContainer.appendChild(span);
      });
    } else {
      allergensContainer.innerHTML = '<span class="allergen-pill clean">Libre de alérgenos comunes</span>';
    }

    // Configurar acciones del modal (sólo botón deshabilitado de pedidos próximamente)
    btnDelivery.textContent = 'Pedidos Online Próximamente';
    btnDelivery.href = '#';
    btnDelivery.removeAttribute('target');
    btnDelivery.removeAttribute('rel');
    btnDelivery.classList.remove('btn-add-to-cart-action');
    btnDelivery.removeAttribute('data-product-id');
    btnDelivery.style.pointerEvents = 'none';
    btnDelivery.style.backgroundColor = 'var(--color-text-light)';
    btnDelivery.style.borderColor = 'var(--color-text-light)';
    btnDelivery.style.color = 'var(--color-white)';
    
    btnCollect.textContent = 'Cerrar';
    btnCollect.href = '#';
    btnCollect.removeAttribute('target');
    btnCollect.removeAttribute('rel');

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  };

  btnCollect.addEventListener('click', (e) => {
    if (btnCollect.textContent === 'Cerrar') {
      e.preventDefault();
      closeModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/**
 * 8. Lógica del Configurador de Tartas (Visual Cake Builder)
 */
function initCakeBuilder() {
  const wrapper = document.querySelector('.cake-builder-wrapper');
  if (!wrapper) return;

  const steps = wrapper.querySelectorAll('.builder-step-pane');
  const indicators = wrapper.querySelectorAll('.builder-step-indicator');
  const prevBtn = document.getElementById('builder-prev-btn');
  const nextBtn = document.getElementById('builder-next-btn');
  const submitBtn = document.getElementById('builder-submit-btn');

  const nameInput = document.getElementById('builder-name');
  const phoneInput = document.getElementById('builder-phone');
  const dateInput = document.getElementById('builder-date');
  const messageInput = document.getElementById('builder-message');
  const privacyCheck = document.getElementById('builder-privacy');

  const summarySize = document.getElementById('summary-size');
  const summaryFlavor = document.getElementById('summary-flavor');
  const summaryStyle = document.getElementById('summary-style');
  const summaryDate = document.getElementById('summary-date');
  const summaryPrice = document.getElementById('summary-price');

  // SVG cake preview elements
  const svgBottomTier = document.getElementById('cake-tier-bottom');
  const svgBottomBody = document.getElementById('tier-bottom-body');
  const svgBottomTop = document.getElementById('tier-bottom-top');
  const svgBottomRustico = document.getElementById('tier-bottom-rustico');

  const svgTopTier = document.getElementById('cake-tier-top');
  const svgTopBody = document.getElementById('tier-top-body');
  const svgTopTop = document.getElementById('tier-top-top');
  const svgTopRustico = document.getElementById('tier-top-rustico');

  const svgDecoGold = document.getElementById('deco-gold');
  const svgDecoFlowers = document.getElementById('deco-flowers');
  const svgDecoFruta = document.getElementById('deco-fruta');

  const svgFlowersBottomcima = document.getElementById('flowers-cima-bottom');
  const svgFlowersTopcima = document.getElementById('flowers-cima-top');

  const svgFrutasBottom = document.getElementById('frutas-bottom');
  const svgFrutasTop = document.getElementById('frutas-top');

  const sizeMap = {
    'mini': 'Mini (6-8 porciones) - Desde 35,00 €',
    'medium': 'Mediana (10-12 porciones) - Desde 45,00 €',
    'large': 'Grande (15-20 porciones) - Desde 60,00 €',
    'wedding': 'Bodas / Eventos (25+ porciones) - Presupuesto a medida'
  };

  const flavorMap = {
    'chocolate': 'Chocolate Belga & Praliné',
    'redvelvet': 'Red Velvet & Confitura de Frambuesas',
    'vainilla': 'Vainilla Bourbon & Crema',
    'zanahoria': 'Zanahoria & Nueces'
  };

  const styleMap = {
    'rustico': 'Rústico con Flores',
    'contemporaneo': 'Elegancia Contemporánea con Pan de Oro',
    'minimalista': 'Minimalista Chic',
    'fruta': 'Corona de Frutas Silvestres'
  };

  const flavorColors = {
    'chocolate': { body: '#5d4037', top: '#4e3629', stripe: '#2c1b18' },
    'redvelvet': { body: '#a22d3b', top: '#8f1f2e', stripe: '#5c0f1a' },
    'vainilla': { body: '#fffdd0', top: '#fdf6e2', stripe: '#e3cab3' },
    'zanahoria': { body: '#f28f3b', top: '#e07a5f', stripe: '#bd621e' }
  };

  let currentStep = 1;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  if (dateInput) dateInput.min = tomorrowStr;

  function updateStepUI() {
    steps.forEach(pane => {
      const stepNum = parseInt(pane.getAttribute('data-step')) || 1;
      if (stepNum === currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    indicators.forEach(indicator => {
      const stepNum = parseInt(indicator.getAttribute('data-step')) || 1;
      if (stepNum === currentStep) {
        indicator.classList.add('active');
      } else if (stepNum < currentStep) {
        indicator.classList.add('completed');
        indicator.classList.remove('active');
      } else {
        indicator.classList.remove('active', 'completed');
      }
    });

    if (currentStep === 1) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    } else if (currentStep === 4) {
      prevBtn.style.visibility = 'visible';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
      updateSummary();
    } else {
      prevBtn.style.visibility = 'visible';
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    }
  }

  function validateStep(step) {
    if (step === 4) {
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        nameInput.parentNode.querySelector('.form-error-msg').style.display = 'block';
        nameInput.style.borderColor = 'var(--color-error)';
        isValid = false;
      } else {
        nameInput.style.borderColor = '';
        nameInput.parentNode.querySelector('.form-error-msg').style.display = 'none';
      }

      const phoneRe = /^\+?[0-9\s\-]{7,15}$/;
      if (!phoneRe.test(phoneInput.value.trim())) {
        phoneInput.parentNode.querySelector('.form-error-msg').style.display = 'block';
        phoneInput.style.borderColor = 'var(--color-error)';
        isValid = false;
      } else {
        phoneInput.style.borderColor = '';
        phoneInput.parentNode.querySelector('.form-error-msg').style.display = 'none';
      }

      if (!dateInput.value) {
        dateInput.parentNode.querySelector('.form-error-msg').style.display = 'block';
        dateInput.style.borderColor = 'var(--color-error)';
        isValid = false;
      } else {
        dateInput.style.borderColor = '';
        dateInput.parentNode.querySelector('.form-error-msg').style.display = 'none';
      }

      if (!privacyCheck.checked) {
        privacyCheck.parentNode.querySelector('.form-error-msg').style.display = 'block';
        isValid = false;
      } else {
        privacyCheck.parentNode.querySelector('.form-error-msg').style.display = 'none';
      }

      return isValid;
    }
    return true;
  }

  function updateSvgVisuals(size, flavor, style) {
    const colors = flavorColors[flavor] || flavorColors['chocolate'];
    
    if (svgBottomBody) svgBottomBody.setAttribute('fill', colors.body);
    if (svgBottomTop) svgBottomTop.setAttribute('fill', colors.top);
    if (svgTopBody) svgTopBody.setAttribute('fill', colors.body);
    if (svgTopTop) svgTopTop.setAttribute('fill', colors.top);
    
    const stripeColor = colors.stripe;
    if (svgBottomRustico) {
      svgBottomRustico.querySelectorAll('path').forEach(p => p.setAttribute('stroke', stripeColor));
    }
    if (svgTopRustico) {
      svgTopRustico.querySelectorAll('path').forEach(p => p.setAttribute('stroke', stripeColor));
    }

    const isTwoTiers = (size === 'wedding');
    if (isTwoTiers) {
      if (svgTopTier) svgTopTier.style.display = 'block';
      if (svgFlowersBottomcima) svgFlowersBottomcima.style.display = 'none';
      if (svgFlowersTopcima) svgFlowersTopcima.style.display = 'block';
      if (svgFrutasTop) svgFrutasTop.style.display = 'block';
    } else {
      if (svgTopTier) svgTopTier.style.display = 'none';
      if (svgFlowersBottomcima) svgFlowersBottomcima.style.display = 'block';
      if (svgFlowersTopcima) svgFlowersTopcima.style.display = 'none';
      if (svgFrutasTop) svgFrutasTop.style.display = 'none';
    }

    if (svgBottomRustico) svgBottomRustico.style.display = 'none';
    if (svgTopRustico) svgTopRustico.style.display = 'none';
    if (svgDecoGold) svgDecoGold.style.display = 'none';
    if (svgDecoFlowers) svgDecoFlowers.style.display = 'none';
    if (svgDecoFruta) svgDecoFruta.style.display = 'none';

    if (style === 'rustico') {
      if (svgBottomRustico) svgBottomRustico.style.display = 'block';
      if (isTwoTiers && svgTopRustico) svgTopRustico.style.display = 'block';
      if (svgDecoFlowers) svgDecoFlowers.style.display = 'block';
    } else if (style === 'contemporaneo') {
      if (svgDecoGold) svgDecoGold.style.display = 'block';
    } else if (style === 'fruta') {
      if (svgDecoFruta) svgDecoFruta.style.display = 'block';
    } else if (style === 'minimalista') {
      if (svgDecoFlowers) {
        svgDecoFlowers.style.display = 'block';
      }
    }

    const canvas = document.querySelector('.cake-visual-canvas');
    if (canvas) {
      canvas.classList.remove('cake-pulse');
      void canvas.offsetWidth;
      canvas.classList.add('cake-pulse');
    }
  }

  function updateSummary() {
    const sizeRadio = wrapper.querySelector('input[name="cake-size"]:checked');
    const flavorRadio = wrapper.querySelector('input[name="cake-flavor"]:checked');
    const styleRadio = wrapper.querySelector('input[name="cake-style"]:checked');

    if (!sizeRadio || !flavorRadio || !styleRadio) return;

    const selectedSize = sizeRadio.value;
    const selectedFlavor = flavorRadio.value;
    const selectedStyle = styleRadio.value;

    const basePrices = {
      'mini': 35,
      'medium': 45,
      'large': 60,
      'wedding': null
    };

    const basePrice = basePrices[selectedSize];
    const flavorSup = parseInt(flavorRadio.getAttribute('data-supplement')) || 0;
    const styleSup = parseInt(styleRadio.getAttribute('data-supplement')) || 0;

    summarySize.textContent = sizeMap[selectedSize] || selectedSize;
    summaryFlavor.textContent = flavorMap[selectedFlavor] || selectedFlavor;
    
    const flavorSupEl = document.getElementById('summary-flavor-sup');
    if (flavorSupEl) {
      flavorSupEl.textContent = flavorSup > 0 ? ` (+${flavorSup},00 €)` : '';
    }

    summaryStyle.textContent = styleMap[selectedStyle] || selectedStyle;
    const styleSupEl = document.getElementById('summary-style-sup');
    if (styleSupEl) {
      styleSupEl.textContent = styleSup > 0 ? ` (+${styleSup},00 €)` : '';
    }

    summaryDate.textContent = dateInput.value ? dateInput.value.split('-').reverse().join('/') : '-';

    if (basePrice === null) {
      summaryPrice.textContent = 'Presupuesto a medida';
    } else {
      const total = basePrice + flavorSup + styleSup;
      summaryPrice.textContent = `Desde ${total},00 €`;
    }

    updateSvgVisuals(selectedSize, selectedFlavor, selectedStyle);
  }

  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      currentStep++;
      updateStepUI();
      document.getElementById('solicitud-formulario').scrollIntoView({ behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    currentStep--;
    updateStepUI();
    document.getElementById('solicitud-formulario').scrollIntoView({ behavior: 'smooth' });
  });

  submitBtn.addEventListener('click', () => {
    if (!validateStep(4)) return;

    const sizeRadio = wrapper.querySelector('input[name="cake-size"]:checked');
    const flavorRadio = wrapper.querySelector('input[name="cake-flavor"]:checked');
    const styleRadio = wrapper.querySelector('input[name="cake-style"]:checked');

    const selectedSize = sizeRadio.value;
    const selectedFlavor = flavorRadio.value;
    const selectedStyle = styleRadio.value;
    
    const basePrices = {
      'mini': 35,
      'medium': 45,
      'large': 60,
      'wedding': null
    };

    const basePrice = basePrices[selectedSize];
    const flavorSup = parseInt(flavorRadio.getAttribute('data-supplement')) || 0;
    const styleSup = parseInt(styleRadio.getAttribute('data-supplement')) || 0;

    let priceMsg = '';
    if (basePrice === null) {
      priceMsg = 'Presupuesto a medida (A consultar)';
    } else {
      const total = basePrice + flavorSup + styleSup;
      priceMsg = `Desde ${total},00 € (Base: ${basePrice}€` + 
                 (flavorSup > 0 ? `, Suplemento sabor: +${flavorSup}€` : '') + 
                 (styleSup > 0 ? `, Suplemento acabado: +${styleSup}€` : '') + ')';
    }

    const sizeText = sizeMap[selectedSize];
    const flavorText = flavorMap[selectedFlavor] + (flavorSup > 0 ? ` (+${flavorSup}€)` : '');
    const styleText = styleMap[selectedStyle] + (styleSup > 0 ? ` (+${styleSup}€)` : '');
    const dateText = dateInput.value.split('-').reverse().join('/');
    const nameText = nameInput.value.trim();
    const phoneText = phoneInput.value.trim();
    const extraMessage = messageInput.value.trim() || 'Sin especificaciones adicionales.';

    const isPlaceholder = businessConfig.whatsapp.includes('[AÑADIR');
    const phone = isPlaceholder ? '600000000' : businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');

    const waMessage = `Atelier Le Canele: ¡Nueva Solicitud de Tarta Personalizada! 🎂\n` +
                      `-----------------------------------------------\n` +
                      `• Nombre: ${nameText}\n` +
                      `• Teléfono: ${phoneText}\n` +
                      `• Fecha de entrega: ${dateText}\n` +
                      `• Tamaño elegido: ${sizeText}\n` +
                      `• Sabor seleccionado: ${flavorText}\n` +
                      `• Acabado estético: ${styleText}\n` +
                      `• Presupuesto estimado: ${priceMsg}\n` +
                      `• Notas / Dedicatoria: ${extraMessage}\n\n` +
                      `Acepto la política de privacidad.`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
    
    window.open(waUrl, '_blank');

    showFormSuccess('cake-order-form-container', '¡Presupuesto y Mensaje Preparados!', 'Hemos abierto una ventana de WhatsApp con los detalles de tu tarta personalizada para enviárselos directamente a nuestro maestro pastelero.');
  });

  [nameInput, phoneInput, dateInput].forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
      const errorMsg = input.parentNode.querySelector('.form-error-msg');
      if (errorMsg) errorMsg.style.display = 'none';
      if (input === dateInput) {
        summaryDate.textContent = dateInput.value ? dateInput.value.split('-').reverse().join('/') : '-';
      }
    });
  });

  dateInput.addEventListener('change', () => {
    summaryDate.textContent = dateInput.value ? dateInput.value.split('-').reverse().join('/') : '-';
  });

  privacyCheck.addEventListener('change', () => {
    const errorMsg = privacyCheck.parentNode.querySelector('.form-error-msg');
    if (errorMsg && privacyCheck.checked) errorMsg.style.display = 'none';
  });

  wrapper.querySelectorAll('input[name="cake-size"], input[name="cake-flavor"], input[name="cake-style"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updateSummary();
    });
  });

}

/**
 * 9. Gestión de Cesta Gourmet (Shopping Cart Drawer)
 */
let cart = [];
const CART_STORAGE_KEY = 'lecanele_cart';

function ensureCartHtml() {
  if (document.getElementById('cart-drawer')) return;

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';
  document.body.appendChild(overlay);

  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cart-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-labelledby', 'cart-title');
  
  drawer.innerHTML = `
    <div class="cart-header">
      <h2 class="cart-title" id="cart-title">Tu Cesta Gourmet</h2>
      <button class="cart-close-btn" id="cart-close-btn" aria-label="Cerrar cesta">&times;</button>
    </div>
    
    <div class="cart-body">
      <div class="cart-empty-message" id="cart-empty-message">
        <span class="cart-empty-icon">🛒</span>
        <p>Tu cesta está vacía</p>
        <a href="productos.html" class="btn btn-secondary btn-sm" style="margin-top: 15px;">Explorar creaciones</a>
      </div>
      <div class="cart-items-list" id="cart-items-list">
        <!-- Inyectado por JS -->
      </div>
    </div>
    
    <div class="cart-footer">
      <div class="cart-delivery-selector">
        <span class="selector-title">Modalidad de entrega:</span>
        <div class="delivery-options">
          <label class="delivery-option">
            <input type="radio" name="cart-delivery" value="collect" checked>
            <span class="option-custom-radio"></span>
            <span class="option-text">Recoger en Obrador (Gratis)</span>
          </label>
          <label class="delivery-option">
            <input type="radio" name="cart-delivery" value="delivery">
            <span class="option-custom-radio"></span>
            <span class="option-text">Envío a Domicilio (+5,00 €)</span>
          </label>
        </div>
      </div>
      
      <div class="cart-summary-row">
        <span>Subtotal:</span>
        <span id="cart-subtotal-val">0,00 €</span>
      </div>
      <div class="cart-summary-row" id="cart-shipping-row" style="display: none;">
        <span>Envío a domicilio:</span>
        <span>5,00 €</span>
      </div>
      <div class="cart-summary-row total-row">
        <span>Total Estimado:</span>
        <span id="cart-total-val">0,00 €</span>
      </div>
      
      <button class="btn btn-primary btn-cart-checkout" id="cart-checkout-btn">
        REALIZAR ENCARGO POR WHATSAPP
      </button>
    </div>
  `;
  document.body.appendChild(drawer);
}

function initCart() {
  ensureCartHtml();

  // Listen for actions via event delegation
  document.addEventListener('click', (e) => {
    // Open cart drawer
    if (e.target.closest('#btn-cart-toggle')) {
      e.preventDefault();
      openCart();
      return;
    }
    // Close cart drawer
    if (e.target.closest('#cart-close-btn') || e.target === document.getElementById('cart-overlay')) {
      e.preventDefault();
      closeCart();
      return;
    }
    // Add to cart from cards
    const addBtn = e.target.closest('.btn-add-to-cart-action');
    if (addBtn) {
      e.preventDefault();
      const prodId = addBtn.getAttribute('data-product-id');
      addToCart(prodId);
      
      // Close Quick View if active
      const qvClose = document.getElementById('quickview-close');
      if (qvClose && document.getElementById('quickview-modal').classList.contains('open')) {
        qvClose.click();
      }
      return;
    }
    // Quantity controls inside cart
    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
      e.preventDefault();
      const prodId = qtyBtn.getAttribute('data-product-id');
      const change = parseInt(qtyBtn.getAttribute('data-change')) || 0;
      updateQuantity(prodId, change);
      return;
    }
    // Remove item
    const removeBtn = e.target.closest('.cart-item-remove');
    if (removeBtn) {
      e.preventDefault();
      const prodId = removeBtn.getAttribute('data-product-id');
      removeFromCart(prodId);
      return;
    }
  });

  // Delivery options selection
  document.addEventListener('change', (e) => {
    if (e.target.name === 'cart-delivery') {
      updateCartUI();
    }
  });

  // Checkout button click
  document.addEventListener('click', (e) => {
    if (e.target.id === 'cart-checkout-btn') {
      e.preventDefault();
      checkoutCart();
    }
  });

  loadCart();
}

function openCart() {
  ensureCartHtml();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.classList.add('cart-open');
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.classList.remove('cart-open');
}

function loadCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (stored) {
    try {
      cart = JSON.parse(stored);
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      spec: product.spec,
      image: product.image,
      quantity: 1
    });
  }
  saveCart();
  updateCartUI();
  openCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const clean = priceStr.replace('Desde', '').replace('€', '').replace(/\s/g, '').replace(',', '.');
  const price = parseFloat(clean);
  return isNaN(price) ? 0 : price;
}

function updateCartUI() {
  ensureCartHtml();

  const itemsList = document.getElementById('cart-items-list');
  const emptyMsg = document.getElementById('cart-empty-message');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const shippingRow = document.getElementById('cart-shipping-row');
  const totalVal = document.getElementById('cart-total-val');
  const badge = document.getElementById('cart-count-badge');

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = count;
    badge.classList.remove('updated');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('updated');
  }

  if (cart.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'flex';
    if (itemsList) itemsList.innerHTML = '';
    if (subtotalVal) subtotalVal.textContent = '0,00 €';
    if (shippingRow) shippingRow.style.display = 'none';
    if (totalVal) totalVal.textContent = '0,00 €';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  if (itemsList) {
    itemsList.innerHTML = cart.map(item => {
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h3 class="cart-item-name">${item.name}</h3>
            <span class="cart-item-price">${item.price} (${item.spec})</span>
            <div class="cart-item-qty-control">
              <button class="cart-qty-btn" data-product-id="${item.id}" data-change="-1" aria-label="Disminuir cantidad">&minus;</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn" data-product-id="${item.id}" data-change="1" aria-label="Aumentar cantidad">&plus;</button>
            </div>
          </div>
          <button class="cart-item-remove" data-product-id="${item.id}" aria-label="Eliminar ${item.name}">&times;</button>
        </div>
      `;
    }).join('');
  }

  const subtotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  
  const deliveryRadio = document.querySelector('input[name="cart-delivery"]:checked');
  const isDelivery = deliveryRadio && deliveryRadio.value === 'delivery';
  const shippingCost = isDelivery ? 5.0 : 0.0;
  const total = subtotal + shippingCost;

  if (subtotalVal) subtotalVal.textContent = subtotal.toFixed(2).replace('.', ',') + ' €';
  
  if (shippingRow) {
    shippingRow.style.display = isDelivery ? 'flex' : 'none';
  }
  
  if (totalVal) totalVal.textContent = total.toFixed(2).replace('.', ',') + ' €';
}

function checkoutCart() {
  if (cart.length === 0) return;

  const isPlaceholder = businessConfig.whatsapp.includes('[AÑADIR');
  const phone = isPlaceholder ? '600000000' : businessConfig.whatsapp.replace(/\+/g, '').replace(/\s/g, '');

  const deliveryRadio = document.querySelector('input[name="cart-delivery"]:checked');
  const deliveryType = deliveryRadio ? deliveryRadio.value : 'collect';
  const isDelivery = deliveryType === 'delivery';

  const subtotal = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  const shippingCost = isDelivery ? 5.0 : 0.0;
  const total = subtotal + shippingCost;

  const deliveryText = isDelivery ? 'Envío a Domicilio (+5,00 €)' : 'Recoger en Obrador (Gratis)';

  let itemsText = '';
  cart.forEach(item => {
    itemsText += `  • ${item.quantity}x ${item.name} (${item.spec}) - ${item.price}\n`;
  });

  const waMessage = `Atelier Le Canele: ¡Nueva Solicitud de Cesta Gourmet! 🛒\n` +
                    `-----------------------------------------------\n` +
                    `• Productos seleccionados:\n${itemsText}\n` +
                    `• Modalidad de entrega: ${deliveryText}\n` +
                    `-----------------------------------------------\n` +
                    `• Subtotal: ${subtotal.toFixed(2).replace('.', ',')} €\n` +
                    (isDelivery ? `• Envío: 5,00 €\n` : '') +
                    `• Total Estimado: ${total.toFixed(2).replace('.', ',')} €\n\n` +
                    `Por favor, confirma la fecha y hora deseadas para la entrega/recogida para validar tu encargo con el maestro pastelero.`;

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waMessage)}`;
  window.open(waUrl, '_blank');
}
