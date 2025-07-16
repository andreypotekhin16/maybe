// main/static/main/js/sections/gallery.js

export function initVoronoiGallery() {
    const container = document.querySelector('.voronoi-gallery-container');
    const sourcesEl = container?.querySelector('.gallery-sources');
    
    if (!container || !sourcesEl || typeof d3 === 'undefined' || typeof PDS === 'undefined') {
        return;
    }

    const items = Array.from(sourcesEl.querySelectorAll('.gallery-item'));
    if (items.length === 0) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const minRadius = Math.max(70, 450 - items.length * 12);
    const pds = new PDS({
        dim: [width, height],
        minRadius: minRadius,
        maxRadius: minRadius * 2,
    });
    
    const points = pds.exec();
    
    // Добавляем точки по краям для лучшего заполнения
    const edgePointsCount = 20;
    for(let i=0; i < edgePointsCount; i++) {
        points.push([Math.random() * width, (i % 2 === 0) ? 1 : height - 1]);
        points.push([(i % 2 === 0) ? 1 : width - 1, Math.random() * height]);
    }


    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    container.innerHTML = ''; 

    points.forEach((point, i) => {
        const polygonPoints = voronoi.cellPolygon(i);
        if (!polygonPoints) return;

        const sourceItem = items[i % items.length];
        const dataSource = sourceItem.dataset.src;
        const dataType = sourceItem.dataset.type;

        const cell = document.createElement('div');
        cell.className = 'voronoi-cell';
        
        const clipPathString = polygonPoints.map(p => `${p[0]}px ${p[1]}px`).join(', ');
        cell.style.clipPath = `polygon(${clipPathString})`;

        if (dataType === 'video') {
            const video = document.createElement('video');
            video.src = dataSource;
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.playsInline = true;
            cell.appendChild(video);
        } else {
            cell.style.backgroundImage = `url(${dataSource})`;
        }
        
        container.appendChild(cell);
    });
}