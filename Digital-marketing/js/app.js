/**
 * app.js
 * Core application logic for AI Digital Marketing Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Elements ---
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const themeToggle = document.querySelector('.theme-toggle');
  const notificationBtn = document.querySelector('.navbar-btn.notification-toggle');
  const notificationPanel = document.querySelector('.notification-panel');
  const profileToggle = document.querySelector('.navbar-profile');
  const profileDropdown = document.querySelector('.dropdown-menu');

  // --- Theme Management ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeIcon('light');
    }
  };

  const updateThemeIcon = (theme) => {
    if (!themeToggle) return;
    if (theme === 'dark') {
      themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    } else {
      themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    }
    if (window.lucide) lucide.createIcons();
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Trigger event for charts to update colors
      window.dispatchEvent(new Event('themeChanged'));
    });
  }

  // --- Sidebar Navigation ---
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        sidebar.classList.toggle('expanded');
        if (sidebarOverlay) {
          sidebarOverlay.classList.toggle('show');
        }
      } else {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('expanded');
      sidebarOverlay.classList.remove('show');
    });
  }

  // Close sidebar on mobile when nav item clicked
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('expanded');
        if (sidebarOverlay) sidebarOverlay.classList.remove('show');
      }
    });
  });

  // --- Dropdowns & Panels ---
  const closeAllDropdowns = () => {
    if (notificationPanel) notificationPanel.classList.remove('show');
    if (profileDropdown) profileDropdown.classList.remove('show');
  };

  if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = notificationPanel.classList.contains('show');
      closeAllDropdowns();
      if (!isShowing) notificationPanel.classList.add('show');
    });
  }

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShowing = profileDropdown.classList.contains('show');
      closeAllDropdowns();
      if (!isShowing) profileDropdown.classList.add('show');
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (notificationPanel && !notificationBtn.contains(e.target) && !notificationPanel.contains(e.target)) {
      notificationPanel.classList.remove('show');
    }
    if (profileDropdown && !profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove('show');
    }
  });

  // --- Toast Notification System ---
  window.showToast = (message, type = 'info', duration = 3000) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-circle';
    if (type === 'warning') icon = 'alert-triangle';

    toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${icon}"></i>
      </div>
      <div class="toast-message">${message}</div>
      <div class="toast-close" onclick="this.parentElement.remove()">
        <i data-lucide="x"></i>
      </div>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse forwards';
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  };

  // --- Keyboard Shortcuts ---
  document.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.navbar-search input');
      if (searchInput) searchInput.focus();
    }
  });

  // --- Initialization ---
  initTheme();
  
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
});
