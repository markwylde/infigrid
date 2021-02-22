const m = require('mithril');
const mem = require('memoizee');
const createInficanvas = require('./createInficanvas');
const createAssetsManager = require('./createAssetManager');
const proceduralGenerator = require('./proceduralGenerator');

const assets = createAssetsManager();
assets.add('grass', './img/grass.png');
assets.add('forest', './img/forest.jpg');
assets.add('ground', './img/ground.png');
assets.add('dirt', './img/dirt.png');
assets.add('water', './img/water.png');
assets.add('home', './img/home.png');

// function getFromHeight (result) {
//   if (result < 0.10) {
//     return assets.water;
//   } else if (result < 0.20) {
//     return assets.dirt;
//   } else if (result < 0.8) {
//     return assets.grass;
//   } else {
//     return assets.forest;
//   }
// }

function getFromHeight (result) {
  return {
    W: assets.water,
    I: assets.grass,
    F: assets.grass,
    D: assets.dirt,
    P: assets.grass,
    J: assets.ground,
    X: assets.ground,
    S: assets.ground,
    B: assets.ground
  }[result.b];
}

const getSection = mem(function getSection (startX, startY) {
  const a = [];
  for (let x = 0; x < 10; x++) {
    const b = [];
    for (let y = 0; y < 10; y++) {
      const result = proceduralGenerator(startX + x, startY + y);
      const tile = getFromHeight(result);
      b.push(tile);
    }
    a.push(b);
  }

  return a;
});

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

            const section = getSection(sectionTop, sectionLeft);

            const left = x * cellWidth;
            const top = y * cellHeight;
            tileLayer.drawImage(left, top, cellWidth, cellHeight, section[sectionCellY][sectionCellX]);
            // tileLayer.fillStyle = 'rgba(0, 0, 0, 0.6)';
            // tileLayer.font = (12 / state.scale) + 'px Arial';
            // tileLayer.fillText(coords, left, top + 12);
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
