'use strict';

/* Модуль ad-form-messages.js */
(function () {
  var main = document.querySelector('main');
  var onSubmit = function (message) {
    var closeMessage = function (evt) {
      if (evt.type === 'click' || evt.key === 'Escape') {
        message.removeEventListener('click', closeMessage);
        document.removeEventListener('keydown', closeMessage);
        main.removeChild(message);
      }
    };
    message.addEventListener('click', closeMessage);
    document.addEventListener('keydown', closeMessage);
    main.appendChild(message);
  };

  window.adFormMessages = {
    onSubmit: onSubmit
  };
})();
