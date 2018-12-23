'use strict';

(function () {
  var INITIAL_PRICE = 1000;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_FLAT = 5000;
  var MIN_PALACE_PRICE = 10000;

  var form = document.querySelector('.ad-form');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  titleInput.required = true;
  window.util.setMaxMinLengthErrorMessage(titleInput, 'Адрес должен быть не длинне 100 символов.',
      'Адрес должен быть не короче 30 символов.');
  priceInput.required = true;

  var type = form.querySelector('#type');
  var minPrice = INITIAL_PRICE;
  priceInput.placeholder = INITIAL_PRICE;

  type.addEventListener('change', function () {
    var typeIndex = type.selectedIndex;
    switch (typeIndex) {
      case 0:
        minPrice = MIN_BUNGALO_PRICE;
        priceInput.placeholder = MIN_BUNGALO_PRICE;
        break;
      case 1:
        minPrice = MIN_FLAT_PRICE;
        priceInput.placeholder = MIN_FLAT_PRICE;
        break;
      case 2:
        minPrice = MIN_HOUSE_FLAT;
        priceInput.placeholder = MIN_HOUSE_FLAT;
        break;
      case 3:
        minPrice = MIN_PALACE_PRICE;
        priceInput.placeholder = MIN_PALACE_PRICE;
        break;
    }
    checkPrice();
  });

  function checkPrice() {
    if (priceInput.value >= 1000000 || priceInput.value <= minPrice) {
      priceInput.setCustomValidity('Цена за ночь должна быть от ' + minPrice + ' до 1000000.');
      priceInput.style.border = '1px solid red';
    } else {
      priceInput.setCustomValidity('');
      priceInput.style.border = '';
    }
  }

  priceInput.addEventListener('input', checkPrice);

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
