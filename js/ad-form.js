'use strict';

/* Модуль ad-form.js */
(function () {
  var housingAddress = document.querySelector('[name="address"]');
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
  var updateAddressInput = function () {
    housingAddress.value = window.addressCoords.x + ', ' + window.addressCoords.y;
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
    updateAddressInput();
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
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
    validateEmptyForm: validateEmptyForm,
    updateAddressInput: updateAddressInput
  };
})();
