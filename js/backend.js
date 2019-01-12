'use strict';

/* Модуль backend.js */
(function () {
  var offers;
  var onGetDataSuccess = function (response) {
    window.backend.offers = response;
  };

  var onGetDataError = function (response) {
    return response;
    /*
    console.log(response);
    alert('Какая то ошибка при получении данных с сервера :(');
    */
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
        return;
        /* (xhr.status + ' : ' + xhr.statusText); */
      }
    });
    xhr.addEventListener('error', onError);
    xhr.open(xhrParam.method, xhrParam.url);
    xhr.send(data);
  };
  actWithServer(onGetDataSuccess, onGetDataError);
  window.backend = {
    offers: offers,
    actWithServer: actWithServer
  };
})();
