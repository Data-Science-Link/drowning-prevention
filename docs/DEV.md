# Developer Setup

## Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) — fast Python package manager

Install uv if you don't have it:

```bash
curl -Lsf https://astral.sh/uv/install.sh | sh
# or on macOS via Homebrew:
brew install uv
```

## Install dependencies

```bash
cd guardian-goggles   # repo root
uv sync
```

This creates a `.venv` and installs all deps declared in `pyproject.toml`.

## Run tests

```bash
uv run pytest
```

To run with verbose output:

```bash
uv run pytest -v
```

## Python package

The importable package lives at `src/guardian_goggles/`. It is installed in editable mode by `uv sync`. Import it as:

```python
import guardian_goggles
```

## Mock API (wireframe backend)

The mock server lives in `backend/mocks/`. It has **zero npm deps** — only Node ≥ 18 stdlib.

```bash
# Start from the repo root:
node backend/mocks/server.js
# Default: PORT=8787, fixtures=data/fixtures, demoDate=2026-09-21

# Or via npm:
cd backend/mocks && npm start
```

Override any default with env vars:

```bash
PORT=9000 GG_DEMO_DATE=2026-09-22 node backend/mocks/server.js
```

Verify it's running:

```bash
curl http://localhost:8787/health
curl http://localhost:8787/v0/scenarios
```

Run the smoke test (no server needed — starts in-process):

```bash
node backend/mocks/smoke.js
# or:  cd backend/mocks && npm run smoke
```

See `backend/README.md` for the full endpoint table and `backend/mocks/SMOKE.md` for a sample run log.

## Mock API + wireframe together

The wireframe at `frontend/wireframe/` can run in two modes:

**Static mode** (no mock needed) — the wireframe fetches fixtures directly from `frontend/public/data/fixtures/`:

```bash
cd frontend/public && python -m http.server 8080
# open http://localhost:8080
```

**Live mock mode** — the wireframe detects the mock server and uses it instead:

```bash
# Terminal 1 — mock API:
node backend/mocks/server.js        # http://localhost:8787

# Terminal 2 — wireframe:
cd frontend/public && python -m http.server 8080
# open http://localhost:8080 — toggle "Mock API" in the UI
```

The frontend reads `MOCK_BASE_URL` (default `http://localhost:8787`) when the mock is available.

## Frontend / Pages preview

The static site lives in `frontend/public/`. To preview locally:

```bash
# Any static server works. Example with Python:
cd frontend/public
python -m http.server 8080
# then open http://localhost:8080
```

GitHub Actions deploys `frontend/public/` to GitHub Pages on every push to `main`.  
**Manual step:** Repo owner must set *Settings → Pages → Source* to **GitHub Actions** once.

## CI

Two required checks gate every PR:

- `security-audit` — runs dependency audit and basic security linting.
- `frontend-smoke` — validates the static HTML build.

CI also runs `uv run pytest` when `pyproject.toml` is present.

## Adding dependencies

```bash
# Runtime dependency:
uv add <package>

# Dev-only dependency:
uv add --dev <package>
```

Commit the updated `pyproject.toml`. The `uv.lock` file is gitignored by default; teams may choose to commit it for reproducible installs (see comment in `.gitignore`).
