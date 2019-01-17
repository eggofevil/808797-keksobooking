'use strict';

/* Модуль filter.js */
(function () {
  var filter = window.generalElements.filter;
  var filterElements = filter.elements;
  var housingFeatures = filterElements['features'];
  var lastTimout;

  var setHousingFeatures = function () {
    var selectedFeatures = Array.prototype.reduce.call(housingFeatures, function (features, feature) {
      return feature.checked ? features.concat(feature.value) : features;
    }, []);
    return selectedFeatures.length > 0 ? selectedFeatures : null;
  };

  var nameToProperty = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };

  var checkValue = function (value) {
    if (!value || value === 'any') {
      return null;
    }
    return parseInt(value, 10) ? parseInt(value, 10) : value;
  };

  var updateFilterData = function () {
    window.filterData = {};
    var features = setHousingFeatures();
    if (features && features.length) {
      window.filterData.features = features;
    }
    for (var name in nameToProperty) {
      if (nameToProperty.hasOwnProperty(name)) {
        var result = checkValue(filterElements[name].value);
        if (result) {
          window.filterData[nameToProperty[name]] = result;
        }
      }
    }
    window.pins.renderPins();
    window.cards.removeCard();
  };

  filter.addEventListener('change', function () {
    if (lastTimout) {
      window.clearTimeout(lastTimout);
    }
    lastTimout = setTimeout(updateFilterData, 500);
  });

  window.filterData = {};
})();
