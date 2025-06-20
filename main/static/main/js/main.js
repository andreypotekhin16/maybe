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

    // --- Логика для увеличения боковых и затемнения центрального слайда при наведении ---
    const navPrev = document.querySelector('.booking-carousel-nav-prev');
    const navNext = document.querySelector('.booking-carousel-nav-next');

    if (navPrev && navNext && swiperContainer) {
        // Наведение на левую область
        navPrev.addEventListener('mouseenter', () => {
            swiperContainer.querySelector('.swiper-slide-prev')?.classList.add('is-hovered');
            // ИЗМЕНЕНИЕ: Затемняем центральный слайд
            swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
        });
        // Увод курсора с левой области
        navPrev.addEventListener('mouseleave', () => {
            swiperContainer.querySelector('.swiper-slide-prev')?.classList.remove('is-hovered');
            // ИЗМЕНЕНИЕ: Возвращаем яркость центральному слайду
            swiperContainer.querySelector('.swiper-slide-active')?.classList.remove('is-dimmed');
        });

        // Наведение на правую область
        navNext.addEventListener('mouseenter', () => {
            swiperContainer.querySelector('.swiper-slide-next')?.classList.add('is-hovered');
            // ИЗМЕНЕНИЕ: Затемняем центральный слайд
            swiperContainer.querySelector('.swiper-slide-active')?.classList.add('is-dimmed');
        });
        // Увод курсора с правой области
        navNext.addEventListener('mouseleave', () => {
            swiperContainer.querySelector('.swiper-slide-next')?.classList.remove('is-hovered');
            // ИЗМЕНЕНИЕ: Возвращаем яркость центральному слайду
            swiperContainer.querySelector('.swiper-slide-active')?.classList.remove('is-dimmed');
        });

        // Также нужно убирать классы при смене слайда, на всякий случай
        bookingSwiper.on('slideChange', function() {
            document.querySelectorAll('.booking-carousel-item.is-hovered').forEach(el => {
                el.classList.remove('is-hovered');
            });
            document.querySelectorAll('.booking-carousel-item.is-dimmed').forEach(el => {
                el.classList.remove('is-dimmed');
            });
        });
    }

});