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
    window.GeneralElements.map.classList.remove('map--faded');
    window.GeneralElements.adForm.classList.remove('ad-form--disabled');
    window.Main.activateInputs(window.GeneralElements.adFormInputs);
    window.Main.activateInputs(window.GeneralElements.mapFiltersInputs);
    window.Pins.renderPins();
    pinMain.removeEventListener('mouseup', activatePage);
  };
  var setAdFormAddress = function () {
    window.GeneralElements.adFormAddress.value = getPinMainAddress();
  };

  pinMain.addEventListener('mouseup', activatePage);
  pinMain.addEventListener('mouseup', setAdFormAddress);

  window.PinMain = {
    getPinMainAddress: getPinMainAddress
  };
})();
