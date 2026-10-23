# Haversine V2 Release Runbook

Status: **public V2 RC.1 independently verified** on 2026-10-22. Initial stable target is **`2.0.1`** by explicit maintainer selection (unusual but valid; no published stable `2.0.0`); stable npm publication remains gated. Registry evidence confirmed `next=2.0.0-rc.1`, `latest=1.6.0` before stable publication.

## Release sequence

Use the staged progression:

1. `2.0.0-alpha.1` — completed; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1) and published npm package verified.
2. `2.0.0-beta.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1), npm maintainer-approved staged publication and [public npm Node 22/24/26 installations + signature verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) all PASS.
3. `2.0.0-rc.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-rc.1), maintainer npm approval and [independent registry-installed smoke](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39846708004) (9/9 PASS).
4. `2.0.1` — selected first stable V2 release; prepared candidate, **not yet published**. `2.0.0` will be skipped rather than retroactively published.

No further alpha/beta/RC cycle is planned or requested for the initial stable V2. Any future prerelease would require a new owner decision and new evidence.

## Trusted Publishing baseline

The initial npm Trusted Publisher relationship was exercised for the first public alpha using:

`.github/workflows/npm-stage-release.yml`

The alpha was staged, reviewed and approved with maintainer 2FA; published CJS, ESM, TypeScript and provenance verification is recorded in the [canonical roadmap](../roadmap/haversine-v2-human-roadmap.md) and release evidence. Do not re-open initial npm setup as an automatic blocker for beta unless a real configuration defect is discovered.

Do not introduce a long-lived npm automation token. Further npm permission changes remain explicit owner decisions.

## Safe validation flow

Before creating a publishable tag:

1. Run **Validate npm Release Candidate** manually.
2. Enter a V2 prerelease version such as `2.0.0-alpha.1` **for historical prerelease-only validation**. This workflow does not accept stable `2.0.1`; rely on existing exact-head stable CI and the manual staging workflow's stable checks.
3. Require a green result for:
   - clean dependency install;
   - source typecheck;
   - test suite;
   - build;
   - package-content/version validation;
   - packed CommonJS consumer;
   - packed ESM consumer;
   - packed TypeScript consumer.
4. Confirm the normal CI, Consumer Fixtures and Secret Scan are green on the release commit.
5. Review the migration guide and release notes.

The validation workflow modifies only its temporary runner workspace. It does not commit, tag or publish anything.

## Publish preparation

When the candidate is accepted:

1. update `package.json` and lockfile to the chosen prerelease version;
2. merge that version change only after the full repository gates are green;
3. create the matching Git tag `v<version>`;
4. create/review release notes;
5. verify the tag points to the exact reviewed commit.

## npm staging gate

The **Stage npm Release** workflow is manual-only.

It requires:

- an existing tag;
- exact tag ↔ package version equality;
- the explicit confirmation value `PUBLISH`;
- Node 24;
- npm 11.21.0;
- `id-token: write`;
- install, typecheck, tests, build and package inspection before the npm staging action.

**Current accepted policy (PR #191):** prereleases stage under `next`; stable **`2.0.1` only** can stage under `latest`. All other stable versions are refused. Enabling this code path does not dispatch it or bypass maintainer review/2FA.

Publishing a GitHub Release alone does not trigger npm mutation.

## Verification after each new prerelease

The public alpha, beta, and RC.1 were independently verified including provenance. For new releases, including stable:

1. verify the published package/version from npm;
2. install the published prerelease into clean Node ESM and CommonJS consumers;
3. verify TypeScript declarations from the published artifact;
4. verify provenance is visible for the published prerelease;
5. record the npm package/version, tag and provenance evidence alongside the GitHub Release;
6. update the canonical Haversine roadmap only after accepted publication evidence.

Historical Node import issue [#12](https://github.com/DaniilSydorenko/haversine-geolocation/issues/12) was **closed on 2026-10-11** after the published Node-safe alpha was verified. It is not an outstanding prerequisite unless a real regression is found.

## Stable release gate

The owner-approved stable staging change is already accepted in [PR #191](https://github.com/DaniilSydorenko/haversine-geolocation/pull/191). `npm-stage-release.yml` permits exactly stable `2.0.1` under `latest`, preserves prerelease `next`, and still requires a matching existing tag, explicit `PUBLISH`, OIDC, `npm stage publish`, owner inspection and npm 2FA. No stable version other than `2.0.1` is permitted.

Do not enable stable `latest` publication until:

- the prerelease sequence has sufficient evidence;
- migration documentation is final;
- consumer fixtures remain green;
- release/package checks remain green;
- issue #12 is resolved by an actually published Node-safe version;
- the owner explicitly approves the stable release.

**Stable release remains externally owner-gated, NOT PUBLISHED:** the maintainer must authorize and create `v2.0.1` at the exact accepted master commit, create a non-prerelease GitHub Release, manually run **Stage npm Release** with `tag=v2.0.1` and `confirm_publish=PUBLISH`, inspect staged contents and approve via npm 2FA. Only a real public npm `latest=2.0.1` and independently verified consumers/provenance complete #74. Postrelease verifier `.github/workflows/verify-published-alpha.yml` still expects `latest=1.6.0`; update this condition and add stable coverage under #189 after publication, not by silently claiming its current prerelease matrix verifies stable.
