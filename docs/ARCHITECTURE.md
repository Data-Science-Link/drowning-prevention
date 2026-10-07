# Architecture

## System overview

```
┌─────────────────────┐       BLE (2.4 GHz)       ┌──────────────────┐
│   Child's sensor    │ ◄────────────────────────► │   Phone hub      │
│  (ESP32 / nRF52)    │   signal lost in water     │  (iOS / Android) │
│  + wetness + IMU    │                            │  app + alerts    │
└─────────────────────┘                            └──────────────────┘
```

### Physics

2.4 GHz radio is absorbed by water. When a sensor-equipped child submerges, BLE RSSI drops rapidly — typically within centimetres of the water surface. This is well-understood RF physics and is the foundational signal.

**BLE loss alone is not a drowning diagnosis.** Dry causes (phone moved, battery drained, play dunk, towel) produce identical RSSI drops. Guardian Goggles uses BLE loss as one input to a fused decision, not the sole trigger.

### Session model

The parent explicitly starts a **Pool Session** in the app before the child enters the water. This gate:
- Reduces dry-scenario nuisance alerts (phone-away, indoor false triggers).
- Anchors Lost Connection vs SubmersionSuspect distinction.
- Gives the app a reference baseline RSSI for the current environment.

No session → no SubmersionSuspect. Lost Connection can fire any time as a connectivity notice.

### Alert fusion (dual-channel)

```
BLE loss during session
        │
        ├─── alone ──────────────► Lost Connection  (blue / amber)
        │
        └─── + second cue ───────► SubmersionSuspect (red)
               (wetness sensor
                OR IMU anomaly
                OR future: pressure)
```

Second cues are cheap to add at the sensor level (resistive wetness pads, accelerometer) and reduce false SubmersionSuspect alerts dramatically versus BLE-only systems.

### Alert delivery

- Critical alerts override device silent mode (iOS Critical Alerts entitlement; Android notification channel priority).
- Free core alerts are never gated. Optional subscription adds multi-child, family sharing, and alert history.

---

## Stage ladder (PoC to product)

### Stage 0 — Software honesty UX (complete)
HTML wireframe + mock API + JSON fixtures demonstrate dual-alert chrome. Validates the UX before any hardware spend. Acceptance criteria documented in `product/wireframe-acceptance.md`.

### Stage 1 — Lean hardware PoC (next)
**Goal:** Backyard measurement pack. Prove RF cliff and fusion on real hardware.

- **Hardware:** ESP32 or nRF52-class dev board (~$10–30), resistive wetness pads (~$2–5), IMU if cheap. Phone-as-hub (no custom PCB yet). Total BOM target ≤ ~$400 parts + founder time.
- **Outcome:** RSSI vs depth log, dry-scenario false-alarm rate, fusion delta. Go/no-go for Stage 2.
- **Reference:** `science/04-lean-poc-bom.md` (to be created).

### Stage 2 — Soft pilot (50–500 units)
Requires continue signal from Stage 1. Custom or semi-custom PCB, soft enclosure, small iOS/Android beta. Trust metrics: false-alert rate, retention, parent feedback.

### Stage 3 — Hard tooling + first production run
Requires pilot economics. Factory COGS quotes, IP67 certify if enclosure decided, FCC if needed.

---

## App architecture

### Frontend

- **Now:** Static HTML wireframe (next PR). Hosted on GitHub Pages (`frontend/public/`).
- **Target:** React Native / Expo app for iOS + Android. Expo is **parked** until after Stage 1 PoC validates the tech; HTML-first reduces risk.
- **Pages hosting plan:** `frontend/public/index.html` → GitHub Actions → GitHub Pages. Docs site may eventually live at `docs-site/` using a static site generator.

### Backend

- **Now:** Mock JSON API (next PR). Serves fixture data to the wireframe.
- **Target:** Lightweight real services — BLE session logs, alert history, multi-device profiles. Cloud-hosted; architecture TBD after pilot size is known.

### Sensor firmware

- **Now:** None (Stage 0 is pure software).
- **Stage 1:** Arduino/ESP32 sketch in `science/` or a dedicated `firmware/` folder. Minimal: BLE advertising, RSSI reporting, wetness/IMU I2C read, low-power sleep.

---

## Strategy, science, and finance context

The stage ladder above is grounded in distilled research packs. Key entry points:

| Topic | Path |
|-------|------|
| Strategy overview + public-service framing | `docs/STRATEGY.md` |
| Competitor landscape | `strategy/market-landscape.md` |
| Kill/continue gates (founder gate) | `strategy/kill-vs-continue-checklist.md` |
| Invent-around checklist (WAVE US11715361) | `strategy/invent-around-checklist.md` |
| Unit economics | `strategy/unit-economics.md` |
| BLE physics brief | `science/01-ble-submersion-signal-brief.md` |
| **Lean PoC BOM + backyard protocol** | `science/04-lean-poc-bom.md` |
| **Lean capital plan** | `finance/lean-phase-capital.md` |

---

## GitHub Pages static hosting

The `frontend/public/` directory is the Pages source. CI workflow (`.github/workflows/pages.yml`) builds and deploys on every push to `main`.

**Required manual step:** Repo owner must set *Settings → Pages → Source* to **GitHub Actions**. The agent cannot flip this setting via the API.

Once configured, the live site is available at `https://<owner>.github.io/<repo>/`.
