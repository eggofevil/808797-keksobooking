'use strict';

/* Модуль main.js */
(function () {

  var activateInputs = function (inputs) {
    var i = inputs.length;
    while (i--) {
      inputs[i].removeAttribute('disabled');
    }
  };

  var disableInputs = function (inputs) {
    var i = inputs.length;
    while (i--) {
      inputs[i].setAttribute('disabled', '');
    }
  };

  disableInputs(window.generalElements.mapFiltersInputs);
  disableInputs(window.generalElements.adFormInputs);

  window.main = {
    activateInputs: activateInputs
  };
})();
