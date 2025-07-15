// main/static/main/js/sections/gallery.js

// Функция для генерации случайного числа в диапазоне
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Главная функция инициализации галереи
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

    // Массив для хранения данных уже размещенных пузырей
    const placedBubbles = [];
    const maxAttempts = 100; // Максимальное количество попыток найти место

    bubbles.forEach((bubble) => {
        const BASE_SIZE = 500;
        const randomScale = getRandom(0.5, 1.1);
        const size = BASE_SIZE * randomScale;
        const radius = size / 2;

        let currentAttempt = 0;
        let isColliding, x, y;

        // --- АЛГОРИТМ ПОИСКА СВОБОДНОГО МЕСТА ---
        do {
            // Генерируем случайную позицию
            x = getRandom(0, containerWidth - size);
            y = getRandom(0, containerHeight - size);
            
            // По умолчанию считаем, что место свободно
            isColliding = false;

            // Проверяем на столкновение с уже размещенными пузырями
            for (const placed of placedBubbles) {
                const dx = (x + radius) - (placed.x + placed.radius);
                const dy = (y + radius) - (placed.y + placed.radius);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Минимально допустимое расстояние (с учетом 20% перекрытия)
                const minDistance = (radius + placed.radius) * 0.8; 

                if (distance < minDistance) {
                    isColliding = true; // Нашли столкновение!
                    break; // Прерываем проверку, это место занято
                }
            }
            currentAttempt++;
        } while (isColliding && currentAttempt < maxAttempts); // Повторяем, пока не найдем место или не кончатся попытки

        // --- Применяем найденные стили ---
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = Math.floor(getRandom(1, 10));

        // Добавляем пузырь в список размещенных для следующих проверок
        placedBubbles.push({ x, y, radius });
    });
}