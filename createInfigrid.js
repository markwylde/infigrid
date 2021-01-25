function createInfigrid (options) {
  options.element.style.position = 'absolute';
  options.element.style.width = '100%';
  options.element.style.height = '100%';
  options.element.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  options.worldX = options.worldX || 0;
  options.worldY = options.worldY || 0;
  options.zoomIntensity = options.zoomIntensity || 0.02;

  let lastArea;
  let scale = 1;

  let dirty = true;
  function draw () {
    window.requestAnimationFrame(draw);

    if (!dirty) {
      return;
    }

    dirty = false;
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = options.element.offsetWidth;
    canvas.height = options.element.offsetHeight;

    const cellWidth = options.cellWidth / scale;
    const cellHeight = options.cellHeight / scale;

    const totalRows = Math.ceil(options.element.offsetWidth / cellWidth) + 2;
    const totalColumns = Math.ceil(options.element.offsetHeight / cellHeight) + 2;

    const xRaw = (options.worldX / scale) / cellWidth;
    const yRaw = (options.worldY / scale) / cellHeight;

    const viewX = cellWidth * (xRaw % 1);
    const viewY = cellHeight * (yRaw % 1);

    const worldX = parseInt(xRaw) * -1;
    const worldY = parseInt(yRaw) * -1;

    for (let y = -1; y < totalColumns; y++) {
      for (let x = -1; x < totalRows; x++) {
        const pxX = viewX + ((cellWidth - 1) * x);
        const pxY = viewY + ((cellHeight - 1) * y);

        const actualY = (worldY + y) * -1;
        const actualX = worldX + x;
        const coords = `${actualX}:${actualY}`;

        context.beginPath();
        context.lineWidth = 1;
        const style = options.getCell(actualX, actualY);
        context.strokeStyle = 'black';
        context.fillStyle = style;
        context.fillRect(
          pxX,
          pxY,
          cellWidth,
          cellHeight
        );
        context.stroke();

        context.fillStyle = 'black';
        context.font = '10px Arial';
        context.fillText(coords, pxX + 10, pxY + 20);
      }
    }

    const area = worldX + ':' + worldY + ':' + (worldY + totalColumns) + ':' + (worldX + totalRows);

    if (area !== lastArea) {
      lastArea = area;
      options.onChange && options.onChange(worldX, worldY, worldY + totalColumns, worldX + totalRows);
    }
  }
  draw();

  let startX;
  let startY;
  let dragging = false;
  function touchOrMouseEnd (event) {
    dragging = false;
  }
  function touchOrMouseStart (event) {
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
    dragging = true;
  }
  function touchOrMouseMove (event) {
    if (!dragging) {
      return;
    }

    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    options.worldX = options.worldX - (startX - clientX);
    options.worldY = options.worldY - (startY - clientY);

    startX = clientX;
    startY = clientY;

    dirty = true;
  }
  document.addEventListener('touchend', touchOrMouseEnd);
  options.element.addEventListener('touchstart', touchOrMouseStart);
  document.addEventListener('touchmove', touchOrMouseMove);
  document.addEventListener('mouseup', touchOrMouseEnd);
  options.element.addEventListener('mousedown', touchOrMouseStart);
  document.addEventListener('mousemove', touchOrMouseMove);

  canvas.addEventListener('wheel', function (event) {
    event.preventDefault();

    const mousex = event.offsetX;
    const mousey = event.offsetY;

    const wheel = event.deltaY < 0 ? 1 : -1;

    // Compute zoom factor.
    let zoom = Math.exp(wheel * options.zoomIntensity);
    zoom = scale * zoom > 2 ? 1 : zoom;
    zoom = scale * zoom < 0.5 ? 1 : zoom;

    // Computer offset
    const newScale = scale * zoom;
    options.worldX -= mousex / (newScale) - mousex / scale;
    options.worldY -= mousey / (newScale) - mousey / scale;

    // Update scale and others.
    scale *= zoom;

    dirty = true;
  });

  window.addEventListener('resize', () => {
    dirty = true;
  });

  options.element.innerHTML = '';
  options.element.appendChild(canvas);
}

module.exports = createInfigrid;
