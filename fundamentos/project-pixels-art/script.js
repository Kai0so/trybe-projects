const firstColor = document.getElementsByClassName('color')[0];
const secondColor = document.getElementsByClassName('color')[1];
const thirdColor = document.getElementsByClassName('color')[2];
const fourthColor = document.getElementsByClassName('color')[3];
const pixelBoard = document.getElementById('pixel-board');
const pixelBoardRows = document.getElementsByClassName('pixel-board-rows');
const clearButton = document.querySelector('#clear-board');

firstColor.style.backgroundColor = 'black';
secondColor.style.backgroundColor = 'red';
thirdColor.style.backgroundColor = 'blue';
fourthColor.style.backgroundColor = 'yellow';

firstColor.classList.add('selected');

for (let i = 0; i < 5; i += 1) {
  const row = document.createElement('div');
  pixelBoard.appendChild(row).className = 'pixel-board-rows';
}

for (let j = 0; j < 5; j += 1) {
  for (let k = 0; k < 5; k += 1) {
    const newCell = document.createElement('div');
    pixelBoardRows[k].appendChild(newCell).className = 'pixel';
  }
}

function selectColor(e) {
  const colorList = document.querySelectorAll('.color');
  for (let i = 0; i < colorList.length; i += 1) {
    colorList[i].className = 'color';
    e.target.className = 'color selected';
  }
}

function paletteListener() {
  const colorSelector = document.querySelectorAll('.color');
  for (let i = 0; i < colorSelector.length; i += 1) {
    colorSelector[i].addEventListener('click', selectColor);
  }
}

function paintPixel(e) {
  const colorSelected = document.querySelector('.selected');
  const captureColorBackground = window.getComputedStyle(colorSelected, null);
  const colorBackgroundValue = captureColorBackground.getPropertyValue('background-color');
  e.target.style.backgroundColor = colorBackgroundValue;
}

function pixelListener() {
  const pixelSelector = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelSelector.length; i += 1) {
    pixelSelector[i].addEventListener('click', paintPixel);
  }
}

function clearBoard() {
  const pixelSelector = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelSelector.length; i += 1) {
    pixelSelector[i].style.backgroundColor = '';
  }
}

window.onload = () => {
  paletteListener();
  pixelListener();
  clearButton.addEventListener('click', clearBoard);
};
