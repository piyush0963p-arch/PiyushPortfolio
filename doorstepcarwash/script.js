document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        } else {
            mobileMenuIcon.classList.remove('fa-bars');
            mobileMenuIcon.classList.add('fa-times');
        }
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.classList.remove('fa-times');
            mobileMenuIcon.classList.add('fa-bars');
        });
    });

    // Sticky Header Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('nav-scrolled');
            header.classList.remove('py-4', 'bg-transparent');
            header.classList.add('py-2', 'bg-white');
        } else {
            header.classList.remove('nav-scrolled');
            header.classList.add('py-4', 'bg-transparent');
            header.classList.remove('py-2', 'bg-white');
        }
    });

    // Trigger scroll event on load in case page is refreshed halfway down
    window.dispatchEvent(new Event('scroll'));

    // Form Submission Simulation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Processing...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Booking Confirmed!';
                submitBtn.classList.remove('bg-primary', 'hover:bg-blue-800');
                submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                // Reset form
                bookingForm.reset();

                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-primary', 'hover:bg-blue-800');
                    submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                }, 3000);
            }, 1500);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        btn.addEventListener('click', () => {
            const isOpen = !content.classList.contains('hidden');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-content').classList.add('hidden');
                otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            });

            // Toggle current
            if (!isOpen) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Image Comparison Slider
    const sliders = document.querySelectorAll('.image-comparison');
    sliders.forEach(slider => {
        const input = slider.querySelector('.image-comparison-slider');
        const beforeImage = slider.querySelector('.image-comparison-before');
        const line = slider.querySelector('.image-comparison-line');
        const img = beforeImage.querySelector('img');

        if (input && beforeImage && line && img) {
            const updateImageWidth = () => {
                img.style.width = `${slider.offsetWidth}px`;
            };
            
            window.addEventListener('resize', updateImageWidth);
            // Small timeout to ensure styles are applied
            setTimeout(updateImageWidth, 100);

            input.addEventListener('input', (e) => {
                const val = e.target.value;
                beforeImage.style.width = `${val}%`;
                line.style.left = `${val}%`;
            });
        }
    });
});
