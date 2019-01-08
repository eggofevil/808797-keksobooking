'use strict';

/* Модуль test-point.js - создает светло-зеленую точку 1px на 1px по координатам addressCoords */
(function () {
  var testPoint = document.createElement('div');
  testPoint.style.position = 'absolute';
  testPoint.style.width = '1px';
  testPoint.style.height = '1px';
  testPoint.style.background = 'lightgreen';
  testPoint.style.top = window.addressCoords.x + 'px';
  testPoint.style.left = window.addressCoords.y + 'px';
  window.generalElements.mapPinsContainer.appendChild(testPoint);

  window.testPoint = testPoint;
})();
