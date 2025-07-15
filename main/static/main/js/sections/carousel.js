// main/static/main/js/sections/carousel.js

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
       
        speed: 300, 

      
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