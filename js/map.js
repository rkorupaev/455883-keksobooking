var anouncments = [];
var featuresArray = ['wifi', 'dishwasher', 'parking'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace, flat, house,bungalo']
var pins = [];

for (var i = 0; i < 8; i++) {
  anouncments[i] = {

    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: titles[i],
      adress: anouncments[i].location.x, anouncments[i].location.y,
      price: 10000 + 10000 * i,
      type: 'flat',
      rooms: 2,
      guests: 3,
      checkin: '12:00',
      checkout: '13:00',
      features: featuresArray[0],
      photos: photosArray
    },

    location: {
      x: 150,
      y: 250
    }
  }
}

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
