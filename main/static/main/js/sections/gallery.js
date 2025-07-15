// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    
    // Теперь мы просто считываем размеры из CSS, ничего не вычисляя
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Базовый размер для самого большого пузыря
    const BASE_SIZE = 300; // Можете настроить этот параметр

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.1); // от 50% до 110%
        const size = BASE_SIZE * randomScale;

        // Расчет позиции внутри контейнера с уже известными размерами
        const x = getRandom(0, containerWidth - size);
        const y = getRandom(0, containerHeight - size);

        const zIndex = Math.floor(getRandom(1, 10));
        
        // Применяем стили (ничего не меняется)
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = zIndex;
    });

    // Строки, которые задавали высоту контейнеру, удалены.
}