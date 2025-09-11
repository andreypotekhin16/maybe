// START OF FILE: main/static/main/js/sections/features.js

export function setupFeaturesCarousel() {
    let swiperInstance = null;
    const mediaQuery = window.matchMedia('(max-width: 992px)');

    function initSwiper(isMobile) {
        if (isMobile && !swiperInstance) {
            swiperInstance = new Swiper('.features-carousel', {
                // --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
                slidesPerView: 2, // Показываем по 2 слайда (преимущества) на экране
                spaceBetween: 10, // Небольшой отступ между ними
                
                pagination: {
                    el: '.features-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.features-next',
                    prevEl: '.features-prev',
                },
                
                // Добавим адаптивность для самых маленьких экранов
                breakpoints: {
                    // Ширина < 576px
                    320: {
                        slidesPerView: 1, // Показываем по одному
                        spaceBetween: 10
                    },
                    // Ширина >= 576px
                    576: {
                        slidesPerView: 2, // Показываем по два
                        spaceBetween: 10
                    }
                }
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