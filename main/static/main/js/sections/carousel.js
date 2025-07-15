// main/static/main/js/sections/carousel.js

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto', // 'auto' лучше всего подходит для coverflow
        loop: true,
        
        // Немного меняем настройки для круглых слайдов
        coverflowEffect: {
            rotate: 0,
            stretch: 50,  // << Увеличиваем расстояние между слайдами
            depth: 150, // << Увеличиваем глубину для объема
            modifier: 1,
            slideShadows: false,
        },

        navigation: {
            // Пути к кнопкам не меняем, они остались прежними
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}