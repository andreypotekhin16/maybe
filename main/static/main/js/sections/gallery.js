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
    const placementAreaHeight = containerWidth / 2;

    const placedBubbles = [];
    const maxAttempts = 100;
    const BASE_SIZE = 500;
    
    // --- ИЗМЕНЕНИЕ 1: Увеличиваем коэффициент, чтобы пузыри были плотнее ---
    const OVERLAP_FACTOR = 0.85; // Было 0.95. Чем меньше, тем больше перекрытие.

    bubbles.forEach((bubble, index) => {
        let size = BASE_SIZE * getRandom(0.5, 1.1);
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
                // --- ИЗМЕНЕНИЕ 2: Сначала задаем позицию, но пузырь еще невидимый ---
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
            bubble.style.display = 'none';
        } else {
            // --- ИЗМЕНЕНИЕ 3: Добавляем класс is-visible с задержкой ---
            // Пузыри будут появляться один за другим с интервалом 100 мс
            setTimeout(() => {
                bubble.classList.add('is-visible');
            }, index * 100);
        }
    });

    container.style.height = `${placementAreaHeight}px`;
    container.style.minHeight = 'auto';
}