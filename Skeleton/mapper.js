
var weekURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(weekURL, function(data) {
  useDataMakeBubbles(data);
});

function useDataMakeBubbles(eData) {

  // Once we get a response, send the data.features object to the createFeatures function
  bubbles = L.bubbleLayer(eData, {
  		property: "mag",
  		legend: true,
      scale: "YlGnBu",
  		max_radius: 20,
  		tooltip: false
	});
  createMap(bubbles);
}

function createMap(bubbles) {
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
    layers: [streetmap, bubbles]
  });

  var overlayMaps = {
    Earthquakes: bubbles
  };

  L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(myMap);

  bubbles.addTo(myMap);

}