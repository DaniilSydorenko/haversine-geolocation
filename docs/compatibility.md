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

The V2 runtime build target is ES2020.

The browser compatibility policy is feature-based:

- modern evergreen browser with ES2020 support;
- `navigator.geolocation` is required only for the `./browser` adapter;
- browser permission and secure-context requirements are platform behavior.

Browser/package integration is validated through production builds in:

- Vite;
- Next.js;
- Nuxt.

The UMD compatibility artifact is also executed in real Chrome Stable on the GitHub-hosted Ubuntu runner.

The browser-specific Geolocation API adapter is isolated behind:

```text
haversine-geolocation/browser
```

The pure package root performs no top-level browser-global access.

Exact Safari or Firefox version guarantees are intentionally not claimed without matching browser CI.

## Compatibility policy

The compatibility matrix is a release gate, not a best-effort informational test.

Changes that break a supported runtime or a documented package entry point must either:

1. be fixed before merge; or
2. be accompanied by an explicit compatibility decision appropriate to semantic versioning.

The Node 26 row is a forward-compatibility smoke signal while that runtime is Current. It does not by itself redefine the minimum supported Node.js version.
