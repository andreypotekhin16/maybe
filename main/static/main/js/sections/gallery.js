// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    if (bubbles.length === 0) return;
    
    // Считываем реальные размеры контейнера, которые ЗАДАНЫ В CSS
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const placedBubbles = [];
    const maxAttempts = 100;
    const BASE_SIZE = 500;

    bubbles.forEach((bubble) => {
        let randomScale = getRandom(0.5, 1.1);
        let size = BASE_SIZE * randomScale;
        
        let foundSpot = false;
        let x, y;

        for (let i = 0; i < maxAttempts; i++) {
            x = getRandom(0, containerWidth - size);
            y = getRandom(0, containerHeight - size);
            let radius = size / 2;
            let isColliding = false;

            for (const placed of placedBubbles) {
                const dx = (x + radius) - (placed.x + placed.radius);
                const dy = (y + radius) - (placed.y + placed.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (radius + placed.radius) * 0.95; 

                if (distance < minDistance) {
                    isColliding = true;
                    break;
                }
            }
            
            if (!isColliding) {
                foundSpot = true;
                break;
            }
        }
        
        if (!foundSpot) {
             x = getRandom(0, containerWidth - size);
             y = getRandom(0, containerHeight - size);
        }

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = Math.floor(getRandom(1, 10));

        placedBubbles.push({ x, y, radius: size / 2 });
    });
}