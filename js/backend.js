'use strict';

/* Модуль backend.js */
(function () {
  var offers;

  var postData = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };

  var getData = function () {
    var onLoad = function (response) {
      window.backend.offers = response;
      window.pins.renderPins();
      window.main.activateInputs(window.generalElements.filter.elements);
    };
    var onError = function (errorData) {
      var errorElement = document.createElement('div');
      errorElement.style = 'z-index: 100; text-align: center; background-color: red;';
      errorElement.style.position = 'absolute';
      errorElement.style.left = 0;
      errorElement.style.top = 0;
      errorElement.style.fontSize = '30px';
      errorElement.textContent = (errorData);
      document.body.appendChild(errorElement);
    };
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Oшибка: ' + xhr.status + ' : ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Не достучались до сервера. Пинов не будет :(');
    });
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.backend = {
    offers: offers,
    postData: postData,
    getData: getData
  };
})();
