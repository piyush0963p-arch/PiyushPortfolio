/* ─── Shared App JS ─── */

// ── Property Data ──
const PROPERTIES = [
  { id: 1, title: 'Skyline Residency Tower', location: 'Bandra West, Mumbai', price: '₹2.4 Cr', priceNum: 24000000, type: 'Apartment', beds: 3, baths: 2, area: 1850, status: 'For Sale', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80', agent: 'Priya Sharma', score: 94, lat: 19.0596, lng: 72.8295 },
  { id: 2, title: 'Green Valley Villa', location: 'Whitefield, Bangalore', price: '₹1.8 Cr', priceNum: 18000000, type: 'Villa', beds: 4, baths: 3, area: 2800, status: 'For Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', agent: 'Ravi Kumar', score: 89, lat: 12.9698, lng: 77.7500 },
  { id: 3, title: 'Pearl Heights Penthouse', location: 'Jubilee Hills, Hyderabad', price: '₹3.2 Cr', priceNum: 32000000, type: 'Penthouse', beds: 4, baths: 4, area: 3400, status: 'For Sale', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', agent: 'Anita Rao', score: 97, lat: 17.4126, lng: 78.4071 },
  { id: 4, title: 'Sunrise Studio Loft', location: 'Koramangala, Bangalore', price: '₹65 L', priceNum: 6500000, type: 'Studio', beds: 1, baths: 1, area: 650, status: 'For Rent', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', agent: 'Kiran Mehta', score: 78, lat: 12.9352, lng: 77.6245 },
  { id: 5, title: 'Garden Grove Duplex', location: 'Powai, Mumbai', price: '₹1.2 Cr', priceNum: 12000000, type: 'Duplex', beds: 3, baths: 2, area: 1650, status: 'For Sale', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80', agent: 'Deepa Nair', score: 85, lat: 19.1176, lng: 72.9060 },
  { id: 6, title: 'Marina Bay Apartment', location: 'Adyar, Chennai', price: '₹95 L', priceNum: 9500000, type: 'Apartment', beds: 2, baths: 2, area: 1200, status: 'For Sale', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', agent: 'Suresh Iyer', score: 82, lat: 13.0067, lng: 80.2206 },
  { id: 7, title: 'Emerald Park Cottage', location: 'Auroville, Puducherry', price: '₹45 L', priceNum: 4500000, type: 'Cottage', beds: 2, baths: 1, area: 900, status: 'For Sale', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80', agent: 'Meena Roy', score: 76, lat: 11.9338, lng: 79.8008 },
  { id: 8, title: 'Urban Nest Co-living', location: 'HSR Layout, Bangalore', price: '₹28 L', priceNum: 2800000, type: 'Apartment', beds: 1, baths: 1, area: 580, status: 'For Rent', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', agent: 'Ajay Singh', score: 73, lat: 12.9116, lng: 77.6474 },
];

const AGENTS = [
  { id: 1, name: 'Priya Sharma', role: 'Senior Property Advisor', exp: '8 years', city: 'Mumbai', deals: 142, rating: 4.9, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', speciality: 'Luxury Apartments' },
  { id: 2, name: 'Ravi Kumar', role: 'Villa Specialist', exp: '6 years', city: 'Bangalore', deals: 98, rating: 4.8, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', speciality: 'Villas & Bungalows' },
  { id: 3, name: 'Anita Rao', role: 'Investment Consultant', exp: '10 years', city: 'Hyderabad', deals: 215, rating: 4.9, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', speciality: 'Commercial & Premium' },
];

// ── Navbar Builder ──
function buildNavbar(activePage = '') {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'listings.html', label: 'Properties' },
    { href: 'map-view.html', label: 'Map View' },
    { href: 'comparison.html', label: 'Compare' },
    { href: 'ai-recommendations.html', label: 'AI Assistant' },
    { href: 'mortgage-calculator.html', label: 'Calculator' },
    { href: 'agent-dashboard.html', label: 'Dashboard' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="navbar" id="mainNav">
    <div class="navbar-inner">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">🏠</div>
        <span class="nav-logo-text">Estate<span>AI</span></span>
      </a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-actions">
        <a href="saved-properties.html" class="btn btn-ghost btn-sm">❤️ Saved</a>
        <a href="agent-dashboard.html" class="btn btn-primary btn-sm">Dashboard</a>
        <button class="nav-toggle" id="navToggle" onclick="toggleMobileNav()">☰</button>
      </div>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">${mobileLinks}</div>`;
}

function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ── Footer Builder ──
function buildFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="text-decoration:none">
            <div class="nav-logo-icon">🏠</div>
            <span class="nav-logo-text">Estate<span>AI</span></span>
          </a>
          <p>India's most intelligent AI-powered real estate platform. Find, compare, and invest in your dream property with the power of AI.</p>
          <div class="social-links" style="margin-top:20px">
            <a class="social-link" href="#">𝕏</a>
            <a class="social-link" href="#">in</a>
            <a class="social-link" href="#">f</a>
            <a class="social-link" href="#">▶</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="listings.html">Browse Properties</a></li>
            <li><a href="map-view.html">Map View</a></li>
            <li><a href="comparison.html">Compare</a></li>
            <li><a href="saved-properties.html">Saved Properties</a></li>
            <li><a href="ai-recommendations.html">AI Assistant</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            <li><a href="mortgage-calculator.html">EMI Calculator</a></li>
            <li><a href="agent-dashboard.html">Agent Dashboard</a></li>
            <li><a href="#">Investment Guide</a></li>
            <li><a href="#">Market Trends</a></li>
            <li><a href="#">Valuation Tool</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p style="color:var(--text-dim)">© 2025 EstateAI. All rights reserved. Built with ❤️ in India.</p>
        <p style="color:var(--text-dim);font-size:0.8rem">🔒 SSL Secured &nbsp;|&nbsp; 🏆 RERA Certified &nbsp;|&nbsp; 🌟 ISO 9001</p>
      </div>
    </div>
  </footer>`;
}

// ── Property Card Builder ──
function buildPropCard(p, saved = false) {
  return `
  <div class="prop-card" onclick="window.location='property-details.html'">
    <div class="prop-card-img">
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <div class="prop-card-badge">
        <span class="badge ${p.status === 'For Sale' ? 'badge-accent' : 'badge-warning'}">${p.status}</span>
      </div>
      <button class="prop-fav-btn ${saved ? 'active' : ''}" onclick="toggleFav(event, ${p.id})" id="fav-${p.id}">♥</button>
    </div>
    <div class="prop-card-body">
      <div class="prop-card-price">${p.price}</div>
      <div class="prop-card-title">${p.title}</div>
      <div class="prop-card-loc">📍 ${p.location}</div>
      <div class="prop-card-stats">
        <div class="prop-stat">🛏 <span>${p.beds} Beds</span></div>
        <div class="prop-stat">🚿 <span>${p.baths} Baths</span></div>
        <div class="prop-stat">📐 <span>${p.area} sqft</span></div>
      </div>
      <div class="prop-card-actions">
        <a href="property-details.html" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">View Details</a>
        <a href="comparison.html" class="btn btn-ghost btn-sm" onclick="event.stopPropagation()">Compare</a>
      </div>
    </div>
  </div>`;
}

// ── Favourite Toggle ──
const savedIds = JSON.parse(localStorage.getItem('estateai_saved') || '[]');
function toggleFav(e, id) {
  e.stopPropagation();
  const btn = document.getElementById('fav-' + id);
  const idx = savedIds.indexOf(id);
  if (idx === -1) { savedIds.push(id); btn && btn.classList.add('active'); }
  else { savedIds.splice(idx, 1); btn && btn.classList.remove('active'); }
  localStorage.setItem('estateai_saved', JSON.stringify(savedIds));
}

// ── Scroll Reveal ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── Number Counter Animation ──
function animateCounter(el, target, duration = 2000, prefix = '', suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = prefix + Math.floor(start).toLocaleString('en-IN') + suffix;
  }, 16);
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter(el, target, 2000, prefix, suffix);
        obs.disconnect();
      }
    });
    obs.observe(el);
  });
}

// ── Ripple Effect ──
function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      const rect = btn.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left) + 'px';
      circle.style.top  = (e.clientY - rect.top) + 'px';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 800);
    });
  });
}

// ── Navbar scroll shadow ──
function initNavbarScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(15,23,42,0.08)' : '0 2px 12px rgba(15,23,42,0.04)';
  });
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initRipple();
  initNavbarScroll();
});
