# Repo documentation map

Pointers only — do not duplicate long docs here. Open the linked file; do not paste its contents.

## Core docs

| Topic | Path | Notes |
|---|---|---|
| Overview / setup | `README.md` | Project pitch, stage ladder, quick-start |
| Purpose / product framing | `docs/PURPOSE.md` | Mission, problem, user, stage goals |
| Architecture | `docs/ARCHITECTURE.md` | System design, stage ladder, component map — links to strategy/science/finance |
| **Strategy overview** | `docs/STRATEGY.md` | Core thesis, comps, PoC path, patent risk, kill/continue — entry point for #12 packs |
| Repo layout | `docs/REPO_LAYOUT.md` | Directory tree and conventions |
| Dev / how to run | `docs/DEV.md` | `uv sync` to install; `uv run pytest` to test |
| Standing product decisions | `docs/DECISIONS.md` | ADR-lite log — D-001 … D-007 (locked choices; open a PR to change) |
| Security policy | `SECURITY.md` | Vulnerability reporting, branch-protection notes |

## Living notes

| Topic | Path | Notes |
|---|---|---|
| Current status | `notes/STATUS.md` | Stage, milestone, recent activity |
| Open questions | `notes/OPEN_QUESTIONS.md` | Unresolved technical, product, legal questions |

## Area READMEs

| Area | Path |
|---|---|
| Backend | `backend/README.md` |
| Frontend | `frontend/README.md` |
| Data | `data/README.md` |
| Science | `science/README.md` |
| Strategy | `strategy/README.md` |
| Product | `product/README.md` |
| Finance | `finance/README.md` |

## Tests & CI

| Topic | Path | Notes |
|---|---|---|
| Test suite | `tests/` + `pyproject.toml` | `uv run pytest -v` (pytest config in pyproject.toml) |
| CI (lint + tests + frontend smoke) | `.github/workflows/ci.yml` | Jobs: `python-tests`, `frontend-smoke` |
| Pages deploy | `.github/workflows/pages.yml` | Deploys to https://data-science-link.github.io/drowning-prevention/ |
| Security audit | `.github/workflows/security-audit.yml` | Gitleaks secret scan + dependency audit |
| Dependabot | `.github/dependabot.yml` | Automated dependency updates |

## Open factory-relevant issues (as of 2026-10-07)

For context; do not close or edit these from the factory playbook.

| # | Title |
|---|---|
| [#9](../../issues/9) | Public-service framing: tee up a <$100K path for someone else to ship and save lives |
| [#10](../../issues/10) | Migrate HTML parent-app wireframe into frontend/ for Pages |
| [#11](../../issues/11) | Migrate mock API, OpenAPI, and scenario fixtures |
| [#12](../../issues/12) | Migrate strategy, science, and finance packs into docs/ (distilled) |
| [#13](../../issues/13) | Verify GitHub Pages deploy for drowning-prevention |
| [#14](../../issues/14) | Lean Stage-1 hardware PoC: BOM cart + backyard protocol (no child subjects) |
| [#15](../../issues/15) | Triage Dependabot major bumps (checkout/node/python/artifact/gitleaks) |
| [#16](../../issues/16) | Parked: Expo / native parent app port |

Agents: read this map, then open the linked files. Prefer linking over pasting.
