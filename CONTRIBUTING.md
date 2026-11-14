# Contributing

Thanks for considering a contribution to `haversine-geolocation`.

## Before you start

For non-trivial changes, open an issue first so the problem, scope, and expected behavior can be agreed before implementation.

Good contribution areas include:

- bug fixes;
- test coverage;
- documentation improvements;
- compatibility fixes;
- small, well-scoped maintenance improvements.

Large rewrites or unrelated feature expansion should not be started without prior discussion.

## Agent-managed engineering rounds

Substantive agent-managed Haversine engineering follows the [local 12-step engineering round protocol](docs/engineering/round-protocol.md) through discovery, implementation, exact-head CI, integration, post-merge verification, canonical roadmap sync and handoff. The [bounded V2 engineering queue](docs/roadmap/haversine-v2-agent-rounds.md) is **a list of tasks**, not those twelve process steps.

For these rounds, attach the [twelve-stage evidence template](docs/engineering/round-evidence-template.md) to a PR or linked record. No new scheduler, permission or release publication is implied. Routine external contributions can still use the simple development workflow below; do not treat local agent-process guidance as central or global governance.

## Development

1. Fork the repository and create a focused branch.
2. Install dependencies with `npm ci` (the repository includes an npm lockfile).
3. Make the smallest coherent change that solves the issue.
4. Add or update tests when behavior changes.
5. Run the local verification commands below.
6. Open a pull request using the repository template.

### Local verification

From the repository root, run:

```sh
npm ci
npm run quality -- --error-on-warnings --max-diagnostics=none
npm run typecheck
npm test
npm run build
```

These commands install the locked dependencies, check code quality, type-check, run the test suite, and build the package. For package-size changes, also run `npm run size:check`. Some additional compatibility and security checks run in GitHub Actions; local success does not replace required PR checks.

## Pull requests

A pull request should:

- explain the problem and the proposed change;
- stay focused on one logical unit of work;
- include verification steps;
- update documentation when public behavior changes;
- avoid unrelated formatting or dependency churn;
- never include credentials, tokens, private data, or generated secrets.

## Compatibility and releases

Changes to the public API should be treated carefully. Breaking changes require explicit discussion and an appropriate release plan.

## Security

Do not report vulnerabilities through public issues. Follow [SECURITY.md](SECURITY.md).
