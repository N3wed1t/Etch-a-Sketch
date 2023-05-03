const defaultColor = '#000000';
let brushColor = defaultColor;
let colorPicker;
let mode = 'normal';
let currentSize;
let border = true;

window.addEventListener('load', startup, false);

function startup() {
    colorPicker = document.querySelector("#color-palette");
    colorPicker.value = defaultColor;
    colorPicker.addEventListener("input", () => brushColor = colorPicker.value);
    colorPicker.addEventListener("change", () => brushColor = colorPicker.value);
    colorPicker.select();
}

let plateColor = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80' ,'#00ffff' 
                ,'#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080', '#000000', '#505050'];

const colorSet = document.querySelector('.color-set');

plateColor.forEach((color) => {
    const preColor = document.createElement('div');
    preColor.style.backgroundColor = color;
    preColor.classList.add('color-plate');
    colorSet.appendChild(preColor);
});


const container = document.createElement('div');
const content = document.querySelector('.content');

container.classList.add('container');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size){
    currentSize = size;
    border = true;
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
normal.addEventListener('click', () => {
    mode = 'normal';
    activateBG();
});

const rainbow = document.querySelector('#rainbow');
rainbow.addEventListener('click', () => {
    mode = 'rainbow';
    activateBG();
});

const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
    mode = 'eraser';
    activateBG();
});

const darken = document.querySelector('#darken');
darken.addEventListener('click', () => {
    mode = 'darken';
    activateBG();
});

const lighten = document.querySelector('#lighten');
lighten.addEventListener('click', () => {
    mode = 'lighten';
    activateBG();
});

const saveColor = document.querySelector('#save-color');
saveColor.addEventListener('click', () => {
    if(plateColor.indexOf(colorPicker.value) < 0){
        const preColor = document.createElement('div');
        plateColor.push(colorPicker.value);
        preColor.style.backgroundColor = colorPicker.value;
        preColor.classList.add('color-plate');
        colorSet.appendChild(preColor);
        loadColor();
    }
});

function activateBG(){
    if(mode === 'normal'){
        normal.classList.add('activate');
        rainbow.classList.remove('activate');
        eraser.classList.remove('activate');
        darken.classList.remove('activate');
        lighten.classList.remove('activate');
    }else if(mode === 'rainbow'){
        normal.classList.remove('activate');
        rainbow.classList.add('activate');
        eraser.classList.remove('activate');
        darken.classList.remove('activate');
        lighten.classList.remove('activate');
    }else if(mode === 'eraser'){
        normal.classList.remove('activate');
        rainbow.classList.remove('activate');
        eraser.classList.add('activate');
        darken.classList.remove('activate');
        lighten.classList.remove('activate');
    }else if(mode === 'darken'){
        normal.classList.remove('activate');
        rainbow.classList.remove('activate');
        eraser.classList.remove('activate');
        darken.classList.add('activate');
        lighten.classList.remove('activate');
    }else if(mode === 'lighten'){
        normal.classList.remove('activate');
        rainbow.classList.remove('activate');
        eraser.classList.remove('activate');
        darken.classList.remove('activate');
        lighten.classList.add('activate');
    }
}


function normalBrush(){
    return brushColor;
}

function eraserBrush(){
    return '';
}

function rainbowBrush() {
    let red = Math.floor((Math.random() * 255));
    let green = Math.floor((Math.random() * 255));
    let blue = Math.floor((Math.random() * 255));
    return `rgb(${red}, ${green}, ${blue})`;
}

function darkenBrush(e) {
    let rgbValue = e.target.style.backgroundColor;
    if(rgbValue !== ''){
        let hslValue = RGBToHSL(rgbValue);
        return `${hslValue.split(',')[0]}, ${hslValue.split(',')[1]}, ${hslValue.split(',')[2].slice(0,-2) - 5}%)`;
    }else{
        return '';
    }
}

function lightenBrush(e) {
    let rgbValue = e.target.style.backgroundColor;
    if(rgbValue !== ''){
        let hslValue = RGBToHSL(rgbValue);
        return `${hslValue.split(',')[0]}, ${hslValue.split(',')[1]}, ${Math.floor(hslValue.split(',')[2].slice(0,-2)) + 5}%)`;
    }else{
        return '';
    }
}

function draw() {
    const pixels = document.querySelectorAll('.grid');
    pixels.forEach((pixel) => {
        pixel.addEventListener('mousedown', coloringGrid);
        pixel.addEventListener('mouseover', coloringGrid);
    });
}

function loadColor(){
    const selColor = document.querySelectorAll('.color-plate');
    selColor.forEach((plate) => {
        plate.addEventListener('mousedown', () => {
            colorPicker.value = RGBToHex(plate.style.backgroundColor)
            brushColor = colorPicker.value;
        });
    });
}

function coloringGrid(e){
    if((e.type === 'mouseover' && mouseDown) || e.type === 'mousedown'){
        if(mode === 'normal'){
            e.target.style.backgroundColor = normalBrush();
        }else if(mode === 'rainbow'){
            e.target.style.backgroundColor = rainbowBrush();
        }else if(mode === 'eraser'){
            e.target.style.backgroundColor = eraserBrush();
        }else if(mode === 'darken'){
            e.target.style.backgroundColor = darkenBrush(e);
        }else if(mode === 'lighten'){
            e.target.style.backgroundColor = lightenBrush(e);
        }else{
            e.target.style.backgroundColor = 'black';
        }
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function RGBToHex(rgb) {
    let colorCode = rgb.split(',');
    return "#" + componentToHex(Math.floor(colorCode[0].trim().slice(4))) 
                + componentToHex(Math.floor(colorCode[1].trim())) 
                + componentToHex(Math.floor(colorCode[2].trim().slice(0, -1)));
}

function RGBToHSL(preRGB) {
    let rgbCode = preRGB.split(',');
    let r = Math.floor(rgbCode[0].trim().slice(4));
    let g = Math.floor(rgbCode[1].trim());
    let b = Math.floor(rgbCode[2].trim().slice(0, -1));
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
      
    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
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

loadColor();
activateBG();
draw();

    


