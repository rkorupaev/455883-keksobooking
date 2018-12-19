'use strict';

(function() {
  var typeFilter = document.getElementById('housing-type');
  var typeFilterOptionList = typeFilter.querySelectorAll('option');
  var similarAnnouncement = [];
  window.backend.load(function(announcementsInfoLoaded) {
    window.initInfo = announcementsInfoLoaded;
    return window.initInfo;
  });

  typeFilter.addEventListener('change', function() {
    if (typeFilterOptionList[typeFilter.selectedIndex].value === 'any') {
      similarAnnouncement = window.initInfo;
    } else {
      similarAnnouncement = window.initInfo.filter(function(announcement) {
        return announcement.offer.type === typeFilterOptionList[typeFilter.selectedIndex].value;
      });
    }
    window.util.removePins();
    window.util.createPins(similarAnnouncement);
  });
})();
