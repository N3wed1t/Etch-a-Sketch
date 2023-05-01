let brushColor = 'black';
let mode = 'normal';
let currentSize;
let border = true;

const container = document.createElement('div');
const content = document.querySelector('.content');

container.classList.add('container');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size){
    currentSize = size;
    for(let i = 0; i < size; i++){
        const hori = document.createElement('span');
        hori.style.display = 'flex';
        for(let j = 0; j < size; j++){
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.classList.add('border');
            grid.style.width = `${(800/size - 2)}px`;
            grid.style.height = `${(800/size - 2)}px`;
            hori.appendChild(grid);
        }
        container.appendChild(hori);
    }
    content.insertBefore(container, content.children[1]);

}
makeGrid(16);


const changeSize = document.querySelector('#change-size');
changeSize.addEventListener('click', () => {
    let size = prompt('Enter Canvas Size: ');
    container.replaceChildren();
    makeGrid(size);
    draw();
});

const normal = document.querySelector('#normal');
normal.addEventListener('click', () => mode = 'normal');

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => mode = 'rainbow');

function normalBrush(){
    return brushColor;
}

function rainbowBrush() {
    let red = Math.floor((Math.random() * 255));
    let green = Math.floor((Math.random() * 255));
    let blue = Math.floor((Math.random() * 255));
    return `rgb(${red}, ${green}, ${blue})`;
}

function draw() {
    const pixels = document.querySelectorAll('.grid');
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousedown', coloringGrid);
        pixel.addEventListener('mouseover', coloringGrid);
    });
}

function coloringGrid(e){
    if((e.type === 'mouseover' && mouseDown) || e.type === 'mousedown'){
        e.target.style.backgroundColor = mode === 'normal' ? normalBrush() 
        : mode === 'rainbow' ? rainbowBrush() : 'black';
    }
    
}

const toggleBorder = document.querySelector('#toggle-border');
toggleBorder.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.grid');
    border = !border;
    pixels.forEach((pixel) => {
        pixel.classList.toggle('border');
        if(border){
            pixel.style.width = `${(800/currentSize - 2)}px`;
            pixel.style.height = `${(800/currentSize - 2)}px`;
        }else{
            pixel.style.width = `${(800/currentSize)}px`;
            pixel.style.height = `${(800/currentSize)}px`;
        }
        
    });
});

draw();

    


