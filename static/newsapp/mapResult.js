mapboxgl.accessToken = 'pk.eyJ1IjoibWFxcGFsIiwiYSI6ImNpaXNoZ3U3dTAwOXN2dmtzNHN1aDA0NXAifQ.uCvg8IStM_uQhJfAJlBUcw';
console.log(topones)
console.log(locations)
var title = document.getElementById('location-title');
var description = document.getElementById('location-description');

var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v9',
  center: [2.3522, 48.8566], // initial map center in [lon, lat]
  zoom: 2
});

function filterTheCountry(county) {
     //Only show the polygon feature that cooresponds to `borocode` in the data
    map.setFilter('terror-circles', ['==', 'country_txt', country]);
};

function playback(index) {
    title.textContent = locations[index].title;
    description.textContent = locations[index].description;

//    highlightBorough(locations[index].id);
    console.log(locations[index].id);

    // Animate the map position based on camera properties
    map.flyTo(locations[index].camera);

    map.once('moveend', function() {
        // Duration the slide is on screen after interaction
        window.setTimeout(function() {
            // Increment index
            index = (index + 1 === 10) ? 0 : index + 1;
            playback(index);
        }, 6000); // After callback, show the location for 3 seconds.
    });
};

// Display the last title/description first
title.textContent = locations[locations.length - 1].title;
description.textContent = locations[locations.length - 1].description;

map.on('load', function() {
      map.addSource('terror', {
        'type': 'geojson',
        'data': geojson,
       });

     map.addLayer({
       'id': 'terror-circles',
       'type': 'circle',
       'source': 'terror',
       'paint': {
                'circle-color': {
                    property: 'ingroup',
                    stops: [
                        [20377, '#008000'],
                        [40091, '#008000'],
                        [40150, '#008000'],
                        [40151, '#0000ff']

                    ]
                },
                'circle-opacity': 0.75,
                'circle-radius': {
                    property: 'ikill',
                    stops: [
                        [0, 5],
                        [1, 20],
                        [2, 40]
                    ]
                }
            }
     });
    // Start the playback animation for each borough
    filterTheCountry(country)
    playback(0);
});
