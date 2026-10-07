# Stage-1 lean PoC — shopping BOM + backyard protocol

**Date:** 2026-10-02 (America/Chicago)  
**Audience:** Michael Link (founder) + GG Chief of Staff  
**Not:** marketing, legal advice, a drowning detector, or product COGS  
**Form factor:** **HOLD** — PoC wear mount is agnostic (headband, goggle strap, or wrist all acceptable). Do not lock a product form from this build.  
**Spend lock (CFO):** core cart **~$110–245**, planning midpoint **~$250**, ceiling **≤$400**. USB power meter and burner phone are **off this cart**. Street-price checks live only in the appendix and **do not revise** the table.  
**Companions:** `01-ble-submersion-signal.md` + brief, `02-power-battery-bom.md`, `03-alt-sensors-vs-ble.md`, `strategy/kill-vs-continue-checklist.md`, `finance/lean-phase-capital.md`, `strategy/counsel-deferred-poc.md`

**Hard lock:** **BLE-only “lost > ~10 s” ≠ drowning.** This PoC may *measure* an RF drop when the antenna is under water. The ship path is **fusion** (wetness + duty-cycled IMU; pressure only as a later spike) + **Pool Session** + phone presence + dual UX (**Lost Connection / monitoring interrupted ≠ possible submersion**). Do not write drowning claims into firmware, app strings, or logs.

Cart dollars below are the **locked ASSUMPTION** bands. Appendix prices are **RESEARCHED** and are not a new cart.

Later kit ASP **~$150–250** is a product planning number (`finance/lean-phase-capital.md`). **This note is PoC spend only.**

---

## 1. Purpose — what this PoC can and cannot prove

| Can (backyard pool, qualitative) | Cannot |
|----------------------------------|--------|
| Whether a phone still in air sees an **RSSI / packet cliff** when the **antenna** is submerged vs in air (`01`: published pool links collapse on the order of **~15–18 cm** underwater path; air is tens of meters) | Freedom-to-operate, WAVE clearance, or any patent opinion (`strategy/counsel-deferred-poc.md` — counsel **deferred**) |
| Whether **wetness + a duty-cycled IMU flag** cuts obvious false “possible submersion” events vs **BLE-only in the same session** | That the device detects drowning, distress, or head-up events (`01` / `03`: head-up distress is an irreducible RF miss) |
| Whether **dry + BLE lost** is labeled **Lost Connection**, not possible submersion | Product RF. A bag, box, or epoxy blob **moves the antenna** vs a future clip (`01` measurement note; `03` form packaging) |
| A weekend firmware + phone log Michael can re-run | Certification, clinical FP rates, CAC, or kit COGS |

Kill-vs-continue for the *company* is still `strategy/kill-vs-continue-checklist.md`. Section 6 below is only the gate for **this** cart.

---

## 2. Recommended buy list (locked cart)

Target: one weekend build + one half-day pool session. Phone is already owned (**$0**).

**MCU (five lines, buy one family — not both):**

1. **ESP32-class (ESP32-C3 / XIAO ESP32-C3) is the PoC choice.** It pairs to a phone and can show an RSSI cliff. That is all this test needs.  
2. **nRF52** (XIAO nRF52840 or an nRF52840 dongle-class board) is **closer to product sleep current** (`02`: nRF52 System ON + RTC floor ~1.5–3 µA). It is a **swap inside the same BLE-board line**, not a second radio.  
3. Do **not** buy ESP32 *and* nRF52. A second radio (and a second link: UWB, LoRa, hub) is **out of budget**.  
4. The locked line already prices **2 boards at $25–45** plus a **spare at $12–25**. Use the spare for a drowned board or an antenna A/B, same family.  
5. If an nRF52 board would push the **core subtotal above ~$245**, stay on ESP32. Product current is a later PPK2 problem, and PPK2 is out of this cart.

| Qty | Item (class, not SKU lock) | Role | Est. USD |
|-----|----------------------------|------|----------|
| 2 | ESP32-C3 **or** XIAO nRF52840 / nRF52840 Dongle-class BLE board | Wearable advertiser + spare | 25–45 |
| 1 | Spare BLE board | Failures / A-B antenna | 12–25 |
| 2 | LiPo ~100–200 mAh + TP4056-class charge board + pigtails | Session power | 15–30 |
| 2 | Wetness / conductivity pads or cheap water-sensor breakout | Fusion: wet vs dry | 5–15 |
| 1–2 | IMU breakout (MPU-6050 / BMI160 class) | Fusion: dunk vs still / wear | 8–20 |
| 1 kit | Protoboard, headers, DuPont, USB cables, JST | Build | 10–20 |
| 2–3 | Enclosure options (clip case, strap pouch, small IP box, or 3D-print filament) | Form-factor **HOLD** trials | 15–40 |
| 1 kit | Silicone / conformal / O-rings / heatshrink | Brief dunk sealing (not IP67 cert) | 10–25 |
| — | **Phone as hub** (owned iOS or Android) | Scan + UX | 0 |
| 1 kit | Misc: foam float, zip ties, notebook, dry bag for phone | Test logistics | 10–25 |
| **Core subtotal** | | | **~$110–245** |

**Planning midpoint: ~$250.** Cart total **is** the core subtotal. Do not shop a second band.

**Off this cart (do not add back):** USB power meter and a burner phone. They were the only “with optionals” lines and they pushed a **~$165–425** band **through the $400 ceiling**. CFO: they stay off so spend stays **≤$400**. Nordic PPK2 is not a substitute purchase — see §3.

**On the wetness line:** DIY is enough and cheaper. Two small **copper or stainless** pads (tape, screws, or wire) + a **resistor divider** into one ADC pin. Pulsed read during the session only (`02`: wetness is µA-class; volume pads were ~$0.05–0.30 — that is product COGS, not this cart). A bought “water sensor” breakout is optional inside the same **$5–15** line.

**Not on this cart:**

- **Pressure.** Optional spike only if the core receipt lands low **and** CoS still wants it inside the **~$245** core cap. Do not open a new line that raises the midpoint. A bare BMP280-class breakout is **not** waterproof and is **not** the product sensor (`03`: waterproof MEMS such as LPS28DFW-class, vent to water, else v1.1). Skip for the first pool day.  
- **Conductivity meter.** Skip. Log pool type (chlorine vs salt, or “only one available”) as **ASSUMPTION** until both exist. Salt vs fresh changes wetness thresholds (`03`).

**Charge note (safety, not a new SKU):** prefer a charger that defaults near **100 mA** for a 100–200 mAh cell (`02` session math used a ~40–80 mAh *product* cell; this PoC cell can be larger). Do not charge unattended. Do not charge a cell while it is sealed wet.

---

## 3. Explicitly out of budget

Do not buy, hire, or “just add” any of these in Stage 1:

| Out | Why |
|-----|-----|
| **Nordic PPK2** | Current sanity is later. Borrow only if free. Not on the cart. |
| **USB power meter** | Off the cart (CFO). |
| **Burner / second phone** | Off the cart. Use the founder phone. |
| **Custom PCB** | Dev board is the PoC. |
| **FCC / CE / IP cert** | Not a product. |
| **Paid counsel / WAVE claim chart** | Deferred until this PoC + kill-vs-continue (`strategy/counsel-deferred-poc.md`). |
| **Injection mold / soft tooling** | After a continue gate, not now. |
| **Second radio** (nRF *plus* ESP32, UWB, LoRa, hub radio) | One BLE family only. |
| **Buying WAVE or abandoned iSwimband patents** | Still no (`strategy/counsel-deferred-poc.md`). |

This list does not change the locked core dollars.

---

## 4. Assembly plan (one weekend)

No new app. Phone sees the device through **nRF Connect** (or any BLE scanner that logs RSSI) **or** the existing wireframe for **UX labels only**: `frontend/wireframe/` (`README.md` — Lost Connection vs SubmersionSuspect screens). The wireframe talks to mocks/fixtures, not to this board. Do not build an app this weekend.

### Wiring (Saturday)

1. ESP32 3V3 + GND → IMU (I2C). MPU-6050 / GY-521 class: VCC, GND, SDA, SCL. Leave gyro off unless you are debugging; the flag is **accel motion vs still**.  
2. Wetness: pad A → GPIO via a series resistor; pad B → GND; high-value divider so a dry pin reads one rail and a wet pin reads the other. Start dry on the bench. Do not put DC across the pads continuously (electrolysis). Pulse the drive pin.  
3. LiPo → board **only** through the dev-board battery pads or a protected cell into 3V3 if you know the regulator path. If unsure, run USB for the bench day and use the LiPo only at the pool, disconnected from USB (many SuperMini boards have **no** ideal-diode; do not back-feed).  
4. Antenna: keep the chip antenna **outside** metal tape and **outside** a full ground pour. Note which face is “antenna up.”

### Firmware states (Sunday morning)

Session switch (button or a GPIO you short): **off / slow** vs **session on**.

| State | Radio | What to put in the name or manufacturer data |
|-------|--------|-----------------------------------------------|
| **Off** | Advertising **slow or stopped** (1–10 s or deep sleep). `02`: fast adv is session-only. | `GG-OFF` |
| **Advertising** | Session on: **~100–300 ms** adv while testing. 0 dBm is enough. | `GG-ADV` + RSSI is measured by the phone, not the tag |
| **Wet** | Same session interval | `GG-WET` when pads read wet; `GG-DRY` otherwise |
| **IMU motion flag** | Same; sample accel at low rate, not full gyro | Append `M` if motion variance above a bench threshold, `S` if still |
| **Lost** | This is a **phone-side** state, not a tag state | Scanner: no packet for **≥ ~10 s** → lost. Tag cannot see that it is lost. |

Log on the phone (nRF Connect export, or a spreadsheet while you watch): time, name string, RSSI, and your trial label. Map strings to UX **by hand** against the wireframe:

- Session on, packets flowing → monitoring.  
- **Dry + lost** → **Lost Connection** (monitoring interrupted).  
- **Wet + lost ≥ ~10 s** → **possible submersion** (wireframe name: SubmersionSuspect). Not “drowning.”  
- Gap **< ~10 s** → blip. No submersion screen (`frontend/wireframe/` scenarios `ble_blip_lt_10s`, `walkaway_lost`, `submersion_gt_10s`).

Header comment to paste in the sketch: `BLE loss is RF evidence only; fusion required for product.`

---

## 5. Backyard pool protocol (half day)

**Adult supervision the whole time.** See §7 before anyone enters the water.

Run **BLE-only scoring** and **fused scoring** on the **same** dunks (score twice from one log: ignore wet/IMU vs use them). One mount only (headband, strap, or wrist). Write the mount in the header. Do not treat that mount as the product.

| # | Trial | How | What “good” looks like (qualitative) |
|---|--------|-----|--------------------------------------|
| A | Air baseline | Dry device, phone **2 m** then **5 m**, session on, **2 min** | Packets steady. Record mean RSSI. |
| B | Antenna under | Pole, dummy, or adult volunteer. Antenna face **just under**, then about **15–30 cm** under, **20–30 s** each. **Face-up** and **face-down** orientations of the *device*. | Cliff vs trial A. Log **time-to-loss** and time-to-return when lifted out. |
| C | Play dunks (FP) | Repeated **1–3 s** dips, device moving | Many short gaps. Fused score should **not** call possible submersion on each dip. |
| D | Phone distance | Device **dry**, in air at pool edge. Walk phone to **~10 m** and **~20–30 m**, or indoors behind a wall | Loss may happen. Label **Lost Connection** only. |
| E | Dry in a bag | Device **dry inside a closed bag or box**, phone walks away or you shield it | Must be **Lost Connection**, never possible submersion. The bag **will** change RSSI vs a naked board — that is a warning, not a product measurement. |
| F | IMU | Repeat one dunk while moving vs one held still under | Still+wet+lost vs a thrashing dunk. Flag only. |
| G | Pool type | If you have **both** chlorine and salt, repeat **one** B dunk in each. If not, log which water you used and mark conductivity **ASSUMPTION**. | Do not buy a meter. |

Depths to actually write down: **0 cm (air)**, **antenna just wet / ~5 cm**, **~15–30 cm**, and one **deeper** pole dunk only if the adult can do it without leaving the wall (do not chase 1 m). Phone distances: **2 m, 5 m, ~10 m, ~20–30 m**.

### CSV columns

`t_iso, trial, mount, pool_type, depth_cm, orientation, phone_dist_m, rssi_dbm, adv_name, wet_flag, imu_flag, gap_s, phone_state, fused_label, ble_only_label, notes`

- `pool_type`: `chlorine` | `salt` | `unknown`  
- `phone_state`: `monitoring` | `blip` | `lost`  
- `fused_label` / `ble_only_label`: `monitoring` | `blip` | `LostConnection` | `PossibleSubmersion`  
- `ble_only_label` ignores wet and IMU (lost ≥ ~10 s → PossibleSubmersion). That column exists to show the false path, **not** to ship it.

---

## 6. Pass / fail — this cheap PoC only

Qualitative. Every threshold is **ASSUMPTION until this pool day measures it.** Not a clinical FP rate. Not the full kill-vs-continue sheet (that still applies before any raise or counsel).

**Pass (all three):**

1. **RSSI cliff:** antenna submerged vs air is obvious on the same phone (packets die or RSSI falls off a cliff; they return when the antenna is out).  
2. **Fusion helps:** on the **same** session log, fused labels show **fewer obvious false** PossibleSubmersion events than the BLE-only column (play dunks, dry walk-away, dry-in-bag).  
3. **Dry + BLE lost** is labeled **Lost Connection**, including trial E.

**Kill / stop this thesis (either one):**

1. **No cliff at all** in a real pool (antenna under, phone still nearby in air, link looks like air).  
2. **Every normal dunk** still false-alarms **with fusion on** (wet+short dip, or wet for the whole swim, still pages possible submersion).

Do not “fix” a kill by renaming BLE-loss to drowning. That path is non-shippable (`01`, checklist K5).

---

## 7. Safety

- Adult supervision for the whole session. The box is a **hobby circuit in water**, not a life-safety device, not a lifeguard, and not a reason to look away.  
- **Do not use a child as the test subject for distress or prolonged dunks.** Dunks are a **pole, a dummy, or an adult volunteer** who can stand.  
- Phone stays dry (the dry bag in the cart is for the **phone**, or for trial E).  
- LiPo: no puncture, no charge unattended, no charge while dripping. If the pack is breached, stop.  
- Seal is **temporary** (silicone, tape, small box). It will leak. Budget the spare board for that.

---

## 8. After a pass — still not counsel

1. Write a **one-page measurement note** (CSV + what passed or failed in §6). Attach it to the proposal spine; do not pitch investors from memory.  
2. **CoS decides** whether that note is enough to **reopen capital** (`finance/lean-phase-capital.md` deferred ladder: broader PoC, then counsel). Founder does not spend the $8k–$25k counsel band or the $15k+ PoC band off a verbal “it kinda worked.”  
3. **Do not** buy WAVE patents, abandoned iSwimband patents, or start an FTO. Invent-around posture still applies; a backyard log is not clearance (`strategy/counsel-deferred-poc.md`).  
4. A pass does **not** lock headband vs strap vs wrist.

---

## Appendix — 2026 street checks (RESEARCHED)

**These URLs do not replace §2.** They only show the locked **class** prices are conservative. Where a page was not opened or the price was a search snippet, the row says **ASSUMPTION**.

| Class in the cart | Example seen | Price seen | Label |
|--------------------|--------------|------------|--------|
| ESP32-C3 SuperMini | [ProtoSupplies](https://protosupplies.com/product/esp32c3-supermini/) | **$5.95** (page fetched; 8 in stock) | RESEARCHED |
| ESP32-C3 SuperMini, 4-pack | [Amazon B0GQM4SRS3](https://www.amazon.com/ESP32-C3-Development-Supermini-Bluetooth-Wearables/dp/B0GQM4SRS3) | **$18.99** (~$4.75 each) | RESEARCHED (search snippet price) |
| XIAO ESP32-C3 | [Seeed](https://www.seeedstudio.com/Seeed-XIAO-ESP32C3-p-5431.html) | **$4.99** | RESEARCHED (page fetched) |
| XIAO nRF52840 (swap, not a second radio) | [Seeed](https://www.seeedstudio.com/Seeed-XIAO-BLE-nRF52840-p-5201.html) | **$9.99** (10+: $8.99) | RESEARCHED (page fetched) |
| nRF52840 USB dongle (not a wearable) | [Findchips / Nordic NRF52840-DONGLE](https://www.findchips.com/detail/NRF52840-DONGLE/Nordic-Semiconductor) | DigiKey **$11.02**, Mouser **$10.70** listed | RESEARCHED (distributor index) |
| nRF52840 USB dongle | [TME](https://www.tme.eu/en/details/nrf52840-dongle/development-kits-for-data-transmission/nordic-semiconductor/) | **$15.81** qty 1 | RESEARCHED (page fetched) |
| nRF52840 USB key | [Adafruit 5199 MDBT50Q-RX](https://www.adafruit.com/product/5199) | **$15.95**, out of stock when searched | RESEARCHED |
| LiPo 150 mAh | [Adafruit 1317](https://www.adafruit.com/product/1317) | **$5.95**, in stock | RESEARCHED (page fetched) |
| USB LiPo charger, ~100 mA default | [Adafruit 1304 Micro Lipo](https://www.adafruit.com/product/1304) | **$5.95**, in stock | RESEARCHED (page fetched) |
| MPU-6050 GY-521 | [Amazon B09TVYVC6X](https://www.amazon.com/EPLZON-MPU-6050-Accelerometer-Gyroscope-Converter/dp/B09TVYVC6X) | **$8.99** | RESEARCHED (search snippet price) |
| BMI270 breakout (richer than the cart needs) | [SparkFun SEN-22397](https://www.sparkfun.com/sparkfun-6dof-imu-breakout-bmi270-qwiic.html) | **$18.50** | RESEARCHED (page listed in search) |
| USB-A to USB-C data cable | ProtoSupplies CAB-25, linked from the SuperMini page above | **$6.95** | RESEARCHED |
| Small IP65 box, 2-pack | LeMotech-class ~63×58×35 mm, Amazon B0BNQ6KYHW | **~$9** | **ASSUMPTION** — search snippet only, page not opened. Use **$7–15**. |
| Bare TP4056 USB-C module | Common 3-packs and 10-packs | **~$1–3 each** | **ASSUMPTION** — snippet only. Prefer Adafruit 1304 if you do not want to set charge current. |
| Silicone / epoxy / copper tape | Hardware store | **$6–15** | **ASSUMPTION** — no SKU opened |
| BMP280 breakout (not on cart) | [Adafruit 2651](https://www.adafruit.com/product/2651) | **$9.95** | RESEARCHED (page fetched). **Not waterproof. Not purchased** unless CoS fits it inside the existing core cap. |

No exact SKU above was invented. Prices move. The buy decision is still the locked table: **core ~$110–245, midpoint ~$250, ≤$400, meter and burner phone off.**
