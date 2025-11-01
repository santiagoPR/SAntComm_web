// SAntComm Main JavaScript - Enhanced Interactions

(function() {
    'use strict';

    // ===========================
    // Smooth Scrolling Navigation
    // ===========================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                // Skip if it's just "#"
                if (targetId === '#') return;

                e.preventDefault();

                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.nav-links');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.mobile-menu-btn').classList.remove('active');
                    }

                    // Scroll to target
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');

                // Animate menu button
                const spans = this.querySelectorAll('span');
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }

    // ===========================
    // Scroll-based Header Effect
    // ===========================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add shadow on scroll
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }

            // Hide/show header on scroll (disabled for better UX)
            // Keeping header visible at all times is better for navigation

            lastScroll = currentScroll;
        });
    }

    // ===========================
    // Active Navigation Highlighting
    // ===========================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.pageYOffset + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===========================
    // Scroll Animations (Intersection Observer)
    // ===========================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.stat-card, .problem-card, .solution-card, .value-card, .feature-item'
        );

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===========================
    // Contact Form Handling
    // ===========================
    function initContactForm() {
        const form = document.getElementById('contactForm');

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Validate
                if (!validateForm(data)) {
                    return;
                }

                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Success message
                    showMessage('Thank you! We\'ll be in touch soon.', 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // In production, send to backend:
                    // fetch('/api/contact', {
                    //     method: 'POST',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify(data)
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     showMessage('Thank you! We\'ll be in touch soon.', 'success');
                    //     form.reset();
                    // })
                    // .catch(error => {
                    //     showMessage('Sorry, there was an error. Please try again.', 'error');
                    // })
                    // .finally(() => {
                    //     submitBtn.textContent = originalText;
                    //     submitBtn.disabled = false;
                    // });
                }, 1500);
            });
        }
    }

    // ===========================
    // Form Validation
    // ===========================
    function validateForm(data) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return false;
        }

        // Required fields
        const requiredFields = ['name', 'email', 'company', 'projectSize', 'message'];
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showMessage('Please fill in all required fields.', 'error');
                return false;
            }
        }

        return true;
    }

    // ===========================
    // Show Message (Toast notification)
    // ===========================
    function showMessage(message, type = 'info') {
        // Remove any existing messages
        const existingMsg = document.querySelector('.toast-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `toast-message toast-${type}`;
        messageEl.textContent = message;

        // Add styles
        Object.assign(messageEl.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            backgroundColor: type === 'success' ? '#22c55e' : '#ef4444',
            color: 'white',
            fontWeight: '600',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });

        document.body.appendChild(messageEl);

        // Animate in
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(20px)';
            setTimeout(() => messageEl.remove(), 300);
        }, 4000);
    }

    // ===========================
    // Dashboard Chart Animation
    // ===========================
    function initChartAnimations() {
        const chartBars = document.querySelectorAll('.bar');

        if (chartBars.length > 0) {
            const chartObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bars = entry.target.querySelectorAll('.bar');
                        bars.forEach((bar, index) => {
                            setTimeout(() => {
                                bar.style.animation = 'barGrow 1s ease-out forwards';
                            }, index * 100);
                        });
                        chartObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            const chartContainer = document.querySelector('.chart-bars');
            if (chartContainer) {
                chartObserver.observe(chartContainer);
            }
        }
    }

    // ===========================
    // Scroll Indicator
    // ===========================
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const problemSection = document.querySelector('.problem-section');
                if (problemSection) {
                    problemSection.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Hide indicator on scroll
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 100) {
                    scrollIndicator.style.opacity = '0';
                } else {
                    scrollIndicator.style.opacity = '0.6';
                }
            });
        }
    }

    // ===========================
    // Performance Optimization: Lazy Load Images
    // ===========================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===========================
    // Accessibility: Keyboard Navigation
    // ===========================
    function initAccessibility() {
        // Trap focus in mobile menu when open
        const mobileMenu = document.querySelector('.nav-links');
        const focusableElements = 'a[href], button:not([disabled])';

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (menuBtn && menuBtn.classList.contains('active')) {
                    menuBtn.click();
                }
            }
        });
    }

    // ===========================
    // Initialize All Functions
    // ===========================
    function init() {
        initSmoothScrolling();
        initMobileMenu();
        initHeaderScroll();
        initActiveNavigation();
        initScrollAnimations();
        initContactForm();
        initChartAnimations();
        initScrollIndicator();
        initLazyLoading();
        initAccessibility();

        console.log('✓ SAntComm website initialized successfully');
    }

    // ===========================
    // Run on DOM Ready
    // ===========================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
