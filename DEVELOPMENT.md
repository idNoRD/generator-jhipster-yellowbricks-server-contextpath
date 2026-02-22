# Development

## Prerequisites

- Node.js `^22.18.0 || >=24.11.0`
- JHipster 9 (`npm install -g generator-jhipster@9.0.0-beta.3`)

## Setup

```bash
npm install
```

## Running tests

```bash
npm test
```

This runs Prettier, ESLint, and Vitest in sequence. To run only tests:

```bash
npm run vitest
```

To update snapshots after intentional output changes:

```bash
npm run update-snapshot
```

## Testing locally against a real JHipster project

### 1. Link the blueprint globally

From the root of this repository:

```bash
npm link
```

### 2. Generate a JHipster app with the blueprint

Create an empty directory, create a `.yo-rc.json` with the blueprint config, then run JHipster:

```bash
mkdir /tmp/test-app && cd /tmp/test-app
echo '{"generator-jhipster-yellowbricks-spring-boot-contextpath":{"contextPath":"/jh/"}}' > .yo-rc.json
jhipster --blueprints yellowbricks-spring-boot-contextpath
```

The generator will patch `src/main/resources/config/application.yml` during the `POST_WRITING` phase and add (or overwrite) `context-path` with the configured context path.

### 3. Verify the result

```bash
grep 'context-path' src/main/resources/config/application.yml
```

Expected output:

```
    context-path: /jh/
```

### 4. Unlink when done

```bash
npm unlink -g generator-jhipster-yellowbricks-spring-boot-contextpath
```

## Releasing to npm

Releases are fully automated via **semantic-release**. There is no manual version bump or `npm publish` step.

### How it works

Every push to `main` triggers the `Release` GitHub Actions workflow. semantic-release inspects the commit messages since the last release and, if there are releasable commits, it:

1. Determines the next version (patch / minor / major)
2. Updates `package.json`
3. Commits the version bump (`chore(release): x.y.z [skip ci]`)
4. Creates a git tag and a GitHub release with generated release notes

The `Publish Package` workflow then publishes to npm via OIDC (no stored secrets).

If there are no releasable commits, nothing happens.

### Commit message convention

semantic-release uses [Conventional Commits](https://www.conventionalcommits.org/) to determine the version bump:

| Commit prefix      | Example                                | Version bump |
| ------------------ | -------------------------------------- | ------------ |
| `fix:`             | `fix: handle missing servlet section`  | patch        |
| `feat:`            | `feat: support multiple context paths` | minor        |
| `BREAKING CHANGE:` | `feat!: rename contextPath option`     | major        |

Commits with other prefixes (`chore:`, `docs:`, `test:`, etc.) do not trigger a release.

Emoji prefixes are supported (e.g. `🐞 fix: ...`, `✨ feat: ...`).

### One-time setup on npmjs.com

Before the first automated publish, configure a Trusted Publisher on npmjs.com so npm accepts the OIDC token from GitHub Actions (no stored secret needed):

1. Go to **npmjs.com → your package → Settings → Trusted Publishers**
2. Add GitHub Actions:
   - Owner: `idNoRD`
   - Repository: `generator-jhipster-yellowbricks-spring-boot-contextpath`
   - Workflow: `publish.yml`
