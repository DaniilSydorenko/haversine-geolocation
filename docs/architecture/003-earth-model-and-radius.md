# ADR-003: Spherical Earth model and radius semantics

Status: Accepted

## Context

V1 uses a hardcoded spherical Earth radius of `6372.8 km`.

The Haversine formula computes great-circle distance on a sphere. It is not an ellipsoidal WGS84 geodesic calculation.

V2 needs a documented model so that users understand both the calculation and its limitations.

## Decision

The canonical V2 `distance()` API remains a spherical great-circle calculation.

The default spherical radius should move to a documented conventional mean-Earth-radius constant:

```ts
EARTH_MEAN_RADIUS_M = 6_371_008.8
```

The exact constant will be independently verified and documented before implementation merge.

The API should allow an explicit custom spherical radius where useful:

```ts
distance(a, b, {
  unit: 'km',
  radius: customRadiusInMetres,
})
```

The legacy compatibility facade may retain the historical `6372.8 km` radius so that migration does not silently change V1 rounded outputs.

The V2 documentation must clearly state:

- Haversine models a sphere;
- Earth is not a perfect sphere;
- high-precision surveying/geodesy requires an ellipsoidal geodesic algorithm;
- Haversine is appropriate when spherical great-circle accuracy is sufficient.

## Numerical stability

The Haversine intermediate is mathematically bounded to `[0, 1]`.

Implementations must protect this domain against floating-point drift before the inverse trigonometric step.

The V1 numerical-domain guard is already covered separately by the mathematical reference work.

## Non-goals

V2 will not silently replace Haversine with Vincenty, Karney/GeographicLib or another ellipsoidal algorithm while keeping the same function semantics.

If ellipsoidal geodesics are ever added, they should be explicit separate functionality.

## References

- GeographicLib WGS84 geodesic documentation: https://geographiclib.sourceforge.io/
- Haversine numerical-domain background: https://en.wikipedia.org/wiki/Haversine_formula
