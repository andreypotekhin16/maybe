import { setupHeader } from './global/header.js';
import { setupDynamicBackground } from './global/background.js';
import { setupSimpleCarousel } from './sections/carousel.js'; 
import { initBubbleGallery } from './sections/gallery.js';

document.addEventListener('DOMContentLoaded', function() {
    setupHeader();
    setupDynamicBackground();

    if (document.querySelector('.simple-carousel')) {
        setupSimpleCarousel();
    }
    
    if (document.querySelector('.bubble-container')) {
        initBubbleGallery();
    }
});```

---

### Шаг 4: Файл `main/static/main/js/global/header.js`

**Что нового:** Полностью новая логика, которая управляет как поведением шапки при скролле на десктопе, так и раскрывающимся меню по клику на мобильных.

```javascript
export function setupHeader() {
    const siteHeader = document.getElementById('site-header');
    if (!siteHeader) return;

    const scrollThreshold = 100;
    const activeThreshold = 10;
    const isMobile = () => window.innerWidth <= 992;

    function handleDesktopScroll() {
        if (isMobile()) {
            // На мобильных убираем классы скролла, чтобы они не мешали
            siteHeader.classList.remove('header-active', 'header-collapsed');
            return;
        }
        const scrollY = window.scrollY;
        siteHeader.classList.toggle('header-active', scrollY > activeThreshold);
        siteHeader.classList.toggle('header-collapsed', scrollY > scrollThreshold);
    }

    siteHeader.addEventListener('click', (event) => {
        if (!isMobile()) return;
        
        if (event.target.closest('a')) {
            siteHeader.classList.remove('mobile-menu-open');
            return;
        }
        siteHeader.classList.toggle('mobile-menu-open');
    });

    document.addEventListener('click', (event) => {
        if (!isMobile() || !siteHeader.classList.contains('mobile-menu-open')) return;
        
        if (!siteHeader.contains(event.target)) {
            siteHeader.classList.remove('mobile-menu-open');
        }
    });

    window.addEventListener('scroll', handleDesktopScroll, { passive: true });
    window.addEventListener('resize', () => {
        // При изменении размера окна, если мы перешли на десктоп, закрываем мобильное меню
        if (!isMobile()) {
            siteHeader.classList.remove('mobile-menu-open');
        }
        handleDesktopScroll();
    });

    handleDesktopScroll();
}