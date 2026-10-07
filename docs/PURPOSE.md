# Purpose

## The problem

Drowning is the leading cause of accidental death for children under 5 in residential settings.
The peak scenario is brief, unsupervised contact with a backyard pool — seconds, not minutes.
Existing tools are passive (pool alarms, gates) or institutional (multi-camera venue systems).
Parent-grade wearables either failed on trust (too many false alerts, app abandonment) or
disappeared from the market (iSwimband, BuddyTag, SEAL).

There is no affordable, honest, session-aware backup signal for a residential parent.
This project is an attempt to build one — openly, and to hand it off to anyone who can ship it.

## The solution

This project is a **session-aware alert layer** for residential pools:

1. **Wearable BLE sensor** — cheap, rechargeable, clips to swim goggles. Water kills 2.4 GHz
   BLE in centimetres; submersion causes rapid signal loss.
2. **Phone app** — a parent starts an explicit **Pool Session** before kids enter the water. The
   app monitors BLE signal and fuses it with a second cue (wetness sensor, IMU) to produce one
   of two alert states.
3. **Honest dual-state UX:**
   - **Lost Connection** (blue/amber) — signal gone, cause unknown; check on the child. This
     fires even for dry causes (phone moved, battery low) so parents never assume false safety.
   - **SubmersionSuspect** (red) — signal gone *during an active session* **plus** a confirming
     sensor cue. Not certainty, but act now.

BLE signal loss alone is *not* a submersion diagnosis and we never frame it as one. The product
earns trust through honesty, not through overclaiming.

## Public-service posture

This project is open-source and public. The goal is not a venture-backed startup — it is to get
a working, trustworthy device into the hands of families who need it, by whatever path gets there
fastest.

**Michael is unlikely to fund manufacturing capital, paid patent counsel, or CapEx.**
His contribution is the software architecture, the honest UX model, the documented research, and
the open repo. Someone with hardware manufacturing access, distribution, or non-profit funding
could pick this up and run.

See [`docs/PUBLIC_SERVICE_AND_CAPITAL.md`](PUBLIC_SERVICE_AND_CAPITAL.md) for a full handoff
overview — what already exists, what ~$100K could prove, and how to contribute or fork.

## Non-goals

- **Not a drowning detector.** No product can certify submersion from RF loss alone.
- **Not a replacement for supervision.** Framed as a backup layer.
- **Not institutional.** Designed for residential parents, not YMCA-scale venues.
- **Not a mandatory subscription.** Free core alerts are never gated. Optional ~$2.99/mo covers
  multi-child profiles and history.
- **Not built on WAVE's patented claims.** US11715361 is a high FTO risk; we invent around it.
- **Not a fundraise.** This repository is not a pitch deck. It is a documented open handoff.

## Alert philosophy

Copy never says "drowning." The product says:
- "Lost connection — please check on your child."
- "Submersion suspected — check immediately."

The intentional Pool Session mode means a Lost Connection *before* session start is a
connectivity notice, not an alarm. This framing lets parents rely on the alert without crying wolf.

## Target user

Residential parent with a backyard pool and a child under ~8. Harm peaks when contact is brief
and unsupervised — a few minutes at most. The parent is nearby but distracted. This app is a
cheap, loud backup signal, not a surveillance system.
