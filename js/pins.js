'use strict';

/* Модуль pins.js */
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();

  var createPin = function (offer) {
    var pin = pinTemplate.cloneNode(true);
    var getPinCoords = function (addressString) {
      var addressCoords = addressString.split(',');
      var xLocation = addressCoords[0] - PIN_WIDTH / 2;
      var yLocation = addressCoords[1] - PIN_HEIGHT;
      return {
        x: xLocation + 'px',
        y: yLocation + 'px'
      };
    };
    var pinCoords = getPinCoords(offer.address);
    pin.style.left = pinCoords.x;
    pin.style.top = pinCoords.y;
    pin.firstChild.setAttribute('src', offer.avatar);
    pin.firstChild.setAttribute('alt', offer.title);
    pin.addEventListener('click', function () {
      window.cards.renderCard(offer);
    });
    return pin;
  };

  var renderPins = function () {
    for (var i = 0; i < window.mock.offers.length; i++) {
      pinsFragment.appendChild(createPin(window.mock.offers[i]));
    }
    window.generalElements.mapPinsContainer.appendChild(pinsFragment);
  };

  window.pins = {
    renderPins: renderPins
  };
})();
