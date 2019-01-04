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

  disableInputs(window.GeneralElements.mapFiltersInputs);
  disableInputs(window.GeneralElements.adFormInputs);

  window.Main = {
    activateInputs: activateInputs
  };
})();
