// main/static/main/js/sections/carousel.js

// Мы оставляем название функции, чтобы main.js мог ее вызвать
export function setupSimpleCarousel() {
    
    // Но внутри инициализируем Swiper с эффектом 'coverflow'
    const swiper = new Swiper('.simple-carousel', { // <-- Указываем класс, который ищет main.js
        
        // --- Настройки для эффекта Coverflow ---
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        
        coverflowEffect: {
            rotate: 0,
            stretch: -20,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
        },

        // --- Навигация ---
        navigation: {
            // Классы стрелок берем из нового HTML
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}