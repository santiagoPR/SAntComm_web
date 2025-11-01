#!/usr/bin/env python3
"""
REAL Wix Vista.io Redesign - FROM SCRATCH
Based on actual screenshot analysis
"""

html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAntComm - AI-Powered Construction Analytics</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="styles/vista-real.css">

    <!-- AOS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>

    <!-- Navigation -->
    <nav class="nav-vista">
        <div class="nav-container">
            <div class="logo-vista">
                <img src="logo/full-logo-header-metallic.png" alt="SAntComm">
            </div>
            <div class="nav-menu">
                <a href="#platform">Platform</a>
                <a href="#solutions">Solutions</a>
                <a href="#about">About</a>
                <a href="#contact" class="nav-cta">Get Started</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section - Big Background Image -->
    <section class="hero-vista">
        <div class="hero-bg-image">
            <video autoplay muted loop playsinline>
                <source src="https://cdn.pixabay.com/video/2024/01/08/196407-903824374_large.mp4" type="video/mp4">
            </video>
            <div class="hero-overlay-dark"></div>
        </div>
        <div class="hero-content-left">
            <h1 data-aos="fade-right">The New Standard<br>in Construction Analytics</h1>
            <p data-aos="fade-right" data-aos-delay="100">Use ML to Prevent Budget Overruns and Deliver Projects On Time</p>
            <a href="#contact" class="btn-red" data-aos="fade-right" data-aos-delay="200">Learn More</a>
        </div>
    </section>

    <!-- Two-Column Section: Left Image/Text + Right Feature Cards -->
    <section class="two-column-vista">
        <div class="container-vista">
            <div class="two-col-grid">
                <!-- Left Column: Big Image + Text -->
                <div class="left-content-vista" data-aos="fade-right">
                    <div class="big-visual-vista">
                        <img src="art/Gemini_Generated_Image_dpv0q6dpv0q6dpv0.png" alt="ML Analytics">
                    </div>
                    <div class="left-text-block">
                        <h2>Let Your Data Take<br>Your Business to<br>Higher Grounds</h2>
                        <p>Our custom machine learning models analyze millions of data points from your construction projects, identifying patterns invisible to traditional analysis methods. Get 3-4 weeks advance warning of budget overruns and schedule delays.</p>
                    </div>
                </div>

                <!-- Right Column: 4 Feature Cards Stacked -->
                <div class="right-cards-vista">
                    <div class="feature-card-stack" data-aos="fade-left" data-aos-delay="0">
                        <div class="card-icon-red">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                                <circle cx="30" cy="10" r="2" fill="currentColor"/>
                                <circle cx="10" cy="30" r="2" fill="currentColor"/>
                                <circle cx="30" cy="30" r="2" fill="currentColor"/>
                                <path d="M20 20L10 10M20 20L30 10M20 20L10 30M20 20L30 30" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                        </div>
                        <h3>Real-Time ML Predictions</h3>
                        <p>Our neural networks continuously analyze your project data to predict risks before they become problems.</p>
                    </div>

                    <div class="feature-card-stack" data-aos="fade-left" data-aos-delay="100">
                        <div class="card-icon-red">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="10" y="28" width="6" height="8" fill="currentColor" rx="1"/>
                                <rect x="17" y="20" width="6" height="16" fill="currentColor" rx="1"/>
                                <rect x="24" y="12" width="6" height="24" fill="currentColor" rx="1"/>
                            </svg>
                        </div>
                        <h3>Data Science Acceleration</h3>
                        <p>Transform complex construction data into actionable insights with automated reporting and analysis.</p>
                    </div>

                    <div class="feature-card-stack" data-aos="fade-left" data-aos-delay="200">
                        <div class="card-icon-red">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20 8V20L28 28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="20" cy="20" r="12" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <h3>Versatility in Application</h3>
                        <p>Our ML models work across all project types and sizes, from single builds to global portfolios.</p>
                    </div>

                    <div class="feature-card-stack" data-aos="fade-left" data-aos-delay="300">
                        <div class="card-icon-red">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <rect x="14" y="18" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                                <path d="M18 18V14C18 12 19 10 20 10C21 10 22 12 22 14V18" stroke="currentColor" stroke-width="2"/>
                                <circle cx="20" cy="24" r="1.5" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3>Full Enterprise Service</h3>
                        <p>99.9% uptime SLA, SOC 2 Type II compliance, and dedicated support for mission-critical operations.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Big Graphic Section with Text -->
    <section class="big-graphic-vista">
        <div class="container-vista">
            <div class="graphic-split">
                <div class="graphic-left" data-aos="zoom-in">
                    <img src="art/Gemini_Generated_Image_6voskj6voskj6vos.png" alt="ML Network">
                </div>
                <div class="graphic-right" data-aos="fade-left">
                    <h2>Unprecedented Velocity.<br>Impeccable Reliability.</h2>
                    <p>Our enterprise-grade ML infrastructure processes construction data at scale with sub-second response times. Built for the demands of global construction leaders managing billions in project value.</p>
                    <p>We combine cutting-edge deep learning with decades of construction industry expertise to deliver predictions you can trust. Every model is custom-trained on your historical data for maximum accuracy.</p>
                    <a href="#contact" class="btn-red">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-vista">
        <div class="container-vista">
            <h2 class="stats-title" data-aos="fade-up">We Take Pride in Our Numbers</h2>
            <div class="stats-row-vista">
                <div class="stat-vista" data-aos="fade-up" data-aos-delay="0">
                    <div class="stat-number-vista">95%+</div>
                    <div class="stat-underline-red"></div>
                    <div class="stat-label-vista">Prediction Accuracy</div>
                </div>
                <div class="stat-vista" data-aos="fade-up" data-aos-delay="100">
                    <div class="stat-number-vista">$50M+</div>
                    <div class="stat-underline-red"></div>
                    <div class="stat-label-vista">Losses Prevented</div>
                </div>
                <div class="stat-vista" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-number-vista">3-4</div>
                    <div class="stat-underline-red"></div>
                    <div class="stat-label-vista">Weeks Early Warning</div>
                </div>
                <div class="stat-vista" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-number-vista">99.9%</div>
                    <div class="stat-underline-red"></div>
                    <div class="stat-label-vista">Uptime SLA</div>
                </div>
                <div class="stat-vista" data-aos="fade-up" data-aos-delay="400">
                    <div class="stat-number-vista">24/7</div>
                    <div class="stat-underline-red"></div>
                    <div class="stat-label-vista">Monitoring</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Visualization Section (Waveform-like) -->
    <section class="viz-section-vista">
        <div class="viz-image">
            <img src="art/Gemini_Generated_Image_45y6h745y6h745y6.png" alt="Data Visualization">
        </div>
    </section>

    <!-- Partners Section -->
    <section class="partners-vista">
        <div class="container-vista">
            <h3 class="partners-title">Our Partners</h3>
            <div class="partners-logos">
                <div class="partner-logo">BECHTEL</div>
                <div class="partner-logo">TURNER</div>
                <div class="partner-logo">KIEWIT</div>
                <div class="partner-logo">SKANSKA</div>
                <div class="partner-logo">FLUOR</div>
            </div>
        </div>
    </section>

    <!-- CTA Section with Graphic -->
    <section class="cta-vista">
        <div class="cta-bg-graphic">
            <img src="art/Gemini_Generated_Image_anow9vanow9vanow.png" alt="Network">
        </div>
        <div class="container-vista">
            <div class="cta-content-vista" data-aos="zoom-in">
                <h2>Are You Ready to Accelerate<br>Your Business?</h2>
                <p>Transform your construction projects with AI-powered insights.<br>Schedule a consultation to see our ML platform in action.</p>
                <a href="#contact" class="btn-red">Get Started</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-vista">
        <div class="container-vista">
            <div class="footer-grid-vista">
                <div class="footer-brand">
                    <img src="logo/full-logo-header-metallic.png" alt="SAntComm" class="footer-logo">
                    <p>123-456-7890</p>
                    <p>info@santcom.com</p>
                    <p>500 Market Street<br>San Francisco, CA 94105</p>
                </div>

                <div class="footer-links">
                    <h4>Solutions</h4>
                    <a href="#platform">Platform</a>
                    <a href="#solutions">ML Models</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                <div class="footer-newsletter">
                    <h4>Subscribe to Our Newsletter</h4>
                    <form class="newsletter-vista">
                        <input type="email" placeholder="Email*" required>
                        <label>
                            <input type="checkbox" required>
                            <span>Yes, subscribe me to your newsletter.</span>
                        </label>
                        <button type="submit" class="btn-red-small">Join</button>
                    </form>
                </div>

                <div class="footer-social">
                    <h4>Follow Us On:</h4>
                    <div class="social-icons">
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Facebook">f</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 by SAntComm</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true
        });

        // Newsletter form
        document.querySelector('.newsletter-vista').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    </script>
</body>
</html>'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("="*70)
print("REAL WIX VISTA.IO REDESIGN - FROM SCRATCH")
print("="*70)
print("\nBased on actual screenshot analysis:")
print("- Hero with BIG background image (left-aligned text)")
print("- Two-column layout: Left image/text + Right 4 stacked cards")
print("- Big graphic section with split layout")
print("- Stats with red underlines")
print("- Visualization section")
print("- Partners logos")
print("- CTA with background graphic")
print("- Footer with newsletter")
print("\nNext: Create CSS (vista-real.css)")
print("="*70)
