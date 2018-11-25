var pins = [];

function createAnouncment() {
  var anouncments = [];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace, flat, house,bungalo'];
  var times = ['12:00', '13:00', '14:00'];

  for (var i = 0; i < 8; i++) {
    anouncments[i] = {

      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: titles[i],
        // adress: '' + anouncments[i].location.x + ',' + anouncments[i].location.y + '',
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
  return anouncments;
}

console.log(createAnouncment());

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// console.log(pinTemplate);
var pin = pinTemplate.cloneNode(true);
var pin2 = pinTemplate.cloneNode(true);
var pin3 = pinTemplate.cloneNode(true);
pin2.style = 'left: ' + anouncments[1].location.x + 'px; top: ' + anouncments[1].location.y + 'px;';
pin3.style = 'left: 100px; top: 100px;';
pin2.querySelector('img').src = anouncments[4].author.avatar;
pin2.querySelector('img').alt = anouncments[4].offer.title;

console.log(pin2);
console.log(pin);

var pinList = document.querySelector('.map__pins');

pinList.appendChild(pin2);
pinList.appendChild(pin3);


function getRandomNumber(rangeMin, rangeMax) {
  return Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);
}
