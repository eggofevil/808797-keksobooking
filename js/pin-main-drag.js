'use strict';

/* Модуль pin-main-drag.js */
(function () {
  var PIN_MAIN_ADDRESS_X_OFFSET = 32;
  var PIN_MAIN_ADDRESS_Y_OFFSET = 81;
  var pinMain = window.generalElements.pinMain;
  var pinMainCoords = {
    x: parseInt(pinMain.style.left, 10),
    y: parseInt(pinMain.style.top, 10),
  };
  var addressCoords = {
    x: pinMainCoords.x + PIN_MAIN_ADDRESS_X_OFFSET,
    y: pinMainCoords.y + PIN_MAIN_ADDRESS_Y_OFFSET
  };
  var mouseCoords = {};

  var updateCoords = function (shift) {
    var xMax = window.util.getParentElementWidth(pinMain);
    var pendingAddressCoords = {
      x: addressCoords.x - shift.x,
      y: addressCoords.y - shift.y
    };
    if (pendingAddressCoords.x <= 0) {
      addressCoords.x = 0;
    } else if (pendingAddressCoords.x >= xMax) {
      addressCoords.x = xMax;
    } else {
      addressCoords.x -= shift.x;
    }
    if (pendingAddressCoords.y <= 130) {
      addressCoords.y = 130;
    } else if (pendingAddressCoords.y >= 630) {
      addressCoords.y = 630;
    } else {
      addressCoords.y -= shift.y;
    }
    pinMainCoords.x = addressCoords.x - PIN_MAIN_ADDRESS_X_OFFSET;
    pinMainCoords.y = addressCoords.y - PIN_MAIN_ADDRESS_Y_OFFSET;
  };

  var dragPinMain = function (evt) {
    mouseCoords.x = evt.clientX;
    mouseCoords.y = evt.clientY;
    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  };

  var onPinMainMouseMove = function (moveEvt) {
    var shift = {
      x: mouseCoords.x - moveEvt.clientX,
      y: mouseCoords.y - moveEvt.clientY
    };
    mouseCoords.x -= shift.x;
    mouseCoords.y -= shift.y;
    updateCoords(shift);
    pinMain.style.left = pinMainCoords.x + 'px';
    pinMain.style.top = pinMainCoords.y + 'px';
    window.adForm.updateAddressInput();

    /* for testing */
    window.testPoint.style.left = addressCoords.x + 'px';
    window.testPoint.style.top = addressCoords.y + 'px';
    /* for testing */
  };

  var onPinMainMouseUp = function () {
    document.removeEventListener('mousemove', onPinMainMouseMove);
    document.removeEventListener('mouseup', onPinMainMouseUp);
  };

  pinMain.addEventListener('mousedown', dragPinMain);
  window.addressCoords = addressCoords;
})();
