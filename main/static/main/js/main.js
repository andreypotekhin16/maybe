import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { setupSimpleCarousel } from './sections/carousel.js'; 
import { initVoronoiGallery } from './sections/gallery.js';

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
    
    if (document.querySelector('.voronoi-gallery-container')) {
        initVoronoiGallery();
    }
});