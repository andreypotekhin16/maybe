import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { initCarousel } from './sections/carousel.js'; 

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    // Ищем нашу карусель и запускаем ее
    if (document.querySelector('.booking-carousel')) {
        initCarousel();
    }
});