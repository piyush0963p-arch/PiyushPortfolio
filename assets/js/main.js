document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1000);
  }

  // AOS Initialization
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: true,
    mirror: false
  });

  // Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .portfolio-card, .service-card, .tool-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
      icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    }
  }

  themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
      body.removeAttribute('data-theme');
      icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
      localStorage.setItem('theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
      icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
      localStorage.setItem('theme', 'light');
    }
  });

  // Header Scroll Effect
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to Top
    if (window.scrollY > 500) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if(scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  if(hamburger) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Typed Text Effect
  const typedText = document.getElementById('typed-text');
  if (typedText) {
    const textArray = ["Web Designer", "Frontend Developer", "WordPress Expert", "Wix Specialist"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentText = textArray[textIndex];
      
      if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = 100;
      if (isDeleting) typeSpeed /= 2;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
  }

  // Animated Numbers
  const stats = document.querySelectorAll('.stat-num');
  let hasAnimated = false;

  function animateStats() {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          stat.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = target;
        }
      };
      updateCounter();
    });
  }

  // Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Check stats animation
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection && !hasAnimated) {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        animateStats();
        hasAnimated = true;
      }
    }
  });

  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Animated Skill Bars
  const skillSection = document.getElementById('skills');
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  window.addEventListener('scroll', () => {
    if (skillSection && !skillsAnimated) {
      const rect = skillSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        skillFills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
        skillsAnimated = true;
      }
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Swiper Slider
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
    });
  }

  // Simple Form Submission (Demo)
  const contactForm = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>Sending...</span><i class="bi bi-arrow-repeat"></i>';
      btn.style.opacity = '0.7';
      
      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        contactForm.reset();
        successMsg.style.display = 'flex';
        
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // Magnetic Buttons Effect
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Particles JS (Simple Implementation)
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `rgba(255, 255, 255, ${Math.random() * 0.3})`
      });
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      
      const isLightMode = document.body.getAttribute('data-theme') === 'light';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        
        if (isLightMode) {
          ctx.fillStyle = `rgba(37, 99, 235, ${p.r * 0.1})`; // Blue tint for light mode
        } else {
          ctx.fillStyle = p.color;
        }
        
        ctx.fill();
      });
      
      requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
  }
});
