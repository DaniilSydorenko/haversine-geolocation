# Changelog

All notable changes to Haversine Geolocation are documented here.

This project keeps the historical V1 release line stable while Haversine 2 evolves through explicit prereleases before any stable `latest` publication.

## Unreleased

### Prepared `2.0.0-rc.1` candidate (NOT published)

This candidate includes the **already merged** same-pole longitude correction (#175), while preserving the beta API, browser/legacy entrypoints, TypeScript declarations and zero runtime dependencies. No tag, release or npm staging has been created. Owner review, manual validation and npm 2FA remain mandatory. Published beta.1 is immutable.

## 2.0.0-beta.1 — published 2026-10-22

### Improvements since alpha.1

The public beta.1 release was approved by the maintainer via npm staged Trusted Publishing and independently verified from the registry. npm `next` points to `2.0.0-beta.1`; `latest` remains V1 `1.6.0`.

- hardened `nearest()` validation for malformed origins and invalid distance options on empty candidate collections;
- improved browser geolocation capability detection for null/malformed providers;
- corrected the migration guide's inaccurate statements about already published V2 alpha exports;
- verified the immutable public alpha across Node 22/24/26, CJS/ESM, TypeScript 7 and npm package signatures;
- adopted TypeScript 7 for authoring, stabilized Nuxt CI with npm 11 and preserved zero-runtime-dependency V2 package contracts;
- maintained successful Vite, Next.js, Nuxt, Chrome and packed package consumer gates.

**Published proof:** [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1) and [real npm registry consumer/signature verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) (6/6 successful Node jobs).

### V2 prerelease hardening

- continue compatibility, documentation and release-quality work after the first public alpha;
- stable `2.0.0` remains separately owner-approved and is not published automatically.

## 2.0.0-alpha.1 — 2026-10-11

First public Haversine 2 prerelease.

### Added

- validated V2 coordinate model;
- typed `m`, `km` and `mi` distance units;
- pure spherical `distance()` API;
- generic single-pass `nearest()`;
- explicit browser geolocation subpath;
- explicit legacy compatibility subpath;
- TypeScript declarations;
- dual ESM/CommonJS package exports;
- packed Node, TypeScript, Vite, Next.js and Nuxt consumer validation;
- npm Trusted Publishing / provenance-ready release flow;
- release-candidate validation and explicit manual prerelease publish gate.

### Changed

- modernized the test stack from Karma/Jasmine to Vitest;
- modernized the library build from Webpack/Babel to Vite;
- modernized the TypeScript baseline;
- established zero runtime dependencies;
- separated modern V2 APIs from the historical V1 compatibility facade.

### Verified

- published CommonJS consumer;
- published ESM consumer;
- published TypeScript declarations;
- npm provenance for the prerelease.

## 1.6.0 — 2021-11-14

Historical stable V1 release currently published under npm `latest`.

Earlier V1 releases remain available through Git tags and GitHub Releases.
