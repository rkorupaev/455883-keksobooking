'use strict';

// function editForm() {
//   var form = document.querySelector('.ad-form');
//   var titleInput = form.querySelector('#title');
//   var priceInput = form.querySelector('#price');
//   titleInput.required = true;
//   window.util.setMaxMinLengthErrorMessage(titleInput, 'Адрес должен быть не длинне 100 символов.', 'Адрес должен быть не короче 30 символов.');

//   priceInput.required = true;

//   var type = form.querySelector('#type');
//   var minPrice = 1000;
//   var price = form.querySelector('#price');
//   price.placeholder = '1000';

//   type.addEventListener('change', function () {
//     var typeIndex = form.querySelector('#type').selectedIndex;
//     switch (typeIndex) {
//       case 0:
//         minPrice = 0;
//         price.placeholder = '0';
//         break;
//       case 1:
//         minPrice = 1000;
//         price.placeholder = '1000';
//         break;
//       case 2:
//         minPrice = 5000;
//         price.placeholder = '5000';
//         break;
//       case 3:
//         minPrice = 10000;
//         price.placeholder = '10000';
//         break;
//     }
//   });

//   price.addEventListener('input', function () {
//     if (price.value >= 1000000 || price.value <= minPrice) {
//       price.setCustomValidity('Цена за ночь должна быть от ' + minPrice + ' до 1000000.');
//     } else {
//       price.setCustomValidity('');
//     }
//   });


//   var timeIn = form.querySelector('#timein');
//   var timeOut = form.querySelector('#timeout');
//   onSelectTimeInOutChangeHandler(timeIn, timeOut);
//   onSelectTimeInOutChangeHandler(timeOut, timeIn);

//   var roomsNumber = form.querySelector('#room_number');
//   var capacity = form.querySelector('#capacity');

//   var roomsSelectedIndex = roomsNumber.selectedIndex;

//   for (var i = 0; i < roomsNumber.length; i++) {
//     if (roomsNumber.selectedIndex === i) {
//       capacity.selectedIndex = roomsSelectedIndex === 3 ? 3 : 2;
//       capacity[0].disabled = true;
//       capacity[1].disabled = true;
//       capacity[3].disabled = true;
//     }
//   }

//   roomsNumber.addEventListener('change', function () {
//     switch (roomsNumber.selectedIndex) {
//       case 0:
//         capacity[0].disabled = true;
//         capacity[1].disabled = true;
//         capacity[2].disabled = false;
//         capacity[3].disabled = true;
//         break;
//       case 1:
//         capacity[0].disabled = true;
//         capacity[1].disabled = false;
//         capacity[2].disabled = false;
//         capacity[3].disabled = true;
//         break;
//       case 2:
//         capacity[0].disabled = false;
//         capacity[2].disabled = false;
//         capacity[1].disabled = false;
//         capacity[3].disabled = true;
//         break;
//       case 3:
//         capacity[0].disabled = true;
//         capacity[1].disabled = true;
//         capacity[2].disabled = true;
//         capacity[3].disabled = false;
//         break;
//     }
//   });
// }


// editForm();

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
  window.util.onEscKeydownHandler(succesMessageWindow);
  window.util.onEscKeydownHandler(errorMessageWindow);

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


(function filterAnnouncements() {
  var typeFilter = document.getElementById('housing-type');
  var typeFilterOptionList = typeFilter.querySelectorAll('option');
  window.load(function (announcementsInfoLoaded) {
    typeFilter.addEventListener('change', function () {
      createDataArray(announcementsInfoLoaded, typeFilterOptionList[typeFilter.selectedIndex].value);
    });
  });
})();


function createDataArray(infoArray, type) {
  var similarAnnouncement = [];
  similarAnnouncement = infoArray.filter(function (announcement) {
    return announcement.offer.type === type;
  });
}
