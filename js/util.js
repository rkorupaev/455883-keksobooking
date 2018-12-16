'use strict';

(function() {

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

window.util = {
  disableElements: disableElements,
  enableElements: enableElements,
  setAddressCoordinates: setAddressCoordinates
}

})();
