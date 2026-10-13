# Haversine Engineering Agent Instructions

This file is the **local entry point** for engineering work in `DaniilSydorenko/haversine-geolocation`. Read it before planning or changing the repository.

## Source of truth and boundaries

- Default branch: **`master`**, not `main`. Accepted implementation is its current verified commit, never an open PR.
- Canonical task status: [V2 Human Roadmap](docs/roadmap/haversine-v2-human-roadmap.md); the [V2 Bounded Engineering Round Map](docs/roadmap/haversine-v2-agent-rounds.md) describes the ordered **task queue**, not another status database.
- **Required local execution method:** [12-Step Engineering Round Protocol](docs/engineering/round-protocol.md). Apply **all 12 steps to every substantive agent-managed round**. Use the [evidence template](docs/engineering/round-evidence-template.md) in a PR body or linked round record, not as a new status tracker.
- Architecture authority: [V2 ADR index](docs/architecture/README.md). Respect legacy V1 characterization, pure V2 runtime, browser isolation and packed ESM/CJS/TypeScript consumers.
- Central `DaniilSydorenko/.github` GRS and proposed HQ engineering protocol are external, **read-only reference inputs**. Do not interpret this local method as approval of central C01–C07 enforcement; that remains subject to HQ owner decision #56.
- GitHub Autopilot is a **separate workflow**. No Haversine Autopilot, scheduler, background task, bot or cross-repository authority is created here.

## Working default

1. **Own the whole engineering round**, from fresh discovery and reconciliation through design, implementation, validation, exact-head CI, integration, post-merge audit, roadmap sync and final handoff. Do not stop at merely opening a PR.
2. Select one coherent goal or a compatible, bounded batch. Multiple PRs are allowed when they preserve review and ownership boundaries. Do not create artificial work or treat each PR as a new round.
3. At the start **and before integration**, inspect *all* open PRs and changed paths, including pagination, collisions and owner gates. Create branches from the observed `master` SHA. Never alter someone else's branch.
4. For every stage, record evidence or **NOT APPLICABLE** with reason. Missing/queued checks are **UNKNOWN**, not green; filtered-out checks are **N/A**, not green. On every head change, re-run exact-head validation.
5. Treat npm publishing, tags, public API breaking changes, credentials, repository visibility, branch protection and stable release approval as maintainer-owned gates. A passing CI does not authorize them.
6. After accepted changes, verify `master`, update only the Haversine canonical roadmap with real evidence, and hand off IDs, commits, check links and remaining blockers. Avoid percentage inflation.

## Practical checks

Use `npm ci`, `npm run quality -- --error-on-warnings --max-diagnostics=none`, `npm run typecheck`, `npm test`, `npm run build`, `npm run size:check` and applicable packed consumers, Node compatibility, Chrome UMD, Gitleaks and GRS. Some run in GitHub Actions rather than locally; do not claim they were exercised when they were not.

**No permission to bypass safeguards.** If a required stage or maintainer decision cannot be completed, preserve the safe unmerged state and explain precisely what is blocked. Never represent a draft, staged package or proposed change as accepted/released.
