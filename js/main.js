'use strict';

var TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAX_PRICE = 1000000;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var OFFERS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var adForm = document.querySelector('.ad-form');
var fieldset = adForm.querySelectorAll('fieldset');
var pinMain = document.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');
var roomsCount = adForm.querySelector('#room_count');
var guestsCount = adForm.querySelector('#capacity');

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

// Отрисовываем пины

// Определяем переменные
// Шаблоны и фрагмент
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');// Шаблон пина
// var similarPinTemplate = document.querySelector('#card').content.querySelector('.map__card');// Шаблон карточки
var fragment = document.createDocumentFragment();// Фрагмент

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
// var mapFiltersContainer = document.querySelector('.map__filters-container');
var offers = getListOfOffers();

// Создаём функции

// Создаём шаблон одного пина
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

// Генерируем и отрисовываем пины
var putPins = function () {
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(generatePinElement(offers[i]));
  }

  mapPins.appendChild(fragment);
};

// Запускаем функцию
putPins(offers);

/* var createCard = function (card) {
  var cardElement = similarPinTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  renderFeatures(card.offer.features, cardElement.querySelector('.popup__features'));

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  renderPhotos(card.offer.photos, cardElement.querySelector('.popup__photos'));

  cardElement.querySelector('.popup__avatar').style.src = card.author.avatar;

  return cardElement;
};

var renderFeatures = function (features, container) {
  container.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var createLi = document.createElement('li');
    createLi.classList.add('popup__feature');
    createLi.classList.add('popup__feature--' + features[i]);
    container.appendChild(createLi);
  }
};

var renderPhotos = function (photos, container, node) {
  container.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var img = node.cloneNode();
    img.src = photos[i];
    container.appendChild(img);
  }
};

var newCard = fragment.appendChild(createCard(offers[0]));

map.insertBefore(newCard, mapFiltersContainer);
*/

// Состояние страницы

var activePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(fragment);
  activeFieldset();
};

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activePage();
  }
  pinCoordinates();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activePage();
  }
});

var inactiveFieldset = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute('disabled', 'true');
  }
};
inactiveFieldset();

var activeFieldset = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
};

var pinCoordinates = function () {
  var pinCoordinatesLeft = Math.round(parseInt(pinMain.style.left, 10) + PIN_WIDTH / 2);
  var pinCoordinatesTop = Math.round(parseInt(pinMain.style.top, 10) + PIN_HEIGHT / 2);
  addressInput.setAttribute('value', pinCoordinatesLeft + ', ' + pinCoordinatesTop);
};

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

var roomAndGuestValidation = function () {
  var roomsValue = parseInt(roomsCount.value, 10);
  var guestsValue = parseInt(guestsCount.value, 10);
  if (roomsValue === 1 && guestsValue !== 1) {
    guestsCount.setCustomValidation('1 комната — «для 1 гостя»');
  } else if (roomsValue === 2 && (guestsValue === 0 || guestsValue === 3)) {
    guestsCount.setCustomValidation('2 комнаты — «для 1 гостя», «для 2 гостей»');
  } else if (roomsValue === 3 && guestsValue === 0) {
    guestsCount.setCustomValidation('3 комнаты — «для 3 гостей», «для 2 гостей», «для 1 гостя»');
  } else if (roomsValue === 100 && guestsValue !== 0) {
    guestsCount.setCustomValidation('100 комнат — «не для гостей»');
  } else {
    guestsCount.setCustomValidation('');
  }
};
// roomAndGuestValidation();

var guestInputHandler = function () {
  roomAndGuestValidation();
};
guestsCount.addEventListener('input', guestInputHandler);
// roomsCount.addEventListener('input', roomAndGuestInputHandler);
