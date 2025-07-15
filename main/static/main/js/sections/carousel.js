// main/static/main/js/sections/carousel.js
// --- ФИНАЛЬНАЯ ВЕРСИЯ JS ---

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
        // Включаем бесконечную прокрутку
        loop: true,
        
        // Указываем, что в видимой области всегда 3 слайда
        slidesPerView: 3,
        
        // Активный слайд всегда будет по центру
        centeredSlides: true,
        
        // Курсор-рука при наведении
        grabCursor: true,
        
        // Скорость анимации перехода
        speed: 600,

        // Отступы между "слотами" слайдов. Ноль - лучший вариант для нашего случая.
        spaceBetween: 0,

        // Навигация (стрелки)
        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}