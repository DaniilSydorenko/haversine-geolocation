# ADR-005: nearest() result and collection semantics

Status: Proposed

## Context

V1 `getClosestPosition()` computes an intermediate distance array, spreads it into `Math.min`, then returns a copy of the candidate augmented with a nested `haversine` object.

This preserves arbitrary candidate metadata at runtime but makes ownership and typing ambiguous.

Empty collections also have weak legacy behavior.

## Decision

The canonical V2 API is generic and returns a separate result object:

```ts
export interface NearestResult<T> {
  point: T;
  distance: number;
}

export function nearest<T extends Coordinate>(
  origin: Coordinate,
  candidates: readonly T[],
  options?: DistanceOptions,
): NearestResult<T> | undefined;
```

### Semantics

- the original candidate object is returned by reference as `point`;
- candidates are never mutated;
- candidate metadata is preserved through the generic type;
- distance uses the same unit/model options as `distance()`;
- an empty candidate collection returns `undefined`;
- equal distances select the first candidate, matching stable V1 behavior;
- implementation should use a single pass rather than allocating a full distance array and spreading into `Math.min`.

### Legacy compatibility

The 2.x compatibility facade may preserve the historical augmented-object result:

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

This shape is not the canonical V2 core result.

## Consequences

The API becomes easier to type, avoids metadata collisions and scales to large candidate collections without `Math.min(...array)` argument-spread risk.
