# Haversine V2 Release Runbook

Status: prerelease preparation only. No V2 package has been published from this repository yet.

## Release sequence

Use the staged progression:

1. `2.0.0-alpha.1`
2. `2.0.0-beta.1`
3. `2.0.0-rc.1`
4. `2.0.0`

Additional prereleases are allowed when validation evidence requires them.

## Before the first publish

The package owner must configure npm Trusted Publishing for this exact GitHub repository and the staging workflow:

`.github/workflows/npm-stage-release.yml`

Do not introduce a long-lived npm automation token unless trusted publishing is proven impossible and that fallback is explicitly approved.

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

## After the first prerelease

Before considering the alpha successful:

1. verify the published package/version from npm;
2. install the published prerelease into clean Node ESM and CommonJS consumers;
3. verify TypeScript declarations from the published artifact;
4. verify provenance is visible for the published prerelease;
5. link the npm package/version and provenance evidence from the GitHub Release;
6. keep issue #12 open until a Node-safe V2 package is actually published and independently verified.

## Stable release gate

Do not enable stable `latest` publication until:

- the prerelease sequence has sufficient evidence;
- migration documentation is final;
- consumer fixtures remain green;
- release/package checks remain green;
- issue #12 is resolved by an actually published Node-safe version;
- the owner explicitly approves the stable release.

Stable publication is intentionally disabled in the current staging workflow.
