# Haversine V2 API Reference

This document describes the public V2 package surface currently available through the `2.0.0-alpha.1` prerelease.

## Package entry points

```text
haversine-geolocation
haversine-geolocation/browser
haversine-geolocation/legacy
```

The package root exposes the V2 functional API as named exports and keeps the historical singleton as the default export during the 2.x migration line.

## Root API

### Coordinate

```ts
interface Coordinate {
  latitude: number;
  longitude: number;
}
```

Rules:

- latitude must be a finite number in `[-90, 90]`;
- longitude must be a finite number in `[-180, 180]`;
- additional properties are allowed.

### DistanceUnit

```ts
type DistanceUnit = 'm' | 'km' | 'mi';
```

### DistanceOptions

```ts
interface DistanceOptions {
  unit?: DistanceUnit;
  radius?: number;
}
```

Defaults:

- unit: `km`;
- radius: `EARTH_MEAN_RADIUS_M`.

A custom radius is expressed in metres and must be finite and greater than zero.

### EARTH_MEAN_RADIUS_M

```ts
const EARTH_MEAN_RADIUS_M = 6_371_008.8;
```

Default spherical mean Earth radius used by the V2 distance calculation.

### distance()

```ts
function distance(
  from: Coordinate,
  to: Coordinate,
  options?: DistanceOptions,
): number;
```

Example:

```ts
import { distance } from 'haversine-geolocation';

const km = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
);

const metres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
  { unit: 'm' },
);
```

Behavior:

- validates both coordinates;
- applies no presentation rounding;
- supports `m`, `km`, and `mi`;
- supports an explicit spherical radius;
- clamps the Haversine intermediate to `[0, 1]` to avoid floating-point domain drift.

Errors:

- malformed or non-finite coordinates → `TypeError`;
- finite out-of-range coordinates → `RangeError`;
- non-finite radius → `TypeError`;
- zero/negative radius → `RangeError`;
- invalid unit → `TypeError`.

### NearestResult

```ts
interface NearestResult<T> {
  point: T;
  distance: number;
}
```

### nearest()

```ts
function nearest<T extends Coordinate>(
  origin: Coordinate,
  candidates: readonly T[],
  options?: DistanceOptions,
): NearestResult<T> | undefined;
```

Behavior:

- single pass, `O(n)`;
- `O(1)` auxiliary memory;
- does not mutate candidates;
- preserves candidate identity and metadata;
- returns `undefined` for an empty collection;
- preserves the first candidate on an exact tie;
- uses the same distance options as `distance()`.

### isCoordinate()

```ts
function isCoordinate(value: unknown): value is Coordinate;
```

Returns `true` only when the value satisfies the coordinate contract. Invalid values return `false`.

### assertCoordinate()

```ts
function assertCoordinate(
  value: unknown,
): asserts value is Coordinate;
```

Throws:

- `TypeError` for missing, non-numeric, or non-finite values;
- `RangeError` for latitude/longitude outside valid geographic ranges.

### convertDistance()

```ts
function convertDistance(
  value: number,
  from: DistanceUnit,
  to: DistanceUnit,
): number;
```

Uses exact unit relationships:

- `1 km = 1000 m`;
- `1 mi = 1609.344 m`.

No display rounding is applied.

### assertDistanceUnit()

```ts
function assertDistanceUnit(
  value: unknown,
): asserts value is DistanceUnit;
```

Accepts only `m`, `km`, and `mi`; otherwise throws `TypeError`.

## Browser entry point

```ts
import {
  getCurrentPosition,
  isGeolocationSupported,
} from 'haversine-geolocation/browser';
```

### isGeolocationSupported()

```ts
function isGeolocationSupported(): boolean;
```

Checks at call time whether `navigator.geolocation` exists. Returns `false` in Node/SSR environments without `navigator`.

### getCurrentPosition()

```ts
function getCurrentPosition(
  options?: PositionOptions,
): Promise<GeolocationPosition>;
```

Resolves with the native `GeolocationPosition`.

Rejects with:

- the native browser geolocation error when the browser API fails;
- `Error('Geolocation API is not available in this environment')` when the API is unavailable.

The browser module performs no top-level access to browser globals.

## Legacy entry point

```ts
import HaversineGeolocation from 'haversine-geolocation/legacy';
```

The same compatibility facade is currently also the package-root default export.

Legacy methods include:

- `getDistanceBetween()`;
- `getClosestPosition()`;
- `isGeolocationAvailable()`;
- historical runtime-visible `_haversine()`;
- historical runtime-visible `_convertMeasurements()`.

Important legacy semantics intentionally differ from V2:

- radius: `6372.8 km`;
- kilometres rounded to one decimal place;
- miles rounded to one decimal place;
- metres rounded to an integer;
- unknown measurement strings fall back to kilometre-style rounding;
- `getClosestPosition()` augments the point with a nested `haversine` object.

For migration details, see [Migrating from V1 to V2](migration/v1-to-v2.md).

## Mathematical model

V2 calculates spherical great-circle distance with the Haversine formula.

It is not an ellipsoidal WGS84 geodesic algorithm and should not be presented as survey-grade geodesic precision.

See:

- [Architecture Decision Records](architecture/README.md)
- [Haversine V1 Forensic Audit](research/v1-forensic-audit.md)
