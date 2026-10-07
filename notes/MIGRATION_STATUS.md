# Migration Status

> **Living note — updated by Michael and agents.** Last updated: 2026-10-07 (issue #28 pass).

Tracks what has landed in this repo vs what remains only on the local Grok Bot computer
(`/workspace/guardian-goggles/`), and the disposition decision for each candidate.

---

## Already on `main` (migrated / landed)

| Area | Path in repo | Notes |
|------|-------------|-------|
| Purpose / public-service / handoff | `docs/PURPOSE.md`, `docs/PUBLIC_SERVICE_AND_CAPITAL.md` | Public-service posture |
| Strategy entry + packs | `docs/STRATEGY.md`, `strategy/*` | Distilled via #12 / #25 |
| Science briefs | `science/01-ble-submersion-signal-brief.md` … `04-lean-poc-bom.md` | 4 briefs; long-form local originals listed as Drop below |
| Finance models | `finance/unit-economics-v0.md`, `finance/unit-economics-v0.csv`, `finance/lean-phase-capital.md` | Companion CSV kept |
| HTML wireframe + Pages demo | `frontend/public/`, `frontend/wireframe/`, `frontend/wireframe/shots/` | Live: https://data-science-link.github.io/drowning-prevention/ |
| Fixtures (data) | `data/fixtures/` (+ copy under `frontend/public/data/fixtures/`) | Demo works without mock server |
| Mock API + OpenAPI | `backend/mocks/`, `backend/openapi-v0.yaml` | Landed via #26 |
| Factory playbook | `.factory/` | Liability gates, sync-main, merge authority, Evidence screenshots |
| CI / security / Pages | `.github/workflows/*`, CODEOWNERS, SECURITY | Ruleset + admin bypass retained |
| UV Python smoke package | `pyproject.toml`, `src/`, `tests/` | Scaffold |
| Architecture | `docs/ARCHITECTURE.md` | Stage ladder, BLE/session thesis, alert fusion |
| Standing decisions | `docs/DECISIONS.md` | D-001 … D-007 |
| Dev setup | `docs/DEV.md` | `uv sync`, mock server, Pages preview |
| Getting started (newcomer) | `docs/GETTING_STARTED.md` | Added this PR (#28) |

---

## Local-only candidates — disposition decisions

Candidates from the shared Grok Bot computer at `/workspace/guardian-goggles/`.
These were **not** dumped wholesale; each has a deliberate disposition.

### Strategy (local-only or fuller than repo)

| Local file | Disposition | Reason |
|-----------|------------|--------|
| `strategy/business-portfolio.md` (full) | **Drop** — local archive | Exec summary `strategy/business-portfolio-exec.md` is in repo; full version is a verbose working draft; no new information |
| `strategy/business-case.md` | **Drop** — local archive | Thesis and economics distilled into `docs/STRATEGY.md` + `strategy/unit-economics.md`; wholesale copy would duplicate |
| `strategy/early-strategy-brief.md` | **Drop** — local archive | Superseded by `docs/STRATEGY.md` distillation; ASP locked |
| `strategy/lean-phase-plan.md` | **Drop** — local archive | Content is in `finance/lean-phase-capital.md` and `science/04-lean-poc-bom.md` |
| `strategy/counsel-deferred-poc.md` | **Link-only** | Summarized in `finance/lean-phase-capital.md`; legal posture in `docs/DECISIONS.md` D-003; no separate migration needed |
| `strategy/status-package-draft.md` | **Drop** — superseded | Superseded by `notes/STATUS.md` and issue-tracker milestones |

### Science

| Local file | Disposition | Reason |
|-----------|------------|--------|
| `science/01-ble-submersion-signal.md` (long form) | **Drop** — brief in repo | `science/01-ble-submersion-signal-brief.md` captures the distilled physics; the long-form local note is working research not needed in the public repo |

### Product

| Local file | Disposition | Reason |
|-----------|------------|--------|
| `product/user-stories-outline.md` | **Drop** — local archive | Working notes; thin value vs overhead; future product specs belong in GitHub Issues / PRs |
| `product/pm-v0-feature-map.md` | **Drop** — local archive | Stage 0 feature map is complete; next iteration belongs in issue tracker |
| `product/competitive-gaps-iswimband.md` | **Drop** — absorbed | Key findings absorbed into `strategy/market-landscape.md` §iSwimband and `docs/STRATEGY.md` comps table |

### Data / backend extras

| Local file | Disposition | Reason |
|-----------|------------|--------|
| `data/erd-v0.md` | **Drop** — premature | No schema to diagram yet; belongs in a future schema PR |
| `data/open-tech-questions.md` | **Partially absorbed** | Key items merged into `backend/open-tech-questions.md` (landed via #26); local version is a superset; remainder is exploratory and low-priority |

### Other

| Local file | Disposition | Reason |
|-----------|------------|--------|
| `project-brief.md` | **Drop** | Superseded by `docs/PURPOSE.md` + README spine |
| `FILE-INDEX.txt` | **Drop** | Superseded by `docs/REPO_LAYOUT.md` |
| `gg-migrate.tar.gz` | **Drop** | Migration archive; migration is now complete (see below) |

---

## Explicit non-goals (never migrated)

- **Expo / native app work** — parked until lean PoC + Stage 1 justify native (issue #16).
- **Chat transcripts, teammate onboarding fluff** — not repo material.
- **Duplicate fixture copies** without sync story.
- **CapEx / counsel / manufacturing commitments** — Michael is not pursuing these.

---

## Migration close-out

**Migration from the Grok Bot computer to this repo is complete** as of this PR (#28), except:

1. **Expo (#16) — explicitly parked.** No migration until Stage 1 PoC validates the tech.
2. **Local long-forms listed as Drop above** — deliberately left off; distilled summaries are in-repo.

The authoritative content is now in this GitHub repository. The local workspace
(`/workspace/guardian-goggles/`) should be treated as a deprecated scratch area.
