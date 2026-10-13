/* ── MediAI Care — Shared JavaScript ── */

// ── THEME ──────────────────────────────────────────
const THEME_KEY = 'mediai-theme';
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
}

// ── NAVBAR SCROLL ──────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
}

// ── SIDEBAR ────────────────────────────────────────
function initSidebar() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
  // Mark active link
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
}

// ── COUNT-UP ANIMATION ─────────────────────────────
function countUp(el, target, duration = 1800, prefix = '', suffix = '') {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        countUp(el, target, 1800, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ── SCROLL REVEAL ──────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

// ── TABS ───────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]');
      if (!group) return;
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ── CHART HELPERS ──────────────────────────────────
function drawLineChart(canvas, labels, datasets, options = {}) {
  if (!canvas || !window.Chart) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.08)';
  if (canvas._chart) canvas._chart.destroy();
  canvas._chart = new Chart(canvas, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor, font: { family: 'Inter', size: 12 } } }, ...options.plugins },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }
      },
      elements: { line: { tension: 0.4 }, point: { radius: 3, hoverRadius: 6 } },
      ...options
    }
  });
}
function drawBarChart(canvas, labels, datasets, options = {}) {
  if (!canvas || !window.Chart) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.08)';
  if (canvas._chart) canvas._chart.destroy();
  canvas._chart = new Chart(canvas, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } }
      },
      borderRadius: 6,
      ...options
    }
  });
}
function drawDoughnutChart(canvas, labels, data, colors) {
  if (!canvas || !window.Chart) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  if (canvas._chart) canvas._chart.destroy();
  canvas._chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '72%',
      plugins: { legend: { position: 'bottom', labels: { color: textColor, padding: 16, font: { size: 12 } } } }
    }
  });
}

// ── TOAST ──────────────────────────────────────────
function showToast(msg, type = 'success', duration = 3000) {
  const toast = document.createElement('div');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const colors = { success: '#10b981', error: '#f43f5e', warning: '#f59e0b', info: '#2563eb' };
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    display:flex; align-items:center; gap:10px;
    padding:14px 20px; border-radius:14px;
    background:var(--bg-card); box-shadow:var(--shadow-xl);
    border-left:4px solid ${colors[type]};
    font-size:14px; font-weight:500; color:var(--text-primary);
    animation:slideIn 0.3s ease; max-width:360px;
  `;
  toast.innerHTML = `<span style="font-size:18px">${icons[type]}</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── MODAL ──────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay[style*="flex"]').forEach(m => {
      m.style.display = 'none'; document.body.style.overflow = '';
    });
  }
});

// ── FLOATING LABELS ────────────────────────────────
function initFloatingLabels() {
  document.querySelectorAll('.float-label-group input, .float-label-group textarea').forEach(input => {
    const check = () => input.parentElement.classList.toggle('has-value', !!input.value);
    input.addEventListener('input', check);
    check();
  });
}

// ── INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initSidebar();
  initCounters();
  initScrollReveal();
  initTabs();
  initFloatingLabels();
  // Attach theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', toggleTheme));
});

// ── CHART.JS GRADIENT HELPERS ──────────────────────
function createGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}
