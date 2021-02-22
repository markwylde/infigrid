const noise = require('./perlin')();

window.addEventListener('DOMContentLoaded', () => {
  noise.seed(0.123);

  const canvas = document.querySelector('canvas');
  canvas.width = 1024;
  canvas.height = 768;

  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(canvas.width, canvas.height);

  const data = image.data;

  const start = Date.now();

  for (let x = 0; x < canvas.width; x++) {
    // if (x % 100 == 0) {
    //  noise.seed(Math.random());
    // }
    for (let y = 0; y < canvas.height; y++) {
      let value = Math.abs(noise.perlin2(x / 10, y / 10));

      value *= 256;

      const cell = (x + y * canvas.width) * 4;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  /* // Benchmark code.
  start = Date.now();
  for (var x = 0; x < 10000; x++) {
    for (var y = 0; y < 10000; y++) {
      noise.simplex2(x / 50, y/50);
    }
  } */
  const end = Date.now();

  ctx.fillColor = 'black';
  ctx.fillRect(0, 0, 100, 100);
  ctx.putImageData(image, 0, 0);

  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rendered in ' + (end - start) + ' ms', canvas.width / 2, canvas.height - 20);

  if (console) {
    console.log('Rendered in ' + (end - start) + ' ms');
  }
});
