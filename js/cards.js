'use strict';

/* Модуль cards.js */
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardImageTemplate = cardTemplate.querySelector('.popup__photo');
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
  var cardClose = card.querySelector('.popup__close');

  var fillCard = function (offer) {
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

    var setCardPhotos = function (photos) {
      var fragment = document.createDocumentFragment();
      while (cardPhotos.hasChildNodes()) {
        cardPhotos.removeChild(cardPhotos.lastChild);
      }
      photos.forEach(function (photo) {
        var image = cardImageTemplate.cloneNode();
        image.src = photo;
        fragment.appendChild(image);
      });
      cardPhotos.appendChild(fragment);
    };

    cardTitle.innerText = offer.title;
    cardAddress.innerText = offer.address;
    cardPrice.innerText = offer.price + ' ₽/ночь';
    cardType.innerText = getCardType(offer.type);
    cardCapacity.innerText = getCardCapacityString(offer.rooms, offer.guests);
    cardTime.innerText = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout + '.';
    cardFeatures.innerText = offer.features.join(', ');
    cardDescription.innerText = offer.description;
    setCardPhotos(offer.photos);
    cardAvatar.src = offer.avatar;
  };

  var renderCard = function (offer) {
    if (!document.querySelector('card__popup')) {
      window.variables.map.insertBefore(card, mapFiltersContainer);
    }
    fillCard(offer);
  };

  var closeCard = function () {
    card.parentElement.removeChild(card);
  };

  cardClose.addEventListener('click', closeCard);
  cardClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeCard();
    }
  });

  window.cards = {
    renderCard: renderCard
  };
})();
