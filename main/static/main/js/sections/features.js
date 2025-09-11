

export function setupFeaturesCarousel() {
   
    let swiperInstance = null;
    const mediaQuery = window.matchMedia('(max-width: 992px)');

    function initSwiper(isMobile) {
        if (isMobile && !swiperInstance) {
            // Если экран мобильный и Swiper еще не запущен - запускаем
            swiperInstance = new Swiper('.features-carousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.features-pagination',
                    clickable: true,
                },
            });
        } else if (!isMobile && swiperInstance) {
            // Если экран стал десктопным и Swiper был запущен - уничтожаем его
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    }

    // Проверяем состояние при первой загрузке
    initSwiper(mediaQuery.matches);

    // Добавляем слушателя, чтобы Swiper включался/выключался при изменении размера окна
    mediaQuery.addEventListener('change', (event) => {
        initSwiper(event.matches);
    });
}