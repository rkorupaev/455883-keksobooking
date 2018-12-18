'use strict';

(function() {

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  function upload(data, onLoad, onError) {
    var uploadURL = 'https://js.dump.academy/keksobooking';

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка. Обратитесь к администратору.')
    })

    xhr.addEventListener('timeout', function() {
      onError('Превышено время ожидания ответа от сервера.')
    })

    xhr.timeout = 10000;

    xhr.open('POST', uploadURL);
    xhr.send(data);
  };

  function load(onLoad, onError) {
    var downloadURL = 'https://js.dump.academy/keksobooking/data';
    xhr.open('GET', downloadURL);

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка. Обратитесь к администратору.')
    })

    xhr.addEventListener('timeout', function() {
      onError('Превышено время ожидания ответа от сервера.')
    })

    xhr.timeout = 10000;

    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  }

})();
