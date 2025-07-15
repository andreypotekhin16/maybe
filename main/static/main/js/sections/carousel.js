// ---- НОВАЯ ВЕРСИЯ СКРИПТА от [текущее время] ----
// ---- Если вы видите этот комментарий, файл обновился ----

// Функция для запуска нашей карусели
export function setupSimpleCarousel() {
    
    // Выводим сообщение в консоль, чтобы убедиться, что наш скрипт работает
    console.log("ЗАПУСК ИНИЦИАЛИЗАЦИИ НОВОЙ ВЕРСИИ КАРУСЕЛИ!");

    // Инициализируем Swiper
    const carouselInstance = new Swiper('.simple-carousel', {
        // Настройки карусели
        
        // 1. Поведение прокрутки
        loop: true, // Бесконечный цикл
        slidesPerView: 3, // Показывать по одному слайду
        
        // 2. Управление
        navigation: {
            nextEl: '.my-awesome-carousel-wrapper .swiper-button-next',
            prevEl: '.my-awesome-carousel-wrapper .swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // 3. Автопрокрутка (для примера)
        autoplay: {
            delay: 5000, // Каждые 5 секунд
            disableOnInteraction: false, // Не останавливать после ручного переключения
        },
    });
}