'use strict';

/* Модуль backend.js */
(function () {
  var offers;
  var onGetDataSuccess = function (response) {
    window.backend.offers = response;
  };

  var onGetDataError = function (errorData) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.top = 0;
    errorElement.style.fontSize = '30px';
    errorElement.textContent = (errorData);
    document.body.appendChild(errorElement);
  };

  var actWithServer = function (onLoad, onError, data) {
    var xhrParam = {};
    var xhr = new XMLHttpRequest();
    if (data) {
      xhrParam.method = 'POST';
      xhrParam.url = 'https://js.dump.academy/keksobooking';
    } else {
      xhrParam.method = 'GET';
      xhrParam.url = 'https://js.dump.academy/keksobooking/data';
    }
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Oшибка: ' + xhr.status + ' : ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.open(xhrParam.method, xhrParam.url);
    xhr.send(data);
  };
  actWithServer(onGetDataSuccess, onGetDataError);
  window.backend = {
    offers: offers,
    actWithServer: actWithServer
  };
})();
