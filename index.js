const Chance = require('chance');
// const chance = new Chance();
const m = require('mithril');

const createInfigrid = require('./createInfigrid');

function createImage (src) {
  const image = new window.Image();
  image.src = src;
  image.onload = () => {
    window.redraw && window.redraw();
  };
  return image;
}

const tiles = {
  grass: createImage('./img/grass.png'),
  ground: createImage('./img/ground.png'),
  dirt: createImage('./img/dirt.png'),
  water: createImage('./img/water.png')
};

function getSection (x, y) {
  const t = tiles.grass;
  const p = tiles.ground;
  const o = tiles.dirt;
  const f = tiles.water;

  return x % 2 === 0 && y % 2 === 0
    ? [
        [o, o, o, o, o, o, o, o, o, o],
        [o, t, t, t, t, t, t, t, t, o],
        [o, t, p, p, p, t, t, t, t, o],
        [o, t, p, p, p, t, t, t, t, o],
        [o, t, p, p, p, t, t, t, t, o],
        [o, t, t, t, t, t, t, t, t, o],
        [o, t, t, t, t, t, t, t, t, o],
        [o, t, t, t, t, t, t, t, t, o],
        [o, t, t, t, t, t, t, t, t, o],
        [o, o, o, o, o, o, o, o, o, o]
      ]
    : [
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f],
        [f, f, f, f, f, f, f, f, f, f]
      ];
}

function infiGrid () {
  return {
    oncreate: (vnode) => {
      const element = vnode.dom;
      createInfigrid({
        element,
        cellWidth: vnode.attrs.cellWidth,
        cellHeight: vnode.attrs.cellHeight,

        getCell: (x, y) => {
          const sectionX = Math.floor(x / 10);
          const sectionY = Math.floor(y / 10);
          const sectionTop = sectionY * 10;
          const sectionLeft = sectionX * 10;
          const cellX = x - sectionLeft;
          const cellY = y - sectionTop;

          const section = getSection(sectionX, sectionY);

          return section[cellY][cellX];
          // return x % 2 === 0 && y % 2 === 0 ? '#547c21' : '#7b521d';
        },

        onChange: (x1, y1, x2, y2) => {
          // console.log('coords created:', { x1, y1, x2, y2 });
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
        m('h1', 'Demo of InfiGrid'),
        m('p', (new Date()).toString()),
        m('div', { class: 'wrapper' },
          m(infiGrid, { cellWidth: 50, cellHeight: 50 })
        )
      );
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  m.mount(document.body, demoApp());
});

window.m = m;
