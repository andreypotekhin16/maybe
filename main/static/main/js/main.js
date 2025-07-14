import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';

// Когда добавим карусель, здесь будет её импорт
// import { initCarousel } from './sections/carousel.js'; 

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем глобальные скрипты
    setupHeader();
    setupDynamicBackground();

    // Запускаем скрипты для секций (пока карусель закомментирована)
    // if (document.querySelector('.booking-swiper')) {
    //     initCarousel();
    // }
});