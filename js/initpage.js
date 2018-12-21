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
  addressInput.value = pinMain.offsetLeft + PIN_SHIFT_X + ' , ' + (pinMain.offsetTop + PIN_SHIFT_Y);
  addressInput.readOnly = true;

  window.util.disableElements(fieldsetList);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var initialLocationX = evt.clientX;
    var initialLocationY = evt.clientY;

    var onMouseMove = function (moveEvt) {
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

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!window.info.initInfo) {
        window.backend.load(function (data) {
          window.info.initInfo = data;
          map.classList.remove('map--faded');
          announcementsFilterForm.classList.remove('ad-form--disabled');
          window.util.enableElements(fieldsetList);
          window.util.createPins(window.info.initInfo);
        }, function () {
        });
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
