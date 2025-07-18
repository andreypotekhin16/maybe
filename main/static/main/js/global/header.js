export function setupHeader() {
    const siteHeader = document.getElementById('site-header');
    const mobileDropdown = document.getElementById('mobile-nav-dropdown');
    const desktopNav = document.querySelector('.main-nav');

    if (!siteHeader || !mobileDropdown || !desktopNav) return;

    mobileDropdown.innerHTML = desktopNav.innerHTML;

    const scrollThreshold = 100;
    const activeThreshold = 10;
    const isMobile = () => window.innerWidth <= 992;

    function updateHeaderState() {
        if (isMobile()) {
            siteHeader.classList.remove('header-active', 'header-collapsed', 'mouse-over');
            return;
        }
        const scrollY = window.scrollY;
        const isCollapsed = scrollY > scrollThreshold;
        const isActive = scrollY > activeThreshold;
        siteHeader.classList.toggle('header-active', isActive || siteHeader.classList.contains('mouse-over'));
        siteHeader.classList.toggle('header-collapsed', isCollapsed && !siteHeader.classList.contains('mouse-over'));
    }

    siteHeader.addEventListener('click', (event) => {
        if (!isMobile()) return;
        if (event.target.closest('a')) {
            closeMobileMenu();
            return;
        }
        siteHeader.classList.toggle('mobile-menu-open');
    });

    const closeMobileMenu = () => {
        siteHeader.classList.remove('mobile-menu-open');
    };

    document.addEventListener('click', (event) => {
        if (isMobile() && siteHeader.classList.contains('mobile-menu-open')) {
            if (!siteHeader.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });

    siteHeader.addEventListener('mouseenter', () => {
        if (!isMobile()) {
            siteHeader.classList.add('mouse-over');
            updateHeaderState();
        }
    });

    siteHeader.addEventListener('mouseleave', () => {
        if (!isMobile()) {
            siteHeader.classList.remove('mouse-over');
            updateHeaderState();
        }
    });

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeMobileMenu();
        }
        updateHeaderState();
    });
    
    updateHeaderState();
}