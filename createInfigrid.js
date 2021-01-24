function createInfigrid (options) {
  options.element.style.position = 'absolute';
  options.element.style.width = '100%';
  options.element.style.height = '100%';
  options.element.style.backgroundColor = 'yellow';
  options.element.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = options.element.offsetWidth;
  canvas.height = options.element.offsetHeight;

  options.worldX = options.worldX || 0;
  options.worldY = options.worldY || 0;
  options.zoomIntensity = options.zoomIntensity || 0.02;

  let scale = 1;

  let dirty = true;
  function draw () {
    window.requestAnimationFrame(draw);

    if (!dirty) {
      return;
    }

    dirty = false;
    context.clearRect(0, 0, canvas.width, canvas.height);

    const cellWidth = options.cellWidth / scale;
    const cellHeight = options.cellHeight / scale;

    const totalRows = Math.ceil(options.element.offsetWidth / cellWidth) + 2;
    const totalCells = Math.ceil(options.element.offsetHeight / cellHeight) + 2;

    const xRaw = options.worldX / cellWidth;
    const yRaw = options.worldY / cellHeight;

    const viewX = cellWidth * (xRaw % 1);
    const viewY = cellHeight * (yRaw % 1);

    const worldX = parseInt(xRaw) * -1;
    const worldY = parseInt(yRaw) * -1;

    for (let y = -1; y < totalCells; y++) {
      for (let x = -1; x < totalRows; x++) {
        const pxX = viewX + (cellWidth * x) + 1;
        const pxY = viewY + (cellHeight * y) + 1;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'red';
        context.rect(
          pxX,
          pxY,
          cellWidth,
          cellHeight
        );
        context.stroke();
        context.font = '14px Arial';
        context.fillText(`${worldX + x}:${(worldY + y) * -1}`, pxX + 10, pxY + 20);
      }
    }

    window.requestAnimationFrame(draw);
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
    const zoom = Math.exp(wheel * options.zoomIntensity);

    // Computer offset
    options.worldX -= mousex / (scale * zoom) - mousex / scale;
    options.worldY -= mousey / (scale * zoom) - mousey / scale;

    // Update scale and others.
    scale *= zoom;
    dirty = true;
  });

  options.element.innerHTML = '';
  options.element.appendChild(canvas);
}

module.exports = createInfigrid;
