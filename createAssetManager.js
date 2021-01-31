function createAssetManager () {
  const scope = {};
  let waiters = [];

  scope.imagesLoaded = 0;
  scope.imageCount = 0;

  scope.waitForLoad = function () {
    return new Promise(resolve => {
      waiters.push(resolve);
      runWaits();
    });
  };

  function runWaits () {
    if (scope.imageCount === scope.imagesLoaded) {
      waiters.forEach(waiter => waiter());
      waiters = [];
    }
  }

  scope.add = function (name, src) {
    scope.imageCount = scope.imageCount + 1;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      window.redraw && window.redraw();
      scope.imagesLoaded = scope.imagesLoaded + 1;
      scope[name] = image;
      runWaits();
    };
    return image;
  };

  return scope;
}

module.exports = createAssetManager;
