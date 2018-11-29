  'use strict';


  function activatePage() {
    var MAIN_PIN_WIDTH = 65;
    var INITIAL_POSITION_MAIN_PIN_X = 570;
    var INITIAL_POSITION_MAIN_PIN_Y = 375;

    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var announcementsFilterForm = document.querySelector('.ad-form');
    var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
    var addressInput = document.getElementById('address');
    addressInput.value = INITIAL_POSITION_MAIN_PIN_X + (MAIN_PIN_WIDTH / 2) + ' , ' + (INITIAL_POSITION_MAIN_PIN_Y + 85);
    addressInput.readOnly = true;

    disableElements(fieldsetList);

    pinMain.addEventListener('mouseup', function(evt) {
      map.classList.remove('map--faded');
      announcementsFilterForm.classList.remove('ad-form--disabled');
      enableElements(fieldsetList);
      setAddressCoordinates(evt.clientX, evt.clientY + 22, addressInput);
      placePins(createPinsDom(announcementsArray));
    });
  }

  activatePage();

  function disableElements(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
    }
  }

  function enableElements(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = false;
    }
  }

  function setAddressCoordinates(coordinateX, coordinateY, input) {
    input.value = coordinateX + ' , ' + coordinateY;
  }


  function createAnnouncement() {

    var announcements = [];
    var featuresArrayChanged = [];

    var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var featuresLength = getRandomNumber(1, 6);
    for (var i = 0; i < featuresLength; i++) {
      featuresArrayChanged[i] = featuresArray[i];
    }
    var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ];
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var times = ['12:00', '13:00', '14:00'];

    for (var i = 0; i < 8; i++) {

      var locationX = getRandomNumber(0, 700) - 25;
      var locationY = getRandomNumber(130, 630) - 70;

      announcements[i] = {

        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: titles[i],
          adress: locationX + ', ' + locationY,
          price: getRandomNumber(1000, 1000000),
          type: types[getRandomNumber(0, 3)],
          rooms: getRandomNumber(1, 5),
          guests: getRandomNumber(1, 9),
          checkin: times[getRandomNumber(0, 2)],
          checkout: times[getRandomNumber(0, 2)],
          features: featuresArrayChanged,
          description: '',
          photos: photosArray
        },

        location: {
          x: locationX,
          y: locationY
        }
      }
    }
    return announcements;
  }

  var announcementsArray = createAnnouncement();

  function createPinsDom(array) {

    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pins = [];
    for (var i = 0; i < array.length; i++) {
      pins[i] = pinTemplate.cloneNode(true);
      pins[i].style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
      pins[i].querySelector('img').src = array[i].author.avatar;
      pins[i].querySelector('img').alt = array[i].offer.title;

      onPinButtonClickHandler(pins, i);
      onPinButtonKeydownHandler(pins, i);
    }
    return pins;
  }



  function onPinButtonClickHandler(pinsArray, iteration) {
    pinsArray[iteration].addEventListener('click', function() {
      var tempoDom = document.querySelector('.map').querySelector('.popup');
      if (tempoDom === null) {
        showCard(iteration);
        var tempoDom = document.querySelector('.map').querySelector('.popup');
      } else {
        var articleDom = document.querySelector('.map').querySelector('.popup');
        onCardCloseHandler(articleDom);
        showCard(iteration);
      }
    });
  }

  function onPinButtonKeydownHandler(pinsArray, iteration) {
    document.addEventListener('keydown', function(evt) {
      var tempoDom = document.querySelector('.map').querySelector('.popup');
      if (evt.keyCode === 13) {
        if (tempoDom === null) {
          showCard(iteration);
          var tempoDom = document.querySelector('.map').querySelector('.popup');
        } else {
          var articleDom = document.querySelector('.map').querySelector('.popup');
          onCardCloseHandler(articleDom);
          showCard(iteration);
        }
      }
    });
  }

  function placePins(pinsArray) {
    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(pinsArray[i]);
    }
    pinList.appendChild(fragment);
  }

  function showCard(iteration) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = announcementsArray[iteration].offer.title;
    card.querySelector('.popup__text--address').textContent = announcementsArray[iteration].offer.adress;
    card.querySelector('.popup__text--price').textContent = announcementsArray[iteration].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = convertToFullName(announcementsArray[iteration].offer.type);
    card.querySelector('.popup__text--capacity').textContent = announcementsArray[iteration].offer.rooms + ' комнаты для ' + announcementsArray[iteration].offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementsArray[iteration].offer.checkin + ', выезд до ' + announcementsArray[iteration].offer.checkout;
    card.querySelector('.popup__description').textContent = announcementsArray[iteration].offer.description;
    for (var i = 0; i < announcementsArray[iteration].offer.features.length; i++) {
      card.querySelector('.popup__feature--wifi').textContent = announcementsArray[iteration].offer.features[i];
      switch (announcementsArray[iteration].offer.features[i]) {
        case 'wifi':
          card.querySelector('.popup__feature--wifi').textContent = announcementsArray[iteration].offer.features[i];
          break;
        case 'dishwasher':
          card.querySelector('.popup__feature--dishwasher').textContent = announcementsArray[iteration].offer.features[i];
          break;
        case 'parking':
          card.querySelector('.popup__feature--parking').textContent = announcementsArray[iteration].offer.features[i];
          break;
        case 'washer':
          card.querySelector('.popup__feature--washer').textContent = announcementsArray[iteration].offer.features[i];
          break;
        case 'elevator':
          card.querySelector('.popup__feature--elevator').textContent = announcementsArray[iteration].offer.features[i];
          break;
        case 'conditioner':
          card.querySelector('.popup__feature--conditioner').textContent = announcementsArray[iteration].offer.features[i];
          break;
      }
    }

    var featuresNodesArray = card.querySelectorAll('.popup__feature');

    for (var i = 0; i < featuresNodesArray.length; i++) {
      if (featuresNodesArray[i].textContent.length === 0) {
        featuresNodesArray[i].parentNode.removeChild(featuresNodesArray[i]);
      }
    }

    var mapFilterContainer = document.querySelector('.map__filters-container');
    var cardList = document.querySelector('.map');
    cardList.insertBefore(card, mapFilterContainer);

    var avatarImagerSrc = document.querySelector('.popup__avatar').src = announcementsArray[iteration].author.avatar;


    function makePhotoBlock(array) {
      var photos = [];
      var imgTag = document.querySelector('.popup__photos').querySelector('img');
      var photoBlock = document.querySelector('.popup__photos');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length - 1; i++) {
        photos[i] = imgTag.cloneNode(true);

        fragment.appendChild(photos[i]);
      }
      photoBlock.appendChild(fragment);
    }

    makePhotoBlock(announcementsArray[0].offer.photos);


    var element = document.querySelectorAll('.popup__photo');

    for (var i = 0; i < announcementsArray[0].offer.photos.length; i++) {
      element[i].src = announcementsArray[0].offer.photos[i];
    }

    var map = document.querySelector('.map');
    var articleDom = map.querySelector('.popup');
    var closeButton = document.querySelector('.popup__close');

    onCardCloseButtonClickHandler(closeButton, map, articleDom);
    onCardEscKeydownHandler(map, articleDom);
  }

  function onCardCloseButtonClickHandler(button, container, element) {
    button.addEventListener('click', function() {
      container.removeChild(element);
    });
  }

  function onCardEscKeydownHandler(container, element) {
    document.addEventListener('keydown', function(evt) {
      if (evt.keyCode === 27) {
        element.parentNode.removeChild(element);
        /тут ошибка вылезает. но работает/
      }
    });
  }

  function onCardCloseHandler(element) {
    element.parentNode.removeChild(element);
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

  function getRandomNumber(rangeMin, rangeMax) {
    return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
  }
