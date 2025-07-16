export function initVoronoiGallery() {
    const container = document.querySelector('.voronoi-gallery-container');
    if (!container) return;

    const cells = Array.from(container.querySelectorAll('.gallery-cell'));
    if (cells.length === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const points = cells.map(() => [Math.random() * width, Math.random() * height]);

    const voronoi = d3.Delaunay.from(points).voronoi([0, 0, width, height]);

    cells.forEach((cell, i) => {
        const polygonPoints = voronoi.cellPolygon(i);
        
        if (polygonPoints) {
            const clipPathString = polygonPoints.map(p => `${(p[0] / width) * 100}% ${(p[1] / height) * 100}%`).join(', ');

            cell.style.clipPath = `polygon(${clipPathString})`;

            const media = cell.querySelector('img, video');
            if (media) {
                media.style.position = 'absolute';
                media.style.left = `-${polygonPoints.bounds.x0}px`;
                media.style.top = `-${polygonPoints.bounds.y0}px`;
                media.style.width = `${width}px`;
                media.style.height = `${height}px`;
            }
        }
    });
}