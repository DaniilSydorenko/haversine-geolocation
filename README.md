# Haversine Geolocation

[![npm version](https://img.shields.io/npm/v/haversine-geolocation.svg)](https://www.npmjs.com/package/haversine-geolocation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)
[![GRS Governance](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml)
[![Secret Scan](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml)

A small JavaScript/TypeScript library for calculating distances between geographic points with the Haversine formula and for finding the closest point to a given location.

Published on npm as [`haversine-geolocation`](https://www.npmjs.com/package/haversine-geolocation).

## Project status

This is an established public OSS package with an existing release history. Repository governance and maintenance surfaces are being modernized incrementally without rewriting the library's historical engineering record.

- Package version in this repository: `1.6.0`
- License: MIT
- Default branch: `master`
- Contributions: see [CONTRIBUTING.md](CONTRIBUTING.md)
- Security reports: see [SECURITY.md](SECURITY.md)

## What it provides

- geolocation availability through the browser Geolocation API;
- distance calculation between two latitude/longitude points;
- support for kilometres, metres, and miles;
- selection of the closest point from a collection while preserving the original point properties.

## Installation

```bash
npm install haversine-geolocation
```

## Basic usage

### Import

```javascript
import HaversineGeolocation from 'haversine-geolocation';
```

### Check geolocation availability

#### Promise

```javascript
HaversineGeolocation.isGeolocationAvailable()
  .then(data => {
    const currentPoint = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
      accuracy: data.coords.accuracy
    };
  });
```

#### Async/await

```javascript
(async () => {
  const data = await HaversineGeolocation.isGeolocationAvailable();

  const currentPoint = {
    latitude: data.coords.latitude,
    longitude: data.coords.longitude,
    accuracy: data.coords.accuracy
  };
})();
```

### Calculate the distance between two points

```javascript
const points = [
  {
    latitude: 61.5322204,
    longitude: 28.7515963
  },
  {
    latitude: 51.9971208,
    longitude: 22.1455439
  }
];

// Miles
HaversineGeolocation.getDistanceBetween(points[0], points[1], 'mi'); // 704.1 mi

// Metres
HaversineGeolocation.getDistanceBetween(points[0], points[1], 'm'); // 1133062.7 m

// Kilometres (default)
HaversineGeolocation.getDistanceBetween(points[0], points[1]); // 1133.1 km
```

### Find the closest point

`getClosestPosition` returns the closest input object and preserves its existing properties while adding a nested `haversine` object.

```javascript
const locationPoints = [
  {
    id: 1,
    title: 'Point 1',
    latitude: 61.5322204,
    longitude: 28.7515963
  },
  {
    id: 2,
    title: 'Point 2',
    latitude: 51.9971208,
    longitude: 22.1455439
  },
  {
    id: 3,
    title: 'Point 3',
    latitude: 45.3571207,
    longitude: 30.3435456
  }
];

HaversineGeolocation.isGeolocationAvailable()
  .then(data => {
    const currentPoint = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
      accuracy: data.coords.accuracy
    };

    return HaversineGeolocation.getClosestPosition(
      currentPoint,
      locationPoints,
      'mi'
    );
  });
```

Example response:

```json
{
  "id": 3,
  "title": "Point 3",
  "latitude": 45.3571207,
  "longitude": 30.3435456,
  "haversine": {
    "distance": 49,
    "measurement": "mi"
  }
}
```

## Haversine formula

The Haversine formula calculates the great-circle distance between two points on a sphere from their latitude and longitude.

<img width="439" alt="Haversine formula illustration" src="https://user-images.githubusercontent.com/2789198/27240436-e9a459da-52d4-11e7-8f84-f96d0b312859.png">

```text
dlon = lon2 - lon1
dlat = lat2 - lat1

a = sin²(dlat / 2)
  + cos(lat1) * cos(lat2) * sin²(dlon / 2)

c = 2 * atan2(sqrt(a), sqrt(1 - a))
d = R * c
```

Where `R` is the Earth's radius in the chosen unit.

## Contributing

Bug fixes, tests, documentation improvements, compatibility fixes, and small maintenance improvements are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a non-trivial pull request.

## Security

Please do not report suspected vulnerabilities through public issues. Follow the process in [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE.txt](LICENSE.txt).
