import { distance } from 'haversine-geolocation';
import { isGeolocationSupported } from 'haversine-geolocation/browser';

const kilometres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
);

document.querySelector('#app').textContent =
  `Warsaw → Oslo: ${kilometres.toFixed(2)} km; geolocation supported: ${isGeolocationSupported()}`;
