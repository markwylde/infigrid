const noise = require('./perlin/perlin')();
noise.seed(0.5);
function proceduralGenerator (x, y) {
  return Math.abs(noise.simplex2(x / 100, y / 100));
}

module.exports = proceduralGenerator;
