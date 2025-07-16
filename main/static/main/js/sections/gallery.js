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
    const containerHeight = container.clientHeight;

    const placedBubbles = [];
    const maxAttempts = 100;

    // НАСТРАИВАЕМ РАЗМЕР И ПЕРЕКРЫТИЕ
    const BASE_SIZE = 400; // Базовый размер
    const OVERLAP_FACTOR = 0.9; // 1.0 - касаются, 0.8 - сильно перекрываются

    bubbles.forEach((bubble) => {
        let size = BASE_SIZE * getRandom(0.5, 1.1); // Случайный размер
        let radius = size / 2;
        let isPlaced = false;

        for (let i = 0; i < maxAttempts; i++) {
            let x = getRandom(0, containerWidth - size);
            let y = getRandom(0, containerHeight - size);
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
        // Если за 100 попыток место не нашлось, пузырь просто не будет показан
    });
}