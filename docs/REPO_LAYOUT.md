# Repository Layout

This is the canonical folder map for the Guardian Goggles monorepo.

```
guardian-goggles/          ← repo root (this file is at docs/REPO_LAYOUT.md)
│
├── README.md              ← Public landing page
├── SECURITY.md            ← Vulnerability disclosure policy
├── CODEOWNERS             ← PR review routing
├── pyproject.toml         ← uv-managed Python project (guardian_goggles package)
├── .gitignore
│
├── docs/                  ← Design documents (stable, versioned)
│   ├── PURPOSE.md         ← Problem, solution, non-goals, alert philosophy
│   ├── ARCHITECTURE.md    ← BLE+session+fusion overview; Stage ladder; Pages plan
│   ├── STRATEGY.md        ← Strategy overview: thesis, comps, PoC path, patent risk (entry point for #12 packs)
│   ├── REPO_LAYOUT.md     ← This file
│   ├── DECISIONS.md       ← Standing architectural / business decisions (ADR-lite)
│   └── DEV.md             ← Local development setup (uv, pytest, pages preview)
│
├── notes/                 ← Living working notes (updated freely by Michael / agents)
│   ├── STATUS.md          ← Current project status, recent milestones
│   └── OPEN_QUESTIONS.md  ← Open questions blocking or informing next decisions
│
├── frontend/              ← UI code
│   ├── README.md          ← Stub; next PR brings HTML wireframe
│   └── public/            ← Static site root (GitHub Pages source)
│       └── index.html     ← Placeholder "coming soon" page
│
├── backend/               ← Services and API
│   └── README.md          ← Stub; next PR brings mock API
│
├── data/                  ← Fixtures and simulated datasets
│   └── README.md          ← Stub; fixtures land with backend PR
│
├── strategy/              ← Market, legal, business-case docs
│   ├── README.md                      ← Index
│   ├── market-landscape.md            ← Competitor survey (Sep 2026)
│   ├── business-portfolio-exec.md     ← 1-page exec summary
│   ├── unit-economics.md              ← ASP model, COGS, CAC scenarios
│   ├── kill-vs-continue-checklist.md  ← Founder gate before Stage 2 escalation
│   ├── invent-around-checklist.md     ← WAVE US11715361 design-around checklist
│   └── iswimband-patent-analysis.md   ← Full patent landscape memo (research only)
│
├── science/               ← BLE, power, sensors, and PoC hardware research
│   ├── README.md                        ← Index
│   ├── 01-ble-submersion-signal-brief.md ← BLE physics 1-pager
│   ├── 02-power-battery-bom.md           ← Power budget + COGS BOM
│   ├── 03-alt-sensors-vs-ble.md          ← Wetness / IMU / pressure vs BLE comparison
│   └── 04-lean-poc-bom.md               ← Stage 1 PoC shopping list + backyard protocol
│
├── finance/               ← Unit-economics models and capital worksheets
│   ├── README.md                 ← Index
│   ├── unit-economics-v0.md      ← Narrative companion to CSV
│   ├── unit-economics-v0.csv     ← ASP / COGS / margin / CAC model
│   └── lean-phase-capital.md     ← Stage 0–1 capital plan; what is deferred and why
│
├── product/               ← Feature maps, user stories, acceptance criteria
│   └── README.md          ← Index of product docs
│
├── src/                   ← Python source package
│   └── guardian_goggles/
│       └── __init__.py
│
├── tests/                 ← Pytest suite
│   └── test_smoke.py
│
└── .github/
    ├── CODEOWNERS         ← (also at repo root for GitHub to pick up)
    ├── dependabot.yml     ← Automated dependency updates (pip + GitHub Actions)
    └── workflows/
        ├── ci.yml         ← Lint, test (security-audit + frontend-smoke checks)
        └── pages.yml      ← Build + deploy GitHub Pages on push to main
```

## Naming conventions

- `docs/` — stable design decisions and architecture. Edit deliberately; these are referenced by PRs and issues.
- `notes/` — living scratch. Michael and agents update these freely without full PR ceremony for minor edits.
- `strategy/`, `science/`, `finance/`, `product/` — domain research folders. Content migrates selectively; large raw dumps go here, distilled conclusions go into `docs/`.
- `frontend/public/` — everything under here is served by GitHub Pages verbatim.
- `src/guardian_goggles/` — importable Python package. CI runs `uv run pytest` against `tests/`.
