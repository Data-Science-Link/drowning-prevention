# Backend — open tech questions (wireframe mocks live)

From brief + PM v0 + user-stories + Frontend + Data Eng contract + PM unlock (`product/wireframe-scope.md`).

## Locked (Product Build 2026-09-21) + CoS/PM unlock
- Canonical contract: `data/fixtures/scenario-contract.v0.json` (**v0.2.1**, `timelines_ready`).
- Five `scenarioId`s frozen: `happy_path`, `ble_blip_lt_10s`, `submersion_gt_10s`, `walkaway_lost`, `multi_child_one_alert`.
- Wireframe thresholds scenario-hardcoded (Scientist later).
- Free history = **today only** (`demoDate` / `GG_DEMO_DATE`, default `2026-09-21`); paid → `richHistoryEnabled` from household fixtures.
- SubmersionSuspect ≠ LostConnection (distinct `type` on pack `alerts[]`).
- Wireframe stack: Expo RN; Critical Alerts / Android full-screen = platform stubs.
- Privacy: synthetic kids only, opaque `childId`s.
- Form factor HOLD — API copy form-factor-agnostic. ASP is strategy (also mirrored as notes on household fixtures).

## Delivered (wireframe mocks)
- Mock server: `backend/mocks/server.js` (Node stdlib, port **8787**).
- Serves Data Eng packs + `household_*.json` unchanged on disk; resolves entitlement object for FE.
- Endpoints: `/health`, `/v0/contract`, `/v0/scenarios…`, alerts (+ in-memory ack), timeline, history, optional SSE `/stream`.
- OpenAPI: `backend/openapi-v0.yaml` (0.2.1).
- Smoke: `backend/mocks/SMOKE.md`.

## Priority constraint
Alert path latency and reliability > feature breadth. Free core alerts never gated by entitlement.

## Still open (not blocking wireframe mocks)
- Real threshold ownership after Scientist notes.
- APNs + FCM + Critical Alerts for production fan-out.
- Free = exactly 1 child confirmation (household_free assumes `maxChildren: 1`).
- Offline parent retry / collapse for safety alerts.
- Production transport: WS vs SSE (mock offers SSE demo stream).

## Waiting on
- ~~CoS/PM wireframe unlock~~ **done**.
- Data Eng may refine timings/copy under `data/fixtures/` (field names stay frozen to contract).
- Frontend to wire Expo against `http://localhost:8787` using `openapi-v0.yaml`.
