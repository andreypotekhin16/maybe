export function initCarousel() {
    const swiper = new Swiper('.booking-carousel', {
        // Указываем, что активный слайд по центру
        centeredSlides: true,
        
        // Показываем по 3 слайда
        slidesPerView: 3,
        
        // Включаем бесконечную прокрутку
        loop: true,
        
        // Расстояние между слайдами, можно подбирать
        spaceBetween: 20, 

        // Подключаем кнопки навигации
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Чтобы карусель работала и при малом количестве слайдов
        loopPreventsSliding: false, 
    });
}