'use strict';

/* Модуль ad-form.js */
(function () {
  var adForm = window.generalElements.adForm;
  var adFormElements = adForm.elements;
  var housingAddress = adFormElements.address;
  var housingTypeSelect = adFormElements.type;
  var housingPriceInput = adFormElements.price;
  var timeInSelect = adFormElements.timein;
  var timeOutSelect = adFormElements.timeout;
  var roomsSelect = adFormElements.rooms;
  var guestsSelect = adFormElements.capacity;
  var guestsSelectOptions = guestsSelect.children;
  var resetPressed;

  var housingTypeAndPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var currentHousingAddress = {
    updateHousingAddress: function (coordsX, coordsY) {
      if (coordsX && coordsY) {
        this.x = coordsX + window.pinMain.AddressOffset.X;
        this.y = coordsY + window.pinMain.AddressOffset.Y;
      }
      housingAddress.value = this.x + ', ' + this.y;
    }
  };

  var validateHousingPrice = function (housingType) {
    housingPriceInput.min = housingTypeAndPrice[housingType];
    housingPriceInput.placeholder = housingTypeAndPrice[housingType];
  };

  var validateTimeIn = function (timeOut) {
    timeInSelect.value = timeOut;
  };

  var validateTimeOut = function (timeIn) {
    timeOutSelect.value = timeIn;
  };

  var validateGuests = function (rooms) {
    var lastOptionIndex = guestsSelectOptions.length - 1;
    if (rooms !== '100') {
      guestsSelect.value = roomsSelect.value;
      guestsSelectOptions[lastOptionIndex].setAttribute('disabled', '');
      while (lastOptionIndex--) {
        guestsSelectOptions[lastOptionIndex].removeAttribute('disabled');
        if (guestsSelectOptions[lastOptionIndex].value > rooms) {
          guestsSelectOptions[lastOptionIndex].setAttribute('disabled', '');
        }
      }
    } else {
      guestsSelect.value = guestsSelectOptions[lastOptionIndex].value;
      lastOptionIndex--;
      while (lastOptionIndex--) {
        guestsSelectOptions[lastOptionIndex].setAttribute('disabled', '');
      }
    }
  };

  var setToDefault = function () {
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onSuccess = function () {
      var message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      adForm.classList.add('ad-form--disabled');
      window.adFormMessages.onSubmit(message);
      window.main.resetToDefault();
    };
    var onError = function () {
      var message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      window.adFormMessages.onSubmit(message);
    };
    window.backend.postData(onSuccess, onError, new FormData(adForm));
  });

  var resetButton = adForm.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.adForm.resetPressed = true;
    window.main.resetToDefault();
  });

  housingTypeSelect.addEventListener('change', function () {
    validateHousingPrice(housingTypeSelect.value);
  });
  timeInSelect.addEventListener('change', function () {
    validateTimeOut(timeInSelect.value);
  });
  timeOutSelect.addEventListener('change', function () {
    validateTimeIn(timeOutSelect.value);
  });
  roomsSelect.addEventListener('change', function () {
    validateGuests(roomsSelect.value);
  });

  currentHousingAddress.updateHousingAddress(parseInt(window.pinMain.startingCoords.x, 10), parseInt(window.pinMain.startingCoords.y, 10));

  window.adForm = {
    resetPressed: resetPressed,
    currentHousingAddress: currentHousingAddress,
    setToDefault: setToDefault,
  };
})();
