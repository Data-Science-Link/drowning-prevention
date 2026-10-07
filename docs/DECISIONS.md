# Standing Decisions

ADR-lite log of locked choices. Entries are stable. To change one, open a PR with the rationale.

---

## D-001 — ASP: ~$150–250 hardware-first kit

**Status:** Locked (2026-09-21)  
**Decision:** Launch ASP ~$150–250 as a hardware kit. Optional subscription ~$2.99/mo for multi-child, family sharing, and alert history. Free core alerts are never gated.  
**Rationale:** Live parent anchors (WaterWatch $199, PoolGuard $170–300) confirm parents pay ~$200 for entry alarms. $30–50 as the primary SKU is RED for DTC customer-acquisition cost; it was a contributing factor in the BuddyTag/iSwimband failure band. Optional sub avoids the perception of monetising safety.  
**Source:** `strategy/unit-economics.md`, `strategy/business-case.md`

---

## D-002 — HTML wireframe before React Native / Expo

**Status:** Parked (Expo deferred)  
**Decision:** Build the UX as a static HTML wireframe first. Expo / React Native is parked until Stage 1 hardware PoC validates the core tech.  
**Rationale:** HTML wireframe is zero-cost to build and sufficient to validate alert UX and investor narrative. Investing in a native app before physics are confirmed is wasteful. GitHub Pages lets the wireframe be shareable without any app store friction.  
**Source:** Stage 0 / Stage 1 ladder in `docs/ARCHITECTURE.md`

---

## D-003 — Invent-around WAVE US11715361

**Status:** Locked — HIGH FTO flag  
**Decision:** Default to inventing around WAVE's patent US11715361. Do not buy abandoned or expired iSwimband/ASC patents.  
**Rationale:** WAVE's claims cover multi-device RF-based submersion detection in venue contexts. Counsel has not yet claim-charted whether Guardian Goggles' fusion approach reads on those claims. Until that chart is done, we design away from WAVE's described methods (venue multi-transmitter, threshold-only RF). Buying expired iSwimband IP adds no freedom-to-operate and wastes capital.  
**Next step:** Commission a freedom-to-operate claim chart (~$8–25k est.) only after Stage 1 PoC go.  
**Source:** `strategy/iswimband-patent-analysis.md`, `strategy/invent-around-checklist.md`

---

## D-004 — Paid patent counsel deferred

**Status:** Locked (2026-10-02)  
**Decision:** No paid patent / FTO counsel until Stage 1 PoC go signal.  
**Rationale:** Spending counsel fees before the hardware physics are confirmed is premature. The lean PoC (~$200–400 HW + founder time) is the gate. If the PoC shows BLE+fusion works, counsel is the next spend. If PoC fails, counsel fees were wasted.  
**Source:** `notes/OPEN_QUESTIONS.md`, `finance/lean-phase-capital.md`

---

## D-005 — Public repository + branch protections retained

**Status:** Locked  
**Decision:** This repository is public. Main branch protections (required status checks: `security-audit`, `frontend-smoke`; required PR reviews) are retained. The admin bypass is also retained so the repository owner can unblock themselves without removing protections.  
**Rationale:** Public repo enables GitHub Pages free tier, external contributor visibility, and transparent development. Branch protections prevent accidental direct pushes to main. Admin bypass is a safety valve, not a routine path.

---

## D-006 — Copy never says "drowning"

**Status:** Locked — non-negotiable  
**Decision:** No user-facing copy (UI labels, marketing, notifications) uses the word "drowning" or frames BLE signal loss as drowning detection.  
**Rationale:** BLE-loss-equals-drowning is not a scientifically defensible claim and has a high false-positive rate. Making that claim: (a) builds false trust that a lawsuit will destroy; (b) triggers regulatory scrutiny for a medical-device-adjacent claim; (c) recreates the exact failure mode of prior competitors (WAVE camp study, BuddyTag nuisance). Honest framing ("Lost Connection," "SubmersionSuspect") is the product's competitive differentiator.  
**Source:** `docs/PURPOSE.md` § Alert philosophy

---

## D-007 — Form factor on HOLD

**Status:** HOLD  
**Decision:** Hardware form factor (exact enclosure, attachment method, PCB design) is not locked. Current reference: "rechargeable BLE sensor clips to swim goggles."  
**Rationale:** Form factor decisions (IP67 rating, custom PCB, clip vs band vs goggle integration) require enclosure tooling costs and antenna placement testing that cannot be done cheaply before Stage 1. Locking form factor prematurely wastes mold/tooling spend. The Stage 1 PoC can use any dev-board form factor.  
**Unlock trigger:** Antenna + fusion performance confirmed in PoC; enclosure shortlisted.
