'use strict';

/* Модуль filter.js */
(function () {
  var filter = document.querySelector('.map__filters');
  var filterElements = filter.elements;
  var housingFeatures = filterElements['features'];
  var lastTimout;

  var setHousingFeatures = function () {
    var selectedFeatures = Array.prototype.reduce.call(housingFeatures, function (acc, feature) {
      if (feature.checked) {
        return acc.concat(feature.value);
      }
      return acc;
    }, []).sort();
    if (selectedFeatures.length) {
      return selectedFeatures;
    }
    return null;
  };

  var updateFilterData = function () {
    var filterData = {
      features: setHousingFeatures(),
      type: filterElements['housing-type'].value,
      price: filterElements['housing-price'].value,
      rooms: filterElements['housing-rooms'].value,
      guests: filterElements['housing-guests'].value
    };

    var setWindowFilterDataObject = function () {
      window.filterData = {};
      for (var key in filterData) {
        if (filterData.hasOwnProperty(key)) {
          if (filterData[key] && filterData[key] !== 'any') {
            window.filterData[key] = filterData[key];
          }
        }
      }
    };

    setWindowFilterDataObject();
  };

  filter.addEventListener('change', function () {
    if (lastTimout) {
      window.clearTimeout(lastTimout);
    }
    lastTimout = setTimeout(updateFilterData, 500);
  });

  window.filterData = {};
})();
