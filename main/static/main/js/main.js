import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { setupSimpleCarousel } from './sections/carousel.js'; 
import { initBubbleGallery } from './sections/gallery.js';

function setupMobileNav() {
    const toggleButton = document.getElementById('mobile-nav-toggle');
    const mobilePanel = document.getElementById('mobile-nav-panel');
    
    if (!toggleButton || !mobilePanel) return;

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-open');
    });

    const navLinks = mobilePanel.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('mobile-nav-open');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();
    setupMobileNav();

    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
    
    if (document.querySelector('.bubble-container')) {
        initBubbleGallery();
    }
});