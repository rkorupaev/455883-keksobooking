'use strict';

(function () {
  var PIN_SHIFT_X = 32;
  var PIN_SHIFT_Y = 87;
  var MAX_Y_COORDINATE = 630;
  var MIN_Y_COORDINATE = 130;

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var announcementsFilterForm = document.querySelector('.ad-form');
  var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
  var addressInput = document.getElementById('address');
  var initialPinPositionX = pinMain.offsetLeft;
  var initialPinPositionY = pinMain.offsetTop;

  addressInput.value = initialPinPositionX + PIN_SHIFT_X + ' , ' + (initialPinPositionY + PIN_SHIFT_Y);
  addressInput.readOnly = true;

  window.util.disableElements(fieldsetList);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var initialLocationX = evt.clientX;
    var initialLocationY = evt.clientY;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: initialLocationX - moveEvt.clientX,
        y: initialLocationY - moveEvt.clientY
      };

      initialLocationX = moveEvt.clientX;
      initialLocationY = moveEvt.clientY;

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      if (pinMain.offsetTop >= MAX_Y_COORDINATE) {
        pinMain.style.top = MAX_Y_COORDINATE + 'px';
      } else if (pinMain.offsetTop <= MIN_Y_COORDINATE) {
        pinMain.style.top = MIN_Y_COORDINATE + 'px';
      } else if (pinMain.offsetLeft + window.util.MAIN_PIN_WIDTH >= map.clientWidth) {
        pinMain.style.left = map.clientWidth - window.util.MAIN_PIN_WIDTH + 'px';
      } else if (pinMain.offsetLeft <= 0) {
        pinMain.style.left = '0px';
      }

      window.util.setAddressCoordinates(parseInt(pinMain.style.left, 10) + PIN_SHIFT_X,
          parseInt(pinMain.style.top, 10) + PIN_SHIFT_Y, addressInput);

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      if (!window.initpage.initInfo) {
        window.backend.load(function (data) {
          window.initpage.initInfo = data;
          map.classList.remove('map--faded');
          announcementsFilterForm.classList.remove('ad-form--disabled');
          window.util.enableElements(fieldsetList);
          window.util.createPins(window.initpage.initInfo);
        }, function () {
          var main = document.querySelector('main');
          var errorMessageWindowTemplate = document.querySelector('#error').content.querySelector('.error');
          var errorMessageWindow = errorMessageWindowTemplate.cloneNode(true);
          main.appendChild(errorMessageWindow);
          errorMessageWindow.querySelector('.error__button').autofocus = true;
        });
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.initpage = {
    initialPinPositionY: initialPinPositionY,
    initialPinPositionX: initialPinPositionX,
    initInfo: null
  };
})();
