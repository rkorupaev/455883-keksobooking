'use strict';

(function() {
  var typeFilter = document.getElementById('housing-type');
  var typeFilterOptionList = typeFilter.querySelectorAll('option');
  var similarAnnouncement = [];

  typeFilter.addEventListener('change', function() {
    if (typeFilterOptionList[typeFilter.selectedIndex].value === 'any') {
      similarAnnouncement = window.info.initInfo;
    } else {
      similarAnnouncement = window.info.initInfo.filter(function(announcement) {
        return announcement.offer.type === typeFilterOptionList[typeFilter.selectedIndex].value;
      });
    }
    window.util.removePins();
    window.util.createPins(similarAnnouncement);
    return similarAnnouncement;
  });

  var roomsFilter = document.getElementById('housing-rooms');
  var roomsFilterOptionList = roomsFilter.querySelectorAll('option');

  roomsFilter.addEventListener('change', function() {
    if (roomsFilterOptionList[roomsFilter.selectedIndex].value === 'any') {
      similarAnnouncement = window.info.initInfo;
    } else {
      similarAnnouncement = window.info.initInfo.filter(function(announcement) {
        return announcement.offer.rooms === parseInt(roomsFilterOptionList[roomsFilter.selectedIndex].value, 10);
      });
    }
    window.util.removePins();
    window.util.createPins(similarAnnouncement);
    return similarAnnouncement;
  });

  var guestsFilter = document.getElementById('housing-guests');
  var guestsFilterOptionList = guestsFilter.querySelectorAll('option');

  guestsFilter.addEventListener('change', function() {
    if (guestsFilterOptionList[guestsFilter.selectedIndex].value === 'any') {
      similarAnnouncement = window.info.initInfo;
    } else {
      similarAnnouncement = window.info.initInfo.filter(function(announcement) {
        return announcement.offer.guests === parseInt(guestsFilterOptionList[guestsFilter.selectedIndex].value, 10);
      });
    }
    window.util.removePins();
    window.util.createPins(similarAnnouncement);
    return similarAnnouncement;
  });

})();
