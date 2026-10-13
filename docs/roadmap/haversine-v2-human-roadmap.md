# Haversine V2 Human Roadmap

| Task | Color | Progress |
|---|---:|---:|
| **ALL ROADMAP** | 🟡 | **95%** |
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
| 🆕 NEW — Define supported Node.js/browser compatibility matrix | 🟠 | 70% |
| 🆕 NEW — Add compatibility CI across supported Node.js versions | 🟢 | 100% |
| 🆕 NEW — Add dedicated API reference documentation | 🟢 | 100% |
| 🆕 NEW — Add benchmark suite and performance baseline | 🟢 | 100% |
| 🆕 NEW — Add lint/format quality gate | 🟢 | 100% |
| 🆕 NEW — Add package-size regression budget | 🟢 | 100% |
| 🆕 NEW — Add formal CHANGELOG/release-notes baseline | 🟢 | 100% |
| 🆕 NEW — Correct README test-runner wording after Vitest migration | 🟢 | 100% |
| 🆕 NEW — Remove Vite native-config-loader ESM warnings | 🔵 | 0% |
| 🆕 NEW — Add real-browser UMD compatibility fixture | 🔵 | 0% |
| 🆕 NEW — Normalize package repository.url for npm | 🟢 | 100% |
| 🆕 NEW — Correct README published-alpha release status | 🟢 | 100% |
| 🆕 NEW — Pin central GRS control plane to validated immutable SHA | 🟢 | 100% |
| 🆕 NEW — Disable persisted credentials in read-only GRS checkouts | 🟢 | 100% |

## Local GRS dependency policy

The Haversine `.github/workflows/grs.yml` consumer pins the existing central GRS v1 validator and repository auditor to commit `ec50b680e6b3620772c1fbecbbc93349621ecfe1` in `DaniilSydorenko/.github`. Both checkouts use `persist-credentials: false` and the workflow grants only `contents: read`. This is a local, read-only dependency contract, not C01–C07 adoption.

**Update:** review central validator, auditor, schema and `oss-library` profile changes; replace the 40-character SHA through a scoped Haversine PR; require the GRS validation job and applicable existing local CI to pass on the exact PR head before merging. No floating branch fallback.

**Rollback:** revert the Haversine PR (or submit a new Haversine PR restoring the last CI-verified GRS commit SHA), then re-run the exact-head GRS and CI checks. Never downgrade central validation or introduce central policy edits as an emergency workaround. Central C01–C07 enforcement remains subject to GitHub HQ owner issue #56.
