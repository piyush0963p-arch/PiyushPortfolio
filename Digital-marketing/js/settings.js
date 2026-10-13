/**
 * settings.js
 * Logic for the Settings Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const settingsThemeToggle = document.getElementById('settingsThemeToggle');
  const saveProfileBtn = document.getElementById('saveProfileBtn');

  // Sync the switch with the current theme
  if (settingsThemeToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    settingsThemeToggle.checked = currentTheme === 'dark';

    // Listen for changes on the switch
    settingsThemeToggle.addEventListener('change', (e) => {
      const newTheme = e.target.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Dispatch event for charts
      window.dispatchEvent(new Event('themeChanged'));
    });
  }

  // Listen for global theme changes (from navbar) to keep the switch in sync
  window.addEventListener('themeChanged', () => {
    if (settingsThemeToggle) {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      settingsThemeToggle.checked = currentTheme === 'dark';
    }
  });

  // Save Profile Mock
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
      const originalText = saveProfileBtn.textContent;
      saveProfileBtn.textContent = 'Saving...';
      saveProfileBtn.disabled = true;

      setTimeout(() => {
        saveProfileBtn.textContent = 'Saved Successfully';
        saveProfileBtn.classList.remove('btn-primary');
        saveProfileBtn.classList.add('btn-success');
        saveProfileBtn.style.backgroundColor = 'var(--success)';
        saveProfileBtn.style.color = '#fff';

        if (window.showToast) {
          window.showToast('Profile updated successfully', 'success');
        }

        setTimeout(() => {
          saveProfileBtn.textContent = originalText;
          saveProfileBtn.classList.add('btn-primary');
          saveProfileBtn.classList.remove('btn-success');
          saveProfileBtn.style.backgroundColor = '';
          saveProfileBtn.style.color = '';
          saveProfileBtn.disabled = false;
        }, 2000);
      }, 800);
    });
  }

});
