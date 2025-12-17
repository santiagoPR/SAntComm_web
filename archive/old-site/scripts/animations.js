// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach(stat => {
    observer.observe(stat);
});

// Parallax effect for hero background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.hero-background img');

    if (parallaxElement) {
        const yPos = -(scrolled * 0.5);
        parallaxElement.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });
