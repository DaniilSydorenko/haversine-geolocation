# V2 Coding Assistant Integration Contract

This consumer reference applies to the published **haversine-geolocation@2.0.1** API. It does **not** authorize autonomous agents or replace the contributor [AGENTS.md](../../AGENTS.md).

## Real package exports

From `haversine-geolocation`: `distance`, `nearest`, `isCoordinate`, `assertCoordinate`, `convertDistance`, `assertDistanceUnit`, `EARTH_MEAN_RADIUS_M`, and types `Coordinate`, `DistanceUnit`, `DistanceOptions`, `NearestResult`. The optional `/browser` and deprecated `/legacy` entry points are separate.

**Coordinates:** finite numbers `{ latitude, longitude }`, with latitude in `[-90,90]` and longitude in `[-180,180]`; extra metadata is permitted. `{lat,lng}` is **not** the accepted V2 coordinate shape.

**Distance:** `distance(from, to, options?)` returns a numeric **spherical great-circle distance** without display rounding. The third argument is an options object, e.g. `{ unit: 'm' }`, never a positional `'m'`. Units are `'m'`, `'km'` (default), `'mi'`; the mean spherical radius `EARTH_MEAN_RADIUS_M` is `6_371_008.8` metres. Custom `radius` is a finite positive number of **metres**.

**Nearest:** `nearest(origin, readonlyCandidates, options?)` returns `{ point, distance }` or `undefined` for an empty array; it is not a raw candidate. Single-pass `O(n)` with `O(1)` auxiliary space, object identity and metadata preserved, first candidate wins exact ties. Empty candidates still validate the origin **and options**.

## Correct TypeScript snippet

```ts
import { distance, nearest, type Coordinate } from 'haversine-geolocation';

type Place = Coordinate & { id: string };
const origin: Coordinate = { latitude: 59.9139, longitude: 10.7522 };
const places: Place[] = [
  { id: 'oslo', ...origin },
  { id: 'bergen', latitude: 60.3913, longitude: 5.3221 },
];

const km: number = distance(origin, places[1]); // km by default
const metres: number = distance(origin, places[1], { unit: 'm' });
const found = nearest(origin, places);
if (found !== undefined) {
  const selectedId: string = found.point.id;
  const selectedDistanceKm: number = found.distance;
  console.log(selectedId, selectedDistanceKm, km, metres);
}
```

This matches the existing [packed TypeScript consumer](../../fixtures/typescript-consumer/index.ts). CI also executes [Node CJS/ESM examples](v2-consumers.md) from the **installed npm tarball**, rather than only testing repository source.

## Reject these generated assumptions

| Wrong assumption | Stable V2 contract |
| --- | --- |
| `{lat, lng}` passed directly | `{latitude, longitude}` numeric properties |
| `distance(a, b, 'mi')` | `distance(a, b, { unit: 'mi' })` |
| `nearest(a, points).id` | Store the result, check `undefined`, read `result.point.id` |
| `getCurrentPosition` from root | Browser geolocation lives in `haversine-geolocation/browser` |
| `withinRadius`, `sortByDistance`, `distancesTo`, `boundingBox` | **Not exported** in stable 2.0.1; do not invent APIs |
| Road-route or WGS84 ellipsoidal solver | **Spherical** great-circle distance only |
| Indexed large-dataset nearest search | Linear scan of supplied candidates only |

## Validation, geography and browser limitations

`isCoordinate(value)` returns a boolean, while `assertCoordinate(value)` throws on invalid input. Malformed/non-finite fields yield `TypeError`, finite out-of-range coordinates yield `RangeError`. Invalid units and custom radius also fail validation.

At the **exact** North or South Pole, equal-latitude pole points have distance zero regardless of longitude. For antimeridian crossings use the spherical calculation rather than subtracting longitudes as flat Cartesian coordinates. Haversine's intermediate is clamped to `[0,1]` to guard floating-point drift.

Pure root imports are safe in SSR and Node. `haversine-geolocation/browser` is import-safe but native `getCurrentPosition()` must be called in a browser context; secure origin, user permission and Permissions Policy can affect success. `isGeolocationSupported()` checks API presence **at call time**, not authorization; native errors propagate. Do not prompt for location during SSR.

Verify against the [API reference](../api-reference.md), [browser/SSR guide](v2-consumers.md), [compatibility policy](../compatibility.md) and [V1 migration guide](../migration/v1-to-v2.md). An edit to GitHub docs does **not** alter the immutable published npm 2.0.1 README.
