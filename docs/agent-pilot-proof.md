# Agent pilot proof (Issue #220)

This file was added by a **Cursor Cloud Agent** run as a bounded documentation-only pilot for [GitHub Issue #220](https://github.com/DaniilSydorenko/haversine-geolocation/issues/220). The Issue originally chartered an OpenHands draft-PR proof; this change records an agent-executed path that touches only this file and does not modify library code or behavior.

## Run identity

| Field | Value |
| --- | --- |
| Issue | #220 |
| Baseline `master` SHA | `bc6e4d7b1b60977fc2ae4cac7cc4d23310a236a5` |
| Cursor Cloud run | `bc-09b95ce8-e90c-5449-9dd5-209043eec6b3` |
| Run URL | https://cursor.com/agents/bc-09b95ce8-e90c-5449-9dd5-209043eec6b3 |
| Model | `composer-2.5-fast` (per run metadata) |
| Measured provider cost | `UNKNOWN` (not authorized in this run) |

## Verifiable `distance()` example

The snippet below matches the stable V2 quick start in the repository README: named `distance` import, `{ latitude, longitude }` coordinates, default kilometres, and metres via `{ unit: 'm' }`.

```ts
import { distance } from 'haversine-geolocation';

const warsaw = { latitude: 52.2297, longitude: 21.0122 };
const oslo = { latitude: 59.9139, longitude: 10.7522 };

const kilometres = distance(warsaw, oslo); // km by default
const metres = distance(warsaw, oslo, { unit: 'm' });
```

Source: [README.md — Quick start](../README.md#quick-start--stable-v2).

## Disclaimer

This document is pilot evidence only. It does **not** change the published package API, runtime, tests, or release artifacts. Merge remains an owner decision; no merge, npm publish, or follow-on Issue dispatch is implied.