# data/

Fixtures, simulated datasets, and data schemas for the drowning-prevention parent app.

## Status

Fixture files are live. Five scenarios cover the full alert UX (see `product/wireframe-acceptance.md`).  
The wireframe loads these via `fetch()` when no mock is running.

## Structure

```
data/
├── fixtures/                   ← Static JSON fixtures (contractVersion 0.2.1)
│   ├── index.json              ← Scenario index
│   ├── scenario-contract.v0.json
│   ├── household_free.json     ← Household entitlement (free tier)
│   ├── household_sub.json      ← Household entitlement (sub tier)
│   └── scenarios/
│       ├── happy_path.json
│       ├── ble_blip_lt_10s.json
│       ├── submersion_gt_10s.json
│       ├── walkaway_lost.json
│       └── multi_child_one_alert.json
└── schemas/        ← JSON Schema or Pydantic models (planned)
```

## Fixture contract

Fixtures define the BLE + sensor state scenarios used by the wireframe and tests. The `scenario-contract` format describes:
- Session state (active / inactive)
- BLE RSSI reading (or signal-lost flag)
- Wetness sensor value
- IMU anomaly flag
- Expected alert state output

This contract is the shared interface between the mock API, the wireframe UI, and the pytest suite.
