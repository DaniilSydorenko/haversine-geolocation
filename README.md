# Haversine Geolocation

[![npm version](https://img.shields.io/npm/v/haversine-geolocation.svg)](https://www.npmjs.com/package/haversine-geolocation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.txt)
[![CI](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/ci.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/ci.yml)
[![Consumer Fixtures](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/consumer-fixtures.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/consumer-fixtures.yml)
[![GRS Governance](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/grs.yml)
[![Secret Scan](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml/badge.svg)](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/secret-scan.yml)

A dependency-free JavaScript/TypeScript library for **spherical distance** and **nearest-point search** with validated coordinates, typed ESM/CommonJS entry points and an optional browser geolocation adapter.

## Versions and installation

### Haversine V2 — stable `2.0.1` release line

Install a specific stable V2 version:

```bash
npm install haversine-geolocation@2.0.1
```

Check the public npm `latest` tag before choosing an unpinned install:

```bash
npm view haversine-geolocation dist-tags --json
npm install haversine-geolocation
```

The stable [GitHub release `v2.0.1`](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.1) was published on October 25, 2026, and npm staging completed successfully. Independent [public npm verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/40428171115) passed all 12 Node 22/24/26 × alpha/beta/RC/stable jobs, confirming `latest=2.0.1`, `next=2.0.0-rc.1`, tarball hashes, signatures/attestation and installed consumers. Postrelease documentation reconciliation was completed in [#189](https://github.com/DaniilSydorenko/haversine-geolocation/issues/189). The npm badge reflects the actual public `latest` tag, not this repository's `package.json`; the explicit `@2.0.1` command remains deterministic.

### Historical versions

- **V1:** `npm install haversine-geolocation@1.6.0` (legacy stable behavior).
- **V2 prerelease:** `2.0.0-alpha.1`, `2.0.0-beta.1` and `2.0.0-rc.1` remain immutable and installable explicitly.
- **V2 stable release:** `2.0.1` (first stable V2; the maintainer skipped stable `2.0.0`).

This documentation describes the stable V2 package contract. Public npm availability has been separately verified by the linked published-package CI, not inferred from GitHub release or staging alone.

See [Migrating from V1 to V2](docs/migration/v1-to-v2.md) for the upgrade path and the [Changelog](CHANGELOG.md) for release history.

## Quick start — stable V2

V2 uses named exports, validates latitude/longitude coordinates and returns **spherical great-circle distances** (not road routes). No runtime dependencies are needed.

```ts
import { distance, nearest } from 'haversine-geolocation';

const warsaw = { latitude: 52.2297, longitude: 21.0122 };
const oslo = { latitude: 59.9139, longitude: 10.7522 };

const kilometres = distance(warsaw, oslo); // 'km' by default
const metres = distance(warsaw, oslo, { unit: 'm' });

const locations = [
  { id: 'oslo', ...oslo },
  { id: 'warsaw', ...warsaw },
];

const closest = nearest(warsaw, locations);
// closest: { point: locations[1], distance: 0 }
console.log(closest?.point.id); // 'warsaw'
```

Coordinates use `{ latitude, longitude }` with finite numeric values. `distance()` returns an unrounded number; `nearest()` returns `{ point, distance }` or `undefined` when the list is empty. Use `{ unit: 'km' | 'm' | 'mi' }` as the third argument, not a positional unit string.

For full signatures and validation errors see the [V2 API reference](docs/api-reference.md); for legacy users see [V1 → V2 migration](docs/migration/v1-to-v2.md). The calculation uses a spherical Earth model, not ellipsoidal WGS84 precision.

## V2 functional API

The canonical V2 API uses named exports. The stable V2 line incorporates verified prerelease behavior, including exact North/South Pole fixes, and retains the deprecated V1-compatible default facade.

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

## Legacy V1 usage (migration reference)

The following examples describe the historical V1-style default facade retained in the V2 migration line. **New integrations should use the V2 named exports above.**


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
