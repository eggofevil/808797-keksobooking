'use strict';

/* Модуль pins.js */
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsFragment = document.createDocumentFragment();
  var pins;
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

  var filterSuitedOffers = function () {
    var filterData = window.filterData;
    var offers = window.backend.offers;
    suitedOffers = [];

    var convertPriceToRange = function (price) {
      if (price < 50000) {
        if (price < 10000) {
          return 'low';
        }
        return 'middle';
      }
      return 'high';
    };

    if (Object.keys(filterData).length > 0) {
      var suitable;
      for (var offerKey in offers) {
        if (offers.hasOwnProperty(offerKey)) {
          suitable = true;
          for (var filterKey in filterData) {
            if (filterData.hasOwnProperty(filterKey)) {
              if (filterKey === 'features') {
                if (filterData[filterKey].join() !== offers[offerKey].offer[filterKey].sort().join()) {
                  suitable = false;
                }
              } else if (filterKey === 'price') {
                if (filterData[filterKey] !== convertPriceToRange(offers[offerKey].offer[filterKey])) {
                  suitable = false;
                }
              } else {
                if (filterData[filterKey] !== offers[offerKey].offer[filterKey]) {
                  suitable = false;
                }
              }
            }
          }
          if (suitable) {
            suitedOffers.push(offers[offerKey]);
          }
        }
      }
    } else {
      while (suitedOffers.length < 5) {
        suitedOffers.push(offers[suitedOffers.length]);
      }
    }
  };

  var removePins = function () {
    pins = document.querySelectorAll('.map__pin');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var renderPins = function () {
    removePins();
    filterSuitedOffers();
    suitedOffers.forEach(function (suitedOffer) {
      pinsFragment.appendChild(createPin(suitedOffer));
    });
    window.generalElements.mapPinsContainer.appendChild(pinsFragment);
  };

  window.pins = {
    renderPins: renderPins
  };
})();
