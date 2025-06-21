document.addEventListener('DOMContentLoaded', function() {
    
    function setupHeader() {
        const siteHeader = document.getElementById('site-header');
        if (!siteHeader) return;
        const scrollThreshold = 100;
        const activeThreshold = 10;

        function handleScroll() {
            const scrollY = window.scrollY;
            siteHeader.classList.toggle('header-active', scrollY > activeThreshold);
            siteHeader.classList.toggle('header-collapsed', scrollY > scrollThreshold);
        }
    
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        siteHeader.addEventListener('mouseenter', () => {
            siteHeader.classList.add('header-active');
            siteHeader.classList.remove('header-collapsed');
        });
    
        siteHeader.addEventListener('mouseleave', () => {
             handleScroll();
        });
        
        handleScroll();
    }

    function setupDynamicBackground() {
        const body = document.body;
        const settings = body.dataset;
        if (settings.backgroundEnabled !== 'true') return;

        const bgContainer = document.getElementById('animated-background-container');
        if (!bgContainer) return;

        // 1. Настраиваем фон на body и паттерн
        const patternEl = document.getElementById('background-pattern');
        if (patternEl) {
            body.style.backgroundColor = settings.bgColor;
            if (settings.patternUrl) {
                patternEl.style.backgroundImage = `url('${settings.patternUrl}')`;
                patternEl.style.backgroundSize = settings.patternSize;
                patternEl.style.opacity = settings.patternOpacity;
            }
        }
        
        // 2. Находим все объекты и делим их на параллакс и просто анимированные
        const objectPlaceholders = document.querySelectorAll('.background-object-placeholder');
        const parallaxObjects = [];

        objectPlaceholders.forEach(placeholder => {
            const data = placeholder.dataset;
            const objDiv = document.createElement('div');
            objDiv.className = 'background-object';
            
            objDiv.style.backgroundImage = `url('${data.imageUrl}')`;
            objDiv.style.width = `${data.width}px`;
            objDiv.style.height = `${data.width}px`;
            objDiv.style.top = data.top;
            objDiv.style.left = data.left;
            objDiv.style.zIndex = data.zIndex;
            objDiv.style.opacity = data.opacity;
            
            // Проверяем, это параллакс-объект или просто анимированный
            if (data.parallaxTargetId) {
                objDiv.style.position = 'absolute'; // Параллакс-объекты имеют абсолютное позиционирование
                parallaxObjects.push({
                    element: objDiv,
                    speed: parseFloat(data.parallaxSpeed) || 0,
                    initialTop: parseFloat(data.top) // предполагаем, что это проценты
                });
            } else {
                objDiv.style.position = 'fixed'; // Обычные объекты остаются на месте
                const animDuration = parseInt(data.animDuration, 10);
                if (animDuration > 0) {
                    objDiv.style.animation = `floatAnimation ${animDuration}s ease-in-out ${data.animDelay || 0}s infinite`;
                }
            }

            bgContainer.appendChild(objDiv);
            placeholder.remove();
        });

        // 3. Запускаем обработчик скролла для параллакса
        if (parallaxObjects.length > 0) {
            function handleParallax() {
                const scrollY = window.scrollY;
                parallaxObjects.forEach(obj => {
                    const translateY = obj.initialTop + (-scrollY * obj.speed / 10); // /10 для более мягкого эффекта
                    obj.element.style.transform = `translate(-50%, ${translateY}%)`;
                });
            }
            window.addEventListener('scroll', handleParallax, { passive: true });
            handleParallax(); 
        }
    }

    function setupSwiper() {
        const swiperContainer = document.querySelector('.booking-swiper');
        if (swiperContainer) {
            new Swiper(swiperContainer, {
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
            });
        }
    }

    // Вызываем все функции
    setupHeader();
    setupDynamicBackground();
    setupSwiper();
});