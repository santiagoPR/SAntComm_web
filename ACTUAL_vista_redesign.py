#!/usr/bin/env python3
"""
ACTUAL Vista.io Redesign - Based on EXTRACTED HTML/CSS
Not guessing anymore - using the REAL code structure
"""

html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAntComm - AI-Powered Construction Analytics</title>

    <!-- Fonts - EXACT match to Vista.io -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="styles/vista-exact.css">

    <!-- AOS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>

    <!-- INTEGRATED Header + Hero Section (NO SEPARATION) -->
    <section class="hero-integrated">
        <!-- Background Image (fills entire section) -->
        <div class="hero-bg">
            <video autoplay muted loop playsinline class="hero-video">
                <source src="https://cdn.pixabay.com/video/2024/01/08/196407-903824374_large.mp4" type="video/mp4">
            </video>
        </div>

        <!-- Header (transparent, overlaid on hero) -->
        <header class="header-transparent">
            <div class="container-wide">
                <div class="header-content">
                    <div class="logo-section">
                        <img src="logo/full-logo-header-metallic.png" alt="SAntComm" class="logo-header">
                    </div>
                    <nav class="nav-menu">
                        <a href="#platform">Platform</a>
                        <a href="#solutions">Solutions</a>
                        <a href="#about">About</a>
                        <a href="#contact">Blog</a>
                    </nav>
                    <div class="header-actions">
                        <!-- Login Icon (Vista.io style) -->
                        <button class="login-btn">
                            <svg class="login-icon" viewBox="0 0 50 50" width="24" height="24">
                                <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"/>
                            </svg>
                            <span>Log In</span>
                        </button>
                        <a href="#contact" class="btn-get-started">Get Started</a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Content (left-aligned) -->
        <div class="container-wide">
            <div class="hero-content">
                <h1 class="hero-title">The New Standard<br>in Construction Analytics</h1>
                <p class="hero-subtitle">Use ML to Prevent Budget Overruns and Deliver Projects On Time</p>
                <a href="#contact" class="btn-hero">Learn More</a>
            </div>
        </div>
    </section>

    <!-- Two-Column Section: Image + Text | Feature Cards -->
    <section class="section-two-column">
        <div class="container-wide">
            <div class="two-column-grid">
                <!-- LEFT: Image + Text Block -->
                <div class="column-left">
                    <div class="image-container">
                        <img src="art/Gemini_Generated_Image_dpv0q6dpv0q6dpv0.png" alt="ML Analytics">
                    </div>
                    <h2 class="left-title">Let Your Data Take<br>Your Business to<br>Higher Grounds</h2>
                    <p class="left-text">Our custom machine learning models analyze millions of data points from your construction projects, identifying patterns invisible to traditional analysis methods. Get 3-4 weeks advance warning of budget overruns.</p>
                </div>

                <!-- RIGHT: Stacked Feature Cards -->
                <div class="column-right">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M149.73 83.547c-2.538-25.284-24.211-44.961-49.73-44.961S52.808 58.263 50.269 83.547c-17.67 3.837-30.401 19.54-30.401 37.674 0 21.261 17.297 38.559 38.559 38.559h83.146c21.261 0 38.559-17.297 38.559-38.559 0-18.135-12.732-33.838-30.402-37.674zm-8.157 64.423H58.427a26.755 26.755 0 0 1-16.198-5.482l21.237-21.114 13.181 13.19 36.505-35.875 8.081 8.047 6.076-30.357-30.353 6.177 8.281 8.243-28.512 28.025-13.236-13.239-28.56 28.399a26.646 26.646 0 0 1-3.252-12.763c0-13.887 10.85-25.598 24.701-26.661l5.452-.419v-5.488l-.003-.16C61.868 67.486 78.992 50.395 100 50.395c21.047 0 38.171 17.078 38.172 38.069l-.004 5.677 5.453.419c13.851 1.063 24.701 12.774 24.701 26.661 0 14.749-11.999 26.749-26.749 26.749z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Real-Time ML Predictions</h3>
                        <p class="feature-text">Our neural networks continuously analyze your project data to predict risks before they become problems.</p>
                        <div class="feature-divider"></div>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M177.118 96.151L142.48 80.165a4.235 4.235 0 0 0-3.555 0l-34.637 15.986a4.252 4.252 0 0 0-2.464 3.849c0 1.648.967 3.159 2.463 3.85l34.638 15.986c.553.255 1.167.39 1.777.39.619 0 1.217-.131 1.778-.39l34.638-15.986c1.496-.691 2.462-2.202 2.462-3.85s-.967-3.159-2.462-3.849zM165.223 100l-24.521 11.316L116.181 100l24.52-11.316L165.223 100z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Data Science Acceleration</h3>
                        <p class="feature-text">Transform complex construction data into actionable insights with automated reporting and analysis.</p>
                        <div class="feature-divider"></div>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M63.585 72.333l34.638 15.985a4.257 4.257 0 0 0 1.777.391 4.21 4.21 0 0 0 1.777-.39l34.639-15.986a4.253 4.253 0 0 0 2.462-3.85 4.252 4.252 0 0 0-2.462-3.849l-34.639-15.986a4.236 4.236 0 0 0-3.554 0L63.585 64.634a4.253 4.253 0 0 0-2.463 3.849c0 1.648.966 3.159 2.463 3.85zm11.895-3.85L100 57.167l24.52 11.316L100 79.8 75.48 68.483z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Versatility in Application</h3>
                        <p class="feature-text">Our ML models work across all project types and sizes, from single builds to global portfolios.</p>
                        <div class="feature-divider"></div>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M117.275 125.299c8.267-5.705 13.161-14.963 13.161-25.039 0-16.782-13.653-30.435-30.435-30.435S69.566 83.478 69.566 100.26c0 10.076 4.892 19.333 13.159 25.039-17.083 6.994-28.462 23.834-28.462 42.343v5.605h91.474v-5.605c0-18.509-11.38-35.349-28.462-42.343z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Full Enterprise Service</h3>
                        <p class="feature-text">99.9% uptime SLA, SOC 2 Type II compliance, and dedicated support for mission-critical operations.</p>
                        <div class="feature-divider"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Big Graphic Section: Image + Text -->
    <section class="section-graphic">
        <div class="container-wide">
            <div class="graphic-grid">
                <div class="graphic-image">
                    <img src="art/Gemini_Generated_Image_6voskj6voskj6vos.png" alt="ML Network">
                    <h2 class="graphic-title-overlay">Unprecedented Velocity.<br>Impeccable Reliability.</h2>
                </div>
                <div class="graphic-text">
                    <p>Our enterprise-grade ML infrastructure processes construction data at scale with sub-second response times. Built for the demands of global construction leaders managing billions in project value.</p>
                    <p>We combine cutting-edge deep learning with decades of construction industry expertise to deliver predictions you can trust. Every model is custom-trained on your historical data for maximum accuracy.</p>
                    <a href="#contact" class="btn-learn-more">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="section-stats">
        <div class="container-wide">
            <div class="stats-image-bg">
                <img src="art/Gemini_Generated_Image_45y6h745y6h745y6.png" alt="Data Background">
            </div>
            <h2 class="stats-heading">We Take Pride in Our Numbers</h2>
            <div class="stats-grid">
                <div class="stat-item">
                    <p class="stat-number">95%+</p>
                    <p class="stat-label">Prediction Accuracy</p>
                    <div class="stat-divider"></div>
                </div>
                <div class="stat-item">
                    <p class="stat-number">$50M+</p>
                    <p class="stat-label">Losses Prevented</p>
                    <div class="stat-divider"></div>
                </div>
                <div class="stat-item">
                    <p class="stat-number">3-4</p>
                    <p class="stat-label">Weeks Early Warning</p>
                    <div class="stat-divider"></div>
                </div>
                <div class="stat-item">
                    <p class="stat-number">99.9%</p>
                    <p class="stat-label">Uptime SLA</p>
                    <div class="stat-divider"></div>
                </div>
                <div class="stat-item">
                    <p class="stat-number">24/7</p>
                    <p class="stat-label">Monitoring</p>
                    <div class="stat-divider"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section-cta">
        <div class="cta-bg">
            <img src="art/Gemini_Generated_Image_anow9vanow9vanow.png" alt="Network">
        </div>
        <div class="container-wide">
            <div class="cta-content">
                <h2>Are You Ready to Accelerate<br>Your Business?</h2>
                <p>Transform your construction projects with AI-powered insights.<br>Schedule a consultation to see our ML platform in action.</p>
                <a href="#contact" class="btn-cta">Get Started</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container-wide">
            <div class="footer-grid">
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
                    <form class="newsletter-form">
                        <input type="email" placeholder="Email*" required>
                        <label>
                            <input type="checkbox" required>
                            <span>Yes, subscribe me to your newsletter.</span>
                        </label>
                        <button type="submit" class="btn-newsletter">Join</button>
                    </form>
                </div>

                <div class="footer-social">
                    <h4>Follow Us On:</h4>
                    <div class="social-icons">
                        <a href="#">𝕏</a>
                        <a href="#">in</a>
                        <a href="#">f</a>
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
    </script>
</body>
</html>'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("=" * 70)
print("ACTUAL VISTA.IO REDESIGN - BASED ON EXTRACTED CODE")
print("=" * 70)
print("\nKey Features:")
print("- Integrated header + hero (NO separation)")
print("- Login icon with user SVG")
print("- Hero font: 80px Poppins ExtraLight")
print("- Thin divider lines between features (Vista.io style)")
print("- Two-column: Image/text LEFT + Feature cards RIGHT")
print("- Background images fill entire sections")
print("- Proper logo sizing (not stretched)")
print("=" * 70)
