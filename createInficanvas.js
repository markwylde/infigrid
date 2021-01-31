const EventListener = require('events');

function createInfigrid (options) {
  options.element.innerHTML = '';
  options.element.style.position = 'absolute';
  options.element.style.width = '100%';
  options.element.style.height = '100%';
  options.element.style.overflow = 'hidden';

  options.zoomIntensity = options.zoomIntensity || 0.02;
  options.maximumScale = options.maximumScale || 1.5;
  options.minimumScale = options.minimumScale || 0.5;
  options.fpsLimit = options.fpsLimit || 50;

  const state = {
    layers: [],

    lastArea: null,
    dirty: true,
    previousDelta: 0,

    worldX: options.worldX || 0,
    worldY: options.worldY || 0,

    scale: options.scale || 1
  };

  function redraw () {
    state.layers.forEach((layer) => {
      const { canvas, context } = layer;
      canvas.width = options.element.offsetWidth;
      canvas.height = options.element.offsetHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);

      layer.emit('move', state);
    });
  }

  function drawImage ({ canvas, context }) {
    return (x, y, width, height, image) => {
      x = state.worldX + x;
      y = state.worldY + y;
      context.drawImage(image, x / state.scale, y / state.scale, width / state.scale, height / state.scale);
    };
  }

  function fillText ({ canvas, context }) {
    return (text, x, y) => {
      x = state.worldX + x;
      y = state.worldY + y;
      context.fillText(text, x / state.scale, y / state.scale);
    };
  }

  function clear ({ canvas, context }) {
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }

  function createLayer () {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    const context = canvas.getContext('2d');

    options.element.appendChild(canvas);

    const eventListener = new EventListener();
    eventListener.canvas = canvas;
    eventListener.context = context;

    state.layers.push(eventListener);

    eventListener.clear = clear({ canvas, context, eventListener });
    eventListener.drawImage = drawImage({ canvas, context, eventListener });
    eventListener.fillText = fillText({ canvas, context, eventListener });

    eventListener.fillStyle = {
      set (a) {
        context.fillStyle = a;
      }
    };
    eventListener.font = {
      set (a) {
        context.font = a;
      }
    };

    setTimeout(redraw);

    return eventListener;
  }

  function touchOrMouseEnd (event) {
    state.dragging = false;
  }
  function touchOrMouseStart (event) {
    state.dragStartX = event.offsetX || event.touches[0].clientX;
    state.dragStartY = event.offsetY || event.touches[0].clientY;
    state.dragging = true;
  }
  function touchOrMouseMove (event) {
    if (!event.offsetX && !event.touched) {
      return;
    }

    const clientX = event.offsetX || event.touches[0].clientX;
    const clientY = event.offsetY || event.touches[0].clientY;

    if (!state.dragging) {
      state.layers.forEach((layer) => {
        layer.emit('hover', {
          x: (state.worldX * -1) + (clientX * state.scale),
          y: (state.worldY * -1) + (clientY * state.scale)
        }, state);
      });
      return;
    }

    state.worldX = state.worldX - ((state.dragStartX - clientX) * state.scale);
    state.worldY = state.worldY - ((state.dragStartY - clientY) * state.scale);

    state.dragStartX = clientX;
    state.dragStartY = clientY;

    redraw();
  }

  function wheel (event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    const wheel = event.deltaY < 0 ? 1 : -1;

    // Compute zoom factor.
    let tweakScale = Math.exp(wheel * options.zoomIntensity);
    tweakScale = state.scale * tweakScale > options.maximumScale ? 1 : tweakScale;
    tweakScale = state.scale * tweakScale < options.minimumScale ? 1 : tweakScale;
    tweakScale = tweakScale.toFixed(5);

    // Computer offset
    const newScale = state.scale * tweakScale;
    const scaleDiff = state.scale - newScale;
    state.worldX = state.worldX - (mouseX * scaleDiff);
    state.worldY = state.worldY - (mouseY * scaleDiff);

    // Update scale and others.
    state.scale *= tweakScale;

    redraw();
  }

  document.addEventListener('wheel', wheel);
  document.addEventListener('touchend', touchOrMouseEnd);
  options.element.addEventListener('touchstart', touchOrMouseStart);
  document.addEventListener('touchmove', touchOrMouseMove);
  document.addEventListener('mouseup', touchOrMouseEnd);
  options.element.addEventListener('mousedown', touchOrMouseStart);
  document.addEventListener('mousemove', touchOrMouseMove);

  return {
    createLayer
  };
}

module.exports = createInfigrid;
