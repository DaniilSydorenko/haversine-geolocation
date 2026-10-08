# Haversine V2 Architecture Decisions

Status: accepted

These ADRs define the intended Haversine V2 public and package contract before implementation begins.

They are based on:

- the V1 forensic audit;
- the V1 characterization suite;
- the executable CI baseline;
- the spherical mathematical reference suite;
- the historical Node/browser compatibility issue.

## Proposed ADRs

- [ADR-001: Public API and legacy compatibility](./001-public-api-and-legacy-compatibility.md)
- [ADR-002: Coordinate, unit and validation model](./002-coordinate-unit-validation-model.md)
- [ADR-003: Spherical Earth model and radius semantics](./003-earth-model-and-radius.md)
- [ADR-004: Package, runtime and browser boundaries](./004-package-runtime-browser-boundaries.md)
- [ADR-005: nearest() result and collection semantics](./005-nearest-semantics.md)

No production V2 implementation should begin until these decisions are reviewed and accepted.
