import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
// Название импортируемой функции изменено
import { setupSimpleCarousel } from './sections/carousel.js'; 

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    // Ищем контейнер с новым классом и вызываем новую функцию
    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
});