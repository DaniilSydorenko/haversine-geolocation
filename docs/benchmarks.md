# Performance Benchmarks

Haversine keeps a small zero-dependency benchmark suite for the V2 pure core.

## Purpose

The benchmark suite establishes observable performance baselines for:

- `distance()`;
- `nearest()` candidate scanning.

The suite benchmarks production ESM output from `dist/index.mjs`, not TypeScript source.

## Method

The current benchmark uses:

- Node 22 on GitHub-hosted Ubuntu runners;
- deterministic generated coordinates;
- a warm-up phase before measurement;
- 500,000 `distance()` operations;
- 50 `nearest()` calls over 10,000 candidates each;
- checksum accumulation so measured work cannot be trivially discarded.

## Policy

The benchmark is currently **informational**, not a hard CI performance gate.

Shared runners vary in CPU scheduling and host load. A single wall-clock threshold would create false failures.

Before adding a regression threshold, collect enough runs to understand normal variance.

## Running locally

Build the package first:

```bash
npm run build
node scripts/benchmark.mjs
```

## Baseline

First recorded GitHub Actions baseline:

- workflow run: `38164694853`;
- Node: `v22.23.3`;
- platform: Linux x64;
- `distance()`: 500,000 operations in 52.35 ms, 9,551,600 ops/s;
- `nearest()` candidate evaluations: 500,000 evaluations in 49.72 ms, 10,056,326 ops/s.

Checksums:

- `distance()`: `4933646585.854939`;
- `nearest()`: `12329.022089`.

These values are a reference point, not a pass/fail threshold.

A regression budget should be introduced only after enough CI runs exist to characterize normal shared-runner variance.
