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
  var cardFeatureTemplate = cardTemplate.querySelector('.popup__feature');
  var cardDescription = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardAvatar = card.querySelector('.popup__avatar');
  var cardClose = card.querySelector('.popup__close');

  var housingType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getCardCapacityString = function (rooms, guests) {
    return rooms + ' ' + window.util.declineWord(rooms, ['комната', 'комнаты', 'комнат']) + ' ' + 'для ' + guests + ' ' + window.util.declineWord(guests, ['гостя', 'готстей', 'гостей']);
  };

  var formIconAttributes = function (feature) {
    var icon = cardFeatureTemplate.cloneNode();
    icon.className = 'popup__feature popup__feature--' + feature;
    return icon;
  };

  var formPhotoAttributes = function (src) {
    var photo = cardImageTemplate.cloneNode();
    photo.src = src;
    return photo;
  };

  var renderElement = function (parentElement, dataItems, createChildElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
    if (dataItems.length) {
      parentElement.classList.remove('hidden');
      var childElementsFragment = document.createDocumentFragment();
      dataItems.forEach(function (dataItem) {
        var childElement = createChildElement(dataItem);
        childElementsFragment.appendChild(childElement);
      });
      parentElement.appendChild(childElementsFragment);
    } else {
      parentElement.classList.add('hidden');
    }
  };

  var fillCard = function (offer) {
    cardTitle.textContent = offer.title;
    cardAddress.textContent = offer.address;
    cardPrice.textContent = offer.price + ' ₽/ночь';
    cardType.textContent = housingType[offer.type] ? housingType[offer.type] : 'Неведомый теремок';
    cardCapacity.textContent = getCardCapacityString(offer.rooms, offer.guests);
    cardTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout + '.';
    renderElement(cardFeatures, offer.features, formIconAttributes);
    cardDescription.textContent = offer.description;
    renderElement(cardPhotos, offer.photos, formPhotoAttributes);
  };

  var removeCard = function () {
    card.removeEventListener('click', removeCard);
    document.removeEventListener('keydown', onOpenedCardEscapeKeydown);
    card.remove();
  };

  var onOpenedCardEscapeKeydown = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
    }
  };

  var renderCard = function (offer) {
    if (!document.querySelector('card__popup')) {
      window.generalElements.map.insertBefore(card, mapFiltersContainer);
      cardClose.addEventListener('click', removeCard);
      document.addEventListener('keydown', onOpenedCardEscapeKeydown);
    }
    cardAvatar.src = offer.author.avatar;
    fillCard(offer.offer);
  };

  window.cards = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
