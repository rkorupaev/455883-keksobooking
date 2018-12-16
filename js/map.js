'use strict';
var MAIN_PIN_WIDTH = 65;
var INITIAL_POSITION_MAIN_PIN_X = 570;
var INITIAL_POSITION_MAIN_PIN_Y = 375;
var PIN_SHIFT_X = 32;
var PIN_SHIFT_Y = 87;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var MAX_Y_COORDINATE = 630;
var MIN_Y_COORDINATE = 130;


function activatePage() {
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var announcementsFilterForm = document.querySelector('.ad-form');
  var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
  var addressInput = document.getElementById('address');
  addressInput.value = INITIAL_POSITION_MAIN_PIN_X + ' , ' + INITIAL_POSITION_MAIN_PIN_Y;
  addressInput.readOnly = true;

  disableElements(fieldsetList);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var initialLocationX = evt.clientX;
    var initialLocationY = evt.clientY;



    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

    if (initialLocationY <= MAX_Y_COORDINATE - PIN_SHIFT_Y && initialLocationY >= MIN_Y_COORDINATE) {

      var shift = {
        x: initialLocationX - moveEvt.clientX,
        y: initialLocationY - moveEvt.clientY
      };

      initialLocationX = moveEvt.clientX;
      initialLocationY = moveEvt.clientY;

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    }


      setAddressCoordinates(parseInt(pinMain.style.left, 10) + PIN_SHIFT_X, parseInt(pinMain.style.top, 10) + PIN_SHIFT_Y, addressInput);

    };




    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.classList.remove('map--faded');
      announcementsFilterForm.classList.remove('ad-form--disabled');
      enableElements(fieldsetList);
      createPins();


      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

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
  window.load(function (announcementsInfoLoaded) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pins = [];
    for (var i = 0; i < announcementsInfoLoaded.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      pin.style = 'left: ' + announcementsInfoLoaded[i].location.x + 'px; top: ' + announcementsInfoLoaded[i].location.y + 'px;';
      pin.querySelector('img').src = announcementsInfoLoaded[i].author.avatar;
      pin.querySelector('img').alt = announcementsInfoLoaded[i].offer.title;
      pins.push(pin);

      onPinButtonClickHandler(pin, announcementsInfoLoaded[i]);
      onPinButtonKeydownHandler(announcementsInfoLoaded[i]);
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


function onPinButtonClickHandler(pin, announcementInfo) {
  pin.addEventListener('click', function () {
    var tempoDom = document.querySelector('.map').querySelector('.popup');
    if (tempoDom === null) {
      showCard(announcementInfo);
    } else {
      var articleDom = document.querySelector('.map').querySelector('.popup');
      onCardCloseHandler(articleDom);
      showCard(announcementInfo);
    }
  });
}

function onPinButtonKeydownHandler(announcementInfo) {
  document.addEventListener('keydown', function (evt) {
    var tempoDom = document.querySelector('.map').querySelector('.popup');
    if (evt.keyCode === ENTER_KEY_CODE) {
      if (tempoDom === null) {
        showCard(announcementInfo);
      } else {
        var articleDom = document.querySelector('.map').querySelector('.popup');
        onCardCloseHandler(articleDom);
        showCard(announcementInfo);
      }
    }
  });
}


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

  onCardCloseButtonClickHandler(closeButton, map, articleDom);
  onEscKeydownHandler(articleDom);
}

function onCardCloseButtonClickHandler(button, container, element) {
  button.addEventListener('click', function () {
    container.removeChild(element);
  });
}

function onEscKeydownHandler(element) {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      element.remove();
    }
  });
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

function setMaxMinLengthErrorMessage(node, maxMessage, minMessage) {
  node.addEventListener('input', function () {
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

  type.addEventListener('change', function () {
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

  price.addEventListener('input', function () {
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

  for (var i = 0; i < roomsNumber.length; i++) {
    if (roomsNumber.selectedIndex === i) {
      capacity.selectedIndex = roomsSelectedIndex === 3 ? 3 : 2;
      capacity[0].disabled = true;
      capacity[1].disabled = true;
      capacity[3].disabled = true;
    }
  }

  roomsNumber.addEventListener('change', function () {
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
  changedNode.addEventListener('change', function () {
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

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (form.reportValidity() === true) {
      main.appendChild(succesMessageWindow);
      resetPage();
    }
  });

  submitButton.addEventListener('click', function () {
    if (form.reportValidity() === false) {
      main.appendChild(errorMessageWindow);
      errorMessageWindow.querySelector('.error__button').autofocus = true;
    }
  });

  succesMessageWindow.addEventListener('click', function () {
    succesMessageWindow.parentNode.removeChild(succesMessageWindow);
  });

  errorMessageWindow.addEventListener('click', function () {
    errorMessageWindow.parentNode.removeChild(errorMessageWindow);
  });
  onEscKeydownHandler(succesMessageWindow);
  onEscKeydownHandler(errorMessageWindow);

  resetButton.addEventListener('click', function () {
    resetPage();
  });
})();


function resetPage() {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var announcementsFilterForm = document.querySelector('.ad-form');
  var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
  var addressInput = document.getElementById('address');
  addressInput.value = INITIAL_POSITION_MAIN_PIN_X + (MAIN_PIN_WIDTH / 2) + ' , ' + (INITIAL_POSITION_MAIN_PIN_Y + 85);
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');
  var mapElementsToDelete = map.querySelectorAll('.map__pin');
  var pinContiner = map.querySelector('.map__pins');
  for (var i = 1; i < mapElementsToDelete.length; i++) {
    pinContiner.removeChild(mapElementsToDelete[i]);
  }
  form.reset();
  disableElements(fieldsetList);
}




// (function filterAnnouncements() {
//   var typeFilter = document.getElementById('housing-type');
//   var typeFilterOptionList = typeFilter.querySelectorAll('option');
//   var similarAnnouncement = [];
//   console.log(typeFilter);
//   console.log(typeFilterOptionList);
//   window.load(function(announcementsInfoLoaded) {
//     console.log(announcementsInfoLoaded[2].offer.type);
//     typeFilter.addEventListener('change', function() {
//       debugger;
//       switch (typeFilterOptionList[typeFilter.selectedIndex].value) {
//         case 'flat':
//           similarAnnouncement = announcementsInfoLoaded.filter(function(announcement) {
//             return announcement.offer.type === 'flat';
//           });
//         case 'palace':
//           similarAnnouncement = announcementsInfoLoaded.filter(function(announcement) {
//             return announcement.offer.type === 'palace';
//           });
//         case 'house':
//           similarAnnouncement = announcementsInfoLoaded.filter(function(announcement) {
//             return announcement.offer.type === 'house';
//           });
//         case 'bungalo':
//           similarAnnouncement = announcementsInfoLoaded.filter(function(announcement) {
//             return announcement.offer.type === 'bungalo';
//           });
//         // case 'any':
//         //   similarAnnouncement = announcementsInfoLoaded;


//       }
//       console.log(typeFilterOptionList[typeFilter.selectedIndex].value);
//       console.log(similarAnnouncement);


//     });
//   });


// })();
