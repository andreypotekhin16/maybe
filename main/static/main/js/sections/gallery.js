// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    // --- ИЗМЕНЕНИЕ 1: Создаем "наблюдателя" ---
    // Он будет следить за контейнером галереи
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Если контейнер стал виден на экране...
            if (entry.isIntersecting) {
                
                // --- ИЗМЕНЕНИЕ 2: Всю логику анимации переносим сюда ---
                // Этот код теперь выполнится только один раз при появлении
                const bubbleCount = parseInt(container.dataset.bubbleCount || '0', 10);
                const bubbles = Array.from(container.querySelectorAll('.gallery-card'));

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
                const maxPlacementAttempts = 50;
                
                const isMobile = window.innerWidth < 768;
                const BASE_SIZE = isMobile ? 220 : 350;
                
                const OVERLAP_FACTOR = 0.9;

                const sortedBubbles = bubbles.map(bubble => {
                    return { element: bubble, initialSize: BASE_SIZE * getRandom(0.7, 1.2) };
                }).sort((a, b) => b.initialSize - a.initialSize);


                sortedBubbles.forEach((bubbleData, index) => {
                    let size = bubbleData.initialSize;
                    let bubble = bubbleData.element;
                    let isPlaced = false;

                    while (!isPlaced) {
                        let radius = size / 2;
                        let foundSpotThisCycle = false;
                        
                        const placementYMax = (index / bubbleCount < 0.4) 
                            ? (calculatedHeight / 2) 
                            : calculatedHeight;

                        for (let i = 0; i < maxPlacementAttempts; i++) {
                            let x = getRandom(0, containerWidth - size);
                            let y = getRandom(0, placementYMax - size);
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
                                foundSpotThisCycle = true;
                                break;
                            }
                        }

                        if (foundSpotThisCycle) {
                            break;
                        }

                        size *= 0.9; 
                        if (size < 50) {
                            let x = getRandom(0, containerWidth - size);
                            let y = getRandom(0, calculatedHeight - size);
                            bubble.style.width = `${size}px`;
                            bubble.style.height = `${size}px`;
                            bubble.style.left = `${x}px`;
                            bubble.style.top = `${y}px`;
                            bubble.style.position = 'absolute';
                            isPlaced = true;
                            placedBubbles.push({ x, y, radius: size/2 });
                        }
                    }
                    
                    setTimeout(() => {
                        bubble.classList.add('is-visible');
                    }, Math.random() * 500 + 100);
                });
                // --- Конец логики анимации ---

                // --- ИЗМЕНЕНИЕ 3: Отключаем наблюдателя, чтобы анимация не повторялась ---
                observer.disconnect();
            }
        });
    }, { 
        threshold: 0.2 // Анимация начнется, когда 20% галереи будет видно
    });

    // --- ИЗМЕНЕНИЕ 4: Запускаем наблюдение за контейнером ---
    observer.observe(container);
}