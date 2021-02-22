// const noise = require('./perlin/perlin')();
// noise.seed(0.5);
// function proceduralGenerator (x, y) {
//   return Math.abs(noise.simplex2(x / 100, y / 100));
// }

const BetterTerrain = require('./betterTerrain');

const terrain = new BetterTerrain({
  freq: 50,
  chunksize: 1,
  seed: 123456789,
  biomes: {
    W: {
      name: 'water',
      color: '#4286f4'
    },
    D: {
      name: 'desert',
      color: '#f4e841'
    },
    P: {
      name: 'plains',
      color: '#c2db55',
      structures: [{
        name: 'house',
        chance: 50
      }],
      childentities: [{
        name: 'dog',
        chance: 20
      }]
    },
    J: {
      name: 'jungle',
      color: '#45d61d',
      childtiles: [{
        name: 'P',
        chance: 20
      }]
    }
  },
  biomemap: [
    ['S', 'S', 'S', 'S', 'I', 'I'], // <--- 1
    ['S', 'S', 'S', 'I', 'I', 'B'],
    ['S', 'S', 'I', 'I', 'B', 'B'],
    ['S', 'S', 'I', 'I', 'B', 'P'],
    ['S', 'B', 'B', 'B', 'P', 'J'],
    ['S', 'B', 'B', 'B', 'P', 'J'],
    ['S', 'F', 'F', 'P', 'J', 'D'],
    ['S', 'F', 'P', 'J', 'D', 'D'],
    ['I', 'W', 'W', 'W', 'W', 'W'], // <--- 0
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X'] // <--- -1
  ]
});

function proceduralGenerator (x, y) {
  return terrain.getdata(x, y);
}

module.exports = proceduralGenerator;
