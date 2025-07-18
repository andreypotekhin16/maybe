export function setupSimpleCarousel() {
    const swiper = new Swiper('.simple-carousel', {
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        speed: 600,
        spaceBetween: 0,
        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
        
        // Адаптивность
        breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0
            }
        }
    });
}