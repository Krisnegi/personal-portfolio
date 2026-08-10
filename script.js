/* ==========================================================================
   Kris Negi Portfolio Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
});

/* ==========================================================================
   Navigation Menu Logic
   ========================================================================== */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Toggle mobile menu
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('active');
            if (isOpen) {
                mobileNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                mobileNav.classList.add('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });
    }

    // Close mobile nav on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Update active nav links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // offset for nav height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Contact Form Validation Handler
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default browser redirect

        const emailInput = document.getElementById('form-email');
        const emailValue = emailInput.value.trim();

        // Regex pattern matching RFC 5322 specifications
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(emailValue)) {
            emailInput.style.borderColor = 'var(--danger)';
            emailInput.focus();
            alert('Please enter a valid email address.');
            return;
        }

        // Reset styling on success
        emailInput.style.borderColor = 'var(--border-color)';

        // Submit form asynchronously in the background
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! Kris will get back to you shortly.');
                form.reset();
            } else {
                alert('Oops! There was a problem submitting your message. Please check the fields and try again.');
            }
        })
        .catch(error => {
            alert('Oops! A network error occurred. Please try again.');
        });
    });
}
