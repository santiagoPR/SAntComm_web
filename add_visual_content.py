#!/usr/bin/env python3
"""Add HTML5 canvas visualizations and professional videos to fill empty sections."""

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add canvas visualizations script before closing body tag
canvas_script = '''
    <!-- HTML5 Canvas Visualizations -->
    <script src="scripts/canvas-visualizations.js"></script>
'''

html = html.replace(
    '<!-- Custom Scripts -->\n    <script src="scripts/premium-main.js"></script>',
    '<!-- Custom Scripts -->\n    <script src="scripts/premium-main.js"></script>\n' + canvas_script
)

# Add network graph visualization after tech stack grid
network_viz = '''

                <!-- HTML5 Network Visualization -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="400">
                    <h3 class="viz-title">Neural Network Architecture</h3>
                    <div class="canvas-wrapper">
                        <canvas id="networkGraph"></canvas>
                    </div>
                </div>'''

html = html.replace(
    '</div>\n            </div>\n        </section>\n\n        <!-- Solutions Section',
    network_viz + '\n            </div>\n        </section>\n\n        <!-- Solutions Section'
)

# Add data stream visualization in platform section before tech stack
data_stream = '''

                <!-- Real-Time Data Stream -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="250">
                    <h3 class="viz-title">Live Project Data Stream</h3>
                    <div class="canvas-wrapper">
                        <canvas id="dataStream"></canvas>
                    </div>
                </div>
                '''

html = html.replace(
    '</div>\n                </div>\n\n                <!-- Technology Stack -->',
    '</div>\n                </div>\n' + data_stream + '\n                <!-- Technology Stack -->'
)

# Add heatmap in solutions section
heatmap = '''

                <!-- Project Risk Heatmap -->
                <div class="visualization-container" data-aos="fade-up" data-aos-delay="400">
                    <h3 class="viz-title">Project Risk Analysis Heatmap</h3>
                    <p class="viz-subtitle">Monthly risk assessment across project phases</p>
                    <div class="canvas-wrapper">
                        <canvas id="heatmap"></canvas>
                    </div>
                </div>'''

html = html.replace(
    '</div>\n            </div>\n        </section>\n\n        <!-- About Section',
    heatmap + '\n            </div>\n        </section>\n\n        <!-- About Section'
)

# Add progress gauges in about section
gauges = '''

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
                        </div>'''

html = html.replace(
    '</div>\n                        </div>\n                    </div>\n                    <div class="about-visual"',
    gauges + '\n                        </div>\n                    </div>\n                    <div class="about-visual"'
)

# Add video background to problem section
problem_video = '''        <section class="problem-section-premium">
            <!-- Video Background -->
            <div class="section-video-bg">
                <video autoplay muted loop playsinline class="section-bg-video">
                    <source src="https://cdn.pixabay.com/video/2023/06/20/167726-838945624_large.mp4" type="video/mp4">
                </video>
                <div class="section-video-overlay"></div>
            </div>

            <div class="container">'''

html = html.replace(
    '        <section class="problem-section-premium">\n            <div class="container">',
    problem_video
)

# Add video background to solutions section
solutions_video = '''        <section id="solutions" class="solutions-section-premium">
            <!-- Video Background -->
            <div class="section-video-bg">
                <video autoplay muted loop playsinline class="section-bg-video">
                    <source src="https://cdn.pixabay.com/video/2022/11/29/141358-777339305_large.mp4" type="video/mp4">
                </video>
                <div class="section-video-overlay"></div>
            </div>

            <div class="container">'''

html = html.replace(
    '        <section id="solutions" class="solutions-section-premium">\n            <div class="container">',
    solutions_video
)

# Write updated HTML
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Added HTML5 canvas visualizations:")
print("- Network Graph (Neural Network Architecture)")
print("- Data Stream (Live Project Data)")
print("- Heatmap (Project Risk Analysis)")
print("- Progress Gauges (Performance Metrics)")
print("\nAdded professional video backgrounds:")
print("- Problem section: construction data visualization")
print("- Solutions section: analytics dashboard")
