# Kill vs Continue — Proposal Confidence Checklist (1 page)

**Owner:** GG: Market Researcher  
**As-of:** Fri Oct 2, 2026 (America/Chicago)  
**Canonical:** `strategy/kill-vs-continue-checklist.md`  
**Phase:** Founder gate — high-confidence proposal + **cheap PoC** (few hundred $ HW + his time) **before** investors / paid counsel.  
**Locks:** ASP ~$150–250 HW-first ($30–50 later add-on); form factor **HOLD**; never claim BLE-loss = drowning.  
**Comps already done:** `strategy/market-landscape.md` · portfolio §4.  
**Labels:** **RESEARCHED** vs **ASSUMPTION**.

---

## How to use

After Stage 0 (wireframe) + Stage 1 (lean ESP32/Arduino pool test), score each row.  
**Continue** only if **no HARD KILL** fires and **≥4 of 6 CONTINUE gates** are green.  
This is a **founder decision aid**, not a market forecast.

---

## HARD KILL (any one → stop or radical redesign)

| # | Evidence to collect (cheap PoC) | Kill if… | Why (category autopsy) | Label |
|---|---|---|---|---|
| K1 | Afternoon of **play swimming**: BLE-only vs Session+fusion FP/FN log | Parents would **disable / ignore** within one session; fusion **no better** than BLE-only | WAVE camp study: frequent play alerts; BuddyTag nuisance at low ASP | RESEARCHED pattern; threshold **ASSUMPTION** |
| K2 | Dry RF-loss / phone-away / towel scenarios | System still screams **“submersion/drowning”** (no honest Lost Connection path) | WAVE float-off = silent false security; BuddyTag OOR≡water | RESEARCHED |
| K3 | Phone in pocket / another app / silent mode | Critical alert **fails** or depends on foreground-only UX | iSwimband phone-path fragility; abandoned apps brick hardware | RESEARCHED |
| K4 | Wear for a full pool session (mount HOLD — any clip/band) | Kids **won’t keep it on** / falls off constantly with no “not monitoring” state | Removal / float-off FNs; parent distrust of wearables | RESEARCHED + ASSUMPTION on severity |
| K5 | Founder read of Science + Legal posture | Team still wants to **market BLE-loss as drowning detection** or “world’s first RF alert” | Science: not shippable claim; WAVE US11715361 HIGH theme — counsel deferred but claims hygiene binds | RESEARCHED |

---

## CONTINUE gates (need most green before “high-confidence proposal”)

| # | Gate | Pass looks like | Fail → | Owner |
|---|---|---|---|---|
| C1 | **Physics proxy works on bench** | Dunk → BLE cliff in seconds when antenna submerged; air range OK at backyard distances | Kill tech thesis | Scientist (`science/01`, lean PoC `04`) |
| C2 | **Session + dual-channel honesty demo** | Wireframe + PoC: Pool Session on/off; Lost Connection ≠ Submersion-risk in UI copy | Redesign UX before spend | Market/PM/Frontend |
| C3 | **Fusion beats BLE-only on FP** | Same play session: fused stack **materially fewer** nuisance alerts (**ASSUMPTION** bar: “would keep using”) | Stay on Stage 1; don’t pitch investors | Scientist |
| C4 | **ASP story still matches shelf** | Kit narrative stays **~$150–250** peer WaterWatch/PoolGuard; not $30–50 hero | CFO already RED on $30–50 DTC | Market + CFO |
| C5 | **Category gap still open** | No new live parent B2C peer that ships **session swim-under backup + honesty** at kit price (re-scan WaterWatch/WAVE/SWÖM) | Reposition or kill | Market |
| C6 | **Cheap PoC completed** | ≤ few hundred $ HW + founder time; BOM logged; no paid counsel / raise yet | Don’t escalate capital | CFO lean capital + Scientist BOM |

---

## What comps already tell us (do not re-research)

| Signal | Meaning for kill/continue |
|---|---|
| iSwimband dead ($99) | Demand existed; **software + battery + honesty** killed trust — CONTINUE only if PoC proves those fixed |
| WaterWatch $199 sellout | Parents pay ~$200 for **entry** alarms — CONTINUE on ASP lock; don’t confuse entry job with swim-under job |
| WAVE $149–399/mo B2B | Physics can sell to facilities — **not** proof backyard phone kit works |
| SEAL ~$379 ceased | Honesty features ≠ survival without unit econ — don’t skip lean capital |

---

## Founder one-liner

**Kill** if the backyard afternoon proves we recreate iSwimband/BuddyTag nuisance or dishonest alerts.  
**Continue** if Session + fusion + Lost Connection are visibly better than BLE-only *and* the ASP story still sits in the $150–250 peer band — then escalate capital / counsel.

---

*Sources: `market-landscape.md` S1–S10 + failure modes; Science `01`/`03`; Legal invent-around / WAVE flag; CoS founder bar Oct 2, 2026.*
