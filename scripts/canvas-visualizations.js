/**
 * HTML5 Canvas Data Visualizations
 * Professional animated visualizations for SAntComm
 */

// Network Graph Visualization
class NetworkGraph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationFrame = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight || 400;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    init() {
        // Create nodes
        const nodeCount = 25;
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                connections: []
            });
        }

        this.animate();
    }

    animate() {
        this.ctx.fillStyle = '#202124';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update nodes
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
        });

        // Draw connections
        this.ctx.strokeStyle = 'rgba(26, 115, 232, 0.2)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    this.ctx.strokeStyle = `rgba(26, 115, 232, ${opacity * 0.3})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.fillStyle = '#1a73e8';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Glow effect
            const gradient = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
            gradient.addColorStop(0, 'rgba(26, 115, 232, 0.5)');
            gradient.addColorStop(1, 'rgba(26, 115, 232, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Real-time Data Stream Visualization
class DataStream {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.dataPoints = [];
        this.time = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight || 300;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    init() {
        // Initialize with data
        for (let i = 0; i < 50; i++) {
            this.dataPoints.push({
                value: Math.random() * 100,
                category: Math.floor(Math.random() * 3)
            });
        }
        this.animate();
    }

    animate() {
        this.ctx.fillStyle = '#202124';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Add new data point
        if (this.time % 3 === 0) {
            this.dataPoints.push({
                value: 50 + Math.sin(this.time * 0.05) * 30 + Math.random() * 20,
                category: Math.floor(Math.random() * 3)
            });
            if (this.dataPoints.length > 50) {
                this.dataPoints.shift();
            }
        }

        const colors = ['#1a73e8', '#00857c', '#1e8e3e'];
        const barWidth = this.width / 50;

        // Draw bars
        this.dataPoints.forEach((point, i) => {
            const x = i * barWidth;
            const barHeight = (point.value / 100) * this.height * 0.8;
            const y = this.height - barHeight;

            const gradient = this.ctx.createLinearGradient(x, y, x, this.height);
            gradient.addColorStop(0, colors[point.category]);
            gradient.addColorStop(1, 'rgba(26, 115, 232, 0.3)');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, barWidth - 2, barHeight);
        });

        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(95, 99, 104, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (this.height / 4) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}

// Circular Progress Gauge
class ProgressGauge {
    constructor(canvasId, value, label) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.targetValue = value;
        this.currentValue = 0;
        this.label = label;

        this.resize();
        this.animate();
    }

    resize() {
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.centerX = 100;
        this.centerY = 100;
        this.radius = 70;
    }

    animate() {
        // Smooth animation to target value
        this.currentValue += (this.targetValue - this.currentValue) * 0.05;

        this.ctx.clearRect(0, 0, 200, 200);

        // Background circle
        this.ctx.strokeStyle = 'rgba(60, 64, 67, 0.3)';
        this.ctx.lineWidth = 12;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Progress arc
        const gradient = this.ctx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, '#1a73e8');
        gradient.addColorStop(1, '#00857c');

        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 12;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (Math.PI * 2 * this.currentValue / 100);
        this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
        this.ctx.stroke();

        // Value text
        this.ctx.fillStyle = '#e8eaed';
        this.ctx.font = 'bold 32px Inter';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(Math.round(this.currentValue) + '%', this.centerX, this.centerY);

        // Label
        this.ctx.fillStyle = '#9aa0a6';
        this.ctx.font = '14px Inter';
        this.ctx.fillText(this.label, this.centerX, this.centerY + 40);

        if (Math.abs(this.targetValue - this.currentValue) > 0.5) {
            requestAnimationFrame(() => this.animate());
        }
    }
}

// Heatmap Visualization
class Heatmap {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.init();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight || 300;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    init() {
        this.rows = 7;
        this.cols = 12;
        this.data = [];

        // Generate random heatmap data
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random();
            }
        }

        this.draw();
    }

    draw() {
        const cellWidth = this.width / this.cols;
        const cellHeight = this.height / this.rows;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const value = this.data[i][j];
                const intensity = Math.floor(value * 255);

                // Color gradient from blue to green
                const r = Math.floor(26 + (0 - 26) * value);
                const g = Math.floor(115 + (133 - 115) * value);
                const b = Math.floor(232 + (124 - 232) * value);

                this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + value * 0.7})`;
                this.ctx.fillRect(
                    j * cellWidth + 2,
                    i * cellHeight + 2,
                    cellWidth - 4,
                    cellHeight - 4
                );
            }
        }
    }
}

// Initialize all visualizations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Network graph in technology section
    if (document.getElementById('networkGraph')) {
        new NetworkGraph('networkGraph');
    }

    // Data stream in platform section
    if (document.getElementById('dataStream')) {
        new DataStream('dataStream');
    }

    // Progress gauges in about section
    if (document.getElementById('accuracyGauge')) {
        new ProgressGauge('accuracyGauge', 95, 'Accuracy');
    }
    if (document.getElementById('uptimeGauge')) {
        new ProgressGauge('uptimeGauge', 99.9, 'Uptime');
    }
    if (document.getElementById('speedGauge')) {
        new ProgressGauge('speedGauge', 87, 'Speed');
    }

    // Heatmap in solutions section
    if (document.getElementById('heatmap')) {
        new Heatmap('heatmap');
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NetworkGraph, DataStream, ProgressGauge, Heatmap };
}
