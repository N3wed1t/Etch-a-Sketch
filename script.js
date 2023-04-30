const container = document.createElement('div');
const body = document.querySelector('body');

container.classList.add('container');


function makeGrid(column, row){
    for(let i = 0; i < row; i++){
        const hori = document.createElement('span');
        hori.style.display = 'flex';
        for(let j = 0; j < column; j++){
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.style.width = `${(800/row - 2)}px`;
            grid.style.height = `${(800/column - 2)}px`;
            hori.appendChild(grid);
        }
        container.appendChild(hori);
    }
    body.appendChild(container);

}
makeGrid(16,16);


const btn = document.querySelector('#change-size');

btn.addEventListener('click', () => {
    let size = prompt('Enter Canvas Size: ');
    container.replaceChildren();
    makeGrid(size.split('x')[0], size.split('x')[1]);
});

const pixels = document.querySelectorAll('.grid');
pixels.forEach((pixel) => {
    pixel.addEventListener('mouseenter', (e) => {
        pixel.style.backgroundColor = 'black';
        // still want drag to draw
    })
});

//change size and hover bgcolor dont change


    


