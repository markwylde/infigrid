const m = require('mithril');

const createInfigrid = require('./createInfigrid');

function infiGrid () {
  return {
    oncreate: (vnode) => {
      const element = vnode.dom;
      createInfigrid({
        element,
        cellWidth: vnode.attrs.cellWidth,
        cellHeight: vnode.attrs.cellHeight,

        onCellCreate: coords => {
          console.log('coords created:', coords);
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
