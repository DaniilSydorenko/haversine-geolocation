# Haversine V2 Release Runbook

Status: **public V2 RC.1 independently verified** on 2026-10-22. Initial stable target is **`2.0.1`** by explicit maintainer selection (unusual but valid; no published stable `2.0.0`); stable npm publication remains gated. Registry evidence confirmed `next=2.0.0-rc.1`, `latest=1.6.0` before stable publication.

## Release sequence

Use the staged progression:

1. `2.0.0-alpha.1` — completed; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1) and published npm package verified.
2. `2.0.0-beta.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1), npm maintainer-approved staged publication and [public npm Node 22/24/26 installations + signature verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) all PASS.
3. `2.0.0-rc.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-rc.1), maintainer npm approval and [independent registry-installed smoke](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39846708004) (9/9 PASS).
4. `2.0.1` — selected first stable V2 release; prepared candidate, **not yet published**. `2.0.0` will be skipped rather than retroactively published.

Additional prereleases are allowed when validation evidence requires them.

## Trusted Publishing baseline

The initial npm Trusted Publisher relationship was exercised for the first public alpha using:

`.github/workflows/npm-stage-release.yml`

The alpha was staged, reviewed and approved with maintainer 2FA; published CJS, ESM, TypeScript and provenance verification is recorded in the [canonical roadmap](../roadmap/haversine-v2-human-roadmap.md) and release evidence. Do not re-open initial npm setup as an automatic blocker for beta unless a real configuration defect is discovered.

Do not introduce a long-lived npm automation token. Further npm permission changes remain explicit owner decisions.

## Safe validation flow

Before creating a publishable tag:

1. Run **Validate npm Release Candidate** manually.
2. Enter a V2 prerelease version such as `2.0.0-alpha.1`.
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

For now, this workflow refuses stable versions and only stages prereleases using the `next` dist-tag.

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

The existing `npm-stage-release.yml` **intentionally refuses stable versions**, so stable `2.0.1` requires a separately approved, narrowly reviewed release-workflow change after owner decision. Preserve exact tag/package version matching, OIDC, `npm stage publish`, owner inspection and 2FA. Only the selected stable `2.0.1` version should be eligible for `latest`; other stable versions continue to be refused.

Do not enable stable `latest` publication until:

- the prerelease sequence has sufficient evidence;
- migration documentation is final;
- consumer fixtures remain green;
- release/package checks remain green;
- issue #12 is resolved by an actually published Node-safe version;
- the owner explicitly approves the stable release.

Stable publication is intentionally disabled in the current staging workflow until a separately reviewed and accepted stable-enable PR. The owner-selected version does not authorize an agent to publish to npm without an additional manual staging run and npm approval.
