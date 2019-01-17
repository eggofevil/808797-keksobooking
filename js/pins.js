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

  var convertPriceToRange = function (price) {
    if (price < 50000) {
      if (price < 10000) {
        return 'low';
      }
      return 'middle';
    }
    return 'high';
  };

  var filterOffers = function () {
    return window.backend.offers.filter(function (fullOffer) {
      for (var filter in window.filterData) {
        if (window.filterData.hasOwnProperty(filter)) {
          switch (filter) {
            case 'features':
              for (var index in window.filterData.features) {
                if (fullOffer.offer.features.indexOf(window.filterData.features[index]) < 0) {
                  return null;
                }
              }
              break;
            case 'price':
              if (fullOffer.offer.price !== convertPriceToRange(window.filterData.price)) {
                return null;
              }
              break;
            default:
              if (fullOffer.offer[filter] !== window.filterData[filter]) {
                return null;
              }
          }
        }
      }
      return fullOffer;
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var renderPins = function () {
    removePins();
    var suitedOffers = filterOffers();
    for (var i = 0; i < Math.min(suitedOffers.length, 5); i++) {
      pinsFragment.appendChild(createPin(suitedOffers[i]));
    }
    window.generalElements.mapPinsContainer.appendChild(pinsFragment);
  };

  window.pins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
