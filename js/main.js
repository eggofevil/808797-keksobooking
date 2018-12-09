'use strict';

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

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (elements) {
    elements = elements.slice();
    var i = elements.length - 1;
    while (i--) {
      var randomIndex = getRandomInteger(0, i);
      var temp = elements[i];
      elements[i] = elements[randomIndex];
      elements[randomIndex] = temp;
    }
    return elements;
  };

  var getSimulatedOfferFeatures = function (list) {
    var newListLength = getRandomInteger(1, 6);
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
      address: '' + getRandomInteger(0, getContainerWidth(mapPins)) + ', ' + getRandomInteger(130, 630),
      price: getRandomInteger(1000, 1000000),
      type: typesList[getRandomInteger(0, 3)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: timesList[getRandomInteger(0, 2)],
      checkout: timesList[getRandomInteger(0, 2)],
      features: getSimulatedOfferFeatures(featuresList),
      description: '',
      photos: shuffleArray(photosList)
    };
  }
  return simulatedOffers;
};

var offers = createSimulatedOffers(8);

var createPin = function (offer) {
  var pin = pinTemplate.cloneNode(true);
  var halfPinWidth = window.getComputedStyle(pin).width / 2;
  var pinHeight = window.getComputedStyle(pin).height;
  var getPinCoords = function (addressString) {
    var addressCoords = addressString.split(',');
    var xLocation = addressCoords[0] - halfPinWidth;
    var yLocation = addressCoords[1] - pinHeight;
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
  pinsFragment.appendChild(createPin(offers[i]));
}
mapPins.appendChild(pinsFragment);
map.insertBefore(createCard(offers[0]), mapFiltersContainer);
