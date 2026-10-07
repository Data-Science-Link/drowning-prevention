# Strategy Overview

**Status:** Research phase (Stage 0–1). Docs in this folder are distilled research, not a product launch plan.
**Public-service framing:** This material is published openly so that any builder — with a few hundred dollars of hardware and founder time — can validate the physics and pursue the opportunity.

---

## Core thesis

2.4 GHz BLE is absorbed by water in centimetres. When a child's sensor-equipped goggles go underwater, the phone loses the BLE link rapidly. That RF cliff is real, measurable in a backyard pool, and cheap to test.

**What this enables:** a session-aware, fusion-based "possible submersion" alert that is honest about its limits — not a drowning detector, but a meaningful backup layer for residential parents.

**The constraint:** BLE-loss alone is not a shippable life-safety claim. Ship **Pool Session + fusion** (wetness + IMU ± pressure) and keep "Lost Connection" clearly distinct from "SubmersionSuspect" in every copy surface.

---

## Why this is a public-service opportunity

| Fact | Source |
|------|--------|
| Drowning is the leading cause of accidental death for children under 5 in residential settings | `docs/PURPOSE.md` |
| Every direct B2C wearable competitor is dead, ceased, or discontinued | `strategy/market-landscape.md` |
| The physics work; the sensor cost is ~$8–15 clip COGS at mid volume | `science/02-power-battery-bom.md` |
| Stage 0 UX exists (wireframe, mocks, dual-alert states) | `frontend/wireframe/` |
| Stage 1 backyard PoC costs ~$150–400 in hardware + founder time | `science/04-lean-poc-bom.md` |
| Counsel + full PoC can run ~$25k–65k deferred | `finance/lean-phase-capital.md` |

A builder with a pool, an afternoon, and a few hundred dollars can measure whether the physics work. Everything needed — wiring plan, firmware sketch, backyard protocol, kill/continue gates — is in this repo.

**Michael's path is lean invent-around + backyard PoC + public-service capital, not CapEx / paid counsel / manufacturing.** Counsel and manufacturing are deferred until Stage 1 produces a go signal.

---

## Category comps (condensed)

| Product | Price | Status | Cause of death / lesson |
|---------|-------|--------|------------------------|
| **iSwimband** | ~$99 | **Dead** | Abandonware app, non-rechargeable, FPs |
| **BuddyTag** | ~$38–45 | **Dead** | False alarms, discontinued importer |
| **SEAL SwimSafe** | ~$379 | **Ceased ~2020** | BOM cost killed the company |
| **Safety Turtle** | ~$85–190 | **Discontinued** | Entry-only, manufacturer exit |
| **WaterWatch** | $199 (no sub) | **Pre-order** (sold out, ships 2026) | Live proof parents pay ~$200 |
| **PoolGuard** (alarm) | ~$170–300 | **Live shelf** | Non-wearable, entry alarm |
| **WAVE GUARDian** | $149–399/mo | **Live B2B only** | Facility/institutional — not DTC |
| **SWÖM** | ~$110–145 | **Pre-ship** | Different fix: inflate, not alert |

**Category reading:** Parents pay ~$170–200 for entry-layer protection. Dead wearables died from software abandonment + false alarms + thin margins, not from the wrong price alone. The opportunity is honest sensing + living software + ~$199 kit ASP.

Full landscape: `strategy/market-landscape.md`.

---

## Unit economics (locked decisions)

| Decision | Value | Status |
|----------|-------|--------|
| Launch kit ASP | ~$150–250 (mid ~$199) | **Locked (D-001)** |
| Hero SKU at $30–50 | Later add-on / multi-child / organic only | **Decided — RED as primary** |
| Optional subscription | ~$2.99/mo; never gates core alerts | **Decided** |
| Mandatory subscription | Rejected | **Decided** |
| Clip COGS estimate | ~$8–15 (mid volume, Science estimate) | ASSUMPTION |
| Kit COGS estimate (hub path) | ~$45–55 at $150–250 ASP | ASSUMPTION |
| Contrib after fees @ $199 | ~$109 | ASSUMPTION |
| Break-even CAC @ $199 | ~$109 hardware-only | ASSUMPTION |

At $30–50 primary ASP, DTC customer acquisition cost cannot clear realistic numbers — even at 40% optional-sub attach. WaterWatch validates $199; BuddyTag and iSwimband proved low ASP doesn't survive.

Full model: `strategy/unit-economics.md` · `finance/unit-economics-v0.md` · `finance/unit-economics-v0.csv`.

---

## Stage capital ladder (deferred)

| Stage | Spend | Gate |
|-------|-------|------|
| **Stage 0** — wireframe + mocks | ~$0 (exists) | Founder accepts dual-state UX |
| **Stage 1** — lean HW PoC | ~$150–400 parts + founder time | BLE cliff + fusion FP data |
| **Counsel / FTO** | ~$8–25k est. | Stage 1 continue signal |
| **Broader PoC** | ~$15–40k est. | Post-counsel / proposal confidence |
| **Soft pilot** (100–500 units) | ~$40–120k est. | Trust metrics |
| **Hard tooling + first run** | ~$80–250k est.; cum. ~$150–400k | Pilot economics |

All post-Stage-1 numbers are ASSUMPTIONS. Do not spend or raise against them until Stage 1 go.

Detail: `finance/lean-phase-capital.md`.

---

## Patent risk (summary)

| Asset | Risk | Action |
|-------|------|--------|
| iSwimband / ASC consumer BLE filing (US20150194031A1) | Abandoned — low enforcement | Still prior art; don't try to patent the same idea |
| **WAVE US11715361B2** | **HIGH — active to ~2038** | Claim-chart before locking HW or marketing claims |
| Older ASC grants (US7642921B2) | Expired / lapsed — low | Prior art only |
| Overall FTO posture | **HIGH until claim-charted** | Default: invent-around |

**Invent-around strategy:** modality fusion (wetness + IMU ± pressure), dual-channel UX (Lost Connection ≠ SubmersionSuspect), Pool Session gate, on-device sensing. Do not market or firmware-label BLE-loss as drowning detection.

**Do not** buy abandoned iSwimband patents, open WAVE acquisition talks, or claim FTO clearance before licensed patent counsel claim-charts US11715361B2.

Full analysis: `strategy/iswimband-patent-analysis.md` · `strategy/invent-around-checklist.md`.

---

## Kill/continue gates

Before escalating capital or commissioning counsel, score the Stage 1 PoC against the kill/continue checklist. Continue only if no HARD KILL fires and ≥4 of 6 CONTINUE gates are green.

Full checklist: `strategy/kill-vs-continue-checklist.md`.

---

## Document map

| Topic | Path |
|-------|------|
| **This overview** | `docs/STRATEGY.md` |
| Competitor landscape | `strategy/market-landscape.md` |
| 1-page exec summary | `strategy/business-portfolio-exec.md` |
| Unit economics narrative | `strategy/unit-economics.md` |
| Kill vs continue gates | `strategy/kill-vs-continue-checklist.md` |
| Invent-around checklist | `strategy/invent-around-checklist.md` |
| Patent analysis (full) | `strategy/iswimband-patent-analysis.md` |
| BLE physics brief | `science/01-ble-submersion-signal-brief.md` |
| Power / battery BOM | `science/02-power-battery-bom.md` |
| Alt sensors vs BLE | `science/03-alt-sensors-vs-ble.md` |
| **Lean PoC BOM + protocol** | `science/04-lean-poc-bom.md` |
| Unit-econ model (narrative) | `finance/unit-economics-v0.md` |
| Unit-econ model (CSV) | `finance/unit-economics-v0.csv` |
| **Lean capital plan** | `finance/lean-phase-capital.md` |
| System architecture | `docs/ARCHITECTURE.md` |
| Standing decisions | `docs/DECISIONS.md` |
| Product purpose | `docs/PURPOSE.md` |

---

*Distilled from workspace research packs, Oct 2026. Research labels (RESEARCHED / ASSUMPTION) are carried through from source docs. Not legal advice, medical advice, or a safety certification.*
