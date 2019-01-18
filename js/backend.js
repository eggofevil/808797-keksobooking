'use strict';

/* Модуль backend.js */
(function () {
  var XHR_RESPONSE_SUCCESS_STATUS = 200;

  var offers;

  var onXHRError = function (text, status) {
    if (!status) {
      status = 'Unknown error';
    }
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; text-align: center; background-color: red;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.top = 0;
    errorElement.style.fontSize = '16px';
    errorElement.textContent = status + ' : ' + text;
    document.body.appendChild(errorElement);
  };

  var sendXHR = function (method, address, onXHRLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onXHRLoad(xhr.status, xhr.response, xhr.statusText);
    });
    xhr.addEventListener('error', onError);
    xhr.open(method, address);
    xhr.send(data);
  };

  var getData = function () {
    var method = 'GET';
    var address = 'https://js.dump.academy/keksobooking/data';

    var onGetDataLoad = function (status, response, statusText) {
      if (status === XHR_RESPONSE_SUCCESS_STATUS) {
        window.backend.offers = response;
        window.pins.renderPins();
      } else {
        onXHRError(status, statusText);
      }
    };
    var onGetDataError = function () {
      onXHRError('Не достучались до сервера. Пинов не будет :(');
    };

    sendXHR(method, address, onGetDataLoad, onGetDataError);
  };

  var postData = function (onPostDataLoad, onPostDataError, data) {
    var method = 'POST';
    var address = 'https://js.dump.academy/keksobooking';
    sendXHR(method, address, onPostDataLoad, onPostDataError, data);
  };

  window.backend = {
    XHR_RESPONSE_SUCCESS_STATUS: XHR_RESPONSE_SUCCESS_STATUS,
    offers: offers,
    postData: postData,
    getData: getData
  };
})();
