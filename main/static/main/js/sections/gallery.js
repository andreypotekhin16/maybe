// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    // Теперь размеры берем от реального, видимого контейнера
    const containerWidth = container.clientWidth;
    // Высоту берем такую же, как ширина, чтобы создать условный квадрат для размещения
    const containerHeight = container.clientHeight > 200 ? container.clientHeight : containerWidth * 0.8; 

    const BASE_SIZE = 250; 

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.1);
        const size = BASE_SIZE * randomScale;

        // Расчет позиции внутри видимой области
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