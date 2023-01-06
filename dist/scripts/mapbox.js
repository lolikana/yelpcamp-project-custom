"use strict";
const map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-74.5, 40],
    zoom: 9
});
new mapboxgl.Marker().setLngLat([-74.5, 40]).addTo(map);
//# sourceMappingURL=mapbox.js.map