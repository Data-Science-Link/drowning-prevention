# Guardian Goggles — Parent App Wireframe (HTML)

**Path:** `frontend/wireframe/` (source) · `frontend/public/` (Pages deployment)  
**Stack:** Vanilla HTML/CSS/JS — no build step. First viewable cut for PM acceptance.  
**Expo:** Parked for this cut — do **not** start Expo for wireframe review.  
**Data:** Prefers Backend mock `http://127.0.0.1:8787`; silently falls back to `data/fixtures/` (repo root) when serving locally, or `data/fixtures/` under `frontend/public/` on Pages.

## Open instructions

### A. Static + fixtures (always works)

`fetch()` cannot load fixtures from `file://`. Serve the **repo root**:

```bash
cd drowning-prevention
python3 -m http.server 8765
```

Then open:

- http://127.0.0.1:8765/frontend/wireframe/
- http://127.0.0.1:8765/frontend/wireframe/?scenario=submersion_gt_10s
- http://127.0.0.1:8765/frontend/wireframe/?scenario=multi_child_one_alert&screen=sub
- Force fixtures only (skip mock probe): `?mock=0`

### B. Prefer Backend mock (recommended)

In a second terminal:

```bash
cd drowning-prevention
node backend/mocks/server.js
# → http://127.0.0.1:8787
```

Keep `:8765` running, then open the same wireframe URL.

| Method | Path | Use |
|--------|------|-----|
| GET | `/health` | Liveness (not `/v0/health`) |
| GET | `/v0/scenarios` | Scenario list |
| GET | `/v0/scenarios/{scenarioId}` | Full pack |
| GET | `/v0/scenarios/{scenarioId}/stream?intervalMs=800` | SSE timeline Play (optional) |

Dev-bar chip shows **`Mock :8787`** when the mock answered, or **`Fixtures (fallback)`** after health/CORS/offline failure. Timeline Play prefers SSE when on mock; on SSE error it falls back to local `timeline[]` replay.

Custom mock base: `?mock=http://127.0.0.1:8787`  
Shot helpers: `?screen=sub` · `?screen=family_invite` · `?onboard=2` (Critical Alerts step)

### CORS (Backend)

`backend/mocks/server.js` already sends `Access-Control-Allow-Origin: *` (plus Methods/Headers; OPTIONS → 204). No Frontend CORS proxy needed. If CORS is removed later, the probe fails and fixtures fallback still works — restore CORS on the mock rather than inventing product fields.

## Files

| File | Role |
|------|------|
| `index.html` | Shell + phone frame + scenario toolbar |
| `styles.css` | Calm parent UI; distinct alert chrome |
| `app.js` | Screen router + mock/fixture loader + timeline |
| `shots/` | Acceptance PNGs |
| `README.md` | This file |

## Screens demoed

1. Onboarding (trust + alert honesty + permissions / Critical Alerts stub)
2. Pairing (wearable sensor ↔ child)
3. Home / Pool Session
4. **SubmersionSuspect** — urgent red full-screen + `playSubmersionStub`
5. **Lost Connection** — amber/blue, checklist, distinct sound (`playLostStub`)
6. Kids & devices (free gate vs multi-child)
7. History (today vs richHistory)
8. Plan — paid: Family sharing invite stub (email + Invite + invitee list); free: upsell multi-child/family/history only — never “unlock alerts”

## Dev scenario switcher

- `happy_path`
- `ble_blip_lt_10s`
- `submersion_gt_10s`
- `walkaway_lost`
- `multi_child_one_alert` (sub; only child B alerts; Plan invite stub)

Timeline: Play / Pause / Reset + speed. Mute toggles sound stubs.

## Product locks (enforced in UI)

- Say **wearable sensor** (form factor HOLD)
- SubmersionSuspect ≠ Lost Connection (colors, icons, headlines, sound)
- Never equate BLE-loss with drowning
- Free = 1 child + today history; Sub = multi-child + family sharing + richHistory
- Synthetic kids; opaque `childId`s shown in pairing/kids

## Shots

Under `frontend/wireframe/shots/` (headless Chrome, phone-frame crop):

- `01-happy.png` — home / happy path
- `02-submersion.png` — SubmersionSuspect
- `03-lost-connection.png` — Lost Connection
- `04-plan-family-invite.png` — Plan / family invite (sub)
- `04-multi-child.png` — multi-child home (reference)
- Also: `05-onboarding-critical-alerts.png`, `06-plan-family.png`, `07-family-invite-stub.png`

See `shots/README.md`.

## Handoff to Expo Frontend

This HTML cut proves flows + fixture shapes. Expo RN should:

1. Hit Backend mock of identical payloads (or import `data/fixtures/`).
2. Preserve alert chrome split (separate components + haptics/sounds).
3. Keep copy strings aligned with fixture `headline` / `body` fields.
4. Replace scenario dropdown with a `__DEV__` menu.

See also: `product/wireframe-scope.md`, `product/wireframe-acceptance.md`, `backend/openapi-v0.yaml`.
