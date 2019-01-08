'use strict';

/* Модуль pin-main.js */
(function () {
  var activatePage = function () {
    window.generalElements.map.classList.remove('map--faded');
    window.generalElements.adForm.classList.remove('ad-form--disabled');
    window.main.activateInputs(window.generalElements.adFormInputs);
    window.main.activateInputs(window.generalElements.mapFiltersInputs);
    window.adForm.validateEmptyForm();
    window.pins.renderPins();
    window.generalElements.pinMain.removeEventListener('mousedown', activatePage);
  };

  window.generalElements.pinMain.addEventListener('mousedown', activatePage);
})();
