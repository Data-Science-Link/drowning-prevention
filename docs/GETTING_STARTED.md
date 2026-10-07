# Getting Started

A newcomer path from zero to a running demo in under ten steps.

---

## What you need

| Prerequisite | Version | Notes |
|---|---|---|
| Git | Any recent | For cloning the repo |
| Python | 3.11+ | For tests and the Python scaffold |
| [uv](https://docs.astral.sh/uv/) | Latest | Fast Python package manager |
| Node.js | 18+ | Only needed for the optional mock API |
| A browser | Any modern | For the Pages demo — no install required |

---

## Steps

### 1 · Try the live demo first (no install)

Open the live Pages site:
[https://data-science-link.github.io/drowning-prevention/](https://data-science-link.github.io/drowning-prevention/)

Use the **Dev · Scenario** toolbar to step through the five alert states:
- `happy_path` — normal pool session
- `ble_blip_lt_10s` — brief blip; no alert
- `submersion_gt_10s` — SubmersionSuspect (red)
- `walkaway_lost` — Lost Connection (blue/amber)
- `multi_child_one_alert` — multi-child, one alert

> This is the quickest way to understand the product. No cloning needed.

---

### 2 · Clone the repo

```bash
git clone https://github.com/Data-Science-Link/drowning-prevention.git
cd drowning-prevention
```

---

### 3 · Install Python dependencies

```bash
# Install uv if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh
# macOS alternative: brew install uv

uv sync
```

This creates `.venv/` and installs all deps from `pyproject.toml`.

---

### 4 · Run the test suite

```bash
uv run pytest -v
```

All tests should pass. This confirms your Python + uv setup is healthy.

---

### 5 · Preview the app locally (static — no server)

```bash
cd frontend/public
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). This is the same app as the live Pages site — it loads fixtures directly from `data/fixtures/` without any server.

---

### 6 · (Optional) Run the mock API

The mock server enables `POST /sessions` and scenario-driven responses — useful if you're developing against a local backend.

```bash
# From the repo root (Node 18+ required, zero npm deps)
node backend/mocks/server.js
# Default: PORT=8787, fixtures=data/fixtures/
```

Then set the data source in the app UI to **mock** (toggle in the Dev toolbar).

Smoke-test the mock server:

```bash
node backend/mocks/smoke.js
```

Full mock API docs: [`backend/mocks/SMOKE.md`](../backend/mocks/SMOKE.md) · [`backend/openapi-v0.yaml`](../backend/openapi-v0.yaml)

---

### 7 · Orient on the docs

| You want to know… | Read |
|---|---|
| Why this exists, what it is / isn't | [`docs/PURPOSE.md`](PURPOSE.md) |
| Whether someone else can ship it | [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](PUBLIC_SERVICE_AND_CAPITAL.md) |
| Who the competitors are | [`docs/STRATEGY.md`](STRATEGY.md) |
| How the BLE + session + fusion tech works | [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) |
| What's locked vs open | [`docs/DECISIONS.md`](DECISIONS.md) |
| Where everything lives | [`docs/REPO_LAYOUT.md`](REPO_LAYOUT.md) |
| What to build next | [`README.md`](../README.md) step 7 |

---

### 8 · Read the strategy + science packs (optional depth)

These are appendix-depth research docs. Skim the READMEs to understand what's there:

- [`strategy/README.md`](../strategy/README.md) — market landscape, IP checklist, business case
- [`science/README.md`](../science/README.md) — BLE physics, power BOM, sensor comparison, lean PoC
- [`finance/README.md`](../finance/README.md) — unit economics, capital plan

---

### 9 · Next steps (if you want to contribute or take it forward)

1. **Open an issue or discussion** describing what you want to build.
2. **Branch from `main`** using `cursor/<slug>` or `feat/<slug>` naming.
3. **Open a pull request** — CI must pass (`security-audit`, `frontend-smoke`).
4. See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for conventions and [`docs/DEV.md`](DEV.md) for full local setup.

For the hardware path, start with [`science/04-lean-poc-bom.md`](../science/04-lean-poc-bom.md) and [`strategy/kill-vs-continue-checklist.md`](../strategy/kill-vs-continue-checklist.md).
