# Releasing Haversine

Haversine uses a review-before-publish release model.

The automated GitHub workflow stages a package on npm through Trusted Publishing (OIDC). It does **not** directly make the version public. A maintainer must review the staged package and approve it with two-factor authentication.

## Security model

Release automation intentionally uses:

- GitHub-hosted runners;
- OpenID Connect (OIDC);
- npm Trusted Publishing;
- stage-only publisher permission;
- npm provenance generated through the trusted publishing flow;
- maintainer 2FA approval before a staged version becomes public.

The repository must not store a long-lived npm publish token.

The release workflow is:

```text
version PR
   ↓
CI green
   ↓
merge to master
   ↓
tag v<version>
   ↓
GitHub Release
   ↓
Stage npm Release workflow
   ↓
npm stage publish
   ↓
maintainer review
   ↓
2FA approval
   ↓
public npm version
```

## One-time npm setup

Before the first automated staged release:

1. Sign in to npm with the account that owns `haversine-geolocation`.
2. Ensure two-factor authentication is enabled.
3. Open the package publishing/trusted-publisher settings.
4. Add a GitHub Actions trusted publisher for:
   - repository: `DaniilSydorenko/haversine-geolocation`;
   - workflow: `npm-stage-release.yml`.
5. Grant **stage publish** permission only. Do not grant direct publish unless the release policy is intentionally changed later.
6. Complete the first staged release soon after creating the trust relationship so npm can validate/bind it.
7. After trusted publishing is proven, set package publishing access to require 2FA and disallow traditional publish tokens.
8. Revoke obsolete automation publish tokens, if any exist.

npm trusted-publisher configuration is an account/package action and cannot be completed from repository code alone.

## Version sequence

The planned V2 sequence is:

```text
2.0.0-alpha.1
2.0.0-alpha.N
2.0.0-beta.1
2.0.0-beta.N
2.0.0-rc.1
2.0.0
```

Do not advance phases mechanically. Alpha, beta and release-candidate transitions should reflect actual compatibility confidence.

## Preparing a release PR

Start from an up-to-date `master`.

For the first V2 alpha:

```bash
npm version 2.0.0-alpha.1 --no-git-tag-version
```

This must update both `package.json` and `package-lock.json`.

The release PR should also update:

- release notes / changelog;
- README status where appropriate;
- migration documentation if the contract changed.

Before merge, the normal CI and consumer-fixture matrix must be green.

## Creating a prerelease

After the version PR is merged:

1. Create tag `v<package version>` from the exact release commit.
2. Create a GitHub Release from that tag.
3. Mark alpha, beta and RC releases as **prerelease**.
4. Publish the GitHub Release.

The `Stage npm Release` workflow verifies that:

- the Git tag equals `v<package.json version>`;
- prerelease semver versions are attached to GitHub prereleases;
- stable semver versions are attached to non-prerelease GitHub releases;
- typecheck, tests and build succeed before npm staging.

Prerelease versions are staged with npm dist-tag:

```text
next
```

Stable versions are staged with:

```text
latest
```

## Reviewing the staged npm package

After the workflow succeeds, the package is staged but not public.

Review it using npmjs.com's staged-package UI or the npm CLI.

Useful commands:

```bash
npm stage list haversine-geolocation
npm stage view <stage-id>
npm stage download <stage-id>
```

Inspect at least:

- package version;
- dist-tag;
- tarball contents;
- generated declarations;
- root ESM/CJS entry points;
- `./browser` entry point;
- `./legacy` entry point;
- release notes.

If the staged package is correct, approve it with 2FA:

```bash
npm stage approve <stage-id>
```

If anything is wrong, reject it instead:

```bash
npm stage reject <stage-id>
```

A staged semver version is reserved. If a staged version must be replaced, reject it before trying to stage that same version again.

## Provenance

When npm Trusted Publishing is used from this public GitHub repository, npm automatically creates provenance attestations for supported trusted-publishing releases.

After publishing, verify the package's provenance indicator on npm and optionally verify installed dependency attestations with:

```bash
npm audit signatures
```

## Emergency rule

Never bypass a failing release check by publishing manually from an unverified local build.

If the release workflow fails:

1. diagnose the failed gate;
2. fix the repository;
3. create a new verified release candidate if the version has already been staged/reserved;
4. rerun the normal release process.
