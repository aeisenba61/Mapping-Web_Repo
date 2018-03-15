
var earthquakes = new L.layerGroup();
var faultlines = new L.layerGroup();
var timelineLayer = new L.layerGroup();

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
  "T6YbdDixkOBWH_k9GbS8JQ");

var myMap = L.map("map", {
      center: [34.99, 0.47],
      zoom: 3,
      noWrap: true,
      maxBounds: [[90,-180], [-90, 180]],
      layers: [satellitemap],       
});

var firstLevelURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(firstLevelURL, function(data) {
  var getInterval = function(quake) {
          return {
            start: quake.properties.time,
            end:   quake.properties.time + quake.properties.mag * 3600000
          };
        };
        var timelineControl = L.timelineSliderControl({
          formatOutput: function(date){
            return moment(date).format("YYYY-MM-DD HH:MM:SS");
          }
        });

  function colorize(magnitude) {
    
    switch(true) {

      case magnitude >  7:
      return '#bf3a6f'
      case magnitude >  6:
      return '#c65078'
      case magnitude >  5:
      return '#ce6682'
      case magnitude >  4:
      return '#d57c8b'
      case magnitude >  3:
      return '#dd9295'
      case magnitude >  2:
      return '#e5a89e'
      case magnitude >  1:
      return '#ecbea8'
             '#fceabb';
      }
    }

  function getRadius(magnitude) {
    return magnitude*5;
  }

  function styleInfo(feature) {
    return {
          fillColor: colorize(feature.properties.mag),
          weight: 1,
          opacity: 1,
          fillOpacity: 0.85,
          radius: getRadius(feature.properties.mag)
        }
      } 

  var timeline = L.timeline(data, {

    getInterval: getInterval,

      pointToLayer: function(feature,latlng){
        return L.circleMarker(latlng);
    },

    style: styleInfo,  

    onEachFeature: function(feature, layer) {
    layer.bindPopup("<hr><p><b>WHEN: </b>: " + feature.properties.place +"</p>"+
        "<hr><p><b>WHEN: </b>" + new Date(feature.properties.time) + "</p>"+
        "<hr><p><b>MAGNITUDE: </b>" + feature.properties.mag + "</p>");
      
      }
    }).addTo(earthquakes)
    earthquakes.addTo(myMap);

///time control
        timelineControl.addTo(myMap);
        timelineControl.addTimelines(timeline);
        timeline.addTo(timelineLayer);
        timelineLayer.addTo(myMap);
  })



  // gather boundary data from random dude on internet
  var boundaries = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

  d3.json(boundaries, function (response) {
    function polystyle(feature) {
      return {
        fillColor: 'hotpink',
        weight: 2,
        opacity: .5,
        color: 'hotpink', 
        fillOpacity: 0.5
      };
    }

    L.geoJSON(response, {
      style: polystyle
    }).addTo(faultlines);
    faultlines.addTo(myMap)
  })

  var legend = L.control({position: 'bottomright'});

  function colorize(magnitude) {    
    switch(true) {

      case magnitude >  7:
      return '#bf3a6f'
      case magnitude >  6:
      return '#c65078'
      case magnitude >  5:
      return '#ce6682'
      case magnitude >  4:
      return '#d57c8b'
      case magnitude >  3:
      return '#dd9295'
      case magnitude >  2:
      return '#e5a89e'
      case magnitude >  1:
      return '#ecbea8'
             '#fceabb';
      }
    }

  legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend'),
          grades = [1, 2, 3, 4, 5, 6, 7],
          labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorize(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

  return div;
  };

  legend.addTo(myMap);
  
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");
  var navmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v2/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Map": satellitemap,
    "Navigation Map": navmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": faultlines
  };

  L.control.layers(baseMaps, overlayMaps, 
    {
      collapsed: false
  }).addTo(myMap);


    // Once we get a response, send the data.features object to the createFeatures function
