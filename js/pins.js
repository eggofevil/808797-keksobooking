'use strict';

/* Модуль pins.js */
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();

  var getPinCoords = function (location) {
    return {
      x: location.x - PIN_WIDTH / 2 + 'px',
      y: location.y - PIN_HEIGHT + 'px'
    };
  };

  var createPin = function (offerObject) {
    var pin = pinTemplate.cloneNode(true);
    var pinCoords = getPinCoords(offerObject.location);
    pin.style.left = pinCoords.x;
    pin.style.top = pinCoords.y;
    pin.firstChild.setAttribute('src', offerObject.author.avatar);
    pin.firstChild.setAttribute('alt', offerObject.offer.title);
    pin.addEventListener('click', function () {
      window.cards.renderCard(offerObject);
    });
    return pin;
  };

  var renderPins = function () {
    for (var i = 0; i < window.backend.offers.length; i++) {
      pinsFragment.appendChild(createPin(window.backend.offers[i]));
    }
    window.generalElements.mapPinsContainer.appendChild(pinsFragment);
  };

  window.pins = {
    renderPins: renderPins
  };
})();
