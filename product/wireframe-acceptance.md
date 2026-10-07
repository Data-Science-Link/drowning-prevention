# Wireframe acceptance notes — GG Parent App v1

Pass/fail for first viewable cut. Clean UI is a **hard** requirement.

**Verified:** 2026-10-02 CT against live `http://127.0.0.1:8765/frontend/wireframe/` + mock `http://127.0.0.1:8787` (contractVersion 0.2.1, 5 scenarios). Marked `[x]` only after live HTML/timeline walk (headless Chrome) + fixture/mock cross-check. Residual gaps → `frontend/wireframe/polish-notes.md`.

**Acceptance pass rate:** **31 / 31** checkboxes below.

## Global

- [x] Form-factor-agnostic: no locked “goggles only” chrome; say “wearable sensor”
- [x] No copy that equates BLE loss / signal loss with “drowning”
- [x] SubmersionSuspect and LostConnection never share layout, icon set, or sound cue
- [x] Core alert paths work on free tier (no paywall)
- [x] Synthetic kids only; opaque `childId`s in any debug panel
- [x] Visual polish: calm parent-trustworthy UI (not clunky iSwimband-era)

## Onboarding

- [x] States product as Pool Session backup / extra layer — not life-safety guarantee
- [x] Explains Lost Connection vs SubmersionSuspect before first pair
- [x] Permission ask explains why silent override matters

## Pairing & home

- [x] Pair one sensor + one child on free
- [x] Shows battery % and last-seen
- [x] Pool Session start/end is explicit
- [x] Home never looks “all clear” when offline / lost / low battery without labeling it

## SubmersionSuspect

- [x] Full-screen, high urgency, distinct from Lost Connection
- [x] Actions: I’m looking / Acknowledge / False alarm (labels may tweak)
- [x] Scenario `submersion_gt_10s` reaches this state from fixtures
- [x] Free — no subscription gate

## Lost Connection

- [x] Different color/icon/typography/sound treatment
- [x] Checklist: move closer, check battery, check wear/attach
- [x] Scenario `walkaway_lost` reaches this state
- [x] Zero drowning language

## Blip / happy path

- [x] `ble_blip_lt_10s` does **not** open SubmersionSuspect
- [x] `happy_path` ends session cleanly

## Multi-child & subscription

- [x] Free cannot add 2nd child without upsell
- [x] `multi_child_one_alert` (sub): two kids visible; only B enters SubmersionSuspect
- [x] Subscription copy sells multi-child / family / history — not “unlock alerts”

## History

- [x] Free = today only
- [x] Sub shows richer timeline placeholder

## Fixtures / contract

- [x] Frontend reads only Data Eng fixtures (or Backend mock of same)
- [x] All five `scenarioId`s selectable in a dev scenario switcher
- [x] Contract fields match `data/fixtures/scenario-contract.v0.json` (+ sessionActive / deviceHealth if added)

## Done when

First viewable cut opens from `frontend/wireframe/` (README with run/open instructions). PM pings CoS with paths — **not** Michael.

## Verification notes (2026-10-02)

| Check | Evidence |
|-------|----------|
| Data source | Live badge `Mock :8787`; health `ok`, 5 scenarios |
| Alert chrome | Submersion = red gradient + circular ⚠ pulse + urgent sound stub; Lost = blue/amber + square 📡 + soft dual-tone + checklist |
| Timelines | Played `happy_path`, `ble_blip_lt_10s`, `submersion_gt_10s`, `walkaway_lost`, `multi_child_one_alert` to completion / alert |
| Onboarding | Forced `initialScreen=onboarding`; steps 0–3 + pairing copy verified live |
| Drowning | No copy claims BLE-loss = drowning; onboard explicitly “Not a drowning diagnosis from BLE alone”; Lost body “not a submersion alert” |
