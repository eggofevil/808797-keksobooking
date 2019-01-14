'use strict';

/* Модуль util.js */
(function () {
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
    getRoundedElementWidth: getRoundedElementWidth,
    getParentElementWidth: getParentElementWidth,
    declineWord: declineWord
  };
})();
