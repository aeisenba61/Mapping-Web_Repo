
var earthquakes = new L.layerGroup();
var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
  "T6YbdDixkOBWH_k9GbS8JQ");

var myMap = L.map("map", {
      center: [34.99, 0.47],
      zoom: 3,
    layers: [satellitemap]
  });

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  
  function colorize(magnitude) {
    
    switch(true) {
      case magnitude > 5:
      return '#800026'
      case magnitude > 4:
      return '#BD0026'
      case magnitude >  3:
      return '#E31A1C'
      case magnitude >  2:
      return '#FC4E2A'
      case magnitude >  1:
      return '#FD8D3C'
      }
    }

  function getRadius(magnitude) {
    magnitude*15;
  }

  function styleInfo(feature) {
    return {
          fillColor: colorize(feature.properties.mag),
          weight: 1,
          opacity: 1,
          // dashArray: '3',
          fillOpacity: 0.7,
          radius: getRadius(feature.properties.mag)
        }
      } 
      
  L.geoJson(data, {
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng);
    },

    style: styleInfo,  

    onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"+
        "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
      
      }
    }).addTo(earthquakes)
    earthquakes.addTo(myMap);
  })

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
    Earthquakes: earthquakes
  };

  L.control.layers(baseMaps, overlayMaps, 
    {
      collapsed: false
  }).addTo(myMap);


    // Once we get a response, send the data.features object to the createFeatures function
