#!/usr/bin/env python3
"""
Complete Website Redesign - Wix Vista.io Style
Dark theme, modern analytics company aesthetic
"""

# This will be a complete rewrite of the main content sections
# Keeping navigation and footer structure but redesigning everything else

html_template = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAntComm - AI-Powered Construction Analytics</title>
    <meta name="description" content="Custom machine learning models that prevent budget overruns and schedule delays. Built specifically for your construction projects.">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="styles/wix-style.css">

    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>
    <!-- Particles Background -->
    <div id="particles-js"></div>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <div class="nav-content">
                <a href="#home" class="logo">
                    <img src="logo/full-logo-header-metallic.png" alt="SAntComm Logo" class="logo-desktop">
                    <img src="logo/s-logo-mobile-metallic.png" alt="SAntComm" class="logo-mobile">
                </a>
                <div class="nav-links">
                    <a href="#platform">Platform</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#about">About</a>
                    <a href="#contact" class="btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-wix">
        <div class="hero-background">
            <video autoplay muted loop playsinline class="hero-video">
                <source src="https://cdn.pixabay.com/video/2024/01/08/196407-903824374_large.mp4" type="video/mp4">
            </video>
            <div class="hero-overlay"></div>
        </div>

        <div class="container">
            <div class="hero-content-wix" data-aos="fade-up">
                <h1 class="hero-title-wix">The New Standard in<br>Construction Analytics</h1>
                <h2 class="hero-subtitle-wix">Use ML to Prevent Budget Overruns and Schedule Delays Before They Impact Your Projects</h2>
                <a href="#contact" class="btn-hero">Learn More</a>
            </div>

            <!-- Hero Stats -->
            <div class="hero-stats" data-aos="fade-up" data-aos-delay="200">
                <div class="stat-item">
                    <div class="stat-number">95%+</div>
                    <div class="stat-label">Prediction Accuracy</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">$50M+</div>
                    <div class="stat-label">Losses Prevented</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">3-4 wks</div>
                    <div class="stat-label">Advance Warning</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Grid (4 Columns - Wix Style) -->
    <section class="features-grid-wix">
        <div class="container">
            <div class="features-row">
                <div class="feature-card-wix" data-aos="fade-up">
                    <div class="feature-icon-wix">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="4" fill="currentColor"/>
                            <circle cx="12" cy="12" r="3" fill="currentColor"/>
                            <circle cx="36" cy="12" r="3" fill="currentColor"/>
                            <circle cx="12" cy="36" r="3" fill="currentColor"/>
                            <circle cx="36" cy="36" r="3" fill="currentColor"/>
                            <path d="M24 24L12 12M24 24L36 12M24 24L12 36M24 24L36 36" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3>Real-Time ML Predictions</h3>
                    <p>Our neural networks analyze millions of construction data points to predict budget overruns and delays 3-4 weeks in advance.</p>
                </div>

                <div class="feature-card-wix" data-aos="fade-up" data-aos-delay="100">
                    <div class="feature-icon-wix">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <rect x="10" y="32" width="8" height="12" fill="currentColor" rx="2"/>
                            <rect x="20" y="24" width="8" height="20" fill="currentColor" rx="2"/>
                            <rect x="30" y="16" width="8" height="28" fill="currentColor" rx="2"/>
                        </svg>
                    </div>
                    <h3>Automated Risk Scoring</h3>
                    <p>Every project phase gets continuous ML-driven risk assessment with actionable insights for your team.</p>
                </div>

                <div class="feature-card-wix" data-aos="fade-up" data-aos-delay="200">
                    <div class="feature-icon-wix">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M24 10V24L34 34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                            <circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="3"/>
                        </svg>
                    </div>
                    <h3>Custom Data Integration</h3>
                    <p>Connect all your construction data sources - ERP, scheduling software, IoT sensors - into one unified ML platform.</p>
                </div>

                <div class="feature-card-wix" data-aos="fade-up" data-aos-delay="300">
                    <div class="feature-icon-wix">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <rect x="16" y="20" width="16" height="16" rx="2" stroke="currentColor" stroke-width="3"/>
                            <path d="M20 20V16C20 13 21.5 10 24 10C26.5 10 28 13 28 16V20" stroke="currentColor" stroke-width="3"/>
                            <circle cx="24" cy="28" r="2" fill="currentColor"/>
                        </svg>
                    </div>
                    <h3>Enterprise Security</h3>
                    <p>SOC 2 Type II compliant with 99.9% uptime SLA. Your sensitive project data never leaves your environment.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Two-Column Content Section -->
    <section class="content-section-wix">
        <div class="container">
            <div class="content-grid-wix">
                <div class="content-image-wix" data-aos="fade-right">
                    <img src="art/Gemini_Generated_Image_45y6h745y6h745y6.png" alt="ML Analytics Dashboard">
                </div>
                <div class="content-text-wix" data-aos="fade-left">
                    <h2>Predictive Analytics Dashboard</h2>
                    <p>Monitor every aspect of your construction projects in real-time with ML-powered predictions. Our dashboard processes millions of data points to surface the insights that matter most.</p>
                    <ul class="benefits-list-wix">
                        <li>3-4 week advance warning of budget overruns</li>
                        <li>Automated anomaly detection across all project phases</li>
                        <li>Natural language queries - ask questions in plain English</li>
                        <li>Custom alerts when predictions indicate potential issues</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section (Wix Style) -->
    <section class="stats-section-wix">
        <div class="container">
            <h2 class="stats-title-wix" data-aos="fade-up">We Take Pride in Our Numbers</h2>
            <div class="stats-row-wix">
                <div class="stat-block-wix" data-aos="fade-up" data-aos-delay="0">
                    <div class="stat-number-large">95%+</div>
                    <div class="stat-label-wix">Prediction Accuracy</div>
                </div>
                <div class="stat-block-wix" data-aos="fade-up" data-aos-delay="100">
                    <div class="stat-number-large">$50M+</div>
                    <div class="stat-label-wix">Losses Prevented</div>
                </div>
                <div class="stat-block-wix" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-number-large">3-4</div>
                    <div class="stat-label-wix">Weeks Early Warning</div>
                </div>
                <div class="stat-block-wix" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-number-large">99.9%</div>
                    <div class="stat-label-wix">Uptime SLA</div>
                </div>
                <div class="stat-block-wix" data-aos="fade-up" data-aos-delay="400">
                    <div class="stat-number-large">24/7</div>
                    <div class="stat-label-wix">Monitoring</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Two-Column Content Section (Reverse) -->
    <section class="content-section-wix reverse">
        <div class="container">
            <div class="content-grid-wix">
                <div class="content-text-wix" data-aos="fade-right">
                    <h2>Unified Data Network Intelligence</h2>
                    <p>Connect every data source across your construction ecosystem. Our ML models analyze relationships between scheduling, budgets, resources, and external factors to give you a complete picture.</p>
                    <ul class="benefits-list-wix">
                        <li>Multi-source data ingestion from all your systems</li>
                        <li>Pattern recognition across historical project data</li>
                        <li>Real-time synchronization and updates</li>
                        <li>Continuous model improvement as more data is collected</li>
                    </ul>
                </div>
                <div class="content-image-wix" data-aos="fade-left">
                    <img src="art/Gemini_Generated_Image_6voskj6voskj6vos.png" alt="Data Network Integration">
                </div>
            </div>
        </div>
    </section>

    <!-- Partners/Clients Section -->
    <section class="partners-section-wix">
        <div class="container">
            <h2 class="partners-title-wix" data-aos="fade-up">Trusted by Construction Leaders</h2>
            <div class="partners-grid-wix" data-aos="fade-up" data-aos-delay="200">
                <div class="partner-logo-placeholder">Global Construction Co.</div>
                <div class="partner-logo-placeholder">BuildTech Solutions</div>
                <div class="partner-logo-placeholder">Infrastructure Partners</div>
                <div class="partner-logo-placeholder">Premier Developers</div>
            </div>
        </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner-wix">
        <div class="container">
            <div class="cta-content-wix" data-aos="zoom-in">
                <h2>Ready to Transform Your Construction Projects?</h2>
                <p>Schedule a consultation to see how our ML platform can prevent budget overruns and delays.</p>
                <a href="#contact" class="btn-cta-banner">Get Started Today</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer-wix">
        <div class="container">
            <div class="footer-grid-wix">
                <!-- Brand Column -->
                <div class="footer-col">
                    <img src="logo/full-logo-header-metallic.png" alt="SAntComm" class="footer-logo">
                    <p class="footer-tagline">AI-Powered Construction Analytics</p>
                </div>

                <!-- Contact Column -->
                <div class="footer-col">
                    <h4>Contact</h4>
                    <p>Email: info@santcom.com</p>
                    <p>Phone: (555) 123-4567</p>
                    <p>San Francisco, CA</p>
                </div>

                <!-- Links Column -->
                <div class="footer-col">
                    <h4>Solutions</h4>
                    <a href="#platform">Platform</a>
                    <a href="#solutions">ML Models</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>

                <!-- Newsletter Column -->
                <div class="footer-col newsletter">
                    <h4>Subscribe to Our Newsletter</h4>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit" class="btn-newsletter">Subscribe</button>
                    </form>
                    <p class="footer-small">Stay updated on construction ML insights</p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 by SAntComm. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="scripts/wix-style-main.js"></script>
</body>
</html>'''

# Write the new HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print("=" * 70)
print("COMPLETE WIX-STYLE REDESIGN")
print("=" * 70)
print("\nNew Design System:")
print("- Dark theme (#141416 background, #1B1C1E cards)")
print("- Poppins typography (80px hero, clear hierarchy)")
print("- Teal accent color (#00857c)")
print("- 4-column feature grid (Wix pattern)")
print("- Stats showcase section")
print("- Two-column content sections")
print("- Partners section")
print("- CTA banner")
print("- Professional footer with newsletter")
print("\nNext: Create matching CSS file (wix-style.css)")
print("=" * 70)
