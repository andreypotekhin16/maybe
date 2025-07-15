
// 1. Импортируем все необходимые модули
import { setupHeader } from './global/header.js'; // Отвечает за анимацию шапки
import { setupDynamicBackground } from './global/background.js'; // Отвечает за анимацию фона
import { initCarousel } from './sections/carousel.js'; // Отвечает за карусель

// 2. Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', function() {

    // 3. Запускаем каждую анимацию и выводим сообщение в консоль для проверки
    console.log("Запускаем анимацию шапки...");
    setupHeader();

    console.log("Запускаем анимацию фона...");
    setupDynamicBackground();

    console.log("Проверяем наличие карусели...");
    // Запускаем карусель, только если она есть на странице
    if (document.querySelector('.booking-carousel')) {
        console.log("Карусель найдена, запускаем...");
        initCarousel();
    }
});