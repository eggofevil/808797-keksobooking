'use strict';

/* Модуль ad-form.js */
(function () {
  var PIN_MAIN_ADDRESS_X_OFFSET = 32;
  var PIN_MAIN_ADDRESS_Y_OFFSET = 81;

  var adFormElements = window.generalElements.adForm.elements;
  var housingAddress = adFormElements.address;
  var housingTypeSelect = adFormElements.type;
  var housingPriceInput = adFormElements.price;
  var timeInSelect = adFormElements.timein;
  var timeOutSelect = adFormElements.timeout;
  var roomsSelect = adFormElements.rooms;
  var guestsSelect = adFormElements.capacity;
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

  var currentHousingAddress = {
    updateHousingAddress: function (coordsX, coordsY) {
      if (coordsX && coordsY) {
        this.x = coordsX + PIN_MAIN_ADDRESS_X_OFFSET;
        this.y = coordsY + PIN_MAIN_ADDRESS_Y_OFFSET;
      }
      housingAddress.value = this.x + ', ' + this.y;
    }
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

  var setToDefault = function () {
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
  };

  window.generalElements.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onSuccess = function () {
      var message = document.querySelector('#success').content.querySelector('.success');
      window.generalElements.adForm.classList.add('ad-form--disabled');
      window.adFormMessages.onSubmit(message);
      window.generalElements.adForm.reset();
    };
    var onError = function () {
      var message = document.querySelector('#error').content.querySelector('.error');
      window.adFormMessages.onSubmit(message);
    };
    window.backend.actWithServer(onSuccess, onError, new FormData(window.generalElements.adForm));
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

  currentHousingAddress.updateHousingAddress(parseInt(window.pinMain.startingCoords.x, 10), parseInt(window.pinMain.startingCoords.y, 10));

  window.adForm = {
    currentHousingAddress: currentHousingAddress,
    setToDefault: setToDefault,
  };
})();
