'use strict';

var TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['WiFi', 'Стиральная машина', 'Парковка', 'Кухня', 'Лифт', 'Кондиционер'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var OFFERS_COUNT = 8;

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomArray = function (target) {
  var count = getRandomIntInclusive(0, target.length);
  var features = [];
  for (var i = 0; i < count; i++) {
    features.push(target[i]);
  }
  return features;
};

var createOffer = function (number) {
  var coordX = getRandomIntInclusive(0, 1200);
  var coordY = getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getRandomIntInclusive(1, 8) + '.png',
    },
    'offer': {
      'title': 'Милая, уютная квартирка в центре Токио ' + (number + 1),
      'address': coordX + ', ' + coordY,
      'price': getRandomIntInclusive(1, 1000000),
      'type': arrayRandElement(TYPE),
      'rooms': getRandomIntInclusive(1, 100),
      'guests': getRandomIntInclusive(1, 3),
      'checkin': arrayRandElement(TIME),
      'checkout': arrayRandElement(TIME),
      'features': generateRandomArray(FEATURES),
      'description': 'Описание ' + (number + 1),
      'photos': arrayRandElement(PHOTOS),
    },
    'location': {
      'x': coordX,
      'y': coordY,
    },
  };
};

var getListOfOffers = function (number) {
  var offers = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    offers[i] = createOffer(i);
  }
  return offers;
};

var newOffers = getListOfOffers();

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var generatePinElement = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.location.x + 1; //смещение по X;Как это найти?
  var pinY = offer.location.y + 2; //смещение по Y;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.querySelector('img').setAttribute('src', offer.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', offer.offer.title);
  fragment.appendChild(pinElement);

  return pinElement;
};


var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);

var putPins = function (offers) {

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(generatePinElement(offers[i]));
  }

  document.querySelector('.map__pins').appendChild(fragment);
};

var offers = getListOfOffers();

putPins(offers);
