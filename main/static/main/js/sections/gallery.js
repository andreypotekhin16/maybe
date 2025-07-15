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
    const maxAttemptsPerSize = 50; // Попыток для каждого размера
    const BASE_SIZE = 400;

    bubbles.forEach((bubble) => {
        let randomScale = getRandom(0.5, 1.1);
        let size = BASE_SIZE * randomScale;
        
        let foundSpot = false;
        let x, y;

        // --- НОВЫЙ АЛГОРИТМ С ДВУМЯ ПОПЫТКАМИ ---

        // Попытка №1: разместить с оригинальным размером
        for (let i = 0; i < maxAttemptsPerSize; i++) {
            x = getRandom(0, containerWidth - size);
            y = getRandom(0, containerHeight - size);
            let radius = size / 2;
            let isColliding = false;

            for (const placed of placedBubbles) {
                const dx = (x + radius) - (placed.x + placed.radius);
                const dy = (y + radius) - (placed.y + placed.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (radius + placed.radius) * 0.9;

                if (distance < minDistance) {
                    isColliding = true;
                    break;
                }
            }
            
            if (!isColliding) {
                foundSpot = true;
                break; // Успех! Выходим из цикла.
            }
        }

        // Если не получилось с первого раза...
        if (!foundSpot) {
            // Попытка №2: Уменьшаем размер и пробуем снова
            size = size * 0.7; // Уменьшаем на 30%

            for (let i = 0; i < maxAttemptsPerSize; i++) {
                x = getRandom(0, containerWidth - size);
                y = getRandom(0, containerHeight - size);
                let radius = size / 2;
                let isColliding = false;

                for (const placed of placedBubbles) {
                    const dx = (x + radius) - (placed.x + placed.radius);
                    const dy = (y + radius) - (placed.y + placed.radius);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = (radius + placed.radius) * 0.9;

                    if (distance < minDistance) {
                        isColliding = true;
                        break;
                    }
                }
                
                if (!isColliding) {
                    foundSpot = true;
                    break; // Успех!
                }
            }
        }
        
        // Крайний случай: если даже маленький не влез, ставим его куда попало
        if (!foundSpot) {
             x = getRandom(0, containerWidth - size);
             y = getRandom(0, containerHeight - size);
        }

        // Применяем финальный размер и позицию
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = Math.floor(getRandom(1, 10));

        // Добавляем пузырь в список размещенных
        placedBubbles.push({ x, y, radius: size / 2 });
    });
}