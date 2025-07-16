// main/static/main/js/sections/gallery.js

export function initVoronoiGallery() {
    // Проверяем, что на странице есть и контейнер, и библиотека d3
    const container = document.querySelector('.voronoi-gallery-container');
    if (!container || typeof d3 === 'undefined') {
        console.log('Галерея Вороного не запущена: контейнер или библиотека D3 не найдены.');
        return;
    }

    const cells = Array.from(container.querySelectorAll('.gallery-cell'));
    if (cells.length === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Создаем случайные точки-центры для каждой картинки
    const points = cells.map(() => [Math.random() * width, Math.random() * height]);

    // 2. С помощью D3.js вычисляем диаграмму Вороного
    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    // 3. Применяем полученные формы к каждой ячейке
    cells.forEach((cell, i) => {
        const polygonPoints = voronoi.cellPolygon(i);
        
        if (polygonPoints) {
            // Преобразуем координаты в строку для CSS clip-path
            const clipPathString = polygonPoints.map(p => `${p[0]}px ${p[1]}px`).join(', ');

            // Применяем обрезку к ячейке
            cell.style.clipPath = `polygon(${clipPathString})`;
        }
    });
}