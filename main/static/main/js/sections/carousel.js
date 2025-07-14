// main/static/main/js/sections/carousel.js

export function initCarousel() {
    const swiper = new Swiper('.booking-carousel', {
        // Главное изменение: явно указываем, что хотим видеть 3 слайда
        slidesPerView: 3,
        
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true, // Включаем бесконечную прокрутку

        // Расстояние между слайдами
        spaceBetween: -30, 

        // Настройки для эффекта
        coverflowEffect: {
            rotate: 0,       // Убираем поворот, чтобы слайды были прямыми
            stretch: 0,
            depth: 150,      // Глубина (расстояние)
            modifier: 1,
            slideShadows: false, // Отключаем тени
        },

        // Подключаем кнопки навигации, которые теперь вне карусели
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}