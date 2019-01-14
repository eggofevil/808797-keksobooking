'use strict';

/* Модуль main.js */
(function () {
  var adFormElements = window.generalElements.adForm.elements;
  var filterElements = window.generalElements.filter.elements;

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

  var activatePage = function () {
    window.backend.getData();
    window.generalElements.map.classList.remove('map--faded');
    window.generalElements.adForm.classList.remove('ad-form--disabled');
    activateInputs(adFormElements);
    window.adForm.setToDefault();
    window.generalElements.pinMain.removeEventListener('mousedown', activatePage);
  };

  var resetToDefault = function () {
    window.generalElements.map.classList.add('map--faded');
    window.generalElements.adForm.classList.add('ad-form--disabled');
    disableInputs(adFormElements);
    disableInputs(filterElements);
    window.pinMain.setToDefault();
    window.adForm.setToDefault();
    window.pins.removePins();
    window.cards.removeCard();
    window.generalElements.pinMain.addEventListener('mousedown', activatePage);
  };

  window.generalElements.adForm.addEventListener('reset', function () {
    setTimeout(resetToDefault, 0); /* Без timout валидация происходит до чистки полей */
  });

  resetToDefault();

  window.main = {
    activatePage: activatePage,
    resetToDefault: resetToDefault,
    activateInputs: activateInputs
  };
})();
