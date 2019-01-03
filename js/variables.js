'use strict';

/* Модуль variables.js */
(function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = document.querySelector('[name="address"]');
  var mapFiltersInputs = window.util.getAllInputs(document.querySelector('.map__filters'));
  var adFormInputs = window.util.getAllInputs(adForm);

  window.variables = {
    map: map,
    mapPinsContainer: mapPinsContainer,
    mapFiltersInputs: mapFiltersInputs,
    adForm: adForm,
    adFormAddress: adFormAddress,
    adFormInputs: adFormInputs,
  };
})();
