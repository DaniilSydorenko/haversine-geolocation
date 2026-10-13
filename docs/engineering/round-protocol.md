# Haversine — 12-Step Engineering Round Protocol

**Status: ADOPTED as a local, on-demand Haversine engineering practice.** It is procedural guidance for work in `DaniilSydorenko/haversine-geolocation`, **not** new GitHub governance, a scheduler, automatic merge/publishing system, additional mandatory CI, or a second status store. The central GitHub HQ [Engineering Round Protocol](https://github.com/DaniilSydorenko/.github/blob/main/reports/github-hq/ENGINEERING-ROUND-PROTOCOL.md) is a **proposed/non-enforcing reference**, not inherited central authorization.

## Two different sets of twelve

- The **twelve steps in this document** are the required method for **each substantive Haversine engineering round**.
- The **twelve task contracts** in [V2 Bounded Engineering Round Map](../roadmap/haversine-v2-agent-rounds.md) are an ordered, mutable *work queue* (e.g. HV-ALPHA-02, HV-TOOL-01, beta and RC). A task can require several PRs; a coherent batch can implement more than one non-conflicting task. This document does not replace that queue.
- A **round** means one bounded delivery cycle: live discovery → working implementation/proof or an explicitly blocked result → roadmap reconciliation → complete handoff. It does not mean one PR or one chat message.
- For no-change investigations and blocked/owner-gated rounds, still evaluate all twelve steps. Mark irrelevant actions **NOT APPLICABLE (why)** rather than fabricating a branch, merge, deployment, or progress.

## Authorities, evidence and shared constraints

| Concern | Authority / correct evidence |
|---|---|
| Implemented code | Accepted `master` commit and applicable post-merge GitHub Actions |
| Planned tasks and completion | [V2 Human Roadmap](../roadmap/haversine-v2-human-roadmap.md) (single-writer reconciliation) |
| Bounded work and dependencies | [V2 Bounded Engineering Round Map](../roadmap/haversine-v2-agent-rounds.md) |
| API/compatibility decisions | [Architecture ADRs](../architecture/README.md), characterization tests and [compatibility matrix](../compatibility.md) |
| GitHub proposals | Open PR exact head and per-file diff (never accepted state) |
| Published versions | Real public npm and GitHub releases, package provenance and external consumer checks |
| Central controls | Read-only pinned GRS consumer; HQ-owned C01–C07 decisions are outside this repository |

Run only on explicit/on-demand project work; **do not** install an automation, modify GitHub HQ, absorb GitHub Autopilot, or infer permissions to change branch rules or publish packages. An owner gate is **BLOCKED** until explicitly approved; no owner decision may be impersonated by an agent. Stable `2.0.0` remains unapproved and unpublished until proved otherwise.

## The mandatory twelve steps

### 1. DISCOVERY — current live state

Read the current `master` SHA, local roadmap, ADRs, this protocol, task contracts, relevant issues, release/package state, required check configuration and **all open PRs with their complete changed-file sets** (follow pagination). When applicable, inspect public release/runtime evidence. Record inaccessible sources and actual discovery time. **Gate:** no mutation based on a remembered SHA or incomplete PR inventory.

### 2. RECONCILIATION — reality versus claims

Compare accepted code/release/CI with roadmap percentages, old round notes and open proposals. Mark drift, missing tests, stale issue states, dependency conflicts and already-completed work. Distinguish **DONE / OPEN / BLOCKED / DEFERRED / NOT APPLICABLE**. **Gate:** no automatic progress for draft changes; do not manufacture work if the task is already accepted.

### 3. PLANNING — meaningful bounded delivery

Choose one high-value task ID or non-conflicting group from the Haversine queue. Define the user-facing outcome, dependencies, accountable owner(s), and what can realistically finish as one cycle. Prefer substantial coherent engineering over PR-count inflation. **Gate:** identified goal and explicit maintainer-gated subtasks.

### 4. DESIGN — executable change contract

Record expected modified paths, forbidden paths, API/runtime/security impact, validation matrix, acceptance criteria, rollback, budget for diagnosing repeat failures, and stop/owner gates. Note shared hotspots (`package.json`, lockfile, release files, `docs/roadmap/haversine-v2-human-roadmap.md`). **Gate:** cannot edit unscoped paths or broaden ownership silently.

### 5. IMPLEMENTATION — isolated authorized edits

Recheck latest `master` and open-PR collisions before mutation. Branch from a verified immutable base SHA. Keep changes inside the agreed domain scope; preserve V1 characterization and V2 contracts. Use multiple scoped commits or PRs where helpful, but treat them as one delivery until verified. **Gate:** do not alter other workers' branches, central governance, credentials or npm account.

### 6. VALIDATION — tests, build and evidence

Inspect the actual diff; run or require `npm ci`, strict Biome quality, typecheck, Vitest, build, size checks, packed CJS/ESM/TS consumers, and applicable Node 22/24 (+ forward Node 26), Vite/Next/Nuxt, Chrome UMD, Gitleaks and path-triggered GRS. Record **PASS / FAIL / UNKNOWN / NOT APPLICABLE** by check. Avoid claims about browsers or release workflows not executed. **Gate:** investigate failures and rerun; never hide failures or weaken gates just to obtain green.

### 7. PR REVIEW — collisions and boundaries again

Create/review a complete PR diff. Re-fetch **all currently open PR** changed paths before acceptance, including paginated listings; explicitly classify collisions and coordination risks rather than assuming a shared filename is a merge conflict. Confirm task scope, stable API, authority, reviewable changes, rollback and no secrets. **Gate:** unresolved collisions or ownership violations block merge.

### 8. EXACT-HEAD CI — immutable acceptance candidate

Resolve the exact PR HEAD SHA and **required/applicable** check runs for that SHA. Only terminal `success` for the precise head counts; a pending, failed, missing, or outdated run is not success. If HEAD moves, the earlier evidence expires. A path-filtered GRS/workflow is **N/A**, not a pass. For manually triggered npm workflows, do not dispatch a release merely to prove a documentation/process change. **Gate:** no merge with unverified required checks.

### 9. INTEGRATION OR BLOCKED — guarded decision

Immediately before merge, re-verify base SHA, open PR paths, clean scope, expected HEAD, completed required CI and maintainer authorization. Use an immutable expected-head merge guard; never force push or bypass protection. If approval or verification is missing, preserve the PR and report **BLOCKED** (or **DEFERRED**). **Gate:** never infer release, admin or C01–C07 consent from passing CI.

### 10. POST-INTEGRATION AUDIT — accepted artifact and runtime

Read the merged PR result, live `master` commit and accepted files. Verify triggered post-merge checks; separately check public npm release, tag, provenance, deployed/runtime behavior when the task actually changes them. No push job is **UNKNOWN** until completed, and docs-only publication checks are **N/A**. **Gate:** do not call a release or deployment done merely because a merge succeeded.

### 11. ROADMAP SYNC — only accepted evidence

Update **only** `docs/roadmap/haversine-v2-human-roadmap.md` after completed acceptance, with actual task status, new discoveries, evidence SHAs/links and reproducible unweighted score. Keep the roadmap a single-writer hotspot, preferably in a small follow-up PR. A new genuine task may cause the score to drop; never conceal it. Preserve historical 55% alpha-hardening as an estimate until separately audited. **Gate:** unmerged proposals must not earn DONE; no cross-project roadmap edit.

### 12. HANDOFF — auditable closure

Report the task IDs and outcomes, exact base/PR/merge/master SHAs, PR and CI links, scoped changes, release state, N/A checks, open PR overlap, owner gates and the next concrete bounded task. Distinguish **implemented**, **CI verified**, **merged**, **published**, and **externally verified**. If anything remains pending or blocked, state precisely what and why; do not promise invisible/background continuation.

## Operational evidence and outcomes

Use the [Round Evidence Template](round-evidence-template.md) in the task PR description or a linked, reviewable issue/PR comment. It contains all twelve stage headings and compact evidence slots. **It is not a new roadmap or persistent runtime database.** Multiple related PRs may share one round record, with per-PR exact heads and checks; after each merge, record its accepted SHA. If an implementation PR is merged before roadmap synchronization, the round is still **IN PROGRESS** until step 11/12 is complete.

Every step must end in **PASS**, **BLOCKED**, or **N/A with a reason** (where relevant, use **UNKNOWN** for pending/unavailable evidence). No step may be silently skipped. A failed round is not a zero-progress failure: preserve actionable diagnosis and safely reviewed patches, but do not mark unmerged work as completed.

### Failure and escalation policy

- Re-run after a *distinct diagnosis* (not blind retry loops). On repeated unexplained failure, stop integration and report evidence.
- Replan if scope broadens to a breaking public API, external source/package ownership, major dependency migration, or release-account action.
- **Owner-only:** npm publication/2FA, release tags and public stable approval, admin/branch-protection enforcement, credentials, repository visibility, central GitHub HQ C01–C07.
- Never create an always-on Haversine worker, an unrelated repository, or a second canonical task tracker as part of this method.

## Proof of adoption

The protocol is discoverable through root [AGENTS.md](../../AGENTS.md), applied to the [bounded round queue](../roadmap/haversine-v2-agent-rounds.md), linked from [CONTRIBUTING.md](../../CONTRIBUTING.md) and the [PR template](../../.github/PULL_REQUEST_TEMPLATE.md), and validated first by its own scoped implementation PR with twelve-stage evidence. This is a local execution contract; **not** a claim that every future external contributor or other agent can be made to obey it automatically.
