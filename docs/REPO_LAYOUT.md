# Repository Layout

This is the canonical folder map for the drowning-prevention monorepo.

```
drowning-prevention/       ← repo root (this file is at docs/REPO_LAYOUT.md)
│
├── README.md              ← Newcomer landing page — 7-step reader journey
├── SECURITY.md            ← Vulnerability disclosure policy
├── CONTRIBUTING.md        ← PR and branch conventions
├── CODEOWNERS             ← PR review routing
├── pyproject.toml         ← uv-managed Python project (guardian_goggles package)
├── .gitignore
│
├── docs/                  ← Design documents (stable, versioned)
│   ├── PURPOSE.md         ← Problem, solution, non-goals, alert philosophy
│   ├── PUBLIC_SERVICE_AND_CAPITAL.md ← Handoff overview, ~$100K path, kill criteria
│   ├── ARCHITECTURE.md    ← BLE+session+fusion overview; Stage ladder; Pages plan
│   ├── STRATEGY.md        ← Strategy overview: thesis, comps, PoC path, patent risk
│   ├── GETTING_STARTED.md ← Newcomer path: clone → Pages → optional mock → next steps
│   ├── REPO_LAYOUT.md     ← This file
│   ├── DECISIONS.md       ← Standing architectural / business decisions (ADR-lite)
│   └── DEV.md             ← Local development setup (uv, pytest, mock server, pages preview)
│
├── notes/                 ← Living working notes (updated freely by Michael / agents)
│   ├── STATUS.md          ← Current project status, recent milestones
│   ├── OPEN_QUESTIONS.md  ← Open questions blocking or informing next decisions
│   └── MIGRATION_STATUS.md ← Migration inventory: Keep / Link-only / Drop decisions
│
├── frontend/              ← UI code
│   ├── README.md          ← Overview and structure
│   ├── public/            ← GitHub Pages source (live demo)
│   │   ├── index.html     ← Parent app wireframe (served at Pages URL)
│   │   ├── app.js         ← Scenario timeline and alert rendering
│   │   ├── styles.css     ← App chrome styles
│   │   └── data/fixtures/ ← Fixture copy for Pages (offline-capable demo)
│   └── wireframe/         ← Wireframe source + documentation
│       ├── index.html     ← Same entry point as public/
│       ├── app.js
│       ├── styles.css
│       ├── shots/         ← Annotated screenshots (01-happy … 07-family-invite)
│       └── README.md      ← Wireframe technical notes
│
├── backend/               ← Services and API
│   ├── README.md          ← Mock server overview
│   ├── mocks/             ← Zero-dep Node mock API (optional local backend)
│   │   ├── server.js      ← Mock server (Node 18+, no npm deps)
│   │   ├── smoke.js       ← Smoke-test script
│   │   ├── SMOKE.md       ← Smoke-test docs
│   │   └── package.json   ← npm convenience wrapper
│   ├── openapi-v0.yaml    ← OpenAPI spec (v0)
│   └── open-tech-questions.md ← Backend / API open questions
│
├── data/                  ← Fixtures and simulated datasets
│   ├── README.md
│   └── fixtures/          ← JSON scenario fixtures (demo works without mock server)
│       ├── index.json
│       ├── scenario-contract.v0.json
│       ├── household_free.json / household_sub.json
│       └── scenarios/     ← happy_path, ble_blip, submersion, walkaway, multi_child
│
├── strategy/              ← Market, legal, business-case docs (appendix depth)
│   ├── README.md                      ← Index
│   ├── market-landscape.md            ← Competitor survey (Sep 2026)
│   ├── business-portfolio-exec.md     ← 1-page exec summary
│   ├── unit-economics.md              ← ASP model, COGS, CAC scenarios
│   ├── kill-vs-continue-checklist.md  ← Founder gate before Stage 2 escalation
│   ├── invent-around-checklist.md     ← WAVE US11715361 design-around checklist
│   └── iswimband-patent-analysis.md   ← Full patent landscape memo (research only)
│
├── science/               ← BLE, power, sensors, and PoC hardware research
│   ├── README.md
│   ├── 01-ble-submersion-signal-brief.md ← BLE physics 1-pager
│   ├── 02-power-battery-bom.md           ← Power budget + COGS BOM
│   ├── 03-alt-sensors-vs-ble.md          ← Wetness / IMU / pressure vs BLE comparison
│   └── 04-lean-poc-bom.md               ← Stage 1 PoC shopping list + backyard protocol
│
├── finance/               ← Unit-economics models and capital worksheets
│   ├── README.md
│   ├── unit-economics-v0.md      ← Narrative companion to CSV
│   ├── unit-economics-v0.csv     ← ASP / COGS / margin / CAC model
│   └── lean-phase-capital.md     ← Stage 0–1 capital plan; what is deferred and why
│
├── product/               ← Feature maps, user stories, acceptance criteria
│   ├── README.md
│   ├── wireframe-scope.md        ← Wireframe cut and ownership rules
│   └── wireframe-acceptance.md   ← Wireframe acceptance criteria and sign-off
│
├── src/                   ← Python source package
│   └── guardian_goggles/
│       └── __init__.py
│
├── tests/                 ← Pytest suite
│   └── test_smoke.py
│
└── .github/
    ├── CODEOWNERS
    ├── dependabot.yml
    └── workflows/
        ├── ci.yml               ← Lint, test (security-audit + frontend-smoke)
        ├── pages.yml            ← Build + deploy GitHub Pages on push to main
        └── security-audit.yml  ← Gitleaks secret scan + dependency audit
```

## Naming conventions

- `docs/` — stable design decisions and architecture. Edit deliberately; these are referenced by PRs and issues.
- `notes/` — living scratch. Michael and agents update these freely without full PR ceremony for minor edits.
- `strategy/`, `science/`, `finance/`, `product/` — domain research folders. Content migrates selectively; large raw dumps go here, distilled conclusions go into `docs/`.
- `frontend/public/` — everything under here is served by GitHub Pages verbatim.
- `src/guardian_goggles/` — importable Python package. CI runs `uv run pytest` against `tests/`. The package name is a code-level identifier and has not been renamed.
