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

  var activatePage = function () {
    window.generalElements.map.classList.remove('map--faded');
    window.generalElements.adForm.classList.remove('ad-form--disabled');
    window.main.activateInputs(window.generalElements.adFormInputs);
    window.main.activateInputs(window.generalElements.mapFiltersInputs);
    window.pins.renderPins();
    pinMain.removeEventListener('mouseup', activatePage);
  };
  var setAdFormAddress = function () {
    window.generalElements.adFormAddress.value = getPinMainAddress();
  };

  pinMain.addEventListener('mouseup', activatePage);
  pinMain.addEventListener('mouseup', setAdFormAddress);

  window.pinMain = {
    getPinMainAddress: getPinMainAddress
  };
})();
