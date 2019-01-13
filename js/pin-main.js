'use strict';

/* Модуль pin-main.js */
(function () {
  var AddressOffset = {
    X: 32,
    Y: 81
  };

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

  window.pinMain = {
    AddressOffset: AddressOffset,
    startingCoords: startingCoords,
    currentCoords: currentCoords,
    setToDefault: setToDefault,
  };
})();
