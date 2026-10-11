# Changelog

All notable changes to Haversine Geolocation are documented here.

This project keeps the historical V1 release line stable while Haversine 2 evolves through explicit prereleases before any stable `latest` publication.

## Unreleased

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
