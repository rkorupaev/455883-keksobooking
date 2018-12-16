'use strict';

(function() {

  function showCard(info) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = info.offer.title;
    card.querySelector('.popup__text--address').textContent = info.offer.adress;
    card.querySelector('.popup__text--price').textContent = info.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = convertToFullName(info.offer.type);
    card.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
    card.querySelector('.popup__description').textContent = info.offer.description;
    for (var i = 0; i < info.offer.features.length; i++) {
      card.querySelector('.popup__feature--' + info.offer.features[i]).textContent = info.offer.features[i];
    }

    var featuresNodesArray = card.querySelectorAll('.popup__feature');

    for (var j = 0; j < featuresNodesArray.length; j++) {
      if (featuresNodesArray[j].textContent.length === 0) {
        featuresNodesArray[j].parentNode.removeChild(featuresNodesArray[j]);
      }
    }

    var mapFilterContainer = document.querySelector('.map__filters-container');
    var cardList = document.querySelector('.map');
    cardList.insertBefore(card, mapFilterContainer);

    card.querySelector('.popup__avatar').src = info.author.avatar;


    makePhotoBlock(info.offer.photos);


    var element = document.querySelectorAll('.popup__photo');

    for (var b = 0; b < info.offer.photos.length; b++) {
      element[b].src = info.offer.photos[b];
    }

    var map = document.querySelector('.map');
    var articleDom = map.querySelector('.popup');
    var closeButton = document.querySelector('.popup__close');

    window.util.onCardCloseButtonClickHandler(closeButton, map, articleDom);
    window.util.onEscKeydownHandler(articleDom);
  }

  function makePhotoBlock(array) {
    var photos = [];
    var imgTag = document.querySelector('.popup__photos').querySelector('img');
    var photoBlock = document.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    imgTag.remove();
    for (var i = 0; i < array.length; i++) {
      photos[i] = imgTag.cloneNode(true);

      fragment.appendChild(photos[i]);
    }
    photoBlock.appendChild(fragment);
  }

  function convertToFullName(name) {
    var fullName = '';
    switch (name) {
      case 'flat':
        fullName = 'Квартира';
        break;
      case 'palace':
        fullName = 'Дворец';
        break;
      case 'bungalo':
        fullName = 'Бунгало';
        break;
      case 'house':
        fullName = 'Дом';
        break;
    }
    return fullName;
  }

  window.showcard = {
    showCard: showCard
  }
})();
