// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    
    // --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
    // Получаем реальные внутренние размеры контейнера
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    // -------------------------

    // Базовый размер для самого большого пузыря
    const BASE_SIZE = 280; 

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.0); // от 50% до 100% размера
        const size = BASE_SIZE * randomScale;

        // Генерируем позицию СТРОГО внутри контейнера
        const x = getRandom(0, containerWidth - size);
        const y = getRandom(0, containerHeight - size);

        const zIndex = Math.floor(getRandom(1, 10));
        
        // Применяем стили
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = zIndex;
    });
}