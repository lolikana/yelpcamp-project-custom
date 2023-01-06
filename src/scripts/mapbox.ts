const map = new mapboxgl.Map({
  container: 'mapbox', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

new mapboxgl.Marker().setLngLat([-74.5, 40]).addTo(map);
