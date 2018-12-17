'use strict';

(function () {
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
      window.util.resetPage();
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
    window.util.resetPage();
  });
})();
