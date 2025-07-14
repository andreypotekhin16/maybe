// main/static/main/js/sections/carousel.js

export function initCarousel() {
    const swiper = new Swiper('.booking-carousel', {
        // Включаем эффект "coverflow" (3D)
        effect: 'coverflow',
        grabCursor: true,      // Курсор в виде "руки"
        centeredSlides: true,  // Активный слайд всегда по центру
        slidesPerView: 'auto', // Автоматически определять кол-во слайдов
        loop: true,            // Бесконечная прокрутка

        // Настройки для эффекта
        coverflowEffect: {
            rotate: 40,        // Угол поворота боковых слайдов
            stretch: 0,
            depth: 100,        // Глубина (расстояние)
            modifier: 1,
            slideShadows: false, // Отключаем тени, чтобы было чище
        },

        // Подключаем кнопки навигации
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}