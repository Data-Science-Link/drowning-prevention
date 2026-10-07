# Guardian Goggles — Unit Economics v0 (Decision Memo)

**Author:** GG: CFO  
**Date:** 2026-09-21 (CDT)  
**Audience:** CoS + Michael  
**Status:** **DECIDED** on ASP (Michael) — Scenario B/C ~$150–250; see strategy/unit-economics.md as canonical  
**Primary path:** `strategy/unit-economics.md`  
**Companion CSV:** `finance/unit-economics-v0.csv` (+ copy under `strategy/`)  
**Strategy input:** `strategy/early-strategy-brief.md` (CoS early-strategy brief)

---

## Bottom line (recommendation)

**Plan around Scenario B/C — DTC ASP ~$150–$250, hardware-first, free core alerts — not founder $30–50 as the launch ASP.**

| Scenario | Verdict |
|----------|---------|
| **(A) Founder $30–50 + optional $2.99** | **RED FLAG for DTC CAC payback.** Hardware contribution after fees (~$14–$26) cannot fund realistic paid CAC when comps (WaterWatch $199, pool alarms ~$200–300) imply parents already pay mid-hundreds for a safety layer. Optional sub does not rescue low ASP unless attach is unrealistically high *and* CAC is near-organic. Keep as a **volume / accessory / multi-child add-on SKU** later — not the primary kit ASP. |
| **(B) Market-anchored $150–$250 hardware-first, free app, no sub** | **Primary planning case.** Matches WaterWatch “no subscription” trust posture and early-strategy brief. Mid kit ~$199 with COGS ≤ ~$45–55 clears CAC placeholders that kill Scenario A. |
| **(C) $150–$250 + optional $2.99 attach** | **Best of both** if multi-child / caregiver sharing has clear paid value. Upside LTV; does not gate life-safety alerts. |
| **(D) Mandatory subscription** | **Do not.** Parent DTC optics = “paywall on child’s safety”; comps advertise no sub (WaterWatch). WAVE’s $149–$399/mo works for **facilities**, not parents. |

**Conditional yes vs iSwimband:** Better structure (rechargeable, durable app funding, honest layer-of-protection messaging) can beat iSwimband’s ~$99 one-shot stall — but **only if sensing/false-alarm trust holds** and ASP sits in the **$150–250 band** the brief recommends for CAC payback. Cheaper UI alone at $40 does not clear the economic bar.

---

## Price anchors (researched) — pressure-test the strategy

| Anchor | Price | Sub? | Source |
|--------|-------|------|--------|
| **WaterWatch** hub + 1 band | **$199** | **No** | RESEARCHED — https://wtrwatch.com/ ; product page Hub+1 Band $199 |
| **Pool alarms** (Poolguard-class) | **~$200–$300** | Typically none | RESEARCHED via early-strategy brief citing Poolguard listings |
| **WAVE facility** | **$149–$399/mo** | Yes (HWaaS) | RESEARCHED — https://wavedds.com/pricing — **not DTC** |
| **iSwimband launch** | **~$99–$125** one-shot | No | RESEARCHED — New Atlas / Gizmodo / MyPoolSigns; non-rechargeable; stalled |
| **SWÖM** | 999 DKK list (~$145–155); Indiegogo early bird ~$149 | Inflator refills | RESEARCHED — https://swom.dk/en |
| **Founder GG target** | **~$30–50** HW + optional **$2.99/mo** | Optional | ASSUMPTION / founder brief — model as Scenario A |
| **Early-strategy brief recommend** | **DTC ASP ~$150–$250**; hardware-first | Optional only | RESEARCHED recommendation — `strategy/early-strategy-brief.md` §3.1, §3.4 |

**Implication:** The competitive consideration set for “another layer of protection” already prices at **~$150–300**. Launching a primary kit at $30–50 anchors GG as a cheap gadget *and* leaves almost no room to pay for parent acquisition, returns, or a loud local alarm path (hub/siren) that the brief flags as trust-critical vs phone-only BLE.

---

## Explicit ASSUMPTIONS table

| # | Item | Value | Label | Note |
|---|------|-------|-------|------|
| A1 | Scenario A retail | $30 / $40 / $50 | ASSUMPTION (founder) | Project brief |
| A2 | Scenario B/C kit ASP | $150 / $199 / $250 | ASSUMPTION (planning) | Mid $199 mirrors WaterWatch RESEARCHED |
| A3 | Clip-only COGS (no hub), mid volume | $10 / $12 / $14 at Low/Mid/High A | ASSUMPTION (eng. estimate) | BLE SoC + LiPo + seal + assembly |
| A4 | Kit COGS with hub/siren (B/C) | $45 @ $150 ASP; $50 @ $199; $55 @ $250 | ASSUMPTION | Hub + band/clip + packaging; not a factory quote |
| A5 | Channel + payment take | 15% of retail | ASSUMPTION | DTC blend placeholder |
| A6 | Returns / warranty reserve | 5% of retail | ASSUMPTION | Water + kids + safety category |
| A7 | Sub price | $2.99/mo | ASSUMPTION | Founder brief |
| A8 | Sub COGS | $0.40/mo | ASSUMPTION | Cloud + light support |
| A9 | Attach rates | 10% / 25% / 40% | ASSUMPTION scenarios | No GG demand data |
| A10 | LTV window | 24 mo flat retain (no churn) | ASSUMPTION | Real LTV needs churn |
| A11 | CAC placeholders | $25 / $50 / $80 / $120 | ASSUMPTION | **Not invented as “true CAC”** — break-even tools only. Safety DTC often expensive. |
| A12 | Capital PoC / pilot / mfg | $15–40k / $40–120k / $80–250k | ASSUMPTION guesses | Order-of-magnitude |
| A13 | Rechargeable premium vs coin-cell sealed | ~$3–6 landed | ASSUMPTION; cell costs RESEARCHED ranges | Pay it |
| A14 | iSwimband retail / power / sub | ~$99–125; non-rechargeable; no sub | RESEARCHED | See sources |
| A15 | WaterWatch | $199; no sub; hub+siren | RESEARCHED | wtrwatch.com |

**Unknown:** True GG BOM quotes; true DTC CAC by channel; attach elasticity; hub necessity cost; WAVE royalty / FTO cost (Legal).

---

## Scenario definitions

### (A) Founder band — $30–50 clip + optional $2.99

Phone-centric clip/goggles sensor; free loud phone alerts; optional sub for multi-child / sharing / history.

### (B) Market-anchored — $150–250 kit, hardware-first, free app, **no** subscription

ASP aligned to WaterWatch / pool-alarm consideration set; free core safety app; revenue = hardware margin. May include hub/siren (brief: phone-in-other-room failure mode).

### (C) Market-anchored + optional $2.99

Same as B, plus optional attach for multi-caregiver, multi-child, history, vacation sharing — **never** gating the alarm path.

### (D) Mandatory subscription

Hardware sold at discount or cost-ish + required monthly for alerts to work / stay activated. **Flagged: high parent-trust risk; CoS lean = against for DTC.**

---

## Hardware math

### Contribution after fees (shared formula)

`net = retail × (1 − 0.15 − 0.05) = retail × 0.80`  
`contrib = net − COGS`  
(A5/A6 ASSUMPTION)

### Scenario A — clip ASP

| Retail | COGS (A3) | GM $ (list) | GM % | Contrib after fees |
|--------|-----------|-------------|------|--------------------|
| $30 | $10 | $20 | 67% | **$14** |
| $40 | $12 | $28 | 70% | **$20** |
| $50 | $14 | $36 | 72% | **$26** |

### Scenario B/C — kit ASP (ASSUMPTION COGS includes hub path)

| Kit ASP | COGS (A4) | GM $ | GM % | Contrib after fees |
|---------|-----------|------|------|--------------------|
| $150 | $45 | $105 | 70% | **$75** |
| $199 | $50 | $149 | 75% | **$109** |
| $250 | $55 | $195 | 78% | **$145** |

If GG ships **clip-only at $199** with COGS ~$15–25 (no hub), contribution is even higher (~$134–$144) — but the brief warns pure phone-BLE repeats iSwimband’s miss-the-alarm-when-phone-elsewhere failure. Budget hub into COGS unless Scientist proves phone-critical-alert path is enough.

---

## Rechargeable vs disposable (unchanged CFO take)

| | Disposable sealed (iSwimband-like) | Rechargeable LiPo |
|--|------------------------------------|-------------------|
| Cell | CR2032 ~$0.04–0.15 RESEARCHED OEM | LiPo ~$1–3 + charger path RESEARCHED/ASSUMPTION |
| Net BOM | Saves ~$3–6 ASSUMPTION | Premium ~$3–6 |
| Parent economics | Dead unit → full repurchase | Multi-season; fits $150–250 kit |

**Pay the rechargeable premium.** iSwimband’s non-rechargeable design (RESEARCHED — Best Buy CA) converted EOL into a high-friction repurchase.

---

## Subscription LTV (optional attach)

Sub contribution = $2.99 − $0.40 = **$2.59/mo** (ASSUMPTION)  
24-mo flat LTV if subscribed = **$62.16** (ASSUMPTION A10)  
Per HW unit expected LTV = attach × $62.16:

| Attach | Exp. sub LTV / unit |
|--------|---------------------|
| 10% | $6.22 |
| 25% | $15.54 |
| 40% | $24.86 |

### Stacked unit value vs CAC placeholders (ASSUMPTION A11)

**Scenario A Mid ($40, contrib $20):**

| Attach | Unit value (HW+sub) | vs CAC $25 | vs $50 | vs $80 | vs $120 |
|--------|---------------------|------------|--------|--------|---------|
| 10% | $26 | ~0 | **−24** | **−54** | **−94** |
| 25% | $36 | +11 | **−14** | **−44** | **−84** |
| 40% | $45 | +20 | **−5** | **−35** | **−75** |

**Scenario A only stays green if CAC ≲ $20–25 *or* acquisition is mostly organic.** That is not a robust DTC plan against WaterWatch’s $199 brand spend capacity.

**Scenario B Mid ($199, contrib $109, no sub):**

| CAC placeholder | Unit contribution after CAC |
|-----------------|----------------------------|
| $25 | +$84 |
| $50 | +$59 |
| $80 | +$29 |
| $120 | **−$11** |

Break-even CAC ≈ **$109** (hardware only) — still ASSUMPTION fees/COGS, but order-of-magnitude: **B can fund real paid acquisition; A cannot.**

**Scenario C Mid ($199 + attach):**

| Attach | Unit value | vs CAC $80 | vs $120 |
|--------|------------|------------|---------|
| 10% | $115 | +$35 | **−$5** |
| 25% | $125 | +$45 | +$5 |
| 40% | $134 | +$54 | +$14 |

Optional sub is a **cushion**, not the core business.

**Scenario D (mandatory) — risk flag, not a plan:**

Illustrative: sell HW at $79 (ASSUMPTION loss-leader) + force $2.99/mo. Need ~27 paid months just to match Scenario B’s $109 HW contrib — **before** churn, support rage, and 1-star “won’t alarm without sub” reviews. **Reject for parent DTC** per CoS lean and early-strategy brief §3.4.

---

## Side-by-side: iSwimband vs GG scenarios

| | iSwimband | GG (A) | GG (B/C) |
|--|-----------|--------|----------|
| ASP | ~$99–125 RESEARCHED | $30–50 | $150–250 |
| Recurring | None | Optional $2.99 | Optional (C) / none (B) |
| Power | Non-rechargeable RESEARCHED | Rechargeable | Rechargeable |
| Local siren/hub | Phone-dependent | Phone-centric risk | Budget hub (brief) |
| CAC headroom | Thin at $99 once returns hit | **Critical red** | Viable at placeholders ≤~$80–100 |
| Why iSwimband stalled | Abandonware app, trust/UX, capital, no annuity (brief §2.4) | Cheap ASP repeats thin GTM budget | Structure can fund support + CAC **if** sensing trust holds |

**iSwimband economics failed as a *company*:** one-shot price without durable software funding, non-rechargeable EOL, Amazon rating death spiral — not merely “sensor science.” Team energy moved to facility WAVE (recurring). GG must not copy the **$99 one-shot phone-app** shape; copying a **$40** shape is worse for CAC.

---

## Capital needs sketch (ASSUMPTION / guess — unchanged order-of-magnitude)

| Stage | Range USD | Notes |
|-------|-----------|-------|
| PoC | $15k–$40k | Proto + app MVP + pool tests |
| Pilot 100–500 | $40k–$120k | Soft tooling, seal yield, early FCC/CE/UN38.3 |
| Mfg tooling + first 2–5k | $80k–$250k | Hard tools, certs, first PO |

Cumulative to serious DTC inventory: **~$150k–$400k** ASSUMPTION. Scenario B/C kits (hub) push the high end; Scenario A clip-only is cheaper to tool but fails CAC math.

---

## Red flags (numbers pressure-test strategy)

1. **RED — Scenario A primary ASP:** $30–50 contrib ($14–26) **cannot clear** CAC placeholders ≥$50 that are plausible for DTC safety ads, while WaterWatch collects **$199** for a comparable job-to-be-done. Saying “we’ll win on price” cedes margin and marketing oxygen.  
2. **COGS creep:** If kit COGS (with hub) exceeds ~$70–80 at $199 ASP, contribution after fees drops below ~$80 and CAC ≥$80 becomes fragile.  
3. **Mandatory sub (D):** Trust / review bomb risk; contradicts WaterWatch “no subscription” RESEARCHED positioning.  
4. **False-positive returns >~8–10%:** Warranty assumption blows; any ASP fails.  
5. **Patent / royalty >~$5–10/unit (Legal / WAVE US11715361):** Eats Mid margins — open FTO.  
6. **Goggles-only for ages 1–4:** Brief strategic risk (compliance); dual SKU may be required — economics must fund two form factors eventually.

---

## Open inputs

| Owner | Need |
|-------|------|
| **Market Researcher** | WTP survey vs WaterWatch $199 / Poolguard ~$250; channel CAC bands (not guesses); attach analogs |
| **Scientist** | BOM @ 500/2k/10k for clip-only **and** hub+clip; seal yield; whether hub is required for trust |
| **Legal** | FTO vs US11715361; liability insurance; claim limits |
| **PM** | Optional-sub feature pack that does **not** gate alerts; multi-caregiver UX |
| **Michael** | Accept Scenario B/C as planning ASP vs insist on A; hub-in-kit yes/no; capital ceiling |

---

## Decision asks (CoS / Michael)

1. **Adopt Scenario B Mid $199 (or band $150–250) as planning ASP**; treat founder $30–50 as future add-on / multi-pack price, not hero SKU.  
2. **Hardware-first + free core alerts**; optional $2.99 only (Scenario C) — **no mandatory sub**.  
3. **Rechargeable non-negotiable.**  
4. **Gate paid CAC spend** until pilot proves alert reliability; use organic/PR first.  
5. **Scientist: quote hub+clip vs clip-only** before locking COGS targets.

---

## Sources

**Early-strategy brief (primary synthesis):** `strategy/early-strategy-brief.md`  
**WaterWatch $199 no sub:** https://wtrwatch.com/ ; https://wtrwatch.com/products/waterwatch-safety-system-hub-1-band  
**WAVE facility pricing:** https://wavedds.com/pricing  
**iSwimband ~$99–125 / failure modes:** https://gizmodo.com/a-smart-headband-that-keeps-your-kids-safe-and-forever-1611648803 ; https://www.mypoolsigns.com/blog/high-tech-iswimband-substitute-pool-supervision/ ; https://blog.bestbuy.ca/feature/using-the-iswimband-bluetooth-drowning-detection-headband ; https://www.amazon.com/iSwimband-Personal-Drowning-Detection-Sunfish/dp/B00MTD2L58 ; New Atlas / brief citations  
**SWÖM:** https://swom.dk/en  
**Pool alarms / category bands:** early-strategy brief §1.3–1.5 (Poolguard https://poolguard.com/alarms/)  
**BOM proxies:** https://www.encata.net/blog/cost-to-build-wearable-mvp ; brief §3.3  
**Battery ranges:** CR2032 wholesale guides; LiPo vendor list prices (see v0 research notes)

**Research dead ends:** No public iSwimband/WaterWatch teardowns or COGS; no audited GG CAC; SEAL SwimSafe live MSRP not locked this pass; exact ASC sell-through unknown.

---

*End unit-economics v0 (scenario A–D revision).*
