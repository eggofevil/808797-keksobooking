'use strict';

/* Модуль filter.js */
(function () {
  var filter = document.querySelector('.map__filters');
  var filterElements = filter.elements;
  var housingFeatures = filterElements['features'];

  var setHousingFeatures = function () {
    var features = [];
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked === true) {
        features.push(housingFeatures[i].value);
      }
    }
    return features.sort();
  };

  var cleanFilterData = function () {
    for (var key in window.filterData) {
      if (window.filterData.hasOwnProperty(key)) {
        if (window.filterData[key] === 'any' || window.filterData[key].length === 0 || !window.filterData[key]) {
          delete window.filterData[key];
        }
      }
    }
  };

  var updateFilterData = function () {
    window.filterData.features = setHousingFeatures();
    window.filterData.type = filterElements['housing-type'].value;
    window.filterData.price = filterElements['housing-price'].value;
    window.filterData.rooms = parseInt(filterElements['housing-rooms'].value, 10);
    window.filterData.guests = parseInt(filterElements['housing-guests'].value, 10);
    cleanFilterData();
    window.pins.renderPins();
  };

  filter.addEventListener('change', updateFilterData);

  window.filterData = {};
})();
