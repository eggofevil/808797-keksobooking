'use strict';

/* Модуль mock.js */
(function () {
  var createSimulatedOffers = function (simulatedOffersNumber) {
    var simulatedOffers = [];
    var titlesList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var typesList = ['palace', 'flat', 'house', 'bungalo'];
    var timesList = ['12:00', '13:00', '14:00'];
    var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    var getSimulatedOfferFeatures = function (list) {
      var newListLength = window.Util.getRandomInteger(1, 6);
      var newList = window.Util.shuffleArray(list).slice(0, newListLength);
      return newList;
    };

    for (var i = 0; i < simulatedOffersNumber; i++) {
      simulatedOffers[i] = {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
        title: titlesList[i],
        address: '' + window.Util.getRandomInteger(0, window.Util.getRoundedElementWidth(window.GeneralElements.mapPinsContainer)) + ', ' + window.Util.getRandomInteger(130, 630),
        price: window.Util.getRandomInteger(1000, 1000000),
        type: typesList[window.Util.getRandomInteger(0, 3)],
        rooms: window.Util.getRandomInteger(1, 5),
        guests: window.Util.getRandomInteger(1, 10),
        checkin: timesList[window.Util.getRandomInteger(0, 2)],
        checkout: timesList[window.Util.getRandomInteger(0, 2)],
        features: getSimulatedOfferFeatures(featuresList),
        description: '',
        photos: window.Util.shuffleArray(photosList)
      };
    }
    return simulatedOffers;
  };

  window.Mock = {
    offers: createSimulatedOffers(8)
  };
})();
