export function setupSimpleCarousel() {
    const carouselEl = document.querySelector('.simple-carousel');
    if (!carouselEl) return;

    const swiper = new Swiper(carouselEl, {
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        speed: 800, 
        spaceBetween: 0,
        
        
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


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
           
            if (entry.isIntersecting) {
                
                setTimeout(() => {
                    swiper.slideNext();
                }, 500);

                
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5 
    });

    
    observer.observe(carouselEl);
}