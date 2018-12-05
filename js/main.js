'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createSimulatedOffers = function (simulatedOffersNumber) {
  var simulatedOffers = [];
  var titlesList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typesList = ['palace', 'flat', 'house', 'bungalo'];
  var timesList = ['12:00', '13:00', '14:00'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (initialArray) {
    var newArray = initialArray.slice();
    for (var i = newArray.length - 1; i >= 0; i--) {
      var rndNum = getRndInteger(0, i);
      var temp = newArray[i];
      newArray[i] = newArray[rndNum];
      newArray[rndNum] = temp;
    }
    return newArray;
  };

  var getSimulatedOfferFeatures = function (list) {
    var newListLength = getRndInteger(1, 6);
    var newList = shuffleArray(list).slice(0, newListLength);
    return newList;
  };

  var getContainerWidth = function (container) {
    var mapPinsWidth = window.getComputedStyle(container).width;
    return parseInt(mapPinsWidth, 10);
  };

  for (var i = 0; i < simulatedOffersNumber; i++) {
    simulatedOffers[i] = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
      title: titlesList[i],
      address: '' + getRndInteger(0, getContainerWidth(mapPins)) + ', ' + getRndInteger(130, 630),
      price: getRndInteger(1000, 1000000),
      type: typesList[getRndInteger(0, 3)],
      rooms: getRndInteger(1, 5),
      guests: getRndInteger(1, 10),
      checkin: timesList[getRndInteger(0, 2)],
      checkout: timesList[getRndInteger(0, 2)],
      features: getSimulatedOfferFeatures(featuresList),
      description: '',
      photos: shuffleArray(photosList)
    };
  }
  return simulatedOffers;
};

var offers = createSimulatedOffers(8);

var createPins = function (mapObject) {
  var pin = pinTemplate.cloneNode(true);
  var getPinCoords = function (addressString) {
    var arr = addressString.split(',');
    var xLocation = arr[0] - PIN_WIDTH / 2;
    var yLocation = arr[1] - PIN_HEIGHT;
    return 'left: ' + xLocation + 'px; top: ' + yLocation + 'px;';
  };

  pin.setAttribute('style', getPinCoords(mapObject.address));
  pin.firstChild.setAttribute('src', mapObject.avatar);
  pin.firstChild.setAttribute('alt', mapObject.title);
  return pin;
};

var createCard = function (offer) {
  var card = cardTemplate.cloneNode(true);
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardFeatures = card.querySelector('.popup__features');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardAvatar = card.querySelector('.popup__avatar');

  var getCardType = function (housingType) {
    switch (housingType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return 'Неведомый теремок';
    }
  };
  var getCardCapacityString = function (rooms, guests) {
    var capacityString = '';
    capacityString += rooms;
    switch (rooms) {
      case 1:
        capacityString += ' комната';
        break;
      case 5:
        capacityString += ' комнат';
        break;
      default:
        capacityString += ' комнаты';
    }
    capacityString += ' для ' + guests;
    capacityString += guests === 1 ? ' гостя.' : ' гостей.';
    return capacityString;
  };

  var getCardPhotos = function (photos) {
    var photosFragment = document.createDocumentFragment();
    var elementTemplate = cardPhotos.removeChild(cardPhotos.firstElementChild);
    for (var i = 0; i < photos.length; i++) {
      var imgElement = elementTemplate.cloneNode();
      imgElement.setAttribute('src', photos[i]);
      photosFragment.appendChild(imgElement);
    }
    return photosFragment;
  };

  cardTitle.innerText = offer.title;
  cardAddress.innerText = offer.address;
  cardPrice.innerText = offer.price + ' ₽/ночь';
  cardType.innerText = getCardType(offer.type);
  cardCapacity.innerText = getCardCapacityString(offer.rooms, offer.guests);
  cardTime.innerText = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout + '.';
  cardFeatures.innerText = offer.features.join(', ');
  cardDescription.innerText = offer.description;
  cardPhotos.appendChild(getCardPhotos(offer.photos));
  cardAvatar.setAttribute('src', offer.avatar);
  return card;
};

var pinsFragment = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  pinsFragment.appendChild(createPins(offers[i]));
}
mapPins.appendChild(pinsFragment);
map.insertBefore(createCard(offers[0]), mapFiltersContainer);
