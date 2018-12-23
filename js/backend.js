'use strict';

(function () {
  var STATUS_CODE_OK = 200;
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';

  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка. Обратитесь к администратору.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа от сервера.');
    });

    xhr.timeout = 10000;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', DOWNLOAD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка. Обратитесь к администратору.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа от сервера.');
    });

    xhr.timeout = 10000;

    xhr.send();
  }

  window.backend = {
    upload: upload,
    load: load
  };

})();
