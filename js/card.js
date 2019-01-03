'use strict';

/* Модуль card.js */
(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  map.insertBefore(createCard(window.mock.offers[0]), mapFiltersContainer);
})();
