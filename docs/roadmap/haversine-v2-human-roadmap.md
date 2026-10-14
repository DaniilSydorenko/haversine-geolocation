# Haversine V2 Human Roadmap

| Task | Color | Progress |
|---|---:|---:|
| **ALL ROADMAP — UNWEIGHTED TASK CHECKLIST** | 🟡 | **86%** |
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
| Alpha feedback and compatibility hardening | 🟠 | 55% |
| 2.0.0-beta.1 | 🔵 | 0% |
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
| 🆕 NEW — Evaluate TypeScript 7 major upgrade (PR #152) | 🔵 | 0% |
| 🆕 NEW — Decide default-branch protection / minimal ruleset | 🟠 | 0% |
| 🆕 NEW — Enable manual stable npm staging safely, after owner approval | 🔵 | 0% |

## Status and scoring methodology

**Re-audited 2026-10-14** against accepted default branch `master` at `67c81f450ab9ffe042f1f1a3788af8385a60b4c6`, the full open-PR/issue inventory, current accepted CI and the visible GitHub release inventory. The SHA is the *pre-reconciliation baseline*, not a frozen assertion about future `master`.

- **86% is an unweighted task-checklist score, NOT a stable-release probability or production-readiness score.** Calculation: 84 distinct task rows, 72 at 100%, one historical 55% alpha-hardening estimate and 11 at 0%: `(72 × 100 + 55) / 84 = 86%` (rounded). Tasks have different sizes; the score can drop when real missing work is discovered.
- **Stable V2 release readiness: NOT READY.** Public alpha `2.0.0-alpha.1` is verified; beta, RC, owner stable gate, stable-capable manual staging and public stable publication are not accepted. Never substitute this 86% checklist score for the release gate.
- **Legacy estimate disclaimer:** `Alpha feedback and compatibility hardening | 55%` was carried from earlier planning and is *not* independently measured from user feedback in this audit. The next alpha round must reconcile it with concrete evidence, and adjust the row without inventing progress.
- **Evidence-based row reconciliation:** `docs/compatibility.md` and Node 22/24/26 runtime matrix define the current feature-based policy (no untested Safari/Firefox version promises); `.github/workflows/browser-umd.yml` + `fixtures/browser-umd/index.html` provide the Chrome real-browser fixture; the accepted CI build log uses Vite 8.3.4 without the named native-config-loader ESM warning. Hence those three existing rows now read 100%.
- **Reconciled quality debt:** the prior **27 Biome warnings** have been removed or narrowly justified in accepted PR #155; PR #156 makes future warnings fail CI and both manual V2 validation/staging quality steps. Historical generated JS artifacts remain unchanged. The corrected release runbook is accepted; `master` remains unprotected (owner decision, no automated admin change); TypeScript 7 PR #152 remains open on package/lockfile; stable staging still explicitly rejects stable releases.
- **Task-round contract:** [Haversine V2 Bounded Engineering Round Map](haversine-v2-agent-rounds.md) provides the twelve *task IDs and dependencies*. Every substantive agent-managed round follows the distinct [12-Step Engineering Round Protocol](../engineering/round-protocol.md), discovered through [AGENTS.md](../../AGENTS.md); [round evidence template](../engineering/round-evidence-template.md) supplies PR/issue records, not a second tracker. No autonomous worker, scheduled Haversine Autopilot, mandatory new CI, or modification of central GitHub HQ is implied.
- **State authority:** accepted `master` and exact-head CI for implementation; the public npm/GitHub release for publication; this file for local task statuses. Pending PRs are proposals only. Do not change another project's roadmap or adopt central C01–C07 controls without GitHub HQ owner issue #56.

## Live state reconciliation — 2026-10-14 (read-only evidence review)

- **Accepted implementation and CI:** before this documentation-only reconciliation, `master` is `67c81f450ab9ffe042f1f1a3788af8385a60b4c6` (accepted roadmap PR #159). The [accepted Test and build](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487523502) and [Gitleaks](https://github.com/DaniilSydorenko/haversine-geolocation/actions/runs/38487523366) checks both concluded **SUCCESS**. Later successful `help/signal` runs are a separate GitHub Autopilot concern, not proof of Haversine engineering tests.
- **Open proposals:** the only observed open PR is [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152), a **TypeScript 5.9.3 → 7.0.2 major bump** touching only `package.json` and `package-lock.json`. Its proposed head is `604b2ce766843bf05865e2eefaf0e7f659585aa4`, with a historical PR base not current `master`; mergeability is transient and **not acceptance**. Do not mark HV-TOOL-01 complete or merge a compiler major without the defined NodeNext, declarations, packed consumer and framework compatibility review.
- **Open issue:** [#74](https://github.com/DaniilSydorenko/haversine-geolocation/issues/74) remains **OPEN** with alpha release criteria accepted and beta, RC, stable owner approval/staging/public stable verification still pending.
- **Release and package:** current accepted `package.json` is `2.0.0-alpha.1` using TypeScript `5.9.3`; latest visible Haversine V2 GitHub release is [`v2.0.0-alpha.1`](https://github.com/DaniilSydorenko/haversine-geolocation/releases/tag/v2.0.0-alpha.1), published on 2026-10-11. Previously accepted independent npm alpha smoke/provenance evidence stands; **a fresh npm-registry dist-tag read was not available in this reconciliation**, so do not present an unverified current dist-tag as freshly audited. No GitHub beta, RC or V2 stable release was found.
- **Owner and governance boundaries:** live `master` branch protection is **disabled**; proposed minimal protection remains owner-only (existing roadmap task). The existing local GRS consumer is pinned; HQ C01–C07 adoption and npm stable publication remain separate owner approvals.
- **Progress accounting:** the accepted 84 task rows are unchanged: 72 at 100%, one **historical/unverified** alpha hardening estimate at 55%, and 11 at 0%; `(72 × 100 + 55) / 84 = 86%` rounded. This is not a stable release-readiness metric. **No task status was promoted by this audit.**
- **Method:** this is an evidence-only 12-step engineering reconciliation cycle under the [local protocol](../engineering/round-protocol.md). Source-code/release mutation and new CI gates are **NOT APPLICABLE**. Any review-only sync PR must still pass its own exact-head applicable checks and be verified on the accepted default branch before handoff.

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
