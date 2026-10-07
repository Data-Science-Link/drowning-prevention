# GG Invent-Around Checklist (one-pager)

**For:** CoS / Michael / counsel handoff  
**Aligned to:** Scientist `03-alt-sensors-vs-ble.md` §5 + Legal `iswimband-patent-analysis.md`  
**Date:** 2026-09-21  
**Status:** Product/engineering checklist — **NOT FTO / NOT infringement advice.** Hire licensed counsel before go/no-go.

**Planning locks (Michael / CoS):** ASP ~$150–250 hardware-first ($30–50 later add-on only); form factor HOLD; WAVE counsel gate unchanged.

---

## North star

| Do | Don’t |
|---|---|
| Ship **Session mode + presence + fusion**; BLE as **comms + corroboration** | Market or firmware where **BLE-loss alone = drowning** |
| Keep **dual UX**: “Lost Connection / interrupted” vs “possible submersion” | Use RF-silence as the only submersion classifier |
| Prefer **wetness- or pressure-primary immersion** + staged confidence | Claim “detects all drowning” (head-up FN remains) |
| Claim-chart **US11715361B2 (WAVE)** before locking triggers | Assume fusion auto-clears RF-loss claims if GG also uses loss |

**Buy vs invent (recap):** No buy on old iSwimband paper (abandoned/expired). Invent-around default. WAVE license/buy only after counsel chart shows claims read on GG.

---

## Design levers (check each before hardware lock)

### A. Sensing stack (Science v1)
- [ ] **Pool Session** required for high-duty BLE (~100–300 ms adv)
- [ ] Parent phone **presence / heartbeat**
- [ ] **Wetness** pads gate immersion context
- [ ] Duty-cycled **6-axis IMU** (face-down / low-motion flags)
- [ ] **Wear/clip detect** (magnetic/mechanical)
- [ ] **Pressure** enclosure designed now; populate v1 or v1.1 (CoS fork — not Legal’s call)
- [ ] Staged alerts: soft mid-confidence; **strong only if** BLE-lost **AND** (wet **OR** pressure) **AND** optional IMU — tune on data

### B. Firmware / claim hygiene (Legal priority)
- [ ] Separate state machines: `LostConnection` ≠ `SubmersionAlert`
- [ ] RF-loss alone → **Lost Connection** path only (never “drowning” wording)
- [ ] Affirmative on-wearable distress event preferred over phone-only absence inference (where feasible)
- [ ] Document residual **head-up FN** in IFU / labeling / support macros
- [ ] Marketing matrix: allowed vs prohibited claims (FTC + liability)

### C. Counsel queue (do before raise/ship “cleared”)
- [ ] Claim chart **US11715361B2** vs final GG architecture + firmware triggers
- [ ] Confirm ASC **US20150194031A1** abandonment final; no living continuations
- [ ] Scan foreign WAVE/ASC family (EP/WO/CA/AU)
- [ ] Map GG against mechanism families: RF-loss | electrode-timer | depth-timer | IMU | fusion (Science §5)
- [ ] Note category comps: SWÖM (inflate), SEAL, WaterWatch — different jobs, still search
- [ ] Also flagged in Science `01`: **US11770154** — include in counsel search list

---

## CoS / Michael forks (Legal input only)

| Fork | Legal note |
|---|---|
| (1) Pressure v1 vs v1.1 | Cost/packaging; **does not** by itself clear WAVE if RF-loss still fires submersion |
| (2) Immersion primary = RF-loss vs wetness/pressure | **Prefer wetness/pressure primary** for invent-around narrative; RF-loss as corroboration/comms |
| (3) Head-up FN vs break form-factor HOLD | Liability/claims hygiene; stay on HOLD until ASP — document FN, don’t invent sensors |

---

## Done when

1. Checklist A+B reflected in PM/eng specs  
2. Counsel returns claim chart on WAVE (and search list)  
3. CoS escalates buy/license vs invent-around **go/no-go** to Michael only after (2)

*Sources: `science/03-alt-sensors-vs-ble.md`, `strategy/iswimband-patent-analysis.md`*
