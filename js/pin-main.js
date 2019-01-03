'use strict';

/* Модуль pin-main.js */
(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_AFTER_HEIGHT = 22;
  var pinMain = document.querySelector('.map__pin--main');

  var getPinMainAddress = function () {
    var pinMainX = parseInt(window.getComputedStyle(pinMain).left, 10);
    var pinMainY = parseInt(window.getComputedStyle(pinMain).top, 10);
    var pinMainAddressX = Math.round(pinMainX + PIN_MAIN_WIDTH / 2);
    var pinMainAddressY = Math.round(pinMainY + PIN_MAIN_HEIGHT + PIN_MAIN_AFTER_HEIGHT);

    return pinMainAddressX + ', ' + pinMainAddressY;
  };

  pinMain.addEventListener('mouseup', function () {
    window.variables.map.classList.remove('map--faded');
    window.variables.adForm.classList.remove('ad-form--disabled');
    window.main.activateInputs(window.variables.adFormInputs);
    window.main.activateInputs(window.variables.mapFiltersInputs);
    window.pins.renderPins();
    window.variables.adFormAddress.value = getPinMainAddress();
  });

  window.pinMain = {
    getPinMainAddress: getPinMainAddress
  };
})();
