# product/

Feature maps, user stories, competitive analysis, and acceptance criteria for Guardian Goggles.

## Contents (to be migrated selectively)

| File | Description |
|---|---|
| `pm-v0-feature-map.md` | Feature map for Stage 0 (Pool Session, dual alert states, free core alerts) |
| `user-stories-outline.md` | User story outlines: parent setup, session start, alert response |
| `competitive-gaps-iswimband.md` | Gap analysis vs iSwimband — what GG fixes |
| `wireframe-acceptance.md` | Stage 0 wireframe acceptance criteria (31/31 criteria tracked) |

## Core product constraints

All product work must respect these non-negotiables (full rationale in `docs/DECISIONS.md`):

1. **No "drowning" copy** — UI, notifications, and marketing never claim BLE-loss = drowning (D-006).
2. **Dual alert states mandatory** — Lost Connection ≠ SubmersionSuspect; both must be distinct in UI and copy (D-006, `docs/PURPOSE.md`).
3. **Pool Session gate** — SubmersionSuspect only fires during an active session (D-006, `docs/ARCHITECTURE.md`).
4. **Free core alerts** — Never gate the alarm behind a paywall (D-001).
5. **Form factor HOLD** — Do not design for a specific enclosure until Stage 1 PoC results (D-007).
