var bigFunction = function(state){

  mapboxgl.accessToken = 'pk.eyJ1IjoibWFxcGFsIiwiYSI6ImNpaXNoZ3U3dTAwOXN2dmtzNHN1aDA0NXAifQ.uCvg8IStM_uQhJfAJlBUcw';
  var googleMapApi = "&key=AIzaSyDb2UWOvDm1A8FiV9v-53NjGehdB38FAEk"
  var geoCodeCountryLookup = "https://maps.googleapis.com/maps/api/geocode/json?address="

  var before = new mapboxgl.Map({
      container: 'before',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-30.686,38.749],
      attributionControl: true,
      zoom: 1
  });

  before.scrollZoom.disable();
  before.addControl(new mapboxgl.NavigationControl());

  var after = new mapboxgl.Map({
      container: 'after',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-30.686,38.749],
      attributionControl: true,
      zoom: 1
  });
  after.scrollZoom.disable();
  after.addControl(new mapboxgl.NavigationControl());

  var map = new mapboxgl.Compare(before, after, {
      // mousemove: true
  });

    before.on('load', function () {
      before.addSource('terror',{
        type: 'geojson',
        data: total_new
      })
      before.addLayer({
        id: 'countriesPre',
        source: 'terror',
        type: 'fill',
        layout: {
            'visibility': 'visible'
        },
        paint: {
          'fill-color': {
            "property": state,
            "type": "exponential",
            "stops":[
              [1, '#ffffcc'],
              [5, '#ffeda0'],
              [10, '#fed976'],
              [15, '#feb24c'],
              [20, '#fd8d3c'],
              [25, '#fc4e2a'],
              [30, '#e31a1c'],
              [35, '#bd0026'],
              [40, '#800026']
            ]
          },
          'fill-opacity': {
            "property": "total",
            "type": "exponential",
            "stops":[
              [1, 0.3],
              [5, 0.6],
              [10, 0.7],
              [20, 0.8],
              [50, 1]
            ]
          }
        },
    });
    });

    after.on('load', function () {
      after.addSource('terror',{
        type: 'geojson',
        data: total_old
      })
      after.addSource('countriesPre',{
        type: 'geojson',
        data: geojson_total_city
      })

      after.addLayer({
        id: 'countries',
        source: 'terror',
        type: 'fill',
        layout: {
            'visibility': 'visible'
        },
        paint: {
          'fill-color': {
            "property": state,
            "type": "interval",
            "stops":[
              [1, '#ffffcc'],
              [5, '#ffeda0'],
              [10, '#fed976'],
              [15, '#feb24c'],
              [20, '#fd8d3c'],
              [25, '#fc4e2a'],
              [30, '#e31a1c'],
              [35, '#bd0026'],
              [40, '#800026']
            ]
          },
          'fill-opacity': {
            "property": "total",
            "type": "exponential",
            "stops":[
              [1, 0.3],
              [5, 0.6],
              [10, 0.7],
              [20, 0.8],
              [50, 1]
            ]
          }
        },
      });
    });

    before.on('click', function (e) {
        var features = before.queryRenderedFeatures(e.point, { layers: ['countriesPre'] });
        if (!features.length) {
            return;
        }

        var feature = features[0];
        var perDomestic = Math.round((feature.properties["domestic"]/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)
        var percentInternational = Math.round((feature.properties.international/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)
        var percentUnknown = Math.round((feature.properties.unknown/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)

        var popup = new mapboxgl.Popup()
            .setLngLat(before.unproject(e.point))
            .setHTML("In "+ feature.properties.country_txt + ", between 1970 and 1994,  " + feature.properties["domestic"] + "(" + perDomestic +  "%)" + " of attacks were domestic.\n " + feature.properties.international + "(" + percentInternational +  "%)" + " were international \n and " + feature.properties.unknown + "(" + percentUnknown +  "%)" + " are by unknown perpetrators.")
            .addTo(before);
    });

    after.on('click', function (e) {
        var features = after.queryRenderedFeatures(e.point, { layers: ['countries'] });
        console.log(features)
        if (!features.length) {
            return;
        }

        var feature = features[0];
        var perDomestic = Math.round((feature.properties["domestic"]/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)
        var percentInternational = Math.round((feature.properties.international/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)
        var percentUnknown = Math.round((feature.properties.unknown/(feature.properties["domestic"] + feature.properties.international + feature.properties.unknown))*100)

        var popup = new mapboxgl.Popup()
            .setLngLat(after.unproject(e.point))
            .setHTML("In "+ feature.properties.country_txt + ", between 1994 and 2015,  " + feature.properties["domestic"] + " (" + perDomestic +  "%)" + " of attacks were domestic.\n " + feature.properties.international + " (" + percentInternational +  "%)" + " were international \n and " + feature.properties.unknown + " (" + percentUnknown +  "%)" + " are by unknown perpetrators.")
            .addTo(after);
    });

    var toggleableLayerIds = [ 'countriesPre', 'countries' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        var link2 = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

        var visibility1 = before.getLayoutProperty('countriesPre', 'visibility');
        // var visibility2 = after.getLayoutProperty('countries', 'visibility');

            if (visibility1 === 'visible') {
                before.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            }
            else {
                this.className = 'active';
                before.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                // after.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        link2.onclick = function (e) {
            var clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

        // var visibility1 = before.getLayoutProperty('countriesPre', 'visibility');
        var visibility2 = after.getLayoutProperty('countries', 'visibility');

            if (visibility2 === 'visible') {
                after.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            }
            else {
                this.className = 'active';
                after.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        };

    }

    //var layers = document.getElementById('menu');
      //  layers.appendChild(link);
        //layers.appendChild(link2);

};

};

//Change input of state of function to change what color on map should be based on
bigFunction("internationalPercent");
