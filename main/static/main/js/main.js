document.addEventListener('DOMContentLoaded', function() {
    
    // --- Логика для шапки ---
    const siteHeader = document.getElementById('site-header');
    const mainContent = document.getElementById('main-content');
    
    const scrollThreshold = 100; // Порог скролла, после которого хедер начинает сворачиваться
    let lastScrollTop = 0;

    // Функция для динамического добавления отступа для контента
    function updateMainContentPadding() {
        const headerHeight = siteHeader.offsetHeight;
        mainContent.style.paddingTop = `${headerHeight}px`;
    }

    // Отслеживаем изменение размера хедера
    const headerObserver = new ResizeObserver(() => {
        updateMainContentPadding();
    });

    if (siteHeader && mainContent) {
        headerObserver.observe(siteHeader);
    }
    
    // Функция для управления состоянием хедера при скролле
    function handleScroll() {
        let scrollTop = window.scrollY;

        // Показываем/скрываем хедер в зависимости от направления скролла
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold * 2) {
            siteHeader.classList.remove('header-visible');
        } else {
            siteHeader.classList.add('header-visible');
        }

        // Сворачиваем/разворачиваем
        if (scrollTop > scrollThreshold) {
            siteHeader.classList.add('header-collapsed');
        } else {
            siteHeader.classList.remove('header-collapsed');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Первоначальная установка состояния
    siteHeader.classList.add('header-visible'); 
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, false);
    
    // Наведение на хедер для раскрытия
    siteHeader.addEventListener('mouseenter', () => {
        siteHeader.classList.remove('header-collapsed');
    });

    siteHeader.addEventListener('mouseleave', () => {
         if(window.scrollY > scrollThreshold) {
            siteHeader.classList.add('header-collapsed');
        }
    });
    
    // --- Инициализация Swiper-карусели для секции "Запись на игру" ---
    const swiperContainer = document.querySelector('.booking-swiper');

    if (swiperContainer) {
        const bookingSwiper = new Swiper(swiperContainer, {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 3, 
            loop: true,
            slideToClickedSlide: true,

            coverflowEffect: {
                rotate: 0,
                stretch: -150, 
                depth: 100, 
                modifier: 1,
                scale: 0.7, 
                slideShadows: false, 
            },

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.booking-carousel-nav-next',
                prevEl: '.booking-carousel-nav-prev',
            },

            on: {
                loopFix: function () {
                    if(swiperContainer) swiperContainer.classList.add('swiper-no-transition');
                },
                slideChangeTransitionStart: function() {
                    if(swiperContainer) swiperContainer.classList.remove('swiper-no-transition');
                },
            },
        });

        const navPrev = document.querySelector('.booking-carousel-nav-prev');
        const navNext = document.querySelector('.booking-carousel-nav-next');
        
        let isMouseOverNavPrev = false;
        let isMouseOverNavNext = false;

        const applyHoverEffects = () => {
            document.querySelectorAll('.is-hovered, .is-dimmed').forEach(el => {
                el.classList.remove('is-hovered', 'is-dimmed');
            });
            
            if (isMouseOverNavPrev) {
                swiperContainer.querySelector('.swiper-slide-prev')?.classList.add('is-hovered');
                swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
            } else if (isMouseOverNavNext) {
                swiperContainer.querySelector('.swiper-slide-next')?.classList.add('is-hovered');
                swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
            }
        };
        
        if (navPrev && navNext) {
            navPrev.addEventListener('mouseenter', () => { isMouseOverNavPrev = true; applyHoverEffects(); });
            navPrev.addEventListener('mouseleave', () => { isMouseOverNavPrev = false; applyHoverEffects(); });
            navNext.addEventListener('mouseenter', () => { isMouseOverNavNext = true; applyHoverEffects(); });
            navNext.addEventListener('mouseleave', () => { isMouseOverNavNext = false; applyHoverEffects(); });
            bookingSwiper.on('slideChangeTransitionEnd', applyHoverEffects);
        }
    }
});