# Public Service and Capital Handoff

> **Who this is for:** Anyone who reads this repo and wonders whether they can help ship it —
> a hardware maker, a non-profit, a safety-focused fund, or a volunteer engineer. This document
> explains the problem, what already exists, honest kill criteria, and what roughly $100K could
> prove — without implying Michael will manufacture anything.

---

## The problem, briefly

Drowning is the leading cause of accidental death for children under 5 in residential settings.
The peak scenario is a few unsupervised seconds near a backyard pool. Passive barriers (gates,
pool alarms) are necessary but incomplete. Prior parent-grade wearables failed on trust — too
many false alerts — or disappeared from the market entirely (iSwimband, BuddyTag, SEAL).

The gap: a **cheap, honest, session-aware backup signal** that a residential parent can trust
enough to actually use. No product currently fills it.

---

## Why BLE + explicit Pool Session + sensor fusion

2.4 GHz BLE is absorbed by water — a submerged sensor loses signal within centimetres of the
surface. That is well-understood RF physics. The key design insight is that **BLE loss alone is
not a reliable trigger**: a towel, a phone walked to the kitchen, or a play dunk all produce the
same drop. Prior products that treated BLE loss as "submersion" burned parent trust fast.

Guardian Goggles adds two gates to cut false alarms:

1. **Explicit Pool Session.** A parent opens the app and taps "Start Session" before kids enter
   the water. No session → no SubmersionSuspect. This single gate eliminates the entire class of
   dry-scenario nuisance alerts that killed BuddyTag and iSwimband adoption.

2. **Second sensor cue.** BLE loss *during a session* **plus** a confirming signal (resistive
   wetness pad, IMU anomaly, or future: pressure sensor) raises the "SubmersionSuspect" alert.
   Either cue alone is insufficient. Both together is still not certainty — but it is a loud,
   honest "check now."

This two-channel architecture is cheap to build at Stage 1 (ESP32 or nRF52, resistive pads,
phone as hub), honest about its limits, and meaningfully better than the field.

---

## What already exists in this repo

| Artifact | Path | What it gives you |
|---|---|---|
| Problem framing and alert philosophy | [`docs/PURPOSE.md`](PURPOSE.md) | Why this product, what it is and isn't |
| System architecture | [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) | Stage ladder, fusion model, app design |
| Standing decisions (ADRs) | [`docs/DECISIONS.md`](DECISIONS.md) | Locked choices: ASP, FTO, copy rules, form factor |
| Open questions | [`notes/OPEN_QUESTIONS.md`](../notes/OPEN_QUESTIONS.md) | Unresolved hardware, business, and IP questions |
| Current status | [`notes/STATUS.md`](../notes/STATUS.md) | Stage, milestone tracker |
| Repo layout | [`docs/REPO_LAYOUT.md`](REPO_LAYOUT.md) | Where everything lives |
| Strategy research index | [`strategy/README.md`](../strategy/README.md) | Market landscape, patent analysis, business case |
| Finance / capital numbers | [`finance/README.md`](../finance/README.md) | ASP model, COGS estimates, stage capital ranges |
| CI + Pages | `.github/workflows/` | Automated tests, secret scanning, Pages deploy |
| Factory playbook | [`.factory/`](../.factory/) | Structured agent handoff process |

Everything above is public, open-source (check the repo license), and designed to be forked.

---

## Honest kill criteria

The project has explicit gates. If any of these fail, the honest answer is stop or pivot — not
raise more money.

| Kill criterion | What would cause it |
|---|---|
| **K1 — Physics fail** | Stage 1 backyard test shows BLE RSSI cliff is unreliable, inconsistent, or too environment-dependent for a residential product |
| **K2 — Fusion doesn't help** | Wetness + IMU second cue doesn't reduce false SubmersionSuspect rate to an acceptable level vs BLE-only |
| **K3 — False alarm rate unacceptable** | Pilot data shows parents abandon the app within days due to nuisance alerts |
| **K4 — FTO blocks us** | Paid FTO claim chart (post-Stage 1) shows WAVE US11715361 reads directly on our approach with no invent-around path |
| **K5 — No live market gap** | A live competitor ships session-aware swim-under + honesty UX at kit price before Stage 2 |

The invent-around stance (D-003) and the explicit session gate are designed to clear K4 and K3
respectively. None of these are certain. See [`notes/OPEN_QUESTIONS.md`](../notes/OPEN_QUESTIONS.md)
for the live list of unresolved questions.

---

## What ~$100K could buy (and what it cannot)

This is an exploration budget — enough to prove the hardware physics and de-risk the next
decision. It is **not** manufacturing capital.

### What ~$100K could fund

| Item | Rough cost | Purpose |
|---|---|---|
| Stage 1 HW carts (issue [#14](https://github.com/Data-Science-Link/drowning-prevention/issues/14)) | $200–400 parts + time | ESP32/nRF52 dev boards, wetness pads, IMU; backyard RSSI + fusion measurement |
| Stage 0 wireframe + mock API ([#10](https://github.com/Data-Science-Link/drowning-prevention/issues/10), [#11](https://github.com/Data-Science-Link/drowning-prevention/issues/11)) | Founder/volunteer time | HTML UX demo on GitHub Pages; validates alert chrome before hardware spend |
| FTO claim chart (post-Stage 1 go) | $8–25K est. | WAVE US11715361 claim chart; whether invent-around holds |
| Soft pilot design (Stage 2 prep) | $20–50K est. | Semi-custom PCB, small enclosure run, iOS/Android beta (50–500 units) |
| Early pilot inventory + logistics | $20–60K est. | Beta unit production and distribution to trusted parent testers |

Total upper-end: well under $100K to reach a meaningful go/no-go on the full concept.

### What ~$100K explicitly cannot fund

- Full IP67-rated enclosure tooling and injection molds (~$30–100K+ alone, Stage 3+)
- FCC/IC certification for a production radio device (Stage 3+)
- Manufacturing tooling and first production run (~$80–250K, Stage 3+)
- Ongoing patent prosecution (outside scope of this project)
- Marketing, sales, or distribution at scale

The PoC gate is cheap. The manufacturing gate is not. This budget is about proving the physics
and the UX before anyone commits manufacturing capital.

---

## How to contribute, fork, or contact

**Fork:** The repo is public. Fork it, build Stage 1, test it in your own backyard, publish the
data. That is exactly what the project hopes someone does.

**Contribute:** Open a PR against `main`. Branch names should follow `cursor/<slug>` or
`feat/<slug>` (enforced by CI). See [`docs/DEV.md`](DEV.md) for local setup. All PRs require
`security-audit` + `frontend-smoke` to pass and one reviewer.

**Open issues / questions:** Open a GitHub issue. Relevant open issues:
- [#9](https://github.com/Data-Science-Link/drowning-prevention/issues/9) — Public-service framing (this PR)
- [#10](https://github.com/Data-Science-Link/drowning-prevention/issues/10) — Stage 0 wireframe
- [#14](https://github.com/Data-Science-Link/drowning-prevention/issues/14) — Stage 1 HW PoC planning
- [#12](https://github.com/Data-Science-Link/drowning-prevention/issues/12) — Strategy/finance doc migration

**Contact:** Raise an issue or discussion on GitHub. Michael is the owner of all final product
and IP decisions. He is not seeking investors or co-founders via this repository.

**Deep strategy / finance docs:** `strategy/` and `finance/` contain fuller market analysis,
patent notes, and unit-economics models. They are living documents, selectively migrated. Start
with [`strategy/README.md`](../strategy/README.md) and [`finance/README.md`](../finance/README.md)
for the index.

---

## What this project is not asking for

- Funding for Michael's company
- Paid patent counsel before Stage 1 PoC (see D-004 in [`docs/DECISIONS.md`](DECISIONS.md))
- Manufacturing partners before the hardware physics are confirmed
- Anyone to take over the software — the repo is the software; it is already open

The only ask: **if you can ship this and save a child's life, please do.** Fork it. Test it. Prove
the physics. If the PoC works, reach out or publish your results publicly so the next person can
build on them.
