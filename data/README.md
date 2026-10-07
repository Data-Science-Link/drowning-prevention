# data/

Fixtures, simulated datasets, and data schemas for Guardian Goggles.

## Status

Fixture files land with the backend mock PR (PR #2). This folder is scaffolded here to reserve the path.

## Structure (planned)

```
data/
├── fixtures/       ← Static JSON fixtures served by the mock API
│   └── scenario-contract.v0.json   ← Alert state scenarios (Lost Connection, SubmersionSuspect)
└── schemas/        ← JSON Schema or Pydantic models for data contracts
```

## Fixture contract

Fixtures define the BLE + sensor state scenarios used by the wireframe and tests. The `scenario-contract` format describes:
- Session state (active / inactive)
- BLE RSSI reading (or signal-lost flag)
- Wetness sensor value
- IMU anomaly flag
- Expected alert state output

This contract is the shared interface between the mock API, the wireframe UI, and the pytest suite.
