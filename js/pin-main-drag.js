'use strict';

/* Модуль pin-main-drag.js */
(function () {
  var PIN_MAIN_ADDRESS_X_OFFSET = 32;
  var PIN_MAIN_ADDRESS_Y_OFFSET = 81;
  var pinMain = window.generalElements.pinMain;
  var pinMainCoords = {};
  var mouseCoords = {};

  var updateCoords = function (shift) {
    var xMax = window.util.getParentElementWidth(pinMain);
    var pendingAddressCoords = {
      x: window.adForm.currentHousingAddress.x - shift.x,
      y: window.adForm.currentHousingAddress.y - shift.y
    };
    if (pendingAddressCoords.x <= 0) {
      pinMainCoords.x = 0 - PIN_MAIN_ADDRESS_X_OFFSET;
    } else if (pendingAddressCoords.x >= xMax) {
      pinMainCoords.x = xMax - PIN_MAIN_ADDRESS_X_OFFSET;
    } else {
      pinMainCoords.x -= shift.x;
    }
    if (pendingAddressCoords.y <= 130) {
      pinMainCoords.y = 130 - PIN_MAIN_ADDRESS_Y_OFFSET;
    } else if (pendingAddressCoords.y >= 630) {
      pinMainCoords.y = 630 - PIN_MAIN_ADDRESS_Y_OFFSET;
    } else {
      pinMainCoords.y -= shift.y;
    }
  };

  var dragPinMain = function (evt) {
    pinMainCoords.x = parseInt(pinMain.style.left, 10);
    pinMainCoords.y = parseInt(pinMain.style.top, 10);
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
    window.pinMain.currentCoords.updateCoords();
  };

  var onPinMainMouseUp = function () {
    document.removeEventListener('mousemove', onPinMainMouseMove);
    document.removeEventListener('mouseup', onPinMainMouseUp);
  };

  pinMain.addEventListener('mousedown', dragPinMain);
})();
