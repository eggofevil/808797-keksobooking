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
    if (window.adForm.resetPressed) {
      window.pins.renderPins();
    } else {
      window.backend.getData();
    }
    window.adForm.resetPressed = false;
    window.generalElements.map.classList.remove('map--faded');
    window.generalElements.adForm.classList.remove('ad-form--disabled');
    activateInputs(adFormElements);
    window.generalElements.pinMain.removeEventListener('mousedown', activatePage);
  };

  var resetToDefault = function () {
    window.generalElements.map.classList.add('map--faded');
    window.generalElements.adForm.classList.add('ad-form--disabled');
    disableInputs(adFormElements);
    disableInputs(filterElements);
    window.generalElements.filter.reset();
    window.filterData = [];
    window.pins.removePins();
    window.cards.removeCard();
    window.adForm.validate();
    window.pinMain.setToDefault();
    window.generalElements.pinMain.addEventListener('mousedown', activatePage);
  };

  var stopEscapeBubbling = function (evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };

  disableInputs(adFormElements);
  disableInputs(filterElements);
  window.pinMain.setToDefault();
  window.adForm.validate();
  window.generalElements.pinMain.addEventListener('mousedown', activatePage);
  window.generalElements.filter.addEventListener('keydown', stopEscapeBubbling);
  window.generalElements.adForm.addEventListener('keydown', stopEscapeBubbling);

  window.main = {
    activatePage: activatePage,
    resetToDefault: resetToDefault,
    activateInputs: activateInputs
  };
})();
