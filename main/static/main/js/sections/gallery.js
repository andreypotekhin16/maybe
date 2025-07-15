// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    if (bubbles.length === 0) {
        container.style.minHeight = 'auto';
        return;
    }
    
    const containerWidth = container.clientWidth;
    // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
    const placementAreaHeight = containerWidth / 2; // Делаем высоту в 2 раза меньше ширины
    // -------------------------

    const BASE_SIZE = 280; 

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.1);
        const size = BASE_SIZE * randomScale;

        const x = getRandom(0, containerWidth - size);
        const y = getRandom(0, placementAreaHeight - size);

        const zIndex = Math.floor(getRandom(1, 10));
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = zIndex;
    });

    container.style.height = `${placementAreaHeight}px`;
    container.style.minHeight = 'auto';
}