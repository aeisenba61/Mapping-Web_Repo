      var myMap = L.map("map", {
            center: [34.99, 0.47],
            zoom: 3,
          // layers: [streetmap, earthquakes]
        });
      
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  function colorize(magnitude) {
    switch(true) {
      case magnitude > 5:
      return '#800026'
    }
          return magnitude >  5  ? '#800026' :
                 magnitude >  4  ? '#BD0026' :
                 magnitude >  3  ? '#E31A1C' :
                 magnitude >  2  ? '#FC4E2A' :
                 magnitude >  1  ? '#FD8D3C' :
                 magnitude >= 0  ? '#FEB24C' :
                                   '#FFEDA0';
      }


  function styleInfo(feature) {
          fillColor: colorize(feature.properties.magnitude)
          // weight: 2,
          // opacity: 1,
          // color: 'white',
          // dashArray: '3',
          // fillOpacity: 0.7
      } 
  
  function getRadius(magnitude) {

  }
      
  L.geoJson(data, {
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng);
    },

    style: styleInfo,  

    onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      
      }}).addTo(myMap);


    function createMap(data) {
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



      // var overlayMaps = {
      //   Earthquakes: earthquakes
      // };

      L.control.layers(baseMaps,
        // , overlayMaps, 
        {
      collapsed: false
      }).addTo(myMap);

    }

  })
    // Once we get a response, send the data.features object to the createFeatures function
