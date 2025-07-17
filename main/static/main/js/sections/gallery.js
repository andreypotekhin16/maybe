function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbleCount = parseInt(container.dataset.bubbleCount || '0', 10);
    const bubbles = container.querySelectorAll('.gallery-card');

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

    bubbles.forEach((bubble, index) => {
        let size = BASE_SIZE * getRandom(0.6, 1.2);
        let radius = size / 2;
        let isPlaced = false;

        for (let i = 0; i < maxAttempts; i++) {
            let x = getRandom(0, containerWidth - size);
            let y = getRandom(0, calculatedHeight - size);
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
            bubble.style.display = 'none';
        } else {
            setTimeout(() => {
                bubble.classList.add('is-visible');
            }, Math.random() * 500);
        }
    });
}