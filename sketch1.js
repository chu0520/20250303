let input;
let slider;
let button;
let dropdown;
let iframe;
let textSizeValue = 28;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.size(200, 30); // Set the size of the input box

  slider = createSlider(28, 50, 28);
  slider.position(input.x + input.width + 10, 10);
  slider.input(updateTextSize);

  button = createButton('跳動');
  button.position(slider.x + slider.width + 10, 10);
  button.mousePressed(toggleBounce);

  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
  dropdown.option('淡江大學網站');
  dropdown.option('淡江大學教育科技網站');
  dropdown.option('HackMD');
  dropdown.changed(goToUrl);

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();
}

function draw() {
  background("#FFD9EC"); // Set the background color 
  let txt = input.value(); // Get the text from the input box
  let x = 10; // Initial x position
  let y = 50; // Initial y position
  let spacing = 50; // Adjusted spacing to fill the screen better
  
  textSize(textSizeValue); // Set the text size

  if (offsets.length !== txt.length) {
    offsets = Array.from({ length: txt.length }, () => random(0, 1000));
  }
  
  let index = 0;
  for (let i = 0; i < height / spacing; i++) {
    for (let j = 0; j < width / spacing; j++) {
      if (index < txt.length) {
        let yOffset = isBouncing ? sin(millis() / 100 + offsets[index]) * 5 : 0;
        text(txt[index], x + j * spacing, y + i * spacing + yOffset);
        index++;
      } else {
        index = 0;
      }
    }
  }
}

function updateTextSize() {
  textSizeValue = slider.value();
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function goToUrl() {
  let selected = dropdown.value();
  let url;
  if (selected === '淡江大學網站') {
    url = 'https://www.tku.edu.tw/';
  } else if (selected === '淡江大學教育科技網站') {
    url = 'https://www.et.tku.edu.tw/';
  } else if (selected === 'HackMD') {
    url = 'https://hackmd.io/Y1675tipT7a6hcJ3YKfd9g';
  }
  iframe.attribute('src', url);
  iframe.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 200, windowHeight - 200);
}