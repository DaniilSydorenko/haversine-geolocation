# ADR-001: Public API and legacy compatibility

Status: Proposed

## Context

V1 exposes a default singleton with methods such as `getDistanceBetween()`, `getClosestPosition()`, `isGeolocationAvailable()`, and effectively-public underscore methods.

The singleton couples unrelated responsibilities and makes future tree-shaking, Node/browser separation and typed composition harder.

At the same time, the package has real historical users and a published npm identity. V2 should not force every existing consumer into an unnecessary flag-day migration.

## Decision

The V2 primary API will be functional and use named exports.

Target direction:

```ts
import {
  distance,
  nearest,
  isCoordinate,
  convertDistance,
} from 'haversine-geolocation';
```

The functional API is the canonical V2 contract.

V2 will also provide a deprecated compatibility facade for the V1 singleton-style API during the 2.x line.

The compatibility facade may be exposed through:

```ts
import HaversineGeolocation from 'haversine-geolocation';
```

and an explicit legacy subpath:

```ts
import HaversineGeolocation from 'haversine-geolocation/legacy';
```

The exact export wiring will be validated with consumer fixtures before release.

The compatibility facade must:

- be safe to import in Node and SSR;
- preserve V1 naming where practical;
- preserve V1 rounding/radius behavior where compatibility requires it;
- emit deprecation documentation rather than runtime warning noise;
- avoid accessing browser globals at module initialization time.

Underscore-prefixed V1 methods will not become first-class V2 APIs.

If consumer evidence does not show meaningful external reliance, they will remain available only through the legacy facade or be documented as unsupported implementation details.

## Consequences

The package can move toward a small functional core without discarding the installed-base migration path.

The root package remains slightly more complex during 2.x because it carries a compatibility default export.

A future major version may remove the compatibility facade.

## Rejected alternatives

### Keep the singleton as the primary V2 API

Rejected because it preserves unnecessary coupling and makes the pure core less composable.

### Remove all V1 shapes immediately

Rejected because the existing package has real historical consumers and a major-version migration should be deliberate rather than punitive.

### Runtime deprecation warnings

Rejected as a default because libraries should not spam consumer logs. Documentation and types are the preferred migration surface.
