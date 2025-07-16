// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    if (bubbles.length === 0) {
        container.style.height = 'auto'; // Если нет картинок, убираем высоту
        container.style.minHeight = 'auto';
        return;
    }

    const containerWidth = container.clientWidth;
    // Создаем область для размещения, равную квадрату по ширине контейнера
    const placementAreaHeight = containerWidth; 

    const placedBubbles = [];
    const maxAttempts = 100;
    const BASE_SIZE = 300; // Базовый размер пузыря
    const OVERLAP_FACTOR = 0.95; // Коэффициент перекрытия (1.0 = касание)

    bubbles.forEach((bubble) => {
        let size = BASE_SIZE * getRandom(0.6, 1.2);
        let radius = size / 2;
        let isPlaced = false;

        for (let i = 0; i < maxAttempts; i++) {
            let x = getRandom(0, containerWidth - size);
            let y = getRandom(0, placementAreaHeight - size);
            let isColliding = false;

            for (const placed of placedBubbles) {
                const dx = (x + radius) - (placed.x + placed.radius);
                const dy = (y + radius) - (placed.y + placed.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < (radius + placed.radius) * OVERLAP_FACTOR) {
                    isColliding = true;
                    break;
                }
            }

            if (!isColliding) {
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
                bubble.style.position = 'absolute';
                bubble.style.zIndex = Math.floor(getRandom(1, 10));
                
                placedBubbles.push({ x, y, radius });
                isPlaced = true;
                break;
            }
        }
        if (!isPlaced) {
            bubble.style.display = 'none'; // Скрываем пузырь, если место не нашлось
        }
    });

    // В конце принудительно устанавливаем высоту контейнера
    container.style.height = `${placementAreaHeight}px`;
    container.style.minHeight = 'auto'; // Убираем стартовый min-height
}