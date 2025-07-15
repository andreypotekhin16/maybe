// main/static/main/js/sections/carousel.js

export function initCarousel() {
    const swiper = new Swiper('.booking-carousel', {
        // --- ОСНОВНЫЕ ПАРАМЕТРЫ ---

        slidesPerView: 3,
        // Отступ между слайдами
        spaceBetween: 30,
        // Бесконечная прокрутка
        loop: true,

        // --- УПРАВЛЕНИЕ ---

        // Включить пагинацию (точки)
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Точки можно нажимать для перемотки
        },

        // Включить навигацию (стрелки)
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}