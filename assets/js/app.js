/* =====================================================
   Piyush Patidar — Portfolio scripts
   ===================================================== */

/* ---------- Project data ----------
   To add a project: copy one object, change the fields,
   and drop an 800x500 screenshot into assets/img/projects/. */
const PROJECTS = [
  // ---- UI/UX Design (Figma Prototypes) ----
  {
    title: 'Xpert Carwash',
    desc: 'Mobile app UX/UI design for booking and managing car wash services. Competitor analysis, user pain points, user flows, sitemap, wireframes, and high-fidelity Figma mockups focused on a streamlined booking journey.',
    cat: 'uiux',
    img: 'xpert-carwash',
    url: 'https://www.figma.com/proto/lMR7KRDqPzkEARD1W2Hned/Xpert-Carwash?node-id=91-111&t=hTBBf7fFQQd2xOUl-1',
    tech: ['Figma', 'UI/UX Design', 'User Flows', 'Wireframing', 'Prototypes'],
    featured: true
  },
  {
    title: 'FrostFit — Winterwear App',
    desc: 'Mobile e-commerce app UX/UI design for luxury winterwear shopping. Competitor research, user flows, information architecture, wireframes, and polished Figma UI screens with a cohesive design system.',
    cat: 'uiux',
    img: 'winter-collection',
    url: 'https://www.figma.com/proto/q3v6XJO4jPuVAlyh5ZlYcV/Winter-collection-app?node-id=3-13268&t=7r92J2QVRgEFYWSb-1',
    tech: ['Figma', 'UI/UX Design', 'E-Commerce', 'Design Systems', 'Prototypes'],
    featured: true
  },

  // ---- Featured Showcases: UI/UX & Flagship Apps ----
  {
    title: 'FashionHub',
    desc: 'Premium fashion marketplace with product listing, product page, wishlist, cart, checkout and payment flow.',
    cat: 'ecommerce',
    img: 'fashionhub',
    url: '../fashionhub/index(1).html',
    tech: ['HTML', 'CSS', 'JS', 'localStorage'],
    featured: true
  },
  {
    title: 'LexAI Legal',
    desc: 'Legal consultation platform with case management, lawyer booking, billing, calendar and secure messaging.',
    cat: 'apps',
    img: 'lexai',
    url: '../Legal%20Consultation/index.html',
    tech: ['HTML', 'CSS', 'JS'],
    featured: true
  },

  // ---- Web Apps / Dashboards ----
  { title: 'EstateAI', desc: 'AI-powered real estate platform with listings, map view, comparisons, mortgage calculator and smart recommendations.', cat: 'apps', img: 'estate-ai', url: '../Real%20E-state/index.html', tech: ['HTML', 'CSS', 'JavaScript'], featured: true },
  { title: 'NexusAI Marketing', desc: 'Digital marketing suite with campaign analytics, SEO center, social planner, funnels and an AI content studio.', cat: 'apps', img: 'nexus-ai', url: '../Digital-marketing/index.html', tech: ['HTML', 'CSS', 'JS', 'Chart.js'], featured: true },
  { title: 'MediAI Care', desc: 'Healthcare portal for appointments, prescriptions, reports, telemedicine and patient / doctor dashboards.', cat: 'apps', img: 'mediai', url: '../Healthcare-portal/index.html', tech: ['HTML', 'CSS', 'JS', 'Chart.js'], featured: true },
  { title: 'DineFlow AI', desc: 'Restaurant management system — POS, kitchen display, table & inventory management, staff and analytics.', cat: 'apps', img: 'dineflow', url: '../Restaurant%20Management%20System/index.html', tech: ['HTML', 'CSS', 'JS', 'Lucide'], featured: true },
  { title: 'Student Dashboard', desc: 'Learning dashboard showing courses, attendance, assignments and performance at a glance.', cat: 'apps', img: 'student-dash', url: '../Task1-15/Student-Dashboard.html', tech: ['HTML', 'CSS', 'JS'] },

  // ---- Business Websites ----
  { title: 'Patel Workspace', desc: 'Coworking & virtual office website for Navrangpura, Ahmedabad with booking flows and a CMS-style admin panel.', cat: 'business', img: 'patel-workspace', url: '../Patelcoworking.space/Patelcoworking-space.html', tech: ['HTML', 'CSS', 'JS'], featured: true },
  { title: 'Aegis Shield Security', desc: 'Corporate website for a security agency — services, technology, training and careers pages.', cat: 'business', img: 'aegis-security', url: '../Security%20Agency/index.html', tech: ['HTML', 'CSS', 'JS'], featured: true },
  { title: 'Tops Coaching', desc: 'IIT-JEE & NEET coaching institute website with programs, results, faculty and admissions.', cat: 'business', img: 'coaching', url: '../Task1-15/Coaching-Institute.html', tech: ['HTML', 'CSS'] },
  { title: 'Gourmet Bites', desc: 'Online food ordering website with menu categories, cart and checkout experience.', cat: 'business', img: 'food-ordering', url: '../Task1-15/Food-Ordering.html', tech: ['HTML', 'CSS', 'JS'] },
  { title: 'My Fitness Gym', desc: 'Gym membership website with plans, trainers and a membership sign-up form.', cat: 'business', img: 'gym', url: '../Task1-15/Gym-Membership.html', tech: ['HTML', 'CSS'] },
  { title: 'Travel Agency', desc: 'Travel agency site featuring destinations, tour packages and booking enquiry.', cat: 'business', img: 'travel', url: '../Task1-15/Travel-Agency.html', tech: ['HTML', 'CSS'] },

  // ---- E-Commerce ----
  { title: 'NovaTech Compare', desc: 'Smartwatch product comparison page with specs table and highlighted differences.', cat: 'ecommerce', img: 'product-compare', url: '../Task1-15/Product-compair.html', tech: ['HTML', 'CSS', 'JS'] },

  // ---- Practice / UI Projects ----
  { title: 'Movie Maxx', desc: 'Movie information portal with trending titles, details and ratings.', cat: 'practice', img: 'movie', url: '../Task1-15/Movie-Information.html', tech: ['HTML', 'CSS'] },
  { title: 'The Global Chronicle', desc: 'News website layout with breaking news, categories and article grid.', cat: 'practice', img: 'news', url: '../Task1-15/News-website.html', tech: ['HTML', 'CSS'] },
  { title: 'Music Library', desc: 'Music streaming UI with playlists, albums and a player bar.', cat: 'practice', img: 'music', url: '../Task1-15/Music-library.html', tech: ['HTML', 'CSS'] },
  { title: 'Event Registration', desc: 'Event registration portal with schedule, speakers and sign-up form.', cat: 'practice', img: 'event-reg', url: '../Task1-15/Event-Registration-Portal.html', tech: ['HTML', 'CSS'] },
  { title: 'College Admission Portal', desc: 'University admission portal with programs and a multi-field application form.', cat: 'practice', img: 'admission', url: '../Task1-15/College-Admission-Portal.html', tech: ['HTML', 'CSS'] },
  { title: 'Fresher Welcome', desc: 'College fresher welcome event page with agenda and highlights.', cat: 'practice', img: 'fresher-welcome', url: '../Task1-15/Collage-fresher-welcome.html', tech: ['HTML', 'CSS'] },
  { title: 'CityCare Hospital', desc: 'Hospital patient registration form with validation-friendly layout.', cat: 'practice', img: 'hospital', url: '../Task1-15/HospitalRegistration.html', tech: ['HTML', 'CSS'] },
  { title: 'Support FAQ Center', desc: 'Help center with searchable, categorised frequently asked questions.', cat: 'practice', img: 'faq-portal', url: '../Task1-15/Faq-portal.html', tech: ['HTML', 'CSS'] },
  { title: 'School Timetable', desc: 'Weekly school timetable built with semantic HTML tables.', cat: 'practice', img: 'timetable', url: '../Task1-15/School-timetable.html', tech: ['HTML', 'CSS'] },
];

const CATEGORY_LABELS = { uiux: 'UI/UX Design', apps: 'Web App', business: 'Business', ecommerce: 'E-Commerce', practice: 'Practice' };
const PAGE_SIZE = 9;

document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initMobileMenu();
  initTyped();
  initProjects();
  initContactForm();
  initReveal();
  initCounters();
  initCursor();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Theme ---------- */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('i');
  const apply = (theme) => {
    if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    icon.className = theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun';
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  };
  apply(localStorage.getItem('theme') || 'dark');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    apply(next);
  });
}

/* ---------- Header: scrolled state, active link, back-to-top ---------- */
function initHeader() {
  const header = document.getElementById('header');
  const toTop = document.getElementById('to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = document.querySelectorAll('.nav a[href^="#"]');
  const map = new Map([...links].map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && map.has(e.target.id)) {
        links.forEach((l) => l.classList.remove('active'));
        map.get(e.target.id).classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const nav = document.getElementById('mobile-nav');
  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    nav.toggleAttribute('inert', !open);
    document.body.classList.toggle('menu-open', open);
  };
  setOpen(false);
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 992px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

/* ---------- Typed role ---------- */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;
  const words = ['UI/UX Designer', 'Web Designer', 'Frontend Developer', 'WordPress Developer'];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    c += del ? -1 : 1;
    el.textContent = word.slice(0, c);
    let t = del ? 45 : 90;
    if (!del && c === word.length) { t = 1800; del = true; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 400; }
    setTimeout(tick, t);
  };
  tick();
}

/* ---------- Projects ---------- */
function initProjects() {
  const grid = document.getElementById('projects-grid');
  const empty = document.getElementById('projects-empty');
  const moreBtn = document.getElementById('projects-more-btn');
  const search = document.getElementById('project-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  // Featured first, keep original order otherwise
  const list = [...PROJECTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const resolveUrl = (url) => {
    if (!url || url.startsWith('http://') || url.startsWith('https://')) return url;
    if (window.location.pathname === '/' || !window.location.pathname.includes('/piyush')) {
      return url.replace(/^\.\.\//, '');
    }
    return url;
  };

  grid.innerHTML = list.map((p) => {
    const projectUrl = resolveUrl(p.url);
    return `
    <article class="card project reveal" data-cat="${p.cat}" data-search="${(p.title + ' ' + p.desc + ' ' + p.tech.join(' ')).toLowerCase()}">
      <a class="project-thumb" href="${projectUrl}" target="_blank" rel="noopener" aria-label="Open ${p.title} live demo">
        <img src="assets/img/projects/${p.img}.jpg" alt="Screenshot of ${p.title}" loading="lazy" decoding="async" width="800" height="500">
        <span class="project-badge">${CATEGORY_LABELS[p.cat]}</span>
      </a>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          <a class="primary" href="${projectUrl}" target="_blank" rel="noopener"><i class="${projectUrl.includes('figma.com') ? 'bi bi-figma' : 'bi bi-box-arrow-up-right'}" aria-hidden="true"></i> ${projectUrl.includes('figma.com') ? 'Figma Prototype' : 'Live Demo'}</a>
        </div>
      </div>
    </article>
  `;
  }).join('');

  // Counts on filter buttons
  filterBtns.forEach((b) => {
    const f = b.dataset.filter;
    const n = f === 'all' ? list.length : list.filter((p) => p.cat === f).length;
    b.insertAdjacentHTML('beforeend', `<span class="count">${n}</span>`);
  });

  const cards = [...grid.children];
  let filter = 'all';
  let query = '';
  let expanded = false;

  const render = () => {
    const matches = cards.filter((c) =>
      (filter === 'all' || c.dataset.cat === filter) && (!query || c.dataset.search.includes(query)));
    const limit = expanded || query ? Infinity : PAGE_SIZE;
    cards.forEach((c) => c.classList.add('is-hidden'));
    matches.forEach((c, i) => c.classList.toggle('is-hidden', i >= limit));
    empty.style.display = matches.length ? 'none' : 'block';
    const hiddenCount = Math.max(0, matches.length - limit);
    moreBtn.parentElement.style.display = hiddenCount > 0 || (expanded && matches.length > PAGE_SIZE && !query) ? 'flex' : 'none';
    moreBtn.innerHTML = expanded
      ? '<span>Show less</span><i class="bi bi-chevron-up" aria-hidden="true"></i>'
      : `<span>Show ${hiddenCount} more</span><i class="bi bi-chevron-down" aria-hidden="true"></i>`;
  };

  filterBtns.forEach((b) => b.addEventListener('click', () => {
    filterBtns.forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    filter = b.dataset.filter;
    expanded = false;
    render();
  }));

  search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });

  moreBtn.addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (!expanded) document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });

  render();
}


/* ---------- Contact form: Direct Delivery with Instant Fallbacks ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitText = document.getElementById('contact-submit-text');

  // Clear field errors on input
  form.querySelectorAll('input, textarea, select').forEach((input) => {
    input.addEventListener('input', () => {
      input.closest('.field')?.classList.remove('is-invalid');
      const err = input.closest('.field')?.querySelector('.field-error-msg');
      if (err) err.remove();
    });
  });

  const showError = (fieldId, msg) => {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const parent = input.closest('.field');
    if (!parent) return;
    parent.classList.add('is-invalid');
    let err = parent.querySelector('.field-error-msg');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error-msg';
      parent.appendChild(err);
    }
    err.textContent = msg;
    input.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.innerHTML = '';

    // Validate inputs
    const nameInput = document.getElementById('c-name');
    const emailInput = document.getElementById('c-email');
    const phoneInput = document.getElementById('c-phone');
    const serviceInput = document.getElementById('c-service');
    const messageInput = document.getElementById('c-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : 'UI/UX Design';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) {
      showError('c-name', 'Please enter your name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('c-email', 'Please enter a valid email address.');
      return;
    }
    if (!message) {
      showError('c-message', 'Please enter your message.');
      return;
    }

    // Set loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending message...';

    const subjectText = `Project enquiry: ${service} — ${name}`;
    const bodyText = `Hi Piyush,\n\n${message}\n\n---\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service}`;
    const mailtoUrl = `mailto:${form.dataset.to || 'piyush0963p@gmail.com'}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${form.dataset.to || 'piyush0963p@gmail.com'}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const whatsappUrl = `https://wa.me/918619125706?text=${encodeURIComponent(`Hi Piyush, I would like to discuss a project with you.\n\n*Service:* ${service}\n*Message:* ${message}\n*From:* ${name} (${email}${phone ? ', ' + phone : ''})`)}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${form.dataset.to || 'piyush0963p@gmail.com'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone || 'Not provided',
          service: service,
          message: message,
          _subject: `New Portfolio Inquiry from ${name} (${service})`,
          _template: 'table'
        })
      });

      const result = await response.json().catch(() => ({ success: 'true' }));

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        status.innerHTML = `
          <div class="form-status-inner status-success">
            <i class="bi bi-check-circle-fill"></i>
            <div>
              <strong>Message Sent Successfully!</strong>
              <p>Thank you, ${name}. Your inquiry has been delivered directly to Piyush Patidar. You will receive a response within 24 hours.</p>
              <a href="${whatsappUrl}" target="_blank" rel="noopener" class="status-quick-link"><i class="bi bi-whatsapp"></i> Need a quicker reply? Chat with me on WhatsApp &rarr;</a>
            </div>
          </div>`;
        status.classList.add('show');
        form.reset();
      } else {
        throw new Error('Endpoint unconfirmed');
      }
    } catch (err) {
      // Fallback: If external API fails/blocked by adblocker, offer direct 1-click links + mailto trigger
      status.innerHTML = `
        <div class="form-status-inner status-fallback">
          <i class="bi bi-send-check"></i>
          <div>
            <strong>Message Ready to Send!</strong>
            <p>Your message is composed. Choose your preferred way to send it:</p>
            <div class="status-action-btns">
              <a href="${gmailUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="bi bi-envelope-fill"></i> Open in Gmail</a>
              <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm"><i class="bi bi-whatsapp"></i> Send via WhatsApp</a>
              <a href="${mailtoUrl}" class="btn btn-outline btn-sm"><i class="bi bi-box-arrow-up-right"></i> Default Mail App</a>
            </div>
          </div>
        </div>`;
      status.classList.add('show');

      // Also trigger mail client as automated desktop fallback
      const tempLink = document.createElement('a');
      tempLink.href = mailtoUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.innerHTML = '<i class="bi bi-send"></i> Send Message';
    }
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach((el) => io.observe(el));
}

/* ---------- Stat counters ---------- */
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      io.unobserve(el);
      if (reduce) { el.textContent = target; return; }
      const start = performance.now();
      const dur = 1200;
      const frame = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}

/* ---------- Interactive Custom Cursor & Hover Animation ---------- */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Don't run on touch devices or if user prefers reduced motion
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isInside = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Immediately position the inner precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isInside) {
      isInside = true;
      document.body.classList.add('cursor-active');
      ringX = mouseX;
      ringY = mouseY;
    }
  }, { passive: true });

  // Fluid lerping loop for the outer ring
  const render = () => {
    if (isInside) {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  // Click down / up animation
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-down'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'));

  // Window leave / enter
  document.addEventListener('mouseleave', () => {
    isInside = false;
    document.body.classList.remove('cursor-active');
  });
  document.addEventListener('mouseenter', () => {
    isInside = true;
    document.body.classList.add('cursor-active');
  });

  // Dynamic interactive element hover detection via event delegation
  const interactiveSelector = 'a, button, input, textarea, select, .btn, .icon-btn, .filter-btn, .chip, .card, .stat, .status-pill, .hero-dynamic-pill, .socials a, [role="button"]';
  const textSelector = '.hero-giant-title, h1, h2';

  document.addEventListener('mouseover', (e) => {
    const textTarget = e.target.closest(textSelector);
    if (textTarget) {
      document.body.classList.add('cursor-text-hover');
      return;
    }
    const interactiveTarget = e.target.closest(interactiveSelector);
    if (interactiveTarget) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const textTarget = e.target.closest(textSelector);
    if (textTarget) {
      document.body.classList.remove('cursor-text-hover');
    }
    const interactiveTarget = e.target.closest(interactiveSelector);
    if (interactiveTarget) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

