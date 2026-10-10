import { distance } from 'haversine-geolocation';

export default function Page() {
  const kilometres = distance(
    { latitude: 52.2296756, longitude: 21.0122287 },
    { latitude: 59.9138688, longitude: 10.7522454 },
  );

  return <main>Warsaw → Oslo: {kilometres.toFixed(2)} km</main>;
}
