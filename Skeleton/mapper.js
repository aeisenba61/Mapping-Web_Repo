
var weekURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(weekURL, function(data) {
  useDataMakeBubbles(data);

  function colorize(earthquakes) {
          return earthquakes >  5  ? '#800026' :
                 earthquakes >  4  ? '#BD0026' :
                 earthquakes >  3  ? '#E31A1C' :
                 earthquakes >  2  ? '#FC4E2A' :
                 earthquakes >  1  ? '#FD8D3C' :
                 earthquakes >= 0  ? '#FEB24C' :
                 '#FFEDA0';
      }


  function style(earthquakes) {
          fillColor: colorize(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      } 

  L.geoJson(data, {
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng)
    }

      

      function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      
      }

      

      function radius(earthquakes) {
          L.circle(
            radius = 
      }


      function createMap(earthquakes) {
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

        var myMap = L.map("map", {
            center: [34.99, 0.47],
            zoom: 3,
          layers: [streetmap, earthquakes]
        });

        var overlayMaps = {
          Earthquakes: earthquakes
        };

        L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
        })

      }

  }).addTo(map);
    // Once we get a response, send the data.features object to the createFeatures function


});