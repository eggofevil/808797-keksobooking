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
  var resetButton = adForm.querySelector('.ad-form__reset');
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

  var validate = function () {
    validateHousingPrice(housingTypeSelect.value);
    validateTimeOut(timeInSelect.value);
    validateGuests(roomsSelect.value);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onSuccess = function (status) {
      if (status === 200) {
        var message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
        window.main.resetToDefault();
        adForm.reset();
        validate();
        window.adFormMessages.onSubmit(message);
      } else {
        onError();
      }
    };
    var onError = function () {
      var message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      window.adFormMessages.onSubmit(message);
    };
    window.backend.postData(onSuccess, onError, new FormData(adForm));
  });
  resetButton.addEventListener('click', function () {
    adForm.reset();
    window.adForm.resetPressed = true;
    window.main.resetToDefault();
    validate();
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

  window.adForm = {
    validate: validate,
    resetPressed: resetPressed,
    currentHousingAddress: currentHousingAddress,
  };
})();
