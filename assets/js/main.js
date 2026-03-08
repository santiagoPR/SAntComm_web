/**
 * SANTCOM - MAIN JAVASCRIPT
 * Handles scroll animations and interactions
 */

(function() {
    'use strict';

    // Scroll Animation Observer with stagger support
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings for editorial reveal effect
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(
                    el => el.classList.contains('scroll-animate') ||
                          el.classList.contains('feature-card') ||
                          el.classList.contains('stat-item')
                ) : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 100 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Wait for DOM to be ready
    function initScrollAnimations() {
        // Observe all scroll-animate elements
        const animatedElements = document.querySelectorAll('.scroll-animate, .feature-card, .frame-item, .stat-item');

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Newsletter form handling
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = form.querySelector('input[type="email"]').value;
                const checkbox = form.querySelector('input[type="checkbox"]').checked;

                if (email && checkbox) {
                    alert('Thank you for subscribing to our newsletter!');
                    form.reset();
                } else if (!checkbox) {
                    alert('Please check the subscription checkbox.');
                }
            });
        }
    }

    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');

        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Parallax scrolling effect for stats section
    function initParallaxScroll() {
        // Disable parallax on mobile - causes scroll jank
        if (window.innerWidth < 768) return;

        const parallaxBg = document.querySelector('.stats-parallax-bg');

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;

            if (parallaxBg) {
                const statsSection = document.querySelector('.stats-section');
                if (statsSection) {
                    const sectionTop = statsSection.offsetTop;
                    const sectionHeight = statsSection.offsetHeight;

                    if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                        const offset = (scrolled - sectionTop) * 0.15;
                        parallaxBg.style.transform = `translateX(${offset}px)`;
                    }
                }
            }
        });
    }

    // Sync video layers for blending effect
    function initVideoSync() {
        const baseVideo = document.querySelector('.video-base');
        const overlayVideo = document.querySelector('.video-overlay');

        if (baseVideo && overlayVideo) {
            // Synchronize the overlay video with the base video
            baseVideo.addEventListener('play', () => overlayVideo.play());
            baseVideo.addEventListener('pause', () => overlayVideo.pause());
            baseVideo.addEventListener('seeked', () => {
                overlayVideo.currentTime = baseVideo.currentTime;
            });

            // Keep them in sync during playback
            baseVideo.addEventListener('timeupdate', () => {
                const timeDiff = Math.abs(baseVideo.currentTime - overlayVideo.currentTime);
                if (timeDiff > 0.1) {
                    overlayVideo.currentTime = baseVideo.currentTime;
                }
            });
        }
    }

    // Mobile menu toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');

        if (mobileMenuBtn && mobileNav) {
            // Toggle menu function
            function toggleMenu(e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                mobileMenuBtn.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            }

            // Add both click and touchend for better mobile support
            mobileMenuBtn.addEventListener('click', toggleMenu);
            mobileMenuBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                toggleMenu(e);
            }, { passive: false });

            // Close menu when clicking a link
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Initialize all functions when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initScrollAnimations();
        initNewsletterForm();
        initHeaderScroll();
        initSmoothScroll();
        initParallaxScroll();
        initVideoSync();
        initMobileMenu();

        console.log('Santcom site initialized');
    }

})();

// Language Switcher Functionality
function initLanguageSwitcher() {
    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    
    if (!langEn || !langEs) return;
    
    const translations = {
        es: {
            quienesSomos: 'Quiénes Somos',
            solutions: 'Soluciones',
            vision: 'Visión',
            blog: 'Blog',
            login: 'Iniciar Sesión',
            getStarted: 'Comenzar',
            learnMore: 'Saber Más',
            pages: 'Páginas',
            home: 'Inicio',
            resources: 'Recursos',
            subscribe: 'Suscríbase a Nuestro Boletín',
            submit: 'Enviar',
            followUs: 'Síganos En:',
            subscribeCheckbox: 'Sí, suscribirme al boletín.',
            heroOverline: 'Science Analytics & Communications',
            heroTitle: 'Soluciones Inteligentes para Decisiones Estratégicas Basadas en Datos',
            heroSubtitle: 'Ayudamos a construir el futuro con datos, no solo con concreto',
            // Overlay section
            overlayTitle: 'Potencie su Negocio con Analítica Avanzada e Inteligencia Artificial',
            overlayText: 'Santcom se especializa en transformar datos en decisiones estratégicas. Desarrollamos modelos de Machine Learning personalizados que permiten anticipar riesgos, optimizar recursos y maximizar resultados en cada proyecto.',
            // Feature cards
            featureTitle1: 'Analítica Avanzada de Datos',
            featureText1: 'Transformamos datos históricos y en tiempo real en insights accionables que impulsan decisiones estratégicas.',
            featureTitle2: 'Modelos Predictivos Personalizados',
            featureText2: 'Desarrollamos modelos de Machine Learning a medida que anticipan riesgos, sobrecostos y retrasos antes de que ocurran.',
            featureTitle3: 'Automatización Inteligente de Procesos',
            featureText3: 'Automatizamos flujos de trabajo y reportes con inteligencia artificial, eliminando tareas manuales y reduciendo errores operativos.',
            featureTitle4: 'Consultoría Estratégica Basada en Datos',
            featureText4: 'Acompañamos a su equipo en la toma de decisiones con consultoría especializada respaldada por ciencia de datos y análisis cuantitativo.',
            // Transform section
            transformTitle: '¿Qué nos Hace Diferentes?',
            transformText: 'No somos una consultora genérica. Combinamos ciencia de datos avanzada con conocimiento profundo del sector para entregar soluciones que realmente transforman la operación de su empresa. Cada modelo que construimos se calibra con sus datos reales.',
            // Stats section
            statsOverline: 'Datos que Importan',
            statsTitle: 'El Desafío de la Industria',
            stat1: 'Proyectos con Sobrecostos',
            stat2: 'Proyectos con Retrasos',
            stat3: 'ROI con Analítica Predictiva',
            stat4: 'Reducción en Tiempos',
            stat5: 'Precisión en Predicciones',
            partnersTitle: 'Nuestros Clientes y Aliados',
            // Video section
            videoTitle: 'Potencie su Negocio con Santcom',
            videoText: 'Experimente el poder transformador de la analítica predictiva avanzada y el Machine Learning. Contáctenos para explorar cómo Santcom puede acelerar sus proyectos y optimizar sus operaciones.',
            // CTA section
            ctaOverline: 'Comience Hoy',
            ctaTitle: '¿Listos para Dar el Siguiente Paso?',
            ctaDesc: 'Únase al futuro de la industria. Nuestra plataforma de analítica impulsada por IA le ayuda a predecir riesgos antes de que se conviertan en problemas, ahorrando tiempo, dinero y recursos en cada proyecto.'
        },
        en: {
            quienesSomos: 'About Us',
            solutions: 'Solutions',
            vision: 'Vision',
            blog: 'Blog',
            login: 'Log In',
            getStarted: 'Get Started',
            learnMore: 'Learn More',
            pages: 'Pages',
            home: 'Home',
            resources: 'Resources',
            subscribe: 'Subscribe to Our Newsletter',
            submit: 'Submit',
            followUs: 'Follow Us On:',
            subscribeCheckbox: 'Yes, subscribe me to your newsletter.',
            heroOverline: 'Science Analytics & Communications',
            heroTitle: 'Intelligent Solutions for Strategic Data-Driven Decisions',
            heroSubtitle: 'We help build the future with data, not just concrete',
            // Overlay section
            overlayTitle: 'Empower Your Business with Advanced Analytics and AI',
            overlayText: 'Santcom specializes in transforming data into strategic decisions. We develop custom Machine Learning models that anticipate risks, optimize resources, and maximize results on every project.',
            // Feature cards
            featureTitle1: 'Advanced Data Analytics',
            featureText1: 'We transform historical and real-time data into actionable insights that drive strategic decisions.',
            featureTitle2: 'Custom Predictive Models',
            featureText2: 'We develop tailored Machine Learning models that anticipate risks, cost overruns, and delays before they occur.',
            featureTitle3: 'Intelligent Process Automation',
            featureText3: 'We automate workflows and reports with AI, eliminating manual tasks and reducing operational errors.',
            featureTitle4: 'Data-Driven Strategic Consulting',
            featureText4: 'We support your team in decision-making with specialized consulting backed by data science and quantitative analysis.',
            // Transform section
            transformTitle: 'What Makes Us Different',
            transformText: 'We are not a generic consultancy. We combine advanced data science with deep sector knowledge to deliver solutions that truly transform your company operations. Every model we build is calibrated with your real data.',
            // Stats section
            statsOverline: 'Data That Matters',
            statsTitle: 'The Industry Challenge',
            stat1: 'Projects Over Budget',
            stat2: 'Projects Behind Schedule',
            stat3: 'ROI with Predictive Analytics',
            stat4: 'Time Reduction',
            stat5: 'Prediction Accuracy',
            partnersTitle: 'Our Clients and Partners',
            // Video section
            videoTitle: 'Empower Your Business with Santcom',
            videoText: 'Experience the transformative power of advanced predictive analytics and Machine Learning. Get in touch to explore how Santcom can accelerate your projects and optimize your operations.',
            // CTA section
            ctaOverline: 'Get Started Today',
            ctaTitle: 'Ready to Take the Next Step?',
            ctaDesc: 'Join the future of the industry. Our AI-powered analytics platform helps you predict risks before they become problems, saving time, money, and resources on every project.'
        }
    };
    
    function setLanguage(lang) {
        const t = translations[lang];
        localStorage.setItem('santcom-lang', lang);

        // Update nav links (4 items: Quienes Somos, Solutions, Vision, Blog)
        const navLinks = document.querySelectorAll('.nav a');
        if (navLinks.length >= 4) {
            navLinks[0].textContent = t.quienesSomos;
            navLinks[1].textContent = t.solutions;
            navLinks[2].textContent = t.vision;
            navLinks[3].textContent = t.blog;
        }

        // Update header buttons
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            const svg = loginBtn.querySelector('svg');
            loginBtn.textContent = '';
            if (svg) loginBtn.prepend(svg);
            loginBtn.append(' ' + t.login);
        }
        const getStartedBtns = document.querySelectorAll('.btn-get-started');
        getStartedBtns.forEach(btn => btn.textContent = t.getStarted);

        // Update mobile nav links (5 items: Quienes Somos, Solutions, Vision, Blog, Get Started)
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        if (mobileNavLinks.length >= 5) {
            mobileNavLinks[0].textContent = t.quienesSomos;
            mobileNavLinks[1].textContent = t.solutions;
            mobileNavLinks[2].textContent = t.vision;
            mobileNavLinks[3].textContent = t.blog;
            mobileNavLinks[4].textContent = t.getStarted;
        }

        // Update hero section
        const heroOverline = document.querySelector('.hero-content .overline');
        const heroH1 = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroLearnMore = document.querySelector('.hero-content .btn-primary');
        if (heroOverline) heroOverline.textContent = t.heroOverline;
        if (heroH1) heroH1.textContent = t.heroTitle;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        if (heroLearnMore) heroLearnMore.textContent = t.learnMore;

        // Update overlay section (left image with text)
        const overlayTitle = document.querySelector('.overlay-title');
        const overlayText = document.querySelector('.overlay-text');
        if (overlayTitle) overlayTitle.textContent = t.overlayTitle;
        if (overlayText) overlayText.textContent = t.overlayText;

        // Update feature cards
        const featureTitle1 = document.querySelector('.feature-title-1');
        const featureText1 = document.querySelector('.feature-text-1');
        const featureTitle2 = document.querySelector('.feature-title-2');
        const featureText2 = document.querySelector('.feature-text-2');
        const featureTitle3 = document.querySelector('.feature-title-3');
        const featureText3 = document.querySelector('.feature-text-3');
        const featureTitle4 = document.querySelector('.feature-title-4');
        const featureText4 = document.querySelector('.feature-text-4');

        if (featureTitle1) featureTitle1.textContent = t.featureTitle1;
        if (featureText1) featureText1.textContent = t.featureText1;
        if (featureTitle2) featureTitle2.textContent = t.featureTitle2;
        if (featureText2) featureText2.textContent = t.featureText2;
        if (featureTitle3) featureTitle3.textContent = t.featureTitle3;
        if (featureText3) featureText3.textContent = t.featureText3;
        if (featureTitle4) featureTitle4.textContent = t.featureTitle4;
        if (featureText4) featureText4.textContent = t.featureText4;

        // Update transform section
        const transformTitle = document.querySelector('.transform-title');
        const transformText = document.querySelector('.transform-text');
        const transformBtn = document.querySelector('.transform-btn');
        if (transformTitle) transformTitle.textContent = t.transformTitle;
        if (transformText) transformText.textContent = t.transformText;
        if (transformBtn) transformBtn.textContent = t.learnMore;

        // Update stats section
        const statsOverline = document.querySelector('.stats-content .overline');
        const statsH2 = document.querySelector('.stats-content h2');
        if (statsOverline) statsOverline.textContent = t.statsOverline;
        if (statsH2) statsH2.textContent = t.statsTitle;
        const statLabels = document.querySelectorAll('.stat-label');
        const statTexts = [t.stat1, t.stat2, t.stat3, t.stat4, t.stat5];
        statLabels.forEach((label, index) => {
            if (index < 5) label.textContent = statTexts[index];
        });

        // Update partnership section
        const partnerH2 = document.querySelector('.partnership-section h2');
        if (partnerH2) partnerH2.textContent = t.partnersTitle;

        // Update video section
        const videoTitle = document.querySelector('.video-title');
        const videoText = document.querySelector('.video-text');
        const videoBtn = document.querySelector('.video-btn');
        if (videoTitle) videoTitle.textContent = t.videoTitle;
        if (videoText) videoText.textContent = t.videoText;
        if (videoBtn) videoBtn.textContent = t.getStarted;

        // Update CTA section
        const ctaOverline = document.querySelector('.cta-section .overline');
        const ctaH2 = document.querySelector('.cta-section h2');
        const ctaP = document.querySelector('.cta-section p:not(.overline)');
        const ctaBtn = document.querySelector('.cta-section .btn-primary');
        if (ctaOverline) ctaOverline.textContent = t.ctaOverline;
        if (ctaH2) ctaH2.textContent = t.ctaTitle;
        if (ctaP) ctaP.textContent = t.ctaDesc;
        if (ctaBtn) ctaBtn.textContent = t.getStarted;

        // Update footer
        const footerCols = document.querySelectorAll('.footer-col h4');
        if (footerCols.length >= 3) {
            footerCols[0].textContent = t.pages;
            footerCols[1].textContent = t.resources;
            footerCols[2].textContent = t.subscribe;
        }

        const footerH5 = document.querySelector('.social-links h5');
        if (footerH5) footerH5.textContent = t.followUs;

        const submitBtn = document.querySelector('.newsletter-form .btn-submit');
        if (submitBtn) submitBtn.textContent = t.submit;

        // Update newsletter checkbox text
        const checkboxSpan = document.querySelector('.newsletter-form label span');
        if (checkboxSpan && t.subscribeCheckbox) checkboxSpan.textContent = t.subscribeCheckbox;

        // Update footer page links
        const footerLinks = document.querySelectorAll('.footer-col a');
        footerLinks.forEach(link => {
            if (link.textContent.match(/Home|Inicio/)) link.textContent = t.home;
            if (link.textContent.match(/About Us|Quiénes Somos|Quienes Somos/)) link.textContent = t.quienesSomos;
            if (link.textContent.match(/Solutions|Soluciones/)) link.textContent = t.solutions;
            if (link.textContent.match(/Get Started|Comenzar/)) link.textContent = t.getStarted;
        });

        // Update button states
        langEn.classList.toggle('active', lang === 'en');
        langEs.classList.toggle('active', lang === 'es');
    }
    
    // Event listeners
    langEn.addEventListener('click', () => setLanguage('en'));
    langEs.addEventListener('click', () => setLanguage('es'));
    
    // Check for saved language preference (ES is default)
    const savedLang = localStorage.getItem('santcom-lang') || 'es';
    setLanguage(savedLang);
}

// Initialize language switcher on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}
