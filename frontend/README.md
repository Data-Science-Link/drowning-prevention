# frontend/

User interface for Guardian Goggles.

## Status

**Next PR (PR #2)** brings the Stage 0 HTML wireframe and dual-alert UX (Lost Connection / SubmersionSuspect states) into this folder.

This PR establishes the folder and the GitHub Pages placeholder only.

## Structure (planned)

```
frontend/
├── public/          ← Static site root; deployed to GitHub Pages
│   └── index.html
└── src/             ← Wireframe source (HTML/CSS/JS — no build step for now)
```

## GitHub Pages

The contents of `frontend/public/` are deployed automatically on every push to `main` via `.github/workflows/pages.yml`.

**Required manual step for repo owner:** Settings → Pages → Source → **GitHub Actions**.

## Future

React Native / Expo app is parked until Stage 1 hardware PoC validates the core BLE+fusion tech. The HTML wireframe is the Stage 0 deliverable and doubles as an investor-shareable demo.
