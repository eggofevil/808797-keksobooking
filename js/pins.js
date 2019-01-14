'use strict';

/* Модуль pins.js */
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();
  var suitedOffers;

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

  var filterSuitedOffers = function () {
    var offers = window.backend.offers;
    suitedOffers = [];
    var filterKeys = Object.keys(window.filterData);
    var suitable;

    if (!filterKeys.length) {
      while (suitedOffers.length < 5) {
        suitedOffers.push(offers[suitedOffers.length]);
      }
      return suitedOffers;
    }

    offers.forEach(function (offer) {
      var offerData = offer.offer;
      suitable = true;
      filterKeys.forEach(function (key) {
        switch (key) {
          case 'features':
            window.filterData[key].forEach(function (selectedFeature) {
              if (offerData[key].indexOf(selectedFeature) === -1) {
                suitable = false;
              }
            });
            break;
          case 'price':
            if (window.filterData[key] !== convertPriceToRange(offerData[key])) {
              suitable = false;
            }
            break;
          default:
            if (window.filterData[key] !== offerData[key]) {
              suitable = false;
            }
        }
      });
      if (suitable) {
        suitedOffers.push(offer);
      }
    });
    return suitedOffers;
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
    suitedOffers = filterSuitedOffers();
    suitedOffers.forEach(function (suitedOffer) {
      pinsFragment.appendChild(createPin(suitedOffer));
    });
    window.generalElements.mapPinsContainer.appendChild(pinsFragment);
  };

  window.pins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
