# Haversine V2 — Bounded Engineering Round Map

Status: local execution guide; **not** a second roadmap, task-status database, autonomous scheduler, or new governance framework.

- **Canonical progress and task names:** [Haversine V2 Human Roadmap](haversine-v2-human-roadmap.md). If this guide and that roadmap differ, the roadmap and accepted `master` evidence win.
- **Accepted implementation:** `DaniilSydorenko/haversine-geolocation` default branch `master`; never infer `main`.
- **Shared read-only GRS contract:** `.github/repository.json`, `.github/workflows/grs.yml` and its pinned central `DaniilSydorenko/.github` validator. The central schema and C01–C07 governance are **not** Haversine-owned.
- **Release authority:** maintainer controls npm account setup, prerelease/stable publication, 2FA approval and public release decisions. No agent may infer approval from a green CI job.
- **Execution:** on-demand domain engineering rounds, **always following all twelve stages** of the [local protocol](../engineering/round-protocol.md); this file does **not** start a Haversine Autopilot, job or Control Plane worker.
- **HQ reference:** the proposed, non-enforcing `reports/github-hq/ENGINEERING-ROUND-PROTOCOL.md` is useful for evidence discipline, not a new domain mandate.

## Mandatory execution contract: twelve steps for each round

**Local standard:** [Haversine 12-Step Engineering Round Protocol](../engineering/round-protocol.md), also discoverable from [root AGENTS.md](../../AGENTS.md). The [evidence template](../engineering/round-evidence-template.md) is a PR/issue record, not another roadmap.

For **every substantive on-demand engineering round**, execute or explicitly mark **N/A with reason** for each protocol stage, in order:

1. DISCOVERY — fresh `master` SHA, all open PR paths, local issues, release and CI facts.
2. RECONCILIATION — correct historical/draft claims against accepted evidence.
3. PLANNING — one coherent task or safe bounded batch, IDs and dependencies.
4. DESIGN — permitted and excluded paths, risk, tests, owner gates and rollback.
5. IMPLEMENTATION — fresh branch and scoped changes, no foreign-worker branch edits.
6. VALIDATION — strict quality, build, tests, compatibility, security and applicability.
7. PR REVIEW — rerun all-open-PR collision and complete diff/authority review.
8. EXACT-HEAD CI — only the current PR SHA's completed required checks count.
9. INTEGRATION OR BLOCKED — guarded merge by expected SHA, or explicit stop reason.
10. POST-INTEGRATION AUDIT — accepted `master`, triggered push checks and actual publication/runtime when relevant.
11. ROADMAP SYNC — update the single Haversine roadmap **after** acceptance.
12. HANDOFF — task outcomes, SHAs, links, blocked owner gates and next bounded work.

The twelve entries **below** are individual **work items**, not these process steps. A round may include multiple focused PRs; finish the whole sequence (including the accepted roadmap sync) before marking the round DONE. Unknown CI is not PASS, N/A is not PASS, and an agent has no authority to approve npm or governance gates.

**Default exclusion for every round:** no cross-repository mutation, no C01–C07 enforcement, no visibility changes, no automatic publishing or release tags, no unrelated dependency upgrades, no generated-state churn.

## Ordered, bounded rounds

### HV-ALPHA-01 — Resolve existing Biome warning debt

- **Owner:** Haversine domain agent; **dependency:** none. The original 2026-10-14 CI baseline had **27 Biome warnings**, now eliminated or narrowly justified in accepted PR #155 and enforced by the strict quality gates in accepted PR #156. This section preserves the historical task contract; consult the canonical roadmap before scheduling it again and do **not** repeat the cleanup without a new observed regression.
- **Allowed:** focused `src/**`, `spec/**`, and explicitly required Biome test/quality configuration only. Do not disable rules globally to make the warning count disappear; preserve characterization semantics.
- **Acceptance:** eliminate or explicitly justify each warning with a narrow documented exception; source tests, typecheck, build and CI stay green. This was verified for the accepted warning-cleanup round. Reopen only against a new reproducible regression; no public API changes.
- **Stop / rollback:** if an apparently mechanical fix changes V1 compatibility or V2 behavior, stop and split the task; revert the scoped PR if tests regress.

### HV-ALPHA-02 — Finish alpha feedback and compatibility hardening

- **Owner:** Haversine domain; **dependency:** review real alpha feedback and existing fixtures before selecting any change. The roadmap's prior 55% is a historical planning estimate, not an externally validated acceptance score.
- **Allowed:** targeted `spec/**`, `src/**`, `fixtures/**`, `docs/compatibility.md`, migration/API docs only when a proven issue requires them.
- **Acceptance:** classify real feedback or regressions, add reproductions for confirmed defects, verify published/packed CJS, ESM, TypeScript, Vite, Next.js, Nuxt and Chrome when impacted. Do not promise Safari/Firefox coverage without running those browsers.
- **Accepted internal compatibility increment (2026-10-14):** [PR #161](https://github.com/DaniilSydorenko/haversine-geolocation/pull/161) fixes empty-candidate invalid-origin validation and null/incomplete browser Geolocation provider detection with regression tests; exact-head and post-merge Node/framework/Chrome checks PASS, 74/74 tests. This does **not** establish user-reported alpha feedback completion, change the historical 55% roadmap estimate, or authorize beta publication. Continue from actual external feedback or new reproducible compatibility evidence; do not repeat these fixes.
- **Stop / rollback:** if no genuine defect or actionable feedback is found, report no implementation needed; do not invent feature work to satisfy a round.

### HV-TOOL-01 — Decide TypeScript 7 major upgrade (existing PR #152)

- **Owner:** Haversine domain; **dependency:** explicit review of upstream major changes and current TypeScript consumer contract.
- **Allowed:** PR #152's `package.json` / `package-lock.json` scope, with separately justified fixture/config changes if required; use existing PR where possible.
- **Acceptance:** compare current TypeScript 5.9.3 behavior with the proposed upgrade across packed declaration consumers and NodeNext; exact-head full CI + Node / framework compatibility evidence. Choose KEEP, DEFER or CLOSE with reason.
- **Stop / rollback:** do not merge based only on a green initial Dependabot PR; no compiler-major adoption if consumers regress.

### HV-SEC-01 — Decide default-branch protection

- **Owner:** repository owner (**OWNER DECISION**), not an autonomous agent. `master` was observed unprotected at the audit baseline.
- **Allowed:** read-only study of present merge practices and available repository rulesets. No admin changes in an agent round.
- **Acceptance:** owner accepts or declines a minimal branch-protection/ruleset proposal grounded in actual check names, without breaking the current workflow. If declined, record the accepted risk rather than blocking library releases arbitrarily.
- **Stop:** no silent admin enforcement, no synthetic mandatory C01–C07 checks.

### HV-BETA-01 — Validate and publish 2.0.0-beta.1

- **Owner:** Haversine domain for preparation, maintainer for release. **Dependencies:** relevant alpha acceptance and migration compatibility reviewed.
- **Allowed:** version/lockfile, release notes, changelog, release runbook and release-specific tests/workflow only as needed, in focused PR(s).
- **Acceptance:** candidate workflow, exact release-tag/commit validation, package/TypeScript/Node/consumer/Chrome gates, then explicit maintainer-controlled tag, GitHub prerelease, npm staged review and 2FA approval. Verify the public beta package and provenance after publication before calling DONE.
- **Stop:** never publish because GitHub HQ needs proof; no implicit account permission or bypassed staging check.

### HV-BETA-02 — Beta compatibility review

- **Owner:** Haversine domain; **dependency:** verified public beta.
- **Allowed:** reproducible fixes/tests and migration documentation relevant to collected beta feedback.
- **Acceptance:** record reviewed feedback, regressions fixed (or explicit no-change result), compatibility matrix and package checks remain green. New beta version only if necessary and separately approved.
- **Stop:** no gratuitous scope expansion or compatibility promises beyond tested environments.

### HV-RC-01 — Validate and publish 2.0.0-rc.1

- **Owner:** domain prepares; maintainer publishes. **Dependency:** accepted beta compatibility.
- **Allowed:** focused version, release notes, release verification and necessary bug fixes.
- **Acceptance:** release-candidate workflow and consumer matrix green on the exact version commit; explicit maintainer approval; independently verified published RC, provenance and migration guide.
- **Stop:** if public API or runtime behavior remains in dispute, return to beta hardening rather than force an RC.

### HV-RC-02 — Release-candidate hardening

- **Owner:** Haversine domain; **dependency:** tested RC.
- **Allowed:** isolated proven release blockers, tests and documentation.
- **Acceptance:** no unresolved release-blocking regressions in the documented support matrix; package contents, size, quality, math and public API contract pass all applicable checks.
- **Stop:** no breaking changes hidden in a release-only PR.

### HV-STABLE-01 — Owner stable-release approval gate

- **Owner:** maintainer, **OWNER DECISION**. **Dependency:** completed beta/RC evidence and migration/compatibility review.
- **Allowed:** release readiness review and documented accept/decline decision.
- **Acceptance:** explicit approval of stable 2.0.0 behavior and publish gate. Green infrastructure alone is insufficient.
- **Stop:** if approval is absent, keep stable publishing disabled.

### HV-STABLE-02 — Enable stable publication safely

- **Owner:** Haversine release engineer; **dependency:** HV-STABLE-01 approval. The current `npm-stage-release.yml` explicitly rejects stable versions.
- **Allowed:** scoped release workflow/runbook and corresponding regression checks; no changes to central GRS or npm account without owner action.
- **Acceptance:** stable `latest` staging remains manual, with exact tag ↔ version, review-before-publish, 2FA and trusted OIDC/provenance; prerelease `next` behavior stays unchanged. Validate workflow logic before merge.
- **Stop / rollback:** no direct push-to-npm step or bypass of maintainer approval; revert workflow change if safety checks regress.

### HV-STABLE-03 — Publish stable V2

- **Owner:** maintainer; **dependencies:** explicit stable approval and verified stable-capable manual workflow.
- **Allowed:** exact-version release artifacts only.
- **Acceptance:** approved exact tag, reviewed package, stage + maintainer 2FA, independently verified public `2.0.0` under `latest`, provenance, packed smoke consumers and no silent V1/latest status mismatch.
- **Stop:** agent may prepare evidence, but never initiate or approve stable publication autonomously.

### HV-POST-01 — Reconcile public documentation after stable

- **Owner:** Haversine domain; **dependency:** verified public stable.
- **Allowed:** `README.md`, `CHANGELOG.md`, `docs/migration/**`, release/reference docs and the canonical roadmap.
- **Acceptance:** npm stable/latest instructions, migration behavior, published tag links and release status all match observed artifacts; tests and applicable docs-triggered checks pass.
- **Stop:** do not claim publication before its evidence is available.

## Parallelism / collisions

- HV-ALPHA-01 and HV-ALPHA-02 can be split only after precise source-path collision analysis.
- HV-TOOL-01 shares package files with release/version work; serialize it against HV-BETA-01, HV-RC-01 and HV-STABLE-03.
- The canonical roadmap is a **single-writer reconciliation hotspot**; the owner updates it after each accepted round, not in every concurrent worker branch.
- HV-SEC-01 and HV-STABLE-01/03 are owner gates, **not** low-risk agent-safe tasks.
- At each round: read exact fresh GitHub HEAD/check runs; don't reuse the SHA, PR list or CI conclusions recorded in any earlier round.

## Coverage and scoring

This guide contains task **contracts**, not independent percentage estimates. The canonical roadmap's headline is an *unweighted checkpoint score* over current listed tasks, including actual newly discovered work, not a stable-release probability. Final stable readiness is **NOT READY** until owner-approved stable publication and verification.
