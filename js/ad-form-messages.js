'use strict';

/* Модуль ad-form-messages.js */
(function () {
  var main = document.querySelector('main');

  var onSubmit = function (message) {
    var closeMessage = function () {
      message.removeEventListener('click', closeMessage);
      document.removeEventListener('keydown', onMessageEscapeKeydown);
      main.removeChild(message);
    };

    var onMessageEscapeKeydown = function (evt) {
      if (evt.key === 'Escape') {
        closeMessage();
      }
    };

    message.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onMessageEscapeKeydown);
    main.appendChild(message);
  };

  window.adFormMessages = {
    onSubmit: onSubmit
  };
})();
