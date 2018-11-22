var anouncments = [];
var featuresArray = ['wifi', 'dishwasher', 'parking'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

for (var i = 0; i < 8; i++) {
  anouncments[i] = {

    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: 'Маленькая неуютная квартира',
      adress: '600, 350',
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

  console.log(anouncments[i]);

}
