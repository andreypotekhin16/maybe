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

    const BASE_SIZE = 500;

    bubbles.forEach((bubble) => {
        const randomScale = getRandom(0.5, 1.1);
        const size = BASE_SIZE * randomScale;
        const radius = size / 2;

        let currentAttempt = 0;
        let isColliding, x, y;

        do {
            x = getRandom(0, containerWidth - size);
            y = getRandom(0, containerHeight - size);
            isColliding = false;

            for (const placed of placedBubbles) {
                const dx = (x + radius) - (placed.x + placed.radius);
                const dy = (y + radius) - (placed.y + placed.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // --- ИЗМЕНЕНИЕ ЗДЕСЬ ---
                const minDistance = (radius + placed.radius) * 0.95; 

                if (distance < minDistance) {
                    isColliding = true;
                    break;
                }
            }
            currentAttempt++;
        } while (isColliding && currentAttempt < maxAttempts);

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = Math.floor(getRandom(1, 10));

        placedBubbles.push({ x, y, radius });
    });
}