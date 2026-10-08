# ADR-002: Coordinate, unit and validation model

Status: Accepted

## Context

V1 has three conflicting contracts:

- README examples;
- TypeScript types;
- runtime behavior.

The current `ILocationPoint` requires `accuracy`, even though pure distance calculations do not.

Units are arbitrary strings, unknown units silently fall back to kilometre-style output, and coordinate ranges are not validated.

## Decision

### Canonical coordinate

The V2 core will use one canonical coordinate shape:

```ts
export interface Coordinate {
  latitude: number;
  longitude: number;
}
```

Sensor accuracy does not belong to the minimum mathematical coordinate type.

Browser/sensor integrations may use:

```ts
export interface GeolocationCoordinate extends Coordinate {
  accuracy?: number;
}
```

The initial core will not accept `{ lat, lng }`, tuples or GeoJSON coordinate arrays directly.

Adapters may be added separately when justified by real use cases.

### Units

The public unit contract will be typed:

```ts
export type DistanceUnit = 'm' | 'km' | 'mi';
```

The default unit remains kilometres for migration continuity unless later benchmark/API review shows a stronger reason to change it.

Core calculations return full numeric precision.

Display rounding is not part of `distance()`.

Unknown units are errors rather than silent kilometre fallbacks.

### Validation

Public core functions validate coordinates.

Required invariants:

```text
latitude  is finite and -90 <= latitude <= 90
longitude is finite and -180 <= longitude <= 180
```

Malformed numeric values should fail deterministically.

Proposed error semantics:

- `TypeError` for malformed/non-numeric coordinate data;
- `RangeError` for finite numeric values outside geographic ranges.

Zero latitude, zero longitude and zero distance are valid and must never be rejected by truthiness checks.

## Consequences

The core contract becomes predictable and strongly typed.

Some V1 calls that previously returned a number, `NaN`, or a silent unit fallback will become explicit errors in the canonical V2 API.

The legacy facade may preserve historical behavior where migration compatibility is more valuable than strictness.
