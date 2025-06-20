document.addEventListener('DOMContentLoaded', function() {
    
    // --- Логика для шапки (появление/скрытие при скролле) ---
    const siteHeader = document.getElementById('site-header');
    let lastScrollTop = 0;
    const scrollDelta = 10; 
    const showHeaderOffset = 150; 

    if (siteHeader) {
        if (window.scrollY <= showHeaderOffset || (document.body.scrollHeight <= window.innerHeight)) {
            siteHeader.classList.add('header-visible');
        }
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY;
            if (Math.abs(lastScrollTop - scrollTop) <= scrollDelta) return;
            if (scrollTop > lastScrollTop && scrollTop > showHeaderOffset) {
                siteHeader.classList.remove('header-visible');
            } else {
                if (scrollTop + window.innerHeight < document.documentElement.scrollHeight || scrollTop <= showHeaderOffset) {
                    siteHeader.classList.add('header-visible');
                }
            }
            if (scrollTop <= scrollDelta) { 
                 siteHeader.classList.add('header-visible');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        }, false);
    } else {
        console.warn("Элемент шапки с ID 'site-header' не найден.");
    }

    
    // --- Код для бургер-меню ---
    const burgerMenuButton = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('#site-header .main-nav'); 

    if (burgerMenuButton && mainNav) {
        burgerMenuButton.addEventListener('click', function() {
            mainNav.classList.toggle('active'); 
            burgerMenuButton.classList.toggle('active'); 
        });
    } else {
        if (!burgerMenuButton) console.warn("Burger menu button '.burger-menu' не найден.");
        if (!mainNav) console.warn("Main navigation '#site-header .main-nav' для бургер-меню не найдена.");
    }


    // --- Инициализация Swiper-карусели для секции "Запись на игру" ---
    const swiperContainer = document.querySelector('.booking-swiper');

    const bookingSwiper = new Swiper(swiperContainer, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3, 
        loop: true,
        slideToClickedSlide: true,

        // Настройки для эффекта "coverflow"
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
                swiperContainer.classList.add('swiper-no-transition');
            },
            slideChangeTransitionStart: function() {
                swiperContainer.classList.remove('swiper-no-transition');
            },
        },
    });

    // --- Логика для интерактивности слайдов при наведении ---
    const navPrev = document.querySelector('.booking-carousel-nav-prev');
    const navNext = document.querySelector('.booking-carousel-nav-next');
    
    // Флаги для отслеживания положения мыши
    let isMouseOverNavPrev = false;
    let isMouseOverNavNext = false;

    // Функция для применения эффекта наведения
    const applyHoverEffects = () => {
        // Убираем все старые эффекты
        document.querySelectorAll('.is-hovered, .is-dimmed').forEach(el => {
            el.classList.remove('is-hovered', 'is-dimmed');
        });
        
        // Применяем новые на основе положения мыши
        if (isMouseOverNavPrev) {
            swiperContainer.querySelector('.swiper-slide-prev')?.classList.add('is-hovered');
            swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
        } else if (isMouseOverNavNext) {
            swiperContainer.querySelector('.swiper-slide-next')?.classList.add('is-hovered');
            swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
        }
    };
    
    if (navPrev && navNext && swiperContainer) {
        navPrev.addEventListener('mouseenter', () => {
            isMouseOverNavPrev = true;
            applyHoverEffects();
        });
        navPrev.addEventListener('mouseleave', () => {
            isMouseOverNavPrev = false;
            applyHoverEffects();
        });

        navNext.addEventListener('mouseenter', () => {
            isMouseOverNavNext = true;
            applyHoverEffects();
        });
        navNext.addEventListener('mouseleave', () => {
            isMouseOverNavNext = false;
            applyHoverEffects();
        });

        // После каждой смены слайда переприменяем эффекты, чтобы восстановить их, если курсор не двигался
        bookingSwiper.on('slideChangeTransitionEnd', applyHoverEffects);
    }

});