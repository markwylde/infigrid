# InfiGrid

## Example
```javascript
const createInficanvas = require('inficanvas');
const createAssetsManager = require('asset-manager');

const assetManager = createAssetsManager()
assets.add('grass', './img/grass.png')
assets.add('dirt', './img/dirt.png')
assets.add('tank', './img/tank.png')

async function main () {
  await assets.waitForLoad()

  const inficanvas = createInficanvas(element)

  const tileLayer = inficanvas.createLayer()
  const tileHoverLayer = inficanvas.createLayer()
  const unitLayer = inficanvas.createLayer()

  const cellWidth = 50
  const cellHeight = 50

  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      tileLayer.draw(x * cellWidth, y * cellHeight, assets.dirt)
    }
  }

  inficanvas.on('framechange', (x1, y1, x2, y,2) => {

  })

  inficanvas.on('mousemove', event => {
    const x = Math.floor(event.x / cellWidth) * cellWidth
    const y = Math.floor(event.y / cellHeight) * cellHeight

    tileHoverLayer.clear()
    tileHoverLayer.draw(x, y, assets.white)
  })

  let tankX = 50
  setTimeout(() => {
    tankX = tankX + 1
    unitLayer.clear()
    unitLayer.draw(tankX, 100, assets.tank)
  }, 500)
}

main();
```

## Development
```bash
git clone https://github.com/markwylde/infigrid.git
cd infigrid
npm install
npm run start
```

Then visit your local server:
http://localhost:8000

### Terminology:
** cellX, cellY ** : the coordinants of the cell in the infinite world
** worldX, worldY ** : the pixels at the top left of the canvas in the context of the entire world