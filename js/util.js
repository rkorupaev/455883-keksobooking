'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var MAIN_PIN_WIDTH = 65;
  var MAX_INPUT_LENGTH = 100;
  var MIN_INPUT_LENGTH = 30;
  var PIN_SHIFT_X = 32;
  var PIN_SHIFT_Y = 87;

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

  function placePins(pinsArray) {
    var pinList = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsArray.length; i++) {
      fragment.appendChild(pinsArray[i]);
    }
    pinList.appendChild(fragment);
  }

  function createPins(infoArray) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pins = [];
    var pinsNumber = infoArray.length >= 5 ? 5 : infoArray.length;
    for (var i = 0; i < pinsNumber; i++) {
      if ('offer' in infoArray[i]) {
        var pin = pinTemplate.cloneNode(true);
        var pinImg = pin.querySelector('img');
        pin.style = 'left: ' + infoArray[i].location.x + 'px; top: ' + infoArray[i].location.y + 'px;';
        pinImg.src = infoArray[i].author.avatar;
        pinImg.alt = infoArray[i].offer.title;
        pins.push(pin);

        onPinButtonClickHandler(pin, infoArray[i]);
        onPinButtonKeydownHandler(infoArray[i]);
      }
    }
    placePins(pins);

  }

  function onPinButtonClickHandler(pin, announcementInfo) {
    var map = document.querySelector('.map');
    pin.addEventListener('click', function () {
      var tempoDom = map.querySelector('.popup');
      if (tempoDom === null) {
        window.card.show(announcementInfo);
      } else {
        var articleDom = map.querySelector('.popup');
        onCardCloseHandler(articleDom);
        window.card.show(announcementInfo);
      }
    });
  }

  function onPinButtonKeydownHandler(announcementInfo) {
    var map = document.querySelector('.map');
    document.addEventListener('keydown', function (evt) {
      var tempoDom = map.querySelector('.popup');
      if (evt.keyCode === ENTER_KEY_CODE) {
        if (tempoDom === null) {
          window.card.show(announcementInfo);
        } else {
          var articleDom = map.querySelector('.popup');
          onCardCloseHandler(articleDom);
          window.card.show(announcementInfo);
        }
      }
    });
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

  function onCardCloseHandler(element) {
    element.parentNode.removeChild(element);
  }

  function setMaxMinLengthErrorMessage(node, maxMessage, minMessage) {
    node.addEventListener('input', function () {
      if (node.value.length >= MAX_INPUT_LENGTH) {
        node.setCustomValidity(maxMessage);
        node.style.border = '1px solid red';
      } else if (node.value.length <= MIN_INPUT_LENGTH) {
        node.setCustomValidity(minMessage);
        node.style.border = '1px solid red';
      } else {
        node.setCustomValidity('');
        node.style.border = '';
      }
    });
  }

  function onSelectTimeInOutChangeHandler(changedNode, changableNode) {
    changedNode.addEventListener('change', function () {
      var index;
      index = changedNode.selectedIndex;
      changableNode.selectedIndex = index;
    });
  }

  function resetPage() {
    var map = document.querySelector('.map');
    var form = document.querySelector('.ad-form');
    var announcementsFilterForm = document.querySelector('.ad-form');
    var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
    var capacitySelect = document.getElementById('capacity');
    var addressInput = document.getElementById('address');
    var pinMain = map.querySelector('.map__pin--main');
    var price = announcementsFilterForm.querySelector('#price');

    pinMain.style.left = window.initpage.initialPinPositionX + 'px';
    pinMain.style.top = window.initpage.initialPinPositionY + 'px';

    form.reset();
    clearMap();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    capacitySelect.selectedIndex = 2;
    window.util.disableElements(fieldsetList);
    window.initpage.initInfo = null;
    window.util.setAddressCoordinates(parseInt(pinMain.style.left, 10) + PIN_SHIFT_X,
        parseInt(pinMain.style.top, 10) + PIN_SHIFT_Y, addressInput);
    price.placeholder = '1000';
  }

  function clearMap() {
    var map = document.querySelector('.map');
    var mapElementsToDelete = map.querySelectorAll('.map__pin + :not(.map__pin--main');
    var pinContainer = map.querySelector('.map__pins');
    var card = map.querySelector('.map__card');
    mapElementsToDelete.forEach(function (element) {
      pinContainer.removeChild(element);
    });
    if (card) {
      card.remove();
    }
  }

  window.util = {
    disableElements: disableElements,
    enableElements: enableElements,
    setAddressCoordinates: setAddressCoordinates,
    createPins: createPins,
    onEscKeydownHandler: onEscKeydownHandler,
    onCardCloseButtonClickHandler: onCardCloseButtonClickHandler,
    setMaxMinLengthErrorMessage: setMaxMinLengthErrorMessage,
    onSelectTimeInOutChangeHandler: onSelectTimeInOutChangeHandler,
    resetPage: resetPage,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    clearMap: clearMap
  };
})();
