// main/static/main/js/sections/gallery.js

// Функция для генерации случайного числа в диапазоне
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Главная функция инициализации галереи
export function initBubbleGallery() {
    const container = document.querySelector('.bubble-container');
    if (!container) return; // Если контейнера нет, ничего не делаем

    const bubbles = container.querySelectorAll('.gallery-card');
    const containerRect = container.getBoundingClientRect();

    // Базовый размер пузыря
    const BASE_SIZE = 280; // px

    bubbles.forEach((bubble) => {
        // 1. Генерируем случайный размер
        const randomScale = getRandom(0.6, 1.1); // от 60% до 110% от базового размера
        const size = BASE_SIZE * randomScale;

        // 2. Генерируем случайную позицию внутри контейнера
        // (с учетом размера пузыря, чтобы он не вылезал за края)
        const x = getRandom(0, containerRect.width - size);
        const y = getRandom(0, containerRect.height - size);

        // 3. Генерируем случайный z-index для эффекта наложения
        const zIndex = Math.floor(getRandom(1, 10));
        
        // 4. Применяем все случайные стили к пузырю
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute'; // ОБЯЗАТЕЛЬНО
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.zIndex = zIndex;
    });
}