// main/static/main/js/sections/gallery.js

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return;

    const bubbles = container.querySelectorAll('.gallery-card');
    const bubbleCount = bubbles.length;

    if (bubbleCount === 0) {
        container.style.height = 'auto';
        container.style.minHeight = 'auto';
        return;
    }

    const containerWidth = container.clientWidth;
    const containerHeight = containerWidth / 2; // Высота в 2 раза меньше ширины
    
    // --- НОВАЯ ЛОГИКА: ВЫЧИСЛЕНИЕ РАЗМЕРА ---
    
    // 1. Считаем общую площадь холста
    const totalArea = containerWidth * containerHeight;
    // 2. Считаем "идеальную" площадь для одного пузыря
    const areaPerBubble = totalArea / bubbleCount;
    // 3. Вычисляем диаметр из этой площади (формула площади круга: S = π * (d/2)^2)
    let calculatedSize = Math.sqrt(areaPerBubble / Math.PI) * 2;
    
    // 4. Добавляем корректирующий коэффициент, чтобы пузыри были побольше
    calculatedSize *= 1.8;

    // 5. Ограничиваем размер, чтобы пузыри не были слишком мелкими или огромными
    const MIN_SIZE = 150; // Минимальный размер пузыря
    const MAX_SIZE = 550; // Максимальный размер
    const BASE_SIZE = Math.max(MIN_SIZE, Math.min(calculatedSize, MAX_SIZE));

    console.log(`Количество пузырей: ${bubbleCount}, вычисленный базовый размер: ${BASE_SIZE.toFixed(2)}px`);

    // --- КОНЕЦ НОВОЙ ЛОГИКИ ---

    const placedBubbles = [];
    const maxAttempts = 100;
    const OVERLAP_FACTOR = 0.85;

    bubbles.forEach((bubble, index) => {
        let size = BASE_SIZE * getRandom(0.7, 1.2); // Слегка меняем диапазон случайности
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
        
        if (!isPlaced) {
            bubble.style.display = 'none';
        } else {
            setTimeout(() => {
                bubble.classList.add('is-visible');
            }, index * 100);
        }
    });

    container.style.height = `${containerHeight}px`;
    container.style.minHeight = 'auto';
}