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

  var namesToProperties = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };

  var checkValue = function (value) {
    return !value || value === 'any' ? null : value;
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
          if (namesToProperties[name] !== 'type' && namesToProperties[name] !== 'price') {
            window.filterData[namesToProperties[name]] = parseInt(filterElements[name].value, 10);
          } else {
            window.filterData[namesToProperties[name]] = filterElements[name].value;
          }
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
