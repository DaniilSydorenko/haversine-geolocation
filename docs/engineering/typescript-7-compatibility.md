# HV-TOOL-01 — TypeScript 7 Compiler Migration Assessment

**Date:** 2026-10-14  
**Decision:** Adopt TypeScript **7.0.2** as the Haversine *development/compiler* dependency after fresh accepted-branch CI confirms the scoped change. This note records the decision's evidence and the limits of its coverage, not a stable npm publication or a guarantee for every third-party TypeScript integration.

## Context and ownership

- Target: `DaniilSydorenko/haversine-geolocation`, default branch **`master`**.
- Prior developer/compiler baseline: `typescript@5.9.3`; only the `typescript` devDependency and its npm lockfile graph are upgraded.
- The existing **packed TypeScript consumer fixture already used `typescript@7.0.2`** with `module: NodeNext`, `moduleResolution: NodeNext`, strict typing and `skipLibCheck: false`; it validated public root/browser/legacy declarations before this migration.
- The Haversine authored package uses the **`tsc` CLI** for `typecheck` and declaration generation; bundling is performed by Vite. No TypeScript compiler API consumption is added.
- Upstream migration guidance: [official TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). TS7 changes configuration defaults and removes deprecated compiler options; a programmatic compiler API is not available in TS7.0. This does **not** prove that Vue template tooling, `vue-tsc` or arbitrary editor extensions support TS7.

## Observed tests before acceptance

1. **Historical Dependabot PR [#152](https://github.com/DaniilSydorenko/haversine-geolocation/pull/152)** proposed only the version and lockfile change; its original green CI was attached to an older Haversine base and was not sufficient to merge.
2. A temporary fresh-master **assessment draft [#163](https://github.com/DaniilSydorenko/haversine-geolocation/pull/163)** independently tested the *exact* `#152` package+lockfile payload against accepted post-alpha fixes. TypeScript 7 passed strict repository quality, authoring typecheck, declaration emit, **74/74 tests**, packed CJS/ESM/TypeScript consumers, Node 22/24/26, Chrome Stable UMD, Vite, Next.js, Gitleaks and baseline checks. The only failing job was Nuxt at the **first npm install**, before its build, reporting `Cannot read properties of null (reading 'edgesOut')`.
3. One Nuxt job rerun reproduced exactly the npm 10 Arborist exception. This is a tracked upstream issue [npm/cli#9787](https://github.com/npm/cli/issues/9787), not a demonstrated TypeScript compiler or public declaration failure. The draft was **closed without merge**.
4. Scoped [CI PR #164](https://github.com/DaniilSydorenko/haversine-geolocation/pull/164) isolated **npm 11.21.0 for Nuxt only**, without changing other consumers or package/runtime code. All five PR jobs and all five applicable accepted `master` push checks passed, including Nuxt.
5. **This candidate's final exact-head** CI is required to prove the combined latest-master + TypeScript 7 state. Record CI and merge SHAs in the [canonical roadmap](../roadmap/haversine-v2-human-roadmap.md) only after acceptance.

## Acceptance and safety

- Authoring `npm run typecheck` and `npm run build:types` succeed with TypeScript 7.0.2; emitted declarations are installed and typechecked as **real package contents**.
- `npm ci`, strict Biome, Vitest, build, package-size budget, packed CommonJS/ESM/TypeScript consumers, Node 22/24/26, Vite, Next.js, Nuxt and Chrome UMD work on the **exact replacement PR head**.
- No changes to `tsconfig*.json`, public API, V1 semantics, `src/**`, release version, npm dist-tags, trusted publishing or central GRS. Existing TypeScript options retain their tested behavior, rather than anticipating unobserved upstream changes.
- Supersede/close stale original Dependabot PR #152 **only after** the replacement candidate is verified. Avoid mutating the Dependabot-owned branch or merging overlapping package/lockfile proposals.
- Rollback: revert the exact accepted compiler-upgrade PR and restore `typescript@5.9.3` lockfile, then rerun all applicable exact-head tests and CI.
- The migration is **developer tooling only**, not a V2 stable release, customer-facing feature or approval of future compiler majors.

## Known remaining limitations

- TypeScript 7's unavailable programmatic API constrains some integration tooling. A successful Nuxt **production consumer build** does not mean Nuxt/Vue IDE integrations or `vue-tsc` have been comprehensively tested.
- No new browser version claims; Node 26 remains a forward compatibility smoke rather than the supported baseline.
- Alpha external feedback and beta release readiness are separate tasks. Compiler migration does not promote the historical 55% alpha-hardening estimate.

**Decision outcome:** Accept the upgrade only with full combined-state CI and post-merge verification; otherwise **DEFER** with the failure evidence.
