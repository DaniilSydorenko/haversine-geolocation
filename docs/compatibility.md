# Runtime Compatibility

Haversine V2 maintains an explicit runtime compatibility policy.

## Node.js

| Runtime | Status | CI policy |
|---|---|---|
| Node 22 | Supported | Required |
| Node 24 | Supported | Required |
| Node 26 | Compatibility smoke while Current | Required smoke |

The supported baseline is intentionally conservative for the V2 migration line.

A future maintenance or major release may revise this matrix as Node release status changes.

## Package formats

The Node compatibility matrix verifies the packed package rather than repository source paths.

Required contracts:

- CommonJS root import;
- ESM root import;
- `haversine-geolocation/browser`;
- `haversine-geolocation/legacy`;
- TypeScript declarations from the packed artifact.

## Browser consumers

Browser/package integration is separately validated through production builds in:

- Vite;
- Next.js;
- Nuxt.

The browser-specific Geolocation API adapter is isolated behind:

```text
haversine-geolocation/browser
```

The pure package root performs no top-level browser-global access.

## Compatibility policy

The compatibility matrix is a release gate, not a best-effort informational test.

Changes that break a supported runtime or a documented package entry point must either:

1. be fixed before merge; or
2. be accompanied by an explicit compatibility decision appropriate to semantic versioning.

The Node 26 row is a forward-compatibility smoke signal while that runtime is Current. It does not by itself redefine the minimum supported Node.js version.
