// main/static/main/js/sections/carousel.js

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
        // --- ПАРАМЕТРЫ ДЛЯ ПЛАВНОСТИ ---

        // 1. Увеличиваем время анимации (в миллисекундах).
        // Стандартно: 300. Чем выше значение, тем медленнее и плавнее.
        speed: 300, // Попробуем 800 мс

        // 2. Улучшаем отслеживание прогресса для более точной анимации
        watchSlidesProgress: true,


        // --- Основные настройки (остаются прежними) ---
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true, 

        coverflowEffect: {
            rotate: 0,
            // 3. Немного уменьшаем "размах" боковых слайдов, чтобы сделать движение менее агрессивным
            stretch: 40,  // Было: 80
            depth: 120, // Было: 150
            modifier: 1,
            slideShadows: false,
        },

        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}