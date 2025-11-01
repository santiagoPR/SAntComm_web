// SAntComm Premium - Advanced Interactions & Animations
// ========================================================

(function() {
    'use strict';

    // ===========================
    // Particle.js Configuration
    // ===========================
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00c8aa', '#38bdf8', '#818cf8']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00c8aa',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // ===========================
    // Animated Counter
    // ===========================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        const prefix = element.dataset.prefix || '';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = prefix + target;
                clearInterval(timer);
            } else {
                element.textContent = prefix + Math.floor(current);
            }
        }, 16);
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.dataset.count);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===========================
    // Chart.js - Predictive Analytics
    // ===========================
    function initChart() {
        const canvas = document.getElementById('predictiveChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');

        // Gradient for chart
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 200, 170, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 200, 170, 0.01)');

        const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
        gradientLine.addColorStop(0, '#00c8aa');
        gradientLine.addColorStop(1, '#38bdf8');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Predicted Budget',
                        data: [85, 88, 92, 95, 97, 96, 98, 99, 97, 95, 93, 92],
                        borderColor: gradientLine,
                        backgroundColor: gradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#00c8aa',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Actual Performance',
                        data: [82, 86, 90, 94, 95, 97, 96, 98, 96, 94, 91, 90],
                        borderColor: '#818cf8',
                        backgroundColor: 'rgba(129, 140, 248, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#818cf8',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#cbd5e1',
                            font: {
                                family: 'Inter',
                                size: 13,
                                weight: '500'
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 14, 26, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        borderColor: 'rgba(0, 200, 170, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 75,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter',
                                size: 12
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94a3b8',
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // ===========================
    // Smooth Scrolling
    // ===========================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                e.preventDefault();
                const target = document.querySelector(targetId);

                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
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
    // Header Scroll Effect
    // ===========================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // ===========================
    // Mobile Menu
    // ===========================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');

                const spans = this.querySelectorAll('span');
                if (this.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }

    // ===========================
    // AOS Animation Initialization
    // ===========================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 0,
                anchorPlacement: 'top-bottom'
            });
        }
    }

    // ===========================
    // GSAP ScrollTrigger Animations
    // ===========================
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate problem cards
        gsap.utils.toArray('.problem-card-premium').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 60,
                rotation: 2,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });

        // Animate solution cards
        gsap.utils.toArray('.solution-card-premium').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.9,
                y: 40,
                duration: 0.7,
                delay: i * 0.2,
                ease: 'back.out(1.4)'
            });
        });

        // Platform screen animation
        gsap.from('.platform-screen', {
            scrollTrigger: {
                trigger: '.platform-section-premium',
                start: 'top 60%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 80,
            scale: 0.95,
            duration: 1.2,
            ease: 'power3.out'
        });

        // Tech stack items
        gsap.utils.toArray('.tech-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });
    }

    // ===========================
    // Form Handling
    // ===========================
    function initContactForm() {
        const form = document.getElementById('contactForm');

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                if (!validateForm(data)) {
                    return;
                }

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalHTML = submitBtn.innerHTML;

                submitBtn.innerHTML = '<span>Sending...</span>';
                submitBtn.disabled = true;

                // Simulate submission
                setTimeout(() => {
                    showToast('Thank you! We\'ll be in touch within 24 hours.', 'success');
                    form.reset();
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }, 1500);
            });
        }
    }

    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {
            showToast('Please enter a valid email address.', 'error');
            return false;
        }

        const required = ['name', 'email', 'company', 'projectSize', 'message'];
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                showToast('Please fill in all required fields.', 'error');
                return false;
            }
        }

        return true;
    }

    function showToast(message, type = 'info') {
        const existing = document.querySelector('.toast-premium');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast-premium toast-${type}`;

        const icon = type === 'success' ? '✓' : '⚠';
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        `;

        const styles = `
            .toast-premium {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: rgba(19, 24, 36, 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 1.25rem 1.75rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(20px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            .toast-premium.toast-success { border-color: #22c55e; }
            .toast-premium.toast-error { border-color: #ef4444; }
            .toast-icon {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
            .toast-success .toast-icon {
                background: rgba(34, 197, 94, 0.2);
                color: #22c55e;
            }
            .toast-error .toast-icon {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }
            .toast-message {
                color: #fff;
                font-weight: 500;
            }
        `;

        if (!document.querySelector('#toast-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'toast-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ===========================
    // Scroll Progress Indicator
    // ===========================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00c8aa, #38bdf8);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ===========================
    // Parallax Effect for Hero
    // ===========================
    function initParallax() {
        const heroVideo = document.querySelector('.hero-video');

        if (heroVideo) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                heroVideo.style.transform = `translateY(${parallax}px)`;
            });
        }
    }

    // ===========================
    // Cursor Trail Effect (Optional)
    // ===========================
    function initCursorTrail() {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    // ===========================
    // Initialize All
    // ===========================
    function init() {
        console.log('🚀 SAntComm Premium - Initializing...');

        initParticles();
        initCounters();
        initChart();
        initSmoothScroll();
        initHeaderScroll();
        initMobileMenu();
        initAOS();
        initGSAPAnimations();
        initContactForm();
        initScrollProgress();
        initParallax();

        console.log('✅ SAntComm Premium - All systems operational');
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
