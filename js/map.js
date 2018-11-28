function createAnnouncement() {
  'use strict';
  var announcements = [];
  var featuresArrayChanged = [];

  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  featuresArrayChanged.length = getRandomNumber(1, 6);
  for (var i = 0; i < featuresArrayChanged.length; i++) {
    featuresArrayChanged[i] = featuresArray[i];
  }
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];

  for (var i = 0; i < 8; i++) {

    var locationX = getRandomNumber(0, 700) - 25;
    var locationY = getRandomNumber(130, 630) - 70;

    announcements[i] = {

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
        features: featuresArrayChanged,
        description: '',
        photos: photosArray
      },

      location: {
        x: locationX,
        y: locationY
      }
    }
  }
  return announcements;
}

var announcementsArray = createAnnouncement();
console.log(announcementsArray);


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

console.log(createPinsDom(announcementsArray));

function placePins(pinsArray) {
  var pinList = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsArray.length; i++) {
    fragment.appendChild(pinsArray[i]);
  }
  pinList.appendChild(fragment);
}

placePins(createPinsDom(announcementsArray));

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

card2 = cardTemplate.cloneNode(true);
card2.querySelector('.popup__title').textContent = announcementsArray[0].offer.title;
card2.querySelector('.popup__text--address').textContent = announcementsArray[0].offer.adress;
card2.querySelector('.popup__text--price').textContent = announcementsArray[0].offer.price + '₽/ночь';
card2.querySelector('.popup__type').textContent = convertToFullName(announcementsArray[0].offer.type);
card2.querySelector('.popup__text--capacity').textContent = announcementsArray[0].offer.rooms + ' комнаты для ' + announcementsArray[0].offer.guests + ' гостей.';
card2.querySelector('.popup__text--time').textContent = 'Заезд после ' + announcementsArray[0].offer.checkin + ', выезд до ' + announcementsArray[0].offer.checkout;
card2.querySelector('.popup__description').textContent = announcementsArray[0].offer.description;
for (var i = 0; i < announcementsArray[0].offer.features.length; i++) {
  switch (announcementsArray[0].offer.features[i]) {
    case 'wifi':
      card2.querySelector('.popup__feature--wifi').textContent = announcementsArray[0].offer.features[i];
      break;
    case 'dishwasher':
      card2.querySelector('.popup__feature--dishwasher').textContent = announcementsArray[0].offer.features[i];
      break;
    case 'parking':
      card2.querySelector('.popup__feature--parking').textContent = announcementsArray[0].offer.features[i];
      break;
    case 'washer':
      card2.querySelector('.popup__feature--washer').textContent = announcementsArray[0].offer.features[i];
      break;
    case 'elevator':
      card2.querySelector('.popup__feature--elevator').textContent = announcementsArray[0].offer.features[i];
      break;
    case 'conditioner':
      card2.querySelector('.popup__feature--conditioner').textContent = announcementsArray[0].offer.features[i];
      break;
  }
}

var featuresNodesArray = card2.querySelectorAll('.popup__feature');

for (var i = 0; i < featuresNodesArray.length; i++) {
  if (featuresNodesArray[i].textContent.length === 0) {
    featuresNodesArray[i].parentNode.removeChild(featuresNodesArray[i]);
  }
}

console.log(card2);

var mapFilterContainer = document.querySelector('.map__filters-container');
var cardList = document.querySelector('.map');
cardList.insertBefore(card2, mapFilterContainer);

var avatarImagerSrc = document.querySelector('.popup__avatar').src = announcementsArray[0].author.avatar;


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

makePhotoBlock(announcementsArray[0].offer.photos);


var element = document.querySelectorAll('.popup__photo');
console.log(element);

for (var i = 0; i < announcementsArray[0].offer.photos.length; i++) {
  element[i].src = announcementsArray[0].offer.photos[i];
}



function convertToFullName(name) {
  var fullName = '';
  switch (name) {
    case 'flat':
      fullName = 'Квартира';
      break;
    case 'palace':
      fullName = 'Дворец';
      break;
    case 'bungalo':
      fullName = 'Бунгало';
      break;
    case 'house':
      fullName = 'Дом';
      break;
  }
  return fullName;
}

function getRandomNumber(rangeMin, rangeMax) {
  return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
}

