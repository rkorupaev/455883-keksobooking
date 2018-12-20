'use strict';

(function() {
  window.backend.load(function(initInfo) {
    var filterForm = document.querySelector('.map__filters');
    var typeFilter = document.getElementById('housing-type');
    var typeFilterOptionList = typeFilter.querySelectorAll('option');
    var similarAnnouncement = [];

    similarAnnouncement = initInfo;
    var filteredAnnouncements = [];
    console.log(similarAnnouncement);

    // typeFilter.addEventListener('change', function() {
    //   if (typeFilterOptionList[typeFilter.selectedIndex].value === 'any') {
    //     similarAnnouncement = window.info.initInfo;
    //   } else {
    //     similarAnnouncement = window.info.initInfo.filter(function(announcement) {
    //       return announcement.offer.type === typeFilterOptionList[typeFilter.selectedIndex].value;
    //     });
    //   }
    //   window.util.removePins();
    //   window.util.createPins(similarAnnouncement);
    //   return similarAnnouncement;
    // });

    var priceFilter = document.getElementById('housing-price');
    var priceFilterOptionList = priceFilter.querySelectorAll('option');

    var roomsFilter = document.getElementById('housing-rooms');
    var roomsFilterOptionList = roomsFilter.querySelectorAll('option');

    // roomsFilter.addEventListener('change', function() {
    //   if (roomsFilterOptionList[roomsFilter.selectedIndex].value === 'any') {
    //     similarAnnouncement = window.info.initInfo;
    //   } else {
    //     similarAnnouncement = window.info.initInfo.filter(function(announcement) {
    //       return announcement.offer.rooms === parseInt(roomsFilterOptionList[roomsFilter.selectedIndex].value, 10);
    //     });
    //   }
    //   window.util.removePins();
    //   window.util.createPins(similarAnnouncement);
    //   return similarAnnouncement;
    // });

    var guestsFilter = document.getElementById('housing-guests');
    var guestsFilterOptionList = guestsFilter.querySelectorAll('option');

    // guestsFilter.addEventListener('change', function() {
    //   if (guestsFilterOptionList[guestsFilter.selectedIndex].value === 'any') {
    //     similarAnnouncement = window.info.initInfo;
    //   } else {
    //     similarAnnouncement = window.info.initInfo.filter(function(announcement) {
    //       return announcement.offer.guests === parseInt(guestsFilterOptionList[guestsFilter.selectedIndex].value, 10);
    //     });
    //   }
    //   window.util.removePins();
    //   window.util.createPins(similarAnnouncement);
    //   return similarAnnouncement;
    // });


    var currentFilters = [{
        id: 'housing-type',
        value: 'any',
        offer: type
      }, {
        id: 'housing-price',
        value: 'any',
        offer: 'price'
      },
      {
        id: 'housing-rooms',
        value: 'any',
        offer: 'rooms'
      },
      {
        id: 'housing-guests',
        value: 'any',
        offer: 'guests'
      }
    ];

    filterForm.addEventListener('change', function(evt) {
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
 debugger;
      for (var i = 0; i < currentFilters.length; i++) {
        if (currentFilters[i].value === 'any') {
          return;
        } else {
          filteredAnnouncement = similarAnnouncement.filter(function(announcement) {
            return announcement.offer.currentFilters[i].offer = currentFilters[i].value;
          });
        }
      };
      console.log(filteredAnnouncement);
    });




  });
})();
