# V2 consumer examples: installed package, browser and SSR

These examples use the **published V2 API** of `haversine-geolocation@2.0.1`: `{ latitude, longitude }` coordinates, `distance()` and `nearest()` named imports, `{ unit: 'm' | 'km' | 'mi' }` options, and an optional browser adapter. The core has no runtime dependencies. It calculates **spherical great-circle distance**, not road routes or ellipsoidal WGS84 geodesics.

## Node.js ESM (native)

Install in a Node project:

```sh
npm install haversine-geolocation@2.0.1
```

Save [the executable ESM example](../../examples/node-esm.mjs) into your project and run `node node-esm.mjs`. It uses named imports and `node:assert/strict` to verify unrounded positive distances, metres/kilometres, nearest-candidate object identity, retained metadata and the empty-array result.

```js
import { distance, nearest } from 'haversine-geolocation';

const origin = { latitude: 59.9139, longitude: 10.7522 };
const places = [{ id: 'oslo', ...origin }];
console.log(distance(origin, { latitude: 60.3913, longitude: 5.3221 })); // km
console.log(nearest(origin, places)?.point.id); // 'oslo'
console.log(nearest(origin, [])); // undefined
```

## Node.js CommonJS

Save [the executable CommonJS example](../../examples/node-cjs.cjs) into your project and run `node node-cjs.cjs`. A `.cjs` extension works even when the surrounding project sets `"type": "module"`.

```js
const { distance, nearest } = require('haversine-geolocation');
const origin = { latitude: 59.9139, longitude: 10.7522 };
const places = [{ id: 'oslo', ...origin }];
console.log(distance(origin, origin)); // 0
console.log(nearest(origin, places)?.point.id); // 'oslo'
```

**CI proof:** `.github/workflows/ci.yml` builds and packs the repository package, installs that tarball in two *separate temporary consumer projects*, then copies and executes both example files there. This avoids accidentally resolving repository source instead of the installed package.

## TypeScript (published declarations)

The existing [TypeScript consumer fixture](../../fixtures/typescript-consumer/index.ts) is installed with the real packed package and typechecked by the same CI workflow. Its `Place` type extends `Coordinate`; `nearest()` preserves the `id` and `metadata` of the selected original candidate.

```ts
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

An empty array produces `undefined`, not a throw or an empty `{ point, distance }` object. An invalid unit or coordinate may throw, so validate untrusted coordinates with `isCoordinate()` or `assertCoordinate()`.

## Browser Geolocation and server-side rendering

For a **pure** distance or nearest calculation in Node, Next.js server components, Nuxt SSR or another server environment, import from the package root. The root does not access `navigator` or `window` at module initialization.

The optional `./browser` entry is **import-safe** in SSR, but requesting a real position is a browser interaction:

```ts
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

Call `readLocation()` from a browser-only handler or lifecycle hook, **not** during server rendering. Browsers generally require a secure context (HTTPS or qualifying localhost), user permission, and an allowed permissions policy for geolocation. `isGeolocationSupported()` checks for the API **at call time**; it does **not** confirm permission or guarantee a successful request. In an environment without the API, `getCurrentPosition()` rejects with `Error('Geolocation API is not available in this environment')`. If the browser returns an error, the adapter passes through that native error. The library itself does not create a permission prompt or a routing map.

See the [API reference](../api-reference.md), [runtime compatibility](../compatibility.md) and [V1→V2 migration guide](../migration/v1-to-v2.md). Browser fixtures exercise supported and rejected geolocation calls; the existing framework fixtures cover Vite, Next.js and Nuxt builds, not universal browser permission guarantees.
