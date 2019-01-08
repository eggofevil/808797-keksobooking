'use strict';

/* Модуль general-elements.js */
(function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersInputs = document.querySelector('.map__filters').elements;
  var adFormInputs = adForm.elements;

  window.generalElements = {
    map: map,
    mapPinsContainer: mapPinsContainer,
    pinMain: pinMain,
    mapFiltersInputs: mapFiltersInputs,
    adForm: adForm,
    adFormInputs: adFormInputs,
  };
})();
