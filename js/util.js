'use strict';

/* Модуль util.js */
(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (elements) {
    if (elements.length <= 1) {
      return elements;
    }
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

  var getParentElementWidth = function (element) {
    return parseInt(window.getComputedStyle(element.parentElement).width, 10);
  };

  var declineWord = function (number, words) {
    var cases = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    getRoundedElementWidth: getRoundedElementWidth,
    getParentElementWidth: getParentElementWidth,
    declineWord: declineWord
  };
})();
