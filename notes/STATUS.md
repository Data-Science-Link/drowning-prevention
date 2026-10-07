# Project Status

> **Living note — updated by Michael and agents.** Last updated: 2026-10-07.

---

## Current milestone: docs + CI foundation landed; public-service framing in progress

The documentation and CI foundation is complete (PRs #1, #2-security, #8, #17):

- Accurate product documentation (`docs/`) including architecture, decisions, and open questions
- Python / uv project scaffold with CI (tests, frontend-smoke, security-audit, Pages deploy)
- Factory playbook (`.factory/`) for structured agent handoffs
- **Public-service framing** (this PR, #9): retarget docs toward open handoff rather than
  VC fundraise; add `docs/PUBLIC_SERVICE_AND_CAPITAL.md`

**Next up:**
- Stage 0 wireframe: HTML parent-app UX into `frontend/` (issue #10)
- Stage 1 hardware PoC planning: BOM cart + backyard protocol (issue #14)

---

## Stage tracker

| Stage | Description | Status |
|---|---|---|
| **0** | Software honesty UX (wireframe + mocks) | Docs complete; code pending (#10, #11) |
| **1** | Lean HW PoC (ESP32/nRF52, backyard test) | Not started — awaits Stage 0 code; see #14 |
| **2** | Soft pilot (50–500 units) | Deferred |
| **3** | Hard tooling + first production run | Deferred |

---

## Recent milestones

- **2026-10-07** — Public-service framing PR (#9): PURPOSE.md rewritten; STATUS.md updated;
  `docs/PUBLIC_SERVICE_AND_CAPITAL.md` added; README refreshed.
- **2026-10-07** — Factory playbook (`.factory/`) landed in PR #17.
- **2026-10-07** — Docs + CI foundation landed in PR #8.
- **2026-10-02** — Lean phase plan locked: Stage 1 cap ≤~$400 HW + founder time; counsel and
  investors deferred to after PoC go.
- **2026-09-23** — Business portfolio executive summary completed.
- **2026-09-21** — ASP locked (~$150–250 HW-first), form factor on HOLD.

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
