'use strict';

/* Модуль util.js */
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (elements) {
    elements = elements.slice();
    var i = elements.length;
    while (--i) {
      var randomIndex = getRandomInteger(0, i);
      var temp = elements[i];
      elements[i] = elements[randomIndex];
      elements[randomIndex] = temp;
    }
    return elements;
  };

  var getRoundedElementWidth = function (container) {
    return parseInt(window.getComputedStyle(container).width, 10);
  };

  var getAllInputs = function (form) {
    return form.querySelectorAll('input, select, textarea, button');
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    getRoundedElementWidth: getRoundedElementWidth,
    getAllInputs: getAllInputs
  };
})();
