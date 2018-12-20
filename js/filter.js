'use strict';

(function() {
    var filterForm = document.querySelector('.map__filters');
    var typeFilter = document.getElementById('housing-type');
    var typeFilterOptionList = typeFilter.querySelectorAll('option');

    var priceFilter = document.getElementById('housing-price');
    var priceFilterOptionList = priceFilter.querySelectorAll('option');

    var roomsFilter = document.getElementById('housing-rooms');
    var roomsFilterOptionList = roomsFilter.querySelectorAll('option');

    var guestsFilter = document.getElementById('housing-guests');
    var guestsFilterOptionList = guestsFilter.querySelectorAll('option');

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
      }
    ];

    filterForm.addEventListener('change', function(evt) {
      // debugger;
      var filteredAnnouncements = window.info.initInfo;
      console.log(filteredAnnouncements);

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

      console.log(currentFilters);

      for (var i = 0; i < currentFilters.length; i++) {
        if (currentFilters[i].offer === 'type') {
          if (currentFilters[i].value !== 'any') {
            filteredAnnouncements = filteredAnnouncements.filter(function(announcement) {
              return announcement.offer[currentFilters[i].offer] === currentFilters[i].value;
            });
          }
        } else if (currentFilters[i].offer === 'price') {
          if (currentFilters[i].value !== 'any') {
            filteredAnnouncements = filteredAnnouncements.filter(function(announcement) {
              var price = announcement.offer[currentFilters[i].offer];

              switch (currentFilters[i].value) {
                case 'middle':
                  return price > 10000 && price < 50000;
                case 'low':
                  return price < 10000;
                case 'hign':
                  return price > 50000;
                default:
                  return false;
              }
            });
          }
        } else if (currentFilters[i].offer === 'guests' || currentFilters[i].offer === 'rooms') {
          if (currentFilters[i].value !== 'any') {
            filteredAnnouncements = filteredAnnouncements.filter(function(announcement) {
              return announcement.offer[currentFilters[i].offer] === parseInt(currentFilters[i].value, 10);
            })
          }
        } else {
          // фичи
          // создаем массив активных фич с фильтра
          // проходимся по массиву и обьявление нам подходит,
          // если все требуемые фичи в фильтре встречаются в массиве features внутри offer
        }
      }
      console.log(filteredAnnouncements);
      window.util.removePins();
      window.util.createPins(filteredAnnouncements);
    });
})();
