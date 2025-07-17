// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbleCount = parseInt(container.dataset.bubbleCount || '0', 10);
    const bubbles = Array.from(container.querySelectorAll('.gallery-card')); // Превращаем в массив для сортировки

    if (bubbleCount === 0) {
        container.style.height = 'auto';
        return;
    }

    const containerWidth = container.clientWidth;
    const baseHeight = 300;
    const heightPerBubbleRow = 150;
    const calculatedHeight = baseHeight + Math.ceil(bubbleCount / 4) * heightPerBubbleRow;
    container.style.height = `${calculatedHeight}px`;

    const placedBubbles = [];
    const maxAttempts = 100;
    const BASE_SIZE = 350;
    const OVERLAP_FACTOR = 0.9;
    
    // --- НОВЫЙ АЛГОРИТМ: СМЕЩЕНИЕ ПРИОРИТЕТА ВВЕРХ ---
    
    // 1. Сначала сортируем пузыри: самые большие будут размещаться первыми.
    // Это поможет заполнить пространство более эффективно.
    const sortedBubbles = bubbles.map(bubble => {
        const randomScale = getRandom(0.7, 1.2);
        const size = BASE_SIZE * randomScale;
        return { element: bubble, size: size };
    }).sort((a, b) => b.size - a.size);


    sortedBubbles.forEach((bubbleData, index) => {
        let size = bubbleData.size;
        let bubble = bubbleData.element;
        let isPlaced = false;

        // 2. Определяем максимальную высоту для генерации Y.
        // Первые 30% пузырей пытаются разместиться в верхней половине.
        // Остальные - по всей высоте.
        const placementYMax = (index / bubbleCount < 0.3) 
            ? (calculatedHeight / 2) 
            : calculatedHeight;
            
        let currentAttempt = 0;
        while (!isPlaced && currentAttempt < maxAttempts) {
            let x = getRandom(0, containerWidth - size);
            let y = getRandom(0, placementYMax - size); // Используем новую максимальную высоту
            let radius = size / 2;
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
            currentAttempt++;
        }
        
        // Если место так и не нашлось, ничего не делаем (пузырь останется скрытым)
        // Это лучше, чем ломать композицию.
        if (isPlaced) {
             setTimeout(() => {
                bubble.classList.add('is-visible');
            }, Math.random() * 500);
        }
    });
}