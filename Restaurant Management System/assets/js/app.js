// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode for premium feel
    document.documentElement.setAttribute('data-theme', savedTheme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Setup theme toggles if they exist on the page
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // Setup mobile sidebar toggle
    const sidebar = document.querySelector('.sidebar');
    const topbarLeft = document.querySelector('.topbar-left');
    if (sidebar && topbarLeft) {
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }
        
        let toggleBtn = document.querySelector('.mobile-sidebar-toggle');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.className = 'icon-btn mobile-sidebar-toggle';
            toggleBtn.style.marginRight = '0.75rem';
            toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
            toggleBtn.innerHTML = '<i data-lucide="menu"></i>';
            topbarLeft.insertBefore(toggleBtn, topbarLeft.firstChild);
        }

        const toggleSidebar = () => {
            const isOpen = sidebar.classList.toggle('open');
            overlay.classList.toggle('open', isOpen);
        };

        toggleBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
