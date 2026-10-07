# frontend/

User interface for Guardian Goggles.

## Status

The Stage 0 HTML/CSS/JS wireframe is live in this folder and deployed to GitHub Pages.  
Acceptance: **31 / 31** checks passed — see `product/wireframe-acceptance.md`.

## Structure

```
frontend/
├── public/               ← Static site root; deployed to GitHub Pages
│   ├── index.html        ← Wireframe entry point (Guardian Goggles Parent App)
│   ├── app.js            ← Screen router, mock/fixture loader, timeline engine
│   ├── styles.css        ← Calm parent UI; distinct alert chrome
│   └── data/
│       └── fixtures/     ← Bundled JSON fixtures (5 scenarios) for offline demo
│           ├── scenarios/
│           ├── household_free.json
│           └── household_sub.json
└── wireframe/            ← Wireframe source (identical logic; FIXTURE_BASE for local dev)
    ├── index.html
    ├── app.js
    ├── styles.css
    ├── README.md
    ├── polish-notes.md
    └── shots/            ← Acceptance screenshots
```

## GitHub Pages

The contents of `frontend/public/` are deployed automatically on every push to `main`  
via `.github/workflows/pages.yml`.

**Required manual step for repo owner:** Settings → Pages → Source → **GitHub Actions**.

## Running locally (fixtures-only, no mock needed)

`fetch()` cannot load fixtures from `file://`. Serve the repo root:

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/frontend/wireframe/
# force fixtures only (skip mock probe): ?mock=0
```

Or serve `frontend/public/` directly to preview the Pages deployment:

```bash
python3 -m http.server 8765 --directory frontend/public
# open http://127.0.0.1:8765/
```

## Scenarios demoed (5)

| Scenario | Alert type | Tier |
|---|---|---|
| `happy_path` | none | free |
| `ble_blip_lt_10s` | none (BLE blip < 10s, no alert) | free |
| `submersion_gt_10s` | **SubmersionSuspect** | free |
| `walkaway_lost` | **LostConnection** | free |
| `multi_child_one_alert` | **SubmersionSuspect** (child B) | sub |

## Alert design (medical honesty)

- **SubmersionSuspect** — signal absent >~10 s during a Pool Session → urgent red full-screen + urgent sound stub. **Not a drowning diagnosis from BLE alone.**
- **LostConnection** — monitoring interrupted (range, battery, interference) → amber/blue, distinct sound stub. Never the same as SubmersionSuspect.
- Core alerts are never paywalled. Free plan includes both alert types.

## Future

React Native / Expo app is parked until Stage 1 hardware PoC validates the core BLE+fusion tech.  
The HTML wireframe is the Stage 0 deliverable and doubles as an investor-shareable demo.
