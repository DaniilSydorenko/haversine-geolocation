# ADR-004: Package, runtime and browser boundaries

Status: Accepted

## Context

The V1 package entry point is a UMD bundle that evaluates a browser global at module initialization time.

This is the root cause behind the historical Node import failure reported in issue #12.

V2 must make pure geospatial functionality safe in Node, SSR, browsers and modern bundlers.

Modern Node package documentation recommends the `exports` field for explicit package entry points, while also warning that adding `exports` to an existing package can break undeclared deep imports.

## Decision

### Root package

The root package is pure and browser-global-free.

Importing:

```ts
import { distance } from 'haversine-geolocation';
```

or requiring the supported CommonJS entry must not evaluate:

```text
window
document
navigator
```

### Browser integration

Browser Geolocation API functionality belongs to an explicit browser subpath:

```ts
import {
  getCurrentPosition,
  isGeolocationSupported,
} from 'haversine-geolocation/browser';
```

Browser globals may be evaluated only inside browser-specific functions, not at package import time.

The legacy facade may expose the historical geolocation method, but it must defer environment access until that method is called.

### Module formats

For the 2.x migration line, publish both ESM and CommonJS entry points through conditional exports.

This is intentionally more compatible than an immediate ESM-only major release because V1 historically served CommonJS/UMD-era consumers.

An ESM-only future major version may be considered later.

### Export map

The package should define an explicit export surface, conceptually:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./browser": {
      "types": "./dist/browser.d.ts",
      "import": "./dist/browser.js",
      "require": "./dist/browser.cjs"
    },
    "./legacy": {
      "types": "./dist/legacy.d.ts",
      "import": "./dist/legacy.js",
      "require": "./dist/legacy.cjs"
    }
  }
}
```

Exact build filenames are implementation details and may change.

Deep imports into `src/` are not part of the V2 supported API.

Because V1 published broad source/config contents, this encapsulation is a documented V2 breaking change.

### Runtime support

Initial support target:

- Node.js 22 LTS;
- Node.js 24 LTS;
- Node.js 26 as a CI smoke-test while Current, promoted to supported when it enters LTS;
- modern evergreen browsers through documented build targets;
- SSR environments that do not provide browser globals.

Do not spend V2 maintenance budget on EOL Node lines.

### Package contents

The npm package should be explicitly curated using `files` and package-content tests.

Expected published content should be limited to runtime/type artifacts and necessary project metadata, not test suites or historical build configuration.

### Consumer fixtures

Before V2 release, packed-package fixtures must cover at least:

- Node ESM;
- Node CommonJS;
- TypeScript;
- Vite;
- Next.js;
- Nuxt.

These fixtures must install the output of `npm pack`, not import repository source directly.

## References

- Node.js package entry points and `exports`: https://nodejs.org/api/packages.html
- Node.js release schedule: https://nodejs.org/en/about/previous-releases
