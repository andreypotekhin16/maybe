document.addEventListener('DOMContentLoaded', function() {
    
    function setupHeader() {
        const siteHeader = document.getElementById('site-header');
        if (!siteHeader) return;
        const scrollThreshold = 100;
        function handleScroll() {
            siteHeader.classList.toggle('header-collapsed', window.scrollY > scrollThreshold);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        siteHeader.addEventListener('mouseenter', () => siteHeader.classList.remove('header-collapsed'));
        siteHeader.addEventListener('mouseleave', () => handleScroll());
        handleScroll();
    }

    function setupDynamicBackground() {
        const body = document.body;
        const settings = body.dataset;
        if (settings.backgroundEnabled !== 'true') return;

        const bgContainer = document.getElementById('animated-background-container');
        if (!bgContainer) return;

        // 1. Настраиваем статичный фон
        const patternEl = document.getElementById('background-pattern');
        if (patternEl && settings.patternUrl) {
            body.style.backgroundColor = settings.bgColor;
            patternEl.style.backgroundImage = `url('${settings.patternUrl}')`;
            patternEl.style.backgroundSize = settings.patternSize;
            patternEl.style.opacity = settings.patternOpacity;
        }

        // 2. Находим все объекты и делим их на параллакс и обычные
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
                const targetSection = document.getElementById(data.parallaxTargetId);
                if (targetSection) {
                    parallaxObjects.push({
                        element: objDiv,
                        speed: parseFloat(data.parallaxSpeed) || 0,
                        target: targetSection
                    });
                }
            } else {
                const animDuration = parseInt(data.animDuration, 10);
                if (animDuration > 0) {
                    objDiv.style.animation = `floatAnimation ${animDuration}s ease-in-out ${data.animDelay}s infinite`;
                }
            }

            bgContainer.appendChild(objDiv);
            placeholder.remove();
        });

        // 3. Запускаем обработчик скролла для параллакса, если есть такие объекты
        if (parallaxObjects.length > 0) {
            function handleParallax() {
                const scrollY = window.scrollY;
                parallaxObjects.forEach(obj => {
                    const translateY = -scrollY * obj.speed;
                    obj.element.style.transform = `translate(-50%, -50%) translateY(${translateY}px)`;
                });
            }
            window.addEventListener('scroll', handleParallax, { passive: true });
            handleParallax(); // Вызываем один раз для начальной позиции
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