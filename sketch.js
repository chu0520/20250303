let input, slider, jumpButton;
let jump = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  slider = select('#slider');
  jumpButton = select('#jumpButton');
  jumpButton.mousePressed(() => jump = !jump);
}

function draw() {
  background('pink');
  let txt = input.value();
  let textSizeValue = slider.value();
  fill('white'); // 設置文字顏色為白色
  textAlign(LEFT, TOP);
  textSize(textSizeValue);
  let x = 0;
  let y = 0;
  let spacing = textWidth(txt) + 10; // 固定間距

  if (jump) {
    if (offsets.length !== txt.length) {
      offsets = Array.from({ length: txt.length }, () => random(0, 1000));
    }
  } else {
    offsets = [];
  }

  while (y < height) {
    for (let i = 0; i < txt.length; i++) {
      let char = txt.charAt(i);
      let offsetY = jump ? sin(millis() / 100 + offsets[i]) * 5 : 0; // 輕微跳動
      text(char, x, y + offsetY);
      x += textWidth(char) + 10;
      if (x > width) {
        x = 0;
        y += 40; // 行高
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}