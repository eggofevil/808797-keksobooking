'use strict';

/* Модуль ad-form.js */
(function () {
  var housingTypeSelect = document.querySelector('[name="type"]');
  var housingPriceInput = document.querySelector('[name="price"]');
  var timeInSelect = document.querySelector('[name="timein"]');
  var timeOutSelect = document.querySelector('[name="timeout"]');
  var roomsSelect = document.querySelector('[name="rooms"]');
  var guestsSelect = document.querySelector('[name="capacity"]');
  var guestsSelectOptions = guestsSelect.children;

  var housingTypeAndPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var roomsAndGuests = {
    100: ['0'],
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1']
  };

  var validateHousingPrice = function (housingType) {
    housingPriceInput.min = housingTypeAndPrice[housingType];
    housingPriceInput.placeholder = housingTypeAndPrice[housingType];
  };

  var validateTimeOut = function (timeIn) {
    timeOutSelect.value = timeIn;
  };

  var validateGuests = function (rooms) {
    guestsSelect.value = roomsAndGuests[rooms][0];
    var i = guestsSelectOptions.length;
    while (i--) {
      guestsSelectOptions[i].removeAttribute('disabled');
      if (roomsAndGuests[rooms].indexOf(guestsSelectOptions[i].value) === -1) {
        guestsSelectOptions[i].setAttribute('disabled', '');
      }
    }
  };

  var validateEmptyForm = function () {
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
    window.generalElements.adFormAddress.value = window.pinMain.getPinMainAddress();
  };

  window.generalElements.adForm.addEventListener('reset', function () {
    setTimeout(validateEmptyForm, 0);
  });

  housingTypeSelect.addEventListener('change', function () {
    validateHousingPrice(housingTypeSelect.value);
  });
  timeInSelect.addEventListener('change', function () {
    validateTimeOut(timeInSelect.value);
  });
  roomsSelect.addEventListener('change', function () {
    validateGuests(roomsSelect.value);
  });

  window.adForm = {
    validateEmptyForm: validateEmptyForm
  };
})();

/* Alter */

/* validate time out */
/*
var timeOutSelectOptions = timeOutSelect.children;

var validateTimeOut = function (timeIn) {
  var i = timeOutSelectOptions.length;
  while (i--) {
    timeOutSelectOptions[i].removeAttribute('selected');
    if (timeOutSelectOptions[i].value === timeIn) {
      timeOutSelectOptions[i].setAttribute('selected', '');
    }
  }
};
*/

/* validate guests count */
/*
var guestsSelectOptions = guestsSelect.children;
var roomsAndGuests = {
  100: [0],
  3: [3, 2, 1],
  2: [2, 1],
  1: [1]
};

var validateGuests = function (rooms) {
  var possibleGuests = roomsAndGuests[rooms];
  var i = guestsSelectOptions.length;
  while (i--) {
    var guestsNumber = parseInt(guestsSelectOptions[i].value, 10);
    guestsSelectOptions[i].setAttribute('disabled', '');
    guestsSelectOptions[i].removeAttribute('selected');
    if (possibleGuests.indexOf(guestsNumber) > -1) {
      guestsSelectOptions[i].removeAttribute('disabled');
      if (possibleGuests.indexOf(guestsNumber) === 0) {
        guestsSelectOptions[i].setAttribute('selected', '');
      }
    }
  }
};
*/
