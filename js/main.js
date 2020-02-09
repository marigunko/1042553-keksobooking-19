'use strict';

var TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['WiFi', 'Стиральная машина', 'Парковка', 'Кухня', 'Лифт', 'Кондиционер'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var OFFERS_COUNT = 8;

  return "0" + Math.floor(Math.random() * 8) + 1;
function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateOffers = function(count) {
  var countOffers = getRandomIntInclusive(FEATURES.length)
  var feature = arrayRandElement(FEATURES);

  for (var i = 0; i < count; i++) {
    while (features.includes(feature)) {
      feature = arrayRandElement(FEATURES);
    }
    return result;
  }
}

coordX = getRandomNumber(0, 1200);
coordY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);

var createOffer = function() {
  return {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png',
    };
    'offer': {
      'title': 'Милая, уютная квартирка в центре Токио' + (i + 1),
      'address': 'coordX' + ',' + 'coordY',
      'price': getRandomNumber(1, 1000000),
      'type': arrayRandElement(TYPE),
      'rooms': getRandomNumber(1, 100),
      'guests': getRandomNumber(1, 3),
      'checkin': arrayRandElement(TIME),
      'checkout': arrayRandElement(TIME),
      'features': arrayRandElement(FEATURES),
      'description': 'Описание' + (i + 1),
      'photos': arrayRandElement(PHOTOS),
    };
    'location': {
      'x': coordX,
      'y': coordY,
    };
  };
};

var getListOfOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    offers[i] = createOffer(i);
  }
  return offers;
};
