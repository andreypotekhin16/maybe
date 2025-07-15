// main/static/main/js/sections/carousel.js

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        
        // --- ВОТ ЭТА СТРОКА ---
        loop: true, // Включаем бесконечную прокрутку
        // ----------------------
        
        coverflowEffect: {
            rotate: 0,
            stretch: 40,
            depth: 150,
            modifier: 1,
            slideShadows: false,
        },

        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}