#!/usr/bin/env python3
"""Proper professional redesign - NO MORE LAZY PATCHES."""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# REMOVE the awful neural networks text section completely
html = html.replace('''
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

''', '')

# ADD 3 full-width image sections before About Section
# Using the exact images user specified: image1, image2, and image5
full_width_images = '''
        <!-- Full-Width Image Section 1 -->
        <section class="full-width-image-section">
            <img src="art/Gemini_Generated_Image_45y6h745y6h745y6.png" alt="AI Analytics Dashboard" class="full-section-image">
        </section>

        <!-- Full-Width Image Section 2 -->
        <section class="full-width-image-section">
            <img src="art/Gemini_Generated_Image_6voskj6voskj6vos.png" alt="Data Network Flow" class="full-section-image">
        </section>

        <!-- Full-Width Image Section 5 -->
        <section class="full-width-image-section">
            <img src="art/Gemini_Generated_Image_dpv0q6dpv0q6dpv0.png" alt="AI Interface Technology" class="full-section-image">
        </section>

'''

html = html.replace(
    '        <!-- About Section -->',
    full_width_images + '        <!-- About Section -->'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("PROPER REDESIGN COMPLETE:")
print("- Removed awful neural networks text section")
print("- Added 3 FULL-WIDTH image sections before About:")
print("  * Image 1: art/Gemini_Generated_Image_45y6h745y6h745y6.png (AI Analytics)")
print("  * Image 2: art/Gemini_Generated_Image_6voskj6voskj6vos.png (Data Network)")
print("  * Image 5: art/Gemini_Generated_Image_dpv0q6dpv0q6dpv0.png (AI Interface)")
print("\nNO MORE LAZY PATCHES - Clean professional design")
