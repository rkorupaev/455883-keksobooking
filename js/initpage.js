'use strict';

(function() {

  var MAIN_PIN_WIDTH = 65;
  var INITIAL_POSITION_MAIN_PIN_X = 570;
  var INITIAL_POSITION_MAIN_PIN_Y = 375;
  var PIN_SHIFT_X = 32;
  var PIN_SHIFT_Y = 87;
  var MAX_Y_COORDINATE = 630;
  var MIN_Y_COORDINATE = 130;

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var announcementsFilterForm = document.querySelector('.ad-form');
  var fieldsetList = announcementsFilterForm.getElementsByTagName('fieldset');
  var addressInput = document.getElementById('address');
  addressInput.value = INITIAL_POSITION_MAIN_PIN_X + ' , ' + INITIAL_POSITION_MAIN_PIN_Y;
  addressInput.readOnly = true;

  window.util.disableElements(fieldsetList);

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

      if (pinMain.offsetTop >= MAX_Y_COORDINATE) {
        pinMain.style.top = MAX_Y_COORDINATE + 'px';
      } else if (pinMain.offsetTop <= MIN_Y_COORDINATE) {
        pinMain.style.top = MIN_Y_COORDINATE + 'px';
      } else if (pinMain.offsetLeft + MAIN_PIN_WIDTH >= map.clientWidth) {
        pinMain.style.left = map.clientWidth - MAIN_PIN_WIDTH + 'px';
      } else if (pinMain.offsetLeft <= 0) {
        pinMain.style.left = '0px';
      }

      window.util.setAddressCoordinates(parseInt(pinMain.style.left, 10) + PIN_SHIFT_X,
        parseInt(pinMain.style.top, 10) + PIN_SHIFT_Y, addressInput);

    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      map.classList.remove('map--faded');
      announcementsFilterForm.classList.remove('ad-form--disabled');
      window.util.enableElements(fieldsetList);
      window.util.createPins();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
