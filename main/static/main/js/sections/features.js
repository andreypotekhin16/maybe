// START OF FILE: main/static/main/js/sections/features.js

export function setupFeaturesCarousel() {
    let swiperInstance = null;
    const mediaQuery = window.matchMedia('(max-width: 992px)');

    function initSwiper(isMobile) {
        if (isMobile && !swiperInstance) {
            swiperInstance = new Swiper('.features-carousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                
                // --- ДОБАВЛЯЕМ ЭТУ СТРОЧКУ ---
                observer: true, // Заставляет Swiper обновиться, если он был скрыт
                
                pagination: {
                    el: '.features-pagination',
                    clickable: true,
                },

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