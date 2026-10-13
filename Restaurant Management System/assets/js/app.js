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
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
