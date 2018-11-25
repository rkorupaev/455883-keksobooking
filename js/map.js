function createAnnouncment() {
  var announcments = [];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace, flat, house,bungalo'];
  var times = ['12:00', '13:00', '14:00'];

  for (var i = 0; i < 8; i++) {
    announcments[i] = {

      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        // adress: '' + announcments[i].location.x + ',' + announcments[i].location.y + '',
        price: getRandomNumber(1000, 1000000),
        type: types[getRandomNumber(0, 3)],
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 9),
        checkin: times[getRandomNumber(0, 2)],
        checkout: times[getRandomNumber(0, 2)],
        features: featuresArray,
        description: '',
        photos: photosArray
      },

      location: {
        x: getRandomNumber(0, 700),
        y: getRandomNumber(130, 630)
      }
    }
  }
  return announcments;
}

var test = createAnnouncment();
console.log(test);


function createPinsDom(announcmentsArray) {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = [];
  for (var i = 0; i < announcmentsArray.length; i++) {
    pins[i] = pinTemplate.cloneNode(true);
    pins[i].style = 'left: ' + announcmentsArray[i].location.x + 'px; top: ' + announcmentsArray[i].location.y + 'px;';
    pins[i].querySelector('img').src = announcmentsArray[i].author.avatar;
    pins[i].querySelector('img').alt = announcmentsArray[i].offer.title;
  }
  return pins;
}

console.log(createPinsDom(test));

function placePins(pinsArray) {
  var pinList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsArray.length; i++) {
    fragment.appendChild(pinsArray[i]);
  }
  pinList.appendChild(fragment);
}

placePins(createPinsDom(test));


function getRandomNumber(rangeMin, rangeMax) {
  return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
}
