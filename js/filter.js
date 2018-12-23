'use strict';

(function () {
  var MIN_RANGE_PRICE = 10000;
  var MAX_RANGE_PRICE = 50000;
  var DELAY = 500;

  var filterForm = document.querySelector('.map__filters');
  var typeFilter = document.getElementById('housing-type');
  var typeFilterOptionList = typeFilter.querySelectorAll('option');

  var priceFilter = document.getElementById('housing-price');
  var priceFilterOptionList = priceFilter.querySelectorAll('option');

  var roomsFilter = document.getElementById('housing-rooms');
  var roomsFilterOptionList = roomsFilter.querySelectorAll('option');

  var guestsFilter = document.getElementById('housing-guests');
  var guestsFilterOptionList = guestsFilter.querySelectorAll('option');

  var featuresFilter = document.getElementById('housing-features');

  var currentFilters = [{
    value: 'any',
    offer: 'type'
  }, {
    value: 'any',
    offer: 'price'
  },
  {
    value: 'any',
    offer: 'rooms'
  },
  {
    value: 'any',
    offer: 'guests'
  },
  {
    offer: 'features',
    features: []
  }
  ];

  var lastTimeout;

  filterForm.addEventListener('change', function (evt) {
    var filteredAnnouncements = window.initpage.initInfo;

    switch (evt.target) {
      case typeFilter:
        currentFilters[0].value = typeFilterOptionList[typeFilter.selectedIndex].value;
        break;
      case priceFilter:
        currentFilters[1].value = priceFilterOptionList[priceFilter.selectedIndex].value;
        break;
      case roomsFilter:
        currentFilters[2].value = roomsFilterOptionList[roomsFilter.selectedIndex].value;
        break;
      case guestsFilter:
        currentFilters[3].value = guestsFilterOptionList[guestsFilter.selectedIndex].value;
        break;
    }

    currentFilters[4].features = featuresFilter.querySelectorAll('input:checked');

    for (var i = 0; i < currentFilters.length; i++) {
      if (currentFilters[i].offer === 'type') {
        if (currentFilters[i].value !== 'any') {
          filteredAnnouncements = filteredAnnouncements.filter(function (announcement) {
            return announcement.offer[currentFilters[i].offer] === currentFilters[i].value;
          });
        }
      } else if (currentFilters[i].offer === 'price') {
        if (currentFilters[i].value !== 'any') {
          filteredAnnouncements = filteredAnnouncements.filter(function (announcement) {
            var price = announcement.offer[currentFilters[i].offer];
            switch (currentFilters[i].value) {
              case 'middle':
                return price > MIN_RANGE_PRICE && price < MAX_RANGE_PRICE;
              case 'low':
                return price < MIN_RANGE_PRICE;
              case 'high':
                return price > MAX_RANGE_PRICE;
              default:
                return false;
            }
          });
        }
      } else if (currentFilters[i].offer === 'guests' || currentFilters[i].offer === 'rooms') {
        if (currentFilters[i].value !== 'any') {
          filteredAnnouncements = filteredAnnouncements.filter(function (announcement) {
            return announcement.offer[currentFilters[i].offer] === parseInt(currentFilters[i].value, 10);
          });
        }
      } else if (currentFilters[4].features.length !== 0) {
        var temp = [];
        for (var j = 0; j < filteredAnnouncements.length; j++) {
          var isAnnouncementAcceptable = true;
          currentFilters[4].features.forEach(function (feature) {
            if (filteredAnnouncements[j].offer.features.indexOf(feature.defaultValue) === -1) {
              isAnnouncementAcceptable = false;
              return;
            }
          });
          if (isAnnouncementAcceptable) {
            temp.push(filteredAnnouncements[j]);
          }
        }
        filteredAnnouncements = temp;
      }
    }

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.util.clearMap();
      window.util.createPins(filteredAnnouncements);
    }, DELAY);
  });
})();
