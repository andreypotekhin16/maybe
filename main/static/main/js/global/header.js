export function setupHeader() {
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