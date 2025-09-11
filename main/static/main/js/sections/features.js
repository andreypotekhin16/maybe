// START OF FILE: main/static/main/js/sections/features.js

export function setupFeaturesCarousel() {
    let swiperInstance = null;
    const mediaQuery = window.matchMedia('(max-width: 992px)');

    function initSwiper(isMobile) {
        if (isMobile && !swiperInstance) {
            swiperInstance = new Swiper('.features-carousel', {
                // Это самая простая конфигурация
                slidesPerView: 1,
                spaceBetween: 20,
                // Бесконечная прокрутка отключена по умолчанию
                
                // Подключаем пагинацию
                pagination: {
                    el: '.features-pagination',
                    clickable: true,
                },

                // Подключаем стрелки
                navigation: {
                    nextEl: '.features-next',
                    prevEl: '.features-prev',
                },
            });
        } else if (!isMobile && swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    }

    initSwiper(mediaQuery.matches);
    mediaQuery.addEventListener('change', (event) => {
        initSwiper(event.matches);
    });
}