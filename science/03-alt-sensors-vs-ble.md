# Guardian Goggles (GG): Alt Sensors vs BLE-Loss (Technical Addendum)

**Document type:** Technical addendum for PM / eng / legal / CoS  
**Companion to:** `01-ble-submersion-signal.md`, `02-power-battery-bom.md`  
**Form-factor constraint:** Rechargeable BLE sensor **clipped to swim goggles** — HOLD. Wristband / headband redesigns are out of scope as primary product.  
**Not:** Marketing copy, medical advice, or patent-infringement / FTO opinion  
**Date:** 2026-09-21  
**Trigger:** CoS / Michael — is there new/better tech than BLE-loss-as-proxy (beyond fusion already flagged)? Feasibility of wetness / pressure / IMU vs BLE-only on a goggle clip.

---

## Executive summary (one screen)

| Question | Short answer |
|----------|--------------|
| Is there a drop-in replacement for BLE-loss as primary immersion proxy on a **goggle clip**? | **No mature, equal-or-better single substitute** that keeps size, power, phone UX, and $30–50 retail. Wetness / pressure / IMU each fix different FNs/FPs; none uniquely replicates BLE’s **cm-scale RF collapse when the antenna is submerged**. |
| What should replace BLE-loss as *primary*? | Prefer **pressure (depth) + time** or **wetness + time** as the *immersion truth*, with BLE as **comms + RF-outage corroboration**—or ship **BLE + wetness + IMU** first if pressure packaging slips. |
| What is “newer” (2020–2026 public)? | Waterproof MEMS barometers (e.g. ST LPS28DFW class), IMU+pressure fusion classifiers in wearables patents, edge-ML IMU+pressure prototypes, SWÖM-style **depth→inflate**, LoRa/GNSS add-ons for *alerts after* immersion—not a new RF-loss physics. |
| v1 recommendation | **Pool Session + presence** + **BLE (comms + RSSI cliff)** + **resistive/capacitive wetness** + **6-axis IMU (duty-cycled)**; **pressure as v1.1 if O-ring/vent fit works**. Stage alerts; never claim BLE-loss = drowning. |

---

## 1. BLE-loss alone — unique gift and hard limits

### What BLE-loss uniquely gives

At **2.4 GHz**, water is a lossy dielectric. Published pool / freshwater tests (Lloret et al. 2012; Qureshi et al. 2016; see `01`) show usable links collapsing on the order of **centimeters to ~15–18 cm** of underwater path—not meters. In air, the same radio reaches **tens of meters**.

**Unique product property for a goggle clip:**

- When the **antenna itself** is fully submerged, the parent phone (still in air, still “should be in range”) sees a **fast, deep packet / RSSI cliff**—often faster than waiting for a MEMS pressure sample to settle, and without needing a water-facing vent.
- That contrast (air meters → water centimeters) is **physics-native to RF**, not to wetness pads (surface contact) or IMU (motion/orientation).
- Dual use: same radio is **comms path** to the phone. No second link required for “alert parent on loss.”

### What BLE-loss cannot do

| Gap | Why |
|-----|-----|
| **Head-up distress** (exhaustion, seizure, medical event with face mostly above water) | No antenna submersion → no RF outage. **Irreducible FN for RF-loss.** |
| **Shallow face-down FN** | Antenna / PCB still in air while face is in water → BLE may continue. Critical for **goggle** mount (antenna often sits high on frame). |
| **Bobbing / intermittent ads** | Brief resurfacing refreshes packets → never accumulates continuous “lost > T.” |
| **“In range” false premise** | Phone in pocket, other room, airplane mode, OS kill → looks like submersion. |
| **Non-submersion RF silence** | Dead battery, crash, removed goggles in bag, 2.4 GHz congestion. |

**Verdict:** BLE-loss is a strong **antenna-submersion / RF-outage** detector and a weak **drowning** detector. It should not be demoted to zero value—but it also should not remain the *sole* immersion truth.

---

## 2. Candidate on-goggle sensors (clip feasibility)

BOM figures are **order-of-magnitude mid-volume (≈10k–50k) electronics adders**, consistent with `02`. Not quotes.

### 2.1 Capacitive / resistive wetness (water contact)

| Axis | Assessment |
|------|------------|
| **What it measures** | Conductivity or capacitance change across exposed electrodes / pads when water bridges them. |
| **Size / form** | **Excellent for clip.** PCB pads or tiny gold/stainless electrodes on housing; shroud needed so wet hair does not false-trigger (public electrode-shroud art exists in swim-tag patents—flag for counsel). |
| **Power** | Near-zero dry; **µA-level** pulsed sense (e.g. 0.5–2 s) during session. |
| **Waterproofing** | Electrodes *must* see water; rest of enclosure stays sealed. Chlorine corrosion / plating is the wear-out risk. |
| **BOM** | **~$0.05–0.30** (pads + series R); comparator can be SoC GPIO. |
| **Fixes** | Rejects many “phone away / fridge / other room” FPs (device dry + BLE lost → “offline,” not “under”). Confirms **water contact** when BLE cliffs. |
| **Creates / residual** | Splash / continuous wet swim → wet almost always during pool use → alone **cannot** time “underwater.” Does not prove depth or face-down. Salt vs fresh thresholds need calibration. |
| **Pool maturity** | **High.** Decades of swim-tag / facility wearables use water electrodes; consumer bands claim immersion timers. |

**Role for GG:** Strong **corroborator / FP filter**, weak standalone primary.

### 2.2 Barometric / absolute pressure (depth)

| Axis | Assessment |
|------|------------|
| **What it measures** | Absolute pressure → depth once surface baseline known (~1 hPa ≈ 1 cm water). |
| **Size / form** | **Feasible but packaging-hard on a thin clip.** Waterproof MEMS (e.g. ST **LPS28DFW** class, ~2.8×2.8×2 mm, gel + O-ring seal, dual FS to ~4060 hPa / ~30 m) is die-size fine; **vent to water** + O-ring boss adds thickness and tooling. |
| **Power** | Datasheet class **~1.7–10 µA** depending ODR/mode—compatible with session LiPo if duty-cycled. |
| **Waterproofing** | Gel-filled water-resistant packages exist and are used in swim watches; chlorine/bromine gel claims in vendor materials. Enclosure must expose sensor correctly—**do not seal the pressure port inside a dry cavity**. |
| **BOM** | Sensor **~$1–3** @ mid volume + O-ring/boss mechanical cost. |
| **Fixes** | Differentiates **splash vs true depth**; enables SWÖM-like *depth + time* logic on the head (not torso). Helps shallow face-down if goggle sensor is under waterline even when RF antenna is not fully RF-dark. |
| **Creates / residual** | Needs **ambient baseline** (store last air pressure). Wave slap / dive play FPs if threshold too shallow. Still misses **head-up distress**. Vent clog / gel aging / seal fail = silent depth failure. |
| **Pool maturity** | **High in watches / swimwear; medium on goggle-clip packaging.** Public: SWÖM depth+time→inflate (~50 cm / ~8 s public claim); Apple-class wearable patent texts describe pressure+IMU submersion classifiers (e.g. US20240085185A1—flag for counsel, not GG claim). |

**Role for GG:** Best candidate to **replace BLE as immersion primary** *if* clip mechanicals allow. Else v1.1.

### 2.3 IMU (accel + gyro)

| Axis | Assessment |
|------|------------|
| **What it measures** | Orientation (face-down), motion variance, free-fall / entry splash, stillness. |
| **Size / form** | **Excellent.** 6-axis LGA (BMI270 class) fits any clip PCB. |
| **Power** | Full A+G hundreds of µA; **accel-only / low-ODR / interrupt** → tens of µA average—required for 40–80 mAh budget (`02`). |
| **Waterproofing** | Fully internal; no vent. |
| **BOM** | **~$0.50–1.50**. |
| **Fixes** | Face-down + low motion + (wet or BLE-lost) raises confidence; rejects some “goggles on towel vibrating” if fused with wetness; on-face / worn heuristics with mag or skin-prox. |
| **Creates / residual** | Swim strokes look “active”; distress can look like “still floating face-up.” ML on IMU alone has been demo’d (2024 hackster/Edge Impulse IMU+pressure prototypes) but **pool-play FP rates need GG data**, not blog accuracy claims. |
| **Pool maturity** | **High** as wearable component; **medium** as drowning classifier without fusion. |

**Role for GG:** Essential **corroborator**; never sole primary.

### 2.4 Optical / PPG (pulse / SpO₂-ish)

| Axis | Assessment |
|------|------------|
| **Feasibility on clip** | **Poor as v1.** Needs skin optical window against temple/orbit; motion artifact underwater; green LED + PD + DSP power; fogging / leak path. |
| **Power / BOM** | Tens–hundreds of µA when on; BOM **+$1–4** + optics mechanicals. |
| **Fixes (theory)** | Distress physiology with head up. |
| **Creates** | High FN underwater (no contact / turbidity); high FP from motion; clinical overclaim risk. |
| **Maturity for pool goggle clip** | **Low.** Wrist PPG in water is already hard; goggle clip contact is worse. |

**Verdict:** **Defer.** Research watch-item only.

### 2.5 Acoustic (mic / underwater modem to phone or base)

| Axis | Assessment |
|------|------------|
| **Feasibility** | Mic: splash/voice distress—**noisy pool**, privacy, power. Underwater acoustic modem to deck base: research-proven at range, **power/size/cost** hostile to $30–50 clip; needs **base station** SKU. |
| **BOM / power** | Modem path: **+$5–20+** and mA-class TX bursts. |
| **Maturity** | Academic / specialty; not consumer goggle-clip standard. |

**Verdict:** **No for v1 clip.** Optional future facility SKU, not parent-phone product.

### 2.6 UWB

| Axis | Assessment |
|------|------------|
| **What it offers** | cm–dm ranging in *air*; some patent texts pair UWB positioning with BLE-loss underwater (flag US11770154-class art for counsel). |
| **Underwater** | UWB (~6–8 GHz) attenuates **worse** than BLE in water—does **not** give a better underwater link; may sharpen “was in range then vanished” in air. |
| **Clip fit** | Antenna + SoC (nRF53/DW3000 class) → size, cost (**+$2–8**), cert. |
| **Maturity** | Consumer tags mature in air; **pool drowning use not a settled primary.** |

**Verdict:** **Corroborate presence / ranging in air only**; does not replace immersion sensing. Skip v1.

### 2.7 LoRa / LoRaWAN

| Axis | Assessment |
|------|------------|
| **What it offers** | Long-range alert when phone BLE fails (beach / lake). Public SWÖM GPS roadmap cites LoRaWAN + BLE for *post-inflate* alerting. |
| **Underwater** | Sub-GHz better than 2.4 GHz underwater in some pool studies—but that **reduces** the “loss = under” contrast GG exploits; antenna larger. |
| **Clip fit** | Module + antenna stretch form factor; gateway dependency; **+$3–10**. |
| **Maturity** | Good for **shoreline / open-water alert backhaul**; wrong primary for backyard pool phone UX. |

**Verdict:** Optional **v2 open-water** accessory path; not goggle-clip immersion primary.

### 2.8 NFC

| Axis | Assessment |
|------|------------|
| **Use** | Pairing, anti-counterfeit, “on dock” presence—not continuous submersion monitor (cm range, intentional tap). |
| **BOM** | **~$0.20–0.80** if tag-only. |

**Verdict:** UX nicety only.

### 2.9 Ultrasound to phone / base

| Axis | Assessment |
|------|------------|
| **Theory** | Water-friendly ranging / presence vs RF. |
| **Clip reality** | TX power, coupling, phone mic reliability, multipath in small pools, OEM variation—**engineering heavy**, weak phone-only story. |
| **Maturity** | Niche / research. |

**Verdict:** **No for v1.**

### Sensor shortlist summary

| Sensor | Clip fit | Replace BLE as immersion primary? | Corroborate? |
|--------|----------|-----------------------------------|--------------|
| Wetness | Excellent | No (contact ≠ depth/time under) | **Yes — v1** |
| Pressure | Good if vent/O-ring ok | **Yes — best alternate primary** | Yes |
| IMU | Excellent | No | **Yes — v1** |
| PPG | Poor | No | Later R&D |
| Acoustic modem | Poor | No (needs base) | Facility only |
| UWB | Marginal | No (air ranging) | Maybe later |
| LoRa | Marginal | No | Open-water alert |
| NFC | Easy | No | Pairing |
| Ultrasound | Poor | No | No |

---

## 3. Comparison table (goggle clip only)

FP/FN = qualitative impact vs BLE-only baseline under **Pool Session + phone presence**. Power = session-active order of magnitude on top of BLE adv. BOM = incremental electronics vs BLE-SoC baseline.

| Stack | FP impact | FN impact | Power (session) | Incr. BOM | Form-factor fit |
|-------|-----------|-----------|-----------------|-----------|-----------------|
| **BLE-only** | **High** (phone away, play dives, OS, towel) | **Critical** gaps: head-up, shallow face-down, bobbing | Baseline (~60–100 µA @ ~100 ms adv class) | $0 | Excellent |
| **BLE + wetness** | **↓↓** dry+lost → offline not drowning; wet confirms immersion context | Slight ↓ (still miss head-up; shallow may wet pads before RF dies—mixed) | +µA pulsed | +$0.05–0.3 | Excellent |
| **BLE + pressure** | **↓** splash filtered by depth gate | **↓↓** true depth+time; still miss head-up; helps some shallow cases if port underwater | +few–tens µA | +$1–3 + mech | Good (vent/boss) |
| **BLE + IMU** | **↓** towel/still-air quirks; orientation gates | **↓** face-down stillness; **not** head-up distress | +tens µA if duty-cycled | +$0.5–1.5 | Excellent |
| **Recommended fusion** **BLE + wetness + IMU** (± **pressure** when packaging ready) | **↓↓↓** (staged confidence) | **↓↓** vs BLE-only; **head-up still open** | Manageable on 40–80 mAh with duty cycle | +~$0.7–2.0 without pressure; +~$2–5 with | Clip-hold if pressure deferred or thin O-ring boss |

**Reading the table:** Fusion does not create a perfect drowning detector. It converts BLE from a **noisy binary alarm** into a **confidence-scored immersion event** suitable for staged parent alerts.

---

## 4. “Better than BLE-loss?” verdict

### What could replace BLE as *immersion primary*

1. **Absolute pressure + time underwater** (with stored air baseline) — closest public commercial parallel: SWÖM depth+time (intervention = inflate; GG intervention = parent alert). Best physics match to “how deep / how long.”  
2. **Wetness electrodes + time** — mature, cheap; weaker than pressure (no depth). Facility swim-tags often use this family.  
3. **IMU+pressure classifiers** (2020–2026 wearable patent / research direction) — better submersion state machines; still need a phone or base path for parent alert.

### What should only corroborate (not replace)

- **BLE RSSI cliff / packet loss** — unique antenna-under signal + existing comms. Keep as **strong corroborator** and **comms**.  
- **IMU orientation / stillness** — corroborator.  
- **UWB / LoRa / NFC / ultrasound / PPG** — not v1 immersion primaries on this clip.

### Genuinely newer approaches worth watching (public, 2020–2026)

| Item | Why watch | GG relevance |
|------|-----------|--------------|
| **Waterproof MEMS barometers** (LPS28DFW / LPS33HW lineage in swim wearables) | Makes depth-on-clip realistic without custom oil-fill | **High** — packaging study |
| **IMU × pressure submersion classifiers** (e.g. wearable patent pubs correlating accel vs pressure-derived vertical accel; optional RF-present as *anti*-FP) | More robust wet/dry state than either alone | **High** algorithmically |
| **Edge-ML IMU (+ pressure) drowning prototypes** (2024–2026 hobbyist/IEEE wrist demos) | Shows ML appetite; FP claims unproven for kids’ pool play | **Medium** — data moat if GG collects |
| **SWÖM depth→inflate + ESA GNSS/LoRa alert roadmap** | Different primary fix (buoyancy); connectivity is secondary | **Invent-around / category** awareness |
| **Sub-GHz in-water wearables papers** | Better underwater RF — may *hurt* loss-as-proxy | Low for GG’s current thesis |
| **Camera / AI pool systems** | Facility, not goggle clip | Out of form-factor scope |

**Bottom line:** There is **no 2020–2026 “magic sensor”** that makes BLE-loss obsolete on a phone-paired goggle clip. The meaningful upgrade is **depth and/or wetness as immersion truth**, with BLE kept for **phone alert path + RF corroboration**, plus IMU for orientation/confidence.

---

## 5. Invent-around angle (high level — for Legal to check)

**Not an infringement opinion. Not FTO. Point counsel at public mechanism families.**

Public product/patent narratives cluster into different **primary mechanisms**:

| Mechanism family (public) | Typical intervention | Notes for counsel queue |
|---------------------------|----------------------|-------------------------|
| **RF / BLE loss or beacon silence when submerged** | Alert phone / hub | iSwimband-era press; WAVE-style hub systems; patent texts describing BLE attenuation / non-receipt (examples flagged in `01`: US11715361, US11770154) |
| **Water contact electrodes + timer** | Alert | Swim-tag / goggle electrode art (e.g. conductivity/capacitance “dipping” sensors in public patent literature) |
| **Depth / pressure + time** | Alert and/or **inflate** | SWÖM public depth+time→inflate; watch barometers |
| **IMU orientation / motion patterns** (± ML) | Alert | Academic / prototype / some goggle patent texts |
| **Fusion** of the above | Alert / escalate | Increasingly common in 2020s filings |

**GG factual product space (for counsel mapping, not clearance):**

- Form: **rechargeable clip on swim goggles** + **parent phone** (not facility hub, not inflate swimsuit).  
- Sensing: if GG ships **pressure- or wetness-primary immersion** with BLE as comms/corroboration, the *public* story differs from RF-loss-only embodiments—**still requires formal search**; fusion does not automatically clear RF-loss claims if GG also uses loss.  
- Claims hygiene: do not market “detects all drowning”; document residual head-up FN.

**Ask Legal:** chart GG claim language and firmware triggers against RF-loss, electrode-timer, depth-timer, and fusion families; include WAVE / iSwimband lineage and SWÖM as category comparables.

---

## 6. Recommended GG v1 sensing stack + open measurements

### v1 stack (ship intent)

1. **Product constraints (non-negotiable):** Pool Session mode; parent phone presence / heartbeat; distinct UX for “monitoring interrupted / device offline / not worn” vs “possible submersion.”  
2. **Radios:** BLE advertising ~100–300 ms in session (comms + RSSI cliff / consecutive-miss timer).  
3. **Wetness pads:** pulsed; gate “immersion context.”  
4. **6-axis IMU:** accel low-power default; gyro burst on events; face-down / low-variance flags.  
5. **Wear detect:** magnetic or mechanical “clipped to goggles” (cheap).  
6. **Staged alerts:** soft at mid-confidence (~5–10 s); strong only if BLE-lost **and** (wet **or** pressure) **and** optional IMU face-down / low motion (~15–30 s)—tune on data.  
7. **Pressure:** design enclosure boss for LPS28DFW-class **now**; populate on v1 if tooling ready, else **v1.1** without blocking wetness+IMU.

### Explicit non-goals for v1

PPG, UWB, LoRa, acoustic modem, ultrasound, camera AI, wristband/headband pivot.

### Open measurements (eng — do before locking claims)

1. **Antenna waterline matrix** on real clip: RSSI vs depth 0–100 cm; face-up/down; map shallow FN region (`01`).  
2. **Wetness pad placement:** hair false-trigger rate; time-to-wet / time-to-dry; chlorine corrosion 100-session soak.  
3. **Pressure packaging prototype:** O-ring boss thickness vs industrial design; depth noise in splash lane; baseline drift.  
4. **Fusion FP afternoon:** BLE-only vs BLE+wet vs BLE+wet+IMU (±pressure) over supervised play swim (age-appropriate volunteers / mannequin protocols).  
5. **Head-up distress gap:** document as **known residual FN** for labeling / legal / support macros—no sensor theater.  
6. **Power:** PPK2 with wetness pulse + IMU duty + optional pressure ODR on 60 mAh cell.  
7. **OS scan:** iOS/Android screen-off session reliability for 10 s loss detection.

### CoS decision forks (go / no-go)

See report-back section at end of companion brief bullets; primary forks:

1. **Pressure in v1 vs v1.1** (tooling / thickness / +$1–3).  
2. **Immersion primary = RF-loss vs wetness/pressure-primary** (claims + Legal chart).  
3. **Accept residual head-up FN** with explicit labeling vs expand scope (PPG / camera / different form factor)—latter breaks clip HOLD.

---

## Sources (addendum-specific)

- ST LPS28DFW product / datasheet materials (waterproof absolute pressure, dual FS, gel, O-ring)—wearable / water-depth class.  
- SWÖM public depth+time (~50 cm / ~8 s) → inflate; ESA BASS GNSS/LoRa alert roadmap.  
- Wearable submersion patent publications correlating IMU and pressure (e.g. US20240085185A1)—counsel review only.  
- 2024–2026 public IMU+pressure edge-ML drowning prototypes (Hackster / IEEE wrist-worn fusion papers)—feasibility signal, not GG validation.  
- Prior GG notes: `01-ble-submersion-signal.md` (RF physics, FP/FN), `02-power-battery-bom.md` (IMU/wetness BOM/power).

---

*End of addendum. Form factor remains goggle clip. Next: pressure enclosure spike + fusion FP afternoon.*
