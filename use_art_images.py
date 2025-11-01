#!/usr/bin/env python3
"""Replace Unsplash images with professional art folder images in creative layouts."""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the awful Unsplash image sections
html = html.replace('''

        <!-- FULL-WIDTH Professional Image -->
        <section class="full-image-section">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80" alt="Construction analytics workspace" class="section-full-image">
            <div class="image-overlay">
                <div class="container">
                    <h2 class="overlay-title">Data-Driven Decision Making</h2>
                    <p class="overlay-subtitle">Transform your construction projects with AI-powered insights</p>
                </div>
            </div>
        </section>

        ''', '')

html = html.replace('''

        <!-- FULL-WIDTH Technology Showcase -->
        <section class="full-image-section dark">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" alt="Technology visualization" class="section-full-image">
            <div class="image-overlay">
                <div class="container">
                    <h2 class="overlay-title">Built for Scale</h2>
                    <p class="overlay-subtitle">Enterprise-grade ML infrastructure for construction excellence</p>
                </div>
            </div>
        </section>

        ''', '')

# Add Image + Text Section after Platform section
platform_section = '''
        <!-- Image + Text: AI Technology -->
        <section class="image-text-section">
            <div class="container-wide">
                <div class="image-text-grid">
                    <div class="image-text-content" data-aos="fade-right">
                        <span class="section-badge">Advanced AI Technology</span>
                        <h2 class="section-title-premium">Neural Networks That Learn From Your Data</h2>
                        <p class="large-text">
                            Our custom machine learning models analyze millions of data points from your projects,
                            identifying patterns invisible to traditional analysis methods.
                        </p>
                        <ul class="feature-list-large">
                            <li>Deep learning models trained on construction-specific datasets</li>
                            <li>Real-time pattern recognition and anomaly detection</li>
                            <li>Continuous model improvement as more data is collected</li>
                            <li>95%+ accuracy in budget overrun predictions</li>
                        </ul>
                    </div>
                    <div class="image-text-visual" data-aos="fade-left">
                        <img src="art/Gemini_Generated_Image_45y6h745y6h745y6.png" alt="AI Data Visualization" class="featured-image">
                    </div>
                </div>
            </div>
        </section>
'''

html = html.replace(
    '        <!-- Solutions Section with Interactive Cards -->',
    platform_section + '\n        <!-- Solutions Section with Interactive Cards -->'
)

# Add 3-image collage after Solutions section
solutions_collage = '''
        <!-- Image Collage: Technology Showcase -->
        <section class="image-collage-section">
            <div class="container">
                <div class="collage-header" data-aos="fade-up">
                    <span class="section-badge">Powered by Innovation</span>
                    <h2 class="section-title-premium">Cutting-Edge ML Infrastructure</h2>
                </div>
                <div class="image-collage-grid">
                    <div class="collage-item large" data-aos="zoom-in">
                        <img src="art/Gemini_Generated_Image_8sng0m8sng0m8sng.png" alt="Neural Network Hub">
                        <div class="collage-overlay">
                            <h3>Neural Network Architecture</h3>
                            <p>Interconnected AI systems working in harmony</p>
                        </div>
                    </div>
                    <div class="collage-item" data-aos="zoom-in" data-aos-delay="100">
                        <img src="art/Gemini_Generated_Image_6voskj6voskj6vos.png" alt="Data Flow Network">
                        <div class="collage-overlay">
                            <h3>Real-Time Data Streams</h3>
                            <p>Continuous processing of project metrics</p>
                        </div>
                    </div>
                    <div class="collage-item" data-aos="zoom-in" data-aos-delay="200">
                        <img src="art/Gemini_Generated_Image_dpv0q6dpv0q6dpv0.png" alt="AI Analytics Interface">
                        <div class="collage-overlay">
                            <h3>Intelligent Dashboards</h3>
                            <p>AI-powered insights at your fingertips</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
'''

html = html.replace(
    '                <!-- About Section -->',
    solutions_collage + '\n                <!-- About Section -->'
)

# Add Image + Text Section before Contact (partnership theme)
contact_section = '''
        <!-- Image + Text: Partnership -->
        <section class="image-text-section reverse">
            <div class="container-wide">
                <div class="image-text-grid">
                    <div class="image-text-visual" data-aos="fade-right">
                        <img src="art/Gemini_Generated_Image_odjzddodjzddodjz.png" alt="Data Partnership" class="featured-image">
                    </div>
                    <div class="image-text-content" data-aos="fade-left">
                        <span class="section-badge">Your Partner in Success</span>
                        <h2 class="section-title-premium">Built Specifically for You</h2>
                        <p class="large-text">
                            Every construction project is unique. That's why we don't believe in one-size-fits-all solutions.
                            Our ML models are custom-trained on your historical data.
                        </p>
                        <div class="stats-inline">
                            <div class="stat-inline-item">
                                <div class="stat-inline-number">100%</div>
                                <div class="stat-inline-label">Custom Models</div>
                            </div>
                            <div class="stat-inline-item">
                                <div class="stat-inline-number">24/7</div>
                                <div class="stat-inline-label">Monitoring</div>
                            </div>
                            <div class="stat-inline-item">
                                <div class="stat-inline-number">3-4 wks</div>
                                <div class="stat-inline-label">Early Warning</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
'''

html = html.replace(
    '                <!-- Contact Section -->',
    contact_section + '\n                <!-- Contact Section -->'
)

# Add full-width hero image after About section
about_hero = '''
        <!-- Full-Width Hero: Global Scale -->
        <section class="hero-image-section">
            <img src="art/Gemini_Generated_Image_anow9vanow9vanow.png" alt="Global ML Infrastructure" class="hero-full-image">
            <div class="hero-image-overlay">
                <div class="container">
                    <h2 class="hero-image-title">Enterprise-Grade ML Infrastructure</h2>
                    <p class="hero-image-subtitle">Trusted by construction leaders worldwide to prevent project failures</p>
                </div>
            </div>
        </section>
'''

# Find the end of About section and add hero
about_end_marker = '        </section>\n\n\n                <!-- Contact Section -->'
html = html.replace(about_end_marker, '        </section>\n\n' + about_hero + '\n                <!-- Contact Section -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("REPLACED professional art images:")
print("✓ Removed awful Unsplash images")
print("✓ Added Image+Text section: AI Technology (45y6h7 image)")
print("✓ Added 3-image collage: Neural Hub + Data Flow + AI Interface")
print("✓ Added Image+Text section: Partnership (odjzdd image)")
print("✓ Added Full-width hero: Global Scale (anow9v image)")
print("\nRemaining images for future use:")
print("- tenwj5 (collaboration)")
print("- xooo4x (professional team)")
