function createInfigrid (options) {
  options.element.style.position = 'absolute';
  options.element.style.width = '100%';
  options.element.style.height = '100%';
  options.element.style.overflow = 'hidden';

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  const context = canvas.getContext('2d');

  const canvasB = document.createElement('canvas');
  canvasB.style.position = 'absolute';
  const contextB = canvasB.getContext('2d');

  options.worldX = options.worldX || 0;
  options.worldY = options.worldY || 0;
  options.zoomIntensity = options.zoomIntensity || 0.02;
  options.maximumScale = options.maximumScale || 3;
  options.minimumScale = options.minimumScale || 0.1;
  options.fpsLimit = options.fpsLimit || 50;
  options.scale = options.scale || 1;

  const state = {
    lastArea: null,
    dirty: true,
    previousDelta: 0,

    cellWidth: null,
    cellHeight: null
  };

  function resize () {
    canvas.width = options.element.offsetWidth;
    canvas.height = options.element.offsetHeight;

    canvasB.width = options.element.offsetWidth;
    canvasB.height = options.element.offsetHeight;

    state.dirty = true;
    calc();
  }
  resize();

  function calc () {
    state.scaledCellWidth = options.cellWidth / options.scale;
    state.scaledCellHeight = options.cellHeight / options.scale;

    const scaledWorldX = (options.worldX / options.scale) / state.scaledCellWidth;
    const scaledWorldY = (options.worldY / options.scale) / state.scaledCellHeight;

    state.scaledWorldX = state.scaledCellWidth * (scaledWorldX % 1);
    state.scaledWorldY = state.scaledCellHeight * (scaledWorldY % 1);

    state.cellX = parseInt(scaledWorldX) * -1;
    state.cellY = parseInt(scaledWorldY) * -1;

    return state;
  }

  function draw (currentDelta, force = false) {
    window.requestAnimationFrame(draw);
    const delta = currentDelta - state.previousDelta;

    if (!force && options.fpsLimit && delta < 1000 / options.fpsLimit) {
      return;
    }

    if (!force && !state.dirty) {
      return;
    }

    state.dirty = false;
    contextB.clearRect(0, 0, canvas.width, canvas.height);

    const totalRows = Math.ceil(options.element.offsetWidth / state.scaledCellWidth) + 2;
    const totalColumns = Math.ceil(options.element.offsetHeight / state.scaledCellHeight) + 2;
    for (let y = -1; y < totalColumns; y++) {
      for (let x = -1; x < totalRows; x++) {
        const cellY = state.cellY + y;
        const cellX = state.cellX + x;

        const left = state.scaledWorldX + (state.scaledCellWidth * x);
        const top = state.scaledWorldY + (state.scaledCellHeight * y);

        options.drawCell({
          state,
          options,
          context,
          cellX: cellX,
          cellY: cellY,
          left,
          top,
          width: state.scaledCellWidth,
          height: state.scaledCellHeight
        });
      }
    }

    const area = state.cellX + ':' + state.cellY + ':' + (state.cellY + totalColumns) + ':' + (state.cellX + totalRows);

    if (area !== state.lastArea) {
      state.lastArea = area;
      options.onChange && options.onChange(state.cellX, state.cellY, state.cellY + totalColumns, state.cellX + totalRows);
    }

    state.previousDelta = currentDelta;
  }
  draw();

  window.redraw = () => {
    state.dirty = true;
  };

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
      const worldX = (options.worldX * -1) / options.scale;
      const mouseX = event.offsetX;
      const cellX = Math.floor((worldX + mouseX) / state.scaledCellWidth);

      const worldY = (options.worldY * -1) / options.scale;
      const mouseY = event.offsetY;
      const cellY = Math.floor((worldY + mouseY) / state.scaledCellHeight);

      const left = (worldX - (state.scaledCellWidth * cellX)) * -1;
      const top = (worldY - (state.scaledCellHeight * cellY)) * -1;
      contextB.clearRect(0, 0, canvas.width, canvas.height);

      options.drawCell({
        state,
        options,
        context: contextB,
        cellX,
        cellY,
        left: left,
        top: top,
        width: state.scaledCellWidth,
        height: state.scaledCellHeight,
        hovered: true
      });

      options.mouseX = event.offsetX;
      options.mouseY = event.offsetX;

      // options.onHover && options.onHover(x, y);

      return;
    }

    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;

    options.worldX = options.worldX - ((startX - clientX) * options.scale);
    options.worldY = options.worldY - ((startY - clientY) * options.scale);

    startX = clientX;
    startY = clientY;
    calc();
    state.dirty = true;
  }
  document.addEventListener('touchend', touchOrMouseEnd);
  options.element.addEventListener('touchstart', touchOrMouseStart);
  document.addEventListener('touchmove', touchOrMouseMove);
  document.addEventListener('mouseup', touchOrMouseEnd);
  options.element.addEventListener('mousedown', touchOrMouseStart);
  document.addEventListener('mousemove', touchOrMouseMove);

  canvasB.addEventListener('wheel', function (event) {
    event.preventDefault();

    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const wheel = event.deltaY < 0 ? 1 : -1;

    // Compute zoom factor.
    let tweakScale = Math.exp(wheel * options.zoomIntensity);
    tweakScale = options.scale * tweakScale > options.maximumScale ? 1 : tweakScale;
    tweakScale = options.scale * tweakScale < options.minimumScale ? 1 : tweakScale;
    tweakScale = tweakScale.toFixed(5);

    // Computer offset
    const newScale = options.scale * tweakScale;
    const scaleDiff = options.scale - newScale;
    options.worldX = options.worldX - (mouseX * scaleDiff);
    options.worldY = options.worldY - (mouseY * scaleDiff);

    // Update scale and others.
    options.scale *= tweakScale;

    calc();
    state.dirty = true;
  });

  window.addEventListener('resize', resize);

  options.element.innerHTML = '';
  options.element.appendChild(canvas);
  options.element.appendChild(canvasB);

  return options;
}

module.exports = createInfigrid;
