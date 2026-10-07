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
│   └── README.md          ← Index of strategy docs; full content migrates selectively
│
├── science/               ← BLE, power, sensors, and PoC hardware research
│   └── README.md          ← Index of science docs
│
├── finance/               ← Unit-economics models and capital worksheets
│   └── README.md          ← Index of finance docs
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
