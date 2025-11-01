#!/usr/bin/env python3
"""Remove tiny panels and add FULL-WIDTH professional visualizations."""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the tiny panel visualizations
html = html.replace('''

                <!-- Real-Time Data Stream -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="250">
                    <h3 class="viz-title">Live Project Data Stream</h3>
                    <div class="canvas-wrapper">
                        <canvas id="dataStream"></canvas>
                    </div>
                </div>
                ''', '')

html = html.replace('''

                <!-- HTML5 Network Visualization -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="400">
                    <h3 class="viz-title">Neural Network Architecture</h3>
                    <div class="canvas-wrapper">
                        <canvas id="networkGraph"></canvas>
                    </div>
                </div>''', '')

html = html.replace('''

                <!-- Project Risk Heatmap -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="400">
                    <h3 class="viz-title">Project Risk Analysis Heatmap</h3>
                    <p class="viz-subtitle">Monthly risk assessment across project phases</p>
                    <div class="canvas-wrapper">
                        <canvas id="heatmap"></canvas>
                    </div>
                </div>''', '')

html = html.replace('''

                        <!-- Performance Gauges -->
                        <div class="gauges-grid">
                            <div class="gauge-item">
                                <canvas id="accuracyGauge"></canvas>
                            </div>
                            <div class="gauge-item">
                                <canvas id="uptimeGauge"></canvas>
                            </div>
                            <div class="gauge-item">
                                <canvas id="speedGauge"></canvas>
                            </div>
                        </div>''', '')

# Make the Chart.js dashboard MUCH LARGER - full section
html = html.replace(
    '''                <div class="platform-visual-container" data-aos="fade-up" data-aos-delay="200">
                    <div class="platform-screen">
                        <div class="platform-screen-header">
                            <div class="screen-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <div class="screen-title">SAntComm Analytics Dashboard</div>
                        </div>
                        <div class="platform-screen-content">
                            <!-- Animated Chart -->
                            <canvas id="predictiveChart" width="800" height="400"></canvas>
                        </div>
                    </div>
                </div>''',
    '''                <!-- FULL-WIDTH Analytics Dashboard -->
                <div class="full-width-dashboard" data-aos="fade-up" data-aos-delay="200">
                    <div class="dashboard-header">
                        <h3>Predictive Analytics Dashboard</h3>
                        <p>Real-time ML predictions and risk analysis</p>
                    </div>
                    <div class="dashboard-content">
                        <canvas id="predictiveChart"></canvas>
                    </div>
                </div>'''
)

# Add LARGE professional images between sections
about_image = '''
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

        '''

html = html.replace(
    '        <!-- About Section -->',
    about_image + '        <!-- About Section -->'
)

# Add another full-width image before contact
contact_image = '''
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

        '''

html = html.replace(
    '        <!-- Contact Section -->',
    contact_image + '        <!-- Contact Section -->'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("FIXED:")
print("- Removed ALL tiny panel visualizations")
print("- Made Chart.js dashboard FULL-WIDTH and LARGE")
print("- Added FULL-WIDTH professional images between sections")
print("- Added overlay text on images")
print("- No more tiny shitty graphs in panels")
