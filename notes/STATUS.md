# Project Status

> **Living note — updated by Michael and agents.** Last updated: 2026-10-07 (PR #28 cohesion pass).

---

## Current milestone: repo cohesion + migration complete; newcomer landing ground ready

The repo is now a **cohesive landing ground** for a newcomer who might take the project all the
way — software + hardware + public-service path.

**What landed in this cohesion pass (PR #28):**
- README rewritten as a 7-step newcomer journey (what it is → could someone ship it → comps → tech → app → cost → next)
- `docs/GETTING_STARTED.md` added (clone → Pages → optional mock → next steps)
- `notes/MIGRATION_STATUS.md` added (Keep / Link-only / Drop table for all local-only candidates)
- Product brand sweep: "Guardian Goggles" / "GG" removed from user-facing surfaces (README, docs/, Pages/wireframe UI, pyproject.toml display name). One legacy footnote kept in README.
- Strategy / competitor / unit-econ surfaces confirmed linked from README spine
- `docs/REPO_LAYOUT.md` and `.factory/DOCS.md` updated for new files

**Migration from the Grok Bot computer is complete** except:
- Expo (#16) — explicitly parked
- Local long-form drafts — deliberately left as Drop (distilled summaries in-repo; see `notes/MIGRATION_STATUS.md`)

---

## Stage tracker

| Stage | Description | Status |
|---|---|---|
| **0** | Software honesty UX (wireframe + mocks) | **Complete** — Pages live; mock API landed (#26) |
| **1** | Lean HW PoC (ESP32/nRF52, backyard test) | Not started — awaits founder time; see #14 |
| **2** | Soft pilot (50–500 units) | Deferred |
| **3** | Hard tooling + first production run | Deferred |

---

## Recent milestones

- **2026-10-07** — Cohesion pass PR (#28): README rewrite, GETTING_STARTED, MIGRATION_STATUS,
  brand sweep, repo layout updated.
- **2026-10-07** — Mock API + OpenAPI spec landed (PR #26, closes #11).
- **2026-10-07** — Public-service framing PR (#18): PURPOSE.md rewritten; `docs/PUBLIC_SERVICE_AND_CAPITAL.md` added.
- **2026-10-07** — Strategy/science/finance packs distilled (PR #25, closes #12).
- **2026-10-07** — Factory playbook (`.factory/`) landed (PR #17).
- **2026-10-07** — Docs + CI foundation landed (PR #8).
- **2026-10-02** — Lean phase plan locked: Stage 1 cap ≤ ~$400 HW + founder time; counsel and investors deferred to after PoC go.
- **2026-09-23** — Business portfolio executive summary completed.
- **2026-09-21** — ASP locked (~$150–250 HW-first), form factor on HOLD.

---

## Open issues (relevant to next steps)

| # | Title | Status |
|---|-------|--------|
| **#14** | Lean Stage-1 HW PoC: BOM cart + backyard protocol | Open — thin vs local `science/04-lean-poc-bom.md`; founder to drive |
| **#15** | Dependabot major bumps | Open — hygiene, not narrative-critical |
| **#16** | Parked: Expo / native parent app port | **Parked** — keep parked until Stage 1 validates |
| **#13** | Verify GitHub Pages deploy | Largely done; close or re-scope |

---

## Framing note

This project is **public-service, not fundraising**. Michael is unlikely to fund manufacturing
CapEx, paid patent counsel, or distribution. His contribution is the open software architecture,
the honest UX model, documented research, and this repo. The goal is to hand this off to whoever
can ship it. See [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](../docs/PUBLIC_SERVICE_AND_CAPITAL.md).

---

## Who to ping

- **Michael** — founder, all final decisions
- Agents update this file when they complete significant work; Michael reviews and annotates.
