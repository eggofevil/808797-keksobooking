'use strict';

/* Модуль general-elements.js */
(function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var filter = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');

  window.generalElements = {
    map: map,
    mapPinsContainer: mapPinsContainer,
    pinMain: pinMain,
    filter: filter,
    adForm: adForm,
  };
})();
