function createAnnouncment() {
  var announcments = [];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];

  for (var i = 0; i < 8; i++) {

    var locationX = getRandomNumber(0, 700) - 25;
    var locationY = getRandomNumber(130, 630) - 70;

    announcments[i] = {

      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        adress: '' + locationX + ', ' + locationY + '',
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
        x: locationX,
        y: locationY
      }
    }
  }
  return announcments;
}

var announcmentsArray = createAnnouncment();
console.log(announcmentsArray);


function createPinsDom(array) {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = [];
  for (var i = 0; i < array.length; i++) {
    pins[i] = pinTemplate.cloneNode(true);
    pins[i].style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;';
    pins[i].querySelector('img').src = array[i].author.avatar;
    pins[i].querySelector('img').alt = array[i].offer.title;
  }
  return pins;
}

console.log(createPinsDom(announcmentsArray));

function placePins(pinsArray) {
  var pinList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsArray.length; i++) {
    fragment.appendChild(pinsArray[i]);
  }
  pinList.appendChild(fragment);
}

placePins(createPinsDom(announcmentsArray));

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cards = [];
card2 = cardTemplate.cloneNode(true);
card2.querySelector('.popup__title').textContent = announcmentsArray[0].offer.title;
card2.querySelector('.popup__text--address').textContent = announcmentsArray[0].offer.adress;
card2.querySelector('.popup__text--price').textContent = announcmentsArray[0].offer.price + '₽/ночь';
card2.querySelector('.popup__type').textContent = convertToFullName(announcmentsArray[0].offer.type);
card2.querySelector('.popup__text--capacity').textContent = announcmentsArray[0].offer.rooms + ' комнаты для ' + announcmentsArray[0].offer.guests + ' гостей.';
card2.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcmentsArray[0].offer.checkin + ', выезд до ' + announcmentsArray[0].offer.checkout;
card2.querySelector('.popup__features').querySelector('li').textContent = announcmentsArray[0].offer.features;
card2.querySelector('.popup__description').textContent = announcmentsArray[0].offer.description;

console.log(card2);


var mapFilterContainer = document.querySelector('.map__filters-container');
var cardList = document.querySelector('.map');
cardList.insertBefore(card2, mapFilterContainer);

var avatarImagerSrc = document.querySelector('.popup__avatar').src = announcmentsArray[0].author.avatar;


function makePhotoBlock(array) {
  photos = [];
  var imgTag = document.querySelector('.popup__photos').querySelector('img');
  var photoBlock = document.querySelector('.popup__photos');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length - 1; i++) {
    photos[i] = imgTag.cloneNode(true);

    fragment.appendChild(photos[i]);
  }
  photoBlock.appendChild(fragment);
}

makePhotoBlock(announcmentsArray[0].offer.photos);


var element = document.querySelectorAll('.popup__photo');
console.log(element);

for (var i = 0; i < announcmentsArray[0].offer.photos.length; i++) {
  element[i].src = announcmentsArray[0].offer.photos[i];
}



function convertToFullName(name) {
  switch (name) {
    case 'flat':
      var fullName = 'Квартира';
      break;
    case 'palace':
      var fullName = 'Дворец';
      break;
    case 'bungalo':
      var fullName = 'Бунгало';
      break;
    case 'house':
      var fullName = 'Дом';
      break;
  }
  return fullName;
}

function getRandomNumber(rangeMin, rangeMax) {
  return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
}
