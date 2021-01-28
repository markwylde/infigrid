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
  water: createImage('./img/water.png'),
  home: createImage('./img/home.png')
};

function getSection (x, y) {
  const t = tiles.grass;
  const p = tiles.ground;
  const o = tiles.dirt;

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
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o],
        [o, o, o, o, o, o, o, o, o, o]
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

        drawCell: ({ options, context, cellX, cellY, left, top, width, height, hovered }) => {
          const sectionX = Math.floor(cellX / 10);
          const sectionY = Math.floor(cellY / 10);
          const sectionTop = sectionY * 10;
          const sectionLeft = sectionX * 10;
          const sectionCellX = cellX - sectionLeft;
          const sectionCellY = cellY - sectionTop;

          const section = getSection(sectionX, sectionY);

          const coords = `${cellX}:${cellY}`;

          if (hovered) {
            const image = hovered ? tiles.home : section[sectionCellY][sectionCellX];

            const ratio = image.width / image.height;

            context.drawImage(image, left - 1, (top - height) - 1, (width * 2) + 1, ((height * 2) * ratio) + 1);
          } else {
            const image = hovered ? tiles.home : section[sectionCellY][sectionCellX];
            // context.strokeStyle = 'black';
            // context.fillStyle = style;
            // context.fillRect(
            //   posX - 1,
            //   posY - 1,
            //   cellWidth + 1,
            //   cellHeight + 1
            // );
            context.drawImage(image, left - 1, top - 1, width + 1, height + 1);
            // context.stroke();

            context.fillStyle = 'rgba(0, 0, 0, 0.6)';
            context.font = (12 / options.scale) + 'px Arial';
            context.fillText(coords, left, top + (12 / options.scale));
          }
        }

        // onHover: (x, y) => {
        //   console.log('Hover:', x, y);
        // },

        // onChange: (x1, y1, x2, y2) => {
        //   console.log('coords created:', { x1, y1, x2, y2 });
        // }
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
