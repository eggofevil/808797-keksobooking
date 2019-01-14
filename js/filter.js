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

  var namesToProperties = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };

  var checkValue = function (value) {
    if (!value || value === 'any') {
      return null;
    }
    return value;
  };

  var updateFilterData = function () {
    window.filterData = {};
    var features = setHousingFeatures();
    if (features && features.length) {
      window.filterData.features = features;
    }
    for (var name in namesToProperties) {
      if (namesToProperties.hasOwnProperty(name)) {
        if (checkValue(filterElements[name].value)) {
          if (name.value !== 'type') {
            window.filterData[namesToProperties[name]] = parseInt(filterElements[name].value, 10);
          } else {
            window.filterData[namesToProperties[name]] = filterElements[name].value;
          }
        }
      }
    }
    window.pins.renderPins();
  };

  filter.addEventListener('change', function () {
    if (lastTimout) {
      window.clearTimeout(lastTimout);
    }
    lastTimout = setTimeout(updateFilterData, 500);
  });

  window.filterData = {};
})();
