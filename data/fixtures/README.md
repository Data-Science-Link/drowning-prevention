# Fixtures (wireframe)

Status: **timelines_ready** (contract v0.2.1)

## Load order

1. `index.json` — scenario list
2. `scenario-contract.v0.json` — field names
3. `scenarios/<scenarioId>.json` — pack
4. `household_free.json` / `household_sub.json` — entitlement context

## scenarioIds

| scenarioId | Alert | Tier |
|------------|-------|------|
| `happy_path` | none | free |
| `ble_blip_lt_10s` | none | free |
| `submersion_gt_10s` | `SubmersionSuspect` | free |
| `walkaway_lost` | `LostConnection` | free |
| `multi_child_one_alert` | `SubmersionSuspect` on child B | sub |

Children include `sessionActive` + `deviceHealth` (`batteryPct`, `worn`, `signal`, `charging`).
