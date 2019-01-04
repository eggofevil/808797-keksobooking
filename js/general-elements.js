'use strict';

/* Модуль general-elements.js */
(function () {
  var pageActive = false;
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = document.querySelector('[name="address"]');
  var mapFiltersInputs = document.querySelector('.map__filters').elements;
  var adFormInputs = adForm.elements;

  window.GeneralElements = {
    pageActive: pageActive,
    map: map,
    mapPinsContainer: mapPinsContainer,
    mapFiltersInputs: mapFiltersInputs,
    adForm: adForm,
    adFormAddress: adFormAddress,
    adFormInputs: adFormInputs,
  };
})();
