// main/static/main/js/sections/carousel.js

export function setupSimpleCarousel() {
    
    const swiper = new Swiper('.simple-carousel', {
        
        // 1. ОТКЛЮЧАЕМ ВСТРОЕННЫЙ ЭФФЕКТ
        // effect: 'coverflow', // <<-- УДАЛЕНО

        // 2. Оставляем базовые настройки
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        grabCursor: true,
        
        // 3. Устанавливаем скорость анимации
        speed: 600, // Плавный переход

        // 4. Добавляем отступы, чтобы слайды не слипались
        spaceBetween: 0,

        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
    });
}