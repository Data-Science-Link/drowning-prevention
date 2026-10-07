# Guardian Goggles — Business Portfolio Executive Summary (1 page)

**Michael Link · 2026-09-23 (CT) · Full detail:** `strategy/unit-economics.md` (unit econ) · `strategy/market-landscape.md` (comps) · `strategy/iswimband-patent-analysis.md` (IP)  
**Form factor HOLD** — “wearable BLE sensor.” **Not** legal advice.

---

### 1. Why this technology?
Physics **supports** BLE as an **antenna-underwater** proxy (2.4 GHz dies in cm-scale water). **BLE-only “lost >~10 s = drowning” is not shippable** — too many FPs (phone away, play dunks, battery) and FNs (head-up distress, shallow face-down). Ship **Pool Session + phone presence + fusion** (wetness + IMU ± pressure) and keep **Lost Connection ≠ Submersion**. Sources: `science/01*`, `03-alt-sensors-vs-ble.md`.

### 2. Scale ladder (low → higher cost)
| Stage | Goal | Cost | Exit |
|-------|------|------|------|
| **0** | UX + dual states (wireframe/mocks **exist**) | ~$0 | Founder accepts honesty UX |
| **1** | Arduino/ESP32-class pool PoC | ~$5–15k **ASSUMPTION** | RSSI/FP measurement pack; fused FP ≪ BLE-only |
| **2** | Soft pilot 100–500 | **$40–120k ASSUMPTION** | Trust metrics; app continuity |
| **3** | Hard tools + first 2–5k | **$80–250k**; cum. **~$150–400k ASSUMPTION** | Factory COGS quotes; margin vs CAC |

Lean phase: spend Arduino **now** after Stage 0 (cap ~$200–400 HW + founder time). **Counsel deferred** until after PoC go — see `finance/lean-phase-capital.md`.

### 3. Patents / IP
**Do not buy** abandoned/expired ASC–iSwimband patents. **Invent-around** default. **WAVE US11715361 = HIGH FTO** → licensed counsel claim-chart **before** locking HW/claims (~$8–25k ASSUMPTION counsel). Prefer fusion + dual-channel alerts; license/buy WAVE only if chart says claims read on GG. Sources: `strategy/iswimband-patent-analysis.md`, `invent-around-checklist.md`.

### 4. Competitive snapshot
Live parent anchors **~$170–200** (WaterWatch **$199** no-sub; PoolGuard ~$170–300). Dead wearables: iSwimband **~$99**, BuddyTag **~$38–45**, SEAL **~$379**. WAVE is **B2B $149–399/mo** + IP foil — not GG’s DTC peer. Cameras = facility/$k. Death modes = abandonware + FP + BOM, not price alone. Source: `strategy/market-landscape.md`.

### 5. Unit economics
**DECIDED:** ASP **~$150–250** HW-first (mid **~$199**); **$30–50** add-on only; optional **~$2.99** never gates alerts; **no** mandatory sub. Mid contrib after fees ~**$109** (ASSUMPTION COGS/fees) can clear CAC placeholders ≲~$80–100; $30–50 primary = **RED** for DTC CAC. Rechargeable required. Sources: `strategy/unit-economics.md`.

### 6. Marketing + ICP
**ICP:** Residential parents of young kids with pool access (harm peaks &lt;5, residential, brief lost-contact). Angle: **layer-of-protection / session backup**. **Never** claim drowning detection or equate BLE-loss with drowning. Free siren path.

### 7. Capital

**Now:** Stage 0 ~$0 + Stage 1 lean **≤few hundred $** (~$200–400 target).  
**Deferred:** $15–40k PoC, counsel $8–25k, pilot, tooling — until kill-vs-continue go.  
Detail: `finance/lean-phase-capital.md`.


### 8. Locked vs open
**Locked:** B/C ASP; free alerts; optional $2.99; form HOLD; no BLE=drowning; no ASC patent buy; WAVE counsel gate; Stage 0 exists.  
**Open:** Arduino timing; WAVE chart outcome; pressure v1 vs 1.1; hub-in-kit; form unlock; capital ceiling; WTP/CAC/BOM quotes.

---

**Founder TLDR:** (1) Fusion + honesty UX, not BLE-loss=drowning. (2) Price like WaterWatch (~$199), not BuddyTag. (3) Don’t buy dead iSwimband paper—chart WAVE. (4) ~$150–400k to inventory; counsel + pool PoC first. (5) Form HOLD; spend Arduino only after UX + counsel queue.
