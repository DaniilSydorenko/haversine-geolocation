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

The first GitHub Actions baseline will be recorded here after the benchmark workflow completes successfully.
