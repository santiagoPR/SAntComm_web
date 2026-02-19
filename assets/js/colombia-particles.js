(function () {
    'use strict';

    // ── Brand palette ──
    // Americas (non-Colombia): cyan / white / silver
    var COLORS_DEFAULT = [
        { r: 0, g: 211, b: 222 },    // cyan #00D3DE
        { r: 255, g: 255, b: 255 },  // white
        { r: 170, g: 225, b: 228 },  // ice blue
        { r: 80, g: 210, b: 218 },   // soft teal
        { r: 190, g: 220, b: 225 },  // silver
    ];
    // Colombia: orange exclusively
    var COLORS_COLOMBIA = [
        { r: 255, g: 96, b: 65 },    // orange #FF6041
        { r: 255, g: 135, b: 100 },  // light orange
        { r: 240, g: 85, b: 55 },    // deep orange
        { r: 250, g: 120, b: 80 },   // mid orange
    ];

    // ──────────────────────────────────────────────
    // Americas outlines — geographic projection
    // Projection: x = (160 - lon) / 126,  y = (72 - lat) / 128
    // Longitude range: 160°W – 34°W  |  Latitude range: 72°N – 56°S
    // ──────────────────────────────────────────────

    // North + Central America (clockwise from W Alaska)
    var NCAM = [
        // Alaska
        [0.00, 0.08],  // W Alaska (160W,62N)
        [0.02, 0.01],  // Barrow (157W,71N)
        [0.16, 0.02],  // NW Canada (140W,70N)
        // Arctic Canada
        [0.40, 0.02],  // Central Arctic (110W,70N)
        [0.52, 0.07],  // Hudson Bay W (94W,63N)
        [0.63, 0.11],  // Hudson Bay E (80W,58N)
        [0.75, 0.16],  // Quebec (65W,52N)
        // Atlantic Canada
        [0.81, 0.15],  // Labrador (58W,53N)
        [0.85, 0.20],  // Newfoundland (53W,47N)
        [0.77, 0.22],  // Nova Scotia (63W,44N)
        // US East Coast
        [0.74, 0.22],  // Maine (67W,44N)
        [0.71, 0.23],  // Cape Cod (70W,42N)
        [0.68, 0.24],  // New York (74W,41N)
        [0.67, 0.27],  // Chesapeake (76W,37N)
        [0.64, 0.30],  // Carolinas (79W,34N)
        [0.63, 0.32],  // Georgia (81W,31N)
        // Florida
        [0.63, 0.35],  // Florida E (80W,27N)
        [0.63, 0.37],  // Florida tip (81W,25N)
        [0.61, 0.34],  // Florida W (83W,28N)
        // Gulf Coast
        [0.57, 0.33],  // Gulf AL/MS (88W,30N)
        [0.56, 0.34],  // Louisiana (90W,29N)
        [0.51, 0.35],  // Texas (96W,27N)
        [0.50, 0.36],  // S Texas (97W,26N)
        // Mexico East Coast
        [0.49, 0.39],  // Tampico (98W,22N)
        [0.51, 0.41],  // Veracruz (96W,19N)
        [0.56, 0.40],  // Yucatan N (90W,21N)
        [0.58, 0.41],  // Yucatan E (87W,20N)
        [0.57, 0.42],  // Yucatan SE (88W,18N)
        // Central America Caribbean
        [0.60, 0.44],  // Honduras (84W,16N)
        [0.61, 0.46],  // Nicaragua (83W,13N)
        [0.61, 0.48],  // Costa Rica (83W,10N)
        [0.63, 0.49],  // Panama Car (80W,9N)
        [0.64, 0.50],  // Panama tip (79W,8N)
        // Central America Pacific (going back north)
        [0.60, 0.49],  // CR Pacific (85W,9N)
        [0.58, 0.48],  // Nicaragua Pac (87W,11N)
        [0.56, 0.46],  // El Salvador (90W,13N)
        [0.55, 0.45],  // Guatemala (91W,14N)
        // Mexico Pacific
        [0.50, 0.44],  // Oaxaca (97W,16N)
        [0.48, 0.43],  // Acapulco (100W,17N)
        [0.44, 0.41],  // Manzanillo (104W,19N)
        [0.43, 0.38],  // Mazatlan (106W,23N)
        [0.40, 0.38],  // Baja tip (110W,23N)
        [0.36, 0.34],  // Baja mid (115W,28N)
        // US West Coast
        [0.34, 0.30],  // San Diego (117W,33N)
        [0.30, 0.27],  // San Francisco (122W,38N)
        [0.29, 0.22],  // Oregon (124W,44N)
        [0.30, 0.19],  // Seattle (122W,48N)
        // Pacific NW → Alaska
        [0.24, 0.14],  // BC (130W,54N)
        [0.20, 0.12],  // Alaska panhandle (135W,57N)
        [0.12, 0.09],  // Alaska S coast (145W,60N)
        [0.04, 0.08],  // Alaska SW (155W,62N)
    ];

    // South America (clockwise from NW)
    var SAM = [
        [0.64, 0.50],  // Panama border (77W,8N)
        [0.66, 0.49],  // Uraba (76W,8.5N)
        [0.67, 0.48],  // Cartagena (75.5W,10N)
        [0.68, 0.47],  // Barranquilla (75W,11N)
        [0.70, 0.46],  // Guajira (72W,12N)
        [0.72, 0.47],  // Venezuela W (72W,11N)
        [0.74, 0.48],  // Maracaibo (72W,10N)
        [0.78, 0.48],  // Caracas (67W,10N)
        [0.81, 0.48],  // E Venezuela (62W,10N)
        [0.83, 0.51],  // Guyana (58W,7N)
        [0.86, 0.52],  // Suriname (55W,6N)
        [0.87, 0.56],  // Amazon mouth (49W,1S)
        [0.97, 0.59],  // Natal (36W,6S)
        [0.99, 0.62],  // Recife (35W,8S)
        [0.97, 0.66],  // Salvador (38W,13S)
        [0.93, 0.74],  // Rio (43W,23S)
        [0.89, 0.78],  // S Brazil (48W,28S)
        [0.83, 0.84],  // Uruguay (55W,35S)
        [0.81, 0.84],  // Buenos Aires (58W,35S)
        [0.77, 0.88],  // Argentina (63W,41S)
        [0.75, 0.93],  // Patagonia (65W,47S)
        [0.72, 0.98],  // Tierra del Fuego (69W,54S)
        // Pacific coast going north
        [0.69, 0.92],  // S Chile (75W,46S)
        [0.69, 0.85],  // Central Chile (73W,37S)
        [0.70, 0.82],  // Santiago (71W,33S)
        [0.71, 0.75],  // N Chile (70W,24S)
        [0.71, 0.71],  // Chile/Peru border (70W,19S)
        [0.66, 0.66],  // Lima (77W,12S)
        [0.64, 0.60],  // N Peru (79W,5S)
        [0.63, 0.56],  // Ecuador (80W,0)
        [0.64, 0.55],  // Esmeraldas (79W,1N)
        [0.65, 0.53],  // Tumaco (78W,2N)
        [0.66, 0.51],  // Buenaventura (77W,4N)
    ];

    // Colombia (for salmon highlighting)
    var COLOMBIA = [
        [0.66, 0.50],  // Panama border
        [0.67, 0.48],  // Cartagena
        [0.68, 0.47],  // Barranquilla
        [0.69, 0.47],  // Santa Marta
        [0.70, 0.46],  // Guajira tip
        [0.70, 0.48],  // Guajira E coast
        [0.69, 0.50],  // Cucuta / Venezuela border
        [0.71, 0.51],  // Arauca
        [0.73, 0.53],  // Vichada
        [0.73, 0.56],  // Guainia
        [0.71, 0.59],  // Leticia
        [0.67, 0.56],  // Putumayo
        [0.65, 0.55],  // Narino
        [0.64, 0.55],  // Tumaco
        [0.65, 0.53],  // Buenaventura
        [0.66, 0.51],  // Choco
    ];

    // ── Config (responsive) ──
    var isMobile = window.innerWidth < 768;
    var isSmallMobile = window.innerWidth < 480;
    var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var PARTICLE_COUNT = prefersReducedMotion ? 150 : (isSmallMobile ? 400 : (isMobile ? 600 : 2200));
    var CONNECTION_DIST = isMobile ? 0.04 : 0.032;
    var MAX_CONNECTIONS = isMobile ? 2 : 3;
    var SPHERE_ROTATE_SPEED = 0.0004;

    // Timing (ms)
    var PHASE_SPHERE = 4000;
    var PHASE_MORPH_TO = 2500;
    var PHASE_HOLD = 5000;
    var PHASE_MORPH_BACK = 2500;
    var CYCLE = PHASE_SPHERE + PHASE_MORPH_TO + PHASE_HOLD + PHASE_MORPH_BACK;

    // Particle distribution weights
    var REGIONS = [
        { poly: NCAM, weight: 0.30 },
        { poly: SAM, weight: 0.38 },
        { poly: COLOMBIA, weight: 0.32 },
    ];

    // ── Utilities ──

    function pointInPolygon(x, y, poly) {
        var inside = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            var xi = poly[i][0], yi = poly[i][1];
            var xj = poly[j][0], yj = poly[j][1];
            if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                inside = !inside;
            }
        }
        return inside;
    }

    function polyBounds(poly) {
        var minX = 1, maxX = 0, minY = 1, maxY = 0;
        for (var i = 0; i < poly.length; i++) {
            if (poly[i][0] < minX) minX = poly[i][0];
            if (poly[i][0] > maxX) maxX = poly[i][0];
            if (poly[i][1] < minY) minY = poly[i][1];
            if (poly[i][1] > maxY) maxY = poly[i][1];
        }
        return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
    }

    function randomPointInPoly(poly, bounds) {
        for (var attempts = 0; attempts < 500; attempts++) {
            var x = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
            var y = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
            if (pointInPolygon(x, y, poly)) return { x: x, y: y };
        }
        var idx = Math.floor(Math.random() * poly.length);
        return { x: poly[idx][0], y: poly[idx][1] };
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function fibSphere(index, total) {
        var phi = Math.acos(1 - (2 * (index + 0.5)) / total);
        var theta = Math.PI * (1 + Math.sqrt(5)) * index;
        return {
            x: Math.sin(phi) * Math.cos(theta),
            y: Math.sin(phi) * Math.sin(theta),
            z: Math.cos(phi),
        };
    }

    function projectSphere(sx, sy, sz, angle, cx, cy, radius) {
        var cosA = Math.cos(angle), sinA = Math.sin(angle);
        var rx = sx * cosA - sz * sinA;
        var rz = sx * sinA + sz * cosA;
        var scale = 1 / (1 - rz * 0.3);
        return { x: cx + rx * radius * scale, y: cy + sy * radius * scale, depth: rz };
    }

    // ── Precompute bounding boxes ──
    var regionBounds = [];
    for (var r = 0; r < REGIONS.length; r++) {
        regionBounds.push(polyBounds(REGIONS[r].poly));
    }

    function pickRegion() {
        var rand = Math.random(), sum = 0;
        for (var i = 0; i < REGIONS.length; i++) {
            sum += REGIONS[i].weight;
            if (rand <= sum) return i;
        }
        return 0;
    }

    // ── Create particle ──
    function createParticle(index, total) {
        var sphere = fibSphere(index, total);
        var regionIdx = pickRegion();
        var region = REGIONS[regionIdx];
        var point = randomPointInPoly(region.poly, regionBounds[regionIdx]);

        // Colombia = region index 2, OR any SAM point that falls inside Colombia
        var isColombia = (regionIdx === 2) || pointInPolygon(point.x, point.y, COLOMBIA);

        var colorSet = isColombia ? COLORS_COLOMBIA : COLORS_DEFAULT;
        var color = colorSet[Math.floor(Math.random() * colorSet.length)];

        return {
            sx: sphere.x, sy: sphere.y, sz: sphere.z,
            cx: point.x, cy: point.y,
            px: 0, py: 0,
            color: color,
            isColombia: isColombia,
            baseSize: isColombia ? (1.8 + Math.random() * 2.2) : (1.0 + Math.random() * 1.6),
            alpha: 0.5 + Math.random() * 0.5,
            twinkleSpeed: 0.001 + Math.random() * 0.003,
            twinkleOffset: Math.random() * Math.PI * 2,
            depth: 0,
        };
    }

    // ── Main animation ──

    function AmericasParticles(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.angle = 0;
        this.startTime = performance.now();
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.w = 0;
        this.h = 0;
        this.init();
    }

    AmericasParticles.prototype.init = function () {
        this.resize();
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            this.particles.push(createParticle(i, PARTICLE_COUNT));
        }
        var self = this;
        window.addEventListener('resize', function () { self.resize(); });
        this.loop();
    };

    AmericasParticles.prototype.resize = function () {
        var rect = this.canvas.parentElement.getBoundingClientRect();
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = this.w * this.dpr;
        this.canvas.height = this.h * this.dpr;
        this.canvas.style.width = this.w + 'px';
        this.canvas.style.height = this.h + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    };

    AmericasParticles.prototype.loop = function () {
        var self = this;
        requestAnimationFrame(function () { self.loop(); });
        // Pause when tab is hidden
        if (document.hidden) return;
        self.update();
        self.render();
    };

    AmericasParticles.prototype.update = function () {
        var now = performance.now();
        var elapsed = (now - this.startTime) % CYCLE;
        this.angle += SPHERE_ROTATE_SPEED;

        var morph = 0;
        if (elapsed < PHASE_SPHERE) {
            morph = 0;
        } else if (elapsed < PHASE_SPHERE + PHASE_MORPH_TO) {
            morph = easeInOutCubic((elapsed - PHASE_SPHERE) / PHASE_MORPH_TO);
        } else if (elapsed < PHASE_SPHERE + PHASE_MORPH_TO + PHASE_HOLD) {
            morph = 1;
        } else {
            morph = 1 - easeInOutCubic((elapsed - PHASE_SPHERE - PHASE_MORPH_TO - PHASE_HOLD) / PHASE_MORPH_BACK);
        }

        // Colombia pulse during hold phase
        var colombiaPulse = 1.0;
        if (morph === 1) {
            var holdElapsed = elapsed - PHASE_SPHERE - PHASE_MORPH_TO;
            colombiaPulse = 1.0 + 0.15 * Math.sin(holdElapsed * 0.003);
        }

        var w = this.w, h = this.h;
        var cx = w * 0.5, cy = h * 0.5;
        var sphereR = Math.min(w, h) * 0.36;

        // Map area — fill canvas with some padding
        var mapW = w * 0.92, mapH = h * 0.96;
        var mapX = (w - mapW) * 0.5;
        var mapY = (h - mapH) * 0.5;

        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            var proj = projectSphere(p.sx, p.sy, p.sz, this.angle, cx, cy, sphereR);
            var flatX = mapX + p.cx * mapW;
            var flatY = mapY + p.cy * mapH;

            p.px = proj.x + (flatX - proj.x) * morph;
            p.py = proj.y + (flatY - proj.y) * morph;
            p.depth = proj.depth * (1 - morph);

            // Twinkle + Colombia pulse
            var twinkle = 0.5 + 0.5 * Math.sin(now * p.twinkleSpeed + p.twinkleOffset);
            p.alpha = 0.4 + 0.6 * twinkle;
            if (p.isColombia) {
                p.alpha *= colombiaPulse;
            }
        }
    };

    AmericasParticles.prototype.render = function () {
        var ctx = this.ctx;
        var w = this.w, h = this.h;
        ctx.clearRect(0, 0, w, h);

        var particles = this.particles;
        var connDist = CONNECTION_DIST * Math.max(w, h);
        var connDistSq = connDist * connDist;

        // Skip connection lines on small mobile for performance
        if (isSmallMobile) {
            // No connections on tiny screens
        } else {

        // Spatial grid for connections
        var gridSize = connDist;
        var grid = {};
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var gx = Math.floor(p.px / gridSize);
            var gy = Math.floor(p.py / gridSize);
            var key = gx + ',' + gy;
            if (!grid[key]) grid[key] = [];
            grid[key].push(i);
        }

        // Draw connections
        ctx.lineWidth = 0.5;
        var connStep = isMobile ? 5 : 3;
        for (var i = 0; i < particles.length; i += connStep) {
            var p = particles[i];
            var gx = Math.floor(p.px / gridSize);
            var gy = Math.floor(p.py / gridSize);
            var connections = 0;

            for (var dx = -1; dx <= 1 && connections < MAX_CONNECTIONS; dx++) {
                for (var dy = -1; dy <= 1 && connections < MAX_CONNECTIONS; dy++) {
                    var cell = grid[(gx + dx) + ',' + (gy + dy)];
                    if (!cell) continue;
                    for (var ci = 0; ci < cell.length && connections < MAX_CONNECTIONS; ci++) {
                        var j = cell[ci];
                        if (j <= i) continue;
                        var q = particles[j];
                        var ddx = p.px - q.px, ddy = p.py - q.py;
                        var distSq = ddx * ddx + ddy * ddy;
                        if (distSq < connDistSq) {
                            var dist = Math.sqrt(distSq);
                            var opacity = (1 - dist / connDist) * 0.15 * p.alpha;
                            ctx.strokeStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + opacity + ')';
                            ctx.beginPath();
                            ctx.moveTo(p.px, p.py);
                            ctx.lineTo(q.px, q.py);
                            ctx.stroke();
                            connections++;
                        }
                    }
                }
            }
        }

        } // end else (skip connections on small mobile)

        // Draw particles - simplified on mobile (no gradients), full glow on desktop
        if (isMobile) {
            // Mobile: simple filled circles, no radial gradients
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var depthScale = 0.6 + 0.4 * (p.depth * 0.5 + 0.5);
                var size = p.baseSize * depthScale;
                var alpha = p.alpha * depthScale;
                ctx.fillStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + alpha + ')';
                ctx.beginPath();
                ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Desktop: full glow with radial gradients
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var depthScale = 0.6 + 0.4 * (p.depth * 0.5 + 0.5);
                var size = p.baseSize * depthScale;
                var alpha = p.alpha * depthScale;
                var glowR = size * 2.5;

                var grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowR);
                grad.addColorStop(0, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + (alpha * 0.9) + ')');
                grad.addColorStop(0.4, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + (alpha * 0.3) + ')');
                grad.addColorStop(1, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.px, p.py, glowR, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
        }
    };

    // ── Bootstrap ──
    function boot() {
        var canvas = document.querySelector('.particles-canvas');
        if (!canvas) return;
        new AmericasParticles(canvas);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
