'use strict';

(function () {

  function show(info) {
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

    featuresNodesArray.forEach(function (node) {
      if (node.textContent.length === 0) {
        node.parentNode.removeChild(node);
      }
    });

    var mapFilterContainer = document.querySelector('.map__filters-container');
    var map = document.querySelector('.map');
    map.insertBefore(card, mapFilterContainer);

    card.querySelector('.popup__avatar').src = info.author.avatar;

    makePhotoBlock(info.offer.photos);

    var element = document.querySelectorAll('.popup__photo');

    for (var b = 0; b < info.offer.photos.length; b++) {
      element[b].src = info.offer.photos[b];
    }

    var articleDom = map.querySelector('.popup');
    var closeButton = document.querySelector('.popup__close');

    window.util.onCardCloseButtonClickHandler(closeButton, map, articleDom);
    window.util.onEscKeydownHandler(articleDom);
  }

  function makePhotoBlock(announcementPhotos) {
    var photos = [];
    var photoBlock = document.querySelector('.popup__photos');
    var imgTag = photoBlock.querySelector('img');
    var fragment = document.createDocumentFragment();
    imgTag.remove();
    for (var i = 0; i < announcementPhotos.length; i++) {
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

  window.card = {
    show: show
  };
})();
