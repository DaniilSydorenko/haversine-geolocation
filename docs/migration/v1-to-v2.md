# Migrating from Haversine V1 to V2

Status: draft for the unreleased Haversine V2 line

Haversine V2 modernizes the public API, mathematical defaults, validation, runtime compatibility and package layout while preserving a compatibility path for existing V1 consumers during the 2.x line.

This guide describes the intended V2 contract as implemented on the repository `master` branch and as accepted in the V2 architecture ADRs. **Haversine V2 has not yet been published to npm.** Package subpaths described as "planned" are not consumer-ready until the V2 package-output work is complete.

## Migration strategy

V2 uses two surfaces during the 2.x migration period:

1. a canonical functional API for new code;
2. a deprecated legacy facade for existing V1-style code.

The goal is to let applications migrate incrementally instead of requiring an immediate rewrite.

## Legacy default import

V1:

```ts
import HaversineGeolocation from 'haversine-geolocation';

const distance = HaversineGeolocation.getDistanceBetween(
  pointA,
  pointB,
  'km',
);
```

During the V2 2.x migration line, the historical default singleton remains available as a compatibility facade.

The legacy facade intentionally preserves historical semantics where changing them would silently alter existing application output, including V1 rounding and the historical spherical radius.

A future major version may remove this facade after a documented deprecation period.

## Canonical V2 distance API

New V2 code should use the named functional API:

```ts
import { distance } from 'haversine-geolocation';

const kilometres = distance(
  { latitude: 52.2296756, longitude: 21.0122287 },
  { latitude: 59.9138688, longitude: 10.7522454 },
);
```

The default output unit is kilometres.

Unlike V1, the V2 core does not apply presentation rounding automatically.

V1:

```ts
HaversineGeolocation.getDistanceBetween(a, b, 'km');
// legacy output rounded to one decimal place
```

V2:

```ts
distance(a, b, { unit: 'km' });
// full numeric calculation precision
```

Applications that need display rounding should apply it explicitly at the presentation boundary.

## Coordinates

V2 uses one canonical core coordinate shape:

```ts
interface Coordinate {
  latitude: number;
  longitude: number;
}
```

V1 TypeScript types required `accuracy`, even though pure distance mathematics does not need sensor accuracy.

V2 therefore accepts:

```ts
const point = {
  latitude: 52.2296756,
  longitude: 21.0122287,
};
```

Additional metadata may still exist on application objects, but it is not required by the basic coordinate contract.

The initial V2 core does not implicitly normalize alternate shapes such as `{ lat, lng }` or GeoJSON coordinate arrays. Convert those representations explicitly before calling the core API.

## Validation

V1 primarily checked that latitude and longitude properties existed.

V2 validates that:

- latitude and longitude are numbers;
- both values are finite;
- latitude is in `[-90, 90]`;
- longitude is in `[-180, 180]`.

Malformed or non-finite coordinate data throws `TypeError`.

Finite values outside geographic ranges throw `RangeError`.

Valid zero-valued coordinates remain valid:

```ts
distance(
  { latitude: 0, longitude: 0 },
  { latitude: 0, longitude: 1 },
);
```

V2 also exposes:

```ts
import {
  assertCoordinate,
  isCoordinate,
} from 'haversine-geolocation';
```

## Units

V2 units are explicitly typed:

```ts
type DistanceUnit = 'm' | 'km' | 'mi';
```

Example:

```ts
distance(a, b, { unit: 'm' });
distance(a, b, { unit: 'km' });
distance(a, b, { unit: 'mi' });
```

V1 silently treated unknown measurement strings as kilometre-style output.

V2 does not preserve that behavior in the canonical API.

Invalid units are errors.

For standalone conversion:

```ts
import { convertDistance } from 'haversine-geolocation';

const miles = convertDistance(10, 'km', 'mi');
```

Conversions do not apply presentation rounding.

## Earth model and radius

Both V1 and V2 use spherical great-circle distance based on the Haversine formula.

They differ in the default spherical radius.

V1 compatibility behavior uses the historical:

```text
6372.8 km
```

The canonical V2 core uses the documented mean Earth radius:

```text
6,371,008.8 m
```

Therefore V1 and V2 can return slightly different values even before V1 rounding is considered.

This is an intentional V2 correctness/model change rather than an accidental regression.

Applications that require the historical spherical radius with the new functional API can supply an explicit radius:

```ts
distance(a, b, {
  unit: 'km',
  radius: 6_372_800,
});
```

The `radius` option is expressed in metres.

Haversine models the Earth as a sphere. It is not an ellipsoidal WGS84 geodesic algorithm.

## nearest()

V1:

```ts
const closest = HaversineGeolocation.getClosestPosition(
  current,
  candidates,
  'km',
);
```

The V1 result augments a copy of the selected candidate:

```ts
{
  ...candidate,
  haversine: {
    distance,
    measurement,
    accuracy,
  },
}
```

Canonical V2:

```ts
import { nearest } from 'haversine-geolocation';

const result = nearest(current, candidates, {
  unit: 'km',
});
```

Result:

```ts
{
  point: originalCandidate,
  distance: 123.456,
}
```

Important V2 semantics:

- `point` is the original candidate object;
- candidate metadata is preserved;
- candidates are not mutated;
- an empty candidate collection returns `undefined`;
- ties select the first candidate;
- the implementation is a single pass rather than allocating a distance array and spreading it into `Math.min`.

## Browser geolocation

V1 placed browser geolocation functionality on the same singleton as pure distance mathematics.

That architecture caused the historical Node import failure tracked in issue #12.

The V2 source now has an isolated browser adapter with:

```ts
getCurrentPosition()
isGeolocationSupported()
```

The planned final package surface is:

```ts
import {
  getCurrentPosition,
  isGeolocationSupported,
} from 'haversine-geolocation/browser';
```

**This subpath is planned but is not yet available in the published npm package.**

Browser globals are checked at function-call time rather than package-import time.

The package root must remain safe in Node and SSR environments.

## Legacy subpath

The historical compatibility facade has been physically separated into its own module in the repository.

The planned final package surface is:

```ts
import HaversineGeolocation from 'haversine-geolocation/legacy';
```

The default root compatibility import is also intended to remain available during 2.x.

**The explicit `./legacy` package subpath is not published yet.**

## Node.js compatibility

The developing V2 root build no longer depends on `window` at module initialization.

Repository CI now performs an actual Node CommonJS smoke test against the built artifact and verifies both:

- the V2 named `distance()` export;
- the historical default compatibility export.

This fixes the architectural class of failure reported in issue #12 on the development branch.

The npm-published V1.6.0 package still contains the historical bundle, so existing npm users do not receive this fix until a new version is published.

## Deep imports and explicit exports

V1 published a broad tarball containing source files, tests and development configuration.

Some consumers may therefore have imported internal paths that were never intended as supported API.

The final V2 package will use an explicit `exports` map.

That means imports such as:

```ts
import something from 'haversine-geolocation/src/...';
```

will not be supported.

Only documented package entry points should be treated as public API.

This is an intentional V2 package-encapsulation breaking change.

## Side-by-side migration example

V1:

```ts
import HaversineGeolocation from 'haversine-geolocation';

const closest = HaversineGeolocation.getClosestPosition(
  current,
  places,
  'km',
);

console.log(closest.haversine.distance);
```

V2:

```ts
import { nearest } from 'haversine-geolocation';

const closest = nearest(current, places, {
  unit: 'km',
});

if (closest) {
  console.log(closest.distance);
  console.log(closest.point);
}
```

## Recommended migration sequence

For an existing V1 application:

1. upgrade only after a V2 prerelease/release is explicitly announced;
2. keep the default legacy facade initially;
3. migrate distance calls to the named `distance()` API;
4. move presentation rounding into application/UI code;
5. migrate nearest-position calls to `nearest()`;
6. fix invalid coordinates or unknown unit strings that V1 silently tolerated;
7. move browser geolocation imports to the browser subpath when package exports ship;
8. remove any deep imports into V1 internal source files;
9. verify application-specific output changes caused by the new mean-radius default;
10. remove reliance on the legacy facade when migration is complete.

## Release status

Haversine V2 is currently under development.

Do not treat examples in this document as evidence that `haversine-geolocation@2` is available on npm until an explicit V2 prerelease or stable release is published.
