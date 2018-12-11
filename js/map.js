  'use strict';
  var MAIN_PIN_WIDTH = 65;
  var INITIAL_POSITION_MAIN_PIN_X = 570;
  var INITIAL_POSITION_MAIN_PIN_Y = 375;
  var PIN_SHIFT_X = 32;
  var PIN_SHIFT_Y = 87;

  function activatePage() {
    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var announcementsFilterForm = document.querySelector('.ad-form');
    var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
    var addressInput = document.getElementById('address');
    addressInput.value = INITIAL_POSITION_MAIN_PIN_X + ' , ' + INITIAL_POSITION_MAIN_PIN_Y;
    addressInput.readOnly = true;

    disableElements(fieldsetList);

    pinMain.addEventListener('mousedown', function(evt) {
      evt.preventDefault();

      var initialLocationX = evt.clientX;
      var initialLocationY = evt.clientY;

      var onMouseMove = function(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: initialLocationX - moveEvt.clientX,
          y: initialLocationY - moveEvt.clientY
        };

        initialLocationX = moveEvt.clientX;
        initialLocationY = moveEvt.clientY;

        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';


        setAddressCoordinates(parseInt(pinMain.style.left) + PIN_SHIFT_X, parseInt(pinMain.style.top) + PIN_SHIFT_Y, addressInput);
      };


      var onMouseUp = function(upEvt) {
        upEvt.preventDefault();

        map.classList.remove('map--faded');
        announcementsFilterForm.classList.remove('ad-form--disabled');
        enableElements(fieldsetList);
        createPins();



        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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

  function createPins() {
    window.load(function(announcementsInfoLoaded) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var pins = [];
      for (var i = 0; i < announcementsInfoLoaded.length; i++) {
        var pin = pinTemplate.cloneNode(true);
        pin.style = 'left: ' + announcementsInfoLoaded[i].location.x + 'px; top: ' + announcementsInfoLoaded[i].location.y + 'px;';
        pin.querySelector('img').src = announcementsInfoLoaded[i].author.avatar;
        pin.querySelector('img').alt = announcementsInfoLoaded[i].offer.title;
        pins.push(pin);

        onPinButtonClickHandler(pins, i, announcementsInfoLoaded);
        onPinButtonKeydownHandler(pins, i, announcementsInfoLoaded);
      }
      placePins(pins);
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




  function onPinButtonClickHandler(pinsArray, iteration, announcementsInfo) {
    pinsArray[iteration].addEventListener('click', function() {
      var tempoDom = document.querySelector('.map').querySelector('.popup');
      if (tempoDom === null) {
        showCard(announcementsInfo, iteration);
        var tempoDom = document.querySelector('.map').querySelector('.popup');
      } else {
        var articleDom = document.querySelector('.map').querySelector('.popup');
        onCardCloseHandler(articleDom);
        showCard(announcementsInfo, iteration);
      }
    });
  }

  function onPinButtonKeydownHandler(pinsArray, iteration, announcementsInfo) {
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


  function showCard(announcementsInfo, iteration) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = announcementsInfo[iteration].offer.title;
    card.querySelector('.popup__text--address').textContent = announcementsInfo[iteration].offer.adress;
    card.querySelector('.popup__text--price').textContent = announcementsInfo[iteration].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = convertToFullName(announcementsInfo[iteration].offer.type);
    card.querySelector('.popup__text--capacity').textContent = announcementsInfo[iteration].offer.rooms + ' комнаты для ' + announcementsInfo[iteration].offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementsInfo[iteration].offer.checkin + ', выезд до ' + announcementsInfo[iteration].offer.checkout;
    card.querySelector('.popup__description').textContent = announcementsInfo[iteration].offer.description;
    for (var i = 0; i < announcementsInfo[iteration].offer.features.length; i++) {
      card.querySelector('.popup__feature--wifi').textContent = announcementsInfo[iteration].offer.features[i];
      switch (announcementsInfo[iteration].offer.features[i]) {
        case 'wifi':
          card.querySelector('.popup__feature--wifi').textContent = announcementsInfo[iteration].offer.features[i];
          break;
        case 'dishwasher':
          card.querySelector('.popup__feature--dishwasher').textContent = announcementsInfo[iteration].offer.features[i];
          break;
        case 'parking':
          card.querySelector('.popup__feature--parking').textContent = announcementsInfo[iteration].offer.features[i];
          break;
        case 'washer':
          card.querySelector('.popup__feature--washer').textContent = announcementsInfo[iteration].offer.features[i];
          break;
        case 'elevator':
          card.querySelector('.popup__feature--elevator').textContent = announcementsInfo[iteration].offer.features[i];
          break;
        case 'conditioner':
          card.querySelector('.popup__feature--conditioner').textContent = announcementsInfo[iteration].offer.features[i];
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

    card.querySelector('.popup__avatar').src = announcementsInfo[iteration].author.avatar;


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

    makePhotoBlock(announcementsInfo[0].offer.photos);


    var element = document.querySelectorAll('.popup__photo');

    for (var i = 0; i < announcementsInfo[0].offer.photos.length; i++) {
      element[i].src = announcementsInfo[0].offer.photos[i];
    }

    var map = document.querySelector('.map');
    var articleDom = map.querySelector('.popup');
    var closeButton = document.querySelector('.popup__close');

    onCardCloseButtonClickHandler(closeButton, map, articleDom);
    onEscKeydownHandler(map, articleDom);
  }

  function onCardCloseButtonClickHandler(button, container, element) {
    button.addEventListener('click', function() {
      container.removeChild(element);
    });
  }

  function onEscKeydownHandler(container, element) {
    document.addEventListener('keydown', function(evt) {
      console.dir(evt);
      var target = evt.target;
      console.dir(target);
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

  function setMaxMinLengthErrorMessage(node, maxMessage, minMessage) {
    node.addEventListener('input', function() {
      if (node.value.length >= 100) {
        node.setCustomValidity(maxMessage);

      } else if (node.value.length <= 30) {
        node.setCustomValidity(minMessage);

      } else {
        node.setCustomValidity('');

      }
    });
  }

  function editForm() {
    var form = document.querySelector('.ad-form');
    var titleInput = form.querySelector('#title');
    var priceInput = form.querySelector('#price');
    titleInput.required = true;
    setMaxMinLengthErrorMessage(titleInput, 'Адрес должен быть не длинне 100 символов.', 'Адрес должен быть не короче 30 символов.');

    priceInput.required = true;

    var type = form.querySelector('#type');
    var minPrice = 1000;
    var price = form.querySelector('#price');
    price.placeholder = '1000';

    type.addEventListener('change', function() {
      var typeIndex = form.querySelector('#type').selectedIndex;
      switch (typeIndex) {
        case 0:
          minPrice = 0;
          price.placeholder = '0';
          break;
        case 1:
          minPrice = 1000;
          price.placeholder = '1000';
          break;
        case 2:
          minPrice = 5000;
          price.placeholder = '5000';
          break;
        case 3:
          minPrice = 10000;
          price.placeholder = '10000';
          break;
      }
    });

    price.addEventListener('input', function() {
      if (price.value >= 1000000 || price.value <= minPrice) {
        price.setCustomValidity('Цена за ночь должна быть от ' + minPrice + ' до 1000000.');
      } else {
        price.setCustomValidity('');
      }
    });



    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');
    onSelectTimeInOutChangeHandler(timeIn, timeOut);
    onSelectTimeInOutChangeHandler(timeOut, timeIn);

    var roomsNumber = form.querySelector('#room_number');
    var capacity = form.querySelector('#capacity');

    var roomsSelectedIndex = roomsNumber.selectedIndex;
    var capacitySelectedIndex = capacity.selectedIndex;

    for (var i = 0; i < roomsNumber.length; i++) {
      if (roomsNumber.selectedIndex === i) {
        capacity.selectedIndex = roomsSelectedIndex === 3 ? 3 : 2;
        capacity[0].disabled = true;
        capacity[1].disabled = true;
        capacity[3].disabled = true;
      }
    }

    roomsNumber.addEventListener('change', function() {
      switch (roomsNumber.selectedIndex) {
        case 0:
          capacity[0].disabled = true;
          capacity[1].disabled = true;
          capacity[2].disabled = false;
          capacity[3].disabled = true;
          break;
        case 1:
          capacity[0].disabled = true;
          capacity[1].disabled = false;
          capacity[2].disabled = false;
          capacity[3].disabled = true;
          break;
        case 2:
          capacity[0].disabled = false;
          capacity[2].disabled = false;
          capacity[1].disabled = false;
          capacity[3].disabled = true;
          break;
        case 3:
          capacity[0].disabled = true;
          capacity[1].disabled = true;
          capacity[2].disabled = true;
          capacity[3].disabled = false;
          break;
      }
    });
  }


  editForm();

  function onSelectTimeInOutChangeHandler(changedNode, changableNode) {
    changedNode.addEventListener('change', function() {
      var index;
      index = changedNode.selectedIndex;
      changableNode.selectedIndex = index;
    });
  }

  (function submitFrom() {
    var form = document.querySelector('.ad-form');
    var submitButton = form.querySelector('.ad-form__submit');
    var main = document.querySelector('main');
    var succesMessageWindowTemplate = document.querySelector('#success').content.querySelector('.success');
    var succesMessageWindow = succesMessageWindowTemplate.cloneNode(true);
    var errorMessageWindowTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessageWindow = errorMessageWindowTemplate.cloneNode(true);
    var resetButton = form.querySelector('.ad-form__reset');

    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
      if (form.reportValidity() === true) {
        main.appendChild(succesMessageWindow);
        resetPage();
      } else {
        main.appendChild(errorMessageWindow);
        errorMessageWindow.querySelector('.error__button').autofocus = true;
      }
    });

    succesMessageWindow.addEventListener('click', function() {
      succesMessageWindow.parentNode.removeChild(succesMessageWindow);
    });

    errorMessageWindow.addEventListener('click', function() {
      errorMessageWindow.parentNode.removeChild(errorMessageWindow);
    });
    onEscKeydownHandler(main, succesMessageWindow);
    onEscKeydownHandler(main, errorMessageWindow);

    resetButton.addEventListener('click', function() {
      resetPage();
    });
  })();


  function resetPage() {
    var map = document.querySelector('.map');
    var announcementsFilterForm = document.querySelector('.ad-form');
    var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
    var addressInput = document.getElementById('address');
    addressInput.value = INITIAL_POSITION_MAIN_PIN_X + (MAIN_PIN_WIDTH / 2) + ' , ' + (INITIAL_POSITION_MAIN_PIN_Y + 85);
    map.classList.add('map--faded');
    var mapElementsToDelete = map.querySelectorAll('.map__pin');
    var pinContiner = map.querySelector('.map__pins');
    for (var i = 1; i < mapElementsToDelete.length; i++) {
      pinContiner.removeChild(mapElementsToDelete[i]);
    }
    var form = document.querySelector('.ad-form');
    form.reset();
    disableElements(fieldsetList);
  }
