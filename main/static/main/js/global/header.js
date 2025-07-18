export function setupHeader() {
    const siteHeader = document.getElementById('site-header');
    const toggleButton = document.getElementById('mobile-nav-toggle');
    const mobileDropdown = document.getElementById('mobile-nav-dropdown');
    const desktopNav = document.querySelector('.main-nav');

    if (!siteHeader || !toggleButton || !mobileDropdown || !desktopNav) return;

    // 1. Копируем навигацию в мобильный выпадающий блок
    mobileDropdown.innerHTML = desktopNav.innerHTML;

    const scrollThreshold = 100;
    const activeThreshold = 10;
    const isMobile = () => window.innerWidth <= 992;

    // 2. Логика для скролла на ДЕСКТОПЕ
    function handleDesktopScroll() {
        if (isMobile()) {
            siteHeader.classList.remove('header-active', 'header-collapsed');
            return;
        }
        const scrollY = window.scrollY;
        siteHeader.classList.toggle('header-active', scrollY > activeThreshold);
        siteHeader.classList.toggle('header-collapsed', scrollY > scrollThreshold);
    }

    // 3. Логика для клика на кнопку-бургер
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        siteHeader.classList.toggle('mobile-menu-open');
        document.body.classList.toggle('mobile-menu-open');
    });
    
    // 4. Логика для закрытия меню
    const closeMobileMenu = () => {
        siteHeader.classList.remove('mobile-menu-open');
        document.body.classList.remove('mobile-menu-open');
    };

    // Закрываем при клике на ссылку в меню
    mobileDropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Закрываем при клике вне шапки
    document.addEventListener('click', (event) => {
        if (isMobile() && siteHeader.classList.contains('mobile-menu-open')) {
            if (!siteHeader.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });

    // 5. Инициализация и обработка изменения размера окна
    window.addEventListener('scroll', handleDesktopScroll, { passive: true });
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeMobileMenu();
        }
        handleDesktopScroll();
    });
    
    handleDesktopScroll();
}