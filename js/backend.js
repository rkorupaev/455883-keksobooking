'use strict';

(function() {

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  function upload(data, onSuccess, onError) {
    var uploadURL = 'https://js.dump.academy/keksobooking';

    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

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

    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  }

})();
