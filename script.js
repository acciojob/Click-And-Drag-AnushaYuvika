const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Position cubes in initial grid
cubes.forEach((cube, idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    cube.style.position = 'absolute';
    cube.style.left = `${col * (cube.offsetWidth + 10)}px`;
    cube.style.top = `${row * (cube.offsetHeight + 10)}px`;

    cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        offsetX = e.clientX - cube.offsetLeft;
        offsetY = e.clientY - cube.offsetTop;
        cube.style.cursor = 'grabbing';
    });
});

// Dragging
document.addEventListener('mousemove', (e) => {
    if (!selectedCube) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = container.scrollWidth - selectedCube.offsetWidth;
    const maxY = container.clientHeight - selectedCube.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
});

// Drop
document.addEventListener('mouseup', () => {
    if (selectedCube) {
        selectedCube.style.cursor = 'grab';
        selectedCube = null;
    }
});
