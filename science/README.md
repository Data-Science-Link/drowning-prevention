# science/

BLE physics, power/battery BOM, alternative sensors, and hardware PoC research for Guardian Goggles.

## Contents (to be migrated selectively)

| File | Description |
|---|---|
| `01-ble-submersion-signal-brief.md` | Summary: 2.4 GHz attenuation in water; RSSI vs depth data |
| `01-ble-submersion-signal.md` | Full BLE submersion signal analysis |
| `02-power-battery-bom.md` | Power budget; rechargeable cell sizing; BOM estimates |
| `03-alt-sensors-vs-ble.md` | Wetness, IMU, pressure — sensor comparison vs BLE-only |
| `04-lean-poc-bom.md` | Stage 1 lean PoC BOM (ESP32/nRF52 + peripherals; ≤~$400 target) |

## Key findings (summary)

- 2.4 GHz BLE is absorbed by water rapidly — submersion produces a measurable RSSI cliff within centimetres of the surface. This is the foundational physics signal.
- BLE loss alone is **not** a drowning diagnosis. Dry causes (phone moved, play dunk, battery) produce identical RSSI drops.
- Fusion with a second cue (wetness resistive pad, IMU anomaly, or pressure sensor) materially reduces false SubmersionSuspect rate.
- Stage 1 PoC goal: measure the RF cliff in backyard conditions and quantify false-alarm rate with and without fusion.

See `docs/ARCHITECTURE.md` for how these findings inform the system design.
