'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  titleInput.required = true;
  window.util.setMaxMinLengthErrorMessage(titleInput, 'Адрес должен быть не длинне 100 символов.',
      'Адрес должен быть не короче 30 символов.');
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
    checkPrice();
  });

  function checkPrice() {
    if (price.value >= 1000000 || price.value <= minPrice) {
      price.setCustomValidity('Цена за ночь должна быть от ' + minPrice + ' до 1000000.');
      price.style.border = '1px solid red';
    } else {
      price.setCustomValidity('');
      price.style.border = '';
    }
  }

  price.addEventListener('input', checkPrice);

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  window.util.onSelectTimeInOutChangeHandler(timeIn, timeOut);
  window.util.onSelectTimeInOutChangeHandler(timeOut, timeIn);

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
})();
