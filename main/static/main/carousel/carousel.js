// main/static/main/carousel/carousel.js

// Оборачиваем код в 'DOMContentLoaded', чтобы скрипт сработал после полной загрузки HTML.
document.addEventListener('DOMContentLoaded', function() {
    
    // Функция для настройки и инициализации карусели
    function setupSwiper() {
        const swiperContainer = document.querySelector('.booking-swiper');
        // Проверяем, существует ли элемент карусели на странице
        if (swiperContainer) {
            const slides = swiperContainer.querySelectorAll('.swiper-slide');
            
            new Swiper(swiperContainer, {
                loop: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                // Эта опция помогает Swiper корректно создавать дубликаты
                // для зацикливания, когда реальных слайдов мало.
                loopAdditionalSlides: slides.length < 5 ? 5 : slides.length,
                
                // Расстояние между слайдами. Основной эффект сжатия
                // достигается через CSS-трансформации.
                spaceBetween: 0,
                
                // Навигация и пагинация полностью отключены для минималистичного вида.
                pagination: false, 
                navigation: false,
            });
        }
    }

    // Вызываем нашу функцию
    setupSwiper();

});