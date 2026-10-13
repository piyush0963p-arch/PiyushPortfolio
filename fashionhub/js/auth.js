(function () {
  const FH = window.FashionHub;

  function initAuthTabs() {
    const tabs = document.querySelectorAll('#authTabs button');
    const panels = {
      login: document.getElementById('loginPanel'),
      signup: document.getElementById('signupPanel')
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        Object.values(panels).forEach(p => p.classList.remove('active'));
        panels[tab.dataset.tab].classList.add('active');
      });
    });
  }

  function handleAuthSuccess() {
    const redirect = sessionStorage.getItem('fh_redirect') || 'index.html';
    sessionStorage.removeItem('fh_redirect');
    window.location.href = redirect;
  }

  function initForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        try {
          FH.loginUser(email, password);
          FH.toast('Signed in successfully');
          setTimeout(handleAuthSuccess, 800);
        } catch (error) {
          FH.toast(error.message);
        }
      });
    }

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;

        try {
          FH.registerUser(name, email, password);
          FH.toast('Account created successfully');
          setTimeout(handleAuthSuccess, 800);
        } catch (error) {
          FH.toast(error.message);
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAuthTabs();
    initForms();
  });
})();
