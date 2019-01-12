'use strict';

/* Модуль main.js */
(function () {
  var adFormElements = window.generalElements.adForm.elements;
  var mapFiltersElements = document.querySelector('.map__filters').elements;

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
    window.generalElements.map.classList.remove('map--faded');
    window.generalElements.adForm.classList.remove('ad-form--disabled');
    activateInputs(adFormElements);
    activateInputs(mapFiltersElements);
    window.adForm.setToDefault();
    window.pins.renderPins();
    window.generalElements.pinMain.removeEventListener('mousedown', activatePage);
  };

  var resetToDefault = function () {
    var pins = document.querySelectorAll('.map__pin');
    var card = document.querySelector('.map__card');
    window.generalElements.map.classList.add('map--faded');
    window.generalElements.adForm.classList.add('ad-form--disabled');
    disableInputs(adFormElements);
    disableInputs(mapFiltersElements);
    window.pinMain.setToDefault();
    window.adForm.setToDefault();
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].parentElement.removeChild(pins[i]);
      }
    }
    if (card) {
      card.parentElement.removeChild(card);
    }
    pins[0].addEventListener('mousedown', activatePage);
  };

  window.generalElements.adForm.addEventListener('reset', function () {
    setTimeout(resetToDefault, 0); /* Без timout валидация происходит до чистки полей */
  });

  resetToDefault();

  window.main = {
    activatePage: activatePage,
    resetToDefault: resetToDefault
  };
})();
