/**
 * SANTCOM WIX REPLICA - MAIN JAVASCRIPT
 * Handles scroll animations and interactions
 */

(function() {
    'use strict';

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
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
        const parallaxBg = document.querySelector('.stats-parallax-bg');

        if (parallaxBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const statsSection = document.querySelector('.stats-section');

                if (statsSection) {
                    const sectionTop = statsSection.offsetTop;
                    const sectionHeight = statsSection.offsetHeight;
                    const windowHeight = window.innerHeight;

                    // Only apply parallax when section is in view
                    if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                        const offset = (scrolled - sectionTop) * 0.15;
                        parallaxBg.style.transform = `translateX(${offset}px)`;
                    }
                }
            });
        }
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
        en: {
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
            heroTitle: 'Custom Built Machine Learning Models for Predictive Analytics',
            heroSubtitle: 'Use Data to Get a 360-Degree View of Your Business',
            // Overlay section
            overlayTitle: 'Empower Your Business with Advanced Predictive Analytics',
            overlayText: 'Santcom is dedicated to revolutionizing the construction industry through advanced predictive analytics. We specialize in developing custom Machine Learning models that offer early warnings for budget overruns and schedule delays.',
            // Feature cards
            featureTitle1: 'Innovative Solutions for Data-driven Construction',
            featureText1: 'With Santcom, experience the modernization of analytics tailored to the construction sector.',
            featureTitle2: 'Tailored Machine Learning Applications',
            featureText2: 'At Santcom, our versatility lies in creating tailored Machine Learning applications that cater to the unique needs of construction businesses.',
            featureTitle3: 'Data Science Expertise for Construction Projects',
            featureText3: 'Santcom offers unparalleled data science expertise for construction projects, empowering companies with the tools and insights necessary to streamline operations.',
            featureTitle4: 'Comprehensive Customer Experience Support',
            featureText4: 'We offer comprehensive support to enhance the customer experience in the construction industry, leveraging data and analytics to drive customer satisfaction.',
            // Transform section
            transformTitle: 'Transform Your Construction Business with Santcom',
            transformText: 'Santcom brings unprecedented velocity and impeccable reliability to your construction business. Our tailored services, driven by advanced Machine Learning models, ensure that you stay ahead in the competitive construction landscape.',
            // Stats section
            statsTitle: 'The Construction Industry Challenge',
            stat1: 'Projects Over Budget',
            stat2: 'Projects Behind Schedule',
            stat3: 'ROI with Predictive Analytics',
            stat4: 'Annual Industry Losses',
            stat5: 'Cost Reduction Potential',
            partnersTitle: 'Our Collaborative Partnerships',
            // Video section
            videoTitle: 'Empower Your Construction Business with Santcom',
            videoText: 'Experience the transformative power of advanced predictive analytics and Machine Learning for your construction business. Get in touch with us to explore how Santcom can accelerate your projects and optimize your operations.',
            // CTA section
            ctaTitle: 'Ready to Build Smarter?',
            ctaDesc: 'Join the future of construction. Our AI-powered analytics platform helps you predict risks before they become problems, saving time, money, and resources on every project.'
        },
        es: {
            solutions: 'Soluciones',
            vision: 'Vision',
            blog: 'Blog',
            login: 'Iniciar Sesion',
            getStarted: 'Comenzar',
            learnMore: 'Saber Mas',
            pages: 'Paginas',
            home: 'Inicio',
            resources: 'Recursos',
            subscribe: 'Suscribase a Nuestro Boletin',
            submit: 'Enviar',
            followUs: 'Siganos En:',
            heroTitle: 'Modelos de Machine Learning Personalizados para Analisis Predictivo',
            heroSubtitle: 'Use Datos para Obtener una Vision 360 de su Negocio',
            // Overlay section
            overlayTitle: 'Potencie su Negocio con Analisis Predictivo Avanzado',
            overlayText: 'Santcom se dedica a revolucionar la industria de la construccion a traves del analisis predictivo avanzado. Nos especializamos en desarrollar modelos de Machine Learning personalizados que ofrecen alertas tempranas para sobrecostos y retrasos en cronogramas.',
            // Feature cards
            featureTitle1: 'Soluciones Innovadoras para Construccion Basada en Datos',
            featureText1: 'Con Santcom, experimente la modernizacion de la analitica adaptada al sector de la construccion.',
            featureTitle2: 'Aplicaciones de Machine Learning a Medida',
            featureText2: 'En Santcom, nuestra versatilidad radica en crear aplicaciones de Machine Learning adaptadas a las necesidades unicas de las empresas de construccion.',
            featureTitle3: 'Experiencia en Ciencia de Datos para Proyectos de Construccion',
            featureText3: 'Santcom ofrece experiencia inigualable en ciencia de datos para proyectos de construccion, empoderando a las empresas con las herramientas y conocimientos necesarios para optimizar operaciones.',
            featureTitle4: 'Soporte Integral de Experiencia al Cliente',
            featureText4: 'Ofrecemos soporte integral para mejorar la experiencia del cliente en la industria de la construccion, aprovechando datos y analitica para impulsar la satisfaccion del cliente.',
            // Transform section
            transformTitle: 'Transforme su Negocio de Construccion con Santcom',
            transformText: 'Santcom aporta velocidad sin precedentes y confiabilidad impecable a su negocio de construccion. Nuestros servicios personalizados, impulsados por modelos avanzados de Machine Learning, aseguran que se mantenga a la vanguardia en el competitivo panorama de la construccion.',
            // Stats section
            statsTitle: 'El Desafio de la Industria de la Construccion',
            stat1: 'Proyectos Sobre Presupuesto',
            stat2: 'Proyectos con Retraso',
            stat3: 'ROI con Analisis Predictivo',
            stat4: 'Perdidas Anuales de la Industria',
            stat5: 'Potencial de Reduccion de Costos',
            partnersTitle: 'Nuestras Alianzas Colaborativas',
            // Video section
            videoTitle: 'Potencie su Negocio de Construccion con Santcom',
            videoText: 'Experimente el poder transformador del analisis predictivo avanzado y Machine Learning para su negocio de construccion. Contactenos para explorar como Santcom puede acelerar sus proyectos y optimizar sus operaciones.',
            // CTA section
            ctaTitle: 'Listo para Construir de Forma Mas Inteligente?',
            ctaDesc: 'Unase al futuro de la construccion. Nuestra plataforma de analisis impulsada por IA le ayuda a predecir riesgos antes de que se conviertan en problemas, ahorrando tiempo, dinero y recursos en cada proyecto.'
        }
    };
    
    function setLanguage(lang) {
        const t = translations[lang];
        localStorage.setItem('santcom-lang', lang);

        // Update nav links (now 3 items: Solutions, Vision, Blog)
        const navLinks = document.querySelectorAll('.nav a');
        if (navLinks.length >= 3) {
            navLinks[0].textContent = t.solutions;
            navLinks[1].textContent = t.vision;
            navLinks[2].textContent = t.blog;
        }

        // Update header buttons
        const getStartedBtn = document.querySelector('.btn-get-started');
        if (getStartedBtn) getStartedBtn.textContent = t.getStarted;

        // Update hero section
        const heroH1 = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroLearnMore = document.querySelector('.hero-content .btn-primary');
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
        const statsH2 = document.querySelector('.stats-content h2');
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
        const ctaH2 = document.querySelector('.cta-section h2');
        const ctaP = document.querySelector('.cta-section p');
        const ctaBtn = document.querySelector('.cta-section .btn-primary');
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

        // Update button states
        langEn.classList.toggle('active', lang === 'en');
        langEs.classList.toggle('active', lang === 'es');
    }
    
    // Event listeners
    langEn.addEventListener('click', () => setLanguage('en'));
    langEs.addEventListener('click', () => setLanguage('es'));
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('santcom-lang');
    if (savedLang) {
        setLanguage(savedLang);
    }
}

// Initialize language switcher on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}
