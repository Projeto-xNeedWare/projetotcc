// Scroll animation
const fadeElements = document.querySelectorAll('.fade-in-scroll');

const fadeInScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

// Initial check
fadeInScroll();

// Check on scroll
window.addEventListener('scroll', fadeInScroll);

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();