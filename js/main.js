'use strict';

/* Модуль main.js */
(function () {
  var activateInputs = function (inputs) {
    inputs.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  var disableInputs = function (inputs) {
    inputs.forEach(function (element) {
      element.setAttribute('disabled', '');
    });
  };
  disableInputs(window.variables.mapFiltersInputs);
  disableInputs(window.variables.adFormInputs);

  window.main = {
    activateInputs: activateInputs
  };
})();
