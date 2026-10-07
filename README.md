# Drowning Prevention — Pool Safety Monitor

**Parent-facing wearable + phone app — an honest, session-aware backup signal for residential pools.**  
A rechargeable BLE sensor clips onto a child's swim goggles. The parent's phone alerts when signal is lost *during an active Pool Session* — a low-cost, transparent layer of protection for backyard pools.

> *Formerly explored under the internal working name "Guardian Goggles."*

**This is a public-service open-handoff project.** The software architecture, research, and UX model are open. If you can build the hardware and ship this, please do — see [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](docs/PUBLIC_SERVICE_AND_CAPITAL.md) for the full handoff overview and a ~$100K exploration path.

---

## Reader journey (~15 min)

> **New here?** Follow these seven steps in order. Every answer is ≤ 3 clicks from this page.

### 1 · What is this?

A session-aware BLE alert layer for residential pools. Not a drowning detector — an honest backup signal.

| It is | It is not |
|---|---|
| A BLE-based session-aware alert layer | A drowning detector |
| A backup signal for parents at poolside | A replacement for active supervision |
| Two distinct alert states (see below) | A guarantee of safety |
| Affordable hardware (~$150–250 kit ASP) | A medical device |

Water kills 2.4 GHz BLE signal in centimetres. Signal loss alone is **not** a drowning diagnosis — dry scenarios (phone walked away, play dunks, battery) produce the same reading. This app ships two honest states:

- **Lost Connection** (blue/amber) — BLE signal gone; cause unknown; check on the child.
- **SubmersionSuspect** (red) — signal gone *during* a Pool Session *plus* a second cue (wetness sensor, IMU anomaly). Still not certainty; still act now.

Copy never says "drowning." Free core alerts are never gated behind a subscription.

Full framing: [`docs/PURPOSE.md`](docs/PURPOSE.md)

---

### 2 · Could someone else ship it?

Yes. Michael is unlikely to fund manufacturing CapEx, paid patent counsel, or distribution himself. His contribution is the open software, the honest UX model, the documented research, and this repo. Someone with hardware manufacturing access, distribution, or non-profit funding could pick this up and run.

Read the full handoff overview, ~$100K exploration path, kill criteria, and non-goals:
→ [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](docs/PUBLIC_SERVICE_AND_CAPITAL.md)

---

### 3 · Who else exists?

Every direct parent B2C wearable competitor is dead, ceased, or discontinued. The gap is real.

| Product | Price | Status | Lesson |
|---------|-------|--------|--------|
| **iSwimband** | ~$99 | **Dead** | Abandonware app, non-rechargeable, false alarms |
| **BuddyTag** | ~$38–45 | **Dead** | False alarms, discontinued importer |
| **SEAL SwimSafe** | ~$379 | **Ceased ~2020** | BOM cost killed the company |
| **Safety Turtle** | ~$85–190 | **Discontinued** | Manufacturer exit |
| **WaterWatch** | $199 (no sub) | **Pre-order** (ships 2026) | Live proof parents pay ~$200 |
| **WAVE GUARDian** | $149–399/mo | **Live B2B only** | Facility/institutional — not DTC parent |

Full competitor landscape + patent risk + market analysis:
→ [`docs/STRATEGY.md`](docs/STRATEGY.md) · [`strategy/market-landscape.md`](strategy/market-landscape.md)

---

### 4 · How does the tech work?

```
┌─────────────────────┐   BLE (2.4 GHz)   ┌──────────────────┐
│   Child's sensor    │ ◄───────────────► │   Phone hub      │
│  (ESP32 / nRF52)    │  signal lost in   │  (iOS / Android) │
│  + wetness + IMU    │      water        │  app + alerts    │
└─────────────────────┘                   └──────────────────┘
```

**Session model:** Parent starts a Pool Session in the app before kids enter the water. This single gate eliminates dry-scenario nuisance alerts (phone-away, indoor false triggers) that killed prior products.

**Alert fusion:**
```
BLE loss during session
        │
        ├─── alone ──────────────► Lost Connection  (blue / amber)
        │
        └─── + second cue ───────► SubmersionSuspect (red)
               (wetness sensor OR IMU anomaly)
```

BLE physics brief: [`science/01-ble-submersion-signal-brief.md`](science/01-ble-submersion-signal-brief.md)  
Full architecture + stage ladder: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)  
Sensor comparison: [`science/03-alt-sensors-vs-ble.md`](science/03-alt-sensors-vs-ble.md)

---

### 5 · What does the phone app look like?

**Live demo:** [https://data-science-link.github.io/drowning-prevention/](https://data-science-link.github.io/drowning-prevention/)

The demo runs fully in-browser — no install, no server needed. Use the **Dev · Scenario** toolbar to step through key alert states.

Key screens (from [`frontend/wireframe/shots/`](frontend/wireframe/shots/)):

| Screen | What it shows |
|--------|--------------|
| [`01-happy.png`](frontend/wireframe/shots/01-happy.png) | Normal pool session — all children connected |
| [`02-submersion.png`](frontend/wireframe/shots/02-submersion.png) | SubmersionSuspect alert (red) |
| [`03-lost-connection.png`](frontend/wireframe/shots/03-lost-connection.png) | Lost Connection alert (blue/amber) |
| [`04-multi-child.png`](frontend/wireframe/shots/04-multi-child.png) | Multi-child view |
| [`05-onboarding-critical-alerts.png`](frontend/wireframe/shots/05-onboarding-critical-alerts.png) | Critical alerts onboarding |

Want to run with the optional mock API locally? See [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md).

---

### 6 · What does it cost?

**Launch kit ASP: ~$150–250 (mid ~$199).** Hardware-first; free core alerts; optional ~$2.99/mo for multi-child + history.

| Stage | Spend | Gate |
|-------|-------|------|
| **Stage 0** — wireframe + mocks | ~$0 (exists) | Founder accepts dual-state UX |
| **Stage 1** — lean HW PoC | ~$150–400 parts + founder time | BLE cliff + fusion FP data |
| Counsel / FTO | ~$8–25k est. | Stage 1 continue signal |
| Broader PoC | ~$15–40k est. | Post-counsel confidence |
| Manufacturing + pilot | ~$100k–400k total | Stage 3+ — deferred |

Unit economics model: [`finance/unit-economics-v0.md`](finance/unit-economics-v0.md) · [`finance/unit-economics-v0.csv`](finance/unit-economics-v0.csv)  
Stage capital plan: [`finance/lean-phase-capital.md`](finance/lean-phase-capital.md)  
Lean PoC BOM: [`science/04-lean-poc-bom.md`](science/04-lean-poc-bom.md)

---

### 7 · What do I build next?

An ordered checklist for anyone picking this up:

- [ ] **Try the live demo** — [https://data-science-link.github.io/drowning-prevention/](https://data-science-link.github.io/drowning-prevention/) — walk through all 5 scenarios.
- [ ] **Read the purpose + handoff docs** — [`docs/PURPOSE.md`](docs/PURPOSE.md), [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](docs/PUBLIC_SERVICE_AND_CAPITAL.md).
- [ ] **Clone and run locally** — [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) gets you to the mock API in ~10 steps.
- [ ] **Stage 1 lean HW PoC** — buy the BOM (~$200 in parts), prove the RF cliff in a backyard pool. Protocol is in [`science/04-lean-poc-bom.md`](science/04-lean-poc-bom.md). Gate: go/no-go data before any further spend.
- [ ] **Stage 1 kill/continue decision** — [`strategy/kill-vs-continue-checklist.md`](strategy/kill-vs-continue-checklist.md). If no-go, document why and archive cleanly.
- [ ] *(Only if Stage 1 go)* **Invent-around IP review** — [`strategy/invent-around-checklist.md`](strategy/invent-around-checklist.md). Engage counsel on WAVE US11715361 before Stage 2.
- [ ] *(Only if Stage 1 go)* **Soft pilot (Stage 2)** — custom/semi-custom PCB, small iOS/Android beta. Trust metrics: false-alert rate, retention, parent feedback.

**Parked (do not start until Stage 1 validates the tech):**
- Expo / React Native native app (issue [#16](https://github.com/Data-Science-Link/drowning-prevention/issues/16))
- Manufacturing tooling, FCC certification, retail distribution

---

## Repository layout

```
docs/               Design docs: PURPOSE, ARCHITECTURE, STRATEGY, GETTING_STARTED, DEV
notes/              Living notes: STATUS, OPEN_QUESTIONS, MIGRATION_STATUS
frontend/public/    GitHub Pages demo (live site source)
frontend/wireframe/ Wireframe source + annotated screenshots
backend/mocks/      Optional local mock API (JSON fixtures server)
data/fixtures/      Scenario fixtures (demo works without mock server)
strategy/           Market landscape, IP checklist, business case (appendix depth)
science/            BLE physics, power BOM, sensor comparison, lean PoC (appendix depth)
finance/            Unit economics models, lean capital plan (appendix depth)
product/            Feature maps, acceptance criteria
src/                Python package scaffold
tests/              Pytest suite
.github/            CI, Dependabot, Pages workflow
.factory/           Agent process playbook (not product narrative)
```

Full annotated map: [`docs/REPO_LAYOUT.md`](docs/REPO_LAYOUT.md)

---

## Quick start

See [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) for the full newcomer path. The short version:

```bash
# Clone and install Python deps
git clone https://github.com/Data-Science-Link/drowning-prevention.git
cd drowning-prevention
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync

# Run tests
uv run pytest

# Preview Pages locally (no install)
cd frontend/public && python -m http.server 8000
# → open http://localhost:8000
```

---

## Contributing

1. Fork or branch from `main` (branch names: `cursor/<slug>` or `feat/<slug>`).
2. Open a pull request against `main` — CI must pass (`security-audit`, `frontend-smoke`).
3. See [`docs/DEV.md`](docs/DEV.md) for local setup and [`CONTRIBUTING.md`](CONTRIBUTING.md) for conventions.

---

## Security

Report vulnerabilities privately. See [`SECURITY.md`](SECURITY.md). Do not open a public issue for a suspected vulnerability. The `security-audit` workflow runs Gitleaks on every push. Do not commit secrets, tokens, or private keys.

---

## Docs index

| Topic | Path |
|-------|------|
| Purpose & problem | [`docs/PURPOSE.md`](docs/PURPOSE.md) |
| Public service & capital handoff | [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](docs/PUBLIC_SERVICE_AND_CAPITAL.md) |
| Strategy overview (comps, thesis, patent) | [`docs/STRATEGY.md`](docs/STRATEGY.md) |
| Architecture (BLE, session, fusion) | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |
| Getting started | [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) |
| Repository layout | [`docs/REPO_LAYOUT.md`](docs/REPO_LAYOUT.md) |
| Standing decisions (ADRs) | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| Dev setup | [`docs/DEV.md`](docs/DEV.md) |
| Current status | [`notes/STATUS.md`](notes/STATUS.md) |
| Migration status | [`notes/MIGRATION_STATUS.md`](notes/MIGRATION_STATUS.md) |
