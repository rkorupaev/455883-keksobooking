'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var INITIAL_POSITION_MAIN_PIN_X = 570;
  var INITIAL_POSITION_MAIN_PIN_Y = 375;
  var MAIN_PIN_WIDTH = 65;

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

  function createPins() {
    window.backend.load(function (announcementsInfoLoaded) {
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

  function onPinButtonClickHandler(pin, announcementInfo) {
    pin.addEventListener('click', function () {
      var tempoDom = document.querySelector('.map').querySelector('.popup');
      if (tempoDom === null) {
        window.card.show(announcementInfo);
      } else {
        var articleDom = document.querySelector('.map').querySelector('.popup');
        onCardCloseHandler(articleDom);
        window.card.show(announcementInfo);
      }
    });
  }

  function onPinButtonKeydownHandler(announcementInfo) {
    document.addEventListener('keydown', function (evt) {
      var tempoDom = document.querySelector('.map').querySelector('.popup');
      if (evt.keyCode === ENTER_KEY_CODE) {
        if (tempoDom === null) {
          window.card.show(announcementInfo);
        } else {
          var articleDom = document.querySelector('.map').querySelector('.popup');
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
      if (node.value.length >= 100) {
        node.setCustomValidity(maxMessage);
      } else if (node.value.length <= 30) {
        node.setCustomValidity(minMessage);
      } else {
        node.setCustomValidity('');
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
    window.util.disableElements(fieldsetList);
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
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH
  };
})();
