# Haversine V1 Forensic Audit

Status: in progress  
Tracking issue: #36  
Audit baseline: `master@62d3aee73c3d97bab1975cf4853d41e7e6dded78`

## Purpose

This document reconstructs the behavior, packaging, compatibility surface and historical context of the currently published V1 line before any Haversine V2 redesign.

The goal is not to preserve every V1 behavior. The goal is to distinguish intentional compatibility requirements from accidental legacy behavior so that V2 changes can be explicit, testable and documented.

## Repository baseline

Repository: `DaniilSydorenko/haversine-geolocation`

Verified baseline facts:

- public, original repository rather than a GitHub fork;
- created 2017-06-16;
- default branch: `master`;
- current package version in the repository: `1.6.0`;
- latest published GitHub release: `v1.6.0` from 2021-11-14;
- 27 stars and 2 forks at the audit baseline;
- zero declared runtime dependencies in `package.json`;
- repository revival work resumed in October 2026 through governance, documentation and security automation PRs.

The current repository also contains stale Dependabot branches and PRs tied to the legacy Webpack/Babel/Karma dependency graph. Those PRs must not be treated as required V2 dependency updates until the future toolchain is decided.

## Current package entry point

`package.json` declares:

```json
{
  "name": "haversine-geolocation",
  "version": "1.6.0",
  "main": "dist/build.js"
}
```

There is currently no `exports` map, no `types` field and no explicit ESM entry point.

The shipped package therefore relies on the historical UMD bundle at `dist/build.js` as its primary runtime entry point.

## Current source-level API

The current `src/index.ts` exports one default singleton instance of a `HaversineGeolocation` class.

The callable surface is:

```ts
HaversineGeolocation._convertMeasurements(...)
HaversineGeolocation._haversine(...)
HaversineGeolocation.isGeolocationAvailable()
HaversineGeolocation.getDistanceBetween(...)
HaversineGeolocation.getClosestPosition(...)
```

Although the two underscore-prefixed methods look internal by naming convention, they are not private in TypeScript and are callable at runtime. They must therefore be treated as effectively-public until consumer evidence shows otherwise.

## Coordinate type

The source-level coordinate interface is:

```ts
export interface ILocationPoint {
  latitude: number;
  longitude: number;
  accuracy: number;
}
```

This conflicts with documented distance examples, which omit `accuracy`.

Current evidence therefore shows three different contracts:

1. README examples;
2. TypeScript source types;
3. permissive runtime behavior.

V2 must choose one explicit contract rather than inheriting this ambiguity.

## Distance calculation

The current implementation:

1. converts degrees to radians;
2. uses the Haversine formula;
3. uses a fixed spherical radius of `6372.8 km`;
4. returns distance in kilometres before unit conversion.

Current central-angle calculation:

```ts
2 * Math.asin(Math.sqrt(a))
```

This implementation requires explicit near-antipodal numerical-stability testing before it can be reused in V2.

The V1 formula represents spherical great-circle distance. It must not be described as an ellipsoidal/WGS84 geodesic calculation.

## Unit conversion and rounding

V1 combines conversion and presentation rounding.

Observed behavior:

| Unit input | Conversion | Rounding |
| --- | --- | --- |
| `km` | identity | one decimal |
| `mi` | multiply by `0.62137` | one decimal |
| `m` | multiply by `1000` | integer |
| unknown string | treated like kilometres | one decimal |

Unknown units therefore do not fail. They silently fall back to kilometre-style output.

This is a candidate breaking change for V2.

## README/runtime mismatch

The refreshed README currently documents a metres example as approximately:

```text
1133062.7 m
```

but the V1 implementation calls `.toFixed()` for metres and therefore rounds to an integer.

This confirms that README examples cannot be used as the canonical V1 specification.

Characterization tests must establish actual shipped behavior.

## Input validation

Current `getDistanceBetween` checks only whether each object has own properties named `latitude` and `longitude`.

It does not validate:

- numeric type;
- finite values;
- `NaN`;
- `Infinity`;
- latitude range;
- longitude range.

Invalid or nonsensical numeric input can therefore propagate into the Haversine calculation.

V2 must define deterministic validation semantics.

## Closest-position behavior

V1 computes every distance into an intermediate array and then calls:

```ts
Math.min(...distances)
```

The result is the original candidate copied into a new object with an added `haversine` property:

```ts
{
  ...candidate,
  haversine: {
    distance,
    measurement,
    accuracy: current.accuracy
  }
}
```

Important properties of this behavior:

- the original candidate object is not mutated;
- additional candidate properties are preserved at runtime;
- the current TypeScript return type does not model arbitrary candidate properties well;
- empty collections have weak/undefined semantics;
- the intermediate array plus spread into `Math.min` is unnecessary for a streaming nearest search;
- very large candidate lists should be benchmarked separately.

## Browser geolocation coupling

`isGeolocationAvailable()` directly references `navigator`.

Pure geospatial calculations and browser geolocation therefore live in the same package entry surface.

Open issue #12 provides real external evidence of server-side import failure:

```text
ReferenceError: window is not defined
```

reported when importing the package in Node.js.

The root package for V2 must be safe to import in Node and SSR environments even when browser geolocation support is unavailable.

## Historical Node/refactoring attempt

PR #19, `replace throw error, add utils`, was opened from `annual-code-refactoring` and closed without merge.

It attempted to:

- split Haversine calculation and conversion into utilities;
- detect Node environments;
- change the export shape;
- bump the package toward `1.7.0`;
- avoid the historical UMD `window` failure.

This work is useful historical evidence but must not be adopted as a V2 base.

Notable problems in the abandoned implementation include:

- returning an empty object in Node rather than exposing the pure math API;
- replacing thrown errors with console output in several paths;
- validating coordinates using truthiness, which incorrectly rejects valid zero coordinates;
- filtering falsy distances, which can remove valid zero-distance results;
- changing public behavior and export shape without a migration contract.

The branch therefore demonstrates that Node/browser separation was already a known architectural pressure, while also showing why the fix requires a cleaner package boundary rather than environment-gating the entire library.

## Bundle-level Node behavior

The `v1.6.0` package entry point is `dist/build.js`.

The bundle starts by invoking its UMD wrapper with the identifier `window`:

```js
...}(window, function () { ... })
```

In a normal Node process, evaluating the package entry point therefore attempts to resolve an undefined browser global before the CommonJS branch can safely provide the module. This directly explains the `ReferenceError: window is not defined` reported in issue #12.

The tagged `v1.7.0` experiment changed the UMD global from `window` to `self` rather than removing the browser-global dependency from the package root. That is not a reliable Node architecture either.

The V2 root entry must not evaluate browser-only globals at module initialization time.

## Initial mathematical edge-case observations

Using the current V1 formula and radius `R = 6372.8 km`:

| Fixture | Observed V1 result |
| --- | ---: |
| same point `(0,0) → (0,0)` | `0 km` before conversion rounding |
| equator quarter-circle `(0,0) → (0,90)` | ~`10010.3708 km` |
| exact antipodes `(0,0) → (0,180)` | ~`20020.7417 km` |
| antimeridian crossing `(0,179.999) → (0,-179.999)` | ~`0.22245 km` |
| north pole → equator | ~`10010.3708 km` |
| Warsaw → Oslo reference coordinates | ~`1063.3995 km` |

These observations are not yet a correctness certificate. They only confirm several basic continuity/symmetry expectations for representative fixtures.

The near-antipodal risk remains important: the expression passed to `asin` is mathematically bounded, but floating-point rounding can make robust implementations clamp the intermediate value or use an `atan2` form. This requires a dedicated reference/property test phase rather than a speculative production change during the forensic audit.

## Tests

The current test suite contains only three broad assertions:

- raw Haversine result is greater than zero;
- converted distance is greater than zero;
- closest result contains a `haversine` property.

The suite does not currently verify:

- exact fixtures;
- same-point distance;
- poles;
- antimeridian;
- antipodal behavior;
- invalid coordinates;
- `NaN` / `Infinity`;
- unit conversion semantics;
- empty nearest input;
- Node import;
- browser geolocation;
- package entry-point behavior.

The test pipeline also transpiles TypeScript through the legacy Babel/Karma path rather than enforcing an independent `tsc --noEmit` gate.

This allows type/documentation mismatches to survive unnoticed.

## Build and packaging

Current tooling includes:

- TypeScript 4.x;
- Babel;
- Webpack;
- Karma;
- Jasmine;
- Chrome launcher;
- Travis CI configuration;
- a UMD production bundle;
- source maps.

The repository also contains generated JavaScript/map artifacts under source directories from historical refactoring work.

V2 should not modernize this stack dependency-by-dependency by default. The correct strategy is to identify required outputs first, then remove obsolete layers.

## Release and tag history

GitHub Releases currently exposes:

- `1.4.0`;
- `1.5.0`;
- `v1.6.0`.

Git refs expose a broader historical tag set:

- `v1.0.5`
- `v1.0.6`
- `v1.1`
- `v1.1.0`
- `v1.1.1`
- `v1.1.2`
- `v1.2.0`
- `v1.2.1`
- `v1.2.2`
- `v1.3.0`
- `1.4.0`
- `1.5.0`
- `v1.6.0`
- `v1.7.0`

Notably, `1.4.0` and `1.5.0` both point directly at the same merge commit (`700df5b...`).

The `v1.7.0` tag points to commit `11ed375...`, which diverged from the later `master` history and contains the abandoned Node/refactoring direction. Public npm metadata still identifies `1.6.0` as the latest published package version. Therefore Git tag chronology and npm publication chronology are not identical and must be documented separately.

The audit still needs an authoritative npm version/tarball inventory before publication history can be considered fully reconciled.

## Open issues and pull requests

Actual open user issues at the audit baseline include:

- #1 — historical Haversine formula reference;
- #12 — Node.js import failure.

The repository-level open issue count also includes old Dependabot PRs, so it must not be interpreted as the number of user-reported issues.

Open Dependabot PRs #24–#31 target the old dependency graph. They should be evaluated after the future build/test stack is designed rather than merged mechanically.

## Initial compatibility classification

### PRESERVE

- repository and npm package identity;
- Git history, releases, issues and public engineering provenance;
- zero-runtime-dependency goal unless a dependency proves clearly justified;
- basic capability to calculate Haversine distance;
- nearest-point capability;
- support for kilometres, metres and miles;
- preservation of arbitrary candidate metadata where the nearest API promises it.

### MODERNIZE

- TypeScript configuration;
- build tooling;
- test runner;
- CI;
- package metadata;
- release process;
- documentation;
- npm publication/provenance;
- browser geolocation integration.

### REMOVE

Likely candidates, subject to consumer evidence:

- Travis configuration;
- obsolete Webpack/Babel/Karma layers;
- committed generated source artifacts;
- accidental console/error behavior from abandoned refactoring branches.

### REDESIGN

- public API shape;
- coordinate typing;
- validation;
- unit semantics;
- rounding behavior;
- nearest result shape;
- Node/browser separation;
- package exports;
- browser geolocation API boundary.

### INVESTIGATE

- real external use of underscore-prefixed methods;
- actual npm tarball contents across important V1 releases;
- exact CommonJS/UMD interop behavior;
- consumer reliance on deep imports;
- historical reason for `6372.8 km`;
- numerical behavior near antipodal points;
- whether any browser-global behavior is required at package-root import time;
- exact npm version chronology versus Git tags/releases.

## Phase-closure work still required

This audit is not complete until the following evidence is added:

1. published npm `1.6.0` tarball inventory;
2. npm version chronology;
3. authoritative npm version chronology versus Git tags;
4. consumer-facing import/export experiments from the published artifact;
5. browser behavior of the packed artifact;
6. independent mathematical reference comparisons and property tests;
7. final compatibility matrix;
8. explicit recommendations feeding the V2 ADR phase.

No runtime implementation change should be merged as part of this audit.
