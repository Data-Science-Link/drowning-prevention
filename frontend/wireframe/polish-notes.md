# Wireframe polish notes — residual gaps

**Date:** 2026-10-02 CT  
**Against:** Acceptance walk of live HTML wireframe + mock (`product/wireframe-acceptance.md` = **31/31**).  
**Rule:** Do **not** invent drowning / life-safety claims. Keep form-factor-agnostic (“wearable sensor”; form factor **HOLD**).

These are **residuals / next polish**, not failed acceptance checkboxes.

---

## Product / UX residuals

1. **Onboarding entry path** — Scenarios default `initialScreen: home`. Onboarding copy is complete when forced, but there is no in-app “Replay safety tour” / first-run flag in the wireframe chrome. Add a Dev or Settings entry so PM can open onboarding without fixture interception.
2. **Critical Alerts = stub only** — Chip + copy explain silent / DND override; no real iOS Critical Alerts / Android full-screen intent wiring yet. Label stays honest (“Critical Alerts stub”).
3. **Sound / haptic stubs** — Distinct Web Audio + `vibrate` stubs work after a user gesture; muted by Dev Mute; not production notification channels.
4. **Family invite** — Plan tab invite sheet is a stub (email/role flash). No real auth/sharing backend.
5. **Add child** — Free correctly gates with upsell. On sub when `canAdd`, button is `noop` (no second-child editor). Fine for wireframe; needs real flow before pilot.
6. **Kids / pairing show `childId`** — Opaque synthetic IDs (`ch_*`) — acceptable for demo/debug. Production parent UI should hide raw IDs behind a debug toggle.
7. **Blip banner persistence** — `ble_blip_lt_10s` correctly avoids SubmersionSuspect; calm home after restore. Blip banner visibility after timeline end is easy to miss at 2x — consider a short sticky “signal restored” chip.
8. **Demo jump buttons** — Home shows “Demo: open SubmersionSuspect / Lost Connection” for fixture scenarios. Keep for PM; hide behind Dev flag for any external screenshot pack.
9. **Tab bar during alerts** — Full-screen alerts cover content; confirm a11y focus trap / Escape-to-ack before native port.
10. **Form factor HOLD** — Copy is agnostic (“wearable sensor”, “not goggles-only”). Enclosure/clip still undecided — do not lock goggles chrome in UI or marketing.

## Honesty / safety copy (keep)

- SubmersionSuspect = “possible prolonged submersion — check on your child now”; **not** drowning diagnosis from BLE alone.
- Lost Connection checklist + “this is not a submersion alert.”
- Pool Session = backup / extra layer; quiet ≠ safe.
- Subscription never “unlocks alerts.”

## Not in this cut (expected)

- Real BLE scan/pair, OS background scan limits, fusion sensors, paid WAVE counsel, investor materials beyond strategy docs.
- Native Expo/RN shell (parked; HTML wireframe is the acceptance surface).

## Suggested next polish order

1. Dev “Replay onboarding” control  
2. Hide demo jumps + raw `childId` behind Dev  
3. Sticky blip-restore chip  
4. Sub “Add child” stub that adds a synthetic profile within `maxChildren`  
5. Then Stage-1 HW PoC (`science/04-lean-poc-bom.md`) — not more wireframe chrome
