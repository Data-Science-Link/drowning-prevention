# Backend (wireframe mocks)

Mock HTTP APIs for the Guardian Goggles wireframe. **Frontend must consume these mocks** — no forked scenario logic.

## Purpose

- Serve **Data Eng** fixtures from `data/fixtures/` **unchanged on disk**.
- Field names match `scenario-contract.v0.json` (**v0.2.1**, `timelines_ready`).
- CoS / PM unlocked wireframe work (`product/wireframe-scope.md`, `product/wireframe-acceptance.md`).
- Form factor **HOLD** — API copy is form-factor-agnostic (wearable BLE sensor).

## Ownership

| Owner | Owns |
|-------|------|
| Data Eng | Fixture files + contract schema (`data/fixtures/`) |
| Backend (this package) | Mock HTTP that serves fixtures (`backend/mocks/`) |
| Frontend | UI consuming mock endpoints only |

## How to run

```bash
# From the repo root:
node backend/mocks/server.js

# Optional overrides:
PORT=8787 \
GG_FIXTURES=data/fixtures \
GG_DEMO_DATE=2026-09-21 \
  node backend/mocks/server.js

# Via npm:
cd backend/mocks && npm start
```

Zero npm deps (Node stdlib `http` only). Default port **8787**.  
See `docs/DEV.md` for combined mock + wireframe workflow.

## Fixture shape (v0.2.1)

- Pack `entitlement` is a **tier string** (`"free"` | `"sub"`); full object is in `household_free.json` / `household_sub.json`.
- Top-level `alerts[]` on each pack (not only timeline-derived).
- Timeline events use field **`t`** (seconds demo clock), not `tMs`.
- Children include optional `sessionActive` + `deviceHealth`.
- Free history filter uses **`demoDate`** (`GG_DEMO_DATE`, default `2026-09-21`): only alerts whose `openedAt` date matches.

## Endpoints

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | `{ ok, contractVersion, scenariosLoaded, demoDate }` |
| GET | `/v0/contract` | Full `scenario-contract.v0.json` |
| GET | `/v0/scenarios` | List `scenarioId` + resolved entitlement + `expectedAlertType` |
| GET | `/v0/scenarios/:scenarioId` | Full fixture pack (+ `entitlementResolved`, `demoDate`) |
| GET | `/v0/scenarios/:scenarioId/children` | `children[]` |
| GET | `/v0/scenarios/:scenarioId/entitlements` | Resolved entitlement object + `demoDate` |
| GET | `/v0/scenarios/:scenarioId/alerts` | Pack alerts; free = today (`demoDate`) only |
| GET | `/v0/scenarios/:scenarioId/alerts/active` | Unresolved alerts |
| POST | `/v0/scenarios/:scenarioId/alerts/:alertId/ack` | Body `{ ackBy }` — **in-memory only** |
| GET | `/v0/scenarios/:scenarioId/timeline` | `timeline[]` |
| GET | `/v0/scenarios/:scenarioId/history` | `history[]` (free filters `richOnly` + today) |
| GET | `/v0/scenarios/:scenarioId/stream` | SSE timeline playback (`?intervalMs=800`) |
| GET | `/v0/reload` | Reload fixtures from disk |

CORS is open (any origin) for local Expo/wireframe use.

## Canonical scenarioIds

`happy_path` · `ble_blip_lt_10s` · `submersion_gt_10s` · `walkaway_lost` · `multi_child_one_alert`

Alert types: `SubmersionSuspect` | `LostConnection` — **never conflate**.  
BLE signal loss alone is never labelled as drowning in fixtures or copy.

## Files

```
backend/
├── README.md               ← this file
├── openapi-v0.yaml         ← OpenAPI 3.0 spec (v0.2.1)
├── open-tech-questions.md  ← open tech decisions (wireframe-era)
└── mocks/
    ├── server.js           ← mock HTTP server (Node stdlib only)
    ├── smoke.js            ← in-process smoke test (node smoke.js)
    ├── package.json
    └── SMOKE.md            ← smoke run results doc
```

## Smoke

```bash
cd backend/mocks && node smoke.js
# or:  npm run smoke
```

See `mocks/SMOKE.md` for a sample run log.

## OpenAPI

`backend/openapi-v0.yaml` — import into Insomnia, Postman, or any OpenAPI viewer.

## Privacy

Synthetic kids only; opaque `childId`s. No real minors.
