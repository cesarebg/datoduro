// Access tokens
mapboxgl.accessToken = 'pk.eyJ1IjoibWFxcGFsIiwiYSI6ImNpaXNoZ3U3dTAwOXN2dmtzNHN1aDA0NXAifQ.uCvg8IStM_uQhJfAJlBUcw';
var googleMapApi = "&key=AIzaSyDb2UWOvDm1A8FiV9v-53NjGehdB38FAEk"
var geoCodeCountryLookup = "https://maps.googleapis.com/maps/api/geocode/json?address="

// --- Map base layer ---
var map = new mapboxgl.Map({
    container: 'map', // container element id
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-53, 48], // initial map center in [lon, lat]
    zoom: 1.5
});
map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

// All the years for reference for the slider
var years = [
    "All",
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015
];

// ---------- BIG FUNCTION: Implements changes once slider or country options have been switched --------
function filterBy(year, country) {
    year = years[year];

    // If there is not a country specified, but a year has been specified, it will filter just the year
    if (country === "All" && year !== "All") {
        map.setFilter('terror-circles', ["==", "iyear", year]);
    } else if (year !== "All") {
      //if the country has been specified too, filter all the points in the map to see only appropriate ones
        map.setFilter('terror-circles', ["all", ["==", "iyear", year],
            ["==", "country_txt", country],
            ["!has", "point_count"]
        ])
        //this function is called when the results of googleAPI is answered, it refocuses the camera onto a specific country
        function countryBounds() {
          var data = JSON.parse(this.response);
          // console.log(data);
          if (country === "United States"){
            var NeL = 45.367584;
            var NeLn = -68.972168;
            var SwL = 32.715736;
            var SwLn = -117.161087;
          } else if (country === "United Kingdom"){
            var NeL = 60.346958;
            var NeLn = -1.235660;
            var SwL = 50.066318;
            var SwLn = -5.700912;
          } else {
            var NeL = data.results[0].geometry.bounds.northeast.lat;
            var NeLn = data.results[0].geometry.bounds.northeast.lng;
            var SwL = data.results[0].geometry.bounds.southwest.lat;
            var SwLn = data.results[0].geometry.bounds.southwest.lng;
          }

          // console.log(NeL, NeLn, SwL, SwLn);
          var bund = [
              [SwLn, SwL],
              [NeLn, NeL]
          ];
          map.fitBounds(bund, {
              padding: 80
          });
      };

      //this code gets the API call ready based on the country selected in the box
      var completeURL = geoCodeCountryLookup + country + googleMapApi;
      // console.log(completeURL);
      var xhttp = new XMLHttpRequest();
      xhttp.addEventListener('load', countryBounds);
      xhttp.open('GET', completeURL);
      xhttp.send();
    } else if (country !== "All" && year === "All") {
      //Similar thing here again, just with year not filtered
        map.setFilter('terror-circles', ["==", "country_txt", country]);

        function countryBounds() {
            var data = JSON.parse(this.response);
            // console.log(data);
            if (country === "United States"){
              var NeL = 45.367584;
              var NeLn = -68.972168;
              var SwL = 32.715736;
              var SwLn = -117.161087;
            } else if (country === "United Kingdom"){
              var NeL = 60.346958;
              var NeLn = -1.235660;
              var SwL = 50.066318;
              var SwLn = -5.700912;
            } else {
              var NeL = data.results[0].geometry.bounds.northeast.lat;
              var NeLn = data.results[0].geometry.bounds.northeast.lng;
              var SwL = data.results[0].geometry.bounds.southwest.lat;
              var SwLn = data.results[0].geometry.bounds.southwest.lng;
            }

            // console.log(NeL, NeLn, SwL, SwLn);
            var bund = [
                [SwLn, SwL],
                [NeLn, NeL]
            ];
            map.fitBounds(bund, {
                padding: 80
            });
        };
        var completeURL = geoCodeCountryLookup + country + googleMapApi;
        // console.log(completeURL);
        var xhttp = new XMLHttpRequest();
        xhttp.addEventListener('load', countryBounds);
        xhttp.open('GET', completeURL);
        xhttp.send();
    } else {
      //if there has not been a filter by year OR filter by country, take away all applied filters
         console.log("No filter");
         map.setFilter('terror-circles', null );
    };


    var topSection = document.getElementById('totalBar');
    //remove anything in the top bar
    while (topSection.firstChild) {
        topSection.removeChild(topSection.firstChild);
    }

    var incidents = 0;
    var deaths = 0;
    //this goes through the geojson, and adds up all the deaths from every attack
    for (var prop in geoNotJson) {
        if (document.getElementById('slider').value === "0") {
            if (document.getElementById('searchBox').value === "All") {
                incidents = incidents + 1;
                deaths = deaths + geoNotJson[prop].properties.nkill;
            } else {
                if (geoNotJson[prop].properties.country_txt === document.getElementById('searchBox').value) {
                    incidents = incidents + 1;
                    deaths = deaths + geoNotJson[prop].properties.nkill;
                }
            }
        } else if (geoNotJson[prop].properties.iyear === year) {
            if (document.getElementById('searchBox').value === "All") {
                incidents = incidents + 1;
                deaths = deaths + geoNotJson[prop].properties.nkill;
            } else {
                if (geoNotJson[prop].properties.country_txt === document.getElementById('searchBox').value) {
                    incidents = incidents + 1;
                    deaths = deaths + geoNotJson[prop].properties.nkill;
                }
            }
        };
    };
    //this appends the results from above to the topBar
    var deathsTxt = document.createTextNode("Deaths: " + deaths + "    Incidents: " + incidents)
    var p = document.createElement('h4');
    p.setAttribute("style", "font-weight: bold;");
    p.appendChild(deathsTxt);
    topSection.appendChild(p);

    document.getElementById('year').textContent = year;


};



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
            'circle-radius': {
                property: 'nkill',
                stops: [
                    [0, 1],
                    [1, 3],
                    [5, 5],
                    [10, 10]
                ]
            },
            'circle-color': {
                property: 'INT_LOG',
                type: 'categorical',
                stops: [
                        [-9, '#ffffff'],
                        [0, '#00ff00'],
                        [1, '#ff0000']
                        ]

            },
            'circle-opacity': 0.5
        },
    });

    filterBy(0, "All");

    document.getElementById('slider').addEventListener('input', function(e) {
        window.setTimeout(function(){
        var country = document.getElementById('searchBox').value;
        var year = document.getElementById('slider').value;
        console.log(year)
        filterBy(year, country)}, 200);
    });

    document.getElementById('searchBox').addEventListener('input', function(e) {
        window.setTimeout(function(){
        var country = e.target.value;
        var year = document.getElementById('slider').value;
        filterBy(year, country)}, 200);
    });
});


map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['terror-circles']

    });
    console.log(features);
    // console.log(features)
    if (!features.length) {
        return;
    };
    var resultsForClicked = document.getElementById('resultsWhenClicked');
    while (resultsForClicked.firstChild) {
        resultsForClicked.removeChild(resultsForClicked.firstChild);
    }
    console.log(features.length);
    for(var b=0;b<features.length;b++){

      console.log(features[b])
      var txt = document.createTextNode(features[b].properties.gname + ' ' + features[b].properties.city + ' ' + features[b].properties.attacktype1_txt + ' ' + " KILLED: " + features[b].properties.nkill + ' ' + " INJURED: " + features[b].properties.nwound);
      console.log(txt);
      var newResult = document.createElement('div');
      newResult.setAttribute("class", "newResult");
      var para = document.createElement('p');
      para.appendChild(txt);
      //newResult.appendChild(para);
      //newResult.innerHTML = txt;
      resultsForClicked.appendChild(para);

    }

});

// Populate the popup and set its coordinates
// based on the feature found.

map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['terror-circles']
    });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});


/////////////////////////////////////////////////////////////////////////

//            PLAY BUTTON

////////////////////////////////////////////////////////////////////////

document.getElementById('playButton').addEventListener('click', function(e) {
    // console.log("hi");
    deaths = 0;
    incidents = 0;

    var y = 1994;
    var m = 1;
    var d = 1;


    function dates(m, y) {
        if (/*m === 12 &&*/ y === 2015) {
            // console.log("Finish");
            setTimeout(function() {
                var year = document.getElementById('slider').value
                var country = document.getElementById('searchBox').value;
                filterBy(year, country);

            }, 10000);

        } /*else if (m < 12) { Can implement this if we wanted to see results by month, took too long though we felt
            m += 1;
            d = 1;
            printDates(m, y);
        } */else if (y < 2015) {
            y += 1;
            m = 1;
            d = 1
            printDates(m, y);
        }
    }

    var filters = ["any"];

    function printDates(m, y) {

        setTimeout(function() {
            var divD = document.getElementById('dateOf');
            while (divD.firstChild) {
                divD.removeChild(divD.firstChild);
            };

            var domestic = 0;
            var international = 0;
            var unknown = 0;
            for(thing in geoNotJson){
              if (geoNotJson[thing].properties.iyear === y){
                if(geoNotJson[thing].properties.INT_ANY === 0){
                  domestic =domestic + 1;
                } else if (geoNotJson[thing].properties.INT_ANY === 1){
                  international = international + 1;
                } else if(geoNotJson[thing].properties.INT_ANY === -9){
                  unknown = unknown + 1
                }
              }
            }
            var internationalPercentage = Math.floor(international / (domestic + international + unknown) *100)
            var domesticPercentage = Math.floor(domestic / (domestic + international + unknown) *100)
            var dateOfTransition = document.createTextNode(y + " Domestic: " + domesticPercentage + "%" + " International: " + internationalPercentage + "%");
            var para = document.createElement('p');
            para.appendChild(dateOfTransition);
            divD.appendChild(para);

            // FILTER MAP WITH DATES
            var filterNow = ["all"];
            //var dayFilter = ["==", "iday", d];
            var monthFilter = ["==", "imonth", m];
            var yearFilter = ["==", "iyear", y];
            var country = document.getElementById('searchBox').value;
            if (country !== "All") {
                filterNow.push(["==", "country_txt", country])
            }

                //filters.push(dayFilter);
                //filterNow.push(monthFilter);

                  filterNow.push(yearFilter);
                  filters.push(filterNow);



                map.setFilter('terror-circles', filters);

                for (var prop in geoNotJson) {

                    if ((geoNotJson[prop].properties.country_txt === country || country === "All") && geoNotJson[prop].properties.iyear === y) {
                        deaths = deaths + geoNotJson[prop].properties.nkill;
                        incidents = incidents + 1;


                        var topSection = document.getElementById('totalBar');
                        while (topSection.firstChild) {
                            topSection.removeChild(topSection.firstChild)
                        };

                        var deathsTxt = document.createTextNode("Deaths: " + deaths + "    Incidents: " + incidents);
                        var pNew = document.createElement('h4');
                        pNew.appendChild(deathsTxt);


                        topSection.appendChild(pNew);

                    };
                
            };

            dates(m, y);
        }, 1000);
    }
    printDates(m, y);
});
