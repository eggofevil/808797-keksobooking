'use strict';

/* Модуль pin-main.js */
(function () {
  var pinMain = window.generalElements.pinMain;

  var startingCoords = {
    x: pinMain.style.left,
    y: pinMain.style.top
  };

  var currentCoords = {
    updateCoords: function () {
      this.x = pinMain.style.left;
      this.y = pinMain.style.top;
      window.adForm.currentHousingAddress.updateHousingAddress(parseInt(this.x, 10), parseInt(this.y, 10));
    }
  };

  var setToDefault = function () {
    pinMain.style.left = startingCoords.x;
    pinMain.style.top = startingCoords.y;
    currentCoords.updateCoords();
  };

 // window.generalElements.pinMain.addEventListener('mousedown', window.main.activatePage);

  window.pinMain = {
    startingCoords: startingCoords,
    currentCoords: currentCoords,
    setToDefault: setToDefault,
  };
})();
