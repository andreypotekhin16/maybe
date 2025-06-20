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
    const bookingSwiper = new Swiper('.booking-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        
        // ВАЖНО: Устанавливаем 3, чтобы был один центральный слайд и два по бокам, как на вашем дизайне.
        // С четным числом (например, 2) эффект coverflow с центрированием работает некорректно.
        slidesPerView: 3, 
        
        loop: true,
        slideToClickedSlide: true,

        // Настройки для эффекта "coverflow"
        coverflowEffect: {
            rotate: 0,
            
            // Это расстояние между слайдами. Отрицательное значение сближает их.
            stretch: -30, 
            
            depth: 100, 
            modifier: 1,
            
            // Это масштаб боковых слайдов. 0.7 = 70% от размера центрального (на 30% меньше).
            scale: 0.7, 
            
            slideShadows: false, 
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});