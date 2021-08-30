const gui = new dat.GUI();
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};
const fillColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const wavFolder = gui.addFolder("Wave Properties");
wavFolder.add(wave, "y", 0, canvas.height);
wavFolder.add(wave, "length", -0.01, 0.01);
wavFolder.add(wave, "amplitude", -300, 300);
wavFolder.add(wave, "frequency", 0.01, 1);
wavFolder.open();

const strokeFolder = gui.addFolder("Stroke Color");
strokeFolder.add(strokeColor, "h", 0, 255);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 0, 100);
strokeFolder.open();

const fillColorFolder = gui.addFolder("Background Color");
fillColorFolder.add(fillColor, "r", 0, 255);
fillColorFolder.add(fillColor, "g", 0, 255);
fillColorFolder.add(fillColor, "b", 0, 255);
fillColorFolder.add(fillColor, "a", 0, 1);
let increment = wave.frequency;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${fillColor.r},${fillColor.g},${fillColor.b},${fillColor.a})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.beginPath();

  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(
      i,
      wave.y +
        Math.sin(i * wave.length + increment) *
          wave.amplitude *
          Math.sin(increment)
    );
  }
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${
    strokeColor.s
  }%,${strokeColor.l}%)`;
  c.stroke();
  increment += wave.frequency;
}

animate();
