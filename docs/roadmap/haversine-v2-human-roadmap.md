# Haversine V2 Human Roadmap

| Task | Color | Progress |
|---|---:|---:|
| **ALL ROADMAP — UNWEIGHTED TASK CHECKLIST** | 🟡 | **89%** |
| V1 forensic audit | 🟢 | 100% |
| V1 shipped-behavior characterization | 🟢 | 100% |
| Mathematical reference suite | 🟢 | 100% |
| Haversine floating-point domain guard | 🟢 | 100% |
| V2 public/package architecture ADRs | 🟢 | 100% |
| V2 coordinate model and validation | 🟢 | 100% |
| V2 typed distance units | 🟢 | 100% |
| V2 pure spherical distance() | 🟢 | 100% |
| V2 generic single-pass nearest() | 🟢 | 100% |
| V2 browser geolocation isolation | 🟢 | 100% |
| V2 core public barrel | 🟢 | 100% |
| First-class TypeScript typecheck gate | 🟢 | 100% |
| Node-safe root bridge with legacy default | 🟢 | 100% |
| Legacy compatibility facade extraction | 🟢 | 100% |
| Curated npm package contents | 🟢 | 100% |
| V1 → V2 migration guide | 🟢 | 100% |
| TypeScript declarations | 🟢 | 100% |
| Public ./browser entry | 🟢 | 100% |
| Public ./legacy entry | 🟢 | 100% |
| Dual ESM/CommonJS package exports | 🟢 | 100% |
| Packed CommonJS consumer validation | 🟢 | 100% |
| Packed ESM consumer validation | 🟢 | 100% |
| Packed TypeScript declaration consumer | 🟢 | 100% |
| Vite packed-package consumer | 🟢 | 100% |
| Next.js SSR packed-package consumer | 🟢 | 100% |
| Nuxt universal packed-package consumer | 🟢 | 100% |
| V2 package-output milestone | 🟢 | 100% |
| Karma/Jasmine → Vitest migration | 🟢 | 100% |
| Webpack/Babel → Vite library build migration | 🟢 | 100% |
| Zero-runtime-dependency contract | 🟢 | 100% |
| Dev dependency security cleanup | 🟢 | 100% |
| Stale legacy Dependabot cleanup | 🟢 | 100% |
| README V1/V2 release-state split | 🟢 | 100% |
| npm staged-release workflow | 🟢 | 100% |
| OIDC/provenance-ready release workflow | 🟢 | 100% |
| Safe V2 release-candidate validation workflow | 🟢 | 100% |
| Explicit manual npm publish gate | 🟢 | 100% |
| V2 release runbook | 🟢 | 100% |
| V2 prerelease release-policy implementation | 🟢 | 100% |
| npm Trusted Publisher account binding | 🟢 | 100% |
| 2.0.0-alpha.1 version PR | 🟢 | 100% |
| 2.0.0-alpha.1 release notes | 🟢 | 100% |
| 2.0.0-alpha.1 candidate validation execution | 🟢 | 100% |
| v2.0.0-alpha.1 Git tag | 🟢 | 100% |
| 2.0.0-alpha.1 GitHub prerelease | 🟢 | 100% |
| Stage 2.0.0-alpha.1 on npm | 🟢 | 100% |
| Review staged alpha package | 🟢 | 100% |
| 2FA approval of staged alpha | 🟢 | 100% |
| Published alpha CommonJS verification | 🟢 | 100% |
| Published alpha ESM verification | 🟢 | 100% |
| Published alpha TypeScript verification | 🟢 | 100% |
| Published alpha provenance verification | 🟢 | 100% |
| Resolve historical Node import issue #12 after published verification | 🟢 | 100% |
| Alpha feedback and compatibility hardening / beta readiness review | 🟢 | 100% |
| 2.0.0-beta.1 | 🟢 | 100% |
| Beta feedback and compatibility hardening | 🔵 | 0% |
| 2.0.0-rc.1 | 🔵 | 0% |
| Release-candidate hardening | 🔵 | 0% |
| Stable-release approval gate | 🔵 | 0% |
| 2.0.0 stable npm release | 🔵 | 0% |
| Post-release README/status update | 🔵 | 0% |
| Post-release migration-guide finalization | 🔵 | 0% |
| 🆕 NEW — Modernize TypeScript compiler baseline from 4.4 | 🟢 | 100% |
| 🆕 NEW — Define supported Node.js/browser compatibility matrix | 🟢 | 100% |
| 🆕 NEW — Add compatibility CI across supported Node.js versions | 🟢 | 100% |
| 🆕 NEW — Add dedicated API reference documentation | 🟢 | 100% |
| 🆕 NEW — Add benchmark suite and performance baseline | 🟢 | 100% |
| 🆕 NEW — Add lint/format quality gate | 🟢 | 100% |
| 🆕 NEW — Add package-size regression budget | 🟢 | 100% |
| 🆕 NEW — Add formal CHANGELOG/release-notes baseline | 🟢 | 100% |
| 🆕 NEW — Correct README test-runner wording after Vitest migration | 🟢 | 100% |
| 🆕 NEW — Remove Vite native-config-loader ESM warnings | 🟢 | 100% |
| 🆕 NEW — Add real-browser UMD compatibility fixture | 🟢 | 100% |
| 🆕 NEW — Normalize package repository.url for npm | 🟢 | 100% |
| 🆕 NEW — Correct README published-alpha release status | 🟢 | 100% |
| 🆕 NEW — Pin central GRS control plane to validated immutable SHA | 🟢 | 100% |
| 🆕 NEW — Disable persisted credentials in read-only GRS checkouts | 🟢 | 100% |
| 🆕 NEW — Reconcile V2 release runbook with published alpha | 🟢 | 100% |
| 🆕 NEW — Add bounded agent engineering round map | 🟢 | 100% |
| 🆕 NEW — Adopt 12-step agent engineering round protocol and repository entrypoints | 🟢 | 100% |
| 🆕 NEW — Eliminate or explicitly justify 27 Biome warnings from accepted CI | 🟢 | 100% |
| 🆕 NEW — Evaluate and adopt TypeScript 7 (superseding PR #152) | 🟢 | 100% |
| 🆕 NEW — Decide default-branch protection / minimal ruleset | 🟠 | 0% |
| 🆕 NEW — Enable manual stable npm staging safely, after owner approval | 🔵 | 0% |

## Status and scoring methodology

**Original baseline re-audit (2026-10-16)** against accepted default branch `master` at `99d72e3e6bff7ae06bbb7cf2628dd645e154599c`, complete open PR inventory, exact-head and accepted beta candidate CI, verified public npm alpha smoke, release issue #74 and current GitHub release inventory. This SHA is the accepted implementation baseline before roadmap reconciliation, not a frozen assertion about future `master`.

- **89% is an unweighted task-checklist score, NOT stable-release readiness.** Current calculation after verified public beta: 84 distinct task rows, 75 at 100% and 9 at 0%: `(75 × 100) / 84 = 89.29%`, rounded **89%**. The previous 55% alpha estimate has been replaced by a verified, bounded beta-readiness review, not by an assertion of comprehensive customer feedback. Tasks have different sizes; score can decrease when genuine new work is found.
- **Stable V2 release readiness: NOT READY.** Public alpha `2.0.0-alpha.1` and beta `2.0.0-beta.1` are verified; beta feedback hardening, RC, owner stable gate, stable-capable manual staging and public stable publication are pending. Never substitute this 89% checklist score for the release gate.
- **Alpha readiness decision:** the previous 55% was an unverified planning estimate; it is superseded by the accepted evidence-backed alpha compatibility review below. **READY FOR BETA CANDIDATE PREPARATION** means no currently known critical regression in the tested matrix, not proof of universal user coverage, Safari/Firefox support, beta publication or npm approval. Distinguish the immutable published alpha.1 from corrected code on `master`.
- **Evidence-based row reconciliation:** `docs/compatibility.md` and Node 22/24/26 runtime matrix define the current feature-based policy (no untested Safari/Firefox version promises); `.github/workflows/browser-umd.yml` + `fixtures/browser-umd/index.html` provide the Chrome real-browser fixture; the accepted CI build log uses Vite 8.3.4 without the named native-config-loader ESM warning. Hence those three existing rows now read 100%.
- **Reconciled quality debt:** the prior **27 Biome warnings** have been removed or narrowly justified in accepted PR #155; PR #156 makes future warnings fail CI and both manual V2 validation/staging quality steps. Historical generated JS artifacts remain unchanged. The corrected release runbook is accepted; `master` remains unprotected (owner decision, no automated admin change); obsolete TypeScript 7 Dependabot PR #152 is now **closed/unmerged**, superseded by accepted TypeScript 7 upgrade #165. Stable staging still explicitly rejects stable releases.
- **Task-round contract:** [Haversine V2 Bounded Engineering Round Map](haversine-v2-agent-rounds.md) provides the twelve *task IDs and dependencies*. Every substantive agent-managed round follows the distinct [12-Step Engineering Round Protocol](../engineering/round-protocol.md), discovered through [AGENTS.md](../../AGENTS.md); [round evidence template](../engineering/round-evidence-template.md) supplies PR/issue records, not a second tracker. No autonomous worker, scheduled Haversine Autopilot, mandatory new CI, or modification of central GitHub HQ is implied.
- **State authority:** accepted `master` and exact-head CI for implementation; the public npm/GitHub release for publication; this file for local task statuses. Pending PRs are proposals only. Do not change another project's roadmap or adopt central C01–C07 controls without GitHub HQ owner issue #56.

## Accepted release round — HV-BETA-01 public npm beta verified (2026-10-22)

**DONE — publicly published and independently verified.** The immutable [GitHub prerelease v2.0.0-beta.1](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-beta.1) points at reviewed tag commit `9301f54d9a978749ab88f5231c5d0486e15505b3`. Later Cursor patches on `master` are **not** part of that beta tarball.

- **Release/owner gates:** [non-publishing validation #38899959709](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38899959709) PASS; [npm stage workflow #38906873669](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38906873669) PASS, with tag `next`, staged SHA1 `5ecd0e5da2d8d13653ad19b24ec0a5bc57183ad4`, OIDC provenance [Sigstore log 3279945986](https://search.sigstore.dev/?logIndex=3279945986), stage ID `30cbb514-b6af-4ab2-98eb-c2e87f99266d`. The maintainer approved that stage in npm on 2026-10-22; npm account displayed `haversine-geolocation@2.0.0-beta.1 published successfully`.
- **Independent public-registry proof:** [PR #179](https://github.com/DaniilSydorenko/haversine-geolocation/pull/179) merged as `1c7b4ea7d9e919e248d4c069c6c88cc3902fe304`, extending the existing published-alpha verifier to both alpha and beta. [GitHub Actions #39741835704](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/39741835704) ran **6/6 successful real npm installs across Node 22/24/26**, covering CJS, ESM, browser/legacy entrypoints, TypeScript 7 and version-specific `nearest()` behavior. `npm audit signatures` PASS; public `latest=1.6.0`, `next=2.0.0-beta.1`, and beta tarball SHA1 equals staged artifact. PR exact-head **8/8 PASS**, and accepted `master` postmerge CI and Gitleaks PASS.
- **Progress:** this existing beta row advances to **100%** based on accepted external artifact evidence. Total **75/84 DONE, 9 pending, 89% rounded**. Stable remains **NOT READY**.
- **Next:** HV-BETA-02 feedback/compatibility review and `2.0.0-rc.1` preparation; new RC or stable publication requires separate owner approval.

## Accepted engineering round — Pilot 02: exact-pole distance regression (2026-10-22)

- **Scope and authority:** owner-approved one-time ChatGPT → GitHub → Cursor Cloud coding pilot, [Issue #174](https://github.com/DaniilSydorenko/haversine-geolocation/issues/174). No standing agent, new repository, npm publication, release, branch protection or central governance change.
- **Accepted code:** [PR #175](https://github.com/DaniilSydorenko/haversine-geolocation/pull/175) squashed to `master` as [`029faec92c1821fca343595d1fefa423d21b9c62`](https://github.com/DaniilSydorenko/haversine-geolocation/commit/029faec92c1821fca343595d1fefa423d21b9c62), exact PR head `64b53ecbf7903a1cddc021fa0d98e3ed8011e909`, baseline `9301f54d9a978749ab88f5231c5d0486e15505b3`. Only `src/v2/distance.ts` and `spec/v2-distance.spec.ts` changed: same exact North/South Pole latitude at ±90° now yields exact zero distance regardless of longitude. Near-pole and public API behavior unchanged by the targeted branch.
- **Evidence:** Cursor recorded two regression tests failing before correction and 77 passing tests after correction, plus local quality/typecheck/build/size PASS. Independent GitHub verification found ten successful jobs for the exact PR head: Test and build, V2 core baseline, Node 22/24/26, Vite/Next/Nuxt consumer fixtures, Chrome UMD and Gitleaks. All six associated PR workflows were completed with success. **Post-merge push-triggered CI: UNKNOWN**, because the available GitHub Connector view only returns PR-triggered workflow runs; do not substitute PR CI as post-merge proof.
- **Ownership and progress:** #175 merged only after explicit owner approval; existing Dependabot [#172](https://github.com/DaniilSydorenko/haversine-geolocation/pull/172) modifies only `package.json`/`package-lock.json` and was untouched. Issue #174 closed on acceptance. This bounded regression fix is **additional accepted maintenance**, not a new V2 release milestone: the canonical 84-row unweighted checklist remains **88%** and stable 2.0.0 remains **NOT READY**. npm publication and release-related checks: N/A.
- **Handoff:** no further Pilot 02 product changes authorized. The next project work must be selected under existing Haversine domain ownership and release/owner gates; verify any outstanding post-merge CI evidence separately.

## Live state reconciliation — 2026-10-14 (read-only evidence review)

- **Accepted implementation and CI:** before this documentation-only reconciliation, `master` is `67c81f450ab9ffe042f1f1a3788af8385a60b4c6` (accepted roadmap PR #159). The [accepted Test and build](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487523502) and [Gitleaks](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487523366) checks both concluded **SUCCESS**. Later successful `help/signal` runs are a separate GitHub Autopilot concern, not proof of Haversine engineering tests.
- **Open proposals:** the only observed open PR is [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152), a **TypeScript 5.9.3 → 7.0.2 major bump** touching only `package.json` and `package-lock.json`. Its proposed head is `604b2ce766843bf05865e2eefaf0e7f659585aa4`, with a historical PR base not current `master`; mergeability is transient and **not acceptance**. Do not mark HV-TOOL-01 complete or merge a compiler major without the defined NodeNext, declarations, packed consumer and framework compatibility review.
- **Open issue:** [#74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74) remains **OPEN** with alpha release criteria accepted and beta, RC, stable owner approval/staging/public stable verification still pending.
- **Release and package:** current accepted `package.json` is `2.0.0-alpha.1` using TypeScript `5.9.3`; latest visible Haversine V2 GitHub release is [`v2.0.0-alpha.1`](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1), published on 2026-10-11. Previously accepted independent npm alpha smoke/provenance evidence stands; **a fresh npm-registry dist-tag read was not available in this reconciliation**, so do not present an unverified current dist-tag as freshly audited. No GitHub beta, RC or V2 stable release was found.
- **Owner and governance boundaries:** live `master` branch protection is **disabled**; proposed minimal protection remains owner-only (existing roadmap task). The existing local GRS consumer is pinned; HQ C01–C07 adoption and npm stable publication remain separate owner approvals.
- **Progress accounting:** the accepted 84 task rows are unchanged: 72 at 100%, one **historical/unverified** alpha hardening estimate at 55%, and 11 at 0%; `(72 × 100 + 55) / 84 = 86%` rounded. This is not a stable release-readiness metric. **No task status was promoted by this audit.**
- **Method:** this is an evidence-only 12-step engineering reconciliation cycle under the [local protocol](../engineering/round-protocol.md). Source-code/release mutation and new CI gates are **NOT APPLICABLE**. Any review-only sync PR must still pass its own exact-head applicable checks and be verified on the accepted default branch before handoff.

## Accepted engineering round — HV-BETA-01 candidate preparation, publication pending (2026-10-16)

**Outcome: CANDIDATE PREPARED / PUBLIC BETA NOT YET PUBLISHED.** The existing checklist row `2.0.0-beta.1` **remains at 0%** because its acceptance requires an independently verified npm/GitHub prerelease and provenance; a repository version bump or green PR does not satisfy that release-level task.

- **Dependency:** HV-ALPHA-02 is DONE for beta preparation based on real published-alpha smoke, tested candidate compatibility and explicitly bounded release-readiness decision, not on a claim of exhaustive external feedback.
- **[PR #170](https://github.com/DaniilSydorenko/haversine-geolocation/pull/170), ACCEPTED:** immutable candidate HEAD `0f53a8a5f6a94532766e3a852f102bab235a4386`, merge SHA `99d72e3e6bff7ae06bbb7cf2628dd645e154599c`. Updated **only** `package.json`, `package-lock.json`, `CHANGELOG.md` and [beta candidate release notes](../release/2.0.0-beta.1.md). Current repo package and both lockfile root versions are now `2.0.0-beta.1`. **No tag, npm staging, npm publish, 2FA or GitHub Release was executed.**
- **Exact candidate evidence:** **10/10 applicable exact-head CI jobs SUCCESS**, with strict quality, TypeScript7, **75/75 tests**, build, size budget and packed CJS/ESM/TypeScript consumers; Node 22/24/26, Chrome Stable UMD, Vite, Next.js, Nuxt, Gitleaks and baseline. All **9/9 applicable post-merge domain checks PASS**. The separate GitHub Autopilot `help/signal` result is not a domain test; GRS path-filtered N/A.
- **Current public release:** the latest observed V2 GitHub Release is `v2.0.0-alpha.1`. npm `latest` remains V1 `1.6.0` according to the previously independently verified stable baseline. Published alpha behavior is version-specific; beta must be verified as a new public artifact before being marked DONE.
- **Non-publishing validation still needed:** run existing [Validate npm Release Candidate](../../.github/workflows/npm-release-candidate.yml) with input `2.0.0-beta.1` at the approved exact release commit and review terminal results. This workflow was **not dispatched** in this on-demand round; the GitHub connector here does not expose workflow dispatch. The exact candidate PR/full consumer CI is independent evidence, not a substitute for claiming that manual workflow ran.
- **Explicit maintainer gate:** review exact release SHA, changelog and notes; approve creating tag `v2.0.0-beta.1`; verify that the tag points to the reviewed commit; manually invoke existing [Stage npm Release](../../.github/workflows/npm-stage-release.yml) with exact tag and `confirm_publish=PUBLISH`, complete account-side/2FA authorization, and independently verify public npm CJS/ESM/TypeScript installations, `next` dist-tag, signatures/provenance and GitHub prerelease. **None of these owner/release actions is implicitly authorized by merge.**
- **After publication:** mark `2.0.0-beta.1` task complete **only after** artifact verification, then begin HV-BETA-02 feedback/compatibility hardening. Stable release remains **NOT READY** and owner-gated.
- **Roadmap accounting:** 84 task rows, 74 DONE, 10 at 0%; **88% rounded**, unchanged by candidate preparation. Repository description/topics and branch-protection owner decisions remain separate and do not block this prerelease pipeline unless the owner explicitly changes that requirement.

## Accepted engineering round — HV-ALPHA-02: beta-candidate readiness (2026-10-16)

**Decision: READY FOR `2.0.0-beta.1` CANDIDATE PREPARATION. Public beta publication remains maintainer-gated.** This closes the *bounded compatibility and feedback review* work item, not future beta feedback, release publication or universal browser certification.

- **Open-feedback evidence:** at discovery, the only open Haversine issue was [#74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74), a release-tracking issue with **zero comments**. No newly reported alpha regressions were present in the open issues; historical issues and published release evidence were consulted. This is **not** proof that unreported or external-channel defects cannot exist.
- **Immutable published alpha:** inspected tag `v2.0.0-alpha.1`. It *does not* include post-alpha fixes from [#161](https://github.com/DaniilSydorenko/haversine-geolocation/pull/161) (invalid `nearest()` origin with empty candidates; null/incomplete geolocation provider), or the later validation guard below. The published package's known empty-input behavior was verified as a **version-specific baseline**, not endorsed as beta behavior.
- **[PR #168](https://github.com/DaniilSydorenko/haversine-geolocation/pull/168), ACCEPTED:** head `0f315cb089e4817eae17b796cad1bf4ab92c9a0e`, merged `3af418792d8b2ce24e08bb4051aeb9ef8e053b82`. `nearest()` now validates invalid `unit` and `radius` options even for empty candidates, while valid empty candidates still return `undefined`. Added regression coverage and corrected `docs/migration/v1-to-v2.md` statements that incorrectly said V2, `./browser` and `./legacy` were unpublished. No public API/export, npm version or publication changed.
- **Real npm tarball evidence:** extended the **existing** `verify-published-alpha.yml` workflow to install public `haversine-geolocation@2.0.0-alpha.1` across Node **22, 24 and 26**, exercise CJS, ESM, package/subpath metadata, **TypeScript 7.0.2 declarations**, documented alpha nearest boundary behavior and `npm audit signatures`. All **3/3 registry-based jobs PASS**, and all **13/13 applicable exact-head #168 checks PASS** (including quality/typecheck/tests, packed consumers, Vite/Next/Nuxt, Chrome UMD, Node and secret scan). All **9/9 applicable domain post-merge jobs PASS**. The GRS path filter did not trigger (N/A), while GitHub Autopilot `help/signal` is separate.
- **Validation coverage:** coordinate range/NaN, numerical antimeridian and near-antipodal references, `nearest()` empty/ties/metadata and invalid options, browser missing/null provider and permission rejection, SSR-safe imports, package exports and packed CJS/ESM/TS consumers are exercised by current test and CI evidence. **Do not** claim precise Safari/Firefox versions or all customer applications without independent runtime evidence.
- **Gate semantics:** no *known critical* regression remains in the **tested** matrix after the accepted fixes; beta is the appropriate next public feedback stage. Published `alpha.1` itself remains an immutable earlier artifact, so **beta must be built from a newly reviewed candidate**, not from the alpha tarball. No beta tag, GitHub release, npm stage/publish or owner 2FA authorization has been executed by this round.
- **Roadmap math:** alpha hardening/readiness row moves from *historical 55%* to **100% based on this bounded, verified acceptance decision**. Total remains 84 tasks: **74 DONE, 10 at 0%; `74/84 = 88.10%` → 88% rounded**. This is an unweighted checklist, not stable-readiness probability.
- **Next owner gate:** HV-BETA-01 can now prepare a bounded `2.0.0-beta.1` version/notes candidate and run full exact-head gates. Publication requires an **explicit maintainer decision**, tag and staged npm/2FA actions; independent npm package/provenance verification must follow publication.
- **Non-gating owner-facing GitHub About improvement (P1):** current repository description is the older `Get distances between two points or get closest position to current point. Based on the Haversine Formula`. Candidate: `TypeScript geospatial library for spherical distance and nearest-point queries. ESM/CJS, browser adapter and tested V2 prerelease.` Existing homepage is `https://www.npmjs.com/package/haversine-geolocation`; current topics are `distance`, `es6`, `geolocation`, `haversine`, `haversine-formula`, `javascript`, `nodejs`. No repository-settings mutation was authorized or performed; owner may update About/topics/UI later without blocking beta.
- **Separate owner decision HV-SEC-01:** `master` is still unprotected. Propose a minimal ruleset grounded in actual CI/path filters; only the owner/admin can enable it. Central C01–C07 and HQ ownership remain untouched.

## Current-state audit and remaining release path — 2026-10-14

**Verified accepted implementation baseline:** `master` `ce435b7de0996065fb7941809800e368c7973448`; `typescript@7.0.2` as dev/compiler dependency; package version `2.0.0-alpha.1`. The `master` Test and build and Gitleaks check runs are **SUCCESS**. Several `help/signal` runs are GitHub Autopilot results, **not** additional Haversine domain validation. There were **zero open Haversine PRs**, and [release issue #74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74) remains OPEN. Branch protection reports `protected: false`.

**External release evidence:** GitHub release inventory still lists [`v2.0.0-alpha.1`](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1) as the latest V2 release (published 2026-10-11); **no V2 beta, RC or stable GitHub release** was observed. Previously verified npm alpha/provenance evidence is historical; a fresh npm registry dist-tag inspection was **not performed** in this read-only audit. Do not infer new publication or stable readiness from repository version, PR merge, or checklist percentage.

**GitHub HQ coordination update:** the HQ-owned [PR #79](https://github.com/DaniilSydorenko/.github/pull/79), previously documented as awaiting integration, is now **MERGED** (HQ merge `74e36c018602dca61ee6efe5db83e0b31ee988f6`). This is an HQ roadmap coordination update only, **not** Haversine feature or release approval. The Haversine domain roadmap stays locally owned; central registry `discovery.agent` correction and C01–C07 owner gate remain HQ-owned decisions.

### Remaining work in dependency order (no invented progress)

| Order | Domain task(s) | Required evidence / ownership |
|---|---|---|
| 1 | **HV-ALPHA-02** — alpha feedback and compatibility hardening (historical 55%) | Confirm real feedback channels, reproduce and resolve actual compatibility issues, assess missing relevant browser/runtime evidence; establish an explicit beta-readiness decision. Existing internal edge-case fixes #161 are already accepted. **55% is not independently measured feedback acceptance.** |
| 2 | **HV-SEC-01** — default-branch protection/ruleset decision (0%) | Propose smallest safe ruleset based on actually executed check names and path-filter behavior. **Owner approval and administrative application only**; do not turn this into a fictitious beta block without an approved dependency. |
| 3 | **HV-BETA-01** — `2.0.0-beta.1` (0%) | After beta-readiness evidence: prepare version/notes/tag candidate, exact-head CI and packed consumer checks, explicitly owner-approved prerelease publication, then independently verify npm package and GitHub release. |
| 4 | **HV-BETA-02** — beta feedback/compatibility (0%) | Triage real beta feedback and reconcile any reproduced regressions; preserve an auditable acceptance decision. |
| 5 | **HV-RC-01 / HV-RC-02** — `2.0.0-rc.1` and RC hardening (both 0%) | Review beta acceptance, owner-gated RC publication, independent real-package verification, release-candidate compatibility hardening. |
| 6 | **HV-STABLE-01 / HV-STABLE-02 / HV-STABLE-03** — owner stable approval, safe stable-capable workflow and public `2.0.0` npm publication (all 0%) | Explicit stable-release approval, independently reviewed safe workflow enablement, maintainer npm action/2FA, provenance and actual published package verification; **current stable staging remains disabled**. |
| 7 | **HV-POST-01** — README/status and migration-guide finalization (both 0%) | Only after verified public stable: align docs, version/status labels, migration and install guidance with real npm/GitHub release state. |

**Accounting:** 84 existing task rows; 73 at 100%, one historically estimated at 55%, and 10 at 0%. `(73 × 100 + 55) / 84 = 87.56%` → **88% unweighted checklist**, unchanged by this documentation-only round. **Stable V2: NOT READY.** Do not add a new task or increase progress merely because this state was re-audited.

## Accepted engineering round — HV-TOOL-01: TypeScript 7 compiler modernization (2026-10-14)

- **Decision: ADOPT `typescript@7.0.2` for Haversine authoring/build.** This is a **dev/compiler** upgrade only; current npm version remains `2.0.0-alpha.1`. The existing packed declaration consumer already used TS7 before this migration. See [compiler migration assessment](../engineering/typescript-7-compatibility.md).
- **Current-master assessment:** the old bot PR [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152) had historical green checks but a stale base. The **temporary DRAFT probe [#163](https://github.com/DaniilSydorenko/haversine-geolocation/pull/163)** was created from then-current `master` with the same candidate package and lockfile; compiler/type declarations, 74 tests, Node/Chrome/other consumer CI passed. Its Nuxt job failed **twice during npm 10 dependency installation**, `Cannot read properties of null (reading 'edgesOut')`, prior to any consumer build. This matches [npm/cli#9787](https://github.com/npm/cli/issues/9787), not a proven TypeScript regression. The probe was **CLOSED, never merged**.
- **Independent CI blocker fix — [PR #164](https://github.com/DaniilSydorenko/haversine-geolocation/pull/164), ACCEPTED:** Nuxt-only `npm@11.21.0` pin in `.github/workflows/consumer-fixtures.yml`, preserving other framework jobs. Merge SHA `45b249389030085049842df9248945324d76031c`. **5/5 applicable exact-head jobs PASS and 5/5 triggered accepted master checks PASS**, including the Nuxt packed consumer.
- **Accepted TypeScript 7 upgrade — [PR #165](https://github.com/DaniilSydorenko/haversine-geolocation/pull/165), DONE:** built from accepted `master` `45b249389030085049842df9248945324d76031c` with only `package.json`, `package-lock.json` and the domain compatibility assessment. Immutable reviewed head `fb642c6c4e50fbb818ed7dc39cfa8a7f6afb60dd`, merged as `0f11963ed5dc3d0384ce8899924f56d2a4b97022`. **10/10 exact-head jobs SUCCESS**: TypeScript authoring typecheck/declaration emit, 74/74 tests, strict quality, package size and packed CJS/ESM/TS consumer; Node 22/24/26, Vite, Next, Nuxt, Chrome UMD, Gitleaks and baseline. **9/9 applicable post-merge domain checks SUCCESS**. Separate GitHub Autopilot `help/signal` is not domain validation.
- **PR hygiene:** original Dependabot [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152) was commented and **CLOSED without merge**, as its exact manifest/lockfile intent is accepted via #165. No mutation of the bot's branch; temporary #163 also closed, and no open Haversine PRs remain at this audit.
- **Limitations:** TS7 lacks a compatible programmatic compiler API; the successful Nuxt production bundle is **not** comprehensive `vue-tsc`/Volar/editor tooling support. No new support guarantee for Vue template compilers, exact Safari/Firefox versions or untested platforms. No npm version bump/publication, central HQ policy change, branch-admin rule or C01–C07 adoption.
- **Roadmap math:** Task *Evaluate and adopt TypeScript 7* now 100%; **84 tasks, 73 done, one historical/unverified 55% alpha feedback, 10 at 0%; rounded 88%**. The distinct Nuxt CI fix is covered within this engineering round, not added as a second checklist task to inflate progress. Beta, RC, stable gate and npm stable release remain **NOT READY**.
- **Next:** HV-ALPHA-02 external feedback and beta gate evidence; HV-SEC-01 branch protection remains owner-only. Continue bounded beta preparation with explicit maintainer release authority.

## HV-ALPHA-02 — accepted internal compatibility hardening, feedback gate still open (2026-10-14)

- **HQ coordination:** the received GitHub HQ → Haversine handoff confirms M5 OSS Flagship **100% accepted as an HQ infrastructure milestone** without transferring Haversine domain ownership or approving a product release. HQ PR #79 was **OPEN / not merged** at the coordination audit; it is not a dependency for Haversine execution. Central GRS and C01–C07 remain HQ-owned and owner-gated by `.github` issue #56. No HQ repository modification occurred.
- **Open feedback inventory:** no new externally filed alpha regressions were present in the **open** Haversine GitHub issue inventory; release issue [#74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74) remains open. Absence of an open issue is **not** evidence that all feedback channels or runtimes are clear.
- **Source-review findings:** V2 `nearest()` previously accepted malformed `origin` when `candidates=[]` and skipped coordinate validation, unlike calls with nonempty candidates. V2 browser geolocation support detection previously accepted a null or method-less geolocation provider. These were internal reproducible edge cases, **not** claimed customer incidents.
- **[PR #161](https://github.com/DaniilSydorenko/haversine-geolocation/pull/161), ACCEPTED internal hardening:** exact checked PR head `3ccac2d41c6a7c011839d85d7cda0511e15c232b`; merged into `master` as `31faada35eb6dc2b2cb9bcbbf32aa456c24fdacd`. Four changed paths: `src/v2/nearest.ts`, `src/v2/browser.ts`, `spec/v2-nearest.spec.ts`, `spec/v2-browser.spec.ts`. Valid empty candidate arrays still return `undefined`; existing native geolocation callbacks and error identity remain untouched. No public export, V1 semantics, package version or release workflow change.
- **Validation:** **74/74 tests** passed (was 72), strict quality, typecheck, build, size, tarball and packed CJS/ESM/TS consumers PASS. **10/10 applicable PR exact-head jobs PASS**: Node 22/24/26, Chrome UMD, Vite, Next.js, Nuxt, baseline, Gitleaks and Test and build. **9/9 applicable post-merge Haversine domain jobs PASS** on the accepted merge commit. GitHub Autopilot `help/signal` is unrelated. GRS path filter did not trigger for source/test-only change: **N/A, not PASS**.
- **Status:** This bounded, internally reproducible repair is accepted, but the *larger* `Alpha feedback and compatibility hardening` roadmap row remains the **historical 55% estimate**. Real-world alpha feedback, untested browser variants and beta acceptance remain unresolved; no npm publish or external beta execution occurred. **Unweighted score remains `(72 × 100 + 55) / 84 = 86%` rounded**, not a stable-readiness score.
- **Next domain work:** finish any additional *evidence-backed* alpha compatibility investigation without inventing external reports; evaluate [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152) TypeScript 7 separately under `HV-TOOL-01`. Owner-controlled branch protection and release approvals remain pending.

## Accepted engineering round — HV-ALPHA-01 (2026-10-14)

- **Baseline:** `master` `25cfa4dd56ae87f1fe0995ead306c2911b90c324`. Existing Dependabot PR #152 changes only `package.json` and `package-lock.json`, with no touched-path conflict.
- **PR [#155](https://github.com/DaniilSydorenko/haversine-geolocation/pull/155), DONE:** accepted merge `b425631f59c0140cc96f593608b0590ce90a2969`. Exact reviewed PR head `c2583af2e2110e79d80ecae9934bfe6b55978bb3`. Replaced broad `any` casts in V1/V2 tests, removed unsafe non-null assertions, tightened legacy TypeScript typing and documented four narrow ES2020 legacy own-property lint exceptions. Two historical generated JS stubs are excluded by exact path, not globally. The checked quality log reports **32 files, zero warnings/errors**; Vitest reports **72/72 tests passing**. **10/10 applicable exact-head PR jobs PASS** (Node 22/24/26, Vite, Next, Nuxt, Chrome UMD, baseline, Gitleaks, Test and build). All triggered post-merge `master` jobs PASS.
- **PR [#156](https://github.com/DaniilSydorenko/haversine-geolocation/pull/156), DONE:** accepted merge `ae615ba1980184d84533faa0aea4e200e16b8215`. Exact reviewed PR head `2e96301e2871ec3ca9fa41babb25bd6c48abc8ae`. `npm run quality -- --error-on-warnings --max-diagnostics=none` now runs in normal CI, non-publishing release-candidate validation and owner-controlled staged npm workflow. **2/2 applicable PR checks PASS** and **post-merge Test and build/Gitleaks PASS**. Manual release workflows were **NOT DISPATCHED** (N/A for publication/runtime execution); OIDC, staging confirmation, permissions and disabled stable-publication gate are unchanged.
- **Safety/ownership:** no npm publication, no new scheduled worker, no central `.github` policy or C01–C07 adoption, no unrelated dependency update. `master` remained the accepted branch. These are local Haversine-owned implementation and CI improvements.
- **Next:** HV-ALPHA-02 is still at a legacy **55% estimate pending actual external alpha feedback assessment**; HV-TOOL-01 major compiler PR #152 remains separately open; branch protection is an owner decision and stable 2.0.0 remains NOT READY.

## Accepted engineering round — HV-PROC-01 (2026-10-14)

- **Goal:** adopt the complete twelve-stage engineering delivery cycle as an explicit Haversine-local default, **separate from the twelve scoped queue tasks**. No scheduler, cross-repository authority, unapproved C01–C07 enforcement, npm account or release changes.
- **PR [#158](https://github.com/DaniilSydorenko/haversine-geolocation/pull/158), DONE:** merged implementation `c8a614f55f5591faf6fd4df4bc61f84afb08b46c`, based on `b29638cdc023b9d1384da1442202997d532e7c92`; exact-head proposal `29a0553c9a2d98c9fbc45f97aa88a00a8f45ce8b`. Added root `AGENTS.md`, [local twelve-step protocol](../engineering/round-protocol.md), [12-stage PR evidence template](../engineering/round-evidence-template.md) and links from the existing task queue, `CONTRIBUTING.md` and PR template. All 12 step headings and 12 evidence headings were verified. Existing Dependabot #152 touched only package and lockfile, no collision.
- **Checks:** on the immutable #158 head, **Test and build / Gitleaks / Validate GRS contract all PASS**. On the accepted merge commit, [Test and build](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487330557), [Gitleaks](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487330526) and [GRS](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487330487) also **PASS**. An unrelated GitHub Autopilot `help/signal` run was cancelled while another `help/signal` run succeeded; do not treat either as domain engineering validation.
- **Publication:** npm release, tag, registry/publication/2FA and external deployment checks **NOT APPLICABLE** to this documentation-only round. Central GitHub HQ protocol remains **proposed/non-enforcing**; this is a local, read-only-reference adoption.
- **Scoring:** 84 roadmap tasks, 72 complete, one historically estimated at 55%, 11 at 0%. The rounded **86% unweighted checklist** is **unchanged** by this accepted additional task; V2 stable readiness remains **NOT READY**.
- **Next:** HV-ALPHA-02 (audit real alpha feedback), HV-TOOL-01 (evaluate existing TypeScript 7 PR #152), followed by owner-gated beta/RC/stable stages. Maintain the twelve-step procedure for those substantive rounds.

## Local GRS dependency policy

The Haversine `.github/workflows/grs.yml` consumer pins the existing central GRS v1 validator and repository auditor to commit `ec50b680e6b3620772c1fbecbbc93349621ecfe1` in `DaniilSydorenko/.github`. Both checkouts use `persist-credentials: false` and the workflow grants only `contents: read`. This is a local, read-only dependency contract, not C01–C07 adoption.

**Update:** review central validator, auditor, schema and `oss-library` profile changes; replace the 40-character SHA through a scoped Haversine PR; require the GRS validation job and applicable existing local CI to pass on the exact PR head before merging. No floating branch fallback.

**Rollback:** revert the Haversine PR (or submit a new Haversine PR restoring the last CI-verified GRS commit SHA), then re-run the exact-head GRS and CI checks. Never downgrade central validation or introduce central policy edits as an emergency workaround. Central C01–C07 enforcement remains subject to GitHub HQ owner issue #56.
