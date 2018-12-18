'use strict';

(function () {
  var uploadURL = 'https://js.dump.academy/keksobooking';

  function upload (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open('POST', uploadURL);
    xhr.send(data);
  };

  var downloadURL = 'https://js.dump.academy/keksobooking/data';

  function load (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', downloadURL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };


  window.backend = {
    upload: upload,
    load: load
  }

})();
