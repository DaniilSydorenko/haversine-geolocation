# Haversine V2 Release Runbook

Status (2026-10-27): public RC.1 was verified on 2026-10-22; the initial stable **`2.0.1`** [GitHub Release](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.1) was published on 2026-10-25 and [npm staging](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/40193740538) succeeded. Public npm registry, tarball and installed consumers still require independent verification under [#189](https://github.com/DaniilSydorenko/haversine-geolocation/issues/189). **Do not repeat any historical stable tagging/staging/publishing instructions below.** No stable `2.0.0` exists.

## Release sequence

Use the staged progression:

1. `2.0.0-alpha.1` — completed; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1) and published npm package verified.
2. `2.0.0-beta.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1), npm maintainer-approved staged publication and [public npm Node 22/24/26 installations + signature verification](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) all PASS.
3. `2.0.0-rc.1` — **completed**; [GitHub prerelease](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-rc.1), maintainer npm approval and [independent registry-installed smoke](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39846708004) (9/9 PASS).
4. `2.0.1` — first stable V2 GitHub Release published 2026-10-25; npm staging complete, independent public-registry proof pending. Stable `2.0.0` was intentionally skipped.

No further alpha/beta/RC cycle is planned or requested for the initial stable V2. Any future prerelease would require a new owner decision and new evidence.

## Trusted Publishing baseline

The initial npm Trusted Publisher relationship was exercised for the first public alpha using:

`.github/workflows/npm-stage-release.yml`

The alpha was staged, reviewed and approved with maintainer 2FA; published CJS, ESM, TypeScript and provenance verification is recorded in the [canonical roadmap](../roadmap/haversine-v2-human-roadmap.md) and release evidence. Do not re-open initial npm setup as an automatic blocker for beta unless a real configuration defect is discovered.

Do not introduce a long-lived npm automation token. Further npm permission changes remain explicit owner decisions.

## Safe validation flow

For historical prereleases only (not stable `2.0.1`), before creating a publishable tag:

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

**2026-10-23 historical publication gate (superseded):** the maintainer subsequently created the exact `v2.0.1` tag and stable GitHub Release and ran the npm staging workflow successfully on 2026-10-25. The remaining exit gate is independent public npm `latest=2.0.1` evidence and installed-consumer/provenance verification under #189, including an updated verifier. Do not stage or publish `2.0.1` again.

## Historical owner handoff for stable `2.0.1` — completed; do not repeat

> **ARCHIVED PROCEDURE (2026-10-23): DO NOT EXECUTE.** The stable GitHub Release and npm staging were completed on 2026-10-25. Retain these steps for historical audit only. Never recreate the tag, stage, approve or republish `2.0.1`; use [#189](https://github.com/DaniilSydorenko/haversine-geolocation/issues/189) for postrelease public-registry verification.

The reviewed candidate commit is `5964152e4abb7922d6d114a142fdebfe009151d8`. Later accepted commits changed **documentation / agent instructions only**, without changing the package payload or release workflow. Tagging a different commit requires its own explicit owner choice and appropriate exact-head verification. Do **not** substitute the current `master` head by accident.

The current [`2.0.1.md`](2.0.1.md) records release evidence and remaining verification. The [customer-facing release notes](2.0.1-public-release-notes.md) were used for the published GitHub release. The following owner handoff instructions are retained as a dated record, not actionable guidance.

### Maintainer sequence (local Git + GitHub CLI)

1. Independently check live npm before creating anything: `npm view haversine-geolocation dist-tags --json` and `npm view haversine-geolocation@2.0.1 version`. The second query should report version not found; if already published, **STOP and investigate** before making a new release. Do not infer npm status from GitHub alone.
2. In a local checkout with `origin` pointing to this repository, run the commands below. This creates **one annotated immutable release tag at the reviewed commit**, pushes it, and creates a **non-prerelease** GitHub Release with the public release notes. It does **not** publish to npm.

   ```bash
   git fetch origin master --tags
   RELEASE_COMMIT=5964152e4abb7922d6d114a142fdebfe009151d8
   git cat-file -e "${RELEASE_COMMIT}^{commit}"
   git show "${RELEASE_COMMIT}:package.json" | node -e "let data=''; process.stdin.on('data',c=>data+=c).on('end',()=>{if(JSON.parse(data).version!=='2.0.1') process.exit(1)})"
   git tag -a v2.0.1 "$RELEASE_COMMIT" -m "Haversine Geolocation 2.0.1 — initial stable V2"
   git push origin v2.0.1
   git ls-remote origin refs/tags/v2.0.1 refs/tags/v2.0.1^{}
   gh release create v2.0.1 --verify-tag --title "Haversine Geolocation 2.0.1" --notes-file docs/release/2.0.1-public-release-notes.md
   ```

   Before running `gh release create`, check that the checkout has the freshly merged public notes file; `git ls-remote ... ^{}` is useful for inspecting the **peeled annotated tag commit** rather than mistaking the tag-object SHA for the commit SHA. If the tag exists or conflicts, **do not overwrite, force-push or silently retarget it**. GitHub UI alternative: **Releases → Draft a new release → choose the existing `v2.0.1` tag → paste the public notes file → leave prerelease unchecked → Publish release**.

3. Open the existing [manual Stage npm Release](https://github.com/DaniilSydorenko/haversine-geolocation/actions/workflows/npm-stage-release.yml) workflow on `master`. Enter **tag=`v2.0.1`** and **confirm_publish=`PUBLISH`**. The workflow checks out the tag, independently verifies package/version, runs quality, typecheck, tests, build, size and package inspection, then stages **stable 2.0.1 under `latest`**.
4. In the npm maintainer account, **inspect the exact staged package and approve it with 2FA**. Do not infer publication merely from the workflow turning green. A tag, a GitHub Release and a staged package are not npm-publication evidence.
5. Only after approval, independently verify npm `latest=2.0.1`, immutable version `2.0.1`, `next` history, signatures/provenance and real clean consumers. Then complete existing [postrelease issue #189](https://github.com/DaniilSydorenko/haversine-geolocation/issues/189) and close [release issue #74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74) with actual evidence. The prerelease verifier's old `latest=1.6.0` assertion **must be updated before using it for post-stable verification**.

**Owner boundary:** an agent may prepare/review files and evidence, but cannot impersonate maintainer approval or skip the npm 2FA and separate publication verification. No new prerelease, no backfilled stable `2.0.0`, no unsolicited branch-protection or central HQ changes.
