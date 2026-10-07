# Open Questions

> **Living note — updated by Michael and agents.** Last updated: 2026-10-07.

These are the unresolved questions that block or inform upcoming decisions. When a question is resolved, move it to the relevant `docs/DECISIONS.md` entry and note the date.

---

## Hardware / PoC

### OQ-1 — Hub-in-kit?

**Question:** Does the Stage 1 PoC (and eventually the shipping product) include a dedicated phone-sized hub device in the kit, or does the parent's own phone always serve as hub?

**Why it matters:** A hub-in-kit changes BOM cost significantly (adds another $20–50+), changes the connectivity surface (hub BLE vs parent phone BLE range), and changes the App Store dependency. If the parent phone is always the hub, we depend on the parent having iOS/Android nearby and the app running in the foreground / background with appropriate permissions.

**Current assumption:** Phone-as-hub (no extra device) for Stage 1 lean PoC. Hub-in-kit is a Stage 2+ decision.

**Owner:** Michael + Scientist

---

### OQ-2 — Wetness sensor placement and type?

**Question:** Resistive wetness pads vs capacitive vs a commercial waterproofing sensor IC? Where on the goggle/sensor body?

**Why it matters:** Cheap resistive pads (~$1–2) are sufficient for Stage 1 measurement but may corrode or false-trigger from condensation. Capacitive or commercial ICs are more reliable but cost more.

**Current assumption:** Resistive pads for Stage 1 PoC only.

**Owner:** Scientist

---

### OQ-3 — Pressure sensor in v1 hardware?

**Question:** Include a barometric/water-pressure sensor in Stage 1 BOM to measure actual depth, or rely on BLE+wetness+IMU?

**Why it matters:** Pressure gives direct depth data, which would make SubmersionSuspect much more reliable. But waterproof pressure sensors add cost and complexity (enclosure sealing). Stage 1 is not sealed.

**Current assumption:** No pressure sensor in Stage 1 lean PoC. Evaluate after Stage 1 results.

**Owner:** Scientist

---

## Business / Capital

### OQ-4 — Capital ceiling for Stage 1?

**Question:** What is the hard spend ceiling for the Stage 1 lean PoC before Michael calls it done or pivots?

**Current guidance:** ≤ few hundred USD parts (~$150–400 target) + founder time. No paid labour or outside capital at this stage.

**Owner:** Michael

---

### OQ-5 — When to buy the hardware cart?

**Question:** Stage 0 wireframe is complete (code lands in PR #2). At what point does Michael pull the trigger on ordering the Stage 1 ESP32/nRF52 BOM?

**Trigger suggested:** After PR #2 merges and wireframe acceptance is re-confirmed. Then order BOM per `science/04-lean-poc-bom.md`.

**Owner:** Michael

---

## IP / Legal

### OQ-6 — WAVE US11715361 claim chart: when to commission?

**Question:** When does Michael queue a paid FTO/claim-chart review of WAVE's patent against Guardian Goggles' fusion approach?

**Current decision (D-004):** Deferred until Stage 1 PoC go signal. Budget ~$8–25k (estimate). Do not commission before PoC confirms tech is viable.

**Unlock trigger:** Stage 1 PoC shows BLE+fusion works; Michael decides to proceed to Stage 2.

**Owner:** Michael + Legal Expert (when engaged)

---

### OQ-7 — Invent-around sufficient, or must we license/buy WAVE?

**Question:** Can Guardian Goggles' dual-channel fusion + session-model approach operate outside WAVE's claim scope? Or will the claim chart show we need a license?

**Current assumption:** Invent-around is default; we do not buy expired iSwimband patents. This assumption is unverified until counsel reviews.

**Owner:** Legal Expert (when engaged)

---

## Market

### OQ-8 — New live parent B2C competitor scan needed?

**Question:** Has any new parent-grade swim-under backup wearable launched since the last market scan (~2026-09 per `strategy/market-landscape.md`)?

**Why it matters:** Kill gate C5 requires confirming no live peer ships session swim-under + honesty UX at kit price.

**Owner:** Market Researcher — re-scan before investor conversations.
