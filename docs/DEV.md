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
