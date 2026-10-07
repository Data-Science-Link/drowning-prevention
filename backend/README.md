# backend/

Services and API for Guardian Goggles.

## Status

**Next PR (PR #2)** brings the Stage 0 mock API (serves fixture data to the wireframe) into this folder.

This PR establishes the folder structure only.

## Structure (planned)

```
backend/
├── mock/          ← Mock API server (static JSON responses, no real DB)
└── services/      ← Real services land here after Stage 2 (soft pilot)
```

## Stage 0 mock

The Stage 0 mock API serves fixture data from `data/` to the HTML wireframe. It is intentionally minimal — no auth, no persistence, localhost only. Purpose is to validate the UX with realistic data shapes.

## Future

Real backend services (session logs, alert history, multi-device profiles) are deferred until after Stage 1 PoC and soft pilot economics are confirmed. Architecture (cloud provider, stack) is TBD.
