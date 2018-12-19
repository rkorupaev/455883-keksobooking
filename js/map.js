'use strict';

(function() {
  var typeFilter = document.getElementById('housing-type');
  var typeFilterOptionList = typeFilter.querySelectorAll('option');
  var similarAnnouncement = [];
  window.backend.load(function(announcementsInfoLoaded) {
    window.tempoArray = announcementsInfoLoaded;
    console.log(tempoArray);
    return tempoArray;
  });

  typeFilter.addEventListener('change', function() {

    console.log(typeFilterOptionList[typeFilter.selectedIndex].value);


    similarAnnouncement = window.tempoArray.filter(function(announcement) {
      return announcement.offer.type === typeFilterOptionList[typeFilter.selectedIndex].value;
      console.log(similarAnnouncement);
    });
  });
})();
