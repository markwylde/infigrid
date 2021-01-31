const m = require('mithril');

const createInficanvas = require('./createInficanvas');
const createAssetsManager = require('./createAssetManager');

const assets = createAssetsManager();
assets.add('grass', './img/grass.png');
assets.add('ground', './img/ground.png');
assets.add('dirt', './img/dirt.png');
assets.add('water', './img/water.png');
assets.add('home', './img/home.png');

function getSection (x, y) {
  const g = assets.grass;
  const p = assets.ground;
  const d = assets.dirt;

  return x % 2 === 0 && y % 2 === 0
    ? [
        [d, d, d, d, d, d, d, d, d, d],
        [d, g, g, g, g, g, g, g, g, d],
        [d, g, p, p, p, g, g, g, g, d],
        [d, g, p, p, p, g, g, g, g, d],
        [d, g, p, p, p, g, g, g, g, d],
        [d, g, g, g, g, g, g, g, g, d],
        [d, g, g, g, g, g, g, g, g, d],
        [d, g, g, g, g, g, g, g, g, d],
        [d, g, g, g, g, g, g, g, g, d],
        [d, d, d, d, d, d, d, d, d, d]
      ]
    : [
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d],
        [d, d, d, d, d, d, d, d, d, d]
      ];
}

function inficanvas () {
  return {
    oncreate: async (vnode) => {
      const { cellWidth, cellHeight } = vnode.attrs;

      await assets.waitForLoad();

      const element = vnode.dom;
      const inficanvas = createInficanvas({ element });

      const tileLayer = inficanvas.createLayer();
      const buildingLayer = inficanvas.createLayer();

      buildingLayer.on('hover', function (event, state) {
        const cellX = Math.floor(event.x / cellWidth);
        const cellY = Math.floor(event.y / cellHeight);

        buildingLayer.clear();
        buildingLayer.drawImage(
          cellX * cellWidth,
          (cellY * cellHeight) - cellHeight,
          cellWidth * 2,
          cellHeight * 2,
          assets.home
        );
      });

      tileLayer.on('move', function (state) {
        const firstCellLeft = (state.worldX / cellWidth) * -1;
        const firstCellTop = (state.worldY / cellHeight) * -1;

        // const offsetLeft = firstCellLeft % 1;
        // const offsetTop = firstCellTop % 1;
        const firstCellX = Math.floor(firstCellLeft);
        const firstCellY = Math.floor(firstCellTop);

        const totalRows = Math.ceil(element.offsetWidth / (cellWidth / state.scale)) + 2;
        const totalColumns = Math.ceil(element.offsetHeight / (cellHeight / state.scale)) + 2;

        for (let x = firstCellX; x < firstCellX + totalRows; x++) {
          for (let y = firstCellY; y < firstCellY + totalColumns; y++) {
            const coords = `${x}:${y}`;

            const sectionX = Math.floor(x / 10);
            const sectionY = Math.floor(y / 10);
            const sectionTop = sectionY * 10;
            const sectionLeft = sectionX * 10;
            const sectionCellX = x - sectionLeft;
            const sectionCellY = y - sectionTop;

            const section = getSection(sectionX, sectionY);

            const left = x * cellWidth;
            const top = y * cellHeight;
            tileLayer.drawImage(left, top, cellWidth, cellHeight, section[sectionCellY][sectionCellX]);
            tileLayer.fillStyle = 'rgba(0, 0, 0, 0.6)';
            tileLayer.font = (12 / state.scale) + 'px Arial';
            tileLayer.fillText(coords, left, top + (12 / state.scale));
          }
        }
      });
    },

    view: () => {
      return m('div', 'Initialising Grid');
    }
  };
}

function demoApp () {
  return {
    view: () => {
      return m('main',
        m('h1', 'Demo of Inficanvas'),
        m('p', (new Date()).toString()),
        m('div', { class: 'wrapper' },
          m(inficanvas, { cellWidth: 50, cellHeight: 50 })
        )
      );
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  m.mount(document.body, demoApp());
});

window.m = m;
