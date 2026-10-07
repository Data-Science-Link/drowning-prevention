# Guardian Goggles — BLE Submersion Signal (PM Brief)

**One page · 2026-09-21 · For PM paste · Not marketing · Not legal advice**

## What we’re evaluating

GG clips a rechargeable BLE sensor to kids’ swim goggles. Idea: if the parent phone should still be in range, but BLE goes dark for ~10+ seconds, the goggles may be underwater (2.4 GHz dies fast in water)—so alert the parent.

## Does the physics work?

**Yes, for “antenna underwater.”** Published pool tests at 2.4 GHz show links collapsing around **15–18 cm** of underwater path (freshwater). Air BLE range is tens of meters; underwater it’s centimeters. That contrast is real.

**Caveats:** Pools/salt make it worse or different than lab freshwater. Goggles only half-wet with the antenna in air can still talk—so “face-down shallow” may **not** trigger.

## Is “lost BLE >10 s” enough to call drowning?

**No—not alone.**

- **True positive:** Head/goggles fully under long enough → RF outage. Plausible.
- **False alarms (expect many):** Phone in pocket/bag, parent walks away, airplane mode, Bluetooth glitches, Wi-Fi noise, goggles left on a towel, battery dead, kid swimming underwater for fun.
- **Misses (dangerous):** Distress with head above water; bobbing that keeps refreshing BLE; device not worn; phone already out of range.

**~10 seconds** is early vs typical multi-minute hypoxic injury windows, but kids routinely go under that long while playing. Shorter = more nuisance; longer = later help. Treat 10 s as a *stage*, not “the drowning number.”

## What we should build instead

Ship **Pool Session mode** only (parent starts/stops). Require phone presence. Fuse signals:

- BLE / RSSI cliff  
- Plus wetness and/or pressure  
- Plus IMU (orientation / stillness)  
- Plus “goggles actually on face”

Stage alerts (soft → loud). Never equate “BLE lost” with “child drowning” in copy.

## Competitive landscape (public claims — send to counsel)

Others already sell or patent **wearable + time underwater → alert**, including **Bluetooth / RF loss when submerged** (iSwimband-era; WAVE hub systems; patents describing BLE beacon loss). SWÖM uses **depth + time → inflate**, different primary fix. GG’s goggle clip + phone UX may be distinct—**do not assume clear IP**; run formal review.

## Top risks for PM / legal

1. **Overclaiming** life-saving coverage while FNs (head-up distress, shallow face-down) remain.  
2. **Nuisance alarms** destroying trust / causing disable.  
3. **Prior-art overlap** on RF-loss / submersion-timer concepts—counsel before claim charts or “world’s first” language.

## Next measurements (eng)

1. Real goggle enclosure: RSSI vs depth (1–100 cm), face-up/down, phone at 5–30 m.  
2. Time-to-loss after dunk (ad interval).  
3. Pool conductivity (chlorine vs salt).  
4. FP rate: afternoon of normal swim play, BLE-only vs fused.  
5. OS background scan reliability with screen off.


## Power / BOM (CFO / unit econ)

- **LiPo + session-mode**, not always-on coin: ~40–80 mAh cell is enough if Pool Session uses ~100–300 ms BLE adv and shelf drops to deep sleep.
- **Nordic nRF52 sleep floor ~1.5–3 µA** (System ON + RTC); session battery life is set by advertising duty, not sleep datasheet numbers.
- **Charge path:** sealed magnetic contacts for v1 (~$0.7–1.8 incremental); inductive is a +$1.5–4 step and thicker.
- **Fusion sensors in the BOM:** IMU ~$0.5–1.5 + wetness pads ~$0.05–0.3 — required by the safety note, not optional polish.
- **Planning COGS:** electronics + IP enclosure roughly **$8–14** mid-volume for a nominal fused build (ex certs/freight/returns). Detail: `02-power-battery-bom.md`.

## Bottom line

Physics **supports immersion detection when the antenna is submerged**. Product safety requires **session constraints + sensor fusion**. BLE-only “10 s lost = drowning” is **not** a shippable life-safety claim.

*Brief only — detailed signal analysis available on request.*

## Alt sensors vs BLE (CoS/Michael)

- **No drop-in better than BLE-loss for the clip alone:** wetness / pressure / IMU each fix different FP/FN holes; none uniquely copies BLE’s cm-scale RF collapse when the *antenna* is submerged—and BLE remains the phone alert path.
- **BLE-loss unique gift / hard limit:** strong antenna-under proxy; **cannot** cover head-up distress or shallow face-down with antenna still in air.
- **Best alternate immersion primary:** absolute **pressure + time** (waterproof MEMS barometer class, e.g. LPS28DFW)—if O-ring/vent fits the clip; else **wetness + time** as cheap mature contact proxy.
- **v1 fusion (HOLD goggle clip):** Pool Session + phone presence + **BLE (comms + RSSI cliff)** + **wetness pads** + **duty-cycled 6-axis IMU** + wear-detect; **pressure populate now or v1.1**.
- **Defer:** PPG, UWB, LoRa, acoustic modem, ultrasound-to-phone—size/power/base-station or weak pool maturity.
- **2020–2026 watch-list (public):** waterproof barometers in swim wearables; IMU×pressure submersion classifiers; SWÖM depth→inflate (+ LoRa/GNSS alert roadmap); edge-ML prototypes—not a new RF-loss physics.
- **Invent-around (Legal check, not opinion):** public mechanisms differ—RF/BLE loss vs water electrodes vs depth/time vs inflate vs IMU/fusion; GG = goggle clip + parent phone. Chart before claim language.
- **Detail:** `03-alt-sensors-vs-ble.md`
