'use strict';

//Объявила переменные
var PRICE = ['any price', '10000 - 50000', 'less 10000', 'more 50000'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['any rooms', '1 room', '2 rooms', '3 rooms'];
var GUESTS = ['any guests', '2 guests', '1 guest', '0 guests'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//Функция, генерирующая число от 01 до 08
var getNumberAddZero = function() {
  return "0" + Math.floor(Math.random() * 8) + 1;
}

//Функция, выбирающая случайный элемент массива
function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

//Функция для создания массива из 8 сгенерированных JS объектов
var AdvertisementDescription = function() {
  return {
    'author': {
      'avatar': 'img/avatars/user' + getNumberAddZero + '.png';
    };
    'offer': {
      'title': 'Милая, уютная квартирка в центре Токио';
      'address': '600, 350';
      'price': arrayRandElement(PRICE);
      'type': arrayRandElement(TYPE);
      'rooms': arrayRandElement(ROOMS);
      'guests': arrayRandElement(GUESTS);
      'checkin': arrayRandElement(TIME);
      'checkout': arrayRandElement(TIME);
      'features': arrayRandElement(FEATURES);
      'description': 'Описание';
      'photos': arrayRandElement(PHOTOS);
    };
    'location': {
      'x': //???случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      'y': //???случайное число, координата y метки на карте от 130 до 630.
    };
  };
};
