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

  var housingType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getCardCapacityString = function (rooms, guests) {
    return rooms + ' ' + window.util.declineWord(rooms, ['комната', 'комнаты', 'комнат']) + ' ' + 'для ' + guests + ' ' + (guests > 1 ? 'гостей' : 'гостя');
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

  var fillCard = function (offerObject) {
    cardTitle.textContent = offerObject.offer.title;
    cardAddress.textContent = offerObject.offer.address;
    cardPrice.textContent = offerObject.offer.price + ' ₽/ночь';
    cardType.textContent = housingType[offerObject.offer.type] ? housingType[offerObject.offer.type] : 'Неведомый теремок';
    cardCapacity.textContent = getCardCapacityString(offerObject.offer.rooms, offerObject.offer.guests);
    cardTime.textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout + '.';
    cardFeatures.textContent = offerObject.offer.features.join(', ');
    cardDescription.textContent = offerObject.offer.description;
    setCardPhotos(offerObject.offer.photos);
    cardAvatar.src = offerObject.author.avatar;
  };

  var renderCard = function (offer) {
    if (!document.querySelector('card__popup')) {
      window.generalElements.map.insertBefore(card, mapFiltersContainer);
    }
    fillCard(offer);
  };

  var removeCard = function () {
    card.remove();
  };

  cardClose.addEventListener('click', removeCard);

  window.cards = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
