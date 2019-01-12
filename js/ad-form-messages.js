'use strict';

/* Модуль ad-form-messages.js */
(function () {
  var main = document.querySelector('main');

  var closeMessage = function (message) {
    main.removeChild(message);
  };

  var onSubmit = function (message) {
    message.addEventListener('click', function () {
      closeMessage(message);
    });
    message.addEventListener('keydown', function (evt) {
      if (evt.key === 'Esc') {
        closeMessage(message);
      }
    });
    main.appendChild(message);
  };

  window.adFormMessages = {
    onSubmit: onSubmit
  };
})();
