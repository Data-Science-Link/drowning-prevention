# Guardian Goggles — iSwimband / Competitive Patent Landscape & Invent-Around Memo (Draft)

**Prepared for:** Michael Link / GG: Strategy  
**Product:** Guardian Goggles (GG) — rechargeable BLE sensor clip for kids’ swim goggles; parent phone app alarms if BLE drops >~10s (underwater RF loss treated as dangerous submersion); also explicit “Lost Connection” alert. Parent B2C (ASP lock: ~$150–250 hardware-first launch kit; $30–50 later add-on only; optional ~$2.99/mo — not required).  
**Focus:** Patent / FTO risk vs iSwimband lineage and adjacent drowning-wearable IP — especially BLE/RF loss-as-submersion.  
**Date:** 2026-09-21 (CDT)  
**Status:** Research draft for product/engineering discussion — **NOT formal legal advice / NOT a freedom-to-operate opinion.**

---

## 1. Executive summary

iSwimband (Aquatic Safety Concepts LLC; inventor lineage including David M. Cutler) was a near-identical parent-phone + wearable BLE concept (~2014): headband/wristband sensor, Bluetooth to iOS, multi-child, user-set submersion timers, marketed as a *supplement to supervision*. Public sources put packages around **US$99**, non-replaceable/long-life coin cell (not rechargeable), iOS-first app. Product is hard to buy today; commercial traction appears limited.

**Patent takeaway for GG (risk-ranked):**

| Priority | Asset | Status (public Google Patents) | Overlap theme with GG |
|---|---|---|---|
| **Highest attention** | **US20150194031A1** (+ **WO2014168907A1**) “Digital Swimmer Safety System” | **Abandoned** (failure to pay issue fee, ~2016) | **BLE/2.4 GHz RF loss → phone timer → alert**; multi-transmitter; swimmer vs non-swimmer thresholds; headband/forehead antenna; wristband toddler form |
| **Highest live risk in same technical family** | **US11715361B2** (WAVE Systems, Inc.) | **Active** (granted 2023-08-01; adjusted expiration ~2038-07-17) | **Wireless signal absence / attenuation as submersion proxy**; head-worn (incl. **goggle / temple**) transmitters; hub/server alert; dual-antenna / dual-temple redundancy |
| Medium/legacy | **US7642921B2** (+ abandoned continuations) Aquatic Safety Concepts | **Expired – Fee Related** | Wearable immersion timing + alarm; ultrasonic/hydrophone primary; **also discloses RF blockage** as alternate submersion inference |
| Crowded prior art (mostly expired or different modality) | Safety Turtle **US6157303A**; Thermocline **US8144020B2** / **US7554453B2**; older immersion alarms | Expired / lapsed / different form | Instant water-entry capacitance RF; buoyant release alarms — less central to phone-BLE loss concept |

**Bottom line for engineering:** The *exact* iSwimband phone+BLE claim set appears **abandoned and never issued**. That reduces (does not eliminate) risk from ASC’s 2014 application. **Live risk concentrates in WAVE’s US11715361B2**, which covers RF-loss-as-drowning-detection with head/goggle form factors — even though WAVE is institutional B2B, claim language is not limited to YMCAs. GG’s planned architecture (goggle clip + phone as sole hub + ~10s BLE drop + “Lost Connection”) sits in a **crowded claim-theme neighborhood**. Invent-around should prioritize **modality fusion, dual-channel “submersion vs mere disconnect,” on-device sensing, and non-RF proxies** — then have counsel claim-chart WAVE + any surviving ASC family members before locking hardware.

---

## Risk level calls (CoS)

| Scope | Level | Rationale |
|---|---|---|
| **US11715361B2 (WAVE) specifically** | **HIGH** | Active to ~2038; RF/BLE absence/attenuation as drowning proxy; headgear incl. **goggle** embodiments; hub/server + residential/smart-home discussion in spec. Closest live grant to GG’s planned architecture. |
| Older ASC **US7642921B2** / **US8730049B2** | **LOW** (enforcement) | Public records show **expired / lapsed** for fees; still useful as prior art / history, not primary enforcement threat. |
| Abandoned iSwimband **US20150194031A1** | **LOW** (enforcement) / **HIGH** (prior-art crowding) | Never issued — favorable vs ASC enforcement; still blocks identical novelty if GG patents the same idea. |
| **Overall FTO posture (pre-counsel)** | **HIGH** until claim-charted | Pure BLE-loss-as-submersion + goggle mount sits in WAVE’s claim-theme neighborhood. Invent-around (modality fusion, dual-channel Lost Connection vs Submersion, on-device sensing) can **lower** exposure but does **not** clear FTO without counsel. |

**Go/no-go:** Do **not** lock hardware or marketing claims until licensed patent counsel claim-charts **US11715361B2**. This memo is **not** formal legal advice.

---

## Buy vs invent-around (Michael priority)

**Explicit call (pre-counsel research posture — not formal advice):**

| Question | Call | Confidence | Why |
|---|---|---|---|
| **Buy “the iSwimband patent”?** | **No — not required / little to buy** | **High** | Closest phone+BLE filing (**US20150194031A1 / WO2014168907A1**) was **abandoned** (never issued). Older ASC grants (**US7642921B2**, **US8730049B2**) appear **expired / lapsed**. There is no publicly identified *granted, in-force “iSwimband” patent* that GG must acquire to ship a similar product. |
| **Invent around ASC / iSwimband lineage?** | **Yes — default path for ASC era IP** | **High** | Enforcement risk from ASC’s consumer BLE filing is low given abandonment/expiration. Still treat published iSwimband art as **prior art** (blocks GG from easily patenting the identical idea). Commercial invent-around (rechargeable, dual Lost-Connection vs Submersion, better app) is product strategy, not an FTO purchase. |
| **Buy / license WAVE **US11715361B2**?** | **Maybe — only after counsel claim-charts** | **Medium** (need claim chart) | This is the **live** Cutler-lineage grant (active ~2038) covering RF absence/attenuation as drowning proxy with **goggle/headgear** embodiments. If GG ships pure BLE-loss-as-submersion on goggles and independent claims read on that design, options are: (1) **invent around** (modality fusion, on-device distress, dual-channel alerts), (2) **license/buy** from WAVE, or (3) redesign away from claim elements. Do **not** open acquisition talks or assume clearance without an attorney claim chart. |
| **Prefer invent-around over buying WAVE?** | **Yes as first strategy** | **Medium–High** | Buying facility-oriented WAVE IP is likely costly/complex vs designing clear of independent claims. Invent-around axes in §5 (depth/wetness fusion, separate Lost Connection state, IMU/on-device events) are the cheaper first bet — **if** counsel confirms they actually avoid the claims. |

### Recommended decision sequence
1. **Do not budget to “buy iSwimband patents”** based on public records — priority is WAVE FTO, not ASC acquisition.  
2. **Hire licensed patent counsel now** (before locking goggle+BLE architecture or raising on a “cleared” story) for a claim chart of **US11715361B2** vs GG’s intended design + scan of foreign WAVE/ASC families.  
3. After the chart: if claims are avoided → proceed invent-around; if claims read on GG → choose license/buy vs redesign (true **go/no-go** for Michael).  
4. Trademark / FTC / COPPA tracks stay separate from patent purchase.

**Confidence note:** High on “ASC consumer BLE patent not in force”; Medium on WAVE claim scope until counsel maps independent claims + doctrine of equivalents. **Michael needs licensed counsel before any go/no-go on buy vs invent-around vs ship.**

---

## 2. Competitor / company map (sourced)

### 2.1 iSwimband — Aquatic Safety Concepts LLC
- **Legal / brand name:** Aquatic Safety Concepts LLC (publicly Redding / New Canaan, CT in press). Product brand **iSwimband®**; also **Wahooo®** (commercial pool system lineage). Sources assert iSwimband is a registered trademark of ASC; **USPTO serial/registration number not confirmed in this research pass** (TSDR search via public web did not surface a clear serial — counsel should pull TSDR).
- **Inventors / people:** David M. Cutler (co-founder; publicly claims inventorship of iSwimband and co-invention of Wahooo / WAVE). Digital Swimmer Safety System inventors also include Eric Lee Ferguson, Christopher J. Allen Sr., Paul E. Taylor, Thomas F. Healy, Timothy Corcoran Repp, Michael Dennis Tetreault, Michael Andrew Daigle.
- **Product claims (marketing):** Wearable Bluetooth sensor (headband or wristband); pairs with iOS; alerts if submerged beyond user-set time (typical **20–30s** for swimmers; toddler water-entry mode); up to **8** bands per device; range ~**100 ft / 30 m**; **not a substitute for supervision**. Package ~**$99** (headband + wristband + sensor). Battery marketed as long-life / sleep after no motion ~10 min — **not rechargeable**.
- **Sources:**  
  - https://newatlas.com/iswimband-drowning-alert/32781/  
  - https://www.premieraquatics.com/news/view/swimband  
  - https://cerebral-overload.com/2014/01/iswimband-drowning-detection-system-big-hit-ces/  
  - https://www.slideshare.net/slideshow/30-iswimbandbusinessplan/61171910 (business plan cites WO2014168907A1 as pending patent behind iSwimband)

### 2.2 WAVE Drowning Detection / WAVE Systems, Inc.
- **Positioning:** Institutional / commercial pools, camps, YMCAs — hubs, lifeguard wearables, AquaSense headbands / **goggle clips**. Same Cutler lineage (with Mark F. Caron). Markets “patented” RF/IoT drowning detection.
- **Sources:** https://wavedds.com/ ; https://wavedds.com/products ; https://wavedds.com/about ; https://patents.google.com/patent/US11715361B2/en

### 2.3 SWÖM Smart Swimwear
- **Positioning:** Kids’ UV swimwear with **depth sensor**; auto-inflates if ~**50 cm** underwater for ~**8 seconds**; refillable gas canister; ~€/$100 class consumer product. **Different modality** (inflate/rescue vs phone alarm). Company states patent filed; **no SWÖM-assigned patent number confirmed** in this pass. Adjacent art includes inflatable garment patents (e.g., US9868495; US20200262528A1-type filings).
- **Sources:** https://swom.dk/en ; https://swom.dk/en/pages/faq

### 2.4 Other adjacent products
- **Safety Turtle** (Terrapin Communications) — wristband capacitance immersion → base alarm (toddlers / pool entry). Patent US6157303A.  
- **Seal / SEAL SwimSafe** — wearable RF loss to local hub (similar conceptual neighbor to iSwimband; press comparisons).  
- Pool-edge / camera systems (Pool Guard class) — out of GG’s wearable+phone core but relevant to “crowded drowning safety” messaging.

---

## 3. Key patents & applications (with claim themes)

> **Caveat:** Claim themes below are high-level readings of published abstracts/claims for product strategy — **not claim charts**. Dependent claims, doctrine of equivalents, and foreign counterparts require counsel.

### 3.1 US20150194031A1 — Digital Swimmer Safety System *(closest iSwimband filing)*
| Field | Detail |
|---|---|
| **Number** | US20150194031A1 (App. US14/408,996); PCT **WO2014168907A1** (PCT/US2014/033256) |
| **Title** | Digital Swimmer Safety System |
| **Assignee** | Aquatic Safety Concepts LLC |
| **Inventors** | David M. Cutler; Eric Lee Ferguson; Christopher J. Allen, Sr.; Paul E. Taylor; Thomas F. Healy; Timothy Corcoran Repp; Michael Dennis Tetreault; Michael Andrew Daigle |
| **Priority / filing / pub** | Priority ~2013-04-08 (prov. 61/809,477 etc.); filed 2014-04-08; published 2015-07-09 |
| **Status** | **Abandoned** — Google Patents: abandoned for failure to pay issue fee (~Apr 2016). **Never granted in this US national-phase record.** |
| **Claim theme (high level)** | Smartphone (or other programmable radio device) **establishes digital connection** with personal transmitter; **starts timer when connection lost**; **alerts if timer ≥ threshold**; resets if advertising returns; **runs in background**; carrier ~**2.4 GHz attenuated ≥5 dBm/cm water** (BLE/ZigBee class); forehead/headband antenna; multi-band with **different alert times** (e.g. ~20s swimmer / ~3s non-swimmer); wristband toddler form factor; LAN sharing of status. |
| **GG relevance** | **Near-identical architecture** to GG’s BLE-drop-as-submersion + phone alarm + multi-child thresholds. Abandonment is favorable for *this application*, but (a) published art still blocks novelty of identical claims if GG later patents; (b) does **not** clear WAVE’s later **granted** RF-loss patent. |
| **URLs** | https://patents.google.com/patent/US20150194031A1/en ; https://patents.google.com/patent/WO2014168907A1/en |

### 3.2 US7642921B2 — Electronic swimmer monitoring system *(Wahooo / ASC commercial lineage)*
| Field | Detail |
|---|---|
| **Number** | US7642921B2 (App. US12/175,797); family: US20100026501A1, US20110148642A1 (abandoned); provisional 60/951,243 |
| **Title** | Electronic swimmer monitoring system |
| **Assignee** | Aquatic Safety Concepts LLC |
| **Inventors** | David M. Cutler; Douglas D. Sutton; Lawrence R. Miller; Paul E. Taylor; Thomas F. Healy; Marlin J. Gregor; William G. Taylor |
| **Priority / filing / grant** | Priority 2007-07-23; filed 2008-07-18; granted 2010-01-05 |
| **Status** | **Expired – Fee Related** (Google Patents) |
| **Claim theme** | Wearable “Tag” senses nose/mouth submersion (conductivity / pressure), **times duration**, **transmits ultrasonic** alert via piezo; hydrophone monitor → RF/Bluetooth to supervisors. **Also discloses RF signal blockage by water** as alternate submersion timing method (Fig. 20 / claim 46 class). Mounting: head, goggles, waist, ear, etc. |
| **GG relevance** | Primary claims are ultrasonic/pool-installed — **less direct** to phone-only BLE. Still important as ASC lineage + RF-blockage disclosure in same family. Expiration reduces enforcement risk on this grant. |
| **URL** | https://patents.google.com/patent/US7642921B2/en |

### 3.3 US11715361B2 — Systems and methods for potential drowning incident detection *(WAVE — live)*
| Field | Detail |
|---|---|
| **Number** | US11715361B2 (App. US16/577,939); CIP of US15/951,917 (filed 2018-04-12) from provisional 62/484,661 (2017-04-12) |
| **Title** | Systems and methods for potential drowning incident detection |
| **Assignee** | WAVE Systems, Inc. / WAVE Systems LLC (assignment on record) |
| **Inventors** | David M. Cutler; Mark F. Caron |
| **Filing / grant / term** | Filed 2019-09-20; granted **2023-08-01**; **Active**, adjusted expiration **~2038-07-17** |
| **Claim theme (high level)** | Head-worn device with one or more **waterproof signal generators** (Bluetooth/BLE beacon class described); signals received by **hub/server**; **alert when signals not received** for a period (submersion inferred from RF attenuation/blockage); dual temple / dual antenna embodiments; **goggle and swim-cap form factors** expressly described; responder wearables; mesh hubs; residential/smart-home variants also discussed in spec. |
| **GG relevance** | **Highest live patent risk** for “RF/BLE loss = potential drowning → alert.” Spec expressly contemplates **goggle-mounted** transmitters and phone/smart-home monitoring variants. Institutional product ≠ narrow claims. **Must be claim-charted** against GG’s final architecture. |
| **URL** | https://patents.google.com/patent/US11715361B2/en |

### 3.4 US6157303A — Water safety portable transmitter and receiver *(Safety Turtle)*
| Field | Detail |
|---|---|
| **Number** | US6157303A |
| **Assignee** | Terrapin Communications Inc. |
| **Inventors** | John Bodie; Douglas George; Scott Gibson |
| **Priority / grant** | Prov. 1998-07-24; granted 2000-12-05 |
| **Status** | **Expired – Lifetime** |
| **Claim theme** | Wearable capacitance water sensor with **settable wetness threshold**; RF alarm to base on immersion (pool-entry / toddler focus — not timed recreational swim). |
| **URL** | https://patents.google.com/patent/US6157303A/en |

### 3.5 US8144020B2 / US7554453B2 — Water alarm devices… *(Thermocline / Seal Innovation lineage)*
| Field | Detail |
|---|---|
| **Numbers** | US7554453B2 (parent); US8144020B2 (continuation) |
| **Assignee** | Thermocline Ventures LLC |
| **Inventors** | Graham E. Snyder; Courtney Hopkins Mann |
| **Priority** | 2006-12-22 |
| **Status** | Expired-Fee Related / **lapsed** for nonpayment (US8144020B2 lapsed ~2024 per Google Patents) |
| **Claim theme** | Buoyant wearable; water contact timed; **releases and floats** / transmits air-path alarm — different mechanism from BLE phone monitoring. |
| **URL** | https://patents.google.com/patent/US8144020B2/en |

### 3.6 Other hits (landscape, not iSwimband-owned)
| Number | Theme | Status note | URL |
|---|---|---|---|
| US20040095248A1 | Wearable submersion timer → ultrasound/audible to poolside base | Application | https://patents.google.com/patent/US20040095248A1/en |
| US11302171B1 | Wrist biometric + panic → phone | Granted | https://patents.google.com/patent/US11302171B1/en |
| US9868495B2 | Controllable flotation garment / sensor-triggered inflation | Granted | https://patents.google.com/patent/US9868495B2/en |
| CN104824926A | Anti-drowning bracelet / sonar-optical underwater link | CN application | https://patents.google.com/patent/CN104824926A/en |

**Note on searching:** Public Google Patents / press / LinkedIn / ASC business-plan materials were used. **No granted US patent titled “iSwimband” was found.** The product’s disclosed IP path is the **abandoned Digital Swimmer Safety System** application plus older ASC ultrasonic grants. WAVE holds the **active** Cutler-line RF-loss grant.

---

## 4. Highest-risk claim themes for GG (product view)

Mapped to GG’s planned features:

1. **BLE / RF connection loss as immersion proxy + timed alert to a guardian device** — Claimed in abandoned US20150194031A1; **live** in US11715361B2 (hub/server, but RF absence → drowning alert). **Crowded.**
2. **Head / face / goggle mounting so nose-mouth submersion is inferred** — Disclosed across ASC ultrasonic, Digital Swimmer Safety, and WAVE (goggle embodiments). **Crowded.**
3. **Phone / personal electronic device as monitor with audiovisual alarm** — Core of abandoned iSwimband app; WAVE also describes phone/AR/smart-home variants. **Crowded for the idea; implementation details matter.**
4. **Multi-child / per-wearer thresholds (swimmer vs non-swimmer / age)** — Explicit in US20150194031A1 claims/spec. **Crowded as a feature; may still be free to implement if not practicing live claims.**
5. **“Lost Connection” vs “Dangerous Submersion” dual alerts** — Marketing differentiation GG wants; may help **product liability / UX**, but if both still fire from RF loss alone, may not invent-around RF-loss patents. **Open as UX; weak as pure patent differentiator unless backed by separate sensing.**
6. **Rechargeable vs disposable coin cell** — Commercial differentiator vs iSwimband (~$99, non-rechargeable). **Likely open** as IP (not a claim theme in the key patents); good unit-economics story, not FTO clearance.

---

## 5. Invent-around axes (actionable for engineering — not infringement advice)

> These are **differentiation hypotheses** for discussion with counsel. Formal FTO requires claim charts against **US11715361B2** (and any foreign WAVE/ASC counterparts), plus a check that ASC’s abandoned application did not spawn other issued US/EP/AU members.

### 5.1 Detection modality — **partially open / high leverage**
| Axis | Crowded? | GG opportunity |
|---|---|---|
| Pure BLE/RF loss as sole immersion proxy | **Crowded** (iSwimband abandoned app + WAVE live) | Avoid sole reliance |
| Conductivity / capacitance electrodes on goggle clip | Older art crowded (Turtle, ASC tags) but **combinable** | Dual-confirm “wet + RF loss” |
| Pressure / depth (e.g. >X cm for Y s) | Used by SWÖM; general sensors known | Strong **fusion** candidate vs RF-only |
| IMU / activity (struggle vs playful dive patterns) | Less central in ASC/WAVE independent claims | False-positive reduction + invent-around narrative |
| Optical SpO2 / pulse on temple / goggle pad | Mentioned as alternatives in older ASC spec | Possible but power/cost hard at $30–50 |
| Audio / hydrophone local ping | ASC ultrasonic space | Probably avoid — crowded + needs pool gear |

**Recommendation:** Design **multi-sensor fusion**: e.g. (depth OR conductivity) AND (BLE RSSI collapse) AND optional IMU stillness — such that RF loss alone does **not** equal “drowning alarm.” Keep RF-only path as **“Lost Connection”** (explicit GG feature), not as the drowning classifier.

### 5.2 Signal path / system topology — **somewhat open for B2C phone-as-hub if differentiated**
| Axis | Crowded? | Notes |
|---|---|---|
| Wearable → dedicated pool hub → lifeguard pager | WAVE / ASC Wahooo | Institutional; GG can stay phone-direct |
| Wearable → parent smartphone only (BLE) | iSwimband abandoned claims; WAVE spec discusses residential variants | Still need WAVE claim-chart |
| Mesh / multi-parent / cloud relay | Partially disclosed | Subscription feature — secondary IP risk |
| Underwater-capable link (ultrasound, optical) | Crowded / exotic | Not needed for GG cost target |

### 5.3 On-device vs phone logic — **open / actionable**
- Put **submersion decision on the wearable** (local timer on depth/conductivity), then send a **positive “distress” advertisement / encrypted event** when above water or via burst — rather than phone inferring solely from missing heartbeats.  
- Phone still alarms, but claim theme shifts from “monitor absence of RF” toward “receive affirmative distress packet.”  
- Caveat: WAVE/ASC specs discuss many variants — counsel must compare to independent claims.

### 5.4 Form factor — **crowded for goggle clip; still usable with other differentiators**
- Goggle / forehead / temple mounts are **expressly** in WAVE and ASC filings.  
- Differentiating via **clip mechanics, recharge contacts, child-resistant retention, battery hatch** is mostly design-patent / trade-dress territory — useful commercially, **weak** as utility invent-around alone.  
- Wrist-only toddler mode is prior (iSwimband); ankle / swimsuit-integrated is closer to SWÖM — different product.

### 5.5 Latency / thresholds — **crowded as numbers; open as adaptive logic**
- Fixed ~3s / ~10s / ~20s / ~30s thresholds appear throughout prior art. **Changing 10s → 12s does not invent around.**  
- **Adaptive** thresholds (age profile, swim-lesson mode, dive-training mode with parent confirmation, ML personalization) are better differentiation — still need counsel review if claims cover “predetermined period” broadly.

### 5.6 Multi-child / family features — **open commercially**
- Multi-child monitoring is disclosed in abandoned iSwimband claims — free as prior art for others’ novelty, but implementing it doesn’t create WAVE risk by itself.  
- Subscription ($2.99/mo), family sharing, history — business model open; watch **COPPA** (Section 7).

### 5.7 Summary: crowded vs open (engineering whiteboard)

```
CROWDED                          MORE OPEN (with caveats)
─────────────────────────────    ─────────────────────────────────
RF/BLE loss = drowning           Depth/pressure + wetness fusion
Phone timer on disconnect alone  On-wearable distress classification
Goggle/temple mount alone        Rechargeable clip economics / UX
Fixed N-second thresholds        Dual UX: Lost Connection ≠ Drowning
Institutional hub copy           Parent B2C positioning / price
                                 Affirmative uplink events (not absence)
                                 IMU / behavior filters for FP reduction
```

---

## 6. Adjacent non-patent flags

### 6.1 Trademark
- Press and ASC materials assert **iSwimband®** and **Wahooo®** as ASC marks; WAVE uses **WAVE / GUARDian / AquaSense**.  
- **USPTO registration numbers for iSwimband were not verified** in this pass — treat as **blocker for clearance**: run TESS/TSDR before final naming (avoid “Swimband,” “iSwim…,” “Wahooo,” “AquaSense,” “GUARDian” confusion).  
- GG / Guardian Goggles: screen “Guardian,” “Goggles,” and drowning-safety classes (009, 010, 028, 041) for conflict.  
- Sources: New Atlas; Cerebral-Overload; ASC business plan (Slideshare); WAVE site.

### 6.2 FTC / advertising claim risk
- FTC requires **truthful, substantiated** safety claims; disclaimers do **not** cure contradictory headline claims (“prevents drowning,” “guarantees safety”).  
- iSwimband-style language (“additional layer,” “not a substitute for supervision”) is the industry pattern GG should follow — and **prove** with testing (false positive/negative rates, latency, BLE loss reliability in real pools).  
- Sources: https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business ; FTC health-products guidance discussions; MSA 30X-type cases on unsupported device claims.

### 6.3 COPPA / kids’ privacy (parent app)
- If the app is directed to children **or** collects personal info from children under 13 (location, identifiers, voice, precise status telemetry), **COPPA** may require verifiable parental consent, notice, data minimization, security, deletion rights. Prefer **parent-account-only** design: child wearable as anonymous sensor ID; no child social graph; no advertising ID sale.  
- Source: https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions ; VTech FTC COPPA matter as cautionary tale.

### 6.4 Product liability framing
- Market as **supplement to adult supervision**, never as babysitter replacement. Document known failure modes (phone in another room, Bluetooth interference, playful dives, dead battery, removed goggles).  
- Explicit **“Lost Connection”** alert (already in GG brief) is good risk communication — pair with forced acknowledgment and periodic connection self-test.  
- Warnings, IFU, and claim substantiation belong in the same workstream as FTO.

---

## 7. Suspected iSwimband commercial failure factors (for GG strategy — non-IP)

From press, Amazon-era reviews snippets, and ASC’s own commentary:
- **Price** ~$99 vs GG target $30–50  
- **Non-rechargeable** sealed battery vs GG rechargeable  
- **iOS-only** launch; Android delayed  
- **False positives** / kids triggering alarms (called out in New Atlas comments; inventor response)  
- Clunky app / weak distribution / hard to buy now  
- Category trust: parents wary of “tech babysitter” without strong substantiation  

These support GG’s product thesis but **do not** reduce WAVE patent risk.

---

## 8. Blockers / research gaps
1. **Full WAVE independent claims** — need attorney claim chart (this memo used Google Patents abstract/specification themes).  
2. **Foreign counterparts** of WO2014168907 / WAVE family (EP, CA, AU, CN) — not exhaustively mapped.  
3. **iSwimband USPTO trademark serial** — not confirmed; TSDR pull required.  
4. **SWÖM patent number** — company claims a filing; number not found in public English sources this pass.  
5. **Assignment / current ownership** of abandoned ASC apps and whether any continuation was secretly filed — not fully cleared.  
6. Paywalled Docket Navigator / Lexis claim constructions — not used.

---

## 9. Recommended next steps (Michael / Legal Expert)
1. Engage licensed patent counsel for **FTO claim charts**: at minimum **US11715361B2**; confirm abandonment finality of **US20150194031A1** and no living ASC continuations; scan EP/WO family.  
2. Engineer a **fusion prototype** (depth OR wetness) + BLE, with separate **Lost Connection** vs **Submersion Alert** state machines.  
3. Run **trademark** clearance for final brand.  
4. Draft marketing claims matrix (allowed / prohibited) with FTC + liability counsel.  
5. COPPA/privacy design review before collecting any child-linked telemetry.

---

## 10. Closing

**Not legal advice — have a licensed patent attorney run a formal freedom-to-operate / claim chart before locking hardware or marketing claims.**

---

### Source index (primary)
- https://patents.google.com/patent/US20150194031A1/en  
- https://patents.google.com/patent/WO2014168907A1/en  
- https://patents.google.com/patent/US7642921B2/en  
- https://patents.google.com/patent/US11715361B2/en  
- https://patents.google.com/patent/US6157303A/en  
- https://patents.google.com/patent/US8144020B2/en  
- https://patents.google.com/patent/US7554453B2/en  
- https://newatlas.com/iswimband-drowning-alert/32781/  
- https://www.premieraquatics.com/news/view/swimband  
- https://cerebral-overload.com/2014/01/iswimband-drowning-detection-system-big-hit-ces/  
- https://www.slideshare.net/slideshow/30-iswimbandbusinessplan/61171910  
- https://wavedds.com/ ; https://wavedds.com/about ; https://wavedds.com/products  
- https://swom.dk/en ; https://swom.dk/en/pages/faq  
- https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions  
- https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business  
- https://www.linkedin.com/in/dave-cutler-a5592035  
