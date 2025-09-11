import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { setupSimpleCarousel } from './sections/carousel.js'; 
import { initBubbleGallery } from './sections/gallery.js';
// import { setupFeaturesCarousel } from './sections/features.js'; // <-- УДАЛЯЕМ ЭТУ СТРОКУ

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
    
    if (document.querySelector('.bubble-container')) {
        initBubbleGallery();
    }

    /*
    // И УДАЛЯЕМ ЭТОТ БЛОК
    if (document.querySelector('.features-carousel')) {
        setupFeaturesCarousel();
    }
    */
});