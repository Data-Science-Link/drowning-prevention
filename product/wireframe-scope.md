# Wireframe scope — GG Parent App (v1 cut)

**Status:** UNLOCKED by CoS 2026-09-21  
**Canonical root:** `/workspace/guardian-goggles/` only (no `/workspace/gg-*` writes)  
**Owners:** PM (this scope) → Frontend (interactive UI) · Backend (mock HTTP/WS) · Data Eng (fixtures)

## Planning locks

| Lock | Value |
|------|--------|
| ASP | Launch kit **~$150–250** hardware-first; **$30–50** later add-on only |
| Form factor | **HOLD** — all screens/copy form-factor-agnostic (“wearable BLE sensor”) |
| Core alerts | **Free** — loud SubmersionSuspect; can override silent/DND where OS allows |
| Honesty | **Lost Connection ≠ SubmersionSuspect** — never shared chrome/sound |
| Copy | **Never equate BLE-loss with drowning** |
| Subscription | **~$2.99/mo** optional: multi-child, family sharing, rich history |
| Stack (wireframe) | **Expo RN** unless CoS overrides; HTML static cut OK for first viewable |
| Fixtures | Data Eng owns `/workspace/guardian-goggles/data/fixtures/`; Backend serves; Frontend consumes only |

## In scope (first interactive cut)

1. **Onboarding (3–4 screens)** — trust copy: Pool Session backup; quiet ≠ safe; permissions for critical/high-importance alerts; no “detects drowning” claim.
2. **Pairing** — one wearable BLE sensor ↔ one child (free); battery + last-seen after pair.
3. **Home / Pool Session** — start/end session; status chips; device health strip.
4. **SubmersionSuspect alert** — full-screen, distinct, hard-to-dismiss; actions: I’m looking / Acknowledge / False alarm. Free.
5. **Lost Connection alert** — fully different visual+sound language; checklist (closer / battery / clip). Free. No drowning words.
6. **Kids & devices** — free: 1 child; paid: multi-child list + gate on add.
7. **History** — free: today only; paid: richHistory placeholder.
8. **Subscription sheet** — upsell multi-child/family/history only; never paywall core alerts.
9. **Scenario switcher (dev)** — drive the five canonical `scenarioId`s from fixtures.

## Out of scope (this cut)

- Locked hardware form factor / industrial design
- Real BLE / Scientist thresholds (use scenario-hardcoded)
- Real APNs/FCM Critical Alerts entitlements (stub copy + UI)
- Legal-final claim language (placeholders OK; no overclaim)
- Caregiver invite deep link (paid stub screen OK)
- Hub architecture

## Canonical scenarios (must demo)

| scenarioId | Expect |
|------------|--------|
| `happy_path` | pair → monitor → end; no alert |
| `ble_blip_lt_10s` | stay Monitoring; no alert |
| `submersion_gt_10s` | SubmersionSuspect → ack |
| `walkaway_lost` | LostConnection; no drowning copy |
| `multi_child_one_alert` | paid; SubmersionSuspect on child B only |

## Deliverable paths

| Who | Path |
|-----|------|
| PM | `product/wireframe-scope.md` (this) · `product/wireframe-acceptance.md` |
| Data Eng | `data/fixtures/` full timelines + update `scenario-contract.v0.json` status |
| Backend | `backend/` mock notes + serve fixtures |
| Frontend | `frontend/wireframe/` interactive prototype (Expo preferred; static HTML acceptable for first viewable) |

## References

- `product/pm-v0-feature-map.md`
- `product/user-stories-outline.md`
- `product/competitive-gaps-iswimband.md`
- `data/fixtures/scenario-contract.v0.json`
- `strategy/market-landscape.md`
