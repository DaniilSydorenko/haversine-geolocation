# Haversine Geolocation

[![npm version](https://img.shields.io/npm/v/haversine-geolocation.svg)](https://www.npmjs.com/package/haversine-geolocation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)
[![CI](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/ci.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/ci.yml)
[![Consumer Fixtures](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/consumer-fixtures.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/consumer-fixtures.yml)
[![GRS Governance](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml)
[![Secret Scan](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml)

A small JavaScript/TypeScript geospatial library built around spherical Haversine distance calculations, nearest-point search and browser geolocation integration.

## Release status

There are currently two public release lines:

- **npm stable / `latest`:** `haversine-geolocation@1.6.0` — the historical V1 API;
- **npm prerelease / `next`:** `haversine-geolocation@2.0.0-alpha.1` — the first public V2 alpha.

A normal install still receives stable V1:

```bash
npm install haversine-geolocation
```

To test V2 explicitly:

```bash
npm install haversine-geolocation@2.0.0-alpha.1
```

or:

```bash
npm install haversine-geolocation@next
```

V2 is public, but remains prerelease until stable `2.0.0`.

See [Migrating from V1 to V2](docs/migration/v1-to-v2.md) for the upgrade path and the [Changelog](CHANGELOG.md) for release history.

## Published V1 usage

### Import

```ts
import HaversineGeolocation from 'haversine-geolocation';
```

### Distance

```ts
const a = {
  latitude: 61.5322204,
  longitude: 28.7515963,
  accuracy: 5,
};

const b = {
  latitude: 51.9971208,
  longitude: 22.1455439,
  accuracy: 5,
};

HaversineGeolocation.getDistanceBetween(a, b, 'km'); // 1133.1
HaversineGeolocation.getDistanceBetween(a, b, 'mi'); // 704.1
HaversineGeolocation.getDistanceBetween(a, b, 'm');  // 1133063
```

V1 applies historical presentation rounding automatically.

### Closest position

```ts
const closest = HaversineGeolocation.getClosestPosition(
  a,
  [
    {
      latitude: 61.5322204,
      longitude: 28.7515963,
      accuracy: 5,
    },
    {
      latitude: 51.9971208,
      longitude: 22.1455439,
      accuracy: 5,
    },
  ],
  'km',
);

console.log(closest.haversine.distance);
```

### Browser geolocation

```ts
const position = await HaversineGeolocation.isGeolocationAvailable();

console.log(position.coords.latitude);
console.log(position.coords.longitude);
```

V1 couples browser geolocation to the historical singleton. That package design is one of the areas V2 changes.

---

## V2 alpha — public prerelease

The canonical V2 API is available in the public `2.0.0-alpha.1` prerelease and uses named exports.

### Distance

```ts
import { distance } from 'haversine-geolocation';

const kilometres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
);

const metres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
  { unit: 'm' },
);
```

V2:

- validates coordinates;
- keeps full calculation precision;
- supports `m`, `km` and `mi`;
- uses a documented spherical mean-Earth-radius default;
- supports an explicit custom spherical radius;
- guards the Haversine intermediate against floating-point domain drift.

### Coordinate validation

```ts
import {
  assertCoordinate,
  isCoordinate,
} from 'haversine-geolocation';

isCoordinate({
  latitude: 52.2296756,
  longitude: 21.0122287,
}); // true
```

Canonical V2 coordinates use:

```ts
interface Coordinate {
  latitude: number;
  longitude: number;
}
```

Latitude must be in `[-90, 90]`, longitude in `[-180, 180]`, and both values must be finite numbers.

### Unit conversion

```ts
import { convertDistance } from 'haversine-geolocation';

convertDistance(10, 'km', 'mi');
```

Conversion does not apply display rounding.

### Nearest point

```ts
import { nearest } from 'haversine-geolocation';

const result = nearest(
  { latitude: 52.2296756, longitude: 21.0122287 },
  [
    {
      id: 'oslo',
      latitude: 59.9138688,
      longitude: 10.7522454,
    },
    {
      id: 'nearby',
      latitude: 52.23,
      longitude: 21.012,
    },
  ],
);

if (result) {
  console.log(result.point);
  console.log(result.distance);
}
```

`nearest()` is single-pass, does not mutate candidates, preserves candidate metadata, returns the first candidate on an exact tie, and returns `undefined` for an empty collection.

### Browser geolocation

Browser functionality is isolated from the pure package root:

```ts
import {
  getCurrentPosition,
  isGeolocationSupported,
} from 'haversine-geolocation/browser';

if (isGeolocationSupported()) {
  const position = await getCurrentPosition();
  console.log(position.coords);
}
```

The browser module performs no top-level access to `window`, `document` or `navigator`, so the pure package root remains safe for Node and SSR imports.

### Legacy compatibility

During the V2 2.x migration line, the historical singleton remains available as a deprecated compatibility facade.

```ts
import HaversineGeolocation from 'haversine-geolocation';
```

An explicit legacy subpath is also part of the V2 package contract:

```ts
import HaversineGeolocation from 'haversine-geolocation/legacy';
```

The legacy facade preserves historical V1 behavior where compatibility matters, including the old radius and rounding semantics.

## V2 package architecture

The V2 package is designed around explicit entry points:

```text
haversine-geolocation
├── .          pure core + deprecated legacy default
├── ./browser  browser Geolocation API adapter
└── ./legacy   explicit V1 compatibility facade
```

The package build produces:

- ESM artifacts;
- CommonJS artifacts;
- TypeScript declarations;
- the historical UMD compatibility artifact.

CI validates the actual `npm pack` tarball rather than only importing repository source files.

## Mathematical model

Haversine calculates great-circle distance on a **sphere**.

V2 uses the documented mean Earth radius:

```text
6,371,008.8 m
```

The historical V1 compatibility facade keeps its original:

```text
6,372.8 km
```

Earth is not a perfect sphere. Haversine is therefore not a replacement for an ellipsoidal WGS84 geodesic algorithm when survey-grade or high-precision geodesy is required.

The core calculation is conceptually:

```text
dlat = lat2 - lat1
dlon = lon2 - lon1

a = sin²(dlat / 2)
  + cos(lat1) * cos(lat2) * sin²(dlon / 2)

a = clamp(a, 0, 1)
c = 2 * asin(sqrt(a))
d = R * c
```

## Architecture and migration

The V2 contract is documented in the accepted ADRs under [docs/architecture](docs/architecture/README.md).

The detailed API, migration and release guides are:

- [V2 API Reference](docs/api-reference.md)
- [Migrating from Haversine V1 to V2](docs/migration/v1-to-v2.md)
- [Haversine V2 release runbook](docs/release/v2-release-runbook.md)

Historical behavior and compatibility findings are preserved in:

- [Haversine V1 Forensic Audit](docs/research/v1-forensic-audit.md)

## Development quality gates

The repository currently validates:

- TypeScript source typechecking;
- Vitest unit and characterization tests;
- production builds through Vite library mode;
- Node runtime smoke tests;
- CommonJS and ESM package consumers;
- npm tarball contents;
- secret scanning.

The packed package is also validated through production builds in Vite, Next.js and Nuxt.

## Contributing

Bug fixes, tests, documentation improvements, compatibility fixes and focused maintenance improvements are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a non-trivial pull request.

## Security

Please do not report suspected vulnerabilities through public issues. Follow [SECURITY.md](SECURITY.md).

## License

MIT. See [LICENSE.txt](LICENSE.txt).
