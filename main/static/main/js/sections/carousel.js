export function initCarousel() {
    const swiper = new Swiper('.booking-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto', // 'auto' лучше работает с coverflow
        loop: true,
        
        coverflowEffect: {
            rotate: 0,
            stretch: -20, // Небольшое растяжение для эффекта
            depth: 100,
            modifier: 1.5, // Увеличиваем модификатор для более выраженного эффекта
            slideShadows: false,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}