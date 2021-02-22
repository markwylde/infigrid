const noise = require('./perlin')();

window.addEventListener('DOMContentLoaded', () => {
  noise.seed(0.5);

  const grid = document.querySelector('.grid');
  function setTile (x, y, result) {
    const element = grid.children[y].children[x];
    // element.style.backgroundColor = `rgba(200, 200, 200, ${result.toFixed(3)})`;

    if (result < 0.10) {
      element.style.backgroundColor = 'blue';
    } else if (result < 0.20) {
      element.style.backgroundColor = 'rgb(192 190 122)';
    } else if (result < 0.8) {
      element.style.backgroundColor = 'green';
    } else {
      element.style.backgroundColor = 'darkgreen';
    }
  }

  const gridWidth = 50;
  const gridHeight = 40;

  for (let x = 0; x < gridHeight; x++) {
    const row = document.createElement('div');
    for (let y = 0; y < gridWidth; y++) {
      const cell = document.createElement('div');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }

  function generate (startX, startY) {
    const start = Date.now();
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        const result = noise.simplex2((startX + x) / 100, (startY + y) / 100);
        setTile(x, y, Math.abs(result));
      }
    }
    const end = Date.now();

    if (console) {
      console.log('Rendered in ' + (end - start) + ' ms');
    }
  }

  const options = {
    startX: 0,
    startY: 0
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      options.startY = options.startY + 1;
    }

    if (event.key === 'ArrowUp') {
      options.startY = options.startY - 1;
    }

    if (event.key === 'ArrowLeft') {
      options.startX = options.startX - 1;
    }

    if (event.key === 'ArrowRight') {
      options.startX = options.startX + 1;
    }

    generate(options.startX, options.startY);
  });
  generate(options.startX, options.startY);
});
