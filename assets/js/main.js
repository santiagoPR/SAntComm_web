/**
 * SANTCOM - MAIN JAVASCRIPT
 * Combines: scroll reveal, fixed header, hamburger menu,
 * counter animation, language switcher, and newsletter form.
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. SCROLL REVEAL (IntersectionObserver with stagger delay)
    // =========================================================================
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal');

        if (!revealElements.length) return;

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Stagger siblings: find the index among sibling .reveal elements
                    var parent = entry.target.parentElement;
                    var siblings = parent ? parent.querySelectorAll('.reveal') : [];
                    var index = 0;

                    siblings.forEach(function (sib, i) {
                        if (sib === entry.target) {
                            index = i;
                        }
                    });

                    entry.target.style.transitionDelay = (index * 0.15) + 's';
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // =========================================================================
    // 2. HEADER FIXED ON SCROLL
    // =========================================================================
    function initHeaderScroll() {
        var header = document.getElementById('siteHeader');
        if (!header) return;

        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 50) {
                header.classList.add('is-fixed');
            } else {
                header.classList.remove('is-fixed');
            }
        });
    }

    // =========================================================================
    // 3. HAMBURGER / MOBILE MENU
    // =========================================================================
    function initHamburgerMenu() {
        var hamburger = document.getElementById('hamburger');
        var mobileNav = document.getElementById('mobileNav');

        if (!hamburger || !mobileNav) return;

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
            document.body.style.overflow =
                mobileNav.classList.contains('is-open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                hamburger.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================================================
    // 4. COUNTER ANIMATION
    // =========================================================================
    function initCounterAnimation() {
        var statNumbers = document.querySelectorAll('.stat-number');

        if (!statNumbers.length) return;

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    /**
     * Animate a number from 0 to its data-target value.
     * Supports data-suffix attribute or auto-detects '%' in the text.
     */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        var duration = 2000;
        var startTime = null;
        var suffix = '';

        // Determine suffix
        if (el.getAttribute('data-suffix')) {
            suffix = el.getAttribute('data-suffix');
        } else if (el.textContent.indexOf('%') !== -1) {
            suffix = '%';
        }

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = Math.floor(easeOut(progress) * target);

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    // =========================================================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    var target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    // =========================================================================
    // 6. NEWSLETTER FORM HANDLER
    // =========================================================================
    function initNewsletterForm() {
        var form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var emailInput = form.querySelector('input[type="email"]');
            var checkbox = form.querySelector('input[type="checkbox"]');
            var email = emailInput ? emailInput.value.trim() : '';
            var isChecked = checkbox ? checkbox.checked : false;

            // Basic email pattern validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !emailPattern.test(email)) {
                alert('Por favor ingrese un correo electrónico válido. / Please enter a valid email address.');
                return;
            }

            if (!isChecked) {
                alert('Por favor acepte la suscripción. / Please check the subscription checkbox.');
                return;
            }

            // Success
            alert('¡Gracias por suscribirse! / Thank you for subscribing!');
            form.reset();
        });
    }

    // =========================================================================
    // INIT — Run everything when the DOM is ready
    // =========================================================================
    function init() {
        initScrollReveal();
        initHeaderScroll();
        initHamburgerMenu();
        initCounterAnimation();
        initSmoothScroll();
        initNewsletterForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


// =============================================================================
// LANGUAGE SWITCHER (global function, called from each page's inline script)
// =============================================================================

/**
 * Initialize the language switcher with a page-specific translations object.
 *
 * @param {Object} translations - Format:
 *   {
 *     es: { '.css-selector': 'Texto en español', ... },
 *     en: { '.css-selector': 'English text', ... }
 *   }
 *
 * For each key in the translations object, `document.querySelector(key)` is
 * used to find the element. If the value contains '<' it is set via innerHTML;
 * otherwise it is set via textContent.
 */
function initLanguageSwitcher(translations) {
    var langEn = document.getElementById('lang-en');
    var langEs = document.getElementById('lang-es');

    if (!langEn || !langEs) return;

    /**
     * Apply translations for the given language and persist the choice.
     */
    function setLanguage(lang) {
        var t = translations[lang];
        if (!t) return;

        localStorage.setItem('santcom-lang', lang);

        // Apply each translation by CSS selector
        Object.keys(t).forEach(function (selector) {
            var el = document.querySelector(selector);
            if (!el) return;

            var value = t[selector];

            // Use innerHTML if the value contains HTML tags, otherwise textContent
            if (typeof value === 'string' && value.indexOf('<') !== -1) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });

        // Update active button state
        langEn.classList.toggle('active', lang === 'en');
        langEs.classList.toggle('active', lang === 'es');
    }

    // Click handlers
    langEn.addEventListener('click', function () { setLanguage('en'); });
    langEs.addEventListener('click', function () { setLanguage('es'); });

    // Apply saved language on load (default: Spanish)
    var savedLang = localStorage.getItem('santcom-lang') || 'es';
    setLanguage(savedLang);
}
