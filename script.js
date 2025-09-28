const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Position cubes in initial grid
cubes.forEach((cube, idx) => {
    const row = Math.floor(idx / 5); // 5 columns in your HTML grid
    const col = idx % 5;
    cube.style.position = 'absolute';
    cube.style.top = `${row * 70}px`;   // adjust spacing
    cube.style.left = `${col * 70}px`;

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

    // Boundaries
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + cubeRect.width > containerRect.width) x = containerRect.width - cubeRect.width;
    if (y + cubeRect.height > containerRect.height) y = containerRect.height - cubeRect.height;

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
