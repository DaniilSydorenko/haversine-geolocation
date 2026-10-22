# Changelog

All notable changes to Haversine Geolocation are documented here.

This project keeps the historical V1 release line stable while Haversine 2 evolves through explicit prereleases before any stable `latest` publication.

## Unreleased

### Prepared `2.0.1` initial stable V2 release (publication pending)

The maintainer explicitly selected `2.0.1` as the initial stable V2 release number; `2.0.0` has **never been published**. No additional alpha, beta or RC iteration is required. Publication under `latest` is still a separately controlled, manual npm stage/2FA action.

- Maintain the published RC.1 production API, spherical model, rounding and legacy compatibility rules without introducing runtime breaking changes.
- Carry the accepted exact North/South Pole regression correction (#175).
- Include the latest merged test-only Cursor Pilot #178 regression coverage for `nearest()`, plus accepted #183 and release verification #184 evidence.
- Publish a README that describes the stable V2 install without falsely equating the GitHub source version and public npm `latest`.
- Preserve zero runtime dependencies, Node 22/24 and Node 26 forward smoke, TypeScript 7, CJS/ESM, browser and legacy export contracts.

## 2.0.0-rc.1 — published 2026-10-22

- Published under npm `next` using Trusted Publishing, reviewed manual staging and maintainer approval.
- Fixed exact zero-distance behavior at the North and South Poles without near-pole snapping.
- [Independent public RC test](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39846708004) passed 9/9 actual npm installations (Node 22/24/26 × alpha/beta/RC) and audit signatures.
- Immutable prerelease remains available by explicit version; it does not automatically replace npm `latest`.

## 2.0.0-beta.1 — published 2026-10-22

### Improvements since alpha.1

The public beta.1 release was approved through staged Trusted Publishing and independently verified from npm. It remains installable by explicit version; the later RC.1 replaced it under the prerelease `next` tag.

- hardened `nearest()` validation for malformed origins and invalid distance options on empty candidate collections;
- improved browser geolocation capability detection for null/malformed providers;
- corrected the migration guide's inaccurate statements about already published V2 alpha exports;
- verified the immutable public alpha across Node 22/24/26, CJS/ESM, TypeScript 7 and npm package signatures;
- adopted TypeScript 7 for authoring, stabilized Nuxt CI with npm 11 and preserved zero-runtime-dependency V2 package contracts;
- maintained successful Vite, Next.js, Nuxt, Chrome and packed package consumer gates.

**Published proof:** [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1) and [real npm registry consumer/signature verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) (6/6 successful Node jobs).

### V2 prerelease hardening

- continue compatibility, documentation and release-quality work after the first public alpha;
- stable V2 publication remains a separately controlled npm action, never an automatic consequence of merging a PR.

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
