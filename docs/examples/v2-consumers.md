# V2 consumer examples: installed package, browser and SSR

This document provides examples using the published V2 API of `haversine-geolocation@2.0.1`. It supports `{ latitude, longitude }` coordinates and named imports such as `distance()` and `nearest()`. You can specify options like `{ unit: 'm' | 'km' | 'mi' }` and optionally use a browser adapter. The library focuses solely on calculating spherical great-circle distances, rather than road routes or WGS84 geodesics.

## Node.js ESM (native)

To install the package in a Node.js project, run:




```sh
npm install haversine-geolocation@2.0.1
```

The [executable ESM example](../../examples/node-esm.mjs) can be saved to your project. Execute it by running `node node-esm.mjs`. This example demonstrates usage of named imports and utilizes `node:assert/strict` to validate unrounded positive distances, the correct identity of nearest candidates, retained metadata, and the behavior of empty-array results.

```js
import { distance, nearest } from 'haversine-geolocation';

const origin = { latitude: 59.9139, longitude: 10.7522 };
const places = [{ id: 'oslo', ...origin }];
console.log(distance(origin, { latitude: 60.3913, longitude: 5.3221 })); // km
console.log(nearest(origin, places)?.point.id); // 'oslo'
console.log(nearest(origin, [])); // undefined
```

Save [the executable CommonJS example](../../examples/node-cjs.cjs) into your project and run `node node-cjs.cjs`. A `.cjs` extension works even when the surrounding project sets `"type": "module"`.

```js
const { distance, nearest } = require('haversine-geolocation');
const origin = { latitude: 59.9139, longitude: 10.7522 };
const places = [{ id: 'oslo', ...origin }];
console.log(distance(origin, origin)); // 0
console.log(nearest(origin, places)?.point.id); // 'oslo'
```

**CI confirmation:** The CI workflow specified in `.github/workflows/ci.yml` builds and packages the repository, installing the package tarball in two separate temporary consumer projects. It executes both example files to ensure the installed package is used rather than the repository source.

## TypeScript (with published declarations)

The existing [TypeScript consumer fixture](../../fixtures/typescript-consumer/index.ts) works with the packed package and is verified through type checking within the CI workflow. The `Place` type extends `Coordinate`, and the `nearest()` function retains the `id` and `metadata` from the original candidate.

```typescript
import { distance, nearest, type Coordinate } from 'haversine-geolocation';

type Place = Coordinate & { id: string };
const origin: Coordinate = { latitude: 59.9139, longitude: 10.7522 };
const places: Place[] = [{ id: 'oslo', ...origin }];
const km: number = distance(origin, places[0], { unit: 'km' });
const result = nearest(origin, places);
if (result) {
  const selectedId: string = result.point.id;
  console.log(selectedId, km);
}
```

Passing an empty array produces `undefined` instead of throwing an error or yielding an empty `{ point, distance }` object. If an invalid unit or coordinate is provided, it may trigger an exception; thus, it's crucial to validate any untrusted coordinates using the `isCoordinate()` or `assertCoordinate()` functions.

### Browser Geolocation and server-side rendering

For pure distance or nearest calculations in a Node.js project, Next.js server components, Nuxt SSR, or any other server environment, import directly from the package root. The root won't access `navigator` or `window` during the module initialization phase.

The optional `./browser` entry can be safely imported in SSR; however, requesting a real position requires a browser interaction:

```typescript
import { getCurrentPosition, isGeolocationSupported } from 'haversine-geolocation/browser';

async function readLocation(): Promise<GeolocationPosition | undefined> {
  if (typeof window === 'undefined' || !isGeolocationSupported()) {
    return undefined; // SSR or an environment without the browser API
  }

  try {
    return await getCurrentPosition({ enableHighAccuracy: true, timeout: 10_000 });
  } catch (error) {
    // Native browser geolocation errors (e.g. permission denied, timeout) propagate.
    console.warn('Location could not be obtained', error);
    return undefined;
  }
}
```

Call `readLocation()` from a browser-only handler or lifecycle hook, **not** during server rendering. Typically, browsers necessitate a secure context (i.e., HTTPS or an appropriate localhost), user permission, and a valid permissions policy for geolocation. The function `isGeolocationSupported()` checks for support for the API **at the time of the call**; it does **not** confirm existing permissions or ensure that a request will succeed. In environments without the geolocation API, calling `getCurrentPosition()` will reject with an `Error('Geolocation API is not available in this environment')`. Should the browser encounter an error, the library will relay that native error. Moreover, the library does not initiate permission prompts or routing maps.

See the [API reference](../api-reference.md), [runtime compatibility](../compatibility.md) and [V1→V2 migration guide](../migration/v1-to-v2.md). Browser fixtures exercise supported and rejected geolocation calls; the existing framework fixtures cover Vite, Next.js and Nuxt builds, not universal browser permission guarantees.
