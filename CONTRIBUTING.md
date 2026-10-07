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

## Development

1. Fork the repository and create a focused branch.
2. Install dependencies with the package manager used by the repository.
3. Make the smallest coherent change that solves the issue.
4. Add or update tests when behavior changes.
5. Run the relevant tests and build locally.
6. Open a pull request using the repository template.

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
