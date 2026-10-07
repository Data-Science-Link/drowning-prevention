# Guardian Goggles (GG): Power, Battery & BOM-Sensitive Design

**Document type:** Technical addendum for eng / PM / CFO (unit econ)  
**Companion to:** `01-ble-submersion-signal.md`  
**Scope:** Duty cycle, SoC sleep currents, coin vs LiPo, waterproof charging, sensor incremental cost/power, session-mode battery life, rough COGS sensitivity  
**Not:** Final BOM quote, supplier commitment, or safety certification  
**Date:** 2026-09-21  
**Retail target context:** **$30–50** clip-on goggle BLE sensor

---

## Executive summary (CFO-facing)

| Decision | Recommendation (engineering) | Rough COGS impact @ ~10k–50k units (labeled estimate) |
|----------|------------------------------|--------------------------------------------------------|
| Chemistry | **Small LiPo (≈40–80 mAh) + sealed charge path** over primary coin for multi-season reuse | Battery+PCM **+$0.6–2.0** vs coin; enables recharge UX |
| Charge path | Prefer **magnetic pogo / sealed contacts** for v1; inductive if enclosure tooling allows | Contacts **~$0.4–1.5**; inductive Rx coil+IC **+$1.5–4** |
| SoC | **nRF52-class** (e.g. nRF52805/810/832) is sufficient; avoid overspec 840 unless USB/Flash needed | SoC **~$1.5–4** |
| Sensors | Budget **IMU + wetness** as fusion line items—required by BLE-loss note | IMU **~$0.5–1.5**; wetness **~$0.05–0.3** |
| Runtime model | **Session-mode** (fast adv only while pool session ON) is what makes LiPo viable | Without session gate, battery life collapses 5–20× |

**Unit-econ framing:** At **$30–50** retail, sustainable electronics+enclosure COGS often land near **~$8–15** (ex labor, logistics, returns, software). Power architecture is a **first-order** COGS and warranty driver—not a late polish item.

---

## 1. Duty cycle: advertising intervals vs time-to-detect

### How GG uses BLE for immersion proxy

While a **Pool Session** is active, the clip advertises (or maintains a connection) so the parent phone can notice **sustained absence** of packets for **>~10 s** (see `01-ble-submersion-signal.md`). Faster advertising → faster, more reliable detection of “gone dark,” but **linearly higher** radio energy.

### Order-of-magnitude radio math (public Nordic-class numbers)

Typical BLE advertising event (3 channels, ~20-byte ADV PDU): **~1.0–1.5 ms** radio-on. At **0 dBm** TX with DC/DC, nRF52832 TX is about **5.3 mA** and RX about **5.4 mA** (Nordic product brief / optimizing-power blog).

Rough **radio-only** average (illustrative; SoftDevice/payload/TX power shift this):

| Advertising interval | Events / s | Radio duty (≈1.2 ms event) | Approx. radio-only I_avg |
|----------------------|------------|----------------------------|---------------------------|
| **20 ms** (aggressive) | 50 | ~6% | **~250–350 µA** |
| **100 ms** | 10 | ~1.2% | **~50–70 µA** |
| **500 ms** | 2 | ~0.24% | **~10–15 µA** |
| **1000 ms** | 1 | ~0.12% | **~5–8 µA** |

Sources for event length / scaling: Nordic Online Power Profiler methodology; Embedwise nRF52 power-profiler writeups citing ~1.2 ms / 3-channel events and ~**58 µA** radio-only at 100 ms vs ~**5.8 µA** at 1 s (0 dBm, nRF52840-class TX). Always verify with **PPK2** on GG PCB.

Add **System ON + RTC sleep** (see §2): typically **~1.5–3 µA** SoC idle → at long intervals sleep dominates; at ≤100 ms radio dominates.

### Time-to-detect vs interval (product constraint)

Assume phone declares “lost” after **N consecutive missed** advertising opportunities spanning **≥ T_lost** (e.g. 10 s).

| Adv interval | Misses needed for ≈10 s dark | Detection latency (best → worst for first missed edge) | FP sensitivity to single fades |
|--------------|------------------------------|--------------------------------------------------------|--------------------------------|
| 20–50 ms | ~200–500 | Sub-second to few seconds after submersion | Low (many samples) |
| **100 ms** | **~100** | **~0.1–0.2 s** to notice cliff; 10 s threshold clean | Moderate |
| 500 ms | ~20 | Up to ~0.5–1 s granularity | Higher |
| 1000 ms | ~10 | Up to ~1–2 s granularity; sparse | High (one miss = 10% of window) |

**Engineering recommendation for session-active monitoring:** target **~100–300 ms** advertising (or connection interval in that band) during Pool Session. Use **1–10 s** advertising (or System OFF / deep sleep) when session is idle / shelf / “off face.”

**Phone-side caveat:** iOS/Android scan duty cycle, background limits, and OS coalescing can stretch observed loss beyond device advertising math. Session UX should keep the app in a **foreground / locked-session** scan mode when promising ~10 s detection (see open questions in `01`).

---

## 2. Typical nRF52 / BLE SoC sleep currents (datasheet-class)

All figures **typical @ 3 V, DC/DC**, from Nordic product briefs / Product Specification tables / DevZone citations. Board leakage, regulators, and sensors **add on top**.

### nRF52832 (widely cited wearable class)

| State | Typical current | Source class |
|-------|-----------------|--------------|
| System OFF, no RAM retention | **0.3 µA** | nRF52832 product brief / PS |
| System OFF, full RAM retention | **0.7 µA** | PS / Nordic power blog |
| System ON, peripherals IDLE | **1.2 µA** | Product brief |
| System ON, IDLE + 32 kHz + RTC | **1.6 µA** | Product brief |
| System ON, wake on RTC (no RAM retention) | **1.9 µA** | PS summary / Nordic blog |
| TX @ 0 dBm (DC/DC) | **~5.3 mA** peak | Nordic optimizing-power blog |
| RX (1 Mbps) | **~5.4 mA** peak | Same / product materials |

### nRF52840 (only if needed)

| State | Typical current |
|-------|-----------------|
| System OFF, no RAM | **0.4 µA** |
| System ON, no RAM, event wake | **0.97 µA** |
| System ON, full RAM retention | **2.35 µA** |
| System ON, full RAM + RTC (LFRC) | **3.16 µA** |

**GG implication:** Between ads, budget **~2–5 µA** SoC if firmware is clean (LFCLK crystal, DC/DC populated, UART logging off). Real boards often measure **10–50+ µA** until leakage and sensor rails are hunted—treat datasheet as **floor**, not ship current.

**Cheaper SoC options:** nRF52805 / nRF52810 reduce die cost and flash; same sleep order of magnitude. Prefer lowest SoC that fits firmware + OTA strategy.

---

## 3. Coin cell vs LiPo for a goggle clip

| Factor | Primary coin (e.g. CR2032 ~220 mAh) | Rechargeable LiPo (~40–80 mAh) |
|--------|-------------------------------------|--------------------------------|
| Form / seal | Flat, easy retainer; **hard to recharge waterproof** without service hatch | Pouch or tiny cell; needs PCM + charge IC |
| Peak current | BLE TX pulses (**~5–12 mA**) cut effective capacity; cold pools worse | Handles pulses better if cell + caps sized |
| UX / retail $30–50 | “Replace battery yearly” → support + waterproof hatch COGS | “Charge like earbuds” matches consumer expectation |
| Season model | Possible if **very** aggressive sleep + rare sessions | Natural fit for **session-mode** + nightly charge |
| Safety / shipping | Simpler UN38.3 story for primaries | Li-ion transport, abuse testing, PCM mandatory |
| Unit COGS | Cell **~$0.15–0.40** @ volume | Cell+PCM **~$0.80–2.50**; charger path extra |

**Recommendation:** **LiPo rechargeable** for GG clip at $30–50 retail. Coin is a fallback for a sealed disposable SKU, not the primary architecture if fusion sensors and frequent summer sessions are required.

### Capacity sizing sketch (assumptions labeled)

**Assumptions:** 60 mAh LiPo usable 80% → **48 mAh**; session adv @ 100 ms → **I_avg ≈ 60–100 µA** (radio + SoC + light IMU duty); idle shelf **~5–15 µA**.

| Mode | Approx. runtime |
|------|-----------------|
| Continuous session advertising @ ~100 ms | **~20–30 days** continuous (not realistic use) |
| **2 h session / day** @ session current + 22 h idle | **~Season+** (order **3–6 months** calendar) before recharge—**design target** |
| Idle only (no session) | **Months to >1 year** if leakage controlled |

*These are order-of-magnitude engineering estimates. Validate on hardware with PPK2 and worst-case pool temperature.*

---

## 4. Waterproof charging: contacts vs inductive

| Approach | Size on clip | Rough incremental BOM @ mid volume | Pros | Cons |
|----------|--------------|------------------------------------|------|------|
| **Sealed magnetic pogo / spring contacts** (2–3 pin) + matching cradle | Small; pins on bottom of clip | Contacts **~$0.40–1.50**; cradle tooling separate | Lowest cost; thin; high efficiency | Corrosion/chlorine; seal design; user must dock |
| **Inductive (Qi-like or proprietary)** Rx coil + IC | Coil **~10–20 mm** OD, **0.3–0.8 mm** thick (wearable class) | Coil+Rx IC+passives **~$1.50–4+** | Fully sealed enclosure; no exposed metal | Thickness, ferrite, alignment, lower efficiency, EMI near IMU/antenna |
| USB port (standard) | Too large / leaky for goggle clip | N/A | — | **Not recommended** for IP67/68 pool product |

**v1 recommendation:** **Magnetic sealed contacts** to protect $30–50 COGS and thickness. Design chlorine-compatible plating and a cheap plastic cradle (can ship in-box or as accessory). Revisit inductive if returns/corrosion dominate or if industrial design forbids openings.

**Charger IC:** ultra-low-Iq linear Li-ion charger (wearable class, e.g. TI BQ2512x family class) typically **~$0.30–0.80** @ volume + protection.

---

## 5. IMU + wetness: incremental BOM and power

Required by the BLE-loss fusion architecture in `01` (reject phone-away FPs; catch shallow face-down FNs where possible).

| Component | Role | Volume unit cost (est.) | Power notes |
|-----------|------|-------------------------|-------------|
| **6-axis IMU** (e.g. Bosch BMI270 class) | Orientation / stillness / free-fall into water | **~$0.50–1.50** @ 10k+ (distrib. list prices higher at 1s) | Full A+G ~**685 µA** typ (BMI270 DS); **accel-only / low-ODR / interrupt wake** → tens of µA average if duty-cycled |
| **Wetness / conductivity pads** | Housing water contact | **~$0.05–0.30** (PCB electrodes + series R) | Near-zero when dry; µA-level pulsed sense when checking |
| Optional coarse pressure | Depth vs splash | **+$1–3** MEMS | Higher cost; defer if BOM tight |
| Optional wear-detect | Mag / capacitive “on goggles” | **+$0.10–0.80** | Critical UX; cheap if magnetic |

**Power strategy:** IMU **not** continuous full-rate gyro during 2 h swim. Use **accel low-power + motion interrupt**; sample gyro briefly on BLE-cliff events. Wetness: **periodic pulse** (e.g. every 0.5–2 s) during session only.

**Incremental average current (session, well-tuned):** target **+20–80 µA** for IMU+wetness combined—still secondary to **100 ms advertising** unless IMU left in full-performance mode (then IMU alone can exceed radio).

---

## 6. Session-mode impact on battery life

| Operating mode | Radio policy | Relative energy | Product meaning |
|----------------|--------------|-----------------|-----------------|
| **Shelf / off** | System OFF or rare beacon | **1×** baseline | Months–year |
| **Paired idle (no pool)** | Adv every 1–10 s or connect infrequently | **~2–10×** | Find-my-goggles / battery check |
| **Pool Session ON** | Adv / connect **~100–300 ms** + sensors | **~20–100×** vs shelf | Only hours per week of real use |
| Always-on fast adv (anti-pattern) | 100 ms 24/7 | Battery dies in **weeks** | Destroys unit econ & reviews |

**CFO takeaway:** Session-mode is not just a safety/FP control from `01`—it is the **battery COGS enabler**. Without it, you either (a) ship a larger LiPo (size/weight/cost), (b) force daily charge friction, or (c) use coin cells with hatch service pain.

---

## 7. Rough COGS sensitivity table (electronics + enclosure)

**Assumptions (labeled):** USD; mid-volume **~10k–50k** units; China/EMS turnkey electronics; **excludes** labor assembly (or includes only PCB SMT in SoC line), packaging, freight, tariffs, returns, app, certification (FCC/CE/IP), marketing. Numbers are **planning ranges**, not quotes.

| Line item | Lean build | Nominal GG (recommended) | Rich build | Sensitivity notes |
|-----------|------------|--------------------------|------------|-------------------|
| **BLE SoC** (nRF52-class + XTAL) | $1.50 | **$2.00–3.00** | $4.00 | Biggest silicon swing; 840 unnecessary |
| **Battery** | Coin $0.25 | **LiPo 40–80 mAh + PCM $1.00–2.00** | $3.00 | Capacity vs session hours |
| **Charger path** | None (coin) | **Contacts + charge IC $0.70–1.80** | Inductive $2.50–5.00 | Inductive is a **step-function** COGS hit |
| **PCB + passives + antenna** | $0.80 | **$1.20–2.00** | $3.00 | Antenna matching critical for RF cliff |
| **IMU** | Omit (not recommended) | **$0.50–1.50** | $2.00 | Required for credible fusion |
| **Wetness / wear sense** | $0.10 | **$0.20–0.60** | $1.00 | Cheap; high FP-reduction value |
| **Enclosure (IP-rated clip)** | $0.80 | **$1.50–3.00** | $4.00+ | Tooling amortized separately |
| **Misc (LED, button, mag, adhesive)** | $0.30 | **$0.50–1.00** | $1.50 | |
| **Indicative electronics+enclosure total** | **~$4–6** | **~$8–14** | **~$18–25** | $30 retail wants lean/nominal; $50 tolerates richer charge/sensors |

**Retail mapping (rule of thumb, not finance policy):**  
- **$30** SKU → push **nominal-lean** (~$8–10 COGS electronics/enclosure); contacts not inductive; smallest viable LiPo.  
- **$40–50** SKU → room for better seal, cradle-in-box, optional pressure later.

---

## 8. Assumptions checklist (do not drop these when pasting into unit econ)

1. Currents are **Nordic typical @ 3 V DC/DC**; production boards need PPK2 correlation (±2× common until optimized).  
2. Advertising energy scales **≈ linearly** with 1/interval for intervals ≤~500 ms.  
3. **Session duty** assumed **~2 h active / day** summer; winter storage idle.  
4. COGS are **component mid-volume estimates**, not landed cost or MSRP.  
5. IMU power assumes **duty-cycled** firmware, not continuous 685 µA.  
6. Waterproofing and chlorine corrosion can dominate **warranty COGS** more than $0.50 of BOM—budget returns.  
7. Phone OS scan behavior can force **faster advertising** than physics alone needs—treat as product risk.  
8. Certification (FCC/CE/UKCA), IP testing, and child-product compliance are **above** this table.

---

## Sources (public / datasheet-class)

1. Nordic nRF52832 product brief — System ON IDLE **1.2 µA** / IDLE+RTC **1.6 µA**; System OFF **0.3 µA** (DC/DC @ 3 V).  
2. Nordic nRF52840 product brief / PS sleep tables — System ON **0.97 / 2.35 / 3.16 µA** variants; System OFF **0.4 µA**.  
3. Nordic DevZone: “Optimizing Power on nRF52 Designs” — TX **~5.3 mA** @ 0 dBm DC/DC; System ON with LFCLK/RTC ~**1.9 µA** (832) / ~**1.5 µA** (840 class discussion).  
4. Nordic Online Power Profiler (DevZone) — BLE event charge → average current vs advertising interval methodology.  
5. Embedwise nRF52 Power Profiler — illustrative ~**58 µA** radio-only @ 100 ms vs ~**5.8 µA** @ 1 s (0 dBm).  
6. Bosch BMI270 datasheet — typ. **685 µA** full-performance A+G; compact LGA for wearables.  
7. TI wearable wireless-charge reference designs (e.g. TIDA-00712 / SLUA748 class) — inductive Rx + Li-ion charger architecture for size context.  
8. Companion physics/safety note: `01-ble-submersion-signal.md`.

---

*End of power/BOM addendum. Next eng step: PPK2 measure of GG prototype at 100 / 300 / 1000 ms adv with IMU duty cycle ON/OFF; update table with measured I_avg before locking cell capacity.*
