#!/usr/bin/env python3
"""
CORRECT Vista.io Redesign
Using the EXACT image placement strategy from Vista.io:
- image5 as full background for hero
- image2 as subdued background for "Let your data" section
- image3 for next section
- image6 and image4 for stats sections
- Bordered frames like Vista.io
"""

html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAntComm - AI-Powered Construction Analytics</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="styles/vista-correct.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
</head>
<body>

    <!-- HERO SECTION with image5 as FULL BACKGROUND -->
    <section class="hero-section">
        <!-- FULL background image5 from side to side -->
        <div class="hero-bg-full">
            <img src="art/image5.png" alt="Background">
        </div>

        <!-- Header integrated -->
        <header class="header-integrated">
            <div class="container">
                <div class="header-flex">
                    <div class="logo">
                        <img src="logo/full-logo-header-metallic.png" alt="SAntComm">
                    </div>
                    <nav class="nav">
                        <a href="#platform">Platform</a>
                        <a href="#solutions">Solutions</a>
                        <a href="#about">About</a>
                        <a href="#blog">Blog</a>
                    </nav>
                    <div class="header-right">
                        <button class="login">
                            <svg viewBox="0 0 50 50" width="20" height="20" fill="currentColor">
                                <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 13.807 11.193 25 25 25s25-11.193 25-25S38.807 0 25 0"/>
                            </svg>
                            <span>Log In</span>
                        </button>
                        <a href="#contact" class="btn-outline">Get Started</a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero content -->
        <div class="container">
            <div class="hero-content">
                <h1>The New Standard<br>in Construction Analytics</h1>
                <p class="hero-subtitle">Use ML to Prevent Budget Overruns and Deliver Projects On Time</p>
                <a href="#contact" class="btn-primary">Learn More</a>
            </div>
        </div>
    </section>

    <!-- SECTION: Let Your Data (with image2 as subdued background) -->
    <section class="section-framed">
        <!-- Subdued background image2 -->
        <div class="section-bg-subdued">
            <img src="art/image2.png" alt="">
        </div>

        <div class="container">
            <div class="section-grid-left-right">
                <!-- LEFT: Text + Content -->
                <div class="content-left">
                    <h2 class="section-title">Let Your Data Take<br>Your Business to<br>Higher Grounds</h2>
                    <p class="section-text">Our custom machine learning models analyze millions of data points from your construction projects, identifying patterns invisible to traditional analysis methods. Get 3-4 weeks advance warning of budget overruns and schedule delays.</p>
                </div>

                <!-- RIGHT: Feature Cards Stacked -->
                <div class="features-stacked">
                    <div class="feature-box">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M149.73 83.547c-2.538-25.284-24.211-44.961-49.73-44.961S52.808 58.263 50.269 83.547c-17.67 3.837-30.401 19.54-30.401 37.674 0 21.261 17.297 38.559 38.559 38.559h83.146c21.261 0 38.559-17.297 38.559-38.559 0-18.135-12.732-33.838-30.402-37.674zm-8.157 64.423H58.427a26.755 26.755 0 0 1-16.198-5.482l21.237-21.114 13.181 13.19 36.505-35.875 8.081 8.047 6.076-30.357-30.353 6.177 8.281 8.243-28.512 28.025-13.236-13.239-28.56 28.399a26.646 26.646 0 0 1-3.252-12.763c0-13.887 10.85-25.598 24.701-26.661l5.452-.419v-5.488l-.003-.16C61.868 67.486 78.992 50.395 100 50.395c21.047 0 38.171 17.078 38.172 38.069l-.004 5.677 5.453.419c13.851 1.063 24.701 12.774 24.701 26.661 0 14.749-11.999 26.749-26.749 26.749z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3>Cloud Analytics Modernization</h3>
                        <p>Real-time predictions that identify budget overruns and delays before they impact your projects.</p>
                        <div class="divider"></div>
                    </div>

                    <div class="feature-box">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M177.118 96.151L142.48 80.165a4.235 4.235 0 0 0-3.555 0l-34.637 15.986a4.252 4.252 0 0 0-2.464 3.849c0 1.648.967 3.159 2.463 3.85l34.638 15.986c.553.255 1.167.39 1.777.39.619 0 1.217-.131 1.778-.39l34.638-15.986c1.496-.691 2.462-2.202 2.462-3.85s-.967-3.159-2.462-3.849z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3>Versatility in Application</h3>
                        <p>Our ML models work across all project types and sizes, from single builds to global portfolios.</p>
                        <div class="divider"></div>
                    </div>

                    <div class="feature-box">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M63.585 72.333l34.638 15.985a4.257 4.257 0 0 0 1.777.391 4.21 4.21 0 0 0 1.777-.39l34.639-15.986a4.253 4.253 0 0 0 2.462-3.85 4.252 4.252 0 0 0-2.462-3.849l-34.639-15.986a4.236 4.236 0 0 0-3.554 0L63.585 64.634a4.253 4.253 0 0 0-2.463 3.849c0 1.648.966 3.159 2.463 3.85z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3>Data Science Acceleration</h3>
                        <p>Transform complex construction data into actionable insights with automated analysis.</p>
                        <div class="divider"></div>
                    </div>

                    <div class="feature-box">
                        <div class="feature-icon">
                            <svg width="40" height="40" viewBox="0 0 200 200">
                                <path d="M117.275 125.299c8.267-5.705 13.161-14.963 13.161-25.039 0-16.782-13.653-30.435-30.435-30.435S69.566 83.478 69.566 100.26c0 10.076 4.892 19.333 13.159 25.039-17.083 6.994-28.462 23.834-28.462 42.343v5.605h91.474v-5.605c0-18.509-11.38-35.349-28.462-42.343z" fill="currentColor"/>
                            </svg>
                        </div>
                        <h3>Full Enterprise Service</h3>
                        <p>99.9% uptime SLA, SOC 2 Type II compliance, and dedicated support for operations.</p>
                        <div class="divider"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION: Unprecedented Velocity (with image3 as subdued background) -->
    <section class="section-framed">
        <!-- Subdued background image3 -->
        <div class="section-bg-subdued">
            <img src="art/image3.png" alt="">
        </div>

        <div class="container">
            <div class="section-split">
                <div class="split-image">
                    <h2 class="overlay-title">Unprecedented Velocity.<br>Impeccable Reliability.</h2>
                </div>
                <div class="split-text">
                    <p>Our enterprise-grade ML infrastructure processes construction data at scale with sub-second response times. Built for the demands of global construction leaders managing billions in project value.</p>
                    <p>We combine cutting-edge deep learning with decades of construction industry expertise to deliver predictions you can trust. Every model is custom-trained on your historical data for maximum accuracy.</p>
                    <a href="#contact" class="btn-primary">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <!-- STATS SECTION (with image6 as subdued background) -->
    <section class="section-framed">
        <!-- Subdued background image6 -->
        <div class="section-bg-subdued">
            <img src="art/image6.png" alt="">
        </div>

        <div class="container">
            <h2 class="stats-heading">We Take Pride in Our Numbers</h2>
            <div class="stats-grid">
                <div class="stat">
                    <div class="stat-number">95%+</div>
                    <div class="stat-label">Prediction Accuracy</div>
                    <div class="divider-red"></div>
                </div>
                <div class="stat">
                    <div class="stat-number">$50M+</div>
                    <div class="stat-label">Losses Prevented</div>
                    <div class="divider-red"></div>
                </div>
                <div class="stat">
                    <div class="stat-number">3-4</div>
                    <div class="stat-label">Weeks Early Warning</div>
                    <div class="divider-red"></div>
                </div>
                <div class="stat">
                    <div class="stat-number">99.9%</div>
                    <div class="stat-label">Uptime SLA</div>
                    <div class="divider-red"></div>
                </div>
                <div class="stat">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Monitoring</div>
                    <div class="divider-red"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA SECTION (with image4 as subdued background) -->
    <section class="section-framed">
        <!-- Subdued background image4 -->
        <div class="section-bg-subdued">
            <img src="art/image4.png" alt="">
        </div>

        <div class="container">
            <div class="cta-center">
                <h2>Are You Ready to Accelerate<br>Your Business?</h2>
                <p>Transform your construction projects with AI-powered insights.<br>Schedule a consultation to see our ML platform in action.</p>
                <a href="#contact" class="btn-primary">Get Started</a>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <img src="logo/full-logo-header-metallic.png" alt="SAntComm" class="footer-logo">
                    <p>123-456-7890</p>
                    <p>info@santcom.com</p>
                    <p>500 Market Street<br>San Francisco, CA 94105</p>
                </div>

                <div class="footer-col">
                    <h4>Solutions</h4>
                    <a href="#platform">Platform</a>
                    <a href="#solutions">ML Models</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                <div class="footer-col">
                    <h4>Subscribe to Our Newsletter</h4>
                    <form class="newsletter">
                        <input type="email" placeholder="Email*" required>
                        <label>
                            <input type="checkbox" required>
                            <span>Yes, subscribe me to your newsletter.</span>
                        </label>
                        <button type="submit" class="btn-small">Join</button>
                    </form>
                </div>

                <div class="footer-col">
                    <h4>Follow Us On:</h4>
                    <div class="social">
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
print("CORRECT VISTA.IO REDESIGN")
print("=" * 70)
print("\nIMAGE USAGE:")
print("- image5: FULL background for hero (side to side)")
print("- image2: Subdued background for 'Let Your Data' section")
print("- image3: Subdued background for 'Unprecedented Velocity' section")
print("- image6: Subdued background for stats section")
print("- image4: Subdued background for CTA section")
print("\nBORDERED FRAMES: Each section has subtle bezel borders")
print("=" * 70)
