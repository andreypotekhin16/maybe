export function setupSimpleCarousel() {
    const carouselEl = document.querySelector('.simple-carousel');
    if (!carouselEl) return;

    const swiper = new Swiper(carouselEl, {
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        speed: 800, // Чуть медленнее для плавности
        spaceBetween: 0,
        
        // --- ИЗМЕНЕНИЕ 1: Добавляем пагинацию ---
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.carousel-wrapper .swiper-button-next',
            prevEl: '.carousel-wrapper .swiper-button-prev',
        },
        
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

    // --- ИЗМЕНЕНИЕ 2: Логика "подсказки" при скролле ---
    // Создаем "наблюдателя", который следит за появлением карусели на экране
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если карусель появилась в видимой области
            if (entry.isIntersecting) {
                // Ждем полсекунды и плавно листаем на следующий слайд
                setTimeout(() => {
                    swiper.slideNext();
                }, 500);

                // После этого отключаем наблюдателя, чтобы это сработало только один раз
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5 // Сработает, когда хотя бы 50% карусели видно
    });

    // Начинаем наблюдать за элементом карусели
    observer.observe(carouselEl);
}