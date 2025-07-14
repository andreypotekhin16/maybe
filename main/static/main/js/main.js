import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
// 1. ИМПОРТИРУЕМ ФУНКЦИЮ ИЗ НОВОГО ФАЙЛА
import { initCarousel } from './sections/carousel.js'; 

document.addEventListener('DOMContentLoaded', function() {
    // Запускаем глобальные скрипты
    setupHeader();
    setupDynamicBackground();

    // 2. ИЩЕМ НАШУ КАРУСЕЛЬ И ЗАПУСКАЕМ ЕЕ
    if (document.querySelector('.booking-carousel')) {
        initCarousel();
    }
});