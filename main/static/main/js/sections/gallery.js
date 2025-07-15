// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    
    // --- ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ ---
    // Берем только ширину контейнера
    const containerWidth = container.clientWidth;
    // Высоту области для размещения делаем равной ширине, создавая квадрат
    const placementAreaHeight = containerWidth; 
    // ----------------------------

    const BASE_SIZE = 280; 

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.1);
        const size = BASE_SIZE * randomScale;

        // Размещаем пузыри строго внутри этого "квадрата"
        const x = getRandom(0, containerWidth - size);
        const y = getRandom(0, placementAreaHeight - size); // Используем новую высоту

        const zIndex = Math.floor(getRandom(1, 10));
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = zIndex;
    });

    // Наконец, чтобы контейнер не был пустым, задаем ему высоту,
    // равную высоте нашей области размещения
    container.style.height = `${placementAreaHeight}px`;
    container.style.minHeight = 'auto'; // Убираем старый min-height
}