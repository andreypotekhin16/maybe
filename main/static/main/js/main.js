import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { setupSimpleCarousel } from './sections/carousel.js'; 
import { initBubbleGallery } from './sections/gallery.js'; // Используем правильное имя

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
    
    // Вызываем нашу функцию для пузырей
    if (document.querySelector('.bubble-container')) {
        initBubbleGallery();
    }
});