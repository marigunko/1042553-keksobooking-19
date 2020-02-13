'use strict';

var TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['WiFi', 'Стиральная машина', 'Парковка', 'Кухня', 'Лифт', 'Кондиционер'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAX_PRICE = 1000000;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var OFFERS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomArray = function (targetArray) {
  var count = getRandomIntInclusive(0, targetArray.length);
  var resultArray = [];
  for (var i = 0; i < count; i++) {
    resultArray.push(targetArray[i]);
  }
  return resultArray;
};

var createOffer = function (number) {
  var coordX = getRandomIntInclusive(0, MAP_WIDTH);
  var coordY = getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return {
    'author': {
      'avatar': 'img/avatars/user' + '0' + (number + 1) + '.png',
    },
    'offer': {
      'title': 'Милая, уютная квартирка в центре Токио ' + (number + 1),
      'address': coordX + ', ' + coordY,
      'price': getRandomIntInclusive(1, MAX_PRICE),
      'type': arrayRandElement(TYPE),
      'rooms': getRandomIntInclusive(1, 100),
      'guests': getRandomIntInclusive(1, 3),
      'checkin': arrayRandElement(TIME),
      'checkout': arrayRandElement(TIME),
      'features': generateRandomArray(FEATURES),
      'description': 'Описание ' + (number + 1),
      'photos': generateRandomArray(PHOTOS),
    },
    'location': {
      'x': coordX,
      'y': coordY,
    },
  };
};

var getListOfOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    offers[i] = createOffer(i);
  }
  return offers;
};

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var generatePinElement = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.location.x - PIN_WIDTH / 2;
  var pinY = offer.location.y - PIN_HEIGHT;
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

document.querySelector('.map').classList.remove('map--faded');

var similarMapPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#card');
var offerCard = document.createDocumentFragment();

var createCard = function (card) {
  var cardElement = similarPinTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photo').textContent = card.offer.photos;
  cardElement.querySelector('.popup__avatar').style.src = card.author.avatar;

  return cardElement;
};

similarMapPinsElement.appendChild(fragment);

offerCard.append(createCard(offers[0]));

offers.forEach(function (offer) {
  fragment.appendChild(generatePinElement(offer));
});
