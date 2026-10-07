# Drowning-prevention wearable landscape (Sep 2026)

**Audience:** CoS / CFO / PM (Guardian Goggles)  
**Scope:** Parent B2C backyard / unsupervised pools; facility/camera as adjacent contrast  
**As-of:** Mon Sep 21, 2026 (America/Chicago)  
**Status:** v1.1 — CoS-requested explicit sections (form-factor HOLD)  
**Assumptions labeled.** Not legal advice; not a form-factor decision.

**Canonical path:** `strategy/market-landscape.md`  
**Planning locks:** ASP launch kit ~$150–250 hardware-first ($30–50 later add-on only); form factor HOLD; WAVE US11715361 HIGH until counsel claim-charts.

**Inputs:** GG project brief; Science (`gg-science/01-ble-submersion-signal*.md`); prior landscape pass.

---

## v1.1 contents (CoS)

1. [Full map — wearable / alarm / camera / facility](#1-full-map--wearable--alarm--camera--facility)
2. [Goggle-attachable vs alternatives (tradeoffs only — HOLD)](#2-goggle-attachable-vs-alternatives-tradeoffs-only--hold)
3. [Is there better tech than BLE-loss proxy?](#3-is-there-better-tech-than-ble-loss-proxy)
4. [Can cleaner UI + lower econ win? (success-conditions checklist)](#4-can-cleaner-ui--lower-econ-win-success-conditions-checklist)
5. [WAVE B2B vs GG parent B2C positioning](#5-wave-b2b-vs-gg-parent-b2c-positioning)


---

## Executive summary

Parent B2C drowning-prevention wearables are a **thin, high-churn category**. Closest GG predecessor **iSwimband** (Aquatic Safety Concepts / Dave Cutler, ~2014, **$99**, band/wrist/goggle-strap → BT phone alert after submersion timer) is **defunct**—app/store death, non-rechargeable, sparse bad Amazon leftovers. Cutler co-founded **WAVE**, same RF/BLE-loss + timer class, now **facility GUARDian ($149–$399/mo)**; consumer W10 was **$699 hub + $99 tracker** (2021). Live parent price anchors: **WaterWatch $199** pre-order (entry-on-water hub+band, ships Summer 2026), **PoolGuard ~$170–$300** entry alarms, **SWÖM 749–999 DKK** inflate swimwear. Dead: **SEAL (~$379, ceased ~2020)**, **Safety Turtle** (discontinued), **BuddyTag (~$38–45)**.  

**Science (binding for claims):** BLE-only “lost >~10s = drowning” is **not shippable** as a life-safety claim. Physics supports immersion-when-antenna-submerged; product needs **Pool Session + fusion** (wetness/pressure/IMU/on-face) and honest **Lost Connection** states. RF-loss/submersion-timer prior art is **crowded**—high-level IP flag only; Legal owns depth.  

**Form factor:** Evidence shows **goggle clip, headband, wrist, and hub systems all exist**; tradeoffs below. **FORM FACTOR STAYS HOLD—no wrist-vs-goggle recommendation in this brief.**  

**Economics hypothesis (reasoned, not hype; ASP now locked):** Launch kit **~$150–250** hardware-first (CoS/CFO lock); **$30–50** as later add-on only. Cleaner UI + living apps + optional ~$2.99/mo class *could* improve on iSwimband’s failure modes (price, recharge, app continuity, honesty UX)—but only if session/fusion cuts false alarms and distribution doesn’t abandon the app. Category history shows **demand at $99–$200** and **death by software/BOM**, not by “wrong price alone.”

---

## Science framing (claims hygiene)

| Point | Implication for market/positioning |
|---|---|
| 2.4 GHz BLE dies in cm-scale water path when antenna submerged | Immersion *proxy* is physically real |
| Lost BLE >~10s alone ≠ drowning | Many FPs (phone away, towel, play, battery) and FNs (head-up distress, shallow face-down) |
| Ship **Pool Session** + presence + **sensor fusion** + staged alerts | Marketing = “supervised-session backup,” not “detects drowning” |
| RF-loss / submersion-timer prior art crowded (iSwimband-era, WAVE, SEAL-class, example patents US11715361 / US11770154) | **IP flag → Legal**; no “world’s first” copy |

Sources: `science/01-ble-submersion-signal-brief.md`; full note `01-ble-submersion-signal.md`; TELKOMNIKA 2018 IoT survey https://doi.org/10.12928/telkomnika.v16i4.9046

---

## 1. Full map — wearable / alarm / camera / facility

### Wearables (parent / consumer)

| Product | Status | Mechanism (public) | Price | Notes |
|---|---|---|---|---|
| **iSwimband** | **Dead** | Submersion timer → BT phone; band / wrist / goggle-strap | **$99** (2014) | Closest GG prior art; Cutler |
| **BuddyTag** | **Likely dead** / discontinued importer | BLE phone; proximity + ~5s attenuation (OOR≡water) | **~$38–45** | False alarms; abandonware risk |
| **WaterWatch** | **Pre-order** (sold out batch; Summer 2026) | Wrist **water contact** → hub siren + phone; free app | **$199** (was $275) | Entry immersion, not swim-under timer |
| **SEAL SwimSafe** | **Ceased ~Jul 2020** | RF hub↔band; time + removal + OOR | **~$379** | Better honesty model; BOM killed co. |
| **Safety Turtle** | **Mfr discontinued** | Wrist immersion → base | Hist. ~$85–$190 | Entry-only |
| **LunaSafe** | Live (Turtle successor positioning) | Immersion wrist → base | Kit ~**$199.99** | Entry |
| **SWÖM** | Voucher / pre-ship | **Depth+time → inflate** | **749–999 DKK** | Different primary fix |
| **WAVE W10** | Hist. consumer 2021; co. institutional-first now | BLE loss → **hub** | **$699+$99** (2021) | Same physics class as GG |

### Pool alarms (non-wearable, live shelf)

| Product | Status | Mechanism | Price |
|---|---|---|---|
| **PoolGuard PGRM-2 / SB2** | **Live** | Deck/floating **entry** ASTM F2208 | MSRP **$249.95–$299.95**; Amazon ~**$170–$219** |

### Cameras / AI

| Product | Status | Mechanism | Price |
|---|---|---|---|
| **Coral Manta 3000** | Spotty retail | Underwater CV | MSRP **$1,999** (2019) |
| Poseidon / SwimEye / Lynxight | Commercial | Facility AI/cameras | Quote / $10ks–$100ks |

### Facility systems (contrast only)

| Product | Status | Mechanism | Price |
|---|---|---|---|
| **WAVE GUARDian / AquaSense** | **Live B2B** | Wearable + hub; timer public **up to ~30s**; staff alerts | **$149–$399/mo** |

**Assumption:** WAVE “Buddy Tags” (2021 timeline) ≠ consumer My Buddy Tag wristband.


---

## Parent failure modes (PM P0)

1. **Missed / ambiguous BLE** — phone too close → no iSwimband alert (Earnest Parenting 2014); WAVE float-off = unmonitored silence (New Atlas 2021); BuddyTag OOR≡water (vendor FAQ).  
2. **False alarms** — underwater play (WAVE IJCI 2022); BuddyTag Trustpilot nuisance; PoolGuard wind; Science: play dunks, phone away, towel, dead battery.  
3. **Abandonware app** — iSwimband Amazon: app gone / won’t pair; BuddyTag discontinued.  
4. **Silent mode / phone path** — iSwimband foreground vs background partial; WaterWatch *claims* critical-alert bypass (marketing until tested).  
5. **Kids remove device** — parent Reddit distrust; Turtle/BuddyTag used locks; Science FN if not worn.  
6. **Multi-kid** — iSwimband ≤8; WaterWatch ≤4 bands/hub (product page); SEAL swim levels praised.  
7. **Recharge vs disposable** — iSwimband/BuddyTag sealed; WaterWatch/WAVE/SEAL rechargeable.  
8. **Buyability** — category littered with dead SKUs.

URLs: Earnest Parenting; New Atlas WAVE; IJCI; Amazon B017M6UNTM; Trustpilot mybuddytag; wtrwatch.com; Science brief.

---

## 2. Goggle-attachable vs alternatives (tradeoffs only — HOLD)

**Question:** Is goggle-attachable best, or is there better tech/form?  
**Answer for now:** Present evidence-only tradeoffs. **Do not settle wrist vs goggle (or hub).** Form factor remains **HOLD**.

| Form | Who used it | Evidence-backed pros | Evidence-backed cons / open risks |
|---|---|---|---|
| **Goggle clip / strap** | iSwimband (goggle strap option); WAVE AquaSense goggle clips | Near head/antenna for submersion proxy; WAVE ships facility goggle clips; GG brief assumes this | Science: **shallow face-down** may leave antenna in air → FN; kids may refuse goggles; mount fall-off |
| **Headband** | iSwimband; WAVE AquaSense headband | Stable for timed head-under; facility validated | Comfort/fit issues in WAVE camp study (IJCI); removal |
| **Wrist / watch band** | Safety Turtle; BuddyTag; WaterWatch; SEAL (neck/band) | Fits non-swimmers / toddlers; locking designs exist; WaterWatch $199 demand | Entry-wet ≠ drown; arm out of water while head under → FN for “drown”; easy splash FPs if contact-based |
| **Phone-only (no hub)** | iSwimband; BuddyTag | Low ASP; portable | App abandonware; OS background/silent-mode risk; phone away = FP or missed monitoring |
| **Hub + wearable** | WAVE; SEAL; WaterWatch | Local siren survives phone issues; WaterWatch: siren without Wi-Fi | ASP **$199–$800+**; SEAL died on electronics cost; backyard friction |
| **Inflate swimwear** | SWÖM | Active rescue buoyancy; depth+time | Different category; refill UX; not parent-phone alert |
| **Pool entry alarm / AI cam** | PoolGuard; Coral | No child compliance; ASTM shelf | Wrong problem for “kid already swimming”; wind / install / cost |

**Science overlay (not a form pick):** Whatever mount, BLE-loss needs **session + fusion + wear-detect**; form alone does not fix FP/FN.  
**Decision rule:** Form factor HOLD until eng measures RSSI-vs-depth on candidate mounts and FP rates in play swimming (Science open measurements).

---


## 3. Is there better tech than BLE-loss proxy?

**Short answer:** Several *adjacent* modalities are commercially live or recently tried; none is proven as a superior *parent-B2C* replacement for a low-ASP wearable without trading off cost, compliance, or problem definition. BLE/RF-loss remains common because water kills 2.4 GHz cheaply — but Science says it is a **proxy**, not a drowning detector.

| Tech class | How it works (public) | Who ships / shipped | Vs BLE-loss for GG parent use | Verdict for GG |
|---|---|---|---|---|
| **BLE/RF loss or attenuation + timer** | Antenna submerged → link dies / attenuates → alert after N seconds | iSwimband (phone); WAVE (hub); BuddyTag (OOR≡water) | Same physics class GG proposes | **Crowded**; needs session + fusion + honesty UX; Legal: WAVE US11715361B2 HIGH FTO theme |
| **Conductive / electrode immersion** | Water bridges contacts → timer | iSwimband press often described as “submerged” (confirm electrode vs RF in teardown) | More direct wetness; still FPs from splash / play | Useful as **fusion input**, not sole claim |
| **Water-contact / capacitance (entry)** | Band gets wet → immediate alarm | WaterWatch; Safety Turtle; LunaSafe; PoolGuard (pool surface) | Solves **unsupervised entry**, not prolonged swim-under distress | Different problem; strong $170–$200 WTP — not “better drown detect” |
| **Depth + time → inflate** | Pressure/depth sensor; auto buoyancy | SWÖM | Active rescue; no parent phone required | Better *intervention*, different SKU/ASP/refill UX; complement not substitute |
| **Depth/pressure + time → phone alert** | On-body pressure threshold | (few live parent B2C peers) | Stronger submersion evidence than RF alone | **Promising fusion/ invent-around axis** (Science + Legal) |
| **IMU / stillness / orientation** | Motionlessness or face-down pose | Research / some lifejackets; not a dominant kid-pool SKU | Catches head-up distress RF may miss; play FPs | **Fusion layer**, not solo product |
| **On-face / wear-detect** | Cap sense / optical / clasp | SEAL removal alert; Turtle locks | Fixes “device not on kid” honesty gap | Required honesty feature regardless of RF |
| **Hub + local siren** | Wearable ↔ poolside hub | WAVE; SEAL; WaterWatch | Survives phone-in-house / silent-mode failures | Better reliability path; **breaks $30–50** unless phone-first + optional hub later |
| **Underwater / pool AI cameras** | CV drowning risk | Coral ~$2k; Poseidon / SwimEye / Lynxight facility | No child compliance; fixed install | Better for empty-pool / facility; not portable backyard wearable |
| **Ultrasonic / pool-installed hydrophones** | In-water acoustic | Older ASC / pool systems (patent art) | Facility install | Out of GG portable B2C scope |

**Implications (still HOLD on form):**
1. “Better than BLE-loss” in parent B2C usually means **fusion** (wetness/pressure/IMU/wear-detect) or **changing the job** (entry alarm, inflate), not a single magic sensor.
2. Pure BLE-loss phone products repeatedly failed on **FP/FN + app path**, not because RF physics is fake.
3. Do **not** market BLE-loss as drowning detection; do evaluate pressure/wetness as invent-around / Science P0 (aligns Legal invent-around axes).

Sources: Science briefs; New Atlas WAVE/iSwimband; wtrwatch.com; swom.dk; Coral/PoolPro; Legal memo US11715361B2.

---
## Why iSwimband failed (evidence)

| Factor | Evidence | URL |
|---|---|---|
| **Not in production** | New Atlas (2021): smartphone iSwimband “no longer in production” | https://newatlas.com/outdoors/wave-children-drowning-prevention/ |
| **Brand/site abandoned commerce** | iswimband.com = swim calculators; ToS updated Jul 23, 2026 | https://www.iswimband.com/ ; terms-of-service |
| **Abandonware app / unbuyable** | Amazon leftovers: no iOS app, site unavailable, BLE won’t configure; 3.5★ / 4 reviews | https://www.amazon.com/dp/B017M6UNTM |
| **Inventor moved on** | Cutler → WAVE co-founder; company pivoted to hub/facility | https://wavedds.com/about ; Openwaterpedia |
| **Non-rechargeable sealed battery** | New Atlas 2014 product report | https://newatlas.com/iswimband-drowning-alert/32781/ |
| **Phone/BLE fragility** | Parent review: no alert when phone too close | Earnest Parenting 2014 |
| **Platform risk** | iOS-first; Android “coming” for years | Premier Aquatics; New Atlas comments |
| **No recurring revenue visible** | HW + free app only in historical marketing | Launch coverage CBS/New Atlas |
| **Crowdfunding ≠ stay-alive** | Indiegogo 2015 raised $114,976 / $30k then still died as product | BackerKit |

**Not proven with sources (do not claim):** Exact shutdown date; insolvency filing; that “$99 was too high” as sole cause; that UI alone killed it.

---

## 4. Can cleaner UI + lower econ win? (success-conditions checklist)

**Question:** Can cleaner UI/app + **$30–50** hardware + optional **~$2.99/mo** succeed where iSwimband (~$99, free app, sealed battery) failed?  
**Answer shape:** Conditional — price/UI address *some* autopsy items; they do **not** clear Science FP/FN or app-abandonment risk alone.

### Success-conditions checklist (all should be true before claiming “we win where they failed”)

| # | Condition | Why it matters (evidence) | GG status / owner |
|---|---|---|---|
| S1 | **Living iOS + Android apps** with update path treated as safety-critical | iSwimband Amazon leftovers: app gone / won’t pair → brick | Eng/PM — P0 |
| S2 | **Rechargeable** + battery-health visible in UI | iSwimband sealed/non-rechargeable (New Atlas 2014) | Hardware — P0 |
| S3 | **Dual-channel honesty:** Submersion-risk ≠ Lost Connection / not-worn / phone-away | WAVE float-off silent failure (New Atlas 2021); BuddyTag OOR≡water | PM/UX — P0 |
| S4 | **Pool Session mode + sensor fusion** (not BLE-only drowning claim) | Science: BLE-only >~10s not shippable life-safety claim | Science/PM — P0 |
| S5 | **Silent/DND override** for critical alerts (validated on device, not just claimed) | Phone-as-siren fragility; WaterWatch *claims* bypass (unproven) | Eng — P0 |
| S6 | **ASP aligned to lock:** launch kit ~$150–250 HW-first (in-band with WaterWatch/PoolGuard); $30–50 later add-on only; free core multi-kid alerts; sub optional extras | Live parent anchors ~$170–$200; CFO Scenario A $30–50 DTC = RED | CFO/PM — locked |
| S7 | **Distribution that doesn’t orphan SKUs** (DTC + Amazon + support) | Category littered with dead products (iSwimband, SEAL, Turtle, BuddyTag) | CoS/GTM |
| S8 | **Legal path** past WAVE US11715361B2 claim-theme (invent-around or license) before scale claims | Legal: HIGH live FTO risk | Legal — gate |
| S9 | **Wear compliance** plan (retention, kids won’t yank) — form still HOLD | Parent distrust; removal FNs | PM/eng — after form decision |
| S10 | **False-alarm rate** acceptable in play swimming (measured) | WAVE IJCI play alerts; BuddyTag Trustpilot nuisance | Science/eng — gate |

### What lower econ + better UI *do* address
- Undercut iSwimband $99 and WaterWatch $199 → wider trial funnel (**assumption:** trust holds).  
- Recharge + app continuity + honesty UX map directly to documented iSwimband/WAVE wounds.

### What they *do not* fix alone
- BLE-only FP/FN (Science); child non-wear; hub-free phone fragility; SEAL-style BOM/support death; crowded RF-loss prior art.

### Conditional verdict (for CoS)
**Plausible** if S1–S5 and S10 ship before growth marketing; S6–S7 sustain the business; S8 clears counsel.  
**Not sufficient:** prettier UI + cheaper BOM without fusion/session → iSwimband failure at a lower price.  
**Assumption:** $2.99/mo converts only after free multi-child baseline; do not paywall the siren.

---


## CFO price table & WTP signals

| Offer | Price | Sub | Observed |
|---|---|---|---|
| WaterWatch hub+1 | **$199** (list $275) | $0 | wtrwatch.com Sep 21, 2026; batch sold out |
| PoolGuard PGRM-2 | ~**$170–$219** Amaz.; MSRP $299.95 | $0 | Amazon / poolguard.com |
| PoolGuard SB2 | MSRP **$249.95** | $0 | poolguard.com |
| LunaSafe kit | ~**$199.99** | $0 | retailer |
| SWÖM | **749–999 DKK** (~$110–145) | inflator ? | swom.dk |
| WAVE GUARDian | **$149–$399/mo** | yes | wavedds.com/pricing |
| WAVE W10 hist. | **$699+$99** | ? | New Atlas 2021 |
| iSwimband hist. | **$99** | $0 | New Atlas/CBS 2014 |
| SEAL hist. | **~$379** | $0 | Wareable 2016 |
| BuddyTag hist. | **~$38–45** | $0 | retail |
| Coral Manta | MSRP **$1,999** | ? | PoolPro 2019 |
| **GG target (locked)** | Launch kit **~$150–250** HW-first; **$30–50** later add-on only | opt ~$2.99/mo class (non-mandatory per CFO) | CoS planning lock 2026-09-21 |

**WTP signals:** WaterWatch $199 pre-order sellout; iSwimband Indiegogo 383%; PoolGuard ongoing Amazon volume; Reddit asks for bracelets (Airbnb) but distrusts sole reliance. **Not** a conjoint study.

**Band summary:** Live parent hardware clusters **~$170–$200**; historical wearables **~$40–$99** (dead) to **~$379** (dead). GG $30–50 is vacant vs live peers—**undercut WaterWatch**, not PoolGuard’s problem statement.

---


## 5. WAVE B2B vs GG parent B2C positioning

| Lens | WAVE | GG (planned) |
|---|---|---|
| Buyer | Institutional pools / YMCA-class (GUARDian) | Parent backyard B2C |
| Architecture | Wearable + **facility hub** + staff bracelets | Goggle clip + **parent phone** as hub |
| Detection class | RF/BLE loss / attenuation + submersion timer (public ~up to 30s) | BLE drop >~10s + explicit Lost Connection |
| Price | Historical W10 ~$699+$99; live **$149–$399/mo** B2B | ~$30–50 HW; optional ~$2.99/mo |

**Legal memo flag (high-level only — not FTO / not claim charts):** Legal’s first cut rates **US11715361B2** (WAVE Systems) as **HIGH live FTO risk** in the same technical neighborhood: wireless signal absence/attenuation as submersion proxy, with head-worn embodiments including **goggle / temple**. Older iSwimband-era grants are **LOW/expired**; closest BLE+phone-app filing appears **abandoned**. Commercial WAVE = institutional foil; **claim themes are not limited to YMCAs**. Landscape implication: treat WAVE as both (1) B2B contrast on price/hub and (2) **crowded RF-loss + goggle claim-theme** that Legal owns — invent-around axes (session mode, modality fusion, dual-channel Lost Connection vs Submersion) are product/Science work, not market clearance. Full memo: `strategy/iswimband-patent-analysis.md` · https://patents.google.com/patent/US11715361B2/en

**Positioning line (draft for CoS pack):** WAVE proves RF/BLE-loss + timer can sell — **to facilities that pay $149–$399/mo for hubs and staff workflows**. GG is the **parent-phone, backyard, $30–50** attempt at related physics with session/fusion honesty. Do **not** say “like WAVE but cheaper” in marketing without Legal clearance (US11715361B2 HIGH FTO theme). Say: **parent B2C session backup**; WAVE is institutional foil on price and architecture.

---
## Implications for GG (short)

1. Position as **session backup**, not drowning detector (Science).  
2. Launch ASP ~$150–250 HW-first (peer WaterWatch/PoolGuard band); $30–50 later add-on only; free siren path.  
3. Fix iSwimband autopsy items: recharge, app forever, Lost Connection, silent override.  
4. Fusion before scale marketing.  
5. **Form factor HOLD** pending measurements.  
6. Legal: **US11715361B2 (WAVE) = HIGH live FTO risk** (RF-loss + goggle embodiments) per Legal memo; older iSwimband grants LOW/expired; abandoned BLE+phone app filing — **no market clearance**; counsel claim-chart before lock. Path: `strategy/iswimband-patent-analysis.md`.  
7. Messaging foils: ghost iSwimband; price WaterWatch; shelf PoolGuard; inflate SWÖM; facility WAVE (commercial foil ≠ FTO clear).

---

## Gaps

- WAVE W10 2026 DTC status unverified.  
- WaterWatch field reviews N/A (pre-ship).  
- Form-factor HOLD until eng pool RSSI/FP tests.  
- Exact iSwimband electrode vs RF-loss internals → Legal/teardown.  
- No proprietary WTP survey.

---

## Sources

1. https://newatlas.com/iswimband-drowning-alert/32781/  
2. https://newatlas.com/outdoors/wave-children-drowning-prevention/  
3. https://openwaterpedia.com/wiki/ISwimband  
4. https://www.iswimband.com/  
5. https://www.amazon.com/dp/B017M6UNTM  
6. https://earnestparenting.com/2014/09/01/keep-kids-safe-around-water-with-iswimband-give-away-below/  
7. https://www.cbsnews.com/news/new-app-aims-to-sink-child-drowning-risk/  
8. https://wavedds.com/guardian-system  
9. https://wavedds.com/pricing  
10. https://wavedds.com/about  
11. https://journals.lww.com/ijci/fulltext/2022/12040/evaluation_of_the_wave_drowning_detection_systemtm.2.aspx  
12. https://swom.dk/  
13. https://business.esa.int/news/space-tech-swimwear-revolutionising-child-water-safety  
14. https://wtrwatch.com/products/waterwatch-safety-system-hub-1-band  
15. https://app.dealroom.co/companies/seal_innovation_1  
16. https://www.wareable.com/sport/swim-safety-wearable-kids-556  
17. https://poolguard.com/alarms/  
18. https://www.amazon.com/dp/B0007P2CAE  
19. https://www.trustpilot.com/review/mybuddytag.com  
20. https://www.littlegulliver.com.au/contents/en-us/p1392_My_Buddy_Tag_-_Pink.html  
21. https://doi.org/10.12928/telkomnika.v16i4.9046  
22. https://poolpromag.com/new-24-7-drowning-detection-system-from-coral/  
23. https://www.backerkit.com/projects/iswimband-the-ultimate-drowning-detection-device  
24. `science/01-ble-submersion-signal-brief.md`  
25. `science/01-ble-submersion-signal.md`  
26. `docs/PURPOSE.md` (public-service framing)  

---

*v1.1 Sep 21, 2026 — CoS five explicit sections; form-factor HOLD; Science claims hygiene; Legal WAVE FTO flag folded.*
