/* ============================================================
   AEGIS SHIELD SECURITY — Premium JavaScript
   GSAP | AOS | Swiper | Particles | Counters | Interactions
   ============================================================ */

'use strict';

/* ════════════════════════════════
   LOADER
════════════════════════════════ */
(function initLoader() {
  const loader   = document.getElementById('loader');
  const fill     = document.getElementById('loaderFill');
  const pct      = document.getElementById('loaderPct');
  if (!loader) return;

  document.body.style.overflow = 'hidden';
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 14 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    fill.style.width = Math.min(progress, 100) + '%';
    pct.textContent  = Math.floor(Math.min(progress, 100)) + '%';

    if (progress >= 100) {
      setTimeout(() => {
        loader.style.opacity    = '0';
        loader.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          initAll();
        }, 200);
      }, 50);
    }
  }, 10);
})();

/* ════════════════════════════════
   MASTER INIT
════════════════════════════════ */
function initAll() {
  initAOS();
  initGSAP();
  initHeader();
  initMobileMenu();
  initHeroSlides();
  initParticles();
  initTicker();
  initMvvTabs();
  initCounters();
  initHeroCounters();
  initTestimonials();
  initGalleryFilter();
  initFAQ();
  initContactForm();
  initNewsletterForm();
  initFloatButtons();
  initThemeToggle();
  initActiveNav();
  initSmoothScroll();
}

/* ════════════════════════════════
   AOS
════════════════════════════════ */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({ duration: 300, easing: 'ease-out-cubic', once: true, offset: 30 });
}

/* ════════════════════════════════
   GSAP — Non-conflicting animations only
   Note: AOS handles fade/slide reveals.
   GSAP only handles parallax scroll effects
   on elements that do NOT have data-aos.
════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Process steps: highlight gold border as they enter viewport
    gsap.utils.toArray('.proc-step').forEach((step, i) => {
      gsap.from(step, {
        borderColor: 'rgba(255,255,255,0.12)',
        duration: 0.2,
        scrollTrigger: { trigger: step, start: 'top 80%', once: true }
      });
    });
}

/* ════════════════════════════════
   HEADER SCROLL
════════════════════════════════ */
function initHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ════════════════════════════════
   MOBILE MENU
════════════════════════════════ */
function initMobileMenu() {
  const btn    = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const close  = document.getElementById('drawerClose');
  const links  = drawer ? drawer.querySelectorAll('.dl') : [];
  if (!btn || !drawer) return;

  const openDrawer  = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeDrawer = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };

  btn.addEventListener('click', openDrawer);
  close.addEventListener('click', closeDrawer);
  links.forEach(l => l.addEventListener('click', closeDrawer));
  drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
}

/* ════════════════════════════════
   HERO SLIDES
════════════════════════════════ */
function initHeroSlides() {
  const slides = document.querySelectorAll('.hslide');
  if (!slides.length) return;
  let current = 0;
  slides[0].classList.add('active');
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2000);
}

/* ════════════════════════════════
   PARTICLE CANVAS
════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD = 'rgba(212,175,55,';

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.a  = Math.random() * 0.6 + 0.2;
      this.life = Math.random() * 200 + 100;
      this.age  = 0;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.age++;
      if (this.age > this.life || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      const opacity = Math.sin((this.age / this.life) * Math.PI) * this.a;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + opacity + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = GOLD + (0.06 * (1 - d/100)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ════════════════════════════════
   TICKER (CSS driven — just init)
════════════════════════════════ */
function initTicker() {
  // CSS animation handles it, nothing needed
}

/* ════════════════════════════════
   MVV TABS
════════════════════════════════ */
function initMvvTabs() {
  const tabs  = document.querySelectorAll('.mvv-tab');
  const panes = document.querySelectorAll('.mvv-pane');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t  => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector('[data-pane="' + tab.dataset.tab + '"]');
      if (target) target.classList.add('active');
    });
  });
}

/* ════════════════════════════════
   COUNTERS (stats section)
════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = '1';
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, 0, target, 2000);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  function update(timestamp) {
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(start + (end - start) * ease).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end.toLocaleString();
  }
  requestAnimationFrame(update);
}

/* ════════════════════════════════
   HERO COUNTERS
════════════════════════════════ */
function initHeroCounters() {
  const els = document.querySelectorAll('.counter-h[data-target]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = '1';
      animateCounter(entry.target, 0, parseInt(entry.target.dataset.target), 2200);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

/* ════════════════════════════════
   TESTIMONIALS SWIPER
════════════════════════════════ */
function initTestimonials() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.test-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
}

/* ════════════════════════════════
   GALLERY FILTER
════════════════════════════════ */
function initGalleryFilter() {
  const btns  = document.querySelectorAll('.gf-btn');
  const items = document.querySelectorAll('.gal-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ════════════════════════════════
   FAQ ACCORDION
════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-q').forEach(b => b.classList.remove('active'));

      // Open current if it was closed
      if (!isOpen) {
        answer.classList.add('open');
        btn.classList.add('active');
      }
    });
  });
}

/* ════════════════════════════════
   CONTACT FORM
════════════════════════════════ */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('cName');
    const phone = document.getElementById('cPhone');
    const email = document.getElementById('cEmail');

    let valid = true;
    [name, phone, email].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) return;

    // Simulate submission
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled  = true;

    setTimeout(() => {
      form.style.display    = 'none';
      success.style.display = 'block';
    }, 1800);
  });

  // Real-time validation reset
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => { field.style.borderColor = ''; });
  });
}

/* ════════════════════════════════
   NEWSLETTER FORM
════════════════════════════════ */
function initNewsletterForm() {
  const form  = document.getElementById('nlForm');
  const input = document.getElementById('nlEmail');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;
    input.value = '';
    input.placeholder = 'Thank you for subscribing!';
    input.style.color = 'var(--gold)';
    setTimeout(() => {
      input.placeholder = 'Your email address';
      input.style.color = '';
    }, 3000);
  });
}

/* ════════════════════════════════
   FLOATING BUTTONS
════════════════════════════════ */
function initFloatButtons() {
  const backTop = document.getElementById('backTop');
  if (!backTop) return;

  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ════════════════════════════════
   THEME TOGGLE
════════════════════════════════ */
function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  if (!btn) return;

  // Determine current hour in Indian Standard Time (IST)
  let isDark = true;
  try {
    const formatter = new Intl.DateTimeFormat([], { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
    const indianHour = parseInt(formatter.format(new Date()));
    // Day time (6:00 AM to 6:00 PM IST) -> Light mode. Night time -> Dark mode.
    isDark = (indianHour < 6 || indianHour >= 18);
  } catch (e) {
    // Fallback to local time if timezone query fails
    const localHour = new Date().getHours();
    isDark = (localHour < 6 || localHour >= 18);
  }

  // Set initial state
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

  btn.addEventListener('click', () => {
    isDark = !isDark;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
}

/* ════════════════════════════════
   ACTIVE NAV ON SCROLL
════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nm-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector('.nm-link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('mainHeader')?.offsetHeight || 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ════════════════════════════════
   MOUSE PARALLAX on HERO
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const hero   = document.querySelector('.hero');
  const cards  = document.querySelectorAll('.hcard');
  const grid   = document.querySelector('.hero-grid-overlay');
  if (!hero || !cards.length) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

    cards.forEach((card, i) => {
      const factor = (i % 2 === 0) ? 12 : 8;
      card.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });

    if (grid) {
      grid.style.transform = `translate(${cx * 6}px, ${cy * 6}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    cards.forEach(card => { card.style.transform = ''; });
    if (grid) grid.style.transform = '';
  });
});

/* ════════════════════════════════
   MICRO-INTERACTIONS
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Ripple on btn-gold
  document.querySelectorAll('.btn-gold').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;left:${e.clientX-rect.left}px;top:${e.clientY-rect.top}px;
        width:0;height:0;border-radius:50%;
        background:rgba(255,255,255,0.3);
        transform:translate(-50%,-50%);
        animation:rippleEffect 0.5s ease-out forwards;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { width:200px; height:200px; opacity:0; }
    }
    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
  `;
  document.head.appendChild(style);
});

/* ════════════════════════════════
   HERO SCROLL INDICATOR FADE
════════════════════════════════ */
window.addEventListener('scroll', () => {
  const ind = document.querySelector('.hero-scroll-ind');
  if (ind) ind.style.opacity = window.scrollY > 100 ? '0' : '1';
});

/* ════════════════════════════════
   INTERSECTION OBSERVER: process steps
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.proc-step');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.borderColor = 'rgba(212,175,55,0.4)';
        entry.target.querySelector('.ps-num').style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.5 });
  steps.forEach(s => obs.observe(s));
});
